import { CLUSTER_SCALE, DISPLAY_PROJECTION_NAME, EMPTY_ICON, LAYER_TYPE_KEY } from "./baseMap.constant";
import {
    GetPointFeaturesProps,
    KakaoSDK,
    LayerCreationConfig,
    MapCreationConfig,
    PostFeatureFeatures,
    PostLayerStyleResult,
} from "./baseMap.interface";
import { MAP_PROJECTIONS } from "./baseMap.projections";
import { convertSvgSize, getFromLonLat, getTransForm, resizeSvgToPng } from "./baseMap.utils";

import { Map, Collection, MapBrowserEvent, Feature } from "ol";
import * as OlExtent from "ol/extent";
import { Geometry, Point } from "ol/geom";
import BaseLayer from "ol/layer/Base";
import Layer from "ol/layer/Layer";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { Projection } from "ol/proj";
import { register } from "ol/proj/proj4";
import Source from "ol/source/Source";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import { TileCoord } from "ol/tilecoord";
import TileGrid from "ol/tilegrid/TileGrid";
import proj4 from "proj4";

/**
 * @name removeDuplicateLayer
 * @function
 * @description 레이어 중복 제거
 * @param {Map} mapObject 지도 객체
 * @param {string} key 중복 된 레이어를 탐색 할 properties key
 * @param {string} value 중복 된 레이어를 탐색 할 properties value
 * @return {void}
 */
export const removeDuplicateLayer = (mapObject: Map, key: string, value: string): void => {
    const isDuplicateLayers: Layer<Source>[] | undefined = mapObject.getAllLayers().filter((layer: Layer<Source>) => {
        const layerProps = layer.getProperties();
        if (layerProps[key] && layerProps[key] === value) {
            return layer;
        }
    });

    if (isDuplicateLayers && isDuplicateLayers.length > 0) {
        isDuplicateLayers.forEach((layer: Layer<Source>) => {
            mapObject.removeLayer(layer as Layer);
        });
    }
};

/**
 * @private
 * @name getPointFeatures
 * @function
 * @description 좌표의 위치한 자산(feature)을 지도에 표시하는 레이어 생성
 * @return {BaseLayer[] | Collection<BaseLayer>}
 */
