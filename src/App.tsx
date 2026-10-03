import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { UpcomingExamsWidget } from './components/home/UpcomingExamsWidget';
import { CourseCatalog } from './components/courses/CourseCatalog';
import { CourseCard } from './components/courses/CourseCard';
import { CourseDetailsModal } from './components/courses/CourseDetailsModal';
import { VideoClassroom } from './components/classroom/VideoClassroom';
import { MockTestEngine } from './components/mocktest/MockTestEngine';
import { CheckoutModal } from './components/payment/CheckoutModal';
import { MyLearningSpace } from './components/dashboard/MyLearningSpace';
import { DatabaseSchemaModal } from './components/modals/DatabaseSchemaModal';
import { PWAInstallModal } from './components/pwa/PWAInstallModal';

import { Course, UpcomingExam, User, UserRole } from './types';
import { getCourses, getEnrollments, getStoredUser, saveStoredUser } from './lib/storage';
import { useOnlineStatus } from './hooks/usePWAInstall';
import { WifiOff, Radio, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const isOnline = useOnlineStatus();
  
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'classroom' | 'mocktest' | 'dashboard' | 'calendar'>('home');
  
  // Data State
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(getStoredUser());
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  
  // Modals & Selected items
  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState<Course | null>(null);
  const [selectedCourseForCheckout, setSelectedCourseForCheckout] = useState<Course | null>(null);
  const [activeClassroomCourse, setActiveClassroomCourse] = useState<Course | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | undefined>(undefined);
  
  const [isSchemaModalOpen, setIsSchemaModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load courses and enrollments
  const refreshData = () => {
    const loadedCourses = getCourses();
    setCourses(loadedCourses);
    const enrollments = getEnrollments();
    const ids = enrollments.map(e => e.course_id);
    setEnrolledCourseIds(ids);

    // If currently in classroom but course not set, pick the first enrolled course
    if (!activeClassroomCourse && ids.length > 0) {
      const firstEnrolled = loadedCourses.find(c => c.id === ids[0]);
      if (firstEnrolled) setActiveClassroomCourse(firstEnrolled);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleUpdateUserRole = (newRole: UserRole) => {
    const updated: User = { ...currentUser, role: newRole };
    setCurrentUser(updated);
    saveStoredUser(updated);
  };

  const handleOpenClassroom = (course: Course, lessonId?: string) => {
    setActiveClassroomCourse(course);
    setActiveLessonId(lessonId);
    setActiveTab('classroom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnrollInitiate = (course: Course) => {
    setSelectedCourseForCheckout(course);
  };

  const handleEnrollSuccess = (course: Course) => {
    refreshData();
    setActiveClassroomCourse(course);
    setActiveTab('classroom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartExamPrepFromCalendar = (exam: UpcomingExam) => {
    // If Loksewa, switch to Loksewa category
    if (exam.organization.includes('Loksewa')) {
      setSelectedCategory('Loksewa (लोकसेवा)');
    } else if (exam.organization.includes('Bank')) {
      setSelectedCategory('Banking (बैंकिङ)');
    } else {
      setSelectedCategory('CMAT & Entrance');
    }
    setActiveTab('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Offline Toast Banner (PWA feature) */}
      {!isOnline && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2.5 bg-amber-600 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-amber-400/40 text-xs font-semibold animate-in slide-in-from-bottom-3">
          <WifiOff className="w-4 h-4" />
          <span>तपाईं अफलाइन हुनुहुन्छ • क्यास गरिएका नोट र सामग्री मात्र उपलब्ध छ (Offline Mode)</span>
        </div>
      )}

      {/* Global Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onUpdateUserRole={handleUpdateUserRole}
        onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        enrolledCoursesCount={enrolledCourseIds.length}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        
        {/* TAB 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-12 pb-16">
            {/* Hero Section */}
            <HeroBanner
              onExploreCourses={() => {
                setActiveTab('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onStartMockTest={() => {
                setActiveTab('mocktest');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenInstallModal={() => setIsInstallModalOpen(true)}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setActiveTab('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Upcoming Exams Calendar Widget */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <UpcomingExamsWidget onStartExamPrep={handleStartExamPrepFromCalendar} />
            </div>

            {/* Featured Course Highlights */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                    सबैभन्दा लोकप्रिय अनलाइन ब्याचहरू (Top Recommended Courses)
                  </span>
                  <h2 className="text-2xl font-black text-white mt-1">
                    लोकसेवा र बैंकिङ तयारी पाठ्यक्रम
                  </h2>
                </div>

                <button
                  onClick={() => setActiveTab('courses')}
                  className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <span>सबै पाठ्यक्रम हेर्नुहोस्</span>
                  <span>→</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.slice(0, 3).map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={enrolledCourseIds.includes(course.id)}
                    onOpenDetails={(c) => setSelectedCourseForDetails(c)}
                    onEnroll={handleEnrollInitiate}
                    onOpenClassroom={handleOpenClassroom}
                  />
                ))}
              </div>
            </div>

            {/* Why Shiksha LMS Highlights for Nepal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-red-950/30 via-slate-900 to-blue-950/30 border border-slate-800 rounded-3xl p-8 sm:p-12">
                <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                    नेपालमै पहिलो पटक उच्च प्रविधियुक्त LMS
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    किन रोज्ने Shiksha LMS?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-nepali">
                    काठमाडौंका चर्को होस्टेल र इन्स्टिच्युट धाउनु पर्ने बाध्यताको अन्त्य — गाउँघरबाटै नाम निकाल्न सकिने स्मार्ट प्लेटफर्म।
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
                      १
                    </div>
                    <h4 className="text-sm font-bold text-white">VdoCipher DRM सेक्युरिटी</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      विद्यार्थीको आफ्नै फोन र इमेल वाटरमार्क सहितको उच्चस्तरीय एचडी भिडियो स्ट्रिमिङ।
                    </p>
                  </div>

                  <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
                      २
                    </div>
                    <h4 className="text-sm font-bold text-white">eSewa र Khalti भुक्तानी</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      कुनै बैंक भौचर वा स्क्रिनसट पठाउनु नपर्ने — १ सेकेन्डमै तत्काल कक्षा सक्रिय।
                    </p>
                  </div>

                  <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                      ३
                    </div>
                    <h4 className="text-sm font-bold text-white">PWA अफलाइन क्यासिङ</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      इन्टरनेट लोडसेडिङ वा कम स्पिड हुँदा पनि मोबाइलमा सुरक्षित नोट र प्रश्नोत्तर अध्ययन।
                    </p>
                  </div>

                  <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold">
                      ४
                    </div>
                    <h4 className="text-sm font-bold text-white">२०% Negative Marking CBT</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      लोक सेवा आयोगको मापदण्ड अनुसार प्रत्यक्ष अनलाइन परीक्षा र पर्सेन्टाइल र्‍याङ्किङ।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COURSE CATALOG */}
        {activeTab === 'courses' && (
          <CourseCatalog
            courses={courses}
            enrolledCourseIds={enrolledCourseIds}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onOpenDetails={(course) => setSelectedCourseForDetails(course)}
            onEnroll={handleEnrollInitiate}
            onOpenClassroom={handleOpenClassroom}
          />
        )}

        {/* TAB 3: VIDEO CLASSROOM */}
        {activeTab === 'classroom' && (
          <div>
            {activeClassroomCourse ? (
              <VideoClassroom
                course={activeClassroomCourse}
                initialLessonId={activeLessonId}
                currentUser={currentUser}
                onBackToCourses={() => setActiveTab('courses')}
              />
            ) : (
              <div className="max-w-xl mx-auto py-20 text-center space-y-4 px-4">
                <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-lg font-bold text-white">कुनै कोर्स चयन गरिएको छैन</h3>
                <p className="text-xs text-slate-400">
                  कृपया पहिले कोर्स क्याटलगबाट भर्ना गर्नुहोस् वा मेरो अध्ययनबाट कोर्स छान्नुहोस्।
                </p>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl text-xs font-semibold"
                >
                  पाठ्यक्रम हेर्नुहोस्
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MOCK TEST ENGINE */}
        {activeTab === 'mocktest' && (
          <MockTestEngine
            currentUser={currentUser}
            onExitTest={() => setActiveTab('home')}
          />
        )}

        {/* TAB 5: STUDENT DASHBOARD (MY LEARNING SPACE) */}
        {activeTab === 'dashboard' && (
          <MyLearningSpace
            courses={courses}
            currentUser={currentUser}
            onOpenClassroom={handleOpenClassroom}
            onExploreCourses={() => setActiveTab('courses')}
            onTakeMockTest={() => setActiveTab('mocktest')}
          />
        )}

        {/* TAB 6: UPCOMING EXAMS CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-6">
            <UpcomingExamsWidget onStartExamPrep={handleStartExamPrepFromCalendar} />
          </div>
        )}

      </main>

      {/* Course Details Modal */}
      <CourseDetailsModal
        course={selectedCourseForDetails}
        isOpen={!!selectedCourseForDetails}
        onClose={() => setSelectedCourseForDetails(null)}
        isEnrolled={selectedCourseForDetails ? enrolledCourseIds.includes(selectedCourseForDetails.id) : false}
        onEnroll={handleEnrollInitiate}
        onOpenClassroom={handleOpenClassroom}
      />

      {/* eSewa & Khalti Checkout Modal */}
      <CheckoutModal
        course={selectedCourseForCheckout}
        isOpen={!!selectedCourseForCheckout}
        onClose={() => setSelectedCourseForCheckout(null)}
        currentUser={currentUser}
        onSuccess={handleEnrollSuccess}
      />

      {/* SQL Migration Scripts Modal */}
      <DatabaseSchemaModal
        isOpen={isSchemaModalOpen}
        onClose={() => setIsSchemaModalOpen(false)}
      />

      {/* PWA Guided Install Modal */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Global Footer (shown on non-classroom full screen views) */}
      {activeTab !== 'classroom' && (
        <Footer
          onOpenSchemaModal={() => setIsSchemaModalOpen(true)}
          onOpenInstallModal={() => setIsInstallModalOpen(true)}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setActiveTab('courses');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

    </div>
  );
}
