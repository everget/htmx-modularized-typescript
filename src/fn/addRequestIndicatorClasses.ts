import { findAttributeTargets } from '../fn/findAttributeTargets.js';
import { forEach } from '../fn/forEach.js';
import { getInternalData } from '../fn/getInternalData.js';

/**
 * @param {Element} elt
 * @returns {Element[]}
 */
export function addRequestIndicatorClasses(elt) {
	let indicators = /** @type Element[] */ findAttributeTargets(elt, 'hx-indicator');
	if (indicators == null) {
		indicators = [elt];
	}
	forEach(indicators, function (ic) {
		const internalData = getInternalData(ic);
		internalData.requestCount = (internalData.requestCount || 0) + 1;
		ic.classList.add.call(ic.classList, htmx.config.requestClass);
	});
	return indicators;
}
