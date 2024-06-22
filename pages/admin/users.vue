<template>
  <UContainer class="mt-16">
    <h2>Members</h2>
    <div>
      <UButton
        :disabled="lastPage"
        label="Load Invites"
        @click="loadNextBatch"
      />
      next offset: {{ fetchParams.offset }} batch size: {{ fetchParams.limit }}
    </div>
    <UTable :rows="inView" :columns="columns" />
  </UContainer>
</template>

<script setup lang="ts">
import { scanUserProfiles } from '~/db/UserModel'

const inView = ref([])
const fetchParams = reactive({
  limit: 10,
  offset: 0,
})
const lastPage = ref(false)

const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'username',
  },
  {
    key: 'full_name',
    label: 'Full Name',
  },
  {
    key: 'screen_name',
    label: 'Screen Name',
  },
  {
    key: 'joined_at',
    label: 'Joined Date',
  },
  {
    key: 'join_reason',
    label: 'Reason',
  },
  {
    key: 'nuclear_likes',
    label: 'Likes',
  },
]

const loadNextBatch = async () => {
  const nextBatch = await scanUserProfiles(
    fetchParams.offset,
    fetchParams.limit
  )
  inView.value = nextBatch
  fetchParams.offset += nextBatch.length
  lastPage.value = nextBatch.length < fetchParams.limit
}

const { data, pending, error, refresh, clear } = await useAsyncData(
  'memberProfiles',
  () => loadNextBatch()
)
</script>
