import formatCurrency from '../../utils/formatCurrency'

const mapDetailsDealTable = (deals) => {
	return deals.map(
		({
			id,
			industry,
			total,
			deal_name: dealName,
			issuer_name: issuerName,
			analysts,
			doc_count: docCount,
			status
		}) => ({
			id,
			industry,
			total: formatCurrency(total),
			dealName,
			issuerName,
			analysts,
			docCount,
			status
		})
	)
}

export default mapDetailsDealTable
