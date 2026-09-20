// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  const count = 50;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 20 + 15}s;
      animation-delay: ${Math.random() * -20}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    // Vary colors
    const colors = ['#00f59b', '#00d2ff', '#8b5cf6', '#fbbf24'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(p);
  }
}
createParticles();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===== TYPED TEXT ANIMATION =====
const typedRoles = [
  'Android Developer',
  'Flutter Developer',
  'Firebase Backend',
  'App Developer',
  'Problem Solver'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeEffect() {
  const current = typedRoles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIndex--);
  } else {
    typedEl.textContent = current.slice(0, charIndex++);
  }
  let delay = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex > current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % typedRoles.length;
    delay = 400;
    charIndex = 0;
  }
  setTimeout(typeEffect, delay);
}
typeEffect();

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
  '.skill-category, .project-card, .timeline-item, .contact-card, .about-text, .about-visual, .info-item, .cert-card, .pillar-card'
);
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== STAGGERED REVEAL FOR GRIDS =====
function staggerReveal(selector, delay = 100) {
  const items = document.querySelectorAll(selector);
  items.forEach((item, i) => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => item.classList.add('visible'), i * delay);
        obs.unobserve(item);
      }
    }, { threshold: 0.1 });
    obs.observe(item);
  });
}
staggerReveal('.skill-category', 120);
staggerReveal('.project-card', 150);
staggerReveal('.cert-card', 120);
staggerReveal('.pillar-card', 120);
staggerReveal('.contact-card', 100);

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = '#00f59b';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));

// ===== SKILL TAG HOVER RIPPLE =====
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(124,58,237,0.4);
      transform: scale(0);
      animation: ripple-anim 0.6s linear;
      width: 100px; height: 100px;
      left: ${e.clientX - this.getBoundingClientRect().left - 50}px;
      top: ${e.clientY - this.getBoundingClientRect().top - 50}px;
      pointer-events: none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

// Add ripple keyframe
const style = document.createElement('style');
style.textContent = `@keyframes ripple-anim { to { transform: scale(4); opacity: 0; } }`;
document.head.appendChild(style);

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : (target >= 2000 ? '' : '+');
  function update() {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + suffix;
    if (start < target) requestAnimationFrame(update);
  }
  update();
}
const statNums = document.querySelectorAll('.stat-num');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const val = parseInt(el.textContent);
      if (isNaN(val)) { counterObs.unobserve(el); return; }
      animateCounter(el, val);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(n => counterObs.observe(n));

// ===== CARD TILT EFFECT =====
document.querySelectorAll('.project-card, .skill-category, .cert-card, .pillar-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -4;
    const rotateY = (x - centerX) / centerX * 4;
    this.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    this.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// ===== PROGRESS ON PAGE LOAD =====
// ===== PROJECTS FILTER =====
const filterButtons = document.querySelectorAll('.filter-btn');
const filterItems = document.querySelectorAll('.filter-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filterValue = btn.getAttribute('data-filter');

    filterItems.forEach(item => {
      if (filterValue === 'all' || item.classList.contains(filterValue)) {
        item.classList.remove('hide');
        setTimeout(() => {
          item.classList.add('visible');
        }, 50);
      } else {
        item.classList.add('hide');
        item.classList.remove('visible');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

// ===== CODE CARD TABS =====
const codeTabs = document.querySelectorAll('.code-tab');
const codeContents = document.querySelectorAll('.code-content');

codeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    codeTabs.forEach(t => t.classList.remove('active'));
    codeContents.forEach(c => {
      c.classList.remove('active');
      c.style.display = 'none';
    });

    tab.classList.add('active');
    const selectedTab = tab.getAttribute('data-tab');
    const targetContent = document.getElementById(`code-${selectedTab}`);
    if (targetContent) {
      targetContent.classList.add('active');
      targetContent.style.display = 'block';
    }
  });
});



// ===== THEME TOGGLE (LIGHT / DARK) =====
const themeToggleBtn = document.getElementById('theme-toggle');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'light') {
  setTheme('light');
} else if (savedTheme === 'dark') {
  setTheme('dark');
} else {
  setTheme(systemPrefersDark ? 'dark' : 'light');
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  });
}



