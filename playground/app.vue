<template>
  <div class="p-4">
    <h1 style="margin-bottom: 0px">Nuxt 3 Rating Module</h1>

    <br />
    <br />
    <br />

    <NuxtRating
      border-color="#db8403"
      :read-only="false"
      active-color="#ffa41c"
      inactive-color="#fff"
      :rating-step="0.5"
      :rounded-corners="true"
      :border-width="5"
      :fixed-points="2"
      :rating-size="'30px'"
      :rating-value="4.5"
      @rating-selected="logRating"
      @rating-hovered="event => (rating = event)" />

    <br />
    <br />
    <br />

    <div class="flex items-center">
      <p>Rating :</p>
      <NuxtRating
        class="px-3"
        border-color="#db8403"
        active-color="#ffa41c"
        inactive-color="#fff"
        :rating-step="0.1"
        :rounded-corners="true"
        :border-width="5"
        :fixed-points="2"
        :rating-size="10"
        :rating-value="3.7"
        @rating-selected="logRating"
        @rating-hovered="event => (rating = event)" />
      <p>{{ rating }}</p>
    </div>

    <br />
    <br />
    <br />

    <NuxtRating
      active-color="red"
      inactive-color="#333"
      :rating-spacing="5"
      :rating-step="1"
      :rating-count="10"
      :rounded-corners="true"
      :rating-content="[
        19.305, 12.611, 25.25, 9.178, 21.9171, 3.4049, 15.9722, 6.8377, 15.9722, 0, 9.30556, 0,
        9.30556, 6.8377, 3.36056, 3.4049, 0.0277222, 9.178, 5.97222, 12.611, 0.0277778, 16.044,
        3.36056, 21.8173, 9.30556, 18.3847, 9.30556, 25.2778, 15.9722, 25.2778, 15.9722, 18.3847,
        21.9171, 21.8173, 25.25, 16.044,
      ]"
      :border-width="0"
      :fixed-points="2"
      :rating-size="30"
      :rating-value="4.5"
      @rating-selected="logRating" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const rating = ref(0)

  const logRating = (event: number) => {
    console.log(event)
  }
</script>
