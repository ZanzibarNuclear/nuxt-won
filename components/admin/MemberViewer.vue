<template>
  <div>
    <h2>Members</h2>
    <div class="flex space-x-2">
      <UButton
        :disabled="lastPage"
        label="Load Invites"
        @click="loadNextBatch"
      />
      <div class="flex">
        <span>Screen Name:</span>
        <UInput v-model="fetchParams.screenName" size="md" />
        <UButton label="Find" @click="findProfiles" />
      </div>
      <UButton label="Clear" @click="reset" />
    </div>
    <div>
      next offset: {{ fetchParams.offset }} max rows: {{ fetchParams.limit }}
    </div>
    <UTable :rows="inView" :columns="columns" />
  </div>
</template>

<script setup lang="ts">
import { scanUserProfiles } from '~/db/UserModel'

const inView = ref([])
const fetchParams = reactive({
  limit: 10,
  offset: 0,
  screenName: null,
})
const lastPage = ref(false)

const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'username',
    label: 'Username',
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

const reset = () => {
  inView.value = []
  fetchParams.offset = 0
  lastPage.value = false
  fetchParams.screenName = null
}

const loadNextBatch = async () => {
  const nextBatch = await scanUserProfiles(
    fetchParams.offset,
    fetchParams.limit
  )
  inView.value = nextBatch
  fetchParams.offset += nextBatch.length
  lastPage.value = nextBatch.length < fetchParams.limit
}

const findProfiles = async () => {
  const nextBatch = await scanUserProfiles(
    fetchParams.offset,
    fetchParams.limit,
    fetchParams.screenName
  )
  inView.value = nextBatch
  fetchParams.offset += nextBatch.length
  lastPage.value = nextBatch.length < fetchParams.limit
}

// const { data, pending, error, refresh, clear } = await useAsyncData(
//   'memberProfiles',
//   () => loadNextBatch()
// )
</script>
