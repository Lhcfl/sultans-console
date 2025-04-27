<template>
  <v-card prepend-icon="mdi-bag-personal-outline" title="卡片">
    <v-card-text>
      <p class="flex items-center my-2 gap-2">
        <span>下一个 UID 应该是 {{ card_uid_index }}</span>
        <v-btn @click="showAddCard = true">添加卡片</v-btn>
      </p>
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
        <template #item.json="{ item }">
          <v-btn variant="tonal" @click="showJson(item.uid, item.json)">查看</v-btn>
        </template>
        <template #item.count="{ item }">
          <div class="flex items-center gap-2">
            <v-number-input
              class="w-50"
              density="compact"
              :disabled="item.is_only"
              hide-details
              :min="1"
              :model-value="item.count"
              @update:model-value="count => setCardCount(item.uid, count)"
            />
            <v-btn variant="tonal" @click="cloneCard(item.json)">克隆</v-btn>
          </div>
        </template>
        <template #item.text="{item}">
          <p class="mt-1 flex flex-wrap gap-1"><v-chip v-for="(count, name) in item.tags" :key="name" size="small">{{ name }} {{ count }}</v-chip></p>
          <p>{{ item.text }}</p>
        </template>
      </v-data-table>
    </v-card-text>
    <SudanJsonEdit :key="jsonEditingId" v-model="showJsonDialog" :json="jsonDialogText" :submit="editCardJson" />
    <SudanAddCard v-model="showAddCard" />
  </v-card>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import _CardsDefination from '@/gamedata/cards.json';
import type { ICardDefination } from '@/gamedata/cards';
import { debounce } from 'vuetify/lib/util/helpers.mjs';

const CardsDefination = _CardsDefination as Record<string, ICardDefination>;

const app = useAppStore();

const query = ref('');
const showJsonDialog = ref(false);
const showAddCard = ref(false);
const jsonDialogText = ref('');
const jsonEditingId = ref(0);

const card_uid_index = computed({
  get: () => app.autoSaveJson!.card_uid_index,
  set: value => {
    app.autoSaveJson!.card_uid_index = value;
  },
});

const displayCards = computed(() =>
  app.autoSaveJson!.cards.map(card => {
    const def = CardsDefination[card.id.toString()];
    return {
      uid: card.uid,
      id: card.id,
      level: def.rare,
      name: def.name,
      count: card.count,
      text: def.text,
      is_only: !('可堆叠' in def.tag),
      tags: Object.assign({}, card.tag, def.tag),
      json: JSON.stringify(card, undefined, 2),
    };
  })
);

const headers = computed(() => [
  { title: 'UID', key: 'uid' },
  { title: '卡片id', key: 'id' },
  { title: '等阶', key: 'level' },
  { title: '卡片名称', key: 'name' },
  { title: '卡片数量', key: 'count' },
  { title: '描述', key: 'text' },
  { title: 'json', key: 'json' },
]);

function showJson (uid: number, text: string) {
  jsonDialogText.value = text;
  jsonEditingId.value = uid;
  showJsonDialog.value = true;
}

function cloneCard (json: string) {
  const newCard = { ...JSON.parse(json), uid: card_uid_index.value };
  card_uid_index.value++;
  app.autoSaveJson!.cards.push(newCard);
}

const setCardCount = debounce((uid: number, count: number) => {
  console.log('setCardCount', uid, count);
  app.autoSaveJson!.cards = app.autoSaveJson!.cards.map(card =>
    card.uid === uid
      ? {
        ...card,
        count,
      }
      : card
  );
}, 200);

async function editCardJson (json: string) {
  app.autoSaveJson!.cards = app.autoSaveJson!.cards.map(card =>
    card.uid === jsonEditingId.value
      ? JSON.parse(json)
      : card
  );
}
</script>
