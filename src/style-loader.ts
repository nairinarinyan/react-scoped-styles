import { loader } from 'webpack';
import { getCheckInclude } from './lib/check-include';
import { createDirHash } from './lib/dirhash';

const classLineRegex = /(?<!:\s.*?)(\..*?(?<!;)$)/gm;
const classRegex = /(?<=\.)\S+?(?=$|\s|{)/g;

export default function styleLoader(this: loader.LoaderContext, source: string): string {
    const checkInclude = getCheckInclude(this);

    if (!source.match(classLineRegex)) {
        return source;
    }

    debugger
    const [dirName, dirHash] = createDirHash(this.context);

    return source.replace(classLineRegex, matchingLine =>
        matchingLine.replace(classRegex, className => {
            const include = checkInclude(className);
            const uniqueClassName = `${dirName}-${dirHash}-${className}`;

            return include ? uniqueClassName : className;
        })
    );
};