export const getScreenStyle = (fixedStyle) => {
	return {
		position: 'absolute',
		height: '100%',
		width: '100%',
		left: '0',
		top: '0',
		overflowY: fixedStyle ? 'hidden' : 'scroll'
	};
};

export const getMainPageStyle = (scrollLocked = false) => {
	return {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '75vw',
		margin: '0 auto',
		padding: '2.6rem',
		boxSizing: 'border-box',
		margin: '0 auto',
		overflow: scrollLocked ? 'hidden' : 'visible'
	};
};

export const tableStyle = {
	margin: '0 0 3rem 0'
};

export const overlayStyle = {
	height: '100vw',
	width: '100vw',
	background: 'white',
	opacity: '0.8',
	position: 'fixed',
	top: '0',
	left: '0',
	zIndex: '19',
	animation: 'overlay-fade-in linear 0.4s'
};

export const getTableContainerStyle = (fixedStyle, values) => {
	if (fixedStyle) {
		const { barConHeight, displayedBars } = values;
		return {
			padding: '4rem',
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
			height: `${500 - barConHeight}px`,
			overflowY: 'scroll',
			transition: `height ${Object.values(displayedBars).includes(true)
				? '0.2s ease-in-out'
				: '0.5s ease-in-out'}`,
			WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, white 10%, white 90%, transparent 100%)',
			maskImage: 'linear-gradient(to bottom, transparent 0%, white 10%, white 90%, transparent 100%)'
		};
	} else
		return {
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
			height: '100%'
		};
};

export const getTopBarsContainerStyle = (fixedStyle) => {
	if (fixedStyle)
		return {
			position: 'sticky',
			top: '3rem',
			margin: '2rem',
			height: 'auto'
		};
	else
		return {
			position: 'relative',
			top: '3rem',
			margin: '0 0 8rem 0',
			height: 'auto'
		};
};
