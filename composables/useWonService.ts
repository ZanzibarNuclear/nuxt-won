export const useWonService = () => {
  return {
    get: async (url: string) => await $fetch(`${useRuntimeConfig().public.wonServiceEndpoint}/api/${url}`, {
      credentials: 'include',
    }),
    post: async (url: string, data: any) => {
      console.log(`posting to ${url}:`, data)
      return await $fetch(`${useRuntimeConfig().public.wonServiceEndpoint}/api/${url}`, {
        method: 'POST',
        body: data,
        credentials: 'include', // This is crucial for sending cookies
      })
    },
    put: async (url: string, data?: any) => {
      console.log(`putting to ${url}:`, data)
      return await $fetch(`${useRuntimeConfig().public.wonServiceEndpoint}/api/${url}`, {
        method: 'PUT',
        body: data,
        credentials: 'include', // This is crucial for sending cookies
      })
    },
    delete: async (url: string) => await $fetch(`${useRuntimeConfig().public.wonServiceEndpoint}/api/${url}`, {
      method: 'DELETE',
      credentials: 'include',
    }),
  }
}
