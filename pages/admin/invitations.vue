<template>
  <UContainer class="mt-16">
    <h2>Invitations</h2>
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
import { retrieveInvitations } from '~/db/InvitationModel'

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
    key: 'name',
    label: 'invitee',
  },
  {
    key: 'email',
    label: 'invitee email',
  },
  {
    key: 'target',
    label: 'invited to',
  },
  {
    key: 'referral_code',
    label: 'referral code',
  },
  {
    key: 'recommended_by_id',
    label: 'invited by',
  },
  {
    key: 'sent_at',
    label: 'when invited',
  },
  {
    key: 'confirmed_at',
    label: 'accepted',
  },
  {
    key: 'unsubscribed_at',
    label: 'hard decline',
  },
  {
    key: 'delivery_error',
    label: 'problem with delivery',
  },
]

const loadNextBatch = async () => {
  const nextBatch = await retrieveInvitations(
    fetchParams.offset,
    fetchParams.limit
  )
  inView.value = nextBatch
  fetchParams.offset += nextBatch.length
  lastPage.value = nextBatch.length < fetchParams.limit
}

const { data, pending, error, refresh, clear } = await useAsyncData(
  'invitations',
  () => loadNextBatch()
)
</script>
