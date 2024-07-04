<template>
  <div>
    <h1 style="margin-bottom: 0px">Nuxt 3 Rating Module</h1>
    <NuxtRating
      :rating-count="5"
      :active-color="'red'"
      :rating-value="rating"
      @rating-selected="event => (rating = event)" />
    <span class="rating-value">{{ rating }}</span>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const rating = ref(1)
</script>
