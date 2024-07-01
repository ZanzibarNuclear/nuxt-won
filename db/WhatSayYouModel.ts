export const join = async (userId: string, penName: string) => {
  const writer = await $fetch('/api/say/writers', {
    method: 'POST',
    body: {
      userId,
      penName,
    },
  })
  if (error) {
    console.error(error.message)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to join What Say You?`,
    })
  }
  return writer
}

export const getWriter = async (userId: string) => {
  const writer = await $fetch(`/api/say/writers/${userId}`)
  return writer
}

export const updateWriter = async (userId: string, penName: string) => {
  const update = await $fetch(`/api/say/writers/${userId}`, {
    method: 'PUT',
    body: {
      penName,
    },
  })
  return update
}

export const startThread = async (ownerId: number, topic: string) => {
  const minted = await $fetch('/api/say/threads', {
    method: 'POST',
    body: {
      ownerId,
      topic,
    },
  })
  return minted
}

export const getAllThreads = async () => {
  const threads = await $fetch('/api/say/threads')
  return threads
}

export const leave = async (userId: string) => {
  await $fetch(`/api/say/writers/${userId}`, {
    method: 'DELETE',
  })
  return null
}
