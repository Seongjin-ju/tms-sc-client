import { KakaoSDK } from "../../components/baseMap/baseMap.interface";

import { Map } from "ol";
import { atom } from "recoil";

/** @returns {Map | undefined} openLayers 로 생성된 base 지도 객체 관리용 recoil state */
export const baseMapState = atom<Map | undefined>({
    key: "baseMapState",
    default: undefined,
    dangerouslyAllowMutability: true,
});

/** @returns {string | undefined} 현재 지도에서 생성된 레이어의 아이콘 정보 recoil state */
export const baseMapLayerIconState = atom<string | undefined>({
    key: "baseMapLayerIconState",
    default: undefined,
});

/** @returns {string | KakaoSDK | undefined} 카카오 지도 road map url 정보 recoil state */
export const kakaoMapUrlConfigState = atom<string | KakaoSDK | undefined>({
    key: "kakaoMapUrlConfigState",
    default: undefined,
    dangerouslyAllowMutability: true,
});
