import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Edit3 } from 'lucide-react';

export default function Editable({ 
  textKey, 
  label, 
  as = 'span', 
  multiline = false, 
  className = '', 
  style = {}, 
  children 
}) {
  const { t, isLiveEditMode, openLiveEditor } = useLanguage();
  const Tag = as;

  const content = textKey ? t(textKey) : children;

  if (!isLiveEditMode) {
    return <Tag className={className} style={style}>{content}</Tag>;
  }

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openLiveEditor(textKey, label || textKey, multiline);
  };

  return (
    <Tag 
      className={`live-editable-wrap ${className}`} 
      style={{ ...style, position: 'relative' }}
      onClick={handleEditClick}
      title="انقر لتعديل هذا النص مباشرة"
    >
      {content}
      <button 
        type="button" 
        className="live-edit-pencil-btn"
        onClick={handleEditClick}
        title="تعديل هذا النص"
        aria-label="Edit text"
      >
        <Edit3 size={12} />
      </button>
    </Tag>
  );
}
