// scripts/build-site.js
// Multi-page generator for Pure Elegance Agency - Professional Luxury Edition
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Professional SVG Icons (NO EMOJIS, HIGH LUXURY & ACCURATE)
const ICONS = {
  // Haute Couture & Mannequins : Diamant Prestige / Joaillerie Runway
  mannequin: `<svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 3h12l4 7-10 11L2 10l4-7zM2 10h20M12 21L7.5 10M12 21l4.5-11M6 3l1.5 7M18 3l-1.5 7M9 3l3 7 3-7"/></svg>`,
  
  // Hôtesses d'Accueil VIP : Protocole, Accueil d'Honneur & Listing VIP
  hotesse: `<svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
  
  // Serveurs & Bar d'Élite : Verre à Cocktail / Coupe Martini Prestige
  serveur: `<svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 21h8m-4-7v7M4 4h16l-8 8-8-8z"/></svg>`,
  
  // Service Traiteur Gastronomique : Cloche de Service Raffinée
  traiteur: `<svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 4v2m0 0a8 8 0 018 8H4a8 8 0 018-8zm-9 10h18a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1a1 1 0 011-1z"/><circle cx="12" cy="3" r="1" fill="currentColor"/></svg>`,
  whatsapp: `<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>`,
  email: `<svg class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
  phone: `<svg class="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,
};

// Common components
function getHeader(activePage = 'accueil') {
  const navItems = [
    { id: 'accueil', label: 'Accueil', href: 'index.html' },
    { id: 'prestations', label: 'Nos Services', href: 'prestations.html' },
    { id: 'realisations', label: 'Réalisations', href: 'realisations.html' },
    { id: 'agence', label: "L'Agence", href: 'agence.html' },
    { id: 'recrutement', label: 'Castings', href: 'recrutement.html' },
    { id: 'contact', label: 'Contact', href: 'contact.html' },
  ];

  const navLinksHtml = navItems.map(item => {
    const isActive = activePage === item.id;
    const activeClasses = isActive
      ? 'text-slate-950 font-extrabold bg-slate-100 shadow-xs'
      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 font-bold';
    return `<a href="${item.href}" class="px-3.5 py-2 rounded-lg text-sm transition-all ${activeClasses}">${item.label}</a>`;
  }).join('\n');

  const mobileNavLinksHtml = navItems.map(item => {
    const isActive = activePage === item.id;
    const activeClasses = isActive
      ? 'text-slate-950 font-extrabold text-2xl border-l-4 border-amber-500 pl-4 py-3 bg-amber-50/80 rounded-r-2xl'
      : 'text-slate-900 hover:text-amber-600 font-bold text-xl pl-4 py-3 hover:bg-slate-50 rounded-xl transition-all border-l-4 border-transparent hover:border-amber-400';
    return `<a href="${item.href}" class="block mobile-nav-link ${activeClasses}">${item.label}</a>`;
  }).join('\n');

  return `
  <!-- TOP BAR (INFO & CONTACT OFFICIEL ISSUE DU POSTER PURE ELEGANCE) -->
  <div class="bg-slate-950 text-slate-300 text-xs font-medium py-2.5 px-4 border-b border-slate-800">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
      <div class="flex items-center space-x-3 text-slate-300">
        <span class="font-bold text-white tracking-wide">Personnel Événementiel de Prestige</span>
        <span class="hidden md:inline text-slate-600">•</span>
        <span class="hidden md:inline text-slate-400">Hôtesses d'accueil • Serveurs • Mannequins • Modèles • Service traiteur</span>
      </div>
      <div class="flex items-center space-x-5 text-slate-300">
        <a href="https://instagram.com/pure.eleganceagency" target="_blank" rel="noopener noreferrer" class="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-medium">
          <svg class="w-3.5 h-3.5 text-pink-400 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          <span>@pure.eleganceagency</span>
        </a>
        <span>•</span>
        <a href="https://wa.me/50947327551" target="_blank" rel="noopener noreferrer" class="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-bold text-white">
          <span class="text-emerald-400 font-bold">${ICONS.whatsapp}</span>
          <span>(509) 4732 75 51</span>
        </a>
      </div>
    </div>
  </div>

  <!-- SOLID WHITE NAVBAR (PROPRE, NET, MODERNE) -->
  <header class="solid-navbar w-full sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo Officiel Pure Elegance (Or Pur Éclatant) -->
        <a href="index.html" class="flex items-center py-1 group">
          <img src="assets/img/logo-removebg.png" alt="Pure Elegance Agency" class="h-16 sm:h-20 w-auto object-contain luxury-gold-logo">
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-1.5">
          ${navLinksHtml}
        </nav>

        <!-- Right Action Button: Réserver une Équipe -->
        <div class="hidden lg:flex items-center space-x-3">
          <a href="https://wa.me/50947327551?text=Bonjour%20Pure%20Elegance%20Agency,%20je%20souhaite%20r%C3%A9server%20une%20%C3%A9quipe." target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-slate-950 hover:bg-slate-800 transition-all shadow-sm hover:shadow group">
            <span>Réserver une Équipe</span>
            <svg class="w-4 h-4 ml-1.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <button id="mobileMenuBtn" type="button" aria-label="Ouvrir le menu" class="lg:hidden p-2.5 rounded-xl text-slate-800 hover:text-slate-950 hover:bg-slate-100 focus:outline-none border border-slate-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

      </div>
    </div>

    <!-- FULLSCREEN MOBILE NAVIGATION OVERLAY (FOND BLANC DUR, 100% OPAQUE + BLOCAGE TOTAL DU SCROLL ARRIÈRE-PLAN) -->
    <div id="mobileMenu" class="fixed inset-0 z-[9999] w-full h-[100dvh] bg-white hidden flex-col justify-between p-6 sm:p-8 overflow-y-auto" style="background-color: #ffffff;">
      
      <!-- Top Bar inside Mobile Menu -->
      <div class="flex items-center justify-between pb-5 border-b border-slate-200">
        <a href="index.html" class="flex items-center">
          <img src="assets/img/logo-removebg.png" alt="Pure Elegance Agency" class="h-14 sm:h-16 w-auto object-contain luxury-gold-logo">
        </a>
        <button id="closeMobileMenuBtn" type="button" aria-label="Fermer le menu" class="w-11 h-11 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 hover:text-slate-950 flex items-center justify-center transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Nav Links Center (Textes noirs nets, fond blanc dur) -->
      <div class="py-6 space-y-2">
        ${mobileNavLinksHtml}
      </div>

      <!-- Bottom CTAs -->
      <div class="pt-6 border-t border-slate-200 space-y-3">
        <a href="https://wa.me/50947327551?text=Bonjour%20Pure%20Elegance%20Agency,%20je%20souhaite%20r%C3%A9server%20une%20%C3%A9quipe." target="_blank" rel="noopener noreferrer" class="w-full py-4 rounded-xl text-center text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md flex items-center justify-center gap-2">
          ${ICONS.whatsapp}
          <span>Réserver une Équipe via WhatsApp</span>
        </a>
        <a href="tel:+50947327551" class="w-full py-3.5 rounded-xl text-center text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-2 transition-colors">
          ${ICONS.phone}
          <span>Appeler le (509) 4732 75 51</span>
        </a>
        <p class="text-center text-xs text-amber-600 font-serif italic pt-1">Where elegance becomes a statement</p>
      </div>

    </div>
  </header>
  `;
}

