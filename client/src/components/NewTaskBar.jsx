import React, { useState, useRef, useEffect } from 'react';
import { newTaskBarStyle } from 'styling/newTaskBar';
import TaskNameInput from './TaskNameInput';
import DateRangeSelect from 'components/DateRangeSelect';
import { parseISOToDateObj } from 'processing/parseDates';

const NewTaskBar = (props) => {
	const [ overflowHidden, setOverflowHidden ] = useState(true);
	const NewTaskBarElement = useRef();
	const [ elHeight, setElHeight ] = useState(0);
	const [ popUpOpen, setPopUpOpen ] = useState(false);

	const smallOpenTransition = 'max-height 1s cubic-bezier(.23,.52,.53,.74)';
	const smallCloseTransition = 'max-height .8s cubic-bezier(.27,.97,.36,.96)';

	const largeCloseTransition = 'max-height 1s cubic-bezier(.41,.49,.23,.93)';
	const largeOpenTransition = 'max-height 0.7s cubic-bezier(.38,.03,.23,.93)';

	const taskBarHidden = {
		opacity: '0',
		maxHeight: '0',
		zIndex: '-10',
		//executes on task bar close
		transition: `${popUpOpen
			? largeCloseTransition
			: smallCloseTransition}, opacity 1s cubic-bezier(0,1.06,.62,.99)`
	};

	const taskBarVisible = {
		maxHeight: '11rem',
		opacity: '1',
		//executes on task bar open
		transition: `${popUpOpen ? largeOpenTransition : smallOpenTransition}, opacity 1s`
	};

	const [ date, setDate ] = useState('2013-03-10T02:00:00Z');
	const [ deadline, setDeadline ] = useState('2013-03-10T02:00:00Z');

	return (
		<div>
			<div
				ref={NewTaskBarElement}
				classname="newTaskBar"
				style={{
					...props.style,
					...newTaskBarStyle,
					...(props.displayNewTaskBar ? taskBarHidden : taskBarVisible),
					overflow: overflowHidden ? 'visible' : 'hidden'
				}}
			>
				{/* {elHeight} */}
				<TaskNameInput {...props} />
				<DateRangeSelect
					{...props}
					date={parseISOToDateObj(date)}
					deadline={parseISOToDateObj(deadline)}
					setDate={(val) => setDate(val)}
					setDeadline={(val) => setDeadline(val)}
					setOverflowHidden={setOverflowHidden}
					setPopUpOpen={setPopUpOpen}
				/>
			</div>
		</div>
	);
};

export default NewTaskBar;