console.log('%c👋 Hey there! I\'m Gulshan Kumar', 'color: #a78bfa; font-size: 18px; font-weight: bold;');
console.log('%c🚀 Android & Flutter Developer | AI/ML Enthusiast', 'color: #06b6d4; font-size: 14px;');
console.log('%c📬 Get in touch: gushan76542@gmail.com', 'color: #f59e0b; font-size: 12px;');

// ==========================================
// 1. ARCHITECTURE PIPELINE VISUALIZER
// ==========================================
const archStages = {
  ui: {
    badge: 'Stage 01 · UI Layer',
    tech: 'Jetpack Compose &bull; Material 3 Design Tokens',
    heading: 'Declarative, Unidirectional Data Flow',
    body: 'UI components observe reactive UI state flows emitted by ViewModels. Screens only render what the state holds, ensuring zero UI glitching, state desynchronization, or memory leaks.',
    code: `@Composable fun LeadScreen(viewModel: LeadViewModel = hiltViewModel()) {\n  val uiState by viewModel.uiState.collectAsStateWithLifecycle()\n  // State-driven reactive UI rendering with zero XML bloat\n}`
  },
  viewmodel: {
    badge: 'Stage 02 · State & Flow',
    tech: 'ViewModel + StateFlow + Coroutines',
    heading: 'Encapsulated State & Lifecycle Survival',
    body: 'ViewModels survive configuration changes (like screen rotation) and process business intents asynchronously using Kotlin Coroutines on viewModelScope. State is held in immutable StateFlow.',
    code: `class LeadViewModel @Inject constructor(\n  private val repository: LeadRepository\n) : ViewModel() {\n  val uiState: StateFlow<LeadUiState> = repository.getLeadsStream()\n    .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), Loading)\n}`
  },
  repository: {
    badge: 'Stage 03 · Repository Pattern',
    tech: 'Single Source of Truth Coordination',
    heading: 'Abstracted Data Coordination',
    body: 'The Repository coordinates between local Room SQLite cache and remote Firebase backends. It provides an offline-first stream where the UI reads directly from local storage, while network fetches silently update the cache.',
    code: `class LeadRepositoryImpl @Inject constructor(\n  private val localDao: LeadDao,\n  private val remoteSource: FirebaseFirestore\n) : LeadRepository {\n  override fun getLeadsStream(): Flow<List<Lead>> = localDao.getAllLeads()\n}`
  },
  room: {
    badge: 'Stage 04 · Local SQLite DB',
    tech: 'Room Persistence Library + Reactive Flow',
    heading: 'Reactive & Offline-First Persistence',
    body: 'Room provides compile-time SQLite query verification and returns reactive Flow<List<T>> observables. Changes made by background workers or user actions immediately propagate to the active screen.',
    code: `@Dao interface LeadDao {\n  @Query("SELECT * FROM leads ORDER BY timestamp DESC")\n  fun getAllLeads(): Flow<List<LeadEntity>>\n  @Upsert suspend fun upsertAll(leads: List<LeadEntity>)\n}`
  },
  sync: {
    badge: 'Stage 05 · Cloud Sync',
    tech: 'WorkManager + Firebase Cloud Firestore',
    heading: 'Guaranteed Periodic & Deferred Execution',
    body: 'Android WorkManager schedules battery-efficient background jobs with network constraints to sync offline CRM logs, GPS coordinates, and biometric data to Firebase Firestore even when the app is closed.',
    code: `val syncRequest = PeriodicWorkRequestBuilder<SyncWorker>(15, TimeUnit.MINUTES)\n  .setConstraints(Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build())\n  .build()\nWorkManager.getInstance(context).enqueueUniquePeriodicWork("SyncData", Keep, syncRequest)`
  }
};

