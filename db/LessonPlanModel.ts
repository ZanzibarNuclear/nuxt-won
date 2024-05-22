import type { LessonPlan } from '~/types/won-types'

const mapToObject = (data): LessonPlan => {
  return {
    id: data.id,
    publicKey: data.public_key,
    courseId: data.course_id,
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
    course_id: lessonPlan.courseId,
    title: lessonPlan.title,
    description: lessonPlan.description,
    cover_art: lessonPlan.coverArt,
    objective: lessonPlan.objective,
    published_at: lessonPlan.publishedAt,
  }
}

export async function loadLessonPlans(courseId) {
  const results = await $fetch(`/api/courses/${courseId}/lesson-plans`)
  if (results) {
    return results.map((row) => mapToObject(row))
  } else {
    return []
  }
}

export async function loadLessonPlan(lessonPlanId) {
  const result = await $fetch(`/api/lessons/${lessonPlanId}`)
  return result ? mapToObject(result) : null
}

export async function createLessonPlan(lessonPlan: LessonPlan) {
  const input = mapToTable({ ...lessonPlan, publicKey: genKey(10) })
  console.log('course data in', input)
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
  console.log('saving lesson plan', lessonPlan)
  const input = mapToTable(lessonPlan)
  const results = await $fetch(`/api/lesson-plans/${input.id}`, {
    method: 'PUT',
    body: input,
  })
  if (results) {
    return mapToObject(results[0])
  } else {
    return null
  }
}