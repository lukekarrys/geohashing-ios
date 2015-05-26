'use strict';

import {Store} from 'flummox';


class AppStore extends Store {
  constructor (flux) {
    super();

    const appActions = flux.getActions('app');
    this.register(appActions.changeDate, this.handleDateChange);
    this.register(appActions.changeLocation, this.handleLocationChange);

    this.state = {};
  }

  handleDateChange (content) {
    this.setState({
      date: content
    });
  }

  handleLocationChange (content) {
    this.setState({
      location: content
    });
  }
}

export default AppStore;
