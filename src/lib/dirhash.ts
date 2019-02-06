import { parse } from 'path';
import { createHash } from 'crypto';

export function createDirHash(filePath: string): [string, string] {
    const { dir: dirPath, name: dirName} = parse(filePath);
    const dirHash = createHash('md5').update(dirPath).digest('hex').slice(0, 10);
    return [dirName, dirHash];
}