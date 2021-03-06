import React from 'react';
import DropdownWithLabel from 'components/DropdownWithLabel';
import InputFormWithLabel from 'components/InputFormWithLabel';
import WizardButton from 'components/WizardButton';
import ColorButton from 'components/ColorButton';
import {
    PopupTitle,
    PopUpWindow,
    SubContainer,
    CancelButton,
    ErrorMatchText,
    TopRow,
    FinalContainer
} from 'styling/popUp';

const MainBatchScreen = (props) => {
    const {
        template,
        errors,
        setErrors,
        setTemplate,
        addMultipleTasks,
        setPopUp,
        setScreen
    } = props;

    return (
        <PopUpWindow>
            <PopupTitle>Batch New Tasks</PopupTitle>
            <SubContainer>
                <InputFormWithLabel
                    {...props}
                    label={'Number Of Tasks'}
                    onChange={(val) =>
                        setTemplate({ ...template, count: parseInt(val) })
                    }
                    default={template.count ? template.count : 0}
                />
            </SubContainer>
            <SubContainer>
                <TopRow>
                    <InputFormWithLabel
                        {...props}
                        style={null}
                        label={'Task Template'}
                        onChange={(val) => {
                            setTemplate({ ...template, task: val });
                            setErrors({ ...errors, task: null });
                        }}
                        default={template.task}
                    />
                    <WizardButton onClick={() => setScreen('taskWizard')} />
                </TopRow>
                <ErrorMatchText>{errors.task}</ErrorMatchText>
            </SubContainer>
            <SubContainer>
                <TopRow>
                    <InputFormWithLabel
                        {...props}
                        style={null}
                        label={'Date Template'}
                        onChange={(val) => {
                            let filtered = val.replace(
                                /[^a-zA-Z0-9\{\}\$\+\-\(\)\/]/g,
                                ''
                            );
                            setTemplate({ ...template, date: filtered });
                            setErrors({ ...errors, date: null });
                        }}
                        default={template.date}
                    />
                    <WizardButton onClick={() => setScreen('dateWizard')} />
                </TopRow>
                <ErrorMatchText>{errors.date}</ErrorMatchText>
            </SubContainer>
            <SubContainer>
                <TopRow>
                    <InputFormWithLabel
                        {...props}
                        style={null}
                        label={'Deadline Template'}
                        onChange={(val) => {
                            let filtered = val.replace(
                                /[^a-zA-Z0-9\{\}\$\+\-\(\)\/]/g,
                                ''
                            );
                            setTemplate({ ...template, deadline: filtered });
                            setErrors({ ...errors, deadline: null });
                        }}
                        default={template.deadline}
                    />
                    <WizardButton onClick={() => setScreen('deadlineWizard')} />
                </TopRow>
                <ErrorMatchText>{errors.deadline}</ErrorMatchText>
            </SubContainer>
            <div style={{ zIndex: '10' }}>
                <DropdownWithLabel
                    {...props}
                    label={'Urgency'}
                    options={[1, 2, 3, 4, 5]}
                    selected={template.urgency}
                    onClick={(val) =>
                        setTemplate({ ...template, urgency: val })
                    }
                    width={2}
                />
            </div>
            <SubContainer>
                <InputFormWithLabel
                    {...props}
                    label={'Teams'}
                    onChange={(val) => {
                        const array = val.split(' ');
                        setTemplate({ ...template, teams: array });
                    }}
                    default={`${template.teams.join(' ')}`}
                />
            </SubContainer>
            <FinalContainer>
                <ColorButton
                    text={'Add Tasks'}
                    onClick={() => addMultipleTasks()}
                />
            </FinalContainer>
            <CancelButton onClick={() => setPopUp(null)}>×</CancelButton>
        </PopUpWindow>
    );
};

export default MainBatchScreen;
