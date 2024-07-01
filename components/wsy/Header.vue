<template>
  <div
    class="text-center w-3/4 mx-auto text-[#222222] dark:text-[#ffa] bg-[#f5f5f5] dark:bg-[#333] rounded-md p-4 mb-12"
  >
    <div v-if="isKnownPlayer && !isEdit">
      <h3>About You</h3>
      <div class="text-xl">
        People shall know you as "{{ player.penName }}."
        <UButton
          @click="editPlayer"
          icon="i-mdi-edit"
          label="change alias"
          variant="solid"
          color="primary"
          size="xs"
        />
      </div>
      <div class="my-2">
        You joined the discussion on {{ displayAsDateTime(player.joined_at) }}.
      </div>
      <div>
        <UButton icon="i-ph-x" size="xs" label="close" @click="emit('close')" />
      </div>
    </div>
    <div v-else>
      <div v-if="isSignedIn">
        <div class="text-xl" v-if="isEdit">Change Your Alias</div>
        <div class="text-xl" v-else>Join in the Fun</div>
        <UForm :state="playerState" :schema="playerSchema" @submit="onSubmit">
          <UFormGroup
            label="Pen Name"
            description="This is how you will be known to the world. You can change it later."
          >
            <UInput v-model="playerState.penName" />
          </UFormGroup>
          <UButton
            block
            type="submit"
            color="gray"
            variant="solid"
            :label="isKnownPlayer ? 'Change' : 'Start'"
            class="mt-2"
          />
        </UForm>
        <UButton
          @click="cancelEditPlayer"
          icon="i-mdi-cancel"
          label="cancel"
          variant="solid"
          color="amber"
          size="xs"
          class="mt-4"
        />
      </div>
      <div v-else>Who are you? Sign in, please.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { join, updateWriter } from '~/db/WhatSayYouModel'

const props = defineProps(['player'])
const emit = defineEmits(['close'])
const userContext = useUserStore()
const isEdit = ref(false)

const playerSchema = object({
  penName: string(),
})
type Schema = InferType<typeof playerSchema>
const playerState = reactive({
  penName: '',
})

const isSignedIn = computed(() => !!userContext.user)
const isKnownPlayer = computed(() => !!props.player)

function editPlayer() {
  isEdit.value = true
  playerState.penName = props.player.penName || ''
}
function cancelEditPlayer() {
  isEdit.value = false
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!userContext.user) {
    alert(
      'You are not signed in. How is that possible? Anyway, sign in first please.'
    )
    return
  }
  const { penName } = event.data
  const playerId = userContext.user.id
  let player
  if (isEdit.value) {
    const player = await updateWriter(playerId, penName)
    isEdit.value = false
  } else {
    const player = await join(playerId, penName)
  }
  userContext.setWsyWriter(player)
}
</script>
