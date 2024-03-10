<template>
  <div class="my-24 py-4 border-y">
    <div class="text-2xl">These are the things you have said.</div>
    <ul class="mt-6">
      <li v-for="item in wsy.statements" key="index">
        <div class="text-green-300">{{ displayDateTime(item.createdOn) }}</div>
        <span v-html="beautify(item.statement)" />
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
const displayDateTime = (ts) => {
  const date = ts.getDate()
  const month = ts.getMonth()
  const year = ts.getFullYear()
  const hour = ts.getHours()
  const minute = ts.getMinutes()
  const second = ts.getSeconds()
  return `${date}-${month}-${year} at ${hour}:${minute}:${second}`
}
</script>

<style lang="scss" scoped>
li {
  padding-bottom: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid lightblue;
}
</style>
