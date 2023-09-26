import {
    GetSmartCrossWarkDailyEventParams,
    GetSmartCrossWarkDailyEventResponse,
    GetSmartCrossWarkEventParams,
    GetSmartCrossWarkEventResponse,
    GetSmartCrossWarkPlaceResponse,
} from "../interfaces/smartCrossWark.interface";

import { executeRequest, HTTP_REQUEST_TIMEOUT } from "./common";

import { ErrorResponse } from "react-router-dom";

/**
 * 스마트 횡단 보도 이벤트 목록 조회
 * @async
 * @function getSmartCrossWarkEvent
 * @param {GetSmartCrossWarkEventParams} params 스마트 횡단 보도 이벤트 목록 조회를 위한 parameter 정보
 * @returns {Promise<GetSmartCrossWarkEventResponse | ErrorResponse | undefined>}
 */
export const getSmartCrossWarkEvent = async (
    params: GetSmartCrossWarkEventParams,
): Promise<GetSmartCrossWarkEventResponse | ErrorResponse | undefined> => {
    const response = await executeRequest(`/ntms-smart-cross-wark/api/v1/gyeryong/get/event`, {
        method: "POST",
        data: params,
        timeout: HTTP_REQUEST_TIMEOUT,
    });
    if (response && response.status === 200) {
        return response.data as GetSmartCrossWarkEventResponse;
    }
    if (response && response.status === 401) {
        window.location.reload();
    }
    if (response && response.data === "object") {
        return response.data as ErrorResponse;
    }
    return undefined;
};

/**
 * 스마트 횡단 보도 개소 조회
 * @async
 * @function getSmartCrossWarkPlace
 * @returns {Promise<GetSmartCrossWarkPlaceResponse | ErrorResponse | undefined>}
 */
export const getSmartCrossWarkPlace = async (): Promise<GetSmartCrossWarkPlaceResponse | ErrorResponse | undefined> => {
    const response = await executeRequest(`/ntms-smart-cross-wark/api/v1/gyeryong/get/place`, {
        method: "POST",
        timeout: HTTP_REQUEST_TIMEOUT,
    });
    if (response && response.status === 200) {
        return response.data as GetSmartCrossWarkPlaceResponse;
    }
    if (response && response.status === 401) {
        window.location.reload();
    }
    if (response && response.data === "object") {
        return response.data as ErrorResponse;
    }
    return undefined;
};

/**
 * 스마트 횡단 보도 일별 이벤트 조회
 * @async
 * @function getSmartCrossWarkDailyEvent
 * @param {GetSmartCrossWarkDailyEventParams} params 스마트 횡단 보도 일별 이벤트 조회를 위한 parameter 정보
 * @returns {Promise<GetSmartCrossWarkDailyEventResponse | ErrorResponse | undefined>}
 */
export const getSmartCrossWarkDailyEvent = async (
    params: GetSmartCrossWarkDailyEventParams,
): Promise<GetSmartCrossWarkDailyEventResponse | ErrorResponse | undefined> => {
    const response = await executeRequest(`/ntms-smart-cross-wark/api/v1/gyeryong/get/daily-event`, {
        method: "POST",
        data: params,
        timeout: HTTP_REQUEST_TIMEOUT,
    });
    if (response && response.status === 200) {
        return response.data as GetSmartCrossWarkDailyEventResponse;
    }
    if (response && response.status === 401) {
        window.location.reload();
    }
    if (response && response.data === "object") {
        return response.data as ErrorResponse;
    }
    return undefined;
};
