import type { Database } from '~/types/supabase'

export async function getParticipant() {
  const user = useSupabaseUser()
  const userId = user.value?.id
  if (userId) {
    const supabase = useSupabaseClient<Database>()
    const { data } = await supabase
      .from('wsy_participants')
      .select('*')
      .eq('user_id', user.value.id)
    return data[0]
  } else {
    return null
  }
}
