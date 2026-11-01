import { createClient } from '@supabase/supabase-js';
import { 
  DEFAULT_SETTINGS, 
  DEFAULT_NEWS, 
  DEFAULT_GALLERY, 
  DEFAULT_VIDEOS, 
  DEFAULT_INQUIRIES,
  DEFAULT_NAV_ITEMS,
  DEFAULT_CUSTOM_PAGES
} from '../data/defaultData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==========================================
// LOCAL STORAGE KEYS FOR OFFLINE / RESILIENT MODE
// ==========================================
const STORAGE_KEYS = {
  SETTINGS: 'elfarah_settings',
  NEWS: 'elfarah_news',
  GALLERY: 'elfarah_gallery',
  VIDEOS: 'elfarah_videos',
  INQUIRIES: 'elfarah_inquiries',
  ADMIN_SESSION: 'elfarah_admin_session',
  NAV_ITEMS: 'elfarah_nav_items',
  CUSTOM_PAGES: 'elfarah_custom_pages'
};

function getLocal(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

// Initialize local cache if empty
if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) setLocal(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
if (!localStorage.getItem(STORAGE_KEYS.NEWS)) setLocal(STORAGE_KEYS.NEWS, DEFAULT_NEWS);
if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) setLocal(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
if (!localStorage.getItem(STORAGE_KEYS.VIDEOS)) setLocal(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS);
if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) setLocal(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
if (!localStorage.getItem(STORAGE_KEYS.NAV_ITEMS)) setLocal(STORAGE_KEYS.NAV_ITEMS, DEFAULT_NAV_ITEMS);
if (!localStorage.getItem(STORAGE_KEYS.CUSTOM_PAGES)) setLocal(STORAGE_KEYS.CUSTOM_PAGES, DEFAULT_CUSTOM_PAGES);

// ==========================================
// AUTHENTICATION HELPERS
// ==========================================
export async function loginAdmin(email, password) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      setLocal(STORAGE_KEYS.ADMIN_SESSION, {
        user: data.user,
        session: data.session,
        isDemo: false
      });
      return { success: true, user: data.user };
    } catch (err) {
      // If Supabase user login fails, we also support the verified administrator credentials
      if (
        (email === 'admin@elfarah.ma' || email === 'farahinfopriv@yahoo.fr') && 
        password === 'Elfarah@2026'
      ) {
        const demoUser = { id: 'admin-verified', email, role: 'admin', user_metadata: { full_name: 'Directeur Mohamed Fadli' } };
        setLocal(STORAGE_KEYS.ADMIN_SESSION, { user: demoUser, isDemo: true });
        return { success: true, user: demoUser };
      }
      throw err;
    }
  } else {
    // Demo / fallback mode for local testing before connecting Supabase
    if (
      (email === 'admin@elfarah.ma' || email === 'farahinfopriv@yahoo.fr') && 
      password === 'Elfarah@2026'
    ) {
      const demoUser = { id: 'admin-demo', email, role: 'admin', user_metadata: { full_name: 'Directeur Mohamed Fadli' } };
      setLocal(STORAGE_KEYS.ADMIN_SESSION, { user: demoUser, isDemo: true });
      return { success: true, user: demoUser };
    }
    throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة / Identifiants invalides');
  }
}

export async function logoutAdmin() {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn(e);
    }
  }
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  return { success: true };
}

export function getCachedAdminSession() {
  return getLocal(STORAGE_KEYS.ADMIN_SESSION, null);
}

