<template>
  <div>
    <h3>Put together paths through this course</h3>
    <div>Laying it out there</div>
    <div v-if="!lessonPaths?.length">
      Create at least one path through this amazing course.
    </div>
    <ul v-else>
      <li v-for="path in lessonPaths">
        {{ path.name }} {{ path.publicKey }} Start with {{ path.trailhead }}
        <ul v-if="path.steps">
          <li v-for="step in path.steps">
            From {{ step.from }} to {{ step.to }} : {{ step.teaser }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['lessonPaths'])
onUpdated(() => {
  console.log('got these paths', props.lessonPaths)
})
</script>

<style scoped>
ul {
  list-style: circle inside;
  margin-bottom: 1.5rem;
}
li ul {
  margin-left: 1.5rem;
}
</style>
