<template>
  <v-theme-provider :theme>
    <v-app>
      <router-view />
    </v-app>
  </v-theme-provider>
</template>

<script lang="ts" setup>
import { useAppStore } from './stores/app';

const app = useAppStore();
const theme = computed(() => app.lightMode == null ? undefined : app.lightMode ? 'light' : 'dark');
</script>
