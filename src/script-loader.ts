import { createDirHash } from './lib/dirhash';
import { LoaderContext } from './options';

export default function scriptLoader(this: LoaderContext, source: string): string {
    const { globalsPrefix = 'app' } = this.query;
    const prefix = Array.isArray(globalsPrefix) ? globalsPrefix : [globalsPrefix];
    const prefixRegex = new RegExp(`^(${prefix.join('|')})-`);

    const classExprRegex = /classname:\s*(["'].*?["']|.*?\))/gi;
    const classStringRegex = new RegExp(`['|"](.*?)['|"]`, 'g')

    if (!source.match(classExprRegex)) {
        return source;
    }

    const [dirName, dirHash] = createDirHash(this.context);

    return source.replace(classExprRegex, classExpr => {
        return classExpr.replace(classStringRegex, (_match, classNames) => {
            const uniqueClassNames = classNames.split(' ')
                .filter(Boolean)
                .map((className: string) => {
                    const containsPrefix = prefixRegex.test(className);
                    const uniqueClassName = `${dirName}-${dirHash}-${className}`;

                    return containsPrefix ? className : uniqueClassName;
                })
                .join(' ');

            const prefix = /^\s/.test(classNames) ? "' " : "'";
            const suffix = /\s$/.test(classNames) ? " '" : "'";
            return prefix + uniqueClassNames + suffix;
        });
    });
}
