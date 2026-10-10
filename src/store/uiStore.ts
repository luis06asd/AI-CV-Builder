import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TemplateId, ThemeConfig } from '../types/template.types';
import type { BuilderActiveTab } from '../types/ui.types';
import { DEFAULT_THEME_CONFIG } from '../config/constants';

export interface UIStoreState {
  // Configuración de la plantilla y estilo visual
  selectedTemplateId: TemplateId;
  themeConfig: ThemeConfig;
  setSelectedTemplate: (id: TemplateId) => void;
  updateThemeConfig: (config: Partial<ThemeConfig>) => void;
  resetBuilderPreferences: () => void;

  // Navegación en el editor
  activeTab: BuilderActiveTab;
  setActiveTab: (tab: BuilderActiveTab) => void;

  // Zoom de la vista previa A4 (0.5 a 1.25)
  previewZoom: number;
  setPreviewZoom: (zoom: number) => void;

  // Estado para modal y llamadas de IA
  isJobMatchModalOpen: boolean;
  setJobMatchModalOpen: (open: boolean) => void;
  isAiLoading: boolean;
  setAiLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIStoreState>()(
  persist(
    (set) => ({
      selectedTemplateId: 'classic-ats',
      themeConfig: DEFAULT_THEME_CONFIG,
      setSelectedTemplate: (id) => set({ selectedTemplateId: id }),
      updateThemeConfig: (config) =>
        set((state) => ({
          themeConfig: { ...state.themeConfig, ...config },
        })),
      resetBuilderPreferences: () =>
        set({
          selectedTemplateId: 'classic-ats',
          themeConfig: DEFAULT_THEME_CONFIG,
          activeTab: 'personal',
          previewZoom: 0.85,
          isJobMatchModalOpen: false,
          isAiLoading: false,
        }),

      activeTab: 'personal',
      setActiveTab: (tab) => set({ activeTab: tab }),

      previewZoom: 0.85,
      setPreviewZoom: (zoom) => set({ previewZoom: zoom }),

      isJobMatchModalOpen: false,
      setJobMatchModalOpen: (open) => set({ isJobMatchModalOpen: open }),
      isAiLoading: false,
      setAiLoading: (loading) => set({ isAiLoading: loading }),
    }),
    {
      name: 'ai_cv_builder_ui_prefs',
      // Persistimos solo preferencias de diseño y plantilla, no estados efímeros de modals o loading
      partialize: (state) => ({
        selectedTemplateId: state.selectedTemplateId,
        themeConfig: state.themeConfig,
      }),
    }
  )
);
