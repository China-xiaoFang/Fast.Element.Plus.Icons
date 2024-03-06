<template>
    <div>
        <FTree :requestApi="sysApiGroupInfoApi.tree"></FTree>
        <FTable :requestApi="sysApiInfoApi.paged"></FTable>
    </div>
</template>

<script setup lang="ts" name="/sysApiInfo/paged">
import { reactive } from "vue";
import * as sysApiGroupInfoApi from "@/api/services/system/sysApiGroupInfo";
import * as sysApiInfoApi from "@/api/services/system/sysApiInfo";

const state = reactive({});
</script>
