<template>
    <div>我是测试的</div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
    console.log("测试刷新");
});
onUnmounted(() => {
    console.log("测试销毁");
});
</script>
