<template>
  <div
    class="text-center w-3/4 mx-auto text-[#222222] dark:text-[#ffa] bg-[#f5f5f5] dark:bg-[#333] rounded-md p-4 mb-12"
  >
    <div v-if="isKnownPlayer && !edit">
      <h3>About You</h3>
      <div class="text-xl">
        People shall know you as "{{ player.alias }}."
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
        <div class="text-xl" v-if="edit">Change Your Alias</div>
        <div class="text-xl" v-else>Join in the Fun</div>
        <UForm :state="playerState" :schema="playerSchema" @submit="onSubmit">
          <UFormGroup
            label="Alias"
            description="This is how you will be known to the world. Think of it as a pen name."
          >
            <UInput v-model="playerState.alias" />
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
import type { Database } from '~/types/supabase'

const props = defineProps(['player'])
const emit = defineEmits(['close'])

const supabase = useSupabaseClient<Database>()
const userContext = useUserStore()

const edit = ref(false)

const playerSchema = object({
  alias: string(),
})
type Schema = InferType<typeof playerSchema>
const playerState = reactive({
  alias: '',
})

const isSignedIn = computed(() => !!userContext.user)
const isKnownPlayer = computed(() => !!props.player)

function editPlayer() {
  edit.value = true
  playerState.alias = props.player.alias || userContext.profile?.alias || ''
}
function cancelEditPlayer() {
  edit.value = false
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!userContext.user) {
    alert(
      'You are not signed in. How is that possible? Anyway, sign in first please.'
    )
    return
  }
  const { data, error } = await supabase
    .from('wsy_participants')
    .upsert({
      id: props.player.id,
      user_id: userContext.user.id,
      alias: event.data.alias,
    })
    .select()

  if (error) {
    alert('Something dreadful happened: ' + error.message)
  }
  userContext.setPlayer(data[0])
  edit.value = false
}
</script>
