<script setup>
import { computed } from 'vue'
import { Container } from '../components/ui/index.vue'
import DynamicTable from '../components/table/index.vue'
import mapDealTable from '../services/common/mapDealTable.js'
import dealsData from '../data/deals.json'

const deals = computed(() => mapDealTable(dealsData))
</script>

<template>
	<section class="container">
		<Container :style="{ padding: '16px 32px', marginBottom: '48px', maxWidth: '90%' }">
			<h1 class="container__title">Available deals</h1>
			<DynamicTable :data="deals" />
		</Container>
	</section>
</template>

<style lang="scss" scoped>
.container {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
	text-align: left;

	&__title {
		margin-top: $spacing-8;

		@media (max-width: $breakpoint-medium) {
			font-size: $font-size-lg;
		}
	}
}
</style>
