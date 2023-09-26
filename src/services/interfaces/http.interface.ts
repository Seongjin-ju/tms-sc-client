/** http 응답 interface */
export interface HttpResponse {
    /** 응답 코드(200: 성공) */
    code: number;
    /** 응답 메시지 */
    message: string;
    /** 응답 완료 시간 */
    responseTime: string;
}

/** http 에러 응답 interface */
export interface ErrorResponse {
    /** 응답 에러 코드 */
    code: number;
    /** 응답 에러 메시지 */
    message: string;
    /** 응답 에러 완료 메시지 */
    responseTime: string;
}
