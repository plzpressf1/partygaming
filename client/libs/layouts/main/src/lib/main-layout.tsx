import { ReactNode } from "react";
import { UserBar } from "@pg/components/user-bar";
import "./main-layout.scss";

export const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header>
                <h1>[PG] Party Gaming</h1>
                <div className="user-bar-wrapper">
                    <UserBar/>
                </div>
            </header>
            <main>{children}</main>
        </>
    );
};
