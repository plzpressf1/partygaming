import styles from "./form-common.module.scss";
import stylesSpecific from "./login-form.module.scss";

export const LoginForm = () => {
    return (
        <>
            <button className={stylesSpecific.forgot}>Не помню пароль</button>
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
            <button className={`${styles.contentItem} ${styles.highlighted}`}>Войти</button>
            <button className={`${styles.contentItem} ${stylesSpecific.discord}`}>
                <i className="fa-brands fa-discord"/>
                <span>Войти через Discord</span>
            </button>
        </>
    );
};
