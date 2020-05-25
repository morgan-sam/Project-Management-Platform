import React from 'react';
import { getTaskBarHiddenStyle, getTaskBarVisibleStyle } from 'styling/taskBars';
import { dataInfoBarStyle } from 'styling/dataInfoBar';

const DataInfoBar = (props) => {
	const { displayedBars, rawTaskList, taskList, filterOptions } = props;

	const textBox = {
		padding: '1rem',
		margin: '1rem',
		border: '1px solid black'
	};

	const filterText = `Filter is ${filterOptions.active ? '' : 'not'} active`;
	const taskCountText = `Showing  ${taskList.length} out of ${rawTaskList.length} tasks in database`;

	return (
		<div>
			<div
				className="dataInfoBar"
				style={{
					...dataInfoBarStyle,
					...(displayedBars.dataInfo ? getTaskBarVisibleStyle(false) : getTaskBarHiddenStyle(false))
				}}
			>
				<div style={textBox}>{filterText}</div>
				<div style={textBox}>{taskCountText}</div>
			</div>
		</div>
	);
};

export default DataInfoBar;
