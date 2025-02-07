import { HtmxNodeInternalData } from '../types/HtmxNodeInternalData';
import { HtmxTriggerSpecification } from '../types/HtmxTriggerSpecification';
import { addEventListener } from './addEventListener';
import { asElement } from './asElement';
import { cleanUpElement } from './cleanUpElement';
import { eltIsDisabled } from './eltIsDisabled';
import { getRawAttribute } from './getRawAttribute';
import { isLocalLink } from './isLocalLink';
import { issueAjaxRequest } from './issueAjaxRequest';

/**
 * @param {Element} elt
 * @param {HtmxNodeInternalData} nodeData
 * @param {HtmxTriggerSpecification[]} triggerSpecs
 */
export function boostElement(elt, nodeData, triggerSpecs) {
	if (
		(elt instanceof HTMLAnchorElement &&
			isLocalLink(elt) &&
			(elt.target === '' || elt.target === '_self')) ||
		(elt.tagName === 'FORM' &&
			String(getRawAttribute(elt, 'method')).toLowerCase() !== 'dialog')
	) {
		nodeData.boosted = true;
		let verb, path;
		if (elt.tagName === 'A') {
			verb = /** @type HttpVerb */ 'get';
			path = getRawAttribute(elt, 'href');
		} else {
			const rawAttribute = getRawAttribute(elt, 'method');
			verb = /** @type HttpVerb */ rawAttribute ? rawAttribute.toLowerCase() : 'get';
			path = getRawAttribute(elt, 'action');
			if (verb === 'get' && path.includes('?')) {
				path = path.replace(/\?[^#]+/, '');
			}
		}
		triggerSpecs.forEach(function (triggerSpec) {
			addEventListener(
				elt,
				function (node, evt) {
					const elt = asElement(node);
					if (eltIsDisabled(elt)) {
						cleanUpElement(elt);
						return;
					}
					issueAjaxRequest(verb, path, elt, evt);
				},
				nodeData,
				triggerSpec,
				true
			);
		});
	}
}
