import type { Lesson } from '~/stores/lessonStore'
import { EventRepository as events } from '~/api/wonService/EventRepo'

export const useLessons = () => {
  const lessonStore = useLessonStore()

  const fetchLessonTree = async (publishedOnly = false) => {
    console.log('loading lesson tree...how big does this get??')
    if (lessonStore.isLoaded) {
      console.log('lesson tree already loaded')
      return
    }
    const { data: navTree } = await useAsyncData('navigation', () => {
      return publishedOnly
        ? queryCollectionNavigation('lessons').where('published', '=', true)
        : queryCollectionNavigation('lessons')
    })
    if (navTree.value?.[0]) {
      lessonStore.cacheLessonTree(navTree.value?.[0] as Lesson)
    }
    console.log('done loading lesson tree')
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
