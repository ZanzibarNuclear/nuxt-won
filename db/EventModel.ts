async function logEvent(details) {
  const user = useUserStore().profile
  await $fetch('/api/events', {
    method: 'POST',
    body: {
      actor: user.id,
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
