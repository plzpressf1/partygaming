import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { MainLayout } from "@pg/layouts/main";
import App from "./app/app";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import "libs/styles/common.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <StrictMode>
        <BrowserRouter>
            <MainLayout>
                <App />
            </MainLayout>
        </BrowserRouter>
    </StrictMode>,
);
