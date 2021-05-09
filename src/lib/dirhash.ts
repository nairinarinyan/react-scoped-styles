import { parse, relative } from 'path';
import { createHash } from 'crypto';

export function createDirHash(contextPath: string): [string, string] {
    const dirPath = relative(process.cwd(), contextPath);
    const { name: dirName} = parse(dirPath);
    const dirHash = createHash('md5').update(dirPath).digest('hex').slice(0, 10);
    return [dirName, dirHash];
}