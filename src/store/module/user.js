import { loginByAccount } from 'api/login'
import { setToken, getToken, removeToken } from 'utils/cookie'
console.log(loginByAccount)

const user = {
	state: {
		user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
	},
	mutations: {
		SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
	},
	actions: {
		loginByUserName({commit}, userInfo) {
			console.log('userInfo')
			console.log(userInfo)
			let username = userInfo.account.trim()
			return new Promise((resolve, reject) => {
				loginByAccount(username, userInfo.password).then(res => {
					resolve()
				}).catch(error => {
					reject(error)
				}) 
			})
		} 

	}
}

export default user