function getFooter() {
  return `
  <!-- UNIFIED LUXURY FOOTER -->
  <footer class="bg-[#0B0F17] text-white pt-16 pb-12 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        
        <!-- Col 1: Brand & Slogan -->
        <div>
          <a href="index.html" class="inline-block mb-4 group">
            <img src="assets/img/logo-removebg.png" alt="Pure Elegance Agency" class="h-16 w-auto object-contain group-hover:opacity-90 transition-opacity">
          </a>
          <p class="text-xs text-amber-400 font-serif italic mb-3">Where elegance becomes a statement</p>
          <p class="text-sm text-slate-400 leading-relaxed mb-6">
            Votre agence de référence pour vos événements d'exception : Hôtesses d'accueil VIP, Serveurs de prestige, Mannequins, Modèles et Service traiteur en Haïti.
          </p>
          <div class="flex items-center space-x-3">
            <a href="https://instagram.com/pure.eleganceagency" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-slate-700 transition-colors" title="Instagram">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://wa.me/50947327551" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 hover:text-emerald-300 hover:border-emerald-700 transition-colors" title="WhatsApp">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            </a>
          </div>
        </div>

        <!-- Col 2: Navigation -->
        <div>
          <h4 class="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Navigation</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="index.html" class="text-slate-400 hover:text-white transition-colors">Accueil</a></li>
            <li><a href="prestations.html" class="text-slate-400 hover:text-white transition-colors">Nos Services</a></li>
            <li><a href="realisations.html" class="text-slate-400 hover:text-white transition-colors">Nos Réalisations</a></li>
            <li><a href="agence.html" class="text-slate-400 hover:text-white transition-colors">L'Agence</a></li>
            <li><a href="recrutement.html" class="text-slate-400 hover:text-white transition-colors">Rejoindre l'Équipe (Castings)</a></li>
            <li><a href="contact.html" class="text-slate-400 hover:text-white transition-colors">Réservations & Contact</a></li>
          </ul>
        </div>

        <!-- Col 3: Nos Pôles d'Activités (Clean Bullets, NO EMOJIS) -->
        <div>
          <h4 class="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Nos Pôles d'Activités</h4>
          <ul class="space-y-2.5 text-sm text-slate-400">
            <li>• Mannequins & Modèles</li>
            <li>• Hôtesses d'Accueil VIP</li>
            <li>• Serveurs & Mixologie</li>
            <li>• Service Traiteur Événementiel</li>
            <li>• Régie & Encadrement Terrain</li>
          </ul>
        </div>

        <!-- Col 4: Contact Direct Officiel (Issue du Poster) -->
        <div>
          <h4 class="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Réservations & Infos</h4>
          <div class="space-y-3 text-sm text-slate-400">
            <p class="flex items-center gap-2.5">
              <span class="text-emerald-400">${ICONS.whatsapp}</span>
              <span class="text-white font-bold">(509) 4732 75 51</span>
            </p>
            <p class="flex items-center gap-2.5">
              <span class="text-amber-400">${ICONS.email}</span>
              <a href="mailto:hilairealissa8@gmail.com" class="text-slate-300 hover:text-white transition-colors">hilairealissa8@gmail.com</a>
            </p>
            <p class="flex items-center gap-2.5">
              <span class="text-pink-400">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </span>
              <span>@pure.eleganceagency</span>
            </p>
            <div class="pt-2">
              <a href="https://wa.me/50947327551" target="_blank" rel="noopener noreferrer" class="inline-block px-4 py-2 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors">
                Écrire sur WhatsApp &rarr;
              </a>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>&copy; ${new Date().getFullYear()} Pure Elegance Agency. Tous droits réservés.</p>
        <p class="italic text-amber-400 font-serif">Where elegance becomes a statement</p>
      </div>

    </div>
  </footer>

  <!-- Lightbox Modal Container for Images -->
  <div id="imageLightbox" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md hidden items-center justify-center p-4">
    <div class="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
      <button id="closeLightbox" class="absolute -top-12 right-0 text-white hover:text-amber-400 p-2 text-2xl font-bold">&times; Fermer</button>
      <img id="lightboxImg" src="" alt="Aperçu Grand Format" class="max-h-[80vh] max-w-full rounded-lg shadow-2xl object-contain">
      <p id="lightboxCaption" class="mt-3 text-white text-sm font-semibold text-center"></p>
    </div>
  </div>

  <!-- Shared Global Script -->
  <script src="assets/js/main.js"></script>
  `;
}

