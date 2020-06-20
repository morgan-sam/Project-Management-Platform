import React from 'react';
import DropdownWithLabel from 'components/DropdownWithLabel';
import InputFormWithLabel from 'components/InputFormWithLabel';
import WizardButton from 'components/WizardButton';
import ColorButton from 'components/ColorButton';
import {
	titleStyle,
	topContainerStyle,
	popUpWindowStyle,
	subContainerStyle,
	cancelButtonStyle,
	errorMatchTextStyle,
	topRowStyle,
	finalContainerStyle
} from 'styling/popUp';

const MainBatchScreen = (props) => {
	const { template, errors, setErrors, setTemplate, addMultipleTasks, setPopUp, setScreen } = props;

	return (
		<div style={topContainerStyle}>
			<div style={popUpWindowStyle}>
				<div style={titleStyle}>Batch New Tasks</div>
				<div style={subContainerStyle}>
					<InputFormWithLabel
						{...props}
						label={'Number Of Tasks'}
						onChange={(val) => setTemplate({ ...template, count: parseInt(val) })}
						default={template.count ? template.count : 0}
					/>
				</div>
				<div style={subContainerStyle}>
					<div style={topRowStyle}>
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
					</div>
					<div style={errorMatchTextStyle}>{errors.task}</div>
				</div>
				<div style={subContainerStyle}>
					<div style={topRowStyle}>
						<InputFormWithLabel
							{...props}
							style={null}
							label={'Date Template'}
							onChange={(val) => {
								let filtered = val.replace(/[^a-zA-Z0-9\{\}\$\+\-\(\)\/]/g, '');
								setTemplate({ ...template, date: filtered });
								setErrors({ ...errors, date: null });
							}}
							default={template.date}
						/>
						<WizardButton onClick={() => setScreen('dateWizard')} />
					</div>
					<div style={errorMatchTextStyle}>{errors.date}</div>
				</div>
				<div style={subContainerStyle}>
					<div style={topRowStyle}>
						<InputFormWithLabel
							{...props}
							style={null}
							label={'Deadline Template'}
							onChange={(val) => {
								let filtered = val.replace(/[^a-zA-Z0-9\{\}\$\+\-\(\)\/]/g, '');
								setTemplate({ ...template, deadline: filtered });
								setErrors({ ...errors, deadline: null });
							}}
							default={template.deadline}
						/>
						<WizardButton onClick={() => setScreen('deadlineWizard')} />
					</div>
					<div style={errorMatchTextStyle}>{errors.deadline}</div>
				</div>
				<div style={{ zIndex: '10' }}>
					<DropdownWithLabel
						{...props}
						label={'Urgency'}
						options={[ 1, 2, 3, 4, 5 ]}
						selected={template.urgency}
						onClick={(val) => setTemplate({ ...template, urgency: val })}
						width={'2rem'}
					/>
				</div>
				<div style={subContainerStyle}>
					<InputFormWithLabel
						{...props}
						label={'Teams'}
						onChange={(val) => {
							const array = val.split(' ');
							setTemplate({ ...template, teams: array });
						}}
						default={`${template.teams.join(' ')}`}
					/>
				</div>
				<div style={finalContainerStyle}>
					<ColorButton text={'Add Tasks'} onClick={() => addMultipleTasks()} />
				</div>
				<button style={cancelButtonStyle} onClick={() => setPopUp(null)}>
					×
				</button>
			</div>
		</div>
	);
};

export default MainBatchScreen;