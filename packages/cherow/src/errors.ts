import { Parser } from './types';
import { Context } from './utilities';

/*@internal*/
export const enum Errors {
    Unexpected,
    UnexpectedToken,
    ExpectedToken,
    InvalidEscapedReservedWord,
    UnexpectedKeyword,
    InvalidLHSInAssignment,
    UnterminatedString,
    UnterminatedRegExp,
    UnterminatedComment,
    UnterminatedTemplate,
    UnexpectedChar,
    StrictOctalEscape,
    DuplicateConstructor,
    InvalidEightAndNine,
    UnicodeOutOfRange,
    DuplicateRegExpFlag,
    UnexpectedTokenRegExpFlag,
    StrictLHSAssignment,
    IllegalReturn,
    StrictFunction,
    SloppyFunction,
    ForbiddenAsStatement,
    GeneratorInSingleStatementContext,
    ForAwaitNotOf,
    DeclarationMissingInitializer,
    ForInOfLoopInitializer,
    ForInOfLoopMultiBindings,
    LetInLexicalBinding,
    UnexpectedLexicalDeclaration,
    LabelRedeclaration,
    InvalidNestedStatement,
    IllegalContinue,
    UnknownLabel,
    MultipleDefaultsInSwitch,
    ImportExportDeclAtTopLevel,
    AsyncFunctionInSingleStatementContext,
    InvalidLineBreak,
    StrictModeWith,
    AwaitOutsideAsync,
    UnNamedFunctionDecl,
    DisallowedInContext,
    PrivateFieldConstructor,
    PublicFieldConstructor,
    StrictDelete,
    DeletePrivateField,
    InvalidConstructor,
    UnexpectedReserved,
    StrictEvalArguments,
    AwaitBindingIdentifier,
    YieldBindingIdentifier,
    UnexpectedStrictReserved,
    YieldInParameter,
    AwaitInParameter,
    MetaNotInFunctionBody,
    BadSuperCall,
    UnexpectedSuper,
    LoneSuper,
    YieldReservedKeyword,
    ContinuousNumericSeparator,
    TrailingNumericSeparator,
    ZeroDigitNumericSeparator,
    StrictOctalLiteral,
    InvalidLhsInAssignment,
    DuplicateProto,
    IllegalUseStrict,
    StaticPrototype,
    AccessorWrongArgs,
    BadSetterRestParameter,
    StrictLHSPrefixPostFix,
    InvalidElisonInObjPropList,
    ElementAfterRest,
    RestDefaultInitializer,
    ElementAfterSpread,
    InvalidDestructuringTarget,
    UnexpectedSurrogate,
    MalformedEscape,
    TemplateOctalLiteral,
    NotBindable,
    ParamAfterRest,
    NoCatchOrFinally,
    NewlineAfterThrow,
    ParamDupe,
    AsAfterImportStart,
    LabelNoColon,
    NonEmptyJSXExpression,
    ExpectedJSXClosingTag,
    AdjacentJSXElements,
    InvalidJSXAttributeValue,
    RestWithComma,
    UndefinedUnicodeCodePoint,
    HtmlCommentInModule,
    InvalidCoverInitializedName,
    TrailingDecorators,
    GeneratorConstructor,
    InvalidRestBindingPattern
}

