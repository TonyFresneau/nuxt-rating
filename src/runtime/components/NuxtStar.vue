<template>
  <div v-if="isReady">
    <svg
      class="nuxt-rating-star-svg"
      :height="starSize"
      :width="starSize"
      :viewBox="viewBox"
      @mousemove="mouseMoving"
      @click="selected"
      @touchstart="touchStart"
      @touchend="touchEnd">
      <linearGradient
        :id="grad"
        x1="0"
        x2="100%"
        y1="0"
        y2="0">
        <stop
          :offset="starFill"
          :stop-color="getColor(activeColor)"
          :stop-opacity="getOpacity(activeColor)" />
        <stop
          :offset="starFill"
          :stop-color="getColor(inactiveColor)"
          :stop-opacity="getOpacity(inactiveColor)" />
      </linearGradient>

      <polygon
        :height="starSize"
        :width="starSize"
        :points="starPointsToString"
        :fill="gradId"
        :stroke="getBorderColor"
        :stroke-width="borderWidth"
        :stroke-linejoin="strokeLinejoin" />
      <polygon
        :points="starPointsToString"
        :fill="gradId" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted } from 'vue'
  import AlphaColor from '../helpers/AlphaColor'
  import type { NuxtStarProps } from '../types'

  const props = defineProps<NuxtStarProps>()

  const emit = defineEmits(['star-mouse-move', 'star-selected'])

  const grad = ref('')
  const isReady = ref(false)
  const isStarActive = ref(true)

  const starPointsToString = computed(() => props.points.join(','))
  const gradId = computed(() => `url(#${grad.value})`)
  const starSize = computed(
    () => props.size + (props.roundedCorners && props.borderWidth <= 0 ? 6 : props.borderWidth),
  )
  const starFill = computed(() => `${props.fill}%`)
  const getBorderColor = computed(() =>
    props.fill <= 0
      ? props.roundedCorners && props.borderWidth <= 0
        ? props.inactiveColor
        : props.borderColor
      : props.activeColor,
  )
  const maxSize = computed(() => {
    const max = Math.max(...props.points)
    return isFinite(max) ? max : 100
  })
  const viewBox = computed(() => `0 0 ${maxSize.value} ${maxSize.value}`)
  const strokeLinejoin = computed(() => (props.roundedCorners ? 'round' : 'miter'))

  onMounted(() => {
    grad.value = getRandomId()
    isReady.value = true
  })

  const mouseMoving = (event: MouseEvent) => {
    emit('star-mouse-move', {
      event,
      position: getPosition(event),
      id: props.starId,
    })
  }

  const touchStart = () => {
    isStarActive.value = true
  }

  const touchEnd = () => {
    isStarActive.value = false
  }

  const getPosition = (event: MouseEvent) => {
    const starWidth = (92 / 100) * props.size
    const offset = Math.max(event.offsetX, 1)
    return Math.min(Math.round((100 / starWidth) * offset), 100)
  }

  const selected = (event: MouseEvent) => {
    emit('star-selected', {
      id: props.starId,
      position: getPosition(event),
    })
  }

  const getRandomId = () => Math.random().toString(36).substring(7)
  const getColor = (color: string) => new AlphaColor(color).parseAlphaColor().color
  const getOpacity = (color: string) => new AlphaColor(color).parseAlphaColor().opacity
</script>

<style scoped>
  .nuxt-rating-star-svg {
    overflow: visible !important;
  }
</style>
