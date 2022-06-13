import styles from "./page.module.scss";
import { Wheel } from "@wheel/components";

export const SoloPage = () => {
    return (
        <div className={styles.wrapper}>
            <Wheel/>
        </div>
    );
};
