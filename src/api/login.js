import service from 'utils/network'
import urlconfig from 'utils/urlconfig'

const urlData = {
	loginUrl: 'login/login',
	logOutUrl: 'login/logout'
}

export async function loginByAccount(account, password) {

	const data = {
		account,
		password
	}

	console.log('请求url: ' + urlconfig.baseUrl + urlData.loginUrl)

	return service({
		url: urlconfig.baseUrl + urlData.loginUrl,
		method: 'post',
		data
  })
	// return new Promise((resolve, reject) => {
	// 	service({
	// 		url: urlconfig.baseUrl + urlData.loginUrl,
	// 		method: 'post',
	// 		data
	// 	})
	// }).then(res => {
	// 	resolve(res)
	// }).catch(error => {
	// 	reject(error)
	// })
}

// 登出
export async function logOut() {
	return service({
		url: urlconfig.baseUrl + urlData.logOutUrl,
		method: 'post'
	})
}
