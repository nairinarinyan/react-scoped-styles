import { createDirHash } from './lib/dirhash';
import { LoaderContext } from './options';

export default function styleLoader(this: LoaderContext, source: string): string {
    const { globalsPrefix = 'app' } = this.query;
    const prefix = Array.isArray(globalsPrefix) ? globalsPrefix : [globalsPrefix];

    const classLineRegex = /(.*(\..*?)(?<!;)$)/gm;
    const classRegex = new RegExp(`(?<=\\.)((?!(${prefix.join('|')}))\\w+[\\w-]*\\b)`, 'g');

    if (!source.match(classLineRegex)) {
        return source;
    }

    const [dirName, dirHash] = createDirHash(this.context);

    return source.replace(classLineRegex, matchingLine =>
        matchingLine.replace(classRegex, className =>
            `${dirName}-${dirHash}-${className}`
        )
    );
};