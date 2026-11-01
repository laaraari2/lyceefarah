import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Editable from './Editable';
import EditableMedia from './EditableMedia';
import { Image as ImageIcon, X, Maximize2, Tag } from 'lucide-react';

export default function GallerySection({ items = [] }) {
  const { lang, t, isLiveEditMode } = useLanguage();
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
            <Editable textKey="gallery_title" label="شارة معرض الصور" />
          </div>
          <h2 className="section-title">
            <Editable textKey="gallery_main_title" label="عنوان معرض الصور الرئيسي" />
          </h2>
          <Editable 
            textKey="gallery_subtitle" 
            label="العنوان الفرعي لمعرض الصور" 
            as="p" 
            className="section-subtitle" 
          />
        </div>

        {/* Filter buttons */}
        <div className="gallery-filters">
          {filters.map(f => (
            <button
              key={f.id}
              type="button"
              className={`filter-btn ${filter === f.id ? 'active' : ''}`}
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
              onClick={() => {
                if (!isLiveEditMode) setActiveImage(item);
              }}
            >
              <EditableMedia 
                mediaKey={`gallery_item_${item.id}`}
                label={lang === 'ar' ? (item.title_ar || 'صورة المعرض') : (item.title_fr || 'Photo Galerie')}
                src={item.image_url} 
                alt={lang === 'ar' ? item.title_ar : item.title_fr} 
                imgProps={{ loading: 'lazy' }}
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