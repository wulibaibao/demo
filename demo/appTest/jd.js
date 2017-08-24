(function() {
	var L = navigator.userAgent;
	var S = L.match(/Chrome/i) != null && L.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) == null ? true : false;
	var T = (L.match(/(Android);?[\s\/]+([\d.]+)?/)) ? true : false;
	var a = (L.match(/(iPad).*OS\s([\d_]+)/)) ? true : false;
	var N = (L.match(/(Mac\sOS)\sX\s([\d_]+)/)) ? true : false;
	var v = (!a && L.match(/(iPhone\sOS)\s([\d_]+)/)) ? true : false;
	var c = (v || a) && L.match(/Safari/);
	var y = L.match(/MQQBrowser\/([\d\.]+)/) ? true : false;
	var q = L.match(/UCBrowser\/([\d\.]+)/) ? true : false;
	var R = 0;
	c && (R = L.match(/Version\/([\d\.]+)/));
	try {
		R = parseFloat(R[1], 10)
	} catch(U) {}
	var L = window.navigator.userAgent,
		P = false;
	var P = L.toUpperCase().indexOf("SAMSUNG-SM-N7508V") != -1;
	var l = false;
	var w = "plugIn_downloadAppPlugIn_loadIframe";
	var x = false;
	var k = 0;
	var H = {};
	var b = {};
	var g = null;
	var Q = {};
	var z = window.Zepto || window.jQuery ? true : false;
	var j = [];
	var A = window.localStorage ? true : false;
	var s = "mdownloadAppPlugInskip";
	var t = null;
	var u = null;
	var h = null;

	function n() {
		var V = new Date();
		var W = V.getFullYear();
		var X = V.getMonth() + 1;
		var e = V.getDate();
		strDate = W + "-" + X + "-" + e;
		return strDate
	}

	function d(W, V, e) {
		if(z) {
			g("#" + W).bind(V, e)
		} else {
			g("#" + W).addEventListener(V, e, !1)
		}
	}

	function F(e) {
		var V = (e || "mGen") + (++k);
		return V
	}
	if(z) {
		g = window.$;
		Q = window.$
	} else {
		g = function(e) {
			if(typeof e == "object") {
				return e
			}
			return document.querySelector(e)
		};
		if(!window.$) {
			window.$ = Q = g
		} else {
			Q = window.$
		}
	}
	if(!h) {
		var o = {
			url: "https://mapi.m.jd.com/keple/getKepleData.action?_format_=json",
			method: "POST",
			async: true,
			timeout: 1000,
			withCredentials: true,
			error: function() {
				h = '{"source":"m-base","otherData":{},"channel":"m-arouse"}'
			},
			success: function(e) {
				var V = JSON.parse(e);
				if(V && V.data) {
					if(!V.data.source && !V.data.channel) {
						V.data.source = "m-base";
						V.data.channel = "m-arouse"
					}
					h = JSON.stringify(V.data)
				} else {
					h = '{"source":"m-base","otherData":{},"channel":"m-arouse"}'
				}
			}
		};
		D(o)
	}
	window.onblur = function() {
		for(var e = 0; e < j.length; e++) {
			clearTimeout(j[e])
		}
	};

	function f(W) {
		var V = document.cookie.indexOf(W + "=");
		if(V == -1) {
			return ""
		}
		V = V + W.length + 1;
		var e = document.cookie.indexOf(";", V);
		if(e == -1) {
			e = document.cookie.length
		}
		return document.cookie.substring(V, e)
	}

	function m(W, Y, e, Z, X) {
		var aa = W + "=" + escape(Y);
		if(e != "") {
			var V = new Date();
			V.setTime(V.getTime() + e * 24 * 3600 * 1000);
			aa += ";expires=" + V.toGMTString()
		}
		if(Z != "") {
			aa += ";path=" + Z
		}
		if(X != "") {
			aa += ";domain=" + X
		}
		document.cookie = aa
	}

	function M(W, Z) {
		var Y = null;
		if(Z) {
			Y = {
				downAppURl: "//h5.m.jd.com/active/download/download.html?channel=jd-m",
				downAppIos: "https://itunes.apple.com/us/app/jing-dong-wang-gou-shou-dan/id414245413",
				downWeixin: "http://a.app.qq.com/o/simple.jsp?pkgname=com.jingdong.app.mall&g_f=991850",
				downIpad: "https://itunes.apple.com/cn/app/jing-dong-hd/id434374726?mt=8",
				inteneUrl: "openapp.jdmobile://virtual?",
				inteneUrlParams: null,
				sourceType: "JSHOP_SOURCE_TYPE",
				sourceValue: "JSHOP_SOURCE_VALUE",
				M_sourceFrom: "mxz",
				NoJumpDownLoadPage: false,
				kepler_param: null
			}
		} else {
			Y = {
				downAppURl: "//h5.m.jd.com/active/download/download.html?channel=jd-m",
				downAppIos: "https://itunes.apple.com/us/app/jing-dong-wang-gou-shou-dan/id414245413",
				downWeixin: "http://a.app.qq.com/o/simple.jsp?pkgname=com.jingdong.app.mall&g_f=991850",
				downIpad: "https://itunes.apple.com/cn/app/jing-dong-hd/id434374726?mt=8",
				inteneUrl: "openapp.jdmobile://virtual?",
				inteneUrlParams: null,
				openAppBtnId: "",
				closePanelBtnId: "",
				closePanelId: "",
				openAppCallback: null,
				openAppCallbackSource: null,
				closeCallblack: null,
				closeCallblackSource: null,
				cookieFlag: null,
				noRecord: false,
				sourceType: "JSHOP_SOURCE_TYPE",
				sourceValue: "JSHOP_SOURCE_VALUE",
				openAppEventId: "MDownLoadFloat_OpenNow",
				closePanelEventId: "MDownLoadFloat_Close",
				appDownCloseIntervalTime: 259200000,
				appDownOpenIntervalTime: 2592000000,
				isnotWriteOpenAppCookie: false,
				M_sourceFrom: "mxz",
				NoJumpDownLoadPage: false,
				kepler_param: null
			}
		}
		if(W) {
			for(var X in W) {
				if(X && W[X]) {
					if(X == "appDownCloseIntervalTime" || X == "appDownOpenIntervalTime") {
						var ab = /^(-     |\+)?\d+$/;
						if(ab.test(W[X]) && W[X] > 0) {
							try {
								var V = parseInt(W[X], 10);
								Y[X] = V
							} catch(aa) {}
						}
					} else {
						Y[X] = W[X]
					}
				}
			}
		}
		return Y
	}

	function B(Y, W, ab) {
		var Z = null;
		var V = ab ? ab : 1;
		if(Y && Y.kepler_param) {
			Z = Y.kepler_param
		} else {
			if(h) {
				Z = h
			} else {
				if(!Z && V >= 3) {
					Z = '{"source":"m-base","otherData":{},"channel":"m-arouse"}'
				}
			}
		}
		if(Z) {
			var ac = i(Y, Z);
			var X = null;
			if(a) {
				X = Y.downIpad
			} else {
				if(v) {
					X = Y.downAppIos
				} else {
					X = Y.downAppURl
				}
			}
			if(S) {
				if(T) {
					var e = ac;
					ac = E(e);
					setTimeout(function() {
						window.location.href = ac
					}, 50)
				}
			}
			if((c && R >= 9) || N || P) {
				setTimeout(function() {
					var ad = document.createElement("a");
					ad.setAttribute("href", ac), ad.style.display = "none", document.body.appendChild(ad);
					var ae = document.createEvent("HTMLEvents");
					ae.initEvent("click", !1, !1), ad.dispatchEvent(ae)
				}, 0)
			} else {
				document.querySelector("#" + w).src = ac
			}
			if(!Y.NoJumpDownLoadPage) {
				var aa = Date.now();
				setTimeout(function() {
					if(W) {
						var ad = setTimeout(function() {
							C(aa, X)
						}, 1500);
						j.push(ad)
					}
				}, 100)
			}
		} else {
			V++;
			setTimeout(B(Y, W, V), 200)
		}
	}

	function C(W, V) {
		var e = Date.now();
		if(W && (e - W) < (1500 + 200)) {
			window.location.href = V
		}
	}

	function i(X, Y) {
		var ah = [];
		var ab = X.inteneUrlParams;
		var af = {
			category: "jump",
			des: "HomePage"
		};
		if(X.sourceType && X.sourceValue) {
			af.sourceType = X.sourceType;
			af.sourceValue = X.sourceValue;
			if(ab && !ab.sourceType && !ab.sourceValue) {
				ab.sourceType = X.sourceType;
				ab.sourceValue = X.sourceValue
			}
			if(X && X.M_sourceFrom) {
				af.M_sourceFrom = X.M_sourceFrom;
				if(ab) {
					ab.M_sourceFrom = X.M_sourceFrom
				}
			}
		}
		if(ab) {
			for(var ag in ab) {
				if(ag && ab[ag]) {
					ah.push('"' + ag + '":"' + ab[ag] + '"')
				}
			}
		} else {
			for(var ag in af) {
				if(ag && af[ag]) {
					ah.push('"' + ag + '":"' + af[ag] + '"')
				}
			}
		}
		if(Y) {
			ah.push('"kepler_param":' + Y)
		}
		try {
			var ac = MPing.EventSeries.getSeries();
			if(ac) {
				var ai = JSON.parse(ac);
				ai.jdv = encodeURIComponent(f("__jdv"));
				ai.unpl = encodeURIComponent(f("unpl"));
				ai.mt_xid = encodeURIComponent(f("mt_xid"));
				ai.mt_subsite = encodeURIComponent(f("mt_subsite"))
			}
			var ae = {
				mt_subsite: encodeURIComponent(f("mt_subsite")),
				__jdv: encodeURIComponent(f("__jdv")),
				unpl: encodeURIComponent(f("unpl")),
				__jda: encodeURIComponent(f("__jda"))
			};
			ac = JSON.stringify(ai);
			ah.push('"m_param":' + ac);
			ah.push('"SE":' + JSON.stringify(ae))
		} catch(ad) {
			ah.push('"m_param":null')
		}
		var W = "{" + ah.join(",") + "}";
		var aa = X.inteneUrl.split("?");
		var V = null;
		if(aa.length == 2) {
			V = aa[0] + "?" + aa[1] + "&params=" + W
		} else {
			V = aa[0] + "?params=" + W
		}
		var Z = {
			url: "//ccc-x.jd.com/dsp/op?openapp_url=" + encodeURI(W) + "&openapp_source_type=100",
			method: "POST",
			async: false,
			timeout: 1000,
			error: function() {},
			success: function(e) {}
		};
		D(Z);
		return V
	}

	function E(e) {
		return "intent://m.jd.com/#Intent;scheme=" + e + ";package=com.jingdong.app.mall;end"
	}

	function p(e) {
		if(e.openAppBtnId && document.querySelector("#" + e.openAppBtnId)) {
			H[e.openAppBtnId] = e;
			O(e.openAppBtnId, e.openAppEventId);
			d(e.openAppBtnId, "click", function() {
				var Z = this.getAttribute("id");
				var V = H[Z];
				if(!x) {
					var X = document.createElement("iframe");
					X.id = w;
					document.body.appendChild(X);
					document.getElementById(w).style.display = "none";
					document.getElementById(w).style.width = "0px";
					document.getElementById(w).style.height = "0px";
					x = true
				}
				if(!V.isnotWriteOpenAppCookie) {
					var Y = V.cookieFlag ? "downloadAppPlugIn_downCloseDate_" + V.cookieFlag : "downloadAppPlugIn_downCloseDate";
					m(Y, Date.now() + "_" + V.appDownOpenIntervalTime, 60, "/", ".m.jd.com");
					m(Y, Date.now() + "_" + V.appDownOpenIntervalTime, 60, "/", "m.jd.hk")
				}
				if(V.openAppCallback) {
					var W = V.openAppCallbackSource ? V.openAppCallbackSource : null;
					V.openAppCallback.call(W)
				}
				B(V, true)
			})
		}
	}

	function K(e) {
		if(e.closePanelBtnId && e.closePanelId && document.querySelector("#" + e.closePanelId) && document.querySelector("#" + e.closePanelBtnId)) {
			H[e.closePanelBtnId] = e;
			O(e.closePanelBtnId, e.closePanelEventId);
			if(G(e)) {
				document.querySelector("#" + e.closePanelId).style.display = "none";
				if(e.closeCallblack) {
					var V = e.closeCallblackSource ? e.closeCallblackSource : null;
					e.closeCallblack.call(V)
				}
				return
			} else {
				document.querySelector("#" + e.closePanelId).style.display = "block"
			}
			d(e.closePanelBtnId, "click", function() {
				var Z = this.getAttribute("id");
				var W = H[Z];
				var Y = W.cookieFlag ? "downloadAppPlugIn_downCloseDate_" + W.cookieFlag : "downloadAppPlugIn_downCloseDate";
				if(!W.noRecord) {
					m(Y, Date.now() + "_" + W.appDownCloseIntervalTime, 60, "/", "m.jd.com");
					m(Y, Date.now() + "_" + W.appDownCloseIntervalTime, 60, "/", "m.jd.hk")
				}
				document.querySelector("#" + W.closePanelId).style.display = "none";
				if(W.closeCallblack) {
					var X = W.closeCallblackSource ? W.closeCallblackSource : null;
					W.closeCallblack.call(X)
				}
			})
		}
	}

	function G(W) {
		var V = L.indexOf("jdmsxh");
		var aa = L.indexOf("jdmsxh2");
		var Y = false;
		if(L.indexOf("Html5Plus") >= 0 || (V >= 0 && V != aa)) {
			Y = true
		}
		if(Y == false) {
			if(!u) {
				var X = {
					url: "//so.m.jd.com/downLoad/closeUa.action?_format_=json",
					method: "POST",
					async: false,
					timeout: 1000,
					error: function() {},
					success: function(ah) {
						ah = JSON.parse(ah);
						if(ah && ah.ua) {
							var ai = ah.ua.split("|");
							u = ai;
							for(var ag = 0; ag < u.length; ag++) {
								var af = u[ag];
								if(af && L.indexOf(af) >= 0) {
									Y = true;
									break
								}
							}
						}
					}
				};
				D(X)
			} else {
				for(var Z = 0; Z < u.length; Z++) {
					var ac = u[Z];
					if(ac && L.indexOf(ac) >= 0) {
						Y = true;
						break
					}
				}
			}
		}
		var ae = W.cookieFlag ? "downloadAppPlugIn_downCloseDate_" + W.cookieFlag : "downloadAppPlugIn_downCloseDate";
		var ab = f(ae);
		var ad = null;
		if(ab) {
			ad = ab.split("_");
			if(ad.length == 2) {
				ad[0] = parseInt(ad[0], 10);
				ad[1] = parseInt(ad[1], 10)
			} else {
				ad = null
			}
		}
		var e = Date.now();
		if(Y || (!W.noRecord && ad && ad.length == 2 && (e - ad[0]) < ad[1])) {
			Y = true
		}
		return Y
	}

	function D(W) {
		var V;
		try {
			V = new ActiveXObject("Msxml2.XMLHTTP")
		} catch(Y) {
			try {
				V = new ActiveXObject("Microsoft.XMLHTTP")
			} catch(Y) {
				V = new XMLHttpRequest()
			}
		}
		V.ajaxRunError = true;
		if(W.withCredentials) {
			try {
				V.withCredentials = true
			} catch(Y) {}
		}
		try {
			V.open(W.method, W.url, W.async);
			if(W.timeout) {
				var X = W.source ? W.source : null;
				setTimeout(function() {
					if(V.ajaxRunError) {
						V.onreadystatechange = function() {};
						V.abort();
						W.error.call(X)
					}
				}, W.timeout)
			}
			V.onreadystatechange = function() {
				var Z = W.source ? W.source : null;
				if(V.readyState == 4) {
					if(V.status == 200) {
						V.ajaxRunError = false;
						var e = V.responseText;
						W.success.call(Z, e)
					} else {
						W.error.call(Z)
					}
				}
			};
			V.send(null)
		} catch(Y) {}
	}

	function O(Z, W) {
		try {
			var Y = document.getElementById(Z);
			var V = Y.className;
			if(V) {
				V = V + " J_ping"
			} else {
				V = "J_ping"
			}
			Y.className = V;
			Y.setAttribute("report-eventid", W);
			if(L.indexOf("jdmsxh2") >= 0) {
				Y.setAttribute("event_param", 1)
			} else {
				Y.setAttribute("event_param", 0)
			}
		} catch(X) {}
	}

	function r(V, ab, ah) {
		var W = ab ? ab : 1;
		var ac = ah ? true : false;
		if(!G(V) && V.closePanelId) {
			var ai = document.getElementById(V.closePanelId);
			if(ai) {
				var af = ai.getBoundingClientRect();
				var ag = af.height || af.bottom - af.top;
				var aa = J(ai, "opacity");
				var ae = J(ai, "display");
				if(ae && ag && ae != "none" && ag == 0) {
					ac = true
				} else {
					if(ag && aa && ag == 50 && aa == 0) {
						ac = true
					}
				}
			} else {
				ac = true
			}
			if(W < 3 && ac == false) {
				W++;
				setTimeout(function() {
					r(V, W, ac)
				}, 2000)
			}
		}
		if(ac) {
			try {
				var Y = new MPing.inputs.Click("MDownLoadFloat_FloatShield");
				var Z = new MPing();
				Y.event_param = V.openAppEventId;
				Z.send(Y);
				var X = {
					url: "//so.m.jd.com/downLoad/checkShield.action?_format_=json",
					method: "POST",
					async: true,
					timeout: 1000,
					error: function() {},
					success: function(e) {}
				};
				D(X)
			} catch(ad) {}
		}
	}

	function J(V, e) {
		if(V.currentStyle) {
			return V.currentStyle[e]
		} else {
			return document.defaultView.getComputedStyle(V, false)[e]
		}
	}

	function I(e) {
		var V = M(e);
		p(V);
		K(V);
		r(V)
	}
	Q.downloadAppPlugIn = I;
	Q.downloadAppPlugInOpenApp = function(W) {
		try {
			var Z = new MPing.inputs.Click("MDownLoadFloat_AppArouse");
			var V = new MPing();
			V.send(Z)
		} catch(aa) {}
		var X = M(W, true);
		if(!x) {
			var Y = document.createElement("iframe");
			Y.id = w;
			document.body.appendChild(Y);
			document.getElementById(w).style.display = "none";
			document.getElementById(w).style.width = "0px";
			document.getElementById(w).style.height = "0px";
			x = true
		}
		B(X, true)
	}
})();