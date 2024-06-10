<template>
  <div>
    <UBreadcrumb :links="learningLinks" />
    <h1>{{ activeCourse.title }}</h1>
    <div><span class="rich-text" v-html="activeCourse.description" /></div>
    <h3>What You Will Learn</h3>
    <div class="my-2 rich-text">
      <span v-html="activeCourse.syllabus" />
    </div>
    <div>
      <h3>Lessons</h3>
      <ul>
        <li v-for="lesson in learning.lessonsForActiveCourse" class="my-6 px-4">
          <LessonListItem
            :lesson-plan="lesson"
            @click="
              navigateTo(
                '/learning/courses/' +
                  courseKey +
                  '/lessons/' +
                  lesson.publicKey
              )
            "
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loadCourse } from '~/db/CourseModel'
import { loadLessonPlans } from '~/db/LessonPlanModel'
import { loadLessonPaths } from '~/db/LessonPathModel'

const learningLinks = [
  {
    label: 'Courses',
    icon: 'i-ph-house-line',
    to: '/learning',
  },
  {
    label: 'Course Overview',
    icon: 'i-ph-list-checks',
  },
]

const learning = useLearningStore()

const route = useRoute()
const courseKey = route.params.courseKey

const activeCourse = computed(() => {
  if (learning.activeCourse) {
    return learning.activeCourse
  } else {
    return {
      title: 'This may be the course you are looking for...loading...',
    }
  }
})

async function loadData() {
  const { data: courseData } = await useAsyncData(
    `course-${courseKey}`,
    async () => {
      const [course, lessonPlans, paths] = await Promise.all([
        loadCourse(courseKey as string),
        loadLessonPlans(courseKey as string),
        loadLessonPaths(courseKey as string),
      ])
      return { course, lessonPlans, paths }
    }
  )
  learning.cacheCourse(courseData.value?.course)
  learning.useCourse(courseKey)
  learning.cacheLessons(courseData.value?.lessonPlans)
  learning.cacheLessonPaths(courseData.value?.paths)
}
loadData()
</script>

<style scoped>
.rich-text :deep(p) {
  margin: 0.75rem 0;
}
.rich-text :deep(ul) {
  margin-top: 1rem;
  margin-bottom: 1rem;
  list-style: disc;
  list-style-position: inside;
}
</style>
