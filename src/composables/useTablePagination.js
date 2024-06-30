import { ref, computed } from 'vue'

export function useTablePagination(data, itemsPerPage = 20) {
	const currentPage = ref(1)

	const totalPages = computed(() => Math.ceil(data.value.length / itemsPerPage))

	const paginatedData = computed(() => {
		const start = (currentPage.value - 1) * itemsPerPage
		const end = start + itemsPerPage
		return data.value.slice(start, end)
	})

	return { currentPage, itemsPerPage, totalPages, paginatedData }
}
