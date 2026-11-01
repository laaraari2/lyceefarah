import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Editable from './Editable';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Compass } from 'lucide-react';

export default function ContactSection({ settings }) {
  const { lang, t } = useLanguage();

  const phone = settings?.phone || '05 22 28 36 99';
  const email = settings?.email || 'farahinfopriv@yahoo.fr';
  const address = lang === 'ar' 
    ? (settings?.address_ar || 'حي الأمل 3، زنقة 68 رقم 3، الفداء، الدار البيضاء')
    : (settings?.address_fr || 'Amal H, Rue 68, N°3, Casa El Fida, Casablanca, Maroc');

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Compass size={16} />
            <Editable textKey="contact_title" label="شارة قسم الاتصال" />
          </div>
          <h2 className="section-title">
            {lang === 'ar' ? 'تواصل معنا وزيارة المؤسسة' : 'Contact & Accès à l\'Établissement'}
          </h2>
          <Editable 
            textKey="contact_subtitle" 
            label="العنوان الفرعي للاتصال" 
            as="p" 
            className="section-subtitle" 
          />
        </div>

        <div className="contact-grid">
          {/* Official Information Cards */}
          <div className="contact-info-cards">
            {/* Accreditation Badge Card */}
            <div className="contact-card" style={{ borderColor: 'var(--secondary-blue)', backgroundColor: 'var(--secondary-blue-light)' }}>
              <div className="contact-card-icon" style={{ backgroundColor: 'var(--primary-blue)', color: 'var(--pure-white)' }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <div className="contact-card-title">{lang === 'ar' ? 'الرسالة التربوية' : 'Mission Éducative'}</div>
                <div className="contact-card-val" style={{ color: 'var(--primary-blue)' }}>
                  {lang === 'ar' ? 'تعليم متميز وبناء مستقبل واعد لجميع التلميذات والتلاميذ' : 'Un enseignement d\'excellence pour la réussite de nos élèves'}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <MapPin size={24} />
              </div>
              <div>
                <div className="contact-card-title">{t('contact_address_label')}</div>
                <div className="contact-card-val">{address}</div>
              </div>
            </div>

            {/* Phone */}
            <a href={`tel:${phone}`} className="contact-card">
              <div className="contact-card-icon">
                <Phone size={24} />
              </div>
              <div>
                <div className="contact-card-title">{t('contact_phone_label')}</div>
                <div className="contact-card-val" style={{ direction: 'ltr', unicodeBidi: 'embed' }}>
                  {phone}
                </div>
              </div>
            </a>

            {/* Email */}
            <a href={`mailto:${email}`} className="contact-card">
              <div className="contact-card-icon">
                <Mail size={24} />
              </div>
              <div>
                <div className="contact-card-title">{t('contact_email_label')}</div>
                <div className="contact-card-val" style={{ direction: 'ltr', unicodeBidi: 'embed' }}>
                  {email}
                </div>
              </div>
            </a>

            {/* Working Hours */}
            <div className="contact-card">
              <div className="contact-card-icon">
                <Clock size={24} />
              </div>
              <div>
                <div className="contact-card-title">{t('contact_hours_label')}</div>
                <div className="contact-card-val" style={{ fontSize: '0.95rem' }}>
                  {lang === 'ar' 
                    ? 'من الإثنين إلى الجمعة: 8:00 - 18:30 | السبت: 8:00 - 12:30' 
                    : 'Lundi au Vendredi: 8h00 - 18h30 | Samedi: 8h00 - 12h30'}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Map of Casablanca - El Fida */}
          <div className="map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13300.742358902506!2d-7.608333!3d33.565833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd6f28a9bcf5%3A0x6b2b733737b98d1a!2sEl%20Fida%2C%20Casablanca!5e0!3m2!1sfr!2sma!4v1700000000000!5m2!1sfr!2sma" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Lycée El Farah"
            />
          </div>
        </div>
      </div>
    </section>
  );
}