# Scoped Styles for React

[![NPM](https://img.shields.io/npm/v/react-scoped-styles.svg)](https://img.shields.io/npm/v/react-scoped-styles.svg)

Get your CSS **classes** scoped by component directory  

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

## Installation
```console
npm i react-scoped-styles
```

## Usage

The module assumes that component file and its styles are in the same directory. 
This is sample for **Stylus**. The same applies for **Sass** and others.
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

## Getting started

The module exposes two loaders both for **componenets** and **styles**.  
Append the **script-loader** **after** it has been transpiled by TypeScript or Babel.  
And **style-loader** should be **after** the preprocessor loader and **before** the css-loader.

**webpack.config.js**
```js
module.exports = {
  module: {
    rules: [
      // TypeScript
      {
        test: /\.tsx?$/,
        use: [
          'react-scoped-styles/script-loader',
          'awesome-typescript-loader'
        ]
      },
      // Babel
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'react-scoped-styles/script-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ]
      },
      // Stylus
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'react-scoped-styles/style-loader',
          'stylus-loader'
        ]
      },
      // Sass
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'react-scoped-styles/style-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
```

### Globals
To use global styles you can pass `globalsPrefix` options to **both** loaders and prefix your classes with it.  
(`app` is applied by default)
```js
const scopedStylesOptions = {
  globalsPrefix: 'app'
};


{
  loader: 'react-scoped-styles/script-loader',
  options: scopedStylesOptions
}
// ...
{
  loader: 'react-scoped-styles/style-loader',
  options: scopedStylesOptions
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

### Conditional classes
To use conditional classnames you can use the `classes` function.  
Note that the classnames should be **inline**
```jsx
import React, { useState } from 'react';
import { classes } from 'react-scoped-styles';
import './sidebar.styl';

export const SideBar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={classes([open, 'open'], 'sidebar')}>
            ...
        </div>
    )
};
```

## API
```typescript
classes (
    ...([boolean, string] | string)[]
) => string;
```
`classes` function accepts arrays of `[condition, className]` pairs, and `class-name` strings or default classes.
```jsx
<div className={classes('default', [true, 'applied'], 'another-one', [false, 'not-applied'])} />
```

All classes should be **INLINE**, this **won't work**
```js
const someClass = 'some';
const someCondition = true;

<div className={classes([someCondition, someClass])} />
```