import { defineStore } from 'pinia'
import type { WsyThread, WsyEntry, WsyWriter } from '~/types/won-types'

export const useWsyStore = defineStore('wsy', () => {
  type ThreadMap = { [k: string]: WsyThread }
  type EntryMap = { [k: string]: WsyEntry }
  type ReplyMap = { [k: string]: string[] }
  type WriterMap = { [k: string]: WsyWriter } // aliases referenced by participant ID

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
  }

  function loadWriters(writers: WsyWriter[]) {
    writers.forEach((writer) => {
      writerMap.value[writer.id.toString()] = writer
    })
  }
  const lookupWriter = (writerId: number) => {
    return writerMap.value[writerId.toString()]
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
  function updateThread(myThread: WsyThread) {
    console.log(
      `thread to load: ${myThread.topic} ${myThread.createdAt} ${myThread.publicKey}`
    )
    threads.value[myThread.publicKey] = { ...myThread }
    if (!threads.value[myThread.publicKey].entries) {
      threads.value[myThread.publicKey].entries = []
    }
  }
  function loadActiveThread(myThread: WsyThread) {
    updateThread(myThread)
    activeThreadKey.value = myThread.publicKey
  }
  function clearActiveThread() {
    activeThreadKey.value = undefined
  }

  const topLevelEntries = computed(() => {
    return activeEntries.value?.filter((entry) => !entry.inResponseTo)
  })
  const activeEntries = computed(() => {
    return activeThread.value?.entries
  })
  const isActiveEntries = computed(() => {
    return !!activeEntries.value
  })
  const hasResponses = (entryKey: string) => {
    return !!replyTree.value[entryKey]
  }
  const responseEntries = (entryKey: string) => {
    const replies = replyTree.value[entryKey]
    if (replies) {
      return replies.map((entryKey) => entryMap.value[entryKey])
    }
    return null
  }

  function loadActiveEntries(entries: WsyEntry[]) {
    if (activeThread.value) {
      activeThread.value.entries = entries.map((entry) => {
        return { ...entry }
      })
      entries.forEach((entry) => {
        entryMap.value[entry.publicKey] = entry
        addEntryToReplyTree(entry)
      })
    }
  }
  function addEntryToActive(entry: WsyEntry) {
    if (activeThread.value) {
      activeThread.value.entries.push({ ...entry })
      entryMap.value[entry.publicKey] = entry
      addEntryToReplyTree(entry)
    }
  }
  function addEntryToReplyTree(entry: WsyEntry) {
    if (!entry.inResponseTo) {
      return
    }
    const parentId = entry.inResponseTo
    if (parentId) {
      if (!replyTree.value[parentId]) {
        replyTree.value[parentId] = []
      }
      replyTree.value[parentId].push(entry.publicKey)
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
    loadActiveThread,
    loadActiveEntries,
    loadWriters,
    lookupWriter,
    addEntryToActive,
    updateThread,
    clearActiveThread,
    reset,
  }
})