export const getPointFeatures = (props: GetPointFeaturesProps): void => {
    const { mapObject, postFeatureResponse, vectorLayer, pngBase64 /* , scaleIconSize, selectedFeatureCallback  */ } =
        props;
    const postFeatureVectorSource: VectorSource<Geometry> | null = vectorLayer.getSource();
    const postFeatureStyle = new Style({
        image: new Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            crossOrigin: "anonymous",
            src: pngBase64 ? pngBase64 : EMPTY_ICON,
            rotateWithView: true,
        }),
    });

    const pointFeatures: Feature<Geometry>[] = postFeatureResponse.features.map(
        (feature: PostFeatureFeatures): Feature<Geometry> => {
            const pointFeature: Feature = new Feature({
                geometry: new Point(
                    getFromLonLat(
                        getTransForm(
                            feature.geometry.coordinates,
                            MAP_PROJECTIONS.baro.projectionName,
                            DISPLAY_PROJECTION_NAME,
                        ),
                        MAP_PROJECTIONS.baro.projectionName,
                    ),
                ),
            });

            Object.keys(feature.properties).forEach((key: string) => {
                pointFeature.set(key, feature.properties[key]);
            });

            pointFeature.setStyle(postFeatureStyle);
            return pointFeature;
        },
    );

    postFeatureVectorSource?.addFeatures(pointFeatures);

    // 4. 자산(feature) hover 기능 추가
    const hoverEventHandler = (e: MapBrowserEvent<UIEvent>) => {
        if (e.dragging) {
            return;
        }
        const pixel = mapObject.getEventPixel(e.originalEvent);
        const hit = mapObject.hasFeatureAtPixel(pixel);
        mapObject.getTargetElement().style.cursor = hit ? "pointer" : "";
    };
    mapObject.on("pointermove", hoverEventHandler);

    // 신규 선택 기능
    /* mapObject.on("singleclick", (evt: MapBrowserEvent<any>) => {
        selectedFeatureCallback({
            center: evt.coordinate,
            convert_center: getTransForm(evt.coordinate, MAP_PROJECTIONS.baro.projectionName, DISPLAY_PROJECTION_NAME),
            radius: getCurrentScale(mapObject) ? (getCurrentScale(mapObject) as number) / scaleIconSize : undefined,
        });
    }); */

    /** 6. 포인트 선택 interaction 이벤트 처리 */
    /* pointSelectInteraction.on("select", (e: SelectEvent) => {
        if (postFeatureVectorSource) {
            removeDuplicateFeatures(
                postFeatureVectorSource,
                SELECTED_CIRCLE_FEATURE_KEY,
                SELECTED_CIRCLE_FEATURE_VALUE,
            );
        }

        if (e.selected.length > 0) {
            const selectedFeatureCoordinates = (e.selected[0].getGeometry() as Point).getCoordinates();
            const selectedCircleFeature = new Feature({
                geometry: new Point(selectedFeatureCoordinates),
            });
            selectedCircleFeature.set(SELECTED_CIRCLE_FEATURE_KEY, SELECTED_CIRCLE_FEATURE_VALUE);
            selectedCircleFeature.setStyle(
                new Style({
                    image: new Icon({
                        anchor: [0.5, 0.5],
                        anchorXUnits: "fraction",
                        anchorYUnits: "fraction",
                        crossOrigin: "anonymous",
                        src: selectedMarkerBase64,
                        rotateWithView: true,
                    }),
                }),
            );
            postFeatureVectorSource?.addFeature(selectedCircleFeature);

            // 선택된 자산 center로 이동 처리
            mapObject.getView().animate({
                center: selectedFeatureCoordinates,
                duration: 300,
            });

            if (selectedFeatureCallback) {
                selectedFeatureCallback(e.selected[0] as Feature);
            }
        }

        // 선택 항목이 없고, 선택이 해제 된 경우
        if (e.selected.length === 0 && e.deselected.length > 0) {
            if (postFeatureVectorSource) {
                removeDuplicateFeatures(
                    postFeatureVectorSource,
                    SELECTED_CIRCLE_FEATURE_KEY,
                    SELECTED_CIRCLE_FEATURE_VALUE,
                );
            }
            pointSelectInteraction.getFeatures().clear();
            if (selectedFeatureCallback) {
                selectedFeatureCallback(undefined);
            }
        }
    });
    mapObject.addInteraction(pointSelectInteraction); */
};

/**
 * @name getKaKaoTileLayer
 * @function
 * @param {string | KakaoSDK | undefined} kakaoMapUrlConfig kakao 지도를 생성하기 위한 url 정보
 * 기본 url 또는 kakao sdk 정보 모든 환경이 구성되지 않은 경우(클라우드 환경 x, 설정 항목 x) undefined가 넘어온다.
 * @description 카카오 배경 지도 타일 레이어를 반환 한다.
 * @return {BaseLayer[] | Collection<BaseLayer>}
 */
export const getKaKaoTileLayer = (
    kakaoMapUrlConfig: string | KakaoSDK | undefined,
): BaseLayer[] | Collection<BaseLayer> => {
    proj4.defs(MAP_PROJECTIONS.kakao.projectionName, MAP_PROJECTIONS.kakao.projection);
    register(proj4);

    const customProjection = new Projection({
        code: MAP_PROJECTIONS.kakao.projectionName,
        extent: MAP_PROJECTIONS.kakao.extent as OlExtent.Extent,
        units: "m",
    });

    const kakaoTileLayer = new TileLayer({
        preload: Infinity,
        source: new XYZ({
            projection: customProjection,
            tileGrid: new TileGrid({
                origin: [MAP_PROJECTIONS.kakao.extent[0], MAP_PROJECTIONS.kakao.extent[1]],
                resolutions: MAP_PROJECTIONS.kakao.resolution,
            }),
            tileUrlFunction: (tileCoord: TileCoord) => {
                if (tileCoord === null) return undefined;
                const z = String(MAP_PROJECTIONS.kakao.resolution.length - tileCoord[0]);
                const x = String(tileCoord[1]);
                const y = String(-tileCoord[2] - 1);

                if (typeof kakaoMapUrlConfig === "object") {
                    return `/dms-gis-proxy/${
                        window.location.protocol.split(":")[0] || "http"
                    }/${kakaoMapUrlConfig.maps.URI_FUNC.ROADMAP_HD(x, y, z)}`;
                }

                if (typeof kakaoMapUrlConfig === "string") {
                    console.log("string string string  !!! kakao !!!!");
                    return `/dms-gis-proxy/${window.location.protocol.split(":")[0] || "http"}/${kakaoMapUrlConfig
                        .replace("{z}", z)
                        .replace("{y}", y)
                        .replace("{x}", x)}`;
                }
            },
            crossOrigin: "anonymous",
        }),
        visible: true,
    });
    return [kakaoTileLayer] as BaseLayer[] | Collection<BaseLayer>;
};

