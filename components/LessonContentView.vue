<template>
  <div>
    <div v-for="part in contentParts" class="my-4">
      <ContentPartHtml
        v-if="part.type === LessonContentEnum.html"
        :fields="part.details"
        :preview="true"
      />
      <ContentPartImage
        v-if="part.type === LessonContentEnum.image"
        :fields="part.details"
        :preview="true"
      />
      <ContentPartFormula
        v-if="part.type === LessonContentEnum.formula"
        :fields="part.details"
        :preview="true"
      />
      <ContentPartFigure
        v-if="part.type === LessonContentEnum.figure"
        :fields="part.details"
        preview
      />
      <ContentPartVideo
        v-if="part.type === LessonContentEnum.video"
        :fields="part.details"
        :preview="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LessonContentEnum } from '~/types/won-types'
defineProps(['contentParts'])
</script>

<style scoped></style>
