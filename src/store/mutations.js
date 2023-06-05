import {
    RECORD_ADDRESS,





    RECORD_USERINFO,
    GET_USERINFO,



    SAVE_GEOHASH,

















} from './mutation-types'

import {setStore, getStore} from '../config/mUtils'

export default {
    // 记录当前经度纬度
    [RECORD_ADDRESS](state, {
        latitude,
        longitude
    }) {
        state.latitude = latitude;
        state.longitude = longitude;
    },
    // 记录用户信息到localStorage
    [RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStore('user_id', info.user_id);
	},
    // 用户信息存入vuex
    [GET_USERINFO](state, info) {
        if(state.userInfo && (state.userInfo.username !== info.username)) {
            return;
        }
        
        if(!info.message) {
            state.userInfo = {...info};
            state.login = true;
        } else {
            state.userInfo = null;
        }
    },
    [SAVE_GEOHASH](state, geohash) {
        state.geohash = geohash;
    }
}