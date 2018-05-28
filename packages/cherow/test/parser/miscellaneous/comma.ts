import { fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Failure', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    const invalidSyntax = [
        ',',
        ',,',
        ',,,',
        'ice,',
        'ice, fapper,,,',
        'function ("foo",") {}',
        ' function  a(b,,) {}',
        ' function* a(b,,) {}',
        '(function  a(b,,) {});',
        '(function* a(b,,) {});',
        '(function   (b,,) {});',
        '(function*  (b,,) {});',
        ' function  a(b,c,d,,) {}',
        ' function* a(b,c,d,,) {}',
        '(function  a(b,c,d,,) {});',
        '(function* a(b,c,d,,) {});',
        '(function   (b,c,d,,) {});',
        '(function*  (b,c,d,,) {});',
        '(b,,) => {};',
        '(b,c,d,,) => {};',
        'a(1,,);',
        'a(1,2,3,,);',
        ' function  a1(,) {}',
        ' function* a2(,) {}',
        '(function  a3(,) {});',
        '(function* a4(,) {});',
        '(function    (,) {});',
        '(function*   (,) {});',
        '(,) => {};',
        'a1(,);',
        ' function  a(...b,) {}',
        ' function* a(...b,) {}',
        '(function  a(...b,) {});',
        '(function* a(...b,) {});',
        '(function   (...b,) {});',
        '(function*  (...b,) {});',
        ' function  a(b, c, ...d,) {}',
        ' function* a(b, c, ...d,) {}',
        '(function  a(b, c, ...d,) {});',
        '(function* a(b, c, ...d,) {});',
        '(function   (b, c, ...d,) {});',
        '(function*  (b, c, ...d,) {});',
        'class A {foo(,) {}}',
        'class A {static foo(,) {}}',
        '(class {static foo(,) {}})',
        '(...b,) => {};',
        '(b, c, ...d,) => {};',
        '(,);',
        '(a,);',
        '(a,b,c,);',
        'n, op, val,',
        'foo(a,,) => 0',
        'async (a,,) => 0',
        'foo (,) => 0',
        ', => 0',
        ', () => 0',
        'async (,) => 0',
    ];

    for (const arg of invalidSyntax) {

        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });

        it(`"use strict"; ${arg}`, () => {
            t.throws(() => {
                parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
            });
        });

        it(`function foo() {${arg}}`, () => {
            t.throws(() => {
                parseSource(`function foo() {${arg}}`, undefined, Context.Empty);
            });
        });

        it(`function foo() {${arg}}`, () => {
            t.throws(() => {
                parseSource(`function foo() {${arg}}`, undefined, Context.Strict | Context.Module);
            });
        });

        it(`function foo() {'use strict'; ${arg}}`, () => {
            t.throws(() => {
                parseSource(`function foo() {'use strict'; ${arg}}`, undefined, Context.Empty);
            });
        });
    }

    // Comma is not permitted after the rest element
    const invalidRest = [
        'function foo(...a,) { }',
        '(function(...a,) { })',
        '(...a,) => a',
        'async (...a,) => a',
        '({foo(...a,) {}})',
        'class A {foo(...a,) {}}',
        'class A {static foo(...a,) {}}',
        '(class {foo(...a,) {}})',
        '(class {static foo(...a,) {}})',
    ];

    for (const arg of invalidRest) {

        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });

        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
            });
        });
    }

    fail('export default function foo(,) { }', Context.Strict | Context.Module, {
        source: 'export default function foo(,) { }',
    });

    fail('export default (function foo(,) { })', Context.Strict | Context.Module, {
        source: 'export default (function foo(,) { })',
    });

    fail('export default (function foo(...a,) { })', Context.Strict | Context.Module, {
        source: 'export default (function foo(...a,) { })',
    });

    fail('export function foo(...a,) { }', Context.Strict | Context.Module, {
        source: 'export function foo(...a,) { }',
    });
});

describe('Pass', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    const validSyntax = [
        ' function  a(b,) {}',
        ' function* a(b,) {}',
        '(function  a(b,) {});',
        '(function* a(b,) {});',
        '(function   (b,) {});',
        '(function*  (b,) {});',
        ' function  a(b,c,d,) {}',
        ' function* a(b,c,d,) {}',
        '(function  a(b,c,d,) {});',
        '(function* a(b,c,d,) {});',
        '(function   (b,c,d,) {});',
        '(function*  (b,c,d,) {});',
        'class Foo { bar(a,) { } }',
        '(1, y)',
        '0, f(n - 1);',
        '(b,) => {};',
        '(b,c,d,) => {};',
        'a(1,);',
        'a(1,2,3,);',
        'a(...[],);',
        'a(1, 2, ...[],);',
        'a(...[], 2, ...[],);',
        'a, b => 0',
        'a, b, (c, d) => 0',
        '(a, b, (c, d) => 0)',
        '(a, b) => 0, (c, d) => 1',
        '(a, b => {}, a => a + 1)',
        '((a, b) => {}, (a => a + 1))',
        '(a, (a, (b, c) => 0))',
        'async (a, (a, (b, c) => 0))',
        '[...a,]',
        '[...a, ,]',
        '[, ...a]',
        '[...[...a]]',
        '[, ...a]',
        '[, , ...a]',
    ];

    for (const arg of validSyntax) {

        it(`${arg}`, () => {
            t.doesNotThrow(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });

        it(`"use strict"; ${arg}`, () => {
            t.doesNotThrow(() => {
                parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
            });
        });

        it(`function foo() {${arg}}`, () => {
            t.doesNotThrow(() => {
                parseSource(`function foo() {${arg}}`, undefined, Context.Empty);
            });
        });

        it(`function foo() {'use strict'; ${arg}}`, () => {
            t.doesNotThrow(() => {
                parseSource(`function foo() {'use strict'; ${arg}}`, undefined, Context.Empty);
            });
        });
    }
});
