import React, { useState } from 'react';
import MainBatchScreen from 'components/MainBatchScreen';
import DateTemplateWizard from 'components/DateTemplateWizard';
import TaskTemplateWizard from 'components/TaskTemplateWizard';
import { interpretDateTemplate } from 'processing/interpretDateTemplate';
import { interpretTaskTemplate } from 'processing/interpretTaskTemplate';
import { fetchPostEntry } from 'data/fetch';
import { parseDateObjToISO } from 'processing/parseDates';

const BatchNewTasks = (props) => {
	const { setDataChanged, setPopUp } = props;
	const [ errors, setErrors ] = useState({ task: '', date: '', deadline: '' });
	const [ template, setTemplate ] = useState({
		count: 10,
		task: 'Task_${n}',
		date: '${t}',
		deadline: '${t}+2w',
		urgency: 3,
		teams: [ 'Team1', 'Team2', 'Team3' ]
	});
	const [ screen, setScreen ] = useState('main');

	const getTaskEntry = (strings, i) => {
		const { task, date, deadline } = strings;
		return {
			task: task[i],
			date: parseDateObjToISO(date[i]),
			deadline: parseDateObjToISO(deadline[i]),
			urgency: template.urgency,
			teams: template.teams.filter((el) => el !== ''),
			completed: false
		};
	};

	const checkForTemplateErrors = (strings) => {
		const { task, date, deadline } = strings;
		return {
			...(typeof task === 'string' ? { task } : null),
			...(typeof date === 'string' ? { date } : null),
			...(typeof deadline === 'string' ? { deadline } : null)
		};
	};

	const getEntryStrings = () => {
		return {
			task: interpretTaskTemplate(template.task, template.count),
			date: interpretDateTemplate(template.date, template.count),
			deadline: interpretDateTemplate(template.deadline, template.count)
		};
	};

	const addMultipleTasks = () => {
		let strings = getEntryStrings();
		let errors = checkForTemplateErrors(strings);
		if (Object.values(errors).length === 0) {
			for (let i = 0; i < template.count; i++) {
				const entry = getTaskEntry(strings, i);
				fetchPostEntry(entry);
				setDataChanged(true);
				setPopUp(null);
			}
		} else setErrors(errors);
	};

	return (
		<div
			style={{
				position: 'absolute',
				height: '100vh',
				width: '100vw',
				top: '0',
				left: '0',
				opacity: '0',
				animation: 'popup-fade-in 1s cubic-bezier(.57,.82,.01,.82) 0.1s 1 forwards',
				zIndex: '10'
			}}
		>
			{screen === 'main' && (
				<MainBatchScreen
					errors={errors}
					setErrors={setErrors}
					template={template}
					setTemplate={setTemplate}
					addMultipleTasks={addMultipleTasks}
					setPopUp={setPopUp}
					setScreen={setScreen}
				/>
			)}
			{(screen === 'dateWizard' || screen === 'deadlineWizard') && (
				<DateTemplateWizard
					setScreen={setScreen}
					template={template}
					setTemplate={setTemplate}
					screen={screen}
				/>
			)}
			{screen === 'taskWizard' && (
				<TaskTemplateWizard setScreen={setScreen} template={template} setTemplate={setTemplate} />
			)}
		</div>
	);
};

export default BatchNewTasks;

// Task Template Options:

// '${n, 1/2/3/#, a/d}
// 'Number template:
// 'mainflag, Minimum digits, ascending/descending'

// '${l, a/d}
// 'Letter template:
// 'mainflag, ascending/descending'

// Examples:
// BackendTest_${n} => (BackendTest_1,BackendTest_2,BackendTest_3)
// FrontendTest_${n-1,3} => (FrontendTest_000,FrontendTest_001,FrontendTest_002)
// feature_${l,d} => (feature_z,feature_y,feature_x)

///////////////////////////////////////////////////////////////////////////////////////////////
