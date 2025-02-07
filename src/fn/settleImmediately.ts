
  /**
   * @param {HtmxSettleTask[]} tasks
   */
export function settleImmediately(tasks) {
    forEach(tasks, function(task) {
      task.call(undefined)
    })
  }
