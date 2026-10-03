export type UserRole = 'student' | 'admin' | 'instructor';

export interface User {
  id: string;
  email: string;
  phone: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export type CourseCategory = 
  | 'Loksewa (लोकसेवा)'
  | 'Banking (बैंकिङ)'
  | 'CMAT & Entrance'
  | 'Engineering & Medical';

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  title_nepali?: string;
  duration_minutes: number;
  video_url: string; // VdoCipher/Bunny DRM stream ID or stream URL
  order_index: number;
  is_free_preview: boolean;
  notes_pdf_url?: string;
  notes_title?: string;
  summary_text?: string;
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  order_index: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  title_nepali?: string;
  slug: string;
  description: string;
  description_nepali?: string;
  price_npr: number;
  original_price_npr: number;
  thumbnail_url: string;
  category: CourseCategory;
  level: string; // e.g., 'Level 4/5', 'NaSu / Section Officer'
  instructor_name: string;
  instructor_title: string;
  instructor_avatar: string;
  total_hours: number;
  total_lessons: number;
  rating: number;
  enrolled_count: number;
  is_published: boolean;
  is_live_class: boolean;
  live_class_schedule?: string;
  modules: CourseModule[];
  features: string[];
}

export type PaymentMethod = 'esewa' | 'khalti' | 'connectips';

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  payment_method: PaymentMethod;
  transaction_id: string;
  amount_paid: number;
  status: 'active' | 'pending' | 'expired';
  enrolled_at: string;
  completed_lessons: string[]; // lesson ids
  last_watched_lesson_id?: string;
}

export interface QuizQuestion {
  id: string;
  exam_id: string;
  question_en: string;
  question_np?: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text_en: string;
    text_np?: string;
  }[];
  correct_option: 'A' | 'B' | 'C' | 'D';
  explanation_en: string;
  explanation_np?: string;
  subject_section: 'General Knowledge' | 'IQ & Mental Ability' | 'Banking & Management' | 'English & Verbal';
}

export interface QuizExam {
  id: string;
  title: string;
  title_nepali: string;
  category: CourseCategory;
  duration_minutes: number;
  total_marks: number;
  negative_marking_percent: number; // e.g. 20% for Loksewa
  pass_marks: number;
  instructions: string[];
  questions: QuizQuestion[];
}

export interface QuizSubmission {
  id: string;
  user_id: string;
  exam_id: string;
  exam_title: string;
  submitted_at: string;
  total_questions: number;
  attempted_count: number;
  correct_count: number;
  incorrect_count: number;
  unattempted_count: number;
  raw_score: number;
  negative_deductions: number;
  final_score: number;
  percentage: number;
  percentile_rank: number;
  time_spent_seconds: number;
  user_answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
}

export interface UpcomingExam {
  id: string;
  organization: string;
  organization_nepali: string;
  post_name: string;
  post_name_nepali: string;
  date_bs: string;
  date_ad: string;
  days_remaining: number;
  level: string;
  syllabus_url: string;
  application_deadline_bs: string;
}

export interface QnAPost {
  id: string;
  lesson_id: string;
  author_name: string;
  author_avatar: string;
  question: string;
  created_at: string;
  upvotes: number;
  instructor_reply?: {
    author: string;
    reply: string;
    replied_at: string;
  };
}

export interface OfflineCachedNote {
  lesson_id: string;
  course_id: string;
  course_title: string;
  title: string;
  cached_at: string;
  content: string;
  file_size_kb: number;
}
