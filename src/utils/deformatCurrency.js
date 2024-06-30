export default function deformatCurrency(amount) {
	const moneyRegex = /[$,]/g

	if (moneyRegex.test(amount)) {
		return parseInt(amount.replace(moneyRegex, ''))
	}
	return amount
}
