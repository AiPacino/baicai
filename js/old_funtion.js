/*!
 * jQuery Tools v1.2.6 - The missing UI library for the Web
 *
 * dateinput/dateinput.js
 * overlay/overlay.js
 * overlay/overlay.apple.js
 * rangeinput/rangeinput.js
 * scrollable/scrollable.js
 * scrollable/scrollable.autoscroll.js
 * scrollable/scrollable.navigator.js
 * tabs/tabs.js
 * tabs/tabs.slideshow.js
 * tooltip/tooltip.js
 * tooltip/tooltip.dynamic.js
 * tooltip/tooltip.slide.js
 * validator/validator.js
 *
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 *
 * http://flowplayer.org/tools/
 *
 */
(function(a) {
	a.tools = a.tools || {
		version: "v1.2.6"
	}, a.tools.tabs = {
		conf: {
			tabs: "a",
			current: "current",
			onBeforeClick: null,
			onClick: null,
			effect: "default",
			initialIndex: 0,
			event: "click",
			rotate: !1,
			slideUpSpeed: 400,
			slideDownSpeed: 400,
			history: !1
		},
		addEffect: function(a, c) {
			b[a] = c
		}
	};
	var b = {
		"default": function(a, b) {
			this.getPanes().hide().eq(a).show(), b.call()
		},
		fade: function(a, b) {
			var c = this.getConf(),
				d = c.fadeOutSpeed,
				e = this.getPanes();
			d ? e.fadeOut(d) : e.hide(), e.eq(a).fadeIn(c.fadeInSpeed, b)
		},
		slide: function(a, b) {
			var c = this.getConf();
			this.getPanes().slideUp(c.slideUpSpeed), this.getPanes().eq(a).slideDown(c.slideDownSpeed, b)
		},
		ajax: function(a, b) {
			this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"), b)
		}
	},
		c, d;
	a.tools.tabs.addEffect("horizontal", function(b, e) {
		if (!c) {
			var f = this.getPanes().eq(b),
				g = this.getCurrentPane();
			d || (d = this.getPanes().eq(0).width()), c = !0, f.show(), g.animate({
				width: 0
			}, {
				step: function(a) {
					f.css("width", d - a)
				},
				complete: function() {
					a(this).hide(), e.call(), c = !1
				}
			}), g.length || (e.call(), c = !1)
		}
	});

	function e(c, d, e) {
		var f = this,
			g = c.add(this),
			h = c.find(e.tabs),
			i = d.jquery ? d : c.children(d),
			j;
		h.length || (h = c.children()), i.length || (i = c.parent().find(d)), i.length || (i = a(d)), a.extend(this, {
			click: function(c, d) {
				var i = h.eq(c);
				typeof c == "string" && c.replace("#", "") && (i = h.filter("[href*=" + c.replace("#", "") + "]"), c = Math.max(h.index(i), 0));
				if (e.rotate) {
					var k = h.length - 1;
					if (c < 0) return f.click(k, d);
					if (c > k) return f.click(0, d)
				}
				if (!i.length) {
					if (j >= 0) return f;
					c = e.initialIndex, i = h.eq(c)
				}
				if (c === j) return f;
				d = d || a.Event(), d.type = "onBeforeClick", g.trigger(d, [c]);
				if (!d.isDefaultPrevented()) {
					b[e.effect].call(f, c, function() {
						j = c, d.type = "onClick", g.trigger(d, [c])
					}), h.removeClass(e.current), i.addClass(e.current);
					return f
				}
			},
			getConf: function() {
				return e
			},
			getTabs: function() {
				return h
			},
			getPanes: function() {
				return i
			},
			getCurrentPane: function() {
				return i.eq(j)
			},
			getCurrentTab: function() {
				return h.eq(j)
			},
			getIndex: function() {
				return j
			},
			next: function() {
				return f.click(j + 1)
			},
			prev: function() {
				return f.click(j - 1)
			},
			destroy: function() {
				h.unbind(e.event).removeClass(e.current), i.find("a[href^=#]").unbind("click.T");
				return f
			}
		}), a.each("onBeforeClick,onClick".split(","), function(b, c) {
			a.isFunction(e[c]) && a(f).bind(c, e[c]), f[c] = function(b) {
				b && a(f).bind(c, b);
				return f
			}
		}), e.history && a.fn.history && (a.tools.history.init(h), e.event = "history"), h.each(function(b) {
			a(this).bind(e.event, function(a) {
				f.click(b, a);
				return a.preventDefault()
			})
		}), i.find("a[href^=#]").bind("click.T", function(b) {
			f.click(a(this).attr("href"), b)
		}), location.hash && e.tabs == "a" && c.find("[href=" + location.hash + "]").length ? f.click(location.hash) : (e.initialIndex === 0 || e.initialIndex > 0) && f.click(e.initialIndex)
	}
	a.fn.tabs = function(b, c) {
		var d = this.data("tabs");
		d && (d.destroy(), this.removeData("tabs")), a.isFunction(c) && (c = {
			onBeforeClick: c
		}), c = a.extend({}, a.tools.tabs.conf, c), this.each(function() {
			d = new e(a(this), b, c), a(this).data("tabs", d)
		});
		return c.api ? d : this
	}
})(jQuery);
(function(a) {
	var b;
	b = a.tools.tabs.slideshow = {
		conf: {
			next: ".forward",
			prev: ".backward",
			disabledClass: "disabled",
			autoplay: !1,
			autopause: !0,
			interval: 3e3,
			clickable: !0,
			api: !1
		}
	};

	function c(b, c) {
		var d = this,
			e = b.add(this),
			f = b.data("tabs"),
			g, h = !0;

		function i(c) {
			var d = a(c);
			return d.length < 2 ? d : b.parent().find(c)
		}
		var j = i(c.next).click(function() {
			f.next()
		}),
			k = i(c.prev).click(function() {
				f.prev()
			});

		function l() {
			g = setTimeout(function() {
				f.next()
			}, c.interval)
		}
		a.extend(d, {
			getTabs: function() {
				return f
			},
			getConf: function() {
				return c
			},
			play: function() {
				if (g) return d;
				var b = a.Event("onBeforePlay");
				e.trigger(b);
				if (b.isDefaultPrevented()) return d;
				h = !1, e.trigger("onPlay"), e.bind("onClick", l), l();
				return d
			},
			pause: function() {
				if (!g) return d;
				var b = a.Event("onBeforePause");
				e.trigger(b);
				if (b.isDefaultPrevented()) return d;
				g = clearTimeout(g), e.trigger("onPause"), e.unbind("onClick", l);
				return d
			},
			resume: function() {
				h || d.play()
			},
			stop: function() {
				d.pause(), h = !0
			}
		}), a.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","), function(b, e) {
			a.isFunction(c[e]) && a(d).bind(e, c[e]), d[e] = function(b) {
				return a(d).bind(e, b)
			}
		}), c.autopause && f.getTabs().add(j).add(k).add(f.getPanes()).hover(d.pause, d.resume), c.autoplay && d.play(), c.clickable && f.getPanes().click(function() {
			f.next()
		});
		if (!f.getConf().rotate) {
			var m = c.disabledClass;
			f.getIndex() || k.addClass(m), f.onBeforeClick(function(a, b) {
				k.toggleClass(m, !b), j.toggleClass(m, b == f.getTabs().length - 1)
			})
		}
	}
	a.fn.slideshow = function(d) {
		var e = this.data("slideshow");
		if (e) return e;
		d = a.extend({}, b.conf, d), this.each(function() {
			e = new c(a(this), d), a(this).data("slideshow", e)
		});
		return d.api ? e : this
	}
})(jQuery);
(function(a) {
	a.tools = a.tools || {
		version: "v1.2.6"
	}, a.tools.tooltip = {
		conf: {
			effect: "toggle",
			fadeOutSpeed: "fast",
			predelay: 0,
			delay: 30,
			opacity: 1,
			tip: 0,
			fadeIE: !1,
			position: ["top", "center"],
			offset: [0, 0],
			relative: !1,
			cancelDefault: !0,
			events: {
				def: "mouseenter,mouseleave",
				input: "focus,blur",
				widget: "focus mouseenter,blur mouseleave",
				tooltip: "mouseenter,mouseleave"
			},
			layout: "<div/>",
			tipClass: "tooltip"
		},
		addEffect: function(a, c, d) {
			b[a] = [c, d]
		}
	};
	var b = {
		toggle: [function(a) {
			var b = this.getConf(),
				c = this.getTip(),
				d = b.opacity;
			d < 1 && c.css({
				opacity: d
			}), c.show(), a.call()
		}, function(a) {
			this.getTip().hide(), a.call()
		}],
		fade: [function(b) {
			var c = this.getConf();
			!a.browser.msie || c.fadeIE ? this.getTip().fadeTo(c.fadeInSpeed, c.opacity, b) : (this.getTip().show(), b())
		}, function(b) {
			var c = this.getConf();
			!a.browser.msie || c.fadeIE ? this.getTip().fadeOut(c.fadeOutSpeed, b) : (this.getTip().hide(), b())
		}]
	};

	function c(b, c, d) {
		var e = d.relative ? b.position().top : b.offset().top,
			f = d.relative ? b.position().left : b.offset().left,
			g = d.position[0];
		e -= c.outerHeight() - d.offset[0], f += b.outerWidth() + d.offset[1], /iPad/i.test(navigator.userAgent) && (e -= a(window).scrollTop());
		var h = c.outerHeight() + b.outerHeight();
		g == "center" && (e += h / 2), g == "bottom" && (e += h), g = d.position[1];
		var i = c.outerWidth() + b.outerWidth();
		g == "center" && (f -= i / 2), g == "left" && (f -= i);
		return {
			top: e,
			left: f
		}
	}
	function d(d, e) {
		var f = this,
			g = d.add(f),
			h, i = 0,
			j = 0,
			k = d.attr("title"),
			l = d.attr("data-tooltip"),
			m = b[e.effect],
			n, o = d.is(":input"),
			p = o && d.is(":checkbox, :radio, select, :button, :submit"),
			q = d.attr("type"),
			r = e.events[q] || e.events[o ? p ? "widget" : "input" : "def"];
		if (!m) throw "Nonexistent effect \"" + e.effect + "\"";
		r = r.split(/,\s*/);
		if (r.length != 2) throw "Tooltip: bad events configuration for " + q;
		d.bind(r[0], function(a) {
			clearTimeout(i), e.predelay ? j = setTimeout(function() {
				f.show(a)
			}, e.predelay) : f.show(a)
		}).bind(r[1], function(a) {
			clearTimeout(j), e.delay ? i = setTimeout(function() {
				f.hide(a)
			}, e.delay) : f.hide(a)
		}), k && e.cancelDefault && (d.removeAttr("title"), d.data("title", k)), a.extend(f, {
			show: function(b) {
				if (!h) {
					l ? h = a(l) : e.tip ? h = a(e.tip).eq(0) : k ? h = a(e.layout).addClass(e.tipClass).appendTo(document.body).hide().append(k) : (h = d.next(), h.length || (h = d.parent().next()));
					if (!h.length) throw "Cannot find tooltip for " + d
				}
				if (f.isShown()) return f;
				h.stop(!0, !0);
				var o = c(d, h, e);
				e.tip && h.html(d.data("title")), b = a.Event(), b.type = "onBeforeShow", g.trigger(b, [o]);
				if (b.isDefaultPrevented()) return f;
				o = c(d, h, e), h.css({
					position: "absolute",
					top: o.top,
					left: o.left
				}), n = !0, m[0].call(f, function() {
					b.type = "onShow", n = "full", g.trigger(b)
				});
				var p = e.events.tooltip.split(/,\s*/);
				h.data("__set") || (h.unbind(p[0]).bind(p[0], function() {
					clearTimeout(i), clearTimeout(j)
				}), p[1] && !d.is("input:not(:checkbox, :radio), textarea") && h.unbind(p[1]).bind(p[1], function(a) {
					a.relatedTarget != d[0] && d.trigger(r[1].split(" ")[0])
				}), e.tip || h.data("__set", !0));
				return f
			},
			hide: function(c) {
				if (!h || !f.isShown()) return f;
				c = a.Event(), c.type = "onBeforeHide", g.trigger(c);
				if (!c.isDefaultPrevented()) {
					n = !1, b[e.effect][1].call(f, function() {
						c.type = "onHide", g.trigger(c)
					});
					return f
				}
			},
			isShown: function(a) {
				return a ? n == "full" : n
			},
			getConf: function() {
				return e
			},
			getTip: function() {
				return h
			},
			getTrigger: function() {
				return d
			}
		}), a.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","), function(b, c) {
			a.isFunction(e[c]) && a(f).bind(c, e[c]), f[c] = function(b) {
				b && a(f).bind(c, b);
				return f
			}
		})
	}
	a.fn.tooltip = function(b) {
		var c = this.data("tooltip");
		if (c) return c;
		b = a.extend(!0, {}, a.tools.tooltip.conf, b), typeof b.position == "string" && (b.position = b.position.split(/,?\s/)), this.each(function() {
			c = new d(a(this), b), a(this).data("tooltip", c)
		});
		return b.api ? c : this
	}
})(jQuery);
(function(a) {
	var b = a.tools.tooltip;
	b.dynamic = {
		conf: {
			classNames: "top right bottom left"
		}
	};

	function c(b) {
		var c = a(window),
			d = c.width() + c.scrollLeft(),
			e = c.height() + c.scrollTop();
		return [b.offset().top <= c.scrollTop(), d <= b.offset().left + b.width(), e <= b.offset().top + b.height(), c.scrollLeft() >= b.offset().left]
	}
	function d(a) {
		var b = a.length;
		while (b--) if (a[b]) return !1;
		return !0
	}
	a.fn.dynamic = function(e) {
		typeof e == "number" && (e = {
			speed: e
		}), e = a.extend({}, b.dynamic.conf, e);
		var f = a.extend(!0, {}, e),
			g = e.classNames.split(/\s/),
			h;
		this.each(function() {
			var b = a(this).tooltip().onBeforeShow(function(b, e) {
				var i = this.getTip(),
					j = this.getConf();
				h || (h = [j.position[0], j.position[1], j.offset[0], j.offset[1], a.extend({}, j)]), a.extend(j, h[4]), j.position = [h[0], h[1]], j.offset = [h[2], h[3]], i.css({
					visibility: "hidden",
					position: "absolute",
					top: e.top,
					left: e.left
				}).show();
				var k = a.extend(!0, {}, f),
					l = c(i);
				if (!d(l)) {
					l[2] && (a.extend(j, k.top), j.position[0] = "top", i.addClass(g[0])), l[3] && (a.extend(j, k.right), j.position[1] = "right", i.addClass(g[1])), l[0] && (a.extend(j, k.bottom), j.position[0] = "bottom", i.addClass(g[2])), l[1] && (a.extend(j, k.left), j.position[1] = "left", i.addClass(g[3]));
					if (l[0] || l[2]) j.offset[0] *= -1;
					if (l[1] || l[3]) j.offset[1] *= -1
				}
				i.css({
					visibility: "visible"
				}).hide()
			});
			b.onBeforeShow(function() {
				var a = this.getConf(),
					b = this.getTip();
				setTimeout(function() {
					a.position = [h[0], h[1]], a.offset = [h[2], h[3]]
				}, 0)
			}), b.onHide(function() {
				var a = this.getTip();
				a.removeClass(e.classNames)
			}), ret = b
		});
		return e.api ? ret : this
	}
})(jQuery);
(function(a) {
	var b = a.tools.tooltip;
	a.extend(b.conf, {
		direction: "up",
		bounce: !1,
		slideOffset: 10,
		slideInSpeed: 200,
		slideOutSpeed: 200,
		slideFade: !a.browser.msie
	});
	var c = {
		up: ["-", "top"],
		down: ["+", "top"],
		left: ["-", "left"],
		right: ["+", "left"]
	};
	b.addEffect("slide", function(a) {
		var b = this.getConf(),
			d = this.getTip(),
			e = b.slideFade ? {
				opacity: b.opacity
			} : {},
			f = c[b.direction] || c.up;
		e[f[1]] = f[0] + "=" + b.slideOffset, b.slideFade && d.css({
			opacity: 0
		}), d.show().animate(e, b.slideInSpeed, a)
	}, function(b) {
		var d = this.getConf(),
			e = d.slideOffset,
			f = d.slideFade ? {
				opacity: 0
			} : {},
			g = c[d.direction] || c.up,
			h = "" + g[0];
		d.bounce && (h = h == "+" ? "-" : "+"), f[g[1]] = h + "=" + e, this.getTip().animate(f, d.slideOutSpeed, function() {
			a(this).hide(), b.call()
		})
	})
})(jQuery);
(function(a, b, c) {
	"use strict";
	var d = b.event,
		e;
	d.special.smartresize = {
		setup: function() {
			b(this).bind("resize", d.special.smartresize.handler)
		},
		teardown: function() {
			b(this).unbind("resize", d.special.smartresize.handler)
		},
		handler: function(a, c) {
			var d = this,
				f = arguments;
			a.type = "smartresize", e && clearTimeout(e), e = setTimeout(function() {
				b.event.handle.apply(d, f)
			}, c === "execAsap" ? 0 : 100)
		}
	}, b.fn.smartresize = function(a) {
		return a ? this.bind("smartresize", a) : this.trigger("smartresize", ["execAsap"])
	}, b.Mason = function(a, c) {
		this.element = b(c), this._create(a), this._init()
	}, b.Mason.settings = {
		isResizable: !0,
		isAnimated: !1,
		animationOptions: {
			queue: !1,
			duration: 500
		},
		gutterWidth: 0,
		isRTL: !1,
		isFitWidth: !1,
		containerStyle: {
			position: "relative"
		}
	}, b.Mason.prototype = {
		_filterFindBricks: function(a) {
			var b = this.options.itemSelector;
			return b ? a.filter(b).add(a.find(b)) : a
		},
		_getBricks: function(a) {
			var b = this._filterFindBricks(a).css({
				position: "absolute"
			}).addClass("masonry-brick");
			return b
		},
		_create: function(c) {
			this.options = b.extend(!0, {}, b.Mason.settings, c), this.styleQueue = [];
			var d = this.element[0].style;
			this.originalStyle = {
				height: d.height || ""
			};
			var e = this.options.containerStyle;
			for (var f in e) this.originalStyle[f] = d[f] || "";
			this.element.css(e), this.horizontalDirection = this.options.isRTL ? "right" : "left", this.offset = {
				x: parseInt(this.element.css("padding-" + this.horizontalDirection), 10),
				y: parseInt(this.element.css("padding-top"), 10)
			}, this.isFluid = this.options.columnWidth && typeof this.options.columnWidth == "function";
			var g = this;
			setTimeout(function() {
				g.element.addClass("masonry")
			}, 0), this.options.isResizable && b(a).bind("smartresize.masonry", function() {
				g.resize()
			}), this.reloadItems()
		},
		_init: function(a) {
			this._getColumns(), this._reLayout(a)
		},
		option: function(a, c) {
			b.isPlainObject(a) && (this.options = b.extend(!0, this.options, a))
		},
		layout: function(a, b) {
			for (var c = 0, d = a.length; c < d; c++) this._placeBrick(a[c]);
			var e = {};
			e.height = Math.max.apply(Math, this.colYs);
			if (this.options.isFitWidth) {
				var f = 0;
				c = this.cols;
				while (--c) {
					if (this.colYs[c] !== 0) break;
					f++
				}
				e.width = (this.cols - f) * this.columnWidth - this.options.gutterWidth
			}
			this.styleQueue.push({
				$el: this.element,
				style: e
			});
			var g = this.isLaidOut ? this.options.isAnimated ? "animate" : "css" : "css",
				h = this.options.animationOptions,
				i;
			for (c = 0, d = this.styleQueue.length; c < d; c++) i = this.styleQueue[c], i.$el[g](i.style, h);
			this.styleQueue = [], b && b.call(a), this.isLaidOut = !0
		},
		_getColumns: function() {
			var a = this.options.isFitWidth ? this.element.parent() : this.element,
				b = a.width();
			this.columnWidth = this.isFluid ? this.options.columnWidth(b) : this.options.columnWidth || this.$bricks.outerWidth(!0) || b, this.columnWidth += this.options.gutterWidth, this.cols = Math.floor((b + this.options.gutterWidth) / this.columnWidth), this.cols = Math.max(this.cols, 1)
		},
		_placeBrick: function(a) {
			var c = b(a),
				d, e, f, g, h;
			d = Math.ceil(c.outerWidth(!0) / this.columnWidth), d = Math.min(d, this.cols);
			if (d === 1) f = this.colYs;
			else {
				e = this.cols + 1 - d, f = [];
				for (h = 0; h < e; h++) g = this.colYs.slice(h, h + d), f[h] = Math.max.apply(Math, g)
			}
			var i = Math.min.apply(Math, f),
				j = 0;
			for (var k = 0, l = f.length; k < l; k++) if (f[k] === i) {
				j = k;
				break
			}
			var m = {
				top: i + this.offset.y
			};
			m[this.horizontalDirection] = this.columnWidth * j + this.offset.x, this.styleQueue.push({
				$el: c,
				style: m
			});
			var n = i + c.outerHeight(!0),
				o = this.cols + 1 - l;
			for (k = 0; k < o; k++) this.colYs[j + k] = n
		},
		resize: function() {
			var a = this.cols;
			this._getColumns(), (this.isFluid || this.cols !== a) && this._reLayout()
		},
		_reLayout: function(a) {
			var b = this.cols;
			this.colYs = [];
			while (b--) this.colYs.push(0);
			this.layout(this.$bricks, a)
		},
		reloadItems: function() {
			this.$bricks = this._getBricks(this.element.children())
		},
		reload: function(a) {
			this.reloadItems(), this._init(a)
		},
		appended: function(a, b, c) {
			if (b) {
				this._filterFindBricks(a).css({
					top: this.element.height()
				});
				var d = this;
				setTimeout(function() {
					d._appended(a, c)
				}, 1)
			} else this._appended(a, c)
		},
		_appended: function(a, b) {
			var c = this._getBricks(a);
			this.$bricks = this.$bricks.add(c), this.layout(c, b)
		},
		remove: function(a) {
			this.$bricks = this.$bricks.not(a), a.remove()
		},
		destroy: function() {
			this.$bricks.removeClass("masonry-brick").each(function() {
				this.style.position = "", this.style.top = "", this.style.left = ""
			});
			var c = this.element[0].style;
			for (var d in this.originalStyle) c[d] = this.originalStyle[d];
			this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"), b(a).unbind(".masonry")
		}
	}, b.fn.imagesLoaded = function(a) {
		function h() {
			a.call(c, d)
		}
		function i(a) {
			var c = a.target;
			c.src !== f && b.inArray(c, g) === -1 && (g.push(c), --e <= 0 && (setTimeout(h), d.unbind(".imagesLoaded", i)))
		}
		var c = this,
			d = c.find("img").add(c.filter("img")),
			e = d.length,
			f = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
			g = [];
		return e || h(), d.bind("load.imagesLoaded error.imagesLoaded", i).each(function() {
			var a = this.src;
			this.src = f, this.src = a
		}), c
	};
	var f = function(b) {
			a.console && a.console.error(b)
		};
	b.fn.masonry = function(a) {
		if (typeof a == "string") {
			var c = Array.prototype.slice.call(arguments, 1);
			this.each(function() {
				var d = b.data(this, "masonry");
				if (!d) {
					f("cannot call methods on masonry prior to initialization; attempted to call method '" + a + "'");
					return
				}
				if (!b.isFunction(d[a]) || a.charAt(0) === "_") {
					f("no such method '" + a + "' for masonry instance");
					return
				}
				d[a].apply(d, c)
			})
		} else this.each(function() {
			var c = b.data(this, "masonry");
			c ? (c.option(a || {}), c._init()) : b.data(this, "masonry", new b.Mason(a, this))
		});
		return this
	}
})(window, jQuery);
var jQuery_formValidator_initConfig;
(function($) {
	$.formValidator = {
		sustainType: function(id, setting) {
			var elem = $("#" + id).get(0);
			var srcTag = elem.tagName;
			var stype = elem.type;
			switch (setting.validatetype) {
			case "InitValidator":
				return true;
			case "InputValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA" || srcTag == "SELECT") {
					return true
				} else {
					return false
				}
			case "CompareValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA") {
					if (stype == "checkbox" || stype == "radio") {
						return false
					} else {
						return true
					}
				}
				return false;
			case "AjaxValidator":
				if (stype == "text" || stype == "textarea" || stype == "file" || stype == "password" || stype == "select-one") {
					return true
				} else {
					return false
				}
			case "RegexValidator":
				if (srcTag == "INPUT" || srcTag == "TEXTAREA") {
					if (stype == "checkbox" || stype == "radio") {
						return false
					} else {
						return true
					}
				}
				return false;
			case "FunctionValidator":
				return true
			}
		},
		initConfig: function(controlOptions) {
			var settings = {
				debug: false,
				validatorgroup: "1",
				alertmessage: false,
				validobjectids: "",
				forcevalid: false,
				onsuccess: function() {
					return true
				},
				onerror: function() {},
				submitonce: false,
				formid: "",
				autotip: false,
				tidymode: false,
				errorfocus: true,
				wideword: true
			};
			controlOptions = controlOptions || {};
			$.extend(settings, controlOptions);
			if (settings.tidymode) {
				settings.errorfocus = false
			};
			if (settings.formid != "") {
				$("#" + settings.formid).submit(function() {
					return $.formValidator.pageIsValid("1")
				})
			};
			if (jQuery_formValidator_initConfig == null) {
				jQuery_formValidator_initConfig = new Array()
			}
			jQuery_formValidator_initConfig.push(settings)
		},
		appendValid: function(id, setting) {
			if (!$.formValidator.sustainType(id, setting)) return -1;
			var srcjo = $("#" + id).get(0);
			if (setting.validatetype == "InitValidator" || srcjo.settings == undefined) {
				srcjo.settings = new Array()
			}
			var len = srcjo.settings.push(setting);
			srcjo.settings[len - 1].index = len - 1;
			return len - 1
		},
		getInitConfig: function(validatorgroup) {
			if (jQuery_formValidator_initConfig != null) {
				for (i = 0; i < jQuery_formValidator_initConfig.length; i++) {
					if (validatorgroup == jQuery_formValidator_initConfig[i].validatorgroup) {
						return jQuery_formValidator_initConfig[i]
					}
				}
			}
			return null
		},
		triggerValidate: function(returnObj) {
			switch (returnObj.setting.validatetype) {
			case "InputValidator":
				$.formValidator.inputValid(returnObj);
				break;
			case "CompareValidator":
				$.formValidator.compareValid(returnObj);
				break;
			case "AjaxValidator":
				$.formValidator.ajaxValid(returnObj);
				break;
			case "RegexValidator":
				$.formValidator.regexValid(returnObj);
				break;
			case "FunctionValidator":
				$.formValidator.functionValid(returnObj);
				break
			}
		},
		setTipState: function(elem, showclass, showmsg) {
			var setting0 = elem.settings[0];
			var initConfig = $.formValidator.getInitConfig(setting0.validatorgroup);
			var tip = $("#" + setting0.tipid);
			if (showmsg == null || showmsg == "") {
				tip.hide()
			} else {
				if (initConfig.tidymode) {
					$("#fv_content").html(showmsg);
					elem.Tooltip = showmsg;
					if (showclass != "onError") {
						tip.hide()
					}
				}
				tip.removeClass();
				tip.addClass(showclass);
				tip.html(showmsg)
			}
		},
		resetTipState: function(validatorgroup) {
			var initConfig = $.formValidator.getInitConfig(validatorgroup);
			$(initConfig.validobjectids).each(function() {
				$.formValidator.setTipState(this, "onShow", this.settings[0].onshow)
			})
		},
		setFailState: function(tipid, showmsg) {
			var tip = $("#" + tipid);
			tip.removeClass();
			tip.addClass("onError");
			tip.html(showmsg)
		},
		showMessage: function(returnObj) {
			var id = returnObj.id;
			var elem = $("#" + id).get(0);
			var isvalid = returnObj.isvalid;
			var setting = returnObj.setting;
			var showmsg = "",
				showclass = "";
			var settings = $("#" + id).get(0).settings;
			var intiConfig = $.formValidator.getInitConfig(settings[0].validatorgroup);
			if (!isvalid) {
				showclass = "onError";
				if (setting.validatetype == "AjaxValidator") {
					if (setting.lastValid == "") {
						showclass = "onLoad";
						showmsg = setting.onwait
					} else {
						showmsg = setting.onerror
					}
				} else {
					showmsg = (returnObj.errormsg == "" ? setting.onerror : returnObj.errormsg)
				}
				if (intiConfig.alertmessage) {
					var elem = $("#" + id).get(0);
					if (elem.validoldvalue != $(elem).val()) {
						alert(showmsg)
					}
				} else {
					$.formValidator.setTipState(elem, showclass, showmsg)
				}
			} else {
				showmsg = $.formValidator.isEmpty(id) ? setting.onempty : setting.oncorrect;
				$.formValidator.setTipState(elem, "onCorrect", showmsg)
			}
			return showmsg
		},
		showAjaxMessage: function(returnObj) {
			var setting = returnObj.setting;
			var elem = $("#" + returnObj.id).get(0);
			if ((elem.settings[returnObj.ajax].cached ? elem.validoldvalue != $(elem).val() : true)) {
				$.formValidator.ajaxValid(returnObj)
			} else {
				if (setting.isvalid != undefined && !setting.isvalid) {
					elem.lastshowclass = "onError";
					elem.lastshowmsg = setting.onerror
				}
				$.formValidator.setTipState(elem, elem.lastshowclass, elem.lastshowmsg)
			}
		},
		getLength: function(id) {
			var srcjo = $("#" + id);
			var elem = srcjo.get(0);
			sType = elem.type;
			var len = 0;
			switch (sType) {
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
				var val = srcjo.val();
				var initConfig = $.formValidator.getInitConfig(elem.settings[0].validatorgroup);
				if (initConfig.wideword) {
					for (var i = 0; i < val.length; i++) {
						if (val.charCodeAt(i) >= 0x4e00 && val.charCodeAt(i) <= 0x9fa5) {
							len += 2
						} else {
							len++
						}
					}
				} else {
					len = val.length
				}
				break;
			case "checkbox":
			case "radio":
				len = $("input[type='" + sType + "'][name='" + srcjo.attr("name") + "']:checked").length;
				break;
			case "select-one":
				len = elem.options ? elem.options.selectedIndex : -1;
				break;
			case "select-multiple":
				len = $("select[name=" + elem.name + "] option:selected").length;
				break
			}
			return len
		},
		isEmpty: function(id) {
			if ($("#" + id).get(0).settings[0].empty && $.formValidator.getLength(id) == 0) {
				return true
			} else {
				return false
			}
		},
		isOneValid: function(id) {
			return $.formValidator.oneIsValid(id, 1).isvalid
		},
		oneIsValid: function(id, index) {
			var returnObj = new Object();
			returnObj.id = id;
			returnObj.ajax = -1;
			returnObj.errormsg = "";
			var elem = $("#" + id).get(0);
			var settings = elem.settings;
			var settingslen = settings.length;
			if (settingslen == 1) {
				settings[0].bind = false
			}
			if (!settings[0].bind) {
				return null
			}
			for (var i = 0; i < settingslen; i++) {
				if (i == 0) {
					if ($.formValidator.isEmpty(id)) {
						returnObj.isvalid = true;
						returnObj.setting = settings[0];
						break
					}
					continue
				}
				returnObj.setting = settings[i];
				if (settings[i].validatetype != "AjaxValidator") {
					$.formValidator.triggerValidate(returnObj)
				} else {
					returnObj.ajax = i
				}
				if (!settings[i].isvalid) {
					returnObj.isvalid = false;
					returnObj.setting = settings[i];
					break
				} else {
					returnObj.isvalid = true;
					returnObj.setting = settings[0];
					if (settings[i].validatetype == "AjaxValidator") break
				}
			}
			return returnObj
		},
		pageIsValid: function(validatorgroup) {
			if (validatorgroup == null || validatorgroup == undefined) {
				validatorgroup = "1"
			};
			var isvalid = true;
			var thefirstid = "",
				thefirsterrmsg;
			var returnObj, setting;
			var error_tip = "^";
			var initConfig = $.formValidator.getInitConfig(validatorgroup);
			var jqObjs = $(initConfig.validobjectids);
			jqObjs.each(function(i, elem) {
				if (elem.settings[0].bind) {
					returnObj = $.formValidator.oneIsValid(elem.id, 1);
					if (returnObj) {
						var tipid = elem.settings[0].tipid;
						if (!returnObj.isvalid) {
							isvalid = false;
							if (thefirstid == "") {
								thefirstid = returnObj.id;
								thefirsterrmsg = (returnObj.errormsg == "" ? returnObj.setting.onerror : returnObj.errormsg)
							}
						}
						if (!initConfig.alertmessage) {
							if (error_tip.indexOf("^" + tipid + "^") == -1) {
								if (!returnObj.isvalid) {
									error_tip = error_tip + tipid + "^"
								}
								$.formValidator.showMessage(returnObj)
							}
						}
					}
				}
			});
			if (isvalid) {
				isvalid = initConfig.onsuccess();
				if (initConfig.submitonce) {
					$("input[type='submit']").attr("disabled", true)
				}
			} else {
				var obj = $("#" + thefirstid).get(0);
				initConfig.onerror(thefirsterrmsg, obj);
				if (thefirstid != "" && initConfig.errorfocus) {
					$("#" + thefirstid).focus()
				}
			}
			return !initConfig.debug && isvalid
		},
		ajaxValid: function(returnObj) {
			var id = returnObj.id;
			var srcjo = $("#" + id);
			var elem = srcjo.get(0);
			var settings = elem.settings;
			var setting = settings[returnObj.ajax];
			var ls_url = setting.url;
			if (srcjo.size() == 0 && settings[0].empty) {
				returnObj.setting = settings[0];
				returnObj.isvalid = true;
				$.formValidator.showMessage(returnObj);
				setting.isvalid = true;
				return
			}
			if (setting.addidvalue) {
				var parm = "clientid=" + id + "&" + id + "=" + encodeURIComponent(srcjo.val());
				if (setting.getdata) {
					$.each(setting.getdata, function(i, n) {
						parm += "&" + i + "=" + $('#' + n).val()
					})
				}
				ls_url = ls_url + (ls_url.indexOf("?") > -1 ? ("&" + parm) : ("?" + parm));
				if (typeof(pc_hash) != 'undefined') {
					ls_url = ls_url + (ls_url.indexOf("?") > -1 ? ("&pc_hash=" + pc_hash) : ("?pc_hash=" + pc_hash))
				}
			}
			$.ajax({
				mode: "abort",
				type: setting.type,
				url: ls_url,
				cache: setting.cache,
				data: setting.data,
				async: setting.async,
				dataType: setting.datatype,
				success: function(data) {
					if (setting.success(data)) {
						$.formValidator.setTipState(elem, "onCorrect", settings[0].oncorrect);
						setting.isvalid = true
					} else {
						$.formValidator.setTipState(elem, "onError", setting.onerror);
						setting.isvalid = false
					}
				},
				complete: function() {
					if (setting.buttons && setting.buttons.length > 0) {
						setting.buttons.attr({
							"disabled": false
						})
					};
					setting.complete
				},
				beforeSend: function(xhr) {
					if (setting.buttons && setting.buttons.length > 0) {
						setting.buttons.attr({
							"disabled": true
						})
					};
					var isvalid = setting.beforesend(xhr);
					if (isvalid) {
						setting.isvalid = false;
						$.formValidator.setTipState(elem, "onLoad", settings[returnObj.ajax].onwait)
					}
					setting.lastValid = "-1";
					return isvalid
				},
				error: function() {
					$.formValidator.setTipState(elem, "onError", setting.onerror);
					setting.isvalid = false;
					setting.error()
				},
				processData: setting.processdata
			})
		},
		regexValid: function(returnObj) {
			var id = returnObj.id;
			var setting = returnObj.setting;
			var srcTag = $("#" + id).get(0).tagName;
			var elem = $("#" + id).get(0);
			if (elem.settings[0].empty && elem.value == "") {
				setting.isvalid = true
			} else {
				var regexpress = setting.regexp;
				if (setting.datatype == "enum") {
					regexpress = eval("regexEnum." + regexpress)
				}
				if (regexpress == undefined || regexpress == "") {
					setting.isvalid = false;
					return
				}
				setting.isvalid = (new RegExp(regexpress, setting.param)).test($("#" + id).val())
			}
		},
		functionValid: function(returnObj) {
			var id = returnObj.id;
			var setting = returnObj.setting;
			var srcjo = $("#" + id);
			var lb_ret = setting.fun(srcjo.val(), srcjo.get(0));
			if (lb_ret != undefined) {
				if (typeof lb_ret == "string") {
					setting.isvalid = false;
					returnObj.errormsg = lb_ret
				} else {
					setting.isvalid = lb_ret
				}
			}
		},
		inputValid: function(returnObj) {
			var id = returnObj.id;
			var setting = returnObj.setting;
			var srcjo = $("#" + id);
			var elem = srcjo.get(0);
			var val = srcjo.val();
			var sType = elem.type;
			var len = $.formValidator.getLength(id);
			var empty = setting.empty,
				emptyerror = false;
			switch (sType) {
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
				if (setting.type == "size") {
					empty = setting.empty;
					if (!empty.leftempty) {
						emptyerror = (val.replace(/^[ \s]+/, '').length != val.length)
					}
					if (!emptyerror && !empty.rightempty) {
						emptyerror = (val.replace(/[ \s]+$/, '').length != val.length)
					}
					if (emptyerror && empty.emptyerror) {
						returnObj.errormsg = empty.emptyerror
					}
				}
			case "checkbox":
			case "select-one":
			case "select-multiple":
			case "radio":
				var lb_go_on = false;
				if (sType == "select-one" || sType == "select-multiple") {
					setting.type = "size"
				}
				var type = setting.type;
				if (type == "size") {
					if (!emptyerror) {
						lb_go_on = true
					}
					if (lb_go_on) {
						val = len
					}
				} else if (type == "date" || type == "datetime") {
					var isok = false;
					if (type == "date") {
						lb_go_on = isDate(val)
					};
					if (type == "datetime") {
						lb_go_on = isDate(val)
					};
					if (lb_go_on) {
						val = new Date(val);
						setting.min = new Date(setting.min);
						setting.max = new Date(setting.max)
					}
				} else {
					stype = (typeof setting.min);
					if (stype == "number") {
						val = (new Number(val)).valueOf();
						if (!isNaN(val)) {
							lb_go_on = true
						}
					}
					if (stype == "string") {
						lb_go_on = true
					}
				}
				setting.isvalid = false;
				if (lb_go_on) {
					if (val < setting.min || val > setting.max) {
						if (val < setting.min && setting.onerrormin) {
							returnObj.errormsg = setting.onerrormin
						}
						if (val > setting.min && setting.onerrormax) {
							returnObj.errormsg = setting.onerrormax
						}
					} else {
						setting.isvalid = true
					}
				}
				break
			}
		},
		compareValid: function(returnObj) {
			var id = returnObj.id;
			var setting = returnObj.setting;
			var srcjo = $("#" + id);
			var desjo = $("#" + setting.desid);
			var ls_datatype = setting.datatype;
			setting.isvalid = false;
			curvalue = srcjo.val();
			ls_data = desjo.val();
			if (ls_datatype == "number") {
				if (!isNaN(curvalue) && !isNaN(ls_data)) {
					curvalue = parseFloat(curvalue);
					ls_data = parseFloat(ls_data)
				} else {
					return
				}
			}
			if (ls_datatype == "date" || ls_datatype == "datetime") {
				var isok = false;
				if (ls_datatype == "date") {
					isok = (isDate(curvalue) && isDate(ls_data))
				};
				if (ls_datatype == "datetime") {
					isok = (isDateTime(curvalue) && isDateTime(ls_data))
				};
				if (isok) {
					curvalue = new Date(curvalue);
					ls_data = new Date(ls_data)
				} else {
					return
				}
			}
			switch (setting.operateor) {
			case "=":
				if (curvalue == ls_data) {
					setting.isvalid = true
				}
				break;
			case "!=":
				if (curvalue != ls_data) {
					setting.isvalid = true
				}
				break;
			case ">":
				if (curvalue > ls_data) {
					setting.isvalid = true
				}
				break;
			case ">=":
				if (curvalue >= ls_data) {
					setting.isvalid = true
				}
				break;
			case "<":
				if (curvalue < ls_data) {
					setting.isvalid = true
				}
				break;
			case "<=":
				if (curvalue <= ls_data) {
					setting.isvalid = true
				}
				break
			}
		},
		localTooltip: function(e) {
			e = e || window.event;
			var mouseX = e.pageX || (e.clientX ? e.clientX + document.body.scrollLeft : 0);
			var mouseY = e.pageY || (e.clientY ? e.clientY + document.body.scrollTop : 0);
			$("#fvtt").css({
				"top": (mouseY + 2) + "px",
				"left": (mouseX - 40) + "px"
			})
		}
	};
	$.fn.formValidator = function(cs) {
		var setting = {
			validatorgroup: "1",
			empty: false,
			submitonce: false,
			automodify: false,
			onshow: "请输入内容",
			onfocus: "请输入内容",
			oncorrect: "输入正确",
			onempty: "输入内容为空",
			defaultvalue: null,
			bind: true,
			validatetype: "InitValidator",
			tipcss: {
				"left": "10px",
				"top": "1px",
				"height": "20px",
				"width": "250px"
			},
			triggerevent: "blur",
			forcevalid: false
		};
		cs = cs || {};
		if (cs.validatorgroup == undefined) {
			cs.validatorgroup = "1"
		};
		var initConfig = $.formValidator.getInitConfig(cs.validatorgroup);
		if (initConfig.tidymode) {
			setting.tipcss = {
				"left": "2px",
				"width": "22px",
				"height": "22px",
				"display": "none"
			}
		};
		$.extend(true, setting, cs);
		return this.each(function(e) {
			var jqobj = $(this);
			var setting_temp = {};
			$.extend(true, setting_temp, setting);
			var tip = setting_temp.tipid ? setting_temp.tipid : this.id + "Tip";
			if (initConfig.autotip) {
				if ($("body [id=" + tip + "]").length == 0) {
					aftertip = setting_temp.relativeid ? setting_temp.relativeid : this.id;
					$('#' + aftertip).parent().append("<div id='" + tip + "'></div>")
				}
				if (initConfig.tidymode) {
					jqobj.showTooltips()
				}
			}
			setting.tipid = tip;
			$.formValidator.appendValid(this.id, setting);
			var validobjectids = initConfig.validobjectids;
			if (validobjectids.indexOf("#" + this.id + " ") == -1) {
				initConfig.validobjectids = (validobjectids == "" ? "#" + this.id : validobjectids + ",#" + this.id)
			}
			if (!initConfig.alertmessage) {
				$.formValidator.setTipState(this, "onShow", setting.onshow)
			}
			var srcTag = this.tagName.toLowerCase();
			var stype = this.type;
			var defaultval = setting.defaultvalue;
			if (defaultval) {
				jqobj.val(defaultval)
			}
			if (srcTag == "input" || srcTag == "textarea") {
				jqobj.focus(function() {
					if (!initConfig.alertmessage) {
						var tipjq = $("#" + tip);
						this.lastshowclass = tipjq.attr("class");
						this.lastshowmsg = tipjq.html();
						$.formValidator.setTipState(this, "onFocus", setting.onfocus)
					}
				});
				jqobj.bind(setting.triggerevent, function() {
					var settings = this.settings;
					var returnObj = $.formValidator.oneIsValid(this.id, 1);
					if (returnObj == null) {
						return
					}
					if (returnObj.ajax >= 0) {
						$.formValidator.showAjaxMessage(returnObj)
					} else {
						var showmsg = $.formValidator.showMessage(returnObj);
						if (!returnObj.isvalid) {
							var auto = setting.automodify && (this.type == "text" || this.type == "textarea" || this.type == "file");
							if (auto && !initConfig.alertmessage) {
								alert(showmsg);
								$.formValidator.setTipState(this, "onShow", setting.onshow)
							} else {
								if (initConfig.forcevalid || setting.forcevalid) {
									alert(showmsg);
									this.focus()
								}
							}
						}
					}
				})
			} else if (srcTag == "select") {
				jqobj.bind("focus", function() {
					if (!initConfig.alertmessage) {
						$.formValidator.setTipState(this, "onFocus", setting.onfocus)
					}
				});
				jqobj.bind("blur", function() {
					jqobj.trigger("change")
				});
				jqobj.bind("change", function() {
					var returnObj = $.formValidator.oneIsValid(this.id, 1);
					if (returnObj == null) {
						return
					}
					if (returnObj.ajax >= 0) {
						$.formValidator.showAjaxMessage(returnObj)
					} else {
						$.formValidator.showMessage(returnObj)
					}
				})
			}
		})
	};
	$.fn.inputValidator = function(controlOptions) {
		var settings = {
			isvalid: false,
			min: 0,
			max: 99999999999999,
			type: "size",
			onerror: "输入错误",
			validatetype: "InputValidator",
			empty: {
				leftempty: true,
				rightempty: true,
				leftemptyerror: null,
				rightemptyerror: null
			},
			wideword: true
		};
		controlOptions = controlOptions || {};
		$.extend(true, settings, controlOptions);
		return this.each(function() {
			$.formValidator.appendValid(this.id, settings)
		})
	};
	$.fn.compareValidator = function(controlOptions) {
		var settings = {
			isvalid: false,
			desid: "",
			operateor: "=",
			onerror: "输入错误",
			validatetype: "CompareValidator"
		};
		controlOptions = controlOptions || {};
		$.extend(true, settings, controlOptions);
		return this.each(function() {
			$.formValidator.appendValid(this.id, settings)
		})
	};
	$.fn.regexValidator = function(controlOptions) {
		var settings = {
			isvalid: false,
			regexp: "",
			param: "i",
			datatype: "string",
			onerror: "输入的格式不正确",
			validatetype: "RegexValidator"
		};
		controlOptions = controlOptions || {};
		$.extend(true, settings, controlOptions);
		return this.each(function() {
			$.formValidator.appendValid(this.id, settings)
		})
	};
	$.fn.functionValidator = function(controlOptions) {
		var settings = {
			isvalid: true,
			fun: function() {
				this.isvalid = true
			},
			validatetype: "FunctionValidator",
			onerror: "输入错误"
		};
		controlOptions = controlOptions || {};
		$.extend(true, settings, controlOptions);
		return this.each(function() {
			$.formValidator.appendValid(this.id, settings)
		})
	};
	$.fn.ajaxValidator = function(controlOptions) {
		var settings = {
			isvalid: false,
			lastValid: "",
			type: "GET",
			url: "",
			addidvalue: true,
			datatype: "html",
			data: "",
			async: true,
			cache: false,
			cached: true,
			getdata: '',
			beforesend: function() {
				return true
			},
			success: function() {
				return true
			},
			complete: function() {},
			processdata: false,
			error: function() {},
			buttons: null,
			onerror: "服务器校验没有通过",
			onwait: "正在等待服务器返回数据",
			validatetype: "AjaxValidator"
		};
		controlOptions = controlOptions || {};
		$.extend(true, settings, controlOptions);
		return this.each(function() {
			$.formValidator.appendValid(this.id, settings)
		})
	};
	$.fn.defaultPassed = function(onshow) {
		return this.each(function() {
			var settings = this.settings;
			for (var i = 1; i < settings.length; i++) {
				settings[i].isvalid = true;
				if (!$.formValidator.getInitConfig(settings[0].validatorgroup).alertmessage) {
					var ls_style = onshow ? "onShow" : "onCorrect";
					$.formValidator.setTipState(this, ls_style, settings[0].oncorrect)
				}
			}
		})
	};
	$.fn.unFormValidator = function(unbind) {
		return this.each(function() {
			this.settings[0].bind = !unbind;
			if (unbind) {
				$("#" + this.settings[0].tipid).hide()
			} else {
				$("#" + this.settings[0].tipid).show()
			}
		})
	};
	$.fn.showTooltips = function() {
		if ($("body [id=fvtt]").length == 0) {
			fvtt = $("<div id='fvtt' style='position:absolute;z-index:56002'></div>");
			$("body").append(fvtt);
			fvtt.before("<iframe src='about:blank' class='fv_iframe' scrolling='no' frameborder='0'></iframe>")
		}
		return this.each(function() {
			jqobj = $(this);
			s = $("<span class='top' id=fv_content style='display:block'></span>");
			b = $("<b class='bottom' style='display:block' />");
			this.tooltip = $("<span class='fv_tooltip' style='display:block'></span>").append(s).append(b).css({
				"filter": "alpha(opacity:95)",
				"KHTMLOpacity": "0.95",
				"MozOpacity": "0.95",
				"opacity": "0.95"
			});
			jqobj.mouseover(function(e) {
				$("#fvtt").append(this.tooltip);
				$("#fv_content").html(this.Tooltip);
				$.formValidator.localTooltip(e)
			});
			jqobj.mouseout(function() {
				$("#fvtt").empty()
			});
			jqobj.mousemove(function(e) {
				$("#fv_content").html(this.Tooltip);
				$.formValidator.localTooltip(e)
			})
		})
	}
})(jQuery);
var regexEnum = {
	intege: "^-?[1-9]\\d*$",
	intege1: "^[1-9]\\d*$",
	intege2: "^-[1-9]\\d*$",
	num: "^([+-]?)\\d*\\.?\\d+$",
	num1: "^[1-9]\\d*|0$",
	num2: "^-[1-9]\\d*|0$",
	decmal: "^([+-]?)\\d*\\.\\d+$",
	decmal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",
	　　
	decmal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$",
	　
	decmal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$",
	　
	decmal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",
	　　
	decmal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",
	　　
	email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",
	color: "^[a-fA-F0-9]{6}$",
	url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",
	chinese: "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",
	ascii: "^[\\x00-\\xFF]+$",
	zipcode: "^\\d{6}$",
	mobile: "^(1)[0-9]{10}$",
	ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",
	notempty: "^\\S+$",
	picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",
	rar: "(.*)\\.(rar|zip|7zip|tgz)$",
	date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",
	qq: "^[1-9]*[1-9][0-9]*$",
	tel: "^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$",
	username: "^\\w+$",
	letter: "^[A-Za-z]+$",
	letter_u: "^[A-Z]+$",
	letter_l: "^[a-z]+$",
	idcard: "^[1-9]([0-9]{14}|[0-9]{17})$",
	ps_username: "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D_\\w]+$"
}

