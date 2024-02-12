<template>
  <UCard class="mx-12">
    <template #header>
      <div class="text-2xl tracking-widest">Declaration of Age</div>
    </template>

    <div class="leading-loose">
      <div class="flex">
        <div class="flex-col pr-4">
          <p v-for="n in count">Today I am {{ age }} years old.</p>
        </div>
        <div class="flex-col">
          <UButton class="mr-2" @click="() => (count += 1)">
            <Icon name="mdi:plus" />
          </UButton>
          <UButton :disabled="count <= 1" @click="() => (count -= 1)">
            <Icon name="mdi:minus" />
          </UButton>
        </div>
      </div>
      <p class="mt-4">
        <UButton @click="emit('increment')">
          <Icon name="mdi:arrow-up" size="1.5em" />
        </UButton>
        or
        <UButton color="indigo" :disabled="age <= 0" @click="emit('decrement')">
          <Icon name="mdi:arrow-down" size="1.5em" />
        </UButton>
      </p>
    </div>

    <template #footer>
      <div class="text-sm tracking-tighter">
        And that's the truth...phtttthhh
      </div>
    </template>
  </UCard>
</template>

<script setup>
const props = defineProps({
  age: {
    type: Number,
    required: false,
  },
})
const emit = defineEmits(['increment', 'decrement'])
const count = ref(1)
</script>

<style lang="scss" scoped></style>
