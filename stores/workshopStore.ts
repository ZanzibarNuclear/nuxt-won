import { defineStore } from 'pinia'
import type { Course, LessonPlan } from '~/types/won-types'

export const useWorkshopStore = defineStore('workshop', () => {
  type CourseMap = { [k: string]: Course }
  type LessonMap = { [k: string]: LessonPlan } // TODO: think about caching by course, then lesson

  const courses: Ref<CourseMap> = ref({})
  const courseList = computed(() => Object.values(courses.value))
  const activeCourseId = ref()

  const addCourse = (courseToAdd: Course) => {
    courses.value[courseToAdd.id.toString()] = courseToAdd
  }
  const loadCourses = (items: Course[]) => {
    items.forEach((course) => addCourse(course))
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

  const lessonPlans: Ref<LessonMap> = ref({})
  // TODO: return these in sorted order
  const lessonList = computed(() => Object.values(lessonPlans.value))
  const activeLessonId = ref()

  const addLesson = (lessonToAdd: LessonPlan) => {
    lessonPlans.value[lessonToAdd.id.toString()] = lessonToAdd
  }
  const loadLessons = (items: LessonPlan[]) => {
    items.forEach((lesson) => addLesson(lesson))
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

  return {
    courseList,
    activeCourse,
    loadCourses,
    addCourse,
    editCourse,
    closeCourseEdit,
    lessonList,
    activeLesson,
    loadLessons,
    addLesson,
    editLesson,
    closeLessonEdit,
  }
})
