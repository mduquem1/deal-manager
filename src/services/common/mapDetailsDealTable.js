import formatCurrency from '../../utils/formatCurrency'

const mapDetailsDealTable = (deals) => {
	return deals.map(
		({
			id,
			industry,
			bloomberg_id,
			total,
			deal_name: dealName,
			issuer_name: issuerName,
			analysts,
			custom_deal_identifiers,
			doc_count: docCount,
			status
		}) => ({
			id,
			industry,
			total: formatCurrency(total),
			dealName,
			issuerName,
			bloomberg_id,
			custom_deal_identifiers,
			analysts,
			docCount,
			status
		})
	)
}

export default mapDetailsDealTable
