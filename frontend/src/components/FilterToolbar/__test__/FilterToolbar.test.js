import React from 'react';
import { shallow, mount } from 'enzyme';
import { fromJS } from 'immutable';

import { FilterToolbar } from '../FilterToolbar';

describe('FilterToolbar component', () => {
  const params = fromJS({
    destination: '',
    fromDate: '',
    toDate: '',
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<FilterToolbar params={params} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should contain destination, start date, and end date', () => {
    const wrapper = mount(<FilterToolbar params={params} />);
    expect(wrapper.find('[name="destination"]').exists()).toBe(true);
    expect(wrapper.find('[name="fromDate"]').exists()).toBe(true);
    expect(wrapper.find('[name="toDate"]').exists()).toBe(true);
  });
});
