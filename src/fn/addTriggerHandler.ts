import { addEventListener } from '../ready/addEventListener';
import { asElement } from './asElement';
import { initScrollHandler } from './initScrollHandler';
import { loadImmediately } from './loadImmediately';
import { maybeFilterEvent } from './maybeFilterEvent';
import { maybeReveal } from './maybeReveal';
import { processPolling } from './processPolling';
import { querySelectorExt } from './querySelectorExt';
import { triggerEvent } from './triggerEvent';

/**
 * @param {Node} elt
 * @param {HtmxTriggerSpecification} triggerSpec
 * @param {HtmxNodeInternalData} nodeData
 * @param {TriggerHandler} handler
 */
export function addTriggerHandler(elt, triggerSpec, nodeData, handler) {
	if (triggerSpec.trigger === 'revealed') {
		initScrollHandler();
		addEventListener(elt, handler, nodeData, triggerSpec);
		maybeReveal(asElement(elt));
	} else if (triggerSpec.trigger === 'intersect') {
		const observerOptions = {};
		if (triggerSpec.root) {
			observerOptions.root = querySelectorExt(elt, triggerSpec.root);
		}
		if (triggerSpec.threshold) {
			observerOptions.threshold = parseFloat(triggerSpec.threshold);
		}
		const observer = new IntersectionObserver(function (entries) {
			for (let i = 0; i < entries.length; i++) {
				const entry = entries[i];
				if (entry.isIntersecting) {
					triggerEvent(elt, 'intersect');
					break;
				}
			}
		}, observerOptions);
		observer.observe(asElement(elt));
		addEventListener(asElement(elt), handler, nodeData, triggerSpec);
	} else if (triggerSpec.trigger === 'load') {
		if (!maybeFilterEvent(triggerSpec, elt, makeEvent('load', { elt }))) {
			loadImmediately(asElement(elt), handler, nodeData, triggerSpec.delay);
		}
	} else if (triggerSpec.pollInterval > 0) {
		nodeData.polling = true;
		processPolling(asElement(elt), handler, triggerSpec);
	} else {
		addEventListener(elt, handler, nodeData, triggerSpec);
	}
}
