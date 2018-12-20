/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import UserNameComponent from 'components/src/components/userLoginInfo/UserNameComponent.js';

describe('UserNameComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(UserNameComponent);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('username-component');
  });
});
