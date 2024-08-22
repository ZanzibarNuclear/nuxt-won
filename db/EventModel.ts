export async function retrieveEvents(offset, batchSize, actor) {
  console.log(`offset=${offset} batch size=${batchSize}`)
  const nextPage = offset / batchSize + 1
  console.log('page', nextPage)

  const events = await $fetch(
    `/api/admin/events?page=${nextPage}&limit=${batchSize}`
  )
  return events
}

async function logEvent(details) {
  const { profile } = useUserStore()
  await $fetch('/api/events', {
    method: 'POST',
    body: {
      actor: profile?.id,
      details: details,
    },
  })
}

export async function logLearningEvent(courseKey, pathKey, lessonKey, action) {
  await logEvent({
    type: 'learning',
    course_key: courseKey,
    path_key: pathKey,
    lesson_key: lessonKey,
    action: action,
  })
}

export async function logWhatSayYouEvent(threadKey, entryId, action) {
  await logEvent({
    type: 'wsy',
    thread_key: threadKey,
    entry_id: entryId,
    action: action,
  })
}

export async function logJoinImpression(messageKey) {
  await logEvent({
    type: 'join-cta',
    message_key: messageKey,
  })

}