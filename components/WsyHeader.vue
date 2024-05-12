<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import type { Database } from '~/types/supabase'

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const wsy = useWsyStore()

const edit = ref(false)

const playerSchema = object({
  alias: string(),
})
type Schema = InferType<typeof playerSchema>
const playerState = reactive({
  alias: '',
})

const isSignedIn = computed(() => !!user.value)
const player = computed(() => wsy.player)
const isKnownPlayer = computed(() => player.value)

onMounted(async () => {
  const { data } = await supabase
    .from('wsy_participants')
    .select('*')
    .eq('user_id', user.value.id)
  if (data?.length > 0) {
    wsy.setPlayer(data[0])
    playerState.alias = data[0].alias
  }
})

function editPlayer() {
  edit.value = true
}
function cancelEditPlayer() {
  edit.value = false
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!user.value) {
    alert(
      'You are not signed in. How is that possible? Anyway, sign in first please.'
    )
    return
  }
  const { data, error } = await supabase
    .from('wsy_participants')
    .upsert({
      id: player.value?.id,
      user_id: user.value.id,
      alias: event.data.alias,
    })
    .select()

  if (error) {
    alert('Something dreadful happened: ' + error.message)
  }
  wsy.setPlayer(data[0])
  edit.value = false
}
</script>

<template>
  <div class="my-6 border p-2 rounded-md bg-slate-100">
    <div v-if="isKnownPlayer && !edit">
      <div class="text-xl">People know you as "{{ player.alias }}."</div>
      <div>
        You joined on {{ displayAsDateTime(player.joined_at) }}.
        <UBadge class="mx-2" color="primary" variant="solid" rounded
          >{{ player.karma }} karma points</UBadge
        >
        <UButton
          @click="editPlayer"
          icon="i-mdi-edit"
          label="change alias"
          variant="solid"
          color="lime"
          size="xs"
        />
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
