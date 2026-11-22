function initMagmaWebsite() {
  // ================= HELPER: BODY SCROLL LOCK =================
  function syncBodyScroll() {
    const anyOpen = document.querySelector(
      '.modal-backdrop.active, .drawer-backdrop.active'
    );
    document.body.style.overflow = anyOpen ? 'hidden' : '';
  }

  // ================= 1. BROCHURE LIGHTBOX =================
  const brochureLightbox = document.getElementById('brochureLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  function closeLightbox() {
    if (!brochureLightbox) return;
    brochureLightbox.classList.remove('active');
    syncBodyScroll();
  }

  document.querySelectorAll('[data-brochure]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (!brochureLightbox || !lightboxImg) return;
      const src = trigger.getAttribute('data-brochure');
      if (!src) return;

      lightboxImg.src = src;
      if (lightboxTitle) {
        lightboxTitle.textContent =
          trigger.getAttribute('data-title') || 'Technical Brochure';
      }
      brochureLightbox.classList.add('active');
      syncBodyScroll();
    });
  });

  if (closeLightboxBtn && brochureLightbox) {
    closeLightboxBtn.addEventListener('click', closeLightbox);
    brochureLightbox.addEventListener('click', (e) => {
      if (e.target === brochureLightbox) closeLightbox();
    });
  }

  // ================= 2. DYNAMIC YEARS OF EXPERIENCE =================
  const expYearsEl = document.getElementById('dynamicExpYears');
  if (expYearsEl) {
    const foundedYear = 2010;
    const currentYear = new Date().getFullYear();
    expYearsEl.textContent = Math.max(16, currentYear - foundedYear);
  }

  // ================= 3. 3-MACHINE 5-SECOND SEQUENTIAL LOOP =================
  const machineSlides = document.querySelectorAll('.machine-loop-slide');
  const machineDots = document.querySelectorAll('.m-dot');
  let currentMachine = 0;

  function showMachineSlide(index) {
    if (!machineSlides.length) return;
    const targetIndex = (index + machineSlides.length) % machineSlides.length;

    machineSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === targetIndex);
    });
    machineDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === targetIndex);
    });
    currentMachine = targetIndex;
  }

  if (machineSlides.length > 0) {
    let machineInterval = setInterval(() => {
      showMachineSlide(currentMachine + 1);
    }, 5000);

    machineDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        clearInterval(machineInterval);
        showMachineSlide(idx);
        machineInterval = setInterval(() => {
          showMachineSlide(currentMachine + 1);
        }, 5000);
      });
    });
  }

  // ================= 4. LIVE 10-SECOND INDUSTRIAL VIDEO LOOP =================
  const heroVideo = document.getElementById('heroBgVideo');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(() => {
      document.addEventListener(
        'click',
        () => {
          heroVideo.play().catch(() => {});
        },
        { once: true }
      );
    });

    heroVideo.addEventListener('timeupdate', () => {
      if (heroVideo.currentTime >= 10) {
        heroVideo.currentTime = 0;
        heroVideo.play().catch(() => {});
      }
    });
  }

  // ================= 5. 6-SECOND STAGGERED HERO HEADING LOOP =================
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator-item');
  let currentSlide = 0;
  let isSlideTransitioning = false;

  function goToSlide(nextIndex) {
    if (isSlideTransitioning || nextIndex === currentSlide || !slides.length) {
      return;
    }

    isSlideTransitioning = true;
    const outgoing = slides[currentSlide];
    const incoming = slides[nextIndex];

    outgoing.classList.add('exiting');
    outgoing.classList.remove('active');

    indicators.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === nextIndex);
    });

    currentSlide = nextIndex;

    setTimeout(() => {
      outgoing.classList.remove('exiting');
      incoming.classList.add('active');
      isSlideTransitioning = false;
    }, 350);
  }

  if (slides.length > 0) {
    let slideTimer = setInterval(() => {
      const nextIndex = (currentSlide + 1) % slides.length;
      goToSlide(nextIndex);
    }, 6000);

    indicators.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        clearInterval(slideTimer);
        goToSlide(idx);
        slideTimer = setInterval(() => {
          const nextIndex = (currentSlide + 1) % slides.length;
          goToSlide(nextIndex);
        }, 6000);
      });
    });
  }

  // ================= 6. HEADER SEARCH & SLIDE-OUT MENU DRAWER =================
  const openSearchBtn = document.getElementById('openSearchBtn');
  if (openSearchBtn) {
    openSearchBtn.addEventListener('click', () => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const menuDrawer = document.getElementById('menuDrawer');
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openMenuDrawer() {
    if (!menuDrawer) return;
    menuDrawer.classList.add('active');
    syncBodyScroll();
  }

  function closeMenuDrawer() {
    if (!menuDrawer) return;
    menuDrawer.classList.remove('active');
    syncBodyScroll();
  }

  if (openMenuBtn && menuDrawer) {
    openMenuBtn.addEventListener('click', openMenuDrawer);
  }
  if (closeMenuBtn && menuDrawer) {
    closeMenuBtn.addEventListener('click', closeMenuDrawer);
  }
  if (menuDrawer) {
    menuDrawer.addEventListener('click', (e) => {
      if (e.target === menuDrawer) closeMenuDrawer();
    });
  }
  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeMenuDrawer);
  });

  // ================= 7. REQUEST A QUOTE MODAL & MODEL PRE-FILL =================
  const quoteModal = document.getElementById('quoteModal');
  const openQuoteBtn = document.getElementById('openQuoteBtn');
  const closeQuoteBtn = document.getElementById('closeQuoteBtn');
  const quoteForm = document.getElementById('quoteForm');
  const quoteFeedback = document.getElementById('quoteFeedback');

  function openQuoteModal(modelName = '') {
    if (!quoteModal) return;

    if (quoteFeedback) {
      quoteFeedback.textContent = '';
      quoteFeedback.style.color = '#4ADE80';
    }

    if (modelName && quoteForm) {
      const categorySelect = quoteForm.querySelector(
        'select[name="machine_category"]'
      );
      const notesField = quoteForm.querySelector('textarea');

      if (categorySelect) {
        const lower = modelName.toLowerCase();
        if (lower.includes('mes 14') || lower.includes('fiber')) {
          categorySelect.selectedIndex = 1;
        } else if (lower.includes('co2') || lower.includes('uv')) {
          categorySelect.selectedIndex = 2;
        } else if (
          lower.includes('cordless') ||
          lower.includes('me-503') ||
          lower.includes('me-155') ||
          lower.includes('me-tc 155')
        ) {
          categorySelect.selectedIndex = 3;
        } else if (lower.includes('me - pc') || lower.includes('column')) {
          categorySelect.selectedIndex = 4;
        }
      }

      if (notesField) {
        notesField.value = `Interested in: ${modelName}. Please share technical specs and quotation.`;
      }
    }

    quoteModal.classList.add('active');
    syncBodyScroll();
  }

  function closeQuoteModal() {
    if (!quoteModal) return;
    quoteModal.classList.remove('active');
    syncBodyScroll();
  }

  if (openQuoteBtn && quoteModal) {
    openQuoteBtn.addEventListener('click', () => openQuoteModal());
  }

  document.querySelectorAll('.mini-quote-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modelName = btn.getAttribute('data-model') || '';
      openQuoteModal(modelName);
    });
  });

  if (closeQuoteBtn && quoteModal) {
    closeQuoteBtn.addEventListener('click', closeQuoteModal);
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) closeQuoteModal();
    });
  }

  // ================= 8. FORMSPREE QUOTE SUBMISSION =================
  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn
        ? submitBtn.innerHTML
        : 'Submit Quote Request &rarr;';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Request...';
      }

      if (quoteFeedback) {
        quoteFeedback.style.color = '#F69D42';
        quoteFeedback.textContent = 'Sending your request...';
      }

      try {
        const endpoint =
          quoteForm.getAttribute('action') || 'https://formspree.io/f/mppdypzy';
        const response = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(quoteForm),
          headers: {
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          if (quoteFeedback) {
            quoteFeedback.style.color = '#4ADE80';
            quoteFeedback.textContent =
              'Thank you! Your quote request has been sent successfully.';
          }
          quoteForm.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          const errorMessage = Array.isArray(data.errors)
            ? data.errors.map((err) => err.message).join(', ')
            : 'Unable to send your request. Please try again.';
          if (quoteFeedback) {
            quoteFeedback.style.color = '#F87171';
            quoteFeedback.textContent = errorMessage;
          }
        }
      } catch (error) {
        if (quoteFeedback) {
          quoteFeedback.style.color = '#F87171';
          quoteFeedback.textContent = 'Something went wrong. Please try again.';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
      }
    });
  }

  // ================= 9. ESCAPE KEY & SCROLL-TO-TOP =================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuoteModal();
      closeMenuDrawer();
      closeLightbox();
    }
  });

  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 450);
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMagmaWebsite);
} else {
  initMagmaWebsite();
}