window.selectArchNode = function(nodeKey) {
  const stage = archStages[nodeKey];
  if (!stage) return;

  // Update node active states
  document.querySelectorAll('.arch-node').forEach(node => {
    if (node.getAttribute('data-node') === nodeKey) {
      node.classList.add('active');
    } else {
      node.classList.remove('active');
    }
  });

  const inspector = document.getElementById('arch-inspector');
  if (!inspector) return;

  inspector.style.opacity = '0.5';
  inspector.style.transition = 'opacity 0.15s ease';

  setTimeout(() => {
    const badgeEl = document.getElementById('inspector-badge');
    const techEl = document.getElementById('inspector-tech');
    const headingEl = document.getElementById('inspector-heading');
    const bodyEl = document.getElementById('inspector-body');
    const codeEl = document.querySelector('#inspector-code code');

    if (badgeEl) badgeEl.textContent = stage.badge;
    if (techEl) techEl.innerHTML = stage.tech;
    if (headingEl) headingEl.textContent = stage.heading;
    if (bodyEl) bodyEl.textContent = stage.body;
    if (codeEl) codeEl.textContent = stage.code;

    inspector.style.opacity = '1';
  }, 120);
};

// ==========================================
// 2. INTERACTIVE APP SIMULATOR
// ==========================================
const simulatorApps = {
  zooverse: {
    name: 'ZooVerse',
    screens: [
      {
        id: 'map',
        label: '🗺️ GPS Map',
        badge: 'Feature 01 · Real-Time Map',
        title: 'Smart GPS Zoo Navigation',
        desc: 'Interactive Google Maps SDK integration with custom vector markers, geofenced discovery alerts, and offline caching for seamless visitor guidance.',
        tags: ['Google Maps API', 'Room DB Cache', 'Jetpack Compose'],
        render: () => `
          <div class="sim-screen-header">
            <div class="sim-screen-logo">🦁 ZooVerse Guide</div>
            <div class="sim-live-indicator">GPS Live</div>
          </div>
          <div class="sim-map-visual">
            <div class="sim-pin pin-lion">🦁 Lion Den</div>
            <div class="sim-pin pin-user">● You</div>
            <div class="sim-pin pin-aqua">🐬 Aqua Show</div>
          </div>
          <div class="sim-card-ui">
            <div style="font-size:0.80rem;font-weight:700;color:var(--text-primary);margin-bottom:2px;">📍 African Lion Habitat</div>
            <div style="font-size:0.68rem;color:var(--text-muted);margin-bottom:6px;">Zone A · 120m away · Open Now</div>
            <div style="font-size:0.68rem;color:var(--primary);margin-bottom:8px;">🕒 Daily Feeding Session at 03:00 PM</div>
            <button class="sim-action-btn" onclick="alert('🧭 Navigation route calculated! Turn right at Penguin Plaza.')">Start Walking Route</button>
          </div>
        `
      },
      {
        id: 'wiki',
        label: '🦁 Animal Wiki',
        badge: 'Feature 02 · Knowledge Base',
        title: 'Rich Animal Encyclopedia',
        desc: 'Fast, offline-accessible animal profiles with high-resolution imagery, conservation status badges, diet info, and native audio calls.',
        tags: ['Offline Wiki', 'Coil Image Loader', 'Audio Playback'],
        render: () => `
          <div class="sim-screen-header">
            <div class="sim-screen-logo">📚 Wildlife Encyclopedia</div>
            <div class="sim-live-indicator">Offline Ready</div>
          </div>
          <div class="sim-wiki-header">
            <div class="sim-animal-avatar">🐯</div>
            <div class="sim-animal-title">
              <h4>Royal Bengal Tiger</h4>
              <span>Panthera tigris tigris</span>
            </div>
          </div>
          <div class="sim-card-ui">
            <div style="display:flex;justify-content:space-between;font-size:0.70rem;margin-bottom:6px;">
              <span style="color:var(--text-muted);">Status:</span>
              <span style="color:#fb7185;font-weight:700;">🔴 Endangered (IUCN)</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.70rem;margin-bottom:6px;">
              <span style="color:var(--text-muted);">Diet:</span>
              <span style="color:var(--text-primary);">Carnivore (Chital, Sambar)</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.70rem;margin-bottom:6px;">
              <span style="color:var(--text-muted);">Weight:</span>
              <span style="color:var(--text-primary);">180 – 260 kg</span>
            </div>
            <p style="font-size:0.68rem;color:var(--text-secondary);line-height:1.4;margin-top:6px;">
              Apex predator equipped with exceptional night vision and supreme swimming capabilities.
            </p>
            <button class="sim-audio-btn" onclick="simToggleAudio(this)">
              <span>🔊</span> <span>Play Roar Sound</span>
            </button>
          </div>
        `
      },
      {
        id: 'events',
        label: '📅 Live Events',
        badge: 'Feature 03 · Event Updates',
        title: 'Real-Time Event & Show Schedules',
        desc: 'Dynamic schedule updates with Firebase Cloud Messaging (FCM) notifications for animal feedings, keeper talks, and park announcements.',
        tags: ['Firebase Cloud Messaging', 'Notification Channels', 'Realtime Sync'],
        render: () => `
          <div class="sim-screen-header">
            <div class="sim-screen-logo">📅 Today's Live Shows</div>
            <div class="sim-live-indicator">Real-Time</div>
          </div>
          <div class="sim-event-item">
            <div class="sim-event-info">
              <span class="sim-event-name">🐬 Dolphin Aquatic Show</span>
              <span class="sim-event-meta">02:30 PM · Arena B</span>
            </div>
            <span class="sim-event-pill" onclick="simToggleReminder(this)">🔔 Remind</span>
          </div>
          <div class="sim-event-item">
            <div class="sim-event-info">
              <span class="sim-event-name">🐘 Elephant Bath &amp; Feeding</span>
              <span class="sim-event-meta">03:45 PM · Pool 1</span>
            </div>
            <span class="sim-event-pill" onclick="simToggleReminder(this)">🔔 Remind</span>
          </div>
          <div class="sim-event-item">
            <div class="sim-event-info">
              <span class="sim-event-name">🦅 Birds of Prey Free Flight</span>
              <span class="sim-event-meta">05:00 PM · Sky Zone</span>
            </div>
            <span class="sim-event-pill" onclick="simToggleReminder(this)">🔔 Remind</span>
          </div>
          <button class="sim-action-btn" style="margin-top:8px;" onclick="alert('🔔 FCM Notifications enabled! You will be alerted 15 minutes prior to every show.')">Enable Push Notifications</button>
        `
      }
    ]
  },
  leaddialer: {
    name: 'LeadDialer',
    screens: [
      {
        id: 'dialer',
        label: '📞 1-Tap Dialer',
        badge: 'Feature 01 · Rapid Telephony',
        title: '1-Tap Fast Telephony & Call Logging',
        desc: 'Instant phone intent execution with zero typing, automatic call outcome logging, and offline queueing for field sales representatives.',
        tags: ['Android Intent', 'Automated Logging', 'Offline Queue'],
        render: () => `
          <div class="sim-screen-header">
            <div class="sim-screen-logo">📞 LeadDialer CRM</div>
            <div class="sim-live-indicator">Online · 24 Leads</div>
          </div>
          <div class="sim-lead-card">
            <div class="sim-lead-info">
              <span class="sim-lead-name">Rajesh Sharma</span>
              <span class="sim-lead-phone">+91 98765 43210</span>
              <span class="sim-lead-status status-hot">🔥 Hot Lead · Callback</span>
            </div>
            <button class="sim-call-btn" onclick="simCallLead('Rajesh Sharma', '+91 98765 43210')" title="Call Rajesh">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            </button>
          </div>
          <div class="sim-lead-card">
            <div class="sim-lead-info">
              <span class="sim-lead-name">Pooja Verma</span>
              <span class="sim-lead-phone">+91 91234 56789</span>
              <span class="sim-lead-status status-demo">💻 Demo Scheduled</span>
            </div>
            <button class="sim-call-btn" onclick="simCallLead('Pooja Verma', '+91 91234 56789')" title="Call Pooja">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            </button>
          </div>
          <div class="sim-lead-card">
            <div class="sim-lead-info">
              <span class="sim-lead-name">Amit Kumar</span>
              <span class="sim-lead-phone">+91 99887 76655</span>
              <span class="sim-lead-status status-new">✨ New Inbound Lead</span>
            </div>
            <button class="sim-call-btn" onclick="simCallLead('Amit Kumar', '+91 99887 76655')" title="Call Amit">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            </button>
          </div>
          <button class="sim-action-btn" onclick="alert('⚡ Auto-Dialer Mode: Initiating consecutive calling pipeline for remaining 24 leads.')">⚡ Launch Auto-Dialer Sequence</button>
        `
      },
      {
        id: 'attendance',
        label: '📍 GPS Attendance',
        badge: 'Feature 02 · Anti-Spoof Biometrics',
        title: 'Geofenced Attendance with Selfie Verification',
        desc: 'CameraX biometric selfie capture + Google FusedLocationProvider ensuring zero proxy attendance, fully functional with offline SQLite buffering.',
        tags: ['CameraX Biometrics', 'FusedLocationProvider', 'Anti-Spoofing'],
        render: () => `
          <div class="sim-screen-header">
            <div class="sim-screen-logo">📍 Biometric Punch In</div>
            <div class="sim-live-indicator">GPS Verified</div>
          </div>
          <div class="sim-attendance-center">
            <div class="sim-selfie-circle">
              <span class="sim-selfie-icon">👤</span>
              <span class="sim-verified-badge">✓</span>
            </div>
            <div class="sim-gps-pill">📍 Office Hub (28.5355° N, 77.3910° E)</div>
            <div style="font-size:0.75rem;font-weight:600;color:var(--text-primary);margin-bottom:4px;">Face Biometric Match: 99.4%</div>
            <div style="font-size:0.68rem;color:var(--text-muted);margin-bottom:12px;">Geofence distance: 18m (Inside Allowed 50m)</div>
            <button class="sim-action-btn" onclick="simPunchAttendance(this)">
              PUNCH IN NOW (09:14 AM)
            </button>
          </div>
        `
      },
      {
        id: 'analytics',
        label: '📊 Sales Analytics',
        badge: 'Feature 03 · Live Performance',
        title: 'Real-Time Performance Dashboard',
        desc: 'Offline-cached KPI metrics showing call durations, conversion ratios, and daily targets synchronized automatically to Firestore.',
        tags: ['MPAndroidChart', 'StateFlow', 'Real-Time KPI'],
        render: () => `
          <div class="sim-screen-header">
            <div class="sim-screen-logo">📊 Sales Dashboard</div>
            <div class="sim-live-indicator">Updated Just Now</div>
          </div>
          <div class="sim-analytics-grid">
            <div class="sim-analytic-box">
              <span class="sim-analytic-num">48</span>
              <span class="sim-analytic-label">Calls Made</span>
            </div>
            <div class="sim-analytic-box">
              <span class="sim-analytic-num">2h 45m</span>
              <span class="sim-analytic-label">Talk Time</span>
            </div>
            <div class="sim-analytic-box">
              <span class="sim-analytic-num">6</span>
              <span class="sim-analytic-label">Deals Closed</span>
            </div>
          </div>
          <div class="sim-card-ui">
            <div class="sim-chart-item">
              <div class="sim-chart-header">
                <span>Daily Call Target (48 / 50)</span>
                <span>96%</span>
              </div>
              <div class="sim-chart-bar"><div class="sim-chart-fill" style="width: 96%;"></div></div>
            </div>
            <div class="sim-chart-item">
              <div class="sim-chart-header">
                <span>Monthly Target Achieved</span>
                <span>88%</span>
              </div>
              <div class="sim-chart-bar"><div class="sim-chart-fill" style="width: 88%; background: linear-gradient(90deg, #8b5cf6, #38bdf8);"></div></div>
            </div>
          </div>
          <div style="text-align:center;font-size:0.68rem;color:var(--text-muted);margin-top:4px;">
            ☁️ WorkManager background sync confirmed
          </div>
        `
      }
    ]
  }
};

