/**
 * This method adds a class to the given element.
 *
 * @see https://htmx.org/api/#addClass
 *
 * @param {Element|string} elt the element to add the class to
 * @param {string} clazz the class to add
 * @param {number} [delay] the delay (in milliseconds) before class is added
 */
export function addClassToElement(elt, clazz, delay) {
	elt = asElement(resolveTarget(elt));
	if (!elt) {
		return;
	}
	if (delay) {
		getWindow().setTimeout(function () {
			addClassToElement(elt, clazz);
			elt = null;
		}, delay);
	} else {
		elt.classList && elt.classList.add(clazz);
	}
}
