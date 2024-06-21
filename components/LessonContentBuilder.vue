<template>
  <div class="flex">
    <USelect :options="contentTypeOptions" v-model="nextContentType" />
    <UButton
      label="Add Content"
      size="sm"
      icon="i-ph-plus-circle"
      @click="addContent"
    />
  </div>
  <div v-for="part in workshop.sortedContents">
    <ContentPart
      :part="part"
      @cache-updated-part="handleCacheUpdatedPart"
      @remove-part="handleRemovePart"
    />
  </div>
</template>

<script setup lang="ts">
import { loadContentParts, createContentPart } from '~/db/ContentPartModel'
import {
  type ContentPart,
  type ContentDetails,
  LessonContentEnum,
} from '~/types/won-types'

const workshop = useWorkshopStore()

const props = defineProps(['lessonKey'])

const contentTypeOptions = [
  LessonContentEnum.html,
  LessonContentEnum.image,
  LessonContentEnum.formula,
  LessonContentEnum.video,
  LessonContentEnum.figure,
]
const nextContentType: Ref<LessonContentEnum> = ref(LessonContentEnum.html)

const nextCount = computed(() => {
  const parts = workshop.sortedContents
  if (parts.length > 0) {
    return parts[parts.length - 1].sequence + 1
  } else {
    return 1
  }
})

async function loadData() {
  const { data: parts, error } = await useAsyncData(
    `lesson-${props.lessonKey}-content`,
    () => loadContentParts(props.lessonKey)
  )
  if (parts.value) {
    parts.value.forEach((part) => workshop.cacheContentPart(part))
  }
}
await loadData()

const handleCacheUpdatedPart = (update: ContentPart) =>
  workshop.cacheContentPart(update)

const handleRemovePart = (publicKey: string) =>
  workshop.removeCachedContentPart(publicKey)

const addContent = async () => {
  let details: ContentDetails
  switch (nextContentType.value) {
    case LessonContentEnum.html: {
      details = {
        html: '',
      }
      break
    }
    case LessonContentEnum.image: {
      details = {
        src: '',
        alt: '',
        width: null,
        height: null,
        caption: '',
        credit: {
          name: '',
          url: '',
        },
        bgColor: '',
      }
      break
    }
    case LessonContentEnum.formula: {
      details = {
        latex: '',
        caption: '',
      }
      break
    }
    case LessonContentEnum.video: {
      details = {
        url: '',
        caption: '',
      }
      break
    }
    case LessonContentEnum.figure: {
      details = {
        src: '',
        caption: '',
        border: 'solid',
        width: '',
      }
      break
    }
    default: {
      details = {
        text: '',
      }
    }
  }
  const input = {
    lessonId: workshop.activeLesson?.id,
    type: nextContentType.value,
    sequence: nextCount.value,
    details,
  }
  const minted = await createContentPart(input)
  workshop.cacheContentPart(minted)
}
</script>

<style scoped></style>