function wrapHtml(title, description, contentHtml, activePage = 'accueil') {
  return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  
  <!-- Favicon Officiel (Logo Pure Elegance) -->
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <!-- Editorial CSS -->
  <link rel="stylesheet" href="assets/css/editorial.css">
  <style>
    /* TRAIN MARQUEE - DÉFILEMENT CONTINU LENT DE DROITE À GAUCHE (COMME UN TRAIN QUI GLISSE DOUCEMENT) */
    @keyframes marqueeTrain {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-50%, 0, 0); }
    }
    .train-marquee-container {
      overflow: hidden;
      width: 100%;
      position: relative;
      user-select: none;
    }
    .train-marquee-track {
      display: inline-flex;
      white-space: nowrap;
      width: max-content;
      animation: marqueeTrain 48s linear infinite;
      will-change: transform;
    }
    .train-marquee-track:hover {
      animation-play-state: paused;
    }
    /* Mobile Menu Drawer - Fond blanc dur 100% opaque, aucun défilement arrière */
    #mobileMenu {
      background-color: #ffffff !important;
      opacity: 1 !important;
    }
  </style>
</head>
<body class="bg-[#F8FAFC] text-slate-900 antialiased selection:bg-slate-900 selection:text-white flex flex-col min-h-screen">
  ${getHeader(activePage)}
  
  <main class="flex-grow">
    ${contentHtml}
  </main>

  ${getFooter()}
