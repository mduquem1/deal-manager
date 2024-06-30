<script setup>
import { SORT_ORDER } from '../../constants/index'

const props = defineProps({
	tableHeaders: Array,
	sortOrder: String,
	sortBy: String,
	allRowsSelected: Boolean,
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
				<label>
					<input
						id="header-checkbox"
						type="checkbox"
						@change="toggleSelectAll"
						:checked="allRowsSelected"
				/></label>
			</th>
			<th
				scope="col"
				v-for="(header, index) in tableHeaders"
				:key="header.value"
				@click="selectCol(index)"
			>
				{{ header.text }}
				<span
					v-show="header.value === sortBy"
					class="sort-indicator"
					:class="{ rotate: sortOrder === SORT_ORDER.DESC }"
					>-></span
				>
			</th>
		</tr>
	</thead>
</template>

<style lang="scss" scoped>
input[type='checkbox'] {
	cursor: pointer;
}
.sort-indicator {
	min-width: $spacing-8;
	min-height: $spacing-8;
	margin-left: $spacing-8;
	border-radius: $border-radius-4;
	background-color: $color-surface-400;
	display: inline-block;
	transform: rotate(90deg);
	transition: transform 0.3s ease;
}

.sort-indicator.rotate {
	transform: rotate(270deg);
}
</style>
