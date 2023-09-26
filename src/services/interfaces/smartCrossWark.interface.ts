import { HttpResponse } from "./http.interface";

/** 스마트 횡단 보도 이벤트 목록 조회 params */
export interface GetSmartCrossWarkEventParams {
    /** place ID */
    place_id?: string;
    /** 조회 시작일자 */
    start_date: string;
    /** 조회 종료일자 */
    end_date: string;
    /** 페이지 건수 */
    page_cnt?: number;
    /** 페이지 넘버 */
    page_num?: number;
}

/** 스마트 횡단 보도 이벤트 목록 조회 results */
export interface GetSmartCrossWarkEventResults {
    uid: string;
    reg_date: string;
    reg_time: string;
    event_name: string;
    place_name: string;
    camera_name: string;
}

/** 스마트 횡단 보도 이벤트 목록 조회 response */
export interface GetSmartCrossWarkEventResponse extends HttpResponse {
    /** 응답 값 */
    response: {
        /** 응답 결과 값의 배열 */
        results: GetSmartCrossWarkEventResults[];
        /** 응답 row 갯수 */
        count: number;
        /** 전체 row 갯수 */
        totalCount: number;
    };
}

/** 스마트 횡단 보도 개소 조회 results */
export interface GetSmartCrossWarkPlaceResults {
    place_id: string;
    place_name: string;
}

/** 스마트 횡단 보도 개소 조회 response */
export interface GetSmartCrossWarkPlaceResponse extends HttpResponse {
    /** 응답 값 */
    response: {
        /** 응답 결과 값의 배열 */
        results: GetSmartCrossWarkPlaceResults[];
        /** 응답 row 갯수 */
        count: number;
        /** 전체 row 갯수 */
        totalCount: number;
    };
}

/** 스마트 횡단 보도 일별 이벤트 조회 params */
export interface GetSmartCrossWarkDailyEventParams {
    [key: string]: string | number | undefined;
    /** place ID */
    place_id?: string;
}

/** 스마트 횡단 보도 일별 이벤트 조회 results */
export interface GetSmartCrossWarkDailyEventResults {
    uid: string;
    reg_date: string;
    reg_time: string;
    event_name: string;
    place_name: string;
    camera_name: string;
}

/** 스마트 횡단 보도 일별 이벤트 조회 response */
export interface GetSmartCrossWarkDailyEventResponse extends HttpResponse {
    /** 응답 값 */
    response: {
        /** 응답 결과 값의 배열 */
        results: GetSmartCrossWarkDailyEventResults[];
        /** 전체 row 갯수 */
        totalCount: number;
    };
}
