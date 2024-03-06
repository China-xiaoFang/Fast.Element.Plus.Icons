<template>
    <div class="main-row">
        <FTree ref="fTreeRef" :requestApi="sysApiGroupInfoApi.tree"></FTree>
        <FTable ref="fTableRef" :columns="tableColumns" :requestApi="sysApiInfoApi.paged"></FTable>
    </div>
</template>

<script setup lang="ts" name="/sysApiInfo/paged">
import { reactive, ref } from "vue";
import * as sysApiGroupInfoApi from "@/api/services/system/sysApiGroupInfo";
import * as sysApiInfoApi from "@/api/services/system/sysApiInfo";
import { FTableColumn } from "@/components/FTable/interface";
import { HttpRequestMethodDict } from "@/api/dicts/http-request-method-dict";
import { HttpRequestActionDict } from "@/api/dicts/http-request-action-dict";

const fTreeRef = ref();
const fTableRef = ref();
const state = reactive({});

const tableColumns: FTableColumn[] = reactive([
    {
        prop: "moduleName",
        label: "模块名称",
    },
    {
        prop: "name",
        label: "接口名称",
    },
    {
        prop: "url",
        label: "接口地址",
    },
    {
        prop: "method",
        label: "接口请求方式",
        tag: true,
        enum: HttpRequestMethodDict,
    },
    {
        prop: "apiAction",
        label: "接口操作方式",
        tag: true,
        enum: HttpRequestActionDict,
    },
]);
</script>
