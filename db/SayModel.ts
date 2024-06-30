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
export const leave = async (userId: string) => {
  await $fetch(`/api/say/writers/${userId}`, {
    method: 'DELETE',
  })
  return null
}
