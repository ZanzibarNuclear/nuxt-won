import { defineStore } from 'pinia'

export const useWsyStore = defineStore('wsy', () => {
  type Participant = {
    id: number
    user_id: string
    alias: string
    joined_at: string
    karma: number
  }
  const player: Ref<Participant | undefined> = ref()
  const threads = ref([])

  function setPlayer(myPlayer: Participant) {
    player.value = myPlayer
  }

  return { player, setPlayer }
})
