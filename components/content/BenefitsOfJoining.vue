<template>
  <ClientOnly>
    <div v-if="benefits">
      <ContentRenderer v-if="benefits" :value="benefits" />
      <UButton
        class="text-center"
        color="primary"
        variant="solid"
        label="Join Now"
        @click="goToJoinPage"
      />
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const benefits = ref()
const load = async () => {
  const { data } = await useAsyncData('benefits', () => {
    return queryCollection('join').where('path', '=', '/join/benefits-of-joining').first()
  })
  benefits.value = data.value
}
await load()

const goToJoinPage = async () => {
  navigateTo('/sign-in')
}
</script>

<style></style>
