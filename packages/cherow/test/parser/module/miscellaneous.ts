import { fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Module - Miscellaneous', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failures', () => {

        const programs = [
            'switch(0) { case 1: import v from \'./decl-pos-import-switch-case-dflt.js\'; default: }',
            'if (false) import v from \'./decl-pos-import-if-if.js\';',
            'yield;',
            '?',
            'return;',
            'label: { label: 0; }',
            '<!--',
            '-->',
            '{ eval = 0 }',
            '{ arguments = 0 }',
            '{ x: (arguments = 0) }',
            '{ x: (eval) = 0 }',
            '[ ...(eval) = 0 ]',
            '[ ...(arguments) = 0 ]'
        ];

        for (const arg of programs) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
                });
            });
        }

        /*fail(`class C {}
        new C().#x;`, Context.Strict | Context.Module, {
            source: `class C {}
            new C().#x;`
        });*/

        fail(`yield;`, Context.Strict | Context.Module, {
            source: `yield;`,
        });

        fail(`?`, Context.Strict | Context.Module, {
            source: `?';`,
        });

        fail(`var g;
        function* g() {}`, Context.Strict | Context.Module, {
            source: `var g;
            function* g() {}';`,
        });

        fail(`var await = 5;`, Context.Strict | Context.Module, {
            source: `var await = 5;`,
        });

        fail(`await 5;`, Context.Strict | Context.Module, {
            source: `await 5;';`,
        });

        fail(`function f() { await 5; }`, Context.Strict | Context.Module, {
            source: `function f() { await 5; }`,
        });

        fail(`export var await;`, Context.Strict | Context.Module, {
            source: `export var await;`,
        });

        fail(`await => 1;`, Context.Strict | Context.Module, {
            source: `await => 1;';`,
        });
    });

    describe('Pass', () => {
        const moduleTopLevel = [
            'function f() {} function f() {}',
            'var f; function f() {}',
            'function f() {} var f;',
            'function* f() {} function* f() {}',
            'var f; function* f() {}',
            'function* f() {} var f;',
            'function f() {} function* f() {}',
            'function* f() {} function f() {}',
        ];

        for (const arg of moduleTopLevel) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
                });
            });
        }
    });
});
