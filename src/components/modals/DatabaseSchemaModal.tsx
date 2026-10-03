import React, { useState } from 'react';
import { X, Copy, Check, Database, ExternalLink, ShieldCheck } from 'lucide-react';
import { POSTGRESQL_MIGRATION_SQL } from '../../lib/databaseSchema';

interface DatabaseSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseSchemaModal: React.FC<DatabaseSchemaModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(POSTGRESQL_MIGRATION_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-950 text-blue-400 rounded-xl border border-blue-800">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Supabase / PostgreSQL Database Migration Scripts</span>
                <span className="text-[10px] bg-blue-900/60 text-blue-300 border border-blue-700 px-2 py-0.5 rounded font-mono">
                  PostgreSQL 15+
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Production-grade relational schema for users, courses, DRM lessons, enrollments, and quiz engines.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Includes Row Level Security (RLS) & Performance Indexes</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shadow-md shadow-blue-950"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy SQL Migration</span>
              </>
            )}
          </button>
        </div>

        {/* SQL Code Body */}
        <div className="p-5 overflow-y-auto bg-slate-950/95 font-mono text-xs text-slate-300 leading-relaxed select-all">
          <pre className="whitespace-pre-wrap">{POSTGRESQL_MIGRATION_SQL}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <span>Ready to execute in Supabase SQL Query Editor or psql CLI</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-1.5 rounded-xl transition"
          >
            बन्द गर्नुहोस् (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
