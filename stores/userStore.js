import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const profile = ref({})
  const settings = ref({})

  const updateProfile = async (updates) => {
    console.log('Send update to backend and store locally', updates)
  }

  return { profile, settings }
})
