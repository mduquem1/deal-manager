import { ref, computed } from 'vue'
import { useFuzzyMatch } from './useFuzzyMatch'

export function useTableSearch(data, columns) {
	const { initialize, search } = useFuzzyMatch()
	const searchKeyword = ref('')

	// filter out non-string columns
	const searchableColumns = computed(() => {
		return columns.filter((column) => column.type === 'string')
	})

	const searchResults = computed(() => {
		if (searchKeyword.value === '') return data

		// initialize fuzzy match with data, keys and threshold
		initialize(data, {
			keys: searchableColumns.value.map((col) => col.value),
			threshold: 0.01
		})

		return search(searchKeyword.value)
	})

	return { searchKeyword, searchResults }
}
