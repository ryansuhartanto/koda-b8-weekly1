import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";

const STUB_MENU = {
	name: "Test Restaurant",
	menu: {
		main: [
			{
				name: "Combo A",
				details: [
					{ name: "Chicken", qty: 1 },
					{ name: "Drink", qty: 1 },
				],
				price: 40_000,
			},
		],
		extra: [
			{ name: "Rice", price: 13_000 },
			{ name: "Fries", price: 26_000 },
		],
	},
	options: {
		Chicken: ["Lemon Pepper", ["Garlic Parmesan", 2000]],
		Drink: ["Sprite", "Coca Cola"],
	},
};

mock.module("fs/promises", {
	namedExports: {
		readFile: async () => JSON.stringify(STUB_MENU),
	},
});

const { name, getMain, getOptions, getExtra } = await import("../src/menu.js");

describe("name export", () => {
	it("equals the name field from the JSON", () => {
		assert.equal(name, "Test Restaurant");
	});
});

describe("getMain", () => {
	it("returns the main menu array", () => {
		assert.deepEqual(getMain(), STUB_MENU.menu.main);
	});

	it("each item has name, details, and price", () => {
		for (const item of getMain()) {
			assert.ok("name" in item);
			assert.ok("details" in item);
			assert.ok("price" in item);
		}
	});
});

describe("getOptions", () => {
	it("returns the options array for a known item", () => {
		assert.deepEqual(getOptions("Chicken"), STUB_MENU.options.Chicken);
	});

	it("returns undefined for an item with no options", () => {
		assert.equal(getOptions("Rice"), undefined);
	});

	it("preserves tuple entries for options with a surcharge", () => {
		const opts = getOptions("Chicken");
		const tuple = opts.find(Array.isArray);
		assert.ok(tuple, "expected at least one surcharge tuple");
		assert.equal(tuple[0], "Garlic Parmesan");
		assert.equal(tuple[1], 2000);
	});
});

describe("getExtra", () => {
	it("returns the extra items array", () => {
		assert.deepEqual(getExtra(), STUB_MENU.menu.extra);
	});

	it("each extra item has name and price", () => {
		for (const item of getExtra()) {
			assert.ok("name" in item);
			assert.ok("price" in item);
		}
	});
});
