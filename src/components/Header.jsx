import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Editable from './Editable';
import EditableMedia from './EditableMedia';
import { 
  Globe, 
  Menu, 
  X, 
  UserCheck
} from 'lucide-react';

export default function Header({ 
  onOpenRegister, 
  onNavigateAdmin, 
  activeSection, 
  navItems = [],
  onOpenCustomPage,
  onBackToHome
}) {
  const { lang, toggleLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const fallbackItems = [
    { id: 'nav-home', label_ar: 'الرئيسية', label_fr: 'Accueil', target: 'home', type: 'section', is_visible: true },
    { id: 'nav-about', label_ar: 'عن المؤسسة', label_fr: 'À propos', target: 'about', type: 'section', is_visible: true },
    { id: 'nav-levels', label_ar: 'الأسلاك التعليمية', label_fr: 'Cycles Scolaires', target: 'levels', type: 'section', is_visible: true },
    { id: 'nav-activities', label_ar: 'الأنشطة والنوادي', label_fr: 'Activités & Clubs', target: 'activities', type: 'section', is_visible: true },
    { id: 'nav-gallery', label_ar: 'معرض الصور', label_fr: 'Galerie Photos', target: 'gallery', type: 'section', is_visible: true },
    { id: 'nav-videos', label_ar: 'الفيديوهات', label_fr: 'Vidéothèque', target: 'videos', type: 'section', is_visible: true },
    { id: 'nav-news', label_ar: 'الأخبار والإعلانات', label_fr: 'Actualités', target: 'news', type: 'section', is_visible: true },
    { id: 'nav-contact', label_ar: 'اتصل بنا', label_fr: 'Contact', target: 'contact', type: 'section', is_visible: true },
  ];

  const itemsToRender = (navItems && navItems.length > 0 ? navItems : fallbackItems)
    .filter(item => item.is_visible !== false);

  const handleNavClick = (item) => {
    setMobileOpen(false);

    if (item.type === 'page' || item.target?.startsWith('page:')) {
      const pageSlug = item.target.replace('page:', '');
      if (onOpenCustomPage) {
        onOpenCustomPage(pageSlug);
      }
      return;
    }

    if (item.type === 'link') {
      window.open(item.target, '_blank');
      return;
    }

    // Default: section scrolling
    if (onBackToHome) {
      onBackToHome();
    }
    setTimeout(() => {
      const elem = document.getElementById(item.target);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    if (onBackToHome) onBackToHome();
    const elem = document.getElementById('home');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Main Sticky Navbar */}
      <nav className="navbar">
        <div className="container navbar-container">
          {/* Logo & School Name */}
          <div className="brand-link" style={{ cursor: 'pointer' }} onClick={handleBrandClick}>
            <EditableMedia 
              mediaKey="site_logo"
              label="شعار المؤسسة (Logo)"
              src="/images/logo.png"
              alt="Logo Lycée El Farah"
              className="brand-logo"
            />
            <div className="brand-titles">
              <span className="brand-name-ar">
                <Editable textKey="brand_title_ar" label="اسم المؤسسة بالعربية (Header)" />
              </span>
              <span className="brand-name-fr">
                <Editable textKey="brand_title_fr" label="اسم المؤسسة بالفرنسية (Header)" />
              </span>
            </div>
          </div>


          {/* Navigation Links */}
          <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            {itemsToRender.map((item) => {
              const label = lang === 'ar' ? (item.label_ar || item.label) : (item.label_fr || item.label);
              const isActive = activeSection === item.target || activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item)}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
            <li>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onNavigateAdmin?.();
                }}
                className="nav-link nav-admin-link"
              >
                <UserCheck size={16} />
                <span>{lang === 'ar' ? 'فضاء الإدارة' : 'Espace Direction'}</span>
              </button>
            </li>
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