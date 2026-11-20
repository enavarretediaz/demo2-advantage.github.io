import {
  AcademyEvent,
  Announcement,
  Certificate,
  CohortMember,
  CommunityMessage,
  Course,
  EnrolledCourse,
  GradedSubmission,
  LiveClassSession,
  NotificationItem,
  QuizQuestion,
  Teacher,
  User,
} from '../types';

export const DEFAULT_USER: User = {
  id: 'stu-ana',
  name: 'Ana Belén Ivars',
  email: 'ana@ejemplo.com',
  level: 'B1 · Inglés',
  targetLanguage: 'Inglés',
  points: 1450,
  streakDays: 12,
  cohort: 'Cohorte Gandía · B1 Tarde',
  campus: 'Sede Gandía Centro (Passeig Germanies)',
};

export const TEACHERS: Record<string, Teacher> = {
  sarah: {
    id: 'sarah',
    name: 'Sarah Johnson',
    language: 'Inglés',
    nationality: 'Reino Unido (Oxford)',
    credentials: 'Nativa británica · Certificación TEFL & Cambridge Examiner',
    bio: 'Más de 9 años preparando alumnos en la Safor para certificaciones Cambridge B1, B2 y C1 con enfoque comunicativo real.',
    experienceYears: 9,
    rating: 4.9,
    initials: 'SJ',
    accentColor: '#6C22A6',
  },
  hans: {
    id: 'hans',
    name: 'Hans Müller',
    language: 'Alemán',
    nationality: 'Alemania (Múnich)',
    credentials: 'Nativo alemán · TEFL & Preparador Oficial Goethe-Zertifikat',
    bio: 'Especialista en fonética alemana y preparación intensiva para estudiantes universitarios, sanidad y profesionales que se trasladan a DACH.',
    experienceYears: 8,
    rating: 4.8,
    initials: 'HM',
    accentColor: '#96E9C6',
  },
  marie: {
    id: 'marie',
    name: 'Marie Dupont',
    language: 'Francés',
    nationality: 'Francia (Lyon)',
    credentials: 'Nativa francesa · TEFL & Evaluadora DELF / DALF',
    bio: 'Apasionada por la inmersión cultural francófona. Ayuda a superar bloqueos orales desde la primera semana en grupos reducidos.',
    experienceYears: 7,
    rating: 4.9,
    initials: 'MD',
    accentColor: '#6C22A6',
  },
  laura: {
    id: 'laura',
    name: 'Laura Pérez',
    language: 'Inglés · Kids',
    nationality: 'Bilingüe (Gandía / Londres)',
    credentials: 'Especialista infantil · Pedagogía lúdica y método phonics',
    bio: 'Coordina el programa Advantage Kids para edades de 3 a 12 años mediante juegos teatrales, cuentos y proyectos creativos.',
    experienceYears: 10,
    rating: 5.0,
    initials: 'LP',
    accentColor: '#96E9C6',
  },
};

