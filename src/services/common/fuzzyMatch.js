import Fuse from 'fuse.js'

class FuzzySearchService {
	constructor(data, options) {
		this.data = data
		this.options = options
		this.fuse = new Fuse(data, options)
	}

	search(query) {
		if (!this.fuse) {
			throw new Error('FuzzySearchService must be initialized before searching')
		}
		return this.fuse.search(query).map((result) => result.item)
	}
}

export default FuzzySearchService
