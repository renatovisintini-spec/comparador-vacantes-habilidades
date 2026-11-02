# JobMatch Local — Comparador de vacantes y habilidades

Aplicación web que compara las habilidades técnicas mencionadas en una oferta de empleo con una lista editable de conocimientos propios. Todo el análisis se realiza dentro del navegador.

**Demo:** `https://renatovisintini-spec.github.io/comparador-vacantes-habilidades/`

## Funciones

- Área para pegar una descripción de empleo.
- Lista editable de habilidades personales.
- Normalización de mayúsculas, minúsculas y tildes.
- Reconocimiento de sinónimos frecuentes, como `IA`, `AI` e `inteligencia artificial`.
- Porcentaje orientativo de coincidencia.
- Listas separadas de habilidades coincidentes y habilidades por desarrollar.
- Ejemplo precargado, validación de texto vacío y limpieza del análisis.
- Diseño responsive y navegación mediante teclado.
- Interfaz bilingüe español/inglés sin recargar la página.
- Preferencia de idioma guardada en `localStorage`.

## Tecnologías

- HTML5 semántico
- CSS3 responsive
- JavaScript puro
- API DOM del navegador

## Uso

1. Abre `index.html` en un navegador moderno.
2. Pega el texto de una vacante.
3. Edita la lista de habilidades, utilizando una habilidad por línea o separándolas con comas.
4. Pulsa **Analizar compatibilidad**.
5. Revisa el porcentaje y las dos listas de resultados.

No requiere instalación, servidor, API ni conexión a internet.

## Cómo funciona

1. El texto se convierte a minúsculas y se eliminan las tildes.
2. Se buscan términos técnicos mediante un pequeño diccionario de sinónimos.
3. Las habilidades detectadas se comparan con la lista del usuario.
4. El porcentaje se calcula así:

```text
habilidades coincidentes / habilidades detectadas en la vacante × 100
```

## Pruebas manuales

| Caso | Resultado esperado |
| --- | --- |
| Vacante con varias coincidencias | Porcentaje mayor que cero y habilidades en ambas listas |
| Vacante sin coincidencias | 0 % y lista de coincidencias vacía |
| Texto con mayúsculas y tildes | Se reconocen los términos igualmente |
| «Inteligencia artificial», «IA» o «AI» | Se reconoce como una misma habilidad |
| Texto de vacante vacío | Se muestra un error y el foco vuelve al campo |
| Navegación con teclado | Todos los controles son alcanzables y visibles |
| Cambio ES → EN antes de analizar | Se traducen todos los controles y se conservan los datos |
| Cambio ES → EN después de analizar | Se traducen resultados y explicaciones sin modificar el porcentaje |
| Recargar después de elegir EN | La aplicación vuelve a abrirse en inglés |

## Limitaciones

- El resultado se basa en coincidencias de palabras, no en comprensión semántica completa.
- No evalúa experiencia, nivel, idiomas, formación ni requisitos legales.
- Una habilidad mencionada en una oferta puede ser opcional y aun así contar en el cálculo.
- El diccionario puede ampliarse en el objeto `aliases` de `app.js`.

## Estructura

```text
Comparador-vacantes-habilidades/
├── index.html
├── styles.css
├── app.js
├── README.md
└── LICENSE
```

## Autor

Proyecto de portafolio de Renato Visintini.

---

# JobMatch Local — Job and skills comparison

A browser-based application that compares the technical skills mentioned in a job description with an editable list of personal skills. All processing happens locally in the browser.

**Live demo:** `https://renatovisintini-spec.github.io/comparador-vacantes-habilidades/`

## Features

- Spanish and English interface with an accessible `ES | EN` switch.
- Language changes without reloading or clearing user input and results.
- Language preference stored in `localStorage`.
- Editable personal skills list and job-description input.
- Case- and accent-insensitive matching.
- Bilingual aliases such as `IA`, `AI`, `inteligencia artificial` and `artificial intelligence`.
- Estimated match percentage and separate matched/missing skills lists.
- Responsive design and keyboard navigation.

## How to use it

1. Open `index.html` in a modern browser.
2. Select `ES` or `EN`.
3. Paste a job description.
4. Edit the skills list, using one skill per line or commas.
5. Select **Analyze compatibility**.

No installation, server, API or internet connection is required.

## Manual language tests

| Test | Expected result |
| --- | --- |
| Switch ES → EN before analysis | All controls are translated and input is preserved |
| Switch ES → EN after analysis | Results are translated and the score remains unchanged |
| Reload after selecting EN | The application opens in English |
| Analyze `AI` with `Artificial intelligence` in the skills list | The skill is counted as a match |
| Keyboard navigation | Both language buttons and every form control are reachable |

## Limitations

- Results are based on keyword matching rather than full semantic understanding.
- The application does not assess experience, seniority, education or legal requirements.
- The alias dictionary can be expanded in `app.js`.

## License

Released under the MIT License.
