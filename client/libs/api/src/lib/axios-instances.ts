import axios from "axios";

interface RefreshResponse {
    accessToken: string;
}

export const $axiosDefault = axios.create({
    withCredentials: true
});

export const $axiosBearer = axios.create({
    withCredentials: true
});

const LocalStorageAccessTokenKey = "pg-access-token";

$axiosBearer.interceptors.request.use((config) => {
    if (config.headers) config.headers.Authorization = `Bearer ${localStorage.getItem(LocalStorageAccessTokenKey)}`;
    return config;
});

$axiosBearer.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                localStorage.setItem(LocalStorageAccessTokenKey, "");
                const response = await axios.get<RefreshResponse>(`${process.env.NX_PG_AUTH_URL}/api/auth/refresh`, {
                    withCredentials: true
                });
                localStorage.setItem(LocalStorageAccessTokenKey, response.data.accessToken);
                return $axiosBearer.request(originalRequest);
            } catch (e) {
                console.error(e);
            }
        }
        throw error;
    }
);
