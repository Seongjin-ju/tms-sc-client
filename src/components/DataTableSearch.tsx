import { ForwardedRef, createElement, forwardRef, useState } from "react";

import { DateRangeSearchConfig, SelectConfig } from "../services/interfaces/common.interface";

import CommonButton from "./CommonButton";
import CommonSelect from "./CommonSelect";

import ko from "date-fns/locale/ko";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { Calendar } from "react-feather";
import styled from "styled-components";

registerLocale("ko", ko);

import "react-datepicker/dist/react-datepicker.css";

/** react date picker 유저 커스텀 input 컴포넌트 props */
interface CustomInputProps {
    /** date picker 변경 이벤트 */
    onChange?(): void;
    /** date picker 클릭 이벤트 */
    onClick?(): void;
    /** date picker 입력 값 */
    value: string;
}

/** DataTableSearch component props interface */
interface DataTableSearchProps {
    /** 기간 검색 생성에 필요한 설정 정보 */
    dateRangeSearchConfig: DateRangeSearchConfig;
}

/**
 * 데이터 테이블 검색 컴포넌트
 * @returns {JSX.Element}
 */
const DataTableSearch = (props: DataTableSearchProps): JSX.Element => {
    /** DataTableSearch props */
    const { dateRangeSearchConfig } = props;

    /** 검색 시작 일자 */
    const [searchStartDate, setSearchStartDate] = useState<Date | null>(
        new Date(dateRangeSearchConfig.dataRangeConfig.startDate),
    );

    /** 검색 종료 일자 */
    const [searchEndDate, setSearchEndDate] = useState<Date | null>(
        new Date(dateRangeSearchConfig.dataRangeConfig.endDate),
    );

    /** 검색 키워드 */
    const [searchKeyword, setSearchKeyword] = useState<string | number | undefined>(
        dateRangeSearchConfig.selectConfig[0].value,
    );

    /** react date picker 유저 커스텀 input 컴포넌트 */
    const CustomInput = forwardRef(
        ({ onChange, onClick, value }: CustomInputProps, ref: ForwardedRef<HTMLInputElement>) => (
            <DatePickerWrap>
                <DataPickerInput value={value} onChange={onChange} onClick={onClick} ref={ref} />
                <FeatherCalendarIcon size={16} onClick={onClick} />
            </DatePickerWrap>
        ),
    );

    /**
     * 검색 대상 키워드 변경 이벤트(입력 값 또는 선택 값)
     * @function handleKeywordChange
     * @param {string | number} changeOption 변경 된 select option 데이터
     * @returns {void}
     */
    const handleKeywordChange = (changeOption: SelectConfig): void => {
        setSearchKeyword(changeOption.value);
    };

    /**
     * 검색 버튼 클릭 이벤트
     * @function handleSearchButtonClick
     * @returns {void}
     */
    const handleSearchButtonClick = (): void => {
        dateRangeSearchConfig.handleDataTableSearch({
            startDate: dayjs(searchStartDate).format("YYYY-MM-DD"),
            endDate: dayjs(searchEndDate).format("YYYY-MM-DD"),
            keyword: searchKeyword,
        });
    };

    /**
     * 엑셀 다운로드 버튼 클릭 이벤트
     * @function handleSearchButtonClick
     * @returns {void}
     */
    const handleExcelDownloadButtonClick = (): void => {
        if (dateRangeSearchConfig.handleDataTableExcelDownload) {
            dateRangeSearchConfig.handleDataTableExcelDownload();
        }
    };

    return (
        <DataTableSearchContainer>
            <DataTableSearchWrap>
                <DatePicker
                    locale="ko"
                    selected={searchStartDate}
                    onChange={date => setSearchStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    customInput={createElement(CustomInput)}
                />
                {"~"}
                <DatePicker
                    locale="ko"
                    selected={searchEndDate}
                    onChange={date => setSearchEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                    customInput={createElement(CustomInput)}
                />
                <CommonSelect
                    selectConfig={dateRangeSearchConfig.selectConfig}
                    dataTableSearchSelectItem={dateRangeSearchConfig.selectConfig[0]}
                    handleKeywordChange={handleKeywordChange}
                />
                <CommonButton text="검색" onClick={handleSearchButtonClick} />
            </DataTableSearchWrap>
            <CommonButton text="엑셀 다운로드" onClick={handleExcelDownloadButtonClick} />
        </DataTableSearchContainer>
    );
};

const DataTableSearchContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 8px;
`;

const DataTableSearchWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #f3f3f3;
    &:focus-visible {
        outline: none !important;
    }
`;

const DatePickerWrap = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    &:focus-visible {
        outline: none !important;
    }
`;

const DataPickerInput = styled.input`
    height: 28px;
    padding: 0 8px;
    font-size: 13px;
    background: #61666b;
    color: #fafafa;
    border: 1px solid rgba(0, 0, 0, 0);
    &:focus {
        border: 1px solid #28acfc;
    }
    &:focus-visible {
        outline: none !important;
    }
`;

const FeatherCalendarIcon = styled(Calendar)`
    position: absolute;
    right: 4px;
    color: #fafafa;
    cursor: pointer;
`;

export default DataTableSearch;
