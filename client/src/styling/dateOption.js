import styled from '@emotion/styled';

export const DateOptionSlideContainer = styled.div`
    display: flex;
    justify-content: left;
    alignitems: center;
    border: 1px solid black;
    transition: 1s;
    position: relative;
    border-radius: 5px;

    overflow: ${(props) => (props.overflowHidden ? 'visible' : 'hidden')};

    ${(props) =>
        props.showDateSelect
            ? 'width: 18rem; height: 10rem;'
            : 'width: 7rem; height: 3rem;'}
`;

export const DateDisplayBox = styled.div`
    height: auto;
    padding: 0 0.5rem;
    text-align: center;
    user-select: none;
    cursor: pointer;
    transition: 1s;

    position: absolute;
    top: 50%;
    z-index: 5;
    ${(props) =>
        props.showDateSelect
            ? `left: 0%;
            transform: translate(-150%,-50%);
            opacity: 0;`
            : `left: 50%;
            transform: translate(-50%, -50%);
            opacity: 1;`};
`;

export const DateSelectConfirmContainer = styled.div`
    transition: 1s;
    position: absolute;
    top: 50%;
    z-index: 3;

    ${(props) =>
        props.showDateSelect
            ? 'left: 50%; transform: translate(-50%,-50%); opacity: 1;'
            : 'left: 0%; transform: translate(100%,-50%); opacity: 0;'}
`;

export const CanConContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 0.75rem;
    transition: 0.5s;
`;

export const DateSelectButton = styled.button`
    margin: 0.5rem;
    height: 2.2rem;
    width: 2.2rem;
    box-shadow: 1px 1px 1px 1px #ddd;
    color: #eee;
    font-size: 2rem;
    font-weight: bold;
    -webkit-text-stroke: 0.7px #222;
    display: flex;
    justify-content: center;
    line-height: 1.72rem;
    outline: none;
    user-select: none;
    cursor: pointer;
    border-radius: 5px;
    ${(props) =>
        props.cancel && 'background-color: #ff9999; border: 3px solid #ff8080;'}
    ${(props) =>
        props.confirm &&
        'background-color: #b3ff99; border: 3px solid #99ff99;'}
`;
