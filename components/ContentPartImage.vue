<template>
  <div v-if="edit">
    <div>
      <UFormGroup label="Image URL">
        <UInput v-model="details.src" />
      </UFormGroup>
      <UFormGroup label="Alt text">
        <UInput v-model="details.alt" />
      </UFormGroup>
      <UFormGroup label="Width">
        <UInput v-model="details.width" />
      </UFormGroup>
      <div>
        <UButton @click="commit" label="Update" class="mx-1" />
        <UButton @click="cancel" label="Cancel" class="mx-1" />
      </div>
    </div>
  </div>
  <div v-if="!edit && !preview">
    <div>URL of image: {{ details.src }}</div>
    <div>Alternate text: {{ details.alt }}</div>
    <div>Width: {{ details.width }}</div>
  </div>
  <div v-if="preview" class="flex justify-center">
    <NuxtImg
      v-if="details.src"
      :src="details.src"
      :alt="details.alt"
      :title="details.alt"
      :width="details.width"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['fields', 'edit', 'preview'])
const emit = defineEmits(['save', 'cancel'])

const details = ref({
  src: null,
  alt: '',
  width: '300px',
})

onMounted(() => {
  details.value = {
    src: props.fields.src,
    alt: props.fields.alt,
    width: props.fields.width,
  }
})

const commit = () => {
  emit('save', details.value)
}
const cancel = () => {
  emit('cancel')
}
</script>

<style scoped></style>
