import { SelectConfig } from "../services/interfaces/common.interface";

import Select, { StylesConfig } from "react-select";

/** CommonSelect component props interface */
interface CommonSelectProps {
    /** select item 을 구성 하기 위한 목록 데이터 */
    selectConfig: SelectConfig[];
    /** select item 의 초기 선택 처리를 위한 row 데이터 */
    dataTableSearchSelectItem: SelectConfig;
    /** select item(조회 키워드) 변경 시 호출 할 부모 컴포넌트 함수 */
    handleKeywordChange: (changeValue: SelectConfig) => void;
}

/**
 * 공용 select 컴포넌트
 * @returns {JSX.Element}
 */
const CommonSelect = (props: CommonSelectProps): JSX.Element => {
    /** CommonSelect props */
    const { selectConfig, dataTableSearchSelectItem, handleKeywordChange } = props;

    /**
     * select item 변경 이벤트
     * @function handleSelectOptionChange
     * @param {unknown} changeOption 변경 된 select item 객체 (label, value)
     * @returns {void}
     */
    const handleSelectOptionChange = (changeOption: unknown): void => {
        console.log(changeOption);
        handleKeywordChange(changeOption as SelectConfig);
    };

    /** react-select 의 커스텀 스타일 설정 */
    const customStyles: StylesConfig = {
        control: (provided, state) => ({
            ...provided,
            background: "#61666b",
            borderColor: "#61666b",
            minHeight: "28px",
            height: "28px",
            fontSize: "13px",
            color: "#fafafa",
            borderRadius: "0px",
            width: "180px",
            minWidth: "180px",
            border: state.isFocused ? "1px solid #28acfc" : 0,
            boxShadow: "none",
        }),
        valueContainer: provided => ({
            ...provided,
            height: "28px",
            padding: "0 6px",
        }),
        singleValue: provided => ({
            ...provided,
            color: "#fafafa",
            fontSize: "13px",
            marginBottom: "2px",
        }),
        input: provided => ({
            ...provided,
            margin: "0px",
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        indicatorsContainer: provided => ({
            ...provided,
            height: "28px",
        }),
        dropdownIndicator: base => ({
            ...base,
            color: "#fafafa",
            "&:hover": {
                color: "hsl(0, 0%, 80%)",
            },
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: state.isSelected ? "14px" : "13px",
            fontWeight: state.isSelected ? "700" : "",
            background: "#61666b",
            borderColor: "#61666b",
            borderRadius: "0",
            "&:hover": {
                background: "rgba(40,172,252,.3)",
            },
        }),
        menu: provided => ({
            ...provided,
            borderRadius: "0",
            padding: "0",
            background: "#61666b",
        }),
    };

    return (
        <Select
            options={selectConfig}
            defaultValue={dataTableSearchSelectItem}
            styles={customStyles}
            isSearchable={false}
            onChange={handleSelectOptionChange}
        />
    );
};

export default CommonSelect;
