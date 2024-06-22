export async function retrieveInvitations(offset, batchSize) {
  console.log(`offset=${offset} batch size=${batchSize}`)
  const nextPage = offset / batchSize + 1
  console.log('page', nextPage)

  const invitations = await $fetch(
    `/api/admin/invitations?page=${nextPage}&limit=${batchSize}`
  )
  return invitations
}
