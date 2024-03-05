import axios from "@/utils/axios";
import { QuerySysConfigPagedOutput, QuerySysConfigDetailOutput, AddSysConfigInput, UpdateSysConfigInput } from "./models";

/**
 * 系统配置分页
 * @param data
 * @returns
 */
export const paged = (data: PagedInput) => {
    return axios<PagedResult<QuerySysConfigPagedOutput>>({
        url: "/sysConfig/paged",
        method: "post",
        data,
    });
};

/**
 * 系统配置详情
 * @param id
 * @returns
 */
export const detail = (id: number) => {
    return axios<QuerySysConfigDetailOutput>({
        url: "/sysConfig/detail",
        method: "get",
        params: {
            id: id,
        },
    });
};

/**
 * 添加系统配置
 * @param data
 * @returns
 */
export const add = (data: AddSysConfigInput) => {
    return axios<PagedResult<null>>({
        url: "/sysConfig/add",
        method: "post",
        data,
    });
};

/**
 * 更新系统配置
 * @param data
 * @returns
 */
export const update = (data: UpdateSysConfigInput) => {
    return axios<PagedResult<null>>({
        url: "/sysConfig/update",
        method: "put",
        data,
    });
};
