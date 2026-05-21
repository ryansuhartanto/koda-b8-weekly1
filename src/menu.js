import fs from "fs/promises";

const raw = await fs.readFile("src/menu.json");
const { name, menu, options } = JSON.parse(raw);

export { name };

export function getMain() {
	return menu.main;
}

export function getOptions(item) {
	return options[item];
}

export function getExtra() {
	return menu.extra;
}
