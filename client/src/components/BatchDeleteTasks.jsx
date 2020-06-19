import React, { useState, useEffect } from 'react';
import {
	titleStyle,
	popUpPositionStyle,
	topContainerStyle,
	popUpWindowStyle,
	cancelButtonStyle,
	errorMatchTextStyle,
	topRowStyle,
	finalContainerStyle,
	dateTopContainer,
	dateRangeContainer,
	dateContainer,
	dateLabel,
	autoContainerStyle
} from 'styling/popUp';
import ColorButton from 'components/ColorButton';
import MatchType from 'components/MatchType';
import InputFormWithLabel from 'components/InputFormWithLabel';
import DateSelect from 'components/DateSelect';
import UrgencyRangeSelect from 'components/UrgencyRangeSelect';
import Dropdown from 'components/Dropdown';
import { parseISOToDateObj, parseDateObjToISO, stripISODateOfTime } from 'processing/dates';
import {
	filterListDate,
	filterListDeadline,
	filterListMinUrgency,
	filterListMaxUrgency,
	filterListTeams,
	filterListCompletion
} from 'processing/filterList';
import { getBoundaryDates } from 'data/dates';
import { getCommonElements } from 'processing/utility';
import { formatTeamsDropdownSelect } from 'processing/teams';
import { getTaskListTeams } from 'processing/teams';

