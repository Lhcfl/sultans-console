<template>
  <v-card prepend-icon="mdi-bag-personal-outline" title="Cards">
    <v-card-text>
      <p class="my-2">下一个 UID 应该是 {{ card_uid_index }}</p>
      <v-text-field
        v-model="query"
        label="搜索"
        placeholder="卡片id、名称、描述"
        prepend-inner-icon="mdi-select-search"
      />
      <v-data-table :headers :items="displayCards" :search="query">
        <template #item.json="{ item }">
          <v-btn @click="showJson(item.json)">查看</v-btn>
        </template>
        <template #item.卡片数量="{ item }">
          <v-btn @click="cloneCard(item.json)">克隆</v-btn>
        </template>
      </v-data-table>
    </v-card-text>
    <v-dialog v-model="showJsonDialog">
      <v-card class="w-[75%] m-auto" title="JSON">
        <v-card-text class="overflow-auto">
          <pre><code>{{ jsonDialogText }}</code></pre>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showJsonDialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { CardsDefination } from '@/gamedata/cards';

console.log(CardsDefination);

const app = useAppStore();

const query = ref('');
const showJsonDialog = ref(false);
const jsonDialogText = ref('');

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
      level: ['', '石', '铜', '银', '金'][def.rare],
      name: def.name,
      count: card.count,
      text: def.text,
      is_only: Boolean(def.is_only),
      json: JSON.stringify(card, undefined, 2),
    };
  })
);

const headers = computed(() => [
  { text: 'UID', value: 'uid' },
  { text: '卡片id', value: 'id' },
  { text: '等阶', value: 'level' },
  { text: '卡片名称', value: 'name' },
  { text: '卡片数量', value: 'count' },
  { text: '描述', value: 'text' },
  { text: 'json', value: 'json' },
]);

function showJson (text: string) {
  jsonDialogText.value = text;
  showJsonDialog.value = true;
}

function cloneCard (json: string) {
  const newCard = { ...JSON.parse(json), uid: card_uid_index.value };
  card_uid_index.value++;
  app.autoSaveJson!.cards.push(newCard);
}

function setCardCount (uid: number, count: number) {
  app.autoSaveJson!.cards = app.autoSaveJson!.cards.map(card =>
    card.uid === uid
      ? {
        ...card,
        count,
      }
      : card
  );
}
</script>
