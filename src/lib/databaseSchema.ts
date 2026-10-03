/**
 * Supabase / PostgreSQL Relational Database Schema & Migration Script
 * Matches production standards for Shiksha LMS
 */

export const POSTGRESQL_MIGRATION_SQL = `-- Shiksha LMS Database Migration (Supabase / PostgreSQL)
-- Target: Loksewa, Banking, CMAT Nepalese E-Learning Platform

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Enums
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('student', 'admin', 'instructor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_gateway AS ENUM ('esewa', 'khalti', 'connectips');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE enrollment_status AS ENUM ('active', 'pending', 'expired', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Users Table (Integrated with Supabase Auth or Standalone Auth)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role user_role DEFAULT 'student'::user_role NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    title_nepali VARCHAR(255),
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    description_nepali TEXT,
    price_npr NUMERIC(10, 2) NOT NULL CHECK (price_npr >= 0),
    original_price_npr NUMERIC(10, 2) NOT NULL CHECK (original_price_npr >= price_npr),
    thumbnail_url TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    level VARCHAR(100) NOT NULL,
    instructor_name VARCHAR(150) NOT NULL,
    instructor_title VARCHAR(150) NOT NULL,
    instructor_avatar TEXT,
    total_hours NUMERIC(5, 1) DEFAULT 0.0,
    total_lessons INT DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT 4.9,
    enrolled_count INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true NOT NULL,
    is_live_class BOOLEAN DEFAULT false NOT NULL,
    live_class_schedule TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Course Modules Table (Curriculum Sections)
CREATE TABLE IF NOT EXISTS public.course_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    order_index INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 6. Lessons Table (Video hosting with Bunny.net / VdoCipher DRM reference)
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    module_id UUID REFERENCES public.course_modules(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    title_nepali VARCHAR(255),
    video_id VARCHAR(255) NOT NULL, -- Bunny.net / VdoCipher DRM video token
    duration_minutes INT DEFAULT 15,
    order_index INT NOT NULL DEFAULT 1,
    is_free_preview BOOLEAN DEFAULT false NOT NULL,
    notes_pdf_url TEXT,
    notes_title VARCHAR(255),
    summary_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 7. Enrollments Table (Local Nepalese Payment Gateways)
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    payment_method payment_gateway NOT NULL,
    transaction_id VARCHAR(100) UNIQUE NOT NULL,
    amount_paid NUMERIC(10, 2) NOT NULL,
    status enrollment_status DEFAULT 'active'::enrollment_status NOT NULL,
    completed_lessons JSONB DEFAULT '[]'::jsonb,
    last_watched_lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT unique_user_course UNIQUE(user_id, course_id)
);

-- 8. Mock Test Exams Table
CREATE TABLE IF NOT EXISTS public.quiz_exams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    title_nepali VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    duration_minutes INT NOT NULL DEFAULT 45,
    total_marks INT NOT NULL DEFAULT 100,
    negative_marking_percent NUMERIC(4, 2) DEFAULT 20.00, -- Standard Loksewa 20% negative deduction
    pass_marks INT NOT NULL DEFAULT 40,
    instructions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. Quiz Questions Table
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id UUID NOT NULL REFERENCES public.quiz_exams(id) ON DELETE CASCADE,
    question_en TEXT NOT NULL,
    question_np TEXT,
    options JSONB NOT NULL, -- Array of { key: 'A', text_en: '...', text_np: '...' }
    correct_option CHAR(1) NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
    explanation_en TEXT NOT NULL,
    explanation_np TEXT,
    subject_section VARCHAR(100) NOT NULL,
    order_index INT NOT NULL DEFAULT 1
);

-- 10. Quiz Submissions Table
CREATE TABLE IF NOT EXISTS public.quiz_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    exam_id UUID NOT NULL REFERENCES public.quiz_exams(id) ON DELETE CASCADE,
    attempted_count INT NOT NULL,
    correct_count INT NOT NULL,
    incorrect_count INT NOT NULL,
    raw_score NUMERIC(6, 2) NOT NULL,
    negative_deductions NUMERIC(6, 2) NOT NULL,
    final_score NUMERIC(6, 2) NOT NULL,
    percentage NUMERIC(5, 2) NOT NULL,
    percentile_rank NUMERIC(5, 2) NOT NULL,
    time_spent_seconds INT NOT NULL,
    user_answers JSONB NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 11. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON public.lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_exam ON public.quiz_questions(exam_id);

-- 12. Supabase Row Level Security (RLS) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Courses and lessons are viewable by anyone
CREATE POLICY "Public courses are viewable by everyone" ON public.courses
    FOR SELECT USING (is_published = true);

-- Free preview lessons can be viewed by all; enrolled lessons require active enrollment
CREATE POLICY "Lessons preview accessible to all" ON public.lessons
    FOR SELECT USING (
        is_free_preview = true OR
        EXISTS (
            SELECT 1 FROM public.enrollments e
            WHERE e.course_id = lessons.course_id
            AND e.user_id = auth.uid()
            AND e.status = 'active'
        )
    );

-- User can view their own enrollments
CREATE POLICY "Users can view own enrollments" ON public.enrollments
    FOR SELECT USING (auth.uid() = user_id);
`;
