import { defineStore } from 'pinia'
import type {
  LearningBookmark,
  UserInfo,
  UserProfile,
} from '~/types/won-types'

type UserData = {
  user: UserInfo | null
  learningBookmark: LearningBookmark | null
}

export const useUserStore = defineStore('user', () => {
  const userData: UserData = reactive({
    user: null,
    learningBookmark: null,
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
  }
})
