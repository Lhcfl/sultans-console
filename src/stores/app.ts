// Utilities
import type { SaveFile } from '@/types/save';
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  // autosave.json
  const autoSaveJson = ref<SaveFile | null>(null);
  const lightMode = ref<boolean | null>((() => {
    const mode = localStorage.getItem('sudan-console-lightMode');
    if (mode === 'true') { return true; }
    if (mode === 'false') { return false; }
    return null;
  })());
  watch(lightMode, val => {
    if (val === null) {
      localStorage.removeItem('sudan-console-lightMode');
    }
    else {
      localStorage.setItem('sudan-console-lightMode', val.toString());
    }
  })
  return {
    autoSaveJson,
    lightMode,
  }
})
