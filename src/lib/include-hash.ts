import * as webpack from 'webpack';
import { Options } from '../options';

export const getInclude = (context: webpack.LoaderContext<Options>) => {
    const { include = [], exclude = [] } = context.getOptions();
    const shouldTestInclude = !!include.length;
    const shouldTestExclude = !!exclude.length;

    const includeRegex = shouldTestInclude && new RegExp(`^(${include.join('|')})-`);
    const excludeRegex = shouldTestExclude && new RegExp(`^(${exclude.join('|')})-`);

    return (className: string, dirHash: string): string => {
      const shouldModify = shouldTestInclude ?
        (includeRegex as RegExp).test(className) :
        shouldTestExclude ? !(excludeRegex as RegExp).test(className) : true;

      const uniqueClassName = !shouldModify ?
        null :
          shouldTestInclude ?
            `${className.replace(includeRegex as RegExp, '_' + dirHash + '-')}` :
              `${className}-${dirHash}`;

      return shouldModify ? uniqueClassName as string : className;
    }
};