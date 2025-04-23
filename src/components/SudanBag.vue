<template>
<v-card class="w-100" prepend-icon="mdi-bag-personal-outline" title="背包">
  <v-card-text>
    <p class="my-2">
      下一个 UID 应该是 {{ card_uid_index }}
    </p>
    <v-text-field
      v-model="query"
      prepend-inner-icon="mdi-select-search"
      label="搜索"
      placeholder="卡片id、名称、描述"
    ></v-text-field>
    <v-data-table :items="displayCards" :search="query">
      <template v-slot:item.json="{ item }">
        <v-btn @click="showJson(item.json)">查看</v-btn>
      </template>
    </v-data-table>
  </v-card-text>
</v-card>
<v-dialog v-model="showJsonDialog">
  <v-card class="w-75 ma-auto" title="JSON">
    <v-card-text class="overflow-auto">
      <pre><code>{{ jsonDialogText }}</code></pre>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="showJsonDialog = false">关闭</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { CardsDefination } from "@/gamedata/cards";

console.log(CardsDefination);

const app = useAppStore();

const query = ref("");
const showJsonDialog = ref(false);
const jsonDialogText = ref("");

const card_uid_index = computed({
  get: () => app.autoSaveJson!.card_uid_index,
  set: (value) => {
    app.autoSaveJson!.card_uid_index = value;
  }
});

const displayCards = computed(() =>
  app
    .autoSaveJson!.cards.map((card) => {
      const def = CardsDefination[card.id.toString() as any];
      return {
        唯一id: card.uid,
        卡片id: card.id,
        等阶: ["", "石", "铜", "银", "金"][def.rare],
        卡片名称: def.name,
        卡片数量: card.count,
        描述: def.text,
        唯一性: Boolean(def.is_only),
        json: JSON.stringify(card, undefined, 2),
      };
    })
);

function showJson(text: string) {
  jsonDialogText.value = text;
  showJsonDialog.value = true;
}
</script>
