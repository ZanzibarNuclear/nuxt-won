import qs from 'qs'

const won = useWonService()
const pathBase = 'events'

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
    won.post(pathBase, { details })
  },

  async logPageHit(pageName: string) {
    this.logEvent({
      type: 'pageHit',
      page: pageName
    })
  },

  async logJoinCta(messageKey: string) {
    this.logEvent({
      type: 'join-cta',
      messageKey,
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
}
