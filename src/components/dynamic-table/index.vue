<script setup>
import { onMounted, computed, ref, watchEffect } from 'vue'
import TableHeader from './table-header.vue'
import Details from './details.vue'
import Search from './search.vue'
import extractKeys from '../../utils/extractKeysFromObject.js'
import FuzzySearchService from '../../services/common/fuzzyMatch'

const props = defineProps({
	data: {
		type: Object,
		required: true
	}
})

const sortBy = ref('id')
const sortOrder = ref('asc')
const pageIndex = ref(1)
const maxRowsPerPage = ref(20)
const selectedRow = ref(null)
const searchKeyword = ref('')
const searchResults = ref([])

const tableHeaderKeys = extractKeys(props.data[0])

const tableHeaders = computed(() => {
	if (!props.data) {
		throw new Error('Table headers undefined')
	}
	return tableHeaderKeys.map((key) => ({
		text: key.replace(/_/g, ' ').toUpperCase(),
		value: key,
		type: typeof parseFloat(props.data[1][key]) || 'string'
	}))
})

const selectRow = (rowIndex) => {
	const rowKeys = () => extractKeys(props.data[rowIndex])

	selectedRow.value = rowIndex
	console.log('row keys', selectedRow.value)

	return rowKeys
}

const unselectRow = () => {
	selectedRow.value = null
	console.log('HADSOASD', selectedRow.value)
}

const renderRows = computed(() => {
	// if (sortOrder === 'asc') {
	// 	return props.data.sort((itemA, itemB) => itemA[sortBy.value] - itemB[sortBy.value])
	// } else if (sortOrder === 'desc') {
	// 	return props.data.sort((itemA, itemB) => itemB[sortBy.value] - itemA[sortBy.value])
	// }
	console.log('heree', props.data.slice(maxRowsPerPage))
	if (searchResults.value.length > 0) {
		console.log('mayve searhc results here', searchResults)
		return searchResults.value.slice(maxRowsPerPage)
	}

	return props.data.slice(maxRowsPerPage)
})

const search = () => {
	searchResults.value = []
	if (searchKeyword !== '') {
		const fuzzy = new FuzzySearchService(props.data, {
			keys: tableHeaderKeys.filter((key) => key !== 'total' && key !== 'docCount'),
			threshold: 0.3
		})

		const query = fuzzy.search(searchKeyword.value)
		searchResults.value.push(...query)
		console.log('QUERY RESULT', query)
	} else {
		throw new Error('Search is undefined')
	}
}

watchEffect(() => {
	search()
})

onMounted(() => {
	console.log('dealsssssss', props.data)

	console.log('table keys', tableHeaders.value)

	// search()
})
</script>

<template>
	<div class="container">
		<div class="container__search-box">
			<Search v-model="searchKeyword" />
		</div>
		<div class="container__header">
			<TableHeader :table-headers="tableHeaders" :sort-order="sortOrder" />
		</div>
		<div
			class="container__row"
			v-for="(row, rowIndex) in renderRows"
			:key="rowIndex"
			@click="selectRow(rowIndex)"
		>
			<!-- Add stripe class to even row -->
			<div
				class="row"
				:class="{ 'row--stripe': rowIndex % 2 === 0 }"
				v-for="key in tableHeaderKeys"
				:key="key + rowIndex"
			>
				{{ row[key] }}
			</div>

			<Details ref="modal" v-if="selectedRow && selectedRow === rowIndex" @close="unselectRow">
				<template #header>
					<h2>Custom Modal Header</h2>
				</template>
				<template #body>
					<p>This is a custom body content for the modal.</p>
					<p>{{ row[key] }}</p>
				</template>
			</Details>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.container {
	&__search-box {
		display: flex;
		justify-content: flex-start;
	}

	&__header {
		padding: $spacing-16;
		min-width: 100%;
		display: grid;
		// repeat auto-fit <-> minmax combo for dynamic columns
		// auto-fit fits the current number of items, taking available space (alt. auto-fill)
		// columns will be at least 96px and up to 1fr
		grid-template-columns: repeat(auto-fit, minmax($spacing-96, 1fr));
	}
	&__row {
		padding: $spacing-8 $spacing-16;
		position: relative;
		cursor: pointer;
		min-width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax($spacing-96, 1fr));

		&:hover {
			background-color: $color-surface-200;
		}

		.row {
			&--stripe {
				background-color: $color-surface-50;
			}
		}
	}
}
</style>
