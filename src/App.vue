<!-- 顶层路由，对应index.html里的 router-view -->
<template>
    <div>
        <transition name="router-fade" mode="out-in">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
        <svg-icon></svg-icon>
    </div>
</template>

<script>
import svgIcon from './components/common/svg';
export default {
    components: {
        svgIcon
    },
    mounted() {
        // console.log('顶层路由')
    },
}
</script>

<style lang="scss">
@import './style/common';
.router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-to {
    opacity: 0;
}
.router-fade-enter-to, .router-fade-leave {
    opacity: 1;
}
</style>