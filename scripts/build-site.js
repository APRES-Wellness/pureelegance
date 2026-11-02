// scripts/build-site.js
// Multi-page generator for Pure Elegance Agency
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

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
      ? 'text-white font-bold bg-white/10 border-b-2 border-amber-400'
      : 'text-slate-300 hover:text-white hover:bg-white/5 font-medium';
    return `<a href="${item.href}" class="px-3.5 py-2 rounded-lg text-sm transition-all ${activeClasses}">${item.label}</a>`;
  }).join('\n');

  const mobileNavLinksHtml = navItems.map(item => {
    const isActive = activePage === item.id;
    const activeClasses = isActive
      ? 'text-white font-bold bg-slate-800 border-l-4 border-amber-400 pl-3'
      : 'text-slate-300 hover:text-white hover:bg-slate-800/50 pl-4';
    return `<a href="${item.href}" class="block py-3 text-base font-medium rounded-md transition-colors ${activeClasses}">${item.label}</a>`;
  }).join('\n');

  return `
  <!-- TOP BAR (INFO & CONTACT OFFICIEL) -->
  <div class="bg-black text-slate-300 text-xs font-medium py-2 px-4 border-b border-slate-900">
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
      <div class="flex items-center space-x-3 text-slate-400">
        <span class="font-semibold text-slate-200">Mannequin • Hôtesse • Serveur • Service Traiteur</span>
        <span class="hidden md:inline text-slate-700">|</span>
        <span class="hidden md:inline text-amber-400/90 italic font-serif">Where elegance becomes a statement</span>
      </div>
      <div class="flex items-center space-x-5 text-slate-300">
        <a href="https://instagram.com/pure.eleganceagency" target="_blank" rel="noopener noreferrer" class="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-medium">
          <svg class="w-3.5 h-3.5 text-pink-400 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          <span>@pure.eleganceagency</span>
        </a>
        <span>•</span>
        <a href="https://wa.me/50947327551" target="_blank" rel="noopener noreferrer" class="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-semibold text-white">
          <svg class="w-3.5 h-3.5 fill-current text-emerald-400" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
          <span>Réservations & Infos : (+509) 4732-7551</span>
        </a>
      </div>
    </div>
  </div>

  <!-- SOLID NON-TRANSPARENT NAVBAR -->
  <header class="solid-navbar w-full sticky top-0 z-50 bg-[#0B0F17] border-b border-slate-800 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo Officiel Transparent Direct -->
        <a href="index.html" class="flex items-center py-2 group">
          <img src="assets/img/logo-transparent.png" alt="Pure Elegance Agency" class="h-14 sm:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300">
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-1.5">
          ${navLinksHtml}
        </nav>

        <!-- Right Action Button: Réserver une Équipe -->
        <div class="hidden lg:flex items-center space-x-3">
          <a href="https://wa.me/50947327551?text=Bonjour%20Pure%20Elegance%20Agency,%20je%20souhaite%20r%C3%A9server%20une%20%C3%A9quipe%20pour%20un%20%C3%A9v%C3%A9nement." target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 transition-all shadow-md hover:shadow-amber-500/20 group">
            <span>Réserver une Équipe</span>
            <svg class="w-4 h-4 ml-1.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <button id="mobileMenuBtn" type="button" aria-label="Ouvrir le menu" class="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path id="menuIconBars" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path id="menuIconClose" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div id="mobileMenu" class="hidden lg:hidden border-t border-slate-800 bg-[#0B0F17] px-4 pt-3 pb-6 shadow-2xl">
      <div class="space-y-1">
        ${mobileNavLinksHtml}
      </div>
      <div class="mt-5 pt-4 border-t border-slate-800 flex flex-col space-y-3">
        <a href="https://wa.me/50947327551?text=Bonjour%20Pure%20Elegance%20Agency,%20je%20souhaite%20r%C3%A9server%20une%20%C3%A9quipe." target="_blank" rel="noopener noreferrer" class="w-full text-center py-3 rounded-lg text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow">
          Réserver une Équipe via WhatsApp
        </a>
        <a href="tel:+50947327551" class="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-slate-300 bg-slate-900 border border-slate-700 flex items-center justify-center gap-2">
          <span>Appeler (+509) 4732-7551</span>
        </a>
      </div>
    </div>
  </header>
  `;
}

