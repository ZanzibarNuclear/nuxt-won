<template>
  <UCard>
    <template #header>
      <div class="flex">
        <img :src="coverArt" class="w-full" />
      </div>
    </template>
    <div>
      <div class="text-2xl mb-4">{{ title }}</div>
      <div class="description">
        {{ description }}
        {{ syllabus }}
      </div>
    </div>
    <template #footer>
      <div class="actions">
        <UButton
          block
          color="primary"
          variant="outline"
          label="Take a closer look"
          :to="`/learning/course-${publicKey}`"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps(['course'])
const router = useRouter()

const { publicKey, title, description, coverArt, syllabus } = props.course

const goTo = () => {
  router.push(`/learning/course-${publicKey}`)
}
</script>

<style lang="scss" scoped></style>
