import { styleText } from "node:util";

import prompts from "prompts";
import * as pesanan from "./pesanan";

export async function bayar() {
	const harga = pesanan.hitungHarga();

	console.clear();
	pesanan.print();
	console.log();
	console.log(`Total harga ${styleText(["dim"], "(sudah termasuk PPn)")}:`);
	console.log(harga);
	console.log();

	const { res } = await prompts({
		message: "Silahkan bayar",
		name: "res",
		type: "number",
		validate: (bayar) => (bayar < harga ? "Uang anda kurang" : true),
	});

	return {
		bayar: res,
		kembali: res - harga,
	};
}