// ==========================================
// SETTINGS CRUD
// ==========================================
export async function getSiteSettings() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'general')
        .single();
      if (!error && data) {
        setLocal(STORAGE_KEYS.SETTINGS, data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase getSiteSettings error, falling back:', e);
    }
  }
  return getLocal(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export async function updateSiteSettings(updates) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .upsert({ id: 'general', ...updates, updated_at: new Date().toISOString() })
        .select()
        .single();
      if (!error && data) {
        setLocal(STORAGE_KEYS.SETTINGS, data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase updateSiteSettings error:', e);
    }
  }
  const current = getLocal(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  const updated = { ...current, ...updates, updated_at: new Date().toISOString() };
  setLocal(STORAGE_KEYS.SETTINGS, updated);
  return updated;
}

// ==========================================
// NEWS CRUD
// ==========================================
export async function getNewsList() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('publish_date', { ascending: false });
      if (!error && data && data.length > 0) {
        setLocal(STORAGE_KEYS.NEWS, data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase getNewsList error, using cache:', e);
    }
  }
  return getLocal(STORAGE_KEYS.NEWS, DEFAULT_NEWS);
}

export async function createNewsItem(item) {
  const newItem = {
    ...item,
    id: item.id || ('news-' + Date.now()),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('news')
        .insert([newItem])
        .select()
        .single();
      if (!error && data) {
        const list = getLocal(STORAGE_KEYS.NEWS, DEFAULT_NEWS);
        setLocal(STORAGE_KEYS.NEWS, [data, ...list]);
        return data;
      }
    } catch (e) {
      console.warn('Supabase createNewsItem error:', e);
    }
  }

  const list = getLocal(STORAGE_KEYS.NEWS, DEFAULT_NEWS);
  const updated = [newItem, ...list];
  setLocal(STORAGE_KEYS.NEWS, updated);
  return newItem;
}

export async function updateNewsItem(id, updates) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('news')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (!error && data) {
        const list = getLocal(STORAGE_KEYS.NEWS, DEFAULT_NEWS);
        setLocal(STORAGE_KEYS.NEWS, list.map(item => item.id === id ? data : item));
        return data;
      }
    } catch (e) {
      console.warn('Supabase updateNewsItem error:', e);
    }
  }

  const list = getLocal(STORAGE_KEYS.NEWS, DEFAULT_NEWS);
  const updated = list.map(item => item.id === id ? { ...item, ...updates, updated_at: new Date().toISOString() } : item);
  setLocal(STORAGE_KEYS.NEWS, updated);
  return updated.find(i => i.id === id);
}

export async function deleteNewsItem(id) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('news').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteNewsItem error:', e);
    }
  }
  const list = getLocal(STORAGE_KEYS.NEWS, DEFAULT_NEWS);
  const updated = list.filter(item => item.id !== id);
  setLocal(STORAGE_KEYS.NEWS, updated);
  return true;
}

// ==========================================
// GALLERY CRUD
// ==========================================
export async function getGalleryList() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data) {
        setLocal(STORAGE_KEYS.GALLERY, data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase getGalleryList error:', e);
    }
  }
  return getLocal(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
}

export async function createGalleryItem(item) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('gallery_items')
      .insert([item])
      .select()
      .single();
    if (error) throw error;
    const list = getLocal(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
    setLocal(STORAGE_KEYS.GALLERY, [...list, data]);
    return data;
  }

  const newItem = { ...item, id: item.id || ('gal-' + Date.now()), created_at: new Date().toISOString() };
  const list = getLocal(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
  const updated = [...list, newItem];
  setLocal(STORAGE_KEYS.GALLERY, updated);
  return newItem;
}

export async function updateGalleryItem(id, updates) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('gallery_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    const list = getLocal(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
    setLocal(STORAGE_KEYS.GALLERY, list.map(item => item.id === id ? data : item));
    return data;
  }

  const list = getLocal(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
  const updated = list.map(item => item.id === id ? { ...item, ...updates } : item);
  setLocal(STORAGE_KEYS.GALLERY, updated);
  return updated.find(item => item.id === id);
}

export async function deleteGalleryItem(id) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('gallery_items').delete().eq('id', id);
    if (error) throw error;
  }
  const list = getLocal(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
  const updated = list.filter(item => item.id !== id);
  setLocal(STORAGE_KEYS.GALLERY, updated);
  return true;
}

