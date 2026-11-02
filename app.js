const form = document.querySelector('#match-form');
const jobText = document.querySelector('#job-text');
const skillsText = document.querySelector('#skills-text');
const jobError = document.querySelector('#job-error');
const exampleButton = document.querySelector('#example-button');
const emptyState = document.querySelector('#empty-state');
const results = document.querySelector('#results');
const resultStatus = document.querySelector('#result-status');
const scoreValue = document.querySelector('#score-value');
const scoreRing = document.querySelector('#score-ring');
const scoreMessage = document.querySelector('#score-message');
const matchedList = document.querySelector('#matched-list');
const missingList = document.querySelector('#missing-list');
const matchedCount = document.querySelector('#matched-count');
const missingCount = document.querySelector('#missing-count');
const calculationNote = document.querySelector('#calculation-note');
const languageButtons = document.querySelectorAll('[data-language]');

const translations = {
  es: {
    metaDescription: 'Compara los requisitos de una vacante con tus habilidades técnicas sin enviar datos fuera del navegador.',
    pageDocumentTitle: 'JobMatch Local | Comparador de vacantes y habilidades',
    brandLabel: 'JobMatch Local, ir al contenido principal', languageSelector: 'Seleccionar idioma',
    privacy: 'Tus datos no salen del navegador', eyebrow: 'Herramienta de análisis local',
    pageTitle: 'Compara una vacante con tus habilidades.',
    intro: 'Pega los requisitos, revisa las coincidencias y detecta qué conocimientos conviene reforzar antes de presentar tu candidatura.',
    stepData: '01 · Datos', inputTitle: 'Vacante y perfil', loadExample: 'Cargar ejemplo',
    jobLabel: 'Texto de la vacante', jobHelp: 'Copia la descripción o los requisitos técnicos de la oferta.',
    jobPlaceholder: 'Ej.: Buscamos desarrollador junior con conocimientos de HTML, CSS y JavaScript...',
    skillsLegend: 'Tus habilidades', skillsInstruction: 'Añade una habilidad por línea o sepáralas con comas.',
    skillsHelp: 'Puedes incluir habilidades compuestas, por ejemplo «diseño responsive».',
    clear: 'Limpiar', analyze: 'Analizar compatibilidad', stepResult: '02 · Resultado',
    resultsTitle: 'Compatibilidad orientativa', notAnalyzed: 'Sin analizar',
    emptyState: 'Completa los datos para ver el porcentaje y las habilidades detectadas.',
    scoreLabel: 'Coincidencia de habilidades', matched: 'Coinciden', missing: 'Por desarrollar',
    calculationTitle: 'Cómo se calculó',
    disclaimer: 'Este análisis utiliza coincidencias de texto. Es una orientación inicial y no determina si cumples todos los requisitos de una vacante.',
    footer: 'Creado con HTML, CSS y JavaScript · Análisis 100 % local',
    emptyError: 'Pega el texto de una vacante antes de iniciar el análisis.', complete: 'Análisis completo',
    noMatches: 'No se encontraron coincidencias.', noMissing: 'No se detectaron habilidades pendientes.',
    scoreAria: (score) => `Compatibilidad del ${score} por ciento`,
    detected: (total, matched) => `Se detectaron ${total} habilidades técnicas en la vacante. El porcentaje corresponde a ${matched} coincidencias con tu lista editable.`,
    noneDetected: 'El texto no contiene términos reconocidos por el diccionario actual. Puedes añadirlos a tu lista, pero el resultado seguirá siendo orientativo.',
    messages: {
      none: 'No se detectaron habilidades técnicas conocidas en el texto.',
      high: 'Coincidencia alta: revisa también experiencia, idiomas y condiciones.',
      medium: 'Coincidencia media: tu perfil cubre una parte relevante de la oferta.',
      initial: 'Coincidencia inicial: identifica qué requisitos puedes demostrar o aprender.',
      zero: 'No se detectaron coincidencias con la lista actual de habilidades.'
    },
    skillLabels: {
      html: 'HTML', css: 'CSS', javascript: 'JavaScript', ai: 'Inteligencia artificial', python: 'Python', sql: 'SQL', git: 'Git',
      responsive: 'Diseño responsive', accessibility: 'Accesibilidad web', apis: 'APIs', react: 'React', node: 'Node.js', typescript: 'TypeScript', english: 'Inglés'
    }
  },
  en: {
    metaDescription: 'Compare a job description with your technical skills without sending data outside your browser.',
    pageDocumentTitle: 'JobMatch Local | Job and skills comparison',
    brandLabel: 'JobMatch Local, skip to main content', languageSelector: 'Select language',
    privacy: 'Your data never leaves the browser', eyebrow: 'Local analysis tool',
    pageTitle: 'Compare a job with your skills.',
    intro: 'Paste the requirements, review the matches and identify which skills to strengthen before applying.',
    stepData: '01 · Details', inputTitle: 'Job and profile', loadExample: 'Load example',
    jobLabel: 'Job description', jobHelp: 'Copy the job description or its technical requirements.',
    jobPlaceholder: 'Example: We are looking for a junior developer with HTML, CSS and JavaScript skills...',
    skillsLegend: 'Your skills', skillsInstruction: 'Add one skill per line or separate them with commas.',
    skillsHelp: 'You can include compound skills, for example “responsive design”.',
    clear: 'Clear', analyze: 'Analyze compatibility', stepResult: '02 · Result',
    resultsTitle: 'Estimated compatibility', notAnalyzed: 'Not analyzed',
    emptyState: 'Complete the fields to see the percentage and detected skills.',
    scoreLabel: 'Skills match', matched: 'Matched', missing: 'To develop',
    calculationTitle: 'How it was calculated',
    disclaimer: 'This analysis uses text matching. It is an initial guide and does not determine whether you meet every job requirement.',
    footer: 'Built with HTML, CSS and JavaScript · 100% local analysis',
    emptyError: 'Paste a job description before starting the analysis.', complete: 'Analysis complete',
    noMatches: 'No matching skills were found.', noMissing: 'No missing skills were detected.',
    scoreAria: (score) => `${score} percent compatibility`,
    detected: (total, matched) => `${total} technical skills were detected in the job description. The percentage represents ${matched} matches with your editable skills list.`,
    noneDetected: 'The text contains no terms recognized by the current dictionary. You can extend the dictionary, but the result will remain an estimate.',
    messages: {
      none: 'No known technical skills were detected in the text.',
      high: 'High match: also review experience, language and location requirements.',
      medium: 'Medium match: your profile covers a relevant part of the job.',
      initial: 'Initial match: identify which requirements you can demonstrate or learn.',
      zero: 'No matches were found in your current skills list.'
    },
    skillLabels: {
      html: 'HTML', css: 'CSS', javascript: 'JavaScript', ai: 'Artificial intelligence', python: 'Python', sql: 'SQL', git: 'Git',
      responsive: 'Responsive design', accessibility: 'Web accessibility', apis: 'APIs', react: 'React', node: 'Node.js', typescript: 'TypeScript', english: 'English'
    }
  }
};

