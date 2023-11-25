import type { DMY } from '$lib/types/DMY';
import dayjs from 'dayjs';
// get Number of Months

export const calculateDiffBetweenDates = (
	startDate: Date,
	endDate: Date,
	inDMY: boolean = true,
	inMonthsCeil: boolean = false
): DMY => {
	if (inDMY) {
		startDate = new Date(startDate);
		endDate = new Date(endDate);
		return calculateDiffInDMY(startDate, endDate);
	} else if (inMonthsCeil) {
		return {};
	} else {
		return {};
	}
	return {};
};

// using dayjs library

export const calculateDiffInDMY = (startDate: Date, endDate: Date): DMY => {
	const diffEndDate = dayjs(endDate);
	const diffStartDate = dayjs(startDate);
	const months : number= diffEndDate.diff(startDate, 'month');

	// alert(diffEndDate.get('month')+1);

	const endDateMonth = diffEndDate.get('month');
	const endDateYear = diffEndDate.get('year');
	// if endate day > stardate day
	// same month
	// else endate day < startdate day
	// previous month

	// dayjs().set('date', 1)
	// dayjs().set('month', 3) // April
	// dayjs().set('second', 30)

	// creating prvios month date of the enddate
	const date: number = diffStartDate.get('date');

	console.log('Previous month date : ', date);

	let month: number;
	let year: number;
	// diffPreviousMonth.set('date', diffStartDate.get('date'));
	if (diffStartDate.get('date') > diffEndDate.get('date')) {
		if (diffEndDate.get('date') == 1 && diffEndDate.get('month') == 0) {
			// diffPreviousMonth.set('month', 11);
			month = 11;
		} else {
			// diffPreviousMonth.set('month', endDateMonth - 1);
			month = endDateMonth - 1;
		}
	} else if (diffStartDate.get('date') < diffEndDate.get('date')) {
		// diffPreviousMonth.set('month', endDateMonth);
		month = endDateMonth;
	} else {
		month = endDateMonth;
	}

	console.log('Previos month before endmonth ', month);

	if (month > endDateMonth) {
		// diffPreviousMonth.set('year', endDateYear - 1);
		year = endDateYear - 1;
	} else if (month < endDateMonth) {
		// diffPreviousMonth.set('year', endDateYear);
		year = endDateYear;
	} else {
		year = endDateYear;
	}
						
	console.log('Previos year before endmonth ', year);	

	console.log('Created date ', createDateWithDayjs(date, month, year));

	return { months , days: diffEndDate.diff(createDateWithDayjs(date, month, year), 'day') };
};

const createDateWithDayjs = (date: number, month: number, year: number): dayjs => {
	const d : Date= new Date(year, month, date)
	const day : dayjs = dayjs(d)
	return day;
};
