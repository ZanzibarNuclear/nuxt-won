<template>
  <div>
    <h1>Curriculum Workshop: Lesson Builder</h1>
    <UButton
      label="Back to lesson overview"
      icon="i-mdi-arrow-left-top"
      :to="`/workshop/course-${courseId}/lessons`"
    />

    <div>Course: {{ activeCourse.title }}</div>
    <h2>{{ activeLesson.title }}</h2>

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
      <ContentPart :part="part" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadContentParts } from '~/db/ContentPartModel'
import type { ContentPart, ContentDetails } from '~/types/won-types'
const route = useRoute()
const { id: courseId, lessonId } = route.params
const contentTypeOptions = ['html', 'image', 'formula', 'video', 'figure']
const contentType = ref('html')
const contentParts: Ref<ContentPart[]> = ref([])

type ContentPartMap = { [k: string]: ContentPart }
const contents: ContentPartMap = reactive({})
const notIndexed: Ref<ContentPart[]> = ref([])

const sortedContentParts = computed(() => {
  const sorted = Object.values(contents).sort(
    (partA, partB) => partA.sequence - partB.sequence
  )
  sorted.push(...notIndexed.value)
  return sorted
})

const activeCourse = {
  id: courseId,
  title: 'My Wonderful Course',
}
const activeLesson = {
  id: lessonId,
  title: 'My Crafty Lesson',
  courseId: courseId,
}

const cacheContentPart = (part) => {
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

onMounted(async () => {
  const parts = await loadContentParts(parseInt(lessonId))
  parts.forEach((part) => cacheContentPart(part))
})

const addContent = () => {
  let details: ContentDetails
  switch (contentType.value) {
    case 'html': {
      details = {
        html: '',
      }
      break
    }
    case 'image': {
      details = {
        src: '',
        alt: '',
        width: null,
        height: null,
      }
      break
    }
    case 'formula': {
      details = {
        latex: '',
        caption: '',
      }
      break
    }
    case 'video': {
      details = {
        url: '',
        caption: '',
      }
      break
    }
    case 'figure': {
      details = {
        src: '',
        caption: '',
        border: 'solid',
      }
      break
    }
    default: {
      details = {
        text: '',
      }
    }
  }
  contentParts.value.push({
    lessonId: lessonId,
    type: contentType.value,
    sequence: nextCount.value,
    details,
  })
}
</script>

<style scoped></style>
