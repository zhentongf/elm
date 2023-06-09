import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'


/**
 * 获取首页默认地址
 */
export const cityGuess = () => fetch('/v1/cities', {
    type: 'guess'
});



/**
 * 获取首页热门城市
 */
export const hotcity = () => fetch('/v1/cities', {
    type: 'hot'
});



/**
 * 获取首页所有城市
 */
export const groupcity = () => fetch('/v1/cities', {
    type: 'group'
});



/**
 * 获取当前所在城市
 */
export const currentCity = number => fetch('/v1/cities/' + number);



/**
 * 获取搜索地址
 */
export const searchPlace = (cityid, value) => fetch('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
});


/**
 * 获取msite页面地址信息
 */
export const msiteAddress = geohash => fetch('/v2/pois/' + geohash);
// fetch的路径少写了一个斜杠，导致报错
// export const msiteAddress = geohash => fetch('/v2/pois' + geohash);
// SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON

/**
 * 获取msite页面食品分类列表
 */
export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
    geohash,
    group_type: '1',
    'flags[]': 'F'
});



/**
 * 获取msite商铺列表
 */
export const shopList = (latitude, longitude, offset, 
    restaurant_category_id = '', restaurant_category_ids = [], 
    order_by = '', delivery_mode = '', support_ids = []
) => {
    let supportStr = '';
	support_ids.forEach(item => {
		if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
	});
    let data = {
        latitude,
        longitude,
        offset,
        limit: 20,
		'extras[]': 'activities',
		keyword: '',
        restaurant_category_id,
        'restaurant_category_ids[]': restaurant_category_ids,
        order_by,
        'delivery_mode[]': delivery_mode + supportStr,
    };
    return fetch('/shopping/restaurants', data);
};

/**
 * 获取search页面搜索结果
 */
export const searchRestaurant = (geohash, keyword) => fetch('/v4/restaurants', {
	'extras[]': 'restaurant_activity',
	geohash,
	keyword,
	type: 'search'
});


/**
 * 获取food页面的 category 种类列表
 */
export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category', {
	latitude,
	longitude
});


/**
 * 获取food页面的配送方式
 */

export const foodDelivery = (latitude, longitude) => fetch('/shopping/v1/restaurants/delivery_modes', {
	latitude,
	longitude,
	kw: ''
});


/**
 * 获取food页面的商家属性活动列表
 */

export const foodActivity = (latitude, longitude) => fetch('/shopping/v1/restaurants/activity_attributes', {
	latitude,
	longitude,
	kw: ''
});




























































/**
 * 获取图片验证码
 */
export const getcaptchas = () => fetch('/v1/captchas', {},'POST');

/**
 * 获取用户信息
 */
export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});

/**
 * 获取订单列表
 */
export const getOrderList = (user_id, offset) => fetch('/bos/v2/users/' + user_id + '/orders', {
	limit: 10,
	offset,
});

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {username, password, captcha_code}, 'POST');

/**
 * 退出登录
 */
export const signout = () => fetch('/v2/signout');
