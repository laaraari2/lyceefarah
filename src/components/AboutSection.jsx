import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Editable from './Editable';
import EditableMedia from './EditableMedia';
import { 
  Award, 
  Compass, 
  BookOpenCheck, 
  Building2, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export default function AboutSection() {
  const { lang, t } = useLanguage();

  const values = [
    {
      icon: Award,
      titleKey: 'value_excellence',
      descKey: 'value_excellence_desc',
      label: 'الجودة والتميز'
    },
    {
      icon: Compass,
      titleKey: 'value_morals',
      descKey: 'value_morals_desc',
      label: 'التربية على القيم'
    },
    {
      icon: BookOpenCheck,
      titleKey: 'value_support',
      descKey: 'value_support_desc',
      label: 'الدعم والمواكبة'
    },
    {
      icon: Building2,
      titleKey: 'value_infrastructure',
      descKey: 'value_infrastructure_desc',
      label: 'تجهيزات متطورة'
    }
  ];

  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="about-grid">
          {/* Text Description */}
          <div className="about-text">
            <div className="section-tag">
              <ShieldCheck size={16} />
              <span>{lang === 'ar' ? 'الرؤية والرسالة التربوية' : 'Notre Mission & Vision'}</span>
            </div>

            <Editable 
              textKey="about_title" 
              label="عنوان عن المؤسسة" 
              as="h2" 
              className="section-title" 
            />
            <Editable 
              textKey="about_subtitle" 
              label="العنوان الفرعي" 
              as="p" 
              className="section-subtitle" 
              style={{ marginBottom: '1.5rem', textAlign: 'inherit' }} 
            />

            <Editable 
              textKey="about_desc_1" 
              label="الفقرة التعريفية الأولى" 
              as="p" 
              multiline 
            />
            <Editable 
              textKey="about_desc_2" 
              label="الفقرة التعريفية الثانية" 
              as="p" 
              multiline 
            />

            {/* Core Values Grid */}
            <div className="about-features-grid">
              {values.map((v, idx) => {
                const IconComponent = v.icon;
                return (
                  <div key={idx} className="feature-box">
                    <div className="feature-icon-wrap">
                      <IconComponent size={22} />
                    </div>
                    <h3 className="feature-title">
                      <Editable textKey={v.titleKey} label={`قيمة: ${v.label}`} />
                    </h3>
                    <p className="feature-desc">
                      <Editable textKey={v.descKey} label={`شرح: ${v.label}`} multiline />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real Campus Visual with Live Edit */}
          <div className="about-image-wrapper">
            <EditableMedia 
              mediaKey="about_campus_img"
              label="صورة مجمع المؤسسة (عن المؤسسة)"
              src="/images/building.png" 
              alt="Bâtiment Lycée El Farah" 
              className="about-main-img"
            />
            <div className="about-stat-floating">
              <CheckCircle2 size={32} color="#F28A24" />
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary-blue)' }}>
                  {lang === 'ar' ? 'الريادة والتميز التربوي' : 'Excellence Pédagogique'}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {lang === 'ar' ? 'سلك إعدادي وتأهيلي بالدار البيضاء' : 'Collège & Lycée à Casablanca'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}