</body>
</html>`;
}

// -------------------------------------------------------------
// 1. PAGE: INDEX.HTML (Accueil - Concis, fluide, photos ultra HD)
// -------------------------------------------------------------
const indexContent = `
  <!-- HERO SECTION : MODERNE, FLUIDE, STYLE APPLE -->
  <section class="relative bg-white border-b border-slate-200 overflow-hidden py-14 lg:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <!-- Left Column: Titre, Slogan et Action -->
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-800">
            Staffing Événementiel de Prestige • Port-au-Prince
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            L'Excellence du Staffing & de l'Accueil VIP.
          </h1>

          <p class="text-xl text-amber-600 font-serif italic">
            « Where elegance becomes a statement »
          </p>

          <p class="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
            Pure Elegance Agency met à votre disposition des équipes sélectionnées avec rigueur : <strong>Hôtesses d'accueil, Serveurs, Mannequins, Modèles et Service traiteur</strong> pour valoriser chacun de vos événements.
          </p>

          <!-- Boutons d'Action Clairs -->
          <div class="flex flex-col sm:flex-row gap-4 pt-2">
            <a href="https://wa.me/50947327551?text=Bonjour%20Pure%20Elegance%20Agency,%20je%20souhaite%20r%C3%A9server%20une%20%C3%A9quipe." target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-bold text-white bg-slate-950 hover:bg-slate-800 transition-all shadow-md gap-2 text-center group">
              <span>Réserver une Équipe</span>
              <svg class="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
            <a href="prestations.html" class="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all text-center">
              <span>Découvrir Nos Services</span>
            </a>
          </div>

          <!-- Contact Direct Pill -->
          <div class="pt-1 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-semibold">
            <span class="inline-flex items-center gap-1.5 text-slate-900 font-bold">
              ${ICONS.phone} (509) 4732 75 51
            </span>
            <span>•</span>
            <span class="inline-flex items-center gap-1.5 text-slate-600">
              ${ICONS.email} hilairealissa8@gmail.com
            </span>
          </div>

        </div>

        <!-- Right Column: Vraies Photos d'Équipe en Ultra HD -->
        <div class="lg:col-span-5 relative">
          <div class="grid grid-cols-2 gap-3.5">
            <div class="space-y-3.5">
              <div class="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[4/5] bg-slate-100">
                <img src="assets/img/activites/burger-fest.jpg" alt="Équipe Pure Elegance à Burger Fest" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500">
              </div>
              <div class="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-square bg-slate-100">
                <img src="assets/img/activites/equipe-reception.jpg" alt="Accueil VIP Pure Elegance" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500">
              </div>
            </div>
            <div class="space-y-3.5 pt-6">
              <div class="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-square bg-slate-100">
                <img src="assets/img/activites/casami-event.jpg" alt="Hôtesses d'Accueil Casami" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500">
              </div>
              <div class="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[4/5] bg-slate-100">
                <img src="assets/img/activites/gala-seduction.jpg" alt="Gala Pure Elegance Agency" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500">
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- MARQUES & ÉVÉNEMENTS PARTENAIRES (DÉFILEMENT CONTINU LENT DE DROITE À GAUCHE) -->
  <section class="py-5 bg-slate-100 border-y border-slate-200/90 train-marquee-container">
    <div class="train-marquee-track flex items-center gap-10 whitespace-nowrap">
      <div class="flex items-center gap-10 text-slate-800 font-extrabold text-sm sm:text-base tracking-widest uppercase">
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>BURGER FEST</span>
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>AKUNA CLUB</span>
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>BRUNCH SOL</span>
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>PRESTIGE / CASAMI</span>
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>BÈLIDE MAGAZINE</span>
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>GREEN VIBE</span>
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>GALA DES AMBASSADEURS</span>
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>FASHION WEEK HAÏTI</span>
      </div>
      <div class="flex items-center gap-10 text-slate-800 font-extrabold text-sm sm:text-base tracking-widest uppercase" aria-hidden="true">
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>BURGER FEST</span>
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>AKUNA CLUB</span>
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>BRUNCH SOL</span>
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>PRESTIGE / CASAMI</span>
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>BÈLIDE MAGAZINE</span>
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>GREEN VIBE</span>
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>GALA DES AMBASSADEURS</span>
        <span class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-amber-500"></span>FASHION WEEK HAÏTI</span>
      </div>
    </div>
  </section>

  <!-- APERÇU RAPIDE DES 4 SERVICES AVEC LOGOS ET BADGES PROFESSIONNELS (SANS EMOJIS) -->
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span class="text-xs font-bold tracking-widest text-slate-500 uppercase">Nos Métiers</span>
          <h2 class="text-3xl font-extrabold text-slate-950 mt-1">4 Pôles d'Excellence</h2>
        </div>
        <a href="prestations.html" class="mt-3 md:mt-0 font-bold text-sm text-slate-900 hover:text-amber-600 flex items-center gap-1">
          Voir les détails de chaque prestation &rarr;
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Pôle 1: Mannequins -->
        <div class="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-400/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 group-hover:border-amber-500/50 transition-all">
              ${ICONS.mannequin}
            </div>
            <h3 class="text-lg font-bold text-slate-950 mb-2">Mannequins & Modèles</h3>
            <p class="text-xs text-slate-600 leading-relaxed mb-4">
              Modèles professionnels pour défilés haute couture, shootings éditoriaux, campagnes publicitaires et lancements de marque.
            </p>
          </div>
          <a href="prestations.html#mannequins" class="text-xs font-bold text-slate-900 hover:text-amber-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Découvrir &rarr;
          </a>
        </div>

        <!-- Pôle 2: Hôtesses -->
        <div class="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-400/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 group-hover:border-amber-500/50 transition-all">
              ${ICONS.hotesse}
            </div>
            <h3 class="text-lg font-bold text-slate-950 mb-2">Hôtesses d'Accueil VIP</h3>
            <p class="text-xs text-slate-600 leading-relaxed mb-4">
              Accueil protocolaire d'honneur, gestion des listings invités VIP, remise de distinctions et orientation des personnalités.
            </p>
          </div>
          <a href="prestations.html#hotesses" class="text-xs font-bold text-slate-900 hover:text-amber-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Découvrir &rarr;
          </a>
        </div>

        <!-- Pôle 3: Serveurs -->
        <div class="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-400/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 group-hover:border-amber-500/50 transition-all">
              ${ICONS.serveur}
            </div>
            <h3 class="text-lg font-bold text-slate-950 mb-2">Serveurs & Bar d'Élite</h3>
            <p class="text-xs text-slate-600 leading-relaxed mb-4">
              Service en salle distingué, personnel de bar qualifié, mixologie événementielle et service des salons d'honneur.
            </p>
          </div>
          <a href="prestations.html#serveurs" class="text-xs font-bold text-slate-900 hover:text-amber-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Découvrir &rarr;
          </a>
        </div>

        <!-- Pôle 4: Traiteur -->
        <div class="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-400/50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 group-hover:border-amber-500/50 transition-all">
              ${ICONS.traiteur}
            </div>
            <h3 class="text-lg font-bold text-slate-950 mb-2">Service Traiteur Prestige</h3>
            <p class="text-xs text-slate-600 leading-relaxed mb-4">
              Coordination gastronomique de réceptions : cocktails dînatoires, buffets d'exception, logistique culinaire et service de table.
            </p>
          </div>
          <a href="prestations.html#traiteur" class="text-xs font-bold text-slate-900 hover:text-amber-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Découvrir &rarr;
          </a>
        </div>

      </div>
    </div>
  </section>

  <!-- APERÇU RÉALISATIONS (PHOTOS ULTRA HD) -->
  <section class="py-16 bg-[#F8FAFC] border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span class="text-xs font-bold tracking-widest text-slate-500 uppercase">Nos Équipes sur le Terrain</span>
          <h2 class="text-3xl font-extrabold text-slate-950 mt-1">Dernières Réalisations</h2>
        </div>
        <a href="realisations.html" class="mt-3 md:mt-0 font-bold text-sm text-slate-900 hover:text-amber-600">
          Explorer toute la galerie photo &rarr;
        </a>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <!-- Photo 1: Burger Fest (4 Hôtesses "YO TE PALE W AN") -->
        <div class="rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200 group cursor-pointer lightbox-trigger" data-img="assets/img/activites/burger-fest.jpg" data-caption="Staffing Burger Fest Haïti - Accueil & Billetterie">
          <img src="assets/img/activites/burger-fest.jpg" alt="Burger Fest Haïti" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500">
        </div>

        <!-- Photo 2: Gala VIP Le Retour de la Séduction (Hôtesses en robes de soirée rouge & noir) -->
        <div class="rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200 group cursor-pointer lightbox-trigger" data-img="assets/img/activites/gala-seduction.jpg" data-caption="Gala VIP Le Retour de la Séduction - Hôtesses de Prestige">
          <img src="assets/img/activites/gala-seduction.jpg" alt="Gala VIP Séduction" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500">
        </div>

        <!-- Photo 3: Accueil Événementiel en Salle (4 Hôtesses en chemisiers blancs & pantalons noirs) -->
        <div class="rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200 group cursor-pointer lightbox-trigger" data-img="assets/img/activites/equipe-reception.jpg" data-caption="Protocole Événementiel - Accueil & Gestion de salle">
          <img src="assets/img/activites/equipe-reception.jpg" alt="Accueil en salle" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500">
        </div>

        <!-- Photo 4: Compagnie des Tabacs Comme Il Faut (2 Hôtesses en polos noirs) -->
        <div class="rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200 group cursor-pointer lightbox-trigger" data-img="assets/img/activites/tabacs-commeilfaut.jpg" data-caption="Compagnie des Tabacs Comme Il Faut - Hôtesses Corporate">
          <img src="assets/img/activites/tabacs-commeilfaut.jpg" alt="Comme Il Faut Corporate" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500">
        </div>

        <!-- Photo 5: Casami Event (2 Hôtesses Casami) -->
        <div class="rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200 group cursor-pointer lightbox-trigger" data-img="assets/img/activites/casami-event.jpg" data-caption="Casami - Accueil & Animation Marque">
          <img src="assets/img/activites/casami-event.jpg" alt="Casami Event" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500">
        </div>

        <!-- Photo 6: Bèlide Magazine (4 Hôtesses en t-shirts Bèlide Magazine) -->
        <div class="rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200 group cursor-pointer lightbox-trigger" data-img="assets/img/activites/belide-magazine-team.jpg" data-caption="Bèlide Magazine - Équipe Terrain & RP">
          <img src="assets/img/activites/belide-magazine-team.jpg" alt="Bèlide Magazine" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500">
        </div>

        <!-- Photo 7: Heineken VIP Stand (Hôtesse devant stand Heineken) -->
        <div class="rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200 group cursor-pointer lightbox-trigger" data-img="assets/img/activites/heineken-vip.jpg" data-caption="Heineken VIP Lounge - Activation de marque">
          <img src="assets/img/activites/heineken-vip.jpg" alt="Heineken VIP" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500">
        </div>

        <!-- Photo 8: Green Vibe Festival (5 Hôtesses en polos verts et blancs) -->
        <div class="rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200 group cursor-pointer lightbox-trigger" data-img="assets/img/activites/green-vibe-team.jpg" data-caption="Green Vibe Festival - Équipe Protocole">
          <img src="assets/img/activites/green-vibe-team.jpg" alt="Green Vibe Festival" class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500">
        </div>

      </div>
    </div>
  </section>

  <!-- BANNIÈRE RÉSERVATION DIRECTE -->
  <section class="py-14 bg-slate-950 text-white border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p class="text-amber-400 font-serif italic text-sm mb-2">Where elegance becomes a statement</p>
      <h2 class="text-3xl font-extrabold">Vous préparez un événement d'envergure ?</h2>
      <p class="text-slate-400 mt-2 max-w-lg mx-auto text-sm">
        Hôtesses d'accueil VIP, Serveurs de prestige, Mannequins & Service traiteur pour vos réceptions.
      </p>
      <div class="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <a href="https://wa.me/50947327551?text=Bonjour%20Pure%20Elegance%20Agency,%20je%20souhaite%20r%C3%A9server%20une%20%C3%A9quipe." target="_blank" rel="noopener noreferrer" class="px-8 py-3.5 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-sm hover:bg-amber-300 transition-colors shadow">
          Réserver via WhatsApp : (509) 4732 75 51
        </a>
        <a href="contact.html" class="px-8 py-3.5 rounded-xl bg-slate-800 text-white font-bold text-sm hover:bg-slate-700 border border-slate-700 transition-colors">
          Voir Toutes Nos Coordonnées
        </a>
      </div>
    </div>
  </section>
