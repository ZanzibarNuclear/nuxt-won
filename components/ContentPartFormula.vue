<template>
  <div v-if="edit">
    <div>
      <UFormGroup label="Latex expression">
        <UInput v-model="details.latex" />
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
    <div>Latex expression: {{ details.latex }}</div>
    <div>Caption: {{ details.caption }}</div>
  </div>
  <div v-if="preview">
    <div>TODO: Render equation</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['fields', 'edit', 'preview'])
const emit = defineEmits(['save', 'cancel'])

const details = ref({
  latex: '',
  caption: '',
})

onMounted(() => {
  details.value = {
    latex: props.fields.latex,
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
