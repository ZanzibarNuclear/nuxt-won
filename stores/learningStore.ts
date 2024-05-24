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
  const useLesson = (lessonKey: string) => {
    activeLesson.value = lessonPlanIndex[lessonKey]
    return !!activeLesson.value
  }

  const cacheContents = (parts: ContentPart[]) => {
    // TODO: associate with active lesson? or better to drop content that is not in use?
    const sorted = parts.sort((partA, partB) => partA.sequence - partB.sequence)
    contentParts.value = sorted
  }

  return {
    cacheCourse,
    courseList,
    useCourse,
    activeCourse,
    activeLesson,
    contentParts,
    cacheLesson,
    useLesson,
    cacheContents,
  }
})
