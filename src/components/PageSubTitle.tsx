import styled from "styled-components";

/** CommonButton component props interface */
interface PageSubTitleProps {
    /** 버튼에 표시 될 text */
    text: string;
}

/**
 * 공용 sub title 컴포넌트
 * @returns {JSX.Element}
 */
const PageSubTitle = (props: PageSubTitleProps): JSX.Element => {
    /** PageSubTitle props */
    const { text } = props;

    return (
        <PageSubTitleContainer>
            <h2>{text}</h2>
        </PageSubTitleContainer>
    );
};

const PageSubTitleContainer = styled.div`
    width: 100%;
    padding: 8px 8px 4px 8px;
    h2 {
        color: #fff;
        font-size: 13px;
    }
`;

export default PageSubTitle;
