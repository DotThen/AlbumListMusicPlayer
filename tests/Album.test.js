import React from 'react';
import { shallow } from 'enzyme';
import Album from '../client/components/Album.jsx';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<Album album={{albumImage: ""}}/>);
});

it('renders save button', () => {
  const wrapper = shallow(<Album album={{albumImage: ""}}/>);
  const save = <button type="button" id="spfy-btn">SAVE</button>;
  expect(wrapper).toContainReact(save);
});

it('renders ... button', () => {
  const wrapper = shallow(<Album album={{albumImage: ""}}/>);
  const btn = <button type="button" id="spfy-btn-round">...</button>;
  expect(wrapper).toContainReact(btn);
});

it('renders save button', () => {
  const wrapper = shallow(<Album album={{albumImage: ""}} update={() => console.log("Hi")}/>);
  expect(wrapper.state('songPlayingID')).toBe(0);
  wrapper.instance().updateSongPlayingID(4);
  expect(wrapper.state('songPlayingID')).toBe(4);
});