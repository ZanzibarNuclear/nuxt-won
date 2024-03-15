import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import { it, expect } from 'vitest'
import FeatureTile from './FeatureTile.vue'

it('can do it', async () => {
  const feature = {
    name: 'Hello',
    category: 'Testing',
    description: 'Blargy pants are great',
    tileImage: '/images/myGreatPic.jpg',
    callToAction: 'Do It!',
    routeName: 'destiny',
  }
  await renderSuspended(FeatureTile, {
    props: { feature },
  })
  expect(screen.getByText('Blargy pants are great')).toBeDefined()
})
