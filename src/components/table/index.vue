<script setup>
import { computed, ref } from 'vue'
import Modal from '../ui/modal.vue'
import Search from './search.vue'
import extractKeys from '../../utils/extractKeysFromObject.js'
import { SORT_ORDER } from '../../constants/index'
import TableHeader from './headers.vue'
import TableRows from './rows.vue'
import { useTableSearch, useTableSort, useExportCSV } from '../../composables/index.js'
import { MONEY_REGEX } from '../../utils/deformatCurrency'
import { mapDealTable } from '../../services/common/index'

const props = defineProps({
	data: {
		type: Object,
		required: true
	},
	nonDetailedCols: {
		type: Array,
		required: true
	}
})

const rowsPerPage = ref(20)
const loadMoreRows = ref(20)
const selectedRow = ref(null)
const selectedRows = ref([])

// TODO: approach needed for **persistent** selection accross search and sort
// right now, search is disabled when rows are selected and sort reassigns selected rows on usage
// TODO: this might also ensure consistent sorting order when exporting to CSV (BUG: inconsistent order in CSV right now)
// const selectedRowIds = ref(new Set())

// make a copy of original data
const computedData = computed(() => [...props.data])

const trimmedData = computed(() => {
	return mapDealTable([...computedData.value])
})

// returns an array of column name strings
const tableHeaderKeys = extractKeys(trimmedData.value[0])

// returns an array of {value, text, type} object for each column header
const tableHeaders = computed(() => {
	if (!trimmedData.value) {
		throw new Error('Table headers undefined. Load data correctly.')
	}

	return tableHeaderKeys.map((key) => {
		const firstRow = parseFloat(trimmedData.value[1][key])
		// delete all underscore from col text
		return {
			text: key.replace(/_/g, '').toUpperCase(),
			value: key,
			type: firstRow ? typeof firstRow : 'string'
		}
	})
})

// Account for detailed data
const fullTableHeaderKeys = extractKeys(computedData.value[0])

// returns an array of {value, text, type} object for each column header
const fullTableHeaders = computed(() => {
	if (!computedData.value) {
		throw new Error('Table headers undefined. Load data correctly.')
	}

	return fullTableHeaderKeys.map((key) => {
		const firstRow = parseFloat(computedData.value[1][key])
		// delete all underscore from col text
		return {
			text: key.replace(/_/g, '').toUpperCase(),
			value: key,
			type: firstRow ? typeof firstRow : 'string'
		}
	})
})

// setup search and sort composables
const { searchKeyword, searchResults } = useTableSearch(trimmedData.value, tableHeaders.value)
const { sortBy, sortOrder, sortFunction } = useTableSort()

// main render function that returns a searched, sorted, paginated array of rows
const sortedAndPaginatedData = computed(() => {
	// searchResults returns all rows when searchKeyword === ''
	// sort searchResults using sort() functin from composable
	const sorted = [...searchResults.value].sort(sortFunction.value)

	// display from 0 to rowsPerPage which is incrementented by 20 each when user clicks load more
	return sorted.slice(0, rowsPerPage.value)
})

const selectRow = (rowIndex) => {
	// look if row already in selectedRows array
	if (selectedRows.value.includes(rowIndex)) {
		// if it exists in selectedRows, remove it
		// this fires toggle functionality in row selection
		selectedRows.value = selectedRows.value.filter((index) => index !== rowIndex)
	} else {
		// if hasnt been selected yet, add it to selectedRows array
		selectedRows.value.push(rowIndex)
	}

	// if pushed row above is the single instance in selectedRows, activate selectedRow
	// this is done to spin up right modal pane functionality
	if (selectedRows.value.length === 1) {
		selectedRow.value = selectedRows.value[0]
	} else {
		// if more than one row is selected, turn off all modal functionality
		selectedRow.value = null
	}
}

const unselectRow = () => {
	selectedRow.value = null
	selectedRows.value = []
}

const toggleSelectAll = () => {
	// if selectedRows length matches main render items computed array length, deselect all rows
	// this case is for when all rows are selected so we want to toggle it
	if (selectedRows.value.length === sortedAndPaginatedData.value.length) {
		selectedRows.value = []
		selectedRow.value = null
	} else {
		// if not all rows are selected yet, select them all
		selectedRows.value = sortedAndPaginatedData.value.map((_, index) => index)
		selectedRow.value = null
	}
}

const isRowSelected = (index) => {
	// look for row index in selectedRows computed array with .includes
	return selectedRows.value.includes(index)
}

