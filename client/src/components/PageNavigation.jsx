import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

const PageNavigation = (props) => {
    const history = useHistory();
    const {
        currentPage,
        setCurrentPage,
        currentPageComplete,
        totalPages
    } = props;

    const NavigationContainer = styled.div`
        display: 'flex';
        align-items: 'center';
        margin: 1rem;
    `;

    const NavigateButton = styled.button`
        position: relative;
        outline: none;
        padding: 1rem;
        border: none;
        border-radius: 0.2rem;
        cursor: pointer;
        width: 10rem;
        margin: 0.5rem;
        font-size: 1rem;
        font-weight: bold;
        ${(props) =>
            props.primary &&
            `background: none;
        color: black;
        mix-blend-mode: screen;
        &:before {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: white;
            content: '';
            mix-blend-mode: color-burn;
            border-radius: 0.2rem;
        }`}
        ${(props) =>
            props.secondary &&
            `
            background: transparent;
            border: 1px solid white;
            color: white;
        `}
    `;

    const handleLoginClick = () => history.push('/login');

    return (
        <NavigationContainer>
            {currentPage > 0 ? (
                <NavigateButton
                    secondary
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </NavigateButton>
            ) : (
                <NavigateButton secondary onClick={handleLoginClick}>
                    Log In
                </NavigateButton>
            )}
            {currentPage < totalPages - 1 ? (
                <NavigateButton
                    primary
                    enabled={
                        currentPageComplete && currentPage < totalPages - 1
                    }
                    onClick={() =>
                        currentPageComplete && currentPage < totalPages - 1
                            ? setCurrentPage(currentPage + 1)
                            : null
                    }
                >
                    {currentPage > 0 ? 'Next' : 'Get Started'}
                </NavigateButton>
            ) : (
                <NavigateButton primary onClick={() => null}>
                    {'Sign Up'}
                </NavigateButton>
            )}
        </NavigationContainer>
    );
};

export default PageNavigation;
