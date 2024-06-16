import type { LearningBookmark } from '~/types/won-types'

const mapToObject = (data): LearningBookmark => {
  return {
    id: data.id,
    lessonKey: data.lesson_key,
    pathKey: data.path_key,
    updatedAt: data.updated_at,
  }
}

export async function bookmarkLesson(lessonKey: string, pathKey: string) {
  const user = useUserStore().profile
  if (user) {
    const bookmark = await $fetch('/api/users/' + user.id + '/bookmarks', {
      method: 'POST',
      body: {
        id: user.id,
        lesson_key: lessonKey,
        path_key: pathKey,
      },
    })
    return mapToObject(bookmark)
  } else {
    console.log('unknown user; cannot bookmark lesson', lessonKey, pathKey)
    return null
  }
}

export async function getBookmark() {
  const user = useUserStore().profile
  if (user) {
    const bookmark = await $fetch('/api/users/' + user.id + '/bookmarks')
    if (bookmark) {
      return mapToObject(bookmark)
    } else {
      return null
    }
  } else {
    console.log('unknown user; cannot get bookmark')
    return null
  }
}
