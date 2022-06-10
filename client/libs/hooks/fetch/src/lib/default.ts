import axios from "axios";
import { useEffect, useState } from "react";
import { AxiosRequest } from "./request.interface";

const $normal = axios.create();

export const useFetch = <T>(
    url: string,
    initialValue: T,
    { httpMethod, config }: AxiosRequest = { httpMethod: "get", config: {} },
): [boolean, number, T] => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(0);
    const [data, setData] = useState<T>(initialValue);

    const method = httpMethod ? httpMethod : "get";
    useEffect(() => {
        $normal[method]<T>(url, config)
            .then((resp) => setData(resp.data))
            .catch((err) => setError(err.response.status))
            .finally(() => setLoading(false));
    }, []);

    return [loading, error, data];
};
