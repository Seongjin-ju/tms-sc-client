import { GetSmartCrossWarkDailyEventResults } from "../services/interfaces/smartCrossWark.interface";

/** CommonChart component props interface */
interface CommonButtonProps {
    /** test */
    chartData: GetSmartCrossWarkDailyEventResults[];
}

/**
 * 공용 차트 컴포넌트
 * @returns {JSX.Element}
 */
const CommonChart = (props: CommonButtonProps): JSX.Element => {
    const { chartData } = props;
    return (
        <div>
            {`차트 데이터 검색 시간: ${new Date()}`}
            <br />
            <pre>{JSON.stringify(chartData, null, 4)}</pre>
        </div>
    );
};

export default CommonChart;