// ==========================================
// VIDEOS CRUD
// ==========================================
export async function getVideosList() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) {
        setLocal(STORAGE_KEYS.VIDEOS, data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase getVideosList error:', e);
    }
  }
  return getLocal(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS);
}

export async function createVideoItem(item) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('videos')
      .insert([item])
      .select()
      .single();
    if (error) throw error;
    const list = getLocal(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS);
    setLocal(STORAGE_KEYS.VIDEOS, [data, ...list]);
    return data;
  }

  const newItem = { ...item, id: item.id || ('vid-' + Date.now()), created_at: new Date().toISOString() };
  const list = getLocal(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS);
  const updated = [newItem, ...list];
  setLocal(STORAGE_KEYS.VIDEOS, updated);
  return newItem;
}

export async function updateVideoItem(id, updates) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('videos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    const list = getLocal(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS);
    setLocal(STORAGE_KEYS.VIDEOS, list.map(item => item.id === id ? data : item));
    return data;
  }

  const list = getLocal(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS);
  const updated = list.map(item => item.id === id ? { ...item, ...updates } : item);
  setLocal(STORAGE_KEYS.VIDEOS, updated);
  return updated.find(item => item.id === id);
}

export async function deleteVideoItem(id) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('videos').delete().eq('id', id);
    if (error) throw error;
  }
  const list = getLocal(STORAGE_KEYS.VIDEOS, DEFAULT_VIDEOS);
  const updated = list.filter(item => item.id !== id);
  setLocal(STORAGE_KEYS.VIDEOS, updated);
  return true;
}

// ==========================================
// INQUIRIES & REGISTRATIONS CRUD
// ==========================================
export async function submitInquiry(inquiryData) {
  const newInquiry = {
    ...inquiryData,
    id: 'inq-' + Date.now(),
    status: 'pending',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          student_name: inquiryData.student_name,
          parent_name: inquiryData.parent_name,
          phone: inquiryData.phone,
          email: inquiryData.email || '',
          level_requested: inquiryData.level_requested,
          previous_school: inquiryData.previous_school || '',
          notes: inquiryData.notes || '',
          status: 'pending'
        }])
        .select()
        .single();
      if (!error && data) {
        const list = getLocal(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
        setLocal(STORAGE_KEYS.INQUIRIES, [data, ...list]);
        return { success: true, data };
      }
    } catch (e) {
      console.warn('Supabase submitInquiry error:', e);
    }
  }

  const list = getLocal(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
  setLocal(STORAGE_KEYS.INQUIRIES, [newInquiry, ...list]);
  return { success: true, data: newInquiry };
}

export async function getInquiriesList() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setLocal(STORAGE_KEYS.INQUIRIES, data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase getInquiriesList error:', e);
    }
  }
  return getLocal(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
}

export async function updateInquiryStatus(id, newStatus) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', id)
        .select()
        .single();
      if (!error && data) {
        const list = getLocal(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
        setLocal(STORAGE_KEYS.INQUIRIES, list.map(item => item.id === id ? data : item));
        return data;
      }
    } catch (e) {
      console.warn('Supabase updateInquiryStatus error:', e);
    }
  }

  const list = getLocal(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
  const updated = list.map(item => item.id === id ? { ...item, status: newStatus } : item);
  setLocal(STORAGE_KEYS.INQUIRIES, updated);
  return updated.find(i => i.id === id);
}

export async function deleteInquiry(id) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('inquiries').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteInquiry error:', e);
    }
  }
  const list = getLocal(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
  const updated = list.filter(item => item.id !== id);
  setLocal(STORAGE_KEYS.INQUIRIES, updated);
  return true;
}

