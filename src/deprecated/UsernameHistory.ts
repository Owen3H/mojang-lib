type UserHistory = [{
  name: string,
  changedToAt: number
}]

/** 
 *   Represents the username history of a Minecraft account.
 *  - **NO LONGER WORKS** as Mojang deprecated username history.
 *  @see https://help.minecraft.net/hc/en-us/articles/8969841895693-Username-History-API-Removal-FAQ-
 */
class UsernameHistory {
  _history: Map<string, number>

  constructor(history: UserHistory) {
    this._history = new Map()
    history.forEach(el => {
      this._history.set(el.name, el.changedToAt || -Infinity)
    })
  }

  all = () => this._history
  
  entriesArray = () => [...this._history.entries()]
  keysArray = () => [...this._history.keys()]
  valuesArray = () => [...this._history.values()]

  first = () => this.entriesArray().find(user => {
    if (user[1] === -Infinity) return user
  })

  last = () => {
    let last = this.first()[0]

    const usernames = this.keysArray()
    const len = this._history.size

    for (let i = 0; i < len; i++) {
      const username = usernames[i]
      if (this.get(username) >= this.get(last))
        last = username
    }

    return last
  }

  get = (username: string) => this._history.get(username)
  had = (username: string) => this._history.has(username)
  
  at = (timestamp: number) => {
    let mostRecentUser = this.first()[0]

    const usernames = this.keysArray()
    const len = this._history.size

    for (let i = 0; i < len; i++) {
      const username = usernames[i]
      const historicUser = this.get(username)

      const withinTimestamp = historicUser <= timestamp
      const moreRecent = historicUser >= this.get(mostRecentUser)

      if (withinTimestamp && moreRecent)
        mostRecentUser = username
    }

    return mostRecentUser
  }
}

module.exports = UsernameHistory
