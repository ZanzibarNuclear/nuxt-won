<template>
  <div>
    <UBreadcrumb :links="breadcrumbLinks" />
    <h1>Topics of Interest</h1>
    <div v-if="hasBookmark">
      <UButton @click="goToBookmark"
        >Return to the last lesson you viewed</UButton
      >
    </div>
    <div class="mx-auto">
      <div class="course-layout">
        <CourseTile
          v-for="course in learning.publishedCourses"
          class="mx-2 my-4"
          :course="course"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadCourses } from '~/db/CourseModel'
import { getBookmark } from '~/db/UserModel'
import { loadPath } from '~/db/LessonPathModel'
import type { Course, LessonPath } from '~/types/won-types'

const breadcrumbLinks = [
  {
    label: 'Courses',
    icon: 'i-ph-house-line',
  },
]

const learning = useLearningStore()
const userContext = useUserStore()

const hasBookmark = computed(() => {
  return userContext.bookmark
})
const bookmark = computed(() => {
  return userContext.bookmark
})

const goToBookmark = async () => {
  console.log('use this to go there', bookmark)

  // load path and make it active ("choose" it)
  const bookmarkedPath = await loadPath(bookmark.value?.pathKey)
  if (bookmarkedPath) {
    console.log('bookmark, path', bookmark, bookmarkedPath)

    learning.cacheLessonPaths([bookmarkedPath])
    learning.choosePath(bookmarkedPath?.publicKey)
    navigateTo(
      `/learning/courses/${bookmarkedPath.courseKey}/lessons/${bookmark.value?.lessonKey}`
    )
  } else {
    console.warn('bookmarked path not found')
    // TODO: do something about obsolete bookmark, perhaps
  }
}

async function loadData() {
  const { data: materials, error } = await useAsyncData(
    'learningCatalogAndContext',
    async () => {
      const [courses, bookmark] = await Promise.all([
        loadCourses(),
        getBookmark(),
      ])
      return { courses, bookmark }
    }
  )
  const { courses, bookmark } = materials.value
  if (courses) {
    courses.forEach((course: Course) => learning.cacheCourse(course))
  }
  if (bookmark) {
    userContext.cacheBookmark(bookmark)
  }
  if (error.value) {
    console.error('Something went wrong', error.value?.message)
  }
}
await loadData()
</script>

<style scoped>
.course-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
}
</style>
