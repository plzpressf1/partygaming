import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { UserStore } from "@pg/stores";
import { apiFetchMe } from "@pg/api";
import { UserBarUnauthorized } from "./uer-bar-unauthorized";
import { UserBarAuthorized } from "./user-bar-authorized";

const UserBarComponent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(0);

    useEffect(() => {
        if (!UserStore.user) {
            setLoading(true);
            apiFetchMe({
                onError: (err) => setError(err),
                onEnd: () => setLoading(false),
            });
        }
    }, []);

    if (UserStore.user) return <UserBarAuthorized user={UserStore.user}/>;
    if (loading) return <div>Loading...</div>;
    if (error) return <UserBarUnauthorized/>;
    return null;
};

export const UserBar = observer(UserBarComponent);
