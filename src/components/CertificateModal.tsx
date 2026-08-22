import React from 'react';
import { Award, Download, ShieldCheck, CheckCircle2, Calendar, User, Printer } from 'lucide-react';
import { LearningHistoryItem } from '../types';
import jsPDF from 'jspdf';

interface CertificateModalProps {
  item: LearningHistoryItem;
  officerName?: string;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  item,
  officerName = 'A. Sharma (Statistical Officer, NSSO)',
  onClose,
}) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    // Outer Border
    doc.setDrawColor(0, 108, 74);
    doc.setLineWidth(2);
    doc.rect(8, 8, 281, 194);
    doc.setDrawColor(19, 27, 46);
    doc.setLineWidth(0.5);
    doc.rect(12, 12, 273, 186);

    // Header Emblem Title
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(19, 27, 46);
    doc.setFontSize(16);
    doc.text('GOVERNMENT OF INDIA', 148, 30, { align: 'center' });
    doc.setFontSize(12);
    doc.text('MINISTRY OF STATISTICS AND PROGRAMME IMPLEMENTATION (MoSPI)', 148, 37, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(0, 108, 74);
    doc.text('Mission Karmayogi • National Statistical Systems Training Academy (NSSTA)', 148, 44, { align: 'center' });

    // Certificate Title
    doc.setFontSize(24);
    doc.setTextColor(19, 27, 46);
    doc.text('CERTIFICATE OF COMPETENCY', 148, 64, { align: 'center' });

    // Body
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text('This is to certify that', 148, 76, { align: 'center' });

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 108, 74);
    doc.text(officerName, 148, 88, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text('has successfully completed the assessment and demonstrated verified operational competency in:', 148, 98, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(19, 27, 46);
    doc.text(item.title, 148, 110, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Evaluation Score: ${item.score}% (Standard Exceeded) • Competency: ${item.competency}`, 148, 120, { align: 'center' });

    // Footer lines and signatures
    doc.line(30, 160, 90, 160);
    doc.text('Director General, NSSO', 60, 166, { align: 'center' });
    doc.text('Field Operations Division', 60, 171, { align: 'center' });

    doc.line(207, 160, 267, 160);
    doc.text('Director, NSSTA', 237, 166, { align: 'center' });
    doc.text('Ministry of Statistics & PI', 237, 171, { align: 'center' });

    // Meta bottom
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(`Certificate ID: ${item.certificateId} | Date of Issuance: ${item.completedDate}`, 148, 185, { align: 'center' });

    doc.save(`MoSPI-Certificate-${item.certificateId}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in zoom-in-95">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-4 border-double border-[#006c4a]/30 space-y-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
        >
          ✕
        </button>

        {/* Certificate Visual Presentation */}
        <div className="text-center space-y-3 pt-2">
          <div className="w-16 h-16 rounded-2xl bg-[#131b2e] text-emerald-400 flex items-center justify-center mx-auto shadow-md border-2 border-emerald-500/30">
            <Award className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              Government of India • Ministry of Statistics and PI
            </p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Certificate of Competency
            </h3>
            <p className="text-xs font-semibold text-[#006c4a]">
              Mission Karmayogi Official Certification
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
          <p className="text-xs text-slate-500">Proudly presented to</p>
          <h4 className="text-xl font-bold text-[#131b2e]">{officerName}</h4>
          <p className="text-xs text-slate-600">
            For achieving an evaluation score of <strong className="text-[#006c4a] text-sm">{item.score}%</strong> in:
          </p>
          <p className="text-sm font-bold text-slate-900 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-xs">
            {item.title}
          </p>

          <div className="flex justify-center items-center gap-6 pt-3 text-[11px] text-slate-500 border-t border-slate-200">
            <span>Date: <strong>{item.completedDate}</strong></span>
            <span>•</span>
            <span>ID: <strong className="font-mono text-slate-700">{item.certificateId}</strong></span>
            <span>•</span>
            <span className="text-[#006c4a] font-bold">Verified</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-200 transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex-1 py-3 bg-[#006c4a] hover:bg-[#005137] text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Official PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
