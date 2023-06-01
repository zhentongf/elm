import {
    RECORD_ADDRESS,






    GET_USERINFO,



    SAVE_GEOHASH,

















} from './mutation-types'

export default {
    // 记录当前经度纬度
    [RECORD_ADDRESS](state, {
        latitude,
        longitude
    }) {
        state.latitude = latitude;
        state.longitude = longitude;
    },
    // 获取用户信息存入vuex
    [GET_USERINFO](state, info) {
        if(state.userInfo && (state.userInfo.username !== info.username)) {
            return;
        }
        if(!state.login) {
            return;
        }
        if(!info.message) {
            state.userInfo = {...info};
        } else {
            state.userInfo = null;
        }
    },
    [SAVE_GEOHASH](state, geohash) {
        state.geohash = geohash;
    }
}