import { defineStore } from 'pinia'
import type {
  Course,
  LessonPlan,
  LessonPath,
  LessonStep,
} from '~/types/won-types'

export const useWorkshopStore = defineStore('workshop', () => {
  type CourseMap = { [k: string]: Course }
  type LessonMap = { [k: string]: LessonPlan }
  type PathMap = { [k: string]: LessonPath }
  type CoursePathMap = { [k: string]: PathMap }

  const courses: CourseMap = reactive({})
  const courseList = computed(() => Object.values(courses))
  const activeCourseKey = ref()

  const cacheCourse = (courseToCache: Course) => {
    courses[courseToCache.publicKey] = courseToCache
  }
  const cacheCourses = (items: Course[]) => {
    items.forEach((course) => cacheCourse(course))
  }
  const getCourse = (publicKey: string) => {
    return courses[publicKey]
  }
  const makeCourseActive = (key: string) => {
    activeCourseKey.value = key
  }
  const deactivateCourse = () => {
    activeCourseKey.value = null
    deactivateLesson()
  }
  const activeCourse = computed(() => {
    return activeCourseKey.value ? courses[activeCourseKey.value] : null
  })
  const isCourseActive = computed(() => {
    return !!activeCourse.value
  })

  const lessonPlans: LessonMap = reactive({})
  const lessonList = computed(() => Object.values(lessonPlans))
  const activeLessonKey = ref()

  const cacheLesson = (lessonToAdd: LessonPlan) => {
    lessonPlans[lessonToAdd.publicKey] = lessonToAdd
  }
  const cacheLessons = (items: LessonPlan[]) => {
    if (items && items.length > 0) {
      items.forEach((lesson) => cacheLesson(lesson))
    }
  }
  const removeLesson = (key: string) => {
    delete lessonPlans[key]
    if (activeLessonKey.value === key) {
      activeLessonKey.value = null
    }
  }
  const makeLessonActive = (key: string) => {
    activeLessonKey.value = key
  }
  const deactivateLesson = () => {
    activeLessonKey.value = null
  }
  const activeLesson = computed(() => {
    return activeLessonKey.value ? lessonPlans[activeLessonKey.value] : null
  })
  const isLessonActive = computed(() => {
    return !!activeLesson.value
  })

  const coursePaths: CoursePathMap = reactive({})

  const cacheCoursePaths = (courseKey: string, paths: LessonPath[]) => {
    const temp: PathMap = {}
    paths.forEach((path) => (temp[path.publicKey] = path))
    coursePaths[courseKey] = temp
  }
  const getCoursePaths = (courseKey: string) => {
    return coursePaths[courseKey]
  }
  const activeLessonPaths = computed(() => {
    if (isCourseActive.value) {
      return Object.values(getCoursePaths(activeCourseKey.value))
    }
  })
  const cacheActiveLessonPath = (path: LessonPath) => {
    if (isCourseActive) {
      const paths = coursePaths[activeCourseKey.value]
      paths[path.publicKey] = path
    }
  }
  const removeActiveLessonPath = (pathKey: string) => {
    const paths = coursePaths[activeCourseKey.value]
    delete paths[pathKey]
  }

  return {
    courseList,
    isCourseActive,
    activeCourse,
    cacheCourses,
    cacheCourse,
    getCourse,
    makeCourseActive,
    deactivateCourse,
    lessonList,
    isLessonActive,
    activeLesson,
    cacheLessons,
    cacheLesson,
    removeLesson,
    makeLessonActive,
    deactivateLesson,
    cacheCoursePaths,
    activeLessonPaths,
    cacheActiveLessonPath,
    removeActiveLessonPath,
  }
})
