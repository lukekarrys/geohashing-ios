'use strict';

import {NativeModules} from 'react-native';

const {height, width} = NativeModules.UIManager.Dimensions.window;

export default {height, width};
