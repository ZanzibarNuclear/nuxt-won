import { defineStore } from 'pinia'
import type {
  UserProfile,
  LearningBookmark,
  WsyWriter,
  UserInfo,
} from '~/types/won-types'

type UserData = {
  user: null | UserInfo
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

  const setActiveUser = (activeUser: any) => {
    userData.user = activeUser
  }

  const isSignedIn = computed(() => {
    return !!userData.user
  })

  const user = computed(() => {
    return userData.user
  })

  const clearUser = () => {
    userData.user = null
  }

  const isProfileLoaded = computed(() => {
    return !!userData.user?.profile
  })

  const profile = computed(() => {
    return userData.user?.profile
  })

  async function setProfile(data: UserProfile) {
    if (userData.user) {
      userData.user.profile = { ...data }
    }
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
    setActiveUser,
    isSignedIn,
    user,
    clearUser,
    setProfile,
    isProfileLoaded,
    profile,
    cacheBookmark,
    bookmark,
    clearBookmark,
    setWsyWriter,
    isWsyWriterLoaded,
    wsyWriter,
  }
})
