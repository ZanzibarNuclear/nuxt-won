<template>
  <div>
    <h1>Curriculum Workshop: Lesson Builder</h1>
    <UButton
      label="Back to lesson overview"
      icon="i-mdi-arrow-left-top"
      :to="`/workshop/course-${courseKey}/lessons`"
    />

    <div>Course: {{ activeCourse.title }}</div>
    <h2>{{ activeLesson.title }} -- Preview</h2>

    <div v-for="part in sortedContentParts" class="my-4">
      <ContentPartHtml
        v-if="part.type === LessonContentEnum.html"
        :fields="part.details"
        :preview="true"
      />
      <ContentPartImage
        v-if="part.type === LessonContentEnum.image"
        :fields="part.details"
        :preview="true"
      />
      <ContentPartFormula
        v-if="part.type === LessonContentEnum.formula"
        :fields="part.details"
        :preview="true"
      />
      <ContentPartFigure
        v-if="part.type === LessonContentEnum.figure"
        :fields="part.details"
        :preview="true"
      />
      <ContentPartVideo
        v-if="part.type === LessonContentEnum.video"
        :fields="part.details"
        :preview="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadContentParts } from '~/db/ContentPartModel'
import { type ContentPart, LessonContentEnum } from '~/types/won-types'

const route = useRoute()
const { courseKey, lessonKey } = route.params

const workshop = useWorkshopStore()

const { activeCourse, activeLesson } = workshop

type ContentPartMap = { [k: string]: ContentPart }
const contents: ContentPartMap = reactive({})
const sortedContentParts = computed(() => {
  const sorted = Object.values(contents).sort(
    (partA, partB) => partA.sequence - partB.sequence
  )
  return sorted
})
const cacheContentPart = (part: ContentPart) => {
  if (part.publicKey) {
    contents[part.publicKey] = part
  } else {
    console.error('did not find public key; ignoring', part)
  }
}

const { data: parts, error } = await useAsyncData(
  `lesson-${lessonKey}-contents`,
  () => loadContentParts(lessonKey)
)
parts.value.forEach((part) => cacheContentPart(part))
</script>

<style scoped></style>