`;

// -------------------------------------------------------------
// 2. PAGE: PRESTATIONS.HTML (Nos 4 Services Détaillés - Sans Emojis)
// -------------------------------------------------------------
const prestationsContent = `
  <!-- HEADER SECTION -->
  <section class="bg-white border-b border-slate-200 py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <span class="text-xs font-bold uppercase tracking-widest text-slate-500">Nos Prestations</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-2 tracking-tight">
          Services de Staffing & Événementiel
        </h1>
        <p class="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
          Des équipes d'élite sélectionnées et formées pour assurer une tenue irréprochable et un service haut de gamme lors de vos réceptions et rassemblements.
        </p>
      </div>
    </div>
  </section>

  <!-- LES 4 SERVICES EN DÉTAIL -->
  <section class="py-14 bg-[#F8FAFC]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Service 1: Mannequins -->
      <div id="mannequins" class="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
            Pôle Mannequinat & Modèles
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-950">Mannequins & Modèles</h2>
          <p class="text-slate-600 leading-relaxed text-sm">
            Une présence marquante pour vos défilés de haute couture, séances photos publicitaires, tournages et activations visuelles de marque.
          </p>
          <ul class="space-y-2 text-xs text-slate-700">
            <li class="flex items-center gap-2">• Défilés de mode et présentations de collections</li>
            <li class="flex items-center gap-2">• Shootings éditoriaux, catalogues et campagnes réseaux sociaux</li>
            <li class="flex items-center gap-2">• Ambassadrices d'image lors de salons et lancements</li>
          </ul>
        </div>
        <div class="lg:col-span-5">
          <div class="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200">
            <img src="assets/img/activites/mannequin.jpg" alt="Mannequins Pure Elegance" class="w-full h-full object-cover object-top">
          </div>
        </div>
      </div>

      <!-- Service 2: Hôtesses -->
      <div id="hotesses" class="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-5 order-last lg:order-first">
          <div class="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200">
            <img src="assets/img/activites/burger-fest.jpg" alt="Hôtesses d'Accueil Pure Elegance" class="w-full h-full object-cover object-top">
          </div>
        </div>
        <div class="lg:col-span-7 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
            Pôle Accueil & Protocole VIP
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-950">Hôtesses d'Accueil</h2>
          <p class="text-slate-600 leading-relaxed text-sm">
            L'art de recevoir avec distinction. Nos hôtesses garantissent un accueil chaleureux, le contrôle des entrées et une orientation fluide de vos invités VIP.
          </p>
          <ul class="space-y-2 text-xs text-slate-700">
            <li class="flex items-center gap-2">• Accueil protocolaire, contrôle listing et pose de bracelets</li>
            <li class="flex items-center gap-2">• Orientation des personnalités et assistance sur scène</li>
            <li class="flex items-center gap-2">• Maîtrise bilingue français, créole et anglais</li>
          </ul>
        </div>
      </div>

      <!-- Service 3: Serveurs -->
      <div id="serveurs" class="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
            Pôle Service & Salle
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-950">Serveurs & Bar d'Élite</h2>
          <p class="text-slate-600 leading-relaxed text-sm">
            Un service attentif et discret pour vos dîners de gala, cocktails d'affaires et espaces VIP. Notre personnel est formé aux règles rigoureuses du service en salle.
          </p>
          <ul class="space-y-2 text-xs text-slate-700">
            <li class="flex items-center gap-2">• Service au plateau et passage de coupes de champagne</li>
            <li class="flex items-center gap-2">• Bar d'accueil et gestion des rafraîchissements</li>
            <li class="flex items-center gap-2">• Présentation soignée en tenue de service noire ou blanche</li>
          </ul>
        </div>
        <div class="lg:col-span-5">
          <div class="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200">
            <img src="assets/img/activites/gala-seduction.jpg" alt="Service Soirée Pure Elegance" class="w-full h-full object-cover object-top">
          </div>
        </div>
      </div>

      <!-- Service 4: Service Traiteur -->
      <div id="traiteur" class="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-5 order-last lg:order-first">
          <div class="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200">
            <img src="assets/img/activites/traiteur.jpg" alt="Service Traiteur et Réception" class="w-full h-full object-cover object-top">
          </div>
        </div>
        <div class="lg:col-span-7 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
            Pôle Gastronomie & Logistique
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-950">Service Traiteur Événementiel</h2>
          <p class="text-slate-600 leading-relaxed text-sm">
            Mise en scène gastronomique de vos réceptions : buffets soignés, pièces cocktails savoureuses et coordination fluide avec la brigade de service.
          </p>
          <ul class="space-y-2 text-xs text-slate-700">
            <li class="flex items-center gap-2">• Cocktails dînatoires sucrés / salés</li>
            <li class="flex items-center gap-2">• Buffets pour réceptions privées, mariages et fêtes d'entreprises</li>
            <li class="flex items-center gap-2">• Logistique et dressage des tables selon votre thème</li>
          </ul>
        </div>
      </div>

    </div>

    <!-- Bouton Réserver -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
      <a href="https://wa.me/50947327551?text=Bonjour%20Pure%20Elegance%20Agency,%20je%20souhaite%20r%C3%A9server%20des%20services%20pour%20un%20%C3%A9v%C3%A9nement." target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-950 text-white font-bold text-sm hover:bg-slate-800 transition-colors shadow">
        <span>Réserver ces services via WhatsApp : (509) 4732 75 51</span>
        <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </a>
    </div>
  </section>
