<template>
  <div>
    <game-word-search-v2 :words="words" :size="15" />
  </div>
</template>

<script setup>
const words = [
  'fission',
  'fusion',
  'nucleus',
  'neutron',
  'proton',
  'electron',
  'chain reaction',
  'radioactive',
  'alpha',
  'beta',
  'gamma',
  'cross section',
  'containment',
  'reactor',
  'steam',
  'turbine',
  'generator',
  'power',
]
</script>
