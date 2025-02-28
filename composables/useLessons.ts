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

  return {
    fetchLessonTree,
    courses: computed(() => lessonStore.courses),
  }
}
