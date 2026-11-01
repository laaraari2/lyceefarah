import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  ar: {
    // Navigation
    nav_home: 'الرئيسية',
    nav_about: 'عن المؤسسة',
    nav_college: 'السلك الإعدادي',
    nav_lycee: 'السلك التأهيلي',
    nav_activities: 'الأنشطة والتميز',
    nav_gallery: 'معرض الصور',
    nav_videos: 'الفيديو',
    nav_news: 'المستجدات والإعلانات',
    nav_contact: 'اتصل بنا',
    nav_register: 'التسجيل الأولي',
    nav_admin: 'بوابة الإدارة',

    // Hero
    hero_badge: 'مؤسسة تعليمية خصوصية رائدة — إعدادي وتأهيلي بالدار البيضاء',
    hero_title: 'ثانوية الفرح الخصوصية',
    hero_slogan: 'معاً من أجل تعليم متميز ... وبناء مستقبل أفضل',
    hero_subtitle: 'بيئة تربوية رائدة تجمع بين جودة التأطير، تفوق النتائج، وبناء شخصية متكاملة لرواد الغد.',
    hero_cta_register: 'التسجيل الأولي عبر الإنترنت',
    hero_cta_tour: 'شاهد الفيديو التعريفي',
    stat_experience: 'سنة من العطاء',
    stat_levels: 'سلكان: إعدادي وتأهيلي',
    stat_success: 'نسب نجاح متميزة',
    stat_teachers: 'نخبة من الأساتذة الأكفاء',

    // Welcome Message (Director)
    director_title: 'كلمة السيد المدير العام',
    director_role: 'مدير ثانوية وإعدادية الفرح الخصوصية',
    director_message: 'مرحباً بكم في رحاب مؤسستنا التربوية. نؤمن بأن التعليم ليس مجرد تلقين للمعرفة، بل هو غرس للقيم وصقل للمهارات ومواكبة فردية لكل تلميذ وتلميذة نحو التميز الأكاديمي والمهني. أبوابنا مفتوحة دائماً للأسر الكريمة في شراكة متواصلة من أجل مستقبل مشرق لأبنائنا.',

    // About Section
    about_title: 'عن مؤسسة الفرح الخصوصية',
    about_subtitle: 'تاريخ حافل بالتميز التربوي ورؤية استشرافية لجيل الغد',
    about_desc_1: 'تعتبر ثانوية الفرح الخصوصية بالدار البيضاء (عمالة الفداء مرس السلطان) صرحاً تعليمياً متميزاً يسهر على تقديم تعليم متطور وتأطير بيداغوجي رفيع.',
    about_desc_2: 'نوفر لتلميذاتنا وتلاميذنا تأطيراً بيداغوجياً رفيع المستوى بإشراف نخبة من خيرة الأساتذة ذوي الخبرة، مع التركيز على الشعب العلمية والمسالك الدولية وتعزيز اللغات الحية.',
    value_excellence: 'الجودة والتميز',
    value_excellence_desc: 'برامج تعليمية حديثة ومتابعة دقيقة لمستوى التحصيل الفردي.',
    value_morals: 'التربية على القيم',
    value_morals_desc: 'ترسيخ مبادئ المواطنة الصالحة، الانضباط، والمسؤولية الذاتية.',
    value_support: 'الدعم والمواكبة',
    value_support_desc: 'حصص دعم مجانية وتأطير خاص للامتحانات الإشهادية الموحدة.',
    value_infrastructure: 'تجهيزات متطورة',
    value_infrastructure_desc: 'مختبرات علمية، قاعات وسائطية، وفضاءات مجهزة بأحدث الوسائل.',

    // Levels
    levels_title: 'الأسلاك والشعب الدراسية',
    levels_subtitle: 'مسار تعليمي متكامل من السلك الإعدادي إلى نيل شهادة الباكالوريا',
    college_title: 'السلك الثانوي الإعدادي (Collège)',
    college_desc: 'مرحلة انتقالية هامة ترتكز على ترسيخ المعارف الأساسية، تطوير المهارات اللغوية، واكتشاف الميول العلمية والأدبية للتلميذ.',
    college_1ac: 'السنة الأولى إعدادي (1AC)',
    college_2ac: 'السنة الثانية إعدادي (2AC)',
    college_3ac: 'السنة الثالثة إعدادي (3AC) مع الإعداد للامتحان الجهوي الموحد',
    
    lycee_title: 'السلك الثانوي التأهيلي (Lycée)',
    lycee_desc: 'إعداد أكاديمي مكثف لولوج المعاهد والمدارس العليا والجامعات بنجاح واستحقاق.',
    lycee_tc: 'الجذع المشترك العلمي (Tronc Commun Scientifique)',
    lycee_1bac: 'الأولى باكالوريا: شعبة العلوم التجريبية (1BAC SE)',
    lycee_2bac_pc: 'الثانية باكالوريا: مسلك العلوم الفيزيائية (2BAC PC)',
    lycee_2bac_svt: 'الثانية باكالوريا: مسلك علوم الحياة والأرض (2BAC SVT)',
    level_features_title: 'مميزات التأطير بمؤسسة الفرح:',
    feat_small_groups: 'أعداد نموذجية في الأقسام لضمان المتابعة الفردية',
    feat_exam_prep: 'محاكاة دورية للامتحانات الوطنية والجهوية (باك بيضاء)',
    feat_guidance: 'خلية دائمة للتوجيه التربوي والجامعي',
    feat_modern_tools: 'اعتماد الوسائل الرقمية والسبورات التفاعلية',

    // Activities
    activities_title: 'الأنشطة الموازية وفضاءات الإبداع',
    activities_subtitle: 'تنمية الشخصية وبناء المهارات القيادية والحياتية لدى المتعلمين',
    act_labs: 'المختبرات العلمية والتجارب',
    act_labs_desc: 'تطبيق المفاهيم النظرية في الفيزياء والكيمياء وعلوم الحياة والأرض.',
    act_clubs: 'الأندية الثقافية والمسرح',
    act_clubs_desc: 'تنمية ملكة الخطابة، التعبير الفني، والمشاركة في الأنشطة المسرحية.',
    act_sports: 'التربية البدنية والرياضة',
    act_sports_desc: 'فضاءات رياضية متنوعة لتحفيز اللياقة البدنية والروح الرياضية.',
    act_trips: 'الرحلات والزيارات الاستكشافية',
    act_trips_desc: 'زيارات ميدانية للمؤسسات والمعارض العلمية والمواقع التاريخية.',

    // Gallery
    gallery_title: 'معرض الصور التوثيقي',
    gallery_subtitle: 'لحظات أصيلة من حياة المؤسسة ومسار التفوق والاحتفال بالناجحين',
    gallery_all: 'الكل',
    gallery_campus: 'مبنى ومرافق المؤسسة',
    gallery_ceremony: 'حفلات التخرج والتتويج',
    gallery_activities: 'الأنشطة والتفاعل المدرسي',

    // Videos
    videos_title: 'معرض الفيديو',
    videos_subtitle: 'شاهد الأجواء التربوية والاحتفالات المدرسية من خلال تسجيلات حية',
    watch_video: 'مشاهدة الفيديو',

    // News
    news_title: 'آخر الأخبار والإعلانات',
    news_subtitle: 'ابقوا على اطلاع دائم بجميع مستجدات المؤسسة والمواعيد المدرسية',
    news_read_more: 'قراءة المزيد',
    news_published_on: 'تاريخ النشر',

    // Registration Modal / Section
    reg_title: 'طلب التسجيل الأولي والمعلومات',
    reg_subtitle: 'احجز مقعداً دراسياً لابنك أو ابنتك للموسم الدراسي الجديد',
    reg_student_name: 'اسم التلميذ(ة) الكامل',
    reg_parent_name: 'اسم ولي الأمر',
    reg_phone: 'رقم الهاتف للتواصل',
    reg_email: 'البريد الإلكتروني (اختياري)',
    reg_level: 'المستوى المطلوب',
    reg_prev_school: 'المؤسسة السابقة',
    reg_notes: 'ملاحظات أو استفسار إضافي',
    reg_submit: 'إرسال طلب التسجيل',
    reg_submitting: 'جاري الإرسال...',
    reg_success_title: 'تم إرسال طلبكم بنجاح!',
    reg_success_msg: 'شكراً لثقتكم بمؤسسة الفرح. ستقوم الإدارة بالتواصل معكم في أقرب وقت لتأكيد الموعد واستكمال الإجراءات.',

    // Contact
    contact_title: 'معلومات الاتصال والموقع',
    contact_subtitle: 'يسرنا استقبالكم والإجابة عن كافة استفساراتكم التربوية والإدارية',
    contact_address_label: 'العنوان الرسمي',
    contact_phone_label: 'الهاتف الثابت',
    contact_email_label: 'البريد الإلكتروني',
    contact_hours_label: 'أوقات العمل الإداري',
    contact_map_title: 'موقع المؤسسة على الخريطة',

    // Footer
    footer_about: 'مؤسسة تعليمية خصوصية رائدة بالدار البيضاء للمستويين الثانوي الإعدادي والثانوي التأهيلي، تضمن جودة التأطير والتفوق الدراسي.',
    footer_quick_links: 'روابط سريعة',
    footer_levels: 'الأسلاك التعليمية',
    footer_rights: 'جميع الحقوق محفوظة © ثانوية الفرح الخصوصية',
    footer_admin_link: 'دخول الإدارة',

    // Global Brand & Section Titles
    brand_title_ar: 'ثانوية الفرح الخصوصية',
    brand_title_fr: 'Lycée Collège El Farah Privé',
    director_name: 'الأستاذ محمد فضلي',
    levels_main_title: 'الأسلاك والشعب الدراسية بمؤسسة الفرح',
    activities_main_title: 'فضاءات الإبداع والتفوق المدرسي',
    gallery_main_title: 'معرض صور أنشطة وتتويجات المؤسسة',
    videos_main_title: 'فيديوهات وتسجيلات حية للمؤسسة',
    news_main_title: 'مستجدات وإعلانات المؤسسة'
  },
  fr: {
    // Navigation
    nav_home: 'Accueil',
    nav_about: 'À propos',
    nav_college: 'Collège',
    nav_lycee: 'Lycée',
    nav_activities: 'Activités & Réussite',
    nav_gallery: 'Galerie Photos',
    nav_videos: 'Vidéos',
    nav_news: 'Actualités',
    nav_contact: 'Contact',
    nav_register: 'Pré-inscription',
    nav_admin: 'Administration',

    // Hero
    hero_badge: 'Établissement privé d\'excellence — Collège & Lycée à Casablanca',
    hero_title: 'Lycée Collège El Farah Privé',
    hero_slogan: 'Ensemble pour un enseignement d\'excellence et un avenir meilleur',
    hero_subtitle: 'Un cadre d\'excellence combinant rigueur pédagogique, réussite prouvée aux examens et épanouissement personnel de chaque élève.',
    hero_cta_register: 'Pré-inscription en ligne',
    hero_cta_tour: 'Vidéo de présentation',
    stat_experience: 'Années de dévouement',
    stat_levels: 'Collège & Lycée',
    stat_success: 'Taux de réussite remarquable',
    stat_teachers: 'Professeurs chevronnés',

    // Welcome Message (Director)
    director_title: 'Mot du Directeur Général',
    director_role: 'Directeur du Lycée Collège El Farah Privé',
    director_message: 'Bienvenue au Lycée Collège El Farah. Notre vocation est d\'offrir à chaque élève un enseignement d\'excellence fondé sur l\'écoute, la méthode et l\'ambition. Nous construisons avec les familles un partenariat de confiance pour accompagner nos jeunes vers les plus prestigieuses filières supérieures.',

    // About Section
    about_title: 'À propos de notre établissement',
    about_subtitle: 'Une tradition d\'excellence et une vision d\'avenir pour vos enfants',
    about_desc_1: 'Le Lycée Collège El Farah Privé est un établissement d\'enseignement secondaire situé à Casablanca (Préfecture d\'Al Fida Mers Sultan), dédié à l\'excellence pédagogique et à l\'épanouissement des élèves.',
    about_desc_2: 'Nous assurons un encadrement pédagogique rigoureux mené par un corps enseignant hautement qualifié, en mettant l\'accent sur les filières scientifiques, la maîtrise des langues vivantes et le développement des compétences analytiques.',
    value_excellence: 'Qualité & Rigueur',
    value_excellence_desc: 'Programmes enrichis et suivi personnalisé continu des performances scolaires.',
    value_morals: 'Valeurs & Citoyenneté',
    value_morals_desc: 'Culture de l\'effort, de la bienveillance et du respect mutuel.',
    value_support: 'Soutien & Accompagnement',
    value_support_desc: 'Séances de renforcement méthodologique et préparation ciblée aux examens certifiants.',
    value_infrastructure: 'Équipements Modernes',
    value_infrastructure_desc: 'Laboratoires scientifiques équipés, outils numériques et espaces d\'apprentissage sécurisés.',

    // Levels
    levels_title: 'Cycles et Filières Pédagogiques',
    levels_subtitle: 'Un cursus d\'apprentissage complet du collège jusqu\'au Baccalauréat',
    college_title: 'Cycle Secondaire Collégial (Collège)',
    college_desc: 'Consolidation des savoirs fondamentaux, renforcement des compétences linguistiques et éveil scientifique.',
    college_1ac: '1ère Année Collégiale (1AC)',
    college_2ac: '2ème Année Collégiale (2AC)',
    college_3ac: '3ème Année Collégiale (3AC) & Préparation intensive à l\'Examen Régional',
    
    lycee_title: 'Cycle Secondaire Qualifiant (Lycée)',
    lycee_desc: 'Enseignement approfondi et rigoureux pour préparer les futurs bacheliers aux grandes écoles et facultés.',
    lycee_tc: 'Tronc Commun Scientifique (TCS)',
    lycee_1bac: '1ère Année Baccalauréat : Sciences Expérimentales',
    lycee_2bac_pc: '2ème Année Baccalauréat : Sciences Physiques (PC)',
    lycee_2bac_svt: '2ème Année Baccalauréat : Sciences de la Vie et de la Terre (SVT)',
    level_features_title: 'Les atouts pédagogiques El Farah :',
    feat_small_groups: 'Effectifs limités pour un encadrement individualisé',
    feat_exam_prep: 'Examens blancs réguliers et simulations conformes aux épreuves nationales',
    feat_guidance: 'Cellule permanente d\'orientation universitaire et professionnelle',
    feat_modern_tools: 'Intégration d\'écrans interactifs et ressources multimédias',

    // Activities
    activities_title: 'Activités Parascolaires & Vie Scolaire',
    activities_subtitle: 'Épanouissement personnel, créativité et compétences relationnelles',
    act_labs: 'Laboratoires et Travaux Pratiques',
    act_labs_desc: 'Expérimentation directe en physique-chimie et sciences de la vie et de la terre.',
    act_clubs: 'Clubs Culturels & Théâtre',
    act_clubs_desc: 'Développement de l\'expression orale, de l\'art oratoire et de la créativité.',
    act_sports: 'Éducation Physique & Sport',
    act_sports_desc: 'Installations sportives pour entretenir la santé, l\'esprit d\'équipe et le fair-play.',
    act_trips: 'Sorties Pédagogiques & Visites',
    act_trips_desc: 'Exploration d\'expositions scientifiques, de salons étudiants et de sites culturels.',

    // Gallery
    gallery_title: 'Galerie Photographique',
    gallery_subtitle: 'Images authentiques de la vie scolaire et des cérémonies de réussite',
    gallery_all: 'Tous',
    gallery_campus: 'Bâtiment & Campus',
    gallery_ceremony: 'Cérémonies de Remise de Diplômes',
    gallery_activities: 'Vie Scolaire & Activités',

    // Videos
    videos_title: 'Galerie Vidéo',
    videos_subtitle: 'Découvrez l\'ambiance de notre établissement à travers nos vidéos officielles',
    watch_video: 'Regarder la vidéo',

    // News
    news_title: 'Actualités & Communiqués',
    news_subtitle: 'Restez informés des événements, annonces et dates clés du calendrier scolaire',
    news_read_more: 'Lire la suite',
    news_published_on: 'Date de publication',

    // Registration Modal / Section
    reg_title: 'Demande de Pré-inscription',
    reg_subtitle: 'Réservez dès maintenant une place pour votre enfant au sein de notre établissement',
    reg_student_name: 'Nom et Prénom de l\'élève',
    reg_parent_name: 'Nom du tuteur / parent',
    reg_phone: 'Numéro de téléphone',
    reg_email: 'Adresse email (optionnel)',
    reg_level: 'Niveau scolaire souhaité',
    reg_prev_school: 'Établissement précédent',
    reg_notes: 'Remarques ou message particulier',
    reg_submit: 'Envoyer ma demande',
    reg_submitting: 'Envoi en cours...',
    reg_success_title: 'Demande envoyée avec succès !',
    reg_success_msg: 'Nous vous remercions pour votre confiance. Notre service des admissions vous contactera dans les plus brefs délais pour convenir d\'un entretien.',

    // Contact
    contact_title: 'Coordonnées & Emplacement',
    contact_subtitle: 'Notre équipe est à votre entière disposition pour tout renseignement',
    contact_address_label: 'Adresse Officielle',
    contact_phone_label: 'Téléphone Fixe',
    contact_email_label: 'Email',
    contact_hours_label: 'Horaires d\'Accueil',
    contact_map_title: 'Localisation de l\'établissement',

    // Footer
    footer_about: 'Établissement privé d\'excellence à Casablanca pour les cycles Collège et Lycée, dédié à la réussite scolaire et à l\'avenir de chaque élève.',
    footer_quick_links: 'Liens Rapides',
    footer_levels: 'Niveaux Scolaires',
    footer_rights: 'Tous droits réservés © Lycée Collège El Farah Privé',
    footer_admin_link: 'Espace Administration',

    // Global Brand & Section Titles
    brand_title_ar: 'ثانوية الفرح الخصوصية',
    brand_title_fr: 'Lycée Collège El Farah Privé',
    director_name: 'M. Mohamed Fadli',
    levels_main_title: 'Cursus Pédagogique du Collège au Lycée',
    activities_main_title: 'Activités & Épanouissement Scolaire',
    gallery_main_title: 'Galerie Photos Officielle',
    videos_main_title: 'Vidéothèque & Moments Forts',
    news_main_title: 'Dernières Nouvelles & Annonces'
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('elfarah_lang') || 'ar';
  });

  // Custom live overrides for WordPress-style visual inline editing
  const [customOverrides, setCustomOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem('elfarah_translations_override');
      return saved ? JSON.parse(saved) : { ar: {}, fr: {} };
    } catch (e) {
      return { ar: {}, fr: {} };
    }
  });

  // Live edit mode must be enabled explicitly after an admin signs in.
  const [isLiveEditMode, setIsLiveEditMode] = useState(false);

  // Active item being edited in the Live Editor Modal
  const [activeEditItem, setActiveEditItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('elfarah_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'fr' : 'ar'));
  };

  const toggleLiveEditMode = () => {
    setIsLiveEditMode(prev => !prev);
  };

  // Get translated string with priority: custom override > language translation > fallback > key
  const t = (key, fallback) => {
    if (customOverrides[lang]?.[key] !== undefined && customOverrides[lang]?.[key] !== '') {
      return customOverrides[lang][key];
    }
    return translations[lang]?.[key] || translations['ar']?.[key] || fallback || key;
  };

  // Get raw translations for both languages
  const getRawTranslation = (key) => {
    const arVal = customOverrides['ar']?.[key] !== undefined 
      ? customOverrides['ar'][key] 
      : (translations['ar']?.[key] || '');
    
    const frVal = customOverrides['fr']?.[key] !== undefined 
      ? customOverrides['fr'][key] 
      : (translations['fr']?.[key] || '');

    return { ar: arVal, fr: frVal };
  };

  // Save / Update translation override
  const updateTranslation = (key, arVal, frVal) => {
    setCustomOverrides(prev => {
      const next = {
        ar: { ...prev.ar, [key]: arVal },
        fr: { ...prev.fr, [key]: frVal }
      };
      try {
        localStorage.setItem('elfarah_translations_override', JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save translation override:', e);
      }
      return next;
    });
  };

  // Open live editor popup for a specific key
  const openLiveEditor = (key, label, multiline = false) => {
    const raw = getRawTranslation(key);
    setActiveEditItem({
      key,
      label: label || key,
      ar: raw.ar,
      fr: raw.fr,
      multiline
    });
  };

  const closeLiveEditor = () => {
    setActiveEditItem(null);
  };

  // ========================
  //  MEDIA OVERRIDES SYSTEM
  // ========================
  const [mediaOverrides, setMediaOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem('elfarah_media_overrides');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Active media item being edited in the media editor modal
  const [activeMediaItem, setActiveMediaItem] = useState(null);

  // Get a media override by key, returns null if no override
  const getMediaOverride = (key) => {
    return mediaOverrides[key] || null;
  };

  // Save / Update a media override (URL or data URI)
  const updateMediaOverride = (key, newUrl) => {
    setMediaOverrides(prev => {
      const next = { ...prev, [key]: newUrl };
      try {
        localStorage.setItem('elfarah_media_overrides', JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save media override:', e);
      }
      return next;
    });
  };

  // Remove a single media override
  const removeMediaOverride = (key) => {
    setMediaOverrides(prev => {
      const next = { ...prev };
      delete next[key];
      try {
        localStorage.setItem('elfarah_media_overrides', JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save media override:', e);
      }
      return next;
    });
  };

  // Open media editor modal
  const openMediaEditor = (key, label, currentSrc, mediaType = 'image', autoSave = false) => {
    setActiveMediaItem({
      key,
      label: label || key,
      currentSrc,
      mediaType,
      autoSave
    });
  };

  const closeMediaEditor = () => {
    setActiveMediaItem(null);
  };

  const resetAllOverrides = () => {
    if (window.confirm('هل تريد استعادة جميع النصوص والصور الافتراضية للموقع؟ / Réinitialiser tous les contenus ?')) {
      setCustomOverrides({ ar: {}, fr: {} });
      setMediaOverrides({});
      localStorage.removeItem('elfarah_translations_override');
      localStorage.removeItem('elfarah_media_overrides');
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      lang, 
      setLang, 
      toggleLanguage, 
      t,
      isRTL: lang === 'ar',
      isLiveEditMode,
      setIsLiveEditMode,
      toggleLiveEditMode,
      activeEditItem,
      openLiveEditor,
      closeLiveEditor,
      updateTranslation,
      getRawTranslation,
      resetAllOverrides,
      // Media overrides
      getMediaOverride,
      updateMediaOverride,
      removeMediaOverride,
      activeMediaItem,
      openMediaEditor,
      closeMediaEditor
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
