<template>
  <div class="px-6 py-2">
    <h3>Feedback</h3>
    <div class="my-4">
      We would love to know what you think about World of Nuclear. What do you
      wish was better? What is missing? Did you find something that's incorrect
      or not working?
    </div>
    <div class="my-4">
      You can also say how much you enjoy it here. We don't mind getting a pat
      on the head once in a while.
    </div>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup
        label="Comment"
        name="comment"
        :hint="maxFeedbackLength + ' characters max.'"
        :description="warning"
      >
        <UTextarea v-model="state.comment" autoresize />
      </UFormGroup>
      <UButton type="submit" label="Send Feedback" />
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const props = defineProps({
  context: {
    type: String,
    default: 'general',
  },
})
const emit = defineEmits(['deliverFeedback'])

const userContext = useUserStore()

const schema = object({
  comment: string()
    .required('Looks like you forgot to write your feedback.')
    .max(
      1000,
      'For starters, please keep it brief. We can follow up in email if you like.'
    ),
})

type Schema = InferType<typeof schema>

const state = reactive({
  comment: undefined,
})

const maxFeedbackLength = 1000
const warning = computed(() => {
  if (!state.comment) {
    return (
      'You have ' + maxFeedbackLength + ' characters to tell us what you think.'
    )
  } else {
    const remaining = maxFeedbackLength - state.comment.length
    if (remaining >= 0) {
      return `${remaining} characters left`
    } else {
      return `${remaining * -1} characters over!!`
    }
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
  console.log('Context=' + props.context)
  const feedback = {
    ...event.data,
    context: props.context,
    userId: userContext.user?.id,
  }
  emit('deliverFeedback', feedback)
}
</script>

<style scoped></style>
