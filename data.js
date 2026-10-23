/* Contenido del sitio, común a todos los temas. Cada texto es { es, en }. */
var NAME = "Camilo Andrés Cuello Romero";
var LINKS = { linkedin: "https://www.linkedin.com/in/camilo-cuello/", github: "https://github.com/Camilo-neck/" };

/* Textos de interfaz comunes. Cada tema agrega los suyos con CC.addStrings. */
var T = {
  es: {
    pubTitle: "Publicaciones", pubSub: "Investigación y reportes técnicos.", nav3: "Publicaciones",
    pubAuthors: "Autores", pubFigs: "Resultados", pubEsc: function (a, b) { return a + " de " + b + " episodios terminaron en escape colectivo."; },
    pubNote: "Proyecto de sprint en etapa temprana; Apart lo publica como trabajo de los participantes.",
    hudRepos: "Repos", hudFollow: "Seguidores", nav1: "Capacidades", nav2: "Proyectos", nav4: "Acceso", nav5: "Trayectoria", nav6: "Contacto",
    status: "En línea, abierto a nuevos retos", role: "Ingeniero de Sistemas y Computación", tagline: "IA aplicada y arquitectura de software.",
    lede: "Egresado de la Universidad Nacional de Colombia. Construyo software de punta a punta y me muevo en dos líneas: IA aplicada, con agentes y modelos que usan herramientas, y arquitectura de software, que también es el foco de la maestría que voy a cursar.",
    cta1: "Ver capacidades", cta2: "Hackear el acceso",
    capTitle: "Capacidades", capSub: "Cada sistema agrupa un área y sus módulos. Elige uno para ver qué tiene instalado.",
    projTitle: "Proyectos", projSub: "Productos, experimentos, hackathons, comunidad y código abierto.",
    fAll: "Todos",
    ghSub: "Datos públicos del perfil a octubre de 2026.", ghOrg: "org", ghLoc: "zona", ghRepos: "Repos", ghFollowers: "Seguidores", ghFollowing: "Siguiendo",
    ghQuote: "El saludo con el que abre el README del perfil.", ghSnake: "Homenaje a la serpiente que se come el gráfico de contribuciones del perfil. Las celdas son decorativas.",
    ghPopular: "Repositorios populares", ghOpen: "Abrir perfil en GitHub", stars: "estrellas",
    brTitle: "Acceso",
    rw: [["Terminal", "Abre la terminal de consulta."], ["Archivo", "Revela un archivo con datos curiosos."], ["Sobrecarga", "Activa un modo visual alterno."]],
    tTitle: "Terminal", aTitle: "Archivo", lkT: "Bloqueado", lkOpen: "Abierto", lkReq: "Requiere secuencia", lkOk: "Acceso concedido", lk0: "Instala la secuencia Terminal en la matriz para usarla.", lk1: "Instala la secuencia Archivo para abrirlo.",
    ovrText: "La secuencia Sobrecarga cambia el color de toda la interfaz.", ovrOn: "Activar sobrecarga", ovrOff: "Desactivar sobrecarga", ovrLocked: "Sobrecarga bloqueada",
    pathTitle: "Trayectoria", pathSub: "De dónde vengo y hacia dónde entreno.", pathPast: "Base", pathNext: "Lo que sigue",
    contactTitle: "Contacto", contactText: "Hablemos de IA aplicada, agentes, arquitectura de software o un reto que necesite ingeniería de punta a punta.",
    footNote: "Compilado en octubre de 2026", langAria: "Cambiar a inglés", lockTitle: "Secuencias instaladas",
    thTitle: "Tema de la interfaz", thSoon: "Próximamente", thAria: "Cambiar tema",
    gmTitle: "Mis juegos favoritos", gmSub: "Este sitio se puede recorrer en cuatro mundos inspirados en juegos que me gustan. Cada uno cambia toda la interfaz y trae su propio minijuego en Acceso. También puedes cambiarlo cuando quieras desde el botón con el logo, arriba a la derecha.",
    gmNow: "Estás aquí", gmGo: "Entrar a este mundo", gmGame: "Minijuego",
    hintT: "Este portafolio cambia de videojuego", hintD: "Tiene cuatro estilos, cada uno con su minijuego. Cámbialo desde este botón o", hintGo: "mira los juegos", hintX: "Cerrar aviso",
    tHelp: "Comandos: quien, skills, proyectos, publicaciones, github, trayectoria, contacto, ir <sección>, idioma, sobrecarga, limpiar",
    tOvrLocked: "Sobrecarga bloqueada. Instala su secuencia en la matriz.", tOvrOn: "OVERLOAD ON", tOvrOff: "OVERLOAD OFF",
    tHack: "Ya estás dentro. Prueba sobrecarga.", tUnknown: "Comando no reconocido. Escribe ayuda.",
    tGranted: "Acceso concedido. Escribe ayuda.", tOnline: "Terminal en línea. Escribe ayuda.", tChips: ["ayuda", "quien", "skills", "proyectos", "contacto"]
  },
  en: {
    pubTitle: "Publications", pubSub: "Research and technical reports.", nav3: "Publications",
    pubAuthors: "Authors", pubFigs: "Results", pubEsc: function (a, b) { return a + " of " + b + " episodes ended in collective escape."; },
    pubNote: "Early-stage sprint project; Apart publishes it as participant work.",
    hudRepos: "Repos", hudFollow: "Followers", nav1: "Skills", nav2: "Projects", nav4: "Access", nav5: "Path", nav6: "Contact",
    status: "Online, open to new challenges", role: "Systems and Computing Engineer", tagline: "Applied AI and software architecture.",
    lede: "Graduate of Universidad Nacional de Colombia. I build software end to end and work along two lines: applied AI, with agents and models that call tools, and software architecture, which is also the focus of the master's I am about to start.",
    cta1: "See skills", cta2: "Hack the access",
    capTitle: "Skills", capSub: "Each system groups one area and its modules. Pick one to see what is installed.",
    projTitle: "Projects", projSub: "Products, experiments, hackathons, community and open source.",
    fAll: "All",
    ghSub: "Public profile data as of October 2026.", ghOrg: "org", ghLoc: "zone", ghRepos: "Repos", ghFollowers: "Followers", ghFollowing: "Following",
    ghQuote: "The greeting that opens the profile README.", ghSnake: "A nod to the snake that eats the contribution graph on the profile. The cells are decorative.",
    ghPopular: "Popular repositories", ghOpen: "Open GitHub profile", stars: "stars",
    brTitle: "Access",
    rw: [["Terminal", "Opens the query terminal."], ["Archive", "Reveals a file with fun facts."], ["Overload", "Turns on an alternate visual mode."]],
    tTitle: "Terminal", aTitle: "Archive", lkT: "Locked", lkOpen: "Open", lkReq: "Sequence required", lkOk: "Access granted", lk0: "Install the Terminal sequence in the matrix to use it.", lk1: "Install the Archive sequence to open it.",
    ovrText: "The Overload sequence changes the color of the whole interface.", ovrOn: "Turn on overload", ovrOff: "Turn off overload", ovrLocked: "Overload locked",
    pathTitle: "Path", pathSub: "Where I come from and what I am training for.", pathPast: "Foundation", pathNext: "What's next",
    contactTitle: "Contact", contactText: "Let's talk about applied AI, agents, software architecture or a challenge that needs end-to-end engineering.",
    footNote: "Compiled in October 2026", langAria: "Switch to Spanish", lockTitle: "Installed sequences",
    thTitle: "Interface theme", thSoon: "Coming soon", thAria: "Change theme",
    gmTitle: "My favorite games", gmSub: "You can explore this site in four worlds inspired by games I love. Each one changes the whole interface and brings its own minigame in Access. You can also switch anytime from the logo button at the top right.",
    gmNow: "You are here", gmGo: "Enter this world", gmGame: "Minigame",
    hintT: "This portfolio changes video games", hintD: "It has four styles, each with its own minigame. Switch from this button or", hintGo: "see the games", hintX: "Close notice",
    tHelp: "Commands: about, skills, projects, publications, github, path, contact, go <section>, lang, overload, clear",
    tOvrLocked: "Overload locked. Install its sequence in the matrix.", tOvrOn: "OVERLOAD ON", tOvrOff: "OVERLOAD OFF",
    tHack: "You are already in. Try overload.", tUnknown: "Unknown command. Type help.",
    tGranted: "Access granted. Type help.", tOnline: "Terminal online. Type help.", tChips: ["help", "about", "skills", "projects", "contact"]
  }
};

