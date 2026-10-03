import React, { useState } from 'react';
import { Calendar, AlertCircle, Clock, ChevronRight, FileText, CheckCircle2, Bookmark } from 'lucide-react';
import { UpcomingExam } from '../../types';
import { INITIAL_UPCOMING_EXAMS } from '../../lib/initialData';
import { getApproximateNepaliDate, toNepaliDigits } from '../../lib/nepaliCalendar';

interface UpcomingExamsWidgetProps {
  onStartExamPrep: (exam: UpcomingExam) => void;
}

export const UpcomingExamsWidget: React.FC<UpcomingExamsWidgetProps> = ({ onStartExamPrep }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'loksewa' | 'banking' | 'university'>('all');
  const todayBS = getApproximateNepaliDate();

  const filteredExams = INITIAL_UPCOMING_EXAMS.filter(exam => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'loksewa') return exam.organization.includes('Loksewa');
    if (selectedCategory === 'banking') return exam.organization.includes('Bank');
    if (selectedCategory === 'university') return exam.organization.includes('University') || exam.post_name.includes('CMAT');
    return true;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      {/* Widget Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">
              वि.सं. २०८३/२०८४ परीक्षा क्यालेन्डर (B.S. Calendar)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            आगामी मुख्य प्रतिस्पर्धात्मक परीक्षाहरू (Upcoming Exams)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            आज: <span className="text-amber-400 font-semibold">{todayBS.formattedBS}</span> • लोक सेवा तथा बैंकिङ आयोगको आधिकारिक तालिका अनुसार
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
              selectedCategory === 'all' 
                ? 'bg-red-600 text-white font-semibold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            सबै (All)
          </button>
          <button
            onClick={() => setSelectedCategory('loksewa')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
              selectedCategory === 'loksewa' 
                ? 'bg-red-600 text-white font-semibold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            लोकसेवा
          </button>
          <button
            onClick={() => setSelectedCategory('banking')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
              selectedCategory === 'banking' 
                ? 'bg-red-600 text-white font-semibold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            बैंकिङ (RBB/NBL)
          </button>
          <button
            onClick={() => setSelectedCategory('university')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
              selectedCategory === 'university' 
                ? 'bg-red-600 text-white font-semibold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            TU CMAT
          </button>
        </div>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="group relative bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Organization and Level */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {exam.organization_nepali}
                </span>

                {/* Days remaining badge */}
                <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  exam.days_remaining <= 10 
                    ? 'bg-red-950/90 text-red-400 border border-red-800/80 animate-pulse' 
                    : 'bg-blue-950/70 text-blue-300 border border-blue-800/60'
                }`}>
                  <Clock className="w-3 h-3" />
                  <span>{toNepaliDigits(exam.days_remaining)} दिन बाँकी</span>
                </div>
              </div>

              {/* Exam Title */}
              <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                {exam.post_name}
              </h3>
              <p className="text-xs text-slate-300 font-nepali mt-1">
                {exam.post_name_nepali}
              </p>

              {/* Exam Date in Bikram Sambat & Gregorian */}
              <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">लिखित परीक्षा मिति (B.S.):</span>
                  <span className="font-bold text-amber-300 font-nepali">{exam.date_bs}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Gregorian Calendar:</span>
                  <span className="text-slate-300 font-mono text-[11px]">{exam.date_ad}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                  <span className="text-slate-400">तह / श्रेणी:</span>
                  <span className="text-slate-200 text-[11px] font-medium">{exam.level}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-5 pt-3 border-t border-slate-800/70 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>नयाँ पाठ्यक्रम अनुरूप</span>
              </span>

              <button
                onClick={() => onStartExamPrep(exam)}
                className="bg-slate-800 hover:bg-red-600 hover:text-white text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 group-hover:bg-red-600 group-hover:text-white"
              >
                <span>तयारी सुरु गर्नुहोस्</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Official Circular Advisory */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-red-950/30 to-blue-950/20 border border-slate-800 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <p className="font-semibold text-slate-200 mb-0.5">
            सूचना: लोक सेवा आयोग वार्षिक कार्यतालिका २०८३/२०८४
          </p>
          <p className="text-slate-400 leading-relaxed">
            आयोगको नियमित सूचना तथा विज्ञापन अनुसार नायब सुब्बा र शाखा अधिकृतको विज्ञापन असोज र मंसिर महिनाको अन्तिम बुधबार गोरखापत्र तथा आयोगको वेबसाइटमा प्रकाशित गरिन्छ। सम्पूर्ण परीक्षा सामग्री Shiksha LMS मा निरन्तर अपडेट हुन्छ।
          </p>
        </div>
      </div>
    </div>
  );
};
