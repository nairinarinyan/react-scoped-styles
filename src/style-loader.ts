import { createDirHash } from './lib/dirhash';
import { LoaderContext } from './options';

function styleLoader(this: LoaderContext, source: string): string {
    const { globalsPrefix = 'app' }  = this.query;
    const classRegex = new RegExp(`((?:\\s|^)\\.)((?!${globalsPrefix}-)\\w+[\\w-]*\\b)`, 'g');

    if (!source.match(classRegex)) {
        return source;
    }
    
    const [dirName, dirHash] = createDirHash(this.context);
    const enhancedSource = source.replace(classRegex, (_match, p1, className) => {
        const uniqueClassName = `${dirName}-${dirHash}-${className}`;
        return p1 + uniqueClassName;
    });

    return enhancedSource;
};

export = styleLoader;