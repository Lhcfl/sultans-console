<template>
  <v-card prepend-icon="mdi-file-cabinet" title="存档">
    <v-card-text>
      <v-alert
        color="red"
        variant="tonal"
      >⚠️改存档有风险，覆盖前先备份</v-alert>
      <h3 class="my-2">全局属性</h3>
      <v-form class="flex gap-2 flex-wrap">
        <v-text-field v-model="app.autoSaveJson!.name" class="w-full" label="玩家名称" />
        <v-text-field v-model.number="app.autoSaveJson!.sudan_card_init_life" class="w-70" label="苏丹卡初始限时" type="number" />
        <v-text-field v-model.number="app.autoSaveJson!.sudan_redraw_times_recovery_round" class="w-70" label="每n天重置苏丹卡重抽次数" type="number" />
        <v-text-field v-model.number="app.autoSaveJson!.sudan_redraw_times_per_round" class="w-70" label="每次重置，苏丹卡重抽次数" type="number" />
        <v-text-field v-model.number="app.autoSaveJson!.sudan_redraw_times" class="w-70" label="已经用掉的重抽次数" type="number" />
      </v-form>
      <h4 class="my-2">计数器</h4>
      <v-form class="flex gap-2 flex-wrap">
        <v-text-field
          v-for="counter in editable_counters"
          :key="counter.id"
          v-model.number="app.autoSaveJson!.counter[counter.id]"
          class="w-70"
          :clearable="counter.clearable"
          :label="`${counter.name} (${counter.id})`"
          @click:clear="remove_counter(counter.id)"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" prepend-icon="mdi-download" @click="save">
        下载被修改的存档文件 <code>auto_save.json</code>
      </v-btn>
      <v-btn prepend-icon="mdi-reload" @click="refresh">
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

// 我也不知道其他 counters 是什么意思……
const editable_counters = computed(() => [
  { id: '7100001', name: '善名' },
  { id: '7100002', name: '恶名' },
  { id: '7100003', name: '权势' },
  { id: '7100004', name: '侠名' },
  { id: '7100005', name: '灵视' },
  { id: '7100006', name: '金骰子' },
  { id: '7100007', name: '回到前一天次数', clearable: true },
]);

function remove_counter (counter: string) {
  if (app.autoSaveJson) {
    delete app.autoSaveJson.counter[counter];
  }
}
</script>
