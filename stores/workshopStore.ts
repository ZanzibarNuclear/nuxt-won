import { defineStore } from 'pinia'
import type { Course, LessonPlan } from '~/types/won-types'

export const useWorkshopStore = defineStore('workshop', () => {
  type CourseMap = { [k: string]: Course }
  type LessonMap = { [k: string]: LessonPlan } // TODO: think about caching by course, then lesson

  const courses: Ref<CourseMap> = ref({})
  const courseList = computed(() => Object.values(courses.value))
  const activeCourseId = ref()

  const cacheCourse = (courseToCache: Course) => {
    courses.value[courseToCache.id.toString()] = courseToCache
  }
  const cacheCourses = (items: Course[]) => {
    items.forEach((course) => cacheCourse(course))
  }
  const editCourse = (id: number) => {
    activeCourseId.value = id.toString()
  }
  const closeCourseEdit = (id: number) => {
    activeCourseId.value = null
    activeLessonId.value = null
  }
  const activeCourse = computed(() => {
    if (activeCourseId.value) {
      return courses.value[activeCourseId.value]
    } else {
      return null
    }
  })
  const isCourseActive = computed(() => {
    return !!activeCourse
  })

  const lessonPlans: Ref<LessonMap> = ref({})
  // TODO: return these in sorted order
  const lessonList = computed(() => Object.values(lessonPlans.value))
  const activeLessonId = ref()

  const cacheLesson = (lessonToAdd: LessonPlan) => {
    lessonPlans.value[lessonToAdd.id.toString()] = lessonToAdd
  }
  const cacheLessons = (items: LessonPlan[]) => {
    items.forEach((lesson) => cacheLesson(lesson))
  }
  const editLesson = (id: number) => {
    activeLessonId.value = id.toString()
  }
  const closeLessonEdit = () => {
    activeLessonId.value = null
  }
  const activeLesson = computed(() => {
    if (activeLessonId.value) {
      return lessonPlans.value[activeLessonId.value]
    } else {
      return null
    }
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
    editCourse,
    closeCourseEdit,
    lessonList,
    isLessonActive,
    activeLesson,
    cacheLessons,
    cacheLesson,
    editLesson,
    closeLessonEdit,
  }
})
