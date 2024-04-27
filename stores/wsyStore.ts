import { defineStore } from 'pinia'

export const useWsyStore = defineStore('wsy', () => {
  type Participant = {
    id: number
    user_id: string
    alias: string
    joined_at: string
    karma: number
  }
  type Entry = { statement: string; posted_at: string }
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
  // type Entry = { statement: string; posted_at: string }

  // values
  const player: Ref<Participant | undefined> = ref()
  const threads: Ref<ThreadMap> = ref({})
  const activeThreadKey: Ref<string | undefined> = ref()

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
  }
  function activateThread(key: string) {
    if (threads.value[key] !== null) {
      activeThreadKey.value = key
    } else {
      console.error('Thread not found for key=' + key)
    }
  }
  function loadActiveEntries(entries) {
    activeThread.value.entries = entries.map((entry) => {
      return { ...entry }
    })
  }
  function addEntryToActive(entry: Entry) {
    if (isActiveThread && !isActiveEntries) {
      activeThread.value.entries = []
    }
    activeThread.value.entries.push({ ...entry })
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
    isPlayerLoaded,
    activeThread,
    isActiveThread,
    activeEntries,
    isActiveEntries,
    loadActiveEntries,
    addEntryToActive,
    setPlayer,
    updateThread,
    activateThread,
    clearActiveThread,
    clear,
  }
})