const examples = {
  es: {
    vacancy: `Desarrollador/a Front-end Junior — remoto desde España

Buscamos una persona con conocimientos de HTML5, CSS, JavaScript y diseño responsive. Se valorará experiencia con Git, accesibilidad web, consumo de APIs e inteligencia artificial. Conocimientos básicos de SQL y comunicación en equipos remotos serán una ventaja.`,
    skills: ['HTML', 'CSS', 'JavaScript', 'Inteligencia artificial', 'Python', 'SQL']
  },
  en: {
    vacancy: `Junior Front-end Developer — remote from Spain

We are looking for someone with HTML5, CSS, JavaScript and responsive design skills. Experience with Git, web accessibility, APIs and artificial intelligence is valued. Basic SQL knowledge and communication in remote teams are an advantage.`,
    skills: ['HTML', 'CSS', 'JavaScript', 'Artificial intelligence', 'Python', 'SQL']
  }
};

const aliases = {
  html: ['html', 'html5'], css: ['css', 'css3'], javascript: ['javascript', 'java script', 'ecmascript', 'js'],
  ai: ['inteligencia artificial', 'ia', 'artificial intelligence', 'ai'], python: ['python'],
  sql: ['sql', 'base de datos', 'bases de datos', 'database', 'databases'],
  git: ['git', 'github', 'control de versiones', 'version control'],
  responsive: ['diseño responsive', 'diseno responsive', 'responsive design', 'responsive'],
  accessibility: ['accesibilidad web', 'accesibilidad', 'web accessibility', 'accessibility', 'wcag'],
  apis: ['api', 'apis', 'rest', 'fetch'], react: ['react', 'reactjs', 'react.js'],
  node: ['node', 'nodejs', 'node.js'], typescript: ['typescript'], english: ['ingles', 'inglés', 'english']
};

let currentLanguage = getStoredLanguage();
let lastAnalysis = null;

function getStoredLanguage() {
  try { return localStorage.getItem('jobmatch-language') === 'en' ? 'en' : 'es'; }
  catch { return 'es'; }
}

function storeLanguage(language) {
  try { localStorage.setItem('jobmatch-language', language); }
  catch { /* The app works even when storage is unavailable. */ }
}

function normalize(value) {
  return value.toLocaleLowerCase(currentLanguage).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9+#.\s-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function containsTerm(text, term) {
  const pattern = new RegExp(`(^|[^a-z0-9])${escapeRegExp(normalize(term))}([^a-z0-9]|$)`, 'i');
  return pattern.test(text);
}

function parseSkills(value) {
  const seen = new Set();
  return value.split(/[\n,;]+/).map((skill) => skill.trim()).filter(Boolean).filter((skill) => {
    const key = normalize(skill);
    if (seen.has(key)) return false;
    seen.add(key); return true;
  });
}

function canonicalKey(skill) {
  const normalizedSkill = normalize(skill);
  return Object.entries(aliases).find(([, terms]) => terms.some((term) => normalize(term) === normalizedSkill))?.[0] || normalizedSkill;
}

