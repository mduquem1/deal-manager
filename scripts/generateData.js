import fs from 'fs'

function generateData() {
	const data = []
	for (let i = 1; i <= 5000; i++) {
		const row = {
			id: i,
			issuer_name: `Issuer ${i}`,
			deal_name: `Deal ${i}`,
			bloomberg_id: `BID${i}`,
			total: parseFloat((Math.random() * 10000).toFixed(2)),
			industry: `Industry ${i % 10}`,
			status: ['Active', 'Inactive', 'Pending'][i % 3],
			analysts: [`Analyst ${i % 5}`, `Analyst ${(i + 1) % 5}`],
			doc_count: Math.floor(Math.random() * 100),
			custom_deal_identifiers: [`CDI${i}`, `CDI${i + 1}`]
		}
		data.push(row)
	}
	return data
}

const generatedData = generateData()

// Write the data to a JSON file
fs.writeFile('generatedData.json', JSON.stringify(generatedData, null, 4), (err) => {
	if (err) {
		console.error('Error writing file:', err)
	} else {
		console.info('File has been written successfully')
	}
})
