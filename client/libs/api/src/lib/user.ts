import { Maybe } from "@pg/types";
import { TokenizedUser } from "@pg/interfaces";
import { useBearerFetch } from "@pg/hooks/fetch";

export const fetchUser = () => {
    const url = `${process.env.NX_PG_USER_URL}/api/user/me`;
    return useBearerFetch<Maybe<TokenizedUser>>(url, null);
};