export const COURSES: Course[] = [
  {
    id: 'english-general',
    title: 'Inglés General A1-C2',
    shortTitle: 'Inglés General B1',
    language: 'Inglés',
    levelRange: 'A1 – C2',
    levelCategory: 'A1-C2',
    format: 'Presencial / Online',
    ageGroup: 'Adultos',
    duration: '12 semanas',
    priceLabel: 'Desde 85€/mes',
    priceMonthly: 85,
    kicker: 'Más popular · Todos los niveles',
    featured: true,
    description:
      'Grupos reducidos con profesores nativos TEFL y preparación oficial Cambridge en Gandía o en directo por streaming.',
    longDescription:
      'Nuestro programa insignia combina conversación práctica en grupos de máximo 8 alumnos con gramática aplicada y simulacros reales de Cambridge (PET, First, Advanced). Cada sesión se graba para repaso y cuenta con seguimiento semanal personalizado.',
    image: '/src/assets/images/course_english_general_1795207555013.jpg',
    teacherId: 'sarah',
    examPrep: 'Cambridge B1 / B2 / C1',
    groupSize: 'Máx. 8 alumnos',
    scheduleSummary: 'Martes y Jueves · 19:00 – 20:30',
    modules: [
      {
        id: 'eg-m1',
        title: 'Módulo 1 · Fluidez cotidiana y tiempos narrativos',
        duration: '2 semanas',
        summary: 'Narración de experiencias, phrasal verbs esenciales y pronunciación de vocales largas.',
        completed: true,
      },
      {
        id: 'eg-m2',
        title: 'Módulo 2 · Argumentación y debates reales',
        duration: '3 semanas',
        summary: 'Conectores de opinión, condicionales mixtos y práctica de Speaking Part 3.',
        completed: true,
      },
      {
        id: 'eg-m3',
        title: 'Módulo 3 · Comprensión auditiva y acentos británicos',
        duration: '3 semanas',
        summary: 'Estrategias para Listening activo, modismos actuales y toma de notas rápida.',
        completed: true,
      },
      {
        id: 'eg-m4',
        title: 'Módulo 4 · Redacción formal, ensayos y emails',
        duration: '2 semanas',
        summary: 'Estructura de artículos, cartas formales y registro académico para certificación.',
        completed: false,
      },
      {
        id: 'eg-m5',
        title: 'Módulo 5 · Simulacro completo Cambridge y feedback 1:1',
        duration: '2 semanas',
        summary: 'Examen completo cronometrado con rúbrica oficial y sesión individual de mejora.',
        completed: false,
      },
    ],
    testimonials: [
      {
        id: 't1',
        studentName: 'Marc Soler',
        role: 'Ingeniero de software en Gandía',
        outcome: 'Aprobó Cambridge B2 First en 12 semanas',
        quote:
          'Llegué bloqueado al hablar y en tres meses gané la soltura para presentar proyectos en inglés en mi empresa.',
        rating: 5,
      },
      {
        id: 't2',
        studentName: 'Lucía Ferrando',
        role: 'Estudiante de Turismo UPV Gandía',
        outcome: 'Subió de B1 a B2 con nota 174/190',
        quote:
          'Las clases de Sarah son dinámicas y muy prácticas. El grupo reducido hace que hables el 80% de la clase.',
        rating: 5,
      },
    ],
    faqs: [
      {
        id: 'f1',
        question: '¿Cómo sé en qué nivel empezar?',
        answer:
          'Antes de iniciar realizamos una prueba oral breve de 15 minutos con nuestra coordinación académica para ubicarte en el grupo exacto.',
      },
      {
        id: 'f2',
        question: '¿Puedo alternar entre presencial en Gandía y online?',
        answer:
          'Sí, todas nuestras aulas están equipadas con cámara y audio profesional para que te conectes en directo si un día no puedes desplazarte.',
      },
    ],
  },
  {
    id: 'business-english',
    title: 'Inglés de Negocios',
    shortTitle: 'Inglés de Negocios',
    language: 'Inglés',
    levelRange: 'B1 – C1',
    levelCategory: 'Especializado',
    format: 'Presencial / Online',
    ageGroup: 'Adultos',
    duration: 'Flexible',
    priceLabel: 'Consultar',
    priceMonthly: null,
    kicker: 'Negocios · Empresas',
    featured: false,
    description:
      'Entrenamiento ejecutivo para reuniones internacionales, negociación, presentaciones y redacción corporativa.',
    longDescription:
      'Diseñado para profesionales de la Safor y equipos corporativos bonificables por FUNDAE. Trabajamos casos reales de tu sector: pitch de ventas, llamadas con clientes internacionales, entrevistas directivas y reportes ejecutivos.',
    image: '/src/assets/images/course_business_english_1795207556962.jpg',
    teacherId: 'sarah',
    examPrep: 'BEC / Aptis Empresarial',
    groupSize: '1 a 6 profesionales',
    scheduleSummary: 'Horarios flexibles · Mediodía o tardes',
    modules: [
      {
        id: 'be-m1',
        title: 'Módulo 1 · Reuniones ágiles y facilitación internacional',
        duration: '3 semanas',
        summary: 'Cómo moderar videollamadas, interrumpir con diplomacia y resumir acuerdos.',
        completed: false,
      },
      {
        id: 'be-m2',
        title: 'Módulo 2 · Presentaciones de alto impacto y storytelling',
        duration: '3 semanas',
        summary: 'Vocabulario de métricas, defensa de presupuestos y turno de preguntas.',
        completed: false,
      },
      {
        id: 'be-m3',
        title: 'Módulo 3 · Negociación y comunicación escrita ejecutiva',
        duration: '4 semanas',
        summary: 'Propuestas comerciales, resolución de incidencias y tono asertivo.',
        completed: false,
      },
    ],
    testimonials: [
      {
        id: 't3',
        studentName: 'Carlos Navarro',
        role: 'Director de exportación hortofrutícola',
        outcome: 'Cerró acuerdos con distribuidores en Reino Unido y Países Bajos',
        quote:
          'Trabajamos directamente sobre nuestras presentaciones reales de feria. La inversión se amortizó en el primer viaje.',
        rating: 5,
      },
    ],
    faqs: [
      {
        id: 'f3',
        question: '¿Es bonificable para empresas?',
        answer:
          'Sí, gestionamos la documentación para formación bonificada FUNDAE tanto para grupos in-company como para profesionales individuales.',
      },
    ],
  },
  {
    id: 'advantage-kids',
    title: 'Advantage Kids (3-12 años)',
    shortTitle: 'Advantage Kids',
    language: 'Inglés',
    levelRange: 'Pre-A1 – A2',
    levelCategory: 'Especializado',
    format: 'Presencial',
    ageGroup: 'Kids',
    duration: 'Trimestral',
    priceLabel: 'Desde 70€/mes',
    priceMonthly: 70,
    kicker: 'Niños · 3 a 12 años',
    featured: false,
    description:
      'Inmersión natural mediante juegos, storytelling, música y método phonics en grupos divididos por edad.',
    longDescription:
      'En Advantage Kids los niños adquieren el inglés sin memorización pasiva. Agrupados por etapas (3-5, 6-8 y 9-12 años), desarrollan oído nativo, pronunciación natural y confianza para comunicarse mientras juegan y crean proyectos.',
    image: '/src/assets/images/course_advantage_kids_1795207557058.jpg',
    teacherId: 'laura',
    examPrep: 'Cambridge Young Learners (Starters, Movers, Flyers)',
    groupSize: 'Máx. 7 niños',
    scheduleSummary: 'Lunes y Miércoles · 17:30 – 18:30',
    modules: [
      {
        id: 'ak-m1',
        title: 'Trimestre 1 · Phonics, rutinas y escucha activa',
        duration: '4 semanas',
        summary: 'Asociación sonido-grafía, canciones rítmicas y vocabulario sensorial.',
        completed: true,
      },
      {
        id: 'ak-m2',
        title: 'Trimestre 2 · Storytelling y juego teatral guiado',
        duration: '4 semanas',
        summary: 'Comprensión de cuentos ilustrados y pequeños diálogos en parejas.',
        completed: false,
      },
      {
        id: 'ak-m3',
        title: 'Trimestre 3 · Proyectos creativos y muestra familiar',
        duration: '4 semanas',
        summary: 'Mini presentaciones en inglés sobre ciencia, naturaleza y cultura.',
        completed: false,
      },
    ],
    testimonials: [
      {
        id: 't4',
        studentName: 'Elena Martí',
        role: 'Madre de alumno de 7 años en Gandía',
        outcome: 'Pasó de timidez total a cantar y responder en inglés en casa',
        quote:
          'Laura tiene una energía increíble. Mi hijo pide ir a clase cada tarde y nos enseña palabras nuevas al salir.',
        rating: 5,
      },
    ],
    faqs: [
      {
        id: 'f4',
        question: '¿Cómo reciben seguimiento las familias?',
        answer:
          'Enviamos un resumen mensual con los objetivos trabajados, audios de práctica y tutoría trimestral con Laura Pérez.',
      },
    ],
  },
  {
    id: 'german-general',
    title: 'Alemán General A1-C2',
    shortTitle: 'Alemán General',
    language: 'Alemán',
    levelRange: 'A1 – C2',
    levelCategory: 'A1-C2',
    format: 'Presencial / Online',
    ageGroup: 'Adultos',
    duration: '12 semanas',
    priceLabel: 'Desde 90€/mes',
    priceMonthly: 90,
    kicker: 'Goethe prep · A1–C2',
    featured: false,
    description:
      'Estructura clara desde cero hasta nivel avanzado con preparación oficial para exámenes Goethe-Zertifikat.',
    longDescription:
      'Desmontamos el mito de que el alemán es difícil. Con un método visual para declinaciones, orden sintáctico y práctica oral intensiva junto a Hans Müller, avanzarás con seguridad hacia tu certificación oficial Goethe.',
    image: '/src/assets/images/course_german_goethe_1795207557025.jpg',
    teacherId: 'hans',
    examPrep: 'Goethe-Zertifikat A1 – C1',
    groupSize: 'Máx. 8 alumnos',
    scheduleSummary: 'Lunes y Miércoles · 19:30 – 21:00',
    modules: [
      {
        id: 'de-m1',
        title: 'Módulo 1 · Fonética, casos y conversación inicial',
        duration: '4 semanas',
        summary: 'Pronunciación clara, nominativo/acusativo y situaciones cotidianas en Alemania.',
        completed: false,
      },
      {
        id: 'de-m2',
        title: 'Módulo 2 · Sintaxis subordinada y entorno laboral',
        duration: '4 semanas',
        summary: 'Dativo, verbos separables, conectores y entrevistas profesionales.',
        completed: false,
      },
      {
        id: 'de-m3',
        title: 'Módulo 3 · Simulacros Goethe-Zertifikat',
        duration: '4 semanas',
        summary: 'Entrenamiento cronometrado de Lesen, Hören, Schreiben y Sprechen.',
        completed: false,
      },
    ],
    testimonials: [
      {
        id: 't5',
        studentName: 'Pablo Orts',
        role: 'Fisioterapeuta trasladado a Múnich',
        outcome: 'Certificó B2 Goethe en 6 meses desde A2',
        quote:
          'Hans explica la gramática con lógica de ingeniero y exige hablar desde el día uno. Imprescindible para irte a trabajar.',
        rating: 5,
      },
    ],
    faqs: [
      {
        id: 'f5',
        question: '¿Se necesita base previa para empezar alemán?',
        answer:
          'No, abrimos cohortes de nivel A1 cero cada trimestre en formato presencial en Gandía y online en directo.',
      },
    ],
  },
  {
    id: 'french-general',
    title: 'Francés General A1-C2',
    shortTitle: 'Francés General',
    language: 'Francés',
    levelRange: 'A1 – C2',
    levelCategory: 'A1-C2',
    format: 'Presencial / Online',
    ageGroup: 'Adultos',
    duration: '12 semanas',
    priceLabel: 'Desde 90€/mes',
    priceMonthly: 90,
    kicker: 'DELF prep · A1–C2',
    featured: false,
    description:
      'Inmersión francófona enfocada en entonación natural, cultura actual y preparación oficial DELF y DALF.',
    longDescription:
      'Aprende francés real con Marie Dupont combinando prensa actual, podcasts, práctica oral constante y preparación estructurada para superar los exámenes oficiales DELF B1/B2 y DALF C1 de la Alliance Française.',
    image: '/src/assets/images/course_french_delf_1795207556910.jpg',
    teacherId: 'marie',
    examPrep: 'DELF B1 / B2 · DALF C1',
    groupSize: 'Máx. 8 alumnos',
    scheduleSummary: 'Martes y Jueves · 18:00 – 19:30',
    modules: [
      {
        id: 'fr-m1',
        title: 'Módulo 1 · Fonética nasal, liaison y fluidez oral',
        duration: '4 semanas',
        summary: 'Ritmo del francés hablado, comprensión de audio natural y vocabulario vivo.',
        completed: false,
      },
      {
        id: 'fr-m2',
        title: 'Módulo 2 · Tiempos del pasado y argumentación DELF',
        duration: '4 semanas',
        summary: 'Passé composé vs imparfait, exposición de temas de actualidad y debate.',
        completed: false,
      },
      {
        id: 'fr-m3',
        title: 'Módulo 3 · Producción escrita y simulacro oficial',
        duration: '4 semanas',
        summary: 'Ensayos argumentativos, synthèse de documents y defensa oral cronometrada.',
        completed: false,
      },
    ],
    testimonials: [
      {
        id: 't6',
        studentName: 'Marta Ribes',
        role: 'Docente de secundaria en la Safor',
        outcome: 'Obtuvo el DELF B2 a la primera convocatoria',
        quote:
          'Marie corrige cada matiz de pronunciación con paciencia y te prepara específicamente para lo que evalúa el tribunal.',
        rating: 5,
      },
    ],
    faqs: [
      {
        id: 'f6',
        question: '¿Incluye material didáctico para DELF/DALF?',
        answer:
          'Sí, todas las guías, dosieres de ejercicios y audios de preparación están incluidos en la plataforma del alumno.',
      },
    ],
  },
  {
    id: 'online-flexible',
    title: 'Clases Online Flexibles',
    shortTitle: 'Clases Online',
    language: 'Inglés',
    levelRange: 'A1 – C2',
    levelCategory: 'A1-C2',
    format: 'Online',
    ageGroup: 'Adultos',
    duration: 'Flexible',
    priceLabel: 'Desde 80€/mes',
    priceMonthly: 80,
    kicker: 'Online · Flexible',
    featured: true,
    description:
      'Sesiones en directo desde cualquier lugar con acceso a grabaciones, chat de cohorte y tutorías individuales.',
    longDescription:
      'Pensado para quienes buscan máxima flexibilidad horaria sin perder la cercanía de un profesor nativo. Elige idioma (inglés, alemán o francés), reserva tus bloques semanales y accede a grabaciones y correcciones en 24h.',
    image: '/src/assets/images/live_class_sarah_1795207556949.jpg',
    teacherId: 'sarah',
    examPrep: 'Adaptado a tu objetivo',
    groupSize: '1 a 6 alumnos en directo',
    scheduleSummary: 'Franjas de 08:30 a 21:30 · Lunes a Sábado',
    modules: [
      {
        id: 'on-m1',
        title: 'Bloque 1 · Diagnóstico oral y hoja de ruta personal',
        duration: '2 semanas',
        summary: 'Evaluación inicial 1:1 y diseño de objetivos comunicativos mensuales.',
        completed: false,
      },
      {
        id: 'on-m2',
        title: 'Bloque 2 · Sesiones en vivo y role-play guiado',
        duration: '6 semanas',
        summary: 'Práctica interactiva en sala en vivo con notas descargables al instante.',
        completed: false,
      },
      {
        id: 'on-m3',
        title: 'Bloque 3 · Revisión de progreso y certificación',
        duration: '4 semanas',
        summary: 'Evaluación de avance MCER y recomendaciones para el siguiente nivel.',
        completed: false,
      },
    ],
    testimonials: [
      {
        id: 't7',
        studentName: 'Javier Peiró',
        role: 'Consultor de marketing digital',
        outcome: 'Completó 24 clases seguidas pese a viajar semanalmente',
        quote:
          'Poder conectarme desde cualquier ciudad y tener las notas del profesor descargables en la app cambió mi constancia.',
        rating: 5,
      },
    ],
    faqs: [
      {
        id: 'f7',
        question: '¿Qué pasa si un día no puedo asistir a la sesión en vivo?',
        answer:
          'Puedes reprogramar con 12 horas de antelación o revisar la grabación HD y las notas descargables desde tu panel.',
      },
    ],
  },
];

