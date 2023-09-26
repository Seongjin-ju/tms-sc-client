import {
    GetSmartCrossWarkDailyEventParams,
    GetSmartCrossWarkEventParams,
} from "../services/interfaces/smartCrossWark.interface";

import {
    smartCrossWarkDailyEventsData,
    smartCrossWarkEventsData,
    smartCrossWarkPlaceData,
} from "./smartCrossWark/smartCrossWark.data";

import { rest } from "msw";
export const handlers = [
    /** 스마트 횡단 보도 이벤트 목록 조회 */
    rest.post("/ntms-smart-cross-wark/api/v1/gyeryong/get/event", (req, res, ctx) => {
        const requestBody: GetSmartCrossWarkEventParams = req.body as GetSmartCrossWarkEventParams;
        console.log("[msw] 스마트 횡단 보도 이벤트 목록 조회 >>>>> ", requestBody);
        return res(ctx.status(200), ctx.json(smartCrossWarkEventsData));
    }),

    /** 스마트 횡단 보도 개소 조회 */
    rest.post("/ntms-smart-cross-wark/api/v1/gyeryong/get/place", (req, res, ctx) => {
        console.log("[msw] 스마트 횡단 보도 개소 조회 >>>>> ", req);
        return res(ctx.status(200), ctx.json(smartCrossWarkPlaceData));
    }),

    rest.post("/ntms-smart-cross-wark/api/v1/gyeryong/get/daily-event", (req, res, ctx) => {
        const requestBody: GetSmartCrossWarkDailyEventParams = req.body as GetSmartCrossWarkDailyEventParams;
        console.log("[msw] 스마트 횡단 보도 일별 이벤트 조회 >>>>> ", requestBody);
        return res(ctx.status(200), ctx.json(smartCrossWarkDailyEventsData));
    }),
];
