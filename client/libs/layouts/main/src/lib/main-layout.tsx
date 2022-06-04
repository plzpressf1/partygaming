import { ReactNode } from "react";
import "./main-layout.css";

export const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header>
                <h1>Logo Here</h1>
            </header>
            <main>{children}</main>
        </>
    );
};