export const INITIAL_ENROLLED_COURSES: EnrolledCourse[] = [
  {
    courseId: 'english-general',
    progress: 65,
    nextClassLabel: 'Jueves 19:00 · Clase en vivo',
    completedModuleIds: ['eg-m1', 'eg-m2', 'eg-m3'],
    cohortName: 'Inglés B1 · Gandía Tarde',
  },
  {
    courseId: 'advantage-kids',
    progress: 40,
    nextClassLabel: 'Lunes 17:30 · Taller presencial',
    completedModuleIds: ['ak-m1'],
    cohortName: 'Advantage Kids · Programa Familiar',
  },
];

export const LIVE_CLASSES: LiveClassSession[] = [
  {
    id: 'live-1',
    courseId: 'english-general',
    title: 'Speaking Workshop: Phrasal Verbs & Negotiations',
    courseTitle: 'Inglés General B1',
    teacherId: 'sarah',
    dateLabel: 'Hoy',
    timeLabel: '19:00 – 20:30',
    modality: 'Híbrida · Gandía',
    meetingUrl: 'https://meet.advantagegandia.es/sala-b1-sarah',
    canJoinNow: true,
    minutesUntilStart: 8,
  },
  {
    id: 'live-2',
    courseId: 'advantage-kids',
    title: 'Phonics & Storytelling Session (Grupo B)',
    courseTitle: 'Advantage Kids',
    teacherId: 'laura',
    dateLabel: 'Lunes 23 Nov',
    timeLabel: '17:30 – 18:30',
    modality: 'Híbrida · Gandía',
    meetingUrl: 'https://meet.advantagegandia.es/sala-kids-laura',
    canJoinNow: false,
    minutesUntilStart: 4230,
  },
  {
    id: 'live-3',
    courseId: 'german-general',
    title: 'Goethe B1: Hörverstehen & Redacción Práctica',
    courseTitle: 'Alemán General A1-C2',
    teacherId: 'hans',
    dateLabel: 'Miércoles 25 Nov',
    timeLabel: '19:30 – 21:00',
    modality: 'Online en vivo',
    meetingUrl: 'https://meet.advantagegandia.es/sala-de-hans',
    canJoinNow: false,
    minutesUntilStart: 7110,
  },
];

