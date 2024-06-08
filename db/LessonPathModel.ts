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
    lessonPath: stepData.lesson_path,
    from: stepData.from,
    to: stepData.to,
    teaser: stepData.teaser,
  }
}

const mapToStepTable = (step: LessonStep) => {
  return {
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

// TODO: rewrite below for lesson paths and steps

// export async function loadLessonPlan(lessonKey: string) {
//   const result = await $fetch(`/api/lesson-plans/${lessonKey}`)
//   return result ? mapToObject(result) : null
// }

// export async function createLessonPlan(lessonPlan: LessonPlan) {
//   const input = mapToTable({ ...lessonPlan, publicKey: genKey(10) })
//   const results = await $fetch('/api/lesson-plans', {
//     method: 'POST',
//     body: input,
//   })
//   if (results) {
//     return mapToObject(results[0])
//   } else {
//     return null
//   }
// }

// export async function saveLessonPlan(lessonPlan: LessonPlan) {
//   const input = mapToTable(lessonPlan)
//   const results = await $fetch(`/api/lesson-plans/${input.public_key}`, {
//     method: 'PUT',
//     body: input,
//   })
//   if (results) {
//     return mapToObject(results[0])
//   } else {
//     return null
//   }
// }

// export async function deleteLessonPlan(lessonKey: string) {
//   const results = await $fetch(`/api/lesson-plans/${lessonKey}`, {
//     method: 'DELETE',
//   })
// }
