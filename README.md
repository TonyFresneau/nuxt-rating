<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: nuxt-rating
- Description: My new Nuxt module
-->

# 🌠 NuxtRating

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

<img src="https://i.postimg.cc/K8Sp6WFy/Enregistrement-2024-07-03-134919.gif" alt="GIF de démonstration" width="300">

## Features

<!-- Highlight some of the features your module provide here -->

- &nbsp; Use whatever you like as a star.
- &nbsp; View or retrieve a note.
- &nbsp; Customizable colors, borders, rounded and spacing.
- &nbsp; Customizable number of stars.
- &nbsp; Create read-only stars.
- &nbsp; SSR Friendly.
- &nbsp; Typescript Friendly.
- &nbsp; Display decimal ratings.
- &nbsp; Display decimal ratings.
- &nbsp; Inspired by Vue Star Rating.

## Quick Setup

1. Add `nuxt-rating` dependency to your project

```bash
# Using pnpm
pnpm add nuxt-rating

# Using yarn
yarn add nuxt-rating

# Using npm
npm install nuxt-rating
```

2. Add `nuxt-rating` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["nuxt-rating"],
});
```

3. Use `nuxt-rating` component

```js
<NuxtRating :read-only="false" :ratingValue="3.5" />
```

<img src="https://i.postimg.cc/zBwLZ85C/Sans-titre.jpg" width="128">

## Props Explanation

The following props can be passed to customize the appearance and behavior of the component:

- `ratingCount` (optional, default: 5): The total number of rating levels available.
- `ratingSize` (optional, default: "32px"): The size of the rating meter.
- `letterSpacing` (optional, default: "0px"): The spacing between the rating levels.
- `activeColor` (optional, default: "#ffc700"): The color of the active rating level.
- `inactiveColor` (optional, default: "gray"): The color of the inactive rating levels.
- `ratingValue` (optional, default: 3.7): The initial rating value.
- `ratingContent` (optional, default: "[19.8, 2.2, 6.6, 43.56, 39.6, 17.16, 0, 17.16, 33, 43.56]"): The content to be displayed for each rating level, should be polygon points see https://developer.mozilla.org/fr/docs/Web/SVG/Element/polygon.
- `readOnly` (optional, default: true): Specifies whether the rating meter is read-only or interactive.
- `borderColor` (optional, default: "#db8403"): The border color of the stars.
- `borderWidth` (optional, default: 0): The border width of the stars.
- `roundedCorners` (optional, default: false): Specifies whether the stars should have rounded corners.
- `clearable` (optional, default: false): Specifies whether the rating can be cleared.

## Events Explanation

The component emits the following events:

- `ratingSelected`: Triggered when a rating level is selected. The event payload is the selected rating value.
- `ratingHovered`: Triggered when the mouse hovers over the rating meter. The event payload is the hovered rating value.

## Full example (Nuxt 3)

<img src="https://i.postimg.cc/hGGYsdcJ/Nuxt-Rating.png" alt="GIF de démonstration" width="381">

```js
<template>
  <div class="p-4">
    <h1 style="margin-bottom: 0px">Nuxt 3 Rating Module</h1>

    <br />
    <br />
    <br />

    <NuxtRating
      border-color="#db8403"
      active-color="#ffa41c"
      inactive-color="#fff"
      :rating-step="0.5"
      :rounded-corners="true"
      :border-width="5"
      :fixed-points="2"
      :rating-size="30"
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
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-rating/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-rating
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-rating.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-rating
[license-src]: https://img.shields.io/npm/l/nuxt-rating.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-rating/blob/main/LICENSE
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
