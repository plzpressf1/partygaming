import { fetchUser } from "@pg/api";
import styles from "./user-bar.module.scss";

export const UserBar = () => {
    const [loading, error, user] = fetchUser();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Unauthorized</div>;
    if (!user) return null;
    return (
        <div className={styles.bar}>
            {user.name}
        </div>
    );
};
