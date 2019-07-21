import csstree from 'css-tree';
import { createDirHash } from './lib/dirhash';
import { LoaderContext } from './options';

export default function styleLoader(this: LoaderContext, source: string): string {
    const { globalsPrefix = 'app' } = this.query;
    const [dirName, dirHash] = createDirHash(this.context);
    const ast = csstree.parse(source);

    csstree.walk(ast, {
        visit: 'ClassSelector',
        enter: function(node) {
            const className = node.name

            if (className.startsWith(globalsPrefix)) return;
            node.name = `${dirName}-${dirHash}-${className}`;
        }
    });

    return csstree.generate(ast, {
        sourceMap: false // if true, returns object instead of string
    });
};