import { defineStore } from 'pinia'

export const useWsyStore = defineStore('wsy', () => {
  type Participant = {
    id: number
    user_id: string
    alias: string
    joined_at: string
    karma: number
  }
  type Entry = {
    id: number
    author_id: number
    statement: string
    thread_id: number
    responding_to: number
    posted_at: string
  }
  type Thread = {
    id: number
    created_at: string
    public_key: string
    topic: string
    starting_entry_id: number
    owner_id: number
    entries: [Entry]
  }
  type ThreadMap = { [k: string]: Thread }
  type EntryMap = { [k: string]: Entry }
  type ReplyMap = { [k: string]: [number] }
  type WriterMap = { [k: string]: string } // aliases referenced by participant ID

  // values
  const player: Ref<Participant | undefined> = ref()
  const threads: Ref<ThreadMap> = ref({})
  const activeThreadKey: Ref<string | undefined> = ref()
  const entryMap: Ref<EntryMap> = ref({})
  const writerMap: Ref<WriterMap> = ref({})
  const replyTree: Ref<ReplyMap> = ref({})

  const topLevelEntries = computed(() => {
    return activeEntries.value?.filter((entry) => !entry.responding_to)
  })
  const hasResponses = (id) => {
    return !!replyTree.value[id.toString()]
  }
  const responseEntries = (entryId: number) => {
    const replies = replyTree.value[entryId.toString()]
    if (replies) {
      return replies.map((id) => entryMap.value[id.toString()])
    }
    return null
  }
  const lookupAlias = (writerId: number) => {
    const alias = writerMap.value[writerId.toString()]
    return !!alias ? alias : 'writer ' + writerId
  }

  const isPlayerLoaded = computed(() => {
    return !!player.value
  })
  const activeThread = computed(() => {
    if (activeThreadKey.value) {
      return threads.value[activeThreadKey.value]
    }
    return null
  })
  const isActiveThread = computed(() => {
    return !!activeThread.value
  })

  const activeEntries = computed(() => {
    return activeThread.value?.entries
  })
  const isActiveEntries = computed(() => {
    return !!activeEntries.value
  })

  function setPlayer(myPlayer: Participant) {
    player.value = myPlayer
  }
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
  function loadWriters(writers) {
    writers.forEach(
      (writer) => (writerMap.value[writer.id.toString()] = writer.alias)
    )
  }
  function loadActiveEntries(entries) {
    activeThread.value.entries = entries.map((entry) => {
      return { ...entry }
    })
    entries.forEach((entry) => {
      entryMap.value[entry.id.toString()] = entry
      addEntryToReplyTree(entry)
    })
    console.log(replyTree.value)
  }
  function addEntryToActive(entry: Entry) {
    activeThread.value.entries.push({ ...entry })
    entryMap.value[entry.id.toString()] = entry
    addEntryToReplyTree(entry)
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

  function clearActiveThread() {
    activeThreadKey.value = undefined
  }
  function clear() {
    player.value = undefined
    threads.value = {}
    activeThreadKey.value = undefined
    console.log('cleared')
  }
  return {
    player,
    threads,
    activeThreadKey,
    entryMap,
    replyTree,
    isPlayerLoaded,
    activeThread,
    isActiveThread,
    activeEntries,
    isActiveEntries,
    topLevelEntries,
    hasResponses,
    responseEntries,
    lookupAlias,
    loadActiveEntries,
    loadWriters,
    addEntryToActive,
    setPlayer,
    updateThread,
    activateThread,
    clearActiveThread,
    clear,
  }
})
