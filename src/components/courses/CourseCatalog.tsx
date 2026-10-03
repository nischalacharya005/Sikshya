import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Sparkles, Radio, CheckCircle, RefreshCw } from 'lucide-react';
import { Course, CourseCategory } from '../../types';
import { CourseCard } from './CourseCard';

interface CourseCatalogProps {
  courses: Course[];
  enrolledCourseIds: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onOpenDetails: (course: Course) => void;
  onEnroll: (course: Course) => void;
  onOpenClassroom: (course: Course) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  enrolledCourseIds,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenDetails,
  onEnroll,
  onOpenClassroom
}) => {
  const [onlyLiveClasses, setOnlyLiveClasses] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-low' | 'price-high' | 'rating'>('popular');

  const categories = [
    'All',
    'Loksewa (लोकसेवा)',
    'Banking (बैंकिङ)',
    'CMAT & Entrance'
  ];

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        // Category filter
        if (selectedCategory !== 'All' && course.category !== selectedCategory) {
          return false;
        }
        // Live class filter
        if (onlyLiveClasses && !course.is_live_class) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = course.title.toLowerCase().includes(q) || (course.title_nepali && course.title_nepali.toLowerCase().includes(q));
          const matchesInstructor = course.instructor_name.toLowerCase().includes(q);
          const matchesCategory = course.category.toLowerCase().includes(q);
          const matchesDesc = course.description.toLowerCase().includes(q);
          return matchesTitle || matchesInstructor || matchesCategory || matchesDesc;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price_npr - b.price_npr;
        if (sortBy === 'price-high') return b.price_npr - a.price_npr;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.enrolled_count - a.enrolled_count; // popular
      });
  }, [courses, selectedCategory, onlyLiveClasses, searchQuery, sortBy]);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Catalog Title & Search Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-red-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">
              आधिकारिक पाठ्यक्रम तथा कक्षाहरू (Course Catalog)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            उपलब्ध अनलाइन पाठ्यक्रमहरू
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            नेपालका ख्यातिप्राप्त शिक्षकहरूद्वारा अध्यापन गराइएका पूर्ण कोर्सहरू
          </p>
        </div>

        {/* Sort & Live Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Live class toggle */}
          <button
            onClick={() => setOnlyLiveClasses(!onlyLiveClasses)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition ${
              onlyLiveClasses
                ? 'bg-red-950/80 text-red-300 border-red-700'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${onlyLiveClasses ? 'animate-pulse text-red-400' : 'text-slate-400'}`} />
            <span>लाइभ ब्याच मात्र (Live Only)</span>
          </button>

          {/* Sort selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-red-500"
          >
            <option value="popular">क्रमबद्ध: सबैभन्दा लोकप्रिय (Most Popular)</option>
            <option value="rating">क्रमबद्ध: उच्च मूल्याङ्कन (Top Rated)</option>
            <option value="price-low">मूल्य: कम देखि बढी (Price: Low to High)</option>
            <option value="price-high">मूल्य: बढी देखि कम (Price: High to Low)</option>
          </select>
        </div>
      </div>

      {/* Category Pills & Search Input Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow-md shadow-red-950/50'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat === 'All' ? 'सबै विधा (All Categories)' : cat}
            </button>
          ))}
        </div>

        {/* Inline Search Bar */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="कोर्स वा प्रशिक्षक खोज्नुहोस्..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Active Filter Summary */}
      {(selectedCategory !== 'All' || searchQuery || onlyLiveClasses) && (
        <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-2 flex-wrap">
            <span>फिल्टर गरिएको:</span>
            {selectedCategory !== 'All' && (
              <span className="bg-red-950/70 border border-red-800/80 text-red-300 px-2 py-0.5 rounded text-[11px]">
                {selectedCategory}
              </span>
            )}
            {searchQuery && (
              <span className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded text-[11px]">
                खोज: "{searchQuery}"
              </span>
            )}
            {onlyLiveClasses && (
              <span className="bg-amber-950/70 border border-amber-800 text-amber-300 px-2 py-0.5 rounded text-[11px]">
                Live Batches
              </span>
            )}
            <span className="text-slate-400">({filteredCourses.length} पाठ्यक्रम फेला पर्यो)</span>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setOnlyLiveClasses(false);
            }}
            className="text-slate-400 hover:text-white flex items-center gap-1 transition"
          >
            <RefreshCw className="w-3 h-3" />
            <span>रिसेट गर्नुहोस्</span>
          </button>
        </div>
      )}

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={enrolledCourseIds.includes(course.id)}
              onOpenDetails={onOpenDetails}
              onEnroll={onEnroll}
              onOpenClassroom={onOpenClassroom}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">कुनै पाठ्यक्रम फेला परेन</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            तपाईंले खोज्नुभएको विषय वा शीर्षक फेला परेन। कृपया फरक शब्द प्रयोग गरी पुन: प्रयास गर्नुहोस्।
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setOnlyLiveClasses(false);
            }}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition"
          >
            सबै पाठ्यक्रम देखाउनुहोस्
          </button>
        </div>
      )}
    </div>
  );
};
