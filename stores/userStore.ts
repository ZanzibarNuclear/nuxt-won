import { defineStore } from 'pinia'
import type { LearningBookmark, UserProfile } from '~/types/won-types'

export const useUserStore = defineStore('user', () => {
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

  const lastLearningLesson: Ref<LearningBookmark | undefined> = ref()
  const cacheBookmark = (bookmark: LearningBookmark) => {
    lastLearningLesson.value = bookmark
  }
  const bookmark = computed(() => {
    return lastLearningLesson.value
  })
  return {
    profile,
    isProfileLoaded,
    loadProfile,
    fetchAndLoadProfile,
    updateProfile,
    bookmark,
    cacheBookmark,
  }
})
