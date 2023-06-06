<template>
    <div>
        <head-top :head-title="headTitle" goBack="true"></head-top>
        <div class="not_found">
            <div class="text">
                <p>项目正在完成ing</p>
                <img src="https://www.runoob.com/wp-content/themes/runoob/assets/img/404.jpg" alt="404.jpg">
            </div>
        </div>
    </div>
</template>

<script>
import headTop from "src/components/header/head";

export default {
    data() {
        return {
            headTitle: '404'
        }
    },
    components: {
        headTop,
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.not_found {
    padding-top: 3rem;
    overflow: hidden;
    .text {
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
            @include font(1.6rem, 1.5);
            font-weight: bold;
            background: linear-gradient(135deg,#42d392 25%,#647eff);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
        }
        img {
            @include wh(12rem, 12 / 465 * 512 + rem);
        }
    }
}
</style>