let currentSimApp = 'zooverse';
let currentSimScreenIndex = 0;

window.switchSimulatorApp = function(appKey) {
  if (!simulatorApps[appKey]) return;
  currentSimApp = appKey;
  currentSimScreenIndex = 0;

  const zooTab = document.getElementById('sim-tab-zoo');
  const leadTab = document.getElementById('sim-tab-lead');
  if (appKey === 'zooverse') {
    if (zooTab) zooTab.classList.add('active');
    if (leadTab) leadTab.classList.remove('active');
  } else {
    if (leadTab) leadTab.classList.add('active');
    if (zooTab) zooTab.classList.remove('active');
  }

  const screenButtonsContainer = document.getElementById('sim-screen-buttons');
  if (screenButtonsContainer) {
    screenButtonsContainer.innerHTML = '';
    simulatorApps[appKey].screens.forEach((sc, idx) => {
      const btn = document.createElement('button');
      btn.className = `sim-screen-btn ${idx === 0 ? 'active' : ''}`;
      btn.textContent = sc.label;
      btn.onclick = () => selectSimScreen(idx);
      screenButtonsContainer.appendChild(btn);
    });
  }

  selectSimScreen(0);
};

window.selectSimScreen = function(screenIndex) {
  const app = simulatorApps[currentSimApp];
  if (!app || !app.screens[screenIndex]) return;
  currentSimScreenIndex = screenIndex;

  const screenData = app.screens[screenIndex];

  const screenBtns = document.querySelectorAll('.sim-screen-btn');
  screenBtns.forEach((b, idx) => {
    if (idx === screenIndex) b.classList.add('active');
    else b.classList.remove('active');
  });

  const badgeEl = document.getElementById('sim-feature-badge');
  const titleEl = document.getElementById('sim-feature-title');
  const descEl = document.getElementById('sim-feature-desc');
  const tagsEl = document.getElementById('sim-feature-tags');

  if (badgeEl) badgeEl.textContent = screenData.badge;
  if (titleEl) titleEl.textContent = screenData.title;
  if (descEl) descEl.textContent = screenData.desc;
  if (tagsEl) {
    tagsEl.innerHTML = screenData.tags.map(t => `<span class="sim-tag">${t}</span>`).join('');
  }

  const phoneContent = document.getElementById('phone-screen-content');
  if (phoneContent) {
    phoneContent.style.opacity = '0.5';
    phoneContent.style.transform = 'scale(0.98)';
    phoneContent.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
    setTimeout(() => {
      phoneContent.innerHTML = screenData.render();
      phoneContent.style.opacity = '1';
      phoneContent.style.transform = 'scale(1)';
    }, 100);
  }
};

