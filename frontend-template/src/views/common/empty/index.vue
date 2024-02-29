<template>
    <div class="error-page">
        <div class="error-page-svg">
            <el-empty :description="$t('views.common.empty.这是一个空的，什么都没有的页面~')" />
        </div>
        <router-link to="/">
            <el-button type="primary">回到首页</el-button>
        </router-link>
    </div>
</template>
