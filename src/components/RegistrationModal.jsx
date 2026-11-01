import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitInquiry } from '../lib/supabase';
import { X, CheckCircle, GraduationCap, Send, AlertCircle } from 'lucide-react';

export default function RegistrationModal({ isOpen, onClose }) {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    phone: '',
    email: '',
    level_requested: 'Tronc Commun Scientifique',
    previous_school: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const levelsList = [
    { value: '1AC', label: lang === 'ar' ? 'السنة الأولى إعدادي (1AC)' : '1ère Année Collégiale (1AC)' },
    { value: '2AC', label: lang === 'ar' ? 'السنة الثانية إعدادي (2AC)' : '2ème Année Collégiale (2AC)' },
    { value: '3AC', label: lang === 'ar' ? 'السنة الثالثة إعدادي (3AC)' : '3ème Année Collégiale (3AC)' },
    { value: 'Tronc Commun Scientifique', label: lang === 'ar' ? 'الجذع المشترك العلمي (TCS)' : 'Tronc Commun Scientifique' },
    { value: '1BAC Sciences Expérimentales', label: lang === 'ar' ? 'الأولى باكالوريا علوم تجريبية' : '1BAC Sciences Expérimentales' },
    { value: '2BAC Sciences Physiques', label: lang === 'ar' ? 'الثانية باكالوريا علوم فيزيائية (PC)' : '2BAC Sciences Physiques' },
    { value: '2BAC Sciences SVT', label: lang === 'ar' ? 'الثانية باكالوريا علوم الحياة والأرض (SVT)' : '2BAC Sciences SVT' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.student_name || !formData.parent_name || !formData.phone) {
      setError(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await submitInquiry(formData);
      setSubmitted(true);
    } catch (err) {
      setError(lang === 'ar' ? 'تعذر إرسال الطلب، يرجى المحاولة ثانية' : 'Erreur d\'envoi, veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      student_name: '',
      parent_name: '',
      phone: '',
      email: '',
      level_requested: 'Tronc Commun Scientifique',
      previous_school: '',
      notes: ''
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleResetAndClose}>
      <div className="reg-form-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px', width: '100%', position: 'relative' }}>
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={handleResetAndClose}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
              <div className="section-tag tag-orange" style={{ margin: '0 auto 0.8rem auto' }}>
                <GraduationCap size={16} />
                <span>{lang === 'ar' ? 'الموسم الدراسي 2026/2027' : 'Année Scolaire 2026/2027'}</span>
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '0.4rem' }}>
                {t('reg_title')}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                {t('reg_subtitle')}
              </p>
            </div>

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fee2e2', color: '#b91c1c', padding: '0.8rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.2rem', fontSize: '0.88rem' }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">{t('reg_student_name')} *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.student_name}
                    onChange={e => setFormData({ ...formData, student_name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('reg_parent_name')} *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.parent_name}
                    onChange={e => setFormData({ ...formData, parent_name: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">{t('reg_phone')} *</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    className="form-input"
                    placeholder="06XXXXXXXX"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('reg_email')}</label>
                  <input
                    type="email"
                    dir="ltr"
                    className="form-input"
                    placeholder="exemple@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">{t('reg_level')} *</label>
                  <select
                    className="form-select"
                    value={formData.level_requested}
                    onChange={e => setFormData({ ...formData, level_requested: e.target.value })}
                  >
                    {levelsList.map(lvl => (
                      <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('reg_prev_school')}</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.previous_school}
                    onChange={e => setFormData({ ...formData, previous_school: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('reg_notes')}</label>
                <textarea
                  className="form-textarea"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.8rem' }}
              >
                <Send size={18} />
                <span>{loading ? t('reg_submitting') : t('reg_submit')}</span>
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <CheckCircle size={38} />
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '0.6rem' }}>
              {t('reg_success_title')}
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
              {t('reg_success_msg')}
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleResetAndClose}
            >
              {lang === 'ar' ? 'حسناً، تم' : 'Compris'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}