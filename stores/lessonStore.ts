import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

export interface Lesson {
  stem: string
  children?: Lesson[]
  sequence?: number
}

export const useLessonStore = defineStore('lessonStore', () => {
  const lessonTree = ref<Lesson | null>(null)
  const courseIndex = reactive({
    courseList: [] as Lesson[],
    lessonsByCourse: {} as Record<string, Lesson[]>,
    orderedLessons: [] as Lesson[]
  })
  const lessonIndex = reactive({} as Record<string, Lesson>)
  const currentLesson = ref<Lesson | null>(null)

  const cacheLessonTree = (tree: Lesson) => {
    console.log('cache tree', tree)
    lessonTree.value = tree
    indexTree()
  }

  const isLoaded = computed(() => {
    return lessonTree.value != null
  })

  const indexTree = () => {
    console.log('index tree', lessonTree.value)
    if (lessonTree.value) {
      courseIndex.courseList = lessonTree.value.children?.filter(
        (child) => child.children != null
      ) || []

      // loop through courses, sort lessons and add to lessonsByCourse
      courseIndex.lessonsByCourse = courseIndex.courseList.reduce((acc, course) => {
        acc[course.stem] = sortLessons(course.children || [])
        return acc
      }, {} as Record<string, Lesson[]>)

      // loop through courses, add lessons to orderedLessons
      courseIndex.orderedLessons = courseIndex.courseList.reduce((acc, course) => {
        acc.push(...courseIndex.lessonsByCourse[course.stem])
        return acc
      }, [] as Lesson[])
    }
  }

  const previousLesson = computed(() => {
    if (!currentLesson.value) return null
    const currentIndex = courseIndex.orderedLessons.findIndex(lesson => lesson.stem === currentLesson.value?.stem)
    return currentIndex > 0 ? courseIndex.orderedLessons[currentIndex - 1] : null
  })

  const nextLesson = computed(() => {
    if (!currentLesson.value) return null
    const currentIndex = courseIndex.orderedLessons.findIndex(lesson => lesson.stem === currentLesson.value?.stem)
    return currentIndex < courseIndex.orderedLessons.length - 1 ? courseIndex.orderedLessons[currentIndex + 1] : null
  })


  const courses = computed(() => {
    return courseIndex.courseList
  })

  const lessonListForCourse = (courseKey: string) => {
    return courseIndex.lessonsByCourse[courseKey] || []
  }

  const lookupLesson = (lessonKey: string) => {
    return lessonIndex[lessonKey]
  }

  const sortLessons = (unsortedLessons: Lesson[]) => {
    const sortableLessons = unsortedLessons.map((lesson) => {
      return {
        ...lesson,
        sequence: extractIntegerFromStem(lesson.stem)
      }
    })
    sortableLessons.forEach(lesson => {
      lessonIndex[lesson.stem] = lesson
    });
    return sortableLessons.sort((a, b) => (a.sequence || 0) - (b.sequence || 0))
  }

  const extractIntegerFromStem = (stem: string) => {
    const parts = stem.split('/');
    const lastPart = parts[parts.length - 1];
    const integerPart = lastPart.split('.')[0];
    return parseInt(integerPart, 10);
  }

  const setCurrentLesson = (lessonStem: string) => {
    currentLesson.value = lookupLesson(lessonStem)
  }

  return {
    cacheLessonTree,
    courseIndex,
    courses,
    lessonListForCourse,
    lookupLesson,
    isLoaded,
    currentLesson,
    setCurrentLesson,
    previousLesson,
    nextLesson,
  }
})
