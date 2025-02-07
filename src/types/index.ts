/**
 * @callback TriggerHandler
 * @param {Node} elt
 * @param {Event} [evt]
 */
export type TriggerHandler = (elt: Node, evt?: Event) => void;

export type HttpVerb =
	| 'get'
	| 'head'
	| 'post'
	| 'put'
	| 'delete'
	| 'connect'
	| 'options'
	| 'trace'
	| 'patch';

/**
 * @typedef {Object} SwapOptions
 * @property {string} [select]
 * @property {string} [selectOOB]
 * @property {*} [eventInfo]
 * @property {string} [anchor]
 * @property {Element} [contextElement]
 * @property {swapCallback} [afterSwapCallback]
 * @property {swapCallback} [afterSettleCallback]
 */
export interface SwapOptions {
	select?: string;
	selectOOB?: string;
	eventInfo?: any; //???
	anchor?: string;
	contextElement?: Element;
	afterSwapCallback?: SwapCallback;
	afterSettleCallback?: SwapCallback;
}

/**
 * @callback swapCallback
 */
export type SwapCallback = () => void;

export type HtmxSwapStyle =
	| 'innerHTML'
	| 'outerHTML'
	| 'beforebegin'
	| 'afterbegin'
	| 'beforeend'
	| 'afterend'
	| 'delete'
	| 'none'
	| string;

/**
 * @typedef HtmxSwapSpecification
 * @property {HtmxSwapStyle} swapStyle
 * @property {number} swapDelay
 * @property {number} settleDelay
 * @property {boolean} [transition]
 * @property {boolean} [ignoreTitle]
 * @property {string} [head]
 * @property {'top' | 'bottom'} [scroll]
 * @property {string} [scrollTarget]
 * @property {string} [show]
 * @property {string} [showTarget]
 * @property {boolean} [focusScroll]
 */
export interface HtmxSwapSpecification {
	swapStyle: HtmxSwapStyle;
	swapDelay: number;
	settleDelay: number;
	transition?: boolean;
	ignoreTitle?: boolean;
	head?: string;
	scroll?: 'top' | 'bottom';
	scrollTarget?: string;
	show?: string;
	showTarget?: string;
	focusScroll?: boolean;
}

export type ConditionalFunction = ((this: Node, evt: Event) => boolean) & { source: string };

/**
 * @typedef {Object} HtmxTriggerSpecification
 * @property {string} trigger
 * @property {number} [pollInterval]
 * @property {ConditionalFunction} [eventFilter]
 * @property {boolean} [changed]
 * @property {boolean} [once]
 * @property {boolean} [consume]
 * @property {number} [delay]
 * @property {string} [from]
 * @property {string} [target]
 * @property {number} [throttle]
 * @property {string} [queue]
 * @property {string} [root]
 * @property {string} [threshold]
 */
export interface HtmxTriggerSpecification {
	trigger: string;
	pollInterval?: number;
	eventFilter?: ConditionalFunction;
	changed?: boolean;
	once?: boolean;
	consume?: boolean;
	delay?: number;
	from?: string;
	target?: string;
	throttle?: number;
	queue?: string;
	root?: string;
	threshold?: string;
}

export interface HtmxElementValidationError {
	elt: Element;
	message: string;
	validity: ValidityState;
}

/**
 * @typedef {Record<string, string>} HtmxHeaderSpecification
 * @property {'true'} HX-Request
 * @property {string|null} HX-Trigger
 * @property {string|null} HX-Trigger-Name
 * @property {string|null} HX-Target
 * @property {string} HX-Current-URL
 * @property {string} [HX-Prompt]
 * @property {'true'} [HX-Boosted]
 * @property {string} [Content-Type]
 * @property {'true'} [HX-History-Restore-Request]
 */
export interface HtmxHeaderSpecification {
	'HX-Request': 'true';
	'HX-Trigger': string | null;
	'HX-Trigger-Name': string | null;
	'HX-Target': string | null;
	'HX-Current-URL': string;
	'HX-Prompt'?: string;
	'HX-Boosted'?: 'true';
	'Content-Type'?: string;
	'HX-History-Restore-Request'?: 'true';
}

/** @typedef HtmxAjaxHelperContext
 * @property {Element|string} [source]
 * @property {Event} [event]
 * @property {HtmxAjaxHandler} [handler]
 * @property {Element|string} [target]
 * @property {HtmxSwapStyle} [swap]
 * @property {Object|FormData} [values]
 * @property {Record<string,string>} [headers]
 * @property {string} [select]
 */
export interface HtmxAjaxHelperContext {
	source?: Element | string;
	event?: Event;
	handler?: HtmxAjaxHandler;
	target?: Element | string;
	swap?: HtmxSwapStyle;
	values?: Record<string, any> | FormData; // Modified the type
	headers?: Record<string, string>;
	select?: string;
}

/**
 * @typedef {Object} HtmxRequestConfig
 * @property {boolean} boosted
 * @property {boolean} useUrlParams
 * @property {FormData} formData
 * @property {Object} parameters formData proxy
 * @property {FormData} unfilteredFormData
 * @property {Object} unfilteredParameters unfilteredFormData proxy
 * @property {HtmxHeaderSpecification} headers
 * @property {Element} target
 * @property {HttpVerb} verb
 * @property {HtmxElementValidationError[]} errors
 * @property {boolean} withCredentials
 * @property {number} timeout
 * @property {string} path
 * @property {Event} triggeringEvent
 */
export interface HtmxRequestConfig {
	boosted: boolean;
	useUrlParams: boolean;
	formData: FormData;
	parameters: Record<string, any>; // Assuming Object here
	unfilteredFormData: FormData;
	unfilteredParameters: Record<string, any>; // Assuming Object here
	headers: HtmxHeaderSpecification;
	target: Element;
	verb: HttpVerb;
	errors: HtmxElementValidationError[];
	withCredentials: boolean;
	timeout: number;
	path: string;
	triggeringEvent: Event;
}

/**
 * @typedef {Object} HtmxResponseInfo
 * @property {XMLHttpRequest} xhr
 * @property {Element} target
 * @property {HtmxRequestConfig} requestConfig
 * @property {HtmxAjaxEtc} etc
 * @property {boolean} boosted
 * @property {string} select
 * @property {{requestPath: string, finalRequestPath: string, responsePath: string|null, anchor: string}} pathInfo
 * @property {boolean} [failed]
 * @property {boolean} [successful]
 * @property {boolean} [keepIndicators]
 */
export interface HtmxResponseInfo {
	xhr: XMLHttpRequest;
	target: Element;
	requestConfig: HtmxRequestConfig;
	etc: HtmxAjaxEtc;
	boosted: boolean;
	select: string;
	pathInfo: {
		requestPath: string;
		finalRequestPath: string;
		responsePath: string | null;
		anchor: string;
	};
	failed?: boolean;
	successful?: boolean;
	keepIndicators?: boolean;
}

/**
 * @typedef {Object} HtmxAjaxEtc
 * @property {boolean} [returnPromise]
 * @property {HtmxAjaxHandler} [handler]
 * @property {string} [select]
 * @property {Element} [targetOverride]
 * @property {HtmxSwapStyle} [swapOverride]
 * @property {Record<string,string>} [headers]
 * @property {Object|FormData} [values]
 * @property {boolean} [credentials]
 * @property {number} [timeout]
 */
export interface HtmxAjaxEtc {
	returnPromise?: boolean;
	handler?: HtmxAjaxHandler;
	select?: string;
	targetOverride?: Element;
	swapOverride?: HtmxSwapStyle;
	headers?: Record<string, string>;
	values?: Record<string, any> | FormData;
	credentials?: boolean;
	timeout?: number;
}

/**
 * @typedef {Object} HtmxResponseHandlingConfig
 * @property {string} [code]
 * @property {boolean} swap
 * @property {boolean} [error]
 * @property {boolean} [ignoreTitle]
 * @property {string} [select]
 * @property {string} [target]
 * @property {string} [swapOverride]
 * @property {string} [event]
 */
export interface HtmxResponseHandlingConfig {
	code?: string;
	swap: boolean;
	error?: boolean;
	ignoreTitle?: boolean;
	select?: string;
	target?: string;
	swapOverride?: string;
	event?: string;
}

export interface HtmxBeforeSwapDetails extends HtmxResponseInfo {
	shouldSwap: boolean;
	serverResponse: any; //???
	isError: boolean;
	ignoreTitle: boolean;
	selectOverride: string;
	swapOverride: string;
}

export type HtmxAjaxHandler = (elt: Element, responseInfo: HtmxResponseInfo) => void;

export type HtmxSettleTask = () => void;

/**
 * @typedef {Object} HtmxSettleInfo
 * @property {HtmxSettleTask[]} tasks
 * @property {Element[]} elts
 * @property {string} [title]
 */
export interface HtmxSettleInfo {
	tasks: HtmxSettleTask[];
	elts: Element[];
	title?: string;
}

/**
 * @see https://github.com/bigskysoftware/htmx-extensions/blob/main/README.md
 * @typedef {Object} HtmxExtension
 * @property {(api: any) => void} init
 * @property {(name: string, event: Event|CustomEvent) => boolean} onEvent
 * @property {(text: string, xhr: XMLHttpRequest, elt: Element) => string} transformResponse
 * @property {(swapStyle: HtmxSwapStyle) => boolean} isInlineSwap
 * @property {(swapStyle: HtmxSwapStyle, target: Node, fragment: Node, settleInfo: HtmxSettleInfo) => boolean|Node[]} handleSwap
 * @property {(xhr: XMLHttpRequest, parameters: FormData, elt: Node) => *|string|null} encodeParameters
 * @property {() => string[]|null} getSelectors
 */
export interface HtmxExtension {
	init(api: any): void;
	onEvent(name: string, event: Event | CustomEvent): boolean;
	transformResponse(text: string, xhr: XMLHttpRequest, elt: Element): string;
	isInlineSwap(swapStyle: HtmxSwapStyle): boolean;
	handleSwap(
		swapStyle: HtmxSwapStyle,
		target: Node,
		fragment: Node,
		settleInfo: HtmxSettleInfo
	): boolean | Node[];
	encodeParameters(xhr: XMLHttpRequest, parameters: FormData, elt: Node): any | string | null; //???
	getSelectors(): string[] | null;
}

/**
 * @callback swapCallback
 */

/**
 * @typedef {((this:Node, evt:Event) => boolean) & {source: string}} ConditionalFunction
 */

/**
 * @typedef {{elt: Element, message: string, validity: ValidityState}} HtmxElementValidationError
 */

/**
 * @typedef {HtmxResponseInfo & {shouldSwap: boolean, serverResponse: any, isError: boolean, ignoreTitle: boolean, selectOverride:string, swapOverride:string}} HtmxBeforeSwapDetails
 */

/**
 * @callback HtmxAjaxHandler
 * @param {Element} elt
 * @param {HtmxResponseInfo} responseInfo
 */

/**
 * @typedef {(() => void)} HtmxSettleTask
 */
