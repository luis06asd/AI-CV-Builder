import type { ComponentType } from 'react';
import type { CVData } from './cv.types';

export type TemplateId = 
  | 'classic-ats'
  | 'modern-split'
  | 'executive'
  | 'minimalist';

export type SpacingScale = 'compact' | 'normal' | 'spacious';

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontHeading: string;
  fontBody: string;
  spacing: SpacingScale;
}

export interface TemplateProps {
  data: CVData;
  theme: ThemeConfig;
  isPrintMode?: boolean;
}

export interface TemplateMetadata {
  id: TemplateId;
  name: string;
  description: string;
  isAtsOptimized: boolean;
  columns: 1 | 2;
  idealFor: string;
}

export interface TemplateRegistryItem extends TemplateMetadata {
  component: ComponentType<TemplateProps>;
}
