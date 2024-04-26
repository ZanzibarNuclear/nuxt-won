<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const wsy = useWsyStore()

type Entry = { statement: string; posted_at: string }
type Thread = { id: number | null; topic: string; entries: Entry[] }
type ThreadMap = { [k: string]: Thread }
type WhatSayYouContext = {
  alias: string
  joinedAt: Date | null
  statement: string
  topic: string
  topicKey: string
  friendEmail: string
  activeThreadKey: string | null
  threads: ThreadMap
}
const wsyTemp: WhatSayYouContext = reactive({
  alias: '',
  joinedAt: null,
  statement: '',
  topic: '',
  topicKey: '',
  friendEmail: '',
  activeThreadKey: null,
  threads: {},
})

const myContext = computed(() => wsy.player)
const latestEntry = ref()

const isRegistered = computed(() => {
  return !!myContext.value?.id
})

const activeThread = computed(() => {
  if (!wsyTemp.activeThreadKey) {
    return null
  }
  return wsyTemp.threads[wsyTemp.activeThreadKey]
})

const doPostEntry = async () => {
  if (!activeThread.value) {
    return
  }

  latestEntry.value = await $fetch('/api/entries', {
    method: 'post',
    body: {
      threadId: activeThread.value.id,
      participantId: myContext.value?.id,
      respondingToId: latestEntry.value?.id,
      statement: wsyTemp.statement,
    },
  })
  if (!activeThread.value.entries) {
    activeThread.value.entries = []
  }
  activeThread.value.entries.push({ ...latestEntry.value })
  wsyTemp.statement = ''
}
</script>

<template>
  <div>
    <WhatSayYouHeader />
    <WhatSayYouTopic v-if="wsy.isPlayerLoaded" />
    <div v-if="wsy.isPlayerLoaded">
      <hr class="y-6" />
      <div v-if="activeThread">
        <div class="my-6">
          <div>
            Now make as many statements as you want. Simply stop when you have
            said it all. Sit back and wait for reactions.
          </div>
          <div v-if="isRegistered">
            <UFormGroup label="Make a statement. Speak your mind.">
              <UTextarea v-model="wsyTemp.statement" />
            </UFormGroup>
            <UButton class="mt-2" @click="doPostEntry">Post</UButton>
          </div>
        </div>
        <ul>
          <li v-for="item in activeThread.entries" class="my-3">
            <UCard>
              <template #header>
                <span class="text-xs">{{ item.posted_at }}</span>
              </template>
              {{ item.statement }}
            </UCard>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
