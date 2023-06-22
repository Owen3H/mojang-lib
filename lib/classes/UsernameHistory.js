/**  @class
 * @desc Represents the history of usernames of a Minecraft account
 */
class UsernameHistory {

  constructor(history) {
    this._history = {}
    for (const el of history) {
      this._history[el.name] = el.changedToAt || -Infinity
    }
  }

  get all() {
    return this._history
  }

  get first() {
    return this._history.find(user => {
      if (user === -Infinity) return user
    })
  }

  get last() {
    var last = this.first
    for (var username in this._history) {
      if (this._history[username] >= this._history[last]) 
        last = username
    }

    return last
  }

  had(username) {
    return this._history.hasOwnProperty(username)
  }

  at(timestamp) {
    var goodOne = this.first
    for (var username in this._history) {
      const historicUser = this._history[username]
      if (historicUser <= timestamp && historicUser >= this._history[goodOne]) {
        goodOne = username
      }
    }
    
    return goodOne
  }
}

module.exports = UsernameHistory
