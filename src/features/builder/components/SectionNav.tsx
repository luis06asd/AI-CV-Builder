import React from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Languages,
  FolderGit2,
  Award,
  Settings,
} from 'lucide-react';
import type { BuilderActiveTab } from '../../../types/ui.types';
import { useUIStore } from '../../../store/uiStore';

interface NavItem {
  id: BuilderActiveTab;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'experience', label: 'Experiencia', icon: Briefcase },
  { id: 'education', label: 'Educación', icon: GraduationCap },
  { id: 'skills', label: 'Habilidades', icon: Wrench },
  { id: 'languages', label: 'Idiomas', icon: Languages },
  { id: 'projects', label: 'Proyectos', icon: FolderGit2 },
  { id: 'certifications', label: 'Certificados', icon: Award },
  { id: 'settings', label: 'Plantilla', icon: Settings },
];

export const SectionNav: React.FC = () => {
  const activeTab = useUIStore((state) => state.activeTab);
  const setActiveTab = useUIStore((state) => state.setActiveTab);

  return (
    <nav className="flex items-center gap-1 overflow-x-auto p-2 bg-slate-100 border-b border-slate-200 scrollbar-none">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition ${
              isActive
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Icon size={14} className={isActive ? 'text-blue-600' : 'text-slate-500'} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
