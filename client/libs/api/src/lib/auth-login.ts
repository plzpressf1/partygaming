import { Maybe } from "@pg/types";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useFetch } from "@pg/hooks/fetch";
import { apiFetchMe } from "./fetch-me";

const LocalStorageAccessTokenKey = "pg-access-token";

export interface ApiLoginDto {
    login: string;
    password: string;
}

export const apiAuthLogin = (makePayload: () => ApiLoginDto): [boolean, number, () => void] => {
    const url = `${process.env.NX_PG_USER_URL}/api/auth/login`;
    const [loading, error, resp, onDemand] = useFetch<Maybe<{ accessToken: string }>>({
        url,
        httpMethod: "post",
        initialValue: null,
        makePayload,
    });

    if (resp) {
        localStorage.setItem(LocalStorageAccessTokenKey, resp.accessToken);
        apiFetchMe();
    }

    return [loading, error, onDemand];
};
