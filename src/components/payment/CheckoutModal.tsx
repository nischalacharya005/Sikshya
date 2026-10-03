import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  ArrowRight, 
  CreditCard, 
  AlertCircle,
  Clock,
  Check
} from 'lucide-react';
import { Course, Enrollment, PaymentMethod, User } from '../../types';
import { saveEnrollment } from '../../lib/storage';

interface CheckoutModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSuccess: (course: Course) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  course,
  isOpen,
  onClose,
  currentUser,
  onSuccess
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('esewa');
  
  // Payment Gateway simulation state
  const [step, setStep] = useState<'details' | 'gateway_form' | 'otp_verify' | 'success'>('details');
  const [mobileNumber, setMobileNumber] = useState(currentUser.phone.replace('+977-', '') || '9841892301');
  const [mpin, setMpin] = useState('1234');
  const [otp, setOtp] = useState('8924');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedTxnId, setGeneratedTxnId] = useState('');

  if (!isOpen || !course) return null;

  const handleStartPayment = () => {
    setStep('gateway_form');
  };

  const handleSubmitCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('otp_verify');
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const prefix = selectedMethod === 'esewa' ? 'ESEWA-TXN-' : 'KHALTI-TXN-';
      const txnId = `${prefix}${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedTxnId(txnId);

      const newEnrollment: Enrollment = {
        id: `enr_${Date.now()}`,
        user_id: currentUser.id,
        course_id: course.id,
        payment_method: selectedMethod,
        transaction_id: txnId,
        amount_paid: course.price_npr,
        status: 'active',
        enrolled_at: new Date().toISOString(),
        completed_lessons: [],
        last_watched_lesson_id: course.modules[0]?.lessons[0]?.id
      };

      saveEnrollment(newEnrollment);
      setIsProcessing(false);
      setStep('success');
    }, 1200);
  };

  const handleCompleteAndEnterClassroom = () => {
    onSuccess(course);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">
              सुरक्षित चेकआउट (Nepal Payment Gateway)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Order Details & Gateway Selector */}
        {step === 'details' && (
          <div className="p-6 space-y-6">
            {/* Course Summary */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-20 h-16 rounded-xl object-cover border border-slate-700 flex-shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/40">
                  {course.category}
                </span>
                <h4 className="text-sm font-bold text-white mt-1 line-clamp-1 leading-snug">
                  {course.title}
                </h4>
                <p className="text-xs text-slate-400 truncate">
                  प्रशिक्षक: {course.instructor_name}
                </p>
              </div>
            </div>

            {/* Select Gateway */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                भुक्तानी माध्यम छान्नुहोस् (Select Gateway):
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* eSewa Option */}
                <div
                  onClick={() => setSelectedMethod('esewa')}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    selectedMethod === 'esewa'
                      ? 'bg-emerald-950/40 border-[#60bb46] ring-1 ring-[#60bb46]'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-4 h-4 rounded-full bg-[#60bb46] flex items-center justify-center text-white text-[10px] font-bold">
                      e
                    </span>
                    {selectedMethod === 'esewa' && <CheckCircle2 className="w-4 h-4 text-[#60bb46]" />}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">eSewa Wallet</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">नेपालको पहिलो डिजिटल वालेट</p>
                  </div>
                </div>

                {/* Khalti Option */}
                <div
                  onClick={() => setSelectedMethod('khalti')}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    selectedMethod === 'khalti'
                      ? 'bg-purple-950/40 border-[#5C2D91] ring-1 ring-[#5C2D91]'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-4 h-4 rounded-full bg-[#5C2D91] flex items-center justify-center text-white text-[10px] font-bold">
                      K
                    </span>
                    {selectedMethod === 'khalti' && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Khalti Digital Wallet</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Instant Cashback & Secure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bill Breakdown */}
            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>पाठ्यक्रम शुल्क (Standard Price):</span>
                <span>रू {course.original_price_npr.toLocaleString('ne-NP')}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>विशेष छुट (Promotional Discount):</span>
                <span>-रू {(course.original_price_npr - course.price_npr).toLocaleString('ne-NP')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>१३% भ्याट (VAT Included):</span>
                <span>रु ०.००</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>कुल भुक्तानी रकम (Payable NPR):</span>
                <span className="text-red-400 text-base">रू {course.price_npr.toLocaleString('ne-NP')}</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleStartPayment}
              className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-xl ${
                selectedMethod === 'esewa'
                  ? 'bg-[#60bb46] hover:bg-[#52a13b] text-white shadow-emerald-950'
                  : 'bg-[#5C2D91] hover:bg-[#4d257a] text-white shadow-purple-950'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>
                {selectedMethod === 'esewa' ? 'eSewa बाट भुक्तानी गर्नुहोस्' : 'Khalti बाट भुक्तानी गर्नुहोस्'} (रू {course.price_npr})
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Gateway Login Form (eSewa / Khalti UI simulation) */}
        {step === 'gateway_form' && (
          <form onSubmit={handleSubmitCredentials} className="p-6 space-y-5">
            <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
              selectedMethod === 'esewa' ? 'bg-[#60bb46]/10 border-[#60bb46]/40' : 'bg-[#5C2D91]/10 border-[#5C2D91]/40'
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg ${
                selectedMethod === 'esewa' ? 'bg-[#60bb46]' : 'bg-[#5C2D91]'
              }`}>
                {selectedMethod === 'esewa' ? 'e' : 'K'}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">
                  {selectedMethod === 'esewa' ? 'eSewa Secure Login' : 'Khalti Gateway Login'}
                </h4>
                <p className="text-[11px] text-slate-400">
                  भुक्तानी रकम: <strong className="text-white">रू {course.price_npr.toLocaleString()}</strong>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {selectedMethod === 'esewa' ? 'eSewa ID / मोबाइल नम्बर' : 'Khalti रजिस्टर्ड मोबाइल नम्बर'}
                </label>
                <input
                  type="text"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  placeholder="98XXXXXXXX"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {selectedMethod === 'esewa' ? 'eSewa MPIN वा पासवर्ड' : 'Khalti 4-digit MPIN'}
                </label>
                <input
                  type="password"
                  required
                  value={mpin}
                  onChange={(e) => setMpin(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 font-mono"
                  placeholder="••••"
                  maxLength={6}
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  डेमो मोड: परीक्षणको लागि कुनै पनि ४ अंकको पिन राख्न सक्नुहुन्छ (उदा: 1234)
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl text-xs font-semibold transition"
              >
                फिर्ता
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className={`flex-1 py-3 rounded-xl text-xs font-bold text-white transition flex items-center justify-center gap-2 ${
                  selectedMethod === 'esewa' ? 'bg-[#60bb46] hover:bg-[#52a13b]' : 'bg-[#5C2D91] hover:bg-[#4d257a]'
                }`}
              >
                {isProcessing ? 'प्रक्रियामा छ...' : 'OTP कोड पठाउनुहोस्'}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: OTP Verification Step */}
        {step === 'otp_verify' && (
          <form onSubmit={handleVerifyOtp} className="p-6 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">
                SMS One-Time Password (OTP) प्रमाणीकरण
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                तपाईंको मोबाइल नम्बर <span className="text-white font-mono">{mobileNumber}</span> मा ६ अंकको टोकन पठाइएको छ।
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 text-center">
                OTP कोड प्रविष्ट गर्नुहोस्:
              </label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-mono bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500"
                placeholder="8924"
                maxLength={6}
              />
              <p className="text-[10px] text-slate-500 text-center mt-1">
                परीक्षण कोड स्वत: भरिएको छ (Auto-filled for testing)
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep('gateway_form')}
                className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl text-xs font-semibold transition"
              >
                सच्याउनुहोस्
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 bg-red-600 hover:bg-red-500 py-3 rounded-xl text-xs font-bold text-white transition flex items-center justify-center gap-2 shadow-lg shadow-red-950"
              >
                {isProcessing ? 'भुक्तानी पुष्टि गरिँदैछ...' : 'भुक्तानी सम्पन्न गर्नुहोस् (Confirm NPR ' + course.price_npr + ')'}
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Success Receipt */}
        {step === 'success' && (
          <div className="p-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                भुक्तानी सफल भयो (Payment Successful)
              </span>
              <h3 className="text-xl font-black text-white">
                बधाई छ! भर्ना सम्पन्न भयो
              </h3>
              <p className="text-xs text-slate-400 font-nepali">
                तपाईंको पाठ्यक्रम तत्काल सक्रिय गरिएको छ। अब कक्षाहरू सुरु गर्नुहोस्।
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">कारोबार आईडी (Txn ID):</span>
                <span className="font-mono font-bold text-amber-300">{generatedTxnId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">भुक्तानी माध्यम:</span>
                <span className="font-semibold text-white capitalize">{selectedMethod.toUpperCase()} Nepal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">भुक्तानी रकम:</span>
                <span className="font-bold text-emerald-400">रू {course.price_npr.toLocaleString('ne-NP')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">पहुँच अवधि:</span>
                <span className="text-slate-200">१ वर्ष असीमित (३६५ दिन)</span>
              </div>
            </div>

            <button
              onClick={handleCompleteAndEnterClassroom}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-xl shadow-emerald-950"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>कक्षा कोठामा जानुहोस् (Enter Classroom)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
