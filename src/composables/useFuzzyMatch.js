import { ref, readonly } from 'vue'
import Fuse from 'fuse.js'

export function useFuzzyMatch(initialData = [], initialOptions = {}) {
	const data = ref(initialData)
	const options = ref(initialOptions)
	const fuse = ref(null)

	// refer to implementation for initialization parameters
	const initialize = (newData, newOptions) => {
		data.value = newData
		options.value = newOptions
		fuse.value = new Fuse(newData, newOptions)
	}

	const search = (query) => {
		if (!fuse.value) {
			throw new Error('FuzzySearch must be initialized before searching')
		}
		return fuse.value.search(query).map((result) => result.item)
	}

	// initialize if initial data and options are provided
	if (initialData.length > 0 && Object.keys(initialOptions).length > 0) {
		initialize(initialData, initialOptions)
	}

	return {
		data: readonly(data),
		options: readonly(options),
		initialize,
		search
	}
}
