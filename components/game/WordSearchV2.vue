<template>
  <client-only>
    <UCard>
      <template #header>
        <h3 class="text-lg font-bold">Word Search Puzzle</h3>
      </template>

      <div
        class="grid w-3/4 mx-auto bg-slate-200 dark:bg-slate-900"
        :style="gridStyle"
      >
        <div
          v-for="(letter, index) in flatGrid"
          :key="index"
          class="w-10 h-10 text-center text-lg"
          :class="
            isSelected(index) ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-900'
          "
          @click="toggleLetter(index)"
        >
          {{ letter }}
        </div>
        <!-- <UButton
          v-for="(letter, index) in flatGrid"
          :key="index"
          :label="letter"
          :color="isSelected(index) ? 'primary' : 'yellow'"
          variant="soft"
          size="xs"
          @click="toggleLetter(index)"
        /> -->
      </div>

      <template #footer>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="word in words"
            :key="word"
            :label="word"
            :color="isFound(word) ? 'green' : 'primary'"
            :variant="isFound(word) ? 'solid' : 'soft'"
          />
        </div>
      </template>
    </UCard>
  </client-only>
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
const upperCaseWords = computed(() =>
  props.words.map((word) => word.toUpperCase())
)
const noSpacesUpper = computed(() =>
  upperCaseWords.value.map((word) => word.replace(' ', ''))
)

const isFound = (wordInQuestion) => {
  const allCapsNoSpaces = wordInQuestion.toUpperCase().replace(' ', '')
  console.log(allCapsNoSpaces)
  return foundWords.value.includes(allCapsNoSpaces)
}
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
  noSpacesUpper.value.forEach((word) => {
    if (selectedWord.includes(word) && !foundWords.value.includes(word)) {
      foundWords.value.push(word)
      selectedLetters.value = []
    }
  })
}
</script>