export const GRADED_SUBMISSIONS: GradedSubmission[] = [
  {
    id: 'sub-1',
    title: 'Writing Essay · Remote Work Culture',
    courseTitle: 'Inglés General B1',
    submittedAt: 'Hace 2 días',
    score: '9.2 / 10',
    feedback: 'Excelente uso de conectores formales y coherencia entre párrafos.',
    teacherName: 'Sarah Johnson',
  },
  {
    id: 'sub-2',
    title: 'Audio Roleplay · Job Interview Simulation',
    courseTitle: 'Inglés General B1',
    submittedAt: 'Hace 6 días',
    score: '8.8 / 10',
    feedback: 'Muy buena entonación. Repasar la preposición en "responsible for".',
    teacherName: 'Sarah Johnson',
  },
  {
    id: 'sub-3',
    title: 'Actividad Phonics · Cuento ilustrado',
    courseTitle: 'Advantage Kids',
    submittedAt: 'Hace 9 días',
    score: '9.5 / 10',
    feedback: 'Dinámica creativa muy clara para niños de 6-8 años.',
    teacherName: 'Laura Pérez',
  },
];

export const COHORT_RANKING: CohortMember[] = [
  { id: 'c1', name: 'Carlos Mendoza', initials: 'CM', level: 'B1 Inglés', points: 1620 },
  { id: 'c2', name: 'Ana Belén Ivars', initials: 'AB', level: 'B1 Inglés', points: 1450, isCurrentUser: true },
  { id: 'c3', name: 'Sofía Llopis', initials: 'SL', level: 'B1 Inglés', points: 1390 },
  { id: 'c4', name: 'Diego García', initials: 'DG', level: 'B1 Inglés', points: 1280 },
  { id: 'c5', name: 'Nuria Català', initials: 'NC', level: 'B1 Inglés', points: 1190 },
];

