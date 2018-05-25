import { Parser } from '../types';
import * as ESTree from '../estree';
import { Context, ModifierState } from '../common';
/**
 * Expression :
 *   AssignmentExpression
 *   Expression , AssignmentExpression
 *
 * ExpressionNoIn :
 *   AssignmentExpressionNoIn
 *   ExpressionNoIn , AssignmentExpressionNoIn
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Expression)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export declare function parseExpression(parser: Parser, context: Context): ESTree.Expression;
export declare function parseAssignmentExpression(parser: Parser, context: Context): any;
/**
 * Parse left hand side expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-LeftHandSideExpression)
 *
 * @param Parser Parer instance
 * @param Context Contextmasks
 * @param pos Location info
 */
export declare function parseLeftHandSideExpression(parser: Parser, context: Context): any;
export declare function parsePrimaryExpression(parser: Parser, context: Context): any;
export declare function parseIdentifier(parser: Parser, context: Context): ESTree.Identifier;
export declare function parseLiteral(parser: Parser, context: Context): ESTree.Literal;
/**
 * Parses function expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-FunctionExpression)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export declare function parseFunctionExpression(parser: Parser, context: Context, state?: ModifierState): ESTree.FunctionExpression;
/**
 * Parse property name
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-PropertyName)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export declare function parsePropertyName(parser: Parser, context: Context): any;
/**
 * Parse computed property names
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ComputedPropertyName)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export declare function parseComputedPropertyName(parser: Parser, context: Context): ESTree.Expression;
