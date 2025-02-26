const won = useWonService()
const path = '/users'

// repositories/user.ts
export const UserRepository = {
  async getUsers(offset: number = 0, limit: number = 0, screenName: string | null = null) {
    return await won.get(path)
  },
  async getUser(id: number) {
    return await won.get(`${path}/${id}`)
  },
  async createUser(data: { name: string; email: string }) {
    return await won.post(path, data)
  },
}
