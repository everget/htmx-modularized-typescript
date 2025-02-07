import { addClassToElement } from './fn/addClassToElement';
import { addEventListenerImpl } from './fn/addEventListenerImpl';
import { ajaxHelper } from './fn/ajaxHelper';
import { internalEval } from './fn/internalEval';
import { onLoadHelper } from './fn/onLoadHelper';
import { parseInterval } from './fn/parseInterval';
import { triggerEvent } from './fn/triggerEvent';
import { values } from './fn/values';

// Public API
const htmx = {
	/** @type {typeof addClassToElement} */
	addClass: addClassToElement,

	/** @type {typeof ajaxHelper} */
	ajax: ajaxHelper,

	/** @type {typeof closest} */
	closest: closest,

	/**
	 * A property holding the configuration htmx uses at runtime.
	 *
	 * Note that using a [meta tag](https://htmx.org/docs/#config) is the preferred mechanism for setting these properties.
	 *
	 * @see https://htmx.org/api/#config
	 */
	config: {
		/**
		 * Whether to use history.
		 * @type boolean
		 * @default true
		 */
		historyEnabled: true,
		/**
		 * The number of pages to keep in **localStorage** for history support.
		 * @type number
		 * @default 10
		 */
		historyCacheSize: 10,
		/**
		 * @type boolean
		 * @default false
		 */
		refreshOnHistoryMiss: false,
		/**
		 * The default swap style to use if **[hx-swap](https://htmx.org/attributes/hx-swap)** is omitted.
		 * @type HtmxSwapStyle
		 * @default 'innerHTML'
		 */
		defaultSwapStyle: 'innerHTML',
		/**
		 * The default delay between receiving a response from the server and doing the swap.
		 * @type number
		 * @default 0
		 */
		defaultSwapDelay: 0,
		/**
		 * The default delay between completing the content swap and settling attributes.
		 * @type number
		 * @default 20
		 */
		defaultSettleDelay: 20,
		/**
		 * If true, htmx will inject a small amount of CSS into the page to make indicators invisible unless the **htmx-indicator** class is present.
		 * @type boolean
		 * @default true
		 */
		includeIndicatorStyles: true,
		/**
		 * The class to place on indicators when a request is in flight.
		 * @type string
		 * @default 'htmx-indicator'
		 */
		indicatorClass: 'htmx-indicator',
		/**
		 * The class to place on triggering elements when a request is in flight.
		 * @type string
		 * @default 'htmx-request'
		 */
		requestClass: 'htmx-request',
		/**
		 * The class to temporarily place on elements that htmx has added to the DOM.
		 * @type string
		 * @default 'htmx-added'
		 */
		addedClass: 'htmx-added',
		/**
		 * The class to place on target elements when htmx is in the settling phase.
		 * @type string
		 * @default 'htmx-settling'
		 */
		settlingClass: 'htmx-settling',
		/**
		 * The class to place on target elements when htmx is in the swapping phase.
		 * @type string
		 * @default 'htmx-swapping'
		 */
		swappingClass: 'htmx-swapping',
		/**
		 * Allows the use of eval-like functionality in htmx, to enable **hx-vars**, trigger conditions & script tag evaluation. Can be set to **false** for CSP compatibility.
		 * @type boolean
		 * @default true
		 */
		allowEval: true,
		/**
		 * If set to false, disables the interpretation of script tags.
		 * @type boolean
		 * @default true
		 */
		allowScriptTags: true,
		/**
		 * If set, the nonce will be added to inline scripts.
		 * @type string
		 * @default ''
		 */
		inlineScriptNonce: '',
		/**
		 * If set, the nonce will be added to inline styles.
		 * @type string
		 * @default ''
		 */
		inlineStyleNonce: '',
		/**
		 * The attributes to settle during the settling phase.
		 * @type string[]
		 * @default ['class', 'style', 'width', 'height']
		 */
		attributesToSettle: ['class', 'style', 'width', 'height'],
		/**
		 * Allow cross-site Access-Control requests using credentials such as cookies, authorization headers or TLS client certificates.
		 * @type boolean
		 * @default false
		 */
		withCredentials: false,
		/**
		 * @type number
		 * @default 0
		 */
		timeout: 0,
		/**
		 * The default implementation of **getWebSocketReconnectDelay** for reconnecting after unexpected connection loss by the event code **Abnormal Closure**, **Service Restart** or **Try Again Later**.
		 * @type {'full-jitter' | ((retryCount:number) => number)}
		 * @default "full-jitter"
		 */
		wsReconnectDelay: 'full-jitter',
		/**
		 * The type of binary data being received over the WebSocket connection
		 * @type BinaryType
		 * @default 'blob'
		 */
		wsBinaryType: 'blob',
		/**
		 * @type string
		 * @default '[hx-disable], [data-hx-disable]'
		 */
		disableSelector: '[hx-disable], [data-hx-disable]',
		/**
		 * @type {'auto' | 'instant' | 'smooth'}
		 * @default 'instant'
		 */
		scrollBehavior: 'instant',
		/**
		 * If the focused element should be scrolled into view.
		 * @type boolean
		 * @default false
		 */
		defaultFocusScroll: false,
		/**
		 * If set to true htmx will include a cache-busting parameter in GET requests to avoid caching partial responses by the browser
		 * @type boolean
		 * @default false
		 */
		getCacheBusterParam: false,
		/**
		 * If set to true, htmx will use the View Transition API when swapping in new content.
		 * @type boolean
		 * @default false
		 */
		globalViewTransitions: false,
		/**
		 * htmx will format requests with these methods by encoding their parameters in the URL, not the request body
		 * @type {(HttpVerb)[]}
		 * @default ['get', 'delete']
		 */
		methodsThatUseUrlParams: ['get', 'delete'],
		/**
		 * If set to true, disables htmx-based requests to non-origin hosts.
		 * @type boolean
		 * @default false
		 */
		selfRequestsOnly: true,
		/**
		 * If set to true htmx will not update the title of the document when a title tag is found in new content
		 * @type boolean
		 * @default false
		 */
		ignoreTitle: false,
		/**
		 * Whether the target of a boosted element is scrolled into the viewport.
		 * @type boolean
		 * @default true
		 */
		scrollIntoViewOnBoost: true,
		/**
		 * The cache to store evaluated trigger specifications into.
		 * You may define a simple object to use a never-clearing cache, or implement your own system using a [proxy object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
		 * @type {Object|null}
		 * @default null
		 */
		triggerSpecsCache: null,
		/** @type boolean */
		disableInheritance: false,
		/** @type HtmxResponseHandlingConfig[] */
		responseHandling: [
			{ code: '204', swap: false },
			{ code: '[23]..', swap: true },
			{ code: '[45]..', swap: false, error: true },
		],
		/**
		 * Whether to process OOB swaps on elements that are nested within the main response element.
		 * @type boolean
		 * @default true
		 */
		allowNestedOobSwaps: true,
	},

	/** @type {typeof defineExtension} */
	defineExtension: defineExtension,

	/** @type {typeof findAll} */
	findAll: findAll,

	/** @type {typeof find} */
	find: find,

	/** @type {typeof logAll} */
	logAll: logAll,

	/** @type {typeof logNone} */
	logNone: logNone,

	/**
	 * The logger htmx uses to log with
	 *
	 * @see https://htmx.org/api/#logger
	 */
	logger: null,

	/** @type {typeof onLoadHelper} */
	onLoad: onLoadHelper,

	/** @type {typeof addEventListenerImpl} */
	on: addEventListenerImpl,

	/** @type {typeof removeEventListenerImpl} */
	off: removeEventListenerImpl,

	/** @type {typeof parseInterval} */
	parseInterval: parseInterval,

	/** @type {typeof processNode} */
	process: processNode,

	/** @type {typeof removeElement} */
	remove: removeElement,

	/** @type {typeof removeClassFromElement} */
	removeClass: removeClassFromElement,

	/** @type {typeof removeExtension} */
	removeExtension: removeExtension,

	/** @type {typeof swap} */
	swap: swap,

	/** @type {typeof takeClassForElement} */
	takeClass: takeClassForElement,

	/** @type {typeof toggleClassOnElement} */
	toggleClass: toggleClassOnElement,

	/** @type {typeof triggerEvent} */
	trigger: triggerEvent,

	/**
	 * Returns the input values that would resolve for a given element via the htmx value resolution mechanism
	 *
	 * @see https://htmx.org/api/#values
	 *
	 * @param {Element} elt the element to resolve values on
	 * @param {HttpVerb} type the request type (e.g. **get** or **post**) non-GET's will include the enclosing form of the element. Defaults to **post**
	 * @returns {Object}
	 */
	values: values,

	version: '2.0.3',

	/** @type {typeof internalEval} */
	_: internalEval,
};
