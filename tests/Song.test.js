import React from 'react';
import { shallow } from 'enzyme';
import Song from '../client/components/Song.jsx';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<Song song={{songName: ""}} />);
});

it('renders + button', () => {
  const wrapper = shallow(<Song song={{songName: ""}} />);
  const plus = <td id="plus">+</td>;
  expect(wrapper).toContainReact(plus);
});

it('renders updated playing flag after click', () => {
  const wrapper = shallow(<Song song={{songName: ""}} id={3} songPlaying={3} updateID={() => console.log("Hi")}/>);
  expect(wrapper.state('playing')).toBe(false);
  wrapper.instance().handleClick();
  expect(wrapper.state('playing')).toBe(true);
});

it('renders updated playing flag after receiving props', () => {
  const wrapper = shallow(<Song song={{songName: ""}} id={3} songPlaying={3} updateID={() => console.log("Hi")} originalAlbum={3} albumPlaying={3} currentAlbumPlaying={true}/>);
  expect(wrapper.state('playing')).toBe(false);
  wrapper.instance().componentWillReceiveProps();
  expect(wrapper.state('playing')).toBe(true);
});

it('renders save button', () => {
  const wrapper = shallow(<Song song={{songName: ""}} id={2} songPlaying={3} updateID={() => console.log("Hi")} originalAlbum={3} albumPlaying={3} currentAlbumPlaying={true}/>);
  expect(wrapper.state('idElement')).toBe(2);
  wrapper.instance().componentWillReceiveProps();
  expect(wrapper.state('idElement')).toBe(2);
});