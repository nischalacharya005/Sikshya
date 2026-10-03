import React from 'react';
import { PlayCircle, Clock, BookOpen, Star, CheckCircle, Radio, Sparkles } from 'lucide-react';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  onOpenDetails: (course: Course) => void;
  onEnroll: (course: Course) => void;
  onOpenClassroom: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isEnrolled,
  onOpenDetails,
  onEnroll,
  onOpenClassroom
}) => {
  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-xl hover:shadow-black/40 transition-all flex flex-col h-full">
      {/* Thumbnail Banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={course.thumbnail_url}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Live Class Badge */}
        {course.is_live_class && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md shadow-sm">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>LIVE BATCH</span>
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-700/80 text-slate-200 text-[11px] font-medium px-2.5 py-0.5 rounded-full backdrop-blur-md">
          {course.category}
        </div>

        {/* Enrolled Status Overlay if purchased */}
        {isEnrolled && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-emerald-600/95 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-md backdrop-blur-sm">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Enrolled (सक्रिय)</span>
          </div>
        )}

        {/* Free Preview Tag */}
        <button
          onClick={() => onOpenDetails(course)}
          className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 hover:bg-black/80 text-white text-[11px] px-2 py-1 rounded-md backdrop-blur-md border border-white/20 transition"
        >
          <PlayCircle className="w-3.5 h-3.5 text-red-400" />
          <span>निःशुल्क Preview</span>
        </button>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Target Level */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="text-red-400 font-medium">{course.level}</span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-slate-500 font-normal">({course.enrolled_count})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenDetails(course)}
            className="text-base font-bold text-white group-hover:text-red-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {course.title}
          </h3>

          {course.title_nepali && (
            <p className="text-xs text-slate-400 font-nepali mt-1 line-clamp-1">
              {course.title_nepali}
            </p>
          )}

          {/* Description Snippet */}
          <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Course Metadata (Duration & Lessons) */}
        <div className="mt-4 pt-3 border-t border-slate-800/60">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{course.total_hours} घन्टा HD भिडियो</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>{course.total_lessons} पाठहरू + PDF</span>
            </div>
          </div>

          {/* Price & Action Button */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-lg font-extrabold text-white">
                रू {course.price_npr.toLocaleString('ne-NP')}
              </span>
            </div>

            <div>
              {isEnrolled ? (
                <button
                  onClick={() => onOpenClassroom(course)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-emerald-950/50 flex items-center gap-1"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>कक्षाहरू हेर्नुहोस्</span>
                </button>
              ) : (
                <button
                  onClick={() => onEnroll(course)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-red-950/50 flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>भर्ना गर्नुहोस्</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