// ==========================================
// FILE UPLOAD (SUPABASE STORAGE)
// ==========================================
export async function uploadMediaAsset(file, folder = 'uploads') {
  if (isSupabaseConfigured && supabase) {
    const extension = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
    const filePath = `${folder}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage
      .from('school-media')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from('school-media').getPublicUrl(filePath);
    return { url: data.publicUrl, storage_path: filePath };
  }

  // Fallback to Base64 data URL for instant preview & offline operation
  const url = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return { url, storage_path: null };
}

export async function uploadMediaFile(file, folder = 'uploads') {
  const asset = await uploadMediaAsset(file, folder);
  return asset.url;
}

export async function deleteStoredMedia(storagePath) {
  if (!storagePath || !isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.storage.from('school-media').remove([storagePath]);
  if (error) throw error;
}

// ==========================================
// NAVIGATION ITEMS CRUD
// ==========================================
export async function getNavItemsList() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('nav_items')
        .select('*')
        .order('order', { ascending: true });
      if (!error && data && data.length > 0) {
        setLocal(STORAGE_KEYS.NAV_ITEMS, data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase getNavItemsList error, using cache:', e);
    }
  }
  return getLocal(STORAGE_KEYS.NAV_ITEMS, DEFAULT_NAV_ITEMS);
}

export async function saveNavItemsList(items) {
  setLocal(STORAGE_KEYS.NAV_ITEMS, items);
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('nav_items').upsert(items);
    } catch (e) {
      console.warn('Supabase saveNavItemsList error:', e);
    }
  }
  return items;
}

export async function addNavItem(item) {
  const current = await getNavItemsList();
  const newItem = {
    ...item,
    id: item.id || ('nav-' + Date.now()),
    order: (current.length + 1),
    is_visible: item.is_visible !== false
  };
  const updated = [...current, newItem];
  await saveNavItemsList(updated);
  return newItem;
}

export async function updateNavItem(id, updates) {
  const current = await getNavItemsList();
  const updated = current.map(item => item.id === id ? { ...item, ...updates } : item);
  await saveNavItemsList(updated);
  return updated.find(item => item.id === id);
}

export async function deleteNavItem(id) {
  const current = await getNavItemsList();
  const updated = current.filter(item => item.id !== id);
  await saveNavItemsList(updated);
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('nav_items').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteNavItem error:', e);
    }
  }
  return true;
}

// ==========================================
// CUSTOM PAGES CRUD
// ==========================================
export async function getCustomPagesList() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('custom_pages')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setLocal(STORAGE_KEYS.CUSTOM_PAGES, data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase getCustomPagesList error, using cache:', e);
    }
  }
  return getLocal(STORAGE_KEYS.CUSTOM_PAGES, DEFAULT_CUSTOM_PAGES);
}

export async function createCustomPageItem(page) {
  const newPage = {
    ...page,
    id: page.id || ('page-' + Date.now()),
    slug: (page.slug || ('page-' + Date.now())).toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-'),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const list = getLocal(STORAGE_KEYS.CUSTOM_PAGES, DEFAULT_CUSTOM_PAGES);
  const updated = [newPage, ...list];
  setLocal(STORAGE_KEYS.CUSTOM_PAGES, updated);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('custom_pages').insert([newPage]);
    } catch (e) {
      console.warn('Supabase createCustomPageItem error:', e);
    }
  }
  return newPage;
}

export async function updateCustomPageItem(id, updates) {
  const list = getLocal(STORAGE_KEYS.CUSTOM_PAGES, DEFAULT_CUSTOM_PAGES);
  const updated = list.map(item => item.id === id ? { ...item, ...updates, updated_at: new Date().toISOString() } : item);
  setLocal(STORAGE_KEYS.CUSTOM_PAGES, updated);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('custom_pages').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id);
    } catch (e) {
      console.warn('Supabase updateCustomPageItem error:', e);
    }
  }
  return updated.find(i => i.id === id);
}

export async function deleteCustomPageItem(id) {
  const list = getLocal(STORAGE_KEYS.CUSTOM_PAGES, DEFAULT_CUSTOM_PAGES);
  const updated = list.filter(item => item.id !== id);
  setLocal(STORAGE_KEYS.CUSTOM_PAGES, updated);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('custom_pages').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteCustomPageItem error:', e);
    }
  }
  return true;
}
