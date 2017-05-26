/* eslint-env jest */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Main from '../src/components/Main';

it('renders correctly', () => {
  renderer.create(
    <Main />
  );
});
