import { AxiosRequestConfig } from "axios";
import { AxiosHttpMethod } from "@pg/types";

export interface AxiosRequest {
    httpMethod?: AxiosHttpMethod,
    config?: AxiosRequestConfig,
}
