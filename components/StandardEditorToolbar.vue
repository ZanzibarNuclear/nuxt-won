<template>
  <div v-if="editor" class="flex">
    <div class="w-full flex flex-row gap-x-1 mb-2">
      <UDropdown :items="headings" :popper="{ placement: 'bottom-start' }">
        <UButton
          variant="outline"
          class="mt-0"
          size="sm"
          label="P, H1-3"
          icon="i-ph-paragraph"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        />
      </UDropdown>
      <UButton
        size="sm"
        icon="i-ph-text-b"
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        title="bold"
      />
      <UButton
        size="sm"
        icon="i-ph-text-italic"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        title="italic"
      />
      <UButton
        size="sm"
        icon="i-ph-text-underline"
        @click="editor.chain().focus().toggleUnderline().run()"
        :disabled="!editor.can().chain().focus().toggleUnderline().run()"
        :class="{ 'is-active': editor.isActive('underline') }"
        title="underline"
      />
      <UButton
        size="sm"
        icon="i-ph-text-superscript"
        @click="editor.chain().focus().toggleSuperscript().run()"
        :disabled="!editor.can().chain().focus().toggleSuperscript().run()"
        :class="{ 'is-active': editor.isActive('superscript') }"
        title="superscript"
      />
      <UButton
        size="sm"
        icon="i-ph-text-subscript"
        @click="editor.chain().focus().toggleSubscript().run()"
        :disabled="!editor.can().chain().focus().toggleSubscript().run()"
        :class="{ 'is-active': editor.isActive('subscript') }"
        title="subscript"
      />
      <UButton
        size="sm"
        icon="i-ph-list-bullets"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
        title="bullet list"
      />
      <UButton
        size="sm"
        icon="i-ph-list-numbers"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
        title="numbered list"
      />
      <UButton
        size="sm"
        icon="i-ph-quotes"
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
        title="block quote"
      />
      <UDivider orientation="vertical" />
      <UButton
        class="push"
        size="sm"
        icon="i-ph-cloud-arrow-up"
        variant="solid"
        @click="() => emit('saveChanges')"
        label="Save"
        title="save changes"
      />
      <UButton
        size="sm"
        icon="i-ph-x-circle"
        variant="solid"
        color="orange"
        @click="() => emit('closeEditor')"
        label="Cancel"
        title="cancel"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ editor: { type: Object, required: true } })
const emit = defineEmits(['saveChanges', 'closeEditor'])

const headings = [
  [
    {
      label: 'Heading 1',
      icon: 'i-ph-text-h',
      class: "{ 'is-active': editor.isActive('heading', { level: 1 }) }",
      click: () => {
        props.editor.chain().focus().toggleHeading({ level: 1 }).run()
      },
    },
    {
      label: 'Heading 2',
      icon: 'i-ph-text-h-two',
      class: "{ 'is-active': editor.isActive('heading', { level: 2 }) }",
      click: () => {
        props.editor.chain().focus().toggleHeading({ level: 2 }).run()
      },
    },
    {
      label: 'Heading 3',
      icon: 'i-ph-text-h-three',
      class: "{ 'is-active': editor.isActive('heading', { level: 3 }) }",
      click: () => {
        props.editor.chain().focus().toggleHeading({ level: 3 }).run()
      },
    },
    {
      label: 'Normal',
      icon: 'i-ph-text-p',
      click: () => {
        props.editor.chain().focus().setParagraph().run()
      },
    },
  ],
]
</script>

<style lang="scss">
.push {
  margin-left: auto;
}
</style>
