/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import CommonChart from "../../../components/CommonChart";
import DataChartSearch from "../../../components/DataChartSearch";
import DataTable from "../../../components/DataTable";
import DateRangeSearch from "../../../components/DataTableSearch";
import Loading from "../../../components/Loading";
import PageSubTitle from "../../../components/PageSubTitle";
import { MAX_ROW_NUMBERS_TO_SHOW } from "../../../constants/common.constant";
import {
    getSmartCrossWarkDailyEvent,
    getSmartCrossWarkEvent,
    getSmartCrossWarkPlace,
} from "../../../services/api/smartCrossWark.api";
import {
    ChartSearchConfig,
    ChartSearchSelectOption,
    DateRangeSearchConfig,
    DateRangeSearchData,
    SelectConfig,
    TableConfig,
} from "../../../services/interfaces/common.interface";
import {
    GetSmartCrossWarkDailyEventParams,
    GetSmartCrossWarkEventParams,
    GetSmartCrossWarkEventResponse,
    GetSmartCrossWarkEventResults,
    GetSmartCrossWarkPlaceResponse,
    GetSmartCrossWarkPlaceResults,
} from "../../../services/interfaces/smartCrossWark.interface";
import { dataTablePageNumberState } from "../../../services/state/table.state";
import {
    DataStatusChartContainer,
    DataStatusChartSearchContainer,
    DataStatusPageContainer,
    DataStatusTableSearchContainer,
    DataTableContainer,
    LoadingWrap,
    PageContainer,
    TodoCurrentPageText,
} from "../../../styles/page.style";

