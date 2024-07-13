import { defineStore } from 'pinia'
import type {
  UserProfile,
  LearningBookmark,
  WsyWriter,
} from '~/types/won-types'

type UserData = {
  user: null | Object
  profile: null | UserProfile
  learningBookmark: null | LearningBookmark
  wsyWriter: null | WsyWriter
}

export const useUserStore = defineStore('user', () => {
  const userData: UserData = reactive({
    user: null,
    profile: null,
    learningBookmark: null,
    wsyWriter: null,
  })

  const loadUser = () => {
    const user = useSupabaseUser()
    if (!user.value) {
      userData.user = null
    }
    userData.user = user.value
    return userData.user
  }
  const user = computed(() => {
    return userData.user
  })
  const clearUser = () => {
    userData.user = null
  }

  const isProfileLoaded = computed(() => {
    return !!userData.profile
  })
  const profile = computed(() => {
    return userData.profile
  })
  async function loadProfile(data: UserProfile) {
    console.log('loading profile', data)

    userData.profile = { ...data }
  }

  const fetchAndLoadProfile = async (refresh = false) => {
    if (!userData.user) {
      console.log('Unknown users; cannot load profile')
      return false
    }
    if (userData.profile && !refresh) {
      console.log('Profile already loaded; not forcing refresh')
      return true
    }
    const supabase = useSupabaseClient()
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', userData.user.id)

    if (error) {
      console.error(error.message)
      return false
    }
    loadProfile(data[0])
    return true
  }

  const updateProfile = async (deltas: UserProfile) => {
    if (!userData.user) {
      return false
    }
    const toPost = {
      ...deltas,
      updated_at: new Date(),
    }
    console.log(toPost)
    const supabase = useSupabaseClient()
    const { data, error } = await supabase
      .from('profiles')
      .update(toPost)
      .eq('id', userData.user.id)
      .select()

    if (error) {
      console.error(error.message)
      return false
    }
    loadProfile(data[0])
    return true
  }

  const cacheBookmark = (bookmark: LearningBookmark) => {
    userData.learningBookmark = bookmark
  }
  const bookmark = computed(() => {
    return userData.learningBookmark
  })
  const clearBookmark = () => {
    userData.learningBookmark = null
  }

  function setWsyWriter(writer: WsyWriter) {
    userData.wsyWriter = { ...writer }
  }
  const isWsyWriterLoaded = computed(() => {
    return !!userData.wsyWriter
  })
  const wsyWriter = computed(() => {
    return userData.wsyWriter
  })

  return {
    loadUser,
    user,
    clearUser,
    loadProfile,
    fetchAndLoadProfile,
    isProfileLoaded,
    profile,
    updateProfile,
    cacheBookmark,
    bookmark,
    clearBookmark,
    setWsyWriter,
    isWsyWriterLoaded,
    wsyWriter,
  }
})
