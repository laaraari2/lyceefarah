import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Palette, 
  Check, 
  X, 
  RotateCcw, 
  Sparkles, 
  EyeOff, 
  SunMedium, 
  Sliders, 
  Trash2 
} from 'lucide-react';

const PRESET_GRADIENTS = [
  {
    id: 'default-royal',
    nameAr: 'الأزرق الملكي (الافتراضي)',
    nameFr: 'Bleu Royal Classique',
    value: 'linear-gradient(135deg, rgba(7, 59, 112, 0.94) 0%, rgba(5, 42, 80, 0.88) 60%, rgba(36, 125, 187, 0.78) 100%)',
    c1: '#073b70',
    c2: '#247dbb'
  },
  {
    id: 'midnight-dark',
    nameAr: 'الليلي الفاخر (Midnight Dark)',
    nameFr: 'Bleu Nuit Foncé',
    value: 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(2, 6, 23, 0.92) 60%, rgba(30, 41, 59, 0.85) 100%)',
    c1: '#0f172a',
    c2: '#1e293b'
  },
  {
    id: 'emerald-green',
    nameAr: 'الأخضر الزمردي الراقي',
    nameFr: 'Vert Émeraude Élégant',
    value: 'linear-gradient(135deg, rgba(6, 78, 59, 0.95) 0%, rgba(4, 47, 46, 0.90) 60%, rgba(13, 148, 136, 0.80) 100%)',
    c1: '#064e3b',
    c2: '#0d9488'
  },
  {
    id: 'imperial-purple',
    nameAr: 'الأرجواني الملكي (Imperial Violet)',
    nameFr: 'Pourpre Impérial',
    value: 'linear-gradient(135deg, rgba(59, 7, 100, 0.95) 0%, rgba(30, 7, 59, 0.90) 60%, rgba(124, 58, 237, 0.80) 100%)',
    c1: '#3b0764',
    c2: '#7c3aed'
  },
  {
    id: 'navy-gold',
    nameAr: 'الكحلي والذهبي الأكاديمي',
    nameFr: 'Bleu Marine & Or',
    value: 'linear-gradient(135deg, rgba(7, 59, 112, 0.95) 0%, rgba(30, 58, 138, 0.90) 50%, rgba(180, 83, 9, 0.80) 100%)',
    c1: '#073b70',
    c2: '#b45309'
  },
  {
    id: 'bordeaux-red',
    nameAr: 'العنابي الراقي (Bordeaux)',
    nameFr: 'Bordeaux Élégant',
    value: 'linear-gradient(135deg, rgba(88, 28, 28, 0.95) 0%, rgba(69, 10, 10, 0.90) 60%, rgba(153, 27, 27, 0.80) 100%)',
    c1: '#581c1c',
    c2: '#991b1b'
  }
];

