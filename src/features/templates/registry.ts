import type { TemplateRegistryItem, TemplateId } from '../../types/template.types';
import { ClassicAtsTemplate } from './designs/ClassicAts';
import { ModernSplitTemplate } from './designs/ModernSplit';
import { ExecutiveTemplate } from './designs/Executive';
import { MinimalistTemplate } from './designs/Minimalist';

export const TEMPLATES_REGISTRY: Record<TemplateId, TemplateRegistryItem> = {
  'classic-ats': {
    id: 'classic-ats',
    name: 'Classic ATS',
    description: 'Estructura tradicional a 1 columna. Máxima compatibilidad y legibilidad con filtros de reclutamiento.',
    isAtsOptimized: true,
    columns: 1,
    idealFor: 'Corporativo & ATS',
    component: ClassicAtsTemplate,
  },
  executive: {
    id: 'executive',
    name: 'Executive',
    description: 'Diseño premium de alta jerarquía con cabecera destacada, foto profesional y 2 columnas para directivos.',
    isAtsOptimized: true,
    columns: 2,
    idealFor: 'Senior / C-Level',
    component: ExecutiveTemplate,
  },
  minimalist: {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Diseño editorial suizo con abundante espacio en blanco, tipografía sutil y estética limpia sin bordes pesados.',
    isAtsOptimized: true,
    columns: 2,
    idealFor: 'Tech & Creativo',
    component: MinimalistTemplate,
  },
  'modern-split': {
    id: 'modern-split',
    name: 'Modern Split',
    description: 'Panel lateral de contraste para contacto, habilidades y foto, con línea de tiempo moderna para tu experiencia.',
    isAtsOptimized: true,
    columns: 2,
    idealFor: 'Moderno & Visual',
    component: ModernSplitTemplate,
  },
};

export const TEMPLATE_LIST = Object.values(TEMPLATES_REGISTRY);