window.simCallLead = function(name, phone) {
  alert(`📱 Native Android Intent:\nACTION_CALL -> tel:${phone}\nCalling ${name}... Outcome auto-logged to Room SQLite DB.`);
};

window.simPunchAttendance = function(btn) {
  btn.textContent = 'Verifying Biometrics... ⏳';
  btn.style.filter = 'brightness(0.8)';
  setTimeout(() => {
    btn.textContent = '✓ Punched In Successfully! (09:14 AM)';
    btn.style.background = '#00f59b';
    btn.style.color = '#05060a';
    btn.style.filter = 'none';
  }, 600);
};

window.simToggleAudio = function(btn) {
  const isPlaying = btn.classList.contains('playing');
  if (isPlaying) {
    btn.classList.remove('playing');
    btn.innerHTML = '<span>🔊</span> <span>Play Roar Sound</span>';
  } else {
    btn.classList.add('playing');
    btn.innerHTML = '<span>⏸</span> <span>Playing Bengal Tiger Roar...</span>';
    setTimeout(() => {
      btn.classList.remove('playing');
      btn.innerHTML = '<span>🔊</span> <span>Play Roar Sound</span>';
    }, 2800);
  }
};

window.simToggleReminder = function(btn) {
  if (btn.textContent.includes('Remind')) {
    btn.textContent = '✓ Set';
    btn.style.background = 'rgba(0, 245, 155, 0.3)';
    btn.style.color = '#00f59b';
  } else {
    btn.textContent = '🔔 Remind';
    btn.style.background = '';
    btn.style.color = '';
  }
};

