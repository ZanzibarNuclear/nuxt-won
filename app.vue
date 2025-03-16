<template>
  <UApp>
    <NuxtLayout class="bg-uranium dark:bg-graphite text-graphite dark:text-cooling-tower">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
useHead({
  link: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
      rel: 'stylesheet',
      integrity: 'sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib',
      crossorigin: 'anonymous',
    },
  ],
  script: [
    {
      defer: true,
      src: 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.js',
      integrity: 'sha384-Rma6DA2IPUwhNxmrB/7S3Tno0YY7sFu9WSYMCuulLhIqYSGZ2gKCJWIqhBWqMQfh',
      crossorigin: 'anonymous',
    },
    {
      defer: true,
      src: 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/contrib/auto-render.min.js',
      integrity: 'sha384-hCXGrW6PitJEwbkoStFjeJxv+fSOOQKOPbJxSfM6G5sWZjAyWhXiTIIAmQqnlLlh',
      crossorigin: 'anonymous',
      onload: 'renderMathInElement(document.body);',
    },
  ],
})
</script>

<style></style>
