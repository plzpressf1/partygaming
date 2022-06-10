import { useState } from "react";
import { observer } from "mobx-react";
import { Modal } from "@pg/components/modal";
import { UserStore } from "@pg/stores";
import { RegisterForm } from "./register-form";
import { LoginForm } from "./login-form";
import styles from "./auth-modal.module.scss";

type FormType = "login" | "register";

export const AuthModalComponent = () => {
    const [form, setForm] = useState<FormType>("login");

    const changeForm = () => {
        if (form === "login") setForm("register");
        else setForm("login");
    };

    if (!UserStore.authModalActive) return null;
    return (
        <Modal
            centered={true}
            onClose={() => UserStore.setAuthModalActive(false)}
        >
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div
                        className={form === "login" ? styles.active : ""}
                        onClick={changeForm}
                    >
                        Войти
                    </div>
                    <div
                        className={form === "register" ? styles.active : ""}
                        onClick={changeForm}
                    >
                        Регистрация
                    </div>
                </div>
                <div className={styles.content}>
                    {form === "login"
                        ? <LoginForm/>
                        : <RegisterForm/>
                    }
                </div>
            </div>
        </Modal>
    );
};

export const AuthModal = observer(AuthModalComponent);
