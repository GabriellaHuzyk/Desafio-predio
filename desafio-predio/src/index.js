import React from 'react';
import ReactDOM from 'react-dom';
import Predio from './App.js';

ReactDOM.render( //falando para o root guardar o App dentro dele.
  <React.StrictMode>
    <Predio />
  </React.StrictMode>,
  document.getElementById('root')
);
