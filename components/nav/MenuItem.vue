<template>
  <div class="relative">
    <!-- Main Menu Item -->
    <UButton
      @click="onClick"
      :label="label"
      :icon="icon"
      variant="outline"
      class="flex items-center space-x-2 hover:bg-gray-700 px-4 py-2 rounded-lg"
    >
    </UButton>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
  },
  label: {
    type: String,
  },
  route: {
    type: String,
  },
  external: {
    type: Boolean,
  },
})
const emit = defineEmits(['pickedItem'])

const onClick = () => {
  console.log('clicked menu item ' + props.route)
  emit('pickedItem')
  if (props.external) {
    navigateTo(props.route, { external: true })
  } else {
    navigateTo(props.route)
  }
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
