import prompts from "prompts";

import { getMain, getOptions } from "./menu";

/**
 * @typedef {{ name: string, qty: number, option?: string[] }} DetailWithOption
 * @typedef {{ name: string, details: DetailWithOption[], price: number }} OrderItem
 */

/**
 * Interactively prompts the user to select a main menu item and then
 * choose flavor/variant options for each of its components.
 *
 * @returns {Promise<OrderItem>} The selected menu item with all options resolved.
 */
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

/**
 * Presents multiselect prompts for every component detail in an order item,
 * letting the user pick the exact number of flavors specified by `qty`.
 *
 * @param {Array<{ name: string, qty: number }>} details
 *   Component list from the chosen menu item (e.g. Chicken ×2, Rice ×1).
 * @returns {Promise<DetailWithOption[]>} Same list augmented with a resolved `option` array.
 */
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
