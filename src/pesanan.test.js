import { describe, it, beforeEach, mock } from "node:test";
import assert from "node:assert/strict";

mock.module("node:util", {
	namedExports: {
		styleText: (_styles, str) => str,
	},
});

const { adaPesanan, tambahPesanan, hitungHarga, print, _reset } =
	await import("../src/pesanan.js");

const ITEM_A = {
	name: "Chicken Combo Rice 1",
	details: [
		{ name: "Chicken", qty: 1, option: ["Lemon Pepper"] },
		{ name: "Rice", qty: 1, option: ["Plain Rice"] },
		{ name: "Drink", qty: 1, option: ["Sprite"] },
	],
	price: 43_000,
};

const ITEM_B = {
	name: "Chicken Combo Fries 2",
	details: [
		{ name: "Chicken", qty: 2, option: ["Atomic Blast", "Hickory BBQ"] },
		{ name: "Fries", qty: 1, option: undefined },
		{ name: "Drink", qty: 1, option: ["Coca Cola"] },
	],
	price: 70_000,
};

describe("adaPesanan", () => {
	beforeEach(_reset);

	it("returns false when no orders have been placed", () => {
		assert.equal(adaPesanan(), false);
	});

	it("returns true after at least one order is added", () => {
		tambahPesanan(ITEM_A);
		assert.equal(adaPesanan(), true);
	});
});

describe("tambahPesanan", () => {
	beforeEach(_reset);

	it("makes adaPesanan return true", () => {
		tambahPesanan(ITEM_A);
		assert.equal(adaPesanan(), true);
	});

	it("allows multiple items to be added", () => {
		tambahPesanan(ITEM_A);
		tambahPesanan(ITEM_B);
		assert.equal(hitungHarga(), ITEM_A.price + ITEM_B.price);
	});
});

describe("hitungHarga", () => {
	beforeEach(_reset);

	it("returns 0 when the order is empty", () => {
		assert.equal(hitungHarga(), 0);
	});

	it("returns the price of a single item", () => {
		tambahPesanan(ITEM_A);
		assert.equal(hitungHarga(), 43_000);
	});

	it("sums prices across multiple items", () => {
		tambahPesanan(ITEM_A);
		tambahPesanan(ITEM_B);
		assert.equal(hitungHarga(), 113_000);
	});

	it("accumulates correctly when the same item is added twice", () => {
		tambahPesanan(ITEM_A);
		tambahPesanan(ITEM_A);
		assert.equal(hitungHarga(), 86_000);
	});
});

describe("print", () => {
	beforeEach(_reset);

	it("does not throw when the order is empty", () => {
		assert.doesNotThrow(() => print());
	});

	it("does not throw when orders are present", () => {
		tambahPesanan(ITEM_A);
		tambahPesanan(ITEM_B);
		assert.doesNotThrow(() => print());
	});
});

describe("_reset", () => {
	it("clears all orders", () => {
		tambahPesanan(ITEM_A);
		_reset();
		assert.equal(adaPesanan(), false);
		assert.equal(hitungHarga(), 0);
	});
});
