import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Editable from './Editable';
import EditableMedia from './EditableMedia';
import { Quote, Sparkles, Award } from 'lucide-react';

export default function WelcomeMessage() {
  const { lang, t } = useLanguage();

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container">
        <div className="welcome-card">
          {/* Director Real Photo with Live Edit */}
          <div className="welcome-media">
            <EditableMedia 
              mediaKey="director_photo"
              label="صورة السيد المدير العام"
              src="/images/directeur.png" 
              alt="M. Mohamed Fadli - Directeur Lycée El Farah" 
              className="welcome-img"
            />
            <div className="welcome-badge">
              <Award size={14} style={{ display: 'inline', margin: '0 4px' }} />
              <span>{lang === 'ar' ? 'إشراف تربوي رائد' : 'Direction Pédagogique'}</span>
            </div>
          </div>

          {/* Director Message */}
          <div className="welcome-content">
            <span className="welcome-tag">
              <Editable textKey="director_title" label="عنوان كلمة المدير" />
            </span>
            <h2 className="welcome-name">
              <Editable textKey="director_name" label="اسم السيد المدير العام" />
            </h2>
            <div className="welcome-role">
              <Editable textKey="director_role" label="صفة المدير ومسؤوليته" />
            </div>

            <div className="welcome-quote">
              <Quote size={28} color="rgba(7, 59, 112, 0.15)" style={{ marginBottom: '0.5rem' }} />
              <Editable 
                textKey="director_message" 
                label="نص كلمة السيد المدير العام" 
                as="p" 
                multiline 
              />
            </div>

            <div className="welcome-footer">
              <div className="slogan-pill">
                <Sparkles size={16} color="#F28A24" />
                <Editable textKey="hero_slogan" label="شعار المؤسسة" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}