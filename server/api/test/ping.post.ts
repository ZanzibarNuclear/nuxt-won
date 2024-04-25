export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return {
    message: 'Returning the information you sent.',
    body,
  }
})
