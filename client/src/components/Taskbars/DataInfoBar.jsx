import React from 'react';
import { dataInfoItemStyle, Taskbar } from 'styling/taskBars';
import { getBoundaryDates } from 'data/dates';
import { parseISOToLittleEndian } from 'processing/dates';

const DataInfoBar = (props) => {
    const { displayedBars, rawTaskList, taskList, filterOptions } = props;

    const getDateRangeText = () => {
        if (taskList.length) {
            const boundaryDates = getBoundaryDates(taskList);
            return `Date Range: ${parseISOToLittleEndian(
                boundaryDates.date
            )} to ${parseISOToLittleEndian(boundaryDates.deadline)}`;
        } else return 'No Data';
    };

    const filterText = `Filter is ${filterOptions.active ? '' : 'not'} active`;
    const taskCountText = `Showing  ${taskList.length} out of ${rawTaskList.length} tasks in database`;

    return (
        <Taskbar
            className="dataInfoBar"
            visible={displayedBars.dataInfo}
            style={{
                overflow: 'hidden',
                alignItems: 'stretch'
            }}
        >
            <div style={dataInfoItemStyle}>{filterText}</div>
            <div style={dataInfoItemStyle}>{taskCountText}</div>
            <div style={dataInfoItemStyle}>{getDateRangeText()}</div>
        </Taskbar>
    );
};

export default DataInfoBar;