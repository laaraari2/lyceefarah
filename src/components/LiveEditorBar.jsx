import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Edit3, 
  RotateCcw, 
  LayoutDashboard, 
  Check, 
  X, 
  Globe, 
  Camera, 
  Film, 
  Upload, 
  Link2, 
  Trash2, 
  Image as ImageIcon 
} from 'lucide-react';

export default function LiveEditorBar({ onNavigateAdmin }) {
  const { 
    lang, 
    setLang, 
    isLiveEditMode, 
    toggleLiveEditMode, 
    activeEditItem, 
    closeLiveEditor, 
    updateTranslation, 
    resetAllOverrides,
    activeMediaItem,
    closeMediaEditor,
    updateMediaOverride,
    removeMediaOverride
  } = useLanguage();
  const { isAdmin } = useAuth();

  // Text modal form states
  const [arText, setArText] = useState('');
  const [frText, setFrText] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Media modal form states
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaPreview, setMediaPreview] = useState('');
  const [mediaSaved, setMediaSaved] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (activeEditItem) {
      setArText(activeEditItem.ar || '');
      setFrText(activeEditItem.fr || '');
    }
  }, [activeEditItem]);

  useEffect(() => {
    if (activeMediaItem) {
      setMediaUrl(activeMediaItem.currentSrc || '');
      setMediaPreview(activeMediaItem.currentSrc || '');
    }
  }, [activeMediaItem]);

  if (!isAdmin) {
    return null;
  }

  // Show the live-edit entry point only to an authenticated admin.
  if (!isLiveEditMode) {
    return (
      <button 
        type="button" 
        onClick={toggleLiveEditMode}
        className="live-editor-floating-trigger"
        title={lang === 'ar' ? 'تفعيل وضع التعديل المرئي المباشر مثل ووردبريس' : "Activer l'éditeur visuel en direct"}
      >
        <Edit3 size={16} color="#fbbf24" />
        <span>{lang === 'ar' ? 'تعديل الصفحة المباشر' : 'Modifier la page'}</span>
      </button>
    );
  }

  const handleSaveTextModal = (e) => {
    e.preventDefault();
    if (!activeEditItem) return;

    updateTranslation(activeEditItem.key, arText, frText);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      closeLiveEditor();
    }, 400);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setMediaUrl(dataUrl);
      setMediaPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveMedia = (e) => {
    e.preventDefault();
    if (!activeMediaItem) return;
    updateMediaOverride(activeMediaItem.key, mediaUrl);
    setMediaSaved(true);
    setTimeout(() => {
      setMediaSaved(false);
      closeMediaEditor();
    }, 400);
  };

  const handleResetMedia = () => {
    if (!activeMediaItem) return;
    removeMediaOverride(activeMediaItem.key);
    setMediaSaved(true);
    setTimeout(() => {
      setMediaSaved(false);
      closeMediaEditor();
    }, 400);
  };

  return (
    <>
      {/* Top Floating WordPress-style Admin Toolbar */}
      <div className="live-editor-topbar">
        <div className="live-editor-topbar-content container">
          <div className="live-editor-brand">
            <span className="live-editor-logo-dot"></span>
            <Sparkles size={16} color="#fbbf24" />
            <strong className="live-editor-title">
              {lang === 'ar' ? 'وضع التعديل المرئي المباشر (WordPress Style)' : 'Mode Éditeur Visuel en Direct'}
            </strong>
          </div>

          <div className="live-editor-controls">
            <button 
              type="button" 
              onClick={toggleLiveEditMode}
              className={`btn-toggle-live-edit ${isLiveEditMode ? 'active' : ''}`}
            >
              <Edit3 size={14} />
              <span>
                {isLiveEditMode 
                  ? (lang === 'ar' ? 'التعديل مفعّل (انقر على أي نص أو صورة)' : 'Édition Active (Cliquez sur tout élément)')
                  : (lang === 'ar' ? 'تفعيل أزرار التعديل' : 'Activer l\'éditeur')}
              </span>
            </button>

            <button 
              type="button" 
              onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')}
              className="btn-live-lang"
              title="Changer de langue / تغيير لغة المعاينة"
            >
              <Globe size={13} />
              <span>{lang === 'ar' ? 'معاينة بالفرنسية' : 'Aperçu Arabe'}</span>
            </button>

            {onNavigateAdmin && (
              <button 
                type="button" 
                onClick={onNavigateAdmin} 
                className="btn-live-dashboard"
              >
                <LayoutDashboard size={14} />
                <span>{lang === 'ar' ? 'لوحة التحكم' : 'Tableau de bord'}</span>
              </button>
            )}

            <button 
              type="button" 
              onClick={resetAllOverrides}
              className="btn-live-reset"
              title={lang === 'ar' ? 'إعادة ضبط كافة النصوص والصور للوضع الافتراضي' : 'Réinitialiser'}
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* 1. Live Text Editor Modal */}
      {activeEditItem && (
        <div className="live-editor-modal-backdrop" onClick={closeLiveEditor}>
          <div className="live-editor-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="live-modal-header">
              <div className="live-modal-title-wrap">
                <Edit3 size={18} color="#2563eb" />
                <div>
                  <h3 className="live-modal-title">
                    {lang === 'ar' ? 'تعديل هذا النص مباشرة' : 'Modifier le texte'}
                  </h3>
                  <span className="live-modal-subtitle">{activeEditItem.label}</span>
                </div>
              </div>
              <button type="button" onClick={closeLiveEditor} className="live-modal-close-btn">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTextModal} className="live-modal-form">
              <div className="live-form-field">
                <label>
                  <span>{lang === 'ar' ? 'النص باللغة العربية' : 'Texte en Arabe'}</span>
                  <span className="lang-tag">العربية</span>
                </label>
                {activeEditItem.multiline ? (
                  <textarea 
                    rows={4}
                    value={arText}
                    onChange={(e) => setArText(e.target.value)}
                    dir="rtl"
                    className="live-input-field"
                    required
                  />
                ) : (
                  <input 
                    type="text"
                    value={arText}
                    onChange={(e) => setArText(e.target.value)}
                    dir="rtl"
                    className="live-input-field"
                    required
                  />
                )}
              </div>

              <div className="live-form-field">
                <label>
                  <span>{lang === 'ar' ? 'النص باللغة الفرنسية' : 'Texte en Français'}</span>
                  <span className="lang-tag">Français</span>
                </label>
                {activeEditItem.multiline ? (
                  <textarea 
                    rows={4}
                    value={frText}
                    onChange={(e) => setFrText(e.target.value)}
                    dir="ltr"
                    className="live-input-field"
                  />
                ) : (
                  <input 
                    type="text"
                    value={frText}
                    onChange={(e) => setFrText(e.target.value)}
                    dir="ltr"
                    className="live-input-field"
                  />
                )}
              </div>

              <div className="live-modal-actions">
                <button type="button" onClick={closeLiveEditor} className="btn-live-cancel">
                  {lang === 'ar' ? 'إلغاء' : 'Annuler'}
                </button>
                <button type="submit" className="btn-live-save">
                  {savedSuccess ? (
                    <>
                      <Check size={16} />
                      <span>{lang === 'ar' ? 'تم الحفظ والتطبيق !' : 'Enregistré !'}</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      <span>{lang === 'ar' ? 'حفظ وتطبيق فوراً' : 'Sauvegarder et Appliquer'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Live Media Editor Modal (Images & Videos) */}
      {activeMediaItem && (
        <div className="live-editor-modal-backdrop" onClick={closeMediaEditor}>
          <div className="live-editor-modal-card live-media-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="live-modal-header">
              <div className="live-modal-title-wrap">
                {activeMediaItem.mediaType === 'video' ? (
                  <Film size={20} color="#F28A24" />
                ) : (
                  <Camera size={20} color="#2563eb" />
                )}
                <div>
                  <h3 className="live-modal-title">
                    {activeMediaItem.mediaType === 'video'
                      ? (lang === 'ar' ? 'تعديل واستبدال الفيديو' : 'Modifier la vidéo')
                      : (lang === 'ar' ? 'تعديل واستبدال الصورة' : 'Modifier l\'image')}
                  </h3>
                  <span className="live-modal-subtitle">{activeMediaItem.label}</span>
                </div>
              </div>
              <button type="button" onClick={closeMediaEditor} className="live-modal-close-btn">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveMedia} className="live-modal-form">
              {/* Media Preview Box */}
              <div className="live-media-preview-box">
                {activeMediaItem.mediaType === 'video' ? (
                  mediaPreview.includes('youtube.com') || mediaPreview.includes('youtu.be') ? (
                    <iframe 
                      src={mediaPreview.replace('watch?v=', 'embed/')} 
                      title="Preview" 
                      className="live-media-preview-elem"
                    />
                  ) : (
                    <video 
                      src={mediaPreview} 
                      controls 
                      className="live-media-preview-elem"
                    />
                  )
                ) : (
                  <img 
                    src={mediaPreview || '/images/building.png'} 
                    alt="Preview" 
                    className="live-media-preview-elem"
                    onError={(e) => {
                      e.target.src = '/images/building.png';
                    }}
                  />
                )}
              </div>

              {/* Upload Option (for Images and local videos) */}
              <div className="live-form-field">
                <label>
                  <span>{lang === 'ar' ? 'رفع ملف من حاسوبك مباشرة' : 'Téléverser depuis votre appareil'}</span>
                  <span className="lang-tag">{lang === 'ar' ? 'مستحسن' : 'Recommandé'}</span>
                </label>
                <div className="live-media-upload-row">
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    accept={activeMediaItem.mediaType === 'video' ? 'video/*' : 'image/*'} 
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-live-upload"
                  >
                    <Upload size={16} />
                    <span>
                      {activeMediaItem.mediaType === 'video' 
                        ? (lang === 'ar' ? 'اختر ملف فيديو من الجهاز' : 'Choisir une vidéo') 
                        : (lang === 'ar' ? 'اختر صورة من جهازك' : 'Choisir une image')}
                    </span>
                  </button>
                  <span className="live-upload-hint">
                    {lang === 'ar' ? 'PNG, JPG, WEBP, MP4' : 'Formats supportés'}
                  </span>
                </div>
              </div>

              {/* URL Option */}
              <div className="live-form-field">
                <label>
                  <span>{lang === 'ar' ? 'أو أدخل رابط الصورة / الفيديو (URL)' : 'Ou entrez l\'URL du média'}</span>
                  <Link2 size={14} color="#64748b" />
                </label>
                <input 
                  type="text"
                  value={mediaUrl}
                  onChange={(e) => {
                    setMediaUrl(e.target.value);
                    setMediaPreview(e.target.value);
                  }}
                  dir="ltr"
                  placeholder="https://example.com/image.jpg أو /images/name.png"
                  className="live-input-field"
                  required
                />
              </div>

              {/* Modal Actions */}
              <div className="live-modal-actions" style={{ justifyContent: 'space-between' }}>
                <button 
                  type="button" 
                  onClick={handleResetMedia}
                  className="btn-live-delete"
                  title="استعادة الصورة الأصلية"
                >
                  <Trash2 size={15} />
                  <span>{lang === 'ar' ? 'استعادة الأصلية' : 'Restaurer'}</span>
                </button>

                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button type="button" onClick={closeMediaEditor} className="btn-live-cancel">
                    {lang === 'ar' ? 'إلغاء' : 'Annuler'}
                  </button>
                  <button type="submit" className="btn-live-save">
                    {mediaSaved ? (
                      <>
                        <Check size={16} />
                        <span>{lang === 'ar' ? 'تم الحفظ والتطبيق !' : 'Enregistré !'}</span>
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        <span>{lang === 'ar' ? 'حفظ وتطبيق فوراً' : 'Sauvegarder et Appliquer'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
