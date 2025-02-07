const VERBS = ['get', 'post', 'put', 'delete', 'patch'];
const VERB_SELECTOR = VERBS.map(function (verb) {
	return '[hx-' + verb + '], [data-hx-' + verb + ']';
}).join(', ');

export const WHITESPACE = /\s/
export const WHITESPACE_OR_COMMA = /[\s,]/
export const SYMBOL_START = /[_$a-zA-Z]/
export const SYMBOL_CONT = /[_$a-zA-Z0-9]/
export const STRINGISH_START = ['"', "'", '/']
export const NOT_WHITESPACE = /[^\s]/
export const COMBINED_SELECTOR_START = /[{(]/
export const COMBINED_SELECTOR_END = /[})]/