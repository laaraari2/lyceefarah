$app = @'
import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { 
  getSiteSettings, 
  getNewsList, 
  getGalleryList, 
  getVideosList 
} from './lib/supabase';
import Header from './components/Header';
import Hero from './components/Hero';
import WelcomeMessage from './components/WelcomeMessage';
import AboutSection from './components/AboutSection';
import LevelsSection from './components/LevelsSection';
import ActivitiesSection from './components/ActivitiesSection';
import GallerySection from './components/GallerySection';
import VideoSection from './components/VideoSection';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function MainWebsite() {
  const { lang } = useLanguage();
  const { isAdmin } = useAuth();
  const [currentView, setCurrentView] = useState('public'); // 'public' | 'admin-login' | 'admin-dashboard'
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const [news, setNews] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    Promise.all([
      getSiteSettings(),
      getNewsList(),
      getGalleryList(),
      getVideosList()
    ]).then(([sett, n, g, v]) => {
      setSettings(sett);
      setNews(n || []);
      setGallery(g || []);
      setVideos(v || []);
    });
  }, []);

  const handleOpenVideo = () => {
    const v = document.getElementById('videos');
    if (v) v.scrollIntoView({ behavior: 'smooth' });
  };

  if (currentView === 'admin-dashboard' && isAdmin) {
    return <AdminDashboard onBackToSite={() => setCurrentView('public')} />;
  }

  if (currentView === 'admin-login' || (currentView === 'admin-dashboard' && !isAdmin)) {
    return (
      <AdminLogin 
        onBackToSite={() => setCurrentView('public')} 
        onLoginSuccess={() => setCurrentView('admin-dashboard')} 
      />
    );
  }

  return (
    <div className="site-wrapper">
      <Header 
        onOpenRegister={() => setIsRegisterOpen(true)}
        onNavigateAdmin={() => setCurrentView(isAdmin ? 'admin-dashboard' : 'admin-login')}
        activeSection="home"
      />

      <main>
        <Hero 
          onOpenRegister={() => setIsRegisterOpen(true)} 
          onOpenVideo={handleOpenVideo}
        />
        <WelcomeMessage />
        <AboutSection />
        <LevelsSection onOpenRegister={() => setIsRegisterOpen(true)} />
        <ActivitiesSection />
        <GallerySection items={gallery} />
        <VideoSection videos={videos} />
        <NewsSection news={news} />
        <ContactSection settings={settings} />
      </main>

      <Footer 
        settings={settings} 
        onNavigateAdmin={() => setCurrentView(isAdmin ? 'admin-dashboard' : 'admin-login')} 
      />

      <RegistrationModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainWebsite />
      </AuthProvider>
    </LanguageProvider>
  );
}
'@
[System.IO.File]::WriteAllText("c:\Users\laara\OneDrive\Desktop\site\src\App.jsx", $app, [System.Text.Encoding]::UTF8)
