<script setup>
import { computed, useAttrs } from 'vue'

const props = defineProps({
	style: Object
})

const attrs = useAttrs()

const style = computed(() => ({
	...attrs.style,
	...props.style
}))
</script>

<template>
	<div class="container" :style="style">
		<slot></slot>
	</div>
</template>

<style lang="scss" scoped>
.container {
	margin: 0 auto;
	max-width: 260px;

	@media (min-width: $breakpoint-medium) {
		max-width: 648px;
	}

	@media (min-width: $breakpoint-large) {
		max-width: 948px;
	}

	@media (min-width: $breakpoint-xlarge) {
		max-width: 1180px;
	}
}
</style>