export default function HeroColorModal({ 
  isOpen, 
  onClose, 
  currentGradient, 
  currentOpacity = '0.9',
  currentBgOpacity = '0.35',
  onSave, 
  onReset 
}) {
  const { lang } = useLanguage();

  const [selectedGradient, setSelectedGradient] = useState(currentGradient || PRESET_GRADIENTS[0].value);
  const [overlayOpacity, setOverlayOpacity] = useState(
    currentGradient === 'none' ? '0' : Math.round(parseFloat(currentOpacity || '0.9') * 100).toString()
  );
  const [photoOpacity, setPhotoOpacity] = useState(
    Math.round(parseFloat(currentBgOpacity || '0.35') * 100).toString()
  );
  const [isOverlayRemoved, setIsOverlayRemoved] = useState(currentGradient === 'none' || currentOpacity === '0');

  // Custom Colors
  const [customC1, setCustomC1] = useState('#073b70');
  const [customC2, setCustomC2] = useState('#247dbb');
  const [customAngle, setCustomAngle] = useState('135');
  const [activeTab, setActiveTab] = useState('presets'); // 'presets' | 'custom'

  useEffect(() => {
    if (isOpen) {
      const isNone = currentGradient === 'none' || currentOpacity === '0';
      setSelectedGradient(currentGradient || PRESET_GRADIENTS[0].value);
      setIsOverlayRemoved(isNone);
      setOverlayOpacity(isNone ? '0' : Math.round(parseFloat(currentOpacity || '0.9') * 100).toString());
      setPhotoOpacity(Math.round(parseFloat(currentBgOpacity || '0.35') * 100).toString());
    }
  }, [isOpen, currentGradient, currentOpacity, currentBgOpacity]);

  if (!isOpen) return null;

  const hexToRgba = (hex, opacityPercent) => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
    const a = (parseInt(opacityPercent, 10) / 100).toFixed(2);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const handleCustomColorChange = (c1, c2, angle) => {
    const rgba1 = hexToRgba(c1, 95);
    const rgba2 = hexToRgba(c2, 80);
    const newGrad = `linear-gradient(${angle}deg, ${rgba1} 0%, ${rgba2} 100%)`;
    setSelectedGradient(newGrad);
    if (isOverlayRemoved) {
      setIsOverlayRemoved(false);
      setOverlayOpacity('90');
    }
  };

  // Quick Action: Remove overlay completely (show raw image)
  const handleRemoveOverlayToggle = () => {
    if (!isOverlayRemoved) {
      setIsOverlayRemoved(true);
      setOverlayOpacity('0');
      // When removing color overlay, boost photo brightness to 80% so it looks great
      if (parseInt(photoOpacity, 10) < 60) {
        setPhotoOpacity('85');
      }
    } else {
      setIsOverlayRemoved(false);
      setOverlayOpacity('90');
      if (selectedGradient === 'none') {
        setSelectedGradient(PRESET_GRADIENTS[0].value);
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const finalGradient = isOverlayRemoved ? 'none' : selectedGradient;
    const finalOpacity = isOverlayRemoved ? '0' : (parseInt(overlayOpacity, 10) / 100).toFixed(2);
    const finalBgOpacity = (parseInt(photoOpacity, 10) / 100).toFixed(2);

    onSave({
      gradient: finalGradient,
      overlayOpacity: finalOpacity,
      bgOpacity: finalBgOpacity
    });
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  const getOpacityDescription = (val) => {
    const n = parseInt(val, 10);
    if (n === 0) return lang === 'ar' ? 'محذوف تماماً (شفاف 100%)' : 'Supprimé (100% transparent)';
    if (n <= 30) return lang === 'ar' ? 'خفيف جداً وشبه شفاف' : 'Très léger';
    if (n <= 60) return lang === 'ar' ? 'تدرج متوسط وخافت' : 'Moyen & équilibré';
    if (n <= 85) return lang === 'ar' ? 'درجة متوازنة وواضحة (مستحسن)' : 'Équilibré & Recommandé';
    return lang === 'ar' ? 'لون قوي وداكن جداً' : 'Opaque & Foncé';
  };

  return (
    <div className="live-editor-modal-backdrop" onClick={onClose}>
      <div 
        className="live-editor-modal-card" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div className="live-modal-header">
          <div className="live-modal-title-wrap">
            <Palette size={20} color="#F28A24" />
            <div>
              <h3 className="live-modal-title">
                {lang === 'ar' ? 'التحكم في لون ودرجة خلفية الـ Hero' : 'Contrôle de couleur & opacité Hero'}
              </h3>
              <span className="live-modal-subtitle">
                {lang === 'ar' ? 'تخصيص درجة اللون، الشفافية، أو حذف طبقة اللون بالكامل' : 'Ajustez l\'opacité ou supprimez le filtre'}
              </span>
            </div>
          </div>
          <button type="button" onClick={onClose} className="live-modal-close-btn">
            <X size={18} />
          </button>
        </div>

        {/* Live Preview Box */}
        <div style={{
          width: '100%',
          height: '110px',
          borderRadius: '12px',
          background: isOverlayRemoved ? '#1e293b' : selectedGradient,
          opacity: isOverlayRemoved ? 1 : Math.max(0.2, parseInt(overlayOpacity, 10) / 100),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '0.98rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
          marginBottom: '1.2rem',
          border: isOverlayRemoved ? '2px dashed #94a3b8' : '2px solid rgba(255,255,255,0.2)',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          transition: 'all 0.2s ease',
          position: 'relative'
        }}>
          {isOverlayRemoved ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171' }}>
              <EyeOff size={20} />
              <span>{lang === 'ar' ? 'تم حذف طبقة اللون — ستظهر صورة الخلفية فقط' : 'Filtre de couleur supprimé'}</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="#fbbf24" />
              <span>{lang === 'ar' ? `معاينة درجة اللون (${overlayOpacity}%)` : `Aperçu de couleur (${overlayOpacity}%)`}</span>
            </div>
          )}
        </div>

        {/* Quick Action: Remove or Enable Overlay Toggle */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          background: isOverlayRemoved ? '#fef2f2' : '#f8fafc',
          padding: '0.8rem 1rem',
          borderRadius: '10px',
          border: isOverlayRemoved ? '1.5px solid #fca5a5' : '1px solid #e2e8f0',
          marginBottom: '1.2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {isOverlayRemoved ? <EyeOff size={18} color="#dc2626" /> : <SunMedium size={18} color="#2563eb" />}
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: isOverlayRemoved ? '#991b1b' : '#1e293b' }}>
                {isOverlayRemoved 
                  ? (lang === 'ar' ? 'طبقة اللون محذوفة حالياً' : 'Filtre de couleur désactivé')
                  : (lang === 'ar' ? 'طبقة اللون مفعّلة' : 'Filtre de couleur activé')}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                {isOverlayRemoved 
                  ? (lang === 'ar' ? 'تظهر صورة الخلفية الأصلية بكامل وضوحها بدون أي تلوين' : 'Seule l\'image d\'arrière-plan s\'affiche')
                  : (lang === 'ar' ? 'يتم تطبيق تدرج لوني لحماية قراءة النصوص' : 'Un dégradé améliore la lisibilité du texte')}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemoveOverlayToggle}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none',
              background: isOverlayRemoved ? '#dc2626' : '#f1f5f9',
              color: isOverlayRemoved ? '#ffffff' : '#334155',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            {isOverlayRemoved ? (
              <>
                <RotateCcw size={14} />
                <span>{lang === 'ar' ? 'إعادة تفعيل اللون' : 'Réactiver'}</span>
              </>
            ) : (
              <>
                <Trash2 size={14} color="#dc2626" />
                <span>{lang === 'ar' ? 'حذف طبقة اللون' : 'Supprimer le filtre'}</span>
              </>
            )}
          </button>
        </div>

        {/* SLIDER 1: Overlay Opacity & Intensity */}
        <div className="live-form-field" style={{ marginBottom: '1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>
              <span>{lang === 'ar' ? 'درجة قوة وكثافة اللون (Overlay Opacity)' : 'Intensité de la couleur'}</span>
            </label>
            <span style={{ 
              fontSize: '0.82rem', 
              fontWeight: 800, 
              color: isOverlayRemoved ? '#dc2626' : '#2563eb',
              background: isOverlayRemoved ? '#fee2e2' : '#eff6ff',
              padding: '0.2rem 0.6rem',
              borderRadius: '6px'
            }}>
              {isOverlayRemoved ? '0%' : `${overlayOpacity}%`}
            </span>
          </div>

          <input 
            type="range" 
            min="0" 
            max="100" 
            step="5"
            value={isOverlayRemoved ? '0' : overlayOpacity}
            onChange={(e) => {
              const val = e.target.value;
              setOverlayOpacity(val);
              if (val === '0') {
                setIsOverlayRemoved(true);
              } else if (isOverlayRemoved) {
                setIsOverlayRemoved(false);
              }
            }}
            style={{ width: '100%', accentColor: '#2563eb', cursor: 'pointer' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b', marginTop: '0.35rem' }}>
            <span>0% (بدون لون / شفاف)</span>
            <span style={{ color: '#2563eb', fontWeight: 700 }}>
              {getOpacityDescription(isOverlayRemoved ? '0' : overlayOpacity)}
            </span>
            <span>100% (داكن جداً)</span>
          </div>
        </div>

        {/* SLIDER 2: Background Photo Brightness */}
        <div className="live-form-field" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>
              <span>{lang === 'ar' ? 'درجة سطوع صورة الخلفية (Photo Brightness)' : 'Visibilité de l\'image photo'}</span>
            </label>
            <span style={{ 
              fontSize: '0.82rem', 
              fontWeight: 800, 
              color: '#0891b2',
              background: '#ecfeff',
              padding: '0.2rem 0.6rem',
              borderRadius: '6px'
            }}>
              {photoOpacity}%
            </span>
          </div>

          <input 
            type="range" 
            min="10" 
            max="100" 
            step="5"
            value={photoOpacity}
            onChange={(e) => setPhotoOpacity(e.target.value)}
            style={{ width: '100%', accentColor: '#0891b2', cursor: 'pointer' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b', marginTop: '0.35rem' }}>
            <span>10% (خافتة)</span>
            <span>{lang === 'ar' ? 'التحكم في وضوح صورة مبنى المؤسسة' : 'Clarté de la photo de fond'}</span>
            <span>100% (واضحة تماماً)</span>
          </div>
        </div>

        {/* Tabs: Presets vs Custom (Disabled if overlay is removed) */}
        {!isOverlayRemoved && (
          <>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button
                type="button"
                onClick={() => setActiveTab('presets')}
                style={{
                  flex: 1,
                  padding: '0.55rem',
                  borderRadius: '8px',
                  border: activeTab === 'presets' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                  background: activeTab === 'presets' ? '#eff6ff' : '#ffffff',
                  color: activeTab === 'presets' ? '#1d4ed8' : '#475569',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {lang === 'ar' ? '🎨 تدرجات ألوان جاهزة وراقية' : 'Dégradés Recommandés'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('custom')}
                style={{
                  flex: 1,
                  padding: '0.55rem',
                  borderRadius: '8px',
                  border: activeTab === 'custom' ? '2px solid #2563eb' : '1px solid #cbd5e1',
                  background: activeTab === 'custom' ? '#eff6ff' : '#ffffff',
                  color: activeTab === 'custom' ? '#1d4ed8' : '#475569',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {lang === 'ar' ? '⚙️ اختيار وتخصيص درجات الألوان' : 'Couleurs Personnalisées'}
              </button>
            </div>

            {/* Presets Grid */}
            {activeTab === 'presets' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.65rem',
                marginBottom: '1.5rem'
              }}>
                {PRESET_GRADIENTS.map((p) => {
                  const isSelected = selectedGradient === p.value;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setSelectedGradient(p.value);
                        if (isOverlayRemoved) setIsOverlayRemoved(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.7rem',
                        padding: '0.6rem 0.8rem',
                        borderRadius: '10px',
                        border: isSelected ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
                        background: isSelected ? '#f0f7ff' : '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'start',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 0 0 2px rgba(37,99,235,0.2)' : 'none'
                      }}
                    >
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        background: p.value,
                        flexShrink: 0,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                      }} />
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {lang === 'ar' ? p.nameAr : p.nameFr}
                        </div>
                      </div>
                      {isSelected && <Check size={15} color="#2563eb" style={{ flexShrink: 0 }} />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Custom Color Pickers */}
            {activeTab === 'custom' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="live-form-field">
                    <label><span>{lang === 'ar' ? 'اللون الأول (البداية)' : 'Couleur 1 (Début)'}</span></label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input 
                        type="color" 
                        value={customC1} 
                        onChange={(e) => {
                          setCustomC1(e.target.value);
                          handleCustomColorChange(e.target.value, customC2, customAngle);
                        }}
                        style={{ width: '42px', height: '36px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #cbd5e1' }}
                      />
                      <input 
                        type="text" 
                        value={customC1} 
                        onChange={(e) => {
                          setCustomC1(e.target.value);
                          handleCustomColorChange(e.target.value, customC2, customAngle);
                        }}
                        className="live-input-field" 
                        dir="ltr"
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>

                  <div className="live-form-field">
                    <label><span>{lang === 'ar' ? 'اللون الثاني (النهاية)' : 'Couleur 2 (Fin)'}</span></label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input 
                        type="color" 
                        value={customC2} 
                        onChange={(e) => {
                          setCustomC2(e.target.value);
                          handleCustomColorChange(customC1, e.target.value, customAngle);
                        }}
                        style={{ width: '42px', height: '36px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #cbd5e1' }}
                      />
                      <input 
                        type="text" 
                        value={customC2} 
                        onChange={(e) => {
                          setCustomC2(e.target.value);
                          handleCustomColorChange(customC1, e.target.value, customAngle);
                        }}
                        className="live-input-field" 
                        dir="ltr"
                        style={{ flex: 1 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="live-form-field">
                  <label><span>{lang === 'ar' ? 'زاوية انحدار التدرج' : 'Angle du dégradé'} ({customAngle}°)</span></label>
                  <select 
                    value={customAngle}
                    onChange={(e) => {
                      setCustomAngle(e.target.value);
                      handleCustomColorChange(customC1, customC2, e.target.value);
                    }}
                    className="live-input-field"
                  >
                    <option value="135">135° مائل قطري (مستحسن)</option>
                    <option value="90">90° أفقي من اليمين إلى اليسار</option>
                    <option value="180">180° عمودي من الأعلى للأسفل</option>
                    <option value="45">45° مائل عكسي</option>
                  </select>
                </div>
              </div>
            )}
          </>
        )}

        {/* Modal Actions */}
        <div className="live-modal-actions" style={{ justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
          <button 
            type="button" 
            onClick={handleReset}
            className="btn-live-delete"
            title="استعادة الإعدادات الأصلية"
          >
            <RotateCcw size={15} />
            <span>{lang === 'ar' ? 'استعادة الافتراضي' : 'Réinitialiser'}</span>
          </button>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button type="button" onClick={onClose} className="btn-live-cancel">
              {lang === 'ar' ? 'إلغاء' : 'Annuler'}
            </button>
            <button type="submit" onClick={handleSave} className="btn-live-save">
              <Check size={16} />
              <span>{lang === 'ar' ? 'حفظ وتطبيق فوراً' : 'Sauvegarder et Appliquer'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
