import axios from 'axios'

import {Message} from 'element-ui'

import {getToken} from 'utils/cookie'

// 创建axios实例
const service = axios.create({
	timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
	let token = getToken()
	// 让每个请求携带token--['X-Token']为自定义key请根据实际情况自行修改
	if (token) {
		config.headers['X-Token'] = token
	}
	return config
}, error => {
	// 请求发生错误时
	console.log(error)
	Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
	response => {
		console.log(response)
		return response
	},
	error => {
		console.log('error: ' + error)
		Message({
			message: error,
			type: 'error',
			duration: 5 * 1000
		})
	}
)

export default service