export const INITIAL_COMMUNITY_MESSAGES: CommunityMessage[] = [
  {
    id: 'msg-1',
    authorName: 'Sarah Johnson',
    authorRole: 'Profesora TEFL · Inglés',
    initials: 'SJ',
    time: '18:15',
    channel: 'Cohorte B1 Gandía',
    text: '¡Buenas tardes grupo! Ya tenéis subido el glosario de phrasal verbs para el taller de hoy a las 19:00.',
    isTeacher: true,
  },
  {
    id: 'msg-2',
    authorName: 'Carlos Mendoza',
    authorRole: 'Alumno B1',
    initials: 'CM',
    time: '18:24',
    channel: 'Cohorte B1 Gandía',
    text: 'Genial Sarah, ¿revisamos también el simulacro de Listening Part 2 antes de cerrar la sesión?',
  },
  {
    id: 'msg-3',
    authorName: 'Sofía Llopis',
    authorRole: 'Alumna B1',
    initials: 'SL',
    time: '18:32',
    channel: 'Cohorte B1 Gandía',
    text: 'Yo hoy me conecto online desde Valencia y me uno 10 minutos antes para probar el micro.',
  },
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Convocatoria abierta simulacro Cambridge B1 & B2 en Gandía',
    author: 'Dirección Académica Advantage',
    date: '20 Nov 2026',
    category: 'Exámenes Oficiales',
    body: 'El próximo viernes 27 realizaremos simulacros completos presenciales en nuestra sede de Passeig Germanies con corrección detallada.',
  },
  {
    id: 'ann-2',
    title: 'Nuevos horarios de conversación de alemán A2-B1',
    author: 'Hans Müller',
    date: '18 Nov 2026',
    category: 'Horarios',
    body: 'Abrimos grupo de práctica oral los miércoles a las 18:00 para reforzar preparación Goethe.',
  },
];