/* Capacidades: 8 sistemas; cada módulo es operativo ("o") o en entrenamiento ("t"). pt = punto en la figura del tema Cyberpunk. */
function mod(n, s) { return { n: n, s: s || "o" }; }
var SLOTS = [
  { side: "L", icon: "ia", pt: [0, .055], sys: { es: "Corteza frontal", en: "Frontal cortex" }, area: { es: "IA aplicada", en: "Applied AI" },
    d: { es: "Modelos que razonan y actúan: agentes, uso de herramientas y reconocimiento de voz.", en: "Models that reason and act: agents, tool use and speech recognition." },
    mods: [mod("LLM tool / function calling"), mod({ es: "Frameworks de agentes de IA", en: "AI agent frameworks" }), mod({ es: "Reconocimiento de voz con Whisper", en: "Speech recognition with Whisper" }), mod({ es: "Reentrenamiento con datos corregidos por personas", en: "Retraining with human-corrected data" }), mod({ es: "Autoencoders variacionales y deep learning de audio", en: "Variational autoencoders and audio deep learning" })] },
  { side: "L", icon: "eye", pt: [.02, .08], sys: { es: "Sistema ocular", en: "Ocular system" }, area: { es: "Frontend", en: "Frontend" },
    d: { es: "Interfaces web con componentes, tipado y estilos utilitarios.", en: "Web interfaces with components, typing and utility styles." },
    mods: [mod("React"), mod("Next.js"), mod("TypeScript"), mod("JavaScript"), mod("Tailwind CSS"), mod("Vite"), mod("Bootstrap"), mod("p5.js"), mod({ es: "Flutter (móvil)", en: "Flutter (mobile)" })] },
  { side: "L", icon: "db", pt: [-.035, .24], sys: { es: "Sistema circulatorio", en: "Circulatory system" }, area: { es: "Datos", en: "Data" },
    d: { es: "Bases de datos relacionales y documentales.", en: "Relational and document databases." },
    mods: [mod("PostgreSQL"), mod("MySQL"), mod("MongoDB")] },
  { side: "L", icon: "shield", pt: [.03, .37], sys: { es: "Sistema inmune", en: "Immune system" }, area: { es: "Trazabilidad y calidad", en: "Traceability and quality" },
    d: { es: "Sistemas que dejan rastro de lo que hacen, y código revisado.", en: "Systems that leave a trace of what they do, and reviewed code." },
    mods: [mod({ es: "Trazabilidad de agentes: eventos y procedencia", en: "Agent traceability: events and provenance" }), mod("SonarQube"), mod({ es: "Sprints con historias de usuario", en: "Sprints with user stories" })] },
  { side: "R", icon: "chip", pt: [0, .15], sys: { es: "Sistema operativo", en: "Operating system" }, area: { es: "Arquitectura de software", en: "Software architecture" },
    d: { es: "Mi línea principal de formación: decisiones de diseño, sistemas a escala y entrega.", en: "My main line of study: design decisions, systems at scale and delivery." },
    mods: [mod({ es: "Arquitectura de software", en: "Software architecture" }, "t"), mod("System design", "t"), mod("Software design and architecture", "t"), mod({ es: "Decisiones de arquitectura en hackathons", en: "Architecture decisions in hackathons" })] },
  { side: "R", icon: "nerve", pt: [0, .3], sys: { es: "Sistema nervioso", en: "Nervous system" }, area: { es: "Backend", en: "Backend" },
    d: { es: "Servicios y APIs en varios lenguajes y frameworks.", en: "Services and APIs across several languages and frameworks." },
    mods: [mod("Node.js"), mod("Express"), mod("NestJS"), mod("Python"), mod("FastAPI"), mod("Flask"), mod(".NET"), mod("Java"), mod("Rust + Rocket")] },
  { side: "R", icon: "bone", pt: [.065, .5], sys: { es: "Esqueleto", en: "Skeleton" }, area: { es: "Infraestructura", en: "Infrastructure" },
    d: { es: "Contenedores, nube y el sistema operativo donde todo corre.", en: "Containers, cloud and the operating system everything runs on." },
    mods: [mod("Docker"), mod("AWS"), mod("Azure"), mod("Linux: Arch, Kali"), mod("DevOps", "t")] },
  { side: "R", icon: "tool", pt: [.23, .45], sys: { es: "Manos", en: "Hands" }, area: { es: "Herramientas", en: "Tools" },
    d: { es: "Lo que uso a diario para escribir, versionar y probar.", en: "What I use every day to write, version and test." },
    mods: [mod("Git"), mod("GitHub"), mod("Bitbucket"), mod("Neovim"), mod("VS Code"), mod("Postman"), mod("npm / pnpm / Bun"), mod("LaTeX"), mod("MATLAB")] }
];
var MOD_COUNT = SLOTS.reduce(function (a, s) { return a + s.mods.length; }, 0);

