<template>
    <header id="head_top">
        <slot name="logo"></slot>
    </header>
</template>

<script>
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';

#head_top {
    background-color: $blue;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem);
}
</style>