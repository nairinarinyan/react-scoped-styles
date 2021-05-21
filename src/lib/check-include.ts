import { loader } from 'webpack';
import { getOptions } from 'loader-utils';
import { Options } from '../options';

export const getCheckInclude = (context: loader.LoaderContext) => {
    const { include = [], exclude = [] } = getOptions(context) as Options;
    const shouldTestInclude = !!include.length;
    const shouldTestExclude = !!exclude.length;

    const includeRegex = shouldTestInclude && new RegExp(`^(${include.join('|')})-`);
    const excludeRegex = shouldTestExclude && new RegExp(`^(${exclude.join('|')})-`);

    return (className: string) => shouldTestInclude ?
      (includeRegex as RegExp).test(className) :
      shouldTestExclude ? !(excludeRegex as RegExp).test(className) : true;
};