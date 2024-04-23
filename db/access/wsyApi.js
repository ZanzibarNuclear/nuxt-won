const supabase = useSupabaseClient()
const user = useSupabaseUser()

const addParticipant = async (alias) => {
  const user_id = user.value.id
  const { data, error } = await supabase.from('wsy_participants').insert({
    user_id,
    alias: wsy.alias,
  })
  if (error) {
    console.err('Unable to add wsy participant', error)
  }
  return data
}

const getParticipation = async () => {
  const { data, error } = await supabase.from('wsy_participants').select()
  console.log(data, error)
}

module.exports = { addParticipant, getParticipation }