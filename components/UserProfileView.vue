<template>
  <div class="border text-sm grid grid-cols-5 space-y-4">
    <div class="label">Email</div>
    <div class="col-span-4">me@domain.com</div>
    <div class="label">Screen Name</div>
    <div class="col-span-4">Blargy Pants Man</div>
    <div class="label">Legal Name</div>
    <div class="col-span-4">Mr. Blargy Pants, III</div>
    <div class="label">About</div>
    <div class="col-span-4">
      I am the man of blargy who wears pants. Some call me Mr. Fancy Pants, but
      that's not my real name. Frankly, I am insulted.
    </div>
    <div class="label">X</div>
    <div class="col-span-4">@blargypantsman</div>
    <div class="label">LinkedIn</div>
    <div class="col-span-4">@blargypantsiii</div>
    <div class="label">Discord</div>
    <div class="col-span-4">blargypants</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.label {
  font-weight: bold;
}
</style>
