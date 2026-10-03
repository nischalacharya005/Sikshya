import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  PlayCircle, 
  ShieldCheck, 
  Award, 
  Users, 
  Download, 
  CheckCircle,
  TrendingUp,
  Flame
} from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface HeroBannerProps {
  onExploreCourses: () => void;
  onStartMockTest: () => void;
  onOpenInstallModal: () => void;
  onSelectCategory: (cat: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreCourses,
  onStartMockTest,
  onOpenInstallModal,
  onSelectCategory
}) => {
  const { isInstalled } = usePWAInstall();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 py-16 sm:py-24">
      {/* Background Subtle Geometric Accents (Nepal double pennant hint) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Admissions Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-950/80 to-slate-900 border border-red-500/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-red-300 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span>२०८३/२०८४ नयाँ भर्ना सुरु • Live Interactive Batches Open</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              नेपालको नम्बर १ <br />
              <span className="bg-gradient-to-r from-red-500 via-amber-400 to-red-400 bg-clip-text text-transparent">
                अनलाइन तयारी
              </span> प्लेटफर्म
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 font-nepali leading-relaxed max-w-2xl">
              लोक सेवा आयोग (नायब सुब्बा, शाखा अधिकृत, खरिदार), राष्ट्रिय वाणिज्य बैंक (RBB), नेपाल बैंक (NBL) तथा TU CMAT को लागि नेपालका वरिष्ठ सहसचिव, उपसचिव र चार्टर्ड एकाउन्टेन्टहरूको प्रत्यक्ष मार्गदर्शन।
            </p>

            {/* Key feature pills */}
            <div className="flex flex-wrap gap-2 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-700/80 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                VdoCipher DRM सुरक्षित भिडियो
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-700/80 px-3 py-1 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                २०% Negative Marking सहित CBT
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-700/80 px-3 py-1 rounded-full">
                <Flame className="w-3.5 h-3.5 text-red-400" />
                eSewa र Khalti तुरुन्त भुक्तानी
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartMockTest}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-red-950/60 transition-all flex items-center gap-2 transform active:scale-95"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>निःशुल्क Mock Test दिनुहोस्</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onExploreCourses}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-3.5 rounded-xl border border-slate-700 transition flex items-center gap-2"
              >
                <PlayCircle className="w-5 h-5 text-slate-300" />
                <span>सबै कोर्सहरू हेर्नुहोस्</span>
              </button>

              {!isInstalled && (
                <button
                  onClick={onOpenInstallModal}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-4 py-3.5 rounded-xl border border-slate-700/80 text-xs font-semibold transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-red-400" />
                  <span>PWA App इन्स्टल</span>
                </button>
              )}
            </div>

            {/* Quick Category Badges */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-400">लोकप्रिय विधा:</span>
              <button
                onClick={() => onSelectCategory('Loksewa (लोकसेवा)')}
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1 rounded-lg transition"
              >
                लोकसेवा नासु
              </button>
              <button
                onClick={() => onSelectCategory('Loksewa (लोकसेवा)')}
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1 rounded-lg transition"
              >
                शाखा अधिकृत
              </button>
              <button
                onClick={() => onSelectCategory('Banking (बैंकिङ)')}
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1 rounded-lg transition"
              >
                RBB तह ४
              </button>
              <button
                onClick={() => onSelectCategory('CMAT & Entrance')}
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-1 rounded-lg transition"
              >
                TU CMAT
              </button>
            </div>

          </div>

          {/* Right Column: Hero Card with Live Class & Interactive Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card */}
              <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

                {/* Card Header: Live Class Indicator */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-xs font-bold text-red-400 tracking-wide">
                      TODAY'S LIVE STREAM
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    HD 1080p
                  </span>
                </div>

                {/* Video Mockup with Dynamic Watermark Simulator */}
                <div className="relative mt-4 aspect-video rounded-xl bg-slate-950 overflow-hidden border border-slate-800 group">
                  <img
                    src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80"
                    alt="Classroom preview"
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                    <div 
                      onClick={onStartMockTest}
                      className="w-14 h-14 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform"
                    >
                      <PlayCircle className="w-8 h-8 fill-current" />
                    </div>
                  </div>

                  {/* Watermark preview (illustrates anti-piracy protection) */}
                  <div className="absolute top-2 right-2 text-[9px] font-mono text-white/40 select-none bg-black/40 px-1 rounded">
                    nischal****@gmail.com • +977-9841***
                  </div>
                  
                  <div className="absolute bottom-2 left-2 text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded">
                    LIVE: संविधान र मौलिक हक
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-800 text-center">
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <p className="text-lg font-black text-white">४५K+</p>
                    <p className="text-[10px] text-slate-400 font-nepali">सफल विद्यार्थी</p>
                  </div>
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <p className="text-lg font-black text-emerald-400">९४.२%</p>
                    <p className="text-[10px] text-slate-400 font-nepali">नासु पहिलो पत्र पास</p>
                  </div>
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <p className="text-lg font-black text-amber-400">३५०+</p>
                    <p className="text-[10px] text-slate-400 font-nepali">CBT मोडल सेट</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
