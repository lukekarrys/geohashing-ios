'use strict';

import {Flummox} from 'flummox';
import AppActions from './actions/AppActions';
import AppStore from './stores/AppStore';

class Flux extends Flummox {
  constructor () {
    super();

    this.createActions('app', AppActions);
    this.createStore('app', AppStore, this);
  }
}

export default new Flux();