`;

// -------------------------------------------------------------
// 3. PAGE: REALISATIONS.HTML (Galerie Authentique)
// -------------------------------------------------------------
const realisationsContent = `
  <!-- HEADER SECTION -->
  <section class="bg-white border-b border-slate-200 py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <span class="text-xs font-bold uppercase tracking-widest text-slate-500">Portfolio</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">
          Nos Réalisations & Événements
        </h1>
        <p class="text-base text-slate-600 mt-3 leading-relaxed">
          Retrouvez les déploiements de Pure Elegance Agency lors des grands rendez-vous en Haïti. Cliquez sur une image pour l'agrandir.
        </p>
      </div>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap gap-2 mt-6" id="galleryFilters">
        <button class="filter-btn active px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-950 text-white" data-filter="all">Tous</button>
        <button class="filter-btn px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200" data-filter="festival">Festivals</button>
        <button class="filter-btn px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200" data-filter="soiree">Soirées VIP</button>
        <button class="filter-btn px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200" data-filter="metiers">Métiers & Staff</button>
      </div>
    </div>
  </section>

  <!-- GRILLE PHOTOS -->
  <section class="py-14 bg-[#F8FAFC]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="galleryGrid">
        
        <!-- Item 1: Burger Fest (T-Shirts YO TE PALE W AN) -->
        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="festival">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/burger-fest.jpg" data-caption="Staffing Burger Fest Haïti - Accueil & Billetterie">
            <img src="assets/img/activites/burger-fest.jpg" alt="Burger Fest Haïti" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Burger Fest Haïti</h3>
            <p class="text-xs text-slate-500 mt-0.5">Staffing d'envergure, accueil & billetterie</p>
          </div>
        </div>

        <!-- Item 2: Gala Le Retour de la Séduction -->
        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="soiree">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/gala-seduction.jpg" data-caption="Gala VIP Le Retour de la Séduction - Hôtesses de Prestige">
            <img src="assets/img/activites/gala-seduction.jpg" alt="Gala VIP Séduction" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Gala VIP Le Retour de la Séduction</h3>
            <p class="text-xs text-slate-500 mt-0.5">Hôtesses de prestige en tenues de gala</p>
          </div>
        </div>

        <!-- Item 3: Accueil en salle -->
        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="soiree">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/equipe-reception.jpg" data-caption="Protocole Événementiel - Accueil & Gestion de salle">
            <img src="assets/img/activites/equipe-reception.jpg" alt="Accueil en salle" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Accueil Événementiel & Protocole</h3>
            <p class="text-xs text-slate-500 mt-0.5">Gestion des flux invités et remise de badges</p>
          </div>
        </div>

        <!-- Item 4: Compagnie des Tabacs Comme Il Faut -->
        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="metiers">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/tabacs-commeilfaut.jpg" data-caption="Compagnie des Tabacs Comme Il Faut - Hôtesses Corporate">
            <img src="assets/img/activites/tabacs-commeilfaut.jpg" alt="Comme Il Faut Corporate" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Compagnie des Tabacs Comme Il Faut</h3>
            <p class="text-xs text-slate-500 mt-0.5">Staffing corporate & animation de marque</p>
          </div>
        </div>

        <!-- Item 5: Casami Event -->
        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="metiers">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/casami-event.jpg" data-caption="Casami - Accueil & Animation Marque">
            <img src="assets/img/activites/casami-event.jpg" alt="Casami Event" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Casami - Activation Événementielle</h3>
            <p class="text-xs text-slate-500 mt-0.5">Accueil et animation du stand de marque</p>
          </div>
        </div>

        <!-- Item 6: Bèlide Magazine -->
        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="metiers">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/belide-magazine-team.jpg" data-caption="Bèlide Magazine - Équipe Terrain & RP">
            <img src="assets/img/activites/belide-magazine-team.jpg" alt="Bèlide Magazine" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Bèlide Magazine - Relations Publiques</h3>
            <p class="text-xs text-slate-500 mt-0.5">Ambassadrices de marque & distribution presse</p>
          </div>
        </div>

        <!-- Item 7: Heineken VIP Stand -->
        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="soiree">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/heineken-vip.jpg" data-caption="Heineken VIP Lounge - Activation de marque">
            <img src="assets/img/activites/heineken-vip.jpg" alt="Heineken VIP" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Heineken Lounge VIP</h3>
            <p class="text-xs text-slate-500 mt-0.5">Animation d'espace VIP & service boisson</p>
          </div>
        </div>

        <!-- Item 8: Green Vibe Festival -->
        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="festival">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/green-vibe-team.jpg" data-caption="Green Vibe Festival - Équipe Protocole">
            <img src="assets/img/activites/green-vibe-team.jpg" alt="Green Vibe Festival" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Green Vibe Festival</h3>
            <p class="text-xs text-slate-500 mt-0.5">Protocole festivalier & encadrement des délégations</p>
          </div>
        </div>

        <!-- Item 9: Match de Gala Football VIP -->
        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="soiree">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/soccer-match-vip.jpg" data-caption="Match de Gala Football VIP - Accueil VIP & Loges">
            <img src="assets/img/activites/soccer-match-vip.jpg" alt="Football Gala VIP" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Soirée Sportive & Gala Football</h3>
            <p class="text-xs text-slate-500 mt-0.5">Accueil des personnalités et service des loges</p>
          </div>
        </div>

      </div>
    </div>
  </section>
