$header = @'
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Globe, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  UserCheck, 
  GraduationCap, 
  ShieldCheck 
} from 'lucide-react';

export default function Header({ onOpenRegister, onNavigateAdmin, activeSection }) {
  const { lang, toggleLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('nav_home') },
    { id: 'about', label: t('nav_about') },
    { id: 'levels', label: lang === 'ar' ? 'الأسلاك التعليمية' : 'Cycles Scolaires' },
    { id: 'activities', label: t('nav_activities') },
    { id: 'gallery', label: t('nav_gallery') },
    { id: 'videos', label: t('nav_videos') },
    { id: 'news', label: t('nav_news') },
    { id: 'contact', label: t('nav_contact') },
  ];

  const handleScroll = (id) => {
    setMobileOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Notification Bar with official Ministry accreditation and direct contacts */}
      <div className="topbar">
        <div className="container topbar-content">
          <div className="topbar-items">
            <span className="topbar-item">
              <ShieldCheck size={14} color="#F28A24" />
              <span>{lang === 'ar' ? 'ترخيص وزارة التربية الوطنية: 8721/8' : 'Homologation MEN : N° 8721/8'}</span>
            </span>
            <span className="topbar-item">
              <MapPin size={14} color="#247DBB" />
              <span>{lang === 'ar' ? 'الدار البيضاء — الفداء مرس السلطان' : 'Casablanca — El Fida Mers Sultan'}</span>
            </span>
          </div>

          <div className="topbar-items">
            <a href="tel:0522283699" className="topbar-item" style={{ direction: 'ltr' }}>
              <Phone size={14} color="#F28A24" />
              <span>05 22 28 36 99</span>
            </a>
            <a href="mailto:farahinfopriv@yahoo.fr" className="topbar-item">
              <Mail size={14} color="#247DBB" />
              <span>farahinfopriv@yahoo.fr</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav className="navbar">
        <div className="container navbar-container">
          {/* Logo & School Name */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleScroll('home'); }} className="brand-link">
            <img 
              src="/images/logo.png" 
              alt="Logo Lycée El Farah" 
              className="brand-logo"
            />
            <div className="brand-titles">
              <span className="brand-name-ar">الثانوية التأهيلية الفرح الخصوصية</span>
              <span className="brand-name-fr">Lycée Collège El Farah Privé</span>
            </div>
          </a>

          {/* Navigation Links */}
          <ul className={
av-links }>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleScroll(item.id)}
                  className={
av-link }
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Actions: Language Switcher, Inscription Button & Mobile Toggle */}
          <div className="nav-actions">
            <button 
              type="button" 
              onClick={toggleLanguage} 
              className="lang-btn" 
              title="Changer de langue / تغيير اللغة"
            >
              <Globe size={15} />
              <span>{lang === 'ar' ? 'Français' : 'العربية'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenRegister}
              className="btn btn-primary"
              style={{ padding: '0.5rem 1.1rem', fontSize: '0.88rem' }}
            >
              <GraduationCap size={16} />
              <span>{t('nav_register')}</span>
            </button>

            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
'@
[System.IO.File]::WriteAllText("c:\Users\laara\OneDrive\Desktop\site\src\components\Header.jsx", $header, [System.Text.Encoding]::UTF8)

$hero = @'
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  GraduationCap, 
  PlayCircle, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Users, 
  BookOpen, 
  Calendar 
} from 'lucide-react';

