export const useLessonStore = defineStore('lessonStore', () => {
  const lessonIndex = reactive({})

  const cacheLesson = (lesson) => {
    lessonIndex[lesson.key] = lesson
  }

  const useLesson = (lessonKey: string) => {
    return lessonIndex[lessonKey]
  }

  return { cacheLesson, useLesson }
})
