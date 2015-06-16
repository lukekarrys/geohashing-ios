'use strict';

import {Store} from 'flummox';


class AppStore extends Store {
  constructor (flux) {
    super();

    const appActions = flux.getActions('app');
    this.register(appActions.dateChange, this.handleDateChange);
    this.register(appActions.locationChange, this.handleLocationChange);
    this.register(appActions.geohashError, this.handleGeohashError);
    this.register(appActions.geohashRequest, this.handleGeohashRequest);

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

  handleGeohashError (content) {
    this.setState({
      geohashError: content
    });
  }

  handleGeohashRequest (content) {
    this.setState({
      geohashRequest: content
    });
  }
}

export default AppStore;
