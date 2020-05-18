import React from 'react';

const Checkbox = (props) => {
	const { style } = props;

	const checkboxContainerStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	};

	const checkboxIconStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '1rem',
		height: '1rem',
		border: '2px solid #777',
		pointer: 'cursor',
		select: 'none',
		zIndex: '1',
		borderRadius: style ? style.borderRadius : null,
		boxShadow: '0 0 1px 1px #ddd'
	};

	const checkStyle = {
		height: '100%',
		width: '100%',
		transform: 'scale(0.65)',
		backgroundColor: '#444',
		borderRadius: style ? style.borderRadius : null,
		boxShadow: '0 0 1px 1px #ddd'
	};

	return (
		<div className={props.className} style={{ ...checkboxContainerStyle, ...style }}>
			<div className={props.className} style={{ ...checkboxIconStyle }} onClick={() => props.onChange()}>
				{props.default ? <div className={props.className} style={checkStyle} /> : null}
			</div>
		</div>
	);
};

export default Checkbox;
