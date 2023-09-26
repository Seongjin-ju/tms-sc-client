import { GetKakaoMapResponse } from "../../components/baseMap/baseMap.interface";
import { GetGlobalPropInfoResponse } from "../interfaces/init.api.interface";

import { HTTP_REQUEST_TIMEOUT } from "./common";

import axios, { AxiosResponse, AxiosError } from "axios";

const FETCH_API_URLS = {
    /** 통합플랫폼의 시스템 설정 정보 호출 api url, getGlobalPropInfo2 는 경량 버전 */
    getGlobalProps: "/vurix-dms/api/v1/globalProp/getGlobalPropInfo2",
    /** 시스템설정 내 카카오 클라우드 버전의 지도 사용 시, 카카오 맵 url 및 지도 버전 조회 api url */
    getKakaoMapUrl: "/dms-gis-proxy/api/v1/kakaomap",
};

/**
 * 모니터링 시스템 설정 조회 api fetch
 * @async
 * @function fetchGlobalMonitoringProps
 */
export const fetchGlobalMonitoringProps = async (
    keyCloakToken: string,
): Promise<GetGlobalPropInfoResponse | undefined> => {
    return axios(`${FETCH_API_URLS.getGlobalProps}?prop_group=MONITORING`, {
        method: "GET",
        timeout: HTTP_REQUEST_TIMEOUT,
        headers: {
            Authorization: `Bearer ${keyCloakToken}`,
        },
    })
        .then((response: AxiosResponse<GetGlobalPropInfoResponse | undefined>) => {
            if (response && response.status === 200) {
                return response.data;
            }
            return undefined;
        })
        .catch((error: AxiosError) => {
            console.log("fetchGlobalMonitoringProps", error);
            return undefined;
        });
};

/**
 * 카카오맵 url 및 지도 버전 조회 api fetch
 * @async
 * @function fetchKakaoMapUrl
 */
export const fetchKakaoMapUrl = async (keyCloakToken: string): Promise<GetKakaoMapResponse | undefined> => {
    return axios(`${FETCH_API_URLS.getKakaoMapUrl}?type=URL`, {
        method: "GET",
        timeout: HTTP_REQUEST_TIMEOUT,
        headers: {
            Authorization: `Bearer ${keyCloakToken}`,
        },
    })
        .then((response: AxiosResponse<GetKakaoMapResponse | undefined>) => {
            if (response && response.status === 200) {
                return response.data;
            }
            return undefined;
        })
        .catch((error: AxiosError) => {
            console.log("fetchKakaoMapUrl", error);
            return undefined;
        });
};
