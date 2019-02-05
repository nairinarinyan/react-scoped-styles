import { createDirHash } from './lib/dirhash';

function scriptLoader(source: string): string {
    const { prefix = 'app' }  = this.query;
    const classNameRegex = /(className.*?["|'])(.*?)("|')/g;

    if (!source.match(classNameRegex)) {
        return source;
    }

    const dirHash = createDirHash(this.resourcePath);
    return source.replace(classNameRegex, (_match, p1, classNames, p3) => {
        const uniqueClassNames = classNames.split(' ')
            .map((className: string) => {
                const containsPrefix = !!~className.indexOf(prefix);
                return containsPrefix ? className : dirHash + '-' + className;
            })
            .join(' ');

        return p1 + uniqueClassNames + p3;
    });
}

export = scriptLoader;