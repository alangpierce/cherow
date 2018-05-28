import { fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Simple parameter list', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [

            // Array destructuring.
            '[]',
            '[a]',
            'x, [a]',
            '[a, b]',
            '[a], x',

            // Array destructuring with defaults.
            '[a = 0]',
            '[a, b] = []',
            'x, [a = 0]',
            '[a = 0], x',

            // Array destructuring with rest binding identifier.
            '[...a]',
            'x, [...a]',
            '[...a], x',

            // Array destructuring with rest binding pattern.
            '[...[a]]',
            'x, [...[a]]',
            '[...[a]], x',

            // Object destructuring.
            '{}',
            '{p: o}',
            'x, {p: o}',
            '{p: o}, x',

            // Object destructuring with defaults.
            '{p: o = 0}',
            'x, {p: o = 0}',
            '{p: o = 0}, x',
            '{ p, o } = {}',

            // Object destructuring with shorthand identifier form.
            '{o}',
            'x, {o}',
            '{o}, x',

            // Object destructuring with CoverInitName.
            '{o = 0}',
            'x, {o = 0}',
            '{o = 0}, x',

            // Object setter
            '{ set f(a = 1) }, x',

            // Default parameter.
            'd = 0',
            'x, d = 0',
            'd = 0, x',

            // Rest parameter.
            '...rest',
            'x, ...rest',
            '...x',

            // Rest parameter with array destructuring.
            '...[]',
            '...[a]',
            'x, ...[]',
            'x, ...[a]',

            // Rest parameter with object destructuring.
            '...{}',
            '...{p: o}',
            'x, ...{}',
            'x, ...{p: o}',

            // All non-simple cases combined.
            'x, d = 123, [a], {p: 0}, ...rest',

            // Misc
            'a, {b}',
            '{}',
            '[]',
            '[{}]',
            '{a}',
            'a, {b}',
            'a, b, {c, d, e}',
            'a = b',
            'a, b, c = 1',
            '...args',
            'a, b, ...rest',
            '[a, b, ...rest]',
            '{ a = {} }',
            '{ a } = { b: true }',
        ];

        for (const arg of invalidSyntax) {
            it(`function f(${arg}) { "use strict"; }`, () => {
                t.throws(() => {
                    parseSource(`function f(${arg}) { "use strict"; }`, undefined, Context.Empty);
                });
            });

            it(`void function(${arg}) { "use strict"; };`, () => {
                t.throws(() => {
                    parseSource(`void function(${arg}) { "use strict"; };`, undefined, Context.Empty);
                });
            });

            it(`function* g(${arg}) { "use strict"; }`, () => {
                t.throws(() => {
                    parseSource(`function* g(${arg}) { "use strict"; }`, undefined, Context.Empty);
                });
            });

            it(`async function g(${arg}) { "use strict"; }`, () => {
                t.throws(() => {
                    parseSource(`async function g(${arg}) { "use strict"; }`, undefined, Context.Empty);
                });
            });

            it(`(class { constructor(${arg}) { "use strict"; } });`, () => {
                t.throws(() => {
                    parseSource(`(class { constructor(${arg}) { "use strict"; } });`, undefined, Context.Empty);
                });
            });

            it(`(${arg}) => { "use strict"; };`, () => {
                t.throws(() => {
                    parseSource(`(${arg}) => { "use strict"; };`, undefined, Context.Empty);
                });
            });

            it(`({ get m(${arg}) { "use strict"; } });`, () => {
                t.throws(() => {
                    parseSource(`({ get m(${arg}) { "use strict"; } });`, undefined, Context.Empty);
                });
            });

            it(`class C { async m(${arg}) { "use strict"; } }`, () => {
                t.throws(() => {
                    parseSource(`class C { async m(${arg}) { "use strict"; } }`, undefined, Context.Empty);
                });
            });

            it(`({ async set m(${arg}) { "use strict"; } });`, () => {
                t.throws(() => {
                    parseSource(`({ async set m(${arg}) { "use strict"; } });`, undefined, Context.Empty);
                });
            });

            it(`({ set m(${arg}) { "use strict"; } });`, () => {
                t.throws(() => {
                    parseSource(`({ set m(${arg}) { "use strict"; } });`, undefined, Context.Empty);
                });
            });

            it(`class C { *m(${arg}) { "use strict"; } }`, () => {
                t.throws(() => {
                    parseSource(`class C { *m(${arg}) { "use strict"; } }`, undefined, Context.Empty);
                });
            });
        }

        fail(`function a([ option1, option2 ] = []) {  "use strict"; }`, Context.Empty, {
            source: 'function a([ option1, option2 ] = []) {  "use strict"; }',
        });

        fail(`function foo(a=2) { "use strict"; }`, Context.Empty, {
            source: 'function foo(a=2) { "use strict"; }',
        });

        fail(`function foo({a}) { "use strict"; }`, Context.Empty, {
            source: 'function foo({a}) { "use strict"; }',
        });

        fail(`function foo([a]) { "use strict"; }`, Context.Empty, {
            source: 'function foo([a]) { "use strict"; }',
        });

        fail(`function foo({a}) { "use strict"; }`, Context.Empty, {
            source: 'function foo({a}) { "use strict"; }',
        });

        fail(`({a}) => { "use strict"; }`, Context.Strict | Context.Module, {
          source: '({a}) => { "use strict"; }',
        });

        fail(`function a([ option1, option2 ]) { "use strict"; }`, Context.Empty, {
            source: 'function a([ option1, option2 ]) { "use strict"; }',
        });

        fail(`function a(options = {}) { "use strict"; }`, Context.Empty, {
            source: 'function a(options = {}) { "use strict"; }',
        });

        fail(`function a(...options) { "use strict"; }`, Context.Empty, {
            source: 'function a(...options) { "use strict"; }',
        });

        fail(`var a = async (options = {}) => { "use strict"; }`, Context.Empty, {
           source: 'var a = async (...args) => { "use strict"; }',
        });

        fail(`var a = async ([{}]) => { "use strict"; }`, Context.Empty, {
            source: 'var a = async ([{}]) => { "use strict"; }',
         });

        fail(`var a = async (x, ...[a]) => { "use strict"; }`, Context.Empty, {
            source: 'var a = async (x, ...[a]) => { "use strict"; }',
         });

        fail(`var a = async ({o = 0}) => { "use strict"; }`, Context.Empty, {
            source: 'var a = async ({o = 0}) => { "use strict"; }',
         });
    });
});
