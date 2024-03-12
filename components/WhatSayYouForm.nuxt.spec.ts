import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import { it, expect } from 'vitest'
import WhatSayYouForm from './WhatSayYouForm.vue'

it('can render "what say you" form', async () => {
  await renderSuspended(WhatSayYouForm)
  const textarea = screen.getByLabelText('Your pithy wisdom, or whatever')
  expect(textarea).toBeDefined()
})
