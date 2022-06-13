import { Route, Routes } from "react-router-dom";
import { MainMenu } from "@wheel/components";
import { SoloPage, DiscordPage } from "./pages";
import styles from "./app.module.scss";

export function App() {
    return (
        <div className={styles.wrapper}>
            <aside>
                <MainMenu/>
            </aside>
            <section>
                <Routes>
                    <Route path="/" element={<SoloPage/>}/>
                    <Route path="/discord" element={<DiscordPage/>}/>
                </Routes>
            </section>
        </div>
    );
}

export default App;
