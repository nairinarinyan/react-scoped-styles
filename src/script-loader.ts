import { createDirHash } from './lib/dirhash';
import { LoaderContext } from './options';

export default function scriptLoader(this: LoaderContext, source: string): string {
    const { globalsPrefix = 'app' }  = this.query;

    const classExprRegex = /className.*?['|"].*?['|"].*?[:|}]/g
    const classStringRegex = new RegExp(`['|"](.*?)['|"]`, 'g')

    if (!source.match(classExprRegex)) {
        return source;
    }

    const [dirName, dirHash] = createDirHash(this.context);
    return source.replace(classExprRegex, (classExpr) => {
        return classExpr.replace(classStringRegex, (_match, classNames) => {
            const uniqueClassNames = classNames.split(' ')
                .map((className: string) => {
                    const containsPrefix = className.startsWith(`${globalsPrefix}-`);
                    const uniqueClassName = `${dirName}-${dirHash}-${className}`;
                    return containsPrefix ? className : uniqueClassName;
                })
                .join(' ');

            return "'" + uniqueClassNames + "'";
        });
    });
}