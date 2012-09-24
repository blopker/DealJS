function Deal (settings) {
	this._init(settings);
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
		var opts = this._createSettings(options);
		$('.' + opts.spacer_id).remove();

		this.cards = $(this.options.tag);
		this.active_idx = -1;
		if(this.cards.length <= 1){
			return;
		}

		this._setMinHeight();
		this._createSpacer();

		this._scrollCallback = this._scrollCallback.bind(this);
		this.refresh = this.refresh.bind(this);

		this.window = $(window);
		this.window.scroll(this._scrollCallback);

		this._deal();
	},

	_setMinHeight: function() {
		// Always make card bigger than the screen height.
        this.cards.css('min-height', screen.height + 20 + "px" );
	},

	refresh: function() {
		this._init(this.options);
	},

	_createSpacer: function() {
		this.spacer = $('<div>').addClass('deal-spacer');
	},

	_createSettings: function(options) {
		options = options || {};
		this.options = $.extend({}, this.defaults, options);
		return this.options;
	},

	_getActiveIndex: function() {
		for (var i = 0; i < this.cards.length; i++) {
		  var bottom_pos = $(this.cards[i]).offset().top + $(this.cards[i]).height();
		  if (this.window.scrollTop() <= bottom_pos) {
		    return i;
		  }
		}
	},

	_deal: function() {
		var last_idx = this.active_idx;
		this.active_idx = this._getActiveIndex();

		if(this.active_idx === last_idx){
			return;
		}

		var active = $(this.cards[this.active_idx]);
		var next = $(this.cards[this.active_idx + 1]);

		this.cards.removeClass(this.options.pin_class);
		this.cards.removeClass(this.options.card_class);

		if(next.length === 0){
			this.spacer.detach();
			return;
		}

		this.spacer.height(next.height()).insertBefore(next);
		active.addClass(this.options.card_class);
		next.addClass(this.options.pin_class);
	},

	_scrollCallback: function() {
		this._deal();
	}
};
