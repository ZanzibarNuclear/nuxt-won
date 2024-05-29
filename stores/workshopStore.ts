import { defineStore } from 'pinia'
import type { Course, LessonPlan } from '~/types/won-types'

export const useWorkshopStore = defineStore('workshop', () => {
  type CourseMap = { [k: string]: Course }
  type LessonMap = { [k: string]: LessonPlan }

  const courses: CourseMap = reactive({})
  const courseList = computed(() => Object.values(courses.value))
  const activeCourseKey = ref()

  const cacheCourse = (courseToCache: Course) => {
    courses[courseToCache.publicKey] = courseToCache
  }
  const cacheCourses = (items: Course[]) => {
    items.forEach((course) => cacheCourse(course))
  }
  const activateCourse = (key: string) => {
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
    return !!activeCourse
  })

  const lessonPlans: LessonMap = reactive({})
  const lessonList = computed(() => Object.values(lessonPlans.value))
  const activeLessonKey = ref()

  const cacheLesson = (lessonToAdd: LessonPlan) => {
    lessonPlans[lessonToAdd.publicKey] = lessonToAdd
  }
  const cacheLessons = (items: LessonPlan[]) => {
    items.forEach((lesson) => cacheLesson(lesson))
  }
  const activateLesson = (key: string) => {
    activeLessonKey.value = key
  }
  const deactivateLesson = () => {
    activeLessonKey.value = null
  }
  const activeLesson = computed(() => {
    return activeLessonKey.value ? lessonPlans[activeLessonKey.value] : null
  })
  const isLessonActive = computed(() => {
    return !!activeLesson
  })

  return {
    courseList,
    isCourseActive,
    activeCourse,
    cacheCourses,
    cacheCourse,
    activateCourse,
    deactivateCourse,
    lessonList,
    isLessonActive,
    activeLesson,
    cacheLessons,
    cacheLesson,
    activateLesson,
  }
})
