export const DEFAULT_SETTINGS = {
  id: 'general',
  school_name_ar: 'ثانوية الفرح الخصوصية',
  school_name_fr: 'Lycée Collège El Farah Privé',
  auth_number: '8721/8',
  address_ar: 'حي الأمل 3، زنقة 68 رقم 3، الفداء، الدار البيضاء',
  address_fr: 'Amal H, Rue 68, N°3, Casa El Fida, Casablanca, Maroc',
  phone: '05 22 28 36 99',
  email: 'farahinfopriv@yahoo.fr',
  director_name_ar: 'الأستاذ محمد فضلي',
  director_name_fr: 'M. Mohamed Fadli',
  slogan_ar: 'معاً من أجل تعليم متميز ... وبناء مستقبل أفضل',
  slogan_fr: 'Ensemble pour un enseignement d\'excellence et un avenir meilleur',
  foundation_year: '1998',
  working_hours_ar: 'من الإثنين إلى الجمعة: 8:00 - 18:30 | السبت: 8:00 - 12:30',
  working_hours_fr: 'Du Lundi au Vendredi: 08:00 - 18:30 | Samedi: 08:00 - 12:30',
  facebook_url: 'https://facebook.com',
  youtube_url: 'https://youtube.com',
  instagram_url: 'https://instagram.com'
};

export const DEFAULT_NEWS = [
  {
    id: 'news-1',
    title_ar: 'انطلاق عملية التسجيل وإعادة التسجيل للموسم الدراسي الجديد',
    title_fr: 'Ouverture officielle des inscriptions et réinscriptions',
    summary_ar: 'تعلن إدارة ثانوية وإعدادية الفرح الخصوصية عن فتح باب التسجيل لمستويات السلكين الإعدادي والتأهيلي.',
    summary_fr: 'La direction du Lycée Collège El Farah Privé annonce le lancement des inscriptions pour le collège et le lycée.',
    content_ar: 'يسر إدارة مؤسسة الفرح الخصوصية أن ترحب بأولياء الأمور الكرام لتسجيل أبنائهم وبناتهم للموسم الدراسي الجديد. تتوفر مقاعد محدودة لضمان أعداد نموذجية في كل فصل ومتابعة تربوية لصيقة من طرف خيرة الأساتذة.',
    content_fr: 'La direction du Lycée El Farah a le plaisir d\'accueillir les parents d\'élèves pour inscrire leurs enfants pour la nouvelle année scolaire. Les places sont rigoureusement limitées afin d\'assurer un encadrement personnalisé de haut niveau.',
    category: 'announcement',
    image_url: '/images/building.png',
    is_published: true,
    publish_date: '2026-10-25'
  },
  {
    id: 'news-2',
    title_ar: 'حفل تتويج وتكريم المتفوقين في امتحانات الباكالوريا',
    title_fr: 'Cérémonie d\'excellence et remise des diplômes du Baccalauréat',
    summary_ar: 'احتفلت مؤسسة الفرح بالنتائج الباهرة لتلاميذ الثانية باكالوريا ونسب النجاح المشرفة بميزات عليا.',
    summary_fr: 'Lycée El Farah a honoré la réussite exceptionnelle de ses bacheliers avec un taux de réussite exemplaire.',
    content_ar: 'بحضور السيد المدير محمد فضلي والأطر التربوية وأولياء الأمور، تم تنظيم الحفل السنوي البهيج لتتويج الناجحين في امتحانات الباكالوريا وتكريم المتفوقين الحاصلين على ميزات حسن جداً وحسن.',
    content_fr: 'En présence de Monsieur le Directeur Mohamed Fadli, du corps professoral et des familles, la cérémonie solennelle a célébré avec éclat l\'excellence académique et la réussite de nos lauréats.',
    category: 'event',
    image_url: '/images/graduation-ceremony.png',
    is_published: true,
    publish_date: '2026-10-18'
  },
  {
    id: 'news-3',
    title_ar: 'جداول الحصص واستعمالات الزمن الرسمية لجميع المستويات',
    title_fr: 'Publication des emplois du temps officiels',
    summary_ar: 'نشر استعمالات الزمن المعتمدة لجميع أسلاك الإعدادي والتأهيلي مع انطلاق الحصص الدراسية.',
    summary_fr: 'Mise à disposition des emplois du temps détaillés pour tous les niveaux scolaires (1AC à 2BAC).',
    content_ar: 'تدعو الإدارة التربوية جميع التلميذات والتلاميذ وأولياء أمورهم للاطلاع على جداول الحصص الأسبوعية المحدثة للسنة الدراسية، والالتزام بأوقات الدخول والخروج المقررة.',
    content_fr: 'L\'administration invite les élèves et leurs tuteurs à consulter les emplois du temps semestriels et à respecter rigoureusement les horaires des cours et des séances de travaux pratiques.',
    category: 'academic',
    image_url: '/images/campus-life.jpg',
    is_published: true,
    publish_date: '2026-10-05'
  }
];

