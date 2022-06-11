import { useState } from "react";
import { AuthModal } from "@pg/components/auth-modal";
import styles from "./user-bar-unauthorized.module.scss";

export const UserBarUnauthorized = () => {
    const [modal, setModal] = useState(false);

    return (
        <>
            {modal && <AuthModal onClose={() => setModal(false)}/>}
            <button
                className={`${styles.button} highlighted`}
                onClick={() => setModal(true)}
            >
                Войти
            </button>
        </>
    );
};
