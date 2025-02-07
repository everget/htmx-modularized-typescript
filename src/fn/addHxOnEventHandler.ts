/**
 * @param {Element} elt
 * @param {string} eventName
 * @param {string} code
 */
export function addHxOnEventHandler(elt, eventName, code) {
	const nodeData = getInternalData(elt);
	if (!Array.isArray(nodeData.onHandlers)) {
		nodeData.onHandlers = [];
	}
	let func;
	/** @type EventListener */
	const listener = function (e) {
		maybeEval(elt, function () {
			if (eltIsDisabled(elt)) {
				return;
			}
			if (!func) {
				func = new Function('event', code);
			}
			func.call(elt, e);
		});
	};
	elt.addEventListener(eventName, listener);
	nodeData.onHandlers.push({ event: eventName, listener });
}
