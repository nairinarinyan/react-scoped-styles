import { loader } from 'webpack';
import { createDirHash } from './lib/dirhash';
import { getCheckInclude } from './lib/check-include';

// > a.replace(/(?<=classes[\s\S]*?)\[\D+?\,\s?(\D+?)\]/gmi, (m, g) => m.replace(g, 'k+' + g))

const classExprRegex = /classname:\s(["'].*?["'])/gi;
const classRegex = /["'](.*?)["']/g;

export default function scriptLoader(this: loader.LoaderContext, source: string): string {
    const checkInclude = getCheckInclude(this);

    if (!source.match(classExprRegex)) {
        return source;
    }

    debugger
    const [dirName, dirHash] = createDirHash(this.context);

    return source.replace(classExprRegex, classExpr => {
        return classExpr.replace(classRegex, (_match, classNames) => {
            const uniqueClassNames = classNames.split(' ')
                .filter(Boolean)
                .map((className: string) => {
                    const include = checkInclude(className);
                    const uniqueClassName = `${dirName}-${dirHash}-${className}`;

                    return include ? uniqueClassName : className;
                })
                .join(' ');

            const prefix = /^\s/.test(classNames) ? "' " : "'";
            const suffix = /\s$/.test(classNames) ? " '" : "'";
            return prefix + uniqueClassNames + suffix;
        });
    });
}