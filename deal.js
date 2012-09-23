function Deal (settings) {
	var self = this;
	this._init(settings);
	this.name = this.options.name;
	return this;
}

Deal.prototype = {

	defaults: {
		name: "Deal.js",
		tag: "section",
		pin_class: "deal-pinned",
		card_class: "deal-card",
		spacer_id: "deal-spacer"
	},

	_init: function(options) {
		$('.deal-spacer').remove();
		var opts = this._createSettings(options);
		this.cards = $(this.options.tag);
        // Always make tag bigger than the screen height.
        $(this.options.tag).css('min-height', screen.height + 20 + "px" );
		if(this.cards.length <= 1){
			return;
		}
		this.spacer = $('<div>').addClass('deal-spacer');

		$(this.cards[0]).addClass(opts.card_class);
		this._scrollCallback = this._scrollCallback.bind(this);
		this.window = $(window);
		this.window.scroll(this._scrollCallback);
		this._setSpacer();
	},

	refresh: function() {
		this._init();
	},

	_createSettings: function(options) {
		options = options || {};
		this.options = $.extend({}, this.defaults, options);
		return this.options;
	},

	_pinCard: function(card, cards) {
		this._setSpacer(card);
		$(card).addClass(this.options.pin_class);

	},

	_setSpacer: function() {
		var last_idx = this.active_idx;
		this.active = false;

		for (var i = 0; i < this.cards.length; i++) {
		  var bottom_pos = $(this.cards[i]).offset().top + $(this.cards[i]).height();
		  if (this.window.scrollTop() <= bottom_pos) {
		    this.active_idx = i;
		    this.active = this.cards[i+1];
		    break;
		  }
		}

		if (last_idx != this.active_idx && this.active) {
			$(this.spacer).height($(this.active).height()).insertBefore(this.active);
			this.cards.removeClass(this.options.pin_class);
			this.cards.removeClass(this.options.card_class);
			$(this.cards[this.active_idx]).addClass(this.options.card_class);
			$(this.active).addClass(this.options.pin_class);
		}

		if(!this.active){
			this.cards.removeClass(this.options.pin_class);
			$(this.spacer).detach();
		}
	},

	_scrollCallback: function() {
		this._setSpacer();
	}
};
