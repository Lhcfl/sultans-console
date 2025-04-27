<template>
  <v-dialog v-model="model">
    <v-card class="w-[75%] m-auto" title="添加卡片">
      <v-card-text>
        <p class="my-2">下一个 UID 应该是 {{ card_uid_index }}</p>
        <v-text-field
          v-model="query"
          label="搜索"
          placeholder="卡片id、名称、描述"
          prepend-inner-icon="mdi-select-search"
        />
        <v-data-table :headers :items="displayCards" :search="query">
          <template #item.level="{ item }">
            <v-chip :color="[undefined, 'grey', 'green', 'black', 'orange'][item.level]">
              {{ ['', '石', '铜', '银', '金'][item.level] }}
            </v-chip>
          </template>
          <template #item.text="{item}">
            <p class="mt-1 flex flex-wrap gap-1"><v-chip v-for="(count, name) in item.tags" :key="name" size="small">{{ name }} {{ count }}</v-chip></p>
            <p>{{ item.text }}</p>
          </template>
          <template #item.operations="{ item }">
            <div class="flex gap-2">
              <v-btn variant="tonal" @click="addCard(item.id)">添加</v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="model = false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import CardsDefination from '@/gamedata/cards.json';
import { useAppStore } from '@/stores/app';
const app = useAppStore();

const query = ref('');
const model = defineModel<boolean>({ required: true });

const card_uid_index = computed({
  get: () => app.autoSaveJson!.card_uid_index,
  set: value => {
    app.autoSaveJson!.card_uid_index = value;
  },
});

const displayCards = computed(() =>
  Object.entries(CardsDefination).map(([key, card]) => {
    return {
      id: key,
      level: card.rare,
      name: card.name,
      text: card.text,
      tags: card.tag,
    };
  })
);

const headers = computed(() => [
  { title: '卡片id', key: 'id' },
  { title: '等阶', key: 'level' },
  { title: '卡片名称', key: 'name' },
  { title: '描述', key: 'text' },
  { title: '操作', key: 'operations' },
]);

function addCard (id: string) {
  const card = CardsDefination[id as keyof typeof CardsDefination];
  if (!card) return;
  app.autoSaveJson!.cards.push({
    uid: card_uid_index.value,
    id: card.id,
    tag: '已拥有' in card.tag ? {} : { 'own': 1 },
    count: 1,
    equip_slots: [],
    life: 0,
    rareup: 0,
    custom_name: '',
    custom_text: '',
    equips: [],
    bag: 0,
    bagpos: 0,
  });
  card_uid_index.value++;
}
</script>
