$content = @'
:root {
  --primary-blue: #073B70;
  --primary-blue-dark: #052a50;
  --primary-blue-light: #0d4d8e;
  --secondary-blue: #247DBB;
  --secondary-blue-light: #eaf3fa;
  --accent-orange: #F28A24;
  --accent-orange-hover: #dc7616;
  --accent-orange-light: #fff5eb;
  --pure-white: #FFFFFF;
  --bg-page: #F8FAFC;
  --bg-surface: #FFFFFF;
  --bg-surface-alt: #F1F5F9;
  --text-main: #0F172A;
  --text-muted: #475569;
  --text-light: #64748B;
  --border-light: #E2E8F0;
  --border-accent: rgba(36, 125, 187, 0.2);
  --shadow-sm: 0 2px 8px rgba(7, 59, 112, 0.05);
  --shadow-md: 0 8px 24px rgba(7, 59, 112, 0.08);
  --shadow-lg: 0 16px 40px rgba(7, 59, 112, 0.12);
  --shadow-orange: 0 8px 20px rgba(242, 138, 36, 0.28);
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-full: 9999px;
  --font-family: 'Cairo', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: var(--font-family);
  background-color: var(--bg-page);
  color: var(--text-main);
  line-height: 1.6;
  overflow-x: hidden;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

[dir="rtl"] { text-align: right; }
[dir="ltr"] { text-align: left; }

a { color: inherit; text-decoration: none; transition: var(--transition); }
button { font-family: inherit; border: none; background: none; cursor: pointer; outline: none; transition: var(--transition); }
img, video { max-width: 100%; height: auto; display: block; }

.container {
  width: 100%;
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.section-padding { padding: 5rem 0; }
.section-header { text-align: center; max-width: 780px; margin: 0 auto 3.5rem auto; }

.section-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1.1rem;
  background-color: var(--secondary-blue-light);
  color: var(--primary-blue);
  font-size: 0.88rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  margin-bottom: 1rem;
  border: 1px solid var(--border-accent);
}

.section-tag.tag-orange {
  background-color: var(--accent-orange-light);
  color: var(--accent-orange-hover);
  border-color: rgba(242, 138, 36, 0.25);
}

.section-title {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--primary-blue);
  line-height: 1.3;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.7;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.8rem 1.6rem;
  font-size: 0.98rem;
  font-weight: 700;
  border-radius: var(--radius-md);
  transition: var(--transition);
  white-space: nowrap;
}

.btn-primary {
  background-color: var(--accent-orange);
  color: var(--pure-white);
  box-shadow: var(--shadow-orange);
}
.btn-primary:hover {
  background-color: var(--accent-orange-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(242, 138, 36, 0.35);
}

.btn-secondary {
  background-color: var(--primary-blue);
  color: var(--pure-white);
}
.btn-secondary:hover {
  background-color: var(--primary-blue-dark);
  transform: translateY(-2px);
}

.btn-outline {
  border: 2px solid var(--primary-blue);
  color: var(--primary-blue);
  background-color: transparent;
}
.btn-outline:hover {
  background-color: var(--primary-blue);
  color: var(--pure-white);
}

.btn-outline-white {
  border: 2px solid var(--pure-white);
  color: var(--pure-white);
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
}
.btn-outline-white:hover {
  background-color: var(--pure-white);
  color: var(--primary-blue);
}

/* Topbar */
.topbar {
  background-color: var(--primary-blue-dark);
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.85rem;
  padding: 0.45rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.topbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8rem;
}
.topbar-items {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.topbar-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.brand-link {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}
.brand-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: var(--radius-sm);
}
.brand-titles {
  display: flex;
  flex-direction: column;
}
.brand-name-ar {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--primary-blue);
  line-height: 1.2;
}
.brand-name-fr {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--secondary-blue);
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  list-style: none;
}
.nav-link {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
  padding: 0.5rem 0.2rem;
  position: relative;
}
.nav-link:hover, .nav-link.active {
  color: var(--secondary-blue);
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--accent-orange);
  transform: scaleX(0);
  transition: var(--transition);
}
.nav-link:hover::after, .nav-link.active::after {
  transform: scaleX(1);
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.lang-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-light);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--primary-blue);
  background-color: var(--bg-surface-alt);
}
.lang-btn:hover {
  background-color: var(--secondary-blue-light);
  border-color: var(--secondary-blue);
}
.mobile-menu-toggle {
  display: none;
  padding: 0.5rem;
  color: var(--primary-blue);
}

