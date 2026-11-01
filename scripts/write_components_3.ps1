$news = @'
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Bell, Calendar, ArrowRight, ArrowLeft, X, Sparkles } from 'lucide-react';

export default function NewsSection({ news = [] }) {
  const { lang, t } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState(null);

  const getCategoryBadge = (cat) => {
    switch (cat) {
      case 'announcement': return lang === 'ar' ? 'إعلان هام' : 'Annonce';
      case 'event': return lang === 'ar' ? 'حدث وتتويج' : 'Événement';
      case 'academic': return lang === 'ar' ? 'شؤون بيداغوجية' : 'Pédagogie';
      default: return lang === 'ar' ? 'مستجدات' : 'Actualité';
    }
  };

  return (
    <section id="news" className="section-padding" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Bell size={16} />
            <span>{t('news_title')}</span>
          </div>
          <h2 className="section-title">
            {lang === 'ar' ? 'مستجدات وإعلانات المؤسسة' : 'Dernières Nouvelles & Annonces'}
          </h2>
          <p className="section-subtitle">{t('news_subtitle')}</p>
        </div>

        <div className="news-grid">
          {news.map(item => (
            <article key={item.id} className="news-card">
              <div className="news-thumb">
                <img 
                  src={item.image_url || '/images/building.png'} 
                  alt={lang === 'ar' ? item.title_ar : item.title_fr} 
                  loading="lazy"
                />
                <span className="news-category-badge">
                  {getCategoryBadge(item.category)}
                </span>
              </div>

              <div className="news-body">
                <div className="news-date">
                  <Calendar size={14} color="#247DBB" />
                  <span>{item.publish_date}</span>
                </div>

                <h3 className="news-card-title">
                  {lang === 'ar' ? item.title_ar : item.title_fr}
                </h3>

                <p className="news-card-summary">
                  {lang === 'ar' ? item.summary_ar : item.summary_fr}
                </p>

                <button
                  type="button"
                  className="news-link-btn"
                  onClick={() => setSelectedArticle(item)}
                >
                  <span>{t('news_read_more')}</span>
                  {lang === 'ar' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="modal-backdrop" onClick={() => setSelectedArticle(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '750px' }}>
            <button 
              type="button" 
              className="modal-close-btn" 
              onClick={() => setSelectedArticle(null)}
            >
              <X size={20} />
            </button>

            {selectedArticle.image_url && (
              <div style={{ maxHeight: '300px', overflow: 'hidden' }}>
                <img 
                  src={selectedArticle.image_url} 
                  alt="Illustration" 
                  style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                />
              </div>
            )}

            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                <span className="status-badge contacted">
                  {getCategoryBadge(selectedArticle.category)}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                  {selectedArticle.publish_date}
                </span>
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '1rem', lineHeight: 1.3 }}>
                {lang === 'ar' ? selectedArticle.title_ar : selectedArticle.title_fr}
              </h2>

              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
                {lang === 'ar' 
                  ? (selectedArticle.content_ar || selectedArticle.summary_ar) 
                  : (selectedArticle.content_fr || selectedArticle.summary_fr)}
              </p>

              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setSelectedArticle(null)}
              >
                {lang === 'ar' ? 'إغلاق' : 'Fermer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
'@
[System.IO.File]::WriteAllText("c:\Users\laara\OneDrive\Desktop\site\src\components\NewsSection.jsx", $news, [System.Text.Encoding]::UTF8)

$register = @'
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitInquiry } from '../lib/supabase';
import { X, CheckCircle, GraduationCap, Send, AlertCircle } from 'lucide-react';

export default function RegistrationModal({ isOpen, onClose }) {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    phone: '',
    email: '',
    level_requested: 'Tronc Commun Scientifique',
    previous_school: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const levelsList = [
    { value: '1AC', label: lang === 'ar' ? 'السنة الأولى إعدادي (1AC)' : '1ère Année Collégiale (1AC)' },
    { value: '2AC', label: lang === 'ar' ? 'السنة الثانية إعدادي (2AC)' : '2ème Année Collégiale (2AC)' },
    { value: '3AC', label: lang === 'ar' ? 'السنة الثالثة إعدادي (3AC)' : '3ème Année Collégiale (3AC)' },
    { value: 'Tronc Commun Scientifique', label: lang === 'ar' ? 'الجذع المشترك العلمي (TCS)' : 'Tronc Commun Scientifique' },
    { value: '1BAC Sciences Expérimentales', label: lang === 'ar' ? 'الأولى باكالوريا علوم تجريبية' : '1BAC Sciences Expérimentales' },
    { value: '2BAC Sciences Physiques', label: lang === 'ar' ? 'الثانية باكالوريا علوم فيزيائية (PC)' : '2BAC Sciences Physiques' },
    { value: '2BAC Sciences SVT', label: lang === 'ar' ? 'الثانية باكالوريا علوم الحياة والأرض (SVT)' : '2BAC Sciences SVT' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.student_name || !formData.parent_name || !formData.phone) {
      setError(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await submitInquiry(formData);
      setSubmitted(true);
    } catch (err) {
      setError(lang === 'ar' ? 'تعذر إرسال الطلب، يرجى المحاولة ثانية' : 'Erreur d\'envoi, veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      student_name: '',
      parent_name: '',
      phone: '',
      email: '',
      level_requested: 'Tronc Commun Scientifique',
      previous_school: '',
      notes: ''
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleResetAndClose}>
      <div className="reg-form-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px', width: '100%', position: 'relative' }}>
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={handleResetAndClose}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
              <div className="section-tag tag-orange" style={{ margin: '0 auto 0.8rem auto' }}>
                <GraduationCap size={16} />
                <span>{lang === 'ar' ? 'الموسم الدراسي 2026/2027' : 'Année Scolaire 2026/2027'}</span>
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '0.4rem' }}>
                {t('reg_title')}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                {t('reg_subtitle')}
              </p>
            </div>

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fee2e2', color: '#b91c1c', padding: '0.8rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.2rem', fontSize: '0.88rem' }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">{t('reg_student_name')} *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.student_name}
                    onChange={e => setFormData({ ...formData, student_name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('reg_parent_name')} *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.parent_name}
                    onChange={e => setFormData({ ...formData, parent_name: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">{t('reg_phone')} *</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    className="form-input"
                    placeholder="06XXXXXXXX"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('reg_email')}</label>
                  <input
                    type="email"
                    dir="ltr"
                    className="form-input"
                    placeholder="exemple@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">{t('reg_level')} *</label>
                  <select
                    className="form-select"
                    value={formData.level_requested}
                    onChange={e => setFormData({ ...formData, level_requested: e.target.value })}
                  >
                    {levelsList.map(lvl => (
                      <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('reg_prev_school')}</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.previous_school}
                    onChange={e => setFormData({ ...formData, previous_school: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('reg_notes')}</label>
                <textarea
                  className="form-textarea"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.8rem' }}
              >
                <Send size={18} />
                <span>{loading ? t('reg_submitting') : t('reg_submit')}</span>
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <CheckCircle size={38} />
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '0.6rem' }}>
              {t('reg_success_title')}
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
              {t('reg_success_msg')}
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleResetAndClose}
            >
              {lang === 'ar' ? 'حسناً، تم' : 'Compris'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
'@
[System.IO.File]::WriteAllText("c:\Users\laara\OneDrive\Desktop\site\src\components\RegistrationModal.jsx", $register, [System.Text.Encoding]::UTF8)

$contact = @'
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Compass } from 'lucide-react';

export default function ContactSection({ settings }) {
  const { lang, t } = useLanguage();

  const phone = settings?.phone || '05 22 28 36 99';
  const email = settings?.email || 'farahinfopriv@yahoo.fr';
  const address = lang === 'ar' 
    ? (settings?.address_ar || 'حي الأمل 3، زنقة 68 رقم 3، الفداء، الدار البيضاء')
    : (settings?.address_fr || 'Amal H, Rue 68, N°3, Casa El Fida, Casablanca, Maroc');

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Compass size={16} />
            <span>{t('contact_title')}</span>
          </div>
          <h2 className="section-title">
            {lang === 'ar' ? 'تواصل معنا وزيارة المؤسسة' : 'Contact & Accès à l\'Établissement'}
          </h2>
          <p className="section-subtitle">{t('contact_subtitle')}</p>
        </div>

        <div className="contact-grid">
          {/* Official Information Cards */}
          <div className="contact-info-cards">
            {/* Accreditation Badge Card */}
            <div className="contact-card" style={{ borderColor: 'var(--secondary-blue)', backgroundColor: 'var(--secondary-blue-light)' }}>
              <div className="contact-card-icon" style={{ backgroundColor: 'var(--primary-blue)', color: 'var(--pure-white)' }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <div className="contact-card-title">{lang === 'ar' ? 'الترخيص الوزاري الرسمي' : 'Agrément Officiel'}</div>
                <div className="contact-card-val" style={{ color: 'var(--primary-blue)' }}>
                  {lang === 'ar' ? 'وزارة التربية الوطنية والتعليم الأولي والرياضة — ترخيص رقم 8721/8' : 'Ministère de l\'Éducation Nationale — N° 8721/8'}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <MapPin size={24} />
              </div>
              <div>
                <div className="contact-card-title">{t('contact_address_label')}</div>
                <div className="contact-card-val">{address}</div>
              </div>
            </div>

            {/* Phone */}
            <a href={	el:} className="contact-card">
              <div className="contact-card-icon">
                <Phone size={24} />
              </div>
              <div>
                <div className="contact-card-title">{t('contact_phone_label')}</div>
                <div className="contact-card-val" style={{ direction: 'ltr', unicodeBidi: 'embed' }}>
                  {phone}
                </div>
              </div>
            </a>

            {/* Email */}
            <a href={mailto:} className="contact-card">
              <div className="contact-card-icon">
                <Mail size={24} />
              </div>
              <div>
                <div className="contact-card-title">{t('contact_email_label')}</div>
                <div className="contact-card-val" style={{ direction: 'ltr', unicodeBidi: 'embed' }}>
                  {email}
                </div>
              </div>
            </a>

            {/* Working Hours */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <Clock size={24} />
              </div>
              <div>
                <div className="contact-card-title">{t('contact_hours_label')}</div>
                <div className="contact-card-val" style={{ fontSize: '0.95rem' }}>
                  {lang === 'ar' 
                    ? 'من الإثنين إلى الجمعة: 8:00 - 18:30 | السبت: 8:00 - 12:30' 
                    : 'Lundi au Vendredi: 8h00 - 18h30 | Samedi: 8h00 - 12h30'}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Map of Casablanca - El Fida */}
          <div className="map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13300.742358902506!2d-7.608333!3d33.565833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd6f28a9bcf5%3A0x6b2b733737b98d1a!2sEl%20Fida%2C%20Casablanca!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Lycée El Farah"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
'@
[System.IO.File]::WriteAllText("c:\Users\laara\OneDrive\Desktop\site\src\components\ContactSection.jsx", $contact, [System.Text.Encoding]::UTF8)

$footer = @'
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, MapPin, Phone, Mail, Lock } from 'lucide-react';

export default function Footer({ settings, onNavigateAdmin }) {
  const { lang, t } = useLanguage();

  const handleScroll = (id) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Accreditation */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <img src="/images/logo.png" alt="Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
              <div>
                <h3 className="footer-brand-title" style={{ marginBottom: 0 }}>
                  {lang === 'ar' ? 'الثانوية التأهيلية الفرح الخصوصية' : 'Lycée Collège El Farah Privé'}
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#F28A24', fontWeight: 700 }}>
                  {lang === 'ar' ? 'ترخيص رقم 8721/8' : 'Autorisation N° 8721/8'}
                </span>
              </div>
            </div>
            <p className="footer-brand-desc">{t('footer_about')}</p>
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
'@
[System.IO.File]::WriteAllText("c:\Users\laara\OneDrive\Desktop\site\src\components\Footer.jsx", $footer, [System.Text.Encoding]::UTF8)
