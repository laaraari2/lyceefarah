import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Lock, 
  Mail, 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle,
  KeyRound
} from 'lucide-react';

export default function AdminLogin({ onBackToSite, onLoginSuccess }) {
  const { lang, setLang, t, isRTL } = useLanguage();
  const { login } = useAuth();

  const [email, setEmail] = useState('farahinfopriv@yahoo.fr');
  const [password, setPassword] = useState('Elfarah@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await login(email.trim(), password);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg(
        lang === 'ar'
          ? 'تعذر تسجيل الدخول. يرجى التحقق من صحة البريد الإلكتروني وكلمة المرور.'
          : 'Échec de la connexion. Veuillez vérifier votre adresse e-mail et votre mot de passe.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="admin-login-page">
      {/* Background Glows */}
      <div className="login-bg-glow login-bg-glow-1"></div>
      <div className="login-bg-glow login-bg-glow-2"></div>

      {/* Top Bar Navigation */}
      <div className="login-top-bar">
        <button 
          type="button" 
          onClick={onBackToSite}
          className="btn-back-site"
        >
          <BackIcon size={18} />
          <span>{lang === 'ar' ? 'العودة إلى الموقع الرئيسي' : 'Retour au site public'}</span>
        </button>

        <button 
          type="button"
          onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')}
          className="login-lang-switch"
        >
          {lang === 'ar' ? 'FR Français' : 'عربي Arabic'}
        </button>
      </div>

      <div className="login-card-container">
        <div className="login-card">
          {/* Logo & School Header */}
          <div className="login-header">
            <div className="login-logo-wrapper">
              <img 
                src="/images/logo.png" 
                alt="Lycée Collège El Farah Privé" 
                className="login-logo-img"
              />
            </div>
            <span className="login-badge">
              <ShieldCheck size={14} />
              {lang === 'ar' ? 'البوابة الإدارية الآمنة' : 'Espace Administration Sécurisé'}
            </span>
            <h1 className="login-title">
              {lang === 'ar' ? 'تسجيل دخول الإدارة' : 'Connexion Direction'}
            </h1>
            <p className="login-subtitle">
              {lang === 'ar' 
                ? 'مرحباً بكم في لوحة تحكم ثانوية الفرح الخصوصية' 
                : 'Bienvenue sur le tableau de bord du Lycée Collège El Farah Privé'}
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="login-alert-error">
              <AlertCircle size={20} className="alert-icon" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">
                {lang === 'ar' ? 'البريد الإلكتروني للإدارة' : 'E-mail professionnel'}
              </label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farahinfopriv@yahoo.fr"
                  required
                  dir="ltr"
                  className="login-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                {lang === 'ar' ? 'كلمة المرور' : 'Mot de passe'}
              </label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  dir="ltr"
                  className="login-input"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-login-submit"
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-sm"></span>
                  <span>{lang === 'ar' ? 'جارٍ التحقق...' : 'Vérification en cours...'}</span>
                </>
              ) : (
                <>
                  <KeyRound size={18} />
                  <span>{lang === 'ar' ? 'الدخول إلى لوحة التحكم' : 'Accéder au Tableau de Bord'}</span>
                </>
              )}
            </button>
          </form>

          {/* Verified Admin Hint */}
          <div className="login-hint-box">
            <div className="hint-title">
              <ShieldCheck size={15} />
              <span>{lang === 'ar' ? 'بيانات الاعتماد الإدارية الرسمية' : 'Identifiants administratifs'}</span>
            </div>
            <p className="hint-desc">
              {lang === 'ar'
                ? 'تم ضبط بيانات الدخول الخاصة بالإدارة مسبقاً للتسهيل والتجربة المباشرة.'
                : 'Les identifiants de la direction sont pré-remplis pour faciliter l’accès.'}
            </p>
            <div className="hint-creds">
              <code>farahinfopriv@yahoo.fr</code>
              <code>Elfarah@2026</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