/*@internal*/
export const errorMessages: {
    [key: string]: string;
} = {
    [Errors.Unexpected]: 'Unexpected token',
    [Errors.UnexpectedToken]: 'Unexpected token \'%0\'',
    [Errors.ExpectedToken]: 'Expected token \'%0\'',
    [Errors.InvalidEscapedReservedWord]: 'Keyword must not contain escaped characters',
    [Errors.UnexpectedKeyword]: 'Keyword \'%0\' is reserved',
    [Errors.InvalidLHSInAssignment]: 'Invalid left-hand side in assignment',
    [Errors.UnterminatedString]: 'Unterminated string literal',
    [Errors.UnterminatedRegExp]: 'Unterminated regular expression literal',
    [Errors.UnterminatedComment]: 'Unterminated MultiLineComment',
    [Errors.UnterminatedTemplate]: 'Unterminated template literal',
    [Errors.UnexpectedChar]: 'Invalid character \'%0\'',
    [Errors.StrictOctalEscape]: 'Octal escapes are not allowed in strict mode',
    [Errors.InvalidEightAndNine]: 'Escapes \\8 or \\9 are not syntactically valid escapes',
    [Errors.UnicodeOutOfRange]: 'Unicode escape code point out of range',
    [Errors.DuplicateRegExpFlag]: 'Duplicate regular expression flag \'%0\'',
    [Errors.UnexpectedTokenRegExpFlag]: 'Unexpected regular expression flag \'%0\'',
    [Errors.StrictLHSAssignment]: 'Eval or arguments can\'t be assigned to in strict mode code',
    [Errors.IllegalReturn]: 'Illegal return statement',
    [Errors.StrictFunction]: 'In strict mode code, functions can only be declared at top level or inside a block',
    [Errors.SloppyFunction]: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
    [Errors.ForbiddenAsStatement]: '%0 can\'t appear in single-statement context',
    [Errors.GeneratorInSingleStatementContext]: 'Generators can only be declared at the top level or inside a block',
    [Errors.ForAwaitNotOf]: '\'for await\' loop should be used with \'of\'',
    [Errors.DeclarationMissingInitializer]: 'Missing initializer in %0 declaration',
    [Errors.ForInOfLoopInitializer]: '\'for-%0\' loop variable declaration may not have an initializer',
    [Errors.ForInOfLoopMultiBindings]: 'Invalid left-hand side in for-%0 loop: Must have a single binding.',
    [Errors.LetInLexicalBinding]: 'let is disallowed as a lexically bound name',
    [Errors.UnexpectedLexicalDeclaration]: 'Lexical declaration cannot appear in a single-statement context',
    [Errors.LabelRedeclaration]: 'Label \'%0\' has already been declared',
    [Errors.InvalidNestedStatement]: '%0  statement must be nested within an iteration statement',
    [Errors.IllegalContinue]: 'Illegal continue statement: \'%0\' does not denote an iteration statement',
    [Errors.UnknownLabel]: 'Undefined label \'%0\'',
    [Errors.MultipleDefaultsInSwitch]: 'More than one default clause in switch statement',
    [Errors.ImportExportDeclAtTopLevel]: '%0 declarations may only appear at top level of a module',
    [Errors.AsyncFunctionInSingleStatementContext]: 'Async functions can only be declared at the top level or inside a block',
    [Errors.InvalidLineBreak]: 'No line break is allowed after \'%0\'',
    [Errors.StrictModeWith]: 'Strict mode code may not include a with statement',
    [Errors.AwaitOutsideAsync]: 'Await is only valid in async functions',
    [Errors.UnNamedFunctionDecl]: 'Function declaration must have a name in this context',
    [Errors.DuplicateConstructor]: 'Duplicate constructor method in class',
    [Errors.DisallowedInContext]: '\'%0\' may not be used as an identifier in this context',
    [Errors.StrictDelete]: 'Delete of an unqualified identifier in strict mode',
    [Errors.DeletePrivateField]: 'Private fields can not be deleted',
    [Errors.PrivateFieldConstructor]: 'Classes may not have a private field named \'#constructor\'',
    [Errors.PublicFieldConstructor]: 'Classes may not have a field named \'constructor\'',
    [Errors.InvalidConstructor]: 'Class constructor may not be a \'%0\'',
    [Errors.UnexpectedReserved]: 'Unexpected reserved word',
    [Errors.StrictEvalArguments]: 'Unexpected eval or arguments in strict mode',
    [Errors.AwaitBindingIdentifier]: '\'await\' is not a valid identifier inside an async function',
    [Errors.YieldBindingIdentifier]: '\'yield\' is not a valid identifier inside an generator function',
    [Errors.UnexpectedStrictReserved]: 'Unexpected strict mode reserved word',
    [Errors.AwaitInParameter]: 'Await expression not allowed in formal parameter',
    [Errors.YieldInParameter]: 'Yield expression not allowed in formal parameter',
    [Errors.MetaNotInFunctionBody]: 'new.target only allowed within functions',
    [Errors.BadSuperCall]: 'super() is not allowed in this context',
    [Errors.UnexpectedSuper]: 'Member access from super not allowed in this context',
    [Errors.LoneSuper]: 'Only "(" or "." or "[" are allowed after \'super\'',
    [Errors.YieldReservedKeyword]: '\'yield\' is a reserved keyword within generator function bodies',
    [Errors.ContinuousNumericSeparator]: 'Only one underscore is allowed as numeric separator',
    [Errors.TrailingNumericSeparator]: 'Numeric separators are not allowed at the end of numeric literals',
    [Errors.ZeroDigitNumericSeparator]: 'Numeric separator can not be used after leading 0.',
    [Errors.StrictOctalLiteral]: 'Legacy octal literals are not allowed in strict mode',
    [Errors.InvalidLhsInAssignment]: 'Invalid left-hand side in assignment',
    [Errors.DuplicateProto]: 'Property name __proto__ appears more than once in object literal',
    [Errors.IllegalUseStrict]: 'Illegal \'use strict\' directive in function with non-simple parameter list',
    [Errors.StaticPrototype]: 'Classes may not have a static property named \'prototype\'',
    [Errors.AccessorWrongArgs]: '%0 functions must have %1 argument%2',
    [Errors.BadSetterRestParameter]: 'Setter function argument must not be a rest parameter',
    [Errors.StrictLHSPrefixPostFix]: '%0 increment/decrement may not have eval or arguments operand in strict mode',
    [Errors.InvalidElisonInObjPropList]: 'Elision not allowed in object property list',
    [Errors.ElementAfterRest]: 'Rest element must be last element',
    [Errors.ElementAfterSpread]: 'Spread element must be last element',
    [Errors.RestDefaultInitializer]: 'Rest parameter may not have a default initializer',
    [Errors.InvalidDestructuringTarget]: 'Invalid destructuring assignment target',
    [Errors.UnexpectedSurrogate]: 'Unexpected surrogate pair',
    [Errors.MalformedEscape]: 'Malformed %0 character escape sequence',
    [Errors.TemplateOctalLiteral]: 'Template literals may not contain octal escape sequences',
    [Errors.NotBindable]: 'Invalid binding pattern',
    [Errors.ParamAfterRest]: 'Rest parameter must be last formal parameter',
    [Errors.NoCatchOrFinally]: 'Missing catch or finally after try',
    [Errors.NewlineAfterThrow]: 'Illegal newline after throw',
    [Errors.ParamDupe]: 'Duplicate parameter name not allowed in this context',
    [Errors.AsAfterImportStart]: 'Missing keyword \'as\' after import *',
    [Errors.LabelNoColon]: 'Labels must be followed by a \':\'',
    [Errors.NonEmptyJSXExpression]: 'JSX attributes must only be assigned a non-empty  \'expression\'',
    [Errors.ExpectedJSXClosingTag]: 'Expected corresponding JSX closing tag for %0',
    [Errors.AdjacentJSXElements]: 'Adjacent JSX elements must be wrapped in an enclosing tag',
    [Errors.InvalidJSXAttributeValue]: 'Invalid JSX attribute value',
    [Errors.RestWithComma]: 'Rest element may not have a trailing comma',
    [Errors.UndefinedUnicodeCodePoint]: 'Undefined Unicode code-point',
    [Errors.HtmlCommentInModule]: 'HTML comments are not allowed in modules',
    [Errors.InvalidCoverInitializedName]: 'Invalid shorthand property initializer',
    [Errors.TrailingDecorators]: 'Trailing decorator may be followed by method',
    [Errors.GeneratorConstructor]: 'Decorators can\'t be used with a constructor',
    [Errors.InvalidRestBindingPattern]: '`...` must be followed by an identifier in declaration contexts',
};

