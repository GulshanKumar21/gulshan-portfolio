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
    const colors = ['#7c3aed', '#a78bfa', '#06b6d4', '#f59e0b'];
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
          link.style.color = '#a78bfa';
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
  function update() {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + (el.dataset.suffix || '+');
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
      const suffix = el.textContent.replace(/[0-9]/g, '');
      el.dataset.suffix = suffix;
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

// ===== INTERACTIVE DEV TERMINAL =====
const terminalContainer = document.getElementById('terminal-container');
const terminalToggleBtn = document.getElementById('terminal-toggle-btn');
const terminalDrawer = document.getElementById('terminal-drawer');
const terminalCloseBtn = document.getElementById('terminal-close-btn');
const terminalMinBtn = document.getElementById('terminal-min-btn');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

// Open Terminal
terminalToggleBtn.addEventListener('click', () => {
  terminalDrawer.classList.add('open');
  terminalToggleBtn.classList.add('hide');
  setTimeout(() => terminalInput.focus(), 300);
});

// Close/Minimize Terminal
const closeTerminal = () => {
  terminalDrawer.classList.remove('open');
  terminalToggleBtn.classList.remove('hide');
};
terminalCloseBtn.addEventListener('click', closeTerminal);
terminalMinBtn.addEventListener('click', closeTerminal);

// Command handler
function addLine(content, className = '') {
  const line = document.createElement('div');
  line.className = `output-line ${className}`;
  line.innerHTML = content;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Suggestions click handler
document.querySelectorAll('.suggestion-tag').forEach(btn => {
  btn.addEventListener('click', () => {
    const cmd = btn.getAttribute('data-cmd');
    runCommand(cmd);
  });
});

let isBuilding = false;

function runCommand(cmd) {
  if (isBuilding) return;
  cmd = cmd.trim().toLowerCase();
  if (!cmd) return;

  addLine(`<span class="terminal-prompt">guest@gulshan:~$</span> <span class="output-command-run">${cmd}</span>`);

  switch (cmd) {
    case 'help':
      addLine('Available commands:');
      addLine('  <span class="cmd-highlight">about</span>    - Brief summary of my background');
      addLine('  <span class="cmd-highlight">skills</span>   - List my technical stack category-wise');
      addLine('  <span class="cmd-highlight">projects</span> - View production and academic projects');
      addLine('  <span class="cmd-highlight">build</span>    - Compile code & run simulated tests');
      addLine('  <span class="cmd-highlight">clear</span>   - Clear terminal screen');
      break;

    case 'about':
      addLine('<strong>Gulshan Kumar</strong> — Android & Flutter Developer');
      addLine('B.Tech CSE student from Lovely Professional University (Batch 2022-2026).');
      addLine('Currently working as App Developer at Adyapan Edutech Private Limited.');
      addLine('Passionate about building performant, offline-first mobile systems using Clean Architecture.');
      break;

    case 'skills':
      addLine('Technical Tech Stack:');
      addLine('  <span class="cmd-highlight">[Android]</span> Kotlin, Jetpack Compose, XML Layouts, Room DB, WorkManager, MVVM');
      addLine('  <span class="cmd-highlight">[Flutter]</span> Dart, Cross-Platform UI, BLoC, GetX, Provider, REST APIs');
      addLine('  <span class="cmd-highlight">[AI & ML]</span> Python, TensorFlow, Deep Learning, NLP, Pandas, NumPy');
      addLine('  <span class="cmd-highlight">[Cloud/DB]</span> Firebase Auth, Firestore, Realtime DB, Cloud Storage, Push Notifications');
      break;

    case 'projects':
      addLine('Featured App Deliveries:');
      addLine('  🚀 <span class="cmd-highlight">Adyapan LeadDialer (CRM)</span> - Solo built, 100% Kotlin production app with offline storage and background call syncing.');
      addLine('  🚀 <span class="cmd-highlight">Adyapan Student App</span> - Flutter-based gamified educational app with parental dashboard.');
      addLine('  🚀 <span class="cmd-highlight">Adyapan Admin App</span> - Flutter school admin suite.');
      addLine('  🎓 <span class="cmd-highlight">Zoo Explorer App</span> - Native Android guide app with maps.');
      break;

    case 'clear':
      terminalOutput.innerHTML = '';
      break;

    case 'build':
      isBuilding = true;
      terminalInput.disabled = true;
      terminalInput.placeholder = 'Building project, please wait...';
      
      const buildSteps = [
        { text: 'Starting Gradle daemon...', delay: 200, class: 'build-log' },
        { text: 'Checking Gradle dependencies...', delay: 500, class: 'build-log' },
        { text: 'Task :app:preBuild UP-TO-DATE', delay: 300, class: 'build-task' },
        { text: 'Task :app:compileDebugKotlin', delay: 600, class: 'build-task' },
        { text: '  -> Compiled 27 Kotlin files successfully.', delay: 200, class: 'build-log' },
        { text: 'Task :app:compileDebugJavaWithJavac UP-TO-DATE', delay: 200, class: 'build-task' },
        { text: 'Task :app:processDebugResources', delay: 400, class: 'build-task' },
        { text: 'Task :app:testDebugUnitTest', delay: 500, class: 'build-task' },
        { text: '  -> Run 14 unit tests: 14 PASSED, 0 FAILED.', delay: 200, class: 'build-log' },
        { text: 'Task :app:assembleDebug', delay: 300, class: 'build-task' },
        { text: 'BUILD SUCCESSFUL in 3.4s (10 actionable tasks: 3 executed, 7 up-to-date)', delay: 200, class: 'build-success' },
        { text: '📱 App compiled successfully! Ready for staging upload.', delay: 200, class: 'success' }
      ];

      let currentStep = 0;
      function executeBuildStep() {
        if (currentStep < buildSteps.length) {
          const step = buildSteps[currentStep];
          addLine(step.text, step.class);
          currentStep++;
          setTimeout(executeBuildStep, step.delay);
        } else {
          isBuilding = false;
          terminalInput.disabled = false;
          terminalInput.placeholder = 'Type a command...';
          terminalInput.focus();
        }
      }
      executeBuildStep();
      break;

    default:
      addLine(`bash: command not found: ${cmd}. Type <span class="cmd-highlight">help</span> for available commands.`, 'error');
  }
}

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = terminalInput.value;
    terminalInput.value = '';
    runCommand(cmd);
  }
});

console.log('%c👋 Hey there! I\'m Gulshan Kumar', 'color: #a78bfa; font-size: 18px; font-weight: bold;');
console.log('%c🚀 Android & Flutter Developer | AI/ML Enthusiast', 'color: #06b6d4; font-size: 14px;');
console.log('%c📬 Get in touch: gushan76542@gmail.com', 'color: #f59e0b; font-size: 12px;');
