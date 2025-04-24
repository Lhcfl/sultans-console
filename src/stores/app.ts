// Utilities
import type { SaveFile } from '@/types/save';
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {

  // autosave.json
  const autoSaveJson = ref<SaveFile | null>(null);

  const lightMode = ref<boolean | null>(null);

  return {
    autoSaveJson,
    lightMode,
  }
})
