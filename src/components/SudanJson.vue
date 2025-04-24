<template>
  <v-card title="完整的JSON">
    <v-card-text class="overflow-auto h-100">
      <pre><code>{{ json }}</code></pre>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { useAppStore } from '@/stores/app';

const json = computed(() => JSON.stringify(useAppStore().autoSaveJson, undefined, 2));
</script>
