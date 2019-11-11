import React from 'react';
import ReactDOM from 'react-dom';
import App_copy from './App_copy';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App_copy />, div);
});
