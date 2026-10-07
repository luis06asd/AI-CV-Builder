import type { ThemeConfig } from '../types/template.types';
import type { LanguageProficiency, SkillCategory, SkillLevel } from '../types/cv.types';

export const APP_NAME = 'AI CV Builder';

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  primaryColor: '#1e3a8a', // Deep Blue
  secondaryColor: '#475569', // Slate
  fontHeading: 'font-sans',
  fontBody: 'font-sans',
  spacing: 'normal',
};

export const COLOR_PALETTES = [
  { name: 'Azul Profesional', primary: '#1e3a8a', secondary: '#475569' },
  { name: 'Gris Carbón', primary: '#0f172a', secondary: '#334155' },
  { name: 'Esmeralda', primary: '#065f46', secondary: '#374151' },
  { name: 'Vino Tinto', primary: '#831843', secondary: '#4b5563' },
  { name: 'Índigo Moderno', primary: '#3730a3', secondary: '#475569' },
  { name: 'Café Ejecutivo', primary: '#78350f', secondary: '#4b5563' },
];

export const LANGUAGE_PROFICIENCY_LABELS: Record<LanguageProficiency, string> = {
  basic: 'Básico',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
  native: 'Nativo / Bilingüe',
};

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  technical: 'Técnica',
  soft: 'Blanda / Interpersonal',
  tools: 'Herramientas / Software',
  other: 'Otra',
};

export const SKILL_LEVEL_LABELS: Record<SkillLevel, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
  expert: 'Experto',
};
