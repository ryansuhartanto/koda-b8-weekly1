import fs from "fs/promises";

const raw = await fs.readFile("src/menu.json");
const { name, menu, options } = JSON.parse(raw);

export { name };

/**
 * Returns the list of main menu items.
 *
 * @returns {Array<{
 *   name: string,
 *   details: Array<{ name: string, qty: number }>,
 *   price: number
 * }>}
 */
export function getMain() {
	return menu.main;
}

/**
 * Returns the available flavor/variant options for a given detail item.
 * Options may be a plain string or a tuple `[label, surcharge]`.
 *
 * @param {string} item - Detail item name (e.g. `"Chicken"`, `"Rice"`, `"Drink"`).
 * @returns {Array<string | [string, number]> | undefined}
 */
export function getOptions(item) {
	return options[item];
}

/**
 * Returns the list of add-on (extra) items.
 *
 * @returns {Array<{ name: string, price: number }>}
 */
export function getExtra() {
	return menu.extra;
}
