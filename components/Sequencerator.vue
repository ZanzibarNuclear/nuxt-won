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
      {{ item.publicKey }} {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['itemsToSequence'])
const emit = defineEmits(['saveSequence'])

const items = ref([...props.itemsToSequence])

const up = (index) => {
  console.log('move part earlier in sequence - lower number', index)
  const switched = [
    ...items.value.slice(0, index),
    items.value.at(index + 1),
    items.value.at(index),
  ]
  if (items.value.length > index + 1) {
    switched.push(...items.value.slice(index + 2))
  }
  items.value = switched
}
const down = (index) => {
  console.log('move part later in sequence - higher number', index)
}

const handleSaveSequence = () => {
  emit('saveSequence', items)
}
</script>
