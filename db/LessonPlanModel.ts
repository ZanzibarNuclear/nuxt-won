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

export async function loadLessonPlansByCourseId(courseId) {
  const results = await $fetch(`/api/courses/${courseId}/lesson-plans`)
  if (results) {
    return results.map((row) => mapToObject(row))
  } else {
    return []
  }
}

export async function loadLessonPlans(courseKey) {
  const results = await $fetch(`/api/course/${courseKey}/lesson-plans`)
  if (results) {
    return results.map((row) => mapToObject(row))
  } else {
    return []
  }
}

export async function loadLessonPlan(lessonKey) {
  const result = await $fetch(`/api/lesson-plan/${lessonKey}`)
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