export const ACADEMY_EVENTS: AcademyEvent[] = [
  {
    id: 'ev-1',
    title: 'Speaking & Coffee Club · Inglés y Francés',
    date: 'Viernes 27 Nov · 18:30',
    location: 'Cafetería Advantage Gandía',
    spotsLeft: 6,
    rsvped: false,
  },
  {
    id: 'ev-2',
    title: 'Taller gratuito Advantage Kids: Winter Crafts in English',
    date: 'Sábado 5 Dic · 11:00',
    location: 'Aula Creativa · Sede Gandía',
    spotsLeft: 4,
    rsvped: false,
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Inglés Comunicativo A2 · MCER Completado',
    level: 'A2 Consolidado',
    language: 'Inglés',
    issueDate: '14 Sep 2026',
    credentialCode: 'ADV-GAN-2026-8419',
    teacherName: 'Sarah Johnson',
    hours: 72,
    grade: '9.4 / 10 · Sobresaliente',
  },
  {
    id: 'cert-2',
    title: 'Módulo Fundamentos Advantage Kids (Metodología)',
    level: 'Especialización',
    language: 'Inglés Infantil',
    issueDate: '02 Nov 2026',
    credentialCode: 'ADV-KIDS-2026-3092',
    teacherName: 'Laura Pérez',
    hours: 24,
    grade: '9.6 / 10 · Apto con mención',
  },
];

