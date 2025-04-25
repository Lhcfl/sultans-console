<template>
  <v-card prepend-icon="mdi-file-cabinet" title="存档">
    <v-card-text>
      <v-alert color="red" variant="tonal">⚠️改存档有风险，覆盖前先备份</v-alert>
      <h3 class="text-lg my-2">全局属性</h3>
      <v-form class="flex gap-2 flex-wrap">
        <v-text-field v-model="app.autoSaveJson!.name" class="w-full" label="玩家名称" />
        <v-text-field v-model.number="app.autoSaveJson!.sudan_card_init_life" class="w-70" label="苏丹卡初始限时" type="number" />
        <v-text-field v-model.number="app.autoSaveJson!.sudan_redraw_times_recovery_round" class="w-70" label="每n天重置苏丹卡重抽次数" type="number" />
        <v-text-field v-model.number="app.autoSaveJson!.sudan_redraw_times_per_round" class="w-70" label="每次重置，苏丹卡重抽次数" type="number" />
        <v-text-field v-model.number="app.autoSaveJson!.sudan_redraw_times" class="w-70" label="已经用掉的重抽次数" type="number" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        prepend-icon="mdi-download"
        @click="save"
      >
        下载被修改的存档文件 <code>auto_save.json</code>
      </v-btn>
      <v-btn
        prepend-icon="mdi-reload"
        @click="refresh"
      >
        算了，放弃修改（刷新页面）
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';

const app = useAppStore();

function save () {
  const data = JSON.stringify(app.autoSaveJson, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'auto_save.json';
  a.click();
  URL.revokeObjectURL(url);
}

function refresh () {
  window.location.reload();
}
</script>
