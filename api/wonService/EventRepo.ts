import qs from 'qs'

const won = useWonService()
const pathBase = '/events'

interface Event {
  actor: string
  details: any
}

export interface EventSearch {
  offset?: number
  limit?: number
  from?: string
  to?: string
  actor?: string
}

// repositories/user.ts
export const EventRepository = {

  async find(query: EventSearch) {
    const queryParams = qs.stringify(query)
    let path = pathBase
    if (queryParams.length > 0) {
      path = `${path}?${queryParams}`
    }
    return await won.get(path)
  },

  async logEvent(details: any) {
    const userStore = useUserStore()
    let userId
    if (userStore.isSignedIn) {
      userId = userStore.user?.id
    }
    won.post(`path`, {
      actor: userId, details
    })
  },

  async logLearningEvent(courseKey: string, pathKey: string, lessonKey: string, action: string) {
    this.logEvent({
      type: 'learning',
      courseKey,
      pathKey,
      lessonKey,
      action
    })
  },

  async logJoinCta(messageKey: string) {
    this.logEvent({
      type: 'join-cta',
      messageKey,
    })
  }
}