function skillAppears(text, keyOrSkill) {
  return (aliases[keyOrSkill] || [keyOrSkill]).some((term) => containsTerm(text, term));
}

function inferRequestedSkills(text, ownSkills) {
  const known = new Map();
  Object.keys(aliases).forEach((key) => { if (skillAppears(text, key)) known.set(key, key); });
  ownSkills.forEach((skill) => { if (skillAppears(text, skill)) known.set(canonicalKey(skill), canonicalKey(skill)); });
  return [...known.values()];
}

function displaySkill(key) { return translations[currentLanguage].skillLabels[key] || key; }

function renderList(element, items, emptyMessage) {
  element.replaceChildren();
  if (!items.length) {
    const item = document.createElement('li'); item.className = 'empty-item'; item.textContent = emptyMessage; element.append(item); return;
  }
  items.forEach((key) => { const item = document.createElement('li'); item.textContent = displaySkill(key); element.append(item); });
}

function messageFor(score, requestedCount) {
  const messages = translations[currentLanguage].messages;
  if (!requestedCount) return messages.none;
  if (score >= 80) return messages.high;
  if (score >= 50) return messages.medium;
  if (score > 0) return messages.initial;
  return messages.zero;
}

function updateStaticTranslations() {
  const strings = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;
  document.title = strings.pageDocumentTitle;
  document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = strings[element.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => { element.placeholder = strings[element.dataset.i18nPlaceholder]; });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => { element.setAttribute('aria-label', strings[element.dataset.i18nAriaLabel]); });
  document.querySelectorAll('[data-i18n-content]').forEach((element) => { element.setAttribute('content', strings[element.dataset.i18nContent]); });
  languageButtons.forEach((button) => {
    const active = button.dataset.language === currentLanguage;
    button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active));
  });
}

function renderAnalysis() {
  if (!lastAnalysis) return;
  const strings = translations[currentLanguage];
  const { requestedSkills, matched, missing, score } = lastAnalysis;
  scoreValue.textContent = `${score}%`;
  scoreRing.style.background = `conic-gradient(var(--green) ${score * 3.6}deg, #d2dfeb 0deg)`;
  scoreRing.setAttribute('aria-label', strings.scoreAria(score));
  scoreMessage.textContent = messageFor(score, requestedSkills.length);
  matchedCount.textContent = String(matched.length); missingCount.textContent = String(missing.length);
  renderList(matchedList, matched, strings.noMatches); renderList(missingList, missing, strings.noMissing);
  calculationNote.textContent = requestedSkills.length ? strings.detected(requestedSkills.length, matched.length) : strings.noneDetected;
  resultStatus.textContent = strings.complete;
}

function resetResults() {
  lastAnalysis = null; results.hidden = true; emptyState.hidden = false;
  resultStatus.textContent = translations[currentLanguage].notAnalyzed;
  jobText.setAttribute('aria-invalid', 'false'); jobError.textContent = '';
}

function analyze() {
  const rawVacancy = jobText.value.trim();
  if (!rawVacancy) {
    jobText.setAttribute('aria-invalid', 'true'); jobError.textContent = translations[currentLanguage].emptyError; jobText.focus(); return;
  }
  const ownSkills = parseSkills(skillsText.value);
  const requestedSkills = inferRequestedSkills(normalize(rawVacancy), ownSkills);
  const ownCanonical = new Set(ownSkills.map(canonicalKey));
  const matched = requestedSkills.filter((key) => ownCanonical.has(key));
  const missing = requestedSkills.filter((key) => !ownCanonical.has(key));
  const score = requestedSkills.length ? Math.round((matched.length / requestedSkills.length) * 100) : 0;
  lastAnalysis = { requestedSkills, matched, missing, score };
  renderAnalysis(); jobText.setAttribute('aria-invalid', 'false'); jobError.textContent = '';
  emptyState.hidden = true; results.hidden = false; results.setAttribute('tabindex', '-1'); results.focus();
}

function setLanguage(language) {
  if (!translations[language]) return;
  currentLanguage = language; storeLanguage(language); updateStaticTranslations();
  if (lastAnalysis) renderAnalysis(); else resultStatus.textContent = translations[currentLanguage].notAnalyzed;
  if (jobError.textContent) jobError.textContent = translations[currentLanguage].emptyError;
}

form.addEventListener('submit', (event) => { event.preventDefault(); analyze(); });
form.addEventListener('reset', () => { window.setTimeout(() => { skillsText.value = ''; resetResults(); jobText.focus(); }); });
jobText.addEventListener('input', () => {
  if (jobText.value.trim()) { jobText.setAttribute('aria-invalid', 'false'); jobError.textContent = ''; }
});
exampleButton.addEventListener('click', () => {
  jobText.value = examples[currentLanguage].vacancy; skillsText.value = examples[currentLanguage].skills.join('\n'); resetResults(); jobText.focus();
});
languageButtons.forEach((button) => { button.addEventListener('click', () => setLanguage(button.dataset.language)); });

setLanguage(currentLanguage);
resetResults();
