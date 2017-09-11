import _ from 'lodash'

export class Presenter {
  constructor (templates) {
    this.templates = templates
  }

  call (events) {
    events.forEach(this._setIcon.bind(this))
  }

  _setIcon (event) {
    event.icon = _.find(this.templates, { name: event.name }) 
  }
}
