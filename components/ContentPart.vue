<template>
  <div class="field">
    <div class="mb-2">
      <UButton icon="i-ph-pencil" @click="setEdit" class="mr-2" />
      <UButton
        icon="i-ph-trash"
        @click="handleDelete"
        class="mr-2"
        color="amber"
      />
    </div>
    <div>
      <ContentPartHtml
        v-if="part.type === LessonContentEnum.html"
        :fields="part.details"
        :edit="edit"
        :preview="preview"
        @save="handleChanges"
        @cancel="setReadOnly"
      />
      <ContentPartImage
        v-if="part.type === LessonContentEnum.image"
        :fields="part.details"
        :edit="edit"
        :preview="preview"
        @save="handleChanges"
        @cancel="setReadOnly"
      />
      <ContentPartFormula
        v-if="part.type === LessonContentEnum.formula"
        :fields="part.details"
        :edit="edit"
        :preview="preview"
        @save="handleChanges"
        @cancel="setReadOnly"
      />
      <ContentPartFigure
        v-if="part.type === LessonContentEnum.figure"
        :fields="part.details"
        :edit="edit"
        :preview="preview"
        @save="handleChanges"
        @cancel="setReadOnly"
      />
      <ContentPartVideo
        v-if="part.type === LessonContentEnum.video"
        :fields="part.details"
        :edit="edit"
        :preview="preview"
        @save="handleChanges"
        @cancel="setReadOnly"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { saveContentPart, deleteContentPart } from '~/db/ContentPartModel'
import { LessonContentEnum } from '~/types/won-types'

const props = defineProps(['part'])
const emit = defineEmits(['cacheUpdatedPart', 'removePart'])
const edit = ref(false)
const preview = ref(false)

const setReadOnly = () => {
  edit.value = false
}
const setEdit = () => {
  edit.value = true
}
const handleDelete = () => {
  deleteContentPart(props.part.publicKey)
  emit('removePart', props.part.publicKey)
}
const handleChanges = async (details) => {
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
    const update = await saveContentPart(input)
    // need to cache the return value --- move caching logic to workshop store; but for now can emit
    emit('cacheUpdatedPart', update)
  } else {
    // otherwise, save -- which is unexpected at this point
    console.error('expected to be editing stored parts')
    // const minted = await createContentPart(input)
  }

  setReadOnly()
}
</script>

<style scoped>
.field {
  display: grid;
  grid-template-columns: 100px 1fr;
  border: 1px purple dashed;
  padding: 0.5rem;
  margin: 0.5rem 0;
}
</style>
