import { defineStore } from 'pinia'
import type { Course, LessonPlan } from '~/types/won-types'

export const useWorkshopStore = defineStore('workshop', () => {
  type CourseMap = { [k: string]: Course }
  type LessonMap = { [k: string]: LessonPlan }

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
    // TODO: fetch list of lessons
    activeCourseId.value = id.toString()
  }
  const closeCourseEdit = (id: number) => {
    activeCourseId.value = null
  }
  const activeCourse = computed(() => {
    if (activeCourseId) {
      return courses.value[activeCourseId.value]
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
  }
})
