import { Map } from "ol";
import { Geometry } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

/**********************************************************************************************
 * kakao sdk interface 정의
 *********************************************************************************************/

/** 카카오 sdk 인터페이스 정의 */
export interface KakaoSDK {
    /** 카카오 지도 관련 정보 */
    maps: {
        /** 카카오 지도 타입 별 url을 return 하는 함수 모음 */
        URI_FUNC: {
            /** 카카오 road map(기본 지도) hd 버전의 url을 return 하는 함수 */
            ROADMAP_HD: (a: string, n: string, e: string) => string;
        };
    };
}

/**********************************************************************************************
 * baseMap http 관련 interface 정의
 *********************************************************************************************/

/** HttpResponse 기본 interface */
interface HttpResponse {
    /** http 응답 코드 */
    code: number;
    /** http 응답 메시지 */
    message: string;
    /** http 응답 시간 */
    responseTime: string;
}

/** postFeature 응답 데이터의 feature 배열 interface  */
export interface PostFeatureFeatures {
    /** feature 타입 */
    type: string;
    /** feature의 공간 정보 */
    geometry: {
        /** feature 타입, point, polygon, line 등 */
        type: string;
        /** feature 의 중심 좌표, 점 타입이 아닌 경우 각 feature의 중앙 위치를 말한다. */
        center: number[];
        /** feature의 위치 정보 (EPSG:5179 좌표) */
        coordinates: number[];
    };
    /** feature의 properties 정보 */
    properties: {
        [key: string]: string | number;
    };
}

/** postFeature 응답 데이터 interface  */
export interface PostFeatureResponse {
    /** 타입 FeatureCollection */
    type: string;
    /** 요청 대상 레이어 명 */
    layer: string;
    /** 요청 대상 레이어의 feature 정보 배열 */
    features: PostFeatureFeatures[];
}

/** postFeature 응답 데이터의 results 배열 interface  */
export interface PostLayerStyleResult {
    /** 레이어 id */
    layer_id: string;
    /** 서브레이어 id */
    sublayer_id: string;
    /** 서브레이어 이름 */
    sublayer_name: string;
    /** 서브레이어 스타일 */
    sublayer_style: string;
    /** 서브레이어 등록일 */
    reg_date: string;
    /** 아이콘 id */
    icon_id: string;
    /** 아이콘 이미지 */
    icon_img: string;
    /** 아이콘 이미지 종류 */
    icon_img_type: string;
    /** 아이콘 종류 */
    icon_type: string;
}

/** postLayerStyle 응답 데이터 interface  */
export interface PostLayerStyleResponse extends HttpResponse {
    /** postLayerStyle 검색 결과 건 수 */
    count: number;
    /** postLayerStyle 검색 결과 배열 */
    results: PostLayerStyleResult[];
}

/** postFeatureDetail 응답 데이터의 feature 배열 interface  */
export interface PostFeatureDetailFeatures {
    /** feature 타입 */
    type: string;
    /** feature의 공간 정보 */
    geometry: {
        /** feature 타입, point, polygon, line 등 */
        type: string;
        /** feature 의 중심 좌표, 점 타입이 아닌 경우 각 feature의 중앙 위치를 말한다. */
        center: number[];
        /** feature의 위치 정보 (EPSG:5179 좌표) */
        coordinates: number[];
    };
    /** geometry 유형, geom, line, polygon 등 */
    geometry_name: string;
    /** feature의 properties 정보 */
    properties: {
        [key: string]: string | number;
    };
}

/**  postFeatureDetail 응답 데이터 interface */
export interface PostFeatureDetailResponse {
    /** 타입 FeatureCollection */
    type: string;
    /** 요청 대상 레이어의 feature 정보 배열 */
    features: PostFeatureDetailFeatures[];
}

/** kakaomap 카카오맵 url 및 버전 정보 조회 parameter interface  */
export interface GetKakaoMapParams {
    /** 조회 타입 */
    type: string;
    /** 지도 코드 */
    code: string;
}

/** kakaomap 카카오맵 url 및 버전 정보 조회 응답 결과값의 배열 데이터 interface  */
export interface GetKakaoMapResult {
    /** 지도 코드 */
    code: string;
    /** 지도 url 또는 version */
    data: string;
}

/** kakaomap 카카오맵 url 및 버전 정보 조회 응답 데이터 interface  */
export interface GetKakaoMapResponse extends HttpResponse {
    /** 응답 값 */
    response: {
        /** 응답 결과 값의 배열 */
        results: GetKakaoMapResult[];
        /** 조회 데이터 수 */
        totalCount: number;
    };
}

/**********************************************************************************************
 * baseMap 생성 parameter interface 정의
 *********************************************************************************************/

/** 지도 생성을 위한 설정 정보 */
export interface MapCreationConfig {
    /** 초기 지도 화면의 중심 좌표 */
    center: number[];
    /** 지도의 최소 줌 레벨 */
    minZoom: number;
    /** 지도의 최대 줌 레벨 */
    maxZoom: number;
    /** 초기 지도 화면의 줌 레벨 */
    zoom: number;
    /** 레이어 id */
    layerId: string;
    /** 기본 subLayer, 스타일 처리용 */
    subLayerId: string;
    /** 지도 위 자산으로 표현되는 icon의 가로 너비, px 단위 */
    iconWidth: number;
    /** 지도 위 자산으로 표현되는 icon의 세로 높이, px 단위 */
    iconHeight: number;
    /** 지도 위 자산 선택 시 보여질 icon */
    selectedIcon: string;
    /** 카카오 road map 지도 url */
    kakaoMapUrlConfig?: string | KakaoSDK | undefined;
}

/** 지도 위 레이어 생성을 위한 설정 정보 (postFeature, postLayerStyle 의 응답 데이터) */
export interface LayerCreationConfig {
    /** postFeature 응답 데이터 feature 배열 정보 */
    postFeatures: PostFeatureResponse;
    /** postLayerStyle 응답 데이터 스타일 배열 정보*/
    postLayerStyles: PostLayerStyleResult[];
}

/**********************************************************************************************
 * 자산 레이어 생성 및 feature 정보 관련 interface 정의
 *********************************************************************************************/

/** 지도의 확대 축소에 레벨에 따른 scale 처리 지정 값 */
export interface ClusterScale {
    [key: string]: number;
    "48": number;
    "40": number;
    "32": number;
    "24": number;
    "16": number;
    minScale: number;
}

/** 좌표의 위치한 자산(feature)을 지도에 표시하는 레이어 생성에 필요한 props 정보 */
export interface GetPointFeaturesProps {
    /** 지도 객체 */
    mapObject: Map;
    /** postFeature Response 데이터 구조 */
    postFeatureResponse: PostFeatureResponse;
    /** 벡터 레이어 */
    vectorLayer: VectorLayer<VectorSource<Geometry>>;
    /** png로 변환한 지도에 표출되는 레이어의 자산 아이콘 */
    pngBase64?: string;
    /** png로 변환한 지도에 표출되는 선택 표시 아이콘 */
    selectedMarkerBase64?: string;
    /** scale 처리용 아이콘 사이즈 */
    scaleIconSize: number;
    /** 자산 선택 콜백 함수 */
    // selectedFeatureCallback: (mapClickPositionInfo: MapClickPositionInfo) => void;
}
