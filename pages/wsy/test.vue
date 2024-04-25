<script setup lang="ts">
const getResults = ref('')
const postResults = ref('')
const errorResults = ref()
const counter = ref(0)

const pingResults = ref('')
const pingPostResults = ref([])

const reset = () => {
  getResults.value = ''
  postResults.value = ''
  errorResults.value = null
  counter.value = 0
  pingResults.value = ''
  pingPostResults.value = []
}

const doRunTests = async () => {
  getResults.value = await $fetch('/api/test')
  postResults.value = await $fetch('/api/test', {
    method: 'POST',
    body: {
      count: ++counter.value,
      message: 'Message in a bottle',
    },
  })
}

const doErrorTest = async () => {
  try {
    const bogus = await $fetch('/api/test', {
      method: 'DELETE',
      body: {
        data: 'important update',
      },
    })
  } catch (err) {
    errorResults.value = err
  }
}

const doPingTest = async () => {
  pingResults.value = await $fetch('/api/test/ping')
}

const doPingPostTest = async () => {
  const answer = await $fetch('/api/test/ping', {
    method: 'POST',
    body: {
      byFives: counter.value * 5,
    },
  })
  pingPostResults.value.push(answer)
}
</script>

<template>
  <UCard class="my-6">
    <div>Testing API access</div>
    <div><UButton @click="doRunTests">Test</UButton></div>
    <div>Get results: {{ getResults }}</div>
    <div>Post results: {{ postResults }}</div>
  </UCard>

  <UCard class="my-6">
    <div>
      <UButton @click="doErrorTest">Force error</UButton> {{ errorResults }}
    </div>
  </UCard>

  <UCard class="my-6">
    <div><UButton @click="doPingTest">Ping Get</UButton> {{ pingResults }}</div>
  </UCard>

  <UCard class="my-6">
    <div>
      <UButton @click="doPingPostTest">Ping Post</UButton>
      <div v-for="result in pingPostResults">{{ result }}</div>
    </div>
  </UCard>
  <div>
    <UButton @click="reset" variant="solid" color="orange">Reset</UButton>
  </div>
</template>
