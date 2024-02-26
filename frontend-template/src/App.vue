<template>
    <el-config-provider :locale="lang">
        <router-view></router-view>
    </el-config-provider>
</template>

<script setup lang="ts" name="App">
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useConfig } from "@/stores/config";
import { editDefaultLang } from "@/lang";

const configStore = useConfig();

// 初始化 element 的语言包
const { getLocaleMessage } = useI18n();
const lang = getLocaleMessage(configStore.lang.defaultLang) as any;

// 浏览器语言
const browserLang = computed(() => {
    return navigator.language;
});

/**
 * 监听浏览器语言的变化，更改显示语言
 */
watch(browserLang, (newValue, oldValue) => {
    console.log(`检测到浏览器语言变更：${oldValue} => ${newValue}`);
    // 变更语言
    editDefaultLang(newValue);
});

/**
 * 监听config.layout的值，如果改变，则更改 css root 中的变量值
 */
watch(
    configStore.layout,
    (newValue, oldValue) => {
        let styleContent = `
:root {`;
        Object.keys(newValue).forEach((key) => {
            if (Array.isArray(configStore.layout[key])) {
                const colors = configStore.layout[key] as string[];
                if (colors) {
                    let value = "";
                    if (configStore.layout.isDark) {
                        value = colors[1];
                    } else {
                        value = colors[0];
                    }
                    styleContent += `
    --fast-config-layout-${key}: ${value};`;
                }
            }
        });
        styleContent += `
}`;
        const existBindStyleElement = document.head.querySelector("style[fast-style-bind]");
        if (existBindStyleElement) {
            existBindStyleElement.textContent = styleContent;
        } else {
            const bindStyleElement = document.createElement("style");
            bindStyleElement.setAttribute("fast-style-bind", "true");
            bindStyleElement.textContent = styleContent;
            document.head.querySelector("title").insertAdjacentElement("afterend", bindStyleElement);
        }
    },
    {
        // 深度监听其中对象属性改变
        deep: true,
        // 初始化的时候执行一次
        immediate: true,
    }
);
</script>

<style lang="scss">
:root {
    --aaaa: v-bind("configStore");
}
</style>
