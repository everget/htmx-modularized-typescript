/**
 * @param {string} returnStr
 * @param {string} name
 * @param {any} realValue
 * @returns {string}
 */
export function appendParam(returnStr, name, realValue) {
	if (returnStr !== '') {
		returnStr += '&';
	}
	if (String(realValue) === '[object Object]') {
		realValue = JSON.stringify(realValue);
	}
	const s = encodeURIComponent(realValue);
	returnStr += encodeURIComponent(name) + '=' + s;
	return returnStr;
}
