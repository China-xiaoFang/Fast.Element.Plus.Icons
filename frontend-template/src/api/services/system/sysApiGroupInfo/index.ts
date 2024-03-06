import axios from "@/utils/axios";
import { QuerySysApiGroupInfoDetailOutput, QuerySysApiGroupInfoPagedOutput } from "./models";
import { ElSelectorOutput } from "@/api/models/el-selector-output";
import { ElTreeOutput } from "@/api/models/el-tree-output";

/**
 * 接口分组分页选择器
 * @param data
 * @returns
 */
export const selector = (params: PagedInput) => {
    return axios<PagedResult<ElSelectorOutput<number>>>({
        url: "/sysApiGroupInfo/selector",
        method: "get",
        params,
    });
};

/**
 * 接口分组树形
 * @param data
 * @returns
 */
export const tree = () => {
    return axios<ElTreeOutput<number>[]>({
        url: "/sysApiGroupInfo/tree",
        method: "get",
    });
};

/**
 * 接口分组分页
 * @param data
 * @returns
 */
export const paged = (data: PagedInput) => {
    return axios<PagedResult<QuerySysApiGroupInfoPagedOutput>>({
        url: "/sysApiGroupInfo/paged",
        method: "post",
        data,
    });
};

/**
 * 接口分组详情
 * @param id
 * @returns
 */
export const detail = (id: number) => {
    return axios<QuerySysApiGroupInfoDetailOutput>({
        url: "/sysApiGroupInfo/detail",
        method: "get",
        params: {
            id: id,
        },
    });
};

/**
 * 刷新接口分组和接口信息
 * @returns
 */
export const refresh = () => {
    return axios<PagedResult<QuerySysApiGroupInfoPagedOutput>>({
        url: "/sysApiGroupInfo/refresh",
        method: "post",
    });
};
