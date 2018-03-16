import service from 'utils/network'
import urlconfig from 'utils/urlconfig'

const urlData = {
	loginUrl: 'login/login'
}

export function loginByAccount(account, password) {
	const data = {
		account,
		password
	}

	console.log('请求url: ' +urlconfig.baseUrl + urlData.loginUrl)
	return service({
		url: urlconfig.baseUrl + urlData.loginUrl,
		method: 'post',
		data
	})
}