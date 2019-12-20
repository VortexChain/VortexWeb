<template>
    <div class="action-form w-full h-full p-32">
        <n-link
            tag="div"
            class="flex cursor-pointer items-center header-nav-logo mb-32"
            :to="localePath('index')"
        >
            <span class="header-logo mr-2"></span>
            <span class="text-4xl font-black">Vortex</span>
        </n-link>
        <sign-in-form />
    </div>
</template>

<script>
export default {
    components: {}
}
</script>

<style lang="less" scoped></style>
