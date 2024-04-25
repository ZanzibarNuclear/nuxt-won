<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

type Participant = {
  id: number
  user_id: string
  alias: string
  joined_at: string
  karma: number
}
const aboutMe: Ref<Participant | undefined> = ref()

const schema = object({
  alias: string(),
})
type Schema = InferType<typeof schema>
const state = reactive({
  alias: undefined,
})

const isSignedIn = computed(() => !!user.value)

onMounted(async () => {
  const { data } = await supabase.from('wsy_participants').select('*')
  if (data) {
    aboutMe.value = data[0]
    state.alias = aboutMe.value?.alias
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
  aboutMe.value = data[0]
}
</script>

<template>
  <div v-if="aboutMe">
    <div>
      People know you as <span class="text-primary">{{ aboutMe.alias }}</span
      >. You joined on {{ displayAsDateTime(aboutMe.joined_at) }}. You have
      {{ aboutMe.karma }} karma points.
    </div>
    <h2>
      Listen up, people.
      <span class="text-primary">{{ aboutMe.alias }}</span> has a few things to
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
      <UForm :state="state" :schema="schema" @submit="onSubmit">
        <UFormGroup
          label="Alias"
          description="What name do you want others to see?"
        >
          <UInput v-model="state.alias" />
        </UFormGroup>
        <UButton class="mt-2" type="submit">Join the Fun</UButton>
      </UForm>
    </div>
    <div v-else>Who are you? Sign in, please.</div>
  </div>
</template>
