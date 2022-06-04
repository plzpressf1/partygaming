import { fetchUser } from "@pg/api";
import styles from "./styles.module.css";

export const UserBar = () => {
    const [loading, user] = fetchUser();

    if (loading) return <div>Loading...</div>;
    if (!user) return null;
    return (
        <div className={styles.bar}>
            {user.name}
        </div>
    );
};
