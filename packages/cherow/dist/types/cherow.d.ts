import { parse, parseModule, parseScript } from './parser/parser';
import * as ESTree from './estree';
import * as Scanner from './lexer/index';
export declare const version = "1.5.8";
export { ESTree, Scanner, parse, parseModule, parseScript };
export * from './chars';
export * from './errors';
export * from './token';
export * from './types';
export * from './unicode';
export * from './utilities';
