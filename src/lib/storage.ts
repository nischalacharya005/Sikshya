import { User, Enrollment, OfflineCachedNote, QuizSubmission, QnAPost, Course } from '../types';
import { INITIAL_USER, INITIAL_COURSES, INITIAL_QNA } from './initialData';

const STORAGE_KEYS = {
  USER: 'shiksha_user',
  ENROLLMENTS: 'shiksha_enrollments',
  COMPLETED_LESSONS: 'shiksha_completed_lessons',
  OFFLINE_NOTES: 'shiksha_offline_notes',
  QUIZ_SUBMISSIONS: 'shiksha_quiz_submissions',
  QNA_POSTS: 'shiksha_qna_posts',
  CUSTOM_COURSES: 'shiksha_custom_courses',
  DARK_MODE: 'shiksha_dark_mode'
};

export function getStoredUser(): User {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load user', e);
  }
  return INITIAL_USER;
}

export function saveStoredUser(user: User): void {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function getEnrollments(): Enrollment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load enrollments', e);
  }
  // Default enrolled in NaSu course for instant testing
  const defaultEnrollments: Enrollment[] = [
    {
      id: 'enr_sample_01',
      user_id: INITIAL_USER.id,
      course_id: 'crs_loksewa_nasu_01',
      payment_method: 'esewa',
      transaction_id: 'ESEWA-TXN-892401',
      amount_paid: 3999,
      status: 'active',
      enrolled_at: '2026-09-20T10:00:00Z',
      completed_lessons: ['les_101'],
      last_watched_lesson_id: 'les_102'
    }
  ];
  localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(defaultEnrollments));
  return defaultEnrollments;
}

export function saveEnrollment(enrollment: Enrollment): void {
  const list = getEnrollments();
  const existingIndex = list.findIndex(e => e.course_id === enrollment.course_id);
  if (existingIndex >= 0) {
    list[existingIndex] = enrollment;
  } else {
    list.unshift(enrollment);
  }
  localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(list));
}

export function isCourseEnrolled(courseId: string): boolean {
  const list = getEnrollments();
  return list.some(e => e.course_id === courseId && e.status === 'active');
}

export function getCompletedLessons(courseId: string): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
    if (raw) {
      const map = JSON.parse(raw);
      return map[courseId] || [];
    }
  } catch (e) {
    console.error('Failed to load completed lessons', e);
  }
  return ['les_101'];
}

export function toggleLessonCompletion(courseId: string, lessonId: string): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
    const map = raw ? JSON.parse(raw) : {};
    const list: string[] = map[courseId] || ['les_101'];
    let isCompletedNow = false;

    if (list.includes(lessonId)) {
      map[courseId] = list.filter(id => id !== lessonId);
      isCompletedNow = false;
    } else {
      map[courseId] = [...list, lessonId];
      isCompletedNow = true;
    }

    localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(map));
    return isCompletedNow;
  } catch (e) {
    console.error('Error toggling lesson completion', e);
    return false;
  }
}

export function getOfflineNotes(): OfflineCachedNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFLINE_NOTES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load offline notes', e);
  }
  return [
    {
      lesson_id: 'les_101',
      course_id: 'crs_loksewa_nasu_01',
      course_title: 'Loksewa Nayab Subba (NaSu) First Paper Masterclass',
      title: 'नेपालको सिमाना र भौगोलिक विभाजन विस्तृत टिपोट.pdf',
      cached_at: '2026-09-25T14:30:00Z',
      content: 'नेपाल २६ डिग्री २२ मिनेट देखि ३० डिग्री २७ मिनेट उत्तरी अक्षांश र ८० डिग्री ४ मिनेट देखि ८८ डिग्री १२ मिनेट पूर्वी देशान्तरमा अवस्थित छ।\n\n१. नेपालको पूर्व-पश्चिम औसत लम्बाइ: ८८५ किलोमिटर।\n२. उत्तर-दक्षिण औसत चौडाइ: १९३ किलोमिटर (अधिकतम २४१ कि.मी., न्यूनतम १४५ कि.मी.)।\n३. नेपालको कुल क्षेत्रफल: १,४७,५१६ वर्ग किलोमिटर (अध्यावधिक नक्सा २०७७)।\n४. नेपालले विश्वको ०.०३% र एशिया महादेशको ०.३% भूभाग ओगटेको छ।\n५. नेपाल समुन्द्र सतहबाट करिब ५९ मिटर (धनुषाको मुसहरनिया) देखि ८,८४८.८६ मिटर (सगरमाथा) सम्म उचाइमा फैलिएको छ।',
      file_size_kb: 48
    }
  ];
}

export function saveOfflineNote(note: OfflineCachedNote): void {
  const current = getOfflineNotes();
  const exists = current.findIndex(n => n.lesson_id === note.lesson_id);
  if (exists >= 0) {
    current[exists] = note;
  } else {
    current.unshift(note);
  }
  localStorage.setItem(STORAGE_KEYS.OFFLINE_NOTES, JSON.stringify(current));
}

export function removeOfflineNote(lessonId: string): void {
  const current = getOfflineNotes().filter(n => n.lesson_id !== lessonId);
  localStorage.setItem(STORAGE_KEYS.OFFLINE_NOTES, JSON.stringify(current));
}

export function getQuizSubmissions(): QuizSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_SUBMISSIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load quiz submissions', e);
  }
  return [];
}

export function saveQuizSubmission(sub: QuizSubmission): void {
  const list = getQuizSubmissions();
  list.unshift(sub);
  localStorage.setItem(STORAGE_KEYS.QUIZ_SUBMISSIONS, JSON.stringify(list));
}

export function getQnAPosts(): QnAPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QNA_POSTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load Q&A', e);
  }
  return INITIAL_QNA;
}

export function addQnAPost(post: QnAPost): void {
  const list = getQnAPosts();
  list.unshift(post);
  localStorage.setItem(STORAGE_KEYS.QNA_POSTS, JSON.stringify(list));
}

export function getCourses(): Course[] {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_COURSES);
    if (custom) {
      const parsed = JSON.parse(custom);
      return [...parsed, ...INITIAL_COURSES];
    }
  } catch (e) {
    console.error('Failed to load courses', e);
  }
  return INITIAL_COURSES;
}

export function addNewCourse(course: Course): void {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_COURSES);
    const list: Course[] = custom ? JSON.parse(custom) : [];
    list.unshift(course);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_COURSES, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to add course', e);
  }
}
