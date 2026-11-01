$levels = @'
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  GraduationCap, 
  BookOpen, 
  Atom, 
  Microscope, 
  CheckCircle, 
  Sparkles 
} from 'lucide-react';

export default function LevelsSection({ onOpenRegister }) {
  const { lang, t } = useLanguage();
  const [activeCycle, setActiveCycle] = useState('college'); // 'college' | 'lycee'

  const collegeClasses = [
    {
      code: '1AC',
      name: lang === 'ar' ? 'السنة الأولى ثانوي إعدادي' : '1ère Année Collégiale',
      desc: lang === 'ar' ? 'ترسيخ المعارف الأساسية، تنمية المهارات اللغوية والمنهجية العلمية للمتعلم.' : 'Acquisition des fondamentaux, consolidation des compétences linguistiques et méthodologiques.'
    },
    {
      code: '2AC',
      name: lang === 'ar' ? 'السنة الثانية ثانوي إعدادي' : '2ème Année Collégiale',
      desc: lang === 'ar' ? 'تعميق المكتسبات في الرياضيات والعلوم واللغات، وتوسيع المدارك المعرفية.' : 'Approfondissement des savoirs scientifiques, développement de l esprit critique.'
    },
    {
      code: '3AC',
      name: lang === 'ar' ? 'السنة الثالثة ثانوي إعدادي' : '3ème Année Collégiale',
      desc: lang === 'ar' ? 'إعداد مكثف للامتحان الجهوي الموحد لنيل شهادة السلك الإعدادي وتوجيه نحو التأهيلي.' : 'Préparation ciblée à l examen régional normalisé et orientation personnalisée vers le lycée.'
    }
  ];

  const lyceeClasses = [
    {
      code: 'TCS',
      name: lang === 'ar' ? 'الجذع المشترك العلمي' : 'Tronc Commun Scientifique',
      desc: lang === 'ar' ? 'قاعدة متينة في الرياضيات والفيزياء والكيمياء وعلوم الحياة والأرض.' : 'Socle rigoureux en sciences exactes, initiation aux méthodologies de recherche.'
    },
    {
      code: '1BAC SE',
      name: lang === 'ar' ? 'الأولى باكالوريا علوم تجريبية' : '1ère Année Bac : Sciences Expérimentales',
      desc: lang === 'ar' ? 'تأطير عالي الدقة للامتحان الجهوي الموحد (اللغة الفرنسية، التاريخ والجغرافيا، التربية الإسلامية).' : 'Préparation intensive à l examen régional du Baccalauréat et renforcement scientifique.'
    },
    {
      code: '2BAC PC/SVT',
      name: lang === 'ar' ? 'الثانية باكالوريا (علوم فيزيائية / SVT)' : '2ème Année Bac : PC & SVT',
      desc: lang === 'ar' ? 'إعداد استراتيجي للامتحان الوطني للباكالوريا والمباريات الوطنية للمدارس العليا والجامعات.' : 'Préparation stratégique aux épreuves nationales du Bac et concours des grandes écoles.'
    }
  ];

  const collegeStrengths = [
    lang === 'ar' ? 'أعداد فصول نموذجية للمتابعة الدقيقة' : 'Effectifs réduits pour un suivi personnalisé',
    lang === 'ar' ? 'حصص دعم مجانية مبرمجة أسبوعياً' : 'Séances de soutien et consolidation incluses',
    lang === 'ar' ? 'أنشطة علمية وتجارب مخبرية مبكرة' : 'Travaux pratiques et expérimentation dès la 1AC',
    lang === 'ar' ? 'تواصل دائم ومستمر مع الآباء' : 'Suivi continu et concertation avec les parents'
  ];

  const lyceeStrengths = [
    lang === 'ar' ? 'محاكاة دورية للامتحانات الوطنية (باك بيضاء)' : 'Examens blancs réguliers conformes aux normes',
    lang === 'ar' ? 'تأطير نخبة من الأساتذة ذوي الخبرة الإشهادية' : 'Corps professoral d élite à forte expérience',
    lang === 'ar' ? 'خلية التوجيه والمواكبة الجامعية' : 'Accompagnement d orientation pour les grandes écoles',
    lang === 'ar' ? 'سجل حافل بنسب نجاح 100% وميزات مشرفة' : 'Excellence continue et mentions très bien au Bac'
  ];

  return (
    <section id="levels" className="section-padding" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <BookOpen size={16} />
            <span>{t('levels_title')}</span>
          </div>
          <h2 className="section-title">
            {lang === 'ar' ? 'الأسلاك والشعب الدراسية بمؤسسة الفرح' : 'Cursus Pédagogique du Collège au Lycée'}
          </h2>
          <p className="section-subtitle">{t('levels_subtitle')}</p>
        </div>

        {/* Cycle Switcher Tabs */}
        <div className="levels-tabs-wrapper">
          <div className="levels-tabs">
            <button
              type="button"
              className={level-tab-btn }
              onClick={() => setActiveCycle('college')}
            >
              {lang === 'ar' ? 'السلك الإعدادي (Collège)' : 'Cycle Collège'}
            </button>
            <button
              type="button"
              className={level-tab-btn }
              onClick={() => setActiveCycle('lycee')}
            >
              {lang === 'ar' ? 'السلك التأهيلي (Lycée)' : 'Cycle Lycée'}
            </button>
          </div>
        </div>

        {/* Selected Cycle Display */}
        <div className="level-card-main">
          <div className="level-header-row">
            <div>
              <span className="level-badge">
                {activeCycle === 'college' ? 'Collège El Farah' : 'Lycée El Farah'}
              </span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-blue)', marginTop: '0.4rem' }}>
                {activeCycle === 'college' ? t('college_title') : t('lycee_title')}
              </h3>
            </div>

            <button
              type="button"
              onClick={onOpenRegister}
              className="btn btn-primary"
            >
              <GraduationCap size={18} />
              <span>{lang === 'ar' ? 'تسجيل في هذا السلك' : 'S\'inscrire à ce cycle'}</span>
            </button>
          </div>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            {activeCycle === 'college' ? t('college_desc') : t('lycee_desc')}
          </p>

          {/* Classes Grid */}
          <div className="classes-grid">
            {(activeCycle === 'college' ? collegeClasses : lyceeClasses).map((cls, idx) => (
              <div key={idx} className="class-item-box">
                <span className="class-code">{cls.code}</span>
                <h4 className="class-name">{cls.name}</h4>
                <p className="class-desc">{cls.desc}</p>
              </div>
            ))}
          </div>

          {/* Pedagogical Strengths */}
          <div className="level-strengths-box">
            <h4 className="strengths-title">
              <Sparkles size={20} color="#F28A24" />
              <span>{t('level_features_title')}</span>
            </h4>
            <ul className="strengths-list">
              {(activeCycle === 'college' ? collegeStrengths : lyceeStrengths).map((str, idx) => (
                <li key={idx} className="strength-item">
                  <CheckCircle size={18} color="#247DBB" style={{ flexShrink: 0 }} />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
'@
[System.IO.File]::WriteAllText("c:\Users\laara\OneDrive\Desktop\site\src\components\LevelsSection.jsx", $levels, [System.Text.Encoding]::UTF8)

$activities = @'
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  FlaskConical, 
  Theater, 
  Trophy, 
  Compass, 
  Sparkles, 
  Presentation 
} from 'lucide-react';

export default function ActivitiesSection() {
  const { lang, t } = useLanguage();

  const activities = [
    {
      icon: FlaskConical,
      title: t('act_labs'),
      desc: t('act_labs_desc')
    },
    {
      icon: Theater,
      title: t('act_clubs'),
      desc: t('act_clubs_desc')
    },
    {
      icon: Trophy,
      title: t('act_sports'),
      desc: t('act_sports_desc')
    },
    {
      icon: Compass,
      title: t('act_trips'),
      desc: t('act_trips_desc')
    }
  ];

  return (
    <section id="activities" className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag tag-orange">
            <Sparkles size={16} />
            <span>{t('activities_title')}</span>
          </div>
          <h2 className="section-title">
            {lang === 'ar' ? 'فضاءات الإبداع والتفوق المدرسي' : 'Activités & Épanouissement Scolaire'}
          </h2>
          <p className="section-subtitle">{t('activities_subtitle')}</p>
        </div>

        <div className="activities-grid">
          {activities.map((act, idx) => {
            const IconComponent = act.icon;
            return (
              <div key={idx} className="activity-card">
                <div className="activity-icon">
                  <IconComponent size={28} />
                </div>
                <h3 className="activity-title">{act.title}</h3>
                <p className="activity-desc">{act.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
'@
[System.IO.File]::WriteAllText("c:\Users\laara\OneDrive\Desktop\site\src\components\ActivitiesSection.jsx", $activities, [System.Text.Encoding]::UTF8)

$gallery = @'
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Image as ImageIcon, X, Maximize2, Tag } from 'lucide-react';

export default function GallerySection({ items = [] }) {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [activeImage, setActiveImage] = useState(null);

  const filters = [
    { id: 'all', label: t('gallery_all') },
    { id: 'campus', label: t('gallery_campus') },
    { id: 'ceremony', label: t('gallery_ceremony') },
    { id: 'activities', label: t('gallery_activities') }
  ];

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <section id="gallery" className="section-padding" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <ImageIcon size={16} />
            <span>{t('gallery_title')}</span>
          </div>
          <h2 className="section-title">
            {lang === 'ar' ? 'معرض صور أنشطة وتتويجات المؤسسة' : 'Galerie Photos Officielle'}
          </h2>
          <p className="section-subtitle">{t('gallery_subtitle')}</p>
        </div>

        {/* Filter buttons */}
        <div className="gallery-filters">
          {filters.map(f => (
            <button
              key={f.id}
              type="button"
              className={ilter-btn }
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Images Grid */}
        <div className="gallery-grid">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="gallery-card"
              onClick={() => setActiveImage(item)}
            >
              <img 
                src={item.image_url} 
                alt={lang === 'ar' ? item.title_ar : item.title_fr} 
                loading="lazy"
              />
              <div className="gallery-card-overlay">
                <div className="gallery-card-title">
                  {lang === 'ar' ? item.title_ar : item.title_fr}
                </div>
                <div className="gallery-card-desc">
                  {lang === 'ar' ? item.description_ar : item.description_fr}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="modal-backdrop" onClick={() => setActiveImage(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={() => setActiveImage(null)}
            >
              <X size={20} />
            </button>
            <div className="lightbox-img-wrap">
              <img 
                src={activeImage.image_url} 
                alt={lang === 'ar' ? activeImage.title_ar : activeImage.title_fr} 
              />
            </div>
            <div className="lightbox-details">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '0.4rem' }}>
                {lang === 'ar' ? activeImage.title_ar : activeImage.title_fr}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {lang === 'ar' ? activeImage.description_ar : activeImage.description_fr}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
'@
[System.IO.File]::WriteAllText("c:\Users\laara\OneDrive\Desktop\site\src\components\GallerySection.jsx", $gallery, [System.Text.Encoding]::UTF8)

$videos = @'
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Video, Play, X, ExternalLink } from 'lucide-react';

export default function VideoSection({ videos = [] }) {
  const { lang, t } = useLanguage();

  return (
    <section id="videos" className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag tag-orange">
            <Video size={16} />
            <span>{t('videos_title')}</span>
          </div>
          <h2 className="section-title">
            {lang === 'ar' ? 'فيديوهات وتسجيلات حية للمؤسسة' : 'Vidéothèque & Moments Forts'}
          </h2>
          <p className="section-subtitle">{t('videos_subtitle')}</p>
        </div>

        <div className="videos-grid">
          {videos.map(vid => (
            <div key={vid.id} className="video-card">
              <div className="video-player-wrap">
                {vid.video_url.includes('youtube.com') || vid.video_url.includes('youtu.be') ? (
                  <iframe 
                    src={vid.video_url.replace('watch?v=', 'embed/')} 
                    title={lang === 'ar' ? vid.title_ar : vid.title_fr} 
                    allowFullScreen 
                  />
                ) : (
                  <video controls poster={vid.thumbnail_url}>
                    <source src={vid.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <div className="video-details">
                <h3 className="video-title">
                  {lang === 'ar' ? vid.title_ar : vid.title_fr}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600 }}>
                  {vid.duration ? ${vid.duration} min : 'HD'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'@
[System.IO.File]::WriteAllText("c:\Users\laara\OneDrive\Desktop\site\src\components\VideoSection.jsx", $videos, [System.Text.Encoding]::UTF8)
