<template>
  <div>
    <h2>Courses</h2>
    <div>
      <div v-for="course in courses">
        <h3>{{ course.title }}</h3>
        <ol>
          <li v-for="lesson in course.children">
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
</script>

<style lang="scss" scoped></style>
