import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
// import getters from 'store/getters'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		user
	}
})

export default store