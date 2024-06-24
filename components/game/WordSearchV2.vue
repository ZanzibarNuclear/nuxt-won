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
          :color="isSelected(index) ? 'primary' : 'gray'"
          variant="soft"
          size="xs"
          @click="toggleLetter(index)"
        />
      </div>

      <template #footer>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="word in words"
            :key="word"
            :label="word"
            :color="foundWords.includes(word) ? 'green' : 'primary'"
            :variant="foundWords.includes(word) ? 'solid' : 'soft'"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup>
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

const selectedLetters = ref([])
const foundWords = ref([])

function isSelected(index) {
  return selectedLetters.value.includes(index)
}

function toggleLetter(index) {
  const i = selectedLetters.value.indexOf(index)
  if (i > -1) {
    selectedLetters.value.splice(i, 1)
  } else {
    selectedLetters.value.push(index)
  }
  checkForWords()
}

function checkForWords() {
  const selectedWord = selectedLetters.value
    .sort((a, b) => a - b)
    .map((index) => flatGrid.value[index])
    .join('')

  props.words.forEach((word) => {
    if (selectedWord.includes(word) && !foundWords.value.includes(word)) {
      foundWords.value.push(word)
      selectedLetters.value = []
    }
  })
}
</script>
