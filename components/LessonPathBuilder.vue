<template>
  <div>
    <h3>Put together paths through this course</h3>
    <LessonPathForm
      :lessons="workshop.lessonList"
      :course-key="courseKey"
      @save-path="onAddPath"
    />
    <h3>Laying it out there</h3>
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
import { createLessonPath } from '~/db/LessonPathModel'

const props = defineProps(['lessonPaths', 'courseKey'])
const workshop = useWorkshopStore()

const onAddPath = (pathData) => {
  const newPath = createLessonPath(pathData)
  console.log('created a path', newPath)
}
const onCancel = () => {
  console.log('path canceled')
}
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
