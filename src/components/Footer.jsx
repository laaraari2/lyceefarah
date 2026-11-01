import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Editable from './Editable';
import EditableMedia from './EditableMedia';
import { ShieldCheck, MapPin, Phone, Mail, Lock } from 'lucide-react';

export default function Footer({ settings, onNavigateAdmin }) {
  const { lang, t } = useLanguage();

  const handleScroll = (id) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Accreditation */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <EditableMedia 
                mediaKey="site_logo" 
                label="شعار المؤسسة (Footer)"
                src="/images/logo.png" 
                alt="Logo" 
                style={{ width: '48px', height: '48px', objectFit: 'contain' }} 
              />
              <div>
                <h3 className="footer-brand-title" style={{ marginBottom: 0 }}>
                  <Editable textKey="brand_title_ar" label="اسم المؤسسة في التذييل" />
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#F28A24', fontWeight: 700 }}>
                  {lang === 'ar' ? 'سلك إعدادي وتأهيلي' : 'Cycles Collège & Lycée'}
                </span>
              </div>
            </div>
            <Editable 
              textKey="footer_about" 
              label="نبذة التذييل (Footer)" 
              as="p" 
              className="footer-brand-desc" 
              multiline 
            />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">{t('footer_quick_links')}</h4>
            <ul className="footer-links-list">
              <li><button type="button" onClick={() => handleScroll('home')} className="footer-link">{t('nav_home')}</button></li>
              <li><button type="button" onClick={() => handleScroll('about')} className="footer-link">{t('nav_about')}</button></li>
              <li><button type="button" onClick={() => handleScroll('activities')} className="footer-link">{t('nav_activities')}</button></li>
              <li><button type="button" onClick={() => handleScroll('gallery')} className="footer-link">{t('nav_gallery')}</button></li>
              <li><button type="button" onClick={() => handleScroll('news')} className="footer-link">{t('nav_news')}</button></li>
              <li><button type="button" onClick={() => handleScroll('contact')} className="footer-link">{t('nav_contact')}</button></li>
            </ul>
          </div>

          {/* Academic Levels */}
          <div>
            <h4 className="footer-col-title">{t('footer_levels')}</h4>
            <ul className="footer-links-list">
              <li><button type="button" onClick={() => handleScroll('levels')} className="footer-link">{lang === 'ar' ? 'السلك الإعدادي (1AC, 2AC, 3AC)' : 'Collège (1AC, 2AC, 3AC)'}</button></li>
              <li><button type="button" onClick={() => handleScroll('levels')} className="footer-link">{lang === 'ar' ? 'الجذع المشترك العلمي' : 'Tronc Commun Scientifique'}</button></li>
              <li><button type="button" onClick={() => handleScroll('levels')} className="footer-link">{lang === 'ar' ? 'الأولى باكالوريا علوم تجريبية' : '1BAC Sciences Expérimentales'}</button></li>
              <li><button type="button" onClick={() => handleScroll('levels')} className="footer-link">{lang === 'ar' ? 'الثانية باكالوريا علوم فيزيائية' : '2BAC Sciences Physiques'}</button></li>
              <li><button type="button" onClick={() => handleScroll('levels')} className="footer-link">{lang === 'ar' ? 'الثانية باكالوريا علوم الحياة والأرض' : '2BAC Sciences SVT'}</button></li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="footer-col-title">{t('nav_contact')}</h4>
            <ul className="footer-links-list" style={{ gap: '0.8rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem' }}>
                <MapPin size={16} color="#F28A24" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{lang === 'ar' ? (settings?.address_ar || 'حي الأمل 3، زنقة 68 رقم 3، الفداء، الدار البيضاء') : (settings?.address_fr || 'Amal H Rue 68 N°3 Casa El Fida')}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', direction: 'ltr' }}>
                <Phone size={16} color="#247DBB" />
                <span>{settings?.phone || '05 22 28 36 99'}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', direction: 'ltr' }}>
                <Mail size={16} color="#247DBB" />
                <span>{settings?.email || 'farahinfopriv@yahoo.fr'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>{t('footer_rights')}</div>
          <button 
            type="button" 
            onClick={onNavigateAdmin} 
            className="footer-admin-btn"
          >
            <Lock size={12} />
            <span>{t('footer_admin_link')}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}