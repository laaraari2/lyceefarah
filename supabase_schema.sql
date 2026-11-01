-- ==============================================================================
-- LYCÉE COLLÈGE EL FARAH PRIVÉ — SUPABASE DATABASE SCHEMA & RLS SETUP
-- Autorisation MEN : 8721/8 | Casablanca - El Fida
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. SITE SETTINGS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'general',
  school_name_ar TEXT NOT NULL DEFAULT 'ثانوية الفرح الخصوصية',
  school_name_fr TEXT NOT NULL DEFAULT 'Lycée Collège El Farah Privé',
  auth_number TEXT NOT NULL DEFAULT '8721/8',
  address_ar TEXT NOT NULL DEFAULT 'حي الأمل 3، زنقة 68 رقم 3، الفداء، الدار البيضاء',
  address_fr TEXT NOT NULL DEFAULT 'Amal H, Rue 68, N°3, Casa El Fida, Casablanca',
  phone TEXT NOT NULL DEFAULT '05 22 28 36 99',
  email TEXT NOT NULL DEFAULT 'farahinfopriv@yahoo.fr',
  director_name_ar TEXT NOT NULL DEFAULT 'الأستاذ محمد فضلي',
  director_name_fr TEXT NOT NULL DEFAULT 'M. Mohamed Fadli',
  slogan_ar TEXT NOT NULL DEFAULT 'معاً من أجل تعليم متميز ... وبناء مستقبل أفضل',
  slogan_fr TEXT NOT NULL DEFAULT 'Ensemble pour un enseignement d excellence et un avenir meilleur',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. NEWS & ANNOUNCEMENTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_ar TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  summary_ar TEXT NOT NULL,
  summary_fr TEXT NOT NULL,
  content_ar TEXT,
  content_fr TEXT,
  category TEXT NOT NULL DEFAULT 'announcement', -- 'announcement', 'academic', 'event', 'exam'
  image_url TEXT,
  is_published BOOLEAN DEFAULT true,
  publish_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. GALLERY ITEMS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_ar TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'activities', -- 'ceremony', 'campus', 'activities', 'labs'
  image_url TEXT NOT NULL,
  storage_path TEXT,
  description_ar TEXT,
  description_fr TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. VIDEOS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_ar TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  video_url TEXT NOT NULL,
  storage_path TEXT,
  thumbnail_url TEXT,
  duration TEXT DEFAULT '03:45',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Keep existing projects compatible when applying this schema after table creation.
ALTER TABLE public.gallery_items ADD COLUMN IF NOT EXISTS storage_path TEXT;
ALTER TABLE public.videos ADD COLUMN IF NOT EXISTS storage_path TEXT;

-- ------------------------------------------------------------------------------
-- 5. REGISTRATION INQUIRIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_name TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  level_requested TEXT NOT NULL,
  previous_school TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'accepted', 'rejected', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Site Settings: Public can read, authenticated users (admin) can update
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update site settings" ON public.site_settings FOR ALL TO authenticated USING (true);

-- News: Public can view published news, admins full access
CREATE POLICY "Public can view published news" ON public.news FOR SELECT USING (is_published = true);
CREATE POLICY "Admins have full access to news" ON public.news FOR ALL TO authenticated USING (true);

-- Gallery: Public can view, admins full access
CREATE POLICY "Public can view gallery" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Admins have full access to gallery" ON public.gallery_items FOR ALL TO authenticated USING (true);

-- Videos: Public can view, admins full access
CREATE POLICY "Public can view videos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Admins have full access to videos" ON public.videos FOR ALL TO authenticated USING (true);

-- Inquiries: Public can insert (submit an inquiry), admins can view and manage all
CREATE POLICY "Anyone can submit inquiry" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view and manage inquiries" ON public.inquiries FOR ALL TO authenticated USING (true);

-- ------------------------------------------------------------------------------
-- 7. STORAGE BUCKET CONFIGURATION (Run in Supabase SQL editor)
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public) 
VALUES ('school-media', 'school-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view school media" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'school-media');

CREATE POLICY "Authenticated admins can upload school media" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'school-media');

CREATE POLICY "Authenticated admins can update/delete school media" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'school-media');

-- ------------------------------------------------------------------------------
-- 8. INITIAL SEED DATA
-- ------------------------------------------------------------------------------
INSERT INTO public.site_settings (id, school_name_ar, school_name_fr, auth_number, address_ar, address_fr, phone, email, director_name_ar, director_name_fr, slogan_ar, slogan_fr)
VALUES (
  'general',
  'ثانوية الفرح الخصوصية',
  'Lycée Collège El Farah Privé',
  '8721/8',
  'حي الأمل 3، زنقة 68 رقم 3، الفداء، الدار البيضاء',
  'Amal H, Rue 68, N°3, Casa El Fida, Casablanca',
  '05 22 28 36 99',
  'farahinfopriv@yahoo.fr',
  'الأستاذ محمد فضلي',
  'M. Mohamed Fadli',
  'معاً من أجل تعليم متميز ... وبناء مستقبل أفضل',
  'Ensemble pour un enseignement d excellence et un avenir meilleur'
) ON CONFLICT (id) DO UPDATE SET updated_at = NOW();

