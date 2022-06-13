import { observer } from "mobx-react";
import { UserStore } from "@pg/stores";
import { DiscordMain } from "./discord-main";
import { DiscordUnauthorized } from "./discord-unauthorized";
import styles from "./page.module.scss";

const DiscordPageComponent = () => {
    return (
        <div className={styles.wrapper}>
            {UserStore.user ? <DiscordMain/> : <DiscordUnauthorized/>}
        </div>
    );
};

export const DiscordPage = observer(DiscordPageComponent);
