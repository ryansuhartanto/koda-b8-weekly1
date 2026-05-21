import { styleText } from "node:util";
import prompts from "prompts";

main();

async function main() {
	console.clear();
	console.log(
		`Selamat datang di ${styleText(
			["bold", "greenBright", "bgBlack"],
			"Wingstop",
		)}!`,
	);

	const { res } = await prompts({
		message: "Menu Utama",
		hint: "Silahkan gunakan keyboard untuk navigasi. Enter untuk memilih.",
		name: "res",
		type: "select",
		choices: [
			{
				title: "Keluar",
				value: "keluar",
			},
		],
	});

	switch (res) {
		case "keluar": {
			keluar();
			break;
		}
	}
}

async function keluar() {
	const { res } = await prompts({
		type: "confirm",
		message: "Batalkan pesanan?",
		name: "res",
	});

	if (!res) main();

	console.log("Terimakasih telah berkunjung 🙏");
}