export const LIVE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Choose the most natural phrasal verb for a business meeting: "We need to _____ the proposal before Friday."',
    options: ['go over', 'go across', 'take under', 'put over'],
    correctIndex: 0,
    explanation: '"Go over" significa revisar o repasar un documento o propuesta con detalle.',
  },
  {
    id: 'q2',
    question: 'Which sentence is grammatically accurate for a B1 Cambridge Speaking response?',
    options: [
      'I am living in Gandía since five years.',
      'I have lived in Gandía for five years.',
      'I live in Gandía since five years ago.',
      'I have been live in Gandía for five years.',
    ],
    correctIndex: 1,
    explanation: 'Usamos Present Perfect ("have lived") + "for" para expresar duración hasta el presente.',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Tu clase en vivo comienza en 8 minutos',
    detail: 'Inglés General B1 con Sarah Johnson · Sala abierta para unirte.',
    time: 'Ahora',
    read: false,
    targetScreen: 'live',
  },
  {
    id: 'n2',
    title: 'Entrega corregida: Writing Essay (9.2 / 10)',
    detail: 'Sarah Johnson ha dejado comentarios detallados en tu última tarea.',
    time: 'Hace 2 h',
    read: false,
    targetScreen: 'progress',
  },
  {
    id: 'n3',
    title: 'Nuevo evento en Gandía: Speaking & Coffee Club',
    detail: 'Quedan 6 plazas disponibles para el viernes 27 de noviembre.',
    time: 'Ayer',
    read: true,
    targetScreen: 'community',
  },
];

export const LANGUAGE_PROGRESS = [
  { language: 'Inglés', level: 'B1 · 65%', percentage: 65, color: '#6C22A6' },
  { language: 'Alemán', level: 'A1 · 28%', percentage: 28, color: '#96E9C6' },
  { language: 'Francés', level: 'A1 · 15%', percentage: 15, color: '#a855f7' },
];
