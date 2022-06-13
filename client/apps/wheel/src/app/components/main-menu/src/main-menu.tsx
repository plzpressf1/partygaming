import { Link } from "react-router-dom";
import styles from "./main-menu.module.scss";

export const MainMenu = () => {
    return (
        <nav className={styles.menu}>
            <Link to="/"><i className="fa-solid fa-user"/></Link>
            <Link to="/discord"><i className="fa-brands fa-discord"/></Link>
        </nav>
    );
};