var TYPES = { prod: { es: "Producto", en: "Product" }, pers: { es: "Personal", en: "Personal" }, acad: { es: "Académico", en: "Academic" }, hack: { es: "Hackathon", en: "Hackathon" }, com: { es: "Comunidad", en: "Community" }, code: { es: "Código", en: "Code" } };
var PROJ = [
  { t: "pers", n: { es: "Patrones de costura con IA", en: "AI sewing patterns" }, st: { es: "En desarrollo", en: "In progress" },
    sum: { es: "Herramienta de diseño de moda AI-First que genera patrones de costura 2D a partir de texto e imágenes.", en: "An AI-first fashion design tool that generates 2D sewing patterns from text and images." },
    pts: { es: ["El modelo produce patrones compatibles con CAD, con parámetros, texturas y materiales. La simulación 3D y el render siguen en herramientas existentes.", "Beta temprana con prendas básicas; la meta es llegar a alta costura y diseños innovadores.", "Validación primero con diseñadores profesionales, apertura a más personas después.", "SewingLDM, AIpparel y Panelformer muestran que el enfoque es viable, aunque siguen siendo investigación. GarmentCodeData aporta 115 mil prendas con patrones."],
           en: ["The model produces CAD-compatible patterns with parameters, textures and materials. 3D simulation and rendering stay in existing tools.", "Early beta with basic garments; the goal is haute couture and innovative designs.", "Validation with professional designers first, then opening it to more people.", "SewingLDM, AIpparel and Panelformer show the approach is viable, though still research. GarmentCodeData offers 115K garments with patterns."] },
    stack: ["Multimodal", "CAD", "Blender", "CLO3D", "Marvelous Designer"] },
  { t: "prod", n: { es: "Transcripción médica con IA", en: "AI medical transcription" }, st: { es: "En curso", en: "Ongoing" },
    sum: { es: "Plataforma que transcribe audios médicos y usa revisión humana para mejorar el modelo.", en: "A platform that transcribes medical audio and uses human review to improve the model." },
    pts: { es: ["Audios almacenados en S3 y transcritos con Whisper.", "Sección administrativa para que operadores corrijan transcripciones y generen datos de referencia para reentrenar.", "Flujo de informes en diseño: calificación con un modelo, anonimización y correcciones."],
           en: ["Audio stored in S3 and transcribed with Whisper.", "Admin section where operators correct transcripts and produce reference data for retraining.", "Report flow in design: grading with a model, anonymization and corrections."] },
    stack: ["Whisper", "AWS S3", "Human-in-the-loop"] },
  { t: "hack", n: { es: "Containment Does Not Compose", en: "Containment Does Not Compose" }, st: { es: "Sep 2026", en: "Sep 2026" },
    sum: { es: "AI Incident Response Sprint de Apart Research, Bogotá. Un banco de pruebas donde agentes que pasan auditorías individuales logran escapar juntos, y un grafo de procedencia para rastrear de dónde salió el escape.", en: "Apart Research AI Incident Response Sprint, Bogotá. A testbed where agents that pass individual audits escape together, and a provenance graph to trace where the escape came from." },
    pts: { es: ["Cada agente corre en un contenedor sin red con un fragmento de credencial; comunicándose por un canal compartido, arman una credencial que ningún contenedor tiene solo.", "Mi rol fue la trazabilidad: el bucle de agentes en el host, el registro de eventos y la propagación acotada de procedencia que alimenta el grafo.", "El resultado se publicó como reporte; está en Publicaciones."],
           en: ["Each agent runs in a network-less container holding one credential fragment; talking over a shared channel, they assemble a credential no single container holds.", "My role was traceability: the agent loop on the host, the event log and the bounded provenance propagation that feeds the graph.", "The result was published as a report; see Publications."] },
    stack: [{ es: "Agentes", en: "Agents" }, { es: "Seguridad de IA", en: "AI safety" }, { es: "Procedencia", en: "Provenance" }, { es: "Contenedores", en: "Containers" }],
    links: [["Proyecto", "https://apartresearch.com/sprints/projects/containment-does-not-compose-provenance-graphs-for-tracing-collective-escape-in-multiagent-systems-pm4n"], ["Repo", "https://github.com/dfadames/AI-safety-equipo-perdomo"]] },
  { t: "hack", n: { es: "Factored AI & Data Hackathon", en: "Factored AI & Data Hackathon" }, st: { es: "2026, 10 días", en: "2026, 10 days" },
    sum: { es: "Diseñar y construir un servicio AI-First para un cliente del sector bancario.", en: "Design and build an AI-first service for a banking client." },
    pts: { es: ["El reto incluía las decisiones de arquitectura y no solo la aplicación."], en: ["The challenge covered the architecture decisions, not only the application."] },
    stack: [{ es: "Arquitectura", en: "Architecture" }, "AI-First", { es: "Banca", en: "Banking" }] },
  { t: "com", n: { es: "Capa 8", en: "Capa 8" }, st: { es: "Fundador", en: "Founder" },
    sum: { es: "Grupo estudiantil de ingeniería de software de la Universidad Nacional de Colombia.", en: "Software engineering student group at Universidad Nacional de Colombia." },
    pts: { es: [], en: [] }, stack: ["UNAL"] },
  { t: "acad", n: { es: "Audio embeddings con VAE", en: "Audio embeddings with VAEs" }, st: { es: "Jun a jul 2025, con paper", en: "Jun to Jul 2025, with paper" },
    sum: { es: "Embeddings de audio para similitud musical y clasificación de género usando autoencoders variacionales.", en: "Audio embeddings for music similarity and genre classification using variational autoencoders." },
    pts: { es: ["Representación de espectrograma reversible de dos canales (magnitud y fase) que permite reconstruir la onda con fidelidad y extraer embeddings de forma eficiente.", "VAE basado en ResNet50 que comprime la música en embeddings de 512 dimensiones, equilibrando fidelidad de audio y rasgos semánticos.", "66% de exactitud en clasificación de género sobre GTZAN con clasificadores neuronales ajustados, por encima de los modelos de ML tradicionales.", "Agrupamiento por parecido perceptual de pares de canciones con disputas culturales y legales, como prueba de recuperación por similitud."],
           en: ["A reversible two-channel spectrogram (magnitude and phase) that allows faithful waveform reconstruction and efficient embedding extraction.", "A ResNet50-based VAE that compresses music into 512-dimensional embeddings, balancing audio fidelity and semantic features.", "66% genre classification accuracy on GTZAN with fine-tuned neural classifiers, above traditional ML models.", "Clustering of culturally and legally contested song pairs by perceptual resemblance, as a similarity retrieval test."] },
    stack: ["VAE", "ResNet50", "Deep Learning", { es: "Espectrogramas", en: "Spectrograms" }, "GTZAN"] },
  { t: "prod", n: { es: "BetterCampus", en: "BetterCampus" }, st: { es: "Desde 2021, cofundador", en: "Since 2021, co-founder" },
    sum: { es: "Plataforma web hecha por estudiantes para planear la vida académica en la UNAL. La usan más de 5.800 estudiantes.", en: "A student-built web platform for academic planning at UNAL. More than 5,800 students use it." },
    pts: { es: ["Creación de horarios en tiempo real, información de cursos y estadísticas interactivas, sincronizado con el SIA.", "Cofundada y desarrollada con Juan Orozco.", "Reseñada por la Agencia de Noticias UNAL en 2023; está en Publicaciones."],
           en: ["Real-time class scheduling, course insights and interactive stats, synced with SIA.", "Co-founded and built with Juan Orozco.", "Covered by Agencia de Noticias UNAL in 2023; see Publications."] },
    stack: [{ es: "Liderazgo", en: "Leadership" }, { es: "Producto", en: "Product" }, "Web"] },
  { t: "acad", n: { es: "Leare", en: "Leare" }, st: { es: "Feb a jun 2024", en: "Feb to Jun 2024" },
    sum: { es: "App multiplataforma de tecnología educativa donde los usuarios se inscriben en cursos y también crean y suben los suyos.", en: "A cross-platform educational technology app where users can enroll in courses as well as create and upload their own courses." },
    pts: { es: ["Hecha con Juan y David Steven.", "Incluye un microservicio en Rust para búsquedas indexadas, empaquetado con Docker."],
           en: ["Built with Juan and David Steven.", "Includes a Rust microservice for indexed search, packaged with Docker."] },
    stack: ["Flutter", { es: "Móvil", en: "Mobile" }, { es: "Microservicios", en: "Microservices" }, "Rust", "Docker"],
    links: [["Search MS", "https://github.com/Camilo-neck/leare_search_ms"]] },
  { t: "acad", n: { es: "Roomease", en: "Roomease" }, st: { es: "Feb a jun 2023", en: "Feb to Jun 2023" },
    sum: { es: "Aplicación web para que compañeros de vivienda organicen sus tareas.", en: "A web app that helps roommates organize their tasks." },
    pts: { es: ["Vista de calendario para visualizar tareas.", "Interacciones de comunidad para colaborar y comunicarse.", "Backend en TypeScript con pruebas en Jest y CI en GitHub Actions."],
           en: ["Calendar view to visualize tasks.", "Community interactions for collaboration and communication.", "TypeScript backend with Jest tests and CI on GitHub Actions."] },
    stack: ["Next.js", "TypeScript", "Node.js", "Jest", "GitHub Actions"],
    links: [["Frontend", "https://github.com/Camilo-neck/roomease-frontend"], ["Backend", "https://github.com/Camilo-neck/roomease-backend"]] },
  { t: "code", n: { es: "quizz_app", en: "quizz_app" }, st: { es: "2022", en: "2022" },
    sum: { es: "Aplicación de exámenes hecha para el reto de un bootcamp.", en: "An exam app built for a bootcamp challenge." },
    pts: { es: ["Panel de administración para gestionar estudiantes y preguntas.", "Panel de estudiante para presentar exámenes, con validación de respuestas y confirmación de envío."],
           en: ["Admin dashboard to manage students and questions.", "Student dashboard to take exams, with answer validation and submit confirmation."] },
    stack: ["React", "TypeScript", "Tailwind CSS", "Redux", "React Hook Form"], links: [["Repo", "https://github.com/Camilo-neck/quizz_app"]] },
  { t: "code", n: { es: "unlock-web", en: "unlock-web" }, st: { es: "Desplegado", en: "Deployed" },
    sum: { es: "Aplicación web con Next.js desplegada en Vercel.", en: "A Next.js web app deployed on Vercel." },
    pts: { es: [], en: [] }, stack: ["Next.js", "TypeScript", "Tailwind CSS", "Bun"],
    links: [["Repo", "https://github.com/Camilo-neck/unlock-web"], ["Demo", "https://unlock-web-mu.vercel.app"]] }
];

