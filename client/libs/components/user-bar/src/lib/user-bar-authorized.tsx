import { TokenizedUser } from "@pg/interfaces";
import styles from "./user-bar-authorized.module.scss";

export const UserBarAuthorized = ({ user }: { user: TokenizedUser }) => {
    return (
        <div className={styles.bar}>
            {user.name}
        </div>
    );
};
