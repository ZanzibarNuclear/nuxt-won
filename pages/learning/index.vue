<template>
  <div>
    <UBreadcrumb :links="breadcrumbLinks" />
    <h1>Topics of Interest</h1>
    <simple-toolbar v-if="isSignedIn">
      <UButton
        v-if="hasBookmark"
        class="mr-2"
        @click="goToBookmark"
        label="Jump to Bookmark"
      />
      <div v-else>
        <div v-if="!checkedForBookmark">
          Have you been here before?
          <UButton @click="checkForBookmark"
            >See if you have a bookmark.</UButton
          >
        </div>
        <div v-else>Sorry, we could not find a bookmark.</div>
      </div>
      <UButton class="mr-2" label="Give Feedback" @click="onShowFeedbackForm" />
    </simple-toolbar>
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
  <UModal v-model="showFeedbackForm">
    <feedback-form
      context="learning"
      @feedback-delivered="handleFeedbackDelivered"
    />
  </UModal>
</template>

<script setup lang="ts">
import { loadCourses } from '~/db/CourseModel'
import { getBookmark } from '~/db/UserModel'
import { loadPath } from '~/db/LessonPathModel'
import type { Course } from '~/types/won-types'

const breadcrumbLinks = [
  {
    label: 'Courses',
    icon: 'i-ph-house-line',
  },
]

const learning = useLearningStore()
const userContext = useUserStore()

const isSignedIn = computed(() => {
  return !!userContext.user
})
const checkedForBookmark = ref(false)
const checkForBookmark = async () => {
  const myBookmark = await getBookmark()
  if (myBookmark) {
    userContext.cacheBookmark(myBookmark)
  }
  checkedForBookmark.value = true
}

const hasBookmark = computed(() => {
  return userContext.bookmark
})
const bookmark = computed(() => {
  return userContext.bookmark
})

const goToBookmark = async () => {
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

const showFeedbackForm = ref(false)
const onShowFeedbackForm = () => {
  showFeedbackForm.value = true
}
const handleFeedbackDelivered = () => {
  showFeedbackForm.value = false
  alert('Thanks for the feedback! We appreciate the chance to improve.')
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
