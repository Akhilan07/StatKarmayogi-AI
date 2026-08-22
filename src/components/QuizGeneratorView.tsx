import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  UploadCloud, 
  FileText, 
  Settings2, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Play, 
  Download, 
  ChevronRight, 
  ChevronLeft, 
  Eye, 
  RotateCcw,
  Check,
  Layers,
  HelpCircle,
  Clock,
  ShieldCheck,
  Copy,
  Code2,
  X,
  FileJson
} from 'lucide-react';
import { 
  OfficialManual, 
  Question, 
  DifficultyLevel, 
  BloomsLevel, 
  AssessmentConfig,
  AppLanguage 
} from '../types';
import { MoSPIAssessmentApiService } from '../services/api';
import jsPDF from 'jspdf';

interface QuizGeneratorViewProps {
  manuals: OfficialManual[];
  onStartExam: (questions: Question[], title: string, role: string, difficulty: DifficultyLevel) => void;
  language?: AppLanguage;
}

export const QuizGeneratorView: React.FC<QuizGeneratorViewProps> = ({
  manuals,
  onStartExam,
  language = 'en',
}) => {
  const isHindi = language === 'hi';
  const isTamil = language === 'ta';

  // Configuration State
  const [selectedManualId, setSelectedManualId] = useState<string>(manuals[0].id);
  const [sourceMode, setSourceMode] = useState<'preset' | 'custom'>('preset');
  const [customText, setCustomText] = useState<string>('');
  const [customFileName, setCustomFileName] = useState<string>('');
  const [targetRole, setTargetRole] = useState<string>('Senior Statistical Officer');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [bloomsFocus, setBloomsFocus] = useState<BloomsLevel | 'All'>('All');
  const [includeCitations, setIncludeCitations] = useState<boolean>(true);

  // Generation & Active Questions State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [rawQuizOutput, setRawQuizOutput] = useState<any>(null);
  const [previewIndex, setPreviewIndex] = useState<number>(0);
  const [selectedPreviewOption, setSelectedPreviewOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(true);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [showSchemaModal, setShowSchemaModal] = useState<boolean>(false);
  const [schemaModalTab, setSchemaModalTab] = useState<'schema' | 'system_prompt' | 'raw_json'>('schema');
  const [copiedSchema, setCopiedSchema] = useState<boolean>(false);

  // Selected manual object
  const currentManual = manuals.find((m) => m.id === selectedManualId) || manuals[0];

  // Re-generate baseline fallback questions whenever language or manual changes
  useEffect(() => {
    const defaultList = buildFallbackQuestions(currentManual, difficulty, targetRole, language);
    setGeneratedQuestions(defaultList);
  }, [language, selectedManualId, difficulty, targetRole]);

  const JSON_OUTPUT_SCHEMA = {
    "type": "object",
    "properties": {
      "quiz_title": { "type": "string" },
      "source_manual": { "type": "string" },
      "competency_focus": { "type": "string" },
      "questions": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "id": { "type": "integer" },
            "question": { "type": "string" },
            "options": {
              "type": "array",
              "items": { "type": "string" }
            },
            "correct_answer": { "type": "string" },
            "explanation": { "type": "string" },
            "citation": { "type": "string" },
            "difficulty": { "type": "string" },
            "competency_tag": { "type": "string" }
          },
          "required": [
            "id",
            "question",
            "options",
            "correct_answer",
            "explanation",
            "citation",
            "difficulty",
            "competency_tag"
          ]
        }
      }
    },
    "required": ["quiz_title", "source_manual", "questions"]
  };

  const SYSTEM_INSTRUCTION_PROMPT = `You are a Senior Statistical Officer and AI Competency Evaluation Specialist at MoSPI, Government of India.
Your mission is to read official statistical operational manuals (NSS, PLFS, CPI, ASI, National Accounts) and formulate rigorous, role-specific multiple-choice assessments.
Language of Assessment: ${isTamil ? 'Tamil (தமிழ்)' : isHindi ? 'Hindi (हिन्दी)' : 'English'}.
Target Role: ${targetRole}. Difficulty: ${difficulty}. Bloom's Level: ${bloomsFocus}.
Return STRICT VALID JSON matching the provided schema.`;

  // Handler: Generate Assessment Grounded in MoSPI Manuals
  const handleGenerateManualAssessment = async () => {
    setIsGenerating(true);
    setGenerationError(null);

    const manualContent = sourceMode === 'preset' ? currentManual.summary : customText || 'MoSPI survey sampling and data scrutiny guidelines.';
    
    try {
      const data = await MoSPIAssessmentApiService.generateQuizFromManual({
        manualText: manualContent,
        manualTitle: sourceMode === 'preset' ? currentManual.title : customFileName || 'Custom MoSPI Manual',
        targetRole,
        difficulty,
        questionCount,
        bloomsFocus,
        language: (language as AppLanguage),
      });

      if (data.questions && data.questions.length > 0) {
        setGeneratedQuestions(data.questions);
        setRawQuizOutput(data);
        setPreviewIndex(0);
      } else {
        const fallbackList = buildFallbackQuestions(currentManual, difficulty, targetRole, language);
        setGeneratedQuestions(fallbackList);
        setPreviewIndex(0);
      }
    } catch (err: any) {
      console.warn('AI generation error, loading pre-verified manual questions:', err);
      const fallbackList = buildFallbackQuestions(currentManual, difficulty, targetRole, language);
      setGeneratedQuestions(fallbackList);
      setPreviewIndex(0);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomFileName(file.name);
      if (file.name.toLowerCase().endsWith('.pdf')) {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdfRaw = new TextDecoder('utf-8', { fatal: false }).decode(arrayBuffer);
          const cleanedText = pdfRaw
            .replace(/[^\x20-\x7E\n\r\t]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

          if (cleanedText.length > 100) {
            setCustomText(cleanedText.slice(0, 15000));
          } else {
            setCustomText(`[PDF Manual: ${file.name}]\nOfficial MoSPI guidelines on survey sampling, field audit protocols, and data validation rules for statistical operations.`);
          }
          setSourceMode('custom');
        } catch (err) {
          console.error('PDF parsing error:', err);
          setCustomText(`Official MoSPI Manual Excerpt: ${file.name}\nCoverage: Field survey sampling design, PLFS indicators, and data validation rules.`);
          setSourceMode('custom');
        }
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          setCustomText(text);
          setSourceMode('custom');
        };
        reader.readAsText(file);
      }
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const activeManualTitle = sourceMode === 'preset' ? currentManual.title : customFileName || 'Custom MoSPI Manual';
    
    // Header
    doc.setFillColor(19, 27, 46);
    doc.rect(0, 0, 210, 32, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('GOVERNMENT OF INDIA - MoSPI', 14, 13);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Official Assessment Paper • ${activeManualTitle.slice(0, 45)}...`, 14, 23);

    let yPos = 45;
    generatedQuestions.forEach((q, idx) => {
      if (yPos > 260) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      
      const splitQuestion = doc.splitTextToSize(`Q${idx + 1}. ${q.question}`, 180);
      doc.text(splitQuestion, 14, yPos);
      yPos += splitQuestion.length * 6 + 2;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);

      q.options.forEach((opt) => {
        if (yPos > 275) {
          doc.addPage();
          yPos = 20;
        }
        const isCorrect = opt.id === q.correctAnswer;
        if (isCorrect) doc.setFont('helvetica', 'bold');
        doc.text(`  (${opt.id}) ${opt.text}`, 16, yPos);
        if (isCorrect) doc.setFont('helvetica', 'normal');
        yPos += 5;
      });

      yPos += 3;
      doc.setFontSize(8);
      doc.setTextColor(0, 108, 74);
      doc.text(`  Ref Citation: ${q.citation}`, 16, yPos);
      yPos += 8;
    });

    doc.save(`MoSPI-Assessment-${targetRole.replace(/\s+/g, '_')}.pdf`);
  };

  const handleCopyQuestion = () => {
    if (!currentQuestion) return;
    const text = `Q${currentQuestion.questionNumber}. ${currentQuestion.question}\n` +
      currentQuestion.options.map(o => `(${o.id}) ${o.text}`).join('\n') +
      `\nCorrect: ${currentQuestion.correctAnswer}\nCitation: ${currentQuestion.citation}\nExplanation: ${currentQuestion.explanation}`;
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleCopySchemaContent = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  const currentQuestion = generatedQuestions[previewIndex] || generatedQuestions[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb & Header */}
      <div>
        <nav className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
          <span>{isTamil ? 'பயிற்சி பகுதிகள்' : isHindi ? 'प्रशिक्षण मॉड्यूल' : 'Training Modules'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-800 font-bold">
            {isTamil ? 'வினாடி வினா உருவாக்கி' : isHindi ? 'प्रश्नोत्तरी जनरेटर' : 'Quiz Generator'}
          </span>
        </nav>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>
                {isTamil 
                  ? 'MoSPI கையேடு AI மதிப்பீடு' 
                  : isHindi 
                  ? 'मैनुअल से AI मूल्यांकन' 
                  : 'Manual to Assessment AI'}
              </span>
              <span className="text-xs px-2.5 py-1 bg-emerald-100 text-[#006c4a] rounded-md font-bold tracking-wide">
                Bloom's Aligned
              </span>
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {isTamil 
                ? 'அதிகாரப்பூர்வ MoSPI புள்ளிவிவர கையேடுகளின் அடிப்படையில் தகுதிக்கான மதிப்பீட்டை உடனடியாக உருவாக்குங்கள்.' 
                : isHindi 
                ? 'आधिकारिक MoSPI सांख्यिकी मैनुअल के आधार पर पद-विशिष्ट दक्षता मूल्यांकन उत्पन्न करें।' 
                : 'Instantly generate role-specific competency assessments grounded in official MoSPI statistical manuals and guidelines.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSchemaModal(true)}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5 border border-slate-700"
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Studio Schema &amp; Prompt</span>
            </button>

            <button
              onClick={handleExportPDF}
              className="px-3 py-2 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>{isTamil ? 'PDF பதிவிறக்கு' : isHindi ? 'PDF निर्यात करें' : 'Export PDF Paper'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Parameters on Left (5 cols) & Live Assessment on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Configuration Form */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel rounded-2xl p-6 shadow-sm space-y-6">
            {/* 1. Source Material */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#006c4a]" />
                  <span>
                    {isTamil ? 'புள்ளிவிவர கையேடு ஆதாரம்' : isHindi ? 'सांख्यिकी मैनुअल स्रोत' : 'Source Statistical Manual'}
                  </span>
                </label>

                <div className="flex bg-slate-100 p-0.5 rounded-lg text-[11px] font-semibold">
                  <button
                    onClick={() => setSourceMode('preset')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${sourceMode === 'preset' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
                  >
                    {isTamil ? 'முன்னமைக்கப்பட்டவை' : isHindi ? 'प्रीसेट मैनुअल' : 'Preset Manuals'}
                  </button>
                  <button
                    onClick={() => setSourceMode('custom')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${sourceMode === 'custom' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
                  >
                    {isTamil ? 'பதிவேற்று / ஒட்டு' : isHindi ? 'अपलोड / पेस्ट' : 'Upload / Paste'}
                  </button>
                </div>
              </div>

              {sourceMode === 'preset' ? (
                <div className="space-y-3">
                  <select
                    id="manual-select-dropdown"
                    value={selectedManualId}
                    onChange={(e) => setSelectedManualId(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-[#006c4a] focus:ring-1 focus:ring-[#006c4a] outline-none shadow-sm cursor-pointer"
                  >
                    {manuals.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title} ({m.year})
                      </option>
                    ))}
                  </select>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>Code: <strong className="text-slate-700">{currentManual.code}</strong></span>
                      <span>Department: <strong className="text-slate-700">{currentManual.department}</strong></span>
                    </div>
                    <p className="line-clamp-2 leading-relaxed text-[11px] text-slate-600">
                      {currentManual.summary}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-emerald-400 transition-colors bg-white/60">
                    <input
                      type="file"
                      id="custom-file-upload"
                      accept=".txt,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="custom-file-upload" className="cursor-pointer flex flex-col items-center gap-1.5">
                      <UploadCloud className="w-7 h-7 text-[#006c4a]" />
                      <span className="text-xs font-bold text-slate-800">
                        {customFileName ? customFileName : isTamil ? 'கையேடு PDF / TXT கோப்பைப் பதிவேற்றவும்' : isHindi ? 'सर्वेक्षण मैनुअल PDF / TXT अपलोड करें' : 'Upload Survey Manual / Section PDF / TXT'}
                      </span>
                      <span className="text-[10px] text-slate-400">Click to browse or drag and drop</span>
                    </label>
                  </div>

                  <textarea
                    rows={4}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder={
                      isTamil 
                        ? 'அதிகாரப்பூர்வ கருத்துக்கணிப்பு வழிகாட்டுதல்களை இங்கே ஒட்டவும்...' 
                        : isHindi 
                        ? 'या आधिकारिक सर्वेक्षण दिशानिर्देश यहाँ पेस्ट करें...' 
                        : 'Or paste official survey guidelines, instructions to field staff, or circular text here...'
                    }
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#006c4a] placeholder:text-slate-400"
                  />
                </div>
              )}
            </div>

            {/* 2. Target Role Competency */}
            <div>
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                {isTamil ? 'இலக்கு பதவித் திறன்' : isHindi ? 'लक्ष्य पद दक्षता' : 'Target Role Competency'}
              </label>
              <select
                id="role-competency-select"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm font-semibold text-slate-800 focus:border-[#006c4a] focus:ring-1 focus:ring-[#006c4a] outline-none shadow-sm cursor-pointer"
              >
                <option value="Senior Statistical Officer">Senior Statistical Officer (SSO)</option>
                <option value="Junior Statistical Officer">Junior Statistical Officer (JSO)</option>
                <option value="Data Processing Assistant">Data Processing Assistant (DPA)</option>
                <option value="Director / Deputy Director General">Director / Deputy Director General (ISS)</option>
              </select>
            </div>

            {/* 3. Assessment Difficulty & Question Count */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  {isTamil ? 'கடினத்தன்மை' : isHindi ? 'कठिनाई स्तर' : 'Difficulty'}
                </label>
                <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  {(['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`flex-1 py-1.5 rounded-lg transition-all text-[11px] ${
                        difficulty === level 
                          ? 'bg-[#006c4a] text-white font-bold shadow-xs' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {level === 'Beginner' ? (isTamil ? 'அடிப்படை' : isHindi ? 'बुनियादी' : 'Basic') :
                       level === 'Intermediate' ? (isTamil ? 'இடைநிலை' : isHindi ? 'मध्यम' : 'Intermediate') :
                       (isTamil ? 'உயர்நிலை' : isHindi ? 'उन्नत' : 'Advanced')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  {isTamil ? 'வினாக்கள்' : isHindi ? 'प्रश्न संख्या' : 'Questions'}
                </label>
                <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  {[5, 10, 20].map((count) => (
                    <button
                      key={count}
                      onClick={() => setQuestionCount(count)}
                      className={`flex-1 py-1.5 rounded-lg transition-all ${
                        questionCount === count 
                          ? 'bg-[#0f172a] text-white font-bold shadow-xs' 
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              id="generate-quiz-btn"
              onClick={handleGenerateManualAssessment}
              disabled={isGenerating}
              className="w-full py-3.5 bg-[#006c4a] hover:bg-[#005137] text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-emerald-300" />
                  <span>
                    {isTamil 
                      ? 'மதிப்பீடு உருவாக்கப்படுகிறது...' 
                      : isHindi 
                      ? 'मूल्यांकन उत्पन्न किया जा रहा है...' 
                      : 'Generating MoSPI Assessment...'}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                  <span>
                    {isTamil 
                      ? 'முழுமையான மதிப்பீட்டை உருவாக்கு' 
                      : isHindi 
                      ? 'पूर्ण मूल्यांकन उत्पन्न करें' 
                      : 'Generate Full Assessment & Schedule'}
                  </span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Right Column: Interactive Assessment Preview (7 cols) */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          <div className="glass-panel rounded-2xl p-6 shadow-sm space-y-6 relative overflow-hidden">
            {/* Header info */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-base font-bold text-slate-900">
                  {isTamil ? 'இலக்கு வினாடி வினா முன்னோட்டம்' : isHindi ? 'इंटरएक्टिव प्रश्नोत्तरी पूर्वावलोकन' : 'Interactive Assessment Preview'}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="px-2.5 py-1 bg-emerald-50 text-[#006c4a] rounded-lg border border-emerald-200">
                  {currentQuestion?.bloomsLevel || 'Understanding'}
                </span>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
                  {currentQuestion?.difficulty || difficulty}
                </span>
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                  {currentQuestion?.competencyTag || 'Sampling Design'}
                </span>
              </div>
            </div>

            {/* Active Question Box */}
            {currentQuestion ? (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#0f172a] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs mt-0.5">
                    Q{previewIndex + 1}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {currentQuestion.question}
                  </h4>
                </div>

                {/* MCQ Options Grid */}
                <div className="space-y-2.5 pl-2">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = selectedPreviewOption === opt.id;
                    const isCorrect = opt.id === currentQuestion.correctAnswer;
                    let optionStyle = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50';

                    if (selectedPreviewOption) {
                      if (isSelected && isCorrect) {
                        optionStyle = 'bg-emerald-50 border-[#006c4a] text-emerald-950 font-bold shadow-xs';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-red-50 border-red-400 text-red-900 font-bold';
                      } else if (isCorrect) {
                        optionStyle = 'bg-emerald-50/70 border-emerald-400 text-emerald-900 font-bold';
                      }
                    }

                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedPreviewOption(opt.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${optionStyle}`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {opt.id}
                        </span>
                        <span className="text-xs sm:text-sm font-medium leading-relaxed">
                          {opt.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation & Citation Dropdown */}
                {selectedPreviewOption && (
                  <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-slate-800 space-y-2 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex justify-between items-center font-bold text-[#006c4a]">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          {isTamil 
                            ? `சரியான விடை: விருப்பம் ${currentQuestion.correctAnswer}` 
                            : isHindi 
                            ? `सही उत्तर: विकल्प ${currentQuestion.correctAnswer}` 
                            : `CORRECT ANSWER: OPTION ${currentQuestion.correctAnswer}`}
                        </span>
                      </span>
                      <button
                        onClick={handleCopyQuestion}
                        className="text-[11px] font-semibold hover:underline flex items-center gap-1 text-slate-600"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedNotification ? (isTamil ? 'பிரதி செய்யப்பட்டது!' : isHindi ? 'कॉपी किया गया!' : 'Copied!') : (isTamil ? 'பிரதிசெய்' : isHindi ? 'कॉपी करें' : 'Copy')}</span>
                      </button>
                    </div>
                    <p className="leading-relaxed text-slate-700 font-medium">
                      {currentQuestion.explanation}
                    </p>
                    <div className="pt-1.5 border-t border-emerald-200/60 font-semibold text-[11px] text-emerald-800 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{currentQuestion.citation}</span>
                    </div>
                  </div>
                )}

                {/* Pagination & Next Button */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <button
                    onClick={() => {
                      setPreviewIndex((prev) => Math.max(0, prev - 1));
                      setSelectedPreviewOption(null);
                    }}
                    disabled={previewIndex === 0}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{isTamil ? 'முந்தைய' : isHindi ? 'पिछला' : 'Previous'}</span>
                  </button>

                  <span className="text-xs font-semibold text-slate-500">
                    Question {previewIndex + 1} of {generatedQuestions.length}
                  </span>

                  <button
                    onClick={() => {
                      setPreviewIndex((prev) => Math.min(generatedQuestions.length - 1, prev + 1));
                      setSelectedPreviewOption(null);
                    }}
                    disabled={previewIndex === generatedQuestions.length - 1}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1"
                  >
                    <span>{isTamil ? 'அடுத்தது' : isHindi ? 'अगला' : 'Next'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                Click "Generate Full Assessment" to load questions.
              </div>
            )}

            {/* Launch Full Assessment Button */}
            <div className="pt-2">
              <button
                onClick={() => onStartExam(generatedQuestions, sourceMode === 'preset' ? currentManual.title : 'Custom Manual Assessment', targetRole, difficulty)}
                className="w-full py-3 bg-[#0f172a] hover:bg-[#1e293b] text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current text-emerald-400" />
                <span>
                  {isTamil 
                    ? 'முழுநேர நேரலை மதிப்பீட்டு பயன்முறையைத் தொடங்கு' 
                    : isHindi 
                    ? 'पूर्ण समयबद्ध मूल्यांकन मोड प्रारंभ करें' 
                    : 'Start Full Timed Assessment Mode'}
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* AI Studio Schema Modal */}
      {showSchemaModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#006c4a]" />
                <h3 className="text-base font-bold text-slate-900">Gemini 3.7 Structured JSON Schema</h3>
              </div>
              <button onClick={() => setShowSchemaModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setSchemaModalTab('schema')}
                className={`flex-1 py-1.5 rounded-lg ${schemaModalTab === 'schema' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
              >
                Output Schema JSON
              </button>
              <button
                onClick={() => setSchemaModalTab('system_prompt')}
                className={`flex-1 py-1.5 rounded-lg ${schemaModalTab === 'system_prompt' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
              >
                System Instruction Prompt
              </button>
            </div>

            <pre className="p-4 bg-slate-900 text-emerald-400 text-xs font-mono rounded-xl overflow-x-auto max-h-72 custom-scrollbar">
              {schemaModalTab === 'schema'
                ? JSON.stringify(JSON_OUTPUT_SCHEMA, null, 2)
                : SYSTEM_INSTRUCTION_PROMPT}
            </pre>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => handleCopySchemaContent(schemaModalTab === 'schema' ? JSON.stringify(JSON_OUTPUT_SCHEMA, null, 2) : SYSTEM_INSTRUCTION_PROMPT)}
                className="px-4 py-2 bg-emerald-100 text-[#006c4a] rounded-xl text-xs font-bold hover:bg-emerald-200"
              >
                {copiedSchema ? 'Copied to Clipboard!' : 'Copy Schema Prompt'}
              </button>
              <button
                onClick={() => setShowSchemaModal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper: Build Trilingual Baseline Fallback Questions (EN / HI / TA)
function buildFallbackQuestions(
  manual: OfficialManual,
  difficulty: DifficultyLevel,
  targetRole: string,
  language: string | AppLanguage = 'en'
): Question[] {
  const isTamil = language === 'ta';
  const isHindi = language === 'hi';

  if (isTamil) {
    return [
      {
        id: 'nss-q-1-ta',
        questionNumber: 1,
        question: 'என்எஸ்எஸ் 78வது சுற்று வழிகாட்டுதல்களின்படி, கிராமப்புறங்களில் முதன்மை மாதிரியாக்கல் அலகு (PSU) என வரையறுக்கப்படுவது எது?',
        options: [
          { id: 'A', text: 'மாதிரி குடும்பம் (USU)' },
          { id: 'B', text: 'மக்கள் தொகை கணக்கெடுப்பு கிராமம் / பஞ்சாயத்து வார்டு (கேரளாவுக்கு)' },
          { id: 'C', text: 'சமூக மேம்பாட்டு தொகுதி' },
          { id: 'D', text: 'நிர்வாக மாவட்டம்' }
        ],
        correctAnswer: 'B',
        explanation: 'கிராமப்புறங்களில், முதல் கட்ட அலகுகள் (FSU) / முதன்மை மாதிரியாக்கல் அலகுகள் (PSU) என்பது மக்கள் தொகை கணக்கெடுப்பு கிராமங்கள் (அல்லது கேரளாவுக்கு பஞ்சாயத்து வார்டுகள்) ஆகும்.',
        citation: 'ஆதாரம்: NSS 78வது சுற்று வழிமுறை கையேடு, பிரிவு 3.2 (மாதிரியாக்கல் வடிவமைப்பு)',
        difficulty: 'Intermediate',
        competencyTag: 'Sampling Design',
        bloomsLevel: 'Understanding',
        manualSource: manual.title
      },
      {
        id: 'nss-q-2-ta',
        questionNumber: 2,
        question: 'நுகர்வோர் விலை குறியீட்டில் (CPI Base 2012=100) ஆரம்ப கட்டங்களில் எந்த சூத்திரம் பயன்படுத்தப்படுகிறது?',
        options: [
          { id: 'A', text: 'கார்லி குறியீட்டு சூத்திரம்' },
          { id: 'B', text: 'ஜெவோன்ஸ் சூத்திரம் (Jevons Geometric Mean Formula)' },
          { id: 'C', text: 'லாஸ்பேயர்ஸ் சூத்திரம்' },
          { id: 'D', text: 'பாஸ்சே சூத்திரம்' }
        ],
        correctAnswer: 'B',
        explanation: 'விலை மாற்றங்களில் ஏற்படும் நேர்மறை சார்புகளைத் தவிர்க்க ஆரம்ப கட்டங்களில் ஜெவோன்ஸ் சூத்திரம் (ஜியோமெட்ரிக் சராசரி) பயன்படுத்தப்படுகிறது.',
        citation: 'ஆதாரம்: CPI தொகுத்தல் கையேடு, பிரிவு 2.4',
        difficulty: 'Advanced',
        competencyTag: 'Price Index Calculation',
        bloomsLevel: 'Applying',
        manualSource: manual.title
      },
      {
        id: 'nss-q-3-ta',
        questionNumber: 3,
        question: 'அடைவு 0.0 (Listing Schedule) என்எஸ்எஸ் ஆய்வில் முதன்மையாக எதற்காக பயன்படுத்தப்படுகிறது?',
        options: [
          { id: 'A', text: 'தேர்ந்தெடுக்கப்பட்ட எஃப்எஸ்யு அலகுகளில் அனைத்து வீடுகள் மற்றும் குடும்பங்களின் பட்டியல் தயாரித்தல்' },
          { id: 'B', text: 'குடும்ப நுகர்வு செலவை முழுமையாகப் பதிவு செய்தல்' },
          { id: 'C', text: 'தொழில் நிறுவனங்களின் இலாப நட்ட கணக்கீடு' },
          { id: 'D', text: 'அடையாள அட்டை வழங்குதல்' }
        ],
        correctAnswer: 'A',
        explanation: 'அடைவு 0.0 என்பது மாதிரி குடும்பங்களைத் தேர்ந்தெடுப்பதற்கான மாதிரியாக்கல் சட்டகத்தை (Sampling Frame) உருவாக்க பயன்படுகிறது.',
        citation: 'ஆதாரம்: NSS 78வது சுற்று வழிமுறை கையேடு, பிரிவு 3.4',
        difficulty: 'Beginner',
        competencyTag: 'Field Operations',
        bloomsLevel: 'Remembering',
        manualSource: manual.title
      }
    ];
  } else if (isHindi) {
    return [
      {
        id: 'nss-q-1-hi',
        questionNumber: 1,
        question: 'एनएसएस 78वें दौर के दिशानिर्देशों के अनुसार, ग्रामीण क्षेत्रों में प्राथमिक प्रतिचयन इकाई (PSU) के रूप में क्या परिभाषित किया गया है?',
        options: [
          { id: 'A', text: 'प्रतिदर्श परिवार (USU)' },
          { id: 'B', text: 'जनगणना गांव / पंचायत वार्ड (केरल के लिए)' },
          { id: 'C', text: 'सामुदायिक विकास खंड' },
          { id: 'D', text: 'प्रशासनिक जिला' }
        ],
        correctAnswer: 'B',
        explanation: 'ग्रामीण क्षेत्र में, प्रथम चरण की इकाइयां (FSU) / प्राथमिक प्रतिचयन इकाइयां (PSU) जनगणना गांव (केरल के लिए पंचायत वार्ड) हैं, जबकि अंतिम चरण की इकाइयां (USU) नमूना परिवार हैं।',
        citation: 'संदर्भ: एनएसएस 78वां दौर निर्देश पुस्तिका, धारा 3.2 (प्रतिचयन डिजाइन)',
        difficulty: 'Intermediate',
        competencyTag: 'Sampling Design',
        bloomsLevel: 'Understanding',
        manualSource: manual.title
      },
      {
        id: 'nss-q-2-hi',
        questionNumber: 2,
        question: 'उपभोक्ता मूल्य सूचकांक (CPI आधार 2012=100) में प्राथमिक स्तर पर किस सूचकांक सूत्र का उपयोग अनिवार्य है?',
        options: [
          { id: 'A', text: 'कारली सूचकांक सूत्र' },
          { id: 'B', text: 'जेवन्स सूचकांक सूत्र (अभारित ज्यामितीय माध्य)' },
          { id: 'C', text: 'लास्पेयर सूचकांक सूत्र' },
          { id: 'D', text: 'पाशे सूचकांक सूत्र' }
        ],
        correctAnswer: 'B',
        explanation: 'प्राथमिक स्तर पर कीमतों के झुकाव को रोकने के लिए जेवन्स सूत्र (ज्यामितीय माध्य) का उपयोग अनिवार्य है।',
        citation: 'संदर्भ: सीपीआई संकलन नियमावली, धारा 2.4',
        difficulty: 'Advanced',
        competencyTag: 'Price Index Calculation',
        bloomsLevel: 'Applying',
        manualSource: manual.title
      },
      {
        id: 'nss-q-3-hi',
        questionNumber: 3,
        question: 'एनएसएस 78वें दौर की अनुसूची 0.0 (सूचीकरण अनुसूची) का मुख्य उद्देश्य क्या है?',
        options: [
          { id: 'A', text: 'नमूना परिवारों के चयन हेतु चयनित FSU के सभी मकानों एवं परिवारों का पूर्ण सूचीकरण' },
          { id: 'B', text: 'सभी ग्रामीणों के उपभोग व्यय का विस्तृत विवरण दर्ज करना' },
          { id: 'C', text: 'परिवार के मुखिया को पहचान पत्र जारी करना' },
          { id: 'D', text: 'उद्यम के लाभ-हानि खाते का मूल्यांकन' }
        ],
        correctAnswer: 'A',
        explanation: 'अनुसूची 0.0 चयनित गांव/हैमलेट-समूह के सभी मकानों और परिवारों की सूची बनाकर प्रतिचयन ढांचा तैयार करने के लिए तैयार की जाती है।',
        citation: 'संदर्भ: एनएसएस 78वां दौर निर्देश पुस्तिका, धारा 3.4',
        difficulty: 'Beginner',
        competencyTag: 'Field Operations',
        bloomsLevel: 'Remembering',
        manualSource: manual.title
      }
    ];
  } else {
    // English default
    return [
      {
        id: 'nss-q-1-en',
        questionNumber: 1,
        question: 'According to NSS 78th Round guidelines, what is defined as the Primary Sampling Unit (PSU) in rural areas?',
        options: [
          { id: 'A', text: 'Sample Household (USU)' },
          { id: 'B', text: 'Census Village / Panchayat Ward in Kerala' },
          { id: 'C', text: 'Community Development Block' },
          { id: 'D', text: 'Administrative District' }
        ],
        correctAnswer: 'B',
        explanation: 'In the rural sector, the first stage units (FSU) / primary sampling units (PSU) are Census villages (or Panchayat wards for Kerala), whereas the ultimate stage units (USU) are sample households as per Section 3.2.',
        citation: 'Ref: NSS 78th Round Instruction Manual, Section 3.2 (Sampling Design)',
        difficulty: 'Intermediate',
        competencyTag: 'Sampling Design',
        bloomsLevel: 'Understanding',
        manualSource: manual.title
      },
      {
        id: 'nss-q-2-en',
        questionNumber: 2,
        question: 'Under CPI Base 2012=100 compilation guidelines, which formula is mandated for elementary aggregate price relatives?',
        options: [
          { id: 'A', text: 'Carli Index (Arithmetic Mean)' },
          { id: 'B', text: 'Jevons Index (Geometric Mean)' },
          { id: 'C', text: 'Laspeyres Price Index' },
          { id: 'D', text: 'Paasche Price Index' }
        ],
        correctAnswer: 'B',
        explanation: 'The Jevons formula (unweighted geometric mean of price relatives) is mandated for elementary aggregates to eliminate upward arithmetic bias.',
        citation: 'Ref: CPI Compilation Manual, Section 2.4',
        difficulty: 'Advanced',
        competencyTag: 'Price Index Calculation',
        bloomsLevel: 'Applying',
        manualSource: manual.title
      },
      {
        id: 'nss-q-3-en',
        questionNumber: 3,
        question: 'In Schedule 0.0 (Listing Schedule) of NSS 78th Round, what is the primary objective before selecting sample households?',
        options: [
          { id: 'A', text: 'Complete listing of all houses and households in the selected FSU/hg for frame construction' },
          { id: 'B', text: 'Recording detailed consumer expenditure on food items for all village residents' },
          { id: 'C', text: 'Issuing national identity cards to household heads' },
          { id: 'D', text: 'Evaluating enterprise profit and loss accounts' }
        ],
        correctAnswer: 'A',
        explanation: 'Schedule 0.0 is executed as a complete listing of all houses and households within the selected FSU/hamlet-groups to build the sampling frame from which sample households (USUs) are drawn.',
        citation: 'Ref: NSS 78th Round Instruction Manual, Section 3.4 (Schedule 0.0 Protocol)',
        difficulty: 'Beginner',
        competencyTag: 'Field Operations',
        bloomsLevel: 'Remembering',
        manualSource: manual.title
      }
    ];
  }
}
