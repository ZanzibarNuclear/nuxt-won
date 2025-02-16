// plugins/api.ts
import { UserRepository } from '~/api/wonService/userRepository'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      api: {
        user: UserRepository,
      },
    },
  };
});
