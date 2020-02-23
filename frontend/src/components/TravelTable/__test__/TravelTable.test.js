import React from 'react';
import { shallow, mount } from 'enzyme';
import { fromJS } from 'immutable';

import { TravelTable } from '../TravelTable';

describe('TravelTable component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<TravelTable plans={fromJS([])} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render travel plans', () => {
    const wrapper = mount(<TravelTable plans={fromJS([])} />);

    wrapper.setProps({
      plans: fromJS([
        {
          id: 1,
          destination: 'CDMX',
          startd_date: '2020-02-01',
          end_date: '2020-02-29',
          comment: 'Travel to Mexico City',
        },
        {
          id: 2,
          destination: 'Miami',
          startd_date: '2020-03-01',
          end_date: '2020-03-03',
          comment: 'Travel to Miami',
        },
      ]),
    });

    expect(wrapper.find('tbody tr').length).toEqual(2);
  });
});
