<template>
    <div>
        <head-top signin-up="msite">
            <router-link :to="'/search/' + geohash" class="link_search" slot="search">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
	    			<circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
	    			<line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
	    		</svg>
            </router-link>
            <router-link to="/home" slot="msite-title" class="msite_title">
                <span class="title_text ellipsis">{{ msiteTitle }}</span>
            </router-link>
        </head-top>
        <nav class="msite_nav">
            <div class="swiper-container" v-if="foodTypes.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
                        <!-- [Vue warn]: Avoid using non-primitive value as key -->
                        <!-- :key='foodItem' 改成 :key='index' -->
                        <router-link :to="{path: '/shopList', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="(foodItem, index) in item" :key='index' class="link_to_food">
                        <!-- <a v-for="foodItem in item" class="link_to_food"> -->
                            <figure>
                                <img :src="imgBaseUrl + foodItem.image_url" alt="foodItem.image_url">
                                <figcaption>{{ foodItem.title }}</figcaption>
                            </figure>
                        <!-- </a> -->
                        </router-link>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <!-- 如果slider还未加载出来就显示图片动画 -->
            <img src="../../images/fl.svg" alt="Microsoft Edge" class="fl_back animation_opactiy" v-else>
        </nav>
        <div class="shop_list_container">
            <header class="shop_header">
                <svg class="shop_icon">
	    			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
	    		</svg>
                <span class="shop_header_title">附近商家</span>
            </header>
            <shop-list v-if="hasGotData" :geohash="geohash"></shop-list>
        </div>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
// import {imgBaseUrl} from 'src/config/env'
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/footGuide'
import shopList from '../../components/common/shopList'
import {msiteAddress, msiteFoodTypes, cityGuess} from '../../service/getData'
import '../../plugins/swiper.min.js'
import '../../style/swiper.min.css'

export default {
    data() {
        return {
            geohash: '', // city页面传递过来的地址geohash
            msiteTitle: '请选择地址...', // msite页面头部标题
            foodTypes: [], // 食品分类列表
            hasGotData: false, // 是否已经获取地理位置数据，成功之后再获取商铺列表信息
            imgBaseUrl: 'https://fuss10.elemecdn.com' // 图片域名地址
        }
    },
    async beforeMount() {
        if(!this.$route.query.geohash) {
            const address = await cityGuess();
            this.geohash = address.latitude + ',' + address.longitude;
        } else {
            this.geohash = this.$route.query.geohash;
        }
        // 保存geohash 到vuex
        this.SAVE_GEOHASH(this.geohash);
        // 获取位置信息
        let res = await msiteAddress(this.geohash);
        this.msiteTitle = res.name;
        // 记录当前经度纬度和地址
        this.RECORD_ADDRESS(res);

        // if(res) this.hasGotData = true;
        this.hasGotData = true; // 之前写错了，不需要if(res)
    },
    async activated() {
        // 有缓存的情况下，每次返回此页，都更新geohash
        if(this.$route.query.geohash == this.geohash) return;

        if(!this.$route.query.geohash) {
            const address = await cityGuess()
            this.geohash = address.latitude + ',' + address.longitude
        } else {
            this.geohash = this.$route.query.geohash
        }
        // 保存geohash 到vuex
        this.SAVE_GEOHASH(this.geohash)
        // 获取位置信息
        let res = await msiteAddress(this.geohash);
        this.msiteTitle = res.name;
        // 记录当前经度纬度
        this.RECORD_ADDRESS(res);
    },
    mounted() {
        // 获取导航食品类型列表
        msiteFoodTypes(this.geohash).then(res => {
            let resLength = res.length;
            let resArr = [...res]; // 返回一个新的数组
            let foodArr = [];
            for(let i = 0, j = 0; i < resLength; i += 8, j++) {
                // 新的数组每次剪切下来8个
                foodArr[j] = resArr.splice(0, 8);
            }
            this.foodTypes = foodArr;
        }).then(() => {
            // 初始化swiper
            new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                loop: true
            });
        })
    },
    components: {
        headTop,
        shopList,
        footGuide
    },
    methods: {
        ...mapMutations([
            'RECORD_ADDRESS', 'SAVE_GEOHASH'
        ]),
        // 解码url地址，求取restaurant_category_id值
        getCategoryId(url) {
            let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
            // console.log(urlData)
            if(/restaurant_category_id/gi.test(urlData)) {
                return JSON.parse(urlData).restaurant_category_id.id
            } else {
                // 后端数据有问题，有些数据没有restaurant_category_id
                return ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	.link_search{
		left: .8rem;
		@include wh(.9rem, .9rem);
		@include ct;
	}
	.msite_title{
		@include center;
        width: 50%;
        color: #fff;
        text-align: center;
        margin-left: -0.5rem;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            display: block;
        }
	}
	.msite_nav{
		padding-top: 2.1rem;
		background-color: #fff;
		border-bottom: 0.025rem solid $bc;
		height: 10.6rem;
		.swiper-container{
			@include wh(100%, auto);
			padding-bottom: 0.6rem;
			.swiper-pagination{
				bottom: 0.2rem;
			}
		}
		.fl_back{
			@include wh(100%, 100%);
		}
	}
	.food_types_container{
		display:flex;
		flex-wrap: wrap;
		.link_to_food{
			width: 25%;
			padding: 0.3rem 0rem;
			@include fj(center);
			figure{
				img{
					margin-bottom: 0.3rem;
					@include wh(1.8rem, 1.8rem);
				}
				figcaption{
					text-align: center;
					@include sc(0.55rem, #666);
				}
			}
		}
	}
	.shop_list_container{
		margin-top: .4rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem;
				vertical-align: middle;
				@include wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
				color: #999;
				@include font(0.55rem, 1.6rem);
			}
		}
	}

</style>