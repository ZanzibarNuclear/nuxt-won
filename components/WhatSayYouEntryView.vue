<script setup lang="ts">
const props = defineProps(['entry', 'indent'])
const emit = defineEmits(['reply'])

const formatEntry = (entry) => {
  return entry.replaceAll('\n', '<br/><br/>')
}

const indentation = computed(() => {
  return props.indent ? `ml-${props.indent * 2}` : null
})

const onReply = (id: number) => {
  emit('reply', id)
}

// FIXME: find a good way to indent replies
</script>

<template>
  <UCard :class="{ 'margin-left': indent * 2 }">
    <div class="flex">
      <div class="flex-none mr-6 text-xs">
        by writer {{ entry.author_id }}<br />
        {{ displayAsDateTime(entry.posted_at) }}<br />
        <UButton @click="() => onReply(entry.id)" icon="i-mdi-reply" size="xs"
          >reply</UButton
        >
      </div>
      <div class="grow">
        <span v-html="formatEntry(entry.statement)" />
      </div>
    </div>
  </UCard>
</template>