function getFooter() {
  return `
  <!-- UNIFIED FOOTER -->
  <footer class="bg-[#0B0F17] text-white pt-16 pb-12 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        
        <!-- Col 1: Brand & Slogan -->
        <div>
          <a href="index.html" class="inline-block mb-4">
            <img src="assets/img/logo-transparent.png" alt="Pure Elegance Agency Logo" class="h-16 w-auto object-contain">
          </a>
          <p class="text-xs text-amber-400/90 font-serif italic mb-3">Where elegance becomes a statement</p>
          <p class="text-sm text-slate-400 leading-relaxed mb-6">
            Votre référence pour le déploiement de mannequins, d'hôtesses d'accueil VIP, de serveurs de prestige et de service traiteur événementiel en Haïti.
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
          <h4 class="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Pages du Site</h4>
          <ul class="space-y-2.5 text-sm">
            <li><a href="index.html" class="text-slate-400 hover:text-white transition-colors">Accueil</a></li>
            <li><a href="prestations.html" class="text-slate-400 hover:text-white transition-colors">Nos Services</a></li>
            <li><a href="realisations.html" class="text-slate-400 hover:text-white transition-colors">Nos Réalisations</a></li>
            <li><a href="agence.html" class="text-slate-400 hover:text-white transition-colors">L'Agence</a></li>
            <li><a href="recrutement.html" class="text-slate-400 hover:text-white transition-colors">Rejoindre l'Équipe (Castings)</a></li>
            <li><a href="contact.html" class="text-slate-400 hover:text-white transition-colors">Réservations & Contact</a></li>
          </ul>
        </div>

        <!-- Col 3: Nos 4 Services Officiels -->
        <div>
          <h4 class="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Nos 4 Pôles d'Activité</h4>
          <ul class="space-y-2.5 text-sm text-slate-400">
            <li>👠 Mannequins & Modèles</li>
            <li>🧕 Hôtesses d'Accueil VIP</li>
            <li>🍸 Serveurs & Mixologie</li>
            <li>🥂 Service Traiteur Événementiel</li>
            <li>✨ Régie & Encadrement Terrain</li>
          </ul>
        </div>

        <!-- Col 4: Contact Direct Officiel -->
        <div>
          <h4 class="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Réservations & Infos</h4>
          <div class="space-y-3 text-sm text-slate-400">
            <p class="flex items-start gap-2.5">
              <svg class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span class="text-white font-bold">(+509) 4732-7551</span>
            </p>
            <p class="flex items-start gap-2.5">
              <svg class="w-4 h-4 text-pink-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
              <span>@pure.eleganceagency</span>
            </p>
            <p class="flex items-start gap-2.5">
              <svg class="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>Port-au-Prince • Pétion-Ville • Haïti</span>
            </p>
            <div class="pt-2">
              <a href="https://wa.me/50947327551" target="_blank" rel="noopener noreferrer" class="inline-block px-4 py-2 rounded bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors">
                Écrire sur WhatsApp &rarr;
              </a>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar : AUCUNE mention de personne, 100% PURE ELEGANCE AGENCY -->
      <div class="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>&copy; ${new Date().getFullYear()} PURE ELEGANCE AGENCY©. Tous droits réservés.</p>
        <p class="italic text-amber-400/80 font-serif">Where elegance becomes a statement</p>
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
// 1. PAGE: INDEX.HTML (Accueil - Concis, percutant, pas un long scroll)
// -------------------------------------------------------------
const indexContent = `
  <!-- HERO SECTION : MODERNE, FLUIDE, STYLE APPLE -->
  <section class="relative bg-white border-b border-slate-200 overflow-hidden py-14 lg:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <!-- Left Column: Titre, Slogan et Action -->
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-800">
            Party Entertainment Service • Port-au-Prince
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            L'Excellence du Staffing & de l'Accueil VIP.
          </h1>

          <p class="text-xl text-amber-600 font-serif italic">
            « Where elegance becomes a statement »
          </p>

          <p class="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
            Pure Elegance Agency met à votre disposition des équipes sélectionnées avec rigueur : <strong>Mannequins, Hôtesses de prestige, Serveurs qualifiés et Service traiteur</strong> pour valoriser chacun de vos événements.
          </p>

          <!-- Boutons d'Action Clairs -->
          <div class="flex flex-col sm:flex-row gap-4 pt-2">
            <a href="https://wa.me/50947327551?text=Bonjour%20Pure%20Elegance%20Agency,%20je%20souhaite%20r%C3%A9server%20une%20%C3%A9quipe." target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md gap-2 text-center">
              <span>Réserver une Équipe</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
            <a href="prestations.html" class="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all text-center">
              <span>Découvrir Nos Services</span>
            </a>
          </div>

          <p class="text-xs text-slate-500 font-medium">
            Contact direct réservations : <strong class="text-slate-800">(+509) 4732-7551</strong>
          </p>

        </div>

        <!-- Right Column: Vraies Photos d'Équipe en Action -->
        <div class="lg:col-span-5 relative">
          <div class="grid grid-cols-2 gap-3.5">
            <div class="space-y-3.5">
              <div class="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[4/5] bg-slate-100">
                <img src="assets/img/activites/burger-fest.jpg" alt="Équipe Pure Elegance à Burger Fest" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
              </div>
              <div class="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-square bg-slate-100">
                <img src="assets/img/activites/serveur.jpg" alt="Service VIP Pure Elegance" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
              </div>
            </div>
            <div class="space-y-3.5 pt-6">
              <div class="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-square bg-slate-100">
                <img src="assets/img/activites/hotesse.jpg" alt="Hôtesses d'Accueil Pure Elegance" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
              </div>
              <div class="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[4/5] bg-slate-100">
                <img src="assets/img/activites/soiree-gala.jpg" alt="Gala Pure Elegance Agency" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- MARQUES & ÉVÉNEMENTS PARTENAIRES -->
  <section class="py-7 bg-slate-100 border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center justify-center gap-8 md:gap-14 text-slate-700 font-extrabold text-sm sm:text-base tracking-wider uppercase">
        <span>BURGER FEST</span>
        <span>AKUNA CLUB</span>
        <span>BRUNCH SOL</span>
        <span>PRESTIGE / CASAMI</span>
        <span>BÈLIDE MAGAZINE</span>
        <span>GREEN VIBE</span>
      </div>
    </div>
  </section>

  <!-- APERÇU RAPIDE DES 4 SERVICES -->
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span class="text-xs font-bold tracking-widest text-slate-500 uppercase">Nos Métiers</span>
          <h2 class="text-3xl font-extrabold text-slate-950 mt-1">4 Pôles d'Excellence</h2>
        </div>
        <a href="prestations.html" class="mt-3 md:mt-0 font-bold text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1">
          Voir les détails de chaque prestation &rarr;
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Pôle 1: Mannequin -->
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
          <div class="text-2xl mb-3">👠</div>
          <h3 class="text-lg font-bold text-slate-950 mb-2">Mannequins</h3>
          <p class="text-xs text-slate-600 leading-relaxed mb-4">
            Modèles professionnels pour défilés, campagnes photo, lancements de marque et tournages visuels.
          </p>
          <a href="prestations.html#mannequins" class="text-xs font-bold text-slate-900 hover:text-amber-600">Découvrir &rarr;</a>
        </div>

        <!-- Pôle 2: Hôtesse -->
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
          <div class="text-2xl mb-3">🧕</div>
          <h3 class="text-lg font-bold text-slate-950 mb-2">Hôtesses d'Accueil</h3>
          <p class="text-xs text-slate-600 leading-relaxed mb-4">
            Accueil protocolaire VIP, gestion des listings invités, placement et animation de stands.
          </p>
          <a href="prestations.html#hotesses" class="text-xs font-bold text-slate-900 hover:text-amber-600">Découvrir &rarr;</a>
        </div>

        <!-- Pôle 3: Serveur -->
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
          <div class="text-2xl mb-3">🍸</div>
          <h3 class="text-lg font-bold text-slate-950 mb-2">Serveurs & Bar</h3>
          <p class="text-xs text-slate-600 leading-relaxed mb-4">
            Service en salle distingué, personnel de bar et gestion des salons privés et loges VIP.
          </p>
          <a href="prestations.html#serveurs" class="text-xs font-bold text-slate-900 hover:text-amber-600">Découvrir &rarr;</a>
        </div>

        <!-- Pôle 4: Traiteur -->
        <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
          <div class="text-2xl mb-3">🥂</div>
          <h3 class="text-lg font-bold text-slate-950 mb-2">Service Traiteur</h3>
          <p class="text-xs text-slate-600 leading-relaxed mb-4">
            Coordination de buffets raffinés, cocktails dînatoires et logistique culinaire événementielle.
          </p>
          <a href="prestations.html#traiteur" class="text-xs font-bold text-slate-900 hover:text-amber-600">Découvrir &rarr;</a>
        </div>

      </div>
    </div>
  </section>

  <!-- APERÇU RÉALISATIONS (4 PHOTOS RÉELLES ET PRÉCISES) -->
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
        
        <div class="rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200 group cursor-pointer lightbox-trigger" data-img="assets/img/activites/burger-fest.jpg" data-caption="Staffing Burger Fest">
          <img src="assets/img/activites/burger-fest.jpg" alt="Burger Fest" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        </div>

        <div class="rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200 group cursor-pointer lightbox-trigger" data-img="assets/img/activites/brunch-sol.jpg" data-caption="Brunch SOL - Hôtesses d'Accueil">
          <img src="assets/img/activites/brunch-sol.jpg" alt="Brunch SOL" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        </div>

        <div class="rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200 group cursor-pointer lightbox-trigger" data-img="assets/img/activites/serveur.jpg" data-caption="Service VIP & Soirée Akuna">
          <img src="assets/img/activites/serveur.jpg" alt="Service VIP" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        </div>

        <div class="rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 border border-slate-200 group cursor-pointer lightbox-trigger" data-img="assets/img/activites/soiree-gala.jpg" data-caption="Soirée de Gala Pure Elegance">
          <img src="assets/img/activites/soiree-gala.jpg" alt="Soirée de Gala" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        </div>

      </div>
    </div>
  </section>

  <!-- BANNIÈRE RÉSERVATION DIRECTE -->
  <section class="py-14 bg-[#0B0F17] text-white border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p class="text-amber-400 font-serif italic text-sm mb-2">Where elegance becomes a statement</p>
      <h2 class="text-3xl font-extrabold">Vous préparez un événement d'envergure ?</h2>
      <p class="text-slate-400 mt-2 max-w-lg mx-auto text-sm">
        Discutez directement de vos effectifs et exigences avec notre équipe de coordination.
      </p>
      <div class="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <a href="https://wa.me/50947327551?text=Bonjour%20Pure%20Elegance%20Agency,%20je%20souhaite%20r%C3%A9server%20une%20%C3%A9quipe." target="_blank" rel="noopener noreferrer" class="px-8 py-3.5 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-sm hover:bg-amber-300 transition-colors shadow">
          Réserver via WhatsApp : (+509) 4732-7551
        </a>
        <a href="contact.html" class="px-8 py-3.5 rounded-xl bg-slate-800 text-white font-bold text-sm hover:bg-slate-700 border border-slate-700 transition-colors">
          Voir Toutes Nos Coordonnées
        </a>
      </div>
    </div>
  </section>
`;

// -------------------------------------------------------------
// 2. PAGE: PRESTATIONS.HTML (Nos 4 Services Détaillés avec Images Précises)
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
          Quatre spécialités complémentaires pour assurer une tenue irréprochable et un service haut de gamme lors de vos rassemblements.
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
            👠 Pôle Mannequinat & Image
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
            <img src="assets/img/activites/mannequin.jpg" alt="Mannequins Pure Elegance" class="w-full h-full object-cover">
          </div>
        </div>
      </div>

      <!-- Service 2: Hôtesses -->
      <div id="hotesses" class="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-5 order-last lg:order-first">
          <div class="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200">
            <img src="assets/img/activites/hotesse.jpg" alt="Hôtesses d'Accueil Pure Elegance" class="w-full h-full object-cover">
          </div>
        </div>
        <div class="lg:col-span-7 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
            🧕 Pôle Accueil & Protocole VIP
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
            🍸 Pôle Service & Salle
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
            <img src="assets/img/activites/serveur.jpg" alt="Service Soirée Pure Elegance" class="w-full h-full object-cover">
          </div>
        </div>
      </div>

      <!-- Service 4: Service Traiteur -->
      <div id="traiteur" class="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-5 order-last lg:order-first">
          <div class="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200">
            <img src="assets/img/activites/traiteur.jpg" alt="Service Traiteur et Réception" class="w-full h-full object-cover">
          </div>
        </div>
        <div class="lg:col-span-7 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
            🥂 Pôle Gastronomie & Logistique
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
        <span>Réserver ces services via WhatsApp (+509 4732-7551)</span>
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
        
        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="festival">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/burger-fest.jpg" data-caption="Staffing Burger Fest - Accueil et billetterie">
            <img src="assets/img/activites/burger-fest.jpg" alt="Burger Fest" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Burger Fest Haïti</h3>
            <p class="text-xs text-slate-500 mt-0.5">Staffing d'envergure & coordination</p>
          </div>
        </div>

        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="soiree">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/serveur.jpg" data-caption="Soirée VIP Akuna Club">
            <img src="assets/img/activites/serveur.jpg" alt="Akuna Club" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Akuna Club Lounge</h3>
            <p class="text-xs text-slate-500 mt-0.5">Hôtesses d'accueil VIP et service loges</p>
          </div>
        </div>

        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="soiree">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/brunch-sol.jpg" data-caption="Brunch SOL - Tenues Blanches">
            <img src="assets/img/activites/brunch-sol.jpg" alt="Brunch SOL" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Brunch SOL</h3>
            <p class="text-xs text-slate-500 mt-0.5">Accueil protocolaire en tenues blanches</p>
          </div>
        </div>

        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="soiree">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/soiree-gala.jpg" data-caption="Gala Anniversaire Pure Elegance">
            <img src="assets/img/activites/soiree-gala.jpg" alt="Gala Pure Elegance" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Gala Prestige Black Tie</h3>
            <p class="text-xs text-slate-500 mt-0.5">Soirée d'anniversaire & protocole d'exception</p>
          </div>
        </div>

        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="metiers">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/mannequin.jpg" data-caption="Pôle Mannequinat & Shootings">
            <img src="assets/img/activites/mannequin.jpg" alt="Mannequins" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Mannequinat & Shootings</h3>
            <p class="text-xs text-slate-500 mt-0.5">Défilés et valorisation d'image de marque</p>
          </div>
        </div>

        <div class="gallery-item bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs" data-category="metiers">
          <div class="aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer lightbox-trigger" data-img="assets/img/activites/traiteur.jpg" data-caption="Service Traiteur Événementiel">
            <img src="assets/img/activites/traiteur.jpg" alt="Traiteur" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm text-slate-950">Service Traiteur & Buffets</h3>
            <p class="text-xs text-slate-500 mt-0.5">Mise en place de cocktails et réceptions</p>
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
          Spécialisée dans les métiers du spectacle, de l'accueil et du service événementiel, Pure Elegance Agency s'est imposée par sa rigueur, son écoute et la qualité irréprochable de son personnel.
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
            <select id="cRole" class="w-full rounded-xl border border-slate-300 py-2.5 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-950">
              <option value="Hôtesse d'accueil VIP">Hôtesse d'accueil VIP</option>
              <option value="Mannequin / Modèle">Mannequin / Modèle</option>
              <option value="Serveur / Bar">Serveur / Bar</option>
              <option value="Service Traiteur">Service Traiteur</option>
            </select>
          </div>

          <div class="pt-2">
            <button type="button" id="btnPostulerWhatsApp" class="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow">
              Envoyer ma candidature via WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
`;

// -------------------------------------------------------------
// 6. PAGE: CONTACT.HTML (Contact & Réservations)
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
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
          </div>
          <h3 class="font-bold text-slate-950 text-base mb-1">WhatsApp & Téléphone</h3>
          <p class="text-xs text-slate-500 mb-3">Réservations 7j/7</p>
          <a href="https://wa.me/50947327551" target="_blank" rel="noopener noreferrer" class="font-extrabold text-slate-950 text-sm hover:text-emerald-600 block">
            (+509) 4732-7551
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

        <!-- Localisation -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-xs">
          <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xl mx-auto mb-3">
            📍
          </div>
          <h3 class="font-bold text-slate-950 text-base mb-1">Localisation</h3>
          <p class="text-xs text-slate-500 mb-3">Interventions & déplacements</p>
          <p class="font-bold text-slate-950 text-sm">Port-au-Prince • Pétion-Ville</p>
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

/* SOLID NAVBAR: Non-transparente, nette et élégante */
.solid-navbar {
  background-color: #0B0F17 !important;
  border-bottom: 1px solid #1E293B;
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4);
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
    title: 'Pure Elegance Agency | Mannequins, Hôtesses & Staffing Événementiel',
    desc: 'Pure Elegance Agency - Agence de référence en Haïti pour Mannequins, Hôtesses d\'accueil, Serveurs et Service Traiteur. Where elegance becomes a statement.',
    content: indexContent,
    pageId: 'accueil'
  },
  {
    file: 'prestations.html',
    title: 'Nos Services & Prestations | Pure Elegance Agency',
    desc: 'Mannequins, Hôtesses d\'accueil VIP, Serveurs qualifiés et Service traiteur événementiel en Haïti.',
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
    desc: 'Postulez aux prochains castings Pure Elegance Agency pour mannequins, hôtesses et personnel événementiel.',
    content: recrutementContent,
    pageId: 'recrutement'
  },
  {
    file: 'contact.html',
    title: 'Réservations & Contact | Pure Elegance Agency',
    desc: 'Réservations directes : (+509) 4732-7551 • @pure.eleganceagency • Port-au-Prince, Haïti.',
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

// Remove old devis.html if present
try {
  if (fs.existsSync(path.join(ROOT, 'devis.html'))) {
    fs.unlinkSync(path.join(ROOT, 'devis.html'));
    console.log('Removed deprecated devis.html');
  }
} catch (e) {}

console.log('All pages built successfully!');
