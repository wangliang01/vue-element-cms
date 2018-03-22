<template>
	<el-form class="page-login" status-icon ref="loginForm" :model="loginForm" label-width="80px" :rules="loginRules">
		<el-form-item label="账号：" prop="account">
    	<el-input v-model="loginForm.account" auto-complete="off"></el-input>
  	</el-form-item>
		<el-form-item label="密码：" prop="password">
    	<el-input v-model="loginForm.password" :type="pwdType" @keyup.enter.native="handleLogin" auto-complete="off"></el-input>
  	</el-form-item>
  	<img src="http://baidu.com/1.png" alt="" width="320" height="50" style="float: right;" v-for="i in 10" :key="i">
		<el-button type="primary" class="login-btn" @click.native="handleLogin" :loading="loading">登 录</el-button>
	</el-form>
</template>
<script>
	import {isvalidAccount} from 'utils/validate'
	import NProgress from 'nprogress'
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
					account: 'admin',
					password: '123456'
				},
				loginRules: {
	        account: [{ required: true, trigger: 'blur', validator: validateAccount }],
	        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      	},
      	pwdType: 'password',
      	loading: false
			}
		},
		mounted () {
			let that = this
			this.$nextTick(() => {
				this.asyncLoadImage('http://thumbs.dreamstime.com/z/%E4%BA%92%E8%81%94%E7%BD%91%E9%93%BE%E6%8E%A5-4880693.jpg').then(url => {
					let images = document.querySelectorAll('img')
					images = Array.prototype.slice.call(images)
					console.log(images)
					images.forEach((image, index) => {
						image.src = url
					})
				})
			})
		},
		methods: {
			asyncLoadImage(url) {
				return new Promise((resolve, reject) => {
					const image = new Image
					image.onload = function () {
						resolve(url)
					}

					image.onerror = function () {
						reject(new Error('Count not load image ' + url))
					}

					image.src = url
				})
			},
			handleLogin() {
				this.$refs.loginForm.validate(valid => {
					if (valid) {
						this.loading = true
						NProgress.start()
						this.$store.dispatch('loginByUserName', this.loginForm).then((a) => {
								this.loading = false
								NProgress.done()
								console.log(a)
						}).catch(() => {
							this.loading = false
							NProgress.done()
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
