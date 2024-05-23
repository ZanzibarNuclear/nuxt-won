import type { ContentPart } from '~/types/won-types'

const mapToObject = (data): ContentPart => {
  return {
    id: data.id,
    publicKey: data.public_key,
    lessonId: data.lesson_id,
    type: data.content_type,
    details: data.content,
    sequence: data.sequence,
  }
}

const mapToTable = (contentPart: ContentPart) => {
  return {
    id: contentPart.id,
    public_key: contentPart.publicKey,
    lesson_id: contentPart.lessonId,
    content_type: contentPart.type,
    content: contentPart.details,
    sequence: contentPart.sequence,
  }
}

export async function loadContentParts(lessonId: number) {
  console.log(`lesson ${lessonId}`)

  const results = await $fetch(`/api/lesson-plans/${lessonId}/content-parts`)
  if (results) {
    return results.map((row) => mapToObject(row))
  } else {
    return []
  }
}

export async function loadContentPart(publicKey: string) {
  const result = await $fetch(`/api/content-parts/${publicKey}`)
  return result ? mapToObject(result) : null
}

export async function createContentPart(contentPart: ContentPart) {
  const input = mapToTable({ ...contentPart, publicKey: genKey(8) })
  const results = await $fetch('/api/content-parts', {
    method: 'POST',
    body: input,
  })
  if (results) {
    return mapToObject(results[0])
  } else {
    return null
  }
}

export async function saveContentPart(contentPart: ContentPart) {
  const input = mapToTable(contentPart)
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