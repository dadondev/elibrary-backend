/** @format */

import { months, returnBookI, takeBookI } from "../utils/types";
import dateFNS from "date-fns";
import { PHONE_NUMBER } from "../utils/utils";
import sendSMS from "./textflow.service";

class smsService {
	async welcomeSMS(phoneNumber: string, fullName: string) {
		const msg = `Assalomu alaykum, ${fullName}!\nSiz markaziy kutubxonada yangi katalog ochdirdingiz! Buni eslatib o'tishimiz lozim edi! E'tibor uchun katta rahmat :)`;
		return await sendSMS(phoneNumber, msg);
	}
	async takeBook({ bookName, fullName, phoneNumber, returnDate }: takeBookI) {
		const msg =
			`Assalomu alaykum, ${fullName}!\nSiz markaziy kutubxonadan ${bookName} nomli kitob oldingiz!\n Topshirish sanasi: ${dateFNS.getDate(
				returnDate
			)}-${months[dateFNS.getMonth(returnDate) - 1].toLowerCase()}` + info;
		return await sendSMS(phoneNumber, msg);
	}
	async returnBook({ fullName, bookName, phoneNumber, takeDate }: returnBookI) {
		const msg =
			`Assalomu alaykum, ${fullName}!\nEslatib o'tamiz! Siz markaziy kutubxonadan ${dateFNS.getDate(
				takeDate
			)}-${months[
				dateFNS.getMonth(takeDate)
			].toLowerCase()} kuni ${bookName} nomli kitob olgan edingiz! Bugun sizga berilgan muhlat tugadi! Iltimos kitobni qaytarishingizni so'raymiz!` +
			info;
		return await sendSMS(phoneNumber, msg);
	}
	async earnReturnBook({
		fullName,
		takeDate,
		bookName,
		phoneNumber,
	}: returnBookI) {
		const msg =
			`Assalomu alaykum, ${fullName}!\n Eslatib o'tamiz! Siz markaziy kutubxonadan ${dateFNS.getDate(
				takeDate
			)}-${months[
				dateFNS.getMonth(takeDate)
			].toLowerCase()} kuni ${bookName} nomli kitob olgan edingiz! Sizga berilgan muhlat ertaga tugaydi. Shuning uchun ertaga kitobni olib kelishingizni so'raymiz!` +
			info;
		return await sendSMS(phoneNumber, msg);
	}
	async lateReturnBook({ fullName, phoneNumber, bookName }: returnBookI) {
		const msg =
			`Assalomu alaykum, ${fullName}!\n Siz markaziy kutubxonadan ${bookName} nomli kiton olgan edingiz! Afsuski sizga berilgan muhlat allaqachon tugagan zudlik bilan kitobni qaytarishingizni so'raymiz?` +
			info;
		return await sendSMS(phoneNumber, msg);
	}
}
export default new smsService();

const info =
	"\nAgar kitobning muddati uzaytirmoqchi bo'lsangiz telefon orqali ogohlantirishingizni so'raymiz!\nMurojat uchun: " +
	PHONE_NUMBER;
