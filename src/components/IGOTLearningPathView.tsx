import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Building2, 
  Download, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Search,
  Filter,
  Play,
  BookOpen,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { IGOTCourse, LearningHistoryItem, TabType } from '../types';

interface IGOTLearningPathViewProps {
  courses: IGOTCourse[];
  history: LearningHistoryItem[];
  onOpenCertificate: (item: LearningHistoryItem) => void;
  onLaunchCourseQuiz: (course: IGOTCourse) => void;
  setActiveTab: (tab: TabType) => void;
}

export const IGOTLearningPathView: React.FC<IGOTLearningPathViewProps> = ({
  courses,
  history,
  onOpenCertificate,
  onLaunchCourseQuiz,
  setActiveTab,
}) => {
  const [selectedCompetency, setSelectedCompetency] = useState('All Competencies');
  const [selectedDuration, setSelectedDuration] = useState('Any Duration');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [activeCourseModal, setActiveCourseModal] = useState<IGOTCourse | null>(null);

  // Filter courses
  const filteredCourses = courses.filter((c) => {
    if (selectedCompetency !== 'All Competencies') {
      if (!c.competency.toLowerCase().includes(selectedCompetency.toLowerCase())) return false;
    }
    if (selectedLevel !== 'All Levels') {
      if (c.level.toLowerCase() !== selectedLevel.toLowerCase()) return false;
    }
    if (selectedDuration !== 'Any Duration') {
      const hours = parseInt(c.duration);
      if (selectedDuration === '< 4 Hours' && hours >= 4) return false;
      if (selectedDuration === '4 - 8 Hours' && (hours < 4 || hours > 8)) return false;
      if (selectedDuration === '8+ Hours' && hours < 8) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header & Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-1">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Recommended Learning Path</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            AI-curated iGOT courses aligned with your recent competency gap analysis. Focus areas: <strong className="text-slate-800 font-semibold">Advanced Sampling</strong> &amp; <strong className="text-slate-800 font-semibold">Data Validation</strong>.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={selectedCompetency}
              onChange={(e) => setSelectedCompetency(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-lg py-2 pl-3.5 pr-8 text-xs font-semibold text-slate-800 focus:border-[#006c4a] focus:ring-1 focus:ring-[#006c4a] outline-none shadow-sm cursor-pointer hover:border-slate-300"
            >
              <option>All Competencies</option>
              <option>Sampling Design</option>
              <option>Data Validation</option>
              <option>Price Index Calculation</option>
              <option>Python/R Analytics</option>
              <option>National Accounts</option>
            </select>
          </div>

          <div className="relative">
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-lg py-2 pl-3.5 pr-8 text-xs font-semibold text-slate-800 focus:border-[#006c4a] focus:ring-1 focus:ring-[#006c4a] outline-none shadow-sm cursor-pointer hover:border-slate-300"
            >
              <option>Any Duration</option>
              <option>&lt; 4 Hours</option>
              <option>4 - 8 Hours</option>
              <option>8+ Hours</option>
            </select>
          </div>

          <div className="relative">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-lg py-2 pl-3.5 pr-8 text-xs font-semibold text-slate-800 focus:border-[#006c4a] focus:ring-1 focus:ring-[#006c4a] outline-none shadow-sm cursor-pointer hover:border-slate-300"
            >
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recommended Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isStarted = course.progress > 0;
          return (
            <div
              key={course.id}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-md transition-all flex flex-col group relative"
            >
              {/* AI Match Badge */}
              <div className="absolute top-3.5 right-3.5 bg-[#006c4a] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{course.matchScore}% Match</span>
              </div>

              {/* Course Card Banner Image */}
              <div className="h-44 w-full relative overflow-hidden bg-slate-900">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e] via-transparent to-black/20" />
                
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="bg-black/50 backdrop-blur-md text-white border border-white/20 text-[10px] font-semibold px-2 py-0.5 rounded">
                    {course.level}
                  </span>
                  <span className="bg-black/50 backdrop-blur-md text-white border border-white/20 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {course.duration}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="text-[#006c4a] text-[11px] font-bold mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>iGOT Karmayogi</span>
                </div>

                <h3 
                  onClick={() => setActiveCourseModal(course)}
                  className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-[#006c4a] transition-colors cursor-pointer"
                >
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500 mb-5 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="mt-auto pt-2">
                  {/* Progress Track */}
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1.5 font-medium">
                    <span>{isStarted ? 'In Progress' : 'Readiness'}</span>
                    <span className="text-[#006c4a] font-bold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-[#82f5c1]/20 h-1.5 rounded-full mb-5 overflow-hidden">
                    <div
                      className="bg-[#006c4a] h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveCourseModal(course)}
                      className="w-full py-2.5 px-3 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold transition-colors shadow-sm text-center"
                    >
                      Syllabus
                    </button>

                    <button
                      onClick={() => onLaunchCourseQuiz(course)}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-colors shadow-sm text-center flex items-center justify-center gap-1 ${
                        isStarted 
                          ? 'bg-[#131b2e] text-white hover:bg-[#0b1c30]' 
                          : 'bg-[#006c4a] text-white hover:bg-[#005137]'
                      }`}
                    >
                      <span>{isStarted ? 'Resume & Quiz' : 'Enroll via iGOT'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* My Learning History Section */}
      <div className="mt-12 pt-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#006c4a]" />
            <span>My Learning History</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
            3 Certified Milestones
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#006c4a] flex items-center justify-center shrink-0 border border-emerald-100 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1">{item.title}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Completed {item.completedDate}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Score: {item.score}%
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:inline-block" />
                    <span className="text-[11px] text-slate-400 font-mono hidden sm:inline-block">
                      ID: {item.certificateId}
                    </span>
                  </div>
                </div>
              </div>

              <button
                id={`download-cert-${item.id}`}
                onClick={() => onOpenCertificate(item)}
                className="flex items-center gap-2 text-[#006c4a] hover:text-white hover:bg-[#006c4a] font-semibold text-xs px-4 py-2.5 border border-[#006c4a]/30 rounded-xl transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>View &amp; Export Certificate</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Course Detail Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex justify-between items-start pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006c4a] bg-emerald-50 px-2.5 py-1 rounded-full">
                  {activeCourseModal.provider}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">{activeCourseModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeCourseModal.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">iGOT Curriculum Modules:</h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {activeCourseModal.syllabus.map((mod, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                      {i + 1}
                    </span>
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => setActiveCourseModal(null)}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const course = activeCourseModal;
                  setActiveCourseModal(null);
                  onLaunchCourseQuiz(course);
                }}
                className="flex-1 py-2.5 bg-[#006c4a] text-white font-bold rounded-xl text-xs hover:bg-[#005137] transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Competency Quiz</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
