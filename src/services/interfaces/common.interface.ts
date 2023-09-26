/** select(콤보 박스) 생성을 위한 설정 interface */
export interface SelectConfig {
    /** select 에서 선택한 검색 value */
    value: string | number | undefined;
    /** select 에서 선택한 검색 label */
    label: string | undefined;
}

/** 테이블 생성을 위한 설정 interface */
export interface TableConfig<T> {
    /** 테이블 목록으로 표시 될 데이터 목록 */
    tableData: T[];
    /** 테이블 헤더로 표시 될 컬럼 목록 */
    tableColumnConfig:
        | {
              column: string;
              columnName: string;
          }[]
        | [];
    /** 데이터의 총 row 갯수, paging 처리에 사용 */
    totalCount: number;
}

/** 데이터 테이블 상단, 검색 영역(기간 and 키워드)의 검색 데이터 interface  */
export interface DateRangeSearchData {
    /** 검색 시작 일자 */
    startDate: string;
    /** 검색 종료 일자 */
    endDate: string;
    /** 검색 키워드 입력 값 또는 선택 값 */
    keyword: string | number | undefined;
}

/** 이력 조회 데이터 테이블의 검색 영역 구성을 위한 설정 interface */
export interface DateRangeSearchConfig {
    /** 기간 검색인 date input 설정 */
    dataRangeConfig: {
        /** 검색 시작 일자 */
        startDate: string;
        /** 검색 종료 일자 */
        endDate: string;
    };
    /** 기간 검색 우측 검색 키워드가 될 select options 정보 */
    selectConfig: SelectConfig[];
    /** 검색 버튼 클릭 이벤트 핸들러 */
    handleDataTableSearch: (searchData: DateRangeSearchData) => void;
    /** 엑셀 다운로드 버튼 클릭 이벤트 핸들러 */
    handleDataTableExcelDownload?: () => void;
}

/** 차트 상단 검색 영역 (select)의 검색 대상 key 및 선택 option 데이터 interface  */
export interface ChartSearchSelectOption {
    /** 여러개의 select가 있는 경우 해당 select 의 선택 값을 통한 검색을 위한 parameter key 정보 */
    key: string;
    /** select 에서 선택한 item 의 options 정보 */
    selectOption: SelectConfig;
}

/** 차트 상단 검색 영역 내 select 구성을 위한 설정 interface */
export interface ChartSearchSelectConfig {
    /** 여러개의 select가 있는 경우 해당 select 의 선택 값을 통한 검색을 위한 parameter key 정보 */
    key: string;
    /** select 구성을 위한 option 정보 */
    selectConfig: SelectConfig[];
}

/** 차트 상단 검색 영역 구성을 위한 설정 interface */
export interface ChartSearchConfig {
    selectConfigs: ChartSearchSelectConfig[];
    handleChartSearch?: (chartSearchSelectOptions: ChartSearchSelectOption[]) => void;
}
