import { loader } from 'webpack';
import { getInclude } from './lib/include-hash';
import { createDirHash } from './lib/dirhash';

const classLineRegex = /(?<!:\s.*?)(\..*?(?<!;)$)/gm;
const classRegex = /(?<=\.)\S+?(?=$|\s|{)/g;

export default function styleLoader(this: loader.LoaderContext, source: string): string {
    const includeHash = getInclude(this);

    if (!source.match(classLineRegex)) {
        return source;
    }

    const dirHash = createDirHash(this.context);

    return source.replace(classLineRegex, matchingLine =>
        matchingLine.replace(classRegex, className => includeHash(className, dirHash))
    );
};