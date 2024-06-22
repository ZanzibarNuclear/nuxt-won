export default defineNuxtRouteMiddleware((to, from) => {
  console.log('heading to', to.fullPath)
  const user = useSupabaseUser()
  const { id } = user.value || {}

  console.log('User ID is %s', id)

  if (
    id === '49f349d6-83f6-41d8-ada1-96dfe5161fea' ||
    id === 'b376596c-a158-4970-b2a7-54157f8daaad'
  ) {
    console.log('Welcome, Lord Administrator!')
    return
  }

  console.log('Get lost. Scram!')
  return abortNavigation()
})
