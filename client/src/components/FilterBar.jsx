import React, { useState } from 'react';
import FilterToggle from 'components/FilterToggle';
import ResetFilterBtn from 'components/ResetFilterBtn';
import DateRangeSelect from 'components/DateRangeSelect';
import UrgencyRangeSelect from 'components/UrgencyRangeSelect';
import CompletionSelect from 'components/CompletionSelect';
import DropdownCheckboxes from 'components/DropdownCheckboxes';
import { filterBarStyle, filterBarItemStyle } from 'styling/filterBar';
import { parseISOToDateObj } from 'processing/parseDates';
import { newTaskBarStyle, getTaskBarHiddenStyle, getTaskBarVisibleStyle, addTaskBtn } from 'styling/newTaskBar';

const FilterBar = (props) => {
	const { taskListTeams, filterOptions, setFilterOptions, displayedBars } = props;
	const [ dropdownsOpen, setDropdownsOpen ] = useState({
		date: false,
		urgency: false,
		teams: false,
		completion: false
	});
	const [ popUpOpen, setPopUpOpen ] = useState(false);

	return (
		<div
			className="filterBar"
			style={{
				...filterBarStyle,
				...(displayedBars.filter ? getTaskBarVisibleStyle(popUpOpen) : getTaskBarHiddenStyle(popUpOpen)),
				overflow: Object.values(dropdownsOpen).includes(true) ? 'visible' : 'hidden'
			}}
		>
			<FilterToggle {...props} style={filterBarItemStyle} />
			<ResetFilterBtn {...props} style={filterBarItemStyle} />
			<DateRangeSelect
				{...props}
				style={filterBarItemStyle}
				date={parseISOToDateObj(props.filterOptions.date)}
				deadline={parseISOToDateObj(props.filterOptions.deadline)}
				setDate={(val) =>
					props.setFilterOptions({
						...props.filterOptions,
						date: val
					})}
				setDeadline={(val) =>
					props.setFilterOptions({
						...props.filterOptions,
						deadline: val
					})}
				setOverflowHidden={(val) => setDropdownsOpen({ ...dropdownsOpen, date: val })}
				setPopUpOpen={setPopUpOpen}
			/>
			<UrgencyRangeSelect
				{...props}
				style={filterBarItemStyle}
				setOverflowHidden={(val) => setDropdownsOpen({ ...dropdownsOpen, urgency: val })}
			/>
			<DropdownCheckboxes
				label={'Teams'}
				onClick={(val) => {
					console.log(filterOptions.teams);
					let newState = filterOptions.teams.filter((el) => el !== 'all');
					if (val === 'all') newState = [ 'all' ];
					else if (newState.includes(val)) newState = newState.filter((el) => el !== val);
					else newState.push(val);
					if (newState.length === 0) newState = [ 'all' ];
					setFilterOptions({ ...filterOptions, teams: newState });
				}}
				options={taskListTeams}
				filterOptions={filterOptions}
				selected={filterOptions.teams}
				style={{ ...filterBarItemStyle, width: '8rem', zIndex: '10' }}
				onOpenChange={(val) => setDropdownsOpen({ ...dropdownsOpen, teams: val })}
			/>
			<CompletionSelect
				{...props}
				style={filterBarItemStyle}
				setOverflowHidden={(val) => setDropdownsOpen({ ...dropdownsOpen, completion: val })}
			/>
		</div>
	);
};

export default FilterBar;
