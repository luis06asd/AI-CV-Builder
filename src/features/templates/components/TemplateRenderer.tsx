import React from 'react';
import type { CVData } from '../../../types/cv.types';
import type { ThemeConfig, TemplateId } from '../../../types/template.types';
import { TEMPLATES_REGISTRY } from '../registry';

interface TemplateRendererProps {
  data: CVData;
  theme: ThemeConfig;
  templateId: TemplateId;
  isPrintMode?: boolean;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({
  data,
  theme,
  templateId,
  isPrintMode = false,
}) => {
  const templateItem = TEMPLATES_REGISTRY[templateId] || TEMPLATES_REGISTRY['classic-ats'];
  const Component = templateItem.component;

  return (
    <div className="w-full h-full bg-white text-slate-900">
      <Component data={data} theme={theme} isPrintMode={isPrintMode} />
    </div>
  );
};
