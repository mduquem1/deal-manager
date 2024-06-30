const mapDealTable = (deals) => {
	if (!deals) throw new Error('Data not provided')

	return deals.map(({ id, industry, total, dealName, issuerName, status }) => ({
		id,
		industry,
		total,
		dealName,
		issuerName,
		status
	}))
}

export default mapDealTable
