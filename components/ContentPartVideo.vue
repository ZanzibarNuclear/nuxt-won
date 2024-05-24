<template>
  <div v-if="edit">
    <div>
      <UFormGroup label="Video URL">
        <UInput v-model="details.url" />
      </UFormGroup>
      <UFormGroup label="Caption">
        <UInput v-model="details.caption" />
      </UFormGroup>
      <div>
        <UButton @click="commit" label="Update" class="mx-1" />
        <UButton @click="cancel" label="Cancel" class="mx-1" />
      </div>
    </div>
  </div>
  <div v-if="!edit && !preview">
    <div>Video URL: {{ details.url }}</div>
    <div>Caption: {{ details.caption }}</div>
  </div>
  <div v-if="preview">
    <div>TODO: Play video at '{{ details.url }}'</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['fields', 'edit', 'preview'])
const emit = defineEmits(['save', 'cancel'])

const details = ref({
  url: '',
  caption: '',
})

onMounted(() => {
  details.value = {
    url: props.fields.url,
    caption: props.fields.caption,
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
