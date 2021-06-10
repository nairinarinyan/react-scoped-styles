import { loader } from 'webpack';
import { createDirHash } from './lib/dirhash';
import { getInclude } from './lib/include-hash';
import { replaceConditionals } from './lib/parsers';

const classExprRegex = /classname:\s["'].*?["']/gi;
const classRegex = /["'](.*?)["']/g;

export default function scriptLoader(this: loader.LoaderContext, source: string): string {
    const includeHash = getInclude(this);

    if (!source.match(classExprRegex)) {
        return source;
    }

    const dirHash = createDirHash(this.context);

    const newSource = source.replace(classExprRegex, classExpr => {
        return classExpr.replace(classRegex, (_match, classNames) => {
            const uniqueClassNames = classNames.split(' ')
                .filter(Boolean)
                .map((className: string) => includeHash(className, dirHash))
                .join(' ');

            const prefix = /^\s/.test(classNames) ? "' " : "'";
            const suffix = /\s$/.test(classNames) ? " '" : "'";
            return prefix + uniqueClassNames + suffix;
        });
    });

    return replaceConditionals(newSource, className => includeHash(className, dirHash));
}