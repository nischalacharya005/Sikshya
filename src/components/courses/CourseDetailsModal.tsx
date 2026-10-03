import React, { useState } from 'react';
import { 
  X, 
  PlayCircle, 
  Lock, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Star, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';
import { Course, Lesson } from '../../types';

interface CourseDetailsModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  isEnrolled: boolean;
  onEnroll: (course: Course) => void;
  onOpenClassroom: (course: Course, lessonId?: string) => void;
}

export const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  course,
  isOpen,
  onClose,
  isEnrolled,
  onEnroll,
  onOpenClassroom,
}) => {
  const [activePreviewLesson, setActivePreviewLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    mod_1: true,
    mod_rbb_1: true,
    mod_cmat_1: true,
    mod_adhikrit_1: true
  });

  if (!isOpen || !course) return null;

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const discountPercent = Math.round(
    ((course.original_price_npr - course.price_npr) / course.original_price_npr) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800 bg-slate-950/60 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30">
              {course.category}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              {course.level}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          
          {/* Preview Video Player Banner */}
          <div className="relative aspect-video rounded-2xl bg-black overflow-hidden border border-slate-800 shadow-inner">
            {activePreviewLesson ? (
              <div className="w-full h-full relative">
                <video
                  src={activePreviewLesson.video_url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                  Free Preview: {activePreviewLesson.title}
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent">
                  <div 
                    onClick={() => {
                      const firstPreview = course.modules.flatMap(m => m.lessons).find(l => l.is_free_preview);
                      if (firstPreview) setActivePreviewLesson(firstPreview);
                    }}
                    className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center cursor-pointer shadow-2xl transition transform hover:scale-105"
                  >
                    <PlayCircle className="w-10 h-10 fill-current" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-white">निःशुल्क नमूना कक्षा (Watch Sample Lecture)</p>
                  <p className="text-xs text-slate-400 mt-1">क्लिक गरी पाठ्यक्रमको परिचय र शैली हेर्नुहोस्</p>
                </div>
              </div>
            )}
          </div>

          {/* Course Title and Overview */}
          <div className="space-y-3">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
              {course.title}
            </h1>
            {course.title_nepali && (
              <p className="text-sm text-slate-300 font-nepali">
                {course.title_nepali}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{course.rating.toFixed(2)}</span>
                <span className="text-slate-500 font-normal">({course.enrolled_count} समीक्षा)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>{course.total_hours} घन्टा पाठ्यक्रम</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>{course.total_lessons} पाठहरू</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
              {course.description}
            </p>
          </div>

          {/* Instructor Card */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
            <img
              src={course.instructor_avatar}
              alt={course.instructor_name}
              className="w-14 h-14 rounded-full object-cover border-2 border-red-500/50"
            />
            <div>
              <span className="text-[11px] font-semibold text-red-400 uppercase tracking-wide">
                प्रमुख प्रशिक्षक (Lead Faculty)
              </span>
              <h3 className="text-sm font-bold text-white">{course.instructor_name}</h3>
              <p className="text-xs text-slate-400">{course.instructor_title}</p>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              यस कोर्समा के-के समावेश छ? (Course Inclusions)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {course.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Accordion */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">
                पाठ्यक्रम अनुसूची (Curriculum & Lessons)
              </h4>
              <span className="text-xs text-slate-400">
                {course.modules.length} मोड्युलहरू • {course.total_lessons} कक्षाहरू
              </span>
            </div>

            <div className="space-y-3">
              {course.modules.map((mod) => {
                const isExpanded = expandedModules[mod.id] ?? false;
                return (
                  <div key={mod.id} className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-900 transition"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {mod.title}
                      </span>
                      <div className="flex items-center gap-2 text-slate-400 text-xs">
                        <span>{mod.lessons.length} पाठ</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="divide-y divide-slate-800/60 border-t border-slate-800">
                        {mod.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-3.5 sm:px-4 flex items-center justify-between hover:bg-slate-900/50 transition gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {lesson.is_free_preview ? (
                                <PlayCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                              ) : (
                                <Lock className="w-4 h-4 text-slate-600 flex-shrink-0" />
                              )}
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-slate-200 truncate">
                                  {lesson.order_index}. {lesson.title}
                                </p>
                                <span className="text-[11px] text-slate-500 flex items-center gap-2">
                                  <span>{lesson.duration_minutes} मिनेट</span>
                                  {lesson.notes_title && <span>• {lesson.notes_title}</span>}
                                </span>
                              </div>
                            </div>

                            <div>
                              {lesson.is_free_preview ? (
                                <button
                                  onClick={() => setActivePreviewLesson(lesson)}
                                  className="text-xs font-semibold text-red-400 hover:text-red-300 bg-red-950/40 border border-red-800/50 px-2.5 py-1 rounded-lg transition"
                                >
                                  Preview
                                </button>
                              ) : isEnrolled ? (
                                <button
                                  onClick={() => {
                                    onClose();
                                    onOpenClassroom(course, lesson.id);
                                  }}
                                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1 rounded-lg transition"
                                >
                                  हेर्नुहोस्
                                </button>
                              ) : (
                                <span className="text-[11px] text-slate-500 font-medium">Locked</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Sticky Bottom Pricing and Action CTA */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/90 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-20">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">
                रू {course.price_npr.toLocaleString('ne-NP')}
              </span>
              <span className="text-xs text-slate-400 line-through">
                रू {course.original_price_npr.toLocaleString('ne-NP')}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                {discountPercent}% छुट
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              १ वर्षसम्म असीमित पहुँच • eSewa र Khalti द्वारा तुरुन्त सक्रियता
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isEnrolled ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenClassroom(course);
                }}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl text-sm font-bold transition shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-4 h-4" />
                <span>कक्षा कोठामा जानुहोस् (Open Classroom)</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onEnroll(course);
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-7 py-3 rounded-xl text-sm font-bold transition shadow-xl shadow-red-950/60 flex items-center justify-center gap-2 transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>भर्ना गर्नुहोस् (eSewa / Khalti)</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
