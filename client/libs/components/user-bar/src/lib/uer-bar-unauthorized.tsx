import { UserStore } from "@pg/stores";
import { AuthModal } from "@pg/components/auth-modal";
import styles from "./user-bar-unauthorized.module.scss";

export const UserBarUnauthorized = () => {
    return (
        <>
            <AuthModal/>
            <button
                className={`${styles.button} highlighted`}
                onClick={() => UserStore.setAuthModalActive(true)}
            >
                Войти
            </button>
        </>
    );
};
