<template>
  <div class="h-full my-auto">
    <h1 class="text-center">Learn About Nuclear ... and more</h1>
    <div>This is some text.</div>
    <div class="flex columns-2">
      <UCard v-for="course in courses" :key="course.publicKey" class="my-6 w-2/5">
        <template #header>
          <NuxtImg :src="course.coverArt" />
        </template>

        <h2>{{ course.title }}</h2>
        <div><span v-html="course.description" /></div>
      </UCard>
    </div>
    <ul v-if="courses">
      <li v-for="course in courses">{{ course.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

const { data: courses } = await useAsyncData('courseList', () =>
  $fetch(`${config.wonServiceEndpoint}/courses`),
)
</script>

<style scoped></style>
