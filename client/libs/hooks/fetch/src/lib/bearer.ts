import axios from "axios";
import { useEffect, useState } from "react";

interface RefreshResponse {
    accessToken: string;
}

const $bearer = axios.create({
    withCredentials: true
});

const LocalStorageAccessTokenKey = "pg-access-token";

$bearer.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(LocalStorageAccessTokenKey)}`;
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

export type AxiosHttpMethod = "get" | "post" | "put" | "patch" | "delete";

export const useBearerFetch = <T>(
    url: string,
    initialValue: T,
    httpMethod: AxiosHttpMethod = "get",
): [boolean, T] => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T>(initialValue);

    useEffect(() => {
        $bearer[httpMethod]<T>(url).then((resp) => {
            setData(resp.data);
            setLoading(false);
        });
    }, []);

    return [loading, data];
};
