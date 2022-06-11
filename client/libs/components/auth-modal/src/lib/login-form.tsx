import { useRef } from "react";
import { apiAuthLogin, ApiLoginDto } from "@pg/api";
import styles from "./form-common.module.scss";
import stylesSpecific from "./login-form.module.scss";

export const LoginForm = () => {
    const [loading, error, executeRequest] = apiAuthLogin(() => getCredentials());
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const getCredentials = () => {
        let credentials: ApiLoginDto = {
            login: "",
            password: "",
        }
        if (loginRef.current && passwordRef.current) {
            credentials = { login: loginRef.current.value, password: passwordRef.current.value };
        }
        return credentials;
    };

    const auth = () => {
        const { login, password } = getCredentials();
        if (login && password) {
            executeRequest();
        }
    };

    let errorText = "";
    if (error >= 400) {
        if (error === 401) errorText = "Неверный логин/пароль";
        else errorText = "Ошибка сервера";
    }
    return (
        <>
            <div className={stylesSpecific.upper}>
                {errorText && !loading && <span className={stylesSpecific.error}>{errorText}</span>}
                <button className={stylesSpecific.forgot}>Не помню пароль</button>
            </div>
            <div
                className={`${styles.contentItem} ${styles.input}`}
                onClick={() => loginRef.current?.focus()}
            >
                <i className="fa-solid fa-user"/>
                <input
                    type="text"
                    placeholder="логин"
                    className={styles.text}
                    ref={loginRef}
                />
            </div>
            <div
                className={`${styles.contentItem} ${styles.input}`}
                onClick={() => passwordRef.current?.focus()}
            >
                <i className="fa-solid fa-lock"/>
                <input
                    type="password"
                    placeholder="пароль"
                    className={styles.text}
                    ref={passwordRef}
                />
            </div>
            <button
                className={`${styles.contentItem} ${styles.highlighted}`}
                onClick={auth}
            >
                {loading ? "..." : "Войти"}
            </button>
            <button className={`${styles.contentItem} ${stylesSpecific.discord}`}>
                <i className="fa-brands fa-discord"/>
                <span>Войти через Discord</span>
            </button>
        </>
    );
};
