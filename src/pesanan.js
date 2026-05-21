import { styleText } from "node:util";

let pesanan = [];

export function print() {
	if (pesanan.length === 0) {
		console.log(styleText(["bold"], "Pesanan anda masih kosong!"));
		console.log(styleText(["dim"], "Silahkan pesan di menu utama."));
	} else {
		console.log(styleText(["bold"], "Pesanan:"));
		console.table(
			pesanan.reduce((acc, { name, details, price }) => {
				acc[name] = {
					details: details.map(({ name, qty }) => `${name} ${qty}`).join(" + "),
					price,
				};
				return acc;
			}, {}),
		);
	}
}

export function tambahPesanan(pesan) {
	pesanan.push(pesan);
}
