import styled from '@emotion/styled';

export const MainTitleContainer = styled.div`
    @keyframes title-container-margin-close {
        0% {
            margin: 4rem 0 7rem 0;
        }
        100% {
            margin: 0 0 0 0;
        }
    }
    position: relative;
    display: flex;
    height: auto;
    margin: 4rem 0 7rem 0;
    animation: title-container-margin-close 1.6s ease-in-out 3s 1 forwards;
`;

export const MainTitleText = styled.h1`
    @keyframes title-fade-in-out {
        0% {
            opacity: 0;
            transform: translateY(20%);
        }
        30% {
            opacity: 1;
            transform: translateY(0);
        }
        80% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-65%);
        }
    }
    @keyframes title-shine {
        0% {
            background-position: -100%;
        }
        100% {
            background-position: 200%;
        }
    }
    position: relative;
    font-size: 2.2rem;
    background: #fff -webkit-gradient(
            linear,
            left top,
            right top,
            from(${(props) => props.themeColor}),
            to(${(props) => props.themeColor}),
            color-stop(0.5, #fff)
        ) 0 0 no-repeat;
    -webkit-background-size: 250px;
    color: rgba(0, 0, 0, 0.3);
    -webkit-background-clip: text;
    opacity: 0;
    text-shadow: 0 0px 0px rgba(255, 255, 255, 0.2);
    animation: title-fade-in-out 3s ease-in-out 0.4s 1 forwards,
        title-shine 1s ease-in-out 1.7s 1 forwards;
    background-position: -300%;
    cursor: default;
    user-select: none;
`;