// ==========================================
// 3. QR CODE MODAL FOR ZOOVERSE
// ==========================================
const qrModal = document.getElementById('qr-modal');
const openQrBtn = document.getElementById('open-zoo-qr');
const closeQrBtn = document.getElementById('close-qr-modal');
const copyPlaystoreBtn = document.getElementById('copy-playstore-link');
const copyBtnText = document.getElementById('copy-btn-text');
const zooPlaystoreUrl = 'https://play.google.com/store/apps/details?id=com.wildlife.zooexplorer';

function openQrModal() {
  if (qrModal) {
    qrModal.classList.add('open');
    qrModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeQrModal() {
  if (qrModal) {
    qrModal.classList.remove('open');
    qrModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

if (openQrBtn) openQrBtn.addEventListener('click', openQrModal);
if (closeQrBtn) closeQrBtn.addEventListener('click', closeQrModal);
if (qrModal) {
  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) closeQrModal();
  });
}

if (copyPlaystoreBtn) {
  copyPlaystoreBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(zooPlaystoreUrl).then(() => {
      if (copyBtnText) copyBtnText.textContent = 'Copied to Clipboard! ✓';
      setTimeout(() => {
        if (copyBtnText) copyBtnText.textContent = 'Copy Play Store Link';
      }, 2000);
    }).catch(() => {
      prompt('Copy Play Store Link:', zooPlaystoreUrl);
    });
  });
}

