import { MAP_PROJECTIONS } from "./baseMap.projections";

import { createCanvas, loadImage } from "canvas";
import { transform, fromLonLat } from "ol/proj";
import { register } from "ol/proj/proj4";
import proj4 from "proj4";

/**
 * @name setDefaultProjection
 * @function
 * @description 기본 지도 좌표계 등록 (바로E맵, EPSG:5181)
 * @return {void}
 */
export const setDefaultProjection = (): void => {
    proj4.defs(MAP_PROJECTIONS.baro.projectionName, MAP_PROJECTIONS.baro.projection);
    register(proj4);
};

/**
 * @name getTransForm
 * @function
 * @description 좌표를 경도/위도에서 다른 투영법으로 변환
 * @return {number[]}
 */
export const getTransForm = (
    coordinates: number[],
    projectionName: string,
    displayProjectionName: string,
): number[] => {
    return transform(coordinates, projectionName, displayProjectionName);
};

/**
 * @name getFromLonLat
 * @function
 * @description 좌표를 경도/위도에서 다른 투영법으로 변환
 * @return {number[]}
 */
export const getFromLonLat = (coordinates: number[], projectionName: string): number[] => {
    return fromLonLat(coordinates, projectionName);
};

/**
 * @name convertSvgSize
 * @function
 * @description svg base64 문자열 사이즈 변경 처리
 * @param {string} svgBase64 svg base64 문자열
 * @param {number} width width px 단위의 너비
 * @param {number} height height px 단위의 높이
 * @return {string}
 */
export const convertSvgSize = (svgBase64: string, width: number, height: number): string => {
    // svg 아이콘 크기 설정
    const base64Code = atob(svgBase64.split("base64,")[1]);
    const svgDoc = new DOMParser().parseFromString(base64Code, "image/svg+xml");
    const svgElement = svgDoc.getElementsByTagName("svg")[0];
    svgElement.setAttribute("width", String(width) || "24");
    svgElement.setAttribute("height", String(height) || "24");
    return "data:image/svg+xml;base64," + btoa(new XMLSerializer().serializeToString(svgDoc));
};

/**
 * @name resizeSvgToPng
 * @function
 * @description svg base64 문자열을 png 형식으로 변경하며 사이즈 변경 처리
 * @param {string} svgBase64 svg base64 문자열
 * @param {number} width width px 단위의 너비
 * @param {number} height height px 단위의 높이
 * @return {string}
 */
export const resizeSvgToPng = async (svgBase64: string, width: number, height: number): Promise<string> => {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    const img = await loadImage(svgBase64);

    ctx.drawImage(img, 0, 0, width || 24, height || 24);

    const pngBase64 = canvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, "");

    return `data:image/png;base64,${pngBase64}`;
};
