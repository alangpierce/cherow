import { Parser } from '../types';
import * as ESTree from '../estree';
import { Context, BindingType } from '../common';
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser instance
 * @param Context masks
 */
export declare function parseStatementList(parser: Parser, context: Context): any;
/**
 * Parses statement list items
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementListItem)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export declare function parseStatementListItem(parser: Parser, context: Context): ESTree.Statement;
/**
 * Parses statements
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Statement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export declare function parseStatement(parser: Parser, context: Context): ESTree.Statement;
/**
 * Parses the debugger statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-DebuggerStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export declare function parseDebuggerStatement(parser: Parser, context: Context): ESTree.DebuggerStatement;
/**
* Parses block statement
*
* @see [Link](https://tc39.github.io/ecma262/#prod-BlockStatement)
* @see [Link](https://tc39.github.io/ecma262/#prod-Block)
*
* @param parser  Parser object
* @param context Context masks
*/
export declare function parseBlockStatement(parser: Parser, context: Context): ESTree.BlockStatement;
/**
 * Parses return statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ReturnStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export declare function parseReturnStatement(parser: Parser, context: Context): ESTree.ReturnStatement;
/**
 * Parses empty statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-EmptyStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export declare function parseEmptyStatement(parser: Parser, context: Context): ESTree.EmptyStatement;
/**
 * Parses try statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-TryStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export declare function parseTryStatement(parser: Parser, context: Context): ESTree.TryStatement;
/**
 * Parses catch block
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Catch)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export declare function parseCatchBlock(parser: Parser, context: Context): any;
/**
* Parses throw statement
*
* @see [Link](https://tc39.github.io/ecma262/#prod-ThrowStatement)
*
* @param parser  Parser object
* @param context Context masks
*/
export declare function parseThrowStatement(parser: Parser, context: Context): ESTree.ThrowStatement;
/**
 * Parses either expression or labelled statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-LabelledStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export declare function parseExpressionOrLabelledStatement(parser: Parser, context: Context): any;
/**
 * Parses variable statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export declare function parseVariableStatement(parser: Parser, context: Context, type: BindingType): any;
/**
 * Parses either For, ForIn or ForOf statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-for-statement)
 * @see [Link](https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export declare function parseForStatement(parser: Parser, context: Context): any;
