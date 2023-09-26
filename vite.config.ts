import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    /** vite.config 내에서 env 환경변수 사용을 위한 load 설정 */
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [
            react(),
            EnvironmentPlugin("all"),
            /** index.html 파일 내 env 환경변수 사용을 위한 plugin 설정 */
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        VITE_TITLE: env.VITE_TITLE,
                    },
                },
            }),
        ],
        /** base url 설정 */
        base: env.VITE_BASE_URL,
        /** vite local server 설정 */
        server: {
            open: env.VITE_BASE_URL,
            port: 3000,
            /** proxy 설정 */
            proxy: {
                "/ntms-smart-flood/api/v1": {
                    changeOrigin: true,
                    ws: true,
                    target: "http://ca-10-10-97-180.vurix.kr",
                },
                "/vurix-dms/api/": {
                    changeOrigin: true,
                    target: "http://ca-10-10-97-180.vurix.kr",
                },
                "/dms-gis/api": {
                    changeOrigin: true,
                    target: "http://ca-10-10-97-180.vurix.kr",
                },
                "/dms-gis-proxy": {
                    changeOrigin: true,
                    target: "http://ca-10-10-97-180.vurix.kr",
                },
                "/ntms-mds/api": {
                    changeOrigin: true,
                    target: "http://ca-10-10-97-180.vurix.kr",
                },
            },
        },
    };
});
