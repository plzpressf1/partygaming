import { useEffect, useState } from "react";
import { AxiosInstance } from "axios";

type AxiosHttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface UseFetchParams<T, D = unknown> {
    url: string;
    initialValue: T;
    httpMethod?: AxiosHttpMethod,
    payload?: D,
    makePayload?: () => D,
}

export const useFetch = <T>(axiosInstance: AxiosInstance ,params: UseFetchParams<T>): [boolean, number, T, () => void] => {
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
