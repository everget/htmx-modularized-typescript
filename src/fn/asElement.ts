/**
 * @param {any} elt
 * @return {Element|null}
 */
export function asElement(elt) {
	return elt instanceof Element ? elt : null;
}
