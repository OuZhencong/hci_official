(function($) {
	var globalData = {
		shapeFinished: 0,
		pictureFinished: 0,
		fillFinished: false,
		guessFinished: true,
		blackboardFinished: false,
		level: 1
	};

	var SandBox = function(core, moduleName) {
		if(!moduleName) {
			core.log("SandBox.constructor: module name should be defined");
			return ;
		}

		this.moduleName = moduleName;
		this.container = this.find("#" + moduleName);
		this.core = core;
	};

	/**
	 * get/set global data
	 * if value is defined, set data, or get data
	 * 
	 * @param {string} name
	 * 		data name
	 * @param {object} value
	 * 		data value
	 * 
	 * @returns {object|undefined}
	 */
	SandBox.prototype.data = function(name, value) {
		if(typeof value != "undefined") {
			globalData[name] = value;
		} else {
			return globalData[name];
		}
	};

	/**
	 * remove global data
	 * 
	 * @param {string} name
	 * 		data name
	 */
	SandBox.prototype.removeData = function(name) {
		delete globalData[name];
	};

	/**
	 * notify event registered by events
	 * 
	 * @param {string} evtObj
	 * @see Core.triggerEvent
	 */
	SandBox.prototype.notify = function(evtObj) {
		this.core.triggerEvent(evtObj);
	};

	/**
	 * listen events
	 * 
	 * @param {object} evts 
	 * 		{{string} eventName: {function(data:object) fn}}
	 */
	SandBox.prototype.listen = function(evts) {
		for(var evt in evts) {
			this.core.registerEvent(this.moduleName, evt, evts[evt]);
		}
	};

	/**
	 * ignore events
	 * @param {Array.<string>} evts
	 * 		events' name
	 */
	SandBox.prototype.ignore = function(evts) {
		for(var i = 0, evt; evt = evts[i]; i++) {
			this.core.unregisterEvent(this.moduleName, evt);
		}
	};

	/**
	 * find one DOM element
	 * 
	 * @param {string} selector
	 * @param {DOMElement} ctx
	 * 		context
	 * 
	 * @returns {DOMElement}
	 */
	SandBox.prototype.find = function(selector, ctx) {
		ctx = ctx || document;
		return $(selector, ctx)[0];
	};

	/**
	 * query DOM elements
	 * 
	 * @param {string} selector
	 * @param {DOMElement} ctx
	 * 		context
	 * 
	 * @returns {Array.<DOMElement>}
	 */
	SandBox.prototype.query = function(selector, ctx) {
		ctx = ctx || document;
		return $(selector, ctx);
	};

	/**
	 * add class to DOM element
	 * 
	 * @param {DOMElement} elem
	 * @param {string} className
	 */
	SandBox.prototype.addClass = function(elem, className) {
		$(elem).addClass(className);
	};

	/**
	 * remove class of DOM element
	 * 
	 * @param {DOMElement} elem
	 * @param {string} className
	 */
	SandBox.prototype.removeClass = function(elem, className) {
		$(elem).removeClass(className);
	};

	/**
	 * check if DOM element has specified class
	 * 
	 * @param {DOMElement} elem
	 * @param {string} className
	 */
	SandBox.prototype.hasClass = function(elem, className) {
		return $(elem).hasClass(className);
	};

	/**
	 * set dom element's style.display as ""
	 * 
	 * @param {DOMElement} elem
	 */
	SandBox.prototype.show = function(elem) {
		elem.style.display = "";
	};

	/**
	 * set dom element's style.display as "none"
	 * 
	 * @param {DOMElement} elem
	 */
	SandBox.prototype.hide = function(elem) {
		elem.style.display = "none";
	};

	/**
	 * the same as document.createElement
	 * 
	 * @param {string} tagName
	 */
	SandBox.prototype.createElement = function(tagName) {
		// this.core.log("Create element '" + tagName + "'");
		return $("<"+tagName+"></"+tagName+">").get(0);
	};

	SandBox.prototype.css = function(elem, name, value) {
		$(elem).css(name, value);
	};

	SandBox.prototype.touchable = function() {
		return ($.support.touch);
	};
	/**
	 * get cookie by name
	 * 
	 * @param {string} name
	 * @returns {string} value of cookie
	 */
	SandBox.prototype.getCookie = function(first_argument) {};

	/**
	 * set cookie by name and value
	 * 
	 * @param {string} name
	 * @param {string} value
	 */
	SandBox.prototype.setCookie = function(first_argument) {};

	/**
	 * remove cookie by name
	 * 
	 * @param {string} name
	 */
	SandBox.prototype.removeCookie = function(first_argument) {};

	/**
	 * trim string
	 * 
	 * @param {string} str
	 * @returns {string}
	 */
	SandBox.prototype.trim = function(str) {
		return str.trim();
	};
	
	/**
	 * ajax post
	 * 
	 * @param {string} url
	 * @param {object} data
	 * @param {function} successCallback
	 * @param {function} failCallback
	 * 
	 */
	SandBox.prototype.post = function(url, data, successCallback, failCallback) {
		$.ajax({
			url : url,
			type : "post",
			dataType : "json",
			data : data,
			success : successCallback,
			error : failCallback
		});
	};
	
	/**
	 * ajax get
	 * 
	 * @param {string} url
	 * @param {object} data
	 * @param {function} successCallback
	 * @param {function} failCallback
	 * 
	 */
	SandBox.prototype.get = function(url, data, successCallback, failCallback) {
		$.ajax({
			url : url,
			type : "get",
			dataType : "json",
			data : data,
			success : successCallback,
			error : failCallback
		});
	};
	
	/**
	 * 
	 */
	SandBox.prototype.md5 = function(str) {
		return $.md5(str);
	};
	
	/**
	 * set key-value in localStorage
	 * 
	 * @param {string} key
	 * @param {string} value
	 * 
	 */
     SandBox.prototype.setItem = function(key, value) {
    	 localStorage.setItem(key, value);
     };
	
     /**
      * get value in localStorage by key
      * 
      * @param {string} key
      * @return {string} value
      * 
      */
     SandBox.prototype.getItem = function(key) {
    	 return localStorage.getItem(key);
     };
     
     /**
      * remove item in localStorage by key
      * 
      * @param {string} key
      * @return {string} value
      * 
      */
     SandBox.prototype.removeItem = function(key) {
    	 localStorage.removeItem(key);
     };
	
	this.SandBox = SandBox;
	
})(jQuery);