<template>
  <UForm
    ref="wsyForm"
    :schema="schema"
    :state="state"
    class="mt-6 space-y-4"
    @submit="handleSubmit"
  >
    <UFormGroup label="Your pithy wisdom, or whatever" name="statement">
      <UTextarea
        autofocus
        v-model="state.statement"
        name="statement"
        placeholder="Go ahead and type something. Anything."
        autoresize
      />
    </UFormGroup>
    <div class="relative mb-16">
      <div class="absolute left-0 top-0">
        <UButton class="mr-4" type="submit" label="Say it" />
        <UButton color="blue" label="Take it back" @click="handleTakeItBack" />
      </div>
      <UButton
        class="absolute right-0 top-0"
        color="amber"
        variant="solid"
        label="Start over"
        @click="handleClear"
      />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent, Form } from '#ui/types'
import { useWsyStore } from '@/stores/wsyStore'

type Schema = InferType<typeof schema>

const wsy = useWsyStore()
const wsyForm = ref(null)

const schema = object({
  statement: string().required('Say something, please.'),
})

const state = reactive({
  statement: undefined,
})

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  const { statement } = event.data
  wsy.makeStatement(statement)
  state.statement = undefined
}
async function handleTakeItBack() {
  const whatWasSaid = wsy.takeItBack()
  console.log('You took back: ' + whatWasSaid)
}
async function handleClear() {
  wsy.clear()
}

defineShortcuts({
  meta_enter: {
    usingInput: true,
    handler: () => {
      if (wsyForm.value) {
        wsyForm.value.submit()
      }
    },
  },
  ctrl_z: {
    usingInput: true,
    handler: () => {
      handleTakeItBack()
    },
  },
})
</script>

<style lang="scss" scoped></style>
