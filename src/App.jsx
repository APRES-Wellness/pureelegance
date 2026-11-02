import React, { useState } from 'react';

// Real Event Case Studies & Team Interventions (100% Authentic, No Fake Personal Names)
export const REAL_EVENTS = [
  {
    id: "event-01",
    title: "Burger Fest",
    role: "Accueil VIP, Staffing & Espace Partenaires",
    description: "Coordination complète d'une équipe de 15 hôtesses d'accueil sur l'un des plus grands festivals culinaires et musicaux du pays. Gestion des accès VIP, accueil des sponsors et distribution officielle.",
    image: "assets/img/real/pure-elegance-61.jpg",
    gallery: [
      "assets/img/real/pure-elegance-63.jpg",
      "assets/img/real/pure-elegance-65.jpg",
      "assets/img/real/pure-elegance-67.jpg"
    ],
    tags: ["Festival Majeur", "15 Hôtesses", "Espace Partenaires"]
  },
  {
    id: "event-02",
    title: "Akuna Experience",
    role: "Accueil Protocolaire & Red Carpet",
    description: "Prestation haut de gamme pour une soirée exclusive : gestion du tapis rouge, orientation des personnalités, contrôle strict de la guest-list et service de loge d'honneur.",
    image: "assets/img/real/pure-elegance-14.jpg",
    gallery: [
      "assets/img/real/pure-elegance-10.jpg",
      "assets/img/real/pure-elegance-16.jpg"
    ],
    tags: ["Soirée VIP", "Tapis Rouge", "Protocole"]
  },
  {
    id: "event-03",
    title: "Brunch SOL",
    role: "Hospitality Lounge & Tenues Thématiques",
    description: "Ambiance chic et solaire : hôtesses en tenues blanches coordonnées, service d'accueil décontracté de prestige, orientation des convives et tenue du photocall.",
    image: "assets/img/real/pure-elegance-89.jpg",
    gallery: [
      "assets/img/real/pure-elegance-87.jpg",
      "assets/img/real/pure-elegance-85.jpg"
    ],
    tags: ["Brunch Chic", "Tenues Blanches", "Hospitality"]
  },
  {
    id: "event-04",
    title: "Green Vibe Festival",
    role: "Brand Ambassadors & Animation Événementielle",
    description: "Déploiement d'ambassadrices de marque pour dynamiser les espaces scéniques, guider le public vers les zones lounges et représenter les partenaires officiels.",
    image: "assets/img/real/pure-elegance-79.jpg",
    gallery: [
      "assets/img/real/pure-elegance-77.jpg",
      "assets/img/real/pure-elegance-81.jpg"
    ],
    tags: ["Festival Plein Air", "Animation", "Brand Activation"]
  },
  {
    id: "event-05",
    title: "Activations Prestige & Casami",
    role: "Lancements de Produits & Réceptions Privées",
    description: "Représentation d'entreprises : hôtesses et hôtes en tenue de soirée pour le lancement de nouvelles gammes, service de cocktail et tenue des stands corporate.",
    image: "assets/img/real/pure-elegance-71.jpg",
    gallery: [
      "assets/img/real/pure-elegance-69.jpg",
      "assets/img/real/pure-elegance-73.jpg"
    ],
    tags: ["Lancement de Marque", "Soirée Corporate", "Prestige & Casami"]
  },
  {
    id: "event-06",
    title: "Deux Ans de Pure Elegance",
    role: "Photoshoot Officiel & Célébration (Bèlide Mag)",
    description: "Photoshoot anniversaire célébrant deux années de raffinement et de leadership dans le secteur événementiel, couvert en exclusivité par la revue culturelle Bèlide Magazine.",
    image: "assets/img/real/pure-elegance-22.jpg",
    gallery: [
      "assets/img/real/pure-elegance-20.jpg",
      "assets/img/real/pure-elegance-108.jpg"
    ],
    tags: ["Anniversaire", "Revue de Presse", "Bèlide Magazine"]
  }
];

