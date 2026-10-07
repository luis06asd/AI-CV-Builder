import React from 'react';
import { useUIStore } from '../../../store/uiStore';
import { PersonalInfoSection } from '../sections/PersonalInfoSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { EducationSection } from '../sections/EducationSection';
import { SkillsSection } from '../sections/SkillsSection';
import { LanguagesSection } from '../sections/LanguagesSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { CertificationsSection } from '../sections/CertificationsSection';
import { SettingsSection } from '../sections/SettingsSection';

export const SectionContent: React.FC = () => {
  const activeTab = useUIStore((state) => state.activeTab);

  switch (activeTab) {
    case 'personal':
      return <PersonalInfoSection />;
    case 'experience':
      return <ExperienceSection />;
    case 'education':
      return <EducationSection />;
    case 'skills':
      return <SkillsSection />;
    case 'languages':
      return <LanguagesSection />;
    case 'projects':
      return <ProjectsSection />;
    case 'certifications':
      return <CertificationsSection />;
    case 'settings':
      return <SettingsSection />;
    default:
      return <PersonalInfoSection />;
  }
};
