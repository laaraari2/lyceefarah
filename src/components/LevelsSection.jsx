import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Editable from './Editable';
import { 
  GraduationCap, 
  BookOpen, 
  Atom, 
  Microscope, 
  CheckCircle, 
  Sparkles 
} from 'lucide-react';

export default function LevelsSection({ onOpenRegister }) {
  const { lang, t } = useLanguage();
  const [activeCycle, setActiveCycle] = useState('college'); // 'college' | 'lycee'

  const collegeClasses = [
    {
      code: '1AC',
      name: lang === 'ar' ? 'السنة الأولى ثانوي إعدادي' : '1ère Année Collégiale',
      desc: lang === 'ar' ? 'ترسيخ المعارف الأساسية، تنمية المهارات اللغوية والمنهجية العلمية للمتعلم.' : 'Acquisition des fondamentaux, consolidation des compétences linguistiques et méthodologiques.'
    },
    {
      code: '2AC',
      name: lang === 'ar' ? 'السنة الثانية ثانوي إعدادي' : '2ème Année Collégiale',
      desc: lang === 'ar' ? 'تعميق المكتسبات في الرياضيات والعلوم واللغات، وتوسيع المدارك المعرفية.' : 'Approfondissement des savoirs scientifiques, développement de l esprit critique.'
    },
    {
      code: '3AC',
      name: lang === 'ar' ? 'السنة الثالثة ثانوي إعدادي' : '3ème Année Collégiale',
      desc: lang === 'ar' ? 'إعداد مكثف للامتحان الجهوي الموحد لنيل شهادة السلك الإعدادي وتوجيه نحو التأهيلي.' : 'Préparation ciblée à l examen régional normalisé et orientation personnalisée vers le lycée.'
    }
  ];

  const lyceeClasses = [
    {
      code: 'TCS',
      name: lang === 'ar' ? 'الجذع المشترك العلمي' : 'Tronc Commun Scientifique',
      desc: lang === 'ar' ? 'قاعدة متينة في الرياضيات والفيزياء والكيمياء وعلوم الحياة والأرض.' : 'Socle rigoureux en sciences exactes, initiation aux méthodologies de recherche.'
    },
    {
      code: '1BAC SE',
      name: lang === 'ar' ? 'الأولى باكالوريا علوم تجريبية' : '1ère Année Bac : Sciences Expérimentales',
      desc: lang === 'ar' ? 'تأطير عالي الدقة للامتحان الجهوي الموحد (اللغة الفرنسية، التاريخ والجغرافيا، التربية الإسلامية).' : 'Préparation intensive à l examen régional du Baccalauréat et renforcement scientifique.'
    },
    {
      code: '2BAC PC/SVT',
      name: lang === 'ar' ? 'الثانية باكالوريا (علوم فيزيائية / SVT)' : '2ème Année Bac : PC & SVT',
      desc: lang === 'ar' ? 'إعداد استراتيجي للامتحان الوطني للباكالوريا والمباريات الوطنية للمدارس العليا والجامعات.' : 'Préparation stratégique aux épreuves nationales du Bac et concours des grandes écoles.'
    }
  ];

  const collegeStrengths = [
    lang === 'ar' ? 'أعداد فصول نموذجية للمتابعة الدقيقة' : 'Effectifs réduits pour un suivi personnalisé',
    lang === 'ar' ? 'حصص دعم مجانية مبرمجة أسبوعياً' : 'Séances de soutien et consolidation incluses',
    lang === 'ar' ? 'أنشطة علمية وتجارب مخبرية مبكرة' : 'Travaux pratiques et expérimentation dès la 1AC',
    lang === 'ar' ? 'تواصل دائم ومستمر مع الآباء' : 'Suivi continu et concertation avec les parents'
  ];

  const lyceeStrengths = [
    lang === 'ar' ? 'محاكاة دورية للامتحانات الوطنية (باك بيضاء)' : 'Examens blancs réguliers conformes aux normes',
    lang === 'ar' ? 'تأطير نخبة من الأساتذة ذوي الخبرة الإشهادية' : 'Corps professoral d élite à forte expérience',
    lang === 'ar' ? 'خلية التوجيه والمواكبة الجامعية' : 'Accompagnement d orientation pour les grandes écoles',
    lang === 'ar' ? 'سجل حافل بنسب نجاح 100% وميزات مشرفة' : 'Excellence continue et mentions très bien au Bac'
  ];

  return (
    <section id="levels" className="section-padding" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <BookOpen size={16} />
            <Editable textKey="levels_title" label="شارة قسم الأسلاك" />
          </div>
          <h2 className="section-title">
            <Editable textKey="levels_main_title" label="عنوان قسم الأسلاك الرئيسي" />
          </h2>
          <Editable 
            textKey="levels_subtitle" 
            label="العنوان الفرعي للأسلاك" 
            as="p" 
            className="section-subtitle" 
          />
        </div>

        {/* Cycle Switcher Tabs */}
        <div className="levels-tabs-wrapper">
          <div className="levels-tabs">
            <button
              type="button"
              className={`level-tab-btn ${activeCycle === 'college' ? 'active' : ''}`}
              onClick={() => setActiveCycle('college')}
            >
              {lang === 'ar' ? 'السلك الإعدادي (Collège)' : 'Cycle Collège'}
            </button>
            <button
              type="button"
              className={`level-tab-btn ${activeCycle === 'lycee' ? 'active' : ''}`}
              onClick={() => setActiveCycle('lycee')}
            >
              {lang === 'ar' ? 'السلك التأهيلي (Lycée)' : 'Cycle Lycée'}
            </button>
          </div>
        </div>

        {/* Selected Cycle Display */}
        <div className="level-card-main">
          <div className="level-header-row">
            <div>
              <span className="level-badge">
                {activeCycle === 'college' ? 'Collège El Farah' : 'Lycée El Farah'}
              </span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-blue)', marginTop: '0.4rem' }}>
                {activeCycle === 'college' ? (
                  <Editable textKey="college_title" label="عنوان السلك الإعدادي" />
                ) : (
                  <Editable textKey="lycee_title" label="عنوان السلك التأهيلي" />
                )}
              </h3>
            </div>

            <button
              type="button"
              onClick={onOpenRegister}
              className="btn btn-primary"
            >
              <GraduationCap size={18} />
              <span>{lang === 'ar' ? 'تسجيل في هذا السلك' : 'S\'inscrire à ce cycle'}</span>
            </button>
          </div>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            {activeCycle === 'college' ? (
              <Editable textKey="college_desc" label="وصف السلك الإعدادي" multiline />
            ) : (
              <Editable textKey="lycee_desc" label="وصف السلك التأهيلي" multiline />
            )}
          </p>

          {/* Classes Grid */}
          <div className="classes-grid">
            {(activeCycle === 'college' ? collegeClasses : lyceeClasses).map((cls, idx) => (
              <div key={idx} className="class-item-box">
                <span className="class-code">{cls.code}</span>
                <h4 className="class-name">{cls.name}</h4>
                <p className="class-desc">{cls.desc}</p>
              </div>
            ))}
          </div>

          {/* Pedagogical Strengths */}
          <div className="level-strengths-box">
            <h4 className="strengths-title">
              <Sparkles size={20} color="#F28A24" />
              <Editable textKey="level_features_title" label="عنوان مميزات التأطير" />
            </h4>
            <ul className="strengths-list">
              {(activeCycle === 'college' ? collegeStrengths : lyceeStrengths).map((str, idx) => (
                <li key={idx} className="strength-item">
                  <CheckCircle size={18} color="#247DBB" style={{ flexShrink: 0 }} />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}