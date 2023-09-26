import { useState, useEffect } from "react";

import BaseMap from "../../../components/baseMap/BaseMap";
import { fetchFeatureAndStyleData } from "../../../components/baseMap/baseMap.api";
import { KakaoSDK, LayerCreationConfig } from "../../../components/baseMap/baseMap.interface";
import { SMART_CROSS_WALK_MAP_CONFIG } from "../../../constants/smartCrossWalk.constant";
import { kakaoMapUrlConfigState, baseMapLayerIconState } from "../../../services/state/baseMap.state";
import { keycloakTokenState } from "../../../services/state/keycloak.state";
import { MonitoringPageContainer, TodoCurrentPageText } from "../../../styles/page.style";

import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";

/**
 * 스마트 횡단보도 모니터링 page 컴포넌트
 * @returns {JSX.Element}
 */
export const SmartCrossWalkMonitoringPage = (): JSX.Element => {
    /** 인증 처리용 키클록 토큰 정보 */
    const [keyCloakToken]: [string | undefined, SetterOrUpdater<string | undefined>] =
        useRecoilState(keycloakTokenState);

    /** 카카오 지도 road map url 정보 */
    const [kakaoMapUrlConfig]: [string | KakaoSDK | undefined, SetterOrUpdater<string | KakaoSDK | undefined>] =
        useRecoilState(kakaoMapUrlConfigState);

    /** 현재 페이지에서 생성 된 지도의 레이어 아이콘 정보 recoil state 저장 */
    const setBaseMapLayerIconState = useSetRecoilState<string | undefined>(baseMapLayerIconState);

    /** 레이어 생성을 위한 생성 정보를 담고 있는 state */
    const [layerCreationConfig, setLayerCreationConfig]: [
        LayerCreationConfig | undefined,
        React.Dispatch<React.SetStateAction<LayerCreationConfig | undefined>>,
    ] = useState<LayerCreationConfig>();

    /** useEffect hook, 컴포넌트가 마운트 될 때, fetchFeatureAndStyleData 함수 호출 */
    useEffect(() => {
        const fetchBaseMapData = async () => {
            if (keyCloakToken) {
                const responses = await fetchFeatureAndStyleData(SMART_CROSS_WALK_MAP_CONFIG, keyCloakToken);
                if (responses) {
                    setBaseMapLayerIconState(responses.postLayerStyles[0]?.icon_img);
                    setLayerCreationConfig(responses);
                }
            }
        };
        fetchBaseMapData();
        return () => {
            // TODO: panel 삭제 및 선택 자산 삭제 처리
            /* 
            setMapSelectedAssets(undefined);
            setSelectedAsset(undefined); 
            */
        };
    }, [keyCloakToken]);

    return (
        <MonitoringPageContainer>
            <BaseMap
                mapCreationConfig={{ ...SMART_CROSS_WALK_MAP_CONFIG, kakaoMapUrlConfig: kakaoMapUrlConfig }}
                layerCreationConfig={layerCreationConfig}
                /* selectedFeatureCallback={selectedFeatureCallback} */
            />
            <TodoCurrentPageText>🚥 스마트 횡단보도 모니터링 page 컴포넌트 🖥️</TodoCurrentPageText>
        </MonitoringPageContainer>
    );
};
