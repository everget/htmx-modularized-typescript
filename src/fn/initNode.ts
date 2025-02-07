
 /**
   * @param {Element|HTMLInputElement} elt
   */
export function initNode(elt) {
    if (closest(elt, htmx.config.disableSelector)) {
      cleanUpElement(elt)
      return
    }
    const nodeData = getInternalData(elt)
    if (nodeData.initHash !== attributeHash(elt)) {
      // clean up any previously processed info
      deInitNode(elt)

      nodeData.initHash = attributeHash(elt)

      triggerEvent(elt, 'htmx:beforeProcessNode')

      const triggerSpecs = getTriggerSpecs(elt)
      const hasExplicitHttpAction = processVerbs(elt, nodeData, triggerSpecs)

      if (!hasExplicitHttpAction) {
        if (getClosestAttributeValue(elt, 'hx-boost') === 'true') {
          boostElement(elt, nodeData, triggerSpecs)
        } else if (hasAttribute(elt, 'hx-trigger')) {
          triggerSpecs.forEach(function(triggerSpec) {
            // For "naked" triggers, don't do anything at all
            addTriggerHandler(elt, triggerSpec, nodeData, function() {
            })
          })
        }
      }

      // Handle submit buttons/inputs that have the form attribute set
      // see https://developer.mozilla.org/docs/Web/HTML/Element/button
      if (elt.tagName === 'FORM' || (getRawAttribute(elt, 'type') === 'submit' && hasAttribute(elt, 'form'))) {
        initButtonTracking(elt)
      }

      triggerEvent(elt, 'htmx:afterProcessNode')
    }
  }