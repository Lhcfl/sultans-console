<template>
  <SaveUpload v-if="app.autoSaveJson == null" />
  <v-container v-else>
    <SudanGlobal class="w-full mb-4" />
    <SudanBag class="w-full mb-4" />
    <SudanJson class="w-full mb-4" />
  </v-container>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app';
const app = useAppStore();
</script>
