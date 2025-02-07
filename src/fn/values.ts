/**
 * Returns the input values that would resolve for a given element via the htmx value resolution mechanism
 *
 * @see https://htmx.org/api/#values
 *
 * @param {Element} elt the element to resolve values on
 * @param {HttpVerb} type the request type (e.g. **get** or **post**) non-GET's will include the enclosing form of the element. Defaults to **post**
 * @returns {Object}
 */
export function values(elt, type) {
	const inputValues = getInputValues(elt, type || 'post');
	return inputValues.values;
}
