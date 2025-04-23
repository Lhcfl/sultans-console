<template>
  <SaveUpload v-if="app.autoSaveJson == null" />
  <div v-else>
    <SaveDump></SaveDump>
    <SudanBag></SudanBag>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';
const app = useAppStore();
</script>
