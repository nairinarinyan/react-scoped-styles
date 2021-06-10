import React, { FC } from 'react';
import { classes } from '../../../index.js';
import { renderToStaticMarkup } from 'react-dom/server';

import './styles.css';

const App: FC = () => {
  const apply = false;
  const bar = 'pc-yup'
  
  const classez = classes('something', {
    foo: true,
    flex: check(),
    'm-k-b': false,
    "display-flex": false,
    [bar + 'baz']: apply
  }, 'pc-nope', {
    [Date.now.toLocaleString + '']: true,
    ['pc' + '-class']: true
  }, someclass, "other-one");

  return (
    <div className="pc-home m-b-8">
      <p className="m-b-16 pc-no">
        <h3 className={classez}>something</h3>
        <h4 className={classes('foo', 'pc-bar')}>title</h4>
      </p>
    </div>
  );
};

const markup = renderToStaticMarkup(<App />);
console.log(markup);