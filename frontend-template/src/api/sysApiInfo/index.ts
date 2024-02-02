import axios from "@/utils/axios";
import { QuerySysApiInfoDetailOutput, QuerySysApiInfoPagedInput, QuerySysApiInfoPagedOutput } from "../modules";

/**
 * 接口信息分页
 * @param data
 * @returns
 */
export const paged = (data: QuerySysApiInfoPagedInput) => {
    return axios<PagedResult<QuerySysApiInfoPagedOutput>>({
        url: "/sysApiInfo/paged",
        method: "post",
        data,
    });
};

/**
 * 接口信息详情
 * @param id
 * @returns
 */
export const detail = (id: number) => {
    return axios<QuerySysApiInfoDetailOutput>({
        url: "/sysApiInfo/detail",
        method: "get",
        params: {
            id: id,
        },
    });
};
