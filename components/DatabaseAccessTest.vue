<template>
  <div class="mt-10 p-4 border-zinc-100 border">
    <div class="text-xl text-teal-400">Countries we know about</div>
    <div class="text-sm text-teal-200">(as far as our database knows):</div>
    <ul class="list-disc pl-4 mt-6">
      <li v-for="country in clist">{{ country.name }}</li>
    </ul>
  </div>
</template>

<script setup>
const dbClient = useSupabaseClient()
const clist = ref([])

onBeforeMount(async () => {
  const { data: countries, error } = await dbClient
    .from('countries')
    .select('*')
  if (error) {
    throw error
  }
  clist.value = countries
})
</script>

<style lang="scss" scoped></style>
