import { combineParallelArrays } from 'processing/utility';

export const interpretTaskTemplate = (taskTemplate, taskCount) => {
	if (taskTemplate) {
		const flags = taskTemplate.match(/\$\{( *[nlNL][^}]*)\}/g);
		if (!flags) return 'ERROR: INVALID TEMPLATE';
		const settings = flags.map((el) => convertFlagToSettings(el));
		const strings = settings.map((el) => convertSettingsToStrings(el, taskCount));
		const combinedStrings = combineParallelArrays(strings);
		return getFullTaskStrings(combinedStrings, taskTemplate);
	} else return 'ERROR: TEMPLATE NOT ENTERED';
};

const getFullTaskStrings = (strings, template) => {
	return strings.map((el, i) => {
		let matchIndex = 0;
		return template.replace(/\$\{( *[nlNL][^}]*)\}/g, (s) => {
			return el[matchIndex++] || s;
		});
	});
};

const convertSettingsToStrings = (settings, count) => {
	return new Array(count).fill().map((el, i) => {
		const loop = { i, count };
		if (settings.numerical) return convertNumSettingToString(settings, loop);
		else return convertLetterSettingToString(settings, loop);
	});
};

const convertNumSettingToString = (settings, loop) => {
	const { i, count, ascending, digits } = { ...loop, ...settings };
	const num = ascending ? i : count - i - 1;
	const zeroes = Math.max(0, digits - num.toString().length);
	return `${'0'.repeat(zeroes)}${num}`;
};

const convertLetterSettingToString = (settings, loop) => {
	const { i, count, ascending } = { ...loop, ...settings };
	const num = ascending ? i % 26 : 25 - i % 26;
	const alphaIteration = Math.floor(i / 26);
	return `${String.fromCharCode(97 + num)}${count > 26 ? alphaIteration : ''}`;
};

const convertFlagToSettings = (flag) => {
	const groups = flag.replace(/[\$\{\} ]/g, '').split(',');
	let settings = { numerical: true, digits: 1, ascending: true };
	let orderIndex = 2;
	if (groups[0] === 'l' || groups[0] === 'L') {
		orderIndex = 1;
		settings.numerical = false;
	} else if (parseInt(groups[1]) >= 0 && parseInt(groups[1]) <= 9) settings.digits = parseInt(groups[1]);
	else orderIndex = 1;
	if (groups[orderIndex] === 'a' || groups[orderIndex] === 'A') settings.ascending = true;
	else if (groups[orderIndex] === 'd' || groups[orderIndex] === 'D') settings.ascending = false;
	return settings;
};
