import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const profile = ref({
    id: '__empty__',
    username: '__empty__',
    screenName: '__empty__',
    fullName: '__empty__',
    avatarUrl: '__empty__',
    website: '__empty__',
    joinReason: '__empty__',
    nuclearLikes: '__empty__',
    xUsername: '__empty__',
    linkedInProfileName: '__empty__',
    joinedAt: '__empty__',
    updatedAt: '__empty__',
  })
  const settings = ref({})

  const loadProfile = async (data) => {
    profile.value.id = data.id
    profile.value.username = data.username
    profile.value.screenName = data.screen_name
    profile.value.fullName = data.full_name
    profile.value.avatarUrl = data.avatar_url
    profile.value.website = data.website
    profile.value.joinReason = data.join_reason
    profile.value.nuclearLikes = data.nuclear_likes
    profile.value.xUsername = data.x_username
    profile.value.linkedInProfileName = data.linkedin_profile_name
    profile.value.joinedAt = data.joined_at
    profile.value.updatedAt = data.updated_at
  }

  // TODO: format timestamps to date or date-time as needed

  const updateProfile = async (updates) => {
    console.log('Send update to backend and store locally', updates)
  }

  return { profile, settings, loadProfile, updateProfile }
})
