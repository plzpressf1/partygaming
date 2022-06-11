import { TokenizedUser } from "@pg/interfaces";
import { apiAuthLogout } from "@pg/api";
import styles from "./user-bar-authorized.module.scss";

export const UserBarAuthorized = ({ user }: { user: TokenizedUser }) => {
    return (
        <div className={styles.bar}>
            <div className={styles.avatar}>V</div>
            <div className={styles.name}>{user.name}</div>
            <div
                className={styles.logout}
                onClick={apiAuthLogout}
            >
                <i className="fa-solid fa-arrow-right-from-bracket"/>
            </div>
        </div>
    );
};
