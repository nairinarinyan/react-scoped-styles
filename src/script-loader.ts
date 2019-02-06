import { createDirHash } from './lib/dirhash';
import { LoaderContext } from './options';

function scriptLoader(this: LoaderContext, source: string): string {
    const { globalsPrefix = 'app' }  = this.query;
    const classNameRegex = /(className.*?["|'])(.*?)("|')/g;

    if (!source.match(classNameRegex)) {
        return source;
    }

    const [dirName, dirHash] = createDirHash(this.context);
    return source.replace(classNameRegex, (_match, p1, classNames, p3) => {
        const uniqueClassNames = classNames.split(' ')
            .map((className: string) => {
                const containsPrefix = className.startsWith(`${globalsPrefix}-`);
                const uniqueClassName = `${dirName}-${dirHash}-${className}`;
                return containsPrefix ? className : uniqueClassName;
            })
            .join(' ');

        return p1 + uniqueClassNames + p3;
    });
}

export = scriptLoader;