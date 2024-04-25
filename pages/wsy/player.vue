<script setup lang="ts">
const supabase = useSupabaseClient()
const participant = ref()

onMounted(async () => {
  const { data } = await supabase.from('wsy_participants').select('*')
  participant.value = data[0]
})
</script>

<template>
  <div>
    <div>Who Are You</div>
    <div v-if="participant">
      <div>Alias: {{ participant.alias }}</div>
      <div>User ID: {{ participant.user_id }}</div>
      <div>{{ participant }}</div>
    </div>
    <div else>I don't know. Sign in please.</div>
  </div>
</template>

<style scoped></style>
