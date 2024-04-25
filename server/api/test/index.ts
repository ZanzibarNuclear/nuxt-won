export default defineEventHandler(async (event) => {
  switch (event.method) {
    case 'GET':
      return 'here it is'
      break
    case 'POST':
      const body = await readBody(event)
      return body
      break
    default:
      throw createError({
        statusCode: 405,
        statusMessage: `we do not ${event.method} around here`,
      })
  }
})
