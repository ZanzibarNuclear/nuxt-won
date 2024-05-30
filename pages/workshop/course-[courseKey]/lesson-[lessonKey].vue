<template>
  <div>
    <h1>
      <UButton
        icon="i-mdi-arrow-left-top"
        class="mr-2"
        :to="`/workshop/course-${courseKey}/lessons`"
      />
      Lesson:
      {{ workshop.activeLesson.title }}
    </h1>
    <h2>Content Assembly</h2>
    <div v-if="!editSort">
      <div class="flex">
        <USelect :options="contentTypeOptions" v-model="contentType" />
        <UButton
          label="Add Content"
          size="sm"
          icon="i-ph-plus-circle"
          @click="addContent"
        />
        <UButton
          label="Change order"
          size="sm"
          icon="i-ph-arrows-out-line-vertical"
          @click="() => (editSort = true)"
          class="mx-5"
        />
      </div>
      <div v-for="part in sortedContentParts">
        <ContentPart
          :part="part"
          @cache-updated-part="handleCacheUpdatedPart"
          @remove-part="handleRemovePart"
        />
      </div>
    </div>
    <div v-if="editSort">
      <UButton
        label="Save sort order"
        size="sm"
        icon="i-ph-cloud-arrow-up"
        @click="handleSaveSortOrder"
        class="my-4"
      />
      <div v-for="(part, index) in sortedContentParts">
        <UButton
          v-if="index > 0"
          icon="i-ph-arrow-up"
          @click="up(part.publicKey)"
          class="mx-2"
        />
        <UButton v-else icon="i-ph-tree-palm" class="mx-2" />
        <UButton
          v-if="index < sortedContentParts.length - 1"
          icon="i-ph-arrow-down"
          @click="down(part.publicKey)"
          class="mx-2"
        />
        <UButton v-else icon="i-ph-tree-palm" class="mx-2" />
        {{ part.publicKey }} {{ part.sequence }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadContentParts, createContentPart } from '~/db/ContentPartModel'
import {
  type ContentPart,
  type ContentDetails,
  LessonContentEnum,
} from '~/types/won-types'
const route = useRoute()
const { courseKey, lessonKey } = route.params
const contentTypeOptions = [
  LessonContentEnum.html,
  LessonContentEnum.image,
  LessonContentEnum.formula,
  LessonContentEnum.video,
  LessonContentEnum.figure,
]
const contentType: Ref<LessonContentEnum> = ref(LessonContentEnum.html)
const workshop = useWorkshopStore()
workshop.activateLesson(lessonKey)

type ContentPartMap = { [k: string]: ContentPart }
const contents: ContentPartMap = reactive({})
const notIndexed: Ref<ContentPart[]> = ref([]) // if anything ends up here, must be a mistake

const editSort = ref(false)

const sortedContentParts = computed(() => {
  const sorted = Object.values(contents).sort(
    (partA, partB) => partA.sequence - partB.sequence
  )
  sorted.push(...notIndexed.value)
  return sorted
})

const cacheContentPart = (part: ContentPart) => {
  if (part.publicKey) {
    contents[part.publicKey] = part
  } else {
    notIndexed.value.push(part)
  }
}
const nextCount = computed(() => {
  if (sortedContentParts.value.length > 0) {
    return (
      sortedContentParts.value[sortedContentParts.value.length - 1].sequence + 1
    )
  } else {
    return 1
  }
})

const { data: parts, error } = await useAsyncData(
  `lesson-${lessonKey}-content`,
  () => loadContentParts(lessonKey)
)
parts.value.forEach((part) => cacheContentPart(part))

const handleCacheUpdatedPart = (update: ContentPart) => cacheContentPart(update)

const handleRemovePart = (publicKey: string) => delete contents[publicKey]

const swapPositions = (indexFrom, indexTo) => {
  const parts = [...sortedContentParts.value]
  const toSequence = parts[indexTo].sequence
  parts[indexTo].sequence = parts[indexFrom].sequence
  parts[indexFrom].sequence = toSequence
}
const up = (index) => {
  console.log('move part earlier in sequence - lower number')
  swapPositions(index, index - 1)
}
const down = (index) => {
  console.log('move part later in sequence - higher number')
  swapPositions(index, index + 1)
}

const handleSaveSortOrder = () => {
  console.log('save sort order: not implemented')
}

const addContent = async () => {
  let details: ContentDetails
  switch (contentType.value) {
    case LessonContentEnum.html: {
      details = {
        html: '',
      }
      break
    }
    case LessonContentEnum.image: {
      details = {
        src: '',
        alt: '',
        width: null,
        height: null,
      }
      break
    }
    case LessonContentEnum.formula: {
      details = {
        latex: '',
        caption: '',
      }
      break
    }
    case LessonContentEnum.video: {
      details = {
        url: '',
        caption: '',
      }
      break
    }
    case LessonContentEnum.figure: {
      details = {
        src: '',
        caption: '',
        border: 'solid',
        width: '',
      }
      break
    }
    default: {
      details = {
        text: '',
      }
    }
  }
  const input = {
    lessonId: workshop.activeLesson.id,
    type: contentType.value,
    sequence: nextCount.value,
    details,
  }
  const minted = await createContentPart(input)
  cacheContentPart(minted)
}
</script>

<style scoped></style>