const BatchDeleteTasks = (props) => {
	const { setDataChanged, setPopUp, rawTaskList } = props;

	const boundaryDates = getBoundaryDates(rawTaskList);
	const [ template, setTemplate ] = useState({
		task: '',
		date: stripISODateOfTime(boundaryDates.date),
		deadline: stripISODateOfTime(boundaryDates.deadline),
		urgency: { min: 1, max: 5 },
		teams: [ 'all' ],
		teamMatch: 'AND',
		completion: 'all'
	});
	const [ matched, setMatched ] = useState({ task: [], dateRange: [], urgency: [] });

	useEffect(
		() => {
			const taskMatches = getTaskMatches(template.task);
			const dateRangeMatches = getDateRangeMatches(template);
			const urgencyMatches = getUrgencyMatches(template);
			const teamMatches = filterListTeams(template, rawTaskList);
			const completionMatches = filterListCompletion(template, rawTaskList);
			setMatched({
				task: taskMatches,
				dateRange: dateRangeMatches,
				urgency: urgencyMatches,
				teams: teamMatches,
				completion: completionMatches
			});
		},
		[ template ]
	);

	const getTaskMatches = (regex) => {
		if (regex.length === 0) return '';
		else {
			try {
				const reg = new RegExp(regex);
				const filtered = props.rawTaskList.filter((el) => {
					return el.task.match(reg);
				});
				return filtered;
			} catch (error) {
				return 'Invalid Regex';
			}
		}
	};

	const getDateRangeMatches = (template) => {
		const datesMatchIDs = filterListDate(template, rawTaskList).map((el) => el.id);
		const deadlinesMatchIDs = filterListDeadline(template, rawTaskList).map((el) => el.id);
		const matchIDs = getCommonElements(datesMatchIDs, deadlinesMatchIDs);
		return rawTaskList.filter((el) => matchIDs.includes(el.id));
	};

	const getUrgencyMatches = (template) => {
		const minMatchIDs = filterListMinUrgency(template, rawTaskList).map((el) => el.id);
		const maxMatchIDs = filterListMaxUrgency(template, rawTaskList).map((el) => el.id);
		const matchIDs = getCommonElements(minMatchIDs, maxMatchIDs);
		return rawTaskList.filter((el) => matchIDs.includes(el.id));
	};

	return (
		<div style={popUpPositionStyle}>
			<div style={topContainerStyle}>
				<div style={popUpWindowStyle}>
					<div style={titleStyle}>Batch Delete Tasks</div>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							gridTemplateRows: 'repeat(2, 1fr)',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: '2rem',
							zIndex: '22'
						}}
					>
						<InputFormWithLabel
							label={'Task Regex'}
							onChange={(val) => setTemplate({ ...template, task: val })}
							default={template.task}
						/>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'row'
							}}
						>
							<div>Completion: </div>
							<Dropdown
								onClick={(val) => {
									setTemplate({
										...template,
										completion: val
									});
								}}
								options={[ 'all', 'complete', 'incomplete' ]}
								filterOptions={template}
								selected={template.completion}
								style={{ width: '8rem', zIndex: '21', margin: '1rem' }}
							/>
						</div>
						<div
							style={{
								color: 'rgb(193, 45, 41)',
								fontSize: '0.8rem',
								height: '1rem',
								textAlign: 'center'
							}}
						>
							{typeof matched.task === 'string' ? (
								matched.task
							) : (
								`${matched.task.length}/${rawTaskList.length} Name Matches`
							)}
						</div>
						<div
							style={{
								color: 'rgb(193, 45, 41)',
								fontSize: '0.8rem',
								height: '1rem',
								textAlign: 'center'
							}}
						>
							{template.completion.includes('all') ? (
								''
							) : (
								`${matched.completion.length}/${rawTaskList.length} Completion Matches`
							)}
						</div>
					</div>
					<div style={dateTopContainer}>
						<div style={dateRangeContainer}>
							<div style={dateContainer}>
								<div style={dateLabel}>Date:</div>
								<DateSelect
									style={{ zIndex: '20' }}
									date={parseISOToDateObj(template.date)}
									setDate={(val) =>
										setTemplate({
											...template,
											date: parseDateObjToISO(val)
										})}
								/>
								<ColorButton
									text={'Reset To First Date'}
									onClick={() =>
										setTemplate({ ...template, date: stripISODateOfTime(boundaryDates.date) })}
								/>
							</div>
							<div style={dateContainer}>
								<div style={dateLabel}>Deadline:</div>
								<DateSelect
									style={{ zIndex: '20' }}
									date={parseISOToDateObj(template.deadline)}
									setDate={(val) => {
										setTemplate({
											...template,
											deadline: parseDateObjToISO(val)
										});
									}}
								/>
								<ColorButton
									text={'Reset To Last Deadline'}
									onClick={() =>
										setTemplate({
											...template,
											deadline: stripISODateOfTime(boundaryDates.deadline)
										})}
								/>
							</div>
						</div>
						<div style={errorMatchTextStyle}>
							{matched.dateRange.length === rawTaskList.length ? (
								''
							) : (
								`${matched.dateRange.length}/${rawTaskList.length} Date Range Matches`
							)}
						</div>
					</div>
					<div style={{ display: 'flex' }}>
						<div style={autoContainerStyle}>
							<UrgencyRangeSelect
								style={{
									display: 'flex',
									zIndex: '20',
									padding: '1rem'
								}}
								urgency={template.urgency}
								onChange={(min, max) => setTemplate({ ...template, urgency: { min, max } })}
							/>
							<div style={errorMatchTextStyle}>
								{matched.urgency.length === rawTaskList.length ? (
									''
								) : (
									`${matched.urgency.length}/${rawTaskList.length} Urgency Matches`
								)}
							</div>
						</div>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Dropdown
								type={'checkbox'}
								label={'Teams'}
								onClick={(val) => {
									setTemplate({
										...template,
										teams: formatTeamsDropdownSelect(val, template)
									});
								}}
								options={getTaskListTeams(rawTaskList)}
								filterOptions={template}
								selected={template.teams}
								style={{ width: '8rem', zIndex: '18', margin: '1rem' }}
							/>
							<div style={{ display: 'flex', flexDirection: 'column', width: '8rem' }}>
								<MatchType
									default={template.teamMatch}
									onChange={(val) => setTemplate({ ...template, teamMatch: val })}
								/>
								<div style={{ color: 'rgb(193, 45, 41)', fontSize: '0.8rem', height: '1rem' }}>
									{template.teams.includes('all') ? (
										''
									) : (
										`${matched.teams.length}/${rawTaskList.length} Team Matches`
									)}
								</div>
							</div>
						</div>
					</div>
					<div style={finalContainerStyle}>
						<ColorButton color={'#a00'} text={'Delete Tasks'} onClick={() => null} />
					</div>
					<button style={cancelButtonStyle} onClick={() => setPopUp(null)}>
						×
					</button>
				</div>
			</div>
		</div>
	);
};

export default BatchDeleteTasks;
