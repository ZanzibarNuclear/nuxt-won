import { defineStore } from 'pinia'
import type {
  Course,
  LessonPlan,
  LessonPath,
  ContentPart,
} from '~/types/won-types'

export const useWorkshopStore = defineStore('workshop', () => {
  type CourseMap = { [k: string]: Course }
  type LessonMap = { [k: string]: LessonPlan }
  type PathMap = { [k: string]: LessonPath }
  type CoursePathMap = { [k: string]: PathMap }
  type ContentPartMap = { [k: string]: ContentPart }

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
    if (activeCourseKey.value !== key) {
      activeCourseKey.value = key
      activeLessonKey.value = null
      Object.keys(lessonPlans).forEach((key) => delete lessonPlans[key])
    }
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
  const getLesson = (publicKey: string) => {
    return lessonPlans[publicKey]
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

  const contents: ContentPartMap = reactive({})

  const cacheContentPart = (part: ContentPart) => {
    if (part.publicKey) {
      contents[part.publicKey] = part
    } else {
      console.warn('content part without public key', part)
    }
  }
  const sortedContents = computed(() => {
    const sorted = Object.values(contents).sort(
      (partA, partB) => partA.sequence - partB.sequence
    )
    return sorted
  })
  const removeCachedContentPart = (key: string) => {
    delete contents[key]
  }
  const clearContents = () => {
    Object.keys(contents).forEach((key) => delete contents[key])
  }

  return {
    courses,
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
    getLesson,
    removeLesson,
    makeLessonActive,
    deactivateLesson,
    cacheCoursePaths,
    activeLessonPaths,
    cacheActiveLessonPath,
    removeActiveLessonPath,
    cacheContentPart,
    sortedContents,
    removeCachedContentPart,
    clearContents,
  }
})
