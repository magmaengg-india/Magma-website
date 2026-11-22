document.addEventListener('DOMContentLoaded', () => {
  // ================= BROCHURE LIGHTBOX & MODEL QUOTE TRIGGERS =================
  const brochureLightbox = document.getElementById('brochureLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  document.querySelectorAll('[data-brochure]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      if (!brochureLightbox || !lightboxImg) return;
      lightboxImg.src = trigger.getAttribute('data-brochure');
      if (lightboxTitle) {
        lightboxTitle.textContent = trigger.getAttribute('data-title') || 'Technical Brochure';
      }
      brochureLightbox.classList.add('active');
    });
  });

  if (closeLightboxBtn && brochureLightbox) {
    closeLightboxBtn.addEventListener('click', () => brochureLightbox.classList.remove('active'));
    brochureLightbox.addEventListener('click', (e) => {
      if (e.target === brochureLightbox) brochureLightbox.classList.remove('active');
    });
  }

  // Pre-fill Request A Quote Modal when clicking any brochure model's "Request Quote" button
  document.querySelectorAll('.mini-quote-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modelName = btn.getAttribute('data-model');
      const modal = document.getElementById('quoteModal');
      if (modal) {
        modal.classList.add('active');
        const notesField = modal.querySelector('textarea');
        if (notesField && modelName) {
          notesField.value = `Interested in: ${modelName}. Please share technical specs and quotation.`;
        }
      }
    });
  });
  // ================= DYNAMIC YEARS OF EXPERIENCE (AUTO-UPDATES EVERY YEAR) =================
  const expYearsEl = document.getElementById('dynamicExpYears');
  if (expYearsEl) {
    const foundedYear = 2010; // 2026 - 2010 = 16 Years; becomes 17 in 2027, 18 in 2028, etc.
    const currentYear = new Date().getFullYear();
    expYearsEl.textContent = Math.max(16, currentYear - foundedYear);
  }

  // ================= 3-MACHINE 5-SECOND STAGGERED SEQUENTIAL LOOP =================
  const machineSlides = document.querySelectorAll('.machine-loop-slide');
  const machineDots = document.querySelectorAll('.m-dot');
  let currentMachine = 0;

  function showMachineSlide(index) {
    machineSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    machineDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentMachine = index;
  }

  if (machineSlides.length > 0) {
    let machineInterval = setInterval(() => {
      const nextMachine = (currentMachine + 1) % machineSlides.length;
      showMachineSlide(nextMachine);
    }, 5000); // Loops every 5 seconds sequentially

    machineDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        clearInterval(machineInterval);
        showMachineSlide(idx);
        machineInterval = setInterval(() => {
          const nextMachine = (currentMachine + 1) % machineSlides.length;
          showMachineSlide(nextMachine);
        }, 5000);
      });
    });
  }
  // ================= 1. LIVE 10-SECOND INDUSTRIAL VIDEO LOOP =================
  const heroVideo = document.getElementById('heroBgVideo');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(() => {
      document.addEventListener('click', () => heroVideo.play(), { once: true });
    });

    heroVideo.addEventListener('timeupdate', () => {
      if (heroVideo.currentTime >= 10) {
        heroVideo.currentTime = 0;
        heroVideo.play();
      }
    });
  }

  // ================= 2. 6-SECOND STAGGERED HERO HEADING LOOP =================
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator-item');
  let currentSlide = 0;

  function goToSlide(nextIndex) {
    if (nextIndex === currentSlide || !slides.length) return;

    const outgoing = slides[currentSlide];
    const incoming = slides[nextIndex];

    outgoing.classList.add('exiting');
    outgoing.classList.remove('active');

    indicators.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === nextIndex);
    });

    setTimeout(() => {
      outgoing.classList.remove('exiting');
      incoming.classList.add('active');
      currentSlide = nextIndex;
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

  // ================= 3. SLIDE-OUT MENU DRAWER =================
  const menuDrawer = document.getElementById('menuDrawer');
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (openMenuBtn && menuDrawer) {
    openMenuBtn.addEventListener('click', () => menuDrawer.classList.add('active'));
  }
  if (closeMenuBtn && menuDrawer) {
    closeMenuBtn.addEventListener('click', () => menuDrawer.classList.remove('active'));
  }
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => menuDrawer.classList.remove('active'));
  });

  // ================= 4. REQUEST A QUOTE MODAL =================
  const quoteModal = document.getElementById('quoteModal');
  const openQuoteBtn = document.getElementById('openQuoteBtn');
  const closeQuoteBtn = document.getElementById('closeQuoteBtn');
  const quoteForm = document.getElementById('quoteForm');
  const quoteFeedback = document.getElementById('quoteFeedback');

  if (openQuoteBtn && quoteModal) {
    openQuoteBtn.addEventListener('click', () => quoteModal.classList.add('active'));
  }
  if (closeQuoteBtn && quoteModal) {
    closeQuoteBtn.addEventListener('click', () => quoteModal.classList.remove('active'));
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) quoteModal.classList.remove('active');
    });

  }
 if (quoteForm) {
  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (quoteFeedback) {
      quoteFeedback.textContent = 'Sending your request...';
    }

    try {
      const response = await fetch(quoteForm.action, {
        method: 'POST',
        body: new FormData(quoteForm),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        if (quoteFeedback) {
          quoteFeedback.textContent = 'Thank you! Your quote request has been sent successfully.';
        }
        quoteForm.reset();
      } else {
        if (quoteFeedback) {
          quoteFeedback.textContent = 'Unable to send your request. Please try again.';
        }
      }
    } catch (error) {
      if (quoteFeedback) {
        quoteFeedback.textContent = 'Something went wrong. Please try again.';
      }
    }
  });
}
