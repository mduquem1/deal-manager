import { ref, computed } from 'vue'
import { SORT_ORDER } from '../constants/index'
import deformatCurrency from '../utils/deformatCurrency'

export function useTableSort() {
	const sortBy = ref('id')
	const sortOrder = ref(SORT_ORDER.ASC)

	const sortFunction = computed(() => {
		return (a, b) => {
			const aValue = deformatCurrency(a[sortBy.value])
			const bValue = deformatCurrency(b[sortBy.value])

			if (aValue < bValue) return sortOrder.value === SORT_ORDER.ASC ? -1 : 1
			if (aValue > bValue) return sortOrder.value === SORT_ORDER.ASC ? 1 : -1
			return 0
		}
	})

	return { sortBy, sortOrder, sortFunction }
}
