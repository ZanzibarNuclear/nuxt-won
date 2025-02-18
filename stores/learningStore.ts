import type { LessonContentType, CourseType, LessonPlanType, LessonPathType } from '~/api/wonService/schema'

export const useLearningStore = defineStore('learning', () => {
  type CourseMap = { [k: string]: CourseType }
  type LessonPlanMap = { [k: string]: LessonPlanType }
  type LessonPathMap = { [k: string]: LessonPathType }
  const courseIndex: CourseMap = reactive({})
  const lessonPathIndex: LessonPathMap = reactive({})
  const lessonPlanIndex: LessonPlanMap = reactive({})

  const activeCourse: Ref<CourseType | undefined> = ref()
  const activePath: Ref<LessonPathType | undefined> = ref()
  const activeLesson: Ref<LessonPlanType | undefined> = ref()
  const contentParts: Ref<LessonContentType[]> = ref([])

  const cacheLessonPaths = (paths: LessonPathType[]) => {
    paths.forEach((path) => {
      lessonPathIndex[path.publicKey] = path
    })
  }
  const activeLessonPaths = computed(() => Object.values(lessonPathIndex))
  const choosePath = (pathKey: string) => {
    activePath.value = lessonPathIndex[pathKey]
  }
  const lookupStep = (from: string) => {
    if (!activePath.value || !activePath.value.steps) {
      console.log('no step found for given lesson')
      return undefined
    }
    return activePath.value.steps.find((step) => step.from === from)
  }

  const courseList = computed(() => Object.values(courseIndex))
  const publishedCourses = computed(() =>
    courseList.value.filter((c) => c.publishedAt)
  )

  const cacheCourse = (course: CourseType) => {
    courseIndex[course.publicKey] = course
  }
  const useCourse = (courseKey: string) => {
    if (activeCourse.value?.publicKey !== courseKey) {
      activeCourse.value = courseIndex[courseKey]
      activePath.value = undefined
      Object.keys(lessonPathIndex).forEach((key) => delete lessonPathIndex[key])
      activeLesson.value = undefined
      Object.keys(lessonPlanIndex).forEach((key) => delete lessonPlanIndex[key])
    }
    return !!activeCourse.value
  }

  const cacheLesson = (plan: LessonPlanType) => {
    lessonPlanIndex[plan.publicKey] = plan
  }
  const cacheLessons = (plans: LessonPlanType[]) => {
    plans.forEach((plan) => cacheLesson(plan))
  }
  const lessonsForActiveCourse = computed(() => Object.values(lessonPlanIndex))

  const useLesson = (lessonKey: string) => {
    activeLesson.value = lessonPlanIndex[lessonKey]
    return !!activeLesson.value
  }

  const cacheContents = (parts: LessonContentType[]) => {
    const sorted = parts.sort((partA, partB) => partA.sequence - partB.sequence)
    contentParts.value = sorted
  }

  return {
    courseIndex,
    lessonPlanIndex,
    cacheCourse,
    courseList,
    publishedCourses,
    useCourse,
    activeCourse,
    activePath,
    activeLesson,
    contentParts,
    cacheLesson,
    cacheLessons,
    useLesson,
    cacheContents,
    lessonsForActiveCourse,
    cacheLessonPaths,
    activeLessonPaths,
    choosePath,
    lookupStep,
  }
})
