import { styleText } from "node:util";

let pesanan = [];

export function adaPesanan() {
	return pesanan.length > 0;
}

export function print() {
	if (!adaPesanan()) {
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

export function hitungHarga() {
	return pesanan.reduce((acc, { price }) => acc + price, 0);
}
