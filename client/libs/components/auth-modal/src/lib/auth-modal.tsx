import { useState } from "react";
import { observer } from "mobx-react";
import { Modal } from "@pg/components/modal";
import { UserStore } from "@pg/stores";
import styles from "./auth-modal.module.scss";

type FormType = "login" | "register";

const LoginForm = () => {
    return (
        <div className={styles.content}>
            <button className={styles.forgot}>Не помню пароль</button>
            <div className={`${styles.contentItem} ${styles.input}`}>
                <i className="fa-solid fa-user"/>
                <input
                    type="text"
                    placeholder="логин"
                    className={styles.text}
                />
            </div>
            <div className={`${styles.contentItem} ${styles.input}`}>
                <i className="fa-solid fa-lock"/>
                <input
                    type="password"
                    placeholder="пароль"
                    className={styles.text}
                />
            </div>
            <button className={`${styles.contentItem} ${styles.login}`}>Войти</button>
            <button className={`${styles.contentItem} ${styles.discord}`}>
                <i className="fa-brands fa-discord"/>
                <span>Войти через Discord</span>
            </button>
        </div>
    );
};

const RegisterForm = () => {
    return (
        <div className={styles.content}>
            <div className={`${styles.contentItem} ${styles.input}`}>
                <i className="fa-solid fa-user"/>
                <input
                    type="text"
                    placeholder="логин"
                    className={styles.text}
                />
            </div>
            <div className={`${styles.contentItem} ${styles.input}`}>
                <i className="fa-solid fa-envelope"/>
                <input
                    type="text"
                    placeholder="email"
                    className={styles.text}
                />
            </div>
            <div className={`${styles.contentItem} ${styles.input}`}>
                <i className="fa-solid fa-lock"/>
                <input
                    type="password"
                    placeholder="пароль"
                    className={styles.text}
                />
            </div>
            <button className={`${styles.contentItem} ${styles.login}`}>Зарегистрироваться</button>
        </div>
    );
};

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
                {form === "login"
                    ? <LoginForm/>
                    : <RegisterForm/>
                }
            </div>
        </Modal>
    );
};

export const AuthModal = observer(AuthModalComponent);
