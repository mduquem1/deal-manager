import { ref, computed } from 'vue'
import { SORT_ORDER } from '../constants/index'
import deformatCurrency from '../utils/deformatCurrency'

export function useTableSort() {
	const sortBy = ref('id')
	const sortOrder = ref(SORT_ORDER.ASC)

	const sortFunction = computed(() => {
		return (a, b) => {
			// ensures "money" formatted strings are handled as numbers for correct sorting
			const aValue = deformatCurrency(a[sortBy.value])
			const bValue = deformatCurrency(b[sortBy.value])

			if (aValue < bValue) return sortOrder.value === SORT_ORDER.ASC ? -1 : 1
			if (aValue > bValue) return sortOrder.value === SORT_ORDER.ASC ? 1 : -1
			return 0
		}
	})

	return { sortBy, sortOrder, sortFunction }
}