import { UseQueryResult, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";

/** 테이블 생성을 위한 설정 정보 */
interface SmartCrossWalkEventTableConfig extends TableConfig<GetSmartCrossWarkEventResults> {
    /** 테이블 목록으로 표시 될 데이터 목록 */
    tableData: GetSmartCrossWarkEventResults[];
}

/**
 * 스마트 횡단보도 데이터 현황 page 컴포넌트
 * @returns {JSX.Element}
 */
export const SmartCrossWalkDataStatusPage = (): JSX.Element => {
    /** 현재 data table 의 페이지 넘버 */
    const [dataTablePageNumber, setDataTablePageNumber] = useRecoilState(dataTablePageNumberState);

    /** 스마트 횡단 보도 이벤트 목록 조회를 위한 parameter 정보 */
    const [smartCrossWarkEventParams, setSmartCrossWarkEventParams] = useState<GetSmartCrossWarkEventParams>({
        place_id: undefined,
        start_date: dayjs().subtract(1, "week").format("YYYY-MM-DD"),
        end_date: dayjs().format("YYYY-MM-DD"),
        page_cnt: MAX_ROW_NUMBERS_TO_SHOW,
        page_num: dataTablePageNumber,
    });

    /** 스마트 횡단 보도 차트 일별 이벤트 조회를 위한 parameter 정보 */
    const [smartCrossWarkDailyEventParams, setSmartCrossWarkDailyEventParams] =
        useState<GetSmartCrossWarkDailyEventParams>({
            place_id: undefined,
        });

    /** 이벤트 목록 조회 검색 및 차트 검색 를 구성하기 위한 개소 목록 select option 생성 정보 */
    const [smartCrossWarkPlaceSelectConfig, setSmartCrossWarkPlaceSelectConfig] = useState<
        SelectConfig[] | undefined
    >();

    /** 이벤트 목록 조회 데이터 테이블의 검색 영역 구성을 위한 설정 정보 */
    const [dateRangeSearchConfig, setDateRangeSearchConfig] = useState<DateRangeSearchConfig>();

    /** 이벤트 목록 조회 데이터 테이블을 생성 하기 위한 설정 정보 */
    const [smartCrossWarkEventDataTableConfig, setSmartCrossWarkEventDataTableConfig] =
        useState<SmartCrossWalkEventTableConfig>();

    /** 차트 데이터 검색 영역 구성을 위한 설정 정보 */
    const [chartSearchConfig, setChartSearchConfig] = useState<ChartSearchConfig>();

    /** useQuery 스마트 횡단 보도 개소 조회, 검색 영역의 개소 목록(select box) 구성을 하기 위한 데이터*/
    const { data: smartCrossWarkPlaceData }: UseQueryResult<GetSmartCrossWarkPlaceResponse> = useQuery({
        queryKey: ["smart-cross-wark-place"],
        queryFn: () => getSmartCrossWarkPlace(),
        refetchOnWindowFocus: false,
    });

    /** useQuery 스마트 횡단 보도 이벤트 목록 조회, 데이터 테이블 목록(스마트 횡단 보도 이벤트 목록 조회)을 표현하기 위한 데이터 */
    const {
        data: smartCrossWarkEventData,
        isLoading: smartCrossWarkEventDataLoading,
    }: UseQueryResult<GetSmartCrossWarkEventResponse> = useQuery({
        queryKey: ["smart-cross-wark-event", smartCrossWarkEventParams],
        queryFn: () => getSmartCrossWarkEvent(smartCrossWarkEventParams),
        refetchOnWindowFocus: false,
        enabled: !!smartCrossWarkEventParams.place_id,
    });

    /** useQuery 스마트 횡단 보도 일별 이벤트 조회, 일별 이벤트 차트를 표현하기 위한 데이터 */
    const {
        data: smartCrossWarkDailyEventData,
        isLoading: smartCrossWarkDailyEventDataLoading,
    }: UseQueryResult<GetSmartCrossWarkEventResponse> = useQuery({
        queryKey: ["smart-cross-wark-daily-event", smartCrossWarkDailyEventParams],
        queryFn: () => getSmartCrossWarkDailyEvent(smartCrossWarkDailyEventParams),
        refetchOnWindowFocus: false,
        enabled: !!smartCrossWarkDailyEventParams.place_id,
    });
    smartCrossWarkDailyEventData;
    smartCrossWarkDailyEventDataLoading;

    /**
     * 데이터 테이블 상단 검색 영역 [검색] 버튼 클릭 이벤트
     * @function handleDataTableSearch
     * @param {DateRangeSearchData} searchData 데이터 테이블 이벤트 목록 조회를 위한 search 데이터
     * @returns {void}
     */
    const handleDataTableSearch = (searchData: DateRangeSearchData): void => {
        /** paging number 초기화 */
        setDataTablePageNumber(1);
        /** 데이터 이벤트 목록 조회 parameter(state) 변경 */
        setSmartCrossWarkEventParams({
            ...smartCrossWarkEventParams,
            start_date: searchData.startDate,
            end_date: searchData.endDate,
            place_id: searchData.keyword as string,
        });
    };

    /**
     * 데이터 테이블 [엑셀 다운로드] 버튼 클릭 이벤트
     * @function handleDataTableSearch
     * @returns {void}
     */
    const handleDataTableExcelDownload = (): void => {
        alert("데이터 테이블 엑셀 다운로드 버튼!");
    };

    /**
     * 차트 상단 검색 영역 [검색] 버튼 클릭 이벤트
     * @function handleDataTableSearch
     * @returns {void}
     */
    const handleChartSearch = (chartSearchSelectOptions: ChartSearchSelectOption[]): void => {
        /**
         * 검색 시 parameter로 들어갈 key 와 선택한 select option이 배열로 전달 된다.
         * 해당 데이터를 활용해 차트 데이터를 만드는 api parameter를 업데이트 한다.
         */
        const params: GetSmartCrossWarkDailyEventParams = {};
        chartSearchSelectOptions.forEach((value: ChartSearchSelectOption) => {
            params[value.key] = value.selectOption.value;
        });
        setSmartCrossWarkDailyEventParams({ ...smartCrossWarkDailyEventParams, ...params });
    };

    /** useEffect hook, 데이터 테이블의 paging 이 변경 된 경우 이벤트 목록 조회 parameter update, 재조회*/
    useEffect(() => {
        setSmartCrossWarkEventParams({
            ...smartCrossWarkEventParams,
            page_num: dataTablePageNumber,
        });
    }, [dataTablePageNumber]);

    /** useEffect hook, 개소 목록 select box 데이터가 가공 된 이후
     *  1. 이벤트 목록 조회 상단 검색 영역을 위한 설정 정의 (기간(date range) 검색 및 개소(select box) 목록)
     *  2. 차트 상단 검색 영역을 위한 설정 정의 (개소(select box) 목록)
     */
    useEffect(() => {
        if (smartCrossWarkPlaceSelectConfig) {
            /** 데이터 테이블 검색 영역 생성을 위한 설정 정보 set */
            setDateRangeSearchConfig({
                dataRangeConfig: {
                    startDate: smartCrossWarkEventParams.start_date,
                    endDate: smartCrossWarkEventParams.end_date,
                },
                selectConfig: smartCrossWarkPlaceSelectConfig,
                handleDataTableSearch,
                handleDataTableExcelDownload,
            });
            /** 차트 검색 영역 생성을 위한 설정 정보 set (n개의 select로 이루어짐) */
            setChartSearchConfig({
                selectConfigs: [
                    {
                        key: "place_id",
                        selectConfig: smartCrossWarkPlaceSelectConfig,
                    },
                ],
                handleChartSearch,
            });
        }
    }, [smartCrossWarkPlaceSelectConfig]);

    /** useEffect hook, 스마트 횡단 보도 개소 조회 이후
     *  1. 이벤트 목록 조회를 위한 초기 parameter 정의
     *  2. 개소 데이터를 이용한 select box 형태의 Select Option 데이터 가공
     */
    useEffect(() => {
        if (smartCrossWarkPlaceData) {
            const results = smartCrossWarkPlaceData.response.results;
            if (results && results.length > 0) {
                /** 이벤트 목록 조회를 위한 parameter 초기 설정 */
                setSmartCrossWarkEventParams({ ...smartCrossWarkEventParams, place_id: results[0].place_id });
                /** 검색 영역에 사용할 개소 select options 생성 */
                setSmartCrossWarkPlaceSelectConfig(
                    results.map((result: GetSmartCrossWarkPlaceResults) => {
                        return {
                            value: result.place_id,
                            label: result.place_name,
                        };
                    }),
                );
                /** 일별 이벤트 조회를 위한 parameter 설정 */
                setSmartCrossWarkDailyEventParams({ place_id: results[0].place_id });
            }
        }
    }, [smartCrossWarkPlaceData]);

    /** useEffect hook, 스마트 횡단 보도 이벤트 목록 조회 이후
     *  1. 이벤트 목록 조회 테이블 구성을 위한 데이터 및 헤더(컬럼 정보) 등에 대한 데이터 가공
     */
    useEffect(() => {
        if (smartCrossWarkEventData && smartCrossWarkEventData.code === 200) {
            const results = smartCrossWarkEventData.response.results;
            setSmartCrossWarkEventDataTableConfig({
                tableData: results,
                tableColumnConfig:
                    results.length > 0
                        ? Object.keys(results[0]).map((key: string) => {
                              return {
                                  column: key,
                                  columnName: key, // TODO: 한글명
                              };
                          })
                        : [],
                totalCount: smartCrossWarkEventData.response.totalCount,
            });
        }
    }, [smartCrossWarkEventData]);

    return (
        <PageContainer>
            <DataStatusPageContainer>
                <PageSubTitle text="보행자 주의 이벤트 목록" />
                {/** 스마트 횡단보도 이력 검색&필터 영역 */}
                <DataStatusTableSearchContainer>
                    {dateRangeSearchConfig && <DateRangeSearch dateRangeSearchConfig={dateRangeSearchConfig} />}
                </DataStatusTableSearchContainer>
                {/** 스마트 횡단보도 이력 data table 영역 */}
                <DataTableContainer>
                    {smartCrossWarkEventDataLoading ? (
                        <LoadingWrap>
                            <Loading size="sm" />
                        </LoadingWrap>
                    ) : (
                        smartCrossWarkEventDataTableConfig && (
                            <DataTable tableConfig={smartCrossWarkEventDataTableConfig} />
                        )
                    )}
                </DataTableContainer>
                <PageSubTitle text="일별 보행자주의 이벤트 (최근 24시간)" />
                {/** 스마트 횡단보도 chart 검색&필터 영역 */}
                <DataStatusChartSearchContainer>
                    {chartSearchConfig && <DataChartSearch chartSearchConfig={chartSearchConfig} />}
                </DataStatusChartSearchContainer>
                {/** 스마트 횡단보도 chart 영역 */}
                <DataStatusChartContainer>
                    {smartCrossWarkDailyEventDataLoading ? (
                        <LoadingWrap>
                            <Loading size="sm" />
                        </LoadingWrap>
                    ) : (
                        smartCrossWarkDailyEventData && (
                            <CommonChart chartData={smartCrossWarkDailyEventData.response.results} />
                        )
                    )}
                </DataStatusChartContainer>
            </DataStatusPageContainer>
            <TodoCurrentPageText>🚥 스마트 횡단보도 데이터 현황 page 컴포넌트 🖥️</TodoCurrentPageText>
        </PageContainer>
    );
};
