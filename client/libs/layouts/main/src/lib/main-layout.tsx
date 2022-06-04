import { ReactNode } from "react";
import { UserBar } from "@pg/components/user-bar";
import "./main-layout.css";

export const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header>
                <h1>
                    <span>Logo Here</span>
                </h1>
                <UserBar />
            </header>
            <main>{children}</main>
        </>
    );
};
