/**
 * @param {any} elt
 * @return {HTMLElement|null}
 */
export function asHtmlElement(elt) {
	return elt instanceof HTMLElement ? elt : null;
}
