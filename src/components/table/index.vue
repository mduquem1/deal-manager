<script setup>
import { computed, ref, watchEffect } from 'vue'
import Modal from '../ui/modal.vue'
import Search from './search.vue'
import extractKeys from '../../utils/extractKeysFromObject.js'
import { SORT_ORDER } from '../../constants/index'
import ArrowUp from '../ui/icons/arrow-up.vue'
import TableHeader from './headers.vue'
import TableRows from './rows.vue'
import { formatCurrency } from '../../utils/index'
import { useTableSearch, useTableSort, useExportCSV } from '../../composables/index.js'

const props = defineProps({
	data: {
		type: Object,
		required: true
	}
})

const rowsPerPage = ref(20)
const selectedRow = ref(null)
const selectedRows = ref([])

// approach needed for persistent selection accross search and sort
//const selectedRowIds = ref(new Set())

const tableHeaderKeys = extractKeys(props.data[0])

const computedData = computed(() => props.data)

const tableHeaders = computed(() => {
	if (!computedData.value) {
		throw new Error('Table headers undefined')
	}

	return tableHeaderKeys.map((key) => {
		const firstRow = parseFloat(computedData.value[1][key])

		return {
			text: key.replace(/_/g, '').toUpperCase(),
			value: key,
			type: firstRow ? typeof firstRow : 'string'
		}
	})
})

const { searchKeyword, searchResults } = useTableSearch(computedData.value, tableHeaders.value)

const { sortBy, sortOrder, sortFunction } = useTableSort()

const sortedAndPaginatedData = computed(() => {
	const sorted = [...searchResults.value].sort(sortFunction.value)
	return sorted.slice(0, rowsPerPage.value)
})

const selectRow = (rowIndex) => {
	if (selectedRows.value.includes(rowIndex)) {
		selectedRows.value = selectedRows.value.filter((index) => index !== rowIndex)
	} else {
		selectedRows.value.push(rowIndex)
	}

	if (selectedRows.value.length === 1) {
		selectedRow.value = selectedRows.value[0]
	} else {
		selectedRow.value = null
	}
}

const unselectRow = () => {
	selectedRow.value = null
	selectedRows.value = []
}

const toggleSelectAll = () => {
	if (selectedRows.value.length === sortedAndPaginatedData.value.length) {
		selectedRows.value = []
		selectedRow.value = null
	} else {
		selectedRows.value = sortedAndPaginatedData.value.map((_, index) => index)
		selectedRow.value = null
	}
}

const isRowSelected = (index) => {
	return selectedRows.value.includes(index)
}

const areAllRowsSelected = computed(() => {
	return (
		selectedRows.value.length === sortedAndPaginatedData.value.length &&
		sortedAndPaginatedData.value.length > 0
	)
})

const selectCol = (colIndex) => {
	const newSortBy = tableHeaderKeys[colIndex]
	if (sortBy.value === newSortBy) {
		sortOrder.value = sortOrder.value === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC
	} else {
		sortBy.value = newSortBy
		sortOrder.value = SORT_ORDER.ASC
	}
}

const exportToCSV = () => {
	useExportCSV(selectedRows, tableHeaders, tableHeaderKeys, sortedAndPaginatedData)
}

const loadMore = () => {
	rowsPerPage.value += 20
}

watchEffect(() => {
	console.log('searchKeyword changed:', searchKeyword.value)
	console.log('sortOrder changed:', sortOrder.value)
	console.log('sortBy changed:', sortBy.value)
})
</script>

<template>
	<div class="container">
		<div class="container__search-box">
			<!-- search is disabled when rows are selected -->
			<Search v-model="searchKeyword" :disabled="selectedRows.length > 0" />
			<div>
				<!-- export is disabled when no rows are selected -->
				<button @click="exportToCSV" :disabled="selectedRows.length === 0">Export to CSV</button>
			</div>
		</div>

		<div class="container__table">
			<table class="table">
				<TableHeader
					:table-headers="tableHeaders"
					:all-rows-selected="areAllRowsSelected"
					@selectColHandler="selectCol"
					@toggleSelectAllHandler="toggleSelectAll"
				/>
				<TableRows>
					<tr
						v-for="(row, rowIndex) in sortedAndPaginatedData"
						:key="rowIndex"
						:class="{ 'row--stripe': rowIndex % 2 === 0 }"
						@click="selectRow(rowIndex)"
					>
						<td>
							<input
								type="checkbox"
								:value="rowIndex"
								:checked="isRowSelected(rowIndex) || selectedRow === rowIndex"
							/>
						</td>
						<td v-for="key in tableHeaderKeys" :key="key + rowIndex">
							{{ row[key] }}
						</td>
					</tr>
				</TableRows>
			</table>
		</div>

		<div class="container__pagination">
			<button class="button" @click="loadMore">Load more</button>
		</div>

		<Modal ref="modal" v-if="selectedRow !== null" @close="unselectRow">
			<template #header>
				<h2>Deal</h2>
			</template>
			<template #body>
				<p>This is a custom body content for the modal.</p>
				<p>{{ sortedAndPaginatedData[selectedRow] }}</p>
				<p>{{ sortedAndPaginatedData[selectedRow].industry }}</p>
				<p>{{ sortedAndPaginatedData[selectedRow].total }}</p>
				<p>{{ sortedAndPaginatedData[selectedRow].dealName }}</p>
				<p>{{ sortedAndPaginatedData[selectedRow].issuerName }}</p>
				<p>{{ sortedAndPaginatedData[selectedRow].status }}</p>
			</template>
		</Modal>
	</div>
</template>

<style lang="scss">
.container {
	&__search-box {
		display: flex;
		justify-content: space-between;
		margin-bottom: $spacing-16;
	}
	&__table {
		overflow-x: auto;
		max-width: 100%;

		.table {
			width: 100%;
			border-collapse: collapse; // deletes gap width

			tr,
			th {
				cursor: pointer;
			}

			th,
			td {
				padding: $spacing-8 $spacing-16;
				text-align: left;
				white-space: nowrap;
			}

			thead {
				background-color: $color-surface-200;
			}

			tbody {
				tr {
					&:hover {
						background-color: $color-surface-100;
					}

					&.row--stripe {
						background-color: $color-surface-50;
					}
				}
			}
		}

		@media (max-width: $breakpoint-medium) {
			.table {
				font-size: $font-size-sm;

				th,
				td {
					padding: $spacing-32 $spacing-16;
				}
			}
		}
	}

	&__pagination {
		margin-top: $spacing-16;

		.button {
			margin-left: $spacing-8;
		}
	}
}
</style>
