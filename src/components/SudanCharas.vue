<template>
  <v-card prepend-icon="mdi-bag-personal-outline" title="角色">
    <v-card-text>
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
          <v-btn variant="tonal" @click="showJson(item.json)">查看</v-btn>
        </template>
        <template #item.tag="{ item }">
          <v-btn variant="tonal" @click="showEditCardTag(item)">修改</v-btn>
        </template>
        <template #item.equip_slots="{ item }">
          <div class="flex gap-2 mt-2">
            <v-chip color="primary" @click="addSlot(item.uid, 'weapon')">+ 武器</v-chip>
            <v-chip color="primary" @click="addSlot(item.uid, 'cloth')">+ 衣服</v-chip>
            <v-chip color="primary" @click="addSlot(item.uid, 'accessory')">+ 装饰</v-chip>
            <v-chip color="primary" @click="addSlot(item.uid, 'animal_handling')">+ 驯兽</v-chip>
          </div>
          <div class="flex gap-2 flex-wrap my-2">
            <v-chip
              v-for="name in item.equip_slots"
              :key="`${name}-${Math.random()}`"
              closable
              :text="name"
              @click:close="removeSlot(item.uid, name)"
            />
          </div>
        </template>
        <template #item.text="{item}">
          <p class="mt-1 flex flex-wrap gap-1"><v-chip v-for="(count, name) in item.tags" :key="name" size="small">{{ name }} {{ count }}</v-chip></p>
          <p>{{ item.text }}</p>
        </template>
      </v-data-table>
    </v-card-text>
    <!-- 角色 Tags 修改对话框 -->
    <v-dialog v-model="showEditTagDialog">
      <SudanTagEdit v-model="showEditTagDialog" :uid="tagEditingId" />
    </v-dialog>
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
import _CardsDefination from '@/gamedata/cards.json';
import type { ICardDefination } from '@/gamedata/cards';

const CardsDefination = _CardsDefination as Record<string, ICardDefination>;

const app = useAppStore();

const query = ref('');
const showJsonDialog = ref(false);
const jsonDialogText = ref('');
const showEditTagDialog = ref(false);
const tagEditingId = ref<number>();


const displayCards = computed(() =>
  app.autoSaveJson!.cards.map(card => {
    const def = CardsDefination[card.id.toString()];
    return {
      uid: card.uid,
      id: card.id,
      level: def.rare,
      tag: card.tag,
      tags: Object.assign({}, card.tag, def.tag),
      name: def.name,
      text: def.text,
      def,
      equip_slots: card.equip_slots,
      json: JSON.stringify(card, undefined, 2),
    };
  }).filter(card => card.def.type === 'char')
);

const headers = computed(() => [
  { title: 'UID', key: 'uid' },
  { title: '卡片id', key: 'id' },
  { title: '等阶', key: 'level' },
  { title: '卡片名称', key: 'name' },
  { title: '标记', key: 'tag' },
  { title: '装备槽', key: 'equip_slots' },
  { title: '描述', key: 'text' },
  { title: 'json', key: 'json' },
]);

function showJson (text: string) {
  jsonDialogText.value = text;
  showJsonDialog.value = true;
}

function showEditCardTag (card: { uid: number }) {
  tagEditingId.value = card.uid;
  showEditTagDialog.value = true;
}

function removeSlot (uid: number, name: string) {
  console.log('removeFirstSlot', uid, name);
  app.autoSaveJson!.cards = app.autoSaveJson!.cards.map(card => {
    if (card.uid === uid) {
      card.equip_slots = card.equip_slots.filter(x => name !== x);
    }
    return card;
  });
}

function addSlot (uid: number, name: string) {
  console.log('addSlot', uid, name);
  app.autoSaveJson!.cards = app.autoSaveJson!.cards.map(card => {
    if (card.uid === uid) {
      card.equip_slots.push(name);
    }
    return card;
  });
}
</script>
