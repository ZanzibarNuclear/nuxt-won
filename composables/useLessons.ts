import type { Lesson } from '~/stores/lessonStore'

export const useLessons = () => {
  const lessonStore = useLessonStore()

  const fetchLessonTree = async () => {
    if (lessonStore.isLoaded) {
      console.log('lesson tree already loaded')
      return
    }
    const { data: navTree } = await useAsyncData('navigation', () => {
      return queryCollectionNavigation('lessons')
    })
    lessonStore.cacheLessonTree(navTree.value?.[0])
  }

  const setCurrentLesson = (lessonStem: string) => {
    lessonStore.setCurrentLesson(lessonStem)
  }

  const hasPreviousLesson = computed(() => lessonStore.previousLesson !== null)
  const hasNextLesson = computed(() => lessonStore.nextLesson !== null)
  const previousLesson = computed(() => lessonStore.previousLesson)
  const nextLesson = computed(() => lessonStore.nextLesson)

  return {
    fetchLessonTree,
    courses: computed(() => lessonStore.courses),
    currentLesson: computed(() => lessonStore.currentLesson),
    setCurrentLesson,
    hasPreviousLesson,
    hasNextLesson,
    previousLesson,
    nextLesson,
  }
}
