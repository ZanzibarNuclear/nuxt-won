<template>
  <div>
    <h2>Feedback</h2>
    <div>
      <UButton
        :disabled="lastPage"
        label="Load Feedback"
        @click="loadNextBatch"
      />
      next offset: {{ fetchParams.offset }} batch size: {{ fetchParams.limit }}
    </div>
    <UTable :rows="inView" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { retrieveFeedback } from '~/db/FeedbackModel'

const inView = ref([])
const fetchParams = reactive({
  limit: 10,
  offset: 0,
})
const lastPage = ref(false)

const columns = [
  {
    key: 'id',
    label: 'Feedback ID',
  },
  {
    key: 'created_at',
    label: 'When Sent',
  },
  {
    key: 'user_id',
    label: 'Member ID',
  },
  {
    key: 'context',
    label: 'Context',
  },
  {
    key: 'message',
    label: 'Message',
  },
]

const loadNextBatch = async () => {
  const nextBatch = await retrieveFeedback(
    fetchParams.offset,
    fetchParams.limit
  )
  inView.value = nextBatch
  fetchParams.offset += nextBatch.length
  lastPage.value = nextBatch.length < fetchParams.limit
}
</script>
