import { styleText } from "node:util";

/** @type {Array<{ name: string, details: Array<{ name: string, qty: number, option?: string[] }>, price: number }>} */
let pesanan = [];

/**
 * Returns whether there is at least one item in the current order.
 *
 * @returns {boolean}
 */
export function adaPesanan() {
	return pesanan.length > 0;
}

/**
 * Formats a single order detail line for display.
 *
 * @param {{ name: string, qty: number, option?: string[] }} detail
 * @returns {string} Formatted string, e.g. `"Chicken 2 (Lemon Pepper, Atomic Blast)"`.
 */
function formatDetails({ name, qty, option }) {
	const str = [];

	str.push(name);
	str.push(qty);

	if (option) {
		str.push(styleText(["dim"], `(${option.join(", ")})`));
	}

	return str.join(" ");
}

/**
 * Prints the current order to stdout.
 * Shows an empty-state message when no items have been ordered yet.
 *
 * @returns {void}
 */
export function print() {
	if (!adaPesanan()) {
		console.log(styleText(["bold"], "Pesanan anda masih kosong!"));
		console.log(styleText(["dim"], "Silahkan pesan di menu utama."));
	} else {
		console.log(styleText(["bold"], "Pesanan:"));
		console.table(
			pesanan.reduce((acc, { name, details, price }) => {
				acc[name] = {
					details: details.map(formatDetails).join(" + "),
					price,
				};
				return acc;
			}, {}),
		);
	}
}

/**
 * Appends a completed order item to the current session's order list.
 *
 * @param {{ name: string, details: Array<{ name: string, qty: number, option?: string[] }>, price: number }} pesan
 * @returns {void}
 */
export function tambahPesanan(pesan) {
	pesanan.push(pesan);
}

/**
 * Calculates the total price of all items in the current order.
 *
 * @returns {number} Sum of all item prices.
 */
export function hitungHarga() {
	return pesanan.reduce((acc, { price }) => acc + price, 0);
}
