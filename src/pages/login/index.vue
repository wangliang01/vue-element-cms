<template>
	<el-form class="page-login" status-icon ref="loginForm" :model="loginForm" label-width="80px" :rules="loginRules">
		<el-form-item label="账号：" prop="account">
    	<el-input v-model="loginForm.account" auto-complete="off"></el-input>
  	</el-form-item>
		<el-form-item label="密码：" prop="password">
    	<el-input v-model="loginForm.password" :type="pwdType" @keyup.enter.native="handleLogin" auto-complete="off"></el-input>
  	</el-form-item>
		<el-button type="primary" class="login-btn" @click.native="handleLogin">登 录</el-button>
	</el-form>
</template>
<script>
	import {isvalidAccount} from 'utils/validate'
	import {loginByAccount} from 'api/login'
	export default {
		data() {
			const validateAccount = (rule, value, callback) => {
	      if (!isvalidAccount(value)) {
	        callback(new Error('请输入正确的用户名'))
	      } else {
	        callback()
	      }
	    }
	    const validatePassword = (rule, value, callback) => {
	      if (value.length < 6) {
	        callback(new Error('密码不能小于6位'))
	      } else {
	        callback()
	      }
	    }
			return {
				loginForm: {
					account: '',
					password: ''
				},
				loginRules: {
	        account: [{ required: true, trigger: 'blur', validator: validateAccount }],
	        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      	},
      	pwdType: 'password'
			}
		},
		methods: {
			handleLogin() {
				let that = this
				this.$refs.loginForm.validate(valid => {
					if (valid) {
						// 发送接口
						return new Promise((resolve, reject) => {
							loginByAccount(that.loginForm.account, that.loginForm.password).then(res => {
									const data = res.data
									console.log(data)
							}).catch(error => {
							reject(error)
							})
						})
					} else {
						console.log('error submit')
						return false
					}
				})
			}
		}
	}
</script>
<style lang="less">
	.page-login{
		max-width: 400px;
		padding: 0 20px;
		margin: 0 auto;
		.login-btn{
			margin-left: 80px;
			width: calc(100% - 80px);
		}
	}
</style>