-- News Seeds
INSERT INTO public.news (title_ar, title_fr, summary_ar, summary_fr, content_ar, content_fr, category, image_url, is_published, publish_date)
VALUES 
(
  'انطلاق عملية التسجيل وإعادة التسجيل للموسم الدراسي الجديد',
  'Ouverture des inscriptions et réinscriptions pour la nouvelle année scolaire',
  'تعلن إدارة ثانوية وإعدادية الفرح الخصوصية عن فتح باب التسجيل لمستويات السلكين الإعدادي والتأهيلي.',
  'La direction du Lycée Collège El Farah Privé annonce l ouverture des inscriptions pour les cycles collégial et qualifiant.',
  'يسر إدارة مؤسسة الفرح الخصوصية أن ترحب بأولياء الأمور الكرام لتسجيل أبنائهم وبناتهم للموسم الدراسي الجديد. تتوفر مقاعد محدودة لضمان بيئة تعليمية نموذجية.',
  'La direction du Lycée El Farah a le plaisir d accueillir les parents pour inscrire leurs enfants. Les places sont limitées afin de garantir des effectifs réduits et un encadrement personnalisé.',
  'announcement',
  '/images/building.png',
  true,
  CURRENT_DATE
),
(
  'حفل تتويج وتكريم المتفوقين في امتحانات الباكالوريا',
  'Cérémonie d excellence et remise des diplômes du Baccalauréat',
  'احتفلت مؤسسة الفرح بالنتائج الباهرة لتلاميذ الثانية باكالوريا ونسب النجاح المشرفة بميزات عليا.',
  'Lycée El Farah a célébré les résultats remarquables de ses bacheliers avec un taux de réussite exemplaire et de nombreuses mentions Très Bien.',
  'بحضور السيد المدير محمد فضلي والأطر التربوية وأولياء الأمور، تم تنظيم الحفل السنوي لتتويج الناجحين في امتحانات الباكالوريا في جو من الفخر والاعتزاز.',
  'En présence du directeur M. Mohamed Fadli, des enseignants et des parents, la cérémonie annuelle de remise des diplômes a honoré le travail et le succès des élèves.',
  'event',
  '/images/graduation-ceremony.png',
  true,
  CURRENT_DATE - INTERVAL '10 days'
),
(
  'استعمالات الزمن وجداول الحصص للمستويات التعليمية',
  'Emplois du temps officiels et organisation des cours',
  'نشر جداول الحصص الخاصة بسلكي الإعدادي والتأهيلي (1AC, 2AC, 3AC, TC, 1BAC, 2BAC).',
  'Publication des emplois du temps détaillés pour l ensemble des niveaux du Collège et Lycée.',
  'تدعو الإدارة التربوية جميع التلاميذ للاطلاع على جداول الحصص الأسبوعية المحدثة لجميع الشعب والمسالك العلمية.',
  'L administration invite les élèves et familles à consulter les emplois du temps mis à jour pour l ensemble des filières scientifiques.',
  'academic',
  '/images/campus-life.jpg',
  true,
  CURRENT_DATE - INTERVAL '20 days'
) ON CONFLICT DO NOTHING;

-- Gallery Seeds
INSERT INTO public.gallery_items (title_ar, title_fr, category, image_url, description_ar, description_fr, display_order)
VALUES
('مبنى المؤسسة الرئيسي', 'Bâtiment principal du Lycée', 'campus', '/images/building.png', 'الواجهة الرسمية للثانوية التأهيلية الفرح', 'Façade officielle du Lycée Collège El Farah Privé', 1),
('حفل تخرج وتتويج تلاميذ الباكالوريا', 'Cérémonie de remise des diplômes', 'ceremony', '/images/graduation-ceremony.png', 'صورة جماعية لمتخرجي الباكالوريا مع إدارة المؤسسة', 'Photo de promotion des bacheliers avec la direction', 2),
('كلمة السيد المدير محمد فضلي', 'Allocution du Directeur M. Mohamed Fadli', 'ceremony', '/images/directeur.png', 'كلمة توجيهية للأستاذ محمد فضلي بمناسبة التفوق الدراسي', 'Discours d orientation et félicitations du directeur', 3),
('تسليم شهادة الباكالوريا بميزة مشرفة', 'Remise du diplôme du Baccalauréat', 'ceremony', '/images/graduation-award.png', 'تكريم إحدى التلميذات المتفوقات', 'Hommage à une élève méritante', 4),
('فرحة التتويج والنجاح للطلاب', 'Célébration du succès des lauréats', 'ceremony', '/images/students-celebration.jpg', 'أجواء الفرحة والبهجة في قاعة الحفلات', 'Moments de joie et de fierté partagés', 5),
('فريق الاستقبال والترحيب بالزوار', 'Équipe d accueil et d orientation', 'activities', '/images/students-welcome.jpg', 'تلميذات المؤسسة في خدمة استقبال الضيوف والأسر', 'Élèves volontaires accueillant les familles', 6),
('فضاء المؤسسة والأنشطة الموازية', 'Espaces et cour de l établissement', 'campus', '/images/campus-life.jpg', 'مرافق مريحة وآمنة للتحصيل الدراسي والتفاعل الإيجابي', 'Infrastructures sécurisées propices à l épanouissement', 7),
('يوم الأنشطة التربوية المفتوحة', 'Journée portes ouvertes et activités', 'activities', '/images/activity-day.jpg', 'تفاعل بين الأطر الإدارية وأولياء الأمور', 'Échanges stimulants entre enseignants et parents', 8)
ON CONFLICT DO NOTHING;

-- Video Seeds
INSERT INTO public.videos (title_ar, title_fr, video_url, thumbnail_url, duration, is_featured)
VALUES
(
  'فيديو تعريفي بمؤسسة الفرح الخصوصية',
  'Vidéo de présentation du Lycée Collège El Farah Privé',
  '/videos/presentation.mp4',
  '/images/building.png',
  '02:15',
  true
),
(
  'أجواء حفل تتويج وتكريم متفوقي الباكالوريا',
  'Moments forts de la cérémonie des bacheliers',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  '/images/graduation-ceremony.png',
  '04:30',
  false
) ON CONFLICT DO NOTHING;
