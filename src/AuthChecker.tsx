import { useState } from "react";

import Loading from "./components/Loading";
import router from "./router/Router";
import { keycloakTokenState } from "./services/state/keycloak.state";

import { AuthClientEvent, AuthClientError } from "@react-keycloak/core";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import { RouterProvider } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const { VITE_KEYCLOAK_URL, VITE_KEYCLOAK_REALM, VITE_KEYCLOAK_CLIENT_ID } = import.meta.env;

/** 인증 처리를 위한 키클록 객체 및 인증 결과 처리용 state */
interface AuthCheckerState {
    /** 키클록 객체 */
    keycloak?: Keycloak.KeycloakInstance;
    /** 키클록의 onReady 이벤트 발생 여부 */
    ready: boolean;
    /** 키클록 인증이 onAuthSuccess 성공 하였는지에 대한 여부
     *  ready 와 authorized 정보를 통해 인증성공에 따른 초기 렌더링을 처리 한다.
     */
    authorized: boolean;
}

/**
 * 키클록 인증 처리를 위한 checker 컴포넌트
 * @returns {JSX.Element}
 */
export const AuthChecker = (): JSX.Element => {
    /** 키클록 인증 성공 시 키클록의 token 정보를 담을 recoil state 객체  */
    const setKeyCloakTokenState = useSetRecoilState<string | undefined>(keycloakTokenState);

    /** 키클록 인증 정보를 담고 있는 component state */
    const [authState, setAuthState] = useState<AuthCheckerState>({
        keycloak: Keycloak({
            url: VITE_KEYCLOAK_URL,
            realm: VITE_KEYCLOAK_REALM,
            clientId: VITE_KEYCLOAK_CLIENT_ID,
        }),
        ready: false,
        authorized: false,
    });

    /**
     * @name onKeycloakEvent
     * @description 키클록의 AuthEvent가 발생할 때 이를 수신 하는 함수,
     * AuthEvent의 이벤트 객체 정보에 따라 키클록의 인증 성공 여부를 판단 한다.
     * @param {AuthClientEvent} event react auth client의 이벤트 타입
     * @param {AuthClientError} error react auth client의 에러 정보
     * @return {void}
     */
    const onKeycloakEvent = (event: AuthClientEvent, error?: AuthClientError): void => {
        console.log("onKeycloakEvent", event, error);
        if (event === "onTokenExpired") {
            authState?.keycloak?.updateToken(30);
        } else if (event === "onAuthSuccess" || event === "onAuthRefreshSuccess") {
            setAuthState(prevAuthState => {
                return {
                    ...prevAuthState,
                    authorized: true,
                };
            });
            setKeyCloakTokenState(authState.keycloak?.token);
        } else if (event === "onReady") {
            setAuthState(prevAuthState => {
                return {
                    ...prevAuthState,
                    ready: true,
                };
            });
        } else if (
            event === "onAuthError" ||
            event === "onAuthLogout" ||
            event === "onAuthRefreshError" ||
            event === "onInitError"
        ) {
            setAuthState(prevAuthState => {
                return {
                    ...prevAuthState,
                    authorized: false,
                    ready: false,
                };
            });
        }
        console.log("Keycloak result:", "authorized", authState.authorized, "ready", authState.ready);
    };

    return (
        <>
            {authState.keycloak ? (
                <ReactKeycloakProvider
                    authClient={authState.keycloak}
                    initOptions={{
                        onLoad: "login-required",
                    }}
                    onEvent={onKeycloakEvent}
                >
                    {authState.ready ? (
                        authState.authorized ? (
                            <RouterProvider router={router} />
                        ) : (
                            <div>authorized failed!</div>
                        )
                    ) : (
                        <Loading size="lg" />
                    )}
                </ReactKeycloakProvider>
            ) : (
                <Loading size="lg" />
            )}
        </>
    );
};
