import React, { useContext, useState } from 'react';
import ThemeContext from 'context/ThemeContext';

const NavigationMenu = (props) => {
	const themeColor = useContext(ThemeContext);

	const menus = [
		{ name: 'File', sub: [ { name: 'Batch New Tasks' } ] },
		{ name: 'Edit', sub: [ { name: 'Select All' }, { name: 'Mark Complete' }, { name: 'Delete Selected' } ] },
		{ name: 'View', sub: [ { name: 'Filter' }, { name: 'New Task' } ] }
	];
	const convertMenusToOpenObj = () => {
		let obj = {};
		for (let i = 0; i < menus.length; i++) {
			obj[menus[i].name] = false;
		}
		return obj;
	};
	const [ menusOpen, setMenusOpen ] = useState(convertMenusToOpenObj());

	const parentContainer = {
		height: 'auto',
		margin: '2rem 0',
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'top'
	};

	const boxStyle = {
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid black',
		height: '2rem',
		width: '4rem',
		userSelect: 'none',
		cursor: 'pointer',
		fontSize: '0.75rem'
	};

	const mainMenuContainer = {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'left',
		alignItems: 'center'
	};

	const singleMenuBox = (box) => {
		return (
			<div
				style={boxStyle}
				onClick={() => {
					let newObj = Object.assign({}, menusOpen);
					newObj[box] = !newObj[box];
					setMenusOpen(newObj);
				}}
			>
				{box}
			</div>
		);
	};

	const multipleBoxes = (boxes) => {
		return <div style={mainMenuContainer}>{boxes.map((el) => singleMenuBox(el.name))}</div>;
	};

	const mainRowOfBoxes = () => {
		return menus.map((el) => {
			const { name, sub } = el;
			if (menusOpen[name]) return multipleBoxes([ el, ...sub ]);
			else return singleMenuBox(name);
		});
	};

	return <div style={parentContainer}>{mainRowOfBoxes()}</div>;
};

export default NavigationMenu;
