import { defineStore } from 'pinia'

export const useWsyStore = defineStore('wsy', () => {
  const statements = ref([])

  const makeStatement = (statement) => {
    statements.value.push({ statement, createdOn: new Date() })
  }

  const takeItBack = () => {
    const latest = statements.value.pop()
    return latest
  }

  const clear = () => {
    statements.value.splice(0, statements.value.length)
  }

  return { statements, makeStatement, takeItBack, clear }
})
