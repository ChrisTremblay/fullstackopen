import React from 'react';
import ReactDOM from 'react-dom/client';

import { App, Hello } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <App />
    <Hello name='Chris' />
    <Hello name='Tom' />
    <Hello name='Olivier' />
    <Hello name='Adam' />
  </div>
);