var PUBS = [
  { title: "Containment Does Not Compose", subtitle: "Provenance Graphs for Tracing Collective Escape in Multi-Agent Systems",
    venue: "Apart Research, AI Incident Response Sprint", date: { es: "14 sep 2026", en: "Sep 14, 2026" }, kind: { es: "Reporte de investigación", en: "Research report" },
    authors: ["Camilo Andres Cuello Romero", "Elkin Rafael Cuello Romero", "Carlos Santiago Sandoval Casallas", "David Fernando Adames Rondon"],
    abs: { es: "Las auditorías de seguridad de agentes suelen revisar un agente a la vez. Construimos un banco de pruebas donde cada contenedor pasa esa auditoría, pero los agentes, comunicándose por un canal compartido, arman una credencial que ningún contenedor tiene por sí solo. Presentarla a un validador es la acción restringida.",
           en: "Agent safety audits usually check one agent at a time. We built a testbed where every container passes that audit, yet agents talking over a shared channel assemble a credential no single container holds. Submitting it to a validator is the restricted action." },
    pts: { es: ["Un juez por agente marcó los 48 escapes, pero da un puntaje por agente y no nombra orígenes.", "El grafo de procedencia atribuyó los escapes a contenedores y mensajes sin subatribución frente a un oráculo independiente.", "Una línea base simple recuperó los mismos orígenes en este banco de pruebas; probar la ventaja del grafo queda como trabajo futuro.", "Prueba de concepto de dos días con un modelo y 5 a 10 episodios por condición."],
           en: ["A per-agent judge flagged all 48 escapes, but it gives one score per agent and names no origins.", "The provenance graph attributed escapes to containers and messages with no under-attribution against an independent oracle.", "A simple baseline recovered the same origins on this testbed; testing the graph's advantage is future work.", "Two-day proof of concept with one model and 5 to 10 episodes per condition."] },
    figs: [["95", { es: "episodios", en: "episodes" }], ["48", { es: "escapes colectivos", en: "collective escapes" }], ["39/40", { es: "con todos los fragmentos alcanzables", en: "with every fragment reachable" }], ["0/5", { es: "con un fragmento inalcanzable", en: "with one fragment unreachable" }]],
    esc: [48, 95],
    note: { es: "Proyecto de sprint en etapa temprana; Apart lo publica como trabajo de los participantes.", en: "Early-stage sprint project; Apart publishes it as participant work." },
    links: [["PDF", "https://pys8vc40ox3z7qxp.public.blob.vercel-storage.com/files/c11e4a3d297f8c51-3df5af7f-3520-412d-845c-3cb497bbddb2-AI_Safety_Equipo_Perdomo_Paper.pdf"], ["Apart", "https://apartresearch.com/sprints/projects/containment-does-not-compose-provenance-graphs-for-tracing-collective-escape-in-multiagent-systems-pm4n"], [{ es: "Código", en: "Code" }, "https://github.com/dfadames/AI-safety-equipo-perdomo"]] },
  { title: "Audio Embeddings for Music Similarity and Genre Classification Using Variational Autoencoders",
    venue: "Universidad Nacional de Colombia", date: { es: "Jul 2025", en: "Jul 2025" }, kind: { es: "Paper de proyecto", en: "Project paper" },
    authors: ["Camilo Cuello", "Juan", "Omar David"],
    abs: { es: "Un autoencoder variacional sobre espectrogramas reversibles de magnitud y fase que comprime canciones en embeddings de 512 dimensiones útiles para clasificar géneros y medir similitud musical.",
           en: "A variational autoencoder over reversible magnitude and phase spectrograms that compresses songs into 512-dimensional embeddings useful for genre classification and music similarity." },
    pts: { es: ["Reconstrucción fiel de la onda a partir de la representación de dos canales.", "Clasificadores neuronales ajustados superan a los modelos de ML tradicionales en GTZAN."],
           en: ["Faithful waveform reconstruction from the two-channel representation.", "Fine-tuned neural classifiers beat traditional ML models on GTZAN."] },
    figs: [["512", { es: "dimensiones por embedding", en: "dimensions per embedding" }], ["66%", { es: "exactitud de género en GTZAN", en: "genre accuracy on GTZAN" }], ["2", { es: "canales: magnitud y fase", en: "channels: magnitude and phase" }], ["ResNet50", { es: "base del VAE", en: "VAE backbone" }]],
    links: [] },
  { title: "BetterCampus mejora la experiencia académica de estudiantes de la UNAL",
    venue: "Agencia de Noticias UNAL", date: { es: "23 ago 2023", en: "Aug 23, 2023" }, kind: { es: "Artículo de prensa", en: "News article" },
    authors: ["Camilo Cuello", "Juan Orozco"], about: true,
    abs: { es: "BetterCampus es una plataforma web hecha por estudiantes que transforma la planeación académica en la UNAL, con horarios en tiempo real, información de cursos y estadísticas interactivas sincronizadas con el SIA.",
           en: "BetterCampus is a student-built web platform that transforms academic planning at UNAL, with real-time class scheduling, course insights and interactive stats synced with SIA." },
    figs: [["5.800+", { es: "estudiantes planean con ella", en: "students plan with it" }], ["2021", { es: "año de inicio", en: "year started" }]],
    links: [[{ es: "Leer artículo", en: "Read article" }, "https://agenciadenoticias.unal.edu.co/detalle/bettercampus-mejora-la-experiencia-academica-de-estudiantes-de-la-unal"]] }
];

