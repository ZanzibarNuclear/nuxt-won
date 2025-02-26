<template>
  <div class="lesson-navigation">
    <nuxt-link v-if="hasPreviousLesson" :to="previousLessonLink" class="previous-lesson">
      &larr; Previous Lesson
    </nuxt-link>
    <span v-else class="no-previous-lesson">
      🌟
    </span>

    <nuxt-link v-if="hasNextLesson" :to="nextLessonLink" class="next-lesson">
      Next Lesson &rarr;
    </nuxt-link>
    <span v-else class="no-next-lesson">
      🎉
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  previousLessonLink?: string;
  nextLessonLink?: string;
}>();

const hasPreviousLesson = computed(() => !!props.previousLessonLink);
const hasNextLesson = computed(() => !!props.nextLessonLink);
</script>

<style scoped>
.lesson-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.previous-lesson,
.next-lesson {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
}

.no-previous-lesson,
.no-next-lesson {
  font-size: 1.5rem;
}
</style>