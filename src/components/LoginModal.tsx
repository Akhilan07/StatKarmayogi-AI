import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  Building2, 
  IdCard, 
  Sparkles, 
  ArrowRight, 
  X, 
  User, 
  CheckCircle2, 
  KeyRound,
  GraduationCap
} from 'lucide-react';
import { OfficerProfile } from '../types';

interface LoginModalProps {
  currentUser: OfficerProfile;
  onSaveProfile: (profile: OfficerProfile) => void;
  onClose: () => void;
}

const PRESET_OFFICERS: OfficerProfile[] = [
  {
    name: 'A. Sharma',
    role: 'Statistical Officer',
    division: 'Field Operations Division (NSSO)',
    karmayogiId: 'KARM-MOSPI-88941',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Senior Statistical Officer',
    division: 'Survey Design & Research Division (SDRD)',
    karmayogiId: 'KARM-MOSPI-44120',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Priya Patel',
    role: 'Data Processing Assistant',
    division: 'Data Processing Division (DPD)',
    karmayogiId: 'KARM-MOSPI-61902',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Dr. Vikram Verma',
    role: 'Joint Director (ISS Cadre)',
    division: 'National Accounts Division (NAD)',
    karmayogiId: 'KARM-MOSPI-10293',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  },
];

export const LoginModal: React.FC<LoginModalProps> = ({
  currentUser,
  onSaveProfile,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'preset' | 'custom'>('preset');
  const [name, setName] = useState(currentUser.name);
  const [role, setRole] = useState(currentUser.role);
  const [division, setDivision] = useState(currentUser.division);
  const [karmayogiId, setKarmayogiId] = useState(currentUser.karmayogiId || 'KARM-MOSPI-99001');

  const handleSelectPreset = (officer: OfficerProfile) => {
    onSaveProfile(officer);
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSaveProfile({
      name: name.trim(),
      role: role.trim() || 'Statistical Officer',
      division: division.trim() || 'Field Operations Division (NSSO)',
      karmayogiId: karmayogiId.trim() || 'KARM-MOSPI-CUSTOM',
      avatarUrl: currentUser.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative overflow-hidden animate-in zoom-in-95">
        {/* Subtle top decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-700" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-2.5 bg-emerald-100 text-[#006c4a] rounded-xl shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                MoSPI Officer Portal Login
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                iGOT Karmayogi Civil Services Single Sign-On (SSO)
              </p>
            </div>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('preset')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'preset'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Quick Select Officer Demo
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'custom'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Enter Custom Officer Profile
          </button>
        </div>

        {/* Option 1: Preset Officers */}
        {activeTab === 'preset' && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Select Demo Officer Profile:
            </p>
            <div className="grid grid-cols-1 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {PRESET_OFFICERS.map((officer) => {
                const isSelected = currentUser.name === officer.name;
                return (
                  <div
                    key={officer.name}
                    onClick={() => handleSelectPreset(officer)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'bg-emerald-50/90 border-[#006c4a] shadow-sm ring-1 ring-[#006c4a]/30'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#006c4a] to-slate-800 text-white flex items-center justify-center font-bold text-xs tracking-wider uppercase border-2 border-white shadow-xs">
                        {officer.name.split(' ').map(n => n[0]).join('').slice(0, 2) || 'MO'}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          {officer.name}
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#006c4a]" />}
                        </h4>
                        <p className="text-xs text-slate-600 font-medium">{officer.role}</p>
                        <p className="text-[11px] text-slate-400 font-normal">{officer.division}</p>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-[#006c4a] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Sign In <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Option 2: Custom Officer Form */}
        {activeTab === 'custom' && (
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Officer Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra / Sunita Gupta"
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#006c4a] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Officer Role / Designation
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#006c4a] focus:border-transparent outline-none transition-all cursor-pointer"
              >
                <option value="Senior Statistical Officer">Senior Statistical Officer (SSO)</option>
                <option value="Junior Statistical Officer">Junior Statistical Officer (JSO)</option>
                <option value="Field Investigator">Field Investigator (FI)</option>
                <option value="Data Processing Assistant">Data Processing Assistant (DPA)</option>
                <option value="Assistant Director">Assistant Director (MoSPI)</option>
                <option value="Joint Director / ISS Cadre">Joint Director / ISS Cadre Officer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                MoSPI Directorate / Division
              </label>
              <input
                type="text"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                placeholder="e.g. Field Operations Division (NSSO)"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#006c4a] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                iGOT Karmayogi ID / Employee Code
              </label>
              <input
                type="text"
                value={karmayogiId}
                onChange={(e) => setKarmayogiId(e.target.value)}
                placeholder="e.g. KARM-MOSPI-88941"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#006c4a] focus:border-transparent outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#006c4a] hover:bg-[#005137] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 pt-3"
            >
              <UserCheck className="w-4 h-4" />
              <span>Sign In &amp; Update Profile</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
