/** @format */

import dateFNS from "date-fns";
function compareDate(returnDate: Date, todayDate: Date) {
	const differenceDaysCount = dateFNS.differenceInDays(todayDate, returnDate);
	if (differenceDaysCount === 1) return "1 day";
	if (differenceDaysCount < 10) return "earn";
	if (differenceDaysCount === 0) return "equal";
	return "late";
}

export default compareDate;
