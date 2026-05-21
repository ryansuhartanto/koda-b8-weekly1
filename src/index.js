import { styleText } from "node:util";
import prompts from "prompts";

import { name } from "./menu";
import { pesan } from "./pesan";
import * as pesanan from "./pesanan";

main();

async function main() {
	while (true) {
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
					title: "keluar",
					value: "keluar",
				},
			],
		});

		switch (res) {
			case "pesan": {
				const tambah = await pesan();
				pesanan.tambahPesanan(tambah);
				break;
			}
			case "keluar": {
				if (await keluar()) {
					console.log("Terimakasih telah berkunjung 🙏");
					return;
				}
				break;
			}
		}
	}
}

async function keluar() {
	const { res } = await prompts({
		type: "confirm",
		message: "Batalkan pesanan?",
		name: "res",
	});

	return res;
}
