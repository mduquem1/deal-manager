<script setup>
import { SORT_ORDER } from '../../constants/index'
import ArrowUp from '../ui/icons/arrow-up.vue'

const props = defineProps({
	tableHeaders: Array,
	sortOrder: String,
	sortBy: String,
	areAllRowsSelected: Boolean,
	selectCol: Function
})

const emit = defineEmits(['toggleSelectAllHandler', 'selectColHandler'])

const toggleSelectAll = () => {
	emit('toggleSelectAllHandler')
}

const selectCol = (index) => {
	emit('selectColHandler', index)
}
</script>

<template>
	<thead>
		<tr>
			<th scope="col">
				<input type="checkbox" @change="toggleSelectAll" :checked="areAllRowsSelected" />
			</th>
			<th
				scope="col"
				class="table__header"
				:class="{ 'table__header--icon': header.value === sortBy }"
				v-for="(header, index) in tableHeaders"
				:key="header.value"
				@click="selectCol(index)"
			>
				{{ header.text }}
				<div
					v-if="header.value === sortBy"
					class="arrow-icon"
					:style="{ 'rotate(90deg)': sortOrder === SORT_ORDER.DESC }"
				>
					<ArrowUp />
				</div>
			</th>
		</tr>
	</thead>
</template>

<style lang="scss" scoped>
input[type='checkbox'] {
	cursor: pointer;
}
.table {
	&__header {
		&--icon {
			display: flex;

			.arrow-icon {
				max-width: $spacing-16;
			}
		}
	}
}
</style>
