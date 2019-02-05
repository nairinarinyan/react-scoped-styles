import { parse } from 'path';
import { createHash } from 'crypto';

export function createDirHash(filePath: string): string {
    const dirName = parse(filePath).dir;
    return createHash('md5').update(dirName).digest('hex').slice(0, 10);
}