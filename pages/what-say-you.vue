<template>
  <div class="text-2xl font-bold">What Say You</div>
  <UForm
    :schema="schema"
    :state="state"
    class="mt-6 space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Your pithy wisdom, or whatever" name="statement">
      <UTextarea
        v-model="state.statement"
        name="statement"
        placeholder="Go ahead and type something. Anything."
        autoresize
      />
    </UFormGroup>
    <UButton type="submit" label="Say it" />
    <UButton color="blue" label="Take it back" @click="onTakeItBack" />
  </UForm>
  <UButton
    class="mt-8"
    color="amber"
    variant="solid"
    label="Start over"
    @click="onClear"
  />

  <div class="my-12 py-4 border-y">
    <div class="text-2xl">These are the things you have said.</div>
    <ul class="mt-6">
      <li v-for="item in wsy.statements" key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { useWsyStore } from '@/stores/wsyStore'

const wsy = useWsyStore()

const schema = object({
  statement: string().required('Say something, please.'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  statement: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { statement } = event.data
  wsy.makeStatement(statement)
  state.statement = undefined
}
async function onTakeItBack() {
  console.log('clicked button to remove last statement')
  const whatWasSaid = wsy.takeItBack()
  alert('You took back: ' + whatWasSaid)
}
async function onClear() {
  console.log('clicked button to clear')
  wsy.clear()
}

defineShortcuts({
  meta_shift: {
    usingInput: true,
    handler: () => {
      console.log('figure out how to submit form with this shortcut')
    },
  },
})
</script>

<style lang="scss" scoped></style>
