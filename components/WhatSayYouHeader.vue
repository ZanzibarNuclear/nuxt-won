<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const wsy = useWsyStore()

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
  const { data } = await supabase.from('wsy_participants').select('*')
  if (data) {
    wsy.setPlayer(data[0])
    playerState.alias = wsy.player.alias
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  if (!user.value) {
    alert(
      'You are not signed in. How is that possible? Anyway, sign in first please.'
    )
    return
  }
  const values = {
    user_id: user.value.id,
    alias: event.data.alias,
  }
  const { data, error } = await supabase
    .from('wsy_participants')
    .upsert(values)
    .select()

  if (error) {
    alert('Something dreadful happened: ' + error.message)
  }
  wsy.setPlayer(data[0])
}
</script>

<template>
  <div v-if="isKnownPlayer">
    <div>
      People know you as <span class="text-primary">{{ player.alias }}</span
      >. You joined on {{ displayAsDateTime(player.joined_at) }}. You have
      {{ player.karma }} karma points.
    </div>
    <h2>
      Listen up, people.
      <span class="text-primary">{{ player.alias }}</span> has a few things to
      say.
    </h2>
  </div>
  <div v-else>
    <div v-if="isSignedIn">
      <h2>Join in the Fun</h2>
      <div>
        First join the discussion by giving yourself an alias. This is how you
        want to be known to the group.
      </div>
      <UForm :state="playerState" :schema="playerSchema" @submit="onSubmit">
        <UFormGroup
          label="Alias"
          description="What name do you want others to see?"
        >
          <UInput v-model="playerState.alias" />
        </UFormGroup>
        <UButton class="mt-2" type="submit">Join the Fun</UButton>
      </UForm>
    </div>
    <div v-else>Who are you? Sign in, please.</div>
  </div>
</template>
