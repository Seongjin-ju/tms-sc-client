import {
    GetKakaoMapParams,
    GetKakaoMapResponse,
    LayerCreationConfig,
    MapCreationConfig,
    PostFeatureDetailResponse,
} from "./baseMap.interface";

import axios, { AxiosError, AxiosResponse } from "axios";

/** 지도 내 자산 호출을 위한 지역 코드 */
const AREA_CODE = 48730;

/** 지도 자산 레이어 생성을 위한 api 호출 url */
const FETCH_API_URLS = {
    /** gis 서비스에 등록된 레이어 feature 조회 api url, 지도 위 자산 생성 */
    postFeatureUrl: "/dms-gis/api/geo/giswfs/postFeature",
    /** gis 레이어 스타일 반환, icon 정보 및 style 정보 조회 api url */
    postLayerStyleUrl: "/dms-gis/api/v1/layer/postLayerStyle",
    /** gis 서비스에 등록된 레이어 feature의 상세조회 api url, 자산 선택 기능 처리시 사용 */
    postFeatureDetail: "/dms-gis/api/geo/giswfs/postFeatureDetail",
    /** 카카오맵 url 및 지도버전 조회 api url */
    getKakaoMap: "/ntms-mds/api/v1/kakaomap",
};

/** HTTP 요청 타임 아웃, 1.5초 */
const HTTP_REQUEST_TIMEOUT = 15000;

/** HTTP 요청 기본 옵션(POST) */
const REQUEST_OPTIONS = {
    method: "POST",
    data: undefined,
    timeout: HTTP_REQUEST_TIMEOUT,
    headers: {},
};

/**
 * gis 서비스에 등록된 레이어의 feature 및 스타일 조회 api fetch
 * @async
 * @function fetchFeatureAndStyleData
 * @param {MapCreationInfo} mapCreationConfig 지도 생성을 위한 생성 정보
 * @param {string} keyCloakToken gis service 호출을 위한 키클록 토큰 정보
 * @returns {Promise<LayerCreationConfig | undefined>}
 */
export const fetchFeatureAndStyleData = async (
    mapCreationConfig: MapCreationConfig,
    keyCloakToken: string,
): Promise<LayerCreationConfig | undefined> => {
    const fetchPostFeature = axios(FETCH_API_URLS.postFeatureUrl, {
        ...REQUEST_OPTIONS,
        data: {
            typenames: [mapCreationConfig.layerId],
            area: AREA_CODE,
            properties_all: true,
        },
        headers: {
            Authorization: `Bearer ${keyCloakToken}`,
        },
    });

    const fetchPostLayerStyle = axios(FETCH_API_URLS.postLayerStyleUrl, {
        ...REQUEST_OPTIONS,
        data: { layer_id: [mapCreationConfig.layerId] },
        headers: {
            Authorization: `Bearer ${keyCloakToken}`,
        },
    });
    return axios
        .all([fetchPostFeature, fetchPostLayerStyle])
        .then(
            axios.spread((...responses: AxiosResponse[]) => {
                const postFeatureResponse = responses[0];
                const postLayerStyleResponse = responses[1];
                if (
                    postFeatureResponse &&
                    postFeatureResponse.status === 200 &&
                    postLayerStyleResponse &&
                    postLayerStyleResponse.status === 200
                ) {
                    return {
                        postFeatures: postFeatureResponse.data[0],
                        postLayerStyles: postLayerStyleResponse.data.response.results,
                    };
                }
                return undefined;
            }),
        )
        .catch((error: AxiosError) => {
            console.log("fetchFeatureAndStyleData", error);
            return undefined;
        });
};

/**
 * gis 서비스에 등록된 레이어의 feature 상세 조회 api fetch
 * @async
 * @function fetchPostFeatureDetail
 * @param {MapCreationInfo} mapConfig 지도 생성을 위한 생성 정보
 * @param {string} keyCloakToken gis service 호출을 위한 키클록 토큰 정보
 * @returns {Promise<PostFeatureDetailResponse | undefined>}
 */
export const fetchPostFeatureDetail = async (
    params: unknown,
    keyCloakToken: string,
): Promise<PostFeatureDetailResponse | undefined> => {
    return axios(FETCH_API_URLS.postFeatureDetail, {
        ...REQUEST_OPTIONS,
        data: params,
        headers: {
            Authorization: `Bearer ${keyCloakToken}`,
        },
    })
        .then((response: AxiosResponse<PostFeatureDetailResponse>) => {
            if (response && response.status === 200) {
                return response.data;
            }
            return undefined;
        })
        .catch((error: AxiosError) => {
            console.log("fetchFeatureAndStyleData", error);
            return undefined;
        });
};

/**
 * 카카오맵 url 및 지도 버전 조회 api fetch
 * @async
 * @function fetchKakaoMap
 * @param {GetKakaoMapParams} params 지도 생성을 위한 생성 정보
 * @param {string} params.type 조회 타입
 * @param {string} params.code 지도 코드
 * @param {string} keyCloakToken gis service 호출을 위한 키클록 토큰 정보
 * @returns {Promise<GetKakaoMapResponse | undefined>}
 */
export const fetchKakaoMap = async (
    params: GetKakaoMapParams,
    keyCloakToken: string,
): Promise<GetKakaoMapResponse | undefined> => {
    return axios(FETCH_API_URLS.postFeatureDetail, {
        ...REQUEST_OPTIONS,
        data: params,
        headers: {
            Authorization: `Bearer ${keyCloakToken}`,
        },
    })
        .then((response: AxiosResponse<GetKakaoMapResponse>) => {
            if (response && response.status === 200) {
                return response.data;
            }
            return undefined;
        })
        .catch((error: AxiosError) => {
            console.log("fetchFeatureAndStyleData", error);
            return undefined;
        });
};
