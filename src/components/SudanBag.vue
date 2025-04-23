<template>
  <v-container class="fill-height" max-width="900">
    <v-card class="w-100" prepend-icon="mdi-bag-personal-outline" title="背包">
      <v-card-text>
        <p class="my-2">
          下一个 UID 应该是 {{ nextUid }}
        </p>
        <v-text-field
          v-model="query"
          prepend-inner-icon="mdi-select-search"
          label="搜索"
          placeholder="卡片id、名称、描述"
        ></v-text-field>
        <v-data-table :items="displayCards"></v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app";
import { CardsDefination } from "@/gamedata/cards";

console.log(CardsDefination);

const app = useAppStore();

const query = ref("");

const nextUid = app.autoSaveJson!.cards.map(c => c.uid).reduce((a, b) => Math.max(a, b), 0) + 1;

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
        唯一性: Boolean(def.is_only)
      };
    })
    .filter((card) => {
      if (query.value.trim())
        return (
          card.卡片id.toString().includes(query.value) ||
          card.卡片名称.includes(query.value) ||
          card.描述.includes(query.value)
        );
      else return true;
    })
);
</script>
