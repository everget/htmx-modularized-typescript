/**
 * @param {EventTarget} elt
 * @return {ParentNode|null}
 */
export function asParentNode(elt) {
	return elt instanceof Element || elt instanceof Document || elt instanceof DocumentFragment
		? elt
		: null;
}
