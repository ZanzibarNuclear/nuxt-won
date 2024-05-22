<template>
  <h1>Try Quill Editor</h1>
  <div class="my-6">
    <h3>Thing One</h3>
    <simple-editor
      :initial-content="thingOne"
      @share-changes="handleUpdateThingOne"
      @close="handleClose"
    />
  </div>
  <div class="my-6">
    <h3>Thing Two</h3>
    <simple-editor
      :initial-content="thingTwo"
      @share-changes="handleUpdateThingTwo"
      @close="handleClose"
    />
  </div>
  <ul>
    <li>{{ thingOne }}</li>
    <li>{{ thingTwo }}</li>
  </ul>
</template>

<script setup lang="ts">
const SimpleEditor = defineAsyncComponent(
  () => import('~/components/SimpleEditor.vue')
)

const thingOne = ref('<h1>Hello, Bubba!</h1>')
const thingTwo = ref('<p>This is something else entirely.</p>')

const handleUpdateThingOne = (update: string) => {
  console.log('updated content', update)
  thingOne.value = update
}
const handleUpdateThingTwo = (update: string) => {
  console.log('updated content', update)
  thingTwo.value = update
}
const handleContentUpdate = (update: string) => {
  console.log('updated content', update)
}
const handleClose = () => {
  console.log('do whatever it means to close')
}
</script>

<style scoped>
.bubble-editor {
  border: 1px lightgray solid;
}
</style>
