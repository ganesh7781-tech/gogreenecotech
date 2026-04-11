/* ========================================================
   GO GREEN ECO TECH — Interactive JavaScript
   Features: Sticky Nav, Mobile Menu, Smooth Scroll,
             Form Validation, Scroll Animations, Counter
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── DOM References ──
  const loader = document.getElementById('loader');
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollProgress = document.getElementById('scrollProgress');
  const contactForm = document.getElementById('contactForm');
  const fadeElements = document.querySelectorAll('.fade-in');
  const statNumbers = document.querySelectorAll('.hero-stat-number');

  // ── Loader ──
  function hideLoader() {
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.style.display = 'none';
        // After loader is gone, ensure elements in view are revealed
        revealOnScroll();
      }, 600);
    }
  }

  // Hide loader once everything is loaded
  window.addEventListener('load', () => {
    setTimeout(hideLoader, 800);
  });

  // Fallback: hide loader after 3s max
  setTimeout(hideLoader, 3000);


  // ═══════════════════════════════════════════════════════
  // STICKY NAVBAR + SCROLL PROGRESS
  // ═══════════════════════════════════════════════════════
  function handleScroll() {
    const scrollY = window.scrollY;

    // Sticky navbar shadow
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll progress bar
    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollY / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    }

    // Active nav link based on section
    updateActiveNav();

    // Counter animation
    animateCounters();
  }

  // Throttle scroll events for performance
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        handleScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });


  // ═══════════════════════════════════════════════════════
  // ACTIVE NAV LINK MATCHING (Multi-Page App)
  // ═══════════════════════════════════════════════════════
  function updateActiveNav() {
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Child pages should highlight the Services tab
    if (currentPath === 'hazardous-waste.html' || currentPath === 'non-hazardous-waste.html') {
      currentPath = 'services.html';
    }

    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      link.classList.remove('active');
      if (linkHref === currentPath) {
        link.classList.add('active');
      }
    });

    mobileLinks.forEach(link => {
      const linkHref = link.getAttribute('href');
      link.classList.remove('active');
      if (linkHref === currentPath) {
        link.classList.add('active');
      }
    });
  }

  // Set immediately
  updateActiveNav();


  // ═══════════════════════════════════════════════════════
  // MOBILE MENU
  // ═══════════════════════════════════════════════════════
  let overlay = null;

  function createOverlay() {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mobile-overlay';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', closeMobileMenu);
    }
  }

  function openMobileMenu() {
    createOverlay();
    mobileMenu.classList.add('active');
    hamburger.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);

  // Close mobile menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });


  // ═══════════════════════════════════════════════════════
  // SMOOTH SCROLLING (For intra-page anchor links only)
  // ═══════════════════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // ═══════════════════════════════════════════════════════
  // SCROLL REVEAL (IntersectionObserver based)
  // ═══════════════════════════════════════════════════════
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  function revealOnScroll() {
    fadeElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // Add stagger delays to grouped elements
  function addStaggerDelays() {
    const groups = [
      '.about-feature-card',
      '.service-card',
      '.industry-card',
      '.process-step'
    ];

    groups.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.dataset.delay = i * 100;
      });
    });
  }

  addStaggerDelays();


  // ═══════════════════════════════════════════════════════
  // COUNTER ANIMATION
  // ═══════════════════════════════════════════════════════
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;

    const statsSection = document.querySelector('.hero-stats');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      countersAnimated = true;

      statNumbers.forEach(num => {
        const target = parseInt(num.dataset.count);
        const duration = 2000;
        const start = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);

          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);

          num.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            num.textContent = target;
          }
        }

        requestAnimationFrame(updateCounter);
      });
    }
  }


  // ═══════════════════════════════════════════════════════
  // FORM VALIDATION
  // ═══════════════════════════════════════════════════════
  const validators = {
    name: (value) => {
      if (!value.trim()) return 'Full name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      return '';
    },
    email: (value) => {
      if (!value.trim()) return 'Email address is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
      return '';
    },
    phone: (value) => {
      if (!value.trim()) return 'Phone number is required';
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,15}$/;
      if (!phoneRegex.test(value.trim())) return 'Please enter a valid phone number';
      return '';
    },
    message: (value) => {
      if (!value.trim()) return 'Message is required';
      if (value.trim().length < 10) return 'Please provide more details (min 10 characters)';
      return '';
    }
  };

  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return; 
    const errorSpan = document.getElementById(fieldId + 'Error');
    if (!errorSpan) return;

    if (message) {
      field.classList.add('error');
      errorSpan.textContent = message;
    } else {
      field.classList.remove('error');
      errorSpan.textContent = '';
    }
  }

  // Real-time validation
  ['name', 'email', 'phone', 'message'].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('blur', () => {
        const error = validators[fieldId](field.value);
        showFieldError(fieldId, error);
      });

      field.addEventListener('input', () => {
        if (field.classList.contains('error')) {
          const error = validators[fieldId](field.value);
          showFieldError(fieldId, error);
        }
      });
    }
  });

  // Form submit
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const fields = ['name', 'email', 'phone', 'message'];

      fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
          const error = validators[fieldId](field.value);
          showFieldError(fieldId, error);
          if (error) isValid = false;
        }
      });

      if (isValid) {
        contactForm.style.display = 'none';
        const successEl = document.getElementById('formSuccess');
        if (successEl) successEl.classList.add('show');

        setTimeout(() => {
          contactForm.reset();
        }, 500);
      }
    });
  }


  // ═══════════════════════════════════════════════════════
  // FLOATING WIDGET
  // ═══════════════════════════════════════════════════════
  function injectFloatingWidget() {
    if (!document.querySelector('.floating-widget')) {
      const widget = document.createElement('a');
      widget.href = 'contact.html';
      widget.className = 'floating-widget fade-in';
      widget.setAttribute('aria-label', 'Contact Us');
      widget.innerHTML = `<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`;
      document.body.appendChild(widget);
      
      // small delay to trigger fade in
      setTimeout(() => widget.style.opacity = '1', 500);
    }
  }

  // ═══════════════════════════════════════════════════════
  // INITIAL CALLS
  // ═══════════════════════════════════════════════════════
  handleScroll();
  revealOnScroll();
  animateCounters();
  injectFloatingWidget();

});
