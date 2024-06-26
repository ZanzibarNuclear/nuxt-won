import { defineStore } from 'pinia'
import type { Thread, Entry, Participant } from '~/types/won-types'

export const useWsyStore = defineStore('wsy', () => {
  type ThreadMap = { [k: string]: Thread }
  type EntryMap = { [k: string]: Entry }
  type ReplyMap = { [k: string]: number[] }
  type WriterMap = { [k: string]: string } // aliases referenced by participant ID

  // values
  const threads: Ref<ThreadMap> = ref({})
  const activeThreadKey: Ref<string | undefined> = ref()
  const entryMap: Ref<EntryMap> = ref({})
  const writerMap: Ref<WriterMap> = ref({})
  const replyTree: Ref<ReplyMap> = ref({})

  function reset() {
    threads.value = {}
    activeThreadKey.value = undefined
    entryMap.value = {}
    writerMap.value = {}
    replyTree.value = {}
    console.log('reset')
  }

  const lookupAlias = (writerId: number) => {
    const alias = writerMap.value[writerId.toString()]
    return !!alias ? alias : 'writer ' + writerId
  }
  const stashAlias = (writerId: number, alias: string) => {
    writerMap.value[writerId.toString()] = alias
  }
  function loadWriters(writers: Participant[]) {
    writers.forEach((writer) => stashAlias(writer.id, writer.alias))
  }

  const activeThread = computed(() => {
    if (activeThreadKey.value) {
      return threads.value[activeThreadKey.value]
    }
    return null
  })
  const isActiveThread = computed(() => {
    return !!activeThread.value
  })
  function updateThread(myThread: Thread) {
    console.log(
      `thread to load: ${myThread.topic} ${myThread.created_at} ${myThread.public_key}`
    )
    threads.value[myThread.public_key] = { ...myThread }
    if (!threads.value[myThread.public_key].entries) {
      threads.value[myThread.public_key].entries = []
    }
  }
  function activateThread(key: string) {
    if (threads.value[key] !== null) {
      activeThreadKey.value = key
    } else {
      console.error('Thread not found for key=' + key)
    }
  }
  function loadActiveThread(myThread: Thread) {
    updateThread(myThread)
    activateThread(myThread.public_key)
  }
  function clearActiveThread() {
    activeThreadKey.value = undefined
  }

  const topLevelEntries = computed(() => {
    return activeEntries.value?.filter((entry) => !entry.responding_to)
  })
  const activeEntries = computed(() => {
    return activeThread.value?.entries
  })
  const isActiveEntries = computed(() => {
    return !!activeEntries.value
  })
  const hasResponses = (id: number) => {
    return !!replyTree.value[id.toString()]
  }
  const responseEntries = (entryId: number) => {
    const replies = replyTree.value[entryId.toString()]
    if (replies) {
      return replies.map((id) => entryMap.value[id.toString()])
    }
    return null
  }

  function loadActiveEntries(entries: Entry[]) {
    if (activeThread.value) {
      activeThread.value.entries = entries.map((entry) => {
        return { ...entry }
      })
      entries.forEach((entry) => {
        entryMap.value[entry.id.toString()] = entry
        addEntryToReplyTree(entry)
      })
    }
  }
  function addEntryToActive(entry: Entry) {
    if (activeThread.value) {
      activeThread.value.entries.push({ ...entry })
      entryMap.value[entry.id.toString()] = entry
      addEntryToReplyTree(entry)
    }
  }
  function addEntryToReplyTree(entry: Entry) {
    if (!entry.responding_to) {
      return
    }
    const parentId = entry.responding_to?.toString()
    if (parentId) {
      if (!replyTree.value[parentId]) {
        replyTree.value[parentId] = []
      }
      replyTree.value[parentId].push(entry.id)
    }
  }

  return {
    threads,
    activeThreadKey,
    entryMap,
    replyTree,
    activeThread,
    isActiveThread,
    activeEntries,
    isActiveEntries,
    topLevelEntries,
    hasResponses,
    responseEntries,
    lookupAlias,
    loadActiveThread,
    loadActiveEntries,
    loadWriters,
    addEntryToActive,
    updateThread,
    activateThread,
    clearActiveThread,
    reset,
  }
})
