export type AppScreen =
  | 'home'
  | 'courses'
  | 'live'
  | 'progress'
  | 'certificates'
  | 'community'
  | 'settings'
  | 'course-detail';

export type LanguageFilter = 'Todos' | 'Inglés' | 'Alemán' | 'Francés';
export type LevelFilter = 'Todos' | 'A1-C2' | 'Especializado';
export type FormatFilter = 'Todos' | 'Presencial' | 'Online';
export type AgeFilter = 'Todos' | 'Adultos' | 'Kids';

export interface User {
  id: string;
  name: string;
  email: string;
  level: string;
  targetLanguage: string;
  points: number;
  streakDays: number;
  cohort: string;
  campus: string;
}

export interface Teacher {
  id: string;
  name: string;
  language: string;
  nationality: string;
  credentials: string;
  bio: string;
  experienceYears: number;
  rating: number;
  initials: string;
  accentColor: string;
}

export interface ModuleItem {
  id: string;
  title: string;
  duration: string;
  summary: string;
  completed: boolean;
}

export interface Testimonial {
  id: string;
  studentName: string;
  role: string;
  outcome: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  title: string;
  shortTitle: string;
  language: 'Inglés' | 'Alemán' | 'Francés';
  levelRange: string;
  levelCategory: 'A1-C2' | 'Especializado';
  format: 'Presencial' | 'Online' | 'Presencial / Online';
  ageGroup: 'Adultos' | 'Kids';
  duration: string;
  priceLabel: string;
  priceMonthly: number | null;
  kicker: string;
  featured: boolean;
  description: string;
  longDescription: string;
  image: string;
  teacherId: string;
  examPrep?: string;
  groupSize: string;
  scheduleSummary: string;
  modules: ModuleItem[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
}

export interface EnrolledCourse {
  courseId: string;
  progress: number;
  nextClassLabel: string;
  completedModuleIds: string[];
  cohortName: string;
}

export interface LiveClassSession {
  id: string;
  courseId: string;
  title: string;
  courseTitle: string;
  teacherId: string;
  dateLabel: string;
  timeLabel: string;
  modality: 'Online en vivo' | 'Híbrida · Gandía';
  meetingUrl: string;
  canJoinNow: boolean;
  minutesUntilStart: number;
}

export interface GradedSubmission {
  id: string;
  title: string;
  courseTitle: string;
  submittedAt: string;
  score: string;
  feedback: string;
  teacherName: string;
}

export interface CohortMember {
  id: string;
  name: string;
  initials: string;
  level: string;
  points: number;
  isCurrentUser?: boolean;
}

export interface CommunityMessage {
  id: string;
  authorName: string;
  authorRole: string;
  initials: string;
  time: string;
  channel: string;
  text: string;
  isTeacher?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  author: string;
  date: string;
  body: string;
  category: string;
}

export interface AcademyEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  spotsLeft: number;
  rsvped: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  level: string;
  language: string;
  issueDate: string;
  credentialCode: string;
  teacherName: string;
  hours: number;
  grade: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  read: boolean;
  targetScreen?: AppScreen;
}
