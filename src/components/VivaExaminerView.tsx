import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Send, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  ChevronRight, 
  Volume2, 
  Bot, 
  User, 
  GraduationCap, 
  Clock, 
  FileText, 
  Check, 
  HelpCircle,
  Zap,
  Globe
} from 'lucide-react';
import { VIVA_TOPICS } from '../data/mockData';
import { AppLanguage, DifficultyLevel, VivaSession, VivaTurn } from '../types';
import { MoSPIAssessmentApiService } from '../services/api';

interface VivaExaminerViewProps {
  language: AppLanguage;
  onAwardKarmaPoints?: (points: number) => void;
}

export const VivaExaminerView: React.FC<VivaExaminerViewProps> = ({
  language,
  onAwardKarmaPoints,
}) => {
  const isHindi = language === 'hi';
  const isTamil = language === 'ta';

  const getLangBadge = () => {
    if (isTamil) return 'மொழி: தமிழ்';
    if (isHindi) return 'भाषा: हिन्दी';
    return 'Lang: English';
  };

  // Topic selection & configuration state
  const [selectedTopicId, setSelectedTopicId] = useState<string>(VIVA_TOPICS[0].id);
  const [targetRole, setTargetRole] = useState<string>('Senior Statistical Officer');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');
  
  // Viva examination active session state
  const [session, setSession] = useState<VivaSession | null>(null);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [userInputText, setUserInputText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [sessionTimeSeconds, setSessionTimeSeconds] = useState<number>(0);

  const activeTopic = VIVA_TOPICS.find((t) => t.id === selectedTopicId) || VIVA_TOPICS[0];

  // Timer effect for active session
  useEffect(() => {
    let interval: any;
    if (session && session.status === 'active') {
      interval = setInterval(() => {
        setSessionTimeSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [session]);

  // Start a new AI Viva Examination Session
  const handleStartViva = async () => {
    setIsLoadingQuestion(true);
    setSessionTimeSeconds(0);

    const initialSession: VivaSession = {
      id: `viva-sess-${Date.now()}`,
      topic: activeTopic.title,
      officerRole: targetRole,
      difficulty,
      startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      turns: [],
      status: 'active',
    };

    try {
      const data = await MoSPIAssessmentApiService.fetchVivaQuestion({
        topic: activeTopic.title,
        officerRole: targetRole,
        difficulty: difficulty,
        language,
        chatHistory: [],
      });

      let firstQuestion = 'Explain the key distinction between Primary Sampling Units (PSU) and Ultimate Stage Units (USU) in rural survey sampling according to NSS guidelines.';
      let contextHint = 'Consider Census villages vs sample households.';
      let targetConcepts = ['PSU Demarcation', 'Stratified Sampling', 'USU Selection'];

      if (data.success && data.data && data.data.question) {
        firstQuestion = data.data.question;
        contextHint = data.data.context_hint || '';
        targetConcepts = data.data.target_concepts || targetConcepts;
      }

      initialSession.turns.push({
        id: `turn-1`,
        question: firstQuestion,
        contextHint,
        targetConcepts,
      });

      setSession(initialSession);
      setCurrentTurnIndex(0);
      setUserInputText('');
    } catch (err) {
      console.error('Error starting viva session:', err);
      initialSession.turns.push({
        id: `turn-1`,
        question: `According to ${activeTopic.manual}, how are primary sampling units selected in rural vs urban sectors? Explain with multipliers if applicable.`,
        contextHint: 'Focus on NSS 78th Round guidelines.',
        targetConcepts: ['Sampling Design', 'Stratification', 'Multipliers'],
      });
      setSession(initialSession);
      setCurrentTurnIndex(0);
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  // Toggle simulated speech-to-text recording
  const handleToggleSpeechRecording = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      // Simulate live spoken input transcript addition after brief speech recording
      const simulatedResponses: Record<string, string> = {
        'viva-topic-1': isTamil
          ? 'கிராமப்புறங்களில் முதன்மை மாதிரியாக்கல் அலகு (PSU) என்பது மக்கள் தொகை கணக்கெடுப்பு கிராமம் அல்லது பஞ்சாயத்து வார்டு ஆகும்.'
          : isHindi 
          ? 'ग्रामीण क्षेत्रों में प्राथमिक प्रतिचयन इकाई (PSU) जनगणना गांव या पंचायत वार्ड होता है। हम बहु-स्तरीय स्तरीकृत विधि का उपयोग करते हैं और अंतिम स्तर पर परिवारों का चयन करते हैं।' 
          : 'In the rural sector, the Primary Sampling Unit (PSU) is defined as the Census Village or Panchayat Ward. First stage units are selected using SRSWOR or PPSWR, and ultimate stage units are the sample households chosen after hamlet-group formation.',
        'viva-topic-2': isTamil
          ? 'நுகர்வோர் விலை குறியீட்டில் (CPI) ஜெவோன்ஸ் சூத்திரம் (Jevons Formula) பயன்படுத்தப்படுகிறது.'
          : isHindi
          ? 'उपभोक्ता मूल्य सूचकांक में प्राथमिक स्तर पर जेवन्स सूचकांक (ज्यामितीय माध्य) का उपयोग किया जाता है ताकि अंकगणितीय माध्य के कारण होने वाले झुकाव से बचा जा सके।'
          : 'For elementary aggregates in CPI Base 2012=100, the Jevons formula (unweighted geometric mean of price relatives) is mandated to avoid Carli index upward bias.',
        'default': isTamil
          ? 'என்எஸ்எஸ்ஓ வழிகாட்டுதல்களின்படி தரவு சரிபார்ப்பு மற்றும் மாதிரி தேர்வு முறை பின்பற்றப்படுகிறது.'
          : isHindi
          ? 'एनएसएसओ दिशा-निर्देशों के अनुसार आंकड़ों का सत्यापन और नमूना चयन प्रक्रिया कठोरता से लागू की जाती है।'
          : 'According to official MoSPI operational manuals, the sampling frame is stratified carefully and data validation checks are applied at the field entry stage.'
      };

      setTimeout(() => {
        const textToAdd = simulatedResponses[selectedTopicId] || simulatedResponses['default'];
        setUserInputText((prev) => (prev ? `${prev} ${textToAdd}` : textToAdd));
        setIsRecording(false);
      }, 3000);
    }
  };

  // Submit Answer & Request AI Viva Evaluation
  const handleSubmitAnswer = async () => {
    if (!session || !userInputText.trim() || isEvaluating) return;

    setIsEvaluating(true);
    const currentTurn = session.turns[currentTurnIndex];

    try {
      const data = await MoSPIAssessmentApiService.evaluateVivaResponse({
        question: currentTurn.question,
        officerAnswer: userInputText,
        topic: session.topic,
        officerRole: session.officerRole,
        language,
      });

      let evaluation = {
        score: 82,
        grade: 'A',
        summary_feedback: isHindi 
          ? 'उत्तर तकनीकी रूप से सटीक है। आपने प्राथमिक प्रतिचयन इकाइयों का सही संदर्भ दिया है।'
          : 'Strong conceptual response. Correctly identified First Stage Units and hamlet-group subsampling rules grounded in NSS guidelines.',
        strengths: ['Accurate PSU Identification', 'Grounded in NSS manual rules'],
        gaps: ['Could elaborate more on multiplier calculations'],
        manual_citation: `Ref: ${activeTopic.manual}, Section 3.2`,
        recommended_reading: 'iGOT Module: Advanced Survey Sampling',
      };

      if (data.success && data.data) {
        evaluation = {
          score: data.data.score,
          grade: data.data.grade,
          summary_feedback: data.data.summary_feedback,
          strengths: data.data.strengths,
          gaps: data.data.gap_areas,
          manual_citation: data.data.manual_citation,
          recommended_reading: 'iGOT Module: Advanced Survey Sampling',
        };
      }

      // Update current turn with user answer & AI evaluation
      const updatedTurns = [...session.turns];
      updatedTurns[currentTurnIndex] = {
        ...currentTurn,
        userAnswer: userInputText,
        score: evaluation.score,
        grade: evaluation.grade,
        feedback: evaluation.summary_feedback,
        strengths: evaluation.strengths,
        gaps: evaluation.gaps,
        manualCitation: evaluation.manual_citation,
        recommendedReading: evaluation.recommended_reading,
      };

      setSession({
        ...session,
        turns: updatedTurns,
      });

      if (onAwardKarmaPoints && evaluation.score >= 70) {
        onAwardKarmaPoints(50);
      }
    } catch (err) {
      console.error('Error evaluating answer:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Proceed to Next Question in Viva Session
  const handleNextQuestion = async () => {
    if (!session) return;
    setIsLoadingQuestion(true);

    try {
      const history = session.turns.map((t) => ({ q: t.question, a: t.userAnswer }));
      const res = await fetch('/api/viva-examiner/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: session.topic,
          officerRole: session.officerRole,
          difficulty: session.difficulty,
          language,
          chatHistory: history,
        }),
      });

      const data = await res.json();
      let nextQuestionText = 'How do you handle non-response or missing household schedules during field audit operations?';
      let contextHint = 'Refer to substitution rules vs re-visiting protocols.';
      let targetConcepts = ['Non-Response Handling', 'Substitution Protocol'];

      if (data.success && data.data && data.data.question) {
        nextQuestionText = data.data.question;
        contextHint = data.data.context_hint || '';
        targetConcepts = data.data.target_concepts || targetConcepts;
      }

      const nextTurn: VivaTurn = {
        id: `turn-${session.turns.length + 1}`,
        question: nextQuestionText,
        contextHint,
        targetConcepts,
      };

      setSession({
        ...session,
        turns: [...session.turns, nextTurn],
      });
      setCurrentTurnIndex(session.turns.length);
      setUserInputText('');
    } catch (err) {
      console.error('Error fetching next viva question:', err);
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  // Finish Viva Examination
  const handleFinishViva = () => {
    if (!session) return;
    const evaluatedTurns = session.turns.filter((t) => t.score !== undefined);
    const avgScore = evaluatedTurns.length > 0 
      ? Math.round(evaluatedTurns.reduce((acc, t) => acc + (t.score || 0), 0) / evaluatedTurns.length)
      : 75;

    setSession({
      ...session,
      overallScore: avgScore,
      status: 'completed',
    });

    if (onAwardKarmaPoints) {
      onAwardKarmaPoints(150);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-[#006c4a] rounded-lg">
              <Bot className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {isHindi ? 'AI मौखिक साक्षात्कार (Viva Examiner)' : 'AI Oral Viva Examiner'}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {isHindi 
                  ? 'जेमिनी 3.7 द्वारा संचालित मोस्पी अधिकारियों के लिए इंटरएक्टिव मौखिक मूल्यांकन एवं विधि प्रश्नोत्तरी' 
                  : 'Interactive AI Board Examination & Methodology Defense powered by Gemini 3.7 Flash'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#006c4a] border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            {isHindi ? 'iGOT कर्मयोगी संरेखित' : 'iGOT Karmayogi Aligned'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            {isHindi ? 'भाषा: हिन्दी' : 'Lang: English'}
          </span>
        </div>
      </div>

      {/* Screen 1: Session Setup & Topic Selection */}
      {!session && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Topic Cards Selection */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#006c4a]" />
              {isHindi ? '1. साक्षात्कार विषय चुनें' : '1. Select Examination Topic'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VIVA_TOPICS.map((topic) => {
                const isSelected = topic.id === selectedTopicId;
                return (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 relative overflow-hidden ${
                      isSelected
                        ? 'bg-gradient-to-br from-emerald-50/90 to-white border-[#006c4a] shadow-md ring-2 ring-[#006c4a]/20'
                        : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 text-[#006c4a]">
                        <CheckCircle2 className="w-5 h-5 fill-[#006c4a] text-white" />
                      </div>
                    )}
                    <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-semibold rounded-md mb-2">
                      {topic.manual}
                    </span>
                    <h4 className="font-bold text-slate-900 text-base leading-snug">{topic.title}</h4>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">{topic.description}</p>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Target: {topic.targetRole}</span>
                      <span className="font-medium text-[#006c4a]">Gemini 3.7 AI</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Config Controls Sidebar */}
          <div className="lg:col-span-4 glass-panel rounded-2xl p-6 space-y-5">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#006c4a]" />
              {isHindi ? '2. परीक्षा पैरामीटर' : '2. Board Parameters'}
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isHindi ? 'अधिकारी पदनाम' : 'Officer Target Role'}
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-[#006c4a] focus:border-transparent outline-none"
              >
                <option value="Senior Statistical Officer">Senior Statistical Officer (SSO)</option>
                <option value="Junior Statistical Officer">Junior Statistical Officer (JSO)</option>
                <option value="Field Investigator">Field Investigator (FOD)</option>
                <option value="Assistant Director">Assistant Director (MoSPI)</option>
                <option value="Data Processing Assistant">Data Processing Assistant (DPD)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isHindi ? 'कठिनाई स्तर' : 'Difficulty Rigor'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setDifficulty(lvl)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                      difficulty === lvl
                        ? 'bg-[#006c4a] text-white border-[#006c4a] shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#006c4a]">
                <Zap className="w-4 h-4" />
                {isHindi ? 'मौखिक परीक्षा विवरण' : 'Viva Protocol Highlights'}
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li>{isHindi ? 'सच्चे मोस्पी मैनुअल नियमों पर आधारित प्रश्न' : 'Real-time AI Examiner grounded in MoSPI manuals.'}</li>
                <li>{isHindi ? 'माइक्रोफोन द्वारा बोलकर या लिखकर उत्तर दें' : 'Respond using Voice Dictation or Text Typing.'}</li>
                <li>{isHindi ? 'स्कोरिंग एवं तुरंत फीडबैक' : 'Earn KarmaPoints & Diagnostic Gap Analysis.'}</li>
              </ul>
            </div>

            <button
              onClick={handleStartViva}
              disabled={isLoadingQuestion}
              className="w-full py-3.5 bg-[#006c4a] hover:bg-[#005137] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoadingQuestion ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isHindi ? 'परीक्षा बोर्ड तैयार हो रहा है...' : 'Initializing Board Examiner...'}
                </>
              ) : (
                <>
                  <Bot className="w-5 h-5" />
                  {isHindi ? 'मौखिक परीक्षा प्रारम्भ करें' : 'Begin AI Viva Examination'}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Active AI Viva Examination Room */}
      {session && session.status === 'active' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Viva Examination Panel (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Session Top Status Bar */}
            <div className="glass-panel rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{session.topic}</h4>
                  <p className="text-xs text-slate-500">
                    Question {currentTurnIndex + 1} • Role: {session.officerRole} ({session.difficulty})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                  <Clock className="w-4 h-4 text-[#006c4a]" />
                  <span>{formatTime(sessionTimeSeconds)}</span>
                </div>
                <button
                  onClick={handleFinishViva}
                  className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-all"
                >
                  {isHindi ? 'परीक्षा समाप्त करें' : 'End Viva'}
                </button>
              </div>
            </div>

            {/* AI Board Examiner Question Card */}
            {session.turns[currentTurnIndex] && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#006c4a] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0 border border-emerald-400/30">
                    <Bot className="w-7 h-7" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                        {isHindi ? 'मोस्पी बोर्ड परीक्षक प्रश्न' : 'Senior Board Examiner Prompt'}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {activeTopic.manual}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold leading-relaxed text-slate-100">
                      "{session.turns[currentTurnIndex].question}"
                    </h3>

                    {session.turns[currentTurnIndex].contextHint && (
                      <p className="text-xs text-slate-300 bg-slate-800/80 p-3 rounded-lg border border-slate-700/80 italic">
                        💡 Hint: {session.turns[currentTurnIndex].contextHint}
                      </p>
                    )}

                    {session.turns[currentTurnIndex].targetConcepts && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {session.turns[currentTurnIndex].targetConcepts?.map((c, i) => (
                          <span key={i} className="px-2.5 py-0.5 bg-emerald-950 text-emerald-300 rounded-md text-[11px] font-semibold border border-emerald-800/50">
                            #{c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Candidate Oral Response Box */}
            {!session.turns[currentTurnIndex]?.score ? (
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#006c4a]" />
                    {isHindi ? 'आपका मौखिक उत्तर (Dictate or Type Response):' : 'Your Oral Response (Voice Dictation / Text Response):'}
                  </label>

                  <button
                    onClick={handleToggleSpeechRecording}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isRecording
                        ? 'bg-red-600 text-white animate-pulse shadow-md'
                        : 'bg-emerald-100 text-[#006c4a] hover:bg-emerald-200'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    {isRecording ? (isHindi ? 'रिकॉर्डिंग चालू...' : 'Recording Audio...') : (isHindi ? 'वॉयस बोलें' : 'Voice Dictate')}
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={userInputText}
                  onChange={(e) => setUserInputText(e.target.value)}
                  placeholder={
                    isHindi
                      ? 'अपना उत्तर विस्तार से यहाँ लिखें या वॉयस बटन दबाकर बोलें (उदाहरण: प्राथमिक प्रतिचयन इकाई की परिभाषा, चयन प्रक्रिया और नियम)...'
                      : 'Type or dictate your verbal response in detail (e.g. Ground your reasoning in official NSS / CPI manual definitions)...'
                  }
                  className="w-full p-4 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-[#006c4a] focus:border-transparent outline-none shadow-inner resize-none"
                />

                <div className="flex items-center justify-between pt-1">
                  <p className="text-xs text-slate-500">
                    {isHindi ? 'सुझाव: उत्तर में नियम एवं अवधारणाओं का उल्लेख करें।' : 'Grounding Tip: Mention specific survey definitions or section rules for higher evaluation marks.'}
                  </p>

                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!userInputText.trim() || isEvaluating}
                    className="px-6 py-2.5 bg-[#006c4a] hover:bg-[#005137] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isEvaluating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {isHindi ? 'मूल्यांकन जारी...' : 'Evaluating Response...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {isHindi ? 'परीक्षक को उत्तर प्रस्तुत करें' : 'Submit Response to Board'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* AI Evaluation Results Panel for Current Turn */
              <div className="glass-panel rounded-2xl p-6 space-y-4 border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50/30 to-white">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-[#006c4a]" />
                    <h4 className="font-bold text-slate-900 text-base">
                      {isHindi ? 'परीक्षक मूल्यांकन परिणाम' : 'Board Examiner Feedback & Grading'}
                    </h4>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-semibold text-slate-500">Grade:</span>
                    <span className="text-2xl font-black text-[#006c4a]">
                      {session.turns[currentTurnIndex].grade || 'A'}
                    </span>
                    <span className="text-sm font-bold text-slate-700">
                      ({session.turns[currentTurnIndex].score}/100)
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm space-y-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Qualitative Assessment</p>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    {session.turns[currentTurnIndex].feedback}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {session.turns[currentTurnIndex].strengths && (
                    <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200/80 space-y-1">
                      <p className="text-xs font-bold text-[#006c4a] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 stroke-[3]" /> Key Strengths
                      </p>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                        {session.turns[currentTurnIndex].strengths?.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {session.turns[currentTurnIndex].gaps && (
                    <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 space-y-1">
                      <p className="text-xs font-bold text-amber-800 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Growth Gaps
                      </p>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                        {session.turns[currentTurnIndex].gaps?.map((g, idx) => (
                          <li key={idx}>{g}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {session.turns[currentTurnIndex].manualCitation && (
                  <div className="p-3 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#006c4a]" />
                    <span>{session.turns[currentTurnIndex].manualCitation}</span>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={handleNextQuestion}
                    disabled={isLoadingQuestion}
                    className="px-5 py-2.5 bg-[#006c4a] hover:bg-[#005137] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    {isHindi ? 'अगला प्रश्न पूछें' : 'Ask Next Question'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Session History Sidebar (Col 4) */}
          <div className="lg:col-span-4 glass-panel rounded-2xl p-5 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-[#006c4a]" />
              {isHindi ? 'साक्षात्कार प्रगति' : 'Examination Progress'}
            </h4>

            <div className="space-y-3">
              {session.turns.map((turn, idx) => (
                <div
                  key={turn.id}
                  onClick={() => setCurrentTurnIndex(idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    idx === currentTurnIndex
                      ? 'bg-emerald-50 border-[#006c4a] shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Question #{idx + 1}</span>
                    {turn.score !== undefined ? (
                      <span className="px-2 py-0.5 bg-emerald-100 text-[#006c4a] rounded font-extrabold">
                        {turn.score}/100 ({turn.grade})
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded">In Progress</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 font-medium">{turn.question}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200">
              <button
                onClick={handleFinishViva}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
              >
                {isHindi ? 'मौखिक परीक्षा सम्पन्न करें' : 'Complete Viva Session'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen 3: Completed Session Summary Report */}
      {session && session.status === 'completed' && (
        <div className="glass-panel rounded-2xl p-8 max-w-3xl mx-auto space-y-6 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-[#006c4a] rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <span className="inline-block px-3 py-1 bg-emerald-100 text-[#006c4a] text-xs font-bold rounded-full mb-2">
              {isHindi ? 'मौखिक परीक्षा सम्पन्न' : 'Viva Examination Completed'}
            </span>
            <h3 className="text-2xl font-bold text-slate-900">{session.topic}</h3>
            <p className="text-sm text-slate-500 mt-1">
              Officer Role: {session.officerRole} • Time Elapsed: {formatTime(sessionTimeSeconds)}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm inline-block min-w-[240px]">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Overall Viva Score</p>
            <div className="flex items-baseline justify-center gap-1 text-[#006c4a] mt-1">
              <span className="text-5xl font-black">{session.overallScore || 80}</span>
              <span className="text-xl font-bold">%</span>
            </div>
            <span className="inline-block mt-2 px-3 py-0.5 bg-emerald-50 text-[#006c4a] font-bold text-xs rounded-full border border-emerald-200">
              Proficient Board Clearance
            </span>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => setSession(null)}
              className="px-6 py-3 bg-[#006c4a] hover:bg-[#005137] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              {isHindi ? 'नई परीक्षा शुरू करें' : 'Start Another AI Viva Session'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
