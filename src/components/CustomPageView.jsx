import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, ArrowRight, Calendar, BookOpen, Share2, Phone, MessageCircle, Edit3 } from 'lucide-react';

export default function CustomPageView({ page, onBackToHome, onOpenRegister, onEditPage, isAdmin, settings }) {
  const { lang, isRTL } = useLanguage();

  if (!page) return null;

  const title = lang === 'ar' ? (page.title_ar || page.title_fr) : (page.title_fr || page.title_ar);
  const subtitle = lang === 'ar' ? (page.subtitle_ar || page.subtitle_fr) : (page.subtitle_fr || page.subtitle_ar);
  const content = lang === 'ar' ? (page.content_ar || page.content_fr) : (page.content_fr || page.content_ar);

  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  // Format paragraphs
  const paragraphs = (content || '').split('\n').filter(p => p.trim().length > 0);

  return (
    <article className="custom-page-container">
      {/* Breadcrumb & Navigation */}
      <div className="custom-page-header-bar">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem' }}>
          <div className="custom-page-breadcrumbs">
            <button type="button" onClick={onBackToHome} className="btn-breadcrumb-home">
              <BackIcon size={16} />
              <span>{lang === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Retour à l\'accueil'}</span>
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{title}</span>
          </div>

          {onEditPage && (
            <button 
              type="button" 
              onClick={() => onEditPage(page)}
              className="btn-page-quick-edit"
              title={lang === 'ar' ? 'تعديل محتوى وبيانات هذه الصفحة' : 'Modifier cette page'}
            >
              <Edit3 size={15} />
              <span>{lang === 'ar' ? 'تعديل هذه الصفحة' : 'Modifier la page'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Header */}
      <section className="custom-page-hero">
        <div className="container">
          <div className="custom-page-hero-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <div className="custom-page-badge" style={{ marginBottom: 0 }}>
                <BookOpen size={14} />
                <span>{lang === 'ar' ? 'صفحة رسمية' : 'Page Officielle'}</span>
              </div>

              {onEditPage && (
                <button 
                  type="button" 
                  onClick={() => onEditPage(page)}
                  className="btn-page-hero-edit"
                >
                  <Edit3 size={14} />
                  <span>{lang === 'ar' ? 'تعديل الصفحة' : 'Modifier'}</span>
                </button>
              )}
            </div>
            <h1 className="custom-page-title">{title}</h1>
            {subtitle && <p className="custom-page-subtitle">{subtitle}</p>}
            
            <div className="custom-page-meta">
              {page.created_at && (
                <span className="custom-meta-item">
                  <Calendar size={15} />
                  <span>{new Date(page.created_at).toLocaleDateString(lang === 'ar' ? 'ar-MA' : 'fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="container">
        <div className="custom-page-layout">
          <main className="custom-page-main">
            {page.image_url && (
              <div className="custom-page-featured-img-wrap">
                <img src={page.image_url} alt={title} className="custom-page-featured-img" />
              </div>
            )}

            <div className="custom-page-body-text">
              {paragraphs.map((p, idx) => {
                // Check if it's a heading (starts with number or dash or bold-like)
                const isHeading = p.startsWith('أولاً:') || p.startsWith('ثانياً:') || p.startsWith('ثالثاً:') || p.startsWith('رابعاً:') || /^\d+\./.test(p);
                const isBullet = p.startsWith('-') || p.startsWith('•') || p.startsWith('*');

                if (isHeading) {
                  return <h3 key={idx} className="page-section-heading">{p}</h3>;
                }
                if (isBullet) {
                  return (
                    <li key={idx} className="page-bullet-item">
                      {p.replace(/^[-•*]\s*/, '')}
                    </li>
                  );
                }
                return <p key={idx} className="page-paragraph">{p}</p>;
              })}
            </div>
          </main>

          {/* Sidebar CTA & Contact */}
          <aside className="custom-page-sidebar">
            <div className="page-sidebar-card">
              <h4 className="sidebar-card-title">
                {lang === 'ar' ? 'التسجيل الأولي مفتوح' : 'Inscriptions Ouvertes'}
              </h4>
              <p className="sidebar-card-desc">
                {lang === 'ar'
                  ? 'ندعوكم لتسجيل أبنائكم في أسلاك الإعدادي والتأهيلي للموسم الدراسي الجديد.'
                  : 'Rejoignez le Lycée Collège El Farah Privé pour l\'excellence de votre parcours.'}
              </p>
              <button 
                type="button" 
                onClick={onOpenRegister} 
                className="btn-sidebar-register"
              >
                {lang === 'ar' ? 'تقديم طلب تسجيل' : 'Demander une inscription'}
              </button>
            </div>

            <div className="page-sidebar-contact">
              <h5 className="sidebar-contact-title">{lang === 'ar' ? 'هل لديك أي استفسار؟' : 'Une question ?'}</h5>
              <div className="sidebar-contact-list">
                <a href={`tel:${settings?.phone || '0522283699'}`} className="sidebar-contact-link" dir="ltr">
                  <Phone size={16} />
                  <span>{settings?.phone || '05 22 28 36 99'}</span>
                </a>
                <a 
                  href="https://wa.me/212661234567" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="sidebar-contact-link wa"
                >
                  <MessageCircle size={16} />
                  <span>{lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'WhatsApp Direct'}</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
