import type { LearningBookmark } from '~/types/won-types'

const mapToBookmark = (data): LearningBookmark => {
  return {
    id: data.id,
    lessonKey: data.lesson_key,
    pathKey: data.path_key,
    updatedAt: data.updated_at,
  }
}

export async function scanUserProfiles(
  offset: number,
  batchSize: number,
  screenName: string
) {
  const nextPage = offset / batchSize + 1
  let queryString = `page=${nextPage}&limit=${batchSize}`
  if (screenName) {
    queryString += `&screen_name=${screenName}`
  }
  console.log('scan for profiles with', queryString)

  const profiles = await $fetch(`/api/admin/users?${queryString}`)
  return profiles
}

export async function bookmarkLesson(lessonKey: string, pathKey: string) {
  const { profile } = useUserStore()
  if (profile) {
    const bookmark = await $fetch('/api/users/' + profile.id + '/bookmarks', {
      method: 'POST',
      body: {
        id: profile.id,
        lesson_key: lessonKey,
        path_key: pathKey,
      },
    })
    return mapToBookmark(bookmark)
  } else {
    console.log('unknown user; cannot bookmark lesson', lessonKey, pathKey)
    return null
  }
}

export async function getBookmark() {
  const { profile } = useUserStore()
  if (profile) {
    const bookmark = await $fetch('/api/users/' + profile.id + '/bookmarks')
    if (bookmark) {
      return mapToBookmark(bookmark)
    } else {
      return null
    }
  } else {
    console.log('unknown user; cannot get bookmark')
    return null
  }
}
