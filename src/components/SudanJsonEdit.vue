<template>
  <v-dialog v-model="model">
    <v-card class="w-[75%] m-auto" title="修改">
      <v-card-text>
        <v-textarea
          v-model="editJsonText"
          auto-grow
          class="font-mono"
          :error-messages="errors"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="editJsonAction">提交</v-btn>
        <v-btn @click="model = false">关闭</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

const props = defineProps<{
  json: string;
  submit: (text: string) => Promise<void>;
}>();

const errors = ref<string[]>([]);
const editJsonText = ref(props.json);
const model = defineModel<boolean>({ required: true });

async function editJsonAction () {
  errors.value = [];
  try {
    await props.submit(editJsonText.value);
    model.value = false;
  } catch (e) {
    if (e instanceof Error) {
      errors.value.push(e.message);
    } else {
      errors.value.push(String(e));
    }
  }
}

</script>
