import prompts from "prompts";

import { getMain } from "./menu";

export async function pesan() {
	const { res } = await prompts([
		{
			message: "Silahkan pilih menu utama kami",
			name: "res",
			type: "select",
			choices: getMain().map((i) => ({
				title: i.name,
				value: i,
			})),
		},
	]);

	return res;
}
