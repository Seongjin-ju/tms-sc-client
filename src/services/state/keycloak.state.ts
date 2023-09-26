import { atom } from "recoil";

/** @returns {string | undefined} 키클록 토큰 저장 관리용 recoil state */
export const keycloakTokenState = atom<string | undefined>({
    key: "keycloakTokenState",
    default: undefined,
});
