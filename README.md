# Scoped Styles for React
## ⚠️ EARLY VERSION

[![NPM](https://img.shields.io/npm/v/react-scoped-styles.svg)](https://img.shields.io/npm/v/react-scoped-styles.svg)

Get your CSS **classes** scoped by component directory  
### Tested only for [Stylus](http://stylus-lang.com/) ATM

## Installation
```console
npm i react-scoped-styles
```

## Usage

The module assumes that component file and its styles are in the same directory. 
```
+-- button
   +-- Button.tsx
   +-- button.styl
```

**Button.tsx**
```jsx
  import React from 'react';
  import './button.styl';

  const Button = () => (
    <button className="foo">Press Me</button>
  );

  export default Button;
```

**button.styl**
```stylus
.foo
    border none
    padding 10px 30px
    color white
    background-color darkslateblue
```

This will be rendered to
```html
<button class="button-c65bae6565-foo">Press Me</button>
```
```css
.button-c65bae6565-foo {
  border: none;
  padding: 10px 30px;
  color: #fff;
  background-color: #483d8b;
}
```

### Globals
To use global styles you can pass `globalsPrefix` options to **both** loaders and prefix your classes with it.  
(`app` is applied by default)
```js

{
  loader: 'react-scoped-styles/script-loader',
  options: {
    globalsPrefix: 'app'
  }
}
```

Thus classes with `app-` prefix will be ignored.  
```jsx
const Button = () => (
    <button className="foo app-global-class">Press Me</button>
);
```
```stylus
.foo
    border none
    padding 10px 30px
    color white
    background-color darkslateblue

.app-global-class
    background-color purple
```
Becomes
```html
<button class="button-c65bae6565-foo app-global-class">Press Me</button>
```
```css
.button-c65bae6565-foo {
  border: none;
  padding: 10px 30px;
  color: #fff;
  background-color: #483d8b;
}
.app-global-class {
  background-color: #800080;
}
```


## Getting started

The module exposes two loaders both for **componenets** and **styles**.  
Append the **script-loader** **after** it has been transpiled by TypeScript loader (not tested with **Babel** yet).  
And **style-loader** should be **after** the preprocessor loader and **before** the css-loader.

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

## How it's different from CSS Modules?
In CSS Modules you have to manually import and assign classes  
```jsx
import styles from './button.styl';

const Button = () => (
  <button className={styles.foo}>Press Me</button>
);
```
React Scoped Styles doesn't require to change the conventional styling workflow. You still assign your classes with plain strings.
```jsx
import './button.styl';

const Button = () => (
  <button className="foo">Press Me</button>
);
```