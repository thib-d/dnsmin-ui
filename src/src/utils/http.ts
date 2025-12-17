import axios, {AxiosInstance} from "axios";
import {getConfig} from "@app/config";

let api: AxiosInstance | null = null;

export const getApi = (): AxiosInstance => {
    if (!api) {
        api = axios.create({
            baseURL: getConfig().apiBaseUrl + '/v1',
            withCredentials: true,
        });
        api.interceptors.response.use(
            (res) => res,
            (err) => {
                console.error("API error:", err);
                return Promise.reject(err);
            }
        );
    }
    return api;
};
