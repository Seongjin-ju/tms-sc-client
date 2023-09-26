// import { AuthChecker } from "./AuthChecker";
import { worker } from "./msw/browser";
import router from "./router/Router";
import { GlobalStyle } from "./styles/global.style";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const { VITE_BUILD_MODE } = import.meta.env;

if (VITE_BUILD_MODE === "development") {
    worker.start();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RecoilRoot>
        <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            {/* <AuthChecker /> */}
            <RouterProvider router={router} />
        </QueryClientProvider>
    </RecoilRoot>,
);
