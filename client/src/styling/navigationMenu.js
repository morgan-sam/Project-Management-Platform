import { getGradientTextColor } from 'styling/theme';

export const BOX_WIDTH_REM = 8;
export const BOX_HEIGHT_REM = 2;
export const BOX_BORDER_WIDTH_PX = 1;

export const getParentContainer = (menuCount) => {
    return {
        width: `${menuCount * BOX_WIDTH_REM}rem`,
        height: `${BOX_HEIGHT_REM}rem`,
        position: 'relative',
        display: 'block',
        overflow: 'visible',
        zIndex: '10'
    };
};

export const getBoxStyle = (buttonState, themeColor) => {
    const { hovered, enabled, boxColor } = buttonState;
    let backgroundColor = 'white';
    let color = 'black';
    let cursor = 'pointer';
    if (enabled === false) {
        color = '#ccc';
        cursor = 'not-allowed';
    } else if (boxColor) {
        color = getGradientTextColor(boxColor);
        backgroundColor = boxColor;
    } else if (hovered) {
        color = getGradientTextColor(themeColor);
        backgroundColor = themeColor;
    }
    return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: boxColor && hovered ? 'underline' : 'none',
        position: 'absolute',
        textAlign: 'center',
        borderTop: `${BOX_BORDER_WIDTH_PX}px solid black`,
        borderLeft: `${BOX_BORDER_WIDTH_PX}px solid black`,
        borderRight: `${BOX_BORDER_WIDTH_PX}px solid black`,
        borderBottom: `${BOX_BORDER_WIDTH_PX}px solid black`,
        height: `${BOX_HEIGHT_REM}rem`,
        width: `${BOX_WIDTH_REM}rem`,
        zIndex: '10',
        boxSizing: 'border-box',
        userSelect: 'none',
        fontSize: '0.75rem',
        backgroundColor,
        color,
        cursor
    };
};
