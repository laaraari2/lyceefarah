import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { 
  getSiteSettings, 
  updateSiteSettings,
  getNewsList, 
  createNewsItem, 
  updateNewsItem,
  deleteNewsItem,
  getGalleryList, 
  createGalleryItem, 
  updateGalleryItem,
  deleteGalleryItem,
  getVideosList, 
  createVideoItem, 
  updateVideoItem,
  deleteVideoItem,
  getInquiriesList, 
  submitInquiry,
  updateInquiryStatus, 
  deleteInquiry,
  uploadMediaAsset,
  deleteStoredMedia,
  getNavItemsList,
  saveNavItemsList,
  addNavItem,
  updateNavItem,
  deleteNavItem,
  getCustomPagesList,
  createCustomPageItem,
  updateCustomPageItem,
  deleteCustomPageItem
} from '../../lib/supabase';
import {
  LayoutDashboard,
  Users,
  Newspaper,
  Image as ImageIcon,
  Video,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  School,
  FileText,
  AlertCircle,
  X,
  Upload,
  Eye,
  RefreshCw,
  Search,
  Filter,
  Download,
  Edit3,
  MessageCircle,
  Menu,
  UserPlus,
  Layers,
  ArrowUp,
  ArrowDown,
  EyeOff,
  BookOpen,
  Link as LinkIcon,
  Check
} from 'lucide-react';

