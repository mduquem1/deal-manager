<script setup>
import { ref, onMounted, computed } from 'vue'
import { Container } from '../components/ui/index.vue'
import DynamicTable from '../components/table/index.vue'
import mapDetailsDealTable from '../services/common/mapDetailsDealTable.js'
import { DATA } from '../constants/index'

const data = ref([])
const loading = ref(true)
const error = ref(null)

const deals = computed(() => {
	return mapDetailsDealTable(data.value)
})

// todo refactor to useFetchData
const fetchData = async () => {
	try {
		const response = await fetch(DATA.LIGHT_DATA)
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const jsonData = await response.json()
		data.value = jsonData
	} catch (err) {
		console.error('Error fetching data:', err)
		error.value = 'An error occurred while fetching data'
	} finally {
		loading.value = false
	}
}

onMounted(() => {
	fetchData()
})
</script>

<template>
	<section class="container">
		<Container :style="{ padding: '16px 0', marginBottom: '48px' }">
			<h1 class="container__title">Available deals</h1>
			<div v-if="loading">Loading...</div>
			<DynamicTable v-else-if="!error" :data="deals" :non-detailed-cols="['analysts']" />
			<div v-else>{{ error }}</div>
		</Container>
	</section>
</template>

<style lang="scss" scoped>
.container {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
	text-align: left;

	@media (max-width: $breakpoint-medium) {
		max-width: 90%;
		padding: 0 $spacing-16;
	}

	&__title {
		margin-top: $spacing-8;

		@media (max-width: $breakpoint-medium) {
			font-size: $font-size-lg;
		}
	}
}
</style>
