import { issueAjaxRequest, resolveTarget } from './issueAjaxRequest';

/**
 * Issues an htmx-style AJAX request
 *
 * @see https://htmx.org/api/#ajax
 *
 * @param {HttpVerb} verb
 * @param {string} path the URL path to make the AJAX
 * @param {Element|string|HtmxAjaxHelperContext} context the element to target (defaults to the **body**) | a selector for the target | a context object that contains any of the following
 * @return {Promise<void>} Promise that resolves immediately if no request is sent, or when the request is complete
 */
export function ajaxHelper(verb, path, context) {
	verb = /** @type HttpVerb */ verb.toLowerCase();
	if (context) {
		if (context instanceof Element || typeof context === 'string') {
			return issueAjaxRequest(verb, path, null, null, {
				targetOverride: resolveTarget(context) || DUMMY_ELT,
				returnPromise: true,
			});
		} else {
			let resolvedTarget = resolveTarget(context.target);
			// If target is supplied but can't resolve OR both target and source can't be resolved
			// then use DUMMY_ELT to abort the request with htmx:targetError to avoid it replacing body by mistake
			if (
				(context.target && !resolvedTarget) ||
				(!resolvedTarget && !resolveTarget(context.source))
			) {
				resolvedTarget = DUMMY_ELT;
			}
			return issueAjaxRequest(verb, path, resolveTarget(context.source), context.event, {
				handler: context.handler,
				headers: context.headers,
				values: context.values,
				targetOverride: resolvedTarget,
				swapOverride: context.swap,
				select: context.select,
				returnPromise: true,
			});
		}
	} else {
		return issueAjaxRequest(verb, path, null, null, {
			returnPromise: true,
		});
	}
}
