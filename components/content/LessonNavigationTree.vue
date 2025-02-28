<template>
  <div>
    <h2>Courses</h2>
    <div>
      <div v-for="course in courses">
        <h3>{{ course.title }}</h3>
        <ol>
          <li v-for="lesson in sortLessons(course.children)">
            <NuxtLink :to="lesson.path">{{ lesson.title }}</NuxtLink>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: navTree } = await useAsyncData('navigation', () => {
  const tree = queryCollectionNavigation('lessons')
  return tree
})
console.log(navTree.value[0])

const courses = computed(() => {
  return navTree.value[0].children.filter((child) => child.children != null)
})

const extractIntegerFromStem = (stem) => {
  const parts = stem.split('/');
  const lastPart = parts[parts.length - 1];
  const integerPart = lastPart.split('.')[0];
  return parseInt(integerPart, 10);
}

const sortLessons = (unsortedLessons) => {
  const sortableLessons = unsortedLessons.map((lesson) => {
    return {
      ...lesson,
      sequence: extractIntegerFromStem(lesson.stem)
    }
  })
  return sortableLessons.sort((a, b) => a.sequence - b.sequence)
}
</script>

<style lang="scss" scoped></style>