export const CLIENT_LOGOS = [
  "BURGER FEST", "BRUNCH SOL", "AKUNA", "GREEN VIBE", "PRESTIGE", "CASAMI", "PARYAJ LAKAY", "BÈLIDE MAGAZINE"
];

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRecruitmentOpen, setIsRecruitmentOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Devis Simulator State
  const [hostCount, setHostCount] = useState(4);
  const [duration, setDuration] = useState(5);
  const [eventType, setEventType] = useState("Festival / Événement Grand Public");
  const [optUniform, setOptUniform] = useState(true);
  const [optSupervisor, setOptSupervisor] = useState(true);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const sendDevisWhatsApp = (e) => {
    e.preventDefault();
    const msg = 
      `*DEMANDE DE DEVIS OFFICIEL - PURE ELEGANCE AGENCY*\n\n` +
      `👤 *Organisateur :* ${clientName || "Non spécifié"}\n` +
      `📞 *Contact :* ${clientPhone || "Non spécifié"}\n` +
      `📅 *Date :* ${eventDate || "À préciser"}\n` +
      `📍 *Lieu :* ${eventLocation || "À préciser"}\n` +
      `🎪 *Type d'événement :* ${eventType}\n` +
      `👥 *Effectif souhaité :* ${hostCount} hôtesse(s) / hôte(s)\n` +
      `⏱️ *Durée :* ${duration} heures\n` +
      `👗 *Uniformes coordonnés :* ${optUniform ? "Oui" : "Non"}\n` +
      `📋 *Superviseur dédié :* ${optSupervisor ? "Oui" : "Non"}\n\n` +
      `Merci de me contacter avec votre proposition tarifaire.`;

    window.open(`https://wa.me/50937000000?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-slate-900 text-white text-xs font-semibold py-2.5 px-4 tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Pure Elegance Agency • Agence d'Accueil Protocolaire & Staffing Événementiel</span>
          </div>
          <div className="flex items-center space-x-5 text-slate-300">
            <a href="https://instagram.com/pure.eleganceagency" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Instagram @pure.eleganceagency
            </a>
            <span>•</span>
            <button onClick={() => setIsRecruitmentOpen(true)} className="text-white hover:underline underline-offset-4 font-bold">
              Postuler comme Hôtesse
            </button>
          </div>
        </div>
      </div>

      {/* 2. SOLID NON-TRANSPARENT NAVBAR */}
      <header className="solid-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-3">
              <img src="favicon.svg" alt="Pure Elegance Agency Logo" className="w-10 h-10 rounded-full border border-slate-200 shadow-sm" />
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 uppercase">
                  Pure Elegance
                </span>
                <span className="text-[10px] tracking-[0.25em] text-slate-500 font-bold uppercase -mt-1">
                  Agency
                </span>
              </div>
            </a>

            {/* Desktop Navigation - High Legibility */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-700">
              <a href="#prestations" className="hover:text-slate-950 transition-colors">Prestations</a>
              <a href="#realisations" className="hover:text-slate-950 transition-colors">Nos Réalisations</a>
              <a href="#agence" className="hover:text-slate-950 transition-colors">L'Agence & Fondatrice</a>
              <a href="#devis" className="hover:text-slate-950 transition-colors">Devis en Ligne</a>
              <button onClick={() => setIsRecruitmentOpen(true)} className="hover:text-slate-950 transition-colors">
                Recrutement
              </button>
            </nav>

            {/* Direct CTA Button */}
            <div className="hidden sm:flex items-center space-x-4">
              <a 
                href="#devis"
                className="bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg shadow-sm transition-all"
              >
                Demander un Devis
              </a>
            </div>

            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-800 focus:outline-none"
            >
              <span className="text-2xl font-bold">☰</span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-5 space-y-4 text-sm font-semibold text-slate-800">
            <a href="#prestations" onClick={() => setMobileMenuOpen(false)} className="block py-1">Nos Prestations</a>
            <a href="#realisations" onClick={() => setMobileMenuOpen(false)} className="block py-1">Nos Réalisations</a>
            <a href="#agence" onClick={() => setMobileMenuOpen(false)} className="block py-1">L'Agence & Fondatrice</a>
            <a href="#devis" onClick={() => setMobileMenuOpen(false)} className="block py-1">Simulateur de Devis</a>
            <button onClick={() => { setIsRecruitmentOpen(true); setMobileMenuOpen(false); }} className="block w-full text-left py-1 text-slate-950 font-bold">
              Postuler comme Hôtesse
            </button>
            <div className="pt-3 border-t border-slate-200">
              <a href="#devis" onClick={() => setMobileMenuOpen(false)} className="w-full block bg-slate-900 text-white text-center py-3 rounded-lg font-bold">
                Demander un Devis WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION - CLEAR, PROFESSIONAL & BENEFIT-DRIVEN */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="pill-badge bg-white text-slate-800 border-slate-300">
                Staffing Événementiel & Accueil VIP
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
                L'art de sublimer chaque événement avec <span className="text-slate-900 underline decoration-slate-400 underline-offset-8">grâce et rigueur</span>.
              </h1>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-normal">
                Pure Elegance Agency met à votre disposition des <strong>hôtesses d'accueil qualifiées, du personnel de protocole et des ambassadrices de marque</strong> pour vos réceptions d'affaires, dîners de gala, salons officiels et festivals majeurs.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a 
                  href="#devis"
                  className="bg-slate-950 hover:bg-black text-white font-bold text-sm px-7 py-4 rounded-lg text-center shadow-md transition-all"
                >
                  Calculer mon Devis en Ligne
                </a>
                <a 
                  href="#realisations"
                  className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-sm px-7 py-4 rounded-lg text-center transition-all"
                >
                  Voir nos Réalisations Réelles
                </a>
              </div>

              {/* Trust Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-950">+50</div>
                  <div className="text-xs text-slate-600 font-medium">Grands Événements Réussis</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-950">100%</div>
                  <div className="text-xs text-slate-600 font-medium">Formation Protocolaire</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-950">24/7</div>
                  <div className="text-xs text-slate-600 font-medium">Supervision de Terrain</div>
                </div>
              </div>
            </div>

            {/* Real Team Photo in Hero */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
                <img 
                  src="assets/img/real/pure-elegance-61.jpg" 
                  alt="Équipe Pure Elegance Agency en tenue d'accueil officielle" 
                  className="w-full h-[460px] object-cover object-top"
                />
                <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">Équipe Officielle Pure Elegance</div>
                    <div className="text-xs text-slate-500">Uniformes harmonisés & présentation de prestige</div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">Vérifié</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PARTNERS TICKER / SOCIAL PROOF */}
      <section className="bg-white border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
            Ils nous font confiance pour leurs plus grands rendez-vous
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {CLIENT_LOGOS.map((name, i) => (
              <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs sm:text-sm font-extrabold text-slate-800 tracking-wider">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRESTATIONS (CE QUE FAIT RÉELLEMENT PURE ELEGANCE) */}
      <section id="prestations" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="pill-badge bg-white text-slate-800 border-slate-200 mb-3">Nos Services</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Des Prestations Complètes pour Tout Type d'Événement
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Chaque événement requiert un savoir-faire spécifique. Nous sélectionnons, préparons et coordonnons nos équipes selon vos exigences de protocole et d'image.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm hover:border-slate-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xl mb-5">
                  👑
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Hôtesses d'Accueil VIP & Protocole</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Salons d'affaires, réceptions diplomatiques, dîners de gala. Accueil personnalisé des délégations, vérification des listes, remise des kits et orientation fluide.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">✓ Élocution soignée (FR, CR, EN)</li>
                  <li className="flex items-center gap-2">✓ Gestion vestiaire & badges</li>
                  <li className="flex items-center gap-2">✓ Posture noble et discrétion</li>
                </ul>
              </div>
              <a href="#devis" className="text-xs font-bold text-slate-900 underline underline-offset-4">Réserver ce service →</a>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm hover:border-slate-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xl mb-5">
                  🎪
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Staffing Festivals & Événements</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Pour les événements grand public (Burger Fest, Brunch SOL, Green Vibe). Équipes dynamiques, gestion de la foule à l'entrée et accueil des loges partenaires.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">✓ Équipes de 5 à 20+ hôtesses</li>
                  <li className="flex items-center gap-2">✓ Tenues harmonisées & soignées</li>
                  <li className="flex items-center gap-2">✓ Gestion efficace des flux</li>
                </ul>
              </div>
              <a href="#devis" className="text-xs font-bold text-slate-900 underline underline-offset-4">Réserver ce service →</a>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm hover:border-slate-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xl mb-5">
                  ✨
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Brand Ambassadors & Marques</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Lancements de produits et soirées de marque (Prestige, Casami, Paryaj Lakay). Présentation de vos produits, animation de photocall et valorisation de votre image.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">✓ Distribution d'échantillons</li>
                  <li className="flex items-center gap-2">✓ Représentation valorisante</li>
                  <li className="flex items-center gap-2">✓ Sourire et proactivité</li>
                </ul>
              </div>
              <a href="#devis" className="text-xs font-bold text-slate-900 underline underline-offset-4">Réserver ce service →</a>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-sm hover:border-slate-400 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xl mb-5">
                  📋
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Supervision & Direction de Terrain</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Un régisseur expérimenté est désigné pour superviser l'ensemble du personnel sur place, assurer le respect du timing et régler tout imprévu logistique.
                </p>
                <ul className="text-xs text-slate-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">✓ Briefing préalable complet</li>
                  <li className="flex items-center gap-2">✓ Contrôle du respect des horaires</li>
                  <li className="flex items-center gap-2">✓ Rapport de fin d'événement</li>
                </ul>
              </div>
              <a href="#devis" className="text-xs font-bold text-slate-900 underline underline-offset-4">Réserver ce service →</a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VRAIES RÉALISATIONS SUR LE TERRAIN (AUCUN FAUX NOM D'INDIVIDU) */}
      <section id="realisations" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="pill-badge bg-slate-100 text-slate-800 border-slate-200 mb-2">Sur le Terrain</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Nos Interventions Événementielles en Images
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              Des interventions réelles, réussies et reconnues sur les plus grands rendez-vous de la capitale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REAL_EVENTS.map(event => (
              <div 
                key={event.id}
                className="agency-card cursor-pointer group flex flex-col justify-between"
                onClick={() => setSelectedEvent(event)}
              >
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {event.tags.map((tag, idx) => (
                        <span key={idx} className="bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      {event.role}
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-950 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 group-hover:underline">Voir les photos du reportage</span>
                  <span className="text-sm text-slate-400 group-hover:text-slate-900 transition-colors">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. L'AGENCE & FONDATRICE ALISSA HILAIRE */}
      <section id="agence" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Real Founder Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
                <img 
                  src="assets/img/real/pure-elegance-139.jpg" 
                  alt="Alissa Hilaire - Fondatrice de Pure Elegance Agency"
                  className="w-full h-[480px] object-cover object-top"
                />
                <div className="p-4 bg-white border-t border-slate-200">
                  <div className="font-extrabold text-slate-950 text-base">Alissa Hilaire</div>
                  <div className="text-xs text-slate-600 font-medium">Fondatrice & Directrice Générale</div>
                </div>
              </div>
            </div>

            {/* Agency Story */}
            <div className="lg:col-span-7 space-y-6">
              <div className="pill-badge bg-white text-slate-800 border-slate-300">Notre Histoire</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                L'ambition d'un accueil d'exception pour chaque grand événement.
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Fondée le <strong>29 octobre 2024 par Alissa Hilaire</strong>, Pure Elegance Agency est née d'un constat évident : le succès et le standing d'un événement dépendent avant tout de l'accueil réservé à ses invités dès les premières secondes.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                En seulement deux années d'activité soutenue, l'agence s'est forgée une réputation d'excellence auprès des promoteurs culturels, des marques de référence (*Prestige, Casami, Paryaj Lakay*) et des organisateurs de grands festivals (*Burger Fest, Brunch SOL, Akuna*).
              </p>

              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm text-xs text-slate-800 space-y-2">
                <div className="font-bold text-sm text-slate-950 flex items-center gap-2">
                  <span>📰</span>
                  <span>Distinction Médiatique (Bèlide Magazine)</span>
                </div>
                <p className="italic text-slate-600">
                  « Pure Elegance Agency s'impose désormais comme une référence incontournable de l'événementiel d'envergure, alliant la grâce naturelle à un professionnalisme rigoureux. »
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FORMULAIRE & CALCULATEUR DE DEVIS (DIRECT WHATSAPP) */}
      <section id="devis" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="pill-badge bg-slate-100 text-slate-800 border-slate-200 mb-2">Tarification & Disponibilités</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Demandez un Devis pour Votre Événement
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Précisez vos besoins : vous recevrez une confirmation officielle et un devis adapté sous 24h.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
            <form onSubmit={sendDevisWhatsApp} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Votre Nom & Entreprise *</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="Ex: Jean Dupont (Société XYZ)" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Téléphone / WhatsApp *</label>
                  <input 
                    required 
                    type="tel" 
                    placeholder="+509 XXXX-XXXX" 
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Type d'Événement</label>
                  <select 
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
                  >
                    <option>Festival / Grand Public</option>
                    <option>Gala VIP & Soirée d'Affaires</option>
                    <option>Lancement de Produit / Marque</option>
                    <option>Conférence & Séminaire B2B</option>
                    <option>Réception Privée / Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Date Prévue</label>
                  <input 
                    type="date" 
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Lieu / Ville</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Port-au-Prince / Pétion-Ville" 
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900" 
                  />
                </div>
              </div>

              {/* Sliders for staff volume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-800">Nombre d'hôtesses requises :</span>
                    <span className="text-base font-extrabold text-slate-950">{hostCount} hôtesses</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="20" 
                    value={hostCount} 
                    onChange={(e) => setHostCount(parseInt(e.target.value))}
                    className="w-full accent-slate-900 cursor-pointer" 
                  />
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-800">Durée de la mission :</span>
                    <span className="text-base font-extrabold text-slate-950">{duration} heures</span>
                  </div>
                  <input 
                    type="range" 
                    min="3" 
                    max="12" 
                    value={duration} 
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full accent-slate-900 cursor-pointer" 
                  />
                </div>
              </div>

              {/* Options */}
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center space-x-2 text-xs font-bold text-slate-800 cursor-pointer bg-white px-3 py-2 rounded-lg border border-slate-200">
                  <input 
                    type="checkbox" 
                    checked={optUniform} 
                    onChange={(e) => setOptUniform(e.target.checked)} 
                    className="accent-slate-900 w-4 h-4" 
                  />
                  <span>Uniformes harmonisés inclus</span>
                </label>
                <label className="flex items-center space-x-2 text-xs font-bold text-slate-800 cursor-pointer bg-white px-3 py-2 rounded-lg border border-slate-200">
                  <input 
                    type="checkbox" 
                    checked={optSupervisor} 
                    onChange={(e) => setOptSupervisor(e.target.checked)} 
                    className="accent-slate-900 w-4 h-4" 
                  />
                  <span>Superviseur de terrain dédié</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-slate-950 hover:bg-black text-white font-extrabold text-sm uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Envoyer ma Demande de Devis sur WhatsApp</span>
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 9. MODAL REPORTAGE PHOTOS RÉELLES */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-2xl relative shadow-2xl">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-black p-2 text-2xl font-bold"
            >
              ✕
            </button>

            <div className="mb-6">
              <span className="pill-badge bg-slate-100 text-slate-800 border-slate-200">{selectedEvent.role}</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-2">{selectedEvent.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{selectedEvent.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-slate-200">
                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-64 object-cover" />
              </div>
              {selectedEvent.gallery.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-slate-200">
                  <img src={img} alt="Reportage photo événementiel" className="w-full h-64 object-cover" />
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-lg"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. MODAL RECRUTEMENT / POSTULER COMME HÔTESSE */}
      {isRecruitmentOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-2xl relative shadow-2xl">
            <button 
              onClick={() => setIsRecruitmentOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-black p-2 text-2xl font-bold"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <span className="pill-badge bg-slate-100 text-slate-800 border-slate-200">Rejoindre l'Équipe</span>
              <h2 className="text-2xl font-extrabold text-slate-950 mt-2">Postuler chez Pure Elegance</h2>
              <p className="text-xs text-slate-600 mt-1">
                Vous avez le sens de l'accueil, une présentation soignée et une élocution irréprochable ? Postulez en quelques clics.
              </p>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Votre candidature a bien été préparée !");
                setIsRecruitmentOpen(false);
              }}
              className="space-y-4 text-xs font-semibold"
            >
              <div>
                <label className="block text-slate-800 mb-1">Nom Complet *</label>
                <input required type="text" placeholder="Votre nom et prénom" className="w-full border border-slate-300 p-3 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-900" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-800 mb-1">Numéro WhatsApp *</label>
                  <input required type="tel" placeholder="+509 XXXX-XXXX" className="w-full border border-slate-300 p-3 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-800 mb-1">Ville de Résidence *</label>
                  <input required type="text" placeholder="Ex: Port-au-Prince" className="w-full border border-slate-300 p-3 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-900" />
                </div>
              </div>

              <div>
                <label className="block text-slate-800 mb-1">Lien Instagram *</label>
                <input required type="text" placeholder="@votre_compte" className="w-full border border-slate-300 p-3 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-900" />
              </div>

              <div>
                <label className="block text-slate-800 mb-1">Langues Parlées</label>
                <input type="text" placeholder="Français, Créole, Anglais..." className="w-full border border-slate-300 p-3 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-900" />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-slate-950 hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider rounded-lg shadow-md transition-all mt-4"
              >
                Transmettre ma Candidature
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 11. FOOTER */}
      <footer className="bg-slate-950 text-white py-14 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <img src="favicon.svg" alt="Pure Elegance Agency" className="w-7 h-7 rounded-full" />
                <span className="font-extrabold text-base tracking-tight text-white uppercase">Pure Elegance Agency</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Where elegance becomes a statement.<br />
                Agence d'hôtesses d'accueil VIP et de staffing événementiel haut de gamme.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Prestations</h4>
              <ul className="space-y-1.5 text-slate-400">
                <li><a href="#prestations" className="hover:text-white">Accueil Protocolaire & VIP</a></li>
                <li><a href="#prestations" className="hover:text-white">Staffing Festivals & Salons</a></li>
                <li><a href="#prestations" className="hover:text-white">Ambassadrices de Marque</a></li>
                <li><a href="#prestations" className="hover:text-white">Supervision de Terrain</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Coordonnées</h4>
              <p className="text-slate-400 leading-relaxed">
                <strong>Direction :</strong> Alissa Hilaire<br />
                <strong>Instagram :</strong> @pure.eleganceagency<br />
                <strong>Email :</strong> contact@pureeleganceagency.com<br />
                <strong>Zone :</strong> Port-au-Prince & International
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Recrutement</h4>
              <p className="text-slate-400 leading-relaxed mb-3">
                Vous souhaitez intégrer notre équipe d'hôtesses officielles ?
              </p>
              <button onClick={() => setIsRecruitmentOpen(true)} className="text-white font-bold underline underline-offset-4">
                Déposer une candidature →
              </button>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-slate-500 text-xs">
            <div>© 2024 - 2026 Pure Elegance Agency. Tous droits réservés.</div>
            <div className="flex space-x-4 mt-2 sm:mt-0 font-medium">
              <a href="#" className="hover:text-white">Mentions légales</a>
              <a href="#devis" className="hover:text-white">Conditions de réservation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
