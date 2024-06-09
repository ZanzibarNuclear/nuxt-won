import type { LessonPath, LessonStep } from '~/types/won-types'

const mapToPath = (pathData): LessonPath => {
  return {
    id: pathData.id,
    publicKey: pathData.public_key,
    name: pathData.name,
    description: pathData.description,
    courseKey: pathData.course_key,
    trailhead: pathData.trailhead,
    steps: null,
  }
}

const mapToPathTable = (path: LessonPath) => {
  return {
    id: path.id,
    public_key: path.publicKey,
    name: path.name,
    description: path.description,
    course_key: path.courseKey,
    trailhead: path.trailhead,
  }
}

const mapToStep = (stepData): LessonStep => {
  return {
    id: stepData.id,
    lessonPath: stepData.lesson_path,
    from: stepData.from,
    to: stepData.to,
    teaser: stepData.teaser,
  }
}

const mapToStepTable = (step: LessonStep) => {
  return {
    id: step.id,
    lesson_path: step.lessonPath,
    from: step.from,
    to: step.to,
    teaser: step.teaser,
  }
}

export async function loadLessonPaths(courseKey: string) {
  const results = await $fetch(`/api/courses/${courseKey}/lesson-paths`)

  let paths = []
  if (results) {
    paths = results.map((row) => mapToPath(row))

    paths.forEach(async (path) => {
      const results2 = await loadLessonSteps(path.publicKey)

      if (results2) {
        const steps = results2.map((row2) => mapToStep(row2))
        path.steps = steps
      }
    })
  }
  console.log(`return paths for ${courseKey}`, paths)

  return paths
}

async function loadLessonSteps(pathKey: string) {
  const results = await $fetch(`/api/lesson-paths/${pathKey}/lesson-steps`)
  if (results) {
    return results.map((row) => mapToStep(row))
  } else {
    return []
  }
}

export async function createLessonPath(path: LessonPath) {
  const input = mapToPathTable({ ...path, publicKey: genKey(10) })
  const results = await $fetch('/api/lesson-paths', {
    method: 'POST',
    body: input,
  })
  console.log('path query results:', results)

  if (results) {
    return mapToPath(results)
  } else {
    return null
  }
}

export async function saveLessonPath(path: LessonPath) {
  const input = mapToPathTable(path)
  const results = await $fetch(`/api/lesson-paths/${input.public_key}`, {
    method: 'PUT',
    body: input,
  })
  if (results) {
    return mapToPath(results)
  } else {
    return null
  }
}

export async function deleteLessonPath(pathKey: string) {
  const results = await $fetch(`/api/lesson-paths/${pathKey}`, {
    method: 'DELETE',
  })
}

export async function createLessonStep(step: LessonStep) {
  const input = mapToStepTable(step)
  const results = await $fetch(
    `/api/lesson-paths/${step.lessonPath}/lesson-steps`,
    {
      method: 'POST',
      body: input,
    }
  )
  console.log('path query results:', results)

  if (results) {
    return mapToStep(results)
  } else {
    return null
  }
}

export async function deleteLessonStep(id: number) {
  console.log('request to delete step', id)

  const results = await $fetch(`/api/lesson-steps/${id}`, {
    method: 'DELETE',
  })
}
