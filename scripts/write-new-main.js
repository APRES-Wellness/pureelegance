const fs = require('fs');

const code = `// Pure Elegance Agency - Global Script

// Global Mobile Menu Functions (Callable directly via onclick and via event listeners)
let savedScrollY = 0;

window.openMobileMenu = function() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenu) return;
  
  savedScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  
  // Display menu overlay
  mobileMenu.classList.remove('hidden');
  mobileMenu.classList.add('flex');
  
  // Full background scroll lock
  document.body.style.position = 'fixed';
  document.body.style.top = '-' + savedScrollY + 'px';
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
};

window.closeMobileMenu = function() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenu) return;
  
  // Hide menu overlay
  mobileMenu.classList.add('hidden');
  mobileMenu.classList.remove('flex');
  
  // Restore background scrolling
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  
  window.scrollTo(0, savedScrollY);
};

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Bindings
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.openMobileMenu();
    });
  }

  if (closeMobileMenuBtn) {
    closeMobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.closeMobileMenu();
    });
    closeMobileMenuBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      window.closeMobileMenu();
    }, { passive: false });
  }

  // Close when tapping any link inside mobile menu
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      window.closeMobileMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
      window.closeMobileMenu();
    }
  });

  // 2. Lightbox Modal
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightbox = document.getElementById('closeLightbox');

  document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const imgSrc = trigger.getAttribute('data-img');
      const caption = trigger.getAttribute('data-caption') || '';
      if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeLightbox && lightbox) {
    closeLightbox.addEventListener('click', () => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = '';
      }
    });
  }

  // 3. Gallery Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-slate-950', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-700');
      });
      btn.classList.add('active', 'bg-slate-950', 'text-white');
      btn.classList.remove('bg-slate-100', 'text-slate-700');

      const filterVal = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterVal === 'all' || itemCat === filterVal) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 4. Candidature WhatsApp
  const btnPostuler = document.getElementById('btnPostulerWhatsApp');
  if (btnPostuler) {
    btnPostuler.addEventListener('click', () => {
      const name = document.getElementById('cName')?.value;
      const age = document.getElementById('cAge')?.value;
      const phone = document.getElementById('cPhone')?.value;
      const ig = document.getElementById('cIg')?.value || 'N/A';
      const role = document.getElementById('cRole')?.value || 'Hôtesse';

      if (!name || !phone) {
        alert('Veuillez renseigner votre nom et votre numéro de téléphone.');
        return;
      }

      let msg = 'Bonjour Pure Elegance Agency,%0A%0A';
      msg += 'Je soumets ma candidature pour vos castings :%0A';
      msg += '• Nom complet : ' + encodeURIComponent(name) + '%0A';
      msg += '• Âge : ' + encodeURIComponent(age) + ' ans%0A';
      msg += '• Téléphone : ' + encodeURIComponent(phone) + '%0A';
      msg += '• Instagram : ' + encodeURIComponent(ig) + '%0A';
      msg += '• Profil souhaité : ' + encodeURIComponent(role) + '%0A%0A';
      msg += 'Je reste disponible pour un entretien et test de casting.';

      window.open('https://wa.me/50947327551?text=' + msg, '_blank');
    });
  }

});
`;

fs.writeFileSync('C:/Users/wangu/.gemini/antigravity/scratch/pure-elegance-agency/assets/js/main.js', code, 'utf8');
console.log('Successfully wrote new main.js!');
