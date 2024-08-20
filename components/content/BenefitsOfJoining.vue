<template>
  <ClientOnly>
    <div v-if="benefits">
      <ContentRenderer :value="benefits">
        <ContentRendererMarkdown :value="benefits" />
      </ContentRenderer>
      <UButton class="text-center" color="yellow" variant="solid" label="Join Now" @click="goToJoinPage" />
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const route = useRouter()
const benefits = ref()
const load = async () => {
  const { data } = await useAsyncData(() => queryContent('join', '_benefits-of-joining').where({ _partial: true }).findOne())
  benefits.value = data.value
  // benefits.value = data.value
}
await load()

const goToJoinPage = async () => {
  navigateTo('/auth/sign-in')
}
</script>

<style></style>