/* Hero */
.hero-section {
  position: relative;
  min-height: 620px;
  display: flex;
  align-items: center;
  padding: 5rem 0 4rem;
  overflow: hidden;
  background-color: var(--primary-blue-dark);
}
.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.28;
  filter: saturate(1.2);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(7, 59, 112, 0.94) 0%, rgba(5, 42, 80, 0.85) 60%, rgba(36, 125, 187, 0.75) 100%);
}
.hero-content {
  position: relative;
  z-index: 10;
  color: var(--pure-white);
  max-width: 820px;
}
.hero-badge-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  padding: 0.4rem 1.1rem;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}
.hero-title {
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 1.25rem;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.hero-title span { color: var(--accent-orange); }
.hero-slogan {
  display: inline-block;
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffd8a8;
  margin-bottom: 1.25rem;
  padding: 0.4rem 1rem;
  background: rgba(242, 138, 36, 0.15);
  border-right: 4px solid var(--accent-orange);
  border-radius: 4px;
}
[dir="ltr"] .hero-slogan {
  border-right: none;
  border-left: 4px solid var(--accent-orange);
}
.hero-subtitle {
  font-size: 1.15rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.2rem;
  max-width: 700px;
}
.hero-buttons {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}
.hero-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}
.hero-stat-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 1rem 1.2rem;
  border-radius: var(--radius-md);
  text-align: center;
}
.hero-stat-number {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--accent-orange);
  line-height: 1.1;
  margin-bottom: 0.3rem;
}
.hero-stat-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
}

/* Welcome Card */
.welcome-card {
  background: var(--bg-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-light);
  display: grid;
  grid-template-columns: 340px 1fr;
  overflow: hidden;
  align-items: stretch;
}
.welcome-media {
  position: relative;
  background-color: var(--primary-blue);
  min-height: 380px;
}
.welcome-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}
.welcome-badge {
  position: absolute;
  bottom: 1.2rem;
  right: 1.2rem;
  background: rgba(7, 59, 112, 0.92);
  color: var(--pure-white);
  padding: 0.6rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.82rem;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
[dir="ltr"] .welcome-badge { right: auto; left: 1.2rem; }
.welcome-content {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.welcome-tag {
  color: var(--accent-orange);
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}
.welcome-name {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--primary-blue);
  margin-bottom: 0.25rem;
}
.welcome-role {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--secondary-blue);
  margin-bottom: 1.5rem;
}
.welcome-quote {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-muted);
  position: relative;
  margin-bottom: 1.8rem;
}
.welcome-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border-light);
  padding-top: 1.2rem;
}
.slogan-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--primary-blue);
}

/* About Section */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: center;
}
.about-text p {
  font-size: 1.05rem;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
  line-height: 1.8;
}
.about-features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-top: 2rem;
}
.feature-box {
  background: var(--bg-surface);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}
.feature-box:hover {
  transform: translateY(-3px);
  border-color: var(--secondary-blue);
  box-shadow: var(--shadow-md);
}
.feature-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--secondary-blue-light);
  color: var(--primary-blue);
  margin-bottom: 0.75rem;
}
.feature-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.35rem;
}
.feature-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.5;
}
.about-image-wrapper { position: relative; }
.about-main-img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}
.about-stat-floating {
  position: absolute;
  bottom: -1.5rem;
  left: 2rem;
  background: var(--pure-white);
  padding: 1.2rem 1.8rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  border-left: 5px solid var(--accent-orange);
  display: flex;
  align-items: center;
  gap: 1rem;
}
[dir="rtl"] .about-stat-floating {
  left: auto;
  right: 2rem;
  border-left: none;
  border-right: 5px solid var(--accent-orange);
}

/* Academic Levels Section */
.levels-tabs-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
}
.levels-tabs {
  display: inline-flex;
  background: var(--bg-surface-alt);
  padding: 0.4rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--border-light);
}
.level-tab-btn {
  padding: 0.75rem 2.2rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: var(--radius-full);
  color: var(--text-muted);
  transition: var(--transition);
}
.level-tab-btn.active {
  background-color: var(--primary-blue);
  color: var(--pure-white);
  box-shadow: var(--shadow-sm);
}
.level-card-main {
  background: var(--bg-surface);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-md);
  padding: 3rem;
}
.level-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.level-badge {
  background-color: var(--secondary-blue-light);
  color: var(--primary-blue);
  font-weight: 700;
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.88rem;
}
.classes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}
.class-item-box {
  background: var(--bg-page);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  transition: var(--transition);
}
.class-item-box:hover {
  background: var(--pure-white);
  border-color: var(--secondary-blue);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}
