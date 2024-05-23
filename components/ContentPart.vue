<template>
  <div class="field">
    <UButton icon="i-ph-pencil" @click="setEdit" />
    <ContentPartHtml
      v-if="part.type === 'html'"
      :fields="part.details"
      :edit="edit"
      :preview="preview"
      @save="handleChanges"
      @cancel="setReadOnly"
    />
    <ContentPartImage
      v-if="part.type === 'image'"
      :fields="part.details"
      :edit="edit"
      :preview="preview"
      @save="handleChanges"
      @cancel="setReadOnly"
    />
    <ContentPartFormula
      v-if="part.type === 'formula'"
      :fields="part.details"
      :edit="edit"
      :preview="preview"
      @save="handleChanges"
      @cancel="setReadOnly"
    />
    <ContentPartFigure
      v-if="part.type === 'figure'"
      :fields="part.details"
      :edit="edit"
      :preview="preview"
      @save="handleChanges"
      @cancel="setReadOnly"
    />
    <ContentPartVideo
      v-if="part.type === 'video'"
      :fields="part.details"
      :edit="edit"
      :preview="preview"
      @save="handleChanges"
      @cancel="setReadOnly"
    />
  </div>
</template>

<script setup lang="ts">
import { createContentPart } from '~/db/ContentPartModel'

const props = defineProps(['part'])
const edit = ref(false)
const preview = ref(false)

const setReadOnly = () => {
  edit.value = false
}
const setEdit = () => {
  edit.value = true
}
const handleChanges = (details) => {
  console.log('commit changes', details)
  // detect changes - compare prop.details to details

  // put together payload
  const input = {
    ...props.part,
    details,
  }
  console.log('saving...', input)

  // if changes detected, save changes - use IDs or public key
  if (props.part?.publicKey) {
    // update
    console.log('update existing part')
  } else {
    // otherwise, save
    console.log('new part')
    createContentPart(input)
  }

  setReadOnly()
}
</script>

<style scoped>
.field {
  border: 1px purple dashed;
  padding: 0.5rem;
  margin: 0.5rem 0;
}
</style>
