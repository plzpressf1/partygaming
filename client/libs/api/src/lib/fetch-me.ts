import { TokenizedUser } from "@pg/interfaces";
import { UserStore } from "@pg/stores";
import { $axiosBearer } from "./axios-instances";

interface ApiFetchMeParams {
    onError?: (err: number) => void;
    onEnd?: () => void;
}

export const apiFetchMe = (params: ApiFetchMeParams = {}) => {
    const { onError, onEnd } = params;
    const url = `${process.env.NX_PG_USER_URL}/api/user/me`;
    $axiosBearer.get<TokenizedUser>(url)
        .then((resp) => {
            UserStore.setUser(resp.data);
        })
        .catch((err) => {
            if (onError) onError(err.response.status);
        })
        .finally(() => {
            if (onEnd) onEnd();
        });
};
