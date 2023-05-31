import {
    GET_USERINFO
} from './mutation-types'
import {
    getUser
} from '../service/getData'

export default {
    // https://vuex.vuejs.org/guide/actions.html
    // 每个 action 都会传入 context 对象，这里使用了"解构赋值"的语法，把context解构了
    async getUserInfo({
        commit,
        state
    }) {
        let res = await getUser();
        commit(GET_USERINFO, res)
    }
}
