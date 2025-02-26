const won = useWonService()
const feedbackPath = '/feedback'

// repositories/user.ts
export const MessagingRepository = {

  async submitFeedback(feedback: { context: string, message: string }) {
    return await won.post(feedbackPath, feedback)
  },
  async findFeedback(offset: number, limit: number) {
    return await won.get(feedbackPath)
  }

}
