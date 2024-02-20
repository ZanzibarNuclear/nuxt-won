<template>
  <UCard>
    <template #header>
      <div class="flex">
        <img :src="feature.coverImage" width="120px" />
        <div class="text-2xl ml-3">{{ feature.name }}</div>
      </div>
    </template>
    <div class="description">{{ feature.description }}</div>
    <template #footer>
      <div class="actions">
        <UButton
          color="primary"
          variant="solid"
          :label="feature.callToAction"
          @click="goTo"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps(['feature'])
const router = useRouter()

// const { name, category, description, tileImage, callToAction, routeName } = props.feature

const goTo = async () => {
  router.push({ name: props.feature.routeName })
}
</script>

<style lang="scss" scoped></style>
