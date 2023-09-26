import styled from "styled-components";

export const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #d5d5d5;
    overflow: hidden;
    padding: 16px;
`;

export const MonitoringPageContainer = styled(PageContainer)`
    padding: 0;
`;

export const LoadingWrap = styled.div`
    width: 100%;
    height: 384.5px;
`;

/** TODO: 삭제 예정 */
export const TodoCurrentPageText = styled.div`
    position: absolute;
    bottom: 20px;
    transform: translateX(-50%);
    left: 50%;
    z-index: 9999;
    background: #000;
    color: #fff;
    padding: 16px;
`;

export const DataStatusPageContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #1d2329;
    display: flex;
    flex-direction: column;
`;

export const DataStatusTableSearchContainer = styled.div`
    min-height: 50px;
    display: flex;
`;

export const DataTableContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
`;

export const DataStatusChartSearchContainer = styled.div`
    min-height: 50px;
    display: flex;
`;

export const DataStatusChartContainer = styled.div`
    width: 100%;
    height: 100%;
    background: #ee7809;
    display: flex;
    flex-direction: column;
    div {
        flex: 1;
        width: 100%;
        height: 100%;
    }
`;
