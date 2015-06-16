'use strict';

import {Actions} from 'flummox';

class AppActions extends Actions {
  dateChange (date) {
    return date;
  }

  locationChange (location) {
    return location;
  }

  geohashError (err) {
    return err;
  }

  geohashRequest () {
    return true;
  }
}

export default AppActions;