function isCardID(sId) {
	var iSum = 0;
	var info = "";
	if (!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
	sId = sId.replace(/x$/i, "a");
	if (aCity[parseInt(sId.substr(0, 2))] == null) return "你的身份证地区非法";
	sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
	var d = new Date(sBirthday.replace(/-/g, "/"));
	if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
	for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
	if (iSum % 11 != 1) return "你输入的身份证号非法";
	return true;
}

function isTime(str) {
	var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
	if (a == null) {
		return false
	}
	if (a[1] > 24 || a[3] > 60 || a[4] > 60) {
		return false;
	}
	return true;
}

function isDate(str) {
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (r == null) return false;
	var d = new Date(r[1], r[3] - 1, r[4]);
	return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
}

function isDateTime(str) {
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
	var r = str.match(reg);
	if (r == null) return false;
	var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
	return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
}
var qq = qq || {};
qq.extend = function(first, second) {
	for (var prop in second) {
		first[prop] = second[prop];
	}
};
qq.indexOf = function(arr, elt, from) {
	if (arr.indexOf) return arr.indexOf(elt, from);
	from = from || 0;
	var len = arr.length;
	if (from < 0) from += len;
	for (; from < len; from++) {
		if (from in arr && arr[from] === elt) {
			return from;
		}
	}
	return -1;
};
qq.getUniqueId = (function() {
	var id = 0;
	return function() {
		return id++;
	};
})();
qq.ie = function() {
	return navigator.userAgent.indexOf('MSIE') != -1;
}
qq.safari = function() {
	return navigator.vendor != undefined && navigator.vendor.indexOf("Apple") != -1;
}
qq.chrome = function() {
	return navigator.vendor != undefined && navigator.vendor.indexOf('Google') != -1;
}
qq.firefox = function() {
	return (navigator.userAgent.indexOf('Mozilla') != -1 && navigator.vendor != undefined && navigator.vendor == '');
}
qq.windows = function() {
	return navigator.platform == "Win32";
}
qq.attach = function(element, type, fn) {
	if (element.addEventListener) {
		element.addEventListener(type, fn, false);
	} else if (element.attachEvent) {
		element.attachEvent('on' + type, fn);
	}
	return function() {
		qq.detach(element, type, fn)
	}
};
qq.detach = function(element, type, fn) {
	if (element.removeEventListener) {
		element.removeEventListener(type, fn, false);
	} else if (element.attachEvent) {
		element.detachEvent('on' + type, fn);
	}
};
qq.preventDefault = function(e) {
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
};
qq.insertBefore = function(a, b) {
	b.parentNode.insertBefore(a, b);
};
qq.remove = function(element) {
	element.parentNode.removeChild(element);
};
qq.contains = function(parent, descendant) {
	if (parent == descendant) return true;
	if (parent.contains) {
		return parent.contains(descendant);
	} else {
		return !!(descendant.compareDocumentPosition(parent) & 8);
	}
};
qq.toElement = (function() {
	var div = document.createElement('div');
	return function(html) {
		div.innerHTML = html;
		var element = div.firstChild;
		div.removeChild(element);
		return element;
	};
})();
qq.css = function(element, styles) {
	if (styles.opacity != null) {
		if (typeof element.style.opacity != 'string' && typeof(element.filters) != 'undefined') {
			styles.filter = 'alpha(opacity=' + Math.round(100 * styles.opacity) + ')';
		}
	}
	qq.extend(element.style, styles);
};
qq.hasClass = function(element, name) {
	var re = new RegExp('(^| )' + name + '( |$)');
	return re.test(element.className);
};
qq.addClass = function(element, name) {
	if (!qq.hasClass(element, name)) {
		element.className += ' ' + name;
	}
};
qq.removeClass = function(element, name) {
	var re = new RegExp('(^| )' + name + '( |$)');
	element.className = element.className.replace(re, ' ').replace(/^\s+|\s+$/g, "");
};
qq.setText = function(element, text) {
	element.innerText = text;
	element.textContent = text;
};
qq.children = function(element) {
	var children = [],
		child = element.firstChild;
	while (child) {
		if (child.nodeType == 1) {
			children.push(child);
		}
		child = child.nextSibling;
	}
	return children;
};
qq.getByClass = function(element, className) {
	if (element.querySelectorAll) {
		return element.querySelectorAll('.' + className);
	}
	var result = [];
	var candidates = element.getElementsByTagName("*");
	var len = candidates.length;
	for (var i = 0; i < len; i++) {
		if (qq.hasClass(candidates[i], className)) {
			result.push(candidates[i]);
		}
	}
	return result;
};
qq.obj2url = function(obj, temp, prefixDone) {
	var uristrings = [],
		prefix = '&',
		add = function(nextObj, i) {
			var nextTemp = temp ? (/\[\]$/.test(temp)) ? temp : temp + '[' + i + ']' : i;
			if ((nextTemp != 'undefined') && (i != 'undefined')) {
				uristrings.push((typeof nextObj === 'object') ? qq.obj2url(nextObj, nextTemp, true) : (Object.prototype.toString.call(nextObj) === '[object Function]') ? encodeURIComponent(nextTemp) + '=' + encodeURIComponent(nextObj()) : encodeURIComponent(nextTemp) + '=' + encodeURIComponent(nextObj));
			}
		};
	if (!prefixDone && temp) {
		prefix = (/\?/.test(temp)) ? (/\?$/.test(temp)) ? '' : '&' : '?';
		uristrings.push(temp);
		uristrings.push(qq.obj2url(obj));
	} else if ((Object.prototype.toString.call(obj) === '[object Array]') && (typeof obj != 'undefined')) {
		for (var i = 0, len = obj.length; i < len; ++i) {
			add(obj[i], i);
		}
	} else if ((typeof obj != 'undefined') && (obj !== null) && (typeof obj === "object")) {
		for (var i in obj) {
			add(obj[i], i);
		}
	} else {
		uristrings.push(encodeURIComponent(temp) + '=' + encodeURIComponent(obj));
	}
	return uristrings.join(prefix).replace(/^&/, '').replace(/%20/g, '+');
};
var qq = qq || {};
qq.FileUploaderBasic = function(o) {
	var that = this;
	this._options = {
		debug: false,
		action: '/server/upload',
		params: {},
		customHeaders: {},
		button: null,
		multiple: true,
		maxConnections: 3,
		disableCancelForFormUploads: false,
		autoUpload: true,
		forceMultipart: false,
		allowedExtensions: [],
		acceptFiles: null,
		sizeLimit: 0,
		minSizeLimit: 0,
		stopOnFirstInvalidFile: true,
		onSubmit: function(id, fileName) {},
		onComplete: function(id, fileName, responseJSON) {},
		onCancel: function(id, fileName) {},
		onUpload: function(id, fileName, xhr) {},
		onProgress: function(id, fileName, loaded, total) {},
		onError: function(id, fileName, reason) {},
		messages: {
			typeError: "{file} has an invalid extension. Valid extension(s): {extensions}.",
			sizeError: "{file} is too large, maximum file size is {sizeLimit}.",
			minSizeError: "{file} is too small, minimum file size is {minSizeLimit}.",
			emptyError: "{file} is empty, please select files again without it.",
			noFilesError: "No files to upload.",
			onLeave: "The files are being uploaded, if you leave now the upload will be cancelled."
		},
		showMessage: function(message) {
			alert(message);
		},
		inputName: 'qqfile'
	};
	qq.extend(this._options, o);
	this._wrapCallbacks();
	qq.extend(this, qq.DisposeSupport);
	this._filesInProgress = 0;
	this._storedFileIds = [];
	this._handler = this._createUploadHandler();
	if (this._options.button) {
		this._button = this._createUploadButton(this._options.button);
	}
	this._preventLeaveInProgress();
};
qq.FileUploaderBasic.prototype = {
	log: function(str) {
		if (this._options.debug && window.console) console.log('[uploader] ' + str);
	},
	setParams: function(params) {
		this._options.params = params;
	},
	getInProgress: function() {
		return this._filesInProgress;
	},
	uploadStoredFiles: function() {
		for (var i = 0; i < this._storedFileIds.length; i++) {
			this._filesInProgress++;
			this._handler.upload(this._storedFileIds[i], this._options.params);
		}
	},
	clearStoredFiles: function() {
		this._storedFileIds = [];
	},
	_createUploadButton: function(element) {
		var self = this;
		var button = new qq.UploadButton({
			element: element,
			multiple: this._options.multiple && qq.UploadHandlerXhr.isSupported(),
			acceptFiles: this._options.acceptFiles,
			onChange: function(input) {
				self._onInputChange(input);
			}
		});
		this.addDisposer(function() {
			button.dispose();
		});
		return button;
	},
	_createUploadHandler: function() {
		var self = this,
			handlerClass;
		if (qq.UploadHandlerXhr.isSupported()) {
			handlerClass = 'UploadHandlerXhr';
		} else {
			handlerClass = 'UploadHandlerForm';
		}
		var handler = new qq[handlerClass]({
			debug: this._options.debug,
			action: this._options.action,
			forceMultipart: this._options.forceMultipart,
			maxConnections: this._options.maxConnections,
			customHeaders: this._options.customHeaders,
			inputName: this._options.inputName,
			demoMode: this._options.demoMode,
			onProgress: function(id, fileName, loaded, total) {
				self._onProgress(id, fileName, loaded, total);
				self._options.onProgress(id, fileName, loaded, total);
			},
			onComplete: function(id, fileName, result) {
				self._onComplete(id, fileName, result);
				self._options.onComplete(id, fileName, result);
			},
			onCancel: function(id, fileName) {
				var indexToRemove = qq.indexOf(self._storedFileIds, id);
				if (indexToRemove >= 0) {
					self._storedFileIds.splice(indexToRemove, 1);
				}
				self._onCancel(id, fileName);
				self._options.onCancel(id, fileName);
			},
			onError: self._options.onError,
			onUpload: function(id, fileName, xhr) {
				self._onUpload(id, fileName, xhr);
				self._options.onUpload(id, fileName, xhr);
			}
		});
		return handler;
	},
	_preventLeaveInProgress: function() {
		var self = this;
		this._attach(window, 'beforeunload', function(e) {
			if (!self._filesInProgress) {
				return;
			}
			var e = e || window.event;
			e.returnValue = self._options.messages.onLeave;
			return self._options.messages.onLeave;
		});
	},
	_onSubmit: function(id, fileName) {
		if (this._options.autoUpload) {
			this._filesInProgress++;
		}
	},
	_onProgress: function(id, fileName, loaded, total) {},
	_onComplete: function(id, fileName, result) {
		var indexToRemove = qq.indexOf(this._storedFileIds, id);
		if (indexToRemove >= 0) {
			this._storedFileIds.splice(indexToRemove, 1);
		}
		this._filesInProgress--;
	},
	_onCancel: function(id, fileName) {
		if (this._options.autoUpload) {
			this._filesInProgress--;
		}
	},
	_onUpload: function(id, fileName, xhr) {},
	_onInputChange: function(input) {
		if (this._handler instanceof qq.UploadHandlerXhr) {
			this._uploadFileList(input.files);
		} else {
			if (this._validateFile(input)) {
				this._uploadFile(input);
			}
		}
		this._button.reset();
	},
	_uploadFileList: function(files) {
		if (files.length > 0) {
			for (var i = 0; i < files.length; i++) {
				if (this._validateFile(files[i])) {
					this._uploadFile(files[i]);
				} else {
					if (this._options.stopOnFirstInvalidFile) {
						return;
					}
				}
			}
		} else {
			this._error('noFilesError', "");
		}
	},
	_uploadFile: function(fileContainer) {
		var id = this._handler.add(fileContainer);
		var fileName = this._handler.getName(id);
		if (this._options.onSubmit(id, fileName) !== false) {
			this._onSubmit(id, fileName);
			if (this._options.autoUpload) {
				this._handler.upload(id, this._options.params);
			} else {
				this._storeFileForLater(id);
			}
		}
	},
	_storeFileForLater: function(id) {
		this._storedFileIds.push(id);
	},
	_validateFile: function(file) {
		var name, size;
		if (file.value) {
			name = file.value.replace(/.*(\/|\\)/, "");
		} else {
			name = (file.fileName !== null && file.fileName !== undefined) ? file.fileName : file.name;
			size = (file.fileSize !== null && file.fileSize !== undefined) ? file.fileSize : file.size;
		}
		if (!this._isAllowedExtension(name)) {
			this._error('typeError', name);
			return false;
		} else if (size === 0) {
			this._error('emptyError', name);
			return false;
		} else if (size && this._options.sizeLimit && size > this._options.sizeLimit) {
			this._error('sizeError', name);
			return false;
		} else if (size && size < this._options.minSizeLimit) {
			this._error('minSizeError', name);
			return false;
		}
		return true;
	},
	_error: function(code, fileName) {
		var message = this._options.messages[code];

		function r(name, replacement) {
			message = message.replace(name, replacement);
		}
		var extensions = this._options.allowedExtensions.join(', ');
		r('{file}', this._formatFileName(fileName));
		r('{extensions}', extensions);
		r('{sizeLimit}', this._formatSize(this._options.sizeLimit));
		r('{minSizeLimit}', this._formatSize(this._options.minSizeLimit));
		this._options.onError(null, fileName, message);
		this._options.showMessage(message);
	},
	_formatFileName: function(name) {
		if (name.length > 33) {
			name = name.slice(0, 19) + '...' + name.slice(-13);
		}
		return name;
	},
	_isAllowedExtension: function(fileName) {
		var ext = (-1 !== fileName.indexOf('.')) ? fileName.replace(/.*[.]/, '').toLowerCase() : '';
		var allowed = this._options.allowedExtensions;
		if (!allowed.length) {
			return true;
		}
		for (var i = 0; i < allowed.length; i++) {
			if (allowed[i].toLowerCase() == ext) {
				return true;
			}
		}
		return false;
	},
	_formatSize: function(bytes) {
		var i = -1;
		do {
			bytes = bytes / 1024;
			i++;
		} while (bytes > 99);
		return Math.max(bytes, 0.1).toFixed(1) + ['kB', 'MB', 'GB', 'TB', 'PB', 'EB'][i];
	},
	_wrapCallbacks: function() {
		var self, safeCallback;
		self = this;
		safeCallback = function(callback, args) {
			try {
				return callback.apply(this, args);
			} catch (exception) {
				self.log("Caught " + exception + " in callback: " + callback);
			}
		}
		for (var prop in this._options) {
			if (/^on[A-Z]/.test(prop)) {
				(function() {
					var oldCallback = self._options[prop];
					self._options[prop] = function() {
						return safeCallback(oldCallback, arguments);
					}
				}());
			}
		}
	}
};
qq.FileUploader = function(o) {
	qq.FileUploaderBasic.apply(this, arguments);
	qq.extend(this._options, {
		element: null,
		listElement: null,
		dragText: 'Drop files here to upload',
		extraDropzones: [],
		uploadButtonText: 'Upload a file',
		cancelButtonText: 'Cancel',
		failUploadText: 'Upload failed',
		template: '<div class="qq-uploader">' + '<div class="qq-upload-drop-area"><span>{dragText}</span></div>' + (!this._options.button ? '<div class="qq-upload-button">{uploadButtonText}</div>' : '') + (!this._options.listElement ? '<ul class="qq-upload-list"></ul>' : '') + '</div>',
		fileTemplate: '<li>' + '<div class="qq-progress-bar"></div>' + '<span class="qq-upload-spinner"></span>' + '<span class="qq-upload-finished"></span>' + '<span class="qq-upload-file"></span>' + '<span class="qq-upload-size"></span>' + '<a class="qq-upload-cancel" href="#">{cancelButtonText}</a>' + '<span class="qq-upload-failed-text">{failUploadtext}</span>' + '</li>',
		classes: {
			button: 'qq-upload-button',
			drop: 'qq-upload-drop-area',
			dropActive: 'qq-upload-drop-area-active',
			dropDisabled: 'qq-upload-drop-area-disabled',
			list: 'qq-upload-list',
			progressBar: 'qq-progress-bar',
			file: 'qq-upload-file',
			spinner: 'qq-upload-spinner',
			finished: 'qq-upload-finished',
			size: 'qq-upload-size',
			cancel: 'qq-upload-cancel',
			failText: 'qq-upload-failed-text',
			success: 'qq-upload-success',
			fail: 'qq-upload-fail',
			successIcon: null,
			failIcon: null
		},
		extraMessages: {
			formatProgress: "{percent}% of {total_size}",
			tooManyFilesError: "You may only drop one file"
		},
		failedUploadTextDisplay: {
			mode: 'default',
			maxChars: 50,
			responseProperty: 'error',
			enableTooltip: true
		}
	});
	qq.extend(this._options, o);
	this._wrapCallbacks();
	qq.extend(this._options.messages, this._options.extraMessages);
	this._options.template = this._options.template.replace(/\{dragText\}/g, this._options.dragText);
	this._options.template = this._options.template.replace(/\{uploadButtonText\}/g, this._options.uploadButtonText);
	this._options.fileTemplate = this._options.fileTemplate.replace(/\{cancelButtonText\}/g, this._options.cancelButtonText);
	this._options.fileTemplate = this._options.fileTemplate.replace(/\{failUploadtext\}/g, this._options.failUploadText);
	this._element = this._options.element;
	this._element.innerHTML = this._options.template;
	this._listElement = this._options.listElement || this._find(this._element, 'list');
	this._classes = this._options.classes;
	if (!this._button) {
		this._button = this._createUploadButton(this._find(this._element, 'button'));
	}
	this._bindCancelEvent();
	this._setupDragDrop();
};
qq.extend(qq.FileUploader.prototype, qq.FileUploaderBasic.prototype);
qq.extend(qq.FileUploader.prototype, {
	clearStoredFiles: function() {
		qq.FileUploaderBasic.prototype.clearStoredFiles.apply(this, arguments);
		this._listElement.innerHTML = "";
	},
	addExtraDropzone: function(element) {
		this._setupExtraDropzone(element);
	},
	removeExtraDropzone: function(element) {
		var dzs = this._options.extraDropzones;
		for (var i in dzs) if (dzs[i] === element) return this._options.extraDropzones.splice(i, 1);
	},
	_leaving_document_out: function(e) {
		return ((qq.chrome() || (qq.safari() && qq.windows())) && e.clientX == 0 && e.clientY == 0) || (qq.firefox() && !e.relatedTarget);
	},
	_storeFileForLater: function(id) {
		qq.FileUploaderBasic.prototype._storeFileForLater.apply(this, arguments);
		var item = this._getItemByFileId(id);
		this._find(item, 'spinner').style.display = "none";
	},
	_find: function(parent, type) {
		var element = qq.getByClass(parent, this._options.classes[type])[0];
		if (!element) {
			throw new Error('element not found ' + type);
		}
		return element;
	},
	_setupExtraDropzone: function(element) {
		this._options.extraDropzones.push(element);
		this._setupDropzone(element);
	},
	_setupDropzone: function(dropArea) {
		var self = this;
		var dz = new qq.UploadDropZone({
			element: dropArea,
			onEnter: function(e) {
				qq.addClass(dropArea, self._classes.dropActive);
				e.stopPropagation();
			},
			onLeave: function(e) {},
			onLeaveNotDescendants: function(e) {
				qq.removeClass(dropArea, self._classes.dropActive);
			},
			onDrop: function(e) {
				dropArea.style.display = 'none';
				qq.removeClass(dropArea, self._classes.dropActive);
				if (e.dataTransfer.files.length > 1 && !self._options.multiple) {
					self._error('tooManyFilesError', "");
				} else {
					self._uploadFileList(e.dataTransfer.files);
				}
			}
		});
		this.addDisposer(function() {
			dz.dispose();
		});
		dropArea.style.display = 'none';
	},
	_setupDragDrop: function() {
		var dropArea = this._find(this._element, 'drop');
		var self = this;
		this._options.extraDropzones.push(dropArea);
		var dropzones = this._options.extraDropzones;
		var i;
		for (i = 0; i < dropzones.length; i++) {
			this._setupDropzone(dropzones[i]);
		}
		if (!qq.ie()) {
			this._attach(document, 'dragenter', function(e) {
				if (qq.hasClass(dropArea, self._classes.dropDisabled)) return;
				dropArea.style.display = 'block';
				for (i = 0; i < dropzones.length; i++) {
					dropzones[i].style.display = 'block';
				}
			});
		}
		this._attach(document, 'dragleave', function(e) {
			var relatedTarget = document.elementFromPoint(e.clientX, e.clientY);
			if (qq.FileUploader.prototype._leaving_document_out(e)) {
				for (i = 0; i < dropzones.length; i++) {
					dropzones[i].style.display = 'none';
				}
			}
		});
		qq.attach(document, 'drop', function(e) {
			for (i = 0; i < dropzones.length; i++) {
				dropzones[i].style.display = 'none';
			}
			e.preventDefault();
		});
	},
	_onSubmit: function(id, fileName) {
		qq.FileUploaderBasic.prototype._onSubmit.apply(this, arguments);
		this._addToList(id, fileName);
	},
	_onProgress: function(id, fileName, loaded, total) {
		qq.FileUploaderBasic.prototype._onProgress.apply(this, arguments);
		var item = this._getItemByFileId(id);
		if (loaded === total) {
			var cancelLink = this._find(item, 'cancel');
			cancelLink.style.display = 'none';
		}
		var size = this._find(item, 'size');
		size.style.display = 'inline';
		var text;
		var percent = Math.round(loaded / total * 100);
		if (loaded != total) {
			text = this._formatProgress(loaded, total);
		} else {
			text = this._formatSize(total);
		}
		this._find(item, 'progressBar').style.width = percent + '%';
		qq.setText(size, text);
	},
	_onComplete: function(id, fileName, result) {
		qq.FileUploaderBasic.prototype._onComplete.apply(this, arguments);
		var item = this._getItemByFileId(id);
		if (qq.UploadHandlerXhr.isSupported()) {
			qq.remove(this._find(item, 'progressBar'));
		}
		if (!this._options.disableCancelForFormUploads || qq.UploadHandlerXhr.isSupported()) {
			qq.remove(this._find(item, 'cancel'));
		}
		qq.remove(this._find(item, 'spinner'));
		if (result.success) {
			qq.addClass(item, this._classes.success);
			if (this._classes.successIcon) {
				this._find(item, 'finished').style.display = "inline-block";
				qq.addClass(item, this._classes.successIcon)
			}
		} else {
			var errorReason = result.error ? result.error : this._options.failUploadText;
			this._options.onError(id, fileName, errorReason);
			qq.addClass(item, this._classes.fail);
			if (this._classes.failIcon) {
				this._find(item, 'finished').style.display = "inline-block";
				qq.addClass(item, this._classes.failIcon)
			}
			this._controlFailureTextDisplay(item, result);
		}
	},
	_onUpload: function(id, fileName, xhr) {
		qq.FileUploaderBasic.prototype._onUpload.apply(this, arguments);
		var item = this._getItemByFileId(id);
		var spinnerEl = this._find(item, 'spinner');
		if (spinnerEl.style.display == "none") {
			spinnerEl.style.display = "inline-block";
		}
	},
	_addToList: function(id, fileName) {
		var item = qq.toElement(this._options.fileTemplate);
		if (this._options.disableCancelForFormUploads && !qq.UploadHandlerXhr.isSupported()) {
			var cancelLink = this._find(item, 'cancel');
			qq.remove(cancelLink);
		}
		if (!qq.UploadHandlerXhr.isSupported()) {
			qq.remove(this._find(item, 'progressBar'));
		}
		item.qqFileId = id;
		var fileElement = this._find(item, 'file');
		qq.setText(fileElement, this._formatFileName(fileName));
		this._find(item, 'size').style.display = 'none';
		if (!this._options.multiple) this._clearList();
		this._listElement.appendChild(item);
	},
	_clearList: function() {
		this._listElement.innerHTML = '';
		this.clearStoredFiles();
	},
	_getItemByFileId: function(id) {
		var item = this._listElement.firstChild;
		while (item) {
			if (item.qqFileId == id) return item;
			item = item.nextSibling;
		}
	},
	_bindCancelEvent: function() {
		var self = this,
			list = this._listElement;
		this._attach(list, 'click', function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;
			if (qq.hasClass(target, self._classes.cancel)) {
				qq.preventDefault(e);
				var item = target.parentNode;
				self._handler.cancel(item.qqFileId);
				qq.remove(item);
			}
		});
	},
	_formatProgress: function(uploadedSize, totalSize) {
		var message = this._options.messages.formatProgress;

		function r(name, replacement) {
			message = message.replace(name, replacement);
		}
		r('{percent}', Math.round(uploadedSize / totalSize * 100));
		r('{total_size}', this._formatSize(totalSize));
		return message;
	},
	_controlFailureTextDisplay: function(item, response) {
		var mode, maxChars, responseProperty, failureReason, shortFailureReason;
		mode = this._options.failedUploadTextDisplay.mode;
		maxChars = this._options.failedUploadTextDisplay.maxChars;
		responseProperty = this._options.failedUploadTextDisplay.responseProperty;
		if (mode === 'custom') {
			var failureReason = response[responseProperty];
			if (failureReason) {
				if (failureReason.length > maxChars) {
					shortFailureReason = failureReason.substring(0, maxChars) + '...';
				}
				this._find(item, 'failText').innerText = shortFailureReason || failureReason;
				if (this._options.failedUploadTextDisplay.enableTooltip) {
					this._showTooltip(item, failureReason);
				}
			} else {
				this.log("'" + responseProperty + "' is not a valid property on the server response.");
			}
		} else if (mode === 'none') {
			qq.remove(this._find(item, 'failText'));
		} else if (mode !== 'default') {
			this.log("failedUploadTextDisplay.mode value of '" + mode + "' is not valid");
		}
	},
	_showTooltip: function(item, text) {
		item.title = text;
	}
});
qq.UploadDropZone = function(o) {
	this._options = {
		element: null,
		onEnter: function(e) {},
		onLeave: function(e) {},
		onLeaveNotDescendants: function(e) {},
		onDrop: function(e) {}
	};
	qq.extend(this._options, o);
	qq.extend(this, qq.DisposeSupport);
	this._element = this._options.element;
	this._disableDropOutside();
	this._attachEvents();
};
qq.UploadDropZone.prototype = {
	_dragover_should_be_canceled: function() {
		return qq.safari() || (qq.firefox() && qq.windows());
	},
	_disableDropOutside: function(e) {
		if (!qq.UploadDropZone.dropOutsideDisabled) {
			if (this._dragover_should_be_canceled) {
				qq.attach(document, 'dragover', function(e) {
					e.preventDefault();
				});
			} else {
				qq.attach(document, 'dragover', function(e) {
					if (e.dataTransfer) {
						e.dataTransfer.dropEffect = 'none';
						e.preventDefault();
					}
				});
			}
			qq.UploadDropZone.dropOutsideDisabled = true;
		}
	},
	_attachEvents: function() {
		var self = this;
		self._attach(self._element, 'dragover', function(e) {
			if (!self._isValidFileDrag(e)) return;
			var effect = qq.ie() ? null : e.dataTransfer.effectAllowed;
			if (effect == 'move' || effect == 'linkMove') {
				e.dataTransfer.dropEffect = 'move';
			} else {
				e.dataTransfer.dropEffect = 'copy';
			}
			e.stopPropagation();
			e.preventDefault();
		});
		self._attach(self._element, 'dragenter', function(e) {
			if (!self._isValidFileDrag(e)) return;
			self._options.onEnter(e);
		});
		self._attach(self._element, 'dragleave', function(e) {
			if (!self._isValidFileDrag(e)) return;
			self._options.onLeave(e);
			var relatedTarget = document.elementFromPoint(e.clientX, e.clientY);
			if (qq.contains(this, relatedTarget)) return;
			self._options.onLeaveNotDescendants(e);
		});
		self._attach(self._element, 'drop', function(e) {
			if (!self._isValidFileDrag(e)) return;
			e.preventDefault();
			self._options.onDrop(e);
		});
	},
	_isValidFileDrag: function(e) {
		if (qq.ie()) return false;
		var dt = e.dataTransfer,
			isSafari = qq.safari();
		return dt && dt.effectAllowed != 'none' && (dt.files || (!isSafari && dt.types.contains && dt.types.contains('Files')));
	}
};
qq.UploadButton = function(o) {
	this._options = {
		element: null,
		multiple: false,
		acceptFiles: null,
		name: 'file',
		onChange: function(input) {},
		hoverClass: 'qq-upload-button-hover',
		focusClass: 'qq-upload-button-focus'
	};
	qq.extend(this._options, o);
	qq.extend(this, qq.DisposeSupport);
	this._element = this._options.element;
	qq.css(this._element, {
		position: 'relative',
		overflow: 'hidden',
		direction: 'ltr'
	});
	this._input = this._createInput();
};
qq.UploadButton.prototype = {
	getInput: function() {
		return this._input;
	},
	reset: function() {
		if (this._input.parentNode) {
			qq.remove(this._input);
		}
		qq.removeClass(this._element, this._options.focusClass);
		this._input = this._createInput();
	},
	_createInput: function() {
		var input = document.createElement("input");
		if (this._options.multiple) {
			input.setAttribute("multiple", "multiple");
		}
		if (this._options.acceptFiles) input.setAttribute("accept", this._options.acceptFiles);
		input.setAttribute("type", "file");
		input.setAttribute("name", this._options.name);
		qq.css(input, {
			position: 'absolute',
			right: 0,
			top: 0,
			fontFamily: 'Arial',
			fontSize: '118px',
			margin: 0,
			padding: 0,
			cursor: 'pointer',
			opacity: 0
		});
		this._element.appendChild(input);
		var self = this;
		this._attach(input, 'change', function() {
			self._options.onChange(input);
		});
		this._attach(input, 'mouseover', function() {
			qq.addClass(self._element, self._options.hoverClass);
		});
		this._attach(input, 'mouseout', function() {
			qq.removeClass(self._element, self._options.hoverClass);
		});
		this._attach(input, 'focus', function() {
			qq.addClass(self._element, self._options.focusClass);
		});
		this._attach(input, 'blur', function() {
			qq.removeClass(self._element, self._options.focusClass);
		});
		if (window.attachEvent) {
			input.setAttribute('tabIndex', "-1");
		}
		return input;
	}
};
qq.UploadHandlerAbstract = function(o) {
	this._options = {
		debug: false,
		action: '/upload.php',
		maxConnections: 999,
		onProgress: function(id, fileName, loaded, total) {},
		onComplete: function(id, fileName, response) {},
		onCancel: function(id, fileName) {},
		onUpload: function(id, fileName, xhr) {}
	};
	qq.extend(this._options, o);
	this._queue = [];
	this._params = [];
};
qq.UploadHandlerAbstract.prototype = {
	log: function(str) {
		if (this._options.debug && window.console) console.log('[uploader] ' + str);
	},
	add: function(file) {},
	upload: function(id, params) {
		var len = this._queue.push(id);
		var copy = {};
		qq.extend(copy, params);
		this._params[id] = copy;
		if (len <= this._options.maxConnections) {
			this._upload(id, this._params[id]);
		}
	},
	cancel: function(id) {
		this._cancel(id);
		this._dequeue(id);
	},
	cancelAll: function() {
		for (var i = 0; i < this._queue.length; i++) {
			this._cancel(this._queue[i]);
		}
		this._queue = [];
	},
	getName: function(id) {},
	getSize: function(id) {},
	getQueue: function() {
		return this._queue;
	},
	_upload: function(id) {},
	_cancel: function(id) {},
	_dequeue: function(id) {
		var i = qq.indexOf(this._queue, id);
		this._queue.splice(i, 1);
		var max = this._options.maxConnections;
		if (this._queue.length >= max && i < max) {
			var nextId = this._queue[max - 1];
			this._upload(nextId, this._params[nextId]);
		}
	}
};
qq.UploadHandlerForm = function(o) {
	qq.UploadHandlerAbstract.apply(this, arguments);
	this._inputs = {};
	this._detach_load_events = {};
};
qq.extend(qq.UploadHandlerForm.prototype, qq.UploadHandlerAbstract.prototype);
qq.extend(qq.UploadHandlerForm.prototype, {
	add: function(fileInput) {
		fileInput.setAttribute('name', this._options.inputName);
		var id = 'qq-upload-handler-iframe' + qq.getUniqueId();
		this._inputs[id] = fileInput;
		if (fileInput.parentNode) {
			qq.remove(fileInput);
		}
		return id;
	},
	getName: function(id) {
		return this._inputs[id].value.replace(/.*(\/|\\)/, "");
	},
	_cancel: function(id) {
		this._options.onCancel(id, this.getName(id));
		delete this._inputs[id];
		delete this._detach_load_events[id];
		var iframe = document.getElementById(id);
		if (iframe) {
			iframe.setAttribute('src', 'javascript:false;');
			qq.remove(iframe);
		}
	},
	_upload: function(id, params) {
		this._options.onUpload(id, this.getName(id), false);
		var input = this._inputs[id];
		if (!input) {
			throw new Error('file with passed id was not added, or already uploaded or cancelled');
		}
		var fileName = this.getName(id);
		params[this._options.inputName] = fileName;
		var iframe = this._createIframe(id);
		var form = this._createForm(iframe, params);
		form.appendChild(input);
		var self = this;
		this._attachLoadEvent(iframe, function() {
			self.log('iframe loaded');
			var response = self._getIframeContentJSON(iframe);
			self._options.onComplete(id, fileName, response);
			self._dequeue(id);
			delete self._inputs[id];
			setTimeout(function() {
				self._detach_load_events[id]();
				delete self._detach_load_events[id];
				qq.remove(iframe);
			}, 1);
		});
		form.submit();
		qq.remove(form);
		return id;
	},
	_attachLoadEvent: function(iframe, callback) {
		this._detach_load_events[iframe.id] = qq.attach(iframe, 'load', function() {
			if (!iframe.parentNode) {
				return;
			}
			try {
				if (iframe.contentDocument && iframe.contentDocument.body && iframe.contentDocument.body.innerHTML == "false") {
					return;
				}
			} catch (error) {}
			callback();
		});
	},
	_getIframeContentJSON: function(iframe) {
		try {
			var doc = iframe.contentDocument ? iframe.contentDocument : iframe.contentWindow.document,
				response;
			var innerHTML = doc.body.innerHTML;
			this.log("converting iframe's innerHTML to JSON");
			this.log("innerHTML = " + innerHTML);
			if (innerHTML.slice(0, 5).toLowerCase() == '<pre>' && innerHTML.slice(-6).toLowerCase() == '</pre>') {
				innerHTML = doc.body.firstChild.firstChild.nodeValue;
			}
			response = eval("(" + innerHTML + ")");
		} catch (err) {
			response = {
				success: false
			};
		}
		return response;
	},
	_createIframe: function(id) {
		var iframe = qq.toElement('<iframe src="javascript:false;" name="' + id + '" />');
		iframe.setAttribute('id', id);
		iframe.style.display = 'none';
		document.body.appendChild(iframe);
		return iframe;
	},
	_createForm: function(iframe, params) {
		var protocol = this._options.demoMode ? "GET" : "POST"
		var form = qq.toElement('<form method="' + protocol + '" enctype="multipart/form-data"></form>');
		var queryString = qq.obj2url(params, this._options.action);
		form.setAttribute('action', queryString);
		form.setAttribute('target', iframe.name);
		form.style.display = 'none';
		document.body.appendChild(form);
		return form;
	}
});
qq.UploadHandlerXhr = function(o) {
	qq.UploadHandlerAbstract.apply(this, arguments);
	this._files = [];
	this._xhrs = [];
	this._loaded = [];
};
qq.UploadHandlerXhr.isSupported = function() {
	var input = document.createElement('input');
	input.type = 'file';
	return ('multiple' in input && typeof File != "undefined" && typeof FormData != "undefined" && typeof(new XMLHttpRequest()).upload != "undefined");
};
qq.extend(qq.UploadHandlerXhr.prototype, qq.UploadHandlerAbstract.prototype)
qq.extend(qq.UploadHandlerXhr.prototype, {
	add: function(file) {
		if (!(file instanceof File)) {
			throw new Error('Passed obj in not a File (in qq.UploadHandlerXhr)');
		}
		return this._files.push(file) - 1;
	},
	getName: function(id) {
		var file = this._files[id];
		return (file.fileName !== null && file.fileName !== undefined) ? file.fileName : file.name;
	},
	getSize: function(id) {
		var file = this._files[id];
		return file.fileSize != null ? file.fileSize : file.size;
	},
	getLoaded: function(id) {
		return this._loaded[id] || 0;
	},
	_upload: function(id, params) {
		this._options.onUpload(id, this.getName(id), true);
		var file = this._files[id],
			name = this.getName(id),
			size = this.getSize(id);
		this._loaded[id] = 0;
		var xhr = this._xhrs[id] = new XMLHttpRequest();
		var self = this;
		xhr.upload.onprogress = function(e) {
			if (e.lengthComputable) {
				self._loaded[id] = e.loaded;
				self._options.onProgress(id, name, e.loaded, e.total);
			}
		};
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				self._onComplete(id, xhr);
			}
		};
		params = params || {};
		params[this._options.inputName] = name;
		var queryString = qq.obj2url(params, this._options.action);
		var protocol = this._options.demoMode ? "GET" : "POST";
		xhr.open(protocol, queryString, true);
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhr.setRequestHeader("X-File-Name", encodeURIComponent(name));
		if (this._options.forceMultipart) {
			var formData = new FormData();
			formData.append(this._options.inputName, file);
			file = formData;
		} else {
			xhr.setRequestHeader("Content-Type", "application/octet-stream");
			xhr.setRequestHeader("X-Mime-Type", file.type);
		}
		for (key in this._options.customHeaders) {
			xhr.setRequestHeader(key, this._options.customHeaders[key]);
		};
		xhr.send(file);
	},
	_onComplete: function(id, xhr) {
		"use strict";
		if (!this._files[id]) {
			return;
		}
		var name = this.getName(id);
		var size = this.getSize(id);
		var response;
		this._options.onProgress(id, name, size, size);
		this.log("xhr - server response received");
		this.log("responseText = " + xhr.responseText);
		try {
			if (typeof JSON.parse === "function") {
				response = JSON.parse(xhr.responseText);
			} else {
				response = eval("(" + xhr.responseText + ")");
			}
		} catch (err) {
			response = {};
		}
		if (xhr.status !== 200) {
			this._options.onError(id, name, "XHR returned response code " + xhr.status);
		}
		this._options.onComplete(id, name, response);
		this._xhrs[id] = null;
		this._dequeue(id);
	},
	_cancel: function(id) {
		this._options.onCancel(id, this.getName(id));
		this._files[id] = null;
		if (this._xhrs[id]) {
			this._xhrs[id].abort();
			this._xhrs[id] = null;
		}
	}
});
qq.DisposeSupport = {
	_disposers: [],
	dispose: function() {
		var disposer;
		while (disposer = this._disposers.shift()) {
			disposer();
		}
	},
	addDisposer: function(disposeFunction) {
		this._disposers.push(disposeFunction);
	},
	_attach: function() {
		this.addDisposer(qq.attach.apply(this, arguments));
	}
};;
(function($) {
	$.pinphp = $.pinphp || {
		version: "v1.0.0"
	}, $.extend($.pinphp, {
		util: {
			getStrLength: function(str) {
				str = $.trim(str);
				var length = str.replace(/[^\x00-\xff]/g, "**").length;
				return parseInt(length / 2) == length / 2 ? length / 2 : parseInt(length / 2) + .5;
			},
			empty: function(str) {
				return void 0 === str || null === str || "" === str
			},
			isURl: function(str) {
				return /([\w-]+\.)+[\w-]+.([^a-z])(\/[\w-.\/?%&=]*)?|[a-zA-Z0-9\-\.][\w-]+.([^a-z])(\/[\w-.\/?%&=]*)?/i.test(str) ? !0 : !1
			},
			isEmail: function(str) {
				return /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(str);
			},
			minLength: function(str, length) {
				var strLength = $.qupai.util.getStrLength(str);
				return strLength >= length;
			},
			maxLength: function(str, length) {
				var strLength = $.qupai.util.getStrLength(str);
				return strLength <= length;
			},
			redirect: function(uri, toiframe) {
				if (toiframe != undefined) {
					$('#' + toiframe).attr('src', uri);
					return !1;
				}
				location.href = uri;
			},
			base64_decode: function(input) {
				var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
				var output = "";
				var chr1, chr2, chr3 = "";
				var enc1, enc2, enc3, enc4 = "";
				var i = 0;
				if (input.length % 4 != 0) {
					return "";
				}
				var base64test = /[^A-Za-z0-9\+\/\=]/g;
				if (base64test.exec(input)) {
					return "";
				}
				do {
					enc1 = keyStr.indexOf(input.charAt(i++));
					enc2 = keyStr.indexOf(input.charAt(i++));
					enc3 = keyStr.indexOf(input.charAt(i++));
					enc4 = keyStr.indexOf(input.charAt(i++));
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
					output = output + String.fromCharCode(chr1);
					if (enc3 != 64) {
						output += String.fromCharCode(chr2);
					}
					if (enc4 != 64) {
						output += String.fromCharCode(chr3);
					}
					chr1 = chr2 = chr3 = "";
					enc1 = enc2 = enc3 = enc4 = "";
				} while (i < input.length);
				return output;
			}
		}
	});
})(jQuery);;
(function($) {
	$.fn.setmiddle = function() {
		var dl = $(document).scrollLeft(),
			dt = $(document).scrollTop(),
			ww = $(window).width(),
			wh = $(window).height(),
			ow = $(this).width(),
			oh = $(this).height(),
			left = (ww - ow) / 2 + dl,
			top = (oh < 4 * wh / 7 ? wh * 0.382 - oh / 2 : (wh - oh) / 2) + dt;
		$(this).css({
			left: Math.max(left, dl) + 'px',
			top: Math.max(top, dt) + 'px'
		});
		return this;
	}
	$.fn.returntop = function() {
		var self = $(this);
		self.live({
			mouseover: function() {
				$(this).addClass('return_top_hover');
			},
			mouseout: function() {
				$(this).removeClass('return_top_hover');
			},
			click: function() {
				$("html, body").animate({
					scrollTop: 0
				}, 120);
			}
		});
		$(window).bind("scroll", function() {
			$(document).scrollTop() > 0 ? self.fadeIn() : self.fadeOut();
		});
	}
})(jQuery);;
(function($) {
	$.pinphp.tip = function(options) {
		var settings = {
			content: '',
			icon: 'success',
			time: 1000,
			close: false,
			zindex: 2999
		};
		if (options) {
			$.extend(settings, options);
		}
		if (settings.close) {
			$(".tipbox").hide();
			return;
		}
		if (!$('.tipbox')[0]) {
			$('body').append('<div class="tipbox"><div class="tip-l"></div><div class="tip-c"></div><div class="tip-r"></div></div>');
			$('.tipbox').css('z-index', parseInt(settings.zindex));
		}
		$('.tipbox').attr('class', 'tipbox tip-' + settings.icon);
		$('.tipbox .tip-c').html(settings.content);
		$('.tipbox').css('z-index', parseInt($('.tipbox').css('z-index')) + 1).setmiddle().show();
		if (settings.time > 0) {
			setTimeout(function() {
				$(".tipbox").fadeOut()
			}, settings.time);
		}
	}
})(jQuery);;
(function($) {
	$.pinphp.photo_slide = function() {
		var f = arguments.length;
		if (!(f != 1 && f < 4)) {
			var a = {},
				a = f >= 4 ? {
					listID: arguments[0],
					listBtnID: arguments[1],
					feedClassName: arguments[2],
					feedWidth: arguments[3],
					feedBoxClass: arguments[4]
				} : arguments[0];
			if (!$.pinphp.util.empty(a) && !$.pinphp.util.empty(a.listID) && !$.pinphp.util.empty(a.listBtnID) && !$.pinphp.util.empty(a.feedClassName) && !$.pinphp.util.empty(a.feedWidth) && $("#" + a.listID).size() != 0) {
				var e = 0,
					d = 1,
					j = null,
					h = [],
					g = null,
					g = $.pinphp.util.empty(a.feedBoxClass) ? $("#" + a.listID + " ul") : $("#" + a.listID + " ." + a.feedBoxClass),
					k = function() {
						$("#" + a.listBtnID + " li").removeClass("c");
						$("#" + a.listBtnID + " li").eq(d % e).addClass("c");
						g.animate({
							left: "-" + a.feedWidth * 2 + "px"
						}, 150, i());
						d++;
						d > e && (d = 1)
					},
					f = function() {
						$("#" + a.listBtnID + " li").each(function(b) {
							$(this).click(function() {
								clearInterval(j);
								$("#" + a.listBtnID + " li").removeClass("c");
								$(this).addClass("c");
								b + 1 > d ? (i(b + 1), g.animate({
									left: "-" + a.feedWidth * 2 + "px"
								}, 150)) : b + 1 < d && (i(null, b + 1), g.animate({
									left: "0px"
								}, 150));
								d = b + 1;
								j = setInterval(k, 5E3)
							})
						})
					},
					i = function(b, c) {
						if (b == null || b == void 0) b = d % e + 1;
						if (c == null || b == void 0) c = d - 1 == 0 ? e : d - 1;
						g.html("").append(h[c - 1].clone()).append(h[d - 1].clone()).append(h[b - 1].clone()).css({
							left: "-" + a.feedWidth + "px"
						})
					},
					l = function() {
						for (var b = $("#" + a.listID + " ." + a.feedClassName).clone(), d = 0; d < b.length; d++) h[d] = b.eq(d)
					},
					m = function() {
						if (e > 1) for (var b = 0; b < e - 1; b++) $("#" + a.listBtnID + ">ul").append("<li>●</li>")
					},
					e = $("#" + a.listID + " ." + a.feedClassName).size();
				e > 0 && (m(), e > 1 && (l(), f(), i()));
				e > 1 && (j = setInterval(k, 5E3))
			}
		}
	}
})(jQuery);;
(function($) {
	$.fn.uploader = function(options) {
		var settings = {
			btnid: $(this).attr('id'),
			action_url: '',
			input_id: 'J_img',
			input_name: 'img',
			showMessage: function(message) {
				$.pinphp.tip({
					content: message,
					icon: 'error'
				});
			},
			onSubmit: function(id, fileName) {},
			onComplete: function(id, fileName, result) {
				if (result.status == '1') {
					$('#' + settings.input_id).val(result.data);
				} else {
					$.pinphp.tip({
						content: result.msg,
						icon: 'error'
					});
				}
			}
		};
		if (options) {
			$.extend(settings, options);
		}
		new qq.FileUploaderBasic({
			allowedExtensions: ['jpg', 'gif', 'jpeg', 'png', 'bmp', 'pdg', 'swf'],
			button: document.getElementById(settings.btnid),
			multiple: false,
			action: settings.action_url,
			inputName: settings.input_name,
			forceMultipart: true,
			messages: {
				typeError: '不允许上传的文件类型！',
				sizeError: '文件大小不能超过{sizeLimit}！',
				minSizeError: '文件大小不能小于{minSizeLimit}！',
				emptyError: '文件为空，请重新选择！',
				noFilesError: '没有选择要上传的文件！',
				onLeave: '正在上传文件，离开此页将取消上传！'
			},
			showMessage: settings.showMessage,
			onSubmit: settings.onSubmit,
			onComplete: settings.onComplete
		});
	}
})(jQuery);;
(function($) {
	"use strict";
	var feature = {};
	feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
	feature.formdata = window.FormData !== undefined;
	$.fn.ajaxSubmit = function(options) {
		if (!this.length) {
			log('ajaxSubmit: skipping submit process - no element selected');
			return this;
		}
		var method, action, url, $form = this;
		if (typeof options == 'function') {
			options = {
				success: options
			};
		}
		method = this.attr('method');
		action = this.attr('action');
		url = (typeof action === 'string') ? $.trim(action) : '';
		url = url || window.location.href || '';
		if (url) {
			url = (url.match(/^([^#]+)/) || [])[1];
		}
		options = $.extend(true, {
			url: url,
			success: $.ajaxSettings.success,
			type: method || 'GET',
			iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
		}, options);
		var veto = {};
		this.trigger('form-pre-serialize', [this, options, veto]);
		if (veto.veto) {
			log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
			return this;
		}
		if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
			log('ajaxSubmit: submit aborted via beforeSerialize callback');
			return this;
		}
		var traditional = options.traditional;
		if (traditional === undefined) {
			traditional = $.ajaxSettings.traditional;
		}
		var elements = [];
		var qx, a = this.formToArray(options.semantic, elements);
		if (options.data) {
			options.extraData = options.data;
			qx = $.param(options.data, traditional);
		}
		if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
			log('ajaxSubmit: submit aborted via beforeSubmit callback');
			return this;
		}
		this.trigger('form-submit-validate', [a, this, options, veto]);
		if (veto.veto) {
			log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
			return this;
		}
		var q = $.param(a, traditional);
		if (qx) {
			q = (q ? (q + '&' + qx) : qx);
		}
		if (options.type.toUpperCase() == 'GET') {
			options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
			options.data = null;
		} else {
			options.data = q;
		}
		var callbacks = [];
		if (options.resetForm) {
			callbacks.push(function() {
				$form.resetForm();
			});
		}
		if (options.clearForm) {
			callbacks.push(function() {
				$form.clearForm(options.includeHidden);
			});
		}
		if (!options.dataType && options.target) {
			var oldSuccess = options.success ||
			function() {};
			callbacks.push(function(data) {
				var fn = options.replaceTarget ? 'replaceWith' : 'html';
				$(options.target)[fn](data).each(oldSuccess, arguments);
			});
		} else if (options.success) {
			callbacks.push(options.success);
		}
		options.success = function(data, status, xhr) {
			var context = options.context || options;
			for (var i = 0, max = callbacks.length; i < max; i++) {
				callbacks[i].apply(context, [data, status, xhr || $form, $form]);
			}
		};
		var fileInputs = $('input:file:enabled[value]', this);
		var hasFileInputs = fileInputs.length > 0;
		var mp = 'multipart/form-data';
		var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);
		var fileAPI = feature.fileapi && feature.formdata;
		log("fileAPI :" + fileAPI);
		var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;
		if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
			if (options.closeKeepAlive) {
				$.get(options.closeKeepAlive, function() {
					fileUploadIframe(a);
				});
			} else {
				fileUploadIframe(a);
			}
		} else if ((hasFileInputs || multipart) && fileAPI) {
			fileUploadXhr(a);
		} else {
			$.ajax(options);
		}
		for (var k = 0; k < elements.length; k++)
		elements[k] = null;
		this.trigger('form-submit-notify', [this, options]);
		return this;

		function fileUploadXhr(a) {
			var formdata = new FormData();
			for (var i = 0; i < a.length; i++) {
				formdata.append(a[i].name, a[i].value);
			}
			if (options.extraData) {
				for (var p in options.extraData)
				if (options.extraData.hasOwnProperty(p)) formdata.append(p, options.extraData[p]);
			}
			options.data = null;
			var s = $.extend(true, {}, $.ajaxSettings, options, {
				contentType: false,
				processData: false,
				cache: false,
				type: 'POST'
			});
			if (options.uploadProgress) {
				s.xhr = function() {
					var xhr = jQuery.ajaxSettings.xhr();
					if (xhr.upload) {
						xhr.upload.onprogress = function(event) {
							var percent = 0;
							var position = event.loaded || event.position;
							var total = event.total;
							if (event.lengthComputable) {
								percent = Math.ceil(position / total * 100);
							}
							options.uploadProgress(event, position, total, percent);
						};
					}
					return xhr;
				};
			}
			s.data = null;
			var beforeSend = s.beforeSend;
			s.beforeSend = function(xhr, o) {
				o.data = formdata;
				if (beforeSend) beforeSend.call(o, xhr, options);
			};
			$.ajax(s);
		}

		function fileUploadIframe(a) {
			var form = $form[0],
				el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
			var useProp = !! $.fn.prop;
			if ($(':input[name=submit],:input[id=submit]', form).length) {
				alert('Error: Form elements must not have name or id of "submit".');
				return;
			}
			if (a) {
				for (i = 0; i < elements.length; i++) {
					el = $(elements[i]);
					if (useProp) el.prop('disabled', false);
					else el.removeAttr('disabled');
				}
			}
			s = $.extend(true, {}, $.ajaxSettings, options);
			s.context = s.context || s;
			id = 'jqFormIO' + (new Date().getTime());
			if (s.iframeTarget) {
				$io = $(s.iframeTarget);
				n = $io.attr('name');
				if (!n) $io.attr('name', id);
				else id = n;
			} else {
				$io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
				$io.css({
					position: 'absolute',
					top: '-1000px',
					left: '-1000px'
				});
			}
			io = $io[0];
			xhr = {
				aborted: 0,
				responseText: null,
				responseXML: null,
				status: 0,
				statusText: 'n/a',
				getAllResponseHeaders: function() {},
				getResponseHeader: function() {},
				setRequestHeader: function() {},
				abort: function(status) {
					var e = (status === 'timeout' ? 'timeout' : 'aborted');
					log('aborting upload... ' + e);
					this.aborted = 1;
					$io.attr('src', s.iframeSrc);
					xhr.error = e;
					if (s.error) s.error.call(s.context, xhr, e, status);
					if (g) $.event.trigger("ajaxError", [xhr, s, e]);
					if (s.complete) s.complete.call(s.context, xhr, e);
				}
			};
			g = s.global;
			if (g && 0 === $.active++) {
				$.event.trigger("ajaxStart");
			}
			if (g) {
				$.event.trigger("ajaxSend", [xhr, s]);
			}
			if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
				if (s.global) {
					$.active--;
				}
				return;
			}
			if (xhr.aborted) {
				return;
			}
			sub = form.clk;
			if (sub) {
				n = sub.name;
				if (n && !sub.disabled) {
					s.extraData = s.extraData || {};
					s.extraData[n] = sub.value;
					if (sub.type == "image") {
						s.extraData[n + '.x'] = form.clk_x;
						s.extraData[n + '.y'] = form.clk_y;
					}
				}
			}
			var CLIENT_TIMEOUT_ABORT = 1;
			var SERVER_ABORT = 2;

			function getDoc(frame) {
				var doc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument ? frame.contentDocument : frame.document;
				return doc;
			}
			var csrf_token = $('meta[name=csrf-token]').attr('content');
			var csrf_param = $('meta[name=csrf-param]').attr('content');
			if (csrf_param && csrf_token) {
				s.extraData = s.extraData || {};
				s.extraData[csrf_param] = csrf_token;
			}

			function doSubmit() {
				var t = $form.attr('target'),
					a = $form.attr('action');
				form.setAttribute('target', id);
				if (!method) {
					form.setAttribute('method', 'POST');
				}
				if (a != s.url) {
					form.setAttribute('action', s.url);
				}
				if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
					$form.attr({
						encoding: 'multipart/form-data',
						enctype: 'multipart/form-data'
					});
				}
				if (s.timeout) {
					timeoutHandle = setTimeout(function() {
						timedOut = true;
						cb(CLIENT_TIMEOUT_ABORT);
					}, s.timeout);
				}

				function checkState() {
					try {
						var state = getDoc(io).readyState;
						log('state = ' + state);
						if (state && state.toLowerCase() == 'uninitialized') setTimeout(checkState, 50);
					} catch (e) {
						log('Server abort: ', e, ' (', e.name, ')');
						cb(SERVER_ABORT);
						if (timeoutHandle) clearTimeout(timeoutHandle);
						timeoutHandle = undefined;
					}
				}
				var extraInputs = [];
				try {
					if (s.extraData) {
						for (var n in s.extraData) {
							if (s.extraData.hasOwnProperty(n)) {
								extraInputs.push($('<input type="hidden" name="' + n + '">').attr('value', s.extraData[n]).appendTo(form)[0]);
							}
						}
					}
					if (!s.iframeTarget) {
						$io.appendTo('body');
						if (io.attachEvent) io.attachEvent('onload', cb);
						else io.addEventListener('load', cb, false);
					}
					setTimeout(checkState, 15);
					form.submit();
				} finally {
					form.setAttribute('action', a);
					if (t) {
						form.setAttribute('target', t);
					} else {
						$form.removeAttr('target');
					}
					$(extraInputs).remove();
				}
			}
			if (s.forceSync) {
				doSubmit();
			} else {
				setTimeout(doSubmit, 10);
			}
			var data, doc, domCheckCount = 50,
				callbackProcessed;

			function cb(e) {
				if (xhr.aborted || callbackProcessed) {
					return;
				}
				try {
					doc = getDoc(io);
				} catch (ex) {
					log('cannot access response document: ', ex);
					e = SERVER_ABORT;
				}
				if (e === CLIENT_TIMEOUT_ABORT && xhr) {
					xhr.abort('timeout');
					return;
				} else if (e == SERVER_ABORT && xhr) {
					xhr.abort('server abort');
					return;
				}
				if (!doc || doc.location.href == s.iframeSrc) {
					if (!timedOut) return;
				}
				if (io.detachEvent) io.detachEvent('onload', cb);
				else io.removeEventListener('load', cb, false);
				var status = 'success',
					errMsg;
				try {
					if (timedOut) {
						throw 'timeout';
					}
					var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
					log('isXml=' + isXml);
					if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
						if (--domCheckCount) {
							log('requeing onLoad callback, DOM not available');
							setTimeout(cb, 250);
							return;
						}
					}
					var docRoot = doc.body ? doc.body : doc.documentElement;
					xhr.responseText = docRoot ? docRoot.innerHTML : null;
					xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
					if (isXml) s.dataType = 'xml';
					xhr.getResponseHeader = function(header) {
						var headers = {
							'content-type': s.dataType
						};
						return headers[header];
					};
					if (docRoot) {
						xhr.status = Number(docRoot.getAttribute('status')) || xhr.status;
						xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
					}
					var dt = (s.dataType || '').toLowerCase();
					var scr = /(json|script|text)/.test(dt);
					if (scr || s.textarea) {
						var ta = doc.getElementsByTagName('textarea')[0];
						if (ta) {
							xhr.responseText = ta.value;
							xhr.status = Number(ta.getAttribute('status')) || xhr.status;
							xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
						} else if (scr) {
							var pre = doc.getElementsByTagName('pre')[0];
							var b = doc.getElementsByTagName('body')[0];
							if (pre) {
								xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
							} else if (b) {
								xhr.responseText = b.textContent ? b.textContent : b.innerText;
							}
						}
					} else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
						xhr.responseXML = toXml(xhr.responseText);
					}
					try {
						data = httpData(xhr, dt, s);
					} catch (e) {
						status = 'parsererror';
						xhr.error = errMsg = (e || status);
					}
				} catch (e) {
					log('error caught: ', e);
					status = 'error';
					xhr.error = errMsg = (e || status);
				}
				if (xhr.aborted) {
					log('upload aborted');
					status = null;
				}
				if (xhr.status) {
					status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
				}
				if (status === 'success') {
					if (s.success) s.success.call(s.context, data, 'success', xhr);
					if (g) $.event.trigger("ajaxSuccess", [xhr, s]);
				} else if (status) {
					if (errMsg === undefined) errMsg = xhr.statusText;
					if (s.error) s.error.call(s.context, xhr, status, errMsg);
					if (g) $.event.trigger("ajaxError", [xhr, s, errMsg]);
				}
				if (g) $.event.trigger("ajaxComplete", [xhr, s]);
				if (g && !--$.active) {
					$.event.trigger("ajaxStop");
				}
				if (s.complete) s.complete.call(s.context, xhr, status);
				callbackProcessed = true;
				if (s.timeout) clearTimeout(timeoutHandle);
				setTimeout(function() {
					if (!s.iframeTarget) $io.remove();
					xhr.responseXML = null;
				}, 100);
			}
			var toXml = $.parseXML ||
			function(s, doc) {
				if (window.ActiveXObject) {
					doc = new ActiveXObject('Microsoft.XMLDOM');
					doc.async = 'false';
					doc.loadXML(s);
				} else {
					doc = (new DOMParser()).parseFromString(s, 'text/xml');
				}
				return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
			};
			var parseJSON = $.parseJSON ||
			function(s) {
				return window['eval']('(' + s + ')');
			};
			var httpData = function(xhr, type, s) {
					var ct = xhr.getResponseHeader('content-type') || '',
						xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
						data = xml ? xhr.responseXML : xhr.responseText;
					if (xml && data.documentElement.nodeName === 'parsererror') {
						if ($.error) $.error('parsererror');
					}
					if (s && s.dataFilter) {
						data = s.dataFilter(data, type);
					}
					if (typeof data === 'string') {
						if (type === 'json' || !type && ct.indexOf('json') >= 0) {
							data = parseJSON(data);
						} else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
							$.globalEval(data);
						}
					}
					return data;
				};
		}
	};
	$.fn.ajaxForm = function(options) {
		options = options || {};
		options.delegation = options.delegation && $.isFunction($.fn.on);
		if (!options.delegation && this.length === 0) {
			var o = {
				s: this.selector,
				c: this.context
			};
			if (!$.isReady && o.s) {
				log('DOM not ready, queuing ajaxForm');
				$(function() {
					$(o.s, o.c).ajaxForm(options);
				});
				return this;
			}
			log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
			return this;
		}
		if (options.delegation) {
			$(document).off('submit.form-plugin', this.selector, doAjaxSubmit).off('click.form-plugin', this.selector, captureSubmittingElement).on('submit.form-plugin', this.selector, options, doAjaxSubmit).on('click.form-plugin', this.selector, options, captureSubmittingElement);
			return this;
		}
		return this.ajaxFormUnbind().bind('submit.form-plugin', options, doAjaxSubmit).bind('click.form-plugin', options, captureSubmittingElement);
	};

	function doAjaxSubmit(e) {
		var options = e.data;
		if (!e.isDefaultPrevented()) {
			e.preventDefault();
			$(this).ajaxSubmit(options);
		}
	}

	function captureSubmittingElement(e) {
		var target = e.target;
		var $el = $(target);
		if (!($el.is(":submit,input:image"))) {
			var t = $el.closest(':submit');
			if (t.length === 0) {
				return;
			}
			target = t[0];
		}
		var form = this;
		form.clk = target;
		if (target.type == 'image') {
			if (e.offsetX !== undefined) {
				form.clk_x = e.offsetX;
				form.clk_y = e.offsetY;
			} else if (typeof $.fn.offset == 'function') {
				var offset = $el.offset();
				form.clk_x = e.pageX - offset.left;
				form.clk_y = e.pageY - offset.top;
			} else {
				form.clk_x = e.pageX - target.offsetLeft;
				form.clk_y = e.pageY - target.offsetTop;
			}
		}
		setTimeout(function() {
			form.clk = form.clk_x = form.clk_y = null;
		}, 100);
	}
	$.fn.ajaxFormUnbind = function() {
		return this.unbind('submit.form-plugin click.form-plugin');
	};
	$.fn.formToArray = function(semantic, elements) {
		var a = [];
		if (this.length === 0) {
			return a;
		}
		var form = this[0];
		var els = semantic ? form.getElementsByTagName('*') : form.elements;
		if (!els) {
			return a;
		}
		var i, j, n, v, el, max, jmax;
		for (i = 0, max = els.length; i < max; i++) {
			el = els[i];
			n = el.name;
			if (!n) {
				continue;
			}
			if (semantic && form.clk && el.type == "image") {
				if (!el.disabled && form.clk == el) {
					a.push({
						name: n,
						value: $(el).val(),
						type: el.type
					});
					a.push({
						name: n + '.x',
						value: form.clk_x
					}, {
						name: n + '.y',
						value: form.clk_y
					});
				}
				continue;
			}
			v = $.fieldValue(el, true);
			if (v && v.constructor == Array) {
				if (elements) elements.push(el);
				for (j = 0, jmax = v.length; j < jmax; j++) {
					a.push({
						name: n,
						value: v[j]
					});
				}
			} else if (feature.fileapi && el.type == 'file' && !el.disabled) {
				if (elements) elements.push(el);
				var files = el.files;
				if (files.length) {
					for (j = 0; j < files.length; j++) {
						a.push({
							name: n,
							value: files[j],
							type: el.type
						});
					}
				} else {
					a.push({
						name: n,
						value: '',
						type: el.type
					});
				}
			} else if (v !== null && typeof v != 'undefined') {
				if (elements) elements.push(el);
				a.push({
					name: n,
					value: v,
					type: el.type,
					required: el.required
				});
			}
		}
		if (!semantic && form.clk) {
			var $input = $(form.clk),
				input = $input[0];
			n = input.name;
			if (n && !input.disabled && input.type == 'image') {
				a.push({
					name: n,
					value: $input.val()
				});
				a.push({
					name: n + '.x',
					value: form.clk_x
				}, {
					name: n + '.y',
					value: form.clk_y
				});
			}
		}
		return a;
	};
	$.fn.formSerialize = function(semantic) {
		return $.param(this.formToArray(semantic));
	};
	$.fn.fieldSerialize = function(successful) {
		var a = [];
		this.each(function() {
			var n = this.name;
			if (!n) {
				return;
			}
			var v = $.fieldValue(this, successful);
			if (v && v.constructor == Array) {
				for (var i = 0, max = v.length; i < max; i++) {
					a.push({
						name: n,
						value: v[i]
					});
				}
			} else if (v !== null && typeof v != 'undefined') {
				a.push({
					name: this.name,
					value: v
				});
			}
		});
		return $.param(a);
	};
	$.fn.fieldValue = function(successful) {
		for (var val = [], i = 0, max = this.length; i < max; i++) {
			var el = this[i];
			var v = $.fieldValue(el, successful);
			if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
				continue;
			}
			if (v.constructor == Array) $.merge(val, v);
			else val.push(v);
		}
		return val;
	};
	$.fieldValue = function(el, successful) {
		var n = el.name,
			t = el.type,
			tag = el.tagName.toLowerCase();
		if (successful === undefined) {
			successful = true;
		}
		if (successful && (!n || el.disabled || t == 'reset' || t == 'button' || (t == 'checkbox' || t == 'radio') && !el.checked || (t == 'submit' || t == 'image') && el.form && el.form.clk != el || tag == 'select' && el.selectedIndex == -1)) {
			return null;
		}
		if (tag == 'select') {
			var index = el.selectedIndex;
			if (index < 0) {
				return null;
			}
			var a = [],
				ops = el.options;
			var one = (t == 'select-one');
			var max = (one ? index + 1 : ops.length);
			for (var i = (one ? index : 0); i < max; i++) {
				var op = ops[i];
				if (op.selected) {
					var v = op.value;
					if (!v) {
						v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
					}
					if (one) {
						return v;
					}
					a.push(v);
				}
			}
			return a;
		}
		return $(el).val();
	};
	$.fn.clearForm = function(includeHidden) {
		return this.each(function() {
			$('input,select,textarea', this).clearFields(includeHidden);
		});
	};
	$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
		var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
		return this.each(function() {
			var t = this.type,
				tag = this.tagName.toLowerCase();
			if (re.test(t) || tag == 'textarea') {
				this.value = '';
			} else if (t == 'checkbox' || t == 'radio') {
				this.checked = false;
			} else if (tag == 'select') {
				this.selectedIndex = -1;
			} else if (includeHidden) {
				if ((includeHidden === true && /hidden/.test(t)) || (typeof includeHidden == 'string' && $(this).is(includeHidden))) this.value = '';
			}
		});
	};
	$.fn.resetForm = function() {
		return this.each(function() {
			if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
				this.reset();
			}
		});
	};
	$.fn.enable = function(b) {
		if (b === undefined) {
			b = true;
		}
		return this.each(function() {
			this.disabled = !b;
		});
	};
	$.fn.selected = function(select) {
		if (select === undefined) {
			select = true;
		}
		return this.each(function() {
			var t = this.type;
			if (t == 'checkbox' || t == 'radio') {
				this.checked = select;
			} else if (this.tagName.toLowerCase() == 'option') {
				var $sel = $(this).parent('select');
				if (select && $sel[0] && $sel[0].type == 'select-one') {
					$sel.find('option').selected(false);
				}
				this.selected = select;
			}
		});
	};
	$.fn.ajaxSubmit.debug = false;

	function log() {
		if (!$.fn.ajaxSubmit.debug) return;
		var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
		if (window.console && window.console.log) {
			window.console.log(msg);
		} else if (window.opera && window.opera.postError) {
			window.opera.postError(msg);
		}
	}
})(jQuery);
(function(h, k, l) {
	if ("BackCompat" === document.compatMode) throw Error("artDialog: Document types require more than xhtml1.0");
	var m, q = 0,
		p = "artDialog" + +new Date,
		u = k.VBArray && !k.XMLHttpRequest,
		t = "createTouch" in document && !("onmousemove" in document) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent),
		n = !u && !t,
		e = function(a, b, c) {
			a = a || {};
			if ("string" === typeof a || 1 === a.nodeType) a = {
				content: a,
				fixed: !t
			};
			var d;
			d = e.defaults;
			var f = a.follow = 1 === this.nodeType && this || a.follow,
				g;
			for (g in d) a[g] === l && (a[g] = d[g]);
			a.id = f && f[p + "follow"] || a.id || p + q;
			if (d = e.list[a.id]) return f && d.follow(f), d.zIndex().focus(), d;
			if (!n) a.fixed = !1;
			if (!a.button || !a.button.push) a.button = [];
			if (b !== l) a.ok = b;
			a.ok && a.button.push({
				id: "ok",
				value: a.okValue,
				callback: a.ok,
				focus: !0
			});
			if (c !== l) a.cancel = c;
			a.cancel && a.button.push({
				id: "cancel",
				value: a.cancelValue,
				callback: a.cancel
			});
			e.defaults.zIndex = a.zIndex;
			q++;
			return e.list[a.id] = m ? m.constructor(a) : new e.fn.constructor(a)
		};
	e.version = "5.0";
	e.fn = e.prototype = {
		constructor: function(a) {
			var b;
			this.closed = !1;
			this.config = a;
			this.dom = b = this.dom || this._getDom();
			a.skin && b.wrap.addClass(a.skin);
			b.wrap.css("position", a.fixed ? "fixed" : "absolute");
			b.close[!1 === a.cancel ? "hide" : "show"]();
			b.content.css("padding", a.padding);
			this.button.apply(this, a.button);
			this.title(a.title).content(a.content).size(a.width, a.height).time(a.time);
			a.follow ? this.follow(a.follow) : this.position();
			this.zIndex();
			a.lock && this.lock();
			this._addEvent();
			this[a.visible ? "visible" : "hidden"]().focus();
			m = null;
			a.initialize && a.initialize.call(this);
			return this
		},
		content: function(a) {
			var b, c, d, f, g = this,
				e = this.dom.content,
				j = e[0];
			this._elemBack && (this._elemBack(), delete this._elemBack);
			if ("string" === typeof a) e.html(a);
			else if (a && 1 === a.nodeType) f = a.style.display, b = a.previousSibling, c = a.nextSibling, d = a.parentNode, this._elemBack = function() {
				b && b.parentNode ? b.parentNode.insertBefore(a, b.nextSibling) : c && c.parentNode ? c.parentNode.insertBefore(a, c) : d && d.appendChild(a);
				a.style.display = f;
				g._elemBack = null
			}, e.html(""), j.appendChild(a), h(a).show();
			return this.position()
		},
		title: function(a) {
			var b = this.dom,
				c = b.outer,
				b = b.title;
			!1 === a ? (b.hide().html(""), c.addClass("d-state-noTitle")) : (b.show().html(a), c.removeClass("d-state-noTitle"));
			return this
		},
		position: function() {
			var a = this.dom,
				b = a.wrap[0],
				c = a.window,
				d = a.document,
				f = this.config.fixed,
				a = f ? 0 : d.scrollLeft(),
				d = f ? 0 : d.scrollTop(),
				f = c.width(),
				e = c.height(),
				h = b.offsetHeight,
				c = (f - b.offsetWidth) / 2 + a,
				f = f = (h < 4 * e / 7 ? 0.382 * e - h / 2 : (e - h) / 2) + d,
				b = b.style;
			b.left = Math.max(c, a) + "px";
			b.top = Math.max(f, d) + "px";
			return this
		},
		size: function(a, b) {
			var c = this.dom.main[0].style;
			"number" === typeof a && (a += "px");
			"number" === typeof b && (b += "px");
			c.width = a;
			c.height = b;
			return this
		},
		follow: function(a) {
			var b = h(a),
				c = this.config;
			if (!a || !a.offsetWidth && !a.offsetHeight) return this.position(this._left, this._top);
			var d = c.fixed,
				e = p + "follow",
				g = this.dom,
				s = g.window,
				j = g.document,
				g = s.width(),
				s = s.height(),
				r = j.scrollLeft(),
				j = j.scrollTop(),
				i = b.offset(),
				b = a.offsetWidth,
				k = d ? i.left - r : i.left,
				i = d ? i.top - j : i.top,
				o = this.dom.wrap[0],
				m = o.style,
				l = o.offsetWidth,
				o = o.offsetHeight,
				n = k - (l - b) / 2,
				q = i + a.offsetHeight,
				r = d ? 0 : r,
				d = d ? 0 : j;
			m.left = (n < r ? k : n + l > g && k - l > r ? k - l + b : n) + "px";
			m.top = (q + o > s + d && i - o > d ? i - o : q) + "px";
			this._follow && this._follow.removeAttribute(e);
			this._follow = a;
			a[e] = c.id;
			return this
		},
		button: function() {
			for (var a = this.dom.buttons, b = a[0], c = this._listeners = this._listeners || {}, d = [].slice.call(arguments), e = 0, g, k, j, l, i; e < d.length; e++) {
				g = d[e];
				k = g.value;
				j = g.id || k;
				l = !c[j];
				i = !l ? c[j].elem : document.createElement("input");
				i.type = "button";
				i.className = "d-button";
				c[j] || (c[j] = {});
				if (k) i.value = k;
				if (g.width) i.style.width = g.width;
				if (g.callback) c[j].callback = g.callback;
				if (g.focus) this._focus && this._focus.removeClass("d-state-highlight"), this._focus = h(i).addClass("d-state-highlight"), this.focus();
				i[p + "callback"] = j;
				i.disabled = !! g.disabled;
				if (l) c[j].elem = i, b.appendChild(i)
			}
			a[0].style.display = d.length ? "" : "none";
			return this
		},
		visible: function() {
			this.dom.wrap.css("visibility", "visible");
			this.dom.outer.addClass("d-state-visible");
			this._isLock && this._lockMask.show();
			return this
		},
		hidden: function() {
			this.dom.wrap.css("visibility", "hidden");
			this.dom.outer.removeClass("d-state-visible");
			this._isLock && this._lockMask.hide();
			return this
		},
		close: function() {
			if (this.closed) return this;
			var a = this.dom,
				b = a.wrap,
				c = e.list,
				d = this.config.beforeunload,
				f = this.config.follow;
			if (d && !1 === d.call(this)) return this;
			if (e.focus === this) e.focus = null;
			f && f.removeAttribute(p + "follow");
			this._elemBack && this._elemBack();
			this.time();
			this.unlock();
			this._removeEvent();
			delete c[this.config.id];
			if (m) b.remove();
			else {
				m = this;
				a.title.html("");
				a.content.html("");
				a.buttons.html("");
				b[0].className = b[0].style.cssText = "";
				a.outer[0].className = "d-outer";
				b.css({
					left: 0,
					top: 0,
					position: n ? "fixed" : "absolute"
				});
				for (var g in this) this.hasOwnProperty(g) && "dom" !== g && delete this[g];
				this.hidden()
			}
			this.closed = !0;
			return this
		},
		time: function(a) {
			var b = this,
				c = this._timer;
			c && clearTimeout(c);
			if (a) this._timer = setTimeout(function() {
				b._click("cancel")
			}, a);
			return this
		},
		focus: function() {
			if (this.config.focus) try {
				var a = this._focus && this._focus[0] || this.dom.close[0];
				a && a.focus()
			} catch (b) {}
			return this
		},
		zIndex: function() {
			var a = this.dom,
				b = e.focus,
				c = e.defaults.zIndex++;
			a.wrap.css("zIndex", c);
			this._lockMask && this._lockMask.css("zIndex", c - 1);
			b && b.dom.outer.removeClass("d-state-focus");
			e.focus = this;
			a.outer.addClass("d-state-focus");
			return this
		},
		lock: function() {
			if (this._isLock) return this;
			var a = this,
				b = this.dom,
				c = document.createElement("div"),
				d = h(c),
				f = e.defaults.zIndex - 1;
			this.zIndex();
			b.outer.addClass("d-state-lock");
			d.css({
				zIndex: f,
				position: "fixed",
				left: 0,
				top: 0,
				width: "100%",
				height: "100%",
				overflow: "hidden"
			}).addClass("d-mask");
			n || d.css({
				position: "absolute",
				width: h(k).width() + "px",
				height: h(document).height() + "px"
			});
			d.bind("click", function() {
				a._reset()
			}).bind("dblclick", function() {
				a._click("cancel")
			});
			document.body.appendChild(c);
			this._lockMask = d;
			this._isLock = !0;
			return this
		},
		unlock: function() {
			if (!this._isLock) return this;
			this._lockMask.unbind();
			this._lockMask.hide();
			this._lockMask.remove();
			this.dom.outer.removeClass("d-state-lock");
			this._isLock = !1;
			return this
		},
		_getDom: function() {
			var a = document.body;
			if (!a) throw Error('artDialog: "documents.body" not ready');
			var b = document.createElement("div");
			b.style.cssText = "position:absolute;left:0;top:0";
			b.innerHTML = e._templates;
			a.insertBefore(b, a.firstChild);
			for (var c = 0, d = {}, f = b.getElementsByTagName("*"), g = f.length; c < g; c++)(a = f[c].className.split("d-")[1]) && (d[a] = h(f[c]));
			d.window = h(k);
			d.document = h(document);
			d.wrap = h(b);
			return d
		},
		_click: function(a) {
			a = this._listeners[a] && this._listeners[a].callback;
			return "function" !== typeof a || !1 !== a.call(this) ? this.close() : this
		},
		_reset: function() {
			var a = this.config.follow;
			a ? this.follow(a) : this.position()
		},
		_addEvent: function() {
			var a = this,
				b = this.dom;
			b.wrap.bind("click", function(c) {
				c = c.target;
				if (c.disabled) return !1;
				if (c === b.close[0]) return a._click("cancel"), !1;
				(c = c[p + "callback"]) && a._click(c)
			}).bind("mousedown", function() {
				a.zIndex()
			})
		},
		_removeEvent: function() {
			this.dom.wrap.unbind()
		}
	};
	e.fn.constructor.prototype = e.fn;
	h.fn.dialog = h.fn.artDialog = function() {
		var a = arguments;
		this[this.live ? "live" : "bind"]("click", function() {
			e.apply(this, a);
			return !1
		});
		return this
	};
	e.focus = null;
	e.get = function(a) {
		return a === l ? e.list : e.list[a]
	};
	e.list = {};
	h(document).bind("keydown", function(a) {
		var b = a.target,
			c = b.nodeName,
			d = /^input|textarea$/i,
			f = e.focus,
			a = a.keyCode;
		f && f.config.esc && !(d.test(c) && "button" !== b.type) && 27 === a && f._click("cancel")
	});
	h(k).bind("resize", function() {
		var a = e.list,
			b;
		for (b in a) a[b]._reset()
	});
	e._templates = '<div class="d-outer"><table class="d-border"><tbody><tr><td class="d-nw"></td><td class="d-n"></td><td class="d-ne"></td></tr><tr><td class="d-w"></td><td class="d-c"><div class="d-inner"><table class="d-dialog"><tbody><tr><td class="d-header"><div class="d-titleBar"><div class="d-title"></div><a class="d-close" href="javascript:;">\u00d7</a></div></td></tr><tr><td class="d-main"><div class="d-content"></div></td></tr><tr><td class="d-footer"><div class="d-buttons"></div></td></tr></tbody></table></div></td><td class="d-e"></td></tr><tr><td class="d-sw"></td><td class="d-s"></td><td class="d-se"></td></tr></tbody></table></div>';
	e.defaults = {
		content: '<div class="d-loading"><span>loading..</span></div>',
		title: "message",
		button: null,
		ok: null,
		cancel: null,
		initialize: null,
		beforeunload: null,
		okValue: "ok",
		cancelValue: "cancel",
		width: "auto",
		height: "auto",
		padding: "20px 25px",
		skin: null,
		time: null,
		esc: !0,
		focus: !0,
		visible: !0,
		follow: null,
		lock: !1,
		fixed: !1,
		zIndex: 99
	};
	this.artDialog = h.dialog = h.artDialog = e
})(this.art || this.jQuery, this);
(function(c) {
	c.alert = c.dialog.alert = function(b, a) {
		return c.dialog({
			id: "Alert",
			fixed: !0,
			lock: !0,
			content: b,
			ok: !0,
			beforeunload: a
		})
	};
	c.confirm = c.dialog.confirm = function(b, a, m) {
		return c.dialog({
			id: "Confirm",
			fixed: !0,
			lock: !0,
			content: b,
			ok: a,
			cancel: m
		})
	};
	c.prompt = c.dialog.prompt = function(b, a, m) {
		var d;
		return c.dialog({
			id: "Prompt",
			fixed: !0,
			lock: !0,
			content: ['<div style="margin-bottom:5px;font-size:12px">', b, '</div><div><input type="text" class="d-input-text" value="', m || "", '" style="width:18em;padding:6px 4px" /></div>'].join(""),
			initialize: function() {
				d = this.dom.content.find(".d-input-text")[0];
				d.select();
				d.focus()
			},
			ok: function() {
				return a && a.call(this, d.value)
			},
			cancel: function() {}
		})
	};
	c.dialog.prototype.shake = function() {
		var b = function(a, b, c) {
				var h = +new Date,
					e = setInterval(function() {
						var f = (+new Date - h) / c;
						1 <= f ? (clearInterval(e), b(f)) : a(f)
					}, 13)
			},
			a = function(c, d, g, h) {
				var e = h;
				void 0 === e && (e = 6, g /= e);
				var f = parseInt(c.style.marginLeft) || 0;
				b(function(a) {
					c.style.marginLeft = f + (d - f) * a + "px"
				}, function() {
					0 !== e && a(c, 1 === e ? 0 : 1.3 * (d / e - d), g, --e)
				}, g)
			};
		return function() {
			a(this.dom.wrap[0], 40, 600);
			return this
		}
	}();
	var o = function() {
			var b = this,
				a = function(a) {
					var c = b[a];
					b[a] = function() {
						return c.apply(b, arguments)
					}
				};
			a("start");
			a("over");
			a("end")
		};
	o.prototype = {
		start: function(b) {
			c(document).bind("mousemove", this.over).bind("mouseup", this.end);
			this._sClientX = b.clientX;
			this._sClientY = b.clientY;
			this.onstart(b.clientX, b.clientY);
			return !1
		},
		over: function(b) {
			this._mClientX = b.clientX;
			this._mClientY = b.clientY;
			this.onover(b.clientX - this._sClientX, b.clientY - this._sClientY);
			return !1
		},
		end: function(b) {
			c(document).unbind("mousemove", this.over).unbind("mouseup", this.end);
			this.onend(b.clientX, b.clientY);
			return !1
		}
	};
	var j = c(window),
		k = c(document),
		i = document.documentElement,
		p = !! ("minWidth" in i.style) && "onlosecapture" in i,
		q = "setCapture" in i,
		r = function() {
			return !1
		},
		n = function(b) {
			var a = new o,
				c = artDialog.focus,
				d = c.dom,
				g = d.wrap,
				h = d.title,
				e = g[0],
				f = h[0],
				i = d.main[0],
				l = e.style,
				s = i.style,
				t = b.target === d.se[0] ? !0 : !1,
				u = (d = "fixed" === e.style.position) ? 0 : k.scrollLeft(),
				v = d ? 0 : k.scrollTop(),
				n = j.width() - e.offsetWidth + u,
				A = j.height() - e.offsetHeight + v,
				w, x, y, z;
			a.onstart = function() {
				t ? (w = i.offsetWidth, x = i.offsetHeight) : (y = e.offsetLeft, z = e.offsetTop);
				k.bind("dblclick", a.end).bind("dragstart", r);
				p ? h.bind("losecapture", a.end) : j.bind("blur", a.end);
				q && f.setCapture();
				g.addClass("d-state-drag");
				c.focus()
			};
			a.onover = function(a, b) {
				if (t) {
					var c = a + w,
						d = b + x;
					l.width = "auto";
					s.width = Math.max(0, c) + "px";
					l.width = e.offsetWidth + "px";
					s.height = Math.max(0, d) + "px"
				} else c = Math.max(u, Math.min(n, a + y)), d = Math.max(v, Math.min(A, b + z)), l.left = c + "px", l.top = d + "px"
			};
			a.onend = function() {
				k.unbind("dblclick", a.end).unbind("dragstart", r);
				p ? h.unbind("losecapture", a.end) : j.unbind("blur", a.end);
				q && f.releaseCapture();
				g.removeClass("d-state-drag")
			};
			a.start(b)
		};
	c(document).bind("mousedown", function(b) {
		var a = artDialog.focus;
		if (a) {
			var c = b.target,
				d = a.config,
				a = a.dom;
			if (!1 !== d.drag && c === a.title[0] || !1 !== d.resize && c === a.se[0]) return n(b), !1
		}
	})
})(this.art || this.jQuery);;
(function($) {
	$.pinphp.init = function() {
		$.pinphp.ui.init();
		$.pinphp.tool.sendmail();
		$.pinphp.tool.msgtip();
	}
	$.pinphp.ui = {
		init: function() {
			$.pinphp.ui.input_init();
			$.pinphp.ui.fixed_nav();
			$.pinphp.ui.return_top();
			$.pinphp.ui.drop_down();
			$.pinphp.ui.decode_img($(document));
			$.pinphp.ui.captcha();
		},
		lazyload: function() {
			$('img').lazyload();
		},
		fixed_nav: function() {
			if (!$("#J_m_nav")[0]) return !1;
			var nt = !1;
			$(window).bind("scroll", function() {
				var st = $(document).scrollTop();
				nt = nt ? nt : $("#J_m_nav").offset().top;
				if (nt < st) {
					$("#J_m_nav").addClass("nav_fixed");
					$('#J_m_head').css('margin-bottom', '50px');
				} else {
					$("#J_m_nav").removeClass("nav_fixed");
					$('#J_m_head').css('margin-bottom', '10px');
				}
			});
		},
		return_top: function() {
			$('#J_returntop')[0] && $('#J_returntop').returntop();
		},
		drop_down: function() {
			var h = null,
				onshow = false;
			$('.J_down_menu_box').hover(function() {
				var self = $(this);
				if (onshow) clearTimeout(h);
				if (!self.find('.J_down_menu').is(":animated") && !onshow) {
					h = setTimeout(function() {
						self.addClass('down_hover').find('.J_down_menu').slideDown(200);
						onshow = true;
					}, 200);
				}
			}, function() {
				var self = $(this);
				if (!onshow) clearTimeout(h);
				h = setTimeout(function() {
					self.removeClass('down_hover').find('.J_down_menu').slideUp(200);
					onshow = false;
				}, 200);
			});
		},
		captcha: function() {
			$('#J_captcha_img').click(function() {
				var timenow = new Date().getTime(),
					url = $(this).attr('data-url').replace(/js_rand/g, timenow);
				$(this).attr("src", url);
			});
			$('#J_captcha_change').click(function() {
				$('#J_captcha_img').trigger('click');
			});
		},
		input_init: function() {
			$('input[def-val],textarea[def-val]').live('focus', function() {
				var self = $(this);
				$.trim(self.val()) == $.trim(self.attr('def-val')) && self.val("");
				self.css("color", "#484848")
			});
			$('input[def-val],textarea[def-val]').live('blur', function() {
				var self = $(this);
				$.trim(self.val()) == "" && (self.val(self.attr('def-val')), self.css("color", "#999999"));
			});
		},
		decode_img: function(context) {
			$('.J_decode_img', context).each(function() {
				var uri = $(this).attr('data-uri') || "";
				$(this).attr('src', $.pinphp.util.base64_decode(uri));
			});
		}
	}, $.pinphp.tool = {
		sendmail: function() {
			return PINER.async_sendmail ? ($.get(PINER.root + '/?a=send_mail'), !0) : !1;
		},
		msgtip: function() {
			if (PINER.uid) {
				var is_update = !1;
				var update = function() {
						is_update = !0;
						$.getJSON(PINER.root + '/?m=user&a=msgtip', function(result) {
							if (result.status == 1) {
								var fans = parseInt(result.data.fans),
									atme = parseInt(result.data.atme),
									msg = parseInt(result.data.msg),
									system = parseInt(result.data.system),
									msgtotal = fans + atme + msg + system;
								fans > 0 && $('#J_fans').html('(' + fans + ')');
								atme > 0 && $('#J_atme').html('(' + atme + ')');
								msg > 0 && $('#J_msg').html('(' + msg + ')');
								system > 0 && $('#J_system').html('(' + system + ')');
								msgtotal > 0 && $('#J_msgtip').html('(' + msgtotal + ')');
								is_update = !1;
								setTimeout(function() {
									update()
								}, 5E3);
							}
						});
					};
				!is_update && update();
			}
		}
	}
	$.pinphp.init();
})(jQuery);;
(function($) {
	$.pinphp.dialog = {
		islogin: function() {
			return "" == PINER.uid ? ($.pinphp.dialog.login(), !1) : !0;
		},
		login: function() {
			$.getJSON(PINER.root + '/?m=user&a=login', function(result) {
				if (result.status == 0) {
					$.pinphp.tip({
						content: result.msg,
						icon: 'error'
					});
				} else {
					$.dialog({
						id: 'login',
						title: lang.login_title,
						content: result.data,
						padding: '',
						fixed: true,
						lock: true
					});
					$.pinphp.dialog.dlogin_form($('#J_dlogin_form'));
				}
			});
		},
		dlogin_form: function(form) {
			form.ajaxForm({
				beforeSubmit: function() {
					var username = form.find('.J_username').val(),
						password = form.find('.J_password').val();
					if (username == '') {
						form.find('#J_login_fail').html('请输入用户名！').css("visibility", 'visible');
						return !1;
					}
					if (password == '') {
						form.find('#J_login_fail').html('请输入密码！').css("visibility", 'visible');
						return !1;
					}
				},
				success: function(result) {
					if (result.status == 1) {
						$.dialog.get('login').title(false).content('<div class="d_loading">' + result.msg + '</div>').time(2000);
						window.location.reload();
					} else {
						form.find('#J_login_fail').html(result.msg).css("visibility", 'visible');
					}
				},
				dataType: 'json'
			});
		}
	};
})(jQuery);;
(function() {
	$.pinphp.wall = {
		settings: {
			container: '#J_waterfall',
			item_unit: '.J_item',
			loading_bar: '#J_wall_loading',
			page_bar: '#J_wall_page',
			ajax_url: null,
			distance: 50,
			spage: 1,
			max_spage: 5
		},
		init: function(options) {
			options && $.extend($.pinphp.wall.settings, options);
			var s = $.pinphp.wall.settings;
			s.ajax_url = $(s.container).attr('data-uri');
			var distance = $(s.container).attr('data-distance');
			if (distance != void(0)) {
				s.distance = distance;
			}
			$(s.container)[0] && $(s.container).imagesLoaded(function() {
				$(s.container).masonry({
					itemSelector: s.item_unit
				});
				$(s.item_unit).animate({
					opacity: 1
				});
			});
			$.pinphp.wall.is_loading = !1;
			$(window).bind('scroll', $.pinphp.wall.lazy_load);
		},
		lazy_load: function() {
			var s = $.pinphp.wall.settings,
				st = $(document).height() - $(window).scrollTop() - $(window).height();
			if (!$.pinphp.wall.is_loading && $(s.loading_bar)[0] && st <= s.distance) {
				$.pinphp.wall.is_loading = !0;
				$.pinphp.wall.loader();
			}
		},
		is_loading: !0,
		loader: function() {
			var s = $.pinphp.wall.settings;
			$(s.loading_bar).show();
			$.ajax({
				url: s.ajax_url,
				data: {
					sp: s.spage
				},
				type: 'GET',
				dataType: 'json',
				success: function(result) {
					if (result.status == 1) {
						var html = $(result.data.html).css({
							opacity: 0
						});
						$.pinphp.ui.decode_img(html);
						html.find('.J_img').imagesLoaded(function() {
							html.animate({
								opacity: 1
							});
							$(s.container).append(html).masonry('appended', html, true, function() {
								$(s.loading_bar).hide();
								$.pinphp.wall.is_loading = !1;
								s.spage += 1;
								if (s.spage >= s.max_spage || !result.data.isfull) {
									$(s.page_bar).show();
									$(window).unbind('scroll', $.pinphp.wall.lazy_load);
								}!result.data.isfull && $(s.loading_bar).remove();
							});
						});
					} else {
						$.pinphp.tip({
							content: result.msg,
							icon: 'error'
						});
					}
				}
			});
		}
	}
	$.pinphp.wall.init({
		distance: PINER.config.wall_distance,
		max_spage: PINER.config.wall_spage_max
	});
})(jQuery);;
(function($) {
	$.pinphp.item = {
		settings: {
			share_btn: '.J_shareitem_btn',
			like_btn: '.J_likeitem',
			unlike_btn: '.J_unlike',
			del_btn: '.J_delitem',
			select_album: '#J_select_album',
			joinalbum_btn: '.J_joinalbum',
			item_unit: '.J_item',
			item_gallery: '#J_item_gallery'
		},
		init: function(options) {
			options && $.extend($.pinphp.item.settings, options);
			var s = $.pinphp.item.settings;
			$(s.item_unit).live('mouseover', function() {
				$(this).find(s.joinalbum_btn).show();
				$(this).find(s.del_btn).show();
				$(this).find(s.unlike_btn).show();
			}).live('mouseout', function() {
				$(this).find(s.joinalbum_btn).hide();
				$(this).find(s.del_btn).hide();
				$(this).find(s.unlike_btn).hide();
			});
			$.pinphp.item.share();
			$.pinphp.item.select_album();
			$.pinphp.item.joinalbum();
			$.pinphp.item.like();
			$.pinphp.item.unlike();
			$.pinphp.item.del();
			$.pinphp.item.gallery();
		},
		like: function() {
			var s = $.pinphp.item.settings;
			$(s.like_btn).live('click', function() {
				if (!$.pinphp.dialog.islogin()) return !1;
				var self = $(this),
					nb = self.siblings('.J_like_n').find('a'),
					id = self.attr('data-id'),
					aid = self.attr('data-aid'),
					n = parseInt(nb.html());
				$.getJSON(PINER.root + '/?m=item&a=like', {
					id: id,
					aid: aid
				}, function(result) {
					if (result.status == 1) {
						nb.text(n + 1).show();
						$.pinphp.tip({
							content: result.msg
						});
					} else {
						$.pinphp.tip({
							content: result.msg,
							icon: 'error'
						});
					}
				});
			});
		},
		unlike: function() {
			var s = $.pinphp.item.settings;
			$(s.unlike_btn).live('click', function() {
				if (!$.pinphp.dialog.islogin()) return !1;
				var self = $(this),
					id = self.attr('data-id');
				$.getJSON(PINER.root + '/?m=item&a=unlike', {
					id: id
				}, function(result) {
					if (result.status == 1) {
						self.parents(s.item_unit).slideUp(500, function() {
							$(this).parent().masonry('remove', $(this)).masonry('reload');
						});
					} else {
						$.pinphp.tip({
							content: result.msg,
							icon: 'error'
						});
					}
				});
			});
		},
		del: function() {
			var s = $.pinphp.item.settings;
			$(s.del_btn).live('click', function() {
				if (!$.pinphp.dialog.islogin()) return !1;
				var self = $(this),
					id = self.attr('data-id'),
					album_id = self.attr('data-aid');
				$.getJSON(PINER.root + '/?m=item&a=delete', {
					id: id,
					album_id: album_id
				}, function(result) {
					if (result.status == 1) {
						self.parents(s.item_unit).slideUp(500, function() {
							$(this).parent().masonry('remove', $(this)).masonry('reload');
						});
					} else {
						$.pinphp.tip({
							content: result.msg,
							icon: 'error'
						});
					}
				});
			});
		},
		select_album: function() {
			var s = $.pinphp.item.settings;
			$(s.select_album).find('.J_qcreate_btn').live('click', function() {
				$(this).hide();
				$(s.select_album).find('.J_qcreate').show();
			});
			$(s.select_album).find('.J_qc_submit').live('click', function() {
				var title = $(s.select_album).find('.J_qc_title').val(),
					cate_id = $(s.select_album).find('.J_qc_cate').val();
				$.ajax({
					url: PINER.root + '/?m=album&a=create_album',
					type: 'POST',
					data: {
						title: title,
						cate_id: cate_id
					},
					dataType: 'json',
					success: function(result) {
						if (result.status == 1) {
							$(s.select_album).find('.J_qcreate_btn').show();
							$('<option value="' + result.data + '">' + title + '</option>').appendTo($(s.select_album).find('.J_album_id'));
							setTimeout(function() {
								$(s.select_album).find('.J_album_id').find('option[value="' + result.data + '"]').attr("selected", true);
								$(s.select_album).find('.J_album_id').find('option[value="0"]').remove();
							}, 1);
							$(s.select_album).find('.J_df_cate').hide();
							$(s.select_album).find('.J_qcreate').hide();
						} else {
							$.pinphp.tip({
								content: result.msg,
								icon: 'error'
							});
						}
					}
				});
			});
		},
		joinalbum_form: function(form) {
			form.ajaxForm({
				beforeSubmit: function() {
					$.dialog.get('join_album').title(false).content('<div class="d_loading">' + lang.wait + '</div>');
				},
				success: function(result) {
					$.dialog.get('join_album').close();
					if (result.status == 1) {
						$.pinphp.tip({
							content: result.msg
						});
					} else {
						$.pinphp.tip({
							content: result.msg,
							icon: 'error'
						});
					}
				},
				dataType: 'json'
			});
		},
		joinalbum: function(id) {
			var s = $.pinphp.item.settings;
			$(s.joinalbum_btn).live('click', function() {
				if (!$.pinphp.dialog.islogin()) return !1;
				var id = $(this).attr('data-id');
				$(this).hide();
				$.dialog({
					id: 'join_album',
					title: lang.join_album,
					padding: '',
					fixed: true,
					lock: true
				});
				$.getJSON(PINER.root + '/?m=album&a=join', {
					id: id
				}, function(result) {
					if (result.status == 1) {
						$.dialog.get('join_album').content(result.data);
						$.pinphp.item.joinalbum_form($('#J_join_album'));
					} else {
						$.pinphp.tip({
							content: result.msg,
							icon: 'error'
						});
					}
				});
			});
		},
		share: function() {
			var s = $.pinphp.item.settings;
			$(s.share_btn).live('click', function() {
				if (!$.pinphp.dialog.islogin()) return !1;
				var aid = $(this).attr('data-aid');
				$.getJSON(PINER.root + '/?m=item&a=share_item', function(result) {
					if (result.status == 1) {
						$.dialog({
							id: 'share_item',
							title: lang.share_title,
							content: result.data,
							padding: '',
							fixed: true,
							lock: true
						});
						$.pinphp.item.share_form($('#J_share_item'), aid);
					} else {
						$.pinphp.tip({
							content: result.msg,
							icon: 'error'
						});
					}
				});
			});
		},
		share_form: function(form, aid) {
			form.find('.J_si_btn').die('click').live('click', function() {
				var si_url = $.trim($('.si_url').val());
				if (!$.pinphp.util.isURl(si_url)) return $.pinphp.tip({
					content: lang.please_input + lang.correct_itemurl,
					icon: 'alert'
				}), !1;
				$.dialog.get('share_item').title(false).content('<div class="d_loading">' + lang.wait + '</div>');
				$.getJSON(PINER.root + '/?m=item&a=fetch_item', {
					url: si_url,
					aid: aid
				}, function(result) {
					if (result.status == 1) {
						$.pinphp.item.fetch(result.data);
					} else {
						$.dialog.get('share_item').close();
						$.pinphp.tip({
							content: result.msg,
							icon: 'error'
						});
					}
				});
			});
		},
		fetch: function(result) {
			$.dialog.get('share_item').title(lang.share_title).content(result.html);
			$.pinphp.item.fetch_form($('#J_fetch_item'), result.item);
		},
		fetch_form: function(form, item) {
			form.find('.J_pub_btn').die('click').live('click', function() {
				$.dialog.get('share_item').title(false).content('<div class="d_loading">' + lang.wait + '</div>');
				var album_id = $('.J_album_id').val(),
					ac_id = $('.J_df_cate').val(),
					intro = form.find('.J_intro').val();
				$.ajax({
					url: PINER.root + '/?m=item&a=publish_item',
					type: 'POST',
					data: {
						item: item,
						album_id: album_id,
						intro: intro
					},
					dataType: 'json',
					success: function(result) {
						if (result.status == 1) {
							$.dialog.get('share_item').close();
							$.pinphp.tip({
								content: result.msg
							});
						} else {
							$.pinphp.tip({
								content: result.msg,
								icon: 'error'
							});
						}
					}
				});
			});
		},
		gallery: function() {
			var s = $.pinphp.item.settings;
			if ($('#J_img_list', s.item_gallery)[0]) {
				$('#J_img_list').jcarousel();
				$('#J_img_list li', s.item_gallery).live('mouseover', function() {
					var self = $(this),
						bimg = self.attr('data-url');
					self.addClass('active').siblings().removeClass('active');
					$('.J_item img', s.item_gallery).attr('src', bimg).attr('jqimg', bimg);
				});
				$('#J_img_zoom').imagesLoaded(function() {
					if ($('#J_img_zoom img').width() >= 468) {
						$('#J_img_zoom', s.item_gallery).jqueryzoom({
							xzoom: 420,
							yzoom: 420,
							offset: 20
						});
					}
				});
			}
		}
	};
	$.pinphp.item.init();
})(jQuery);;
(function($) {
	$.pinphp.user = {
		settings: {
			card_btn: '.J_card',
			layer_html: '<div id="J_card_layer" class="user_card"><div id="J_card_info"></div><div class="J_card_arrow card_arrow"></div></div>',
			loading_html: '<div class="card_info"><p class="card_loading">' + lang.card_loading + '</p></div><div class="card_toolbar"></div>',
			follow_bar: '.J_follow_bar',
			add_btn_html: '<a href="javascript:;" class="J_fo_u fo_u_btn">关注</a>',
			add_ok_html: '<span class="fo_u_ok">已关注</span><a href="javascript:;" class="J_unfo_u green">取消</a>',
			add_all_html: '<span class="fo_u_all">互相关注</span><a href="javascript:;" class="J_unfo_u green">取消</a>'
		},
		init: function(options) {
			options && $.extend($.pinphp.user.settings, options);
			var s = $.pinphp.user.settings;
			$.pinphp.user.card();
			$.pinphp.user.follow();
			$.pinphp.user.unfollow();
			$.pinphp.user.bind_form();
		},
		follow: function() {
			var s = $.pinphp.user.settings;
			$(s.follow_bar).find('.J_fo_u').live('click', function() {
				if (!$.pinphp.dialog.islogin()) return !1;
				var self = $(this),
					uid = $(this).parent().attr('data-uid');
				$.getJSON(PINER.root + '/?m=user&a=follow', {
					uid: uid
				}, function(result) {
					if (result.status == 1) {
						result.data == 1 ? self.parent().html(s.add_ok_html) : self.parent().html(s.add_all_html);
						$("body").data(uid, false);
					} else {
						$.pinphp.tip({
							content: result.msg,
							icon: 'error'
						});
					}
				});
			});
		},
		unfollow: function() {
			var s = $.pinphp.user.settings;
			$(s.follow_bar).find('.J_unfo_u').live('click', function() {
				if (!$.pinphp.dialog.islogin()) return !1;
				if (!confirm(lang.confirm_unfollow)) return !1;
				var self = $(this),
					uid = $(this).parent().attr('data-uid');
				$.getJSON(PINER.root + '/?m=user&a=unfollow', {
					uid: uid
				}, function(result) {
					if (result.status == 1) {
						self.parent().html(s.add_btn_html);
						$("body").data(uid, false);
					} else {
						$.pinphp.tip({
							content: result.msg,
							icon: 'error'
						});
					}
				});
			});
		},
		card: function() {
			var s = $.pinphp.user.settings,
				h = null,
				n = null;
			$(s.card_btn).live({
				mouseover: function() {
					clearTimeout(h);
					clearTimeout(n);
					var p = $(this).offset(),
						l = p.left,
						d = $(this).width(),
						q = d / 2 - 8,
						w = $(window).width();
					l + 300 > w && (l = l - 300 + d, q = 300 - d / 2 - 8), uid = $(this).attr('data-uid');
					if (!uid) return !1;
					!$('#J_card_layer')[0] && $('body').append(s.layer_html);
					$('#J_card_info').html(s.loading_html);
					$('#J_card_layer').css({
						top: p.top - 145 + "px",
						left: l + "px"
					});
					$("#J_card_layer .J_card_arrow").css("margin-left", q + "px");
					h = setTimeout(function() {
						clearTimeout(h);
						$("#J_card_layer").show();
					}, 200);
					$("#J_card_layer").hover(function() {
						clearTimeout(h);
						$("#J_card_layer").show();
					}, function() {
						$("#J_card_layer").hide();
					});
					if ($('body').data(uid) != void(0) && $('body').data(uid) != '') {
						$("#J_card_info").html($('body').data(uid));
					} else {
						n = setTimeout(function() {
							$.getJSON(PINER.root + '/?m=space&a=card', {
								uid: uid
							}, function(result) {
								if (result.status == 1) {
									$("#J_card_info").html(result.data);
									$("body").data(uid, result.data);
									clearTimeout(h);
								} else {
									clearTimeout(h);
									clearTimeout(n);
									$.pinphp.tip({
										content: result.msg,
										icon: 'error'
									});
								}
							});
						}, 500);
					}
				},
				mouseout: function() {
					clearTimeout(h);
					clearTimeout(n);
					h = setTimeout(function() {
						$("#J_card_layer").hide();
					}, 500);
				}
			});
		},
		login_validate: function(form) {
			$.formValidator.initConfig({
				formid: form.attr('id'),
				autotip: true
			});
			form.find('#J_name').formValidator({
				onshow: ' ',
				onfocus: lang.please_input + lang.username,
				oncorrect: ' '
			}).inputValidator({
				min: 1,
				onerror: lang.please_input + lang.username
			});
			form.find('#J_pass').formValidator({
				onshow: ' ',
				onfocus: lang.please_input + lang.password,
				oncorrect: ' '
			}).inputValidator({
				min: 1,
				onerror: lang.please_input + lang.password
			});
		},
		findpwd_validate: function(form) {
			$.formValidator.initConfig({
				formid: form.attr('id'),
				autotip: true
			});
			form.find('#J_name').formValidator({
				onshow: ' ',
				onfocus: lang.please_input + lang.username,
				oncorrect: ' '
			}).inputValidator({
				min: 1,
				onerror: lang.please_input + lang.username
			});
			$('#J_captcha').formValidator({
				onshow: ' ',
				onfocus: lang.captcha_tip,
				oncorrect: ' '
			}).inputValidator({
				min: 1,
				onerror: lang.captcha_empty
			});
		},
		resetpwd_form: function() {
			$.formValidator.initConfig({
				formid: 'J_resetpwd_form',
				autotip: true
			});
			$('#J_password').formValidator({
				onshow: ' ',
				onfocus: lang.password_tip,
				oncorrect: ' '
			}).inputValidator({
				min: 6,
				onerror: lang.password_too_short
			}).inputValidator({
				max: 20,
				onerror: lang.password_too_long
			});
			$('#J_repassword').formValidator({
				onshow: ' ',
				onfocus: lang.repassword_tip,
				oncorrect: ' '
			}).inputValidator({
				min: 1,
				onerror: lang.repassword_empty
			}).compareValidator({
				desid: 'J_password',
				operateor: '=',
				onerror: lang.passwords_not_match
			});
			$('#J_captcha').formValidator({
				onshow: ' ',
				onfocus: lang.captcha_tip,
				oncorrect: ' '
			}).inputValidator({
				min: 1,
				onerror: lang.captcha_empty
			});
		},
		bind_form: function() {
			if ($('#J_bind_form')) {
				$.formValidator.initConfig({
					formid: 'J_bind_form',
					autotip: true
				});
				$('#J_email').formValidator({
					onshow: ' ',
					onfocus: lang.email_tip,
					oncorrect: ' '
				}).inputValidator({
					min: 1,
					onerror: lang.please_input + lang.email
				}).regexValidator({
					regexp: 'email',
					datatype: 'enum',
					onerror: lang.email_format_error
				}).ajaxValidator({
					type: 'get',
					url: PINER.root + '/?m=user&a=ajax_check',
					data: 'type=email',
					datatype: 'json',
					async: 'false',
					success: function(result) {
						return result.status == '1' ? !0 : !1;
					},
					buttons: $('#J_regsub'),
					onerror: lang.email_exists,
					onwait: lang.wait
				});
				$('#J_username').formValidator({
					onshow: ' ',
					onfocus: lang.username_tip,
					oncorrect: ' '
				}).inputValidator({
					min: 1,
					onerror: lang.please_input + lang.username
				}).inputValidator({
					max: 20,
					onerror: lang.username_tip
				}).ajaxValidator({
					type: 'get',
					url: PINER.root + '/?m=user&a=ajax_check',
					data: 'type=username',
					datatype: 'json',
					async: 'false',
					success: function(result) {
						return result.status == '1' ? !0 : !1;
					},
					buttons: $('#J_regsub'),
					onerror: lang.username_exists,
					onwait: lang.wait
				}).defaultPassed();
				$('#J_password').formValidator({
					onshow: ' ',
					onfocus: lang.password_tip,
					oncorrect: ' '
				}).inputValidator({
					min: 6,
					onerror: lang.password_too_short
				}).inputValidator({
					max: 20,
					onerror: lang.password_too_long
				});
				$('#J_repassword').formValidator({
					onshow: ' ',
					onfocus: lang.repassword_tip,
					oncorrect: ' '
				}).inputValidator({
					min: 1,
					onerror: lang.repassword_empty
				}).compareValidator({
					desid: 'J_password',
					operateor: '=',
					onerror: lang.passwords_not_match
				});
			}
		},
		register_form: function(form) {
			$('#J_protocol_btn').live('click', function() {
				var content = $('#J_protocol').html();
				$.dialog({
					id: 'protocol',
					title: lang.user_protocol,
					content: content,
					padding: '',
					fixed: true,
					lock: true
				});
			});
			$.formValidator.initConfig({
				formid: 'J_register_form',
				autotip: true
			});
			$('#J_email').formValidator({
				onshow: ' ',
				onfocus: lang.email_tip,
				oncorrect: ' '
			}).inputValidator({
				min: 1,
				onerror: lang.please_input + lang.email
			}).regexValidator({
				regexp: 'email',
				datatype: 'enum',
				onerror: lang.email_format_error
			}).ajaxValidator({
				type: 'get',
				url: PINER.root + '/?m=user&a=ajax_check',
				data: 'type=email',
				datatype: 'json',
				async: 'false',
				success: function(result) {
					return result.status == '1' ? !0 : !1;
				},
				buttons: $('#J_regsub'),
				onerror: lang.email_exists,
				onwait: lang.wait
			});
			$('#J_username').formValidator({
				onshow: ' ',
				onfocus: lang.username_tip,
				oncorrect: ' '
			}).inputValidator({
				min: 1,
				onerror: lang.please_input + lang.username
			}).inputValidator({
				max: 20,
				onerror: lang.username_tip
			}).ajaxValidator({
				type: 'get',
				url: PINER.root + '/?m=user&a=ajax_check',
				data: 'type=username',
				datatype: 'json',
				async: 'false',
				success: function(result) {
					return result.status == '1' ? !0 : !1;
				},
				buttons: $('#J_regsub'),
				onerror: lang.username_exists,
				onwait: lang.wait
			});
			$('#J_password').formValidator({
				onshow: ' ',
				onfocus: lang.password_tip,
				oncorrect: ' '
			}).inputValidator({
				min: 6,
				onerror: lang.password_too_short
			}).inputValidator({
				max: 20,
				onerror: lang.password_too_long
			});
			$('#J_repassword').formValidator({
				onshow: ' ',
				onfocus: lang.repassword_tip,
				oncorrect: ' '
			}).inputValidator({
				min: 1,
				onerror: lang.repassword_empty
			}).compareValidator({
				desid: 'J_password',
				operateor: '=',
				onerror: lang.passwords_not_match
			});
			$('#J_captcha').formValidator({
				onshow: ' ',
				onfocus: lang.captcha_tip,
				oncorrect: ' '
			}).inputValidator({
				min: 1,
				onerror: lang.captcha_empty
			});
		}
	};
	$.pinphp.user.init();
})(jQuery);;
(function($) {
	$.pinphp.album = {
		settings: {
			create_btn: '.J_createalbum_btn',
			album_unit: '.J_album_item'
		},
		init: function(options) {
			options && $.extend($.pinphp.album.settings, options);
			var s = $.pinphp.album.settings;
			$(s.create_btn).live('click', function() {
				$.pinphp.album.create();
			});
			$(s.album_unit).live('mouseover', function() {
				$(this).find('.J_control').show();
				$(this).find('.J_mask').hide();
			}).live('mouseout', function() {
				$(this).find('.J_control').hide();
				$(this).find('.J_mask').show();
			});
			$(s.album_unit).find('.J_edit').live('click', function() {
				var aid = $(this).parents(s.album_unit).attr('data-aid');
				$.pinphp.album.edit(aid);
			});
			$(s.album_unit).find('.J_del').live('click', function() {
				var aid = $(this).parents(s.album_unit).attr('data-aid');
				$.pinphp.album.del(aid);
			});
			$.pinphp.album.follow();
			$.pinphp.album.unfollow();
		},
		form_init: function(form) {
			form.find('#J_upload_banner').uploader({
				action_url: PINER.root + '/?m=album&a=album_upload_banner',
				input_id: 'J_banner',
				input_name: 'banner',
				onComplete: function(id, fileName, result) {
					if (result.status == '1') {
						$('#J_banner').val(result.data.banner);
						$('#J_album_form').find('.J_preview').html('<img src="' + result.data.src + '" class="fl" />');
					} else {
						$.pinphp.tip({
							content: result.msg,
							icon: 'error'
						});
					}
				}
			});
			$.formValidator.initConfig({
				formid: form.attr('id'),
				autotip: true
			});
			form.find('#J_album_title').formValidator({
				onshow: ' ',
				onfocus: lang.please_input + lang.title
			}).inputValidator({
				min: 1,
				onerror: lang.please_input + lang.title
			});
			form.ajaxForm({
				success: function(result) {
					if (result.status == 1) {
						$.dialog.get('album').close();
						$.pinphp.tip({
							content: result.msg
						});
						window.location.reload();
					} else {
						$.pinphp.tip({
							content: result.msg,
							icon: 'error'
						});
					}
				},
				dataType: 'json'
			});
		},
		create: function() {
			if (!$.pinphp.dialog.islogin()) return !1;
			$.getJSON(PINER.root + '/?m=album&a=create_album', function(result) {
				if (result.status == 1) {
					$.dialog({
						id: 'album',
						title: lang.create_album,
						content: result.data,
						padding: '',
						fixed: true,
						lock: true
					});
					$.pinphp.album.form_init($('#J_album_form'));
				} else {
					$.pinphp.tip({
						content: result.msg,
						icon: 'error'
					});
				}
			});
		},
		edit: function(aid) {
			if (!$.pinphp.dialog.islogin()) return !1;
			$.dialog({
				id: 'album',
				title: lang.edit_album,
				padding: '',
				fixed: true,
				lock: true
			});
			$.getJSON(PINER.root + '/?m=album&a=edit_album', {
				aid: aid
			}, function(result) {
				if (result.status == 1) {
					$.dialog.get('album').content(result.data);
					$.pinphp.album.form_init($('#J_album_form'));
				} else {
					$.pinphp.tip({
						content: result.msg,
						icon: 'error'
					});
				}
			});
		},
		del: function(aid) {
			if (!$.pinphp.dialog.islogin()) return !1;
			if (!confirm(lang.confirm_del_album)) return !1;
			$.getJSON(PINER.root + '/?m=album&a=delete_album', {
				aid: aid
			}, function(result) {
				if (result.status == 1) {
					$.pinphp.tip({
						content: result.msg
					});
					window.location.reload();
				} else {
					$.pinphp.tip({
						content: result.msg,
						icon: 'error'
					});
				}
			});
		},
		follow: function() {
			$('.J_follow_album').live('click', function() {
				if (!$.pinphp.dialog.islogin()) return !1;
				var self = $(this),
					aid = self.attr('data-aid'),
					afn = parseInt($('#J_afn_' + aid).text());
				$.getJSON(PINER.root + '/?m=album&a=follow', {
					aid: aid
				}, function(result) {
					if (result.status == 1) {
						self.html(lang.unfollow_album);
						self.removeClass('J_follow_album').removeClass('album_look_link').addClass('J_unfollow_album').addClass('album_unlook_link');
						$('#J_afn_' + aid).text(afn + 1);
					} else {
						$.pinphp.tip({
							content: result.msg,
							icon: 'error'
						});
					}
				});
			});
		},
		unfollow: function() {
			$('.J_unfollow_album').live('click', function() {
				if (!$.pinphp.dialog.islogin()) return !1;
				var self = $(this),
					aid = self.attr('data-aid'),
					afn = parseInt($('#J_afn_' + aid).text());
				$.getJSON(PINER.root + '/?m=album&a=unfollow', {
					aid: aid
				}, function(result) {
					if (result.status == 1) {
						self.html(lang.follow_album);
						self.removeClass('J_unfollow_album').removeClass('album_unlook_link').addClass('J_follow_album').addClass('album_look_link');
						$('#J_afn_' + aid).text(afn - 1);
					} else {
						$.pinphp.tip({
							content: result.msg,
							icon: 'error'
						});
					}
				});
			});
		}
	};
	$.pinphp.album.init();
})(jQuery);