export const DEFAULT_GALLERY = [
  {
    id: 'gal-1',
    title_ar: 'مبنى المؤسسة الرئيسي',
    title_fr: 'Bâtiment principal du Lycée',
    category: 'campus',
    image_url: '/images/building.png',
    description_ar: 'الواجهة الرسمية للثانوية التأهيلية والإعدادية الفرح الخصوصية',
    description_fr: 'Façade officielle du Lycée Collège El Farah Privé à Casablanca',
    display_order: 1
  },
  {
    id: 'gal-2',
    title_ar: 'حفل تخرج وتتويج طلاب الباكالوريا',
    title_fr: 'Cérémonie solennelle de promotion des bacheliers',
    category: 'ceremony',
    image_url: '/images/graduation-ceremony.png',
    description_ar: 'صورة تذكارية لمتخرجي الباكالوريا مع السيد المدير وهيئة التدريس',
    description_fr: 'Photo officielle de la promotion des bacheliers avec la direction',
    display_order: 2
  },
  {
    id: 'gal-3',
    title_ar: 'كلمة السيد المدير محمد فضلي',
    title_fr: 'Allocution du Directeur M. Mohamed Fadli',
    category: 'ceremony',
    image_url: '/images/directeur.png',
    description_ar: 'كلمة السيد المدير التوجيهية في حفل التفوق والتميز الدراسي',
    description_fr: 'Discours d\'encouragement et de félicitations de M. Mohamed Fadli',
    display_order: 3
  },
  {
    id: 'gal-4',
    title_ar: 'تسليم شهادة الباكالوريا بميزة مشرفة',
    title_fr: 'Remise du diplôme du Baccalauréat',
    category: 'ceremony',
    image_url: '/images/graduation-award.png',
    description_ar: 'لحظة تسليم الشهادة لإحدى التلميذات المتفوقات',
    description_fr: 'Moments d\'émotion lors de la remise des attestations d\'excellence',
    display_order: 4
  },
  {
    id: 'gal-5',
    title_ar: 'فرحة التتويج والنجاح للطلاب',
    title_fr: 'Fierté et liesse de nos diplômés',
    category: 'ceremony',
    image_url: '/images/students-celebration.jpg',
    description_ar: 'أجواء الفرحة والتصفيق أثناء إعلان النتائج والتتويج',
    description_fr: 'Les bacheliers fêtent leur brillante réussite universitaire',
    display_order: 5
  },
  {
    id: 'gal-6',
    title_ar: 'فريق الاستقبال والتنظيم',
    title_fr: 'Équipe d\'accueil et de médiation',
    category: 'activities',
    image_url: '/images/students-welcome.jpg',
    description_ar: 'تلميذات المؤسسة في تنظيم وتنسيق فعاليات الأنشطة المدرسية',
    description_fr: 'Engagement citoyen et participation active de nos élèves',
    display_order: 6
  },
  {
    id: 'gal-7',
    title_ar: 'فضاء المؤسسة والساحة التفاعلية',
    title_fr: 'Espace de vie scolaire et accès',
    category: 'campus',
    image_url: '/images/campus-life.jpg',
    description_ar: 'بيئة مدرسية آمنة ومريحة تحفز على العطاء والتفوق',
    description_fr: 'Cadre d\'apprentissage serein et propice au développement',
    display_order: 7
  },
  {
    id: 'gal-8',
    title_ar: 'يوم الأنشطة والتواصل مع الآباء',
    title_fr: 'Rencontres pédagogiques et accueil des familles',
    category: 'activities',
    image_url: '/images/activity-day.jpg',
    description_ar: 'جسور التواصل المستمر بين الإدارة وأولياء الأمور',
    description_fr: 'Dialogue continu et constructif entre l\'équipe éducative et les parents',
    display_order: 8
  }
];

export const RETIRED_PLACEHOLDER_VIDEO_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

export const DEFAULT_VIDEOS = [
  {
    id: 'vid-1',
    title_ar: 'فيديو تعريفي بمؤسسة الفرح الخصوصية',
    title_fr: 'Présentation vidéo du Lycée Collège El Farah Privé',
    video_url: '/videos/presentation.mp4',
    thumbnail_url: '/images/building.png',
    duration: '00:01',
    is_featured: true
  }
];

export const DEFAULT_INQUIRIES = [
  {
    id: 'inq-1',
    student_name: 'أمين العلمي',
    parent_name: 'رشيد العلمي',
    phone: '0661234567',
    email: 'rachid.alami@gmail.com',
    level_requested: 'Tronc Commun Scientifique',
    previous_school: 'إعدادية الفداء',
    notes: 'استفسار بخصوص الوثائق المطلوبة ورسوم التسجيل للموسم القادم',
    status: 'pending',
    created_at: '2026-10-30T10:15:00Z'
  },
  {
    id: 'inq-2',
    student_name: 'سارة المنصوري',
    parent_name: 'فاطمة المنصوري',
    phone: '0662987654',
    email: 'fatima.mansouri@yahoo.fr',
    level_requested: '2BAC Sciences Physiques',
    previous_school: 'مؤسسة خاصة بالدار البيضاء',
    notes: 'طلب تسجيل مباشر في السنة الثانية باكالوريا شعبة العلوم الفيزيائية',
    status: 'contacted',
    created_at: '2026-10-29T14:40:00Z'
  }
];

