<template>
  <UCard>
    <template #header>
      <div class="flex">
        <img :src="feature.coverImage" class="w-full" />
      </div>
    </template>
    <div>
      <div class="text-2xl mb-4">{{ feature.name }}</div>
      <div class="description">
        {{ feature.description }}
      </div>
    </div>
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
