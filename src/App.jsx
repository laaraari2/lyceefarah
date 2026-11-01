import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { 
  getSiteSettings, 
  getNewsList, 
  getGalleryList, 
  getVideosList,
  getNavItemsList,
  getCustomPagesList 
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
import CustomPageView from './components/CustomPageView';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import LiveEditorBar from './components/LiveEditorBar';

function MainWebsite() {
  const { lang } = useLanguage();
  const { isAdmin } = useAuth();
  const [currentView, setCurrentView] = useState('public'); // 'public' | 'admin-login' | 'admin-dashboard'
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const [news, setNews] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [videos, setVideos] = useState([]);
  const [navItems, setNavItems] = useState([]);
  const [customPages, setCustomPages] = useState([]);
  const [activeCustomPage, setActiveCustomPage] = useState(null);
  const [initialPageToEdit, setInitialPageToEdit] = useState(null);

  const loadData = () => {
    Promise.all([
      getSiteSettings(),
      getNewsList(),
      getGalleryList(),
      getVideosList(),
      getNavItemsList(),
      getCustomPagesList()
    ]).then(([sett, n, g, v, navs, pages]) => {
      setSettings(sett);
      setNews(n || []);
      setGallery(g || []);
      setVideos(v || []);
      setNavItems(navs || []);
      setCustomPages(pages || []);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenVideo = () => {
    setActiveCustomPage(null);
    setTimeout(() => {
      const v = document.getElementById('videos');
      if (v) v.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleOpenCustomPage = (slugOrId) => {
    const page = customPages.find(p => p.slug === slugOrId || p.id === slugOrId);
    if (page) {
      setActiveCustomPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBackToHome = () => {
    setActiveCustomPage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTriggerEditPage = (page) => {
    setInitialPageToEdit(page);
    setCurrentView(isAdmin ? 'admin-dashboard' : 'admin-login');
  };

  if (currentView === 'admin-dashboard' && isAdmin) {
    return (
      <AdminDashboard 
        initialPageToEdit={initialPageToEdit}
        clearInitialPageToEdit={() => setInitialPageToEdit(null)}
        onBackToSite={() => {
          loadData();
          setInitialPageToEdit(null);
          setCurrentView('public');
        }} 
        onDataChange={loadData}
      />
    );
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
      <LiveEditorBar 
        onNavigateAdmin={() => setCurrentView(isAdmin ? 'admin-dashboard' : 'admin-login')} 
      />
      <Header 
        navItems={navItems}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onNavigateAdmin={() => setCurrentView(isAdmin ? 'admin-dashboard' : 'admin-login')}
        activeSection={activeCustomPage ? activeCustomPage.slug : 'home'}
        onOpenCustomPage={handleOpenCustomPage}
        onBackToHome={handleBackToHome}
      />

      <main>
        {activeCustomPage ? (
          <CustomPageView 
            page={activeCustomPage} 
            onBackToHome={handleBackToHome}
            onOpenRegister={() => setIsRegisterOpen(true)}
            onEditPage={handleTriggerEditPage}
            isAdmin={isAdmin}
            settings={settings}
          />
        ) : (
          <>
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
          </>
        )}
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