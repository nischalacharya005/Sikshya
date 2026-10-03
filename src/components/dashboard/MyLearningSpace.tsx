import React, { useState, useEffect } from 'react';
import { 
  PlayCircle, 
  BookOpen, 
  FileText, 
  Award, 
  Clock, 
  Download, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink,
  WifiOff
} from 'lucide-react';
import { Course, Enrollment, OfflineCachedNote, QuizSubmission, User } from '../../types';
import { getEnrollments, getOfflineNotes, removeOfflineNote, getQuizSubmissions, getCompletedLessons } from '../../lib/storage';

interface MyLearningSpaceProps {
  courses: Course[];
  currentUser: User;
  onOpenClassroom: (course: Course, lessonId?: string) => void;
  onExploreCourses: () => void;
  onTakeMockTest: () => void;
}

export const MyLearningSpace: React.FC<MyLearningSpaceProps> = ({
  courses,
  currentUser,
  onOpenClassroom,
  onExploreCourses,
  onTakeMockTest
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'notes' | 'tests'>('courses');
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [offlineNotes, setOfflineNotes] = useState<OfflineCachedNote[]>([]);
  const [submissions, setSubmissions] = useState<QuizSubmission[]>([]);
  const [selectedNote, setSelectedNote] = useState<OfflineCachedNote | null>(null);

  useEffect(() => {
    setEnrollments(getEnrollments());
    setOfflineNotes(getOfflineNotes());
    setSubmissions(getQuizSubmissions());
  }, []);

  const enrolledCourses = enrollments.map(enr => {
    const course = courses.find(c => c.id === enr.course_id);
    const completed = getCompletedLessons(enr.course_id);
    const totalLessons = course ? course.modules.flatMap(m => m.lessons).length : 1;
    const progress = Math.round((completed.length / totalLessons) * 100);

    return {
      enrollment: enr,
      course,
      completedCount: completed.length,
      totalCount: totalLessons,
      progress
    };
  }).filter(item => item.course !== undefined);

  const handleDeleteNote = (lessonId: string) => {
    removeOfflineNote(lessonId);
    setOfflineNotes(getOfflineNotes());
    if (selectedNote?.lesson_id === lessonId) {
      setSelectedNote(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Student Welcome Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar_url}
            alt={currentUser.full_name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-red-500/60 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                विद्यार्थी ड्यासबोर्ड (Student Workspace)
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                PWA Sync Enabled
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              नमस्ते, {currentUser.full_name}!
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentUser.email} • {currentUser.phone}
            </p>
          </div>
        </div>

        {/* Quick Top Stats */}
        <div className="grid grid-cols-3 gap-3 text-center border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
          <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
            <span className="text-xs text-slate-400 block">सक्रिय कोर्स</span>
            <span className="text-xl font-bold text-white">{enrolledCourses.length}</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
            <span className="text-xs text-slate-400 block">अफलाइन नोट</span>
            <span className="text-xl font-bold text-blue-400">{offlineNotes.length}</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
            <span className="text-xs text-slate-400 block">Mock Tests</span>
            <span className="text-xl font-bold text-amber-400">{submissions.length}</span>
          </div>
        </div>
      </div>

      {/* Workspace Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'courses'
              ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>भर्ना भएका कोर्सहरू ({enrolledCourses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'notes'
              ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>क्यास गरिएका अफलाइन नोटहरू ({offlineNotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tests')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'tests'
              ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Mock Test नतिजा इतिहास ({submissions.length})</span>
        </button>
      </div>

      {/* Tab 1: Enrolled Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(({ enrollment, course, completedCount, totalCount, progress }) => {
                if (!course) return null;
                return (
                  <div
                    key={enrollment.id}
                    className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      {/* Course Image Header */}
                      <div className="relative aspect-video w-full bg-slate-950">
                        <img
                          src={course.thumbnail_url}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md">
                          सक्रिय (Active Enrollment)
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] font-mono px-2 py-0.5 rounded backdrop-blur-md">
                          Txn: {enrollment.transaction_id}
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className="p-5 space-y-3">
                        <span className="text-[11px] font-semibold text-red-400">
                          {course.category}
                        </span>
                        <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                          {course.title}
                        </h3>

                        {/* Progress Bar */}
                        <div className="space-y-1.5 pt-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">पाठ प्रगति:</span>
                            <span className="font-bold text-emerald-400">{progress}% ({completedCount}/{totalCount})</span>
                          </div>
                          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                            <div
                              className="bg-gradient-to-r from-red-600 to-emerald-500 h-full rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => onOpenClassroom(course, enrollment.last_watched_lesson_id)}
                        className="w-full bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-red-950"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>कक्षा सुचारु गर्नुहोस् (Resume Classroom)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">तपाईंले कुनै कोर्स खरिद गर्नुभएको छैन</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                लोकसेवा, बैंकिङ वा CMAT को पूर्ण तयारीका लागि उपलब्ध पाठ्यक्रमहरू हेर्नुहोस्।
              </p>
              <button
                onClick={onExploreCourses}
                className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition"
              >
                पाठ्यक्रमहरू हेर्नुहोस् (Explore Catalog)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Offline Cached Notes (PWA) */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-800/40">
                <WifiOff className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  PWA अफलाइन नोटहरू (Offline Stored Notes)
                </h3>
                <p className="text-xs text-slate-400">
                  इन्टरनेट नहुँदा पनि तपाईंको मोबाइल/ब्राउजरमा सुरक्षित रहेका सामग्री
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">
              कुल {offlineNotes.length} नोटहरू क्यास छन्
            </span>
          </div>

          {offlineNotes.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Notes List */}
              <div className="lg:col-span-5 space-y-3">
                {offlineNotes.map((note) => (
                  <div
                    key={note.lesson_id}
                    onClick={() => setSelectedNote(note)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                      selectedNote?.lesson_id === note.lesson_id
                        ? 'bg-slate-800 border-red-500 shadow-md'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {note.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {note.course_title}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-2">
                        <span>{new Date(note.cached_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{note.file_size_kb} KB</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.lesson_id);
                      }}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition rounded-lg hover:bg-slate-800"
                      title="क्यासबाट हटाउनुहोस्"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Note Content Viewer */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
                {selectedNote ? (
                  <div className="space-y-4">
                    <div className="border-b border-slate-800 pb-3">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                        PWA Offline Cache Active
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">
                        {selectedNote.title}
                      </h3>
                      <p className="text-xs text-slate-400">{selectedNote.course_title}</p>
                    </div>

                    <div className="font-nepali text-sm text-slate-200 leading-loose whitespace-pre-line bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                      {selectedNote.content}
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-center text-slate-500">
                    <FileText className="w-10 h-10 mb-2" />
                    <p className="text-xs">बायाँ तर्फको कुनै नोट छानेर विस्तृत पढ्नुहोस्।</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 text-xs">
              कुनै अफलाइन नोट फेला परेन। कक्षाकोठामा गएर "PWA अफलाइन नोट सेभ" बटन थिच्नुहोस्।
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Mock Test History */}
      {activeTab === 'tests' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">तपाईंले दिएका Mock Test नतिजाहरू</h3>
            <button
              onClick={onTakeMockTest}
              className="bg-red-600 hover:bg-red-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition"
            >
              नयाँ परीक्षा दिनुहोस्
            </button>
          </div>

          {submissions.length > 0 ? (
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-sm font-bold text-white">{sub.exam_title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      मिति: {new Date(sub.submitted_at).toLocaleString()} • समय: {Math.floor(sub.time_spent_seconds / 60)} मिनेट
                    </p>
                    <div className="flex items-center gap-3 text-xs mt-2">
                      <span className="text-emerald-400 font-medium">सहि: {sub.correct_count}</span>
                      <span className="text-red-400 font-medium">गलत: {sub.incorrect_count}</span>
                      <span className="text-slate-400">नछोएको: {sub.unattempted_count}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:border-l sm:border-slate-800 sm:pl-6">
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">प्राप्ताङ्क</span>
                      <span className="text-xl font-black text-amber-400">{sub.final_score}</span>
                      <span className="text-[10px] text-slate-500 block">({sub.percentage}%)</span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">पर्सेन्टाइल</span>
                      <span className="text-xl font-black text-blue-400">{sub.percentile_rank}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <Award className="w-10 h-10 text-slate-500 mx-auto" />
              <h4 className="text-sm font-bold text-white">कुनै परीक्षा रेकर्ड छैन</h4>
              <p className="text-xs text-slate-400">
                आफ्नो तयारीको स्तर परीक्षण गर्न निःशुल्क CBT Mock Test सुरु गर्नुहोस्।
              </p>
              <button
                onClick={onTakeMockTest}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
              >
                पहिलो Mock Test सुरु गर्नुहोस्
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
