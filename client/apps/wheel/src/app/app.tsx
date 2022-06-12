import { Route, Routes } from "react-router-dom";
import { MainPage, DiscordMainPage } from "./pages";
import { MainMenu } from "./components/main-menu";
import styles from "./app.module.scss";

export function App() {
    return (
        <div className={styles.wrapper}>
            <aside>
                <MainMenu/>
            </aside>
            <section>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/discord" element={<DiscordMainPage/>}/>
                </Routes>
            </section>
        </div>
    );
}

export default App;
