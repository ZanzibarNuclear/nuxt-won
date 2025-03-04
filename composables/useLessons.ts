import type { Lesson } from '~/stores/lessonStore'
import { EventRepository as events } from '~/api/wonService/EventRepo'

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
    if (navTree.value?.[0]) {
      lessonStore.cacheLessonTree(navTree.value?.[0] as Lesson)
    }
  }

  const setCurrentLesson = (lessonStem: string) => {
    console.log('setting current lesson', lessonStem)
    lessonStore.setCurrentLesson(lessonStem)
    events.logPageHit(lessonStem)

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
