import { getDocument } from './getDocument';

/**
 * @param {Node} elt
 * @returns {boolean}
 */
export function bodyContains(elt) {
	// IE Fix
	const rootNode = elt.getRootNode && elt.getRootNode();
	if (rootNode && rootNode instanceof window.ShadowRoot) {
		return getDocument().body.contains(rootNode.host);
	} else {
		return getDocument().body.contains(elt);
	}
}
