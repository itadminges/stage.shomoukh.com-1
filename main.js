// Girls Preparatory School (GPS) Website Clone Interactivity
document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. STICKY HEADER TRANSITION ON SCROLL
     ============================================================ */
  const header = document.getElementById('site-header');
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============================================================
     2. OFFCANVAS NAVIGATION DRAWER
     ============================================================ */
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const menuCloseBtn = document.getElementById('menu-close-btn');
  const offcanvasDrawer = document.getElementById('offcanvas-drawer');

  function openOffcanvas() {
    offcanvasDrawer.classList.add('open');
    offcanvasDrawer.setAttribute('aria-hidden', 'false');
    menuToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeOffcanvas() {
    offcanvasDrawer.classList.remove('open');
    offcanvasDrawer.setAttribute('aria-hidden', 'true');
    menuToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggleBtn.addEventListener('click', openOffcanvas);
  menuCloseBtn.addEventListener('click', closeOffcanvas);

  // Submenu Accordions inside Drawer
  const submenuToggles = document.querySelectorAll('.submenu-toggle-btn');
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const parentItem = toggle.closest('.drawer-menu-item');
      const isCurrentlyActive = parentItem.classList.contains('active');

      // Close other active items if desired or toggle current
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
    searchModal.classList.add('open');
    searchModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      searchInput.focus();
    }, 100);
  }

  function closeSearch() {
    searchModal.classList.remove('open');
    searchModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  searchOpenBtn.addEventListener('click', openSearch);
  searchCloseBtn.addEventListener('click', closeSearch);
  searchBackdrop.addEventListener('click', closeSearch);

  /* ============================================================
     4. VIDEO LIGHTBOX MODAL
     ============================================================ */
  const videoModal = document.getElementById('video-modal');
  const openVideoLightboxBtn = document.getElementById('open-video-lightbox-btn');
  const videoModalClose = document.getElementById('video-modal-close');
  const videoModalBackdrop = document.getElementById('video-modal-backdrop');
  const lightboxVideo = document.getElementById('lightbox-video');

  function openVideoModal() {
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxVideo.currentTime = 0;
    lightboxVideo.play().catch(e => console.log('Video play interrupted:', e));
  }

  function closeVideoModal() {
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxVideo.pause();
  }

  if (openVideoLightboxBtn) {
    openVideoLightboxBtn.addEventListener('click', openVideoModal);
  }
  videoModalClose.addEventListener('click', closeVideoModal);
  videoModalBackdrop.addEventListener('click', closeVideoModal);

  /* ============================================================
     5. HERO & DRONE BACKGROUND VIDEO PLAY/PAUSE CONTROLS
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

  const droneBgVideo = document.getElementById('drone-bg-video');
  const droneVideoToggleBtn = document.getElementById('drone-video-toggle-btn');

  if (droneVideoToggleBtn && droneBgVideo) {
    droneVideoToggleBtn.addEventListener('click', () => {
      if (droneBgVideo.paused) {
        droneBgVideo.play();
        droneVideoToggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i> <span>PAUSE VIDEO</span>';
      } else {
        droneBgVideo.pause();
        droneVideoToggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> <span>PLAY VIDEO</span>';
      }
    });
  }

  /* ============================================================
     6. STUDENT LIFE DETAIL MODAL (8 CARDS)
     ============================================================ */
  const studentLifeData = {
    'modal-arts': {
      category: 'CREATIVITY',
      title: 'Visual & Performing Arts',
      desc: 'GPS artists, performers, and creators take center stage in state-of-the-art theaters, studios, and galleries.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1762549992/gpsedu/wxwwmea1fiblq2qbc5n7/_L7A5368-min.jpg',
      bullets: [
        'Comprehensive fine arts studios with ceramics, drawing, and photography',
        'Frierson Theatre mainstage musicals and drama productions',
        'Terpsichore dance company and technique training for all levels',
        'Instrumental orchestra, string ensemble, and touring vocal choir'
      ]
    },
    'modal-athletics': {
      category: 'COMPETITION',
      title: 'Bruiser Athletics',
      desc: 'With 15 varsity sports, championship tradition, and state-of-the-art facilities, GPS athletes cultivate grit, teamwork, and athletic excellence.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1762790179/gpsedu/jbjkyhvhhdckberabg3j/GPS-80-min.jpg',
      bullets: [
        '15 competitive TSSAA varsity and middle school sports',
        'All-weather turf field, collegiate track, indoor gymnasiums & courts',
        'Dedicated strength & conditioning staff and collegiate recruiting guidance',
        'Numerous state titles and student-athletes signing to NCAA Division I, II & III programs'
      ]
    },
    'modal-gole': {
      category: 'ADVENTURE',
      title: 'Girls Outdoor Leadership & Education (GOLE)',
      desc: 'Rooted in Chattanooga’s world-class outdoor playground, GOLE empowers girls to build resilience, leadership, and environmental stewardship.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1753102230/gpsedu/x7yzscfrbzencagprgz5/IMG_4269.jpg',
      bullets: [
        'Kayaking and paddleboarding on the Tennessee River and surrounding waterways',
        'Rock climbing expeditions on world-renowned regional crags',
        'Appalachian trail backpacking and wilderness orienteering',
        'Leave No Trace and Wilderness First Aid education'
      ]
    },
    'modal-coed': {
      category: 'COMMUNITY',
      title: 'Coed Opportunities with McCallie School',
      desc: 'GPS students enjoy all the research-backed benefits of an all-girls education during the academic day, paired with rich coed artistic, social, and leadership opportunities with our brother school, McCallie.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1764101562/wchujg2ut2ttynk34nvv/peprallycoeds.jpg',
      bullets: [
        'Joint theatrical and musical productions at Frierson Theatre and McCallie',
        'Shared social events, dances, pep rallies, and community fundraisers',
        'Select collaborative seminars and joint leadership initiatives in Upper School',
        'A lifelong cross-campus network that spans decades of tradition'
      ]
    },
    'modal-winterim': {
      category: 'EXPERIENCE',
      title: 'Winterim Experiential Learning',
      desc: 'Held every January, Winterim immerses Upper School students in experiential mini-courses, career internships, and international travel.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1762788974/gpsedu/uqtm5dpz2mggxqgpuill/IMG_7919.jpg',
      bullets: [
        'Professional internships in medicine, engineering, finance, legal, and non-profit sectors',
        'Global and domestic travel to Costa Rica, France, Washington D.C., and beyond',
        'On-campus hands-on intensives in digital animation, culinary arts, and robotics',
        'Real-world portfolio building before entering college'
      ]
    },
    'modal-clubs': {
      category: 'DISCOVERY',
      title: '40+ Student Clubs & Leadership Organizations',
      desc: 'Student leadership is at the heart of GPS culture. Every club, council, and publication is run entirely by girls.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1753102232/gpsedu/n4kluvbpuubh9zvw50q4/9F9A33984.jpg',
      bullets: [
        'Nationally recognized Mock Trial, Model UN, and Speech & Debate squads',
        'All-girls FIRST Tech Challenge robotics and coding teams',
        'Student Council, Honor Council, and Partnership in Community service leadership',
        'Student-edited literary magazine and campus newspaper'
      ]
    },
    'modal-laureate': {
      category: 'RESEARCH',
      title: 'GPS Laureate Program',
      desc: 'A signature capstone program for Upper School scholars to pursue collegiate-level independent research with faculty and community mentors.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1762789616/gpsedu/mb587llegan0zk4fiq2h/1I3A3319-2-min.jpg',
      bullets: [
        'Year-long self-directed capstone project exploring complex scientific or social questions',
        'One-on-one mentorship by GPS faculty and regional research professionals',
        'Formal thesis paper and public defense presentation',
        'Special graduation distinction recognized by prestigious universities'
      ]
    },
    'modal-advisory': {
      category: 'WELLNESS',
      title: 'Advisory & Sisterhood Mentorship',
      desc: 'Every girl at GPS is known, loved, and supported. Small advisory pods meet regularly to support social-emotional development, academic balance, and wellness.',
      img: 'https://resources.finalsite.net/images/f_auto,q_auto/v1753102375/gpsedu/fyzcfvkbjfygf7yfeusg/untitled-421.jpg',
      bullets: [
        'Small groups of 8–10 students paired with a dedicated faculty advisor',
        'Holistic wellbeing, executive function, and mindfulness programming',
        'Daily check-ins fostering trusted community and peer encouragement',
        'Guidance through college discernment and personal development'
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
    if (!data) return;

    detailModalCategory.textContent = data.category;
    detailModalTitle.textContent = data.title;
    detailModalDesc.textContent = data.desc;
    detailModalImg.src = data.img;
    detailModalImg.alt = data.title;

    detailModalBullets.innerHTML = '';
    data.bullets.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      detailModalBullets.appendChild(li);
    });

    detailModal.classList.add('open');
    detailModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDetailModal() {
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
     7. TRADITIONS INTERACTIVE PHOTO DECK
     ============================================================ */
  const deckCards = document.querySelectorAll('.deck-card');
  const deckPrevBtn = document.getElementById('deck-prev-btn');
  const deckNextBtn = document.getElementById('deck-next-btn');
  const deckShuffleBtn = document.getElementById('deck-shuffle-btn');
  const deckCounter = document.getElementById('deck-counter');
  let currentDeckIndex = 0;

  function updateDeck(index) {
    deckCards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
    if (deckCounter) {
      deckCounter.textContent = `${index + 1} / ${deckCards.length}`;
    }
  }

  function nextDeckCard() {
    currentDeckIndex = (currentDeckIndex + 1) % deckCards.length;
    updateDeck(currentDeckIndex);
  }

  function prevDeckCard() {
    currentDeckIndex = (currentDeckIndex - 1 + deckCards.length) % deckCards.length;
    updateDeck(currentDeckIndex);
  }

  function shuffleDeck() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * deckCards.length);
    } while (randomIndex === currentDeckIndex && deckCards.length > 1);
    currentDeckIndex = randomIndex;
    updateDeck(currentDeckIndex);
  }

  if (deckNextBtn) deckNextBtn.addEventListener('click', nextDeckCard);
  if (deckPrevBtn) deckPrevBtn.addEventListener('click', prevDeckCard);
  if (deckShuffleBtn) deckShuffleBtn.addEventListener('click', shuffleDeck);

  // Clicking on active card advances
  deckCards.forEach(card => {
    card.addEventListener('click', nextDeckCard);
  });

  /* ============================================================
     8. ALUMNAE CAROUSEL SLIDER
     ============================================================ */
  const alumnaeTrack = document.getElementById('alumnae-track');
  const alumnaeCards = document.querySelectorAll('.alumna-card');
  const alumnaePrevBtn = document.getElementById('alumnae-prev');
  const alumnaeNextBtn = document.getElementById('alumnae-next');
  const alumnaeDotsContainer = document.getElementById('alumnae-dots');
  let currentAlumnaeIndex = 0;

  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }

  function getMaxSlideIndex() {
    const perView = getCardsPerView();
    return Math.max(0, alumnaeCards.length - perView);
  }

  function buildDots() {
    if (!alumnaeDotsContainer) return;
    alumnaeDotsContainer.innerHTML = '';
    const maxIndex = getMaxSlideIndex();
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('button');
      dot.className = `dot-btn ${i === currentAlumnaeIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => {
        currentAlumnaeIndex = i;
        updateAlumnaeSlider();
      });
      alumnaeDotsContainer.appendChild(dot);
    }
  }

  function updateAlumnaeSlider() {
    const perView = getCardsPerView();
    const maxIndex = getMaxSlideIndex();
    if (currentAlumnaeIndex > maxIndex) {
      currentAlumnaeIndex = maxIndex;
    }
    const cardWidth = alumnaeCards[0].getBoundingClientRect().width;
    const gap = 28;
    const offset = currentAlumnaeIndex * (cardWidth + gap);
    alumnaeTrack.style.transform = `translateX(-${offset}px)`;

    const dots = document.querySelectorAll('.dot-btn');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentAlumnaeIndex);
    });
  }

  if (alumnaeNextBtn) {
    alumnaeNextBtn.addEventListener('click', () => {
      const maxIndex = getMaxSlideIndex();
      if (currentAlumnaeIndex < maxIndex) {
        currentAlumnaeIndex++;
      } else {
        currentAlumnaeIndex = 0; // loop back
      }
      updateAlumnaeSlider();
    });
  }

  if (alumnaePrevBtn) {
    alumnaePrevBtn.addEventListener('click', () => {
      const maxIndex = getMaxSlideIndex();
      if (currentAlumnaeIndex > 0) {
        currentAlumnaeIndex--;
      } else {
        currentAlumnaeIndex = maxIndex; // loop to end
      }
      updateAlumnaeSlider();
    });
  }

  window.addEventListener('resize', () => {
    buildDots();
    updateAlumnaeSlider();
  }, { passive: true });

  buildDots();
  updateAlumnaeSlider();

  /* ============================================================
     9. ANIMATED NUMBER COUNTERS FOR STATS
     ============================================================ */
  const statValues = document.querySelectorAll('.stat-value');
  let hasCounted = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasCounted) {
        hasCounted = true;
        statValues.forEach(el => {
          const target = parseInt(el.getAttribute('data-count'), 10);
          const duration = 2000;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out cubic
            const currentVal = Math.round(target * (1 - Math.pow(1 - progress, 3)));
            
            if (target >= 1000) {
              el.textContent = currentVal.toLocaleString();
            } else {
              el.textContent = currentVal;
            }

            if (frame >= totalFrames) {
              clearInterval(counter);
              if (target >= 1000) {
                el.textContent = target.toLocaleString();
              } else {
                el.textContent = target;
              }
            }
          }, frameDuration);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-grid-card');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  /* ============================================================
     10. ESCAPE KEY GLOBAL LISTENER
     ============================================================ */
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOffcanvas();
      closeSearch();
      closeVideoModal();
      closeDetailModal();
    }
  });

});