export default function Hero({ onOpenRegister, onOpenVideo }) {
  const { lang, t } = useLanguage();

  return (
    <section id="home" className="hero-section">
      {/* Real School Building Photo as Background */}
      <img 
        src="/images/building.png" 
        alt="Lycée Collège El Farah Building" 
        className="hero-bg"
      />
      <div className="hero-overlay" />

      <div className="container">
        <div className="hero-content">
          {/* Official Badge */}
          <div className="hero-badge-wrap">
            <ShieldCheck size={16} color="#F28A24" />
            <span>{t('hero_badge')}</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title">
            {lang === 'ar' ? (
              <>
                الثانوية التأهيلية والإعدادية <span>الفرح الخصوصية</span>
              </>
            ) : (
              <>
                Lycée Collège <span>El Farah Privé</span>
              </>
            )}
          </h1>

          {/* Official Institutional Slogan */}
          <div>
            <div className="hero-slogan">
              <Sparkles size={16} style={{ display: 'inline', margin: '0 6px' }} />
              {lang === 'ar' ? 'معاً من أجل تعليم متميز ... وبناء مستقبل أفضل' : 'Ensemble pour un enseignement d\'excellence et un avenir meilleur'}
            </div>
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle">
            {t('hero_subtitle')}
          </p>

          {/* Call to actions */}
          <div className="hero-buttons">
            <button 
              type="button" 
              onClick={onOpenRegister}
              className="btn btn-primary"
            >
              <GraduationCap size={18} />
              <span>{t('hero_cta_register')}</span>
            </button>

            <button 
              type="button" 
              onClick={onOpenVideo}
              className="btn btn-outline-white"
            >
              <PlayCircle size={18} />
              <span>{t('hero_cta_tour')}</span>
            </button>
          </div>

          {/* Key Metrics / Highlights */}
          <div className="hero-stats-grid">
            <div className="hero-stat-card">
              <div className="hero-stat-number">+25</div>
              <div className="hero-stat-label">{t('stat_experience')}</div>
            </div>
            <div className="hero-stat-card">
              <div className="hero-stat-number">100%</div>
              <div className="hero-stat-label">{t('stat_success')}</div>
            </div>
            <div className="hero-stat-card">
              <div className="hero-stat-number">2</div>
              <div className="hero-stat-label">{t('stat_levels')}</div>
            </div>
            <div className="hero-stat-card">
              <div className="hero-stat-number">100%</div>
              <div className="hero-stat-label">{t('stat_teachers')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'@
[System.IO.File]::WriteAllText("c:\Users\laara\OneDrive\Desktop\site\src\components\Hero.jsx", $hero, [System.Text.Encoding]::UTF8)

$welcome = @'
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Quote, Sparkles, Award } from 'lucide-react';

export default function WelcomeMessage() {
  const { lang, t } = useLanguage();

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container">
        <div className="welcome-card">
          {/* Director Real Photo */}
          <div className="welcome-media">
            <img 
              src="/images/directeur.png" 
              alt="M. Mohamed Fadli - Directeur Lycée El Farah" 
              className="welcome-img"
            />
            <div className="welcome-badge">
              <Award size={14} style={{ display: 'inline', margin: '0 4px' }} />
              <span>{lang === 'ar' ? 'إشراف تربوي رائد' : 'Direction Pédagogique'}</span>
            </div>
          </div>

          {/* Director Message */}
          <div className="welcome-content">
            <span className="welcome-tag">{t('director_title')}</span>
            <h2 className="welcome-name">{lang === 'ar' ? 'الأستاذ محمد فضلي' : 'M. Mohamed Fadli'}</h2>
            <div className="welcome-role">{t('director_role')}</div>

            <div className="welcome-quote">
              <Quote size={28} color="rgba(7, 59, 112, 0.15)" style={{ marginBottom: '0.5rem' }} />
              <p>{t('director_message')}</p>
            </div>

            <div className="welcome-footer">
              <div className="slogan-pill">
                <Sparkles size={16} color="#F28A24" />
                <span>{lang === 'ar' ? 'معاً من أجل تعليم متميز ... وبناء مستقبل أفضل' : 'Ensemble pour un enseignement d\'excellence'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'@
[System.IO.File]::WriteAllText("c:\Users\laara\OneDrive\Desktop\site\src\components\WelcomeMessage.jsx", $welcome, [System.Text.Encoding]::UTF8)

$about = @'
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Award, 
  Compass, 
  BookOpenCheck, 
  Building2, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export default function AboutSection() {
  const { lang, t } = useLanguage();

  const values = [
    {
      icon: Award,
      title: t('value_excellence'),
      desc: t('value_excellence_desc')
    },
    {
      icon: Compass,
      title: t('value_morals'),
      desc: t('value_morals_desc')
    },
    {
      icon: BookOpenCheck,
      title: t('value_support'),
      desc: t('value_support_desc')
    },
    {
      icon: Building2,
      title: t('value_infrastructure'),
      desc: t('value_infrastructure_desc')
    }
  ];

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="about-grid">
          {/* Text Description */}
          <div className="about-text">
            <div className="section-tag">
              <ShieldCheck size={16} />
              <span>{lang === 'ar' ? 'الرؤية والرسالة التربوية' : 'Notre Mission & Vision'}</span>
            </div>

            <h2 className="section-title">{t('about_title')}</h2>
            <p className="section-subtitle" style={{ marginBottom: '1.5rem', textAlign: 'inherit' }}>
              {t('about_subtitle')}
            </p>

            <p>{t('about_desc_1')}</p>
            <p>{t('about_desc_2')}</p>

            {/* Core Values Grid */}
            <div className="about-features-grid">
              {values.map((v, idx) => {
                const IconComponent = v.icon;
                return (
                  <div key={idx} className="feature-box">
                    <div className="feature-icon-wrap">
                      <IconComponent size={22} />
                    </div>
                    <h3 className="feature-title">{v.title}</h3>
                    <p className="feature-desc">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real Campus Visual */}
          <div className="about-image-wrapper">
            <img 
              src="/images/building.png" 
              alt="Bâtiment Lycée El Farah" 
              className="about-main-img"
            />
            <div className="about-stat-floating">
              <CheckCircle2 size={32} color="#F28A24" />
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary-blue)' }}>
                  {lang === 'ar' ? 'ترخيص رسمي 8721/8' : 'Homologation 8721/8'}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {lang === 'ar' ? 'وزارة التربية الوطنية والتعليم الأولي والرياضة' : 'Ministère de l\'Éducation Nationale'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'@
[System.IO.File]::WriteAllText("c:\Users\laara\OneDrive\Desktop\site\src\components\AboutSection.jsx", $about, [System.Text.Encoding]::UTF8)
