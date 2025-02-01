// Language dictionary for translations
const translations = {
  en: {
    "school-name": "ATRASID FOUNDATION",
    "home": "Home",
    "about-us": "About Us",
    "contact": "Contact",
    "testimonials": "Testimonials",
    "language": "Languages",
    "fr-link": "French",
    "en-link": "English",
    "welcome-message": "Welcome to ATRASID FOUNDATION",
    "welcome-description": "BETTER HEALTH FOR ALL.",
    "mission": "Our Mission",
    "mission-description": "We are committed to providing an inclusive and equitable learning environment for all students.",
    "about-description": "ATRASID FOUNDATION is dedicated to academic excellence and personal development for students.",
    "engagement": "Our commitment to continuous improvement and monitoring industry trends allows us to deliver cutting-edge solutions and stay at the forefront of technological advancements.",
    "classes-title": "Our Classes",
    "classes-description": "We offer courses for levels ranging from first grade to sixth grade.",
    "activities-title": "Extracurricular Activities",
    "activities-description": "Activities such as sports, music, and arts enrich the school experience.",
    "resources-title": "About us",
    "calendar": "Programs",
    "rules": "Internal Regulations",
    "admissions": "Members",
    
    // Newly Added Translations
    "essential-domains": "We work in three essential areas:",
    "health-education": "Health Education",
    "nutrition": "Nutrition",
    "physical-activities": "Physical Activities",

    "health-education-title": "Health Education",
    "health-education-description": "To reduce the incidence of chronic diseases (cardiovascular diseases, cancer, etc.) through:",
    "health-awareness": "Raising awareness among the population about good personal, family, and community hygiene through families, schools, and churches;",
    "youth-training": "Training young people on the impact of tobacco on their bodies and the behaviors they should adopt in response;",
    "anti-tobacco-campaign": "Anti-tobacco campaign.",
  },
  fr: {
    "school-name": "FONDATION ATRASID",
    "home": "Accueil",
    "about-us": "À Propos",
    "contact": "Contact",
    "testimonials": "Témoignages",
    "language": "Langues",
    "fr-link": "Français",
    "en-link": "English",
    "welcome-message": "Bienvenue à la FONDATION ATRASID",
    "welcome-description": "MEILLEURE SANTE POUR TOUS",
    "mission": "Notre Mission",
    "mission-description": "Nous nous engageons à fournir un environnement d'apprentissage inclusif et équitable pour tous les élèves.",
    "about-description": "FONDATION ATRASID est dédiée à l'excellence académique et au développement personnel des élèves.",
    "engagement": "Notre engagement envers l'amélioration continue et la veille des tendances de l'industrie nous permet de fournir des solutions de pointe et de rester à la pointe des avancées technologiques.",
    "classes-title": "Nos Classes",
    "classes-description": "Nous offrons des cours pour les niveaux allant de la première à la sixième année.",
    "activities-title": "Activités Extrascolaires",
    "activities-description": "Des activités comme le sport, la musique et les arts enrichissent l'expérience scolaire.",
    "resources-title": "Qui nous sommes",
    "calendar": "Programmes",
    "rules": "Règlement Intérieur",
    "admissions": "Membres",
    
    // Newly Added Translations
    "essential-domains": "Nous œuvrons dans trois domaines essentiels :",
    "health-education": "Éducation à la santé",
    "nutrition": "La nutrition",
    "physical-activities": "Les activités physiques",

    "health-education-title": "Éducation à la Santé",
    "health-education-description": "Afin de réduire l’incidence des maladies chroniques (cardiovasculaires, cancer, etc.) par :",
    "health-awareness": "La sensibilisation de la population sur la bonne hygiène personnelle, familiale et communautaire à travers les familles, les écoles et les Églises ;",
    "youth-training": "La formation des jeunes sur l’impact du tabac sur leur organisme et le comportement qu’ils doivent adopter face à cela ;",
    "anti-tobacco-campaign": "La campagne anti-tabac.",
  },
};

// Function to update the language of all elements with a data-lang attribute
function updateLanguage(language) {
  const elements = document.querySelectorAll("[data-lang]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-lang");
    if (translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });
}

// Event listeners for the language switcher dropdown
document.querySelector("[data-lang='fr-link']").addEventListener("click", (e) => {
  e.preventDefault();
  updateLanguage("fr");
});

document.querySelector("[data-lang='en-link']").addEventListener("click", (e) => {
  e.preventDefault();
  updateLanguage("en");
});
