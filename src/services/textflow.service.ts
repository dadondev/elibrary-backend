/** @format */

import axios from "axios";
import { TEXTFLOW_TOKEN } from "../utils/utils";

async function sendSMS(phone_number: string, text: string) {
	const resp = await axios.post(
		"https://textflow.me/api/send-sms",
		{ phone_number, text },
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + TEXTFLOW_TOKEN,
			},
		}
	);
	return resp;
}

export default sendSMS;
