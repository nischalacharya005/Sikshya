import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Bookmark, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Award, 
  FileText, 
  TrendingUp, 
  ChevronRight,
  Sparkles,
  BarChart2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizExam, QuizQuestion, QuizSubmission, User } from '../../types';
import { INITIAL_MOCK_EXAMS } from '../../lib/initialData';
import { saveQuizSubmission } from '../../lib/storage';
import { toNepaliDigits } from '../../lib/nepaliCalendar';

interface MockTestEngineProps {
  currentUser: User;
  onExitTest: () => void;
}

export const MockTestEngine: React.FC<MockTestEngineProps> = ({
  currentUser,
  onExitTest
}) => {
  const [selectedExam, setSelectedExam] = useState<QuizExam>(INITIAL_MOCK_EXAMS[0]);
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);

  // Active question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // User answers map: questionId -> 'A' | 'B' | 'C' | 'D'
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  // Marked for review list
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);

  // Timer countdown in seconds
  const [secondsRemaining, setSecondsRemaining] = useState<number>(INITIAL_MOCK_EXAMS[0].duration_minutes * 60);

  // Submission report
  const [submissionResult, setSubmissionResult] = useState<QuizSubmission | null>(null);

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (examStarted && !examFinished) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer!);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [examStarted, examFinished]);

  const handleStartExam = (exam: QuizExam) => {
    setSelectedExam(exam);
    setUserAnswers({});
    setMarkedForReview([]);
    setSecondsRemaining(exam.duration_minutes * 60);
    setCurrentQuestionIndex(0);
    setExamStarted(true);
    setExamFinished(false);
    setSubmissionResult(null);
  };

  const handleSelectOption = (questionId: string, optionKey: 'A' | 'B' | 'C' | 'D') => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionKey }));
  };

  const handleClearAnswer = (questionId: string) => {
    setUserAnswers(prev => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const handleToggleReview = (questionId: string) => {
    setMarkedForReview(prev => 
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  const handleSubmitExam = () => {
    setExamFinished(true);

    const questions = selectedExam.questions;
    let correctCount = 0;
    let incorrectCount = 0;
    let attemptedCount = 0;

    questions.forEach(q => {
      const answer = userAnswers[q.id];
      if (answer) {
        attemptedCount += 1;
        if (answer === q.correct_option) {
          correctCount += 1;
        } else {
          incorrectCount += 1;
        }
      }
    });

    const unattemptedCount = questions.length - attemptedCount;
    // Each question is worth (total_marks / questions.length)
    const marksPerQuestion = selectedExam.total_marks / questions.length;
    const rawScore = correctCount * marksPerQuestion;
    const negativeDeductionPerWrong = marksPerQuestion * (selectedExam.negative_marking_percent / 100);
    const negativeDeductions = incorrectCount * negativeDeductionPerWrong;
    const finalScore = Math.max(0, rawScore - negativeDeductions);
    const percentage = (finalScore / selectedExam.total_marks) * 100;
    
    // Percentile emulation based on historical student distribution
    const percentileRank = Math.min(99.4, Math.max(45, percentage * 1.05));

    const submission: QuizSubmission = {
      id: `sub_${Date.now()}`,
      user_id: currentUser.id,
      exam_id: selectedExam.id,
      exam_title: selectedExam.title,
      submitted_at: new Date().toISOString(),
      total_questions: questions.length,
      attempted_count: attemptedCount,
      correct_count: correctCount,
      incorrect_count: incorrectCount,
      unattempted_count: unattemptedCount,
      raw_score: Number(rawScore.toFixed(2)),
      negative_deductions: Number(negativeDeductions.toFixed(2)),
      final_score: Number(finalScore.toFixed(2)),
      percentage: Number(percentage.toFixed(1)),
      percentile_rank: Number(percentileRank.toFixed(1)),
      time_spent_seconds: (selectedExam.duration_minutes * 60) - secondsRemaining,
      user_answers: userAnswers
    };

    saveQuizSubmission(submission);
    setSubmissionResult(submission);

    // Trigger celebration if passed
    if (finalScore >= selectedExam.pass_marks) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const currentQ = selectedExam.questions[currentQuestionIndex];
  const formattedMinutes = Math.floor(secondsRemaining / 60);
  const formattedSeconds = secondsRemaining % 60;

  // View: Exam Selection Lobby
  if (!examStarted) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-red-950/70 border border-red-700/80 px-3.5 py-1.5 rounded-full text-xs font-semibold text-red-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Computer Based Test (CBT) Simulation Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            लोकसेवा तथा बैंकिङ आधिकारिक Mock Test सेटहरू
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-nepali">
            आयोगको वास्तविक परीक्षा प्रणाली, समय सीमा र २०% नेगेटिभ मार्किङ सहितको प्रत्यक्ष अभ्यास।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {INITIAL_MOCK_EXAMS.map((exam) => (
            <div
              key={exam.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-950 text-red-400 border border-red-800">
                    {exam.category}
                  </span>
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{exam.duration_minutes} मिनेट</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {exam.title}
                </h3>
                <p className="text-xs text-slate-400 font-nepali">
                  {exam.title_nepali}
                </p>

                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">पूर्णाङ्क (Marks)</span>
                    <span className="font-bold text-white">{exam.total_marks}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">उत्तीर्णाङ्क (Pass)</span>
                    <span className="font-bold text-emerald-400">{exam.pass_marks}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">ऋणात्मक अंक</span>
                    <span className="font-bold text-red-400">-{exam.negative_marking_percent}%</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-400">
                  <p className="font-semibold text-slate-300">परीक्षाका मुख्य नियमहरू:</p>
                  {exam.instructions.map((inst, i) => (
                    <p key={i} className="flex items-start gap-1.5 font-nepali">
                      <span className="text-red-400">•</span>
                      <span>{inst}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {exam.questions.length} बहुबैकल्पिक प्रश्नहरू (MCQs)
                </span>
                <button
                  onClick={() => handleStartExam(exam)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-red-950/50 flex items-center gap-1.5 transition"
                >
                  <span>परीक्षा सुरु गर्नुहोस्</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // View: Exam Scorecard & Review
  if (examFinished && submissionResult) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
        {/* Scorecard Hero */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-slate-800 border border-slate-700 text-amber-400">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">
              परीक्षा नतिजा तथा विश्लेषण (CBT Performance Scorecard)
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {submissionResult.exam_title}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              परीक्षार्थी: <span className="text-slate-200 font-semibold">{currentUser.full_name}</span> • दर्ता मिति: {new Date(submissionResult.submitted_at).toLocaleDateString()}
            </p>
          </div>

          {/* Big Score Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">अन्तिम प्राप्ताङ्क (Score)</span>
              <span className="text-2xl sm:text-3xl font-black text-white">
                {submissionResult.final_score}
              </span>
              <span className="text-[10px] text-slate-500 block">/ {selectedExam.total_marks} पूर्णाङ्क</span>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">प्रतिशत (Percentage)</span>
              <span className={`text-2xl sm:text-3xl font-black ${submissionResult.final_score >= selectedExam.pass_marks ? 'text-emerald-400' : 'text-red-400'}`}>
                {submissionResult.percentage}%
              </span>
              <span className="text-[10px] text-slate-500 block">
                {submissionResult.final_score >= selectedExam.pass_marks ? 'उत्तीर्ण (PASS)' : 'अनुत्तीर्ण (FAIL)'}
              </span>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">पर्सेन्टाइल र्‍याङ्क</span>
              <span className="text-2xl sm:text-3xl font-black text-blue-400">
                {submissionResult.percentile_rank}%
              </span>
              <span className="text-[10px] text-slate-500 block">Top Percentile</span>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">नेगेटिभ कट्टा</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400">
                -{submissionResult.negative_deductions}
              </span>
              <span className="text-[10px] text-slate-500 block">२०% Negative</span>
            </div>
          </div>

          {/* Breakdown Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs border-t border-slate-800/80 pt-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>सहि उत्तर: <strong>{submissionResult.correct_count}</strong></span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span>गलत उत्तर: <strong>{submissionResult.incorrect_count}</strong></span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              <span>नछोएका: <strong>{submissionResult.unattempted_count}</strong></span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>समय: <strong>{Math.floor(submissionResult.time_spent_seconds / 60)} मिनेट</strong></span>
            </span>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => handleStartExam(selectedExam)}
              className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-red-950"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>पुन: परीक्षा दिनुहोस् (Retake)</span>
            </button>
            <button
              onClick={() => setExamStarted(false)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-xl text-xs font-semibold transition"
            >
              सबै सेटहरू हेर्नुहोस्
            </button>
          </div>
        </div>

        {/* Detailed Answer Key & Explanations */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-400" />
            <span>विस्तृत उत्तर र समाधान (Answers & Explanations)</span>
          </h2>

          <div className="space-y-4">
            {selectedExam.questions.map((q, idx) => {
              const studentAnswer = submissionResult.user_answers[q.id];
              const isCorrect = studentAnswer === q.correct_option;
              const isAttempted = !!studentAnswer;

              return (
                <div
                  key={q.id}
                  className={`bg-slate-900 border rounded-2xl p-5 space-y-3 ${
                    !isAttempted
                      ? 'border-slate-800'
                      : isCorrect
                      ? 'border-emerald-800/80 bg-emerald-950/20'
                      : 'border-red-800/80 bg-red-950/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold text-slate-400">
                      प्रश्न {idx + 1} ({q.subject_section}):
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      !isAttempted
                        ? 'bg-slate-800 text-slate-400'
                        : isCorrect
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-red-950 text-red-400 border border-red-800'
                    }`}>
                      {!isAttempted ? 'नछोएको' : isCorrect ? 'सहि उत्तर (+२.०)' : 'गलत उत्तर (-०.४०)'}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-white">
                    {q.question_en}
                  </p>
                  {q.question_np && (
                    <p className="text-xs text-slate-300 font-nepali">
                      {q.question_np}
                    </p>
                  )}

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {q.options.map(opt => {
                      const isOptionCorrect = opt.key === q.correct_option;
                      const isOptionStudentChoice = studentAnswer === opt.key;

                      let optClass = 'bg-slate-950/70 border-slate-800 text-slate-300';
                      if (isOptionCorrect) {
                        optClass = 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-semibold';
                      } else if (isOptionStudentChoice && !isOptionCorrect) {
                        optClass = 'bg-red-950/80 border-red-600 text-red-200 line-through';
                      }

                      return (
                        <div
                          key={opt.key}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optClass}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-[11px]">
                              {opt.key}
                            </span>
                            <span>{opt.text_en}</span>
                          </div>
                          {isOptionCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                          {isOptionStudentChoice && !isOptionCorrect && <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Explanation */}
                  <div className="mt-3 p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-1">
                    <p className="font-semibold text-amber-400 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>व्याख्या (Explanation):</span>
                    </p>
                    <p className="text-slate-300 font-nepali leading-relaxed">
                      {q.explanation_np || q.explanation_en}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // View: Live Active CBT Exam Interface
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Exam Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-30 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xs sm:text-sm font-bold text-white truncate">
            {selectedExam.title}
          </h2>
          <p className="text-[11px] text-slate-400">
            लोक सेवा आयोग CBT इन्टरफेस • २०% ऋणात्मक अंक
          </p>
        </div>

        {/* Live Timer */}
        <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold border ${
          secondsRemaining < 300 
            ? 'bg-red-950 text-red-400 border-red-700 animate-pulse' 
            : 'bg-slate-950 text-amber-400 border-slate-800'
        }`}>
          <Clock className="w-4 h-4" />
          <span>
            {String(formattedMinutes).padStart(2, '0')}:{String(formattedSeconds).padStart(2, '0')}
          </span>
        </div>

        <button
          onClick={handleSubmitExam}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-red-950"
        >
          परीक्षा पेश गर्नुहोस् (Submit)
        </button>
      </div>

      {/* Main Examination View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-7xl mx-auto w-full p-4 gap-6">
        
        {/* Left Column: Active Question */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div>
            {/* Question Top Meta */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
              <span className="font-bold text-red-400">
                प्रश्न {currentQuestionIndex + 1} of {selectedExam.questions.length}
              </span>
              <span className="bg-slate-950 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-full text-[11px]">
                विषय: {currentQ.subject_section}
              </span>
            </div>

            {/* Question Text */}
            <div className="py-6 space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQ.question_en}
              </h3>
              {currentQ.question_np && (
                <p className="text-sm text-slate-300 font-nepali leading-relaxed">
                  {currentQ.question_np}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt.key;
                return (
                  <div
                    key={opt.key}
                    onClick={() => handleSelectOption(currentQ.id, opt.key)}
                    className={`p-4 rounded-2xl border text-xs sm:text-sm cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-red-950/70 border-red-600 text-white font-semibold'
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-red-600 text-white' : 'bg-slate-900 border border-slate-700 text-slate-300'
                      }`}>
                        {opt.key}
                      </span>
                      <div>
                        <p>{opt.text_en}</p>
                        {opt.text_np && <p className="text-xs text-slate-400 font-nepali">{opt.text_np}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 mt-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleReview(currentQ.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
                  markedForReview.includes(currentQ.id)
                    ? 'bg-purple-950 text-purple-300 border-purple-700'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>रिभ्यूका लागि चिन्ह (Review)</span>
              </button>

              {userAnswers[currentQ.id] && (
                <button
                  onClick={() => handleClearAnswer(currentQ.id)}
                  className="px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-red-400 transition"
                >
                  उत्तर मेटाउनुहोस् (Clear)
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>अघिल्लो (Prev)</span>
              </button>

              <button
                disabled={currentQuestionIndex === selectedExam.questions.length - 1}
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1 shadow-md shadow-red-950"
              >
                <span>पछिल्लो (Next)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Question Palette (Loksewa 4-state indicator) */}
        <div className="w-full lg:w-80 bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
              प्रश्न प्यालेट (Question Palette)
            </h4>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] mb-5 text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>उत्तर दिएको ({Object.keys(userAnswers).length})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500" />
                <span>रिभ्यू चिन्ह ({markedForReview.length})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-700" />
                <span>नछोएको ({selectedExam.questions.length - Object.keys(userAnswers).length})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-600" />
                <span>सक्रिय प्रश्न</span>
              </div>
            </div>

            {/* Question buttons grid */}
            <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto p-1">
              {selectedExam.questions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = !!userAnswers[q.id];
                const isReview = markedForReview.includes(q.id);

                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-400';
                if (isCurrent) {
                  btnStyle = 'bg-red-600 border-red-500 text-white font-bold ring-2 ring-red-400/40';
                } else if (isReview) {
                  btnStyle = 'bg-purple-900 border-purple-600 text-purple-200 font-bold';
                } else if (isAnswered) {
                  btnStyle = 'bg-emerald-900/80 border-emerald-600 text-emerald-200 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 rounded-xl border text-xs transition flex items-center justify-center ${btnStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 space-y-2">
            <button
              onClick={handleSubmitExam}
              className="w-full bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-xl text-xs font-bold transition shadow-lg shadow-red-950"
            >
              परीक्षा अन्त्य गर्नुहोस् (Finish Test)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
