const {
  useState
} = React;

// Real Event Case Studies & Team Interventions (100% Authentic, No Fake Personal Names)
const REAL_EVENTS = [{
  id: "event-01",
  title: "Burger Fest",
  role: "Accueil VIP, Staffing & Espace Partenaires",
  description: "Coordination complète d'une équipe de 15 hôtesses d'accueil sur l'un des plus grands festivals culinaires et musicaux du pays. Gestion des accès VIP, accueil des sponsors et distribution officielle.",
  image: "assets/img/real/pure-elegance-61.jpg",
  gallery: ["assets/img/real/pure-elegance-63.jpg", "assets/img/real/pure-elegance-65.jpg", "assets/img/real/pure-elegance-67.jpg"],
  tags: ["Festival Majeur", "15 Hôtesses", "Espace Partenaires"]
}, {
  id: "event-02",
  title: "Akuna Experience",
  role: "Accueil Protocolaire & Red Carpet",
  description: "Prestation haut de gamme pour une soirée exclusive : gestion du tapis rouge, orientation des personnalités, contrôle strict de la guest-list et service de loge d'honneur.",
  image: "assets/img/real/pure-elegance-14.jpg",
  gallery: ["assets/img/real/pure-elegance-10.jpg", "assets/img/real/pure-elegance-16.jpg"],
  tags: ["Soirée VIP", "Tapis Rouge", "Protocole"]
}, {
  id: "event-03",
  title: "Brunch SOL",
  role: "Hospitality Lounge & Tenues Thématiques",
  description: "Ambiance chic et solaire : hôtesses en tenues blanches coordonnées, service d'accueil décontracté de prestige, orientation des convives et tenue du photocall.",
  image: "assets/img/real/pure-elegance-89.jpg",
  gallery: ["assets/img/real/pure-elegance-87.jpg", "assets/img/real/pure-elegance-85.jpg"],
  tags: ["Brunch Chic", "Tenues Blanches", "Hospitality"]
}, {
  id: "event-04",
  title: "Green Vibe Festival",
  role: "Brand Ambassadors & Animation Événementielle",
  description: "Déploiement d'ambassadrices de marque pour dynamiser les espaces scéniques, guider le public vers les zones lounges et représenter les partenaires officiels.",
  image: "assets/img/real/pure-elegance-79.jpg",
  gallery: ["assets/img/real/pure-elegance-77.jpg", "assets/img/real/pure-elegance-81.jpg"],
  tags: ["Festival Plein Air", "Animation", "Brand Activation"]
}, {
  id: "event-05",
  title: "Activations Prestige & Casami",
  role: "Lancements de Produits & Réceptions Privées",
  description: "Représentation d'entreprises : hôtesses et hôtes en tenue de soirée pour le lancement de nouvelles gammes, service de cocktail et tenue des stands corporate.",
  image: "assets/img/real/pure-elegance-71.jpg",
  gallery: ["assets/img/real/pure-elegance-69.jpg", "assets/img/real/pure-elegance-73.jpg"],
  tags: ["Lancement de Marque", "Soirée Corporate", "Prestige & Casami"]
}, {
  id: "event-06",
  title: "Deux Ans de Pure Elegance",
  role: "Photoshoot Officiel & Célébration (Bèlide Mag)",
  description: "Photoshoot anniversaire célébrant deux années de raffinement et de leadership dans le secteur événementiel, couvert en exclusivité par la revue culturelle Bèlide Magazine.",
  image: "assets/img/real/pure-elegance-22.jpg",
  gallery: ["assets/img/real/pure-elegance-20.jpg", "assets/img/real/pure-elegance-108.jpg"],
  tags: ["Anniversaire", "Revue de Presse", "Bèlide Magazine"]
}];
const CLIENT_LOGOS = ["BURGER FEST", "BRUNCH SOL", "AKUNA", "GREEN VIBE", "PRESTIGE", "CASAMI", "PARYAJ LAKAY", "BÈLIDE MAGAZINE"];
function App() {
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
  const sendDevisWhatsApp = e => {
    e.preventDefault();
    const msg = `*DEMANDE DE DEVIS OFFICIEL - PURE ELEGANCE AGENCY*\n\n` + `👤 *Organisateur :* ${clientName || "Non spécifié"}\n` + `📞 *Contact :* ${clientPhone || "Non spécifié"}\n` + `📅 *Date :* ${eventDate || "À préciser"}\n` + `📍 *Lieu :* ${eventLocation || "À préciser"}\n` + `🎪 *Type d'événement :* ${eventType}\n` + `👥 *Effectif souhaité :* ${hostCount} hôtesse(s) / hôte(s)\n` + `⏱️ *Durée :* ${duration} heures\n` + `👗 *Uniformes coordonnés :* ${optUniform ? "Oui" : "Non"}\n` + `📋 *Superviseur dédié :* ${optSupervisor ? "Oui" : "Non"}\n\n` + `Merci de me contacter avec votre proposition tarifaire.`;
    window.open(`https://wa.me/50937000000?text=${encodeURIComponent(msg)}`, '_blank');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-slate-900 selection:text-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900 text-white text-xs font-semibold py-2.5 px-4 tracking-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-emerald-400"
  }), /*#__PURE__*/React.createElement("span", null, "Pure Elegance Agency \u2022 Agence d'Accueil Protocolaire & Staffing \xC9v\xE9nementiel")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-5 text-slate-300"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://instagram.com/pure.eleganceagency",
    target: "_blank",
    rel: "noreferrer",
    className: "hover:text-white transition-colors"
  }, "Instagram @pure.eleganceagency"), /*#__PURE__*/React.createElement("span", null, "\u2022"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsRecruitmentOpen(true),
    className: "text-white hover:underline underline-offset-4 font-bold"
  }, "Postuler comme H\xF4tesse")))), /*#__PURE__*/React.createElement("header", {
    className: "solid-navbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between h-20"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: "favicon.svg",
    alt: "Pure Elegance Agency Logo",
    className: "w-10 h-10 rounded-full border border-slate-200 shadow-sm"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl sm:text-2xl font-bold tracking-tight text-slate-900 uppercase"
  }, "Pure Elegance"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] tracking-[0.25em] text-slate-500 font-bold uppercase -mt-1"
  }, "Agency"))), /*#__PURE__*/React.createElement("nav", {
    className: "hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-700"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#prestations",
    className: "hover:text-slate-950 transition-colors"
  }, "Prestations"), /*#__PURE__*/React.createElement("a", {
    href: "#realisations",
    className: "hover:text-slate-950 transition-colors"
  }, "Nos R\xE9alisations"), /*#__PURE__*/React.createElement("a", {
    href: "#agence",
    className: "hover:text-slate-950 transition-colors"
  }, "L'Agence & Fondatrice"), /*#__PURE__*/React.createElement("a", {
    href: "#devis",
    className: "hover:text-slate-950 transition-colors"
  }, "Devis en Ligne"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsRecruitmentOpen(true),
    className: "hover:text-slate-950 transition-colors"
  }, "Recrutement")), /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#devis",
    className: "bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg shadow-sm transition-all"
  }, "Demander un Devis")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMobileMenuOpen(!mobileMenuOpen),
    className: "lg:hidden p-2 text-slate-800 focus:outline-none"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-bold"
  }, "\u2630")))), mobileMenuOpen && /*#__PURE__*/React.createElement("div", {
    className: "lg:hidden bg-white border-t border-slate-200 px-6 py-5 space-y-4 text-sm font-semibold text-slate-800"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#prestations",
    onClick: () => setMobileMenuOpen(false),
    className: "block py-1"
  }, "Nos Prestations"), /*#__PURE__*/React.createElement("a", {
    href: "#realisations",
    onClick: () => setMobileMenuOpen(false),
    className: "block py-1"
  }, "Nos R\xE9alisations"), /*#__PURE__*/React.createElement("a", {
    href: "#agence",
    onClick: () => setMobileMenuOpen(false),
    className: "block py-1"
  }, "L'Agence & Fondatrice"), /*#__PURE__*/React.createElement("a", {
    href: "#devis",
    onClick: () => setMobileMenuOpen(false),
    className: "block py-1"
  }, "Simulateur de Devis"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setIsRecruitmentOpen(true);
      setMobileMenuOpen(false);
    },
    className: "block w-full text-left py-1 text-slate-950 font-bold"
  }, "Postuler comme H\xF4tesse"), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-slate-200"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#devis",
    onClick: () => setMobileMenuOpen(false),
    className: "w-full block bg-slate-900 text-white text-center py-3 rounded-lg font-bold"
  }, "Demander un Devis WhatsApp")))), /*#__PURE__*/React.createElement("section", {
    className: "bg-slate-50 border-b border-slate-200 py-16 sm:py-24"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-7 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pill-badge bg-white text-slate-800 border-slate-300"
  }, "Staffing \xC9v\xE9nementiel & Accueil VIP"), /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15]"
  }, "L'art de sublimer chaque \xE9v\xE9nement avec ", /*#__PURE__*/React.createElement("span", {
    className: "text-slate-900 underline decoration-slate-400 underline-offset-8"
  }, "gr\xE2ce et rigueur"), "."), /*#__PURE__*/React.createElement("p", {
    className: "text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-normal"
  }, "Pure Elegance Agency met \xE0 votre disposition des ", /*#__PURE__*/React.createElement("strong", null, "h\xF4tesses d'accueil qualifi\xE9es, du personnel de protocole et des ambassadrices de marque"), " pour vos r\xE9ceptions d'affaires, d\xEEners de gala, salons officiels et festivals majeurs."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#devis",
    className: "bg-slate-950 hover:bg-black text-white font-bold text-sm px-7 py-4 rounded-lg text-center shadow-md transition-all"
  }, "Calculer mon Devis en Ligne"), /*#__PURE__*/React.createElement("a", {
    href: "#realisations",
    className: "bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold text-sm px-7 py-4 rounded-lg text-center transition-all"
  }, "Voir nos R\xE9alisations R\xE9elles")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-4 pt-6 border-t border-slate-200"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl sm:text-3xl font-extrabold text-slate-950"
  }, "+50"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-600 font-medium"
  }, "Grands \xC9v\xE9nements R\xE9ussis")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl sm:text-3xl font-extrabold text-slate-950"
  }, "100%"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-600 font-medium"
  }, "Formation Protocolaire")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl sm:text-3xl font-extrabold text-slate-950"
  }, "24/7"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-600 font-medium"
  }, "Supervision de Terrain")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/img/real/pure-elegance-61.jpg",
    alt: "\xC9quipe Pure Elegance Agency en tenue d'accueil officielle",
    className: "w-full h-[460px] object-cover object-top"
  }), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-white border-t border-slate-100 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-sm text-slate-900"
  }, "\xC9quipe Officielle Pure Elegance"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-500"
  }, "Uniformes harmonis\xE9s & pr\xE9sentation de prestige")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded"
  }, "V\xE9rifi\xE9"))))))), /*#__PURE__*/React.createElement("section", {
    className: "bg-white border-b border-slate-200 py-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold uppercase tracking-widest text-slate-500 mb-6"
  }, "Ils nous font confiance pour leurs plus grands rendez-vous"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-center gap-6 sm:gap-10"
  }, CLIENT_LOGOS.map((name, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "px-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs sm:text-sm font-extrabold text-slate-800 tracking-wider"
  }, name))))), /*#__PURE__*/React.createElement("section", {
    id: "prestations",
    className: "py-20 bg-slate-50 border-b border-slate-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center max-w-3xl mx-auto mb-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pill-badge bg-white text-slate-800 border-slate-200 mb-3"
  }, "Nos Services"), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight"
  }, "Des Prestations Compl\xE8tes pour Tout Type d'\xC9v\xE9nement"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600 text-sm sm:text-base mt-3"
  }, "Chaque \xE9v\xE9nement requiert un savoir-faire sp\xE9cifique. Nous s\xE9lectionnons, pr\xE9parons et coordonnons nos \xE9quipes selon vos exigences de protocole et d'image.")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-7 rounded-xl border border-slate-200 shadow-sm hover:border-slate-400 transition-all flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xl mb-5"
  }, "\uD83D\uDC51"), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-slate-950 mb-2"
  }, "H\xF4tesses d'Accueil VIP & Protocole"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 leading-relaxed mb-4"
  }, "Salons d'affaires, r\xE9ceptions diplomatiques, d\xEEners de gala. Accueil personnalis\xE9 des d\xE9l\xE9gations, v\xE9rification des listes, remise des kits et orientation fluide."), /*#__PURE__*/React.createElement("ul", {
    className: "text-xs text-slate-700 space-y-2 mb-6"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, "\u2713 \xC9locution soign\xE9e (FR, CR, EN)"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, "\u2713 Gestion vestiaire & badges"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, "\u2713 Posture noble et discr\xE9tion"))), /*#__PURE__*/React.createElement("a", {
    href: "#devis",
    className: "text-xs font-bold text-slate-900 underline underline-offset-4"
  }, "R\xE9server ce service \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-7 rounded-xl border border-slate-200 shadow-sm hover:border-slate-400 transition-all flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xl mb-5"
  }, "\uD83C\uDFAA"), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-slate-950 mb-2"
  }, "Staffing Festivals & \xC9v\xE9nements"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 leading-relaxed mb-4"
  }, "Pour les \xE9v\xE9nements grand public (Burger Fest, Brunch SOL, Green Vibe). \xC9quipes dynamiques, gestion de la foule \xE0 l'entr\xE9e et accueil des loges partenaires."), /*#__PURE__*/React.createElement("ul", {
    className: "text-xs text-slate-700 space-y-2 mb-6"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, "\u2713 \xC9quipes de 5 \xE0 20+ h\xF4tesses"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, "\u2713 Tenues harmonis\xE9es & soign\xE9es"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, "\u2713 Gestion efficace des flux"))), /*#__PURE__*/React.createElement("a", {
    href: "#devis",
    className: "text-xs font-bold text-slate-900 underline underline-offset-4"
  }, "R\xE9server ce service \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-7 rounded-xl border border-slate-200 shadow-sm hover:border-slate-400 transition-all flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xl mb-5"
  }, "\u2728"), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-slate-950 mb-2"
  }, "Brand Ambassadors & Marques"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 leading-relaxed mb-4"
  }, "Lancements de produits et soir\xE9es de marque (Prestige, Casami, Paryaj Lakay). Pr\xE9sentation de vos produits, animation de photocall et valorisation de votre image."), /*#__PURE__*/React.createElement("ul", {
    className: "text-xs text-slate-700 space-y-2 mb-6"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, "\u2713 Distribution d'\xE9chantillons"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, "\u2713 Repr\xE9sentation valorisante"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, "\u2713 Sourire et proactivit\xE9"))), /*#__PURE__*/React.createElement("a", {
    href: "#devis",
    className: "text-xs font-bold text-slate-900 underline underline-offset-4"
  }, "R\xE9server ce service \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white p-7 rounded-xl border border-slate-200 shadow-sm hover:border-slate-400 transition-all flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xl mb-5"
  }, "\uD83D\uDCCB"), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-slate-950 mb-2"
  }, "Supervision & Direction de Terrain"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 leading-relaxed mb-4"
  }, "Un r\xE9gisseur exp\xE9riment\xE9 est d\xE9sign\xE9 pour superviser l'ensemble du personnel sur place, assurer le respect du timing et r\xE9gler tout impr\xE9vu logistique."), /*#__PURE__*/React.createElement("ul", {
    className: "text-xs text-slate-700 space-y-2 mb-6"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, "\u2713 Briefing pr\xE9alable complet"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, "\u2713 Contr\xF4le du respect des horaires"), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, "\u2713 Rapport de fin d'\xE9v\xE9nement"))), /*#__PURE__*/React.createElement("a", {
    href: "#devis",
    className: "text-xs font-bold text-slate-900 underline underline-offset-4"
  }, "R\xE9server ce service \u2192"))))), /*#__PURE__*/React.createElement("section", {
    id: "realisations",
    className: "py-20 bg-white border-b border-slate-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "pill-badge bg-slate-100 text-slate-800 border-slate-200 mb-2"
  }, "Sur le Terrain"), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight"
  }, "Nos Interventions \xC9v\xE9nementielles en Images")), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 max-w-md"
  }, "Des interventions r\xE9elles, r\xE9ussies et reconnues sur les plus grands rendez-vous de la capitale.")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  }, REAL_EVENTS.map(event => /*#__PURE__*/React.createElement("div", {
    key: event.id,
    className: "agency-card cursor-pointer group flex flex-col justify-between",
    onClick: () => setSelectedEvent(event)
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "relative aspect-[16/11] overflow-hidden bg-slate-100"
  }, /*#__PURE__*/React.createElement("img", {
    src: event.image,
    alt: event.title,
    className: "w-full h-full object-cover"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-3 left-3 flex flex-wrap gap-1"
  }, event.tags.map((tag, idx) => /*#__PURE__*/React.createElement("span", {
    key: idx,
    className: "bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded"
  }, tag)))), /*#__PURE__*/React.createElement("div", {
    className: "p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-500 mb-1"
  }, event.role), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-extrabold text-slate-950 mb-2"
  }, event.title), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 leading-relaxed font-normal"
  }, event.description))), /*#__PURE__*/React.createElement("div", {
    className: "px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-900 group-hover:underline"
  }, "Voir les photos du reportage"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-slate-400 group-hover:text-slate-900 transition-colors"
  }, "\u2192"))))))), /*#__PURE__*/React.createElement("section", {
    id: "agence",
    className: "py-20 bg-slate-50 border-b border-slate-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/img/real/pure-elegance-139.jpg",
    alt: "Alissa Hilaire - Fondatrice de Pure Elegance Agency",
    className: "w-full h-[480px] object-cover object-top"
  }), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-white border-t border-slate-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-extrabold text-slate-950 text-base"
  }, "Alissa Hilaire"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-600 font-medium"
  }, "Fondatrice & Directrice G\xE9n\xE9rale")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-7 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pill-badge bg-white text-slate-800 border-slate-300"
  }, "Notre Histoire"), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight"
  }, "L'ambition d'un accueil d'exception pour chaque grand \xE9v\xE9nement."), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-slate-700 leading-relaxed font-normal"
  }, "Fond\xE9e le ", /*#__PURE__*/React.createElement("strong", null, "29 octobre 2024 par Alissa Hilaire"), ", Pure Elegance Agency est n\xE9e d'un constat \xE9vident : le succ\xE8s et le standing d'un \xE9v\xE9nement d\xE9pendent avant tout de l'accueil r\xE9serv\xE9 \xE0 ses invit\xE9s d\xE8s les premi\xE8res secondes."), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-slate-700 leading-relaxed font-normal"
  }, "En seulement deux ann\xE9es d'activit\xE9 soutenue, l'agence s'est forg\xE9e une r\xE9putation d'excellence aupr\xE8s des promoteurs culturels, des marques de r\xE9f\xE9rence (*Prestige, Casami, Paryaj Lakay*) et des organisateurs de grands festivals (*Burger Fest, Brunch SOL, Akuna*)."), /*#__PURE__*/React.createElement("div", {
    className: "p-5 bg-white rounded-xl border border-slate-200 shadow-sm text-xs text-slate-800 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-sm text-slate-950 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCF0"), /*#__PURE__*/React.createElement("span", null, "Distinction M\xE9diatique (B\xE8lide Magazine)")), /*#__PURE__*/React.createElement("p", {
    className: "italic text-slate-600"
  }, "\xAB Pure Elegance Agency s'impose d\xE9sormais comme une r\xE9f\xE9rence incontournable de l'\xE9v\xE9nementiel d'envergure, alliant la gr\xE2ce naturelle \xE0 un professionnalisme rigoureux. \xBB")))))), /*#__PURE__*/React.createElement("section", {
    id: "devis",
    className: "py-20 bg-white border-b border-slate-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pill-badge bg-slate-100 text-slate-800 border-slate-200 mb-2"
  }, "Tarification & Disponibilit\xE9s"), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight"
  }, "Demandez un Devis pour Votre \xC9v\xE9nement"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600 text-sm mt-2"
  }, "Pr\xE9cisez vos besoins : vous recevrez une confirmation officielle et un devis adapt\xE9 sous 24h.")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: sendDevisWhatsApp,
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1"
  }, "Votre Nom & Entreprise *"), /*#__PURE__*/React.createElement("input", {
    required: true,
    type: "text",
    placeholder: "Ex: Jean Dupont (Soci\xE9t\xE9 XYZ)",
    value: clientName,
    onChange: e => setClientName(e.target.value),
    className: "w-full bg-white border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1"
  }, "T\xE9l\xE9phone / WhatsApp *"), /*#__PURE__*/React.createElement("input", {
    required: true,
    type: "tel",
    placeholder: "+509 XXXX-XXXX",
    value: clientPhone,
    onChange: e => setClientPhone(e.target.value),
    className: "w-full bg-white border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1"
  }, "Type d'\xC9v\xE9nement"), /*#__PURE__*/React.createElement("select", {
    value: eventType,
    onChange: e => setEventType(e.target.value),
    className: "w-full bg-white border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
  }, /*#__PURE__*/React.createElement("option", null, "Festival / Grand Public"), /*#__PURE__*/React.createElement("option", null, "Gala VIP & Soir\xE9e d'Affaires"), /*#__PURE__*/React.createElement("option", null, "Lancement de Produit / Marque"), /*#__PURE__*/React.createElement("option", null, "Conf\xE9rence & S\xE9minaire B2B"), /*#__PURE__*/React.createElement("option", null, "R\xE9ception Priv\xE9e / Autre"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1"
  }, "Date Pr\xE9vue"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: eventDate,
    onChange: e => setEventDate(e.target.value),
    className: "w-full bg-white border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1"
  }, "Lieu / Ville"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Ex: Port-au-Prince / P\xE9tion-Ville",
    value: eventLocation,
    onChange: e => setEventLocation(e.target.value),
    className: "w-full bg-white border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-white rounded-xl border border-slate-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-800"
  }, "Nombre d'h\xF4tesses requises :"), /*#__PURE__*/React.createElement("span", {
    className: "text-base font-extrabold text-slate-950"
  }, hostCount, " h\xF4tesses")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "2",
    max: "20",
    value: hostCount,
    onChange: e => setHostCount(parseInt(e.target.value)),
    className: "w-full accent-slate-900 cursor-pointer"
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-white rounded-xl border border-slate-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-800"
  }, "Dur\xE9e de la mission :"), /*#__PURE__*/React.createElement("span", {
    className: "text-base font-extrabold text-slate-950"
  }, duration, " heures")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "3",
    max: "12",
    value: duration,
    onChange: e => setDuration(parseInt(e.target.value)),
    className: "w-full accent-slate-900 cursor-pointer"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-4 pt-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center space-x-2 text-xs font-bold text-slate-800 cursor-pointer bg-white px-3 py-2 rounded-lg border border-slate-200"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: optUniform,
    onChange: e => setOptUniform(e.target.checked),
    className: "accent-slate-900 w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Uniformes harmonis\xE9s inclus")), /*#__PURE__*/React.createElement("label", {
    className: "flex items-center space-x-2 text-xs font-bold text-slate-800 cursor-pointer bg-white px-3 py-2 rounded-lg border border-slate-200"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: optSupervisor,
    onChange: e => setOptSupervisor(e.target.checked),
    className: "accent-slate-900 w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, "Superviseur de terrain d\xE9di\xE9"))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full py-4 bg-slate-950 hover:bg-black text-white font-extrabold text-sm uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "Envoyer ma Demande de Devis sur WhatsApp"), /*#__PURE__*/React.createElement("span", null, "\u2192")))))), selectedEvent && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-2xl relative shadow-2xl"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedEvent(null),
    className: "absolute top-4 right-4 text-slate-500 hover:text-black p-2 text-2xl font-bold"
  }, "\u2715"), /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill-badge bg-slate-100 text-slate-800 border-slate-200"
  }, selectedEvent.role), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl sm:text-3xl font-extrabold text-slate-950 mt-2"
  }, selectedEvent.title), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed"
  }, selectedEvent.description)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-xl overflow-hidden border border-slate-200"
  }, /*#__PURE__*/React.createElement("img", {
    src: selectedEvent.image,
    alt: selectedEvent.title,
    className: "w-full h-64 object-cover"
  })), selectedEvent.gallery.map((img, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "rounded-xl overflow-hidden border border-slate-200"
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: "Reportage photo \xE9v\xE9nementiel",
    className: "w-full h-64 object-cover"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "mt-6 pt-4 border-t border-slate-200 flex justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedEvent(null),
    className: "px-6 py-2.5 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-lg"
  }, "Fermer")))), isRecruitmentOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-2xl relative shadow-2xl"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsRecruitmentOpen(false),
    className: "absolute top-4 right-4 text-slate-500 hover:text-black p-2 text-2xl font-bold"
  }, "\u2715"), /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill-badge bg-slate-100 text-slate-800 border-slate-200"
  }, "Rejoindre l'\xC9quipe"), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-extrabold text-slate-950 mt-2"
  }, "Postuler chez Pure Elegance"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 mt-1"
  }, "Vous avez le sens de l'accueil, une pr\xE9sentation soign\xE9e et une \xE9locution irr\xE9prochable ? Postulez en quelques clics.")), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      alert("Votre candidature a bien été préparée !");
      setIsRecruitmentOpen(false);
    },
    className: "space-y-4 text-xs font-semibold"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-slate-800 mb-1"
  }, "Nom Complet *"), /*#__PURE__*/React.createElement("input", {
    required: true,
    type: "text",
    placeholder: "Votre nom et pr\xE9nom",
    className: "w-full border border-slate-300 p-3 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-900"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-slate-800 mb-1"
  }, "Num\xE9ro WhatsApp *"), /*#__PURE__*/React.createElement("input", {
    required: true,
    type: "tel",
    placeholder: "+509 XXXX-XXXX",
    className: "w-full border border-slate-300 p-3 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-900"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-slate-800 mb-1"
  }, "Ville de R\xE9sidence *"), /*#__PURE__*/React.createElement("input", {
    required: true,
    type: "text",
    placeholder: "Ex: Port-au-Prince",
    className: "w-full border border-slate-300 p-3 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-900"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-slate-800 mb-1"
  }, "Lien Instagram *"), /*#__PURE__*/React.createElement("input", {
    required: true,
    type: "text",
    placeholder: "@votre_compte",
    className: "w-full border border-slate-300 p-3 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-900"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-slate-800 mb-1"
  }, "Langues Parl\xE9es"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Fran\xE7ais, Cr\xE9ole, Anglais...",
    className: "w-full border border-slate-300 p-3 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-900"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full py-4 bg-slate-950 hover:bg-black text-white text-xs font-extrabold uppercase tracking-wider rounded-lg shadow-md transition-all mt-4"
  }, "Transmettre ma Candidature")))), /*#__PURE__*/React.createElement("footer", {
    className: "bg-slate-950 text-white py-14 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-4 gap-8 mb-10"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 mb-2"
  }, /*#__PURE__*/React.createElement("img", {
    src: "favicon.svg",
    alt: "Pure Elegance Agency",
    className: "w-7 h-7 rounded-full"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-base tracking-tight text-white uppercase"
  }, "Pure Elegance Agency")), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 text-xs leading-relaxed"
  }, "Where elegance becomes a statement.", /*#__PURE__*/React.createElement("br", null), "Agence d'h\xF4tesses d'accueil VIP et de staffing \xE9v\xE9nementiel haut de gamme.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-white uppercase tracking-wider mb-3"
  }, "Prestations"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-1.5 text-slate-400"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#prestations",
    className: "hover:text-white"
  }, "Accueil Protocolaire & VIP")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#prestations",
    className: "hover:text-white"
  }, "Staffing Festivals & Salons")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#prestations",
    className: "hover:text-white"
  }, "Ambassadrices de Marque")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#prestations",
    className: "hover:text-white"
  }, "Supervision de Terrain")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-white uppercase tracking-wider mb-3"
  }, "Coordonn\xE9es"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 leading-relaxed"
  }, /*#__PURE__*/React.createElement("strong", null, "Direction :"), " Alissa Hilaire", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, "Instagram :"), " @pure.eleganceagency", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, "Email :"), " contact@pureeleganceagency.com", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("strong", null, "Zone :"), " Port-au-Prince & International")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-white uppercase tracking-wider mb-3"
  }, "Recrutement"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-400 leading-relaxed mb-3"
  }, "Vous souhaitez int\xE9grer notre \xE9quipe d'h\xF4tesses officielles ?"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setIsRecruitmentOpen(true),
    className: "text-white font-bold underline underline-offset-4"
  }, "D\xE9poser une candidature \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-slate-500 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, "\xA9 2024 - 2026 Pure Elegance Agency. Tous droits r\xE9serv\xE9s."), /*#__PURE__*/React.createElement("div", {
    className: "flex space-x-4 mt-2 sm:mt-0 font-medium"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "hover:text-white"
  }, "Mentions l\xE9gales"), /*#__PURE__*/React.createElement("a", {
    href: "#devis",
    className: "hover:text-white"
  }, "Conditions de r\xE9servation"))))));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));