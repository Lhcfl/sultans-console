<template>
  <v-container class="fill-height" max-width="900">
    <div class="mt-8 w-full text-center">
      <v-img
        class="mb-4"
        height="150"
        src="@/assets/logo.png"
      />

      <div class="mb-8 text-center">
        <h1 class="text-3xl mb-4">苏丹的终端</h1>
        <p>伟大的苏丹有一个魔法的控制台，现在他将权限赐予给你……</p>
      </div>

      <v-btn prepend-icon="mdi-upload" @click="upload">
        上传存档文件 <code>auto_save.json</code>
      </v-btn>
      <v-alert class="faq mt-4 bg-primary-low text-left" color="primary" variant="tonal">
        <p>Q: 在哪？</p>
        <p>A: 一般在 <code>C:\Users\你的名字\AppData\LocalLow\DoubleCross\SultansGame\SAVEDATA\一串数字</code> 这个文件夹下。</p>
      </v-alert>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/app'


function upload () {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      const file = target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        const content = e.target?.result
        if (content) {
          useAppStore().autoSaveJson = JSON.parse(content as string);
        }
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

</script>
