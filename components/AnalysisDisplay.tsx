
import React from 'react';
import { ClarityAnalysis } from '../types';
import ScoreGauge from './ScoreGauge';

interface AnalysisDisplayProps {
  analysis: ClarityAnalysis;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 glass p-8 rounded-2xl flex flex-col items-center justify-center text-center">
          <ScoreGauge score={analysis.score} />
          <p className="mt-4 text-sm text-slate-400 italic">
            "{analysis.scoreReasoning}"
          </p>
        </div>

        <div className="md:col-span-2 glass p-8 rounded-2xl">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <i className="fa-solid fa-puzzle-piece text-purple-400"></i>
            Missing Concepts
          </h3>
          <div className="space-y-4">
            {analysis.missingConcepts.map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-200">{item.name}</h4>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 uppercase font-mono">Prerequisite</span>
                </div>
                <p className="text-sm text-slate-300 mb-2">{item.reason}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                  <i className="fa-solid fa-link text-blue-500"></i>
                  <span>Dependency: {item.dependencyChain}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logical Gaps & Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-8 rounded-2xl border-l-4 border-red-500/50">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation text-red-400"></i>
            Logical Gaps
          </h3>
          <ul className="space-y-4">
            {analysis.logicalGaps.map((gap, idx) => (
              <li key={idx} className="text-sm text-slate-300 bg-red-900/10 border border-red-900/20 p-4 rounded-xl">
                <p className="font-bold text-red-200 mb-1">Break: {gap.gap}</p>
                <p className="text-slate-400 italic">Evidence: {gap.evidence}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass p-8 rounded-2xl border-l-4 border-emerald-500/50">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <i className="fa-solid fa-brain text-emerald-400"></i>
            Meta-Cognitive Advice
          </h3>
          <ul className="space-y-4">
            {analysis.improvementTips.map((tip, idx) => (
              <li key={idx} className="text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-200">{tip.tip}</p>
                    <p className="text-slate-400 mt-1">Mental Pattern: {tip.thinkingPattern}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reconstructed Explanation */}
      <div className="glass p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <i className="fa-solid fa-hammer text-8xl"></i>
        </div>
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-hammer text-pink-400"></i>
          Clarity Reconstruction
        </h3>
        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed bg-black/30 p-6 rounded-xl border border-white/5 font-light">
          {analysis.reconstructedExplanation.split('\n').map((line, i) => (
            <p key={i} className="mb-4">{line}</p>
          ))}
        </div>
      </div>

      {/* Before vs After */}
      <div className="glass p-8 rounded-2xl">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-code-compare text-blue-400"></i>
          Structural Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="pb-4 px-4 text-xs font-bold text-slate-500 uppercase">Aspect</th>
                <th className="pb-4 px-4 text-xs font-bold text-red-400 uppercase">Input Noise</th>
                <th className="pb-4 px-4 text-xs font-bold text-emerald-400 uppercase">Clarity Forge Output</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {analysis.comparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 text-sm font-semibold text-slate-300">{row.aspect}</td>
                  <td className="py-4 px-4 text-sm text-slate-400 italic line-through decoration-red-900/50">{row.before}</td>
                  <td className="py-4 px-4 text-sm text-slate-200 font-medium">{row.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDisplay;