.class-code {
  display: inline-block;
  font-weight: 800;
  font-size: 0.9rem;
  color: var(--accent-orange);
  background: var(--accent-orange-light);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  margin-bottom: 0.6rem;
}
.class-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
}
.class-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.5;
}
.level-strengths-box {
  background: linear-gradient(135deg, var(--secondary-blue-light) 0%, rgba(255, 255, 255, 0.9) 100%);
  border: 1px solid var(--border-accent);
  border-radius: var(--radius-lg);
  padding: 2rem;
}
.strengths-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--primary-blue);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.strengths-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  list-style: none;
}
.strength-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-main);
}

/* Activities */
.activities-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.activity-card {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  padding: 2rem 1.5rem;
  text-align: center;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}
.activity-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--secondary-blue);
}
.activity-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--secondary-blue-light);
  color: var(--secondary-blue);
  transition: var(--transition);
}
.activity-card:hover .activity-icon {
  background: var(--accent-orange);
  color: var(--pure-white);
  transform: scale(1.08);
}
.activity-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.6rem;
}
.activity-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* Gallery & Lightbox */
.gallery-filters {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}
.filter-btn {
  padding: 0.5rem 1.3rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: var(--radius-full);
  background: var(--bg-surface-alt);
  color: var(--text-muted);
  border: 1px solid var(--border-light);
}
.filter-btn.active, .filter-btn:hover {
  background: var(--primary-blue);
  color: var(--pure-white);
  border-color: var(--primary-blue);
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}
.gallery-card {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  background-color: var(--primary-blue-dark);
  cursor: pointer;
  aspect-ratio: 4/3;
}
.gallery-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.gallery-card:hover img { transform: scale(1.08); }
.gallery-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(7, 59, 112, 0.92) 0%, rgba(7, 59, 112, 0.3) 60%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.2rem;
  color: var(--pure-white);
  opacity: 0;
  transition: var(--transition);
}
.gallery-card:hover .gallery-card-overlay { opacity: 1; }
.gallery-card-title {
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 1.3;
}
.gallery-card-desc {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.25rem;
}

/* Modals */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background-color: rgba(7, 30, 56, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  animation: fadeIn 0.25s ease-out;
}
.lightbox-content {
  position: relative;
  max-width: 900px;
  width: 100%;
  background: var(--pure-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.lightbox-img-wrap {
  position: relative;
  max-height: 70vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lightbox-img-wrap img {
  max-height: 70vh;
  width: auto;
  object-fit: contain;
}
.lightbox-details { padding: 1.5rem; }
.modal-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: var(--pure-white);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
[dir="rtl"] .modal-close-btn { right: auto; left: 1rem; }
.modal-close-btn:hover { background: var(--accent-orange); }

/* Videos */
.videos-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}
.video-card {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}
.video-player-wrap {
  position: relative;
  aspect-ratio: 16/9;
  background-color: #000;
  overflow: hidden;
}
.video-player-wrap video, .video-player-wrap iframe {
  width: 100%;
  height: 100%;
  border: none;
}
.video-details { padding: 1.5rem; }
.video-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
}

/* News */
.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.news-card {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: var(--transition);
}
.news-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--secondary-blue);
}
.news-thumb {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  background-color: var(--primary-blue);
}
.news-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-slow);
}
.news-card:hover .news-thumb img { transform: scale(1.06); }
.news-category-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  background: rgba(7, 59, 112, 0.9);
  color: var(--pure-white);
  backdrop-filter: blur(6px);
}
[dir="rtl"] .news-category-badge { right: auto; left: 1rem; }
.news-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.news-date {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--text-light);
  margin-bottom: 0.6rem;
}
.news-card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--primary-blue);
  line-height: 1.4;
  margin-bottom: 0.8rem;
}
.news-card-summary {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 1.25rem;
  flex: 1;
}
.news-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--secondary-blue);
}
.news-link-btn:hover { color: var(--accent-orange); }

/* Registration Section */
.registration-section {
  background: linear-gradient(135deg, var(--primary-blue-dark) 0%, var(--primary-blue) 100%);
  color: var(--pure-white);
  border-radius: var(--radius-xl);
  padding: 4rem 3rem;
  margin: 3rem auto;
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
}
.registration-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 10;
}
.reg-form-card {
  background: var(--pure-white);
  border-radius: var(--radius-lg);
  padding: 2.2rem;
  color: var(--text-main);
  box-shadow: var(--shadow-lg);
}
.form-group { margin-bottom: 1.2rem; }
.form-label {
  display: block;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.4rem;
}
.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: inherit;
  font-size: 0.95rem;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  background-color: var(--bg-surface-alt);
  color: var(--text-main);
  transition: var(--transition);
}
.form-input:focus, .form-select:focus, .form-textarea:focus {
  background-color: var(--pure-white);
  border-color: var(--secondary-blue);
  box-shadow: 0 0 0 3px rgba(36, 125, 187, 0.18);
  outline: none;
}
.form-textarea { resize: vertical; min-height: 90px; }

