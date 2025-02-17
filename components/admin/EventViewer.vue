<template>
  <div>
    <h2>Events</h2>
    <div>
      <UButton :disabled="lastPage" label="Load Events" @click="loadNextBatch" />
      next offset: {{ fetchParams.offset }} batch size: {{ fetchParams.limit }}
    </div>
    <UTable :rows="inView" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { EventRepository, type EventSearch } from '~/api/wonService/EventRepo'

const eventRepo = EventRepository

const inView = ref([])
const fetchParams = reactive({
  limit: 10,
  offset: 0,
  actor: undefined,
})
const lastPage = ref(false)

const columns = [
  {
    key: 'id',
    label: 'Event ID',
  },
  {
    key: 'created_at',
    label: 'When',
  },
  {
    key: 'actor',
    label: 'Who',
  },
  {
    key: 'details',
    label: 'What',
  },
]

const loadNextBatch = async () => {
  const params: EventSearch = fetchParams
  const events = await eventRepo.find(params)

  inView.value = events.items
  fetchParams.offset += fetchParams.offset + events.total
  lastPage.value = !events.hasMore
}
</script>
