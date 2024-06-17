import type { LessonPlan } from '~/types/won-types'

const mapToObject = (data): LessonPlan => {
  return {
    id: data.id,
    publicKey: data.public_key,
    courseKey: data.course_key,
    title: data.title,
    description: data.description,
    coverArt: data.cover_art,
    objective: data.objective,
    publishedAt: data.published_at,
  }
}

const mapToTable = (lessonPlan: LessonPlan) => {
  return {
    id: lessonPlan.id,
    public_key: lessonPlan.publicKey,
    course_key: lessonPlan.courseKey,
    title: lessonPlan.title,
    description: lessonPlan.description,
    cover_art: lessonPlan.coverArt,
    objective: lessonPlan.objective,
    published_at: lessonPlan.publishedAt,
  }
}

export async function loadLessonPlans(courseKey: string) {
  const results = await $fetch(`/api/courses/${courseKey}/lesson-plans`)
  if (results) {
    return results.map((row) => mapToObject(row))
  } else {
    return []
  }
}

export async function loadLessonPlan(lessonKey: string) {
  const result = await $fetch(`/api/lesson-plans/${lessonKey}`)
  return result ? mapToObject(result) : null
}

export async function createLessonPlan(lessonPlan: LessonPlan) {
  const input = mapToTable({ ...lessonPlan, publicKey: genKey(10) })
  const results = await $fetch('/api/lesson-plans', {
    method: 'POST',
    body: input,
  })
  if (results) {
    return mapToObject(results[0])
  } else {
    return null
  }
}

export async function saveLessonPlan(lessonPlan: LessonPlan) {
  const input = mapToTable(lessonPlan)
  const results = await $fetch(`/api/lesson-plans/${input.public_key}`, {
    method: 'PUT',
    body: input,
  })
  if (results) {
    return mapToObject(results[0])
  } else {
    return null
  }
}

export async function deleteLessonPlan(lessonKey: string) {
  const results = await $fetch(`/api/lesson-plans/${lessonKey}`, {
    method: 'DELETE',
  })
}
