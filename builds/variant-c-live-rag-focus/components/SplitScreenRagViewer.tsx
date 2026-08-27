import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  RefreshCw,
  ChevronDown
} from 'lucide-react';
import { SAMPLE_RAG_DOCUMENT, DocumentChunk } from '../data/ragData';

export const SplitScreenRagViewer: React.FC = () => {
  const [selectedChunkId, setSelectedChunkId] = useState<string>(SAMPLE_RAG_DOCUMENT.chunks[0].id);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedMcq, setGeneratedMcq] = useState<any | null>(null);

  const selectedChunk = SAMPLE_RAG_DOCUMENT.chunks.find((c) => c.id === selectedChunkId) || SAMPLE_RAG_DOCUMENT.chunks[0];

  const handleGenerateFromChunk = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedMcq({
        question: `According to ${selectedChunk.sectionTitle}, what is specified regarding the survey framework?`,
        options: [
          `A) ${selectedChunk.content.slice(0, 70)}...`,
          'B) Only urban centers are covered under 100% census',
          'C) Data collection is performed on an annual basis only',
          'D) No hamlet-group formation is permitted for population under 5000'
        ],
        correctAnswer: 'A',
        explanation: `Grounded in ${selectedChunk.sectionTitle}: "${selectedChunk.content.slice(0, 100)}..."`,
        matchLabel: 'Best Match'
      });
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 font-sans">
      {/* Header Banner */}
      <div className="bg-[#0b1329] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-slate-800 text-emerald-400 border border-slate-700 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Variant C: Live RAG Split-Screen Workspace
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Manual-to-Assessment RAG Workspace
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Inspect source MoSPI document sections on the left while generating real-time grounded MCQs on the right.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-3.5 py-2 rounded-xl text-xs text-slate-200 font-semibold">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Matched from official manual</span>
        </div>
      </div>

      {/* Split-Screen Dual-Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Pane (Span 6): Source Manual Document & Section Reader */}
        <section className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0f2942]" />
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">{SAMPLE_RAG_DOCUMENT.code}</h3>
                <p className="text-[11px] text-slate-500 font-medium">Source Document Reader</p>
              </div>
            </div>

            <span className="text-[11px] text-[#006c4a] bg-emerald-50 px-2.5 py-1 rounded-md font-bold border border-emerald-200">
              {SAMPLE_RAG_DOCUMENT.chunks.length} Relevant Sections
            </span>
          </div>

          {/* Section Selector List */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Select Manual Section:</label>
            <div className="space-y-2">
              {SAMPLE_RAG_DOCUMENT.chunks.map((chunk, idx) => {
                const matchTag = idx === 0 ? 'Best Match' : 'Also Relevant';
                const tagColor = idx === 0 
                  ? 'bg-emerald-100 text-[#006c4a] border-emerald-200' 
                  : 'bg-slate-100 text-slate-700 border-slate-200';

                return (
                  <div
                    key={chunk.id}
                    onClick={() => {
                      setSelectedChunkId(chunk.id);
                      setGeneratedMcq(null);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedChunkId === chunk.id
                        ? 'bg-emerald-50/70 border-emerald-500 shadow-xs ring-1 ring-emerald-500/30'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-900">{chunk.sectionTitle}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${tagColor}`}>
                        {matchTag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{chunk.content}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Section Highlight Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-emerald-400 font-bold">{selectedChunk.chapter}</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              "{selectedChunk.content}"
            </p>

            {/* Collapsed Technical Details Disclosure */}
            <details className="text-[11px] text-slate-400 pt-1 cursor-pointer group">
              <summary className="hover:text-slate-200 transition-colors flex items-center gap-1 font-mono text-[10px]">
                <ChevronDown className="w-3 h-3 text-slate-500 group-open:rotate-180 transition-transform" />
                <span>Technical Retrieval Metrics</span>
              </summary>
              <div className="mt-2 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 font-mono text-[10px] space-y-1 text-slate-400">
                <p>Tokens: {selectedChunk.tokens} | Cosine Similarity: {selectedChunk.cosineSimilarity}</p>
                <p>Vector Index: NSS-RAG-2026-V1</p>
              </div>
            </details>
          </div>
        </section>

        {/* Right Pane (Span 6): Real-Time Live AI MCQ Generator */}
        <section className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Live AI MCQ Engine</h3>
                <p className="text-[11px] text-slate-500">Real-time question generation from section</p>
              </div>
            </div>

            <button
              onClick={handleGenerateFromChunk}
              disabled={isGenerating}
              className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 border border-slate-800 disabled:opacity-75"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Synthesizing...' : 'Generate Live MCQ'}</span>
            </button>
          </div>

          {/* Generated MCQ Display */}
          {generatedMcq ? (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900">Grounded Question Output</span>
                  <span className="text-[10px] font-bold bg-white text-[#006c4a] px-2 py-0.5 rounded border border-emerald-200">
                    {generatedMcq.matchLabel}
                  </span>
                </div>

                <p className="text-sm font-bold text-slate-900 leading-snug">{generatedMcq.question}</p>

                <div className="space-y-2 pt-2">
                  {generatedMcq.options.map((opt: string, oIdx: number) => (
                    <div
                      key={oIdx}
                      className={`p-3 rounded-xl border text-xs font-semibold ${
                        oIdx === 0
                          ? 'bg-emerald-100/90 border-emerald-400 text-[#006c4a]'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              {/* Source Citation Box */}
              <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 space-y-1.5 text-xs font-mono">
                <span className="text-emerald-400 font-bold block uppercase tracking-wider text-[10px]">Grounding Citation</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">{generatedMcq.explanation}</p>
              </div>
            </div>
          ) : (
            <div className="p-10 text-center space-y-3 border-2 border-dashed border-slate-200 rounded-2xl">
              <Sparkles className="w-8 h-8 text-emerald-600 mx-auto opacity-60" />
              <h4 className="text-sm font-bold text-slate-800">Ready for Live Synthesis</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click "Generate Live MCQ" to extract a verified multiple-choice question directly from the selected manual section.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
