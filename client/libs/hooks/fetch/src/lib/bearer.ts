import axios from "axios";
import { useEffect, useState } from "react";
import { AxiosRequest } from "./request.interface";

interface RefreshResponse {
    accessToken: string;
}

const $bearer = axios.create({
    withCredentials: true
});

const LocalStorageAccessTokenKey = "pg-access-token";

$bearer.interceptors.request.use((config) => {
    if (config.headers) config.headers.Authorization = `Bearer ${localStorage.getItem(LocalStorageAccessTokenKey)}`;
    return config;
});

$bearer.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<RefreshResponse>(`${process.env.NX_PG_AUTH_URL}/api/auth/refresh`, {
                    withCredentials: true
                });
                localStorage.setItem(LocalStorageAccessTokenKey, response.data.accessToken);
                return $bearer.request(originalRequest);
            } catch (e) {
                console.error(e);
            }
        }
        throw error;
    }
);

export const useBearerFetch = <T>(
    url: string,
    initialValue: T,
    { httpMethod, config }: AxiosRequest = { httpMethod: "get", config: {} },
): [boolean, number, T] => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(0);
    const [data, setData] = useState<T>(initialValue);

    const method = httpMethod ? httpMethod : "get";
    useEffect(() => {
        $bearer[method]<T>(url, config)
            .then((resp) => setData(resp.data))
            .catch((err) => setError(err.response.status))
            .finally(() => setLoading(false));
    }, []);

    return [loading, error, data];
};
