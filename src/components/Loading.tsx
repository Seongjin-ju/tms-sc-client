import { CSSProperties } from "react";

import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

/** Loading component props interface */
interface LoadingProps {
    size: "sm" | "md" | "lg";
}

/**
 * 공용 Loading 컴포넌트
 * @returns {JSX.Element}
 */
const Loading = (props: LoadingProps): JSX.Element => {
    const { size } = props;

    /**
     * props 로 전달 받은 사이즈에 따른 width, height 크기 반환
     * @async
     * @function getSizeStyles
     * @returns {CSSProperties}
     */
    const getSizeStyles = (): CSSProperties => {
        switch (size) {
            case "sm":
                return {
                    width: "50px",
                    height: "50px",
                };
            case "md":
                return {
                    width: "100px",
                    height: "100px",
                };
            case "lg":
                return {
                    width: "150px",
                    height: "150px",
                };
            default:
                return {
                    width: "50px",
                    height: "50px",
                };
        }
    };

    const override = getSizeStyles();

    return (
        <LoadingWrapper>
            <ClipLoader color="#28acfc" cssOverride={override} />
        </LoadingWrapper>
    );
};

const LoadingWrapper = styled.div`
    background: #1d2329;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
`;

export default Loading;
