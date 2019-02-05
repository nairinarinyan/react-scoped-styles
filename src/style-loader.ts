import { createDirHash } from './lib/dirhash';

function styleLoader(source: string): string {
    const { globalsPrefix = 'app' }  = this.query;
    const classRegex = new RegExp(`^(\\.)((?!${globalsPrefix}).*?)(\\s)`, 'gm');

    if (!source.match(classRegex)) {
        return source;
    }

    const dirHash = createDirHash(this.resourcePath);
    const enhancedSource = source.replace(classRegex, (_match, p1, className, p3) => {
        const uniqueClassName = dirHash + '-' + className;
        return p1 + uniqueClassName + p3;
    });

    return enhancedSource;
};

export = styleLoader;