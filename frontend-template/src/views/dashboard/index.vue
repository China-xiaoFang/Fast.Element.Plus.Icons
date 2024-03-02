<template>
    <div>
        <h1>首页</h1>
        {{ state.name }}
        <el-button type="primary" @click="testClick">缓存</el-button>
    </div>
</template>

<script setup lang="ts" name="/dashboard">
import { reactive } from "vue";

const state = reactive({
    name: "首页",
});

const testClick = () => {
    state.name = "首页缓存";
};
</script>
