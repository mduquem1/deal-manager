<script setup>
import { computed } from 'vue'
import { Container } from '../components/ui/index.vue'
import DynamicTable from '../components/dynamic-table/index.vue'
import mapDealTable from '../services/common/mapDealTable.js'
import dealsData from '../data/deals.json'

const deals = computed(() => mapDealTable(dealsData))
</script>

<template>
	<section class="container">
		<Container :style="{ padding: '32px', marginBottom: '48px' }">
			<h1>Available deals</h1>
			<DynamicTable :data="deals" />
		</Container>
	</section>
</template>

<style lang="scss" scoped>
.container {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
}
</style>
