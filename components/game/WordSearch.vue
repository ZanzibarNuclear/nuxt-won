<!-- WordSearch.vue -->
<template>
  <div>
    <UCard>
      <template #header>
        <h3 class="text-lg font-bold">Word Search Puzzle</h3>
      </template>

      <div class="grid gap-1" :style="gridStyle">
        <UButton
          v-for="(letter, index) in flatGrid"
          :key="index"
          :label="letter"
          color="gray"
          variant="soft"
          size="xs"
        />
      </div>

      <template #footer>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="word in words"
            :key="word"
            :label="word"
            color="primary"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { generateWordSearch } from '~/utils/wordSearchBuilder'

const props = defineProps({
  words: {
    type: Array,
    required: true,
  },
  size: {
    type: Number,
    default: 15,
  },
})

const grid = ref(generateWordSearch(props.words, props.size))

const flatGrid = computed(() => grid.value.flat())

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.size}, minmax(0, 1fr))`,
}))
</script>
