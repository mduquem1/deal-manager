import formatCurrency from '../../utils/formatCurrency'

const mapDealTable = (deals) => {
	return deals.map(
		({ id, industry, total, deal_name: dealName, issuer_name: issuerName, status }) => ({
			id,
			industry,
			total: formatCurrency(total),
			dealName,
			issuerName,
			status
		})
	)
}

export default mapDealTable
