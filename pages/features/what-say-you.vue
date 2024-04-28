<template>
  <UContainer class="flex flex-col space-y-6">
    <h1>What Say You?</h1>
    <div>
      Sometimes you want to speak your mind. Sometimes it helps to write down
      what you are thinking, and ask others to respond.
    </div>
    <div>
      This feature of World of Nuclear let's you explore any topic of interest.
      Ideally, it should be something to do with nuclear energy. It's okay to go
      a little off topic.
    </div>
    <div>
      Keep in mind that this feature is being created before your eyes. We can
      call it an alpha version, which means you should expect bugs. And don't
      get too mad if everything you write disappears. At this stage, mistakes
      happen.
    </div>
    <div>
      That said, please give it a try. If you want to give some feedback or
      share improvement ideas, write about that. I am sure to see it.
    </div>
    <UButton to="/wsy" variant="outline" class="justify-center"
      >Jump into the Discussion</UButton
    >
  </UContainer>
</template>

<script setup lang="ts">
// TODO: go to the 9s with SEO ==> be discoverable

useSeoMeta({
  title: 'World of Nuclear - What Say You?',
  ogTitle: 'World of Nuclear - What Say You?',
  description:
    'Discussion forum to talk about beneficial aspects of nuclear energy. Read what others have to say, and respond with your own ideas.',
  ogDescription:
    'Discussion forum to talk about beneficial aspects of nuclear energy. Read what others have to say, and respond with your own ideas.',
  ogImage: 'https://worldofnuclear.com/Diable-Canyon-power-plant.png',
  twitterCard: 'summary',
})
</script>

<style lang="scss" scoped></style>
