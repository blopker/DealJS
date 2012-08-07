function Deal (options) {
	var self = this;
	this.options = this._init(options);
	this.name = this.options.name;
	window.onscroll = this._scrollCallback();
}

Deal.prototype = {

	options: {
		name: "Deal.js",
		tag: "section",
		pin_class: "deal-pinned",
		card_class: "deal-card",
		spacer_id: "deal-spacer"
	},

	_init: function(options) {
		var opts = this._getOptions(options);
		this._styleCards(this._getCards(opts.tag), opts.card_class);
		return opts;
	},

	_getOptions: function(options) {
		// Fill out holes in specified options with defaults.
		var new_opts = this.options;
		for(var prop in options){
			new_opts[prop] = options[prop];
		}
		return new_opts;
	},

	_styleCards: function(cards, style) {
		for (var i = 0; i < cards.length; i++) {
			this._addClass(cards[i], style);
		}
	},

	_getCards: function(tag_or_class) {
		return document.getElementsByTagName(tag_or_class);
	},

	_getCardHeight: function(card) {
		return card.clientHeight;
	},

	_pinCard: function(card, cards) {
		this._setSpacer(card);
		this._addClass(card, this.options.pin_class);

	},

	_setSpacer: function(card) {
		var card_height = this._getCardHeight(card);
		var spacer = document.createElement("div");
		spacer.style.height = card_height + "px";
		spacer.id = this.options.spacer_id;
		card.parentNode.insertBefore(spacer, card.nextSibling);
	},

	_scrollCallback: function() {
		var self = this;
		return function(e) {
			var cards = self._getCards(self.options.tag);
			var card_to_pin = self._getCardToPin(cards);
			self._removePin(cards);
			if (card_to_pin){
				self._pinCard(card_to_pin, cards);
			}
		};
	},

	_getCardToPin: function(cards) {
		for (var i = 0; i < cards.length; i++) {
			if (this._pxFromCardBottomToBrowserTop(cards[i]) >= 0){
				return cards[i].nextElementSibling;
			}
		}
	},

	_removePin: function(cards) {
		for (var i = 0; i < cards.length; i++) {
			this._removeClass(cards[i], this.options.pin_class);
		}
		var old_spacer = document.getElementById(this.options.spacer_id);
		if (old_spacer) {
			old_spacer.parentNode.removeChild(old_spacer);
		}
	},

	_pxFromCardBottomToBrowserTop: function(card) {
		return (card.offsetTop + card.clientHeight) - window.scrollY;
	},

	_hasClass: function(card, cls) {
		return card.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	},

	_addClass: function(card, cls) {
		if (!this._hasClass(card, cls)){
			// Remove left and right whitespace.
			card.className = card.className.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			card.className += " "+cls;
		}
	},

	_removeClass: function(card, cls) {
		if (this._hasClass(card,cls)) {
			var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
			card.className=card.className.replace(reg,' ');
	}
}
};
