import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Editable from './Editable';
import EditableMedia from './EditableMedia';
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
            <Editable textKey="news_title" label="شارة قسم الأخبار" />
          </div>
          <h2 className="section-title">
            <Editable textKey="news_main_title" label="عنوان قسم الأخبار الرئيسي" />
          </h2>
          <Editable 
            textKey="news_subtitle" 
            label="العنوان الفرعي لقسم الأخبار" 
            as="p" 
            className="section-subtitle" 
          />
        </div>

        <div className="news-grid">
          {news.map(item => (
            <article key={item.id} className="news-card">
              <div className="news-thumb">
                <EditableMedia 
                  mediaKey={`news_item_${item.id}`}
                  label={lang === 'ar' ? (item.title_ar || 'صورة الخبر') : (item.title_fr || 'Photo Actualité')}
                  src={item.image_url || '/images/building.png'} 
                  alt={lang === 'ar' ? item.title_ar : item.title_fr} 
                  imgProps={{ loading: 'lazy' }}
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