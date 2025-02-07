import { getStartTag } from './getStartTag'
import { parseHTML } from './parseHTML'
import { takeChildrenFor } from './takeChildrenFor'
import { normalizeScriptTags } from './normalizeScriptTags'

/**
 * @typedef {DocumentFragment & {title?: string}} DocumentFragmentWithTitle
 * @description  a document fragment representing the response HTML, including
 * a `title` property for any title information found
 * @param {string} response HTML
 * @returns {DocumentFragmentWithTitle}
 */
export function makeFragment(response: string): DocumentFragment & { title?: string } {
    // strip head tag to determine shape of response we are dealing with
    const responseWithNoHead = response.replace(/<head(\s[^>]*)?>[\s\S]*?<\/head>/i, '')
    const startTag = getStartTag(responseWithNoHead)
    /** @type DocumentFragmentWithTitle */
    let fragment
    if (startTag === 'html') {
      // if it is a full document, parse it and return the body
      fragment = /** @type DocumentFragmentWithTitle */ (new DocumentFragment())
      const doc = parseHTML(response)
      takeChildrenFor(fragment, doc.body)
      fragment.title = doc.title
    } else if (startTag === 'body') {
      // parse body w/o wrapping in template
      fragment = /** @type DocumentFragmentWithTitle */ (new DocumentFragment())
      const doc = parseHTML(responseWithNoHead)
      takeChildrenFor(fragment, doc.body)
      fragment.title = doc.title
    } else {
      // otherwise we have non-body partial HTML content, so wrap it in a template to maximize parsing flexibility
      const doc = parseHTML('<body><template class="internal-htmx-wrapper">' + responseWithNoHead + '</template></body>')
      fragment = /** @type DocumentFragmentWithTitle */ (doc.querySelector('template').content)
      // extract title into fragment for later processing
      fragment.title = doc.title

      // for legacy reasons we support a title tag at the root level of non-body responses, so we need to handle it
      var titleElement = fragment.querySelector('title')
      if (titleElement && titleElement.parentNode === fragment) {
        titleElement.remove()
        fragment.title = titleElement.innerText
      }
    }
    if (fragment) {
      if (htmx.config.allowScriptTags) {
        normalizeScriptTags(fragment)
      } else {
        // remove all script tags if scripts are disabled
        fragment.querySelectorAll('script').forEach((script) => script.remove())
      }
    }
    return fragment
}
