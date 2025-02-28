import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

interface Lesson {
  stem: string
  children?: Lesson[]
  sequence?: number
}

export const useLessonStore = defineStore('lessonStore', () => {
  const lessonTree = ref<Lesson | null>(null)
  const courseIndex = reactive({
    courseList: [] as Lesson[],
    lessonsByCourse: {} as Record<string, Lesson[]>
  })
  const lessonIndex = reactive({} as Record<string, Lesson>)

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

      courseIndex.lessonsByCourse = courseIndex.courseList.reduce((acc, course) => {
        acc[course.stem] = sortLessons(course.children || [])
        return acc
      }, {} as Record<string, Lesson[]>)
    }
  }

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

  return {
    cacheLessonTree,
    courseIndex,
    courses,
    lessonListForCourse,
    lookupLesson,
    isLoaded
  }
})
