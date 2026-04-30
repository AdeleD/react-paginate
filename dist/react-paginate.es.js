import { Component as e } from "react";
import t from "prop-types";
//#region \0rolldown/runtime.js
var n = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), r = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), i = /* @__PURE__ */ n(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), a = /* @__PURE__ */ n(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === k ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case w: return "Suspense";
				case T: return "SuspenseList";
				case O: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case S: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case C:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case E: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case D:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function i(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function a(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === D) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function o() {
			var e = A.A;
			return e === null ? null : e.getOwner();
		}
		function s() {
			return Error("react-stack-top-frame");
		}
		function c(e) {
			if (j.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function l(e, t) {
			function n() {
				P || (P = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function u() {
			var e = t(this.type);
			return F[e] || (F[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function d(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: u
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, r, a, s, u) {
			var f = n.children;
			if (f !== void 0) if (a) if (M(f)) {
				for (a = 0; a < f.length; a++) p(f[a]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (j.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				a = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", R[f + a] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", a, f, m, f), R[f + a] = !0);
			}
			if (f = null, r !== void 0 && (i(r), f = "" + r), c(n) && (i(n.key), f = "" + n.key), "key" in n) for (var h in r = {}, n) h !== "key" && (r[h] = n[h]);
			else r = n;
			return f && l(r, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), d(e, f, r, o(), s, u);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === D && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = r("react"), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), k = Symbol.for("react.client.reference"), A = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = Object.prototype.hasOwnProperty, M = Array.isArray, N = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var P, F = {}, I = h.react_stack_bottom_frame.bind(h, s)(), L = N(a(s)), R = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > A.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : I, r ? N(a(e)) : L);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > A.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : I, r ? N(a(e)) : L);
		};
	})();
})), o = (/* @__PURE__ */ n(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = i() : t.exports = a();
})))(), s = (e) => {
	let { pageClassName: t, pageLinkClassName: n } = e, { page: r, selected: i, activeClassName: a, activeLinkClassName: s, getEventListener: c, pageSelectedHandler: l, href: u, extraAriaContext: d, pageLabelBuilder: f, rel: p } = e, m = e.ariaLabel || "Page " + r + (d ? " " + d : ""), h = null;
	return i && (h = "page", m = e.ariaLabel || "Page " + r + " is your current page", t = t === void 0 ? a : t + " " + a, n === void 0 ? n = s : s !== void 0 && (n = n + " " + s)), /* @__PURE__ */ (0, o.jsx)("li", {
		className: t,
		children: /* @__PURE__ */ (0, o.jsx)("a", {
			rel: p,
			role: u ? void 0 : "button",
			className: n,
			href: u,
			tabIndex: i ? "-1" : "0",
			"aria-label": m,
			"aria-current": h,
			onKeyPress: l,
			...c(l),
			children: f(r)
		})
	});
};
s.propTypes = {
	pageSelectedHandler: t.func.isRequired,
	selected: t.bool.isRequired,
	pageClassName: t.string,
	pageLinkClassName: t.string,
	activeClassName: t.string,
	activeLinkClassName: t.string,
	extraAriaContext: t.string,
	href: t.string,
	ariaLabel: t.string,
	page: t.number.isRequired,
	getEventListener: t.func.isRequired,
	pageLabelBuilder: t.func.isRequired,
	rel: t.string
};
//#endregion
//#region react_components/BreakView.jsx
var c = (e) => {
	let { breakLabel: t, breakAriaLabel: n, breakClassName: r, breakLinkClassName: i, breakHandler: a, getEventListener: s } = e;
	return /* @__PURE__ */ (0, o.jsx)("li", {
		className: r || "break",
		children: /* @__PURE__ */ (0, o.jsx)("a", {
			className: i,
			role: "button",
			tabIndex: "0",
			"aria-label": n,
			onKeyPress: a,
			...s(a),
			children: t
		})
	});
};
c.propTypes = {
	breakLabel: t.oneOfType([t.string, t.node]),
	breakAriaLabel: t.string,
	breakClassName: t.string,
	breakLinkClassName: t.string,
	breakHandler: t.func.isRequired,
	getEventListener: t.func.isRequired
};
//#endregion
//#region react_components/utils.js
function l(e, t = "") {
	return e ?? t;
}
//#endregion
//#region react_components/index.js
var u = class extends e {
	static propTypes = {
		pageCount: t.number.isRequired,
		pageRangeDisplayed: t.number,
		marginPagesDisplayed: t.number,
		previousLabel: t.node,
		previousAriaLabel: t.string,
		prevPageRel: t.string,
		prevRel: t.string,
		nextLabel: t.node,
		nextAriaLabel: t.string,
		nextPageRel: t.string,
		nextRel: t.string,
		breakLabel: t.oneOfType([t.string, t.node]),
		breakAriaLabels: t.shape({
			forward: t.string,
			backward: t.string
		}),
		hrefBuilder: t.func,
		hrefAllControls: t.bool,
		onPageChange: t.func,
		onPageActive: t.func,
		onClick: t.func,
		initialPage: t.number,
		forcePage: t.number,
		disableInitialCallback: t.bool,
		containerClassName: t.string,
		className: t.string,
		pageClassName: t.string,
		pageLinkClassName: t.string,
		pageLabelBuilder: t.func,
		activeClassName: t.string,
		activeLinkClassName: t.string,
		previousClassName: t.string,
		nextClassName: t.string,
		previousLinkClassName: t.string,
		nextLinkClassName: t.string,
		disabledClassName: t.string,
		disabledLinkClassName: t.string,
		breakClassName: t.string,
		breakLinkClassName: t.string,
		extraAriaContext: t.string,
		ariaLabelBuilder: t.func,
		eventListener: t.string,
		renderOnZeroPageCount: t.func,
		selectedPageRel: t.string
	};
	static defaultProps = {
		pageRangeDisplayed: 2,
		marginPagesDisplayed: 3,
		activeClassName: "selected",
		previousLabel: "Previous",
		previousClassName: "previous",
		previousAriaLabel: "Previous page",
		prevPageRel: "prev",
		prevRel: "prev",
		nextLabel: "Next",
		nextClassName: "next",
		nextAriaLabel: "Next page",
		nextPageRel: "next",
		nextRel: "next",
		breakLabel: "...",
		breakAriaLabels: {
			forward: "Jump forward",
			backward: "Jump backward"
		},
		disabledClassName: "disabled",
		disableInitialCallback: !1,
		pageLabelBuilder: (e) => e,
		eventListener: "onClick",
		renderOnZeroPageCount: void 0,
		selectedPageRel: "canonical",
		hrefAllControls: !1
	};
	constructor(e) {
		super(e), e.initialPage !== void 0 && e.forcePage !== void 0 && console.warn(`(react-paginate): Both initialPage (${e.initialPage}) and forcePage (${e.forcePage}) props are provided, which is discouraged. Use exclusively forcePage prop for a controlled component.
See https://reactjs.org/docs/forms.html#controlled-components`);
		let t;
		t = e.initialPage ? e.initialPage : e.forcePage ? e.forcePage : 0, this.state = { selected: t };
	}
	componentDidMount() {
		let { initialPage: e, disableInitialCallback: t, extraAriaContext: n, pageCount: r, forcePage: i } = this.props;
		e !== void 0 && !t && this.callCallback(e), n && console.warn("DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead."), Number.isInteger(r) || console.warn(`(react-paginate): The pageCount prop value provided is not an integer (${r}). Did you forget a Math.ceil()?`), e !== void 0 && e > r - 1 && console.warn(`(react-paginate): The initialPage prop provided is greater than the maximum page index from pageCount prop (${e} > ${r - 1}).`), i !== void 0 && i > r - 1 && console.warn(`(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (${i} > ${r - 1}).`);
	}
	componentDidUpdate(e) {
		this.props.forcePage !== void 0 && this.props.forcePage !== e.forcePage && (this.props.forcePage > this.props.pageCount - 1 && console.warn(`(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (${this.props.forcePage} > ${this.props.pageCount - 1}).`), this.setState({ selected: this.props.forcePage })), Number.isInteger(e.pageCount) && !Number.isInteger(this.props.pageCount) && console.warn(`(react-paginate): The pageCount prop value provided is not an integer (${this.props.pageCount}). Did you forget a Math.ceil()?`);
	}
	handlePreviousPage = (e) => {
		let { selected: t } = this.state;
		this.handleClick(e, null, t > 0 ? t - 1 : void 0, { isPrevious: !0 });
	};
	handleNextPage = (e) => {
		let { selected: t } = this.state, { pageCount: n } = this.props;
		this.handleClick(e, null, t < n - 1 ? t + 1 : void 0, { isNext: !0 });
	};
	handlePageSelected = (e, t) => {
		if (this.state.selected === e) {
			this.callActiveCallback(e), this.handleClick(t, null, void 0, { isActive: !0 });
			return;
		}
		this.handleClick(t, null, e);
	};
	handlePageChange = (e) => {
		this.state.selected !== e && (this.setState({ selected: e }), this.callCallback(e));
	};
	getEventListener = (e) => {
		let { eventListener: t } = this.props;
		return { [t]: e };
	};
	getForwardJump() {
		let { selected: e } = this.state, { pageCount: t, pageRangeDisplayed: n } = this.props, r = e + n;
		return r >= t ? t - 1 : r;
	}
	getBackwardJump() {
		let { selected: e } = this.state, { pageRangeDisplayed: t } = this.props, n = e - t;
		return n < 0 ? 0 : n;
	}
	handleClick = (e, t, n, { isPrevious: r = !1, isNext: i = !1, isBreak: a = !1, isActive: o = !1 } = {}) => {
		e.preventDefault ? e.preventDefault() : e.returnValue = !1;
		let { selected: s } = this.state, { onClick: c } = this.props, l = n;
		if (c) {
			let u = c({
				index: t,
				selected: s,
				nextSelectedPage: n,
				event: e,
				isPrevious: r,
				isNext: i,
				isBreak: a,
				isActive: o
			});
			if (u === !1) return;
			Number.isInteger(u) && (l = u);
		}
		l !== void 0 && this.handlePageChange(l);
	};
	handleBreakClick = (e, t) => {
		let { selected: n } = this.state;
		this.handleClick(t, e, n < e ? this.getForwardJump() : this.getBackwardJump(), { isBreak: !0 });
	};
	getElementHref(e) {
		let { hrefBuilder: t, pageCount: n, hrefAllControls: r } = this.props;
		if (t && (r || e >= 0 && e < n)) return t(e + 1, n, this.state.selected);
	}
	ariaLabelBuilder(e) {
		let t = e === this.state.selected;
		if (this.props.ariaLabelBuilder && e >= 0 && e < this.props.pageCount) {
			let n = this.props.ariaLabelBuilder(e + 1, t);
			return this.props.extraAriaContext && !t && (n = n + " " + this.props.extraAriaContext), n;
		}
	}
	callCallback = (e) => {
		this.props.onPageChange !== void 0 && typeof this.props.onPageChange == "function" && this.props.onPageChange({ selected: e });
	};
	callActiveCallback = (e) => {
		this.props.onPageActive !== void 0 && typeof this.props.onPageActive == "function" && this.props.onPageActive({ selected: e });
	};
	getElementPageRel = (e) => {
		let { selected: t } = this.state, { nextPageRel: n, prevPageRel: r, selectedPageRel: i } = this.props;
		if (t - 1 === e) return r;
		if (t === e) return i;
		if (t + 1 === e) return n;
	};
	getPageElement(e) {
		let { selected: t } = this.state, { pageClassName: n, pageLinkClassName: r, activeClassName: i, activeLinkClassName: a, extraAriaContext: c, pageLabelBuilder: l } = this.props;
		return /* @__PURE__ */ (0, o.jsx)(s, {
			pageSelectedHandler: this.handlePageSelected.bind(null, e),
			selected: t === e,
			rel: this.getElementPageRel(e),
			pageClassName: n,
			pageLinkClassName: r,
			activeClassName: i,
			activeLinkClassName: a,
			extraAriaContext: c,
			href: this.getElementHref(e),
			ariaLabel: this.ariaLabelBuilder(e),
			page: e + 1,
			pageLabelBuilder: l,
			getEventListener: this.getEventListener
		}, e);
	}
	pagination = () => {
		let e = [], { pageRangeDisplayed: t, pageCount: n, marginPagesDisplayed: r, breakLabel: i, breakClassName: a, breakLinkClassName: s, breakAriaLabels: l } = this.props, { selected: u } = this.state;
		if (n <= t) for (let t = 0; t < n; t++) e.push(this.getPageElement(t));
		else {
			let d = t / 2, f = t - d;
			u > n - t / 2 ? (f = n - u, d = t - f) : u < t / 2 && (d = u, f = t - d);
			let p = (e) => this.getPageElement(e), m, h, g = [];
			for (m = 0; m < n; m++) {
				let e = m + 1;
				if (e <= r) {
					g.push({
						type: "page",
						index: m,
						display: p(m)
					});
					continue;
				}
				if (e > n - r) {
					g.push({
						type: "page",
						index: m,
						display: p(m)
					});
					continue;
				}
				let _ = u === 0 && t > 1 ? f - 1 : f;
				if (m >= u - d && m <= u + _) {
					g.push({
						type: "page",
						index: m,
						display: p(m)
					});
					continue;
				}
				i && g.length > 0 && g[g.length - 1].display !== h && (t > 0 || r > 0) && (h = /* @__PURE__ */ (0, o.jsx)(c, {
					breakAriaLabel: m < u ? l.backward : l.forward,
					breakLabel: i,
					breakClassName: a,
					breakLinkClassName: s,
					breakHandler: this.handleBreakClick.bind(null, m),
					getEventListener: this.getEventListener
				}, m), g.push({
					type: "break",
					index: m,
					display: h
				}));
			}
			g.forEach((t, n) => {
				let r = t;
				t.type === "break" && g[n - 1] && g[n - 1].type === "page" && g[n + 1] && g[n + 1].type === "page" && g[n + 1].index - g[n - 1].index <= 2 && (r = {
					type: "page",
					index: t.index,
					display: p(t.index)
				}), e.push(r.display);
			});
		}
		return e;
	};
	render() {
		let { renderOnZeroPageCount: e } = this.props;
		if (this.props.pageCount === 0 && e !== void 0) return e && e(this.props);
		let { disabledClassName: t, disabledLinkClassName: n, pageCount: r, className: i, containerClassName: a, previousLabel: s, previousClassName: c, previousLinkClassName: u, previousAriaLabel: d, prevRel: f, nextLabel: p, nextClassName: m, nextLinkClassName: h, nextAriaLabel: g, nextRel: _ } = this.props, { selected: v } = this.state, y = v === 0, b = v === r - 1, x = `${l(c)}${y ? ` ${l(t)}` : ""}`, S = `${l(m)}${b ? ` ${l(t)}` : ""}`, C = `${l(u)}${y ? ` ${l(n)}` : ""}`, w = `${l(h)}${b ? ` ${l(n)}` : ""}`, T = y ? "true" : "false", E = b ? "true" : "false";
		return /* @__PURE__ */ (0, o.jsxs)("ul", {
			className: i || a,
			role: "navigation",
			"aria-label": "Pagination",
			children: [
				/* @__PURE__ */ (0, o.jsx)("li", {
					className: x,
					children: /* @__PURE__ */ (0, o.jsx)("a", {
						className: C,
						href: this.getElementHref(v - 1),
						tabIndex: y ? "-1" : "0",
						role: "button",
						onKeyPress: this.handlePreviousPage,
						"aria-disabled": T,
						"aria-label": d,
						rel: f,
						...this.getEventListener(this.handlePreviousPage),
						children: s
					})
				}),
				this.pagination(),
				/* @__PURE__ */ (0, o.jsx)("li", {
					className: S,
					children: /* @__PURE__ */ (0, o.jsx)("a", {
						className: w,
						href: this.getElementHref(v + 1),
						tabIndex: b ? "-1" : "0",
						role: "button",
						onKeyPress: this.handleNextPage,
						"aria-disabled": E,
						"aria-label": g,
						rel: _,
						...this.getEventListener(this.handleNextPage),
						children: p
					})
				})
			]
		});
	}
};
//#endregion
export { u as default };

//# sourceMappingURL=react-paginate.es.js.map