/**
 * Collect line, index, and colum from either the recorded error
 * or directly from the parser and returns it
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param index  The 0-based end index of the error.
 * @param line The 0-based line position of the error.
 * @param column The 0-based column position of the error.
 * @param parser The 0-based end index of the current node.
 * @param description Error description
 */
/*@internal*/
export function constructError(parser: Parser, context: Context, index: number, line: number, column: number, description: string): void {
    const error: any = new SyntaxError(
        `Line ${line}, column ${column}: ${description}`,
    );

    error.index = index;
    error.line = line;
    error.column = column;
    error.description = description;
    if (context & Context.OptionsTolerant) {
        parser.errors.push(error);
    } else throw error;
}

/**
 * Collect line, index, and colum from either the recorded error
 * or directly from the parser and returns it
 *
 * @param parser Parser instance
 */

function getErrorLocation(parser: Parser): { index: number; line: number; column: number } {
    let { index, startLine: line, startColumn: column } = parser;
    const errorLoc = parser.errorLocation;
    if (!!errorLoc) {
        index = errorLoc.index;
        line = errorLoc.line;
        column = errorLoc.column;
    }
    return { index, line, column };
}

/**
 * Throws an error
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param type Error type
 * @param params Error params
 */
/*@internal*/
export function report(parser: Parser, type: Errors, ...params: string[]): void {
    const { index, line, column } = getErrorLocation(parser);
    const errorMessage = errorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
    constructError(parser, Context.Empty, index, line, column, errorMessage);
}

/**
 * If in tolerant mode, all errors are pushed to a top-level error array containing
 * otherwise throws
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param type Error type
 * @param params Error params
 */
/*@internal*/
export function tolerant(parser: Parser, context: Context, type: Errors, ...params: string[]): void {
    const { index, line, column } = getErrorLocation(parser);
    const errorMessage = errorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
    constructError(parser, context, index, line, column, errorMessage);
}
