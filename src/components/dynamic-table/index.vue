<script setup>
import { onMounted, computed } from 'vue'

const props = defineProps({
	data: {
		type: Object,
		required: true
	}
})

const tableKeys = Object.keys(props.data[0])

const tableHeaders = computed(() => {
	if (!props.data) {
		throw new Error('Table headers undefined')
	}
	return tableKeys.map((key) => ({
		text: key.replace(/_/g, ' ').toUpperCase(),
		value: key
	}))
})

onMounted(() => {
	console.log('dealsssssss', props.data)
})
</script>

<template>
	<div class="container">
		<div class="container__header">
			<div class="header" v-for="col in tableHeaders">
				{{ col.text }}
			</div>
		</div>
		<div class="container__row" v-for="(row, rowIndex) in props.data">
			<!-- Add stripe class to even row -->
			<div class="row" :class="{ 'row--stripe': rowIndex % 2 === 0 }" v-for="key in tableKeys">
				{{ row[key] }}
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.container {
	&__header {
		min-width: 100%;
		display: grid;
		// repeat auto-fit <-> minmax combo for dynamic columns
		// auto-fit fits the current number of items, taking available space (alt. auto-fill)
		// columns will be at least 96px and up to 1fr
		grid-template-columns: repeat(auto-fit, minmax($spacing-96, 1fr));
	}
	&__row {
		min-width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax($spacing-96, 1fr));

		.row {
			&--stripe {
				background-color: $color-surface-800;
			}
		}
	}
}
</style>
