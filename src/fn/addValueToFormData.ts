/** @param {string} name
 * @param {string|Array|FormDataEntryValue} value
 * @param {FormData} formData */
export function addValueToFormData(name, value, formData) {
	if (name != null && value != null) {
		if (Array.isArray(value)) {
			value.forEach(function (v) {
				formData.append(name, v);
			});
		} else {
			formData.append(name, value);
		}
	}
}
