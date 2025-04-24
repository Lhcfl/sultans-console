<template>
  <v-footer app border color="secondary">
    <v-footer-action />
    <v-btn
      v-for="item in items"
      :key="item.title"
      class="d-inline-block mx-2 social-link"
      :href="item.href"
      :icon="item.icon"
      rel="noopener noreferrer"
      size="small"
      target="_blank"
      :title="item.title"
      variant="text"
      @click.prevent.stop="item.action"
    />
  </v-footer>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';

const app = useAppStore();
const items = computed(() => [
  {
    title: 'Light mode',
    icon: 'mdi-lightbulb-on',
    action: () => (app.lightMode = true),
  },
  {
    title: 'Dark mode',
    icon: 'mdi-lightbulb-off',
    action: () => (app.lightMode = false),
  },
  {
    title: 'Follow Device',
    icon: 'mdi-cellphone',
    action: () => (app.lightMode = null),
  },
] as { title: string; icon: string; action?: () => void, href?: string }[]);
</script>
