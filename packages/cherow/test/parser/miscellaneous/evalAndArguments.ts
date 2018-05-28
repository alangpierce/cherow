import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Eval and arguments', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const programs = [
            'var eval',
            'var arguments',
            'var foo, eval;',
            'var foo, arguments;',
            'try { } catch (eval) { }',
            'try { } catch (arguments) { }',
            'function eval() { }',
            'function arguments() { }',
            'function foo(eval) { }',
            'function foo(arguments) { }',
            'function foo(bar, eval) { }',
            'function foo(bar, arguments) { }',
            'eval => icefapper', // evil?
            '(eval) => { }',
            '(arguments) => { }',
            '(foo, eval) => { }',
            '(foo, arguments) => { }',
            'eval = 1;',
            'arguments = 1;',
            '[ arguments = 0 ]',
            'var foo = eval = 1;',
            'var foo = arguments = 1;',
            '++eval;',
            '++arguments;',
            'eval++;',
            'arguments++;',
            '--arguments;',
            '[ ...(eval = 0) ]',
            '{ eval = 0 }',
            '{ arguments = 0 }',
            '[ eval = 0 ]',
            '[ arguments = 0 ]',
            '[ (eval = 0) ]',
            '[ (arguments = 0) ]',
            '[ (eval) = 0 ]',
            '[ (arguments) = 0 ]',
            '[ ...(arguments = 0) ]',
            '[ ...(eval) = 0 ]',
            '[ ...(arguments) = 0 ]',
            // TODO
            // "[...eval] = arr",
        ];

        for (const arg of programs) {

            it(`"use strict"; ${arg}`, () => {
                t.throws(() => {
                    parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
                });
            });
        }
    });

    describe('Pass', () => {
        // 'eval' and 'arguments' valid in strict mode code, and module code
        const validInStrictMode = [
            'eval;',
            'arguments;',
            'arguments[1] = 7;',
            'arguments[1]--;',
            'arguments[1] = 7;',
            '--arguments[1];',
            'var foo = eval;',
            'var foo = arguments;',
            'var foo = { eval: 1 };',
            'var foo = { arguments: 1 };',
            'var foo = { }; foo.eval = {};',
            'var foo = { }; foo.arguments = {};',
            '(0,eval)(true)',
        ];

        for (const arg of validInStrictMode) {

            it(`"use strict"; ${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });

            it(`function foo() { "use strict"; ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`function foo() { "use strict";  ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`() => { "use strict"; ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`() => { "use strict";  ${arg} }`, undefined, Context.Empty);
                });
            });
        }

        // Valid 'eval' and 'arguments' in sloppy mode
        const validSyntax = [
            'var eval;',
            'var arguments',
            'var foo, eval;',
            'var foo, arguments;',
            'try { } catch (eval) { }',
            'try { } catch (arguments) { }',
            'function eval() { }',
            'function arguments() { }',
            'function foo(eval) { }',
            'function foo(arguments) { }',
            'function foo(bar, eval) { }',
            'function foo(bar, arguments) { }',
            'eval = 1;',
            'arguments = 1;',
            'var foo = eval = 1;',
            'var foo = arguments = 1;',
            '++eval;',
            '++arguments;',
            'eval++;',
            'arguments++;',
            'eval;',
            'arguments;',
            'arguments[1] = 7;',
            'arguments[1]--;',
            'foo = arguments[1];',
        ];

        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`function foo() { ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`function foo() { ${arg} }`, undefined, Context.Empty);
                });
            });
        }
    });
});
