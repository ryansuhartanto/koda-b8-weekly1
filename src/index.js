import { styleText } from "node:util";
import prompts from "prompts";

import { name } from "./menu";
import { pesan } from "./pesan";
import * as pesanan from "./pesanan";
import { bayar } from "./bayar";

main();

/**
 * Application entry point. Runs the main menu loop until the user
 * completes payment or explicitly chooses to exit.
 *
 * @returns {Promise<void>}
 */
async function main() {
	let unfinished = true;

	while (unfinished) {
		unfinished = false;

		console.clear();
		console.log(
			`Selamat datang di ${styleText(
				["bold", "greenBright", "bgBlack"],
				name,
			)}!`,
		);
		console.log();
		pesanan.print();
		console.log();

		const { res } = await prompts({
			message: "Menu utama",
			hint: "Gunakan keyboard untuk navigasi. Enter untuk memilih.",
			name: "res",
			type: "select",
			choices: [
				{
					title: "pesan",
					value: "pesan",
				},
				{
					title: "bayar",
					value: "bayar",
					disabled: !pesanan.adaPesanan(),
				},
				{
					title: "keluar",
					value: "keluar",
				},
			],
		});

		switch (res) {
			case "pesan": {
				const tambah = await pesan();
				pesanan.tambahPesanan(tambah);
				unfinished = true;
				break;
			}
			case "bayar": {
				const { kembali } = await bayar();
				console.log("Kembalian anda:");
				console.log(kembali);
				console.log("Terimakasih telah berkunjung 🙏");
				break;
			}
			case "keluar": {
				if (await keluar()) {
					console.log("Terimakasih telah berkunjung 🙏");
				} else {
					unfinished = true;
				}
				break;
			}
			default: {
				unfinished = true;
				break;
			}
		}
	}
}

/**
 * Prompts the user to confirm order cancellation before exiting.
 *
 * @returns {Promise<boolean>} `true` if the user confirmed exit, `false` otherwise.
 */
async function keluar() {
	const { res } = await prompts({
		type: "confirm",
		message: "Batalkan pesanan?",
		name: "res",
	});

	return res;
}
