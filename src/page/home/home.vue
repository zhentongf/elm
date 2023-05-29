<template>
    <div>
        <head-top signin-up="home">
            <span slot="logo" class="head_logo" @click="reload">ele.me</span>
        </head-top>
        
    </div>
</template>

<script>
import headTop from '../../components/header/head'

export default {
    data() {
        return {}
    },

    components: {
        headTop
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';

.head_logo {
    left: 7rem;
    font-weight: 400;
    @include sc(0.7rem, #fff);
    @include wh(2.3rem, 0.7rem);
    @include ct;
}

</style>