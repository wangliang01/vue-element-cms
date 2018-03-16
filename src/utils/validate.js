export function isvalidAccount(str) {
	const validMap = ['admin', 'editor']
	console.log(validMap.indexOf(str.trim()) >= 0)
	return validMap.indexOf(str.trim()) >= 0
}