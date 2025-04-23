// Utilities
import type { SaveFile } from '@/types/save';
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {

  // autosave.json
  const autoSaveJson = ref<SaveFile | null>(null);

  return {
    autoSaveJson,
  }
})
