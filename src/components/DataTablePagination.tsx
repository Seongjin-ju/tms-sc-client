import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "react-feather";
import styled from "styled-components";

/** DataTablePagination component Props interface */
interface DataTablePaginationProps {
    /** 현재 페이지 */
    currentPage: number;
    /** 전체 페이지 */
    totalPages: number;
    /** 페이지네이션 페이지 변경 이벤트 함수 */
    onPageChange: (page: number) => void;
    /** 한번에 보여줄 페이지의 수 */
    maxPageNumbersToShow: number;
    /** 전체 데이터의 갯수 */
    totalCount: number;
}

/**
 * 데이터 테이블의 페이징 처리 컴포넌트
 * @returns {JSX.Element}
 */
const DataTablePagination = (props: DataTablePaginationProps): JSX.Element => {
    /** DataTablePagination props */
    const { currentPage, totalPages, onPageChange, maxPageNumbersToShow, totalCount } = props;

    /** 시작 페이지 */
    const startPage = Math.min(
        Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2)),
        totalPages - maxPageNumbersToShow + 1,
    );
    /** 끝 페이지 */
    const endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

    /** 보여줄 페이지 계산 처리 */
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    /**
     * 페이지네이션 페이지 변경 이벤트
     * @async
     * @function handlePageChange
     * @param {number} selectedPage 페이지네이션에서 선택한 페이지 번호
     * @returns {void}
     */
    const handlePageChange = (selectedPage: number): void => {
        onPageChange(selectedPage);
    };

    return (
        <PaginationContainer>
            <PaginationNav>
                <PaginationList>
                    <PaginationItem
                        $isButton
                        $isDisabled={currentPage === 1 ? true : false}
                        onClick={() => handlePageChange(1)}
                    >
                        <ChevronsLeft />
                    </PaginationItem>
                    <PaginationItem
                        $isButton
                        $isDisabled={currentPage === 1 ? true : false}
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    >
                        <ChevronLeft />
                    </PaginationItem>
                    {totalPages > 0 ? (
                        pageNumbers.map((page, index) => (
                            <PaginationItem
                                key={index}
                                $isActive={page === currentPage}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </PaginationItem>
                        ))
                    ) : (
                        <PaginationItem key="-">-</PaginationItem>
                    )}
                    <PaginationItem
                        $isButton
                        $isDisabled={currentPage === totalPages ? true : false}
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    >
                        <ChevronRight />
                    </PaginationItem>
                    <PaginationItem
                        $isButton
                        $isDisabled={currentPage === totalPages ? true : false}
                        onClick={() => handlePageChange(totalPages)}
                    >
                        <ChevronsRight />
                    </PaginationItem>
                </PaginationList>
            </PaginationNav>
            <PaginationTotalCountContainer>
                <strong>총 {totalCount.toLocaleString()} 건</strong>
            </PaginationTotalCountContainer>
        </PaginationContainer>
    );
};

const PaginationContainer = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px 0;
`;

const PaginationNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PaginationList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    gap: 4px;
`;

const PaginationItem = styled.li<{ $isActive?: boolean; $isButton?: boolean; $isDisabled?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 28px;
    color: #888;
    font-size: 15px;
    cursor: pointer;
    ${props => props.$isButton && "border: 1px solid #5c5c5c; background: hsla(0, 0%, 100%, 0.18);"}
    ${props => props.$isActive && "color: #3080d0; text-decoration: underline;"}
    ${props => props.$isDisabled && "cursor: not-allowed; pointer-events: none; opacity: 0.5;"}
`;

const PaginationTotalCountContainer = styled.div`
    position: absolute;
    right: 0;
    margin-bottom: 2px;
    strong {
        color: #f3f3f3;
        font-size: 13px;
        font-weight: 400;
        margin-right: 8px;
    }
`;

export default DataTablePagination;
