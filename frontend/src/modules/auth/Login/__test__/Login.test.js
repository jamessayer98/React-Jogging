import React from 'react';
import { shallow, mount } from 'enzyme';

import { Login } from '../Login';

describe('Login component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should contains Login header', () => {
    const wrapper = mount(<Login />);
    expect(wrapper.find('h1').length).toEqual(1);
  });

  it('should contains Login form', () => {
    const wrapper = mount(<Login />);
    expect(wrapper.find('form').length).toEqual(1);
  });
});
