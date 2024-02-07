import * as webpack from 'webpack';
import { getInclude } from './lib/include-hash';
import { createDirHash } from './lib/dirhash';

const classRegex = /(?<=\.)[_a-zA-Z]+[_a-zA-Z0-9-]*/g;
const ruleBodyRegex = /\{.*?\}/g;

export default function styleLoader(this: webpack.LoaderContext<any>, source: string): string {
    const includeHash = getInclude(this);

    const strippedSrc = source.replace(ruleBodyRegex, '');
    const dirHash = createDirHash(this.context);

    const classes = strippedSrc
        .match(classRegex)?.reduce((acc, curr) => {
            return acc.includes(curr) ? acc : acc.concat(curr);
        }, [] as string[]);
    
    let ret = source;

    classes?.forEach(className => {
        ret = ret.replace(new RegExp(className, 'g'), c => includeHash(c, dirHash));
    });

    return ret;
};