import { createDirHash } from './lib/dirhash';
import { LoaderContext } from './options';

export default function styleLoader(this: LoaderContext, source: string): string {
    const { globalsPrefix = 'app' }  = this.query;

    const classLineRegex = /(.*(\..*?)(?<!;)$)/gm;
    const classRegex = new RegExp(`(?<=\\.)((?!${globalsPrefix}-)\\w+[\\w-]*\\b)`, 'g');

    if (!source.match(classLineRegex)) {
        return source;
    }

    const [dirName, dirHash] = createDirHash(this.context);
    return source.replace(classLineRegex, matchingLine => {
        return matchingLine.replace(classRegex, className => {
            const uniqueClassName = `${dirName}-${dirHash}-${className}`;
            return uniqueClassName;
        });
    });
};