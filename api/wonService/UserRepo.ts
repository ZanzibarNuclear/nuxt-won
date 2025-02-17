const won = useWonService()
const path = '/users'

// repositories/user.ts
export const UserRepository = {
  async getUser(id: number) {
    return await won.get(`${path}/${id}`)
  },
  async createUser(data: { name: string; email: string }) {
    return await won.post(path, data)
  },
}
