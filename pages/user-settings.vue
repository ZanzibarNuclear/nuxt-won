<template>
  <div class="text-2xl font-bold text-primary">
    Account Information and Settings
  </div>
  <div class="my-8">
    <div v-if="isEdit">
      <UButton @click="toggleEdit" icon="i-mdi-cancel" class="mb-6"
        >Cancel</UButton
      >
      <UserProfileForm />
    </div>
    <div v-else>
      <UButton @click="toggleEdit" icon="i-mdi-edit" class="mb-6">Edit</UButton>
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
