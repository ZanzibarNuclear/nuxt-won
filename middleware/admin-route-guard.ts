export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()

  if (userStore.isSignedIn) {
    const userId = userStore.user?.id
    if (
      userId === '49f349d6-83f6-41d8-ada1-96dfe5161fea' ||
      userId === 'b376596c-a158-4970-b2a7-54157f8daaad'
    ) {
      console.log('Welcome, Lord Administrator!')
      return
    }
  }

  console.log('Get lost. Scram!')
  return abortNavigation()
})
