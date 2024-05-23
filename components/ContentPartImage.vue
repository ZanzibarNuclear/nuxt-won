<template>
  <div v-if="edit">
    <div>
      <UFormGroup label="Image URL">
        <UInput v-model="src" />
      </UFormGroup>
      <UFormGroup label="Alt text">
        <UInput v-model="alt" />
      </UFormGroup>
      <div>
        <UButton @click="commit" label="Update" class="mx-1" />
        <UButton @click="cancel" label="Cancel" class="mx-1" />
      </div>
    </div>
  </div>
  <div v-if="!edit">
    <div>URL of image: {{ fields.src }}</div>
    <div>Alternate text: {{ fields.alt }}</div>
    <img v-if="fields.src" :src="fields.src" :alt="fields.alt" width="300px" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['fields', 'edit'])
const emit = defineEmits(['setChanges', 'close'])

const src = ref()
const alt = ref()

onMounted(() => {
  src.value = props.fields.src
  alt.value = props.fields.alt
})

const commit = () => {
  emit('setChanges', { src: src.value, alt: alt.value })
}
const cancel = () => {
  emit('close')
}
</script>

<style scoped></style>
