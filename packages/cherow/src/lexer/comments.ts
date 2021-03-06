import * as ESTree from '../estree';
import { Chars } from '../chars';
import { Errors, tolerant, report } from '../errors';
import { Parser, CommentType } from '../types';
import { Context, ScannerState } from '../utilities';
import { consumeLineFeed, consumeOpt, advanceNewline } from './common';

// 11.4 Comments

/**
 * Skips single HTML comments. Same behavior as in V8.
 *
 * @param parser Parser Object
 * @param context Context masks.
 * @param state  Scanner state
 * @param type   Comment type
 */
export function skipSingleHTMLComment(
    parser: Parser,
    context: Context,
    state: ScannerState,
    type: CommentType): ScannerState {
    if (context & Context.Module) report(parser, Errors.HtmlCommentInModule);
    return skipSingleLineComment(parser, context, state, type);
}

/**
 * Skips SingleLineComment, SingleLineHTMLCloseComment and SingleLineHTMLOpenComment
 *
 *  @see [Link](https://tc39.github.io/ecma262/#prod-SingleLineComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLOpenComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLCloseComment)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param state  Scanner state
 * @param type  Comment type
 */

export function skipSingleLineComment(
    parser: Parser,
    context: Context,
    state: ScannerState,
    type: CommentType,
): ScannerState {
    const start = parser.index;
    const collectable = !!(context & Context.OptionsComments);
    while (parser.index < parser.length) {
        switch (parser.source.charCodeAt(parser.index)) {
            case Chars.CarriageReturn:
                advanceNewline(parser);
                if ((parser.index < parser.length) && parser.source.charCodeAt(parser.index) === Chars.LineFeed) parser.index++;
                return state | ScannerState.NewLine;
            case Chars.LineFeed:
            case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                advanceNewline(parser);
                if (collectable) addComment(parser, context, type, start);
                return state | ScannerState.NewLine;

            default:
                parser.index++; parser.column++;
        }
    }

    if (collectable) addComment(parser, context, type, start);

    return state;
}

/**
 * Skips multiline comment
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-annexB-MultiLineComment)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param state Scanner state
 */
export function skipMultiLineComment(
    parser: Parser,
    context: Context,
    state: ScannerState): any {

    const start = parser.index;
    const collectable = !!(context & Context.OptionsComments);

    while (parser.index < parser.length) {
        switch (parser.source.charCodeAt(parser.index)) {
            case Chars.Asterisk:
                parser.index++; parser.column++;
                state &= ~ScannerState.LastIsCR;
                if (consumeOpt(parser, Chars.Slash)) {
                    if (collectable) addComment(parser, context, 'MultiLine', start);
                    return state;
                }
                break;

                // Mark multiline comments containing linebreaks as new lines
                // so we can perfectly handle edge cases like: '1/*\n*/--> a comment'
            case Chars.CarriageReturn:
                state |= ScannerState.NewLine | ScannerState.LastIsCR;
                advanceNewline(parser);
                break;

            case Chars.LineFeed:
                consumeLineFeed(parser, state);
                state = state & ~ScannerState.LastIsCR | ScannerState.NewLine;
                break;

            case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                state = state & ~ScannerState.LastIsCR | ScannerState.NewLine;
                advanceNewline(parser);
                break;

            default:
                state &= ~ScannerState.LastIsCR;
                parser.index++; parser.column++;
        }
    }

    // Unterminated multi-line comment.
    tolerant(parser, context, Errors.UnterminatedComment);
}

/**
 * Add comments
 *
 * @param parser Parser object
 * @param context Context masks
 * @param type  Comment type
 * @param commentStart Start position of comment
 */

export function addComment(
    parser: Parser,
    context: Context,
    type: ESTree.CommentType,
    commentStart: number
  ): void {

    const { index: end, startIndex: start, startLine, startColumn, lastLine, column } = parser;
    const comment: ESTree.Comment = {
        type,
        value: parser.source.slice(commentStart, type === 'MultiLine' ? end - 2 : end),
        start,
        end,
    };

    if (context & Context.OptionsLoc) {
        comment.loc = {
            start: { line: startLine, column: startColumn },
            end: { line: lastLine, column },
        };
    }

    parser.comments.push(comment);
}