var REPOS = [
  { n: "Camilo-neck", d: { es: "README del perfil", en: "Profile README" }, l: "Markdown", c: "#8F8F8F", s: 2 },
  { n: "quizz_app", d: { es: "App de exámenes", en: "Exam app" }, l: "TypeScript", c: "#3178C6", s: 2 },
  { n: "unlock-web", d: { es: "App en Next.js", en: "Next.js app" }, l: "TypeScript", c: "#3178C6", s: 2 },
  { n: "Mini_Calculadora", d: { es: "Mini calculadora de clase", en: "Class mini calculator" }, l: "Python", c: "#3572A5", s: 1 },
  { n: "Probabilidad", d: { es: "Notas y tareas de probabilidad", en: "Probability notes and homework" }, l: "HTML", c: "#E34C26", s: 1 },
  { n: "BootCamp_FrontEnd", d: { es: "Bootcamp de frontend", en: "Frontend bootcamp" }, l: "HTML", c: "#E34C26", s: 1 }
];

var PATH_PAST = [
  { t: { es: "Ingeniería de Sistemas y Computación", en: "Systems and Computing Engineering" }, d: { es: "Universidad Nacional de Colombia, graduado.", en: "Universidad Nacional de Colombia, graduate." } },
  { t: { es: "Capa 8", en: "Capa 8" }, d: { es: "Fundador del grupo estudiantil de ingeniería de software de la UNAL.", en: "Founder of the UNAL software engineering student group." } },
  { t: { es: "BetterCampus", en: "BetterCampus" }, d: { es: "Cofundador desde 2021. Plataforma académica usada por más de 5.800 estudiantes de la UNAL.", en: "Co-founder since 2021. Academic platform used by more than 5,800 UNAL students." } },
  { t: { es: "Full Stack Developer", en: "Full Stack Developer" }, d: { es: "Koral AT, remoto, desde septiembre de 2023.", en: "Koral AT, remote, since September 2023." } }
];
var PATH_NEXT = [
  { t: { es: "Maestría en Ingeniería de Sistemas y Computación", en: "Master's in Systems and Computing Engineering" }, d: { es: "Universidad Nacional de Colombia, modalidad de Profundización. Foco en arquitectura de software, con interés en IA aplicada.", en: "Universidad Nacional de Colombia, in-depth (Profundización) track. Focus on software architecture, with an interest in applied AI." } },
  { t: { es: "Certificaciones", en: "Certifications" }, d: { es: "Arquitectura de software, system design, desarrollo y DevOps.", en: "Software architecture, system design, development and DevOps." } },
  { t: { es: "Roadmaps de roadmap.sh", en: "roadmap.sh roadmaps" }, d: { es: "Software Architect, System Design y Software Design and Architecture.", en: "Software Architect, System Design and Software Design and Architecture." } }
];

