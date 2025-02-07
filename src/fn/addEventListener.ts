import { asElement } from './asElement';
import { forEach } from './forEach';
import { getInternalData } from './getInternalData';
import { maybeFilterEvent } from './maybeFilterEvent';
import { triggerEvent } from './triggerEvent';

/**
 * @param {Node} elt
 * @param {TriggerHandler} handler
 * @param {HtmxNodeInternalData} nodeData
 * @param {HtmxTriggerSpecification} triggerSpec
 * @param {boolean} [explicitCancel]
 */
export function addEventListener(elt, handler, nodeData, triggerSpec, explicitCancel) {
	const elementData = getInternalData(elt);
	/** @type {(Node|Window)[]} */
	let eltsToListenOn;
	if (triggerSpec.from) {
		eltsToListenOn = querySelectorAllExt(elt, triggerSpec.from);
	} else {
		eltsToListenOn = [elt];
	}
	// store the initial values of the elements, so we can tell if they change
	if (triggerSpec.changed) {
		if (!('lastValue' in elementData)) {
			elementData.lastValue = new WeakMap();
		}
		eltsToListenOn.forEach(function (eltToListenOn) {
			if (!elementData.lastValue.has(triggerSpec)) {
				elementData.lastValue.set(triggerSpec, new WeakMap());
			}
			// @ts-ignore value will be undefined for non-input elements, which is fine
			elementData.lastValue.get(triggerSpec).set(eltToListenOn, eltToListenOn.value);
		});
	}
	forEach(eltsToListenOn, function (eltToListenOn) {
		/** @type EventListener */
		const eventListener = function (evt) {
			if (!bodyContains(elt)) {
				eltToListenOn.removeEventListener(triggerSpec.trigger, eventListener);
				return;
			}
			if (ignoreBoostedAnchorCtrlClick(elt, evt)) {
				return;
			}
			if (explicitCancel || shouldCancel(evt, elt)) {
				evt.preventDefault();
			}
			if (maybeFilterEvent(triggerSpec, elt, evt)) {
				return;
			}
			const eventData = getInternalData(evt);
			eventData.triggerSpec = triggerSpec;
			if (eventData.handledFor == null) {
				eventData.handledFor = [];
			}
			if (eventData.handledFor.indexOf(elt) < 0) {
				eventData.handledFor.push(elt);
				if (triggerSpec.consume) {
					evt.stopPropagation();
				}
				if (triggerSpec.target && evt.target) {
					if (!matches(asElement(evt.target), triggerSpec.target)) {
						return;
					}
				}
				if (triggerSpec.once) {
					if (elementData.triggeredOnce) {
						return;
					} else {
						elementData.triggeredOnce = true;
					}
				}
				if (triggerSpec.changed) {
					const node = event.target;
					// @ts-ignore value will be undefined for non-input elements, which is fine
					const value = node.value;
					const lastValue = elementData.lastValue.get(triggerSpec);
					if (lastValue.has(node) && lastValue.get(node) === value) {
						return;
					}
					lastValue.set(node, value);
				}
				if (elementData.delayed) {
					clearTimeout(elementData.delayed);
				}
				if (elementData.throttle) {
					return;
				}

				if (triggerSpec.throttle > 0) {
					if (!elementData.throttle) {
						triggerEvent(elt, 'htmx:trigger');
						handler(elt, evt);
						elementData.throttle = getWindow().setTimeout(function () {
							elementData.throttle = null;
						}, triggerSpec.throttle);
					}
				} else if (triggerSpec.delay > 0) {
					elementData.delayed = getWindow().setTimeout(function () {
						triggerEvent(elt, 'htmx:trigger');
						handler(elt, evt);
					}, triggerSpec.delay);
				} else {
					triggerEvent(elt, 'htmx:trigger');
					handler(elt, evt);
				}
			}
		};
		if (nodeData.listenerInfos == null) {
			nodeData.listenerInfos = [];
		}
		nodeData.listenerInfos.push({
			trigger: triggerSpec.trigger,
			listener: eventListener,
			on: eltToListenOn,
		});
		eltToListenOn.addEventListener(triggerSpec.trigger, eventListener);
	});
}
