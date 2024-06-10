import type {
  ContentPart,
  Course,
  LessonPlan,
  LessonPath,
} from '~/types/won-types'

export const useLearningStore = defineStore('learning', () => {
  type CourseMap = { [k: string]: Course }
  type LessonPlanMap = { [k: string]: LessonPlan }
  type LessonPathMap = { [k: string]: LessonPath }
  const courseIndex: CourseMap = reactive({})
  const lessonPathIndex: LessonPathMap = reactive({})
  const lessonPlanIndex: LessonPlanMap = reactive({})

  const activeCourse: Ref<Course | undefined> = ref()
  const activePath: Ref<LessonPath | undefined> = ref()
  const activeLesson: Ref<LessonPlan | undefined> = ref()
  const contentParts: Ref<ContentPart[]> = ref([])

  const cacheLessonPaths = (paths: LessonPath[]) => {
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

  const cacheCourse = (course: Course) => {
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

  const cacheLesson = (plan: LessonPlan) => {
    console.log('caching lesson plan', plan)
    lessonPlanIndex[plan.publicKey] = plan
  }
  const cacheLessons = (plans: LessonPlan[]) => {
    console.log('caching lessons')

    plans.forEach((plan) => cacheLesson(plan))
  }
  const lessonsForActiveCourse = computed(() => Object.values(lessonPlanIndex))

  const useLesson = (lessonKey: string) => {
    activeLesson.value = lessonPlanIndex[lessonKey]
    return !!activeLesson.value
  }

  const cacheContents = (parts: ContentPart[]) => {
    const sorted = parts.sort((partA, partB) => partA.sequence - partB.sequence)
    contentParts.value = sorted
  }

  return {
    courseIndex,
    lessonPlanIndex,
    cacheCourse,
    courseList,
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
