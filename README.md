# Scoped Styles for React
## ⚠️ UNSTABLE YET


Get your CSS **classes** scoped by component directory  
### Tested only for [Stylus](http://stylus-lang.com/) ATM

## Installation
```console
npm i react-scoped-styles
```

## Usage

The module assumes that component file and its styles are in the same directory. 
```
+-- Button
   +-- Button.tsx
   +-- Button.styl
```

**Button.tsx**
```jsx
  import React from 'react';
  import './Button.styl';

  const Button = () => (
    <button className="foo">Press Me</button>
  );

  export default Button;
```

**Button.styl**
```stylus
.foo
    border none
    padding 10px 30px
    color white
    background-color darkslateblue
```

This will be rendered to
```html
<button class="fbb02d8f3d-foo">Press Me</button>
```
```css
.fbb02d8f3d-foo {
  border: none;
  padding: 10px 30px;
  color: #fff;
  background-color: #483d8b;
}
```

### Globals
If you want to use global styles you can pass `globalsPrefix` options to **both** loaders
```js

{
  loader: 'react-scoped-styles/script-loader',
  options: {
    globalsPrefix: 'app'
  }
}
```

Thus classes with `app-` will be ignored
```jsx
const Button = () => (
  <button className="foo app-global-class">Press Me</button>
);
```
```html
<button class="fbb02d8f3d-foo app-global-class">Press Me</button>
```


## Getting started

The module exposes two loaders for both for **componenets** and **styles**.  
Append the script loader **after** it has been transpiled by TypeScript loader (not tested with **Babel** yet).

**webpack.config.js**
```js
const scopedStylesOptions = {
  globalsPrefix: 'app'
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'react-scoped-styles/script-loader',
            options: scopedStylesOptions
          },
          'awesome-typescript-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'react-scoped-styles/style-loader',
            options: scopedStylesOptions
          },
          'stylus-loader'
        ]
      }
    ]
  }
};
```

## How it's different from CSS Modules
If you are using CSS Modules you have to manually import and assign classes  
```jsx
import styles from './Button.styl';

const Button = () => (
  <button className={styles.foo}>Press Me</button>
);
```
React Scoped Styles doesn't require to change the conventional styling workflow. You still assign your classes with plain strings
```jsx
import './Button.styl';

const Button = () => (
  <button className="foo">Press Me</button>
);
```