<template>
  <UCard class="card" @click="goTo">
    <template #header>
      <div class="flex h-24">
        <img :src="feature.coverImage" />
      </div>
    </template>
    <div class="text-center h-36">
      <div class="text-2xl mb-4">{{ feature.name }}</div>
      <div class="description">
        {{ feature.description }}
      </div>
    </div>
    <template #footer>
      <div class="actions text-center">
        <UButton color="primary" variant="solid" :label="feature.callToAction" @click="goTo" />
      </div>
    </template>
  </UCard>
</template>

<script setup>
const props = defineProps(['feature'])
const router = useRouter()

const goTo = async () => {
  if (props.feature.outsideRoute) {
    navigateTo(props.feature.outsideRoute, { external: true })
  } else if (props.feature.routeName) {
    navigateTo('/' + props.feature.routeName)
    // router.push({ name: props.feature.routeName })
  }
}
</script>

<style lang="scss" scoped>
.card {
  display: grid;
  grid-template-rows: max-content auto 1fr;
}

.card img {
  max-height: 150px;
  margin: 0 auto;
}
</style>
