import styled from "styled-components";

/** CommonButton component props interface */
interface CommonButtonProps {
    /** 버튼에 표시 될 text */
    text: string;
    /** 버튼 클릭 이벤트 */
    onClick: () => void;
}

/**
 * 공용 버튼 컴포넌트
 * @returns {JSX.Element}
 */
const CommonButton = (props: CommonButtonProps): JSX.Element => {
    /** Button props */
    const { text, onClick } = props;

    return (
        <SearchButton title={text} aria-label={text} onClick={onClick}>
            {text}
        </SearchButton>
    );
};

const SearchButton = styled.button`
    background: #0f7acb;
    border-color: #0f7acb;
    color: #fff;
    display: inline-block;
    min-width: 60px;
    padding: 0 16px;
    height: 28px;
    line-height: 26px;
    font-size: 14px !important;
    box-sizing: border-box;
    text-align: center;
    vertical-align: top;
    position: relative;
    border-radius: 0;
    cursor: pointer;
    &:hover {
        background: #28acfc;
        border-color: #28acfc;
    }
    &:active {
        transform: translateY(1px);
    }
`;

export default CommonButton;
