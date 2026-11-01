import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Camera, Film } from 'lucide-react';

/**
 * EditableMedia — WordPress-style live editable wrapper for images and videos.
 * 
 * Props:
 *   mediaKey      — unique key for this media element (e.g. "hero_bg", "logo")
 *   label         — descriptive label shown in edit UI (Arabic)
 *   src           — default/fallback src URL
 *   alt           — alt text for images
 *   type          — "image" (default) or "video"
 *   className     — CSS class name for the media element (img/video)
 *   style         — inline styles for the media element
 *   wrapClassName — extra class for the edit wrapper
 *   wrapStyle     — inline styles for the wrapper
 *   imgProps      — extra props to spread on <img>
 *   videoProps    — extra props for <video>
 */
export default function EditableMedia({
  mediaKey,
  label,
  src,
  alt = '',
  type = 'image',
  className = '',
  style = {},
  wrapClassName = '',
  wrapStyle = {},
  imgProps = {},
  videoProps = {}
}) {
  const { isLiveEditMode, getMediaOverride, openMediaEditor } = useLanguage();

  // Resolve the actual source: override > default
  const resolvedSrc = getMediaOverride(mediaKey) || src;

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openMediaEditor(mediaKey, label || mediaKey, resolvedSrc, type);
  };

  // Non-edit mode: render raw media element directly
  if (!isLiveEditMode) {
    if (type === 'video') {
      return (
        <video 
          className={className} 
          style={style} 
          src={resolvedSrc}
          {...videoProps}
        />
      );
    }
    return (
      <img 
        className={className} 
        style={style} 
        src={resolvedSrc} 
        alt={alt}
        {...imgProps}
      />
    );
  }

  // Live Edit mode: wrap with WordPress-like hover badge & border
  const IconType = type === 'video' ? Film : Camera;

  return (
    <div 
      className={`live-editable-media-wrap ${wrapClassName}`}
      style={wrapStyle}
      onClick={handleEditClick}
      title={label || 'انقر لتعديل هذا الوسائط'}
    >
      {type === 'video' ? (
        <video 
          className={className} 
          style={style} 
          src={resolvedSrc}
          {...videoProps}
        />
      ) : (
        <img 
          className={className} 
          style={style} 
          src={resolvedSrc} 
          alt={alt}
          {...imgProps}
        />
      )}

      {/* Floating media edit badge */}
      <div className="live-media-edit-badge">
        <button 
          type="button"
          className="live-media-edit-btn"
          onClick={handleEditClick}
          title={`تعديل: ${label || mediaKey}`}
        >
          <IconType size={14} />
          <span>{type === 'video' ? 'تعديل الفيديو' : 'تعديل الصورة'}</span>
        </button>
      </div>
    </div>
  );
}
