
  /**
   * toArray converts an ArrayLike object into a real array.
   * @template T
   * @param {ArrayLike<T>} arr
   * @returns {T[]}
   */
export function toArray(arr) {
    const returnArr = []
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        returnArr.push(arr[i])
      }
    }
    return returnArr
  }
