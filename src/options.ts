import { loader } from 'webpack';

export interface LoaderContext extends loader.LoaderContext {
    globalsPrefix: string;
}