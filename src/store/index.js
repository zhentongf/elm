import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
// getters 是空对象，里面没有写东西
import getters from './getters'

Vue.use(Vuex)

const state = {
    userInfo: null // 用户信息

}

// export default new Vuex.Store({
//     state,
//     getters,
//     actions,
//     mutations
// })

// 换一种写法
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
export default store
