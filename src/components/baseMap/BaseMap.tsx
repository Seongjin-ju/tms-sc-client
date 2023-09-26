import { useEffect, useRef } from "react";

import { baseMapState } from "../../services/state/baseMap.state";

import { LayerCreationConfig, MapCreationConfig } from "./baseMap.interface";
import { getKaKaoTileLayer, postFeatureLayer } from "./baseMap.layer";
import { MAP_PROJECTIONS } from "./baseMap.projections";
import { getFromLonLat, setDefaultProjection } from "./baseMap.utils";

import { Map, View } from "ol";
import { defaults as defaultControls } from "ol/control";
import { defaults as defaultInteractions } from "ol/interaction";
import PinchZoom from "ol/interaction/PinchZoom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

/** BaseMap component props interface */
interface BaseMapProps {
    /** 지도 생성을 위한 설정 정보 */
    mapCreationConfig: MapCreationConfig;
    /** 지도 위 레이어 생성을 위한 설정 정보 (postFeature, postLayerStyle 의 응답 데이터) */
    layerCreationConfig?: LayerCreationConfig | undefined;
    // selectedFeatureCallback: (mapClickPositionInfo: MapClickPositionInfo) => void;
}

/**
 * baseMap 지도 컴포넌트
 * @returns {JSX.Element}
 */
const BaseMap = (props: BaseMapProps): JSX.Element => {
    /** BaseMap Props */
    const { mapCreationConfig, layerCreationConfig /* selectedFeatureCallback */ } = props;
    layerCreationConfig;

    /** 생성된 base 지도 객체를 저장 할 recoil state 객체  */
    const setBaseMapState = useSetRecoilState<Map | undefined>(baseMapState);

    const divRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<Map | null>(null);

    /** useEffect hook, 최초 한번만 지도를 생성 하기 위한 조치 */
    useEffect(() => {
        if (divRef.current && !mapRef.current) {
            setDefaultProjection();
            const tileLayers = getKaKaoTileLayer(mapCreationConfig.kakaoMapUrlConfig);
            const fromLonLatCoordinates = getFromLonLat(mapCreationConfig.center, MAP_PROJECTIONS.baro.projectionName);

            const view = new View({
                center: fromLonLatCoordinates,
                zoom: mapCreationConfig.zoom,
                minZoom: mapCreationConfig.minZoom,
                maxZoom: mapCreationConfig.maxZoom,
                projection: MAP_PROJECTIONS.baro.projectionName,
                constrainResolution: true, // zoom 레벨 정수 처리 (소수점 X)
                smoothResolutionConstraint: false,
                smoothExtentConstraint: false,
            });

            mapRef.current = new Map({
                controls: defaultControls({ zoom: false, rotate: false }),
                interactions: defaultInteractions({
                    doubleClickZoom: false,
                }).extend([new PinchZoom()]),
                layers: tileLayers,
                target: divRef.current,
                view: view,
            });

            /** 생성 된 지도 객체 recoil state 저장, 이후 지도 기능을 활용하기 위해 지도 객체가 필요 하다. */
            setBaseMapState(mapRef.current);
        }
    }, [divRef]);

    /** useEffect hook, 지도 생성 및 레이어를 생성하기 위한 조건을 갖추면 자산 레이어 생성 처리 */
    useEffect(() => {
        if (mapRef.current && layerCreationConfig) {
            postFeatureLayer(mapRef.current, mapCreationConfig, layerCreationConfig);
        }
    }, [layerCreationConfig]);

    return <MapContainer ref={divRef} />;
};

const MapContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export default BaseMap;
