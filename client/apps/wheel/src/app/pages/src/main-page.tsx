import { Wheel } from "../../components/wheel";
import styles from "./page.module.scss";

export const MainPage = () => {
    return (
        <div className={styles.wrapper}>
            <Wheel/>
        </div>
    );
};
