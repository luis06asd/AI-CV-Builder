import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Printer, FileText } from 'lucide-react';
import { useCVStore } from '../../../store/cvStore';

export const BuilderHeader: React.FC = () => {
  const cv = useCVStore((state) => state.cv);
  const cvTitle = useCVStore((state) => state.cv.title);
  const updateCVTitle = useCVStore((state) => state.updateCVTitle);

  const handlePrint = () => {
    const originalTitle = document.title;
    const fullName = cv.personalInfo.fullName?.trim() || 'Curriculum';
    const jobTitle = cv.personalInfo.jobTitle?.trim() || cv.title || 'CV';
    document.title = `${fullName} - ${jobTitle}`;

    window.print();

    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  return (
    <header className="no-print h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between z-20">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
          title="Volver a Inicio"
        >
          <ArrowLeft size={18} />
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <FileText size={17} />
          </div>
          <div>
            <input
              type="text"
              value={cvTitle}
              onChange={(e) => updateCVTitle(e.target.value)}
              className="text-xs sm:text-sm font-bold text-slate-800 bg-transparent hover:bg-slate-50 focus:bg-white px-1.5 py-0.5 rounded border border-transparent focus:border-slate-300 focus:outline-none transition w-44 sm:w-64"
              placeholder="Título del Currículum"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition active:scale-95"
          title="Exportar a PDF con calidad vectorial A4"
        >
          <Printer size={15} />
          <span>Exportar PDF</span>
        </button>
      </div>
    </header>
  );
};
