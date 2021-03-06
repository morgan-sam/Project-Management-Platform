import sortList from 'processing/sortList';

export const getMonthIntegers = () => {
    return Array.from(Array(12).keys()).map((el) => el + 1);
};

export const monthStringArray = () => {
    return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
};

export const get21stCenturyYears = () => {
    return Array.from(Array(100).keys()).map((el) => el + 2000);
};

export const arrayOfMonthDays = (month, year) => {
    if (typeof month === 'string')
        month = monthStringArray().indexOf(month) + 1;
    const totalDays = daysInMonth(month, year);
    return Array.from(Array(totalDays).keys()).map((el) => el + 1);
};

export const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
};

export const getDayFromTodayAsISO = (dayDifference = 0) => {
    const day = new Date();
    day.setDate(day.getDate() + dayDifference);
    const stringDate = day.toISOString().match(/.+?(?=T)/g)[0];
    return `${stringDate}T00:00:00.000Z`;
};

export const todaysDateAsObject = () => {
    const date = new Date();
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    };
};

export const DateISOToObject = (dateISO) => {
    const matches = dateISO.match(/([\d]+)\-([\d]+)\-([\d]+)\T/);
    return {
        year: parseInt(matches[1]),
        month: parseInt(matches[2]),
        day: parseInt(matches[3])
    };
};

const twoDigits = (num) => (`${num}`.length > 1 ? +`${num}` : `0${num}`);

export const DateObjectToISO = (dateObject) => {
    const { year, month, day } = dateObject;
    return `${`${year}-${twoDigits(month)}-${twoDigits(day)}`}T00:00:00.000Z`;
};

export const getBoundaryDates = (rawTaskList) => {
    const tasksSortedByDate = sortList(
        {
            sortOptions: {
                type: 'date',
                reversed: false
            },
            selectedTasks: []
        },
        rawTaskList
    );
    const firstDate = tasksSortedByDate[0].date;
    const tasksSortedByDeadline = sortList(
        {
            sortOptions: {
                type: 'deadline',
                reversed: true
            },
            selectedTasks: []
        },
        rawTaskList
    );
    const lastDeadline = tasksSortedByDeadline[0].deadline;
    if (tasksSortedByDate.length && tasksSortedByDeadline.length) {
        return { date: firstDate, deadline: lastDeadline };
    } else return { date: null, deadline: null };
};
