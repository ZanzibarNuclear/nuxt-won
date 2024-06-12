<template>
  <div v-if="edit">
    <div>
      <UFormGroup label="Image URL">
        <UInput v-model="details.src" />
      </UFormGroup>
      <UFormGroup
        label="Alt text"
        description="Good for screen readers and SEO. Shows up for broken images."
      >
        <UInput v-model="details.alt" />
      </UFormGroup>
      <UFormGroup label="Width & Height" hint="optional">
        <div class="flex">
          <UInput v-model="details.width" placeholder="width" />
          <UInput v-model="details.height" placeholder="height" />
        </div>
      </UFormGroup>
      <UFormGroup
        label="Caption"
        hint="good idea!"
        description="Something clear and interesting. Appears on screen below the image."
      >
        <UInput v-model="details.caption" />
      </UFormGroup>
      <UFormGroup
        label="Credit"
        description="Use when credit is due for licensing reasons or as a courtesy."
      >
        <UInput v-model="details.credit.name" placeholder="Name of owner" />
        <UInput v-model="details.credit.url" placeholder="URL to original" />
      </UFormGroup>
      <UFormGroup
        label="Background color"
        description="For framing the picture. Prevents problems with light/dark theme changes."
        hint="optional"
      >
        <UInput v-model="details.bgColor" />
      </UFormGroup>
      <div>
        <UButton @click="commit" label="Update" class="mx-1" />
        <UButton @click="cancel" label="Cancel" class="mx-1" />
      </div>
    </div>
  </div>
  <div v-if="!edit && !preview">
    <div><span class="font-bold">Image location:</span> {{ details.src }}</div>
    <div><span class="font-bold">Caption:</span> {{ details.caption }}</div>
    <div>
      <span class="font-bold">Credit:</span> {{ details.credit?.name }} @
      <NuxtLink v-if="details.credit?.url" :to="details.credit.url">{{
        details.credit.url
      }}</NuxtLink>
    </div>
    <div><span class="font-bold">Alternate text:</span> {{ details.alt }}</div>
    <div>
      <span class="font-bold">Width:</span> {{ details.width || 'n/a' }}
      <span class="font-bold">Height:</span> {{ details.height || 'n/a' }}
      <span class="font-bold">Background:</span> {{ details.bgColor }}
    </div>
  </div>
  <div v-if="preview">
    <ContentImageView :image="details" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['fields', 'edit', 'preview'])
const emit = defineEmits(['save', 'cancel'])

const details = reactive({
  src: null,
  alt: null,
  width: null,
  height: null,
  caption: null,
  credit: { name: null, url: null },
  bgColor: null,
})

onMounted(() => {
  details.src = props.fields.src
  details.alt = props.fields.alt
  details.width = props.fields.width
  details.height = props.fields.height
  details.caption = props.fields.caption
  details.credit.name = props.fields.credit?.name
  details.credit.url = props.fields.credit?.url
  details.bgColor = props.fields.bgColor
})

const commit = () => {
  emit('save', details)
}
const cancel = () => {
  emit('cancel')
}
</script>

<style scoped></style>
