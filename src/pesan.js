import prompts from "prompts";

import { getMain, getOptions } from "./menu";

export async function pesan() {
	const { res } = await prompts({
		message: "Silahkan pilih menu utama kami",
		name: "res",
		type: "select",
		choices: getMain().map((i) => ({
			title: i.name,
			value: i,
		})),
	});

	const details = await opsi(res.details);

	return {
		...res,
		details,
	};
}

async function opsi(details) {
	const selected = await prompts(
		details
			.map(({ name, ...rest }) => ({
				name,
				...rest,
				options: getOptions(name),
			}))
			.map(({ name, qty, ...rest }) => ({
				message: `Pilih opsi untuk ${name}`,
				name: name,
				type: rest.options !== undefined && "multiselect",
				min: qty,
				max: qty,
				choices: rest.options?.map((option) => {
					if (Array.isArray(option)) {
						return {
							value: option[0],
						};
					} else {
						return {
							value: option,
						};
					}
				}),
			})),
	);

	return details.map(({ name, ...rest }) => ({
		name,
		...rest,
		option: selected[name],
	}));
}
