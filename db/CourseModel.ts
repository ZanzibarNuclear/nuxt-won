import type { Course } from '~/types/won-types'

const mapToObject = (data): Course => {
  return {
    id: data.id,
    publicKey: data.public_key,
    title: data.title,
    description: data.description,
    coverArt: data.cover_art,
    syllabus: data.syllabus,
    publishedAt: data.published_at,
  }
}

const mapToTable = (course: Course) => {
  return {
    id: course.id,
    public_key: course.publicKey,
    title: course.title,
    description: course.description,
    cover_art: course.coverArt,
    syllabus: course.syllabus,
    published_at: course.publishedAt,
  }
}

export async function loadCourses() {
  const results = await $fetch('/api/courses')
  if (results) {
    return results.map((row) => mapToObject(row))
  } else {
    return []
  }
}

export async function loadCourse(key: string) {
  const result = await $fetch(`/api/courses/${key}`)
  return result ? mapToObject(result) : null
}

export async function createCourse(course: Course) {
  const input = mapToTable({ ...course, publicKey: genKey(10) })
  // input['public_key'] = genKey(10)
  console.log('course data in', input)
  const results = await $fetch('/api/courses', {
    method: 'POST',
    body: input,
  })
  if (results) {
    return mapToObject(results[0])
  } else {
    return null
  }
}

export async function deleteCourse(key: string) {
  const results = await $fetch(`/api/courses/${key}`, {
    method: 'DELETE',
  })
  if (results) {
    return mapToObject(results[0])
  } else {
    return null
  }
}

export async function saveCourse(course: Course) {
  console.log('saving course', course)
  const input = mapToTable(course)
  const results = await $fetch(`/api/courses/${input.public_key}`, {
    method: 'PUT',
    body: input,
  })
  if (results) {
    return mapToObject(results[0])
  } else {
    return null
  }
}

export async function publishCourse(courseKey: string) {
  console.log('publishing course', courseKey)
  const results = await $fetch(`/api/courses/${courseKey}/publish`, {
    method: 'PUT',
  })
  if (results) {
    return mapToObject(results)
  } else {
    return null
  }
}

export async function unpublishCourse(courseKey: string) {
  console.log('publishing course', courseKey)
  const results = await $fetch(`/api/courses/${courseKey}/unpublish`, {
    method: 'PUT',
  })
  if (results) {
    return mapToObject(results)
  } else {
    return null
  }
}