export const DEFAULT_NAV_ITEMS = [
  { id: 'nav-home', label_ar: 'الرئيسية', label_fr: 'Accueil', target: 'home', type: 'section', is_visible: true, order: 1 },
  { id: 'nav-about', label_ar: 'عن المؤسسة', label_fr: 'À propos', target: 'about', type: 'section', is_visible: true, order: 2 },
  { id: 'nav-levels', label_ar: 'الأسلاك التعليمية', label_fr: 'Cycles Scolaires', target: 'levels', type: 'section', is_visible: true, order: 3 },
  { id: 'nav-activities', label_ar: 'الأنشطة والنوادي', label_fr: 'Activités & Clubs', target: 'activities', type: 'section', is_visible: true, order: 4 },
  { id: 'nav-gallery', label_ar: 'معرض الصور', label_fr: 'Galerie Photos', target: 'gallery', type: 'section', is_visible: true, order: 5 },
  { id: 'nav-videos', label_ar: 'الفيديوهات', label_fr: 'Vidéothèque', target: 'videos', type: 'section', is_visible: true, order: 6 },
  { id: 'nav-news', label_ar: 'الأخبار والإعلانات', label_fr: 'Actualités', target: 'news', type: 'section', is_visible: true, order: 7 },
  { id: 'nav-contact', label_ar: 'اتصل بنا', label_fr: 'Contact', target: 'contact', type: 'section', is_visible: true, order: 8 },
];

export const DEFAULT_CUSTOM_PAGES = [
  {
    id: 'page-charter',
    slug: 'internal-rules',
    title_ar: 'القانون الداخلي للمؤسسة',
    title_fr: 'Règlement Intérieur de l\'Établissement',
    subtitle_ar: 'ميثاق الحقوق والواجبات والانضباط المدرسي لضمان بيئة تربوية نموذجية',
    subtitle_fr: 'Charte des droits, devoirs et discipline scolaire pour un cadre d\'apprentissage optimal',
    content_ar: `تعتبر مؤسسة الفرح الخصوصية فضاءً للتربية والتكوين وتنمية شخصية المتعلم في إطار من الاحترام والانضباط.

أولاً: الحضور والمواظبة
- يجب على التلاميذ الحضور قبل موعد انطلاق الدروس بخمس دقائق على الأقل.
- يمنع الدخول إلى الفصل بعد إغلاق الباب إلا بإذن مكتوب وموقع من الحراسة العامة.
- في حالة الغياب، يلتزم ولي الأمر بإشعار الإدارة فوراً وتقديم تبرير معتمد عند الالتحاق.

ثانياً: الهندام والسلوك العام
- احترام الأطر التربوية والإدارية وجميع الزملاء والتعامل برقي داخل الحرم المدرسي.
- الالتزام بالزي المدرسي الموحد المعتمد من قبل المؤسسة والحفاظ الدائم على النظافة العامة.
- يمنع منعاً باتاً استخدام الهواتف المحمولة أو الأجهزة الإلكترونية الشخصية داخل الفصول الدراسية.

ثالثاً: السلامة والممتلكات
- الحفاظ على مرافق وتجهيزات المؤسسة، المختبرات العلمية، والمكتبة المدرسية.
- كل إتلاف متعمد لممتلكات المؤسسة يتحمل مسؤوليته التلميذ المعني وولي أمره.`,
    content_fr: `Le Lycée Collège El Farah Privé est un espace dédié à l'excellence pédagogique, à la citoyenneté et à l'épanouissement personnel de chaque élève.

1. Assiduité et Ponctualité :
- Les élèves sont tenus d'arriver au moins 5 minutes avant le début des cours.
- Aucun retardataire ne sera admis en cours sans un billet d'entrée délivré par la surveillance générale.
- Toute absence doit être immédiatement signalée par les parents et justifiée par écrit.

2. Tenue et Comportement :
- Respect mutuel et attitude exemplaire envers les enseignants, l'administration et les camarades.
- Port obligatoire de la tenue scolaire réglementaire.
- L'utilisation des téléphones portables est strictement interdite dans les salles de cours.

3. Respect des Locaux et du Matériel :
- Protection des équipements pédagogiques, des laboratoires et de la bibliothèque scolaire.
- Tout dégât causé volontairement sera à la charge des parents de l'élève responsable.`,
    image_url: '/images/building.png',
    is_published: true,
    created_at: '2026-10-15T09:00:00Z'
  }
];
