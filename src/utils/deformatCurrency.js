export const MONEY_REGEX = /[$,]/g

export default function deformatCurrency(amount) {
	if (MONEY_REGEX.test(amount)) {
		return parseInt(amount.replace(MONEY_REGEX, ''))
	}
	return amount
}
