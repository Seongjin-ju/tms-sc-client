import { useState } from "react";

import {
    ChartSearchConfig,
    ChartSearchSelectConfig,
    ChartSearchSelectOption,
    SelectConfig,
} from "../services/interfaces/common.interface";

import CommonButton from "./CommonButton";
import CommonSelect from "./CommonSelect";

import styled from "styled-components";

/** DataChartSearch component props interface */
interface DataChartSearchProps {
    chartSearchConfig: ChartSearchConfig;
}

/**ChartSearchSelectConfig
 * 데이터 차트 검색 컴포넌트
 * @returns {JSX.Element}
 */
const DataChartSearch = (props: DataChartSearchProps): JSX.Element => {
    /** DataChartSearch props */
    const { chartSearchConfig } = props;

    /** 검색 버튼 클릭 시, 부모 컴포넌트로 보내 줄 select(parameter) 정보 */
    const [selectedOptions, setSelectedOptions] = useState<ChartSearchSelectOption[]>(
        chartSearchConfig.selectConfigs.map((value: ChartSearchSelectConfig) => {
            return {
                key: value.key,
                selectOption: value.selectConfig[0],
            };
        }),
    );

    /**
     * 검색 대상 키워드 변경 이벤트(입력 값 또는 선택 값)
     * @function handleKeywordChange
     * @param {string} key 생성된 select box의 key, 검색 parameter 의 key로 사용
     * @param {SelectConfig} changeOption 변경 된 select option 정보
     * @returns {void}
     */
    const handleKeywordChange = (key: string | number, changeOption: SelectConfig): void => {
        const updatedOptions = selectedOptions.map(option => {
            if (option.key === key) {
                // key가 일치하는 경우, selectOption을 업데이트
                return {
                    ...option,
                    selectOption: changeOption,
                };
            }
            // key가 일치하지 않는 경우, 기존 옵션을 그대로 유지
            return option;
        });
        // 업데이트된 배열을 새로운 상태로 설정합니다.
        setSelectedOptions(updatedOptions);
    };

    return (
        <DataChartSearchContainer>
            <DataTableSearchSelectWrap>
                {chartSearchConfig.selectConfigs.map((value: ChartSearchSelectConfig, index: number) => {
                    return (
                        <CommonSelect
                            key={index}
                            selectConfig={value.selectConfig}
                            dataTableSearchSelectItem={value.selectConfig[0]}
                            handleKeywordChange={changeKeyword => handleKeywordChange(value.key, changeKeyword)}
                        />
                    );
                })}
                <CommonButton
                    text="검색"
                    onClick={() =>
                        chartSearchConfig.handleChartSearch && chartSearchConfig.handleChartSearch(selectedOptions)
                    }
                />
            </DataTableSearchSelectWrap>
        </DataChartSearchContainer>
    );
};

const DataChartSearchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 16px 8px;
`;

const DataTableSearchSelectWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #f3f3f3;
    &:focus-visible {
        outline: none !important;
    }
`;

export default DataChartSearch;
