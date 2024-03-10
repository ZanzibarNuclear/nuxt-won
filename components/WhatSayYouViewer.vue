<template>
  <div class="my-24 py-4 border-y">
    <div class="text-2xl">These are the things you have said.</div>
    <ul class="mt-6">
      <li v-for="item in wsy.statements" key="index">
        <span v-html="beautify(item)" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useWsyStore } from '@/stores/wsyStore'
const wsy = useWsyStore()

const beautify = (raw) => {
  return raw.replaceAll(/\n/g, '<br/>')
}
</script>

<style lang="scss" scoped>
li {
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid lightblue;
}
</style>