// ==========================================
// 3.5. RESUME PREVIEW MODAL
// ==========================================
const resumeModal = document.getElementById('resume-modal');
const openResumeBtn = document.getElementById('btn-resume-preview');
const closeResumeBtn = document.getElementById('close-resume-modal');

function openResumeModal() {
  if (resumeModal) {
    resumeModal.classList.add('open');
    resumeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeResumeModal() {
  if (resumeModal) {
    resumeModal.classList.remove('open');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

if (openResumeBtn) openResumeBtn.addEventListener('click', openResumeModal);
if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResumeModal);
if (resumeModal) {
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResumeModal();
  });
}

// ==========================================
// 4. COMMAND PALETTE (CTRL + K / CMD + K)
// ==========================================
const cmdPalette = document.getElementById('cmd-palette');
const paletteSearch = document.getElementById('palette-search');
const paletteList = document.getElementById('palette-list');
const navCmdBtn = document.getElementById('nav-cmd-btn');
const floatingCmdBtn = document.getElementById('floating-cmd-btn');

const commands = [
  {
    icon: '👁️',
    title: 'Preview Resume / CV',
    sub: 'Open interactive 1-page ATS resume modal preview',
    badge: 'Preview',
    action: () => openResumeModal()
  },
  {
    icon: '📄',
    title: 'Download Resume',
    sub: 'Get Gulshan Kumar\'s latest Android & Flutter resume (PDF)',
    badge: 'File',
    action: () => {
      const a = document.createElement('a');
      a.href = 'resume.pdf';
      a.download = 'Gulshan_Kumar_Resume.pdf';
      a.click();
    }
  },
  {
    icon: '🦁',
    title: 'ZooVerse on Google Play Store',
    sub: 'Open production smart zoo guide app on Google Play',
    badge: 'Play Store',
    action: () => window.open(zooPlaystoreUrl, '_blank')
  },
  {
    icon: '📱',
    title: 'Interactive App Simulator',
    sub: 'Test simulated live screens of ZooVerse & LeadDialer',
    badge: 'Simulator',
    action: () => {
      const el = document.getElementById('simulator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    icon: '⚡',
    title: 'System Architecture Flow',
    sub: 'Inspect Jetpack Compose, Room DB & WorkManager pipeline',
    badge: 'Architecture',
    action: () => {
      const el = document.getElementById('arch-visualizer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    icon: '💼',
    title: 'Featured Projects',
    sub: 'Explore ZooVerse, LeadDialer CRM, One School App, LMS',
    badge: 'Section',
    action: () => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    icon: '🏢',
    title: 'Professional Experience',
    sub: 'Adyapan Edutech Private Limited · App Developer',
    badge: 'Experience',
    action: () => {
      const el = document.getElementById('experience');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    icon: '🛠️',
    title: 'Technical Skills Grid',
    sub: 'Kotlin, Compose, Flutter, Firebase, Room, MVVM',
    badge: 'Skills',
    action: () => {
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  },
  {
    icon: '✉️',
    title: 'Copy Email Address',
    sub: 'gushan76542@gmail.com',
    badge: 'Clipboard',
    action: () => {
      navigator.clipboard.writeText('gushan76542@gmail.com').then(() => {
        alert('Copied to clipboard: gushan76542@gmail.com');
      });
    }
  },
  {
    icon: '🐙',
    title: 'GitHub Profile',
    sub: 'github.com/GulshanKumar21 · Repositories & source code',
    badge: 'External',
    action: () => window.open('https://github.com/GulshanKumar21', '_blank')
  },
  {
    icon: '💼',
    title: 'LinkedIn Profile',
    sub: 'linkedin.com/in/gulshan-kumar-691a03222',
    badge: 'External',
    action: () => window.open('https://linkedin.com/in/gulshan-kumar-691a03222', '_blank')
  },
  {
    icon: '🌓',
    title: 'Toggle Dark / Light Theme',
    sub: 'Switch between cyberpunk dark and clean light themes',
    badge: 'Preference',
    action: () => {
      if (themeToggleBtn) themeToggleBtn.click();
    }
  }
];

let selectedCommandIndex = 0;
let filteredCommands = [...commands];

function renderPaletteItems() {
  if (!paletteList) return;
  paletteList.innerHTML = '';

  if (filteredCommands.length === 0) {
    paletteList.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: var(--fs-card-body);">
        No matching commands found.
      </div>
    `;
    return;
  }

  filteredCommands.forEach((cmd, idx) => {
    const item = document.createElement('div');
    item.className = `palette-item ${idx === selectedCommandIndex ? 'selected' : ''}`;
    item.innerHTML = `
      <div class="palette-item-left">
        <span class="palette-item-icon">${cmd.icon}</span>
        <div class="palette-item-text">
          <span class="palette-item-title">${cmd.title}</span>
          <span class="palette-item-sub">${cmd.sub}</span>
        </div>
      </div>
      <span class="palette-item-badge">${cmd.badge}</span>
    `;

    item.addEventListener('mouseenter', () => {
      selectedCommandIndex = idx;
      updateSelectedPaletteItem();
    });

    item.addEventListener('click', () => {
      executeCommand(cmd);
    });

    paletteList.appendChild(item);
  });
}

function updateSelectedPaletteItem() {
  const items = paletteList.querySelectorAll('.palette-item');
  items.forEach((item, idx) => {
    if (idx === selectedCommandIndex) {
      item.classList.add('selected');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.classList.remove('selected');
    }
  });
}

function executeCommand(cmd) {
  closePalette();
  if (cmd && typeof cmd.action === 'function') {
    cmd.action();
  }
}

function openPalette() {
  if (!cmdPalette) return;
  cmdPalette.classList.add('open');
  cmdPalette.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (paletteSearch) {
    paletteSearch.value = '';
    filteredCommands = [...commands];
    selectedCommandIndex = 0;
    renderPaletteItems();
    setTimeout(() => paletteSearch.focus(), 50);
  }
}

function closePalette() {
  if (!cmdPalette) return;
  cmdPalette.classList.remove('open');
  cmdPalette.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (navCmdBtn) navCmdBtn.addEventListener('click', openPalette);
if (floatingCmdBtn) floatingCmdBtn.addEventListener('click', openPalette);
if (cmdPalette) {
  cmdPalette.addEventListener('click', (e) => {
    if (e.target === cmdPalette) closePalette();
  });
}

if (paletteSearch) {
  paletteSearch.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    filteredCommands = commands.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.sub.toLowerCase().includes(q) || 
      c.badge.toLowerCase().includes(q)
    );
    selectedCommandIndex = 0;
    renderPaletteItems();
  });
}

// Global Keyboard Shortcuts
window.addEventListener('keydown', (e) => {
  // Check Ctrl+K or Cmd+K
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (cmdPalette && cmdPalette.classList.contains('open')) {
      closePalette();
    } else {
      openPalette();
    }
    return;
  }

  // Check '/' when not in an input
  if (e.key === '/' && document.activeElement && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    e.preventDefault();
    openPalette();
    return;
  }

  // When Palette is open
  if (cmdPalette && cmdPalette.classList.contains('open')) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommands.length;
        updateSelectedPaletteItem();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredCommands.length > 0) {
        selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
        updateSelectedPaletteItem();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedCommandIndex]) {
        executeCommand(filteredCommands[selectedCommandIndex]);
      }
    }
  }

  // When QR Modal is open
  if (qrModal && qrModal.classList.contains('open')) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeQrModal();
    }
  }

  // When Resume Modal is open
  if (resumeModal && resumeModal.classList.contains('open')) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeResumeModal();
    }
  }
});

// Initialize on DOM ready or immediate if already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('sim-screen-buttons')) {
      switchSimulatorApp('zooverse');
    }
  });
} else {
  if (document.getElementById('sim-screen-buttons')) {
    switchSimulatorApp('zooverse');
  }
}
