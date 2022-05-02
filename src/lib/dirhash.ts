import { relative } from 'path';
import { createHash } from 'crypto';

export function createDirHash(contextPath: string): string {
    const dirPath = relative(process.cwd(), contextPath);
    return createHash('md5').update(dirPath).digest('hex').slice(0, 10);
}