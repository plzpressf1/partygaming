import { useState } from "react";
import { Modal } from "@pg/components/modal";
import { RegisterForm } from "./register-form";
import { LoginForm } from "./login-form";
import styles from "./auth-modal.module.scss";

type FormType = "login" | "register";

export const AuthModal = ({ onClose }: { onClose: () => void }) => {
    const [form, setForm] = useState<FormType>("login");

    const changeForm = () => {
        if (form === "login") setForm("register");
        else setForm("login");
    };

    return (
        <Modal
            centered={true}
            onClose={onClose}
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
