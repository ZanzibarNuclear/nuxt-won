<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { data: pageData } = await useFetch('/api/participants', {
  onResponse({ request, response, options }) {
    console.log('data', response._data)
    console.log('data.participants', response._data.participants)
    console.log('data.participants[0]', response._data.participants[0])
    console.log(
      'data.participants[0].alias',
      response._data.participants[0].alias
    )
  },
})

type Post = { statement: string; postedAt: Date }
type Thread = { topic: string; statements: Post[] }
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
  joinedAt: Date | null
  karma: number
}

const myContext = ref({})

const chosenTopic = ref('')

onMounted(() => {
  if (pageData.value?.participants) {
    console.log('me', pageData.value.participants[0].alias)
    myContext.value = pageData.value.participants[0]
    console.log('my context', myContext.value)
  }
})

const isRegistered = computed(() => {
  return !!myContext.value.id
})

const doRegister = async () => {
  if (!user.value) {
    alert('You are not signed in')
    return
  }
  const user_id = user.value.id
  console.log('For user ID: ' + user_id)

  const { body } = await $fetch('/api/participants', {
    method: 'post',
    body: { alias: wsy.alias, user_id },
  })
}

const doStartThread = () => {
  if (wsy.threads[wsy.topicKey] !== null) {
    wsy.activeThreadKey = wsy.topicKey
  }
  const key: string = wsy.topicKey // TODO: generate by the backend on insert
  wsy.threads[key] = { topic: wsy.topic, statements: [] }
  wsy.activeThreadKey = key
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

const doChooseTopic = () => {
  if (chosenTopic.value === null) {
    return
  }
  wsy.activeThreadKey = chosenTopic.value
}

const doInvite = () => {
  alert(
    `We will send an invitation to ${wsy.friendEmail} and bring them to [${wsy.activeThreadKey}].`
  )
}

const doPost = () => {
  if (!activeThread.value) {
    return
  }
  activeThread.value.statements.push({
    statement: wsy.statement,
    postedAt: new Date(),
  })
  wsy.statement = ''
}
</script>

<template>
  <div>
    <div v-if="isRegistered">
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
        <div v-if="inactiveTopics.length > 0" class="my-4">
          <UFormGroup label="Pick another topic">
            <USelect
              v-model="chosenTopic"
              :options="inactiveTopics"
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
            <UButton class="mt-2" @click="doPost">Post</UButton>
          </div>
        </div>
        <ul>
          <li v-for="item in activeThread.statements" class="my-3">
            <UCard>
              <template #header>
                <span class="text-xs">{{ item.postedAt }}</span>
              </template>
              {{ item.statement }}
            </UCard>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
