import {
    SmartBusInfoDataStatusPage,
    SmartBusInfoEquipMgmtPage,
    SmartBusInfoMonitoringPage,
} from "../pages/smartBusInfoPages";
import {
    SmartCrossWalkDataStatusPage,
    SmartCrossWalkEquipMgmtPage,
    SmartCrossWalkMonitoringPage,
} from "../pages/smartCrossWalkPages";
import {
    SmartFineDustDataStatusPage,
    SmartFineDustEquipMgmtPage,
    SmartFineDustMonitoringPage,
} from "../pages/smartFineDustPages";
import {
    SmartSafeRoadDataStatusPage,
    SmartSafeRoadEquipMgmtPage,
    SmartSafeRoadMonitoringPage,
} from "../pages/smartSafeRoadPages";

/** 스마트 횡단 보도 대메뉴 url */
export const SMART_CROSS_WORK = "/smart-cross-wark";
/** 스마트 미세 먼지 대메뉴 url */
const SMART_FINE_DUST = "/smart-fine-dust";
/** 스마트 버스 정보 대메뉴 url */
const SMART_BUS_INFO = "/smart-bus-information";
/** 스마트 안심 길 대메뉴 url */
const SMART_SAFE_ROAD = "/smart-safe-road";
/** 모니터링 서브 메뉴 url */
export const MONITORING_SUB_MENU = "monitoring";
/** 데이터 현황 서브 메뉴 url */
const DATA_STATUS_SUB_MENU = "data-status";
/** 장비 관리 서브 메뉴 url */
const EQUIPMENT_MANAGEMENT_SUB_MENU = "equipment-management";

/** 메뉴 router 처리용 변수 */
export const RouterMenus = [
    /** 스마트 횡단 보도 메뉴, 모니터링/데이터 현황/장비 관리 */
    {
        path: `${SMART_CROSS_WORK}/${MONITORING_SUB_MENU}`,
        element: <SmartCrossWalkMonitoringPage />,
    },
    {
        path: `${SMART_CROSS_WORK}/${DATA_STATUS_SUB_MENU}`,
        element: <SmartCrossWalkDataStatusPage />,
    },
    {
        path: `${SMART_CROSS_WORK}/${EQUIPMENT_MANAGEMENT_SUB_MENU}`,
        element: <SmartCrossWalkEquipMgmtPage />,
    },
    /** 스마트 미세 먼지 메뉴, 모니터링/데이터 현황/장비 관리 */
    {
        path: `${SMART_FINE_DUST}/${MONITORING_SUB_MENU}`,
        element: <SmartFineDustMonitoringPage />,
    },
    {
        path: `${SMART_FINE_DUST}/${DATA_STATUS_SUB_MENU}`,
        element: <SmartFineDustDataStatusPage />,
    },
    {
        path: `${SMART_FINE_DUST}/${EQUIPMENT_MANAGEMENT_SUB_MENU}`,
        element: <SmartFineDustEquipMgmtPage />,
    },
    /** 스마트 버스 정보 메뉴, 모니터링/데이터 현황/장비 관리 */
    {
        path: `${SMART_BUS_INFO}/${MONITORING_SUB_MENU}`,
        element: <SmartBusInfoMonitoringPage />,
    },
    {
        path: `${SMART_BUS_INFO}/${DATA_STATUS_SUB_MENU}`,
        element: <SmartBusInfoDataStatusPage />,
    },
    {
        path: `${SMART_BUS_INFO}/${EQUIPMENT_MANAGEMENT_SUB_MENU}`,
        element: <SmartBusInfoEquipMgmtPage />,
    },
    /** 스마트 안심길 메뉴, 모니터링/데이터 현황/장비 관리 */
    {
        path: `${SMART_SAFE_ROAD}/${MONITORING_SUB_MENU}`,
        element: <SmartSafeRoadMonitoringPage />,
    },
    {
        path: `${SMART_SAFE_ROAD}/${DATA_STATUS_SUB_MENU}`,
        element: <SmartSafeRoadDataStatusPage />,
    },
    {
        path: `${SMART_SAFE_ROAD}/${EQUIPMENT_MANAGEMENT_SUB_MENU}`,
        element: <SmartSafeRoadEquipMgmtPage />,
    },
];