const areAllRowsSelected = computed(() => {
	return (
		selectedRows.value.length === sortedAndPaginatedData.value.length &&
		sortedAndPaginatedData.value.length > 0
	)
})

const selectCol = (colIndex) => {
	// create a new variable with colIndex from the template
	const newSortBy = tableHeaderKeys[colIndex]

	// if it's the same column as before, set sortOrder only
	if (sortBy.value === newSortBy) {
		sortOrder.value = sortOrder.value === SORT_ORDER.ASC ? SORT_ORDER.DESC : SORT_ORDER.ASC
	} else {
		// if it's a new sortBy, set the new value and THEN set the default ASC for newly selected column
		sortBy.value = newSortBy
		sortOrder.value = SORT_ORDER.ASC
	}
}

const exportToCSV = () => {
	useExportCSV(selectedRows, fullTableHeaders, fullTableHeaderKeys, computedData)
}

// load more logic could be refactored to a composable
const loadMore = () => {
	rowsPerPage.value += loadMoreRows.value
}
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
					:sort-by="sortBy"
					:sort-order="sortOrder"
					@selectColHandler="selectCol"
					@toggleSelectAllHandler="toggleSelectAll"
				/>
				<!-- Table rows component could be refactored to maximize isolated dependencies and reduce logic in this page -->
				<TableRows>
					<tr
						v-for="(row, rowIndex) in sortedAndPaginatedData"
						:key="rowIndex"
						:class="{ 'row--stripe': rowIndex % 2 === 0 }"
						@click="selectRow(rowIndex)"
					>
						<td>
							<input
								:id="`row-checkbox-${rowIndex}`"
								type="checkbox"
								:value="rowIndex"
								:checked="isRowSelected(rowIndex) || selectedRow === rowIndex"
							/>
						</td>
						<td
							v-for="key in tableHeaderKeys"
							:key="key + rowIndex"
							:class="{ 'text-right': MONEY_REGEX.test(row[key]) }"
						>
							{{ row[key] }}
						</td>
					</tr>
				</TableRows>
			</table>
		</div>

		<div class="container__pagination">
			<button class="button" @click="loadMore" :disabled="rowsPerPage >= computedData.length">
				Load more
			</button>
		</div>
		<!-- because the modal gets in the way, we can only export more than 1 row -->
		<transition name="fade">
			<Modal class="modal" ref="modal" v-if="selectedRow !== null" @close="unselectRow">
				<template #header>
					<div>
						<p
							class="status"
							:class="{
								'status--red': computedData[selectedRow].status === 'Pending',
								'status--green': computedData[selectedRow].status === 'Open'
							}"
						>
							{{ computedData[selectedRow].status }}
						</p>
					</div>
					<h2>Deal #{{ computedData[selectedRow].id }} {{ computedData[selectedRow].dealName }}</h2>
					<div class="modal__header">
						<p>Industry: {{ computedData[selectedRow].industry }}</p>
						<h5>From: {{ computedData[selectedRow].issuerName }}</h5>
					</div>
				</template>
				<template #body>
					<div>
						<h5>Analysts in the report:</h5>
						<ul>
							<li v-for="analyst in computedData[selectedRow].analysts">{{ analyst }}</li>
						</ul>
					</div>
					<div>
						<p>Total documents: {{ computedData[selectedRow].docCount }}</p>
					</div>
					<p>Bloomberg ID: {{ computedData[selectedRow].bloomberg_id }}</p>
					<p>Custom deal IDs:</p>
					<ul>
						<li v-for="deal_id in computedData[selectedRow].custom_deal_identifiers">
							{{ deal_id }}
						</li>
					</ul>

					<h3>{{ computedData[selectedRow].total }}</h3>

					<p style="font-weight: 600; margin-bottom: 8px !important">
						Contact your account manage for more details about this deal.
					</p>
				</template>
			</Modal>
		</transition>
	</div>
</template>

<style lang="scss">
.container {
	&__header {
		span {
			font-size: $font-size-xl;
		}
	}
	&__sub-header {
		display: flex;
	}
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

	.text-right {
		text-align: right !important;
	}

	.status {
		font-weight: 900;

		&--red {
			color: red;
		}
		&--green {
			color: green;
		}

		@media (max-width: $breakpoint-large) {
			p {
				margin: 0 !important;
			}
		}
	}

	.modal {
		@media (max-width: $breakpoint-large) {
			p,
			h4,
			h5 {
				margin: 0 !important;
			}
		}
	}

	.status .fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
}
</style>
