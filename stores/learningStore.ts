import type { ContentPart, Course, LessonPlan } from '~/types/won-types'

export const useLearningStore = defineStore('learning', () => {
  type CourseMap = { [k: string]: Course }
  type LessonPlanMap = { [k: string]: LessonPlan }
  const courseIndex: CourseMap = reactive({})
  const lessonPlanIndex: LessonPlanMap = reactive({})

  const activeCourse: Ref<Course | undefined> = ref()
  const activeLesson: Ref<LessonPlan | undefined> = ref()
  const contentParts: Ref<ContentPart[]> = ref([])

  const courseList = computed(() => Object.values(courseIndex))

  const cacheCourse = (course: Course) => {
    courseIndex[course.publicKey] = course
  }
  const useCourse = (courseKey: string) => {
    activeCourse.value = courseIndex[courseKey]
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
  // const lessonsForActiveCourse = computed(() => {
  //   Object.values(lessonPlanIndex).filter(
  //     (plan) => plan.courseId === activeCourse.value?.id
  //   )
  // })
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
    activeLesson,
    contentParts,
    cacheLesson,
    cacheLessons,
    useLesson,
    cacheContents,
    lessonsForActiveCourse,
  }
})
