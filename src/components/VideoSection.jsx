import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Editable from './Editable';
import { Video, Film, Edit3 } from 'lucide-react';

export default function VideoSection({ videos = [] }) {
  const { lang, t, isLiveEditMode, getMediaOverride, openMediaEditor } = useLanguage();

  return (
    <section id="videos" className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag tag-orange">
            <Video size={16} />
            <Editable textKey="videos_title" label="شارة قسم الفيديو" />
          </div>
          <h2 className="section-title">
            <Editable textKey="videos_main_title" label="عنوان قسم الفيديو الرئيسي" />
          </h2>
          <Editable 
            textKey="videos_subtitle" 
            label="العنوان الفرعي لقسم الفيديو" 
            as="p" 
            className="section-subtitle" 
          />
        </div>

        <div className="videos-grid">
          {videos.map(vid => {
            const videoKey = `video_item_${vid.id}`;
            const resolvedUrl = getMediaOverride(videoKey) || vid.video_url;

            return (
              <div key={vid.id} className="video-card" style={{ position: 'relative' }}>
                {isLiveEditMode && (
                  <div className="live-media-edit-badge" style={{ top: 8, insetInlineEnd: 8 }}>
                    <button 
                      type="button"
                      className="live-media-edit-btn"
                      onClick={() => openMediaEditor(videoKey, `فيديو: ${vid.title_ar || vid.title_fr}`, resolvedUrl, 'video')}
                      title="تعديل رابط الفيديو أو رفعه"
                    >
                      <Film size={14} />
                      <span>{lang === 'ar' ? 'تعديل هذا الفيديو' : 'Modifier la vidéo'}</span>
                    </button>
                  </div>
                )}

                <div className="video-player-wrap">
                  {resolvedUrl.includes('youtube.com') || resolvedUrl.includes('youtu.be') ? (
                    <iframe 
                      src={resolvedUrl.replace('watch?v=', 'embed/')} 
                      title={lang === 'ar' ? vid.title_ar : vid.title_fr} 
                      allowFullScreen 
                    />
                  ) : (
                    <video controls poster={vid.thumbnail_url} key={resolvedUrl}>
                      <source src={resolvedUrl} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div className="video-details">
                  <h3 className="video-title">
                    {lang === 'ar' ? vid.title_ar : vid.title_fr}
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600 }}>
                    {vid.duration ? `${vid.duration} min` : 'HD'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}