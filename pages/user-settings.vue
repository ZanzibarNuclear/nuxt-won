<template>
  <h1>Account Information and Settings</h1>
  <div class="my-8">
    <div v-if="isEdit">
      <UButton @click="toggleEdit" icon="i-ph-pencil-slash" class="mb-6"
        >Cancel</UButton
      >
      <UserProfileForm />
    </div>
    <div v-else>
      <UButton @click="toggleEdit" icon="i-ph-pencil-duotone" class="mb-6"
        >Edit</UButton
      >
      <UserProfileView />
    </div>
  </div>
</template>

<script setup lang="ts">
const isEdit = ref(false)
const toggleEdit = () => {
  isEdit.value = !isEdit.value
}
</script>

<style lang="scss" scoped></style>
