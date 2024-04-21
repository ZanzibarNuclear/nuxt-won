<template>
  <div>
    <div class="my-6" v-if="!isRegistered">
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
      <UButton @click="doRegister">Join the Fun</UButton>
    </div>
    <div v-else>
      <h2>
        Listen up. <span class="text_primary">{{ wsy.alias }}</span> has
        something to say
      </h2>
    </div>

    <div class="my-6" v-if="isRegistered">
      <div>
        Next, say what you want to talk about, the subject of your
        pontification.
      </div>
      <UFormGroup label="Topic" description="What is the topic?">
        <UInput v-model="wsy.topic" />
      </UFormGroup>
      <UButton @click="doStartThread">Start a Topic</UButton>
    </div>

    <div class="my-6" v-if="isActiveThread">
      <div>
        Now make as many statements as you want. Simply stop when you have said
        it all. Sit back and wait for reactions.
      </div>
      <div>Invite your friends to respond.</div>
      <div>Change the subject whenever you want to.</div>
      <div v-if="isRegistered">
        <UFormGroup label="Make a statement. Speak your mind.">
          <UTextarea v-model="wsy.statement" />
        </UFormGroup>
        <UButton @click="doPost">Post</UButton>
      </div>
    </div>

    <div v-if="isActiveThread">
      <h2>{{ wsy.alias }} says...</h2>
      <h3>{{ activeThread.topic }}</h3>
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
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const wsy = reactive({
  alias: '',
  statement: '',
  topic: '',
  activeThread: 'abcd',
  threads: {
    abcd: {
      topic: 'Cheese',
      statements: [{ statement: 'I like cheese.', postedAt: new Date() }],
    },
  },
})

const isRegistered = ref(false)
const isActiveThread = ref(false)

const activeThread = computed(() => {
  if (!isActiveThread) {
    return {
      topic: '',
      statements: [],
    }
  }
  return wsy.threads[wsy.activeThread]
})

const doRegister = () => {
  isRegistered.value = true
}

const doStartThread = () => {
  const key = 'abcd'
  wsy.activeThread = key
  wsy.threads[key].topic = wsy.topic
  isActiveThread.value = true
}

const doPost = () => {
  activeThread.value.statements.push({
    statement: wsy.statement,
    postedAt: new Date(),
  })
  wsy.statement = ''
}
</script>