`;

// -------------------------------------------------------------
// 4. PAGE: AGENCE.HTML (L'Agence, Valeurs & Charte)
// -------------------------------------------------------------
const agenceContent = `
  <!-- HEADER SECTION -->
  <section class="bg-white border-b border-slate-200 py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <span class="text-xs font-bold uppercase tracking-widest text-slate-500">À Propos</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">
          L'Agence Pure Elegance
        </h1>
        <p class="text-base text-slate-600 mt-3 leading-relaxed">
          Spécialisée dans le staffing événementiel et l'accueil d'exception pour réceptions d'envergure, Pure Elegance Agency s'est imposée par sa rigueur, son écoute et la qualité irréprochable de son encadrement.
        </p>
      </div>
    </div>
  </section>

  <!-- VALEURS & PHILOSOPHIE -->
  <section class="py-14 bg-[#F8FAFC]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Photo d'équipe officielle -->
      <div class="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-slate-200 mb-14 aspect-[16/9] bg-slate-900">
        <img src="assets/img/activites/equipe-officielle.jpg" alt="Équipe Officielle Pure Elegance Agency" class="w-full h-full object-cover">
      </div>

      <div class="max-w-3xl mx-auto text-center space-y-4 mb-14">
        <p class="text-amber-600 font-serif italic text-lg">« Where elegance becomes a statement »</p>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-950">L'Exigence à Chaque Détail</h2>
        <p class="text-slate-600 text-sm leading-relaxed">
          Notre agence forme et prépare chaque intervenant avec minutie. De la posture à l'élocution, rien n'est laissé au hasard pour que vos réceptions laissent une empreinte mémorable auprès de vos convives.
        </p>
      </div>

      <!-- Les 4 Piliers Déontologiques -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span class="w-9 h-9 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold text-xs mb-3">01</span>
          <h3 class="font-bold text-slate-950 text-base mb-1.5">Ponctualité Absolue</h3>
          <p class="text-slate-600 text-xs leading-relaxed">
            Mise en place anticipée sur les lieux pour briefing complet et prise de repères opérationnels.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span class="w-9 h-9 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold text-xs mb-3">02</span>
          <h3 class="font-bold text-slate-950 text-base mb-1.5">Discrétion & Tact</h3>
          <p class="text-slate-600 text-xs leading-relaxed">
            Respect total de la confidentialité des échanges et du confort des invités de prestige.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span class="w-9 h-9 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold text-xs mb-3">03</span>
          <h3 class="font-bold text-slate-950 text-base mb-1.5">Harmonie des Tenues</h3>
          <p class="text-slate-600 text-xs leading-relaxed">
            Dress codes stricts, coiffure et présentation irréprochables adaptés au protocole demandé.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <span class="w-9 h-9 rounded-lg bg-slate-950 text-white flex items-center justify-center font-bold text-xs mb-3">04</span>
          <h3 class="font-bold text-slate-950 text-base mb-1.5">Aisance Multilingue</h3>
          <p class="text-slate-600 text-xs leading-relaxed">
            Capacité à dialoguer et orienter les visiteurs en créole, français et anglais avec fluidité.
          </p>
        </div>

      </div>

      <!-- Mention Presse Bèlide Magazine -->
      <div class="mt-14 bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-2xl mx-auto shadow-xs">
        <span class="text-xs font-bold uppercase tracking-widest text-slate-400">Revue de Presse</span>
        <h3 class="text-xl font-bold text-slate-950 mt-1">À l'Honneur dans Bèlide Magazine</h3>
        <p class="text-slate-600 text-xs mt-2 leading-relaxed">
          À l'occasion du 2ème anniversaire de l'agence, Bèlide Magazine a salué le professionnalisme de nos équipes et notre engagement à élever les standards de l'accueil événementiel.
        </p>
      </div>

    </div>
  </section>
`;

// -------------------------------------------------------------
// 5. PAGE: RECRUTEMENT.HTML (Castings & Rejoindre l'Équipe)
// -------------------------------------------------------------
const recrutementContent = `
  <!-- HEADER SECTION -->
  <section class="bg-white border-b border-slate-200 py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <span class="text-xs font-bold uppercase tracking-widest text-slate-500">Castings</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">
          Rejoignez l'Équipe Pure Elegance
        </h1>
        <p class="text-base text-slate-600 mt-3 leading-relaxed">
          Vous souhaitez évoluer dans le mannequinat, l'accueil événementiel ou le service de prestige ? Postulez directement pour nos prochains castings.
        </p>
      </div>
    </div>
  </section>

  <!-- FORMULAIRE RAPIDE -->
  <section class="py-14 bg-[#F8FAFC]">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
        <form class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">Nom complet *</label>
              <input type="text" id="cName" placeholder="Votre nom" required class="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">Âge *</label>
              <input type="number" id="cAge" placeholder="Ex: 22" required class="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">Téléphone / WhatsApp *</label>
              <input type="tel" id="cPhone" placeholder="+509 ..." required class="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-800 mb-1">Compte Instagram</label>
              <input type="text" id="cIg" placeholder="@votre_compte" class="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-800 mb-1">Pôle souhaité</label>
            <select id="cRole" class="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-950 font-medium">
              <option value="Hôtesse d'accueil VIP">Hôtesse d'accueil VIP</option>
              <option value="Mannequin / Modèle">Mannequin / Modèle</option>
              <option value="Serveur / Bar">Serveur / Bar</option>
              <option value="Service Traiteur">Service Traiteur</option>
            </select>
          </div>

          <div class="pt-2">
            <button type="button" id="btnPostulerWhatsApp" class="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-slate-950 hover:bg-slate-800 transition-colors shadow">
              Envoyer ma candidature via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
