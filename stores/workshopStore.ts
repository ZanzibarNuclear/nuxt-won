import { defineStore } from 'pinia'
import type { CourseType, LessonPlanType, LessonPathType, LessonContentType } from '~/api/wonService/schema'

export const useWorkshopStore = defineStore('workshop', () => {
  type CourseMap = { [k: string]: CourseType }
  type LessonMap = { [k: string]: LessonPlanType }
  type PathMap = { [k: string]: LessonPathType }
  type CoursePathMap = { [k: string]: PathMap }
  type ContentPartMap = { [k: string]: LessonContentType }

  const courses: CourseMap = reactive({})
  const courseList = computed(() => Object.values(courses))
  const activeCourseKey = ref()

  const cacheCourse = (courseToCache: CourseType) => {
    courses[courseToCache.publicKey] = courseToCache
  }
  const cacheCourses = (items: CourseType[]) => {
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

  const sortedLessonPlans = computed(() => {
    const plans = Object.values(lessonPlans)
    plans.sort((a, b) => {
      if (a.sequence !== null && b.sequence !== null) {
        return a.sequence - b.sequence
      } else if (a.sequence !== null) {
        return -1
      } else if (b.sequence !== null) {
        return 1
      } else {
        return 0
      }
    })
    return plans
  })
  const activeLessonKey = ref()

  const cacheLesson = (lessonToAdd: LessonPlanType) => {
    lessonPlans[lessonToAdd.publicKey] = lessonToAdd
  }
  const cacheLessons = (items: LessonPlanType[]) => {
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

  const cacheCoursePaths = (courseKey: string, paths: LessonPathType[]) => {
    const temp: PathMap = {}
    paths.forEach((path) => (temp[path.publicKey || ''] = path))
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
  const cacheActiveLessonPath = (path: LessonPathType) => {
    if (isCourseActive) {
      const paths = coursePaths[activeCourseKey.value]
      paths[path.publicKey || ''] = path
    }
  }
  const removeActiveLessonPath = (pathKey: string) => {
    const paths = coursePaths[activeCourseKey.value]
    delete paths[pathKey]
  }

  const contents: ContentPartMap = reactive({})

  const cacheContentPart = (part: LessonContentType) => {
    if (part.publicKey) {
      contents[part.publicKey] = part
    } else {
      console.warn('content part without public key', part)
    }
  }
  const cacheLessonContent = (parts: LessonContentType[]) => {
    if (parts && parts.length > 0) {
      parts.forEach((part) => cacheContentPart(part))
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
    sortedLessonPlans,
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
    cacheLessonContent,
    sortedContents,
    removeCachedContentPart,
    clearContents,
  }
})
