<template>
  <div class="px-6 py-2">
    <h3>Feedback</h3>
    <div class="my-4">
      We would love to know what you think about World of Nuclear. What do you wish was better? What
      is missing? Did you find something that's incorrect or not working? Do you want to say how
      much you love it?
    </div>
    <div v-if="!userContext.user" class="font-bold text-center">
      This feedback form is for members only.<br />Please join or sign in to give feedback.
    </div>
    <UForm v-else :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup
        label="Comment"
        name="comment"
        :hint="maxFeedbackLength + ' characters max.'"
        :description="warning"
      >
        <UTextarea v-model="state.message" autoresize :maxrows="10" />
      </UFormGroup>
      <UButton type="submit" label="Send Feedback" />
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { MessagingRepository } from '~/api/wonService/MessagingRepo'

const props = defineProps({
  context: {
    type: String,
    default: 'general',
  },
})
const emit = defineEmits(['feedbackDelivered'])

const userContext = useUserStore()

const schema = object({
  message: string()
    .required('Looks like you forgot to write your feedback.')
    .max(1000, 'For starters, please keep it brief. We can follow up in email if you like.'),
})
type Schema = InferType<typeof schema>

const state = reactive({
  message: '',
})

const maxFeedbackLength = 1000
const warning = computed(() => {
  if (!state.message) {
    return 'You have ' + maxFeedbackLength + ' characters to tell us what you think.'
  } else {
    const remaining = maxFeedbackLength - state.message.length
    if (remaining >= 0) {
      return `${remaining} characters left`
    } else {
      return `${remaining * -1} characters over!!`
    }
  }
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const feedback = {
    message: event.data.message,
    context: props.context,
  }
  await MessagingRepository.submitFeedback(feedback)
  emit('feedbackDelivered', feedback)
}
</script>

<style scoped></style>