`;

// -------------------------------------------------------------
// 6. PAGE: CONTACT.HTML (Contact & Réservations Directes)
// -------------------------------------------------------------
const contactContent = `
  <!-- HEADER SECTION -->
  <section class="bg-white border-b border-slate-200 py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <span class="text-xs font-bold uppercase tracking-widest text-slate-500">Contact</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 tracking-tight">
          Réservations & Renseignements
        </h1>
        <p class="text-base text-slate-600 mt-3 leading-relaxed">
          Pour réserver une équipe ou demander des informations sur nos disponibilités, contactez-nous directement.
        </p>
      </div>
    </div>
  </section>

  <!-- CANAUX DIRECTS -->
  <section class="py-14 bg-[#F8FAFC]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        
        <!-- WhatsApp -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-xs">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl mx-auto mb-3">
            ${ICONS.whatsapp}
          </div>
          <h3 class="font-bold text-slate-950 text-base mb-1">WhatsApp & Téléphone</h3>
          <p class="text-xs text-slate-500 mb-3">Réservations 7j/7</p>
          <a href="https://wa.me/50947327551" target="_blank" rel="noopener noreferrer" class="font-extrabold text-slate-950 text-sm hover:text-emerald-600 block">
            (509) 4732 75 51
          </a>
        </div>

        <!-- Email -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-xs">
          <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl mx-auto mb-3">
            ${ICONS.email}
          </div>
          <h3 class="font-bold text-slate-950 text-base mb-1">Courriel Officiel</h3>
          <p class="text-xs text-slate-500 mb-3">Demandes écrites & dossiers</p>
          <a href="mailto:hilairealissa8@gmail.com" class="font-extrabold text-slate-950 text-sm hover:text-amber-600 block">
            hilairealissa8@gmail.com
          </a>
        </div>

        <!-- Instagram -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-xs">
          <div class="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-xl mx-auto mb-3">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </div>
          <h3 class="font-bold text-slate-950 text-base mb-1">Instagram Officiel</h3>
          <p class="text-xs text-slate-500 mb-3">Actualités & stories</p>
          <a href="https://instagram.com/pure.eleganceagency" target="_blank" rel="noopener noreferrer" class="font-extrabold text-slate-950 text-sm hover:text-pink-600 block">
            @pure.eleganceagency
          </a>
        </div>

      </div>
    </div>
  </section>
`;

// -------------------------------------------------------------
// SCRIPT JS GLOBAL (assets/js/main.js)
// -------------------------------------------------------------
const mainJsContent = `// Pure Elegance Agency - Global Script
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
`;

// -------------------------------------------------------------
// CSS MODERNE ÉPURÉ (assets/css/editorial.css)
// -------------------------------------------------------------
const editorialCssContent = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* SOLID WHITE NAVBAR: Non-transparente, nette et élégante */
.solid-navbar {
  background-color: #ffffff !important;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 50;
}

::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
`;

// Write all files
const pages = [
  {
    file: 'index.html',
    title: 'Pure Elegance Agency | Hôtesses, Serveurs, Mannequins & Traiteur',
    desc: 'Personnel événementiel de prestige en Haïti : Hôtesses d\'accueil VIP, Serveurs, Mannequins & Traiteur. Contact : (+509) 4732-7551.',
    content: indexContent,
    pageId: 'accueil'
  },
  {
    file: 'prestations.html',
    title: 'Nos Services & Prestations | Pure Elegance Agency',
    desc: 'Services événementiels haut de gamme : Hôtesses d\'accueil VIP, Serveurs de prestige, Mannequins et Service traiteur.',
    content: prestationsContent,
    pageId: 'prestations'
  },
  {
    file: 'realisations.html',
    title: 'Nos Réalisations | Pure Elegance Agency',
    desc: 'Galerie officielle de nos équipes lors des festivals, galas et événements majeurs en Haïti.',
    content: realisationsContent,
    pageId: 'realisations'
  },
  {
    file: 'agence.html',
    title: "L'Agence Pure Elegance | Histoire & Charte",
    desc: "Présentation et engagements déontologiques de Pure Elegance Agency.",
    content: agenceContent,
    pageId: 'agence'
  },
  {
    file: 'recrutement.html',
    title: 'Castings & Rejoindre l\'Équipe | Pure Elegance Agency',
    desc: 'Postulez aux prochains castings Pure Elegance Agency pour hôtesses, serveurs, mannequins et personnel événementiel.',
    content: recrutementContent,
    pageId: 'recrutement'
  },
  {
    file: 'contact.html',
    title: 'Réservations & Contact | Pure Elegance Agency',
    desc: 'Réservations directes : (509) 4732 75 51 • hilairealissa8@gmail.com • @pure.eleganceagency • Port-au-Prince, Haïti.',
    content: contactContent,
    pageId: 'contact'
  }
];

// Ensure directories exist
fs.mkdirSync(path.join(ROOT, 'assets', 'css'), { recursive: true });
fs.mkdirSync(path.join(ROOT, 'assets', 'js'), { recursive: true });

// Write CSS and JS
fs.writeFileSync(path.join(ROOT, 'assets', 'css', 'editorial.css'), editorialCssContent, 'utf8');
fs.writeFileSync(path.join(ROOT, 'assets', 'js', 'main.js'), mainJsContent, 'utf8');

// Generate all HTML pages with UTF-8 encoding
for (const p of pages) {
  const fullHtml = wrapHtml(p.title, p.desc, p.content, p.pageId);
  fs.writeFileSync(path.join(ROOT, p.file), fullHtml, 'utf8');
  console.log(`Generated: ${p.file}`);
}

console.log('All pages built successfully!');
