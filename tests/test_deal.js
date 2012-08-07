module("deal.js", {
	setup: function() {
		deal = new Deal();
	},
	// teardown: function() {
	// 	deal = null;
	// }
});

test("initialize", function() {
	ok(deal.name.indexOf("Deal.js") != -1, "Deal object not created!");
});

test("options", function() {
	equal(deal.options.tag, "section", "Defaults failed");
	deal = new Deal({tag: "article"});
	equal(deal.options.tag, "article", "Options failed");
});

test("get cards", function() {
	equal(deal._getCards("section").length, 3,
		"Did not find all cards.");
});

test("get card height", function() {
	equal(deal._getCardHeight(deal._getCards("section")[0]), 863,
		"Did not find card height.");
});

test("pin card", function() {
	var cards = deal._getCards("section");
	deal._pinCard(cards[1], cards);
	ok(deal._hasClass(cards[1], deal.options.pin_class), "Pinned class not applied.");
	ok(!deal._hasClass(cards[0], deal.options.pin_class), "Pinned class wrongly applied.");
});

test("style cards", function() {
	deal._styleCards(deal._getCards("section"), "random-class");
	ok(deal._hasClass(deal._getCards("section")[2], "random-class"), "Card does not have right style.");
});

