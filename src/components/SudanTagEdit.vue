<template>
  <v-card class="w-[75%] m-auto" title="修改Tag">
    <v-card-text>
      <v-alert class="text-amber mb-2" variant="tonal">
        有些属性并不适用于你在修改的卡片，不过我懒得写代码判断了，请自行判断
      </v-alert>
      <v-text-field
        v-model="search"
        hide-details
        label="搜索"
        placeholder="id、名称、描述"
        prepend-inner-icon="mdi-select-search"
      />
      <v-data-table :headers="headers" :items="items" :search="search">
        <template #item.val="{ item }">
          <v-number-input
            class="w-50"
            clearable
            density="compact"
            hide-details="auto"
            :max="item.max"
            :min="item.min"
            :model-value="item.val"
            @update:model-value="(val) => updateCardTag(item.id, val)"
          />
        </template>
        <template #item.others="{ item }">
          <div>
            <v-chip v-if="!item.can_visible" size="small">不可见属性</v-chip>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions v-if="showClose">
      <v-btn @click="model = false">关闭</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import TagDefinations from '@/gamedata/tag.json';

const props = withDefaults(
  defineProps<{
    uid?: number;
    showClose?: boolean;
  }>(),
  {
    showClose: true,
  }
);

const model = defineModel<boolean>();
const app = useAppStore();

const search = ref('');

const items = computed(() => {
  const chara = app.autoSaveJson!.cards.find(card => card.uid === props.uid);
  if (!chara) return [];
  return Object.entries(TagDefinations).map(([key, def]) => ({
    id: key,
    name: def.name,
    val: (chara.tag as Record<string, number | undefined>)[key],
    text: def.text,
    max: def.can_add ? 65535 : 1,
    min: def.can_nagative_and_zero ? -65535 : 1,
    can_visible: def.can_visible,
  }));
});

const headers = computed(() => [
  { title: 'ID', key: 'id' },
  { title: '名称', key: 'name' },
  { title: '值', key: 'val' },
  { title: '描述', key: 'text' },
  { title: '注释', key: 'others' },
]);

const updateCardTag = (key: string, val: number | undefined) => {
  const card = app.autoSaveJson!.cards.find(card => card.uid === props.uid);
  if (card) {
    if (val == null) {
      delete card.tag[key];
    } else {
      card.tag[key] = val;
    }
  }
};
</script>
