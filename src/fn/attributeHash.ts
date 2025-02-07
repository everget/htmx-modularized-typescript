import { stringHash } from './stringHash';

/**
 * @param {Element} elt
 * @returns {number}
 */
export function attributeHash(elt) {
	let hash = 0;
	// IE fix
	if (elt.attributes) {
		for (let i = 0; i < elt.attributes.length; i++) {
			const attribute = elt.attributes[i];
			if (attribute.value) {
				// only include attributes w/ actual values (empty is same as non-existent)
				hash = stringHash(attribute.name, hash);
				hash = stringHash(attribute.value, hash);
			}
		}
	}
	return hash;
}
