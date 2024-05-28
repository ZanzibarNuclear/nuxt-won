<template>
  <div v-if="edit">
    <div>
      <UFormGroup label="Figure URL">
        <UInput v-model="details.src" />
      </UFormGroup>
      <UFormGroup label="Caption">
        <UInput v-model="details.caption" />
      </UFormGroup>
      <UFormGroup label="Border style">
        <USelect v-model="details.border" :options="borderOptions" />
      </UFormGroup>
      <div>
        <UButton @click="commit" label="Update" class="mx-1" />
        <UButton @click="cancel" label="Cancel" class="mx-1" />
      </div>
    </div>
  </div>
  <div v-if="!edit && !preview">
    <div>URL of image: {{ details.src }}</div>
    <div>Caption: {{ details.caption }}</div>
    <div>Border style: {{ details.border }}</div>
  </div>
  <div v-if="preview">
    <div :class="details.border">
      <NuxtImg
        v-if="details.src"
        :src="details.src"
        :title="details.caption"
        :width="details.width"
      />
    </div>
    <div class="text-center">{{ details.caption }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['fields', 'edit', 'preview'])
const emit = defineEmits(['save', 'cancel'])

const borderOptions = ['solid', 'dashed', 'light', 'shadow']

const details = ref({
  src: null,
  caption: '',
  border: 'solid',
  width: null,
})

onMounted(() => {
  details.value = {
    src: props.fields.src,
    caption: props.fields.caption,
    border: props.fields.border,
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

<style scoped>
.solid {
  border: 1px gray solid;
}
.dashed {
  border: 1px gray dashed;
}
.light {
  border: 1px lightgoldenrodyellow solid;
}
.shadow {
  box-shadow: 3px;
}
</style>