/**
 * @private
 * @name postFeatureLayer
 * @function
 * @description 좌표의 위치한 자산(feature)을 지도에 표시하는 레이어 생성
 * @param {Map} mapObject 지도 객체
 * @param {layerCreationConfig} layerCreationConfig 레이어 생성 정보
 * @return {void}
 */
export const postFeatureLayer = (
    mapObject: Map,
    mapCreationConfig: MapCreationConfig,
    layerCreationConfig: LayerCreationConfig,
    /* selectedFeatureCallback: (mapClickPositionInfo: MapClickPositionInfo) => void, */
): void => {
    if (layerCreationConfig.postFeatures && layerCreationConfig.postLayerStyles) {
        /** 0. 중복된 레이어가 생성 되어 있는 경우 삭제 */
        removeDuplicateLayer(mapObject, LAYER_TYPE_KEY, mapCreationConfig.layerId);

        /** 1. postFeature 벡터 레이어 & 소스 생성 */
        const postFeatureVectorLayer: VectorLayer<VectorSource<Geometry>> = new VectorLayer({
            source: new VectorSource({}),
        });
        postFeatureVectorLayer.set(LAYER_TYPE_KEY, mapCreationConfig.layerId);
        mapObject.addLayer(postFeatureVectorLayer);

        /** 2. 레이어 스타일(아이콘) 정의 */
        const findLayerStyle = layerCreationConfig.postLayerStyles.find((value: PostLayerStyleResult) => {
            return value.layer_id === mapCreationConfig.layerId && value.sublayer_id === mapCreationConfig.subLayerId;
        });

        if (findLayerStyle && findLayerStyle.icon_img) {
            resizeSvgToPng(findLayerStyle?.icon_img, mapCreationConfig.iconWidth, mapCreationConfig.iconHeight)
                .then((pngBase64: string) => {
                    getPointFeatures({
                        mapObject,
                        postFeatureResponse: layerCreationConfig.postFeatures,
                        vectorLayer: postFeatureVectorLayer,
                        pngBase64,
                        selectedMarkerBase64: convertSvgSize(
                            mapCreationConfig.selectedIcon,
                            mapCreationConfig.iconWidth,
                            mapCreationConfig.iconHeight,
                        ),
                        scaleIconSize: CLUSTER_SCALE[String(mapCreationConfig.iconWidth)],
                        /* selectedFeatureCallback, */
                    });
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }

        // 3. 아이콘 resize 및 자산(feature) 포인트 레이어 add
        /* if (findLayerStyle && findLayerStyle.icon_img) {
            resizeSvgToPng(findLayerStyle?.icon_img, mapCreationConfig.iconWidth, mapCreationConfig.iconHeight)
                .then(pngBase64 => {
                    getPointFeatures({
                        mapObject,
                        postFeatureResponse: layerCreationConfig.postFeatures,
                        vectorLayer: postFeatureVectorLayer,
                        pngBase64,
                        selectedMarkerBase64: convertSvgSize(
                            mapCreationConfig.selectedIcon,
                            mapCreationConfig.iconWidth,
                            mapCreationConfig.iconHeight,
                        ),
                        scaleIconSize: CLUSTER_SCALE[String(mapCreationConfig.iconWidth)],
                        selectedFeatureCallback,
                    });
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        } else {
            getPointFeatures({
                mapObject,
                postFeatureResponse: layerCreationConfig.postFeatures,
                vectorLayer: postFeatureVectorLayer,
                scaleIconSize: CLUSTER_SCALE[String(mapCreationConfig.iconWidth)],
                selectedFeatureCallback,
            });
        } */
    }
};
