import React from 'react';
import {
    PopupTitle,
    PopUpWindow,
    CancelButton,
    FinalContainer,
    AutoContainer
} from 'styling/popUp';
import ColorButton from 'components/ColorButton';

const MatchedDeleteTasks = (props) => {
    const { finalMatched, setScreen, setPopUp, rawTaskList } = props;

    const getMatchedListItem = (el) => {
        return (
            <li>
                {el.id}
                {'   '}
                {el.task}
            </li>
        );
    };

    const getMatchedList = () => {
        return (
            <ul style={listStyle}>
                {rawTaskList.flatMap((el) =>
                    finalMatched.includes(el.id) ? [getMatchedListItem(el)] : []
                )}
            </ul>
        );
    };

    const listStyle = {
        height: 'auto',
        width: 'auto',
        maxHeight: '30vh',
        padding: '1rem',
        overflowY: 'scroll'
    };

    return (
        <PopUpWindow>
            <PopupTitle>Matched Delete Tasks</PopupTitle>
            <AutoContainer>{getMatchedList()}</AutoContainer>
            <FinalContainer>
                <ColorButton
                    text={'Back To Previous Screen'}
                    onClick={() => setScreen('main')}
                />
                <ColorButton
                    color={'#a00'}
                    text={`Delete ${finalMatched.length} Tasks`}
                    onClick={() => setScreen('confirm')}
                />
            </FinalContainer>
            <CancelButton onClick={() => setPopUp(null)}>×</CancelButton>
        </PopUpWindow>
    );
};

export default MatchedDeleteTasks;
