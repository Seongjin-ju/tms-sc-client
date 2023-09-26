import { HttpResponse } from "./http.interface";

/** getGlobalPropInfo 시스템 설정 정보 조회 응답 결과값의 배열 데이터 interface  */
export interface GetGlobalPropInfoResult {
    /** 시스템 설정 그룹 */
    prop_group: string;
    /** 시스템 설정 키 */
    prop_key: string;
    /** 시스템 설정 값 */
    prop_value: string;
    /** 시스템 설정 이름 */
    prop_name: string;
    /** 시스템 설정 etc */
    etc: string;
    /** 수정 시간 */
    upd_date: string;
}

/** getGlobalPropInfo 시스템 설정 정보 조회 응답 데이터 interface  */
export interface GetGlobalPropInfoResponse extends HttpResponse {
    /** 응답 값 */
    response: {
        /** 데이터 건수 */
        count: number;
        /** 응답 결과 값의 배열 */
        results: GetGlobalPropInfoResult[];
    };
}
