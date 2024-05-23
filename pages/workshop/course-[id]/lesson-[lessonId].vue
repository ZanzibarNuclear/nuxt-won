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
    <div v-for="part in contentParts">
      <ContentPart :part="part" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContentPart, ContentDetails } from '~/types/won-types'
const route = useRoute()
const { id: courseId, lessonId } = route.params
const contentTypeOptions = ['html', 'image', 'formula', 'video', 'figure']
const contentType = ref('html')
const contentParts: Ref<ContentPart[]> = ref([])

const activeCourse = {
  id: courseId,
  title: 'My Wonderful Course',
}
const activeLesson = {
  id: lessonId,
  title: 'My Crafty Lesson',
  courseId: courseId,
}

onMounted(async () => {
  // TODO: load whatever makes sense
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
    type: contentType.value,
    details,
  })
}
</script>

<style scoped></style>
