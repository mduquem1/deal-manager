export function useExportCSV(selectedRows, tableHeaders, tableHeaderKeys, sortedAndPaginatedData) {
	if (selectedRows.value.length === 0) {
		throw new Error('Please select at least one row to export.')
	}

	// build headers
	const headers = tableHeaders.value.map((header) => header.text).join(',')

	// build rows from 1 to n
	// map over selected rows

	console.log('selected rows inside useExport', selectedRows)
	const selectedData = selectedRows.value.map((rowIndex) => {
		// build row from sortedAndPaginatedData at selected rowIndex
		const row = sortedAndPaginatedData.value[rowIndex]

		// map over all headers
		return tableHeaderKeys
			.map((key) => {
				let cellValue = row[key]
				// Data cleaning step:
				// escape commas and quotes in cell values
				if (typeof cellValue === 'string' && (cellValue.includes(',') || cellValue.includes('"'))) {
					cellValue = `"${cellValue.replace(/"/g, '""')}"`
				}

				// return the value of the csv header cell
				return cellValue
			})
			.join(',')
	})

	// join headers and selected rows
	const csvContent = [headers, ...selectedData].join('\n')

	// build blob object
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })

	// create link
	const link = document.createElement('a')

	// make sure browser allows download attribute in link a tag
	if (link.download !== undefined) {
		// internal download link
		const url = URL.createObjectURL(blob)
		link.setAttribute('href', url)
		link.setAttribute('download', `deals_data_${new Date().toISOString()}.csv`)
		// hide link, insert it into DOM, click it and remove it from DOM
		link.style.visibility = 'hidden'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}
	return link
}
