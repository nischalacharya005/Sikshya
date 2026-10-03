import React from 'react';
import { GraduationCap, ShieldCheck, Phone, Mail, MapPin, Download, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenSchemaModal: () => void;
  onOpenInstallModal: () => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSchemaModal,
  onOpenInstallModal,
  onSelectCategory
}) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      {/* Upper Payment and Trust Badges */}
      <div className="border-b border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-red-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">१००% सुरक्षित भुक्तानी (Local Gateways)</h4>
              <p className="text-slate-400 text-xs mt-0.5">eSewa र Khalti बाट तुरुन्तै कोर्स सक्रियता (Instant Access)</p>
            </div>
          </div>

          {/* eSewa & Khalti Badges */}
          <div className="flex items-center justify-start md:justify-center gap-4 flex-wrap">
            {/* eSewa Badge */}
            <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1.5 rounded-lg text-emerald-300 font-semibold text-xs">
              <span className="w-3 h-3 rounded-full bg-[#60bb46] inline-block" />
              <span>eSewa Verified Merchant</span>
            </div>
            {/* Khalti Badge */}
            <div className="flex items-center gap-2 bg-purple-950/40 border border-purple-800/60 px-3 py-1.5 rounded-lg text-purple-300 font-semibold text-xs">
              <span className="w-3 h-3 rounded-full bg-[#5C2D91] inline-block" />
              <span>Khalti Payment Gateway</span>
            </div>
          </div>

          {/* Offline PWA Badge */}
          <div className="flex items-center justify-start md:justify-end">
            <button
              onClick={onOpenInstallModal}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 px-3.5 py-2 rounded-lg transition"
            >
              <Download className="w-4 h-4 text-red-400" />
              <span>PWA Offline App Install</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Shiksha<span className="text-red-500">.LMS</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              नेपालको अग्रणी अनलाइन तयारी प्लेटफर्म। लोक सेवा आयोग (नायब सुब्बा, शाखा अधिकृत, खरिदार), राष्ट्रिय वाणिज्य बैंक, नेपाल बैंक र त्रिभुवन विश्वविद्यालय CMAT को लागि स्तरीय पाठ्यक्रम, मोडल सेट र अनुभवी शिक्षकहरूको प्रत्यक्ष मार्गदर्शन।
            </p>
            <div className="space-y-1.5 text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Putalisadak-28, Bagbazar Road, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+977-01-4422990 / +977-9841892300 (Toll Free Support)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>admissions@shikshalms.edu.np</span>
              </div>
            </div>
          </div>

          {/* Exam Streams */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">तयारी कक्षाहरू</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onSelectCategory('Loksewa (लोकसेवा)')}
                  className="hover:text-white transition"
                >
                  लोकसेवा नायब सुब्बा (NaSu)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('Loksewa (लोकसेवा)')}
                  className="hover:text-white transition"
                >
                  शाखा अधिकृत (Section Officer)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('Banking (बैंकिङ)')}
                  className="hover:text-white transition"
                >
                  राष्ट्रिय वाणिज्य बैंक (RBB) तह ४ र ५
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('Banking (बैंकिङ)')}
                  className="hover:text-white transition"
                >
                  नेपाल बैंक (NBL) तथा नेपाल राष्ट्र बैंक
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('CMAT & Entrance')}
                  className="hover:text-white transition"
                >
                  TU CMAT & KUUMAT Entrance
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & PWA */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">स्रोत तथा सुविधाहरू</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#mocktest" className="hover:text-white transition flex items-center gap-1">
                  <span>निःशुल्क Mock Test Set</span>
                  <span className="text-[10px] bg-red-600/30 text-red-400 px-1 rounded">CBT</span>
                </a>
              </li>
              <li>
                <button onClick={onOpenInstallModal} className="hover:text-white transition">
                  PWA एप डाउनलोड गर्नुहोस्
                </button>
              </li>
              <li>
                <span className="text-slate-500">अफलाइन नोट तथा माइन्डम्याप</span>
              </li>
              <li>
                <button onClick={onOpenSchemaModal} className="hover:text-blue-400 transition font-mono text-[11px] flex items-center gap-1">
                  <span>Supabase / SQL Schema</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">सरकारी तथा आधिकारिक पोर्टल</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="http://psc.gov.np" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">
                  <span>लोक सेवा आयोग (PSC Nepal)</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://nrb.org.np" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">
                  <span>नेपाल राष्ट्र बैंक (NRB)</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://rbb.com.np" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">
                  <span>राष्ट्रिय वाणिज्य बैंक लिमिटेड</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://fomecd.edu.np" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">
                  <span>त्रिभुवन विश्वविद्यालय (TU Dean)</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Shiksha LMS Nepal. सर्वाधिकार सुरक्षित (All Rights Reserved).</p>
          <p className="font-nepali text-slate-400">
            "विद्या धनं सर्व धनं प्रधानम्" • गुणस्तरीय डिजिटल शिक्षा सम्पूर्ण नेपाली विद्यार्थीका लागि
          </p>
        </div>
      </div>
    </footer>
  );
};
