<template>
  <div>
    <h2>Invitations</h2>
    <div>
      <UButton
        :disabled="lastPage"
        label="Load Events"
        @click="loadNextBatch"
      />
      next offset: {{ fetchParams.offset }} batch size: {{ fetchParams.limit }}
    </div>
    <UTable :rows="inView" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { retrieveEvents } from '~/db/EventModel'

const inView = ref([])
const fetchParams = reactive({
  limit: 10,
  offset: 0,
  actor: null,
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
  const nextBatch = await retrieveEvents(
    fetchParams.offset,
    fetchParams.limit,
    fetchParams.actor
  )
  inView.value = nextBatch
  fetchParams.offset += nextBatch.length
  lastPage.value = nextBatch.length < fetchParams.limit
}

const { data, pending, error, refresh, clear } = await useAsyncData(
  'events',
  () => loadNextBatch()
)
</script>
