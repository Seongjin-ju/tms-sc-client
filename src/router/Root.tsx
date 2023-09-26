import { useEffect, useState } from "react";

import {
    KAKAO_ROADMAP_HD_TYPE,
    BACKGROUND_MAP,
    KAKAO_CLOUD_BG,
    KAKAO_ROADVIEW_KEY,
} from "../components/baseMap/baseMap.constant";
import { GetKakaoMapResult, KakaoSDK } from "../components/baseMap/baseMap.interface";
import { fetchGlobalMonitoringProps, fetchKakaoMapUrl } from "../services/api/init.api";
import { GetGlobalPropInfoResult } from "../services/interfaces/init.api.interface";
import { kakaoMapUrlConfigState } from "../services/state/baseMap.state";
import { keycloakTokenState } from "../services/state/keycloak.state";

import TempMenus from "./TempMenus";

import { Outlet } from "react-router-dom";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

/**
 * Root 컴포넌트
 * @returns {JSX.Element}
 */
const Root = (): JSX.Element => {
    /** outlet 렌더링 여부 */
    const [isOutletRender, setIsOutletRender] = useState<boolean>(false);

    /** 인증 처리용 키클록 토큰 정보 */
    const [keyCloakToken]: [string | undefined, SetterOrUpdater<string | undefined>] =
        useRecoilState(keycloakTokenState);

    /** 카카오 지도 url recoil state 저장 */
    const setKakaoMapUrlConfigState = useSetRecoilState<string | KakaoSDK | undefined>(kakaoMapUrlConfigState);

    /** 카카오 sdk 로드 */
    const loadKakaoSdk = (roadViewKey: string): void => {
        if (!document.getElementById("kakao-sdk")) {
            const script = document.createElement("script") as HTMLScriptElement;
            script.id = "kakao-sdk";
            script.type = "text/javascript";
            script.src = `/dms-gis-proxy/http/dapi.kakao.com/v2/maps/sdk.js?appkey=${roadViewKey}&autoload=false`;
            script.async = true;
            script.onload = () => {
                setKakaoMapUrlConfigState(kakao);
                setIsOutletRender(true);
            };
            script.onerror = () => {
                setKakaoMapUrlConfigState(undefined);
                setIsOutletRender(true);
            };
            document.getElementsByTagName("head")[0].appendChild(script);
        } else {
            // TODO:
        }
    };

    /** useEffect hook, 통합플랫폼 시스템 설정에서 배경지도 관련 설정 처리 (카카오 cloud url 관련) */
    useEffect(() => {
        /**
         * @name getKakaoMapUrlAndVersion
         * @async
         * @function
         * @description 카카오 지도 클라우드 버전 api 호출(지도 url 데이터)
         * 클라우드 환경의 접속이 어려운 경우 직접 sdk를 호출 또는 고정된 카카오 지도 url을 사용한다.
         * @return {Promise<void>}
         */
        const getKakaoMapUrlAndVersion = async (): Promise<void> => {
            if (keyCloakToken) {
                const fetchKakaoMapResponse = await fetchKakaoMapUrl(keyCloakToken);
                if (fetchKakaoMapResponse) {
                    const results = fetchKakaoMapResponse.response.results;
                    const kakaoRoadMapHdUrl = results.find((value: GetKakaoMapResult) => {
                        return value.code === KAKAO_ROADMAP_HD_TYPE;
                    })?.data;
                    if (kakaoRoadMapHdUrl) {
                        setKakaoMapUrlConfigState(kakaoRoadMapHdUrl);
                        setIsOutletRender(true);
                    }
                }
            }
        };

        /**
         * @name getKakaoMapUrlAndVersion
         * @async
         * @function
         * @description 통합플랫폼 시스템 설정에 등록된 배경 지도 설정을 가져온다.
         * 카카오 클라우드 버전 타입 사용 시, 카카오 url을 가지고 있는 클라우드 api를 호출한다.
         * @return {Promise<void>}
         */
        const getInitGlobalProps = async (): Promise<void> => {
            if (keyCloakToken) {
                const fetchGetGlobalMonitoringPropsResponse = await fetchGlobalMonitoringProps(keyCloakToken);
                if (fetchGetGlobalMonitoringPropsResponse) {
                    const results = fetchGetGlobalMonitoringPropsResponse.response.results;
                    /** kakao cloud 지도 타입 사용 여부 */
                    const backgroundMapPropValue = results.find((prop: GetGlobalPropInfoResult) => {
                        return prop.prop_key === BACKGROUND_MAP;
                    })?.prop_value;

                    /** kakao cloud 지도 타입을 사용 하는 경우 */
                    if (backgroundMapPropValue && backgroundMapPropValue === KAKAO_CLOUD_BG) {
                        getKakaoMapUrlAndVersion();
                    } else {
                        /** kakao cloud 지도 타입이 아닌 경우 */
                        const kakaoRoadViewKeyPropValue = results.find((prop: GetGlobalPropInfoResult) => {
                            return prop.prop_key === KAKAO_ROADVIEW_KEY;
                        })?.prop_value;

                        if (kakaoRoadViewKeyPropValue) {
                            loadKakaoSdk(kakaoRoadViewKeyPropValue);
                        }
                    }
                }
            }
        };
        getInitGlobalProps();
    });

    return (
        <RootContainer>
            {/** 개발, 메뉴 이동 처리용 메뉴 버튼 그룹 */}
            {import.meta.env.MODE === "development" && <TempMenus />}
            {isOutletRender && <Outlet />}
        </RootContainer>
    );
};

const RootContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #3c4148;
    overflow: hidden;
`;

export default Root;
