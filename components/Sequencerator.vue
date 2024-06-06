<template>
  <div>
    <UButton
      label="Save sort order"
      size="sm"
      icon="i-ph-cloud-arrow-up"
      @click="handleSaveSequence"
      class="my-4"
    />
    <div v-for="(item, index) in items">
      <UButton
        v-if="index > 0"
        icon="i-ph-arrow-up"
        @click="up(index)"
        class="mx-2"
      />
      <UButton v-else icon="i-ph-tree-palm" class="mx-2" />
      <UButton
        v-if="index < items.length - 1"
        icon="i-ph-arrow-down"
        @click="down(index)"
        class="mx-2"
      />
      <UButton v-else icon="i-ph-tree-palm" class="mx-2" />
      {{ item.publicKey }}
      {{ truncateString(JSON.stringify(item.details), 30) }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['itemsToSequence'])
const emit = defineEmits(['saveSequence'])

const items = ref([...props.itemsToSequence])

function truncateString(str: string, length: number) {
  if (str.length > length) {
    return str.substring(0, length) + '...'
  } else {
    return str
  }
}
const moveItem = (from: number, to: number) => {
  const itemToMove = items.value.splice(from, 1)
  items.value.splice(to, 0, itemToMove[0])
  console.log(items.value)
}
const up = (index: number) => {
  moveItem(index, index - 1)
}
const down = (index: number) => {
  moveItem(index, index + 1)
}

const handleSaveSequence = () => {
  let cnt = 1
  items.value.forEach((item) => (item.sequence = cnt++))
  emit('saveSequence', items.value)
}
</script>
