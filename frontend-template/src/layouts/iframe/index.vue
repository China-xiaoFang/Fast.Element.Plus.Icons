<template>
    <div class="iframe-main" v-loading="state.loading">
        <iframe :src="state.iframeSrc" frameborder="0" height="100%" width="100%" id="iframe" ref="iframeRef" @load="hideLoading"></iframe>
    </div>
</template>

<script setup lang="ts" name="LayoutIframe">
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const state = reactive({
    loading: true,
    iframeSrc: router.currentRoute.value.meta.iframeUrl as string,
});

const hideLoading = () => {
    state.loading = false;
};
</script>