export default function AdminDashboard({ 
  onBackToSite, 
  onDataChange, 
  initialPageToEdit, 
  clearInitialPageToEdit 
}) {
  const { lang, setLang, t, isRTL } = useLanguage();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('overview'); // overview, inquiries, news, pages, gallery, videos, settings
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [successToast, setSuccessToast] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data states
  const [settings, setSettings] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [news, setNews] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [videos, setVideos] = useState([]);
  const [navItems, setNavItems] = useState([]);
  const [customPages, setCustomPages] = useState([]);

  // Inquiries filter & search
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState('all'); // all, pending, contacted, accepted
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showAddInquiryModal, setShowAddInquiryModal] = useState(false);

  // News states
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  // Navigation Items modal states
  const [showNavModal, setShowNavModal] = useState(false);
  const [editingNavItem, setEditingNavItem] = useState(null);
  const [navForm, setNavForm] = useState({
    label_ar: '',
    label_fr: '',
    type: 'section', // section, page, link
    target: 'home',
    is_visible: true
  });

  // Custom Pages modal states
  const [showPageModal, setShowPageModal] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [pageForm, setPageForm] = useState({
    title_ar: '',
    title_fr: '',
    slug: '',
    subtitle_ar: '',
    subtitle_fr: '',
    content_ar: '',
    content_fr: '',
    image_url: '/images/building.png',
    is_published: true,
    addToMenu: true
  });

  // Media modals & forms
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);

  const [newNews, setNewNews] = useState({
    title_ar: '',
    title_fr: '',
    category_ar: 'إعلانات',
    category_fr: 'Annonces',
    summary_ar: '',
    summary_fr: '',
    image_url: '/images/graduation-ceremony.png',
    publish_date: new Date().toISOString().split('T')[0],
    is_published: true
  });

  const [newGallery, setNewGallery] = useState({
    title_ar: '',
    title_fr: '',
    category: 'campus',
    image_url: '/images/building.png',
    storage_path: null
  });

  const [newVideo, setNewVideo] = useState({
    title_ar: '',
    title_fr: '',
    video_url: '/videos/presentation.mp4',
    thumbnail_url: '/images/graduation-award.png',
    storage_path: null
  });

  const [manualInquiry, setManualInquiry] = useState({
    student_name: '',
    parent_name: '',
    phone: '',
    email: '',
    level_requested: 'Tronc Commun Scientifique',
    previous_school: '',
    notes: ''
  });

  const [settingsForm, setSettingsForm] = useState({
    school_name_ar: '',
    school_name_fr: '',
    slogan_ar: '',
    slogan_fr: '',
    phone: '',
    email: '',
    address_ar: '',
    address_fr: '',
    authorization_number: '',
    director_name_ar: '',
    director_name_fr: ''
  });

  const showToast = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [sett, inqs, n, g, v, navs, pages] = await Promise.all([
        getSiteSettings(),
        getInquiriesList(),
        getNewsList(),
        getGalleryList(),
        getVideosList(),
        getNavItemsList(),
        getCustomPagesList()
      ]);
      setSettings(sett);
      setInquiries(inqs || []);
      setNews(n || []);
      setGallery(g || []);
      setVideos(v || []);
      setNavItems(navs || []);
      setCustomPages(pages || []);

      if (sett) {
        setSettingsForm({
          school_name_ar: sett.school_name_ar || 'ثانوية الفرح الخصوصية',
          school_name_fr: sett.school_name_fr || 'Lycée Collège El Farah Privé',
          slogan_ar: sett.slogan_ar || '',
          slogan_fr: sett.slogan_fr || '',
          phone: sett.phone || '',
          email: sett.email || '',
          address_ar: sett.address_ar || '',
          address_fr: sett.address_fr || '',
          authorization_number: sett.authorization_number || '',
          director_name_ar: sett.director_name_ar || '',
          director_name_fr: sett.director_name_fr || ''
        });
      }
    } catch (e) {
      console.error('Error loading dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    if (initialPageToEdit) {
      setActiveTab('pages');
      handleOpenEditPageModal(initialPageToEdit);
      if (clearInitialPageToEdit) clearInitialPageToEdit();
    }
  }, [initialPageToEdit]);

  // WhatsApp Link Helper
  const getWhatsAppLink = (phone, studentName) => {
    let clean = (phone || '').replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) {
      clean = '212' + clean.substring(1);
    }
    const msg = encodeURIComponent(
      `السلام عليكم ورحمة الله، تتواصل معكم إدارة ثانوية الفرح الخصوصية بخصوص طلب تسجيل التلميذ(ة) ${studentName || ''}.`
    );
    return `https://wa.me/${clean}?text=${msg}`;
  };

  // Export to Excel / CSV
  const exportInquiriesToCSV = () => {
    const headers = [
      'اسم التلميذ',
      'المستوى المطلوب',
      'ولي الأمر',
      'الهاتف',
      'البريد الإلكتروني',
      'المؤسسة السابقة',
      'ملاحظات',
      'الحالة',
      'تاريخ الطلب'
    ];

    const rows = inquiries.map(inq => [
      `"${inq.student_name || ''}"`,
      `"${inq.level_requested || ''}"`,
      `"${inq.parent_name || ''}"`,
      `"${inq.phone || ''}"`,
      `"${inq.email || ''}"`,
      `"${inq.previous_school || ''}"`,
      `"${(inq.notes || '').replace(/"/g, '""')}"`,
      `"${inq.status === 'pending' ? 'قيد الانتظار' : inq.status === 'contacted' ? 'تم التواصل' : 'مقبول'}"`,
      `"${inq.created_at ? new Date(inq.created_at).toLocaleDateString() : ''}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `demandes_inscriptions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(lang === 'ar' ? 'تم تصدير ملف Excel بنجاح' : 'Fichier exporté avec succès');
  };

  // Handlers for Inquiries
  const handleStatusChange = async (id, newStatus) => {
    await updateInquiryStatus(id, newStatus);
    setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
    }
    showToast(lang === 'ar' ? 'تم تحديث حالة الطلب بنجاح' : 'Statut mis à jour');
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الطلب؟' : 'Confirmer la suppression?')) return;
    await deleteInquiry(id);
    setInquiries(prev => prev.filter(item => item.id !== id));
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(null);
    }
    showToast(lang === 'ar' ? 'تم حذف الطلب' : 'Demande supprimée');
  };

  const handleManualInquirySubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await submitInquiry(manualInquiry);
      if (res.success && res.data) {
        setInquiries(prev => [res.data, ...prev]);
        setShowAddInquiryModal(false);
        setManualInquiry({
          student_name: '',
          parent_name: '',
          phone: '',
          email: '',
          level_requested: 'Tronc Commun Scientifique',
          previous_school: '',
          notes: ''
        });
        showToast(lang === 'ar' ? 'تمت إضافة طلب التسجيل بنجاح' : 'Demande enregistrée');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Handlers for News
  const handleCreateNews = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const created = await createNewsItem(newNews);
      setNews(prev => [created, ...prev]);
      setShowNewsModal(false);
      setNewNews({
        title_ar: '',
        title_fr: '',
        category_ar: 'إعلانات',
        category_fr: 'Annonces',
        summary_ar: '',
        summary_fr: '',
        image_url: '/images/graduation-ceremony.png',
        publish_date: new Date().toISOString().split('T')[0],
        is_published: true
      });
      showToast(lang === 'ar' ? 'تم نشر المقال بنجاح' : 'Article publié avec succès');
      if (onDataChange) onDataChange();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateNews = async (e) => {
    e.preventDefault();
    if (!editingNews) return;
    setActionLoading(true);
    try {
      const updated = await updateNewsItem(editingNews.id, editingNews);
      setNews(prev => prev.map(item => item.id === editingNews.id ? updated : item));
      setEditingNews(null);
      showToast(lang === 'ar' ? 'تم حفظ تعديلات المقال بنجاح' : 'Article mis à jour');
      if (onDataChange) onDataChange();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الخبر؟' : 'Supprimer cet article?')) return;
    await deleteNewsItem(id);
    setNews(prev => prev.filter(item => item.id !== id));
    showToast(lang === 'ar' ? 'تم حذف المقال' : 'Article supprimé');
    if (onDataChange) onDataChange();
  };

  // ==========================================
  // NAVIGATION MENU HANDLERS
  // ==========================================
  const handleOpenAddNavModal = () => {
    setEditingNavItem(null);
    setNavForm({
      label_ar: '',
      label_fr: '',
      type: 'section',
      target: 'home',
      is_visible: true
    });
    setShowNavModal(true);
  };

  const handleOpenEditNavModal = (item) => {
    setEditingNavItem(item);
    setNavForm({
      label_ar: item.label_ar || item.label || '',
      label_fr: item.label_fr || item.label || '',
      type: item.type || (item.target?.startsWith('page:') ? 'page' : 'section'),
      target: item.target || 'home',
      is_visible: item.is_visible !== false
    });
    setShowNavModal(true);
  };

  const handleSaveNavItem = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (editingNavItem) {
        // Update existing item
        const updated = await updateNavItem(editingNavItem.id, navForm);
        setNavItems(prev => prev.map(item => item.id === editingNavItem.id ? updated : item));
        showToast(lang === 'ar' ? 'تم تعديل عنصر القائمة بنجاح' : 'Élément modifié');
      } else {
        // Add new item
        const created = await addNavItem(navForm);
        setNavItems(prev => [...prev, created]);
        showToast(lang === 'ar' ? 'تمت إضافة عنصر جديد للقائمة' : 'Élément ajouté au menu');
      }
      setShowNavModal(false);
      if (onDataChange) onDataChange();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteNavItem = async (id) => {
    if (!window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا العنصر من القائمة؟' : 'Supprimer cet élément du menu?')) return;
    await deleteNavItem(id);
    setNavItems(prev => prev.filter(item => item.id !== id));
    showToast(lang === 'ar' ? 'تم حذف العنصر من القائمة' : 'Élément supprimé du menu');
    if (onDataChange) onDataChange();
  };

  const handleToggleNavVisibility = async (id, currentVis) => {
    const newVis = !currentVis;
    const updated = await updateNavItem(id, { is_visible: newVis });
    setNavItems(prev => prev.map(item => item.id === id ? updated : item));
    showToast(newVis ? (lang === 'ar' ? 'تم إظهار العنصر في القائمة' : 'Élément visible') : (lang === 'ar' ? 'تم إخفاء العنصر من القائمة' : 'Élément masqué'));
    if (onDataChange) onDataChange();
  };

  const handleMoveNavOrder = async (index, direction) => {
    const newItems = [...navItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    // Swap
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    // Reassign order indices
    const normalized = newItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    setNavItems(normalized);
    await saveNavItemsList(normalized);
    showToast(lang === 'ar' ? 'تم تحديث ترتيب القائمة' : 'Ordre mis à jour');
    if (onDataChange) onDataChange();
  };

  // ==========================================
  // CUSTOM PAGES HANDLERS
  // ==========================================
  const handleOpenAddPageModal = () => {
    setEditingPage(null);
    setPageForm({
      title_ar: '',
      title_fr: '',
      slug: '',
      subtitle_ar: '',
      subtitle_fr: '',
      content_ar: '',
      content_fr: '',
      image_url: '/images/building.png',
      is_published: true,
      addToMenu: true
    });
    setShowPageModal(true);
  };

  const handleOpenEditPageModal = (page) => {
    setEditingPage(page);
    setPageForm({
      title_ar: page.title_ar || '',
      title_fr: page.title_fr || '',
      slug: page.slug || '',
      subtitle_ar: page.subtitle_ar || '',
      subtitle_fr: page.subtitle_fr || '',
      content_ar: page.content_ar || '',
      content_fr: page.content_fr || '',
      image_url: page.image_url || '/images/building.png',
      is_published: page.is_published !== false,
      addToMenu: false
    });
    setShowPageModal(true);
  };

  const handleSavePage = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const generatedSlug = pageForm.slug || pageForm.title_fr.toLowerCase().replace(/[^a-z0-9]/g, '-') || ('page-' + Date.now());

      if (editingPage) {
        // Update page
        const updated = await updateCustomPageItem(editingPage.id, {
          ...pageForm,
          slug: generatedSlug
        });
        setCustomPages(prev => prev.map(p => p.id === editingPage.id ? updated : p));
        showToast(lang === 'ar' ? 'تم تحديث الصفحة بنجاح' : 'Page mise à jour');
      } else {
        // Create new page
        const created = await createCustomPageItem({
          ...pageForm,
          slug: generatedSlug
        });
        setCustomPages(prev => [created, ...prev]);

        // Auto-add to main navigation menu if checked
        if (pageForm.addToMenu) {
          const newNavItem = await addNavItem({
            label_ar: created.title_ar,
            label_fr: created.title_fr,
            type: 'page',
            target: created.slug,
            is_visible: true
          });
          setNavItems(prev => [...prev, newNavItem]);
        }
        showToast(lang === 'ar' ? 'تم إنشاء الصفحة وإضافتها بنجاح' : 'Page créée avec succès');
      }
      setShowPageModal(false);
      if (onDataChange) onDataChange();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeletePage = async (id, slug) => {
    if (!window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه الصفحة نهائياً؟' : 'Supprimer définitivement cette page?')) return;
    await deleteCustomPageItem(id);
    setCustomPages(prev => prev.filter(p => p.id !== id));

    // Also check if it's linked in navItems and offer/remove
    const linkedNav = navItems.find(n => n.target === slug || n.target === `page:${slug}`);
    if (linkedNav) {
      await deleteNavItem(linkedNav.id);
      setNavItems(prev => prev.filter(n => n.id !== linkedNav.id));
    }

    showToast(lang === 'ar' ? 'تم حذف الصفحة وعنصر القائمة المرتبط بها' : 'Page supprimée');
    if (onDataChange) onDataChange();
  };

  const handleAddPageToMenuQuick = async (page) => {
    const alreadyLinked = navItems.some(n => n.target === page.slug || n.target === `page:${page.slug}`);
    if (alreadyLinked) {
      showToast(lang === 'ar' ? 'هذه الصفحة موجودة بالفعل في القائمة الرئيسية' : 'Page déjà présente dans le menu');
      return;
    }

    const created = await addNavItem({
      label_ar: page.title_ar,
      label_fr: page.title_fr,
      type: 'page',
      target: page.slug,
      is_visible: true
    });
    setNavItems(prev => [...prev, created]);
    showToast(lang === 'ar' ? 'تمت إضافة الصفحة إلى القائمة الرئيسية بنجاح' : 'Page ajoutée au menu');
    if (onDataChange) onDataChange();
  };

  // Handlers for Gallery
  const handleCreateGallery = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      let oldFileCleanupFailed = false;
      if (editingGallery) {
        const { title_ar, title_fr, category, image_url, storage_path } = newGallery;
        const updated = await updateGalleryItem(editingGallery.id, {
          title_ar, title_fr, category, image_url, storage_path
        });
        setGallery(prev => prev.map(item => item.id === editingGallery.id ? updated : item));
        if (editingGallery.storage_path && editingGallery.storage_path !== newGallery.storage_path) {
          try {
            await deleteStoredMedia(editingGallery.storage_path);
          } catch (error) {
            console.error('Old gallery file could not be removed:', error);
            oldFileCleanupFailed = true;
          }
        }
      } else {
        const created = await createGalleryItem(newGallery);
        setGallery(prev => [...prev, created]);
      }
      setShowGalleryModal(false);
      setEditingGallery(null);
      setNewGallery({
        title_ar: '',
        title_fr: '',
        category: 'campus',
        image_url: '/images/building.png',
        storage_path: null
      });
      showToast(lang === 'ar'
        ? (oldFileCleanupFailed ? 'تم التعديل، لكن تعذر حذف الملف القديم من التخزين' : editingGallery ? 'تم تعديل الصورة بنجاح' : 'تمت إضافة الصورة بنجاح')
        : (oldFileCleanupFailed ? 'Modifié, mais l’ancien fichier n’a pas pu être supprimé' : editingGallery ? 'Photo modifiée' : 'Photo ajoutée'));
      if (onDataChange) onDataChange();
    } catch (err) {
      console.error(err);
      if (newGallery.storage_path && newGallery.storage_path !== editingGallery?.storage_path) {
        try {
          await deleteStoredMedia(newGallery.storage_path);
        } catch (cleanupError) {
          console.error('Unattached gallery upload could not be removed:', cleanupError);
        }
      }
      showToast(lang === 'ar' ? 'تعذر حفظ الصورة، تحقق من الاتصال والتخزين' : 'Impossible d’enregistrer la photo');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteGallery = async (item) => {
    if (!window.confirm(lang === 'ar' ? 'هل تريد حذف هذه الصورة؟' : 'Supprimer cette photo?')) return;
    try {
      await deleteGalleryItem(item.id);
      setGallery(prev => prev.filter(galleryItem => galleryItem.id !== item.id));
      if (item.storage_path) {
        try {
          await deleteStoredMedia(item.storage_path);
        } catch (error) {
          console.error('Deleted gallery record but could not remove its file:', error);
          showToast(lang === 'ar' ? 'حُذف السجل، لكن تعذر حذف الملف من التخزين' : 'Entrée supprimée, mais le fichier n’a pas pu être supprimé');
          if (onDataChange) onDataChange();
          return;
        }
      }
      showToast(lang === 'ar' ? 'تم حذف الصورة' : 'Photo supprimée');
      if (onDataChange) onDataChange();
    } catch (error) {
      console.error('Gallery deletion failed:', error);
      showToast(lang === 'ar' ? 'تعذر حذف الصورة' : 'Impossible de supprimer la photo');
    }
  };

  // Handlers for Videos
  const handleCreateVideo = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      let oldFileCleanupFailed = false;
      if (editingVideo) {
        const { title_ar, title_fr, video_url, thumbnail_url, storage_path } = newVideo;
        const updated = await updateVideoItem(editingVideo.id, {
          title_ar, title_fr, video_url, thumbnail_url, storage_path
        });
        setVideos(prev => prev.map(item => item.id === editingVideo.id ? updated : item));
        if (editingVideo.storage_path && editingVideo.storage_path !== newVideo.storage_path) {
          try {
            await deleteStoredMedia(editingVideo.storage_path);
          } catch (error) {
            console.error('Old video file could not be removed:', error);
            oldFileCleanupFailed = true;
          }
        }
      } else {
        const created = await createVideoItem(newVideo);
        setVideos(prev => [created, ...prev]);
      }
      setShowVideoModal(false);
      setEditingVideo(null);
      setNewVideo({
        title_ar: '',
        title_fr: '',
        video_url: '/videos/presentation.mp4',
        thumbnail_url: '/images/graduation-award.png',
        storage_path: null
      });
      showToast(lang === 'ar'
        ? (oldFileCleanupFailed ? 'تم التعديل، لكن تعذر حذف الملف القديم من التخزين' : editingVideo ? 'تم تعديل الفيديو بنجاح' : 'تمت إضافة الفيديو بنجاح')
        : (oldFileCleanupFailed ? 'Modifié, mais l’ancien fichier n’a pas pu être supprimé' : editingVideo ? 'Vidéo modifiée' : 'Vidéo ajoutée'));
      if (onDataChange) onDataChange();
    } catch (err) {
      console.error(err);
      if (newVideo.storage_path && newVideo.storage_path !== editingVideo?.storage_path) {
        try {
          await deleteStoredMedia(newVideo.storage_path);
        } catch (cleanupError) {
          console.error('Unattached video upload could not be removed:', cleanupError);
        }
      }
      showToast(lang === 'ar' ? 'تعذر حفظ الفيديو، تحقق من الاتصال والتخزين' : 'Impossible d’enregistrer la vidéo');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteVideo = async (item) => {
    if (!window.confirm(lang === 'ar' ? 'هل تريد حذف هذا الفيديو؟' : 'Supprimer cette vidéo?')) return;
    try {
      await deleteVideoItem(item.id);
      setVideos(prev => prev.filter(videoItem => videoItem.id !== item.id));
      if (item.storage_path) {
        try {
          await deleteStoredMedia(item.storage_path);
        } catch (error) {
          console.error('Deleted video record but could not remove its file:', error);
          showToast(lang === 'ar' ? 'حُذف السجل، لكن تعذر حذف الملف من التخزين' : 'Entrée supprimée, mais le fichier n’a pas pu être supprimé');
          if (onDataChange) onDataChange();
          return;
        }
      }
      showToast(lang === 'ar' ? 'تم حذف الفيديو' : 'Vidéo supprimée');
      if (onDataChange) onDataChange();
    } catch (error) {
      console.error('Video deletion failed:', error);
      showToast(lang === 'ar' ? 'تعذر حذف الفيديو' : 'Impossible de supprimer la vidéo');
    }
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const updated = await updateSiteSettings(settingsForm);
      setSettings(updated);
      showToast(lang === 'ar' ? 'تم حفظ بيانات المؤسسة بنجاح' : 'Paramètres enregistrés');
      if (onDataChange) onDataChange();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Generic File Uploader Helper
  const handleFileUpload = async (e, callback, folder = 'uploads') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setActionLoading(true);
    try {
      const { url, storage_path } = await uploadMediaAsset(file, folder);
      callback(url, storage_path);
      showToast(lang === 'ar' ? 'تم رفع الملف بنجاح' : 'Fichier téléversé');
    } catch (err) {
      console.error('File upload error:', err);
      showToast(lang === 'ar' ? 'تعذر رفع الملف إلى التخزين' : 'Échec du téléversement');
    } finally {
      setActionLoading(false);
      e.target.value = '';
    }
  };

  // Filtered Inquiries calculation
  const filteredInquiries = inquiries.filter(inq => {
    const matchesFilter = inquiryFilter === 'all' || inq.status === inquiryFilter;
    const term = inquirySearch.toLowerCase().trim();
    if (!term) return matchesFilter;
    const matchesSearch = 
      (inq.student_name && inq.student_name.toLowerCase().includes(term)) ||
      (inq.parent_name && inq.parent_name.toLowerCase().includes(term)) ||
      (inq.phone && inq.phone.includes(term)) ||
      (inq.level_requested && inq.level_requested.toLowerCase().includes(term)) ||
      (inq.previous_school && inq.previous_school.toLowerCase().includes(term));
    return matchesFilter && matchesSearch;
  });

  // Metrics
  const pendingCount = inquiries.filter(i => i.status === 'pending').length;
  const contactedCount = inquiries.filter(i => i.status === 'contacted').length;
  const acceptedCount = inquiries.filter(i => i.status === 'accepted').length;

  return (
    <div className="admin-dashboard-container">
      {/* Toast Notification */}
      {successToast && (
        <div className="admin-toast">
          <CheckCircle size={18} />
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Admin Navbar */}
      <header className="admin-navbar">
        <div className="admin-nav-brand">
          <button 
            type="button" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="admin-btn-menu-toggle"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>

          <img src="/images/logo.png" alt="Logo" className="admin-nav-logo" />
          <div className="admin-nav-titles">
            <h1 className="admin-nav-title">
              {lang === 'ar' ? 'لوحة تحكم الإدارة العامة' : 'Direction Pédagogique'}
            </h1>
            <span className="admin-nav-subtitle">
              {lang === 'ar' ? 'ثانوية الفرح الخصوصية' : 'Lycée Collège El Farah Privé'}
            </span>
          </div>
        </div>

        <div className="admin-nav-actions">
          <button 
            type="button" 
            onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')}
            className="admin-lang-btn"
          >
            {lang === 'ar' ? 'Français' : 'العربية'}
          </button>

          <button 
            type="button"
            onClick={onBackToSite}
            className="admin-btn-view-site"
          >
            <ExternalLink size={16} />
            <span>{lang === 'ar' ? 'عرض الموقع' : 'Voir le site'}</span>
          </button>

          <button 
            type="button"
            onClick={logout}
            className="admin-btn-logout"
          >
            <LogOut size={16} />
            <span>{lang === 'ar' ? 'خروج' : 'Déconnexion'}</span>
          </button>
        </div>
      </header>

      {/* Dashboard Body */}
      <div className="admin-main-layout">
        {/* Sidebar Nav */}
        <aside className={`admin-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="admin-user-card">
            <div className="user-avatar">
              <School size={22} />
            </div>
            <div className="user-info">
              <span className="user-role">{lang === 'ar' ? 'مدير المؤسسة' : 'Directeur Général'}</span>
              <strong className="user-name">
                {settings?.director_name_ar || 'الأستاذ محمد فضلي'}
              </strong>
            </div>
          </div>

          <nav className="admin-menu">
            <button 
              type="button"
              className={`admin-menu-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
            >
              <LayoutDashboard size={18} />
              <span>{lang === 'ar' ? 'نظرة عامة' : 'Vue générale'}</span>
            </button>

            <button 
              type="button"
              className={`admin-menu-item ${activeTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => { setActiveTab('inquiries'); setIsSidebarOpen(false); }}
            >
              <Users size={18} />
              <span>{lang === 'ar' ? 'طلبات التسجيل' : 'Inscriptions'}</span>
              {pendingCount > 0 && <span className="menu-badge">{pendingCount}</span>}
            </button>

            <button 
              type="button"
              className={`admin-menu-item ${activeTab === 'pages' ? 'active' : ''}`}
              onClick={() => { setActiveTab('pages'); setIsSidebarOpen(false); }}
            >
              <Layers size={18} />
              <span>{lang === 'ar' ? 'القائمة والصفحات' : 'Pages & Navigation'}</span>
              <span className="menu-badge" style={{ background: '#8b5cf6' }}>{customPages.length}</span>
            </button>

            <button 
              type="button"
              className={`admin-menu-item ${activeTab === 'news' ? 'active' : ''}`}
              onClick={() => { setActiveTab('news'); setIsSidebarOpen(false); }}
            >
              <Newspaper size={18} />
              <span>{lang === 'ar' ? 'الأخبار والإعلانات' : 'Actualités'}</span>
            </button>

            <button 
              type="button"
              className={`admin-menu-item ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => { setActiveTab('gallery'); setIsSidebarOpen(false); }}
            >
              <ImageIcon size={18} />
              <span>{lang === 'ar' ? 'معرض الصور' : 'Galerie photos'}</span>
            </button>

            <button 
              type="button"
              className={`admin-menu-item ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => { setActiveTab('videos'); setIsSidebarOpen(false); }}
            >
              <Video size={18} />
              <span>{lang === 'ar' ? 'مكتبة الفيديو' : 'Vidéothèque'}</span>
            </button>

            <button 
              type="button"
              className={`admin-menu-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
            >
              <Settings size={18} />
              <span>{lang === 'ar' ? 'بيانات المؤسسة' : 'Paramètres'}</span>
            </button>
          </nav>
        </aside>

        {/* Tab Content */}
        <main className="admin-content-area">
          {loading ? (
            <div className="admin-loading-state">
              <RefreshCw size={36} className="spin" />
              <p>{lang === 'ar' ? 'جارٍ تحميل البيانات الإدارية...' : 'Chargement des données...'}</p>
            </div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="dashboard-tab-pane">
                  <div className="pane-header">
                    <div>
                      <h2>{lang === 'ar' ? 'لوحة القيادة المدرسية' : 'Tableau de bord'}</h2>
                      <p>{lang === 'ar' ? 'متابعة شاملة لطلبات التسجيل والمحتوى المنشور' : 'Suivi en temps réel de votre établissement'}</p>
                    </div>
                    <div className="pane-header-actions">
                      <button 
                        type="button"
                        onClick={() => setShowAddInquiryModal(true)}
                        className="btn-admin-action"
                      >
                        <UserPlus size={17} />
                        <span>{lang === 'ar' ? 'تسجيل جديد' : 'Nouvelle inscription'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="kpi-grid">
                    <div className="kpi-card kpi-orange">
                      <div className="kpi-icon"><Clock size={24} /></div>
                      <div className="kpi-details">
                        <span className="kpi-label">{lang === 'ar' ? 'طلبات قيد الانتظار' : 'Nouvelles demandes'}</span>
                        <strong className="kpi-number">{pendingCount}</strong>
                      </div>
                    </div>

                    <div className="kpi-card kpi-blue">
                      <div className="kpi-icon"><CheckCircle size={24} /></div>
                      <div className="kpi-details">
                        <span className="kpi-label">{lang === 'ar' ? 'إجمالي الطلبات' : 'Total inscriptions'}</span>
                        <strong className="kpi-number">{inquiries.length}</strong>
                      </div>
                    </div>

                    <div className="kpi-card kpi-primary">
                      <div className="kpi-icon"><Newspaper size={24} /></div>
                      <div className="kpi-details">
                        <span className="kpi-label">{lang === 'ar' ? 'الأخبار المنشورة' : 'Actualités'}</span>
                        <strong className="kpi-number">{news.length}</strong>
                      </div>
                    </div>

                    <div className="kpi-card kpi-cyan">
                      <div className="kpi-icon"><Layers size={24} /></div>
                      <div className="kpi-details">
                        <span className="kpi-label">{lang === 'ar' ? 'الصفحات المنشورة' : 'Pages actives'}</span>
                        <strong className="kpi-number">{customPages.length}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Recent Inquiries preview */}
                  <div className="admin-card-section">
                    <div className="card-section-header">
                      <h3>{lang === 'ar' ? 'أحدث طلبات التسجيل والاستفسار' : 'Dernières demandes reçues'}</h3>
                      <button 
                        type="button" 
                        onClick={() => setActiveTab('inquiries')}
                        className="btn-link"
                      >
                        {lang === 'ar' ? 'عرض الكل والفرز' : 'Voir tout'}
                      </button>
                    </div>

                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>{lang === 'ar' ? 'التلميذ(ة)' : 'Élève'}</th>
                            <th>{lang === 'ar' ? 'المستوى المطلوب' : 'Niveau'}</th>
                            <th>{lang === 'ar' ? 'ولي الأمر' : 'Parent'}</th>
                            <th>{lang === 'ar' ? 'الهاتف' : 'Téléphone'}</th>
                            <th>{lang === 'ar' ? 'الحالة' : 'Statut'}</th>
                            <th>{lang === 'ar' ? 'إجراءات' : 'Actions'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inquiries.slice(0, 5).map(inq => (
                            <tr key={inq.id}>
                              <td><strong>{inq.student_name}</strong></td>
                              <td><span className="level-badge">{inq.level_requested}</span></td>
                              <td>{inq.parent_name}</td>
                              <td dir="ltr">{inq.phone}</td>
                              <td>
                                <span className={`status-pill status-${inq.status}`}>
                                  {inq.status === 'pending' ? (lang === 'ar' ? 'قيد الانتظار' : 'En attente') :
                                   inq.status === 'contacted' ? (lang === 'ar' ? 'تم التواصل' : 'Contacté') :
                                   (lang === 'ar' ? 'مقبول' : 'Accepté')}
                                </span>
                              </td>
                              <td>
                                <div className="table-action-btns">
                                  <button 
                                    type="button"
                                    onClick={() => setSelectedInquiry(inq)}
                                    className="btn-icon-action btn-icon-view"
                                    title={lang === 'ar' ? 'عرض التفاصيل' : 'Détails'}
                                  >
                                    <Eye size={15} />
                                  </button>
                                  <a 
                                    href={getWhatsAppLink(inq.phone, inq.student_name)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-icon-action btn-icon-wa"
                                    title={lang === 'ar' ? 'مراسلة عبر واتساب' : 'WhatsApp'}
                                  >
                                    <MessageCircle size={15} />
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: INQUIRIES & REGISTRATIONS */}
              {activeTab === 'inquiries' && (
                <div className="dashboard-tab-pane">
                  <div className="pane-header">
                    <div>
                      <h2>{lang === 'ar' ? 'إدارة طلبات التسجيل والاستفسار' : 'Demandes d\'inscription & contact'}</h2>
                      <p>{lang === 'ar' ? 'متابعة واستقبال طلبات أولياء الأمور والتواصل المباشر عبر الهاتف والواتساب' : 'Traitez les demandes des parents d’élèves'}</p>
                    </div>
                    <div className="pane-header-actions">
                      <button 
                        type="button" 
                        onClick={() => setShowAddInquiryModal(true)}
                        className="btn-admin-action"
                      >
                        <UserPlus size={17} />
                        <span>{lang === 'ar' ? 'إضافة طلب يدوي' : 'Nouvelle inscription'}</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={exportInquiriesToCSV}
                        className="btn-admin-secondary"
                      >
                        <Download size={17} />
                        <span>{lang === 'ar' ? 'تصدير إلى Excel' : 'Exporter CSV'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Search and Filters Toolbar */}
                  <div className="inquiries-toolbar">
                    <div className="search-input-wrap">
                      <Search size={17} className="search-icon" />
                      <input 
                        type="text"
                        value={inquirySearch}
                        onChange={(e) => setInquirySearch(e.target.value)}
                        placeholder={lang === 'ar' ? 'بحث باسم التلميذ، ولي الأمر، المستوى، أو الهاتف...' : 'Rechercher par élève, parent, niveau ou tél...'}
                        className="search-field"
                      />
                    </div>

                    <div className="filter-pills">
                      <button 
                        type="button"
                        onClick={() => setInquiryFilter('all')}
                        className={`filter-pill ${inquiryFilter === 'all' ? 'active' : ''}`}
                      >
                        <span>{lang === 'ar' ? 'الكل' : 'Tous'}</span>
                        <span className="filter-pill-badge">{inquiries.length}</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setInquiryFilter('pending')}
                        className={`filter-pill ${inquiryFilter === 'pending' ? 'active' : ''}`}
                      >
                        <span>{lang === 'ar' ? 'قيد الانتظار' : 'En attente'}</span>
                        <span className="filter-pill-badge">{pendingCount}</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setInquiryFilter('contacted')}
                        className={`filter-pill ${inquiryFilter === 'contacted' ? 'active' : ''}`}
                      >
                        <span>{lang === 'ar' ? 'تم التواصل' : 'Contactés'}</span>
                        <span className="filter-pill-badge">{contactedCount}</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setInquiryFilter('accepted')}
                        className={`filter-pill ${inquiryFilter === 'accepted' ? 'active' : ''}`}
                      >
                        <span>{lang === 'ar' ? 'تم القبول' : 'Acceptés'}</span>
                        <span className="filter-pill-badge">{acceptedCount}</span>
                      </button>
                    </div>
                  </div>

                  <div className="admin-card-section">
                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>{lang === 'ar' ? 'التلميذ(ة)' : 'Élève'}</th>
                            <th>{lang === 'ar' ? 'المستوى' : 'Niveau'}</th>
                            <th>{lang === 'ar' ? 'ولي الأمر' : 'Parent'}</th>
                            <th>{lang === 'ar' ? 'الهاتف' : 'Téléphone'}</th>
                            <th>{lang === 'ar' ? 'المؤسسة السابقة' : 'École préc.'}</th>
                            <th>{lang === 'ar' ? 'ملاحظات' : 'Notes'}</th>
                            <th>{lang === 'ar' ? 'تاريخ الطلب' : 'Date'}</th>
                            <th>{lang === 'ar' ? 'الحالة' : 'Statut'}</th>
                            <th>{lang === 'ar' ? 'إجراءات' : 'Actions'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredInquiries.length === 0 ? (
                            <tr>
                              <td colSpan={9}>
                                <div className="empty-state-card">
                                  <Users size={36} className="empty-state-icon" />
                                  <p>{lang === 'ar' ? 'لا توجد نتائج مطابقة لخيارات البحث الحالية.' : 'Aucune demande ne correspond à votre recherche.'}</p>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            filteredInquiries.map(inq => (
                              <tr key={inq.id}>
                                <td><strong>{inq.student_name}</strong></td>
                                <td><span className="level-badge">{inq.level_requested}</span></td>
                                <td>{inq.parent_name}</td>
                                <td>
                                  <a href={`tel:${inq.phone}`} className="phone-link" dir="ltr">
                                    <Phone size={13} />
                                    {inq.phone}
                                  </a>
                                </td>
                                <td>{inq.previous_school || '-'}</td>
                                <td><span className="table-notes" title={inq.notes}>{inq.notes || '-'}</span></td>
                                <td className="text-muted text-sm">{inq.created_at ? new Date(inq.created_at).toLocaleDateString() : '-'}</td>
                                <td>
                                  <select 
                                    value={inq.status} 
                                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                                    className={`status-select status-${inq.status}`}
                                  >
                                    <option value="pending">{lang === 'ar' ? 'قيد الانتظار' : 'En attente'}</option>
                                    <option value="contacted">{lang === 'ar' ? 'تم التواصل' : 'Contacté'}</option>
                                    <option value="accepted">{lang === 'ar' ? 'تم القبول' : 'Accepté'}</option>
                                  </select>
                                </td>
                                <td>
                                  <div className="table-action-btns">
                                    <button 
                                      type="button" 
                                      onClick={() => setSelectedInquiry(inq)}
                                      className="btn-icon-action btn-icon-view"
                                      title={lang === 'ar' ? 'معاينة كامل التفاصيل' : 'Détails'}
                                    >
                                      <Eye size={15} />
                                    </button>
                                    <a 
                                      href={getWhatsAppLink(inq.phone, inq.student_name)}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="btn-icon-action btn-icon-wa"
                                      title={lang === 'ar' ? 'محادثة واتساب' : 'WhatsApp'}
                                    >
                                      <MessageCircle size={15} />
                                    </a>
                                    <button 
                                      type="button" 
                                      onClick={() => handleDeleteInquiry(inq.id)}
                                      className="btn-icon-delete"
                                      title={lang === 'ar' ? 'حذف' : 'Supprimer'}
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PAGES & NAVIGATION (MANAGEMENT OF MAIN MENU & CUSTOM PAGES) */}
              {activeTab === 'pages' && (
                <div className="dashboard-tab-pane">
                  <div className="pane-header">
                    <div>
                      <h2>{lang === 'ar' ? 'إدارة القائمة الرئيسية والصفحات' : 'Gestion du Menu & des Pages'}</h2>
                      <p>{lang === 'ar' ? 'تحكم كامل في روابط القائمة العلوية، إضافة أو حذف عناصر، وإنشاء صفحات مخصصة' : 'Personnalisez le menu de navigation et créez de nouvelles pages'}</p>
                    </div>
                    <div className="pane-header-actions">
                      <button 
                        type="button" 
                        onClick={handleOpenAddNavModal}
                        className="btn-admin-action"
                      >
                        <Plus size={17} />
                        <span>{lang === 'ar' ? 'إضافة عنصر للقائمة' : 'Ajouter un lien menu'}</span>
                      </button>
                      <button 
                        type="button" 
                        onClick={handleOpenAddPageModal}
                        className="btn-admin-secondary"
                      >
                        <BookOpen size={17} />
                        <span>{lang === 'ar' ? 'إنشاء صفحة جديدة' : 'Créer une page'}</span>
                      </button>
                    </div>
                  </div>

                  {/* HERO & HOME PAGE QUICK EDIT BANNER */}
                  <div className="home-page-edit-banner mb-4">
                    <div className="home-page-edit-info">
                      <div className="home-page-icon-badge">
                        <School size={22} />
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: '#0f2b5c', fontWeight: 800 }}>
                          {lang === 'ar' ? 'الصفحة الرئيسية للموقع (Accueil)' : 'Page d\'Accueil'}
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b' }}>
                          {lang === 'ar' ? 'تعديل اسم المؤسسة، الشعار، كلمة المدير، ومعلومات الاتصال الرسمية' : 'Modifier les textes de présentation et coordonnées officielles'}
                        </p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setActiveTab('settings')}
                      className="btn-admin-action"
                    >
                      <Edit3 size={15} />
                      <span>{lang === 'ar' ? 'تعديل الصفحة الرئيسية' : 'Modifier l\'accueil'}</span>
                    </button>
                  </div>

                  {/* SECTION 1: MAIN NAVIGATION MENU ITEMS */}
                  <div className="admin-card-section mb-5">
                    <div className="card-section-header">
                      <div>
                        <h3>{lang === 'ar' ? 'عناصر القائمة الرئيسية الحالية' : 'Éléments du Menu Principal'}</h3>
                        <span className="text-muted text-sm">{lang === 'ar' ? 'يمكنك إعادة الترتيب بواسطة الأسهم، أو الإخفاء بنقرة، أو الحذف والتعديل' : 'Réorganisez l\'ordre, masquez ou modifiez chaque élément'}</span>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th style={{ width: '80px' }}>{lang === 'ar' ? 'الترتيب' : 'Ordre'}</th>
                            <th>{lang === 'ar' ? 'العنوان بالعربية' : 'Titre (Arabe)'}</th>
                            <th>{lang === 'ar' ? 'العنوان بالفرنسية' : 'Titre (Français)'}</th>
                            <th>{lang === 'ar' ? 'نوع الرابط' : 'Type'}</th>
                            <th>{lang === 'ar' ? 'الوجهة / الهدف' : 'Cible'}</th>
                            <th>{lang === 'ar' ? 'الظهور' : 'Visibilité'}</th>
                            <th>{lang === 'ar' ? 'إجراءات' : 'Actions'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {navItems.map((item, index) => (
                            <tr key={item.id}>
                              <td>
                                <div className="nav-order-controls">
                                  <button 
                                    type="button" 
                                    disabled={index === 0}
                                    onClick={() => handleMoveNavOrder(index, 'up')}
                                    className="btn-order"
                                    title={lang === 'ar' ? 'تحريك لأعلى' : 'Monter'}
                                  >
                                    <ArrowUp size={13} />
                                  </button>
                                  <button 
                                    type="button" 
                                    disabled={index === navItems.length - 1}
                                    onClick={() => handleMoveNavOrder(index, 'down')}
                                    className="btn-order"
                                    title={lang === 'ar' ? 'تحريك لأسفل' : 'Descendre'}
                                  >
                                    <ArrowDown size={13} />
                                  </button>
                                </div>
                              </td>
                              <td><strong>{item.label_ar || item.label}</strong></td>
                              <td>{item.label_fr || item.label}</td>
                              <td>
                                <span className={`nav-type-badge nav-type-${item.type || 'section'}`}>
                                  {item.type === 'page' ? (lang === 'ar' ? 'صفحة مخصصة' : 'Page') :
                                   item.type === 'link' ? (lang === 'ar' ? 'رابط خارجي' : 'Lien Web') :
                                   (lang === 'ar' ? 'قسم بالرئيسية' : 'Section')}
                                </span>
                              </td>
                              <td>
                                <span className="nav-target-code">{item.target}</span>
                              </td>
                              <td>
                                <button 
                                  type="button"
                                  onClick={() => handleToggleNavVisibility(item.id, item.is_visible !== false)}
                                  className={`btn-toggle-vis ${item.is_visible !== false ? 'visible' : 'hidden'}`}
                                  title={item.is_visible !== false ? (lang === 'ar' ? 'مرئي (انقر للإخفاء)' : 'Visible') : (lang === 'ar' ? 'مخفي (انقر للإظهار)' : 'Masqué')}
                                >
                                  {item.is_visible !== false ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                              </td>
                              <td>
                                <div className="table-action-btns">
                                  <button 
                                    type="button"
                                    onClick={() => handleOpenEditNavModal(item)}
                                    className="btn-admin-edit-badge"
                                    title={lang === 'ar' ? 'تعديل الرابط' : 'Modifier'}
                                  >
                                    <Edit3 size={13} />
                                    <span>{lang === 'ar' ? 'تعديل الرابط' : 'Modifier'}</span>
                                  </button>
                                  <button 
                                    type="button"
                                    onClick={() => handleDeleteNavItem(item.id)}
                                    className="btn-icon-delete"
                                    title={lang === 'ar' ? 'حذف من القائمة' : 'Supprimer'}
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* SECTION 2: CUSTOM PAGES MANAGEMENT */}
                  <div className="admin-card-section mt-4">
                    <div className="card-section-header">
                      <div>
                        <h3>{lang === 'ar' ? 'الصفحات المخصصة والمحتوى' : 'Pages de Contenu Spécifiques'}</h3>
                        <span className="text-muted text-sm">{lang === 'ar' ? 'صفحات مستقلة مثل (القانون الداخلي، النقل المدرسي، التوجيه...) يمكن ربطها بالقائمة الرئيسية' : 'Pages autonomes publiées sur le site'}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={handleOpenAddPageModal}
                        className="btn-admin-action"
                      >
                        <Plus size={16} />
                        <span>{lang === 'ar' ? 'صفحة جديدة' : 'Nouvelle page'}</span>
                      </button>
                    </div>

                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>{lang === 'ar' ? 'عنوان الصفحة' : 'Titre de la page'}</th>
                            <th>{lang === 'ar' ? 'الرابط (Slug)' : 'Lien (Slug)'}</th>
                            <th>{lang === 'ar' ? 'الحالة' : 'Statut'}</th>
                            <th>{lang === 'ar' ? 'تاريخ الإنشاء' : 'Date'}</th>
                            <th>{lang === 'ar' ? 'إجراءات سريعة' : 'Actions'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customPages.length === 0 ? (
                            <tr>
                              <td colSpan={5}>
                                <div className="empty-state-card">
                                  <BookOpen size={36} className="empty-state-icon" />
                                  <p>{lang === 'ar' ? 'لم تقم بإنشاء أي صفحات مخصصة بعد.' : 'Aucune page personnalisée.'}</p>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            customPages.map(page => {
                              const isLinked = navItems.some(n => n.target === page.slug || n.target === `page:${page.slug}`);
                              return (
                                <tr key={page.id}>
                                  <td>
                                    <div>
                                      <strong>{lang === 'ar' ? page.title_ar : page.title_fr}</strong>
                                      {page.subtitle_ar && <span className="d-block text-muted text-sm">{page.subtitle_ar}</span>}
                                    </div>
                                  </td>
                                  <td>
                                    <span className="page-slug-badge">/page/{page.slug}</span>
                                  </td>
                                  <td>
                                    <span className={page.is_published !== false ? 'badge-published' : 'badge-draft'}>
                                      {page.is_published !== false ? (lang === 'ar' ? 'منشورة' : 'Publiée') : (lang === 'ar' ? 'مسودة' : 'Brouillon')}
                                    </span>
                                  </td>
                                  <td className="text-muted text-sm">
                                    {page.created_at ? new Date(page.created_at).toLocaleDateString() : '-'}
                                  </td>
                                  <td>
                                    <div className="table-action-btns">
                                      {!isLinked ? (
                                        <button 
                                          type="button" 
                                          onClick={() => handleAddPageToMenuQuick(page)}
                                          className="btn-add-to-menu"
                                          title={lang === 'ar' ? 'إضافة إلى القائمة الرئيسية' : 'Ajouter au menu'}
                                        >
                                          <Plus size={14} />
                                          <span>{lang === 'ar' ? 'إضافة للقائمة' : 'Au menu'}</span>
                                        </button>
                                      ) : (
                                        <span className="text-muted text-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#10b981' }}>
                                          <Check size={14} />
                                          <span>{lang === 'ar' ? 'بالقائمة' : 'Dans menu'}</span>
                                        </span>
                                      )}

                                      <button 
                                        type="button"
                                        onClick={() => handleOpenEditPageModal(page)}
                                        className="btn-admin-edit-page-badge"
                                        title={lang === 'ar' ? 'تعديل محتوى وبيانات هذه الصفحة' : 'Modifier la page'}
                                      >
                                        <Edit3 size={14} />
                                        <span>{lang === 'ar' ? 'تعديل الصفحة' : 'Modifier la page'}</span>
                                      </button>

                                      <button 
                                        type="button"
                                        onClick={() => handleDeletePage(page.id, page.slug)}
                                        className="btn-icon-delete"
                                        title={lang === 'ar' ? 'حذف الصفحة' : 'Supprimer'}
                                      >
                                        <Trash2 size={15} />
                                      </button>
                                    </div>

                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: NEWS & ANNOUNCEMENTS */}
              {activeTab === 'news' && (
                <div className="dashboard-tab-pane">
                  <div className="pane-header">
                    <div>
                      <h2>{lang === 'ar' ? 'إدارة الأخبار والإعلانات' : 'Actualités & Annonces'}</h2>
                      <p>{lang === 'ar' ? 'نشر وتعديل الأنشطة المدرسية، الرحلات، وحفلات التخرج' : 'Publiez les temps forts de l\'établissement'}</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setShowNewsModal(true)}
                      className="btn-admin-action"
                    >
                      <Plus size={18} />
                      <span>{lang === 'ar' ? 'إضافة مقال جديد' : 'Nouvel article'}</span>
                    </button>
                  </div>

                  <div className="admin-grid-cards">
                    {news.map(item => (
                      <div key={item.id} className="admin-news-card">
                        <div className="card-thumb-wrap">
                          <img src={item.image_url} alt={item.title_ar} className="card-thumb" />
                          <span className="card-cat-badge">{lang === 'ar' ? item.category_ar || item.category : item.category_fr || item.category}</span>
                        </div>
                        <div className="card-body">
                          <h4 className="card-title">{lang === 'ar' ? item.title_ar : item.title_fr}</h4>
                          <p className="card-excerpt">{lang === 'ar' ? item.summary_ar : item.summary_fr}</p>
                          <div className="card-footer-info">
                            <span className="card-date">{item.publish_date}</span>
                            <div className="card-actions-row">
                              <button 
                                type="button" 
                                onClick={() => setEditingNews(item)}
                                className="btn-icon-edit"
                                title={lang === 'ar' ? 'تعديل المقال' : 'Modifier'}
                              >
                                <Edit3 size={15} />
                              </button>
                              <button 
                                type="button" 
                                onClick={() => handleDeleteNews(item.id)}
                                className="btn-icon-delete"
                                title={lang === 'ar' ? 'حذف المقال' : 'Supprimer'}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: GALLERY */}
              {activeTab === 'gallery' && (
                <div className="dashboard-tab-pane">
                  <div className="pane-header">
                    <div>
                      <h2>{lang === 'ar' ? 'معرض صور المؤسسة' : 'Galerie d\'images'}</h2>
                      <p>{lang === 'ar' ? 'إدارة صور الحرم المدرسي، الأنشطة، وحفلات التخرج' : 'Gérez les photographies officielles'}</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingGallery(null);
                        setNewGallery({
                          title_ar: '',
                          title_fr: '',
                          category: 'campus',
                          image_url: '/images/building.png',
                          storage_path: null
                        });
                        setShowGalleryModal(true);
                      }}
                      className="btn-admin-action"
                    >
                      <Plus size={18} />
                      <span>{lang === 'ar' ? 'إضافة صورة' : 'Ajouter une photo'}</span>
                    </button>
                  </div>

                  <div className="gallery-admin-grid">
                    {gallery.map(item => (
                      <div key={item.id} className="gallery-admin-item">
                        <img src={item.image_url} alt={item.title_ar} />
                        <div className="gallery-admin-overlay">
                          <span className="gal-title">{lang === 'ar' ? item.title_ar : item.title_fr}</span>
                          <div className="media-admin-actions">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingGallery(item);
                                setNewGallery({ ...item });
                                setShowGalleryModal(true);
                              }}
                              className="btn-icon-edit"
                              title={lang === 'ar' ? 'تعديل الصورة' : 'Modifier la photo'}
                              aria-label={lang === 'ar' ? 'تعديل الصورة' : 'Modifier la photo'}
                            >
                              <Edit3 size={15} />
                            </button>
                            <button 
                              type="button"
                              onClick={() => handleDeleteGallery(item)}
                              className="btn-gal-del"
                              title={lang === 'ar' ? 'حذف' : 'Supprimer'}
                              aria-label={lang === 'ar' ? 'حذف الصورة' : 'Supprimer la photo'}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: VIDEOS */}
              {activeTab === 'videos' && (
                <div className="dashboard-tab-pane">
                  <div className="pane-header">
                    <div>
                      <h2>{lang === 'ar' ? 'مكتبة الفيديو' : 'Vidéothèque officielle'}</h2>
                      <p>{lang === 'ar' ? 'الفيديوهات التعريفية وتغطيات الأنشطة الطلابية' : 'Vidéos de présentation et reportages'}</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingVideo(null);
                        setNewVideo({
                          title_ar: '',
                          title_fr: '',
                          video_url: '',
                          thumbnail_url: '/images/graduation-award.png',
                          storage_path: null
                        });
                        setShowVideoModal(true);
                      }}
                      className="btn-admin-action"
                    >
                      <Plus size={18} />
                      <span>{lang === 'ar' ? 'إضافة فيديو' : 'Ajouter une vidéo'}</span>
                    </button>
                  </div>

                  <div className="videos-admin-grid">
                    {videos.map(item => (
                      <div key={item.id} className="video-admin-card">
                        <video controls poster={item.thumbnail_url} className="video-player-preview">
                          <source src={item.video_url} />
                        </video>
                        <div className="video-card-info">
                          <h4>{lang === 'ar' ? item.title_ar : item.title_fr}</h4>
                          <div className="media-admin-actions">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingVideo(item);
                                setNewVideo({ ...item });
                                setShowVideoModal(true);
                              }}
                              className="btn-icon-edit"
                              title={lang === 'ar' ? 'تعديل الفيديو' : 'Modifier la vidéo'}
                              aria-label={lang === 'ar' ? 'تعديل الفيديو' : 'Modifier la vidéo'}
                            >
                              <Edit3 size={15} />
                            </button>
                            <button 
                              type="button"
                              onClick={() => handleDeleteVideo(item)}
                              className="btn-icon-delete"
                              title={lang === 'ar' ? 'حذف' : 'Supprimer'}
                              aria-label={lang === 'ar' ? 'حذف الفيديو' : 'Supprimer la vidéo'}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="dashboard-tab-pane">
                  <div className="pane-header">
                    <div>
                      <h2>{lang === 'ar' ? 'البيانات الرسمية للمؤسسة' : 'Informations officielles'}</h2>
                      <p>{lang === 'ar' ? 'تعديل أرقام الهاتف، العنوان، وبيانات الإدارة' : 'Coordonnées administratives'}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveSettings} className="admin-form-box">
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label>{lang === 'ar' ? 'اسم المؤسسة (بالعربية)' : 'Nom de l\'établissement (Arabe)'}</label>
                        <input 
                          type="text" 
                          value={settingsForm.school_name_ar}
                          onChange={(e) => setSettingsForm({ ...settingsForm, school_name_ar: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>{lang === 'ar' ? 'اسم المؤسسة (بالفرنسية)' : 'Nom de l\'établissement (Français)'}</label>
                        <input 
                          type="text" 
                          value={settingsForm.school_name_fr}
                          onChange={(e) => setSettingsForm({ ...settingsForm, school_name_fr: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>{lang === 'ar' ? 'رقم الهاتف الرسمي' : 'Téléphone fixe'}</label>
                        <input 
                          type="text" 
                          value={settingsForm.phone}
                          onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                          required
                          dir="ltr"
                        />
                      </div>

                      <div className="form-group">
                        <label>{lang === 'ar' ? 'البريد الإلكتروني الرسمي' : 'E-mail institutionnel'}</label>
                        <input 
                          type="email" 
                          value={settingsForm.email}
                          onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                          required
                          dir="ltr"
                        />
                      </div>

                      <div className="form-group">
                        <label>{lang === 'ar' ? 'اسم المدير' : 'Directeur'}</label>
                        <input 
                          type="text" 
                          value={settingsForm.director_name_ar}
                          onChange={(e) => setSettingsForm({ ...settingsForm, director_name_ar: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label>{lang === 'ar' ? 'رقم الترخيص الوزاري (اختياري)' : 'N° d\'autorisation (Optionnel)'}</label>
                        <input 
                          type="text" 
                          value={settingsForm.authorization_number}
                          onChange={(e) => setSettingsForm({ ...settingsForm, authorization_number: e.target.value })}
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="form-group mt-3">
                      <label>{lang === 'ar' ? 'العنوان الكامل' : 'Adresse complète'}</label>
                      <input 
                        type="text" 
                        value={settingsForm.address_ar}
                        onChange={(e) => setSettingsForm({ ...settingsForm, address_ar: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group mt-3">
                      <label>{lang === 'ar' ? 'الشعار المؤسسي' : 'Slogan officiel'}</label>
                      <input 
                        type="text" 
                        value={settingsForm.slogan_ar}
                        onChange={(e) => setSettingsForm({ ...settingsForm, slogan_ar: e.target.value })}
                      />
                    </div>

                    <div className="form-actions mt-4">
                      <button 
                        type="submit" 
                        disabled={actionLoading}
                        className="btn-admin-action"
                      >
                        <CheckCircle size={18} />
                        <span>{lang === 'ar' ? 'حفظ التعديلات' : 'Enregistrer les modifications'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* MODAL: ADD / EDIT NAVIGATION MENU ITEM */}
      {showNavModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowNavModal(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {editingNavItem 
                  ? (lang === 'ar' ? 'تعديل عنصر في القائمة الرئيسية' : 'Modifier le lien du menu')
                  : (lang === 'ar' ? 'إضافة عنصر جديد للقائمة الرئيسية' : 'Ajouter un lien au menu')}
              </h3>
              <button type="button" onClick={() => setShowNavModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveNavItem} className="modal-form">
              <div className="form-group">
                <label>{lang === 'ar' ? 'اسم العنصر في القائمة (بالعربية) *' : 'Libellé (Arabe) *'}</label>
                <input 
                  type="text" 
                  value={navForm.label_ar}
                  onChange={(e) => setNavForm({ ...navForm, label_ar: e.target.value })}
                  placeholder={lang === 'ar' ? 'مثال: القانون الداخلي' : 'Ex: Règlement intérieur'}
                  required
                />
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'اسم العنصر في القائمة (بالفرنسية) *' : 'Libellé (Français) *'}</label>
                <input 
                  type="text" 
                  value={navForm.label_fr}
                  onChange={(e) => setNavForm({ ...navForm, label_fr: e.target.value })}
                  placeholder="Ex: Règlement Intérieur"
                  required
                />
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'نوع الرابط *' : 'Type de lien *'}</label>
                <select 
                  value={navForm.type}
                  onChange={(e) => {
                    const newType = e.target.value;
                    let defTarget = 'home';
                    if (newType === 'page' && customPages.length > 0) {
                      defTarget = customPages[0].slug;
                    } else if (newType === 'link') {
                      defTarget = 'https://';
                    }
                    setNavForm({ ...navForm, type: newType, target: defTarget });
                  }}
                >
                  <option value="section">{lang === 'ar' ? 'قسم بالصفحة الرئيسية (انتقال سلس)' : 'Section sur la page d\'accueil'}</option>
                  <option value="page">{lang === 'ar' ? 'صفحة مخصصة من صفحات الموقع' : 'Page personnalisée'}</option>
                  <option value="link">{lang === 'ar' ? 'رابط خارجي مخصص' : 'Lien externe'}</option>
                </select>
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'الوجهة / الرابط المطلوب *' : 'Cible / Destination *'}</label>
                {navForm.type === 'section' && (
                  <select 
                    value={navForm.target}
                    onChange={(e) => setNavForm({ ...navForm, target: e.target.value })}
                  >
                    <option value="home">{lang === 'ar' ? 'الرئيسية (#home)' : 'Accueil (#home)'}</option>
                    <option value="about">{lang === 'ar' ? 'عن المؤسسة (#about)' : 'À propos (#about)'}</option>
                    <option value="levels">{lang === 'ar' ? 'الأسلاك التعليمية (#levels)' : 'Cycles scolaires (#levels)'}</option>
                    <option value="activities">{lang === 'ar' ? 'الأنشطة المدرسية (#activities)' : 'Activités (#activities)'}</option>
                    <option value="gallery">{lang === 'ar' ? 'معرض الصور (#gallery)' : 'Galerie (#gallery)'}</option>
                    <option value="videos">{lang === 'ar' ? 'الفيديوهات (#videos)' : 'Vidéos (#videos)'}</option>
                    <option value="news">{lang === 'ar' ? 'الأخبار والإعلانات (#news)' : 'Actualités (#news)'}</option>
                    <option value="contact">{lang === 'ar' ? 'اتصل بنا (#contact)' : 'Contact (#contact)'}</option>
                  </select>
                )}

                {navForm.type === 'page' && (
                  customPages.length > 0 ? (
                    <select 
                      value={navForm.target}
                      onChange={(e) => setNavForm({ ...navForm, target: e.target.value })}
                    >
                      {customPages.map(page => (
                        <option key={page.id} value={page.slug}>
                          {lang === 'ar' ? page.title_ar : page.title_fr} (/page/{page.slug})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-muted text-sm">{lang === 'ar' ? 'لا توجد صفحات مخصصة بعد، يرجى إنشاء صفحة أولاً.' : 'Aucune page personnalisée créée.'}</p>
                  )
                )}

                {navForm.type === 'link' && (
                  <input 
                    type="url"
                    value={navForm.target}
                    onChange={(e) => setNavForm({ ...navForm, target: e.target.value })}
                    placeholder="https://example.com"
                    dir="ltr"
                    required
                  />
                )}
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox"
                    checked={navForm.is_visible}
                    onChange={(e) => setNavForm({ ...navForm, is_visible: e.target.checked })}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span>{lang === 'ar' ? 'إظهار هذا العنصر مباشرة في شريط القائمة الرئيسية' : 'Afficher ce lien dans le menu'}</span>
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowNavModal(false)} className="btn-cancel">
                  {lang === 'ar' ? 'إلغاء' : 'Annuler'}
                </button>
                <button type="submit" disabled={actionLoading} className="btn-admin-action">
                  {lang === 'ar' ? 'حفظ العنصر' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE / EDIT CUSTOM PAGE */}
      {showPageModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowPageModal(false)}>
          <div className="admin-modal-card" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {editingPage 
                  ? (lang === 'ar' ? 'تعديل الصفحة المخصصة' : 'Modifier la page')
                  : (lang === 'ar' ? 'إنشاء صفحة جديدة' : 'Créer une nouvelle page')}
              </h3>
              <button type="button" onClick={() => setShowPageModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSavePage} className="modal-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>{lang === 'ar' ? 'عنوان الصفحة (بالعربية) *' : 'Titre (Arabe) *'}</label>
                  <input 
                    type="text" 
                    value={pageForm.title_ar}
                    onChange={(e) => setPageForm({ ...pageForm, title_ar: e.target.value })}
                    placeholder="مثال: القانون الداخلي للمؤسسة"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{lang === 'ar' ? 'عنوان الصفحة (بالفرنسية) *' : 'Titre (Français) *'}</label>
                  <input 
                    type="text" 
                    value={pageForm.title_fr}
                    onChange={(e) => {
                      const fr = e.target.value;
                      const autoSlug = fr.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                      setPageForm({ 
                        ...pageForm, 
                        title_fr: fr,
                        slug: (!editingPage && !pageForm.slug) ? autoSlug : pageForm.slug 
                      });
                    }}
                    placeholder="Ex: Règlement Intérieur"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'معرف الرابط (Slug) *' : 'Identifiant URL (Slug) *'}</label>
                <input 
                  type="text" 
                  value={pageForm.slug}
                  onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '-') })}
                  placeholder="reglement-interieur"
                  dir="ltr"
                  required
                />
                <span className="text-muted text-sm">{lang === 'ar' ? `سيكون رابط الصفحة: /page/${pageForm.slug || '...'}` : `URL finale : /page/${pageForm.slug || '...'}`}</span>
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'الوصف الفرعي (عربي)' : 'Sous-titre (Arabe)'}</label>
                <input 
                  type="text" 
                  value={pageForm.subtitle_ar}
                  onChange={(e) => setPageForm({ ...pageForm, subtitle_ar: e.target.value })}
                  placeholder="ميثاق الحقوق والواجبات والانضباط المدرسي"
                />
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'محتوى الصفحة (بالعربية) *' : 'Contenu de la page (Arabe) *'}</label>
                <textarea 
                  rows={6}
                  value={pageForm.content_ar}
                  onChange={(e) => setPageForm({ ...pageForm, content_ar: e.target.value })}
                  placeholder="اكتب تفاصيل ومحتوى الصفحة هنا، يمكنك استخدام الأسطر وفقرات مرقمة أو علامات التنقيط..."
                  required
                />
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'محتوى الصفحة (بالفرنسية)' : 'Contenu de la page (Français)'}</label>
                <textarea 
                  rows={4}
                  value={pageForm.content_fr}
                  onChange={(e) => setPageForm({ ...pageForm, content_fr: e.target.value })}
                  placeholder="Contenu détaillé en français..."
                />
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'صورة الغلاف (رابط أو رفع ملف)' : 'Image de couverture'}</label>
                <div className="file-input-row">
                  <input 
                    type="text" 
                    value={pageForm.image_url} 
                    onChange={(e) => setPageForm({ ...pageForm, image_url: e.target.value })} 
                  />
                  <label className="btn-upload-file">
                    <Upload size={16} />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, (url) => setPageForm(prev => ({ ...prev, image_url: url })))} 
                      hidden 
                    />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox"
                    checked={pageForm.is_published}
                    onChange={(e) => setPageForm({ ...pageForm, is_published: e.target.checked })}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span>{lang === 'ar' ? 'نشر الصفحة وإتاحتها للزوار' : 'Publier immédiatement la page'}</span>
                </label>
              </div>

              {!editingPage && (
                <div className="form-group" style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', margin: 0 }}>
                    <input 
                      type="checkbox"
                      checked={pageForm.addToMenu}
                      onChange={(e) => setPageForm({ ...pageForm, addToMenu: e.target.checked })}
                      style={{ width: '18px', height: '18px' }}
                    />
                    <span style={{ fontWeight: 700, color: '#0f2b5c' }}>
                      {lang === 'ar' ? 'إضافة رابط هذه الصفحة تلقائياً إلى القائمة الرئيسية للموقع' : 'Ajouter automatiquement ce lien au menu principal'}
                    </span>
                  </label>
                </div>
              )}

              <div className="modal-actions">
                <button type="button" onClick={() => setShowPageModal(false)} className="btn-cancel">
                  {lang === 'ar' ? 'إلغاء' : 'Annuler'}
                </button>
                <button type="submit" disabled={actionLoading} className="btn-admin-action">
                  {lang === 'ar' ? 'حفظ الصفحة' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW INQUIRY DETAILS */}
      {selectedInquiry && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedInquiry(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{lang === 'ar' ? 'تفاصيل طلب التسجيل' : 'Détails de l\'inscription'}</h3>
              <button type="button" onClick={() => setSelectedInquiry(null)}><X size={20} /></button>
            </div>
            <div className="inquiry-detail-body">
              <div className="inquiry-quick-header">
                <div>
                  <h4 className="inquiry-student-title">{selectedInquiry.student_name}</h4>
                  <span className="level-badge">{selectedInquiry.level_requested}</span>
                </div>
                <span className={`status-pill status-${selectedInquiry.status}`}>
                  {selectedInquiry.status === 'pending' ? (lang === 'ar' ? 'قيد الانتظار' : 'En attente') :
                   selectedInquiry.status === 'contacted' ? (lang === 'ar' ? 'تم التواصل' : 'Contacté') :
                   (lang === 'ar' ? 'مقبول' : 'Accepté')}
                </span>
              </div>

              <div className="detail-info-grid">
                <div className="detail-item">
                  <span className="detail-label">{lang === 'ar' ? 'ولي الأمر' : 'Parent / Tuteur'}</span>
                  <span className="detail-val">{selectedInquiry.parent_name || '-'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">{lang === 'ar' ? 'الهاتف' : 'Téléphone'}</span>
                  <span className="detail-val" dir="ltr">{selectedInquiry.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">{lang === 'ar' ? 'البريد الإلكتروني' : 'E-mail'}</span>
                  <span className="detail-val" dir="ltr">{selectedInquiry.email || '-'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">{lang === 'ar' ? 'المؤسسة السابقة' : 'Établissement précédent'}</span>
                  <span className="detail-val">{selectedInquiry.previous_school || '-'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">{lang === 'ar' ? 'تاريخ تقديم الطلب' : 'Date de la demande'}</span>
                  <span className="detail-val">
                    {selectedInquiry.created_at ? new Date(selectedInquiry.created_at).toLocaleString() : '-'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">{lang === 'ar' ? 'تغيير الحالة مباشرة' : 'Modifier le statut'}</span>
                  <select 
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                    className={`status-select status-${selectedInquiry.status}`}
                  >
                    <option value="pending">{lang === 'ar' ? 'قيد الانتظار' : 'En attente'}</option>
                    <option value="contacted">{lang === 'ar' ? 'تم التواصل' : 'Contacté'}</option>
                    <option value="accepted">{lang === 'ar' ? 'تم القبول' : 'Accepté'}</option>
                  </select>
                </div>
              </div>

              {selectedInquiry.notes && (
                <div className="detail-item">
                  <span className="detail-label">{lang === 'ar' ? 'الملاحظات / رسالة ولي الأمر' : 'Notes ou message'}</span>
                  <div className="detail-notes-box">
                    {selectedInquiry.notes}
                  </div>
                </div>
              )}

              <div className="detail-action-buttons">
                <a 
                  href={`tel:${selectedInquiry.phone}`} 
                  className="btn-call-parent"
                >
                  <Phone size={16} />
                  <span>{lang === 'ar' ? 'اتصال هاتفي مباشر' : 'Appeler'}</span>
                </a>
                <a 
                  href={getWhatsAppLink(selectedInquiry.phone, selectedInquiry.student_name)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp-parent"
                >
                  <MessageCircle size={16} />
                  <span>{lang === 'ar' ? 'مراسلة عبر واتساب' : 'Message WhatsApp'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD MANUAL INQUIRY */}
      {showAddInquiryModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowAddInquiryModal(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{lang === 'ar' ? 'تسجيل طلب طالب جديد يدوياً' : 'Nouvelle inscription manuelle'}</h3>
              <button type="button" onClick={() => setShowAddInquiryModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleManualInquirySubmit} className="modal-form">
              <div className="form-group">
                <label>{lang === 'ar' ? 'اسم التلميذ الكامل *' : 'Nom et prénom de l\'élève *'}</label>
                <input 
                  type="text" 
                  value={manualInquiry.student_name}
                  onChange={(e) => setManualInquiry({ ...manualInquiry, student_name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'المستوى المطلوب *' : 'Niveau souhaité *'}</label>
                <select 
                  value={manualInquiry.level_requested}
                  onChange={(e) => setManualInquiry({ ...manualInquiry, level_requested: e.target.value })}
                >
                  <optgroup label={lang === 'ar' ? 'السلك الإعدادي' : 'Collège'}>
                    <option value="1ère Année Collège (1AC)">1ère Année Collège (1AC)</option>
                    <option value="2ème Année Collège (2AC)">2ème Année Collège (2AC)</option>
                    <option value="3ème Année Collège (3AC)">3ème Année Collège (3AC)</option>
                  </optgroup>
                  <optgroup label={lang === 'ar' ? 'السلك التأهيلي' : 'Lycée'}>
                    <option value="Tronc Commun Scientifique">Tronc Commun Scientifique</option>
                    <option value="Tronc Commun Lettres & Humaines">Tronc Commun Lettres & Humaines</option>
                    <option value="1BAC Sciences Expérimentales">1BAC Sciences Expérimentales</option>
                    <option value="1BAC Sciences Mathématiques">1BAC Sciences Mathématiques</option>
                    <option value="1BAC Sciences Économiques">1BAC Sciences Économiques</option>
                    <option value="2BAC Sciences Physiques">2BAC Sciences Physiques</option>
                    <option value="2BAC Sciences de la Vie et de la Terre (SVT)">2BAC SVT</option>
                    <option value="2BAC Sciences Mathématiques A/B">2BAC Sciences Mathématiques</option>
                  </optgroup>
                </select>
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'اسم ولي الأمر *' : 'Nom du parent ou tuteur *'}</label>
                <input 
                  type="text" 
                  value={manualInquiry.parent_name}
                  onChange={(e) => setManualInquiry({ ...manualInquiry, parent_name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'رقم الهاتف *' : 'Téléphone *'}</label>
                <input 
                  type="tel" 
                  value={manualInquiry.phone}
                  onChange={(e) => setManualInquiry({ ...manualInquiry, phone: e.target.value })}
                  required
                  dir="ltr"
                />
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'المؤسسة السابقة' : 'Établissement précédent'}</label>
                <input 
                  type="text" 
                  value={manualInquiry.previous_school}
                  onChange={(e) => setManualInquiry({ ...manualInquiry, previous_school: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>{lang === 'ar' ? 'ملاحظات إدارية' : 'Notes administratives'}</label>
                <textarea 
                  rows={2}
                  value={manualInquiry.notes}
                  onChange={(e) => setManualInquiry({ ...manualInquiry, notes: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddInquiryModal(false)} className="btn-cancel">
                  {lang === 'ar' ? 'إلغاء' : 'Annuler'}
                </button>
                <button type="submit" disabled={actionLoading} className="btn-admin-action">
                  {lang === 'ar' ? 'حفظ الطلب' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEWS */}
      {showNewsModal && (
        <div className="admin-modal-backdrop" onClick={() => setShowNewsModal(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{lang === 'ar' ? 'إضافة خبر أو إعلان جديد' : 'Nouvel article'}</h3>
              <button type="button" onClick={() => setShowNewsModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateNews} className="modal-form">
              <div className="form-group">
                <label>{lang === 'ar' ? 'العنوان بالعربية' : 'Titre (Arabe)'}</label>
                <input 
                  type="text" 
                  value={newNews.title_ar} 
                  onChange={(e) => setNewNews({ ...newNews, title_ar: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>{lang === 'ar' ? 'العنوان بالفرنسية' : 'Titre (Français)'}</label>
                <input 
                  type="text" 
                  value={newNews.title_fr} 
                  onChange={(e) => setNewNews({ ...newNews, title_fr: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>{lang === 'ar' ? 'ملخص الخبر (عربي)' : 'Résumé'}</label>
                <textarea 
                  rows={3} 
                  value={newNews.summary_ar} 
                  onChange={(e) => setNewNews({ ...newNews, summary_ar: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>{lang === 'ar' ? 'رابط الصورة أو رفع صورة' : 'Image'}</label>
                <div className="file-input-row">
                  <input 
                    type="text" 
                    value={newNews.image_url} 
                    onChange={(e) => setNewNews({ ...newNews, image_url: e.target.value })} 
                    required 
                  />
                  <label className="btn-upload-file">
                    <Upload size={16} />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, (url) => setNewNews(prev => ({ ...prev, image_url: url })))} 
                      hidden 
                    />
                  </label>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowNewsModal(false)} className="btn-cancel">{lang === 'ar' ? 'إلغاء' : 'Annuler'}</button>
                <button type="submit" disabled={actionLoading} className="btn-admin-action">{lang === 'ar' ? 'نشر الآن' : 'Publier'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT NEWS */}
      {editingNews && (
        <div className="admin-modal-backdrop" onClick={() => setEditingNews(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{lang === 'ar' ? 'تعديل الخبر أو الإعلان' : 'Modifier l\'article'}</h3>
              <button type="button" onClick={() => setEditingNews(null)}><X size={20} /></button>
            </div>
            <form onSubmit={handleUpdateNews} className="modal-form">
              <div className="form-group">
                <label>{lang === 'ar' ? 'العنوان بالعربية' : 'Titre (Arabe)'}</label>
                <input 
                  type="text" 
                  value={editingNews.title_ar} 
                  onChange={(e) => setEditingNews({ ...editingNews, title_ar: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>{lang === 'ar' ? 'العنوان بالفرنسية' : 'Titre (Français)'}</label>
                <input 
                  type="text" 
                  value={editingNews.title_fr} 
                  onChange={(e) => setEditingNews({ ...editingNews, title_fr: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>{lang === 'ar' ? 'ملخص الخبر (عربي)' : 'Résumé'}</label>
                <textarea 
                  rows={3} 
                  value={editingNews.summary_ar} 
                  onChange={(e) => setEditingNews({ ...editingNews, summary_ar: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>{lang === 'ar' ? 'رابط الصورة' : 'Image'}</label>
                <div className="file-input-row">
                  <input 
                    type="text" 
                    value={editingNews.image_url} 
                    onChange={(e) => setEditingNews({ ...editingNews, image_url: e.target.value })} 
                    required 
                  />
                  <label className="btn-upload-file">
                    <Upload size={16} />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, (url) => setEditingNews(prev => ({ ...prev, image_url: url })))} 
                      hidden 
                    />
                  </label>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setEditingNews(null)} className="btn-cancel">{lang === 'ar' ? 'إلغاء' : 'Annuler'}</button>
                <button type="submit" disabled={actionLoading} className="btn-admin-action">{lang === 'ar' ? 'حفظ التعديلات' : 'Enregistrer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD OR EDIT GALLERY */}
      {showGalleryModal && (
        <div className="admin-modal-backdrop" onClick={() => { setShowGalleryModal(false); setEditingGallery(null); }}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{lang === 'ar' ? (editingGallery ? 'تعديل صورة المعرض' : 'إضافة صورة إلى المعرض') : (editingGallery ? 'Modifier la photographie' : 'Ajouter une photographie')}</h3>
              <button type="button" onClick={() => { setShowGalleryModal(false); setEditingGallery(null); }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateGallery} className="modal-form">
              <div className="form-group">
                <label>{lang === 'ar' ? 'عنوان الصورة بالعربية' : 'Titre (Arabe)'}</label>
                <input 
                  type="text" 
                  value={newGallery.title_ar} 
                  onChange={(e) => setNewGallery({ ...newGallery, title_ar: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>{lang === 'ar' ? 'عنوان الصورة بالفرنسية' : 'Titre (Français)'}</label>
                <input 
                  type="text" 
                  value={newGallery.title_fr} 
                  onChange={(e) => setNewGallery({ ...newGallery, title_fr: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>{lang === 'ar' ? 'التصنيف' : 'Catégorie'}</label>
                <select 
                  value={newGallery.category} 
                  onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                >
                  <option value="campus">{lang === 'ar' ? 'الحرم المدرسي' : 'Campus'}</option>
                  <option value="graduation">{lang === 'ar' ? 'حفلات التخرج' : 'Remise des diplômes'}</option>
                  <option value="activities">{lang === 'ar' ? 'الأنشطة المدرسية' : 'Activités'}</option>
                </select>
              </div>
              <div className="form-group">
                <label>{lang === 'ar' ? 'رابط الصورة أو رفع صورة' : 'Image'}</label>
                <div className="file-input-row">
                  <input 
                    type="text" 
                    value={newGallery.image_url} 
                    onChange={(e) => setNewGallery({ ...newGallery, image_url: e.target.value, storage_path: null })} 
                    required 
                  />
                  <label className="btn-upload-file">
                    <Upload size={16} />
                    <input 
                      type="file" 
                      accept="image/*" 
                      disabled={actionLoading}
                      onChange={(e) => handleFileUpload(e, (url, storage_path) => setNewGallery(prev => ({ ...prev, image_url: url, storage_path })), 'gallery')} 
                      hidden 
                    />
                  </label>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => { setShowGalleryModal(false); setEditingGallery(null); }} className="btn-cancel">{lang === 'ar' ? 'إلغاء' : 'Annuler'}</button>
                <button type="submit" disabled={actionLoading} className="btn-admin-action">{lang === 'ar' ? (editingGallery ? 'حفظ التعديلات' : 'إضافة') : (editingGallery ? 'Enregistrer' : 'Ajouter')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD OR EDIT VIDEO */}
      {showVideoModal && (
        <div className="admin-modal-backdrop" onClick={() => { setShowVideoModal(false); setEditingVideo(null); }}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{lang === 'ar' ? (editingVideo ? 'تعديل فيديو' : 'إضافة فيديو للمكتبة') : (editingVideo ? 'Modifier une vidéo' : 'Ajouter une vidéo')}</h3>
              <button type="button" onClick={() => { setShowVideoModal(false); setEditingVideo(null); }}><X size={20} /></button>
            </div>
            <form onSubmit={handleCreateVideo} className="modal-form">
              <div className="form-group">
                <label>{lang === 'ar' ? 'عنوان الفيديو بالعربية' : 'Titre (Arabe)'}</label>
                <input 
                  type="text" 
                  value={newVideo.title_ar} 
                  onChange={(e) => setNewVideo({ ...newVideo, title_ar: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>{lang === 'ar' ? 'عنوان الفيديو بالفرنسية' : 'Titre (Français)'}</label>
                <input 
                  type="text" 
                  value={newVideo.title_fr} 
                  onChange={(e) => setNewVideo({ ...newVideo, title_fr: e.target.value })} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>{lang === 'ar' ? 'رابط الفيديو أو رفع ملف' : 'Lien vidéo ou téléverser un fichier'}</label>
                <div className="file-input-row">
                  <input 
                    type="text" 
                    value={newVideo.video_url} 
                    onChange={(e) => setNewVideo({ ...newVideo, video_url: e.target.value, storage_path: null })} 
                    required 
                    dir="ltr"
                    placeholder="/videos/video.mp4"
                  />
                  <label className="btn-upload-file">
                    <Upload size={16} />
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      disabled={actionLoading}
                      onChange={(e) => handleFileUpload(e, (url, storage_path) => setNewVideo(prev => ({ ...prev, video_url: url, storage_path })), 'videos')}
                      hidden
                    />
                  </label>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => { setShowVideoModal(false); setEditingVideo(null); }} className="btn-cancel">{lang === 'ar' ? 'إلغاء' : 'Annuler'}</button>
                <button type="submit" disabled={actionLoading} className="btn-admin-action">{lang === 'ar' ? (editingVideo ? 'حفظ التعديلات' : 'إضافة') : (editingVideo ? 'Enregistrer' : 'Ajouter')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
