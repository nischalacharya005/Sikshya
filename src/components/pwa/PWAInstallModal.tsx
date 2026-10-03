import React from 'react';
import { X, Download, Smartphone, Share, PlusSquare, CheckCircle, WifiOff, Zap } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isIOS, isInstalled, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Icon */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-blue-600 mx-auto flex items-center justify-center shadow-xl shadow-red-950/60 border border-red-500/30">
            <Smartphone className="w-8 h-8 text-white" />
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-white">
              Shiksha LMS मोबाइल एप इन्स्टल
            </h3>
            <p className="text-xs text-slate-400 font-nepali mt-1">
              नेपालको पहिलो PWA आधारित लोकसेवा तथा बैंकिङ तयारी एप
            </p>
          </div>
        </div>

        {/* Benefits for Nepali Students */}
        <div className="space-y-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
          <div className="flex items-start gap-2.5">
            <WifiOff className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-slate-300">
              <strong>अफलाइन अध्ययन:</strong> डाउनलोड गरिएका PDF नोट र प्रश्नोत्तरहरू इन्टरनेट नहुँदा पनि पढ्न सकिने।
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span className="text-slate-300">
              <strong>सुपरफास्ट स्पीड:</strong> कम मोबाइल डाटा खपत (Zero buffering) र तुरुन्त खुल्ने।
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <span className="text-slate-300">
              <strong>गृहपृष्ठ सर्टकट:</strong> मोबाइलको होमस्क्रिनबाट सिधै १-क्लिकमा कक्षाकोठामा प्रवेश।
            </span>
          </div>
        </div>

        {/* iOS Guided Instructions */}
        {isIOS ? (
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
            <p className="font-bold text-white flex items-center gap-1.5">
              <span>iPhone वा iPad मा इन्स्टल गर्ने तरिका:</span>
            </p>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside leading-relaxed font-nepali">
              <li>
                सफारी (Safari) ब्राउजरको तल रहेको <strong className="text-white">Share (सेयर)</strong> बटन थिच्नुहोस्।
              </li>
              <li>
                तल स्क्रोल गरी <strong className="text-white">"Add to Home Screen"</strong> (होमस्क्रिनमा थप्नुहोस्) मा ट्याप गर्नुहोस्।
              </li>
              <li>
                माथि दायाँ कुनाको <strong className="text-emerald-400">"Add"</strong> थिच्नुहोस्।
              </li>
            </ol>
          </div>
        ) : isInstalled ? (
          <div className="bg-emerald-950/60 border border-emerald-700/60 p-4 rounded-2xl text-center text-xs text-emerald-300">
            ✓ एप सफलतापूर्वक इन्स्टल भइसकेको छ। तपाईं अहिले नेटिभ मोडमा हुनुहुन्छ।
          </div>
        ) : (
          <button
            onClick={handleInstallClick}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3.5 rounded-2xl text-sm transition flex items-center justify-center gap-2 shadow-xl shadow-red-950"
          >
            <Download className="w-5 h-5" />
            <span>अहिले नै इन्स्टल गर्नुहोस् (Install Now)</span>
          </button>
        )}

        <button
          onClick={onClose}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-xs font-semibold transition"
        >
          पछि गर्नुस् (Dismiss)
        </button>

      </div>
    </div>
  );
};
