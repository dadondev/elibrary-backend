/** @format */

import dateFNS from "date-fns";
function compareDate(returnDate: Date, todayDate: Date) {
	const firstDate =
		dateFNS.getDate(returnDate) +
		":" +
		dateFNS.getMonth(returnDate) +
		":" +
		dateFNS.getYear(returnDate);
	const secondDate =
		dateFNS.getDate(todayDate) +
		":" +
		dateFNS.getMonth(todayDate) +
		":" +
		dateFNS.getYear(todayDate);

	if (
		dateFNS.getDate(todayDate) - dateFNS.getDate(returnDate) === 1 &&
		dateFNS.getMonth(todayDate) === dateFNS.getMonth(returnDate) &&
		dateFNS.getYear(todayDate) === dateFNS.getYear(returnDate)
	)
		return "1 day";
	if (firstDate < secondDate) return "earn";
	if (firstDate === secondDate) return "equal";
	return "late";
}

export default compareDate;
