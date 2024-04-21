export default {
  fetchProfile,
  updateProfile,
  initWsy,
  startThread,
  postEntry,
}

const supabase = useSupabaseClient()

const fetchProfile = async (user_id) => {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', user_id)
  return data
}

const updateProfile = async (user_id, profileUpdates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileUpdates)
    .eq('id', user_id)
    .select()
  return data
}

/**
 * To initialize, user must pick a unique name, pen name, whatever. The
 * user starts with some karma point, which are used to award good
 * behavior.
 *
 * @param {*} user_id
 * @param {*} name
 * @returns
 */
const initWsy = async (user_id, name) => {
  const { data, error } = await supabase
    .from('wsy_personas')
    .insert({ user_id: user_id, karma_score: 5, name })
    .select()
  return data
}

/**
 * A title or subject of the post. Or just a bit of click-bait. In
 * any case, this is what holds posts together.
 *
 * @param {*} writer_id
 * @param {*} topic
 * @returns
 */
const startThread = async (writer_id, topic) => {
  const { data, error } = await supabase
    .from('wsy_threads')
    .insert({ writer_id, public_key, topic })
    .select()
  return data
}

/**
 * What someone has to say about a topic.
 *
 * @param {*} writer_id
 * @param {*} topic
 * @returns
 */
const postEntry = async (writer_id, thread_key, about_entry_id, statement) => {
  const { data, error } = await supabase
    .from('wsy_threads')
    .insert({ writer_id, public_key, topic })
    .select()
  return data
}
