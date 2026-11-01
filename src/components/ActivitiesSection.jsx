import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Editable from './Editable';
import { 
  Theater, 
  Trophy, 
  Compass, 
  Sparkles, 
  Presentation 
} from 'lucide-react';

export default function ActivitiesSection() {
  const { lang, t } = useLanguage();

  const activities = [
    {
      icon: Theater,
      titleKey: 'act_clubs',
      descKey: 'act_clubs_desc',
      label: 'الأندية الثقافية والمسرح'
    },
    {
      icon: Trophy,
      titleKey: 'act_sports',
      descKey: 'act_sports_desc',
      label: 'التربية البدنية والرياضة'
    },
    {
      icon: Compass,
      titleKey: 'act_trips',
      descKey: 'act_trips_desc',
      label: 'الرحلات والزيارات'
    }
  ];

  return (
    <section id="activities" className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag tag-orange">
            <Sparkles size={16} />
            <Editable textKey="activities_title" label="شارة قسم الأنشطة" />
          </div>
          <h2 className="section-title">
            <Editable textKey="activities_main_title" label="عنوان قسم الأنشطة الرئيسي" />
          </h2>
          <Editable 
            textKey="activities_subtitle" 
            label="العنوان الفرعي للأنشطة" 
            as="p" 
            className="section-subtitle" 
          />
        </div>

        <div className="activities-grid">
          {activities.map((act, idx) => {
            const IconComponent = act.icon;
            return (
              <div key={idx} className="activity-card">
                <div className="activity-icon">
                  <IconComponent size={28} />
                </div>
                <h3 className="activity-title">
                  <Editable textKey={act.titleKey} label={`عنوان: ${act.label}`} />
                </h3>
                <p className="activity-desc">
                  <Editable textKey={act.descKey} label={`وصف: ${act.label}`} multiline />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}