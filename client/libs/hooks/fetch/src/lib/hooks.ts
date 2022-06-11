import { useEffect, useState } from "react";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { $axiosBearer, $axiosDefault } from "@pg/api";

type AxiosHttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface UseFetchParams<T, D = unknown> {
    url: string;
    initialValue: T;
    httpMethod?: AxiosHttpMethod,
    bearer?: boolean;
    payload?: D,
    makePayload?: () => D,
}

export const useFetch = <T>(params: UseFetchParams<T>): [boolean, number, T, () => void] => {
    const axiosInstance = params.bearer ? $axiosBearer : $axiosDefault;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(0);
    const [data, setData] = useState<T>(params.initialValue);

    const httpMethod = params.httpMethod ? params.httpMethod : "get";
    let payload = params.payload ? params.payload : {};

    if (!params.makePayload) {
        useEffect(() => {
            onDemand();
        }, []);
    }

    const onDemand = () => {
        if (params.makePayload) {
            payload = params.makePayload();
        }
        setLoading(true);
        setError(0);
        setData(params.initialValue);
        axiosInstance[httpMethod]<T>(params.url, payload)
            .then((resp) => setData(resp.data))
            .catch((err) => setError(err.response.status))
            .finally(() => setLoading(false));
    };

    return [loading, error, data, onDemand];
};

export const useBearerFetch = <T>(params: UseFetchParams<T>): [boolean, number, T, () => void] => {
    return useFetch<T>({ ...params, bearer: true });
}
