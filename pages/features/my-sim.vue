<template>
  <div>
    <h1>My Nuclear Simulator</h1>
    <h2>Build-a-Pet Reactor Style</h2>
    <div>
      You get to choose the kind of reactor and personalize to make it your own.
      Some of these choices are just for fun. Others will influence the details
      that are presented as you learn. When you get the hang of running one type
      of reactor, create another pet of another type and see what is different.
    </div>
    <UCard>
      <UForm :state="state">
        <UFormGroup
          label="Name"
          name="name"
          description="Helps to distinguish one pet from another."
        >
          <UInput v-model="state.name" />
        </UFormGroup>
        <USelect v-model="state.reactorType" :options="reactorTypes" />
      </UForm>
    </UCard>
    <div class="text-md">
      This is where you get to create and care for your very own nuclear power
      plant. We can simulate a nuclear reactor core, the containment vessel, the
      fluids that move heat, the steam turbine, the electrical generator, and
      the cooling towers. We can simulate at the macro level - how much
      electricity and potentially useful heat is produced in a day - and at a
      more detailed level - how a reactor core behaves over time and how one
      part of the system impacts another.
    </div>
    <div>
      The point of a simulation is to learn. We can study one or another aspect
      at a time. It's a simulation, so mistakes are okay. Let's question
      everything and try to figure out the best explanations.
    </div>
    <div>
      Make this simulation your own by investing your time and creativity. We
      will keep adding personalization as we add interesting subjects to model.
      You might check on your model a few times a day. Let it run and see what
      happens. See if you make money or lose money. See what happens when the
      weather changes. How about during refueling? What if something goes wrong
      and the reactor SCRAMs? Can you get it restarted again? Can you learn the
      sequence of actions? Can you learn the calculations to keep reactivity at
      the right level? Can you adjust the fluxuating demands on the grid? What
      if you add flakey renewable? What is a stable baseload?
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'World of Nuclear - Simulations',
  ogTitle: 'World of Nuclear - Simulations',
  description:
    'Play with our simulators to improve your instincts about how nuclear energy can benefit humanity.',
  ogDescription:
    'Play with our simulators to improve your instincts about how nuclear energy can benefit humanity.',
})

const state = reactive({
  name: undefined,
  reactorType: undefined,
})
const reactorTypes = ref([
  'Pressurized Water',
  'Boiling Water',
  'Pressurized Heavy Water',
  'Light Water, Graphite-moderated',
  'Gas Cooled',
  'Liquid Metal Fast Breeder',
  'Sodium cooled fast reactor',
  'Molten Lead',
  'CANDU',
])
</script>

<style lang="scss" scoped></style>
