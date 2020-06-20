import React from 'react';
import { flexCenter } from 'styling/generic';

const InputFormWithLabel = (props) => {
	const inputFormWithLabelStyle = {
		...flexCenter,
		padding: '0 1rem'
	};

	const formItemsStyle = {
		margin: '0 0.5rem'
	};

	return (
		<form style={{ ...props.style, ...inputFormWithLabelStyle }}>
			<label style={formItemsStyle}>{props.label}:</label>
			<input
				onChange={(e) => props.onChange(e.target.value)}
				style={formItemsStyle}
				type="text"
				name="name"
				value={props.default}
			/>
			<input disabled type="submit" value="Submit" style={{ display: 'none' }} />
		</form>
	);
};

export default InputFormWithLabel;
