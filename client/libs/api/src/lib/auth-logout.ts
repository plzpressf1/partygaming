import { $axiosBearer } from "./axios-instances";
import { UserStore } from "@pg/stores";

const LocalStorageAccessTokenKey = "pg-access-token";

export const apiAuthLogout = () => {
    const url = `${process.env.NX_PG_USER_URL}/api/auth/logout`;
    $axiosBearer.delete(url)
        .then(() => {
            localStorage.setItem(LocalStorageAccessTokenKey, "");
            UserStore.setUser(null);
        });
};
