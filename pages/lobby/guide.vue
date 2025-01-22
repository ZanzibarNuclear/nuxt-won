<template>
  <div class="">
    <h2>Site Guide</h2>
    <div class="flex flex-row gap-x-10">
      <div class="space-y-6 font-body">
        <div>
          You have found the ultimate experience for learning about the wonders of nuclear energy.
          Each minute you spend here will make you smarter, more aware of reality, filled with
          encouragement. Welcome.
        </div>
        <div>
          <UIcon name="i-ph-star-duotone" class="star" /> The main event at World of Nuclear is our
          adventure game. Lose yourself and discover what was lost. Advance through learning.
          <NuxtLink to="https://hero.worldofnuclear.com" external>Begin the journey.</NuxtLink>
        </div>
        <div>
          <UIcon name="i-ph-star-duotone" class="star" />
          Try expressing yourself on
          <NuxtLink to="https://flux.worldofnuclear.com" external>Flux</NuxtLink>. Post your
          thoughts, whether they are deep and well formed or just off the top of your head. Have fun
          reacting to others. See if you can get a chain reaction going.
        </div>
        <div>
          <UIcon name="i-ph-star-duotone" class="star" />
          If you just came here to learn, check out the
          <NuxtLink :to="{ name: 'learning' }">mini lessons</NuxtLink>. Each lesson explains a
          single concept and is short enough to get through in about 10 minutes. Gain credit with
          each lesson you complete, and unlock more advanced material. Hello.
        </div>
      </div>
      <div>
        <NuxtImg
          src="/images/concept-art/nuclear-power-plant-along-river.jpg"
          width="800"
          class="mb-6"
        />
        <NuxtImg src="/images/concept-art/riverside-power-plant.jpg" width="800" />
      </div>
    </div>
    <div class="mt-6 space-y-6">
      <h3>Become a member</h3>
      <div>
        When you join the World of Nuclear, it shows us that you care, which makes us want to give
        you more nice things that will attract more nice people like you. Plus, you get to enjoy
        full participation in the activities here.
      </div>
      <div>
        What you don't get is spam in your inbox. We don't like to send lots of email that you
        didn't ask for, and we don't give away or sell your sensitive information. Although we will
        communicate with you from time to time, that's just to keep you informed about what's new in
        the World of Nuclear.
      </div>
      <div>
        <NuxtLink :to="{ name: 'auth-sign-in' }">Sign up here,</NuxtLink> and join the super nerds
        (that's us) in our quest to boost good feelings about nuclear.
      </div>
      <div></div>
    </div>
    <div class="mt-6 space-y-6">
      <h3>Social Networks</h3>
      <div>
        You can find us on other platforms. That's how we spread the word about the World of
        Nuclear. Follow us anywhere, and tell your friends.
      </div>
      <ul>
        <li>Zanzibar, Nuclear Hero (@ZanzibarNuclear) on X (Twitter)</li>
        <li>NuclearAlchemist (@WeAreZenZen) on X (Twitter)</li>
        <li>Zanzi's Nuclear Stack (on Substack)</li>
        <li>Observations and Opinions (on Substack)</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.star {
  @apply mr-2 text-uranium-ore-darker dark:text-uranium-ore-bright;
}
a {
  @apply text-heroic-cherenkov hover:text-nuclear-600;
}
</style>