/* Contact Section */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
}
.contact-info-cards {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.contact-card {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-light);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}
.contact-card:hover {
  border-color: var(--secondary-blue);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.contact-card-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--secondary-blue-light);
  color: var(--primary-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.contact-card-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-light);
  text-transform: uppercase;
  margin-bottom: 0.2rem;
}
.contact-card-val {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--primary-blue);
  line-height: 1.4;
}
.map-wrapper {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-md);
  height: 100%;
  min-height: 400px;
}
.map-wrapper iframe {
  width: 100%;
  height: 100%;
  min-height: 400px;
  border: none;
}

/* Footer */
.footer {
  background-color: var(--primary-blue-dark);
  color: rgba(255, 255, 255, 0.8);
  padding-top: 5rem;
  border-top: 3px solid var(--accent-orange);
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
  gap: 3rem;
  margin-bottom: 3.5rem;
}
.footer-brand-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--pure-white);
  margin-bottom: 0.8rem;
}
.footer-brand-desc {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}
.footer-col-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--pure-white);
  margin-bottom: 1.2rem;
  position: relative;
  padding-bottom: 0.5rem;
}
.footer-col-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 32px;
  height: 2px;
  background-color: var(--accent-orange);
}
[dir="rtl"] .footer-col-title::after { left: auto; right: 0; }
.footer-links-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.footer-link {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}
.footer-link:hover { color: var(--accent-orange); }
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1.8rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
}
.footer-admin-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.8rem;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.8);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
}
.footer-admin-btn:hover {
  background: var(--accent-orange);
  color: var(--pure-white);
}

/* Admin Dashboard */
.admin-shell {
  min-height: 100vh;
  background-color: var(--bg-page);
  display: flex;
  flex-direction: column;
}
.admin-header {
  background: var(--primary-blue);
  color: var(--pure-white);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
}
.admin-nav-tabs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--pure-white);
  padding: 0.75rem 2rem;
  border-bottom: 1px solid var(--border-light);
  overflow-x: auto;
}
.admin-tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-sm);
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-muted);
}
.admin-tab-btn.active {
  background: var(--secondary-blue-light);
  color: var(--primary-blue);
}
.admin-body {
  padding: 2rem;
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}
.admin-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.kpi-card {
  background: var(--pure-white);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.kpi-val {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-blue);
}
.kpi-title {
  font-size: 0.88rem;
  color: var(--text-muted);
  font-weight: 600;
}
.admin-card {
  background: var(--pure-white);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  padding: 1.8rem;
  margin-bottom: 2rem;
}
.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: right;
}
[dir="ltr"] .admin-table { text-align: left; }
.admin-table th, .admin-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--border-light);
}
.admin-table th {
  background-color: var(--bg-surface-alt);
  color: var(--primary-blue);
  font-weight: 700;
  font-size: 0.88rem;
}
.admin-table tr:hover td { background-color: #fafbfc; }
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  font-size: 0.78rem;
  font-weight: 700;
}
.status-badge.pending { background: #fef3c7; color: #b45309; }
.status-badge.contacted { background: #dbeafe; color: #1d4ed8; }
.status-badge.accepted { background: #dcfce7; color: #15803d; }

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}

@media (max-width: 1024px) {
  .hero-title { font-size: 2.4rem; }
  .hero-stats-grid { grid-template-columns: repeat(2, 1fr); }
  .welcome-card { grid-template-columns: 1fr; }
  .welcome-media { min-height: 280px; }
  .about-grid { grid-template-columns: 1fr; }
  .classes-grid { grid-template-columns: repeat(2, 1fr); }
  .activities-grid { grid-template-columns: repeat(2, 1fr); }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }
  .news-grid { grid-template-columns: 1fr; }
  .registration-grid { grid-template-columns: 1fr; }
  .contact-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .admin-kpi-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .mobile-menu-toggle { display: block; }
  .nav-links.mobile-open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--pure-white);
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-light);
    box-shadow: var(--shadow-lg);
    gap: 1rem;
  }
  .hero-title { font-size: 2rem; }
  .section-title { font-size: 1.75rem; }
  .classes-grid { grid-template-columns: 1fr; }
  .strengths-list { grid-template-columns: 1fr; }
  .activities-grid { grid-template-columns: 1fr; }
  .gallery-grid { grid-template-columns: 1fr; }
  .videos-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
  .admin-kpi-grid { grid-template-columns: 1fr; }
  .welcome-content { padding: 1.8rem; }
}
'@
[System.IO.File]::WriteAllText("c:\Users\laara\OneDrive\Desktop\site\src\index.css", $content, [System.Text.Encoding]::UTF8)
