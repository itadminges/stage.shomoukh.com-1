// Shomoukh Nursery School Interactivity & Modal Handlers
document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. STICKY HEADER TRANSITION ON SCROLL
     ============================================================ */
  const header = document.getElementById('site-header');
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (scrollToTopBtn) {
      if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     2. OFFCANVAS NAVIGATION DRAWER
     ============================================================ */
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const menuCloseBtn = document.getElementById('menu-close-btn');
  const offcanvasDrawer = document.getElementById('offcanvas-drawer');

  function openOffcanvas() {
    if (!offcanvasDrawer) return;
    offcanvasDrawer.classList.add('open');
    offcanvasDrawer.setAttribute('aria-hidden', 'false');
    if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeOffcanvas() {
    if (!offcanvasDrawer) return;
    offcanvasDrawer.classList.remove('open');
    offcanvasDrawer.setAttribute('aria-hidden', 'true');
    if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openOffcanvas);
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeOffcanvas);

  // Submenu Accordions inside Drawer
  const submenuToggles = document.querySelectorAll('.submenu-toggle-btn');
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const parentItem = toggle.closest('.drawer-menu-item');
      const isCurrentlyActive = parentItem.classList.contains('active');

      document.querySelectorAll('.drawer-menu-item.active').forEach(item => {
        if (item !== parentItem) {
          item.classList.remove('active');
          const btn = item.querySelector('.submenu-toggle-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isCurrentlyActive) {
        parentItem.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        parentItem.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ============================================================
     3. SEARCH MODAL OVERLAY
     ============================================================ */
  const searchOpenBtn = document.getElementById('search-open-btn');
  const searchModal = document.getElementById('search-modal');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input');
  const searchBackdrop = document.querySelector('.search-modal-backdrop');

  function openSearch() {
    if (!searchModal) return;
    searchModal.classList.add('open');
    searchModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 100);
  }

  function closeSearch() {
    if (!searchModal) return;
    searchModal.classList.remove('open');
    searchModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (searchOpenBtn) searchOpenBtn.addEventListener('click', openSearch);
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
  if (searchBackdrop) searchBackdrop.addEventListener('click', closeSearch);

  // Close search on quick-tag click
  document.querySelectorAll('.search-quick-tags a').forEach(tag => {
    tag.addEventListener('click', closeSearch);
  });

  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const term = (searchInput?.value || '').toLowerCase().trim();
      if (!term) return;
      closeSearch();
      if (term.includes('tour') || term.includes('book') || term.includes('visit')) {
        window.location.href = '/book-a-visit.html';
      } else if (term.includes('apply') || term.includes('enroll') || term.includes('register')) {
        window.location.href = '/apply-online.html';
      } else if (term.includes('parent') || term.includes('portal') || term.includes('app')) {
        window.location.href = '/parents.html';
      } else if (term.includes('program') || term.includes('curriculum') || term.includes('eyfs')) {
        window.location.href = '/programs.html';
      } else if (term.includes('age') || term.includes('infant') || term.includes('toddler') || term.includes('hour')) {
        window.location.href = '/programs.html#ages';
      } else if (term.includes('atelier') || term.includes('art') || term.includes('clay') || term.includes('enrich')) {
        window.location.href = '/enrichments.html';
      } else if (term.includes('space') || term.includes('facility') || term.includes('piazza') || term.includes('garden')) {
        window.location.href = '/spaces.html';
      } else if (term.includes('contact') || term.includes('mouj') || term.includes('qurm') || term.includes('phone') || term.includes('email')) {
        window.location.href = '/contact.html';
      } else if (term.includes('admission')) {
        window.location.href = '/admissions.html';
      } else {
        window.location.href = '/about.html';
      }
    });
  }

  /* ============================================================
     4. VIDEO LIGHTBOX MODAL
     ============================================================ */
  const videoModal = document.getElementById('video-modal');
  const openVideoLightboxBtn = document.getElementById('open-video-lightbox-btn');
  const videoModalClose = document.getElementById('video-modal-close');
  const videoModalBackdrop = document.getElementById('video-modal-backdrop');
  const lightboxVideo = document.getElementById('lightbox-video');

  function openVideoModal() {
    if (!videoModal) return;
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lightboxVideo) {
      lightboxVideo.currentTime = 0;
      lightboxVideo.play().catch(e => console.log('Video play interrupted:', e));
    }
  }

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lightboxVideo) lightboxVideo.pause();
  }

  if (openVideoLightboxBtn) openVideoLightboxBtn.addEventListener('click', openVideoModal);
  if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
  if (videoModalBackdrop) videoModalBackdrop.addEventListener('click', closeVideoModal);

  /* ============================================================
     5. HERO & DRONE BACKGROUND VIDEO CONTROLS
     ============================================================ */
  const heroBgVideo = document.getElementById('hero-bg-video');
  const heroVideoToggleBtn = document.getElementById('hero-video-toggle-btn');

  if (heroVideoToggleBtn && heroBgVideo) {
    heroVideoToggleBtn.addEventListener('click', () => {
      if (heroBgVideo.paused) {
        heroBgVideo.play();
        heroVideoToggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i> <span>PAUSE VIDEO</span>';
      } else {
        heroBgVideo.pause();
        heroVideoToggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> <span>PLAY VIDEO</span>';
      }
    });
  }

  /* ============================================================
     6. SHOMOUKH ENRICHMENTS & ATELIERS DETAIL MODAL
     ============================================================ */
  const studentLifeData = {
    'modal-arts': {
      category: 'RESEARCH ATELIER',
      title: 'Clay Atelier',
      desc: 'Children experiment with clay, a soft and natural material with a smooth texture that can be shaped by the gestures of their hands or using various sculpting tools.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1762549992/gpsedu/wxwwmea1fiblq2qbc5n7/_L7A5368-min.jpg',
      bullets: [
        'Hands-on tactile sensory exploration with natural clay',
        'Fostering fine motor skills, hand gestures, and tool usage',
        'Expressing 3D sculptural concepts and structural thinking',
        'Guided supervision by trained Atelierista (artists)'
      ]
    },
    'modal-athletics': {
      category: 'EXPRESSION',
      title: 'Art Atelier',
      desc: 'Children have access to stimulating resources and are encouraged to use multiple symbolic languages, tools, and materials to express themselves creatively.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1762790179/gpsedu/jbjkyhvhhdckberabg3j/GPS-80-min.jpg',
      bullets: [
        'Rich variety of paints, pastels, natural dyes, and papers',
        'Encouraging individual symbolic expressions and storytelling',
        'Open-ended art provocations nurturing curiosity',
        'Exhibitions documenting each child\'s creative process'
      ]
    },
    'modal-gole': {
      category: 'INNOVATION',
      title: 'Digital & Light Atelier',
      desc: 'Children use light in different forms alongside analogical and digital tools to investigate new connections, learning strategies, logic, and imagination.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1753102230/gpsedu/x7yzscfrbzencagprgz5/IMG_4269.jpg',
      bullets: [
        'Light tables, projectors, shadows, and color filters',
        'Exploration of patterns, reflection, and optical science',
        'Integrating digital technology with early childhood logic',
        'Interactive group investigations and discovery'
      ]
    },
    'modal-coed': {
      category: 'EXPLORATION',
      title: 'Project-Based Learning',
      desc: 'Following a project approach, children explore their own ideas and make meaningful connections with the world around them generated through brainstorming.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1764101562/wchujg2ut2ttynk34nvv/peprallycoeds.jpg',
      bullets: [
        'Child-led topics generated from everyday observations',
        'Deep inquiry spanning weeks of collaborative research',
        'Documentation of hypotheses, testing, and discoveries',
        'Equal partnership between children, teachers, and parents'
      ]
    },
    'modal-winterim': {
      category: 'PRETEND PLAY',
      title: 'Tiny Town',
      desc: 'A dedicated pretend play area that helps children learn about themselves, balance their own ideas with others, and foster social skills.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1762788974/gpsedu/uqtm5dpz2mggxqgpuill/IMG_7919.jpg',
      bullets: [
        'Miniature town setup for imaginative roleplay',
        'Developing social negotiation and empathy with peers',
        'Enhancing language acquisition and narrative thinking',
        'Safe space for real-world simulation and problem-solving'
      ]
    },
    'modal-clubs': {
      category: 'DEVELOPMENT',
      title: 'Sensory Play',
      desc: 'Engaging activities that stimulate the senses, supporting brain development, problem-solving strategies, and language acquisition.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1753102232/gpsedu/n4kluvbpuubh9zvw50q4/9F9A33984.jpg',
      bullets: [
        'Water tables, sand kitchens, and organic textures',
        'Stimulating neural pathways and cognitive focus',
        'Developing descriptive vocabulary and communication',
        'Calming, therapeutic, and self-regulating experiences'
      ]
    },
    'modal-laureate': {
      category: 'HARMONY',
      title: 'Music & Movement',
      desc: 'Music activities balance the body and mind and improve children’s ability to learn. Children are exposed to music from a young age to develop all their potential.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1762789616/gpsedu/mb587llegan0zk4fiq2h/1I3A3319-2-min.jpg',
      bullets: [
        'Rhythm instruments, singing, and listening games',
        'Auditory processing and pattern recognition',
        'Gross motor coordination through rhythmic dance',
        'Nurturing confidence and musical appreciation'
      ]
    },
    'modal-advisory': {
      category: 'CONFIDENCE',
      title: 'Drama, Puppetry & ECA / PE',
      desc: 'Through roleplay and puppetry, students act out favorite stories. Extracurricular physical education and sports build skills and social bonds.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1753102375/gpsedu/fyzcfvkbjfygf7yfeusg/untitled-421.jpg',
      bullets: [
        'Story dramatization and puppet theater',
        'Physical education games building balance and strength',
        'Fostering teamwork, sportsmanship, and friendships',
        'Building public speaking confidence from an early age'
      ]
    }
  };

  const detailModal = document.getElementById('detail-modal');
  const detailModalClose = document.getElementById('detail-modal-close');
  const detailModalBackdrop = document.querySelector('.detail-modal-backdrop');
  const detailModalCategory = document.getElementById('detail-modal-category');
  const detailModalTitle = document.getElementById('detail-modal-title');
  const detailModalDesc = document.getElementById('detail-modal-desc');
  const detailModalImg = document.getElementById('detail-modal-img');
  const detailModalBullets = document.getElementById('detail-modal-bullets');

  function openDetailModal(dataKey) {
    const data = studentLifeData[dataKey];
    if (!data || !detailModal) return;

    if (detailModalCategory) detailModalCategory.textContent = data.category;
    if (detailModalTitle) detailModalTitle.textContent = data.title;
    if (detailModalDesc) detailModalDesc.textContent = data.desc;
    if (detailModalImg) {
      detailModalImg.src = data.img;
      detailModalImg.alt = data.title;
    }

    if (detailModalBullets) {
      detailModalBullets.innerHTML = '';
      data.bullets.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        detailModalBullets.appendChild(li);
      });
    }

    detailModal.classList.add('open');
    detailModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDetailModal() {
    if (!detailModal) return;
    detailModal.classList.remove('open');
    detailModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.pursue-item-card').forEach(card => {
    const target = card.getAttribute('data-modal-target');
    card.addEventListener('click', () => openDetailModal(target));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDetailModal(target);
      }
    });
  });

  if (detailModalClose) detailModalClose.addEventListener('click', closeDetailModal);
  if (detailModalBackdrop) detailModalBackdrop.addEventListener('click', closeDetailModal);

  /* ============================================================
     8. TOAST NOTIFICATION UTILITY
     ============================================================ */
  const toastFeedback = document.getElementById('toast-feedback');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message, isSuccess = true) {
    if (!toastFeedback || !toastMessage) return;
    toastMessage.textContent = message;
    toastFeedback.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastFeedback.classList.remove('show');
    }, 4500);
  }

  /* ============================================================
     9. TOUR BOOKING FORM HANDLER
     ============================================================ */
  const tourForm = document.getElementById('tour-booking-form');
  if (tourForm) {
    tourForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const parentName = document.getElementById('tour-parent-name')?.value;
      showToast(`Thank you, ${parentName || 'Parent'}! Your tour visit request has been sent to Shomoukh Admissions.`);
      tourForm.reset();
    });
  }

  /* ============================================================
     10. ONLINE ENROLLMENT FORM HANDLER
     ============================================================ */
  const enrollmentForm = document.getElementById('online-enrollment-form');
  if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const childName = document.getElementById('app-child-name')?.value;
      showToast(`Online enrollment for ${childName || 'your child'} has been submitted successfully! We will contact you soon.`);
      enrollmentForm.reset();
    });
  }

  /* ============================================================
     11. CONTACT INQUIRY FORM & 180-CHAR COUNTER
     ============================================================ */
  const contactForm = document.getElementById('contact-inquiry-form');
  const contactMsgInput = document.getElementById('contact-message');
  const contactCharCount = document.getElementById('contact-char-count');

  if (contactMsgInput && contactCharCount) {
    contactMsgInput.addEventListener('input', () => {
      contactCharCount.textContent = contactMsgInput.value.length;
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const contactName = document.getElementById('contact-name')?.value;
      showToast(`Thank you, ${contactName || 'Parent'}! Your message has been received by Shomoukh Nursery School.`);
      contactForm.reset();
      if (contactCharCount) contactCharCount.textContent = '0';
    });
  }

  /* ============================================================
     12. CLOSE OFFCANVAS ON NAV LINK CLICK
     ============================================================ */
  document.querySelectorAll('.drawer-nav a, .drawer-footer a, .audience-pills a').forEach(link => {
    link.addEventListener('click', () => {
      closeOffcanvas();
    });
  });

  /* ============================================================
     13. ESCAPE KEY GLOBAL LISTENER
     ============================================================ */
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOffcanvas();
      closeSearch();
      closeVideoModal();
      detailModal && closeDetailModal();
    }
  });

});

