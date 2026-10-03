import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Download, 
  Wifi, 
  WifiOff, 
  Calendar, 
  FileCode2, 
  Menu, 
  X, 
  Search, 
  GraduationCap, 
  CheckCircle2, 
  ShieldCheck,
  User as UserIcon,
  ChevronDown
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { getApproximateNepaliDate } from '../../lib/nepaliCalendar';
import { usePWAInstall, useOnlineStatus } from '../../hooks/usePWAInstall';

interface NavbarProps {
  activeTab: 'home' | 'courses' | 'classroom' | 'mocktest' | 'dashboard' | 'calendar';
  setActiveTab: (tab: 'home' | 'courses' | 'classroom' | 'mocktest' | 'dashboard' | 'calendar') => void;
  currentUser: User;
  onUpdateUserRole: (role: UserRole) => void;
  onOpenSchemaModal: () => void;
  onOpenInstallModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  enrolledCoursesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onUpdateUserRole,
  onOpenSchemaModal,
  onOpenInstallModal,
  searchQuery,
  setSearchQuery,
  enrolledCoursesCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const todayBS = getApproximateNepaliDate();
  const { isInstallable, isInstalled } = usePWAInstall();
  const isOnline = useOnlineStatus();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      {/* Top Notification Bar: Nepali Date & Announcements */}
      <div className="bg-gradient-to-r from-red-900/40 via-blue-900/30 to-slate-900 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-amber-300 font-nepali">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
              🇳🇵 आज: {todayBS.formattedBS}
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              ⚡ ना.सु. तथा RBB तह ४ विशेष अनलाइन लाइभ कक्षा भर्ना सुरु!
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Connectivity status */}
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
              isOnline ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-800/60' : 'bg-amber-950/70 text-amber-400 border border-amber-800/60'
            }`}>
              {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              <span>{isOnline ? 'Online' : 'Offline PWA Mode'}</span>
            </div>

            {/* eSewa & Khalti verified badge */}
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official eSewa & Khalti Partner</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-blue-600 flex items-center justify-center shadow-lg shadow-red-950/40 group-hover:scale-105 transition-transform border border-red-500/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Shiksha<span className="text-red-500">.LMS</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded">
                  NEPAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-1 font-nepali">
                शिक्षा अनलाइन प्लेटफर्म
              </p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="खोज्नुहोस्: Loksewa, RBB, CMAT..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'courses') setActiveTab('courses');
                }}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 font-nepali"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === 'home' 
                  ? 'bg-slate-800 text-white font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              गृहपृष्ठ (Home)
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                activeTab === 'courses' 
                  ? 'bg-slate-800 text-white font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 text-red-400" />
              <span>पाठ्यक्रम (Courses)</span>
            </button>

            <button
              onClick={() => setActiveTab('mocktest')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                activeTab === 'mocktest' 
                  ? 'bg-red-600 text-white font-semibold shadow-md shadow-red-950/50' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Mock Test CBT</span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                activeTab === 'calendar' 
                  ? 'bg-slate-800 text-white font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>परीक्षा तालिका (B.S.)</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                activeTab === 'dashboard' 
                  ? 'bg-slate-800 text-white font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span>मेरो अध्ययन</span>
              {enrolledCoursesCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-600 text-[11px] font-bold text-white flex items-center justify-center">
                  {enrolledCoursesCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Install PWA Button */}
            {!isInstalled && (
              <button
                onClick={onOpenInstallModal}
                className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm shadow-red-950 transition transform active:scale-95"
                title="Install Shiksha LMS as a Progressive Web App"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Install App</span>
                <span className="sm:hidden">Install</span>
              </button>
            )}

            {/* SQL Migration & Schema Inspector Button */}
            <button
              onClick={onOpenSchemaModal}
              className="hidden sm:flex items-center gap-1.5 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white bg-slate-900/80 px-2.5 py-1.5 rounded-lg text-xs font-mono transition"
              title="View Supabase / PostgreSQL Database Migration Scripts"
            >
              <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
              <span>SQL Schema</span>
            </button>

            {/* User Profile & Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800/80 border border-slate-800 text-left transition"
              >
                <img 
                  src={currentUser.avatar_url} 
                  alt={currentUser.full_name} 
                  className="w-7 h-7 rounded-full object-cover border border-slate-600"
                />
                <div className="hidden xl:block">
                  <p className="text-xs font-semibold text-white leading-tight line-clamp-1">{currentUser.full_name}</p>
                  <p className="text-[10px] text-slate-400 capitalize">{currentUser.role} mode</p>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Role Dropdown */}
              {roleDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-2 py-1.5 border-b border-slate-800">
                    <p className="text-xs font-bold text-white">{currentUser.full_name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                  </div>
                  <div className="py-1">
                    <p className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Role Mode:
                    </p>
                    <button
                      onClick={() => onUpdateUserRole('student')}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between ${
                        currentUser.role === 'student' ? 'bg-red-950/60 text-red-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>Student (विद्यार्थी)</span>
                      {currentUser.role === 'student' && <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />}
                    </button>
                    <button
                      onClick={() => onUpdateUserRole('admin')}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between ${
                        currentUser.role === 'admin' ? 'bg-blue-950/60 text-blue-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>Administrator (प्रशासक)</span>
                      {currentUser.role === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                    </button>
                    <button
                      onClick={() => onUpdateUserRole('instructor')}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between ${
                        currentUser.role === 'instructor' ? 'bg-emerald-950/60 text-emerald-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>Instructor (प्राध्यापक)</span>
                      {currentUser.role === 'instructor' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 py-3 space-y-1">
            <div className="pb-2 px-2">
              <input
                type="text"
                placeholder="खोज्नुहोस्: Loksewa, RBB, CMAT..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveTab('courses');
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                activeTab === 'home' ? 'bg-slate-800 text-white font-bold' : 'text-slate-300'
              }`}
            >
              गृहपृष्ठ (Home)
            </button>
            <button
              onClick={() => { setActiveTab('courses'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                activeTab === 'courses' ? 'bg-slate-800 text-white font-bold' : 'text-slate-300'
              }`}
            >
              पाठ्यक्रम (All Courses)
            </button>
            <button
              onClick={() => { setActiveTab('mocktest'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 font-semibold ${
                activeTab === 'mocktest' ? 'bg-slate-800 text-white' : ''
              }`}
            >
              Mock Test CBT Engine
            </button>
            <button
              onClick={() => { setActiveTab('calendar'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                activeTab === 'calendar' ? 'bg-slate-800 text-white font-bold' : 'text-slate-300'
              }`}
            >
              परीक्षा क्यालेन्डर (Upcoming B.S. Exams)
            </button>
            <button
              onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                activeTab === 'dashboard' ? 'bg-slate-800 text-white font-bold' : 'text-slate-300'
              }`}
            >
              मेरो अध्ययन (My Learning)
            </button>
            <button
              onClick={() => { onOpenSchemaModal(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-blue-400"
            >
              SQL Database Migration Script
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
