import fetch from '../config/fetch'

/**
 * 获取首页默认地址
 */
export const cityGuess = () => fetch('/v1/cities', {
    type: 'guess'
});
