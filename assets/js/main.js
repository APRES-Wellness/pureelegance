// Pure Elegance Agency - Global Script
document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIconBars = document.getElementById('menuIconBars');
  const menuIconClose = document.getElementById('menuIconClose');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        if (menuIconBars) menuIconBars.classList.add('hidden');
        if (menuIconClose) menuIconClose.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        if (menuIconBars) menuIconBars.classList.remove('hidden');
        if (menuIconClose) menuIconClose.classList.add('hidden');
      }
    });
  }

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
      }
    });
  });

  if (closeLightbox && lightbox) {
    closeLightbox.addEventListener('click', () => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
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
      msg += '• Téléphone WhatsApp : ' + encodeURIComponent(phone) + '%0A';
      msg += '• Compte Instagram : ' + encodeURIComponent(ig) + '%0A';
      msg += '• Pôle souhaité : ' + encodeURIComponent(role) + '%0A';

      window.open('https://wa.me/50947327551?text=' + msg, '_blank');
    });
  }

});
