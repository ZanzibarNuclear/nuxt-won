<script setup lang="ts">
const user = useSupabaseUser()

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
const wsy: WhatSayYouContext = reactive({
  alias: '',
  joinedAt: null,
  statement: '',
  topic: '',
  topicKey: '',
  friendEmail: '',
  activeThreadKey: null,
  threads: {},
})
type Participant = {
  id: number
  user_id: string
  alias: string
  joined_at: string
  karma: number
}

const myContext: Ref<Participant | undefined> = ref()
const myActiveThread = ref()
const latestEntry = ref()
const allThreads = ref()
const loadedThread = ref()

const chosenTopic = ref('')
const { data: pageData } = await useFetch('/api/participants')
const { data: threadsData } = await useFetch('/api/threads')

const isRegistered = computed(() => {
  return !!myContext.value?.id
})

onMounted(() => {
  if (pageData.value?.participants) {
    myContext.value = pageData.value.participants
  }
  if (threadsData.value?.threads) {
    console.log('loaded thread info')
    allThreads.value = threadsData.value.threads
  }
})

const doRegister = async () => {
  if (!user.value) {
    alert('You are not signed in')
    return
  }
  const user_id = user.value.id
  myContext.value = await $fetch('/api/participants', {
    method: 'post',
    body: { alias: wsy.alias, user_id },
  })
}

const doStartThread = async () => {
  // TODO: add validation to topic field

  myActiveThread.value = await $fetch('/api/threads', {
    method: 'post',
    body: {
      owner_id: myContext.value?.id,
      topic: wsy.topic,
    },
  })
  console.log('Created thread ' + myActiveThread.value)

  const thread = myActiveThread.value
  wsy.threads[thread.public_key] = { ...thread }
  wsy.activeThreadKey = thread.public_key
}

const doNewThread = () => {
  wsy.topicKey = ''
  wsy.topic = ''
  wsy.activeThreadKey = null
}

const activeThread = computed(() => {
  if (!wsy.activeThreadKey) {
    return null
  }
  return wsy.threads[wsy.activeThreadKey]
})

const allTopicsList = computed(() => {
  console.log('build list of topics')
  const topics = allThreads.value
    .filter((thread) => thread.public_key != activeThread.key)
    .map((thread) => ({
      key: thread.public_key,
      topic: thread.topic,
    }))
  return topics
})

const inactiveTopics = computed(() => {
  const topicKeys = Object.keys(wsy.threads)
  const topics = topicKeys
    .filter((key) => key != wsy.activeThreadKey)
    .map((key) => ({
      key: key,
      topic: wsy.threads[key].topic,
    }))
  return topics
})

const doChooseTopic = async () => {
  if (chosenTopic.value === null) {
    return
  }

  // TODO: load thread and its entries
  loadedThread.value = await $fetch(`/api/threads/${chosenTopic.value}`)
  console.log('fetched thread', loadedThread.value)
  wsy.activeThreadKey = chosenTopic.value
}

const doInvite = () => {
  alert(
    `We will send an invitation to ${wsy.friendEmail} and bring them to [${wsy.activeThreadKey}].`
  )
}

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
      statement: wsy.statement,
    },
  })

  activeThread.value.entries.push({ ...latestEntry.value })
  wsy.statement = ''
}
</script>

<template>
  <div>
    <div v-if="isRegistered && myContext">
      <div>
        Participant: {{ myContext.alias }} ({{ myContext.id }}) joined on
        {{ displayAsDateTime(myContext.joined_at) }}. You have
        {{ myContext.karma }} karma points.
      </div>
      <h2>
        Listen up, people.
        <span class="text-primary">{{ myContext.alias }}</span> has a few things
        to say.
      </h2>
    </div>
    <div class="my-6" v-else>
      <h2>Join in the Fun</h2>
      <div>
        First join the discussion by giving yourself an alias. This is how you
        want to be known to the group.
      </div>
      <UFormGroup
        label="Alias"
        description="What name do you want others to see?"
      >
        <UInput v-model="wsy.alias" />
      </UFormGroup>
      <UButton class="mt-2" @click="doRegister">Join the Fun</UButton>
    </div>

    <div v-if="isRegistered">
      <div class="my-6" v-if="!activeThread">
        <div>
          Next, say what you want to talk about, the subject of your
          pontification.
        </div>
        <UFormGroup label="Topic" description="What is the topic?">
          <UInput v-model="wsy.topic" />
        </UFormGroup>
        <UFormGroup label="Topic Key" description="Make it unique (temporary)">
          <UInput v-model="wsy.topicKey" />
        </UFormGroup>
        <UButton class="mt-2" @click="doStartThread">Start a Topic</UButton>
      </div>
      <div v-else>
        <h2>
          We are talking about:
          <span class="text-primary">{{ activeThread.topic }}</span>
        </h2>
        <div>
          Invite your friends to respond.
          <UFormGroup label="Email" description="Your friend's email address">
            <UInput v-model="wsy.friendEmail" />
          </UFormGroup>
          <UButton class="mt-2" @click="doInvite">Invite</UButton>
        </div>
        <div class="my-4">
          <UButton @click="doNewThread">Start a new topic</UButton>
        </div>
        <div v-if="allTopicsList.length > 0" class="my-4">
          <UFormGroup label="Pick another topic">
            <USelect
              v-model="chosenTopic"
              :options="allTopicsList"
              option-attribute="topic"
              value-attribute="key"
            />
          </UFormGroup>
          <UButton class="mt-2" @click="doChooseTopic">Change topics</UButton>
        </div>
      </div>

      <hr class="y-6" />
      <div v-if="activeThread">
        <div class="my-6">
          <div>
            Now make as many statements as you want. Simply stop when you have
            said it all. Sit back and wait for reactions.
          </div>
          <div v-if="isRegistered">
            <UFormGroup label="Make a statement. Speak your mind.">
              <UTextarea v-model="wsy.statement" />
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
