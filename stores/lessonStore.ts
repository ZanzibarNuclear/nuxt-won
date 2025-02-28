export const useLessonStore = defineStore('lessonStore', () => {
  const lessonTree = ref()
  const courseIndex = reactive({
    courseList: [],
    lessonsByCourse: {}
  })
  const lessonIndex = reactive({})

  const cacheLessonTree = (tree) => {
    console.log('cache tree', tree)
    lessonTree.value = tree
    indexTree()
  }

  const isLoaded = computed(() => {
    return lessonTree.value != null
  })
  const indexTree = () => {
    console.log('index tree', lessonTree.value)
    courseIndex.courseList = lessonTree.value.children.filter(
      (child) => child.children != null
    )

    courseIndex.lessonsByCourse = courseIndex.courseList.reduce((acc, course) => {
      acc[course.stem] = sortLessons(course.children)
      return acc
    }, {})
  }

  const courses = computed(() => {
    return courseIndex.courseList
  })

  const lessonListForCourse = (courseKey: string) => {
    return courseIndex.lessonsByCourse[courseKey]
  }

  const lookupLesson = (lessonKey: string) => {
    return lessonIndex[lessonKey]
  }

  const sortLessons = (unsortedLessons) => {
    const sortableLessons = unsortedLessons.map((lesson) => {
      return {
        ...lesson,
        sequence: extractIntegerFromStem(lesson.stem)
      }
    })
    sortableLessons.forEach(lesson => {
      lessonIndex[lesson.stem] = lesson
    });
    return sortableLessons.sort((a, b) => a.sequence - b.sequence)
  }

  const extractIntegerFromStem = (stem) => {
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
