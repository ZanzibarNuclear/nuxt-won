<template>
  <div>
    <h1>Curriculum Workshop: Lesson Builder</h1>
    <UButton
      label="Back to lesson overview"
      icon="i-mdi-arrow-left-top"
      :to="`/workshop/course-${workshop.activeCourse.publicKey}/lessons`"
    />
    <div>Course: {{ workshop.activeCourse.title }}</div>
    <h2>{{ workshop.activeLesson.title }}</h2>
    <div class="flex">
      <USelect :options="contentTypeOptions" v-model="contentType" />
      <UButton
        label="Add Content"
        size="sm"
        icon="i-ph-plus-circle"
        @click="addContent"
      />
    </div>
    <div v-for="part in sortedContentParts">
      <ContentPart :part="part" @cache-updated-part="handleCacheUpdatedPart" />
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

type ContentPartMap = { [k: string]: ContentPart }
const contents: ContentPartMap = reactive({})
const notIndexed: Ref<ContentPart[]> = ref([]) // if anything ends up here, must be a mistake

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
  `lesson-${lessonId}-content`,
  () => loadContentPartsByLessonId(parseInt(lessonId))
)
parts.value.forEach((part) => cacheContentPart(part))

const handleCacheUpdatedPart = (update: ContentPart) => cacheContentPart(update)

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
    lessonId: activeLesson.id,
    type: contentType.value,
    sequence: nextCount.value,
    details,
  }
  const minted = await createContentPart(input)
  cacheContentPart(minted)
}
</script>

<style scoped></style>
