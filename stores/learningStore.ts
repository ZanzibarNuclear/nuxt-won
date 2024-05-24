import type { ContentPart, Course, LessonPlan } from '~/types/won-types'

export const useLearningStore = defineStore('learning', () => {
  const activeCourse: Ref<Course | undefined> = ref()
  const activeLesson: Ref<LessonPlan | undefined> = ref()
  const contentParts: Ref<ContentPart[]> = ref([])

  const cacheCourse = (course: Course) => {
    activeCourse.value = course
  }
  const cacheLesson = (lesson: LessonPlan) => {
    activeLesson.value = lesson
  }
  const cacheContents = (parts: ContentPart[]) => {
    const sorted = parts.sort((partA, partB) => partA.sequence - partB.sequence)
    contentParts.value = sorted
  }

  return {
    activeCourse,
    activeLesson,
    contentParts,
    cacheCourse,
    cacheLesson,
    cacheContents,
  }
})
