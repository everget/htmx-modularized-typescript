import { swapWithStyle } from './swapWithStyle'
import { querySelectorAllExt } from './querySelectorAllExt'
import { triggerEvent } from './triggerEvent'
import { triggerErrorEvent } from './triggerErrorEvent'
import { forEach } from './forEach'
import { getRawAttribute } from './getRawAttribute'
import { getDocument } from './getDocument'
import { isInlineSwap } from './isInlineSwap'
import { handlePreservedElements } from './handlePreservedElements'
import { restorePreservedElements } from './restorePreservedElements'
import { asParentNode } from './asParentNode'

/**
 * @param {string} oobValue
 * @param {Element} oobElement
 * @param {HtmxSettleInfo} settleInfo
 * @param {Node|Document} [rootNode]
 * @returns
 */
export function oobSwap(
  oobValue: string,
  oobElement: Element,
  settleInfo: { tasks: Array<() => void> },
  rootNode?: Node | Document
): string {
  rootNode = rootNode || getDocument()
  let selector = '#' + getRawAttribute(oobElement, 'id')
  /** @type HtmxSwapStyle */
  let swapStyle = 'outerHTML'
  if (oobValue === 'true') {
    // do nothing
  } else if (oobValue.indexOf(':') > 0) {
    swapStyle = oobValue.substr(0, oobValue.indexOf(':'))
    selector = oobValue.substr(oobValue.indexOf(':') + 1, oobValue.length)
  } else {
    swapStyle = oobValue
  }
  oobElement.removeAttribute('hx-swap-oob')
  oobElement.removeAttribute('data-hx-swap-oob')

  const targets = querySelectorAllExt(rootNode, selector, false)
  if (targets) {
    forEach(
      targets,
      function(target) {
        let fragment
        const oobElementClone = oobElement.cloneNode(true)
        fragment = getDocument().createDocumentFragment()
        fragment.appendChild(oobElementClone)
        if (!isInlineSwap(swapStyle, target)) {
          fragment = asParentNode(oobElementClone) // if this is not an inline swap, we use the content of the node, not the node itself
        }

        const beforeSwapDetails = { shouldSwap: true, target, fragment }
        if (!triggerEvent(target, 'htmx:oobBeforeSwap', beforeSwapDetails)) return

        target = beforeSwapDetails.target // allow re-targeting
        if (beforeSwapDetails.shouldSwap) {
          handlePreservedElements(fragment)
          swapWithStyle(swapStyle, target, target, fragment, settleInfo)
          restorePreservedElements()
        }
        forEach(settleInfo.elts, function(elt) {
          triggerEvent(elt, 'htmx:oobAfterSwap', beforeSwapDetails)
        })
      }
    )
    oobElement.parentNode.removeChild(oobElement)
  } else {
    oobElement.parentNode.removeChild(oobElement)
    triggerErrorEvent(getDocument().body, 'htmx:oobErrorNoTarget', { content: oobElement })
  }
  return oobValue
}
