<template>
  <div
    class="nuxt-rating-wrapper"
    :class="{ 'nuxt-rating-inline': props.inline }"
    @mouseleave="resetRating">
    <span
      v-for="n in props.ratingCount"
      :key="n"
      :class="[{ 'nuxt-rating-pointer': !props.readOnly }, 'nuxt-rating-star']"
      :style="{ marginRight: n !== props.ratingCount ? `${props.ratingSpacing}px` : '0' }">
      <NuxtStar
        :fill="fillLevel[n - 1]"
        :size="props.ratingSize"
        :points="props.ratingContent"
        :star-id="n"
        :step="step"
        :active-color="currentActiveColor"
        :inactive-color="props.inactiveColor"
        :border-color="props.borderColor"
        :border-width="props.borderWidth"
        :rounded-corners="props.roundedCorners"
        @star-selected="setRating($event, true)"
        @star-mouse-move="setRating" />
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch, onMounted } from 'vue'
  import NuxtStar from './NuxtStar.vue'
  import type { NuxtRatingProps } from '../types'

  interface RatingEvent {
    id: number
    position: number
  }

  const props = withDefaults(defineProps<NuxtRatingProps>(), {
    ratingStep: 0.1,
    ratingValue: 4.5,
    roundStartRating: true,
    activeColor: '#ffa41c',
    inactiveColor: '#d8d8d8',
    ratingCount: 5,
    ratingContent: () => [19.8, 2.2, 6.6, 43.56, 39.6, 17.16, 0, 17.16, 33, 43.56],
    ratingSize: 15,
    ratingSpacing: 2,
    readOnly: true,
    inline: false,
    borderColor: '#db8403',
    borderWidth: 0,
    roundedCorners: false,
    clearable: false,
  })

  const emit = defineEmits(['ratingSelected', 'ratingHovered'])

  const step = ref(props.ratingStep * 100)
  const fillLevel = ref<number[]>(Array(props.ratingCount).fill(0))
  const currentRating = ref(props.ratingValue)
  const selectedRating = ref(props.ratingValue)
  const ratingSelected = ref(false)

  const shouldRound = computed(() => ratingSelected.value || props.roundStartRating)

  const activeColors = computed(() =>
    Array.isArray(props.activeColor)
      ? padColors(props.activeColor, props.ratingCount, props.activeColor.slice(-1)[0])
      : new Array(props.ratingCount).fill(props.activeColor),
  )

  const currentActiveColor = computed(() =>
    selectedRating.value > 0
      ? activeColors.value[Math.ceil(selectedRating.value) - 1]
      : props.inactiveColor,
  )

  const roundedRating = computed(() => {
    const inv = 1.0 / props.ratingStep
    return Math.min(props.ratingCount, Math.ceil(currentRating.value * inv) / inv)
  })

  watch(
    () => props.ratingValue,
    val => {
      currentRating.value = val
      selectedRating.value = val
      createStars(shouldRound.value)
    },
  )

  onMounted(() => {
    createStars(props.roundStartRating)
  })

  const setRating = (event: RatingEvent, persist: boolean) => {
    if (!props.readOnly) {
      const position = Number(event.position) / 100
      const newRating =
        event.id - 1 + Math.ceil(position * (1 / props.ratingStep)) * props.ratingStep
      currentRating.value = Math.min(newRating, props.ratingCount)

      const decimalPlaces = props.ratingStep.toString().split('.')[1]?.length || 0
      const formattedRating = Number(currentRating.value.toFixed(decimalPlaces))

      if (persist) {
        selectedRating.value =
          props.clearable && currentRating.value === selectedRating.value ? 0 : currentRating.value
        ratingSelected.value = true
        emit('ratingSelected', formattedRating)
      }
      createStars(true)
      emit('ratingHovered', formattedRating)
    }
  }

  const resetRating = () => {
    if (!props.readOnly) {
      currentRating.value = selectedRating.value
      createStars(shouldRound.value)
      const decimalPlaces = props.ratingStep.toString().split('.')[1]?.length || 0
      const formattedRating = Number(currentRating.value.toFixed(decimalPlaces))
      emit('ratingHovered', formattedRating)
    }
  }

  const createStars = (round = true) => {
    const rating = round ? roundedRating.value : currentRating.value
    fillLevel.value = Array.from({ length: props.ratingCount }, (_, i) => {
      if (i < rating) {
        return rating - i > 1 ? 100 : (rating - i) * 100
      }
      return 0
    })
  }

  const padColors = (array: string[], minLength: number, fillValue: string) =>
    array.concat(Array(minLength - array.length).fill(fillValue))
</script>

<style scoped>
  .nuxt-rating-star {
    display: inline-block;
    -webkit-tap-highlight-color: transparent;
  }

  .nuxt-rating-pointer {
    cursor: pointer;
  }

  .nuxt-rating {
    display: flex;
    align-items: center;
  }

  .nuxt-rating-inline {
    display: inline-flex;
  }
</style>
