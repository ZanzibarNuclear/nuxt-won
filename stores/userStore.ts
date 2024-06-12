import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  type UserProfile = {
    id: string
    screen_name: string
    full_name: string
    avatar_url: string
    website: string
    join_reason: string
    nuclear_likes: string
    xUsername: string
    linkedin_profile_name: string
    joined_at: string
    updated_at: string
  }
  const profile: Ref<UserProfile | undefined> = ref()

  const isProfileLoaded = computed(() => {
    return !!profile.value
  })

  async function loadProfile(data: UserProfile) {
    console.log('User ' + data.screen_name + ' (' + data.id + ')')
    profile.value = { ...data }
  }

  const getUser = () => {
    const user = useSupabaseUser()
    if (!user.value) {
      console.log('Cannot fetch profile. User not signed in.')
      return null
    }
    return user.value
  }

  const fetchAndLoadProfile = async (refresh = false) => {
    const user = getUser()
    if (!user) {
      return false
    }
    if (isProfileLoaded.value && !refresh) {
      console.log('Already loaded; not forcing refresh')
      return true
    }
    const supabase = useSupabaseClient()
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', user.id)

    if (error) {
      console.error(error.message)
      return false
    }
    loadProfile(data[0])
    return true
  }

  const updateProfile = async (profileChanges) => {
    const user = getUser()
    if (!user) {
      return false
    }
    const toPost = {
      ...profileChanges,
      updated_at: new Date(),
    }
    console.log(toPost)
    const supabase = useSupabaseClient()
    const { data, error } = await supabase
      .from('profiles')
      .update(toPost)
      .eq('id', user.id)
      .select()

    if (error) {
      console.error(error.message)
      return false
    }
    loadProfile(data[0])
    return true
  }

  return {
    profile,
    isProfileLoaded,
    loadProfile,
    fetchAndLoadProfile,
    updateProfile,
  }
})
