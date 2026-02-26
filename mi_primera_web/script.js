const translations = {
  "nav-inicio": {
    ca: "Inici",
    es: "Inicio",
    en: "Home",
  },
  "nav-cursos": {
    ca: "suggeriments",
    es: "Sugerencias",
    en: "Suggestions",
  },
  "nav-contacto": {
    ca: "Contacte",
    es: "Contacto",
    en: "Contact",
  },
  "main-title": {
    ca: "Mira els nostres cursos i descobreix el futur",
    es: "Mira nuestros cursos y descubre el futuro",
    en: "Check our courses and discover the future",
  },
  "hero-button": {
    ca: "Més cursos",
    es: "Mas cursos",
    en: "More courses",
  },
  "programming-title": {
    ca: "Programació",
    es: "Programación",
    en: "Programming",
  },
  "programming-desc": {
    ca: "Aprèn els fonaments de la programació i desenvolupa aplicacions web modernes amb les tecnologies més demandades del mercat.",
    es: "Aprende los fundamentos de la programación y desarrolla aplicaciones web modernas con las tecnologías más demandadas del mercado.",
    en: "Learn the fundamentals of programming and develop modern web applications with the most in-demand technologies on the market.",
  },
  "ia-title": {
    ca: "Intel·ligència Artificial",
    es: "Inteligencia Artificial",
    en: "Artificial Intelligence",
  },
  "ia-desc": {
    ca: "Domina el món de la IA i aprèn a crear solucions intel·ligents que revolucionaran la teva carrera professional.",
    es: "Domina el mundo de la IA y aprende a crear soluciones inteligentes que revolucionarán tu carrera profesional.",
    en: "Master the world of AI and learn to create intelligent solutions that will revolutionize your professional career.",
  },
  "automation-title": {
    ca: "Automatitzacions",
    es: "Automatizaciones",
    en: "Automations",
  },
  "automation-desc": {
    ca: "Optimitza processos i millora l'eficiència mitjançant automatitzacions que et permetran estalviar temps i recursos.",
    es: "Optimiza procesos y mejora la eficiencia mediante automatizaciones que te permitirán ahorrar tiempo y recursos.",
    en: "Optimize processes and improve efficiency through automations that will allow you to save time and resources.",
  },
  "cta-title": {
    ca: "¿Llest per començar el teu viatge tecnològic?",
    es: "¿Listo para comenzar tu viaje tecnológico?",
    en: "Ready to begin your technological journey?",
  },
  "cta-button": {
    ca: "Inscriu-te ara",
    es: "Inscribirse ahora",
    en: "Sign up now",
  },
  "contact-title": {
    ca: "Contacte",
    es: "Contacto",
    en: "Contact",
  },
  "contact-name": {
    ca: "Nom:",
    es: "Nombre:",
    en: "Name:",
  },
  "contact-email": {
    ca: "Correu Electrònic:",
    es: "Correo Electrónico:",
    en: "Email:",
  },
  "contact-message": {
    ca: "Missatge:",
    es: "Mensaje:",
    en: "Message:",
  },
  "contact-submit": {
    ca: "Enviar",
    es: "Enviar",
    en: "Send",
  },
  "card-view": {
    ca: "Veure curs",
    es: "Ver curso",
    en: "View course",
  },
};

// Cargar idioma guardado al iniciar
window.onload = loadPreference();

document.getElementById("selector-idiomas").addEventListener("change", (e) => {
  setLanguage(e.target.value);
});

function loadPreference() {
  let preferredLang = localStorage.getItem("userLang");
  if (!preferredLang) {
    preferredLang = "es";
  }
  document.getElementById("selector-idiomas").value = preferredLang;
  setLanguage(preferredLang);
}

function savePreference(lang) {
  localStorage.setItem("userLang", lang);
}

function setLanguage(lang) {
  document.documentElement.lang = lang;
  savePreference(lang);

  // Cambiar cada elemento por su ID
  const elementIds = [
    "nav-inicio",
    "nav-cursos",
    "nav-contacto",
    "main-title",
    "hero-button",
    "programming-title",
    "programming-desc",
    "ia-title",
    "ia-desc",
    "automation-title",
    "automation-desc",
    "cta-title",
    "cta-button",
    "contact-title",
    "contact-name",
    "contact-email",
    "contact-message",
    "contact-submit",
  ];

  elementIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element && translations[id] && translations[id][lang]) {
      element.textContent = translations[id][lang];
    }
  });

  document.querySelectorAll(".card-view-btn").forEach((btn) => {
    btn.textContent = translations["card-view"][lang];
  });
}
