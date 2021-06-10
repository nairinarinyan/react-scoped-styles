import { readFile } from 'fs/promises';
import { classNames } from '../../index';

const findClosingIdx = (str: string) => {
  let stack = null;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '(') {
      if (stack === null) stack = 0;
      stack += 1;
    } else if (char === ')') {
      if (stack !== null) stack -= 1;
    }
    if (stack === 0) {
      return i;
    }
  }

  return 0;
};

const dynKeyRegex = /(?<=\[).+(?=\]\:)/g;
const constKeyRegex = /['"]?([\w-]+)["']?(?=:)/g;
const defaultClassRegex = /["'](.+)["'](?=[,)])/g;

// const hash = 'feaef89';

const replaceClassNames = (expr: string) => {
  return expr
    // .replace(dynKeyRegex, m => {
    //   return `'${hash}' + ${m}`;
    // })
    .replace(constKeyRegex, (_, g) => {
      return`'${hash}-${g}'`;
    })
    .replace(defaultClassRegex, (_, g) => {
      return`'${hash}-${g}'`;
    })
    // .replace()
};

const check = async () => {
  const filePath = '../app/src/index.tsx';
  const content = await readFile(filePath, 'utf-8');

  const regexp = /classNames\(/ig;

  if (!regexp.test(content)) {
    return content;
  }

  let match;
  let replacedContent = content;

  while((match = regexp.exec(content)) !== null) {
    const startIdx = match.index;
    const closingIdx = findClosingIdx(content.slice(startIdx)) + startIdx + 1;
    const pre = content.slice(0, startIdx);
    const post = content.slice(closingIdx);
    const expr = replaceClassNames(content.slice(startIdx, closingIdx));
    replacedContent = pre + expr + post;
  }
  
  // console.log(regexp.lastIndex, regexp.sticky)
  // const d = content.match(regexp)
  // // const k = content.match(regexp)
  // // const match = content.match();
  // console.log(d);
  // console.log(k);

  // const r = content.replace(/classNames\([^]*?\)/gmi, expr => {
  //   console.log(expr)
  //   const m = expr.match(/(?:["']).*?['"]/gmi)
  //   // console.log(m);
  //   return expr;
  // });
};

check();