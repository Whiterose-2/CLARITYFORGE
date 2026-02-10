
import React, { useState, useCallback } from 'react';
import { analyzeExplanation } from './geminiService';
import { ClarityAnalysis, AppStatus } from './types';
import AnalysisDisplay from './components/AnalysisDisplay';

const App: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [explanation, setExplanation] = useState('');
  const [status, setStatus] = useState<AppStatus>('idle');
  const [result, setResult] = useState<ClarityAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!explanation.trim()) {
      setError("Please provide an explanation to analyze.");
      return;
    }

    setStatus('loading');
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeExplanation(topic || 'General Knowledge', explanation);
      setResult(analysis);
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during cognitive processing.");
      setStatus('error');
    }
  }, [topic, explanation]);

  const reset = () => {
    setStatus('idle');
    setResult(null);
    setError(null);
    setTopic('');
    setExplanation('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5 h-16 flex items-center px-6 md:px-12 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg forge-gradient flex items-center justify-center shadow-lg shadow-purple-500/20">
            <i className="fa-solid fa-fire text-white text-sm"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white uppercase font-mono">ClarityForge</h1>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400 font-medium">
          <span className="hover:text-white transition-colors cursor-pointer">Documentation</span>
          <span className="hover:text-white transition-colors cursor-pointer">Methodology</span>
          <button 
            onClick={reset}
            className="px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
          >
            Clear Session
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        {status === 'idle' && (
          <div className="text-center mb-16 space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white">
              Expose the <span className="text-transparent bg-clip-text forge-gradient">Logic Gaps</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A Cognitive Understanding Analysis Engine. Input your explanation of a concept, and we'll audit your reasoning from the ground up.
            </p>
          </div>
        )}

        {/* Input Interface */}
        {(status === 'idle' || status === 'loading' || status === 'error') && !result && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-4 glass p-8 rounded-3xl shadow-2xl border border-white/5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Contextual Topic (Optional)</label>
                <input 
                  type="text"
                  placeholder="e.g. Quantum Entanglement, Supply & Demand, The First Crusade..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Your Explanation</label>
                <textarea 
                  rows={8}
                  placeholder="Describe your understanding of the concept as if you were explaining it to a peer..."
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/40 transition-all placeholder:text-slate-600 resize-none font-light leading-relaxed"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleAnalyze}
                  disabled={status === 'loading'}
                  className={`w-full py-4 rounded-xl forge-gradient font-bold text-white shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 ${status === 'loading' ? 'animate-pulse cursor-not-allowed opacity-50' : 'active:scale-[0.98]'}`}
                >
                  {status === 'loading' ? (
                    <>
                      <i className="fa-solid fa-gear animate-spin"></i>
                      Forging Clarity...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-wand-magic-sparkles"></i>
                      Initiate Cognitive Audit
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-900/20 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-300 text-sm">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {error}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="glass p-4 rounded-2xl text-center space-y-1">
                <i className="fa-solid fa-microscope text-blue-400 text-lg mb-1"></i>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Normalization</p>
                <p className="text-[9px] text-slate-600">Claims extraction</p>
              </div>
              <div className="glass p-4 rounded-2xl text-center space-y-1">
                <i className="fa-solid fa-stethoscope text-purple-400 text-lg mb-1"></i>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Diagnosis</p>
                <p className="text-[9px] text-slate-600">Break detection</p>
              </div>
              <div className="glass p-4 rounded-2xl text-center space-y-1">
                <i className="fa-solid fa-dna text-pink-400 text-lg mb-1"></i>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-tighter">Mapping</p>
                <p className="text-[9px] text-slate-600">Gap visualization</p>
              </div>
            </div>
          </div>
        )}

        {/* Results View */}
        {result && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-purple-400 font-mono text-sm border border-purple-400/30 px-2 py-1 rounded">AUDIT COMPLETED</span>
                  Analysis for: <span className="font-light italic text-slate-400">{topic || 'General Subject'}</span>
                </h2>
              </div>
              <button 
                onClick={reset}
                className="text-sm font-medium text-slate-400 hover:text-white flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5"
              >
                <i className="fa-solid fa-rotate-left"></i>
                Analyze Another Concept
              </button>
            </div>
            <AnalysisDisplay analysis={result} />
          </div>
        )}

      </main>

      {/* Footer Info */}
      <footer className="py-12 px-6 border-t border-white/5 mt-20 text-center">
        <p className="text-slate-600 text-xs font-mono uppercase tracking-[0.2em]">
          Engineered by ClarityForge Systems // v1.0.4-beta
        </p>
      </footer>
    </div>
  );
};

export default App;
