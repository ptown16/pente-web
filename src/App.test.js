import React from 'react';
import Game from './Game.js';
import Board from './Board.js';

import { shallow } from 'enzyme';

it( 'Game renders without crashing', () =>{
  shallow(<Game />);
});

it( 'Board renders without crashing', () =>{
  shallow(<Board boardSize={19} colors={["#123456", "blue"]} />);
});

it( 'Test xyPosToArray', () =>{
  const wrapper = shallow(<Board boardSize={6} colors={["#123456", "blue"]} />);
  const board = wrapper.instance()
  expect(board.xyPosToArray(3, 1)).toEqual(9);
  expect(board.xyPosToArray(5, 5)).toEqual(35);
});

it( 'Test renderBox without piece added', () =>{
  const wrapper = shallow(<Board boardSize={19} colors={["#123456", "blue"]} />);
  const box = wrapper.instance().renderBox(0, 0);
  expect(box.props.x).toEqual(0);
  expect(box.props.y).toEqual(0);
  expect(box.props.hasPiece).toEqual(false);
});

it( 'Test renderBox with piece added', () =>{
  const wrapper = shallow(<Board boardSize={19} colors={["#123456", "blue"]} />);
  const board = wrapper.instance()
  board.addPiece(0, 0, 1);
  const box = board.renderBox(0, 0);
  expect(box.props.x).toEqual(0);
  expect(box.props.y).toEqual(0);
  expect(box.props.hasPiece).toEqual(true);
});


it( 'Test single jump no edges xIncrement: 0 and yIncrement: 1', () =>{
  const wrapper = shallow(<Board boardSize={6} colors={["#123456", "blue"]} />);
  const board = wrapper.instance()
  board.addPiece(1, 4, 0);
  board.addPiece(1, 3, 1);
  board.addPiece(1, 2, 1);
  board.addPiece(1, 1, 0);
  board.testSingleJump(1, 1, 0, 1);
  const box1 = board.renderBox(1, 2);
  const box2 = board.renderBox(1, 3);
  expect(box1.props.hasPiece).toEqual(false);
  expect(box2.props.hasPiece).toEqual(false);
});

it( 'Test single jump no edges xIncrement: 0 and yIncrement: -1', () =>{
  const wrapper = shallow(<Board boardSize={6} colors={["#123456", "blue"]} />);
  const board = wrapper.instance()
  board.addPiece(1, 4, 0);
  board.addPiece(1, 3, 1);
  board.addPiece(1, 2, 1);
  board.addPiece(1, 1, 0);
  board.testSingleJump(1, 4, 0, -1);
  const box1 = board.renderBox(1, 2);
  const box2 = board.renderBox(1, 3);
  expect(box1.props.hasPiece).toEqual(false);
  expect(box2.props.hasPiece).toEqual(false);
});

it( 'Test single jump no edges xIncrement: 1 and yIncrement: 0', () =>{
  const wrapper = shallow(<Board boardSize={6} colors={["#123456", "blue"]} />);
  const board = wrapper.instance()
  board.addPiece(1, 1, 0);
  board.addPiece(2, 1, 1);
  board.addPiece(3, 1, 1);
  board.addPiece(4, 1, 0);
  board.testSingleJump(1, 1, 1, 0);
  const box1 = board.renderBox(2, 1);
  const box2 = board.renderBox(3, 1);
  expect(box1.props.hasPiece).toEqual(false);
  expect(box2.props.hasPiece).toEqual(false);
});

it( 'Test single jump no edges xIncrement: 1 and yIncrement: 1', () =>{
  const wrapper = shallow(<Board boardSize={6} colors={["#123456", "blue"]} />);
  const board = wrapper.instance()
  board.addPiece(1, 1, 0);
  board.addPiece(2, 2, 1);
  board.addPiece(3, 3, 1);
  board.addPiece(4, 4, 0);
  board.testSingleJump(1, 1, 1, 1);
  const box1 = board.renderBox(2, 2);
  const box2 = board.renderBox(3, 3);
  expect(box1.props.hasPiece).toEqual(false);
  expect(box2.props.hasPiece).toEqual(false);
});

it( 'Test single jump no edges xIncrement: 1 and yIncrement: -1', () =>{
  const wrapper = shallow(<Board boardSize={6} colors={["#123456", "blue"]} />);
  const board = wrapper.instance()
  board.addPiece(1, 4, 0);
  board.addPiece(2, 3, 1);
  board.addPiece(3, 2, 1);
  board.addPiece(4, 1, 0);
  board.testSingleJump(1, 4, 1, -1);
  const box1 = board.renderBox(2, 3);
  const box2 = board.renderBox(3, 2);
  expect(box1.props.hasPiece).toEqual(false);
  expect(box2.props.hasPiece).toEqual(false);
});

it( 'Test single jump no edges xIncrement: -1 and yIncrement: 0', () =>{
  const wrapper = shallow(<Board boardSize={6} colors={["#123456", "blue"]} />);
  const board = wrapper.instance()
  board.addPiece(1, 1, 0);
  board.addPiece(2, 1, 1);
  board.addPiece(3, 1, 1);
  board.addPiece(4, 1, 0);
  board.testSingleJump(4, 1, -1, 0);
  const box1 = board.renderBox(2, 1);
  const box2 = board.renderBox(3, 1);
  expect(box1.props.hasPiece).toEqual(false);
  expect(box2.props.hasPiece).toEqual(false);
});

it( 'Test single jump no edges xIncrement: -1 and yIncrement: -1', () =>{
  const wrapper = shallow(<Board boardSize={6} colors={["#123456", "blue"]} />);
  const board = wrapper.instance()
  board.addPiece(1, 1, 0);
  board.addPiece(2, 2, 1);
  board.addPiece(3, 3, 1);
  board.addPiece(4, 4, 0);
  board.testSingleJump(4, 4, -1, -1);
  const box1 = board.renderBox(2, 2);
  const box2 = board.renderBox(3, 3);
  expect(box1.props.hasPiece).toEqual(false);
  expect(box2.props.hasPiece).toEqual(false);
});

it( 'Test single jump no edges xIncrement: -1 and yIncrement: 1', () =>{
  const wrapper = shallow(<Board boardSize={6} colors={["#123456", "blue"]} />);
  const board = wrapper.instance()
  board.addPiece(1, 4, 0);
  board.addPiece(2, 3, 1);
  board.addPiece(3, 2, 1);
  board.addPiece(4, 1, 0);
  board.testSingleJump(4, 1, -1, 1);
  const box1 = board.renderBox(2, 3);
  const box2 = board.renderBox(3, 2);
  expect(box1.props.hasPiece).toEqual(false);
  expect(box2.props.hasPiece).toEqual(false);
});

it( 'Test single jump with edges xIncrement: 0 and yIncrement: 1', () =>{
  const wrapper = shallow(<Board boardSize={6} colors={["#123456", "blue"]} />);
  const board = wrapper.instance()
  board.addPiece(0, 0, 0);
  board.addPiece(0, 1, 1);
  board.addPiece(0, 2, 1);
  board.addPiece(0, 3, 0);
  board.testSingleJump(0, 0 , 0, 1);
  const box1 = board.renderBox(0, 1);
  const box2 = board.renderBox(0, 2);
  expect(box1.props.hasPiece).toEqual(false);
  expect(box2.props.hasPiece).toEqual(false);
});
