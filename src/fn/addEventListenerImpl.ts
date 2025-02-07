/**
 * Adds an event listener to an element
 *
 * @see https://htmx.org/api/#on
 *
 * @param {EventTarget|string} arg1 the element to add the listener to | the event name to add the listener for
 * @param {string|EventListener} arg2 the event name to add the listener for | the listener to add
 * @param {EventListener|Object|boolean} [arg3] the listener to add | options to add
 * @param {Object|boolean} [arg4] options to add
 * @returns {EventListener}
 */
export function addEventListenerImpl(arg1, arg2, arg3, arg4) {
	ready(function () {
		const eventArgs = processEventArgs(arg1, arg2, arg3, arg4);
		eventArgs.target.addEventListener(eventArgs.event, eventArgs.listener, eventArgs.options);
	});
	const b = isFunction(arg2);
	return b ? arg2 : arg3;
}
