export function restorePreservedElements() {
    const pantry = find('#--htmx-preserve-pantry--')
    if (pantry) {
      for (const preservedElt of [...pantry.children]) {
        const existingElement = find('#' + preservedElt.id)
        // @ts-ignore - use proposed moveBefore feature
        existingElement.parentNode.moveBefore(preservedElt, existingElement)
        existingElement.remove()
      }
      pantry.remove()
    }
  }
