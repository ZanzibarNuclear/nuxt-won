import qs from 'qs'

const won = useWonService()
const pathBase = '/events'

interface Event {
  actor: string
  details: any
}

interface EventSearch {
  offset: number
  limit: number
  from: string
  to: string
  actor: string
}

// repositories/user.ts
export const UserRepository = {

  async findEvents(query: EventSearch) {
    const queryParams = qs.stringify(query)
    let path = pathBase
    if (queryParams.length > 0) {
      path = `${path}?${queryParams}`
    }
    return await won.get(path)
  },

  async createEvent(actorId: string, details: any) {
    return await won.post(`path`, data)
  },
}
