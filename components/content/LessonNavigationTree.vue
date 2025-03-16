<template>
  <div>
    <h2>Courses</h2>
    <div>
      <div v-for="course in lessonsStore.courses">
        <h3>{{ course.title }}</h3>
        <ol>
          <li
            v-for="lesson in lessonsStore.lessonListForCourse(course.stem)"
            class="list-roman ml-10"
          >
            <NuxtLink :to="lesson.path">{{ lesson.title }}</NuxtLink>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
const lessonsStore = useLessonStore()
useLessons().fetchLessonTree()
</script>

<style lang="scss" scoped>
h3 {
  color: var(--color-nuclear-500);
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}
a:hover {
  font: bold;
  color: var(--color-nuclear-500);
}
</style>
