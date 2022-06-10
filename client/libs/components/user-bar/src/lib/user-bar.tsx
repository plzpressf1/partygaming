import { fetchUser } from "@pg/api";
import { UserBarUnauthorized } from "./uer-bar-unauthorized";
import { UserBarAuthorized } from "./user-bar-authorized";

export const UserBar = () => {
    const [loading, error, user] = fetchUser();

    if (loading) return <div>Loading...</div>;
    if (error || !user) return <UserBarUnauthorized/>;
    return <UserBarAuthorized user={user}/>;
};
