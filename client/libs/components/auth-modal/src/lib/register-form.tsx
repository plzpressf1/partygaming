import styles from "./form-common.module.scss";

export const RegisterForm = () => {
    return (
        <>
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
            <button className={`${styles.contentItem} ${styles.highlighted}`}>Зарегистрироваться</button>
        </>
    );
};
