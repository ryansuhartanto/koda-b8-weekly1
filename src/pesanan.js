import { styleText } from "node:util";

let pesanan = [];

export function adaPesanan() {
	return pesanan.length > 0;
}

function formatDetails({ name, qty, option }) {
	const str = [];

	str.push(name);
	str.push(qty);

	if (option) {
		str.push(styleText(["dim"], `(${option.join(", ")})`));
	}

	return str.join(" ");
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
					details: details.map(formatDetails).join(" + "),
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
