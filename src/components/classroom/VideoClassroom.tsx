import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  RotateCcw, 
  Settings, 
  CheckCircle2, 
  Circle, 
  Lock, 
  FileText, 
  MessageSquare, 
  Download, 
  ShieldAlert, 
  ChevronRight, 
  ChevronLeft, 
  Share2, 
  ThumbsUp, 
  Send, 
  WifiOff, 
  Sparkles,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { Course, Lesson, User, QnAPost, OfflineCachedNote } from '../../types';
import { toggleLessonCompletion, getCompletedLessons, saveOfflineNote, getOfflineNotes, removeOfflineNote, getQnAPosts, addQnAPost } from '../../lib/storage';
import { useOnlineStatus } from '../../hooks/usePWAInstall';

interface VideoClassroomProps {
  course: Course;
  initialLessonId?: string;
  currentUser: User;
  onBackToCourses: () => void;
}

export const VideoClassroom: React.FC<VideoClassroomProps> = ({
  course,
  initialLessonId,
  currentUser,
  onBackToCourses
}) => {
  const isOnline = useOnlineStatus();
  
  // Find initial lesson or default to first
  const allLessons = course.modules.flatMap(m => m.lessons);
  const initial = allLessons.find(l => l.id === initialLessonId) || allLessons[0];
  
  const [currentLesson, setCurrentLesson] = useState<Lesson>(initial);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [quality, setQuality] = useState<string>('720p');
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'qna'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Q&A State
  const [qnaPosts, setQnaPosts] = useState<QnAPost[]>([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  
  // Offline cached notes state
  const [cachedNotes, setCachedNotes] = useState<OfflineCachedNote[]>([]);
  const [cacheSuccessMessage, setCacheSuccessMessage] = useState<string | null>(null);

  // Video Ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Dynamic floating watermark position state
  const [watermarkPos, setWatermarkPos] = useState({ top: '20%', left: '15%' });

  // Initialize completed lessons and cached notes from storage
  useEffect(() => {
    setCompletedLessonIds(getCompletedLessons(course.id));
    setCachedNotes(getOfflineNotes());
    setQnaPosts(getQnAPosts());
  }, [course.id]);

  // Periodic random bounce of dynamic watermark to counter screen recorders
  useEffect(() => {
    const interval = setInterval(() => {
      const randomTop = Math.floor(Math.random() * 70 + 10);
      const randomLeft = Math.floor(Math.random() * 70 + 10);
      setWatermarkPos({ top: `${randomTop}%`, left: `${randomLeft}%` });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleComplete = (lessonId: string) => {
    toggleLessonCompletion(course.id, lessonId);
    setCompletedLessonIds(getCompletedLessons(course.id));
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleSaveNoteOffline = () => {
    const noteContent = currentLesson.summary_text || `विस्तृत टिपोट: ${currentLesson.title} - लोकसेवा तथा बैंकिङ तयारी सार-संग्रह।`;
    const newNote: OfflineCachedNote = {
      lesson_id: currentLesson.id,
      course_id: course.id,
      course_title: course.title,
      title: currentLesson.notes_title || `${currentLesson.title}.pdf`,
      cached_at: new Date().toISOString(),
      content: noteContent,
      file_size_kb: 45
    };
    saveOfflineNote(newNote);
    setCachedNotes(getOfflineNotes());
    setCacheSuccessMessage('नोट PWA अफलाइन भण्डारणमा सुरक्षित भयो! (Cached for Offline)');
    setTimeout(() => setCacheSuccessMessage(null), 3500);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newPost: QnAPost = {
      id: `qna_${Date.now()}`,
      lesson_id: currentLesson.id,
      author_name: currentUser.full_name,
      author_avatar: currentUser.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      question: newQuestionText,
      created_at: 'भर्खरै (Just now)',
      upvotes: 1
    };

    addQnAPost(newPost);
    setQnaPosts(getQnAPosts());
    setNewQuestionText('');
  };

  const isCurrentNoteCached = cachedNotes.some(n => n.lesson_id === currentLesson.id);
  const progressPercent = Math.round((completedLessonIds.length / allLessons.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Classroom Top Appbar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCourses}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>सबै कोर्सहरू</span>
          </button>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-md">
              {course.title}
            </h1>
            <p className="text-[11px] text-slate-400 truncate">
              {currentLesson.order_index}. {currentLesson.title}
            </p>
          </div>
        </div>

        {/* Progress & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <div className="text-right">
              <p className="text-[10px] text-slate-400">पाठ्यक्रम प्रगति</p>
              <p className="text-xs font-bold text-emerald-400">{progressPercent}% पूरा</p>
            </div>
            <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium transition"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span className="hidden md:inline">{sidebarOpen ? 'पाठ सूची लुकाउनुहोस्' : 'पाठ सूची देखाउनुहोस्'}</span>
          </button>
        </div>
      </div>

      {/* Main Classroom Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Column: Video & Tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          
          {/* Video Player Wrapper */}
          <div 
            ref={playerContainerRef}
            className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden select-none"
          >
            {/* Native HTML5 Video Element (Simulates VdoCipher / Bunny DRM Player) */}
            <video
              ref={videoRef}
              src={currentLesson.video_url}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => handleToggleComplete(currentLesson.id)}
            />

            {/* Anti-Piracy Dynamic Watermark Overlay */}
            {/* Shifts across the screen continuously so screen recording leaks the exact student ID */}
            <div
              className="absolute z-20 pointer-events-none transition-all duration-1000 select-none"
              style={{
                top: watermarkPos.top,
                left: watermarkPos.left,
                opacity: 0.38,
              }}
            >
              <div className="bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded border border-white/10 text-white font-mono text-[10px] sm:text-xs tracking-wider shadow-lg">
                <span className="text-red-400 font-bold">SHIKSHA DRM:</span> {currentUser.email} • {currentUser.phone}
              </div>
            </div>

            {/* Custom Control Bar Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 sm:p-4 flex flex-col gap-2 opacity-95">
              
              {/* Progress slider bar */}
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = Number(e.target.value);
                  }
                }}
                className="w-full h-1 bg-slate-700 accent-red-600 rounded-lg cursor-pointer"
              />

              {/* Bottom controls row */}
              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePlayPause}
                    className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition shadow-sm"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.muted = !isMuted;
                        setIsMuted(!isMuted);
                      }
                    }}
                    className="text-slate-300 hover:text-white"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono text-[11px] text-slate-300">
                    {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{(Math.floor(duration % 60)).toString().padStart(2, '0')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Speed Selector */}
                  <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 text-[11px]">
                    <span className="text-slate-400">गति:</span>
                    {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => handleSpeedChange(spd)}
                        className={`px-1 py-0.5 rounded ${playbackSpeed === spd ? 'bg-red-600 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>

                  {/* Quality selector */}
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="bg-slate-900/80 border border-slate-700 text-[11px] rounded px-1.5 py-0.5 text-slate-200 focus:outline-none"
                  >
                    <option value="1080p">1080p FHD</option>
                    <option value="720p">720p HD</option>
                    <option value="480p">480p SD</option>
                    <option value="360p">360p (Data Saver)</option>
                  </select>
                </div>
              </div>

            </div>

          </div>

          {/* Under-Video Action Bar */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                {currentLesson.title}
              </h2>
              {currentLesson.title_nepali && (
                <p className="text-xs text-slate-400 font-nepali mt-0.5">
                  {currentLesson.title_nepali}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Mark as Completed button */}
              <button
                onClick={() => handleToggleComplete(currentLesson.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  completedLessonIds.includes(currentLesson.id)
                    ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-300'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {completedLessonIds.includes(currentLesson.id) ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>सकियो (Completed)</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-slate-400" />
                    <span>सकिएको जनाउनुहोस्</span>
                  </>
                )}
              </button>

              {/* Offline note cache button */}
              <button
                onClick={handleSaveNoteOffline}
                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-md transition"
                title="PWA अफलाइन अध्ययनको लागि क्यास गर्नुहोस्"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isCurrentNoteCached ? 'नोट क्यास भएको छ ✓' : 'PWA अफलाइन नोट सेभ'}</span>
              </button>
            </div>
          </div>

          {/* Offline Cache Success Toast */}
          {cacheSuccessMessage && (
            <div className="mx-4 mt-3 bg-emerald-950/90 border border-emerald-700 text-emerald-300 px-4 py-2 rounded-xl text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{cacheSuccessMessage}</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">PWA Cache Storage</span>
            </div>
          )}

          {/* Classroom Tabs: Overview, Notes, Q&A */}
          <div className="p-4 sm:p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 text-xs sm:text-sm font-semibold transition border-b-2 -mb-3.5 ${
                  activeTab === 'overview'
                    ? 'border-red-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                पाठ परिचय (Overview)
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-2 text-xs sm:text-sm font-semibold transition border-b-2 -mb-3.5 flex items-center gap-1.5 ${
                  activeTab === 'notes'
                    ? 'border-red-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>हस्तलिखित नोटहरू (Notes & PDF)</span>
              </button>

              <button
                onClick={() => setActiveTab('qna')}
                className={`pb-2 text-xs sm:text-sm font-semibold transition border-b-2 -mb-3.5 flex items-center gap-1.5 ${
                  activeTab === 'qna'
                    ? 'border-red-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>प्रश्न तथा छलफल (Q&A Forum)</span>
                <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center text-slate-300">
                  {qnaPosts.length}
                </span>
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-300">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>पाठको सार-संक्षेप (Summary & Key Points)</span>
                  </h3>
                  <p className="font-nepali text-slate-300 leading-relaxed whitespace-pre-line">
                    {currentLesson.summary_text || 'यस पाठमा लोकसेवा तथा बैंकिङ परीक्षामा बारम्बार सोधिने मुख्य अवधारणाहरूको विस्तृत चर्चा गरिएको छ। नोटहरू डाउनलोड गरी रिभिजन गर्नुहोस्।'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
                  <h4 className="font-semibold text-white mb-2">यस कक्षाबाट के सिक्नुहुनेछ?</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 text-xs">
                    <li>पाठ्यक्रमका मुख्य धारा, दफा र तथ्याङ्कहरूको स्मरण तरिका</li>
                    <li>विगतका वर्षहरूमा सोधिएका प्रश्नहरू र मोडल उत्तर समाधान</li>
                    <li>समय व्यवस्थापन (Time Management) र उत्तर लेखन ढाँचा</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Notes & Offline Cache */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-950/60 border border-red-800/60 rounded-xl text-red-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {currentLesson.notes_title || `${currentLesson.title} संक्षिप्त टिपोट.pdf`}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        आधिकारिक पाठ्यक्रम अनुसार तयार पारिएको उच्चस्तरीय PDF नोट
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveNoteOffline}
                    className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold transition border border-slate-700"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>{isCurrentNoteCached ? 'अफलाइन सुरक्षित ✓' : 'PWA क्यासमा सेभ'}</span>
                  </button>
                </div>

                {/* Offline Notes Reader Box */}
                <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <span className="text-xs font-semibold text-slate-300">
                      हस्तलिखित सारांश पूर्वावलोकन (Note Preview):
                    </span>
                    <span className="text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                      Verified Study Material
                    </span>
                  </div>
                  <div className="font-nepali text-sm text-slate-200 leading-loose whitespace-pre-line bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                    {currentLesson.summary_text}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Q&A Forum */}
            {activeTab === 'qna' && (
              <div className="space-y-6">
                {/* Ask Question Form */}
                <form onSubmit={handleAddQuestion} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    शिक्षक वा साथीहरूसँग प्रश्न सोध्नुहोस् (Ask a Question)
                  </h4>
                  <textarea
                    rows={2}
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="यस पाठ सम्बन्धी केही द्विविधा छ? यहाँ लेख्नुहोस्..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 font-nepali"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-red-950"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>प्रश्न पठाउनुहोस्</span>
                    </button>
                  </div>
                </form>

                {/* Q&A Thread List */}
                <div className="space-y-3">
                  {qnaPosts.map((post) => (
                    <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={post.author_avatar}
                            alt={post.author_name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-700"
                          />
                          <div>
                            <p className="text-xs font-bold text-white">{post.author_name}</p>
                            <p className="text-[10px] text-slate-500">{post.created_at}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-slate-400 text-xs bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                          <ThumbsUp className="w-3 h-3 text-red-400" />
                          <span>{post.upvotes}</span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-200 font-nepali leading-relaxed">
                        {post.question}
                      </p>

                      {/* Instructor reply */}
                      {post.instructor_reply && (
                        <div className="bg-slate-950/80 border-l-2 border-red-500 p-3 rounded-r-xl space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-red-400">
                              {post.instructor_reply.author}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {post.instructor_reply.replied_at}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 font-nepali leading-relaxed">
                            {post.instructor_reply.reply}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Collapsible Curriculum Sidebar */}
        {sidebarOpen && (
          <div className="w-full lg:w-80 xl:w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-auto lg:h-full">
            <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  पाठ्यक्रम विषयसूची (Syllabus)
                </h3>
                <p className="text-[11px] text-slate-400">
                  {completedLessonIds.length} of {allLessons.length} पूरा भयो
                </p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Module Lesson Tree */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-800/80">
              {course.modules.map((mod) => (
                <div key={mod.id} className="p-3">
                  <h4 className="text-xs font-bold text-slate-300 px-2 py-1.5 mb-1 bg-slate-950/50 rounded-lg">
                    {mod.title}
                  </h4>
                  <div className="space-y-1">
                    {mod.lessons.map((lesson) => {
                      const isCurrent = lesson.id === currentLesson.id;
                      const isCompleted = completedLessonIds.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => handleSelectLesson(lesson)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-between gap-2.5 ${
                            isCurrent
                              ? 'bg-red-950/70 border border-red-700/80 text-white font-semibold'
                              : 'hover:bg-slate-800/60 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            ) : isCurrent ? (
                              <Play className="w-3.5 h-3.5 text-red-400 fill-current flex-shrink-0" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                            )}
                            <span className="truncate leading-tight">
                              {lesson.order_index}. {lesson.title}
                            </span>
                          </div>

                          <span className="text-[10px] text-slate-500 whitespace-nowrap">
                            {lesson.duration_minutes}m
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
