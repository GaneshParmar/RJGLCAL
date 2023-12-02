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
	const months: number = diffEndDate.diff(startDate, 'month');

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

	return { months, days: diffEndDate.diff(createDateWithDayjs(date, month, year), 'day') };
};

const createDateWithDayjs = (date: number, month: number, year: number): dayjs => {
	const d: Date = new Date(year, month, date);
	const day: dayjs = dayjs(d);
	return day;
};

export function isValidateDates(endDate: Date, startDate: Date) {
	if (endDate < startDate) {
		return false;
	} else {
		return true;
	}
}

export function formatDateToString(date: Date) {
	// Format a JavaScript Date object as "MM-DD-YYYY"
	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const dd = String(date.getDate()).padStart(2, '0');
	const yyyy = date.getFullYear();
	return `${dd}-${mm}-${yyyy}`;
}

export function formatDate(dateValue: string) {
	// Remove any non-numeric characters
	const sanitized = dateValue.replace(/[^0-9]/g, '');

	// Use regular expressions to add dashes in the appropriate places
	const formatted = sanitized.replace(/(\d{2})(\d{0,2})(\d{0,4})/, (_, p1, p2, p3) => {
		console.log(typeof(p1))
		
		
		if(p1 > 31){
			p1 = ''
		}
			
		let result = p1;
		
		if(p2 > 12){
			p2 = ''
		}
		if (p2) result += `-${p2}`;
		if (p3) result += `-${p3}`;
		return result;
	});

	// Set the formatted value back to the input
	dateValue = formatted;
	return dateValue;
}

export function parseDate(dateValue: string) {
	// Parse the input value and update the initialDate if the input is a valid date
	const parts = dateValue.split('-');

	// parts 2 -> YYYY
	// parts 1 -> MM
	// parts 0 -> DD

	const parsedDate = new Date(`${parts[1]}-${parts[0]}-${parts[2]}`);

	// if (!isNaN(parsedDate.getTime())) {
	//   initialDate = parsedDate;
	// }

	return parsedDate;
}
