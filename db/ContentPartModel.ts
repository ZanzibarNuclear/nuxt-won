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

export async function loadContentParts(lessonKey: string) {
  console.log('loadContentParts', lessonKey)
  const results = await $fetch(`/api/lesson-plans/${lessonKey}/content-parts`)

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
  const results = await $fetch(`/api/content-parts/${input.public_key}`, {
    method: 'PUT',
    body: input,
  })
  if (results) {
    return mapToObject(results[0])
  } else {
    return null
  }
}

export async function deleteContentPart(contentPart: ContentPart) {
  const input = mapToTable(contentPart)
  const results = await $fetch(`/api/content-parts/${input.public_key}`, {
    method: 'DELETE',
  })
  if (results) {
    return mapToObject(results[0])
  } else {
    return null
  }
}
