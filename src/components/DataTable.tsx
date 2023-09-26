import { MAX_PAGE_NUMBERS_TO_SHOW, MAX_ROW_NUMBERS_TO_SHOW } from "../constants/common.constant";
import { dataTablePageNumberState } from "../services/state/table.state";
import { TanstackReactTable } from "../styles/table.style";

import DataTablePagination from "./DataTablePagination";

import { AccessorFn, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { AlertCircle } from "react-feather";
import { useRecoilState } from "recoil";
import styled from "styled-components";

/** DataTable component props interface */
interface DataTableProps<T> {
    /** 테이블 생성이 필요한 설정 정보 */
    tableConfig: {
        /** table 데이터 목록으로 표시될 데이터 배열, Generic Type */
        tableData: T[];
        /** table 헤더로 표시될 컬럼 설정 배열 */
        tableColumnConfig: { column: string; columnName: string }[];
        /** 전체 데이터의 갯수 */
        totalCount: number;
    };
}

/**
 * 데이터 테이블 컴포넌트
 * @returns {JSX.Element}
 */
const DataTable = <T extends object>(props: DataTableProps<T>): JSX.Element => {
    /** DataTable props */
    const { tableConfig } = props;

    /** 현재 data table 의 페이지 넘버 */
    const [dataTablePageNumber, setDataTablePageNumber] = useRecoilState(dataTablePageNumberState);

    /** 데이터 테이블 목록의 총 페이지 수 */
    const totalPages = Math.ceil(tableConfig.totalCount / MAX_ROW_NUMBERS_TO_SHOW);

    /**
     * 페이지네이션 페이지 변경 이벤트
     * @function handlePageChange
     * @param {number} selectedPage 페이지네이션에서 선택한 페이지 번호
     * @returns {void}
     */
    const handlePageChange = (selectedPage: number): void => {
        setDataTablePageNumber(selectedPage);
    };

    /** tanstack react table 의 컬럼 설정을 하기 위한 helper 객체 */
    const columnHelper = createColumnHelper<T>();
    const columns = tableConfig.tableColumnConfig.map((col: { column: string; columnName: string }) => {
        const columnKey = col.column as unknown as AccessorFn<T>;
        return columnHelper.accessor(columnKey, {
            header: col.columnName,
        });
    });

    /** tanstack react table 객체 */
    const tanstackReactTable = useReactTable({
        data: tableConfig.tableData,
        columns,
        enableColumnResizing: true,
        columnResizeMode: "onChange",
        getCoreRowModel: getCoreRowModel(),
    });

    /** 데이터가 보여질 row 수보다 적은 경우 empty div 추가 */
    const addEmptyRowsIfNeeded = Array(MAX_ROW_NUMBERS_TO_SHOW - tableConfig.tableData.length)
        .fill(0)
        .map((_, index) => {
            return <EmptyRow key={_ + index} />;
        });

    return (
        <>
            <TableWrap>
                <TanstackReactTable>
                    <thead>
                        {tanstackReactTable.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} style={{ position: "relative", width: header.getSize() }}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {tanstackReactTable.getRowModel().rows.length > 0 ? (
                            tanstackReactTable.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} style={{ width: cell.column.getSize() }}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <EmptyRow />
                        )}
                        {tableConfig.tableData.length < MAX_ROW_NUMBERS_TO_SHOW && addEmptyRowsIfNeeded}
                    </tbody>
                </TanstackReactTable>
                {tableConfig.tableData.length === 0 && (
                    <TableNoDataText>
                        <h1>
                            <AlertCircle />
                            데이터가 없습니다.
                        </h1>
                        <p>검색 조건을 다시 확인해 주세요.</p>
                    </TableNoDataText>
                )}
            </TableWrap>
            <DataTablePagination
                currentPage={dataTablePageNumber}
                totalPages={totalPages}
                totalCount={tableConfig.totalCount}
                onPageChange={handlePageChange}
                maxPageNumbersToShow={MAX_PAGE_NUMBERS_TO_SHOW}
            />
        </>
    );
};

const TableWrap = styled.div`
    position: relative;
    width: 100%;
`;

const TableNoDataText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    color: #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    letter-spacing: -1px;
    h1 {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 700;
    }
    p {
        font-size: 14px;
    }
`;

const EmptyRow = styled.tr`
    height: 32px;
`;

export default DataTable;
