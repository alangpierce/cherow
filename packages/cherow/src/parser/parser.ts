import * as ESTree from '../estree';
import { Token } from '../token';
import { Options, Location, Parser } from '../types';
import { parseStatementListItem, parseDirective } from './statements';
import { parseModuleItemList } from './module';
import { Context, Flags, nextToken } from '../utilities';

/**
 * Creates the parser object
 *
 * @param source The source coode to parser
 * @param sourceFile Optional source file info to be attached in every node
 */
export function createParser(
    source: string,
    sourceFile: string | void,
): Parser {
    return {
        // The source code to parse
        source,
        // Source length
        length: source.length,
        // Current position
        index: 0,
        // Current line
        line: 1,
        // Current column
        column: 0,
        // Start position  before current token
        startIndex: 0,
        // Start position column before current token
        startColumn: 0,
        // Start position line before current token
        startLine: 1,
        // End position after parsing after current token
        lastIndex: 0,
        // End column position after current token
        lastColumn: 0,
        // End line position after current token
        lastLine: 0,
        // Pending cover grammar errors
        pendingExpressionError: undefined,
        // Mutable parser flags. Allows destructuring by default.
        flags: Flags.AllowDestructuring,
        // The tokens
        token: Token.EndOfSource,
        // Misc
        tokenRaw: '',
        lastValue: 0,
        comments: [],
        sourceFile,
        tokenRegExp: undefined,
        tokenValue: undefined,
        labelSet: undefined,
        errorLocation: undefined,
        errors: [],
    };
}

/**
 * Creating the parser
 *
 * @param source The source coode to parser
 * @param options The parser options
 * @param context Context masks
 */
export function parseSource(source: string, options: Options | void, /*@internal*/ context: Context): ESTree.Program {

  let sourceFile: string = '';

  if (!!options) {
      // The flag to enable module syntax support
      if (options.module) context |= Context.Module;
      // The flag to enable stage 3 support (ESNext)
      if (options.next) context |= Context.OptionsNext;
      // The flag to enable React JSX parsing
      if (options.jsx) context |= Context.OptionsJSX;
      // The flag to enable start and end offsets to each node
      if (options.ranges) context |= Context.OptionsRanges;
      // The flag to enable line/column location information to each node
      if (options.loc) context |= Context.OptionsLoc;
      // The flag to attach raw property to each literal node
      if (options.raw) context |= Context.OptionsRaw;
      // Attach raw property to each identifier node
      if (options.rawIdentifier) context |= Context.OptionsRawidentifiers;
      // The flag to allow return in the global scope
      if (options.globalReturn) context |= Context.OptionsGlobalReturn;
      // The flag to allow to skip shebang - '#'
      if (options.skipShebang) context |= Context.OptionsShebang;
      // Enable tolerant mode
      if (options.tolerant) context |= Context.OptionsTolerant;
      // Set to true to record the source file in every node's loc object when the loc option is set.
      if (!!options.source) sourceFile = options.source;
      // Create a top-level comments array containing all comments
      if (!!options.comments) context |= Context.OptionsComments;
      // The flag to enable implied strict mode
      if (options.impliedStrict) context |= Context.Strict;
      // The flag to enable experimental features
      if (options.experimental) context |= Context.OptionsExperimental;
      // The flag to set to bypass methods in Node
      if (options.node) context |= Context.OptionsNode;
      // Accepts a callback function to be invoked for each syntax node (as the node is constructed)
  }

  const parser = createParser(source, sourceFile);

  const body = context & Context.Module ?
      parseModuleItemList(parser, context) :
      parseStatementList(parser, context);

  const node: ESTree.Program = {
      type: 'Program',
      sourceType: context & Context.Module ? 'module' : 'script',
      body: body as any,
  };

  if (context & Context.LocationTracker) {

      if (context & Context.OptionsRanges) {
          node.start = 0;
          node.end = source.length;
      }

      if (context & Context.OptionsLoc) {

          node.loc = {
              start: { line: 1, column: 0 },
              end: { line: parser.line, column: parser.column
              }
          };

          if (sourceFile) node.loc.source = sourceFile;
      }
  }

  if (context & Context.OptionsComments) node.comments = parser.comments;

  if (context & Context.OptionsTolerant) node.errors = parser.errors;

  return node;
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser instance
 * @param Context masks
 */

export function parseStatementList(parser: Parser, context: Context): ESTree.Statement[] {
  const statements: ESTree.Statement[] = [];
  let hasProlog = true; // Parsing directive prologue.
  // prime the scanner
  nextToken(parser, context | Context.DisallowEscapedKeyword);

  while (parser.token !== Token.EndOfSource) {
      if (hasProlog && parser.token !== Token.StringLiteral) hasProlog = false;
      if (hasProlog) {
          if (!(context & Context.Strict) && parser.tokenRaw.length === 12 && parser.tokenValue === 'use strict') {
              context |= Context.Strict;
          }
          statements.push(parseDirective(parser, context));
      } else {
          statements.push(parseStatementListItem(parser, context));
      }
  }

  return statements;
}

/**
 * Parse either script code or module code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-scripts)
 * @see [Link](https://tc39.github.io/ecma262/#sec-modules)
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parse(source: string, options?: Options): ESTree.Program {
  return options && options.module
    ? parseModule(source, options)
    : parseScript(source, options);
}

/**
 * Parse script code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-scripts)
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parseScript(source: string, options?: Options): ESTree.Program {
  return parseSource(source, options, Context.Empty);
}

/**
 * Parse module code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-modules)
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parseModule(source: string, options?: Options): ESTree.Program {
  return parseSource(source, options, Context.Strict | Context.Module);
}