var ARCHIVE = [
  ["EDITOR", { es: "Neovim y VS Code.", en: "Neovim and VS Code." }],
  ["DISTRO", { es: "Arch Linux y Kali en el inventario.", en: "Arch Linux and Kali in the inventory." }],
  ["RUST", { es: "Ha escrito servicios con Rust y Rocket.", en: "Has written services with Rust and Rocket." }],
  ["RUNTIME", { es: "Usa Bun y pnpm además de npm.", en: "Uses Bun and pnpm besides npm." }],
  ["DOCS", { es: "Escribe documentos en LaTeX.", en: "Writes documents in LaTeX." }],
  ["MODA", { es: "Está enseñando a una IA a hacer patrones de costura.", en: "Is teaching an AI to make sewing patterns." }]
];

/* Tarjetas de "Mis juegos favoritos": qué cambia, minijuego y colores de muestra. La lista de temas está en THEMES (index.html). */
var GAMES = {
  cyberpunk: { d: { es: "HUD de neón, pantalla de atributos hexagonal y esquema de implantes.", en: "Neon HUD, hexagonal attribute screen and implant schematic." }, g: { es: "Matriz de intrusión", en: "Breach matrix" }, sw: ["#FF5A5F", "#5CF2F0", "#E9F23B", "#0B0709"] },
  minecraft: { d: { es: "Bloques del Ore UI, inventario con corazones y terreno pixelado.", en: "Ore UI blocks, inventory with hearts and pixel terrain." }, g: { es: "Mina de vetas", en: "Ore vein mine" }, sw: ["#387E24", "#D0D1D5", "#7345E5", "#1E1E1F"] },
  tsushima: { d: { es: "Papel de arroz, tinta, emblemas kamon y hojas al viento.", en: "Rice paper, ink, kamon crests and leaves in the wind." }, g: { es: "Enfrentamiento samurái", en: "Samurai standoff" }, sw: ["#C8102E", "#ECE7DC", "#C9A34E", "#141210"] },
  spiderman: { d: { es: "Barras rojas, menú sobre Manhattan y la tabla de Octavius.", en: "Red bars, a menu over Manhattan and the Octavius table." }, g: { es: "Circuito de Octavius", en: "Octavius circuit" }, sw: ["#C1293A", "#3FE0F0", "#1567A6", "#0B1E2B"] }
};

/* Menú del hero: una entrada por sección. Cada tema decide cómo dibujarlo y en qué orden. */
var MENU = {
  capacidades: { icon: "chip", l: "nav1", v: function () { return MOD_COUNT; }, u: { es: "módulos", en: "modules" }, d: { es: "8 sistemas instalados, de IA aplicada a infraestructura.", en: "8 installed systems, from applied AI to infrastructure." } },
  proyectos: { icon: "log", l: "nav2", v: function () { return PROJ.length; }, u: { es: "registros", en: "entries" }, d: { es: "Productos, experimentos, hackathons, comunidad y código.", en: "Products, experiments, hackathons, community and code." } },
  github: { icon: "net", l: null, label: "GitHub", v: function () { return 40; }, u: { es: "repos", en: "repos" }, d: { es: "Perfil público, repositorios populares y un homenaje a la serpiente.", en: "Public profile, popular repositories and a nod to the snake." } },
  trayectoria: { icon: "flag", l: "nav5", v: function () { return PATH_PAST.length + PATH_NEXT.length; }, u: { es: "hitos", en: "milestones" }, d: { es: "Formación, comunidad y lo que sigue.", en: "Education, community and what's next." } },
  contacto: { icon: "mail", l: "nav6", v: function () { return 2; }, u: { es: "canales", en: "channels" }, d: { es: "LinkedIn y GitHub.", en: "LinkedIn and GitHub." } },
  acceso: { icon: "grid", l: "nav4", v: function () { return 3; }, u: { es: "secuencias", en: "sequences" }, d: { es: "Minijuego de matriz de código. Desbloquea la terminal y más.", en: "Code matrix minigame. Unlocks the terminal and more." } }
};
