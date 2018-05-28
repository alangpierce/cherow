import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Arrows', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {
        const early_errors = [
            '"use strict"; let => 1',
            '"use strict"; (enum => 1)',
            '"use strict"; (eval => 1)',
            '"use strict"; (arguments => 1)',
            '"use strict"; (package => 1)',
            '"use strict"; (switch => 1)',
            '"use strict"; (arguments => 1)',
            '"use strict"; yield => { 0 }',
            '"use strict"; eval => { 0 }',
            '"use strict"; arguments => { 0 }',
            '(...x => x)',
            '"use strict"; (yield => x)',
            '"use strict"; var foo = (yield) => 1',
            `var af = x
        => {}`,
            'var f = (a = 0) => { "use strict"; };',
        ];

        for (const arg of early_errors) {

            it(`${arg};`, () => {
                t.throws(() => {
                    parseSource(`${arg};`, undefined, Context.Empty);
                });
            });
        }

        // Testing yield in arrow formal list
        const invalidYieldInArrowParamList = [
            'x=yield',
            'x, y=yield',
            '{x=yield}',
            '[x=yield]',
            'x=(yield)',
            'x, y=(yield)',
            '{x=(yield)}',
            '[x=(yield)]',
            'x=f(yield)',
            'x, y=f(yield)',
            '{x=f(yield)}',
            '[x=f(yield)]',
            '{x}=yield',
            '[x]=yield',
            '{x}=(yield)',
            '[x]=(yield)',
            '{x}=f(yield)',
            '[x]=f(yield)',
        ];
        for (const arg of invalidYieldInArrowParamList) {

            it(`(function *g(z = ( ${arg} ) => {}) { });`, () => {
                t.throws(() => {
                    parseSource(`(function *g(z = ( ${arg} ) => {}) { });`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; (function *g(z = ( ${arg} ) => {}) { });`, () => {
                t.throws(() => {
                    parseSource(`"use strict"; (function *g(z = ( ${arg} ) => {}) { });`, undefined, Context.Empty);
                });
            });

            it(`(function *g(z = ( ${arg} ) => {}) { });`, () => {
                t.throws(() => {
                    parseSource(`(function *g(z = ( ${arg} ) => {}) { });`, undefined, Context.Strict | Context.Module);
                });
            });
        }
        const ArrowFunctionASIErrors = [
            '(a\n=> a)(1)',
            '(a/*\n*/=> a)(1)',
            '((a)\n=> a)(1)',
            '((a)/*\n*/=> a)(1)',
            '((a, b)\n=> a + b)(1, 2)',
            '((a, b)/*\n*/=> a + b)(1, 2)',
        ];

        for (const arg of ArrowFunctionASIErrors) {

            it(`${arg};`, () => {
                t.throws(() => {
                    parseSource(`"use strict"; ${arg};`, undefined, Context.Empty);
                });
            });
        }

        const invalidFormalParameters = [
            '?c:d=>{}',
            '=c=>{}',
            '()',
            '(c)',
            '[1]',
            '[c]',
            '.c',
            '-c',
            '+c',
            'c++',
            '`c`',
            '`${c}`',
            '`template-head${c}`',
            '`${c}template-tail`',
            '`template-head${c}template-tail`',
            '`${c}template-tail`',
        ];

        for (const arg of invalidFormalParameters) {

            it(`()${arg} =>{}`, () => {
                t.throws(() => {
                    parseSource(`()${arg} =>{}`, undefined, Context.Empty);
                });
            });

            it(`()${arg} =>{}:`, () => {
                t.throws(() => {
                    parseSource(`()${arg} =>{};`, undefined, Context.Empty);
                });
            });

            it(`var x = ()${arg} =>{}`, () => {
                t.throws(() => {
                    parseSource(`var x = ()${arg} =>{}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; var x = ()${arg} =>{}`, () => {
                t.throws(() => {
                    parseSource(`"use strict"; var x = ()${arg} =>{}`, undefined, Context.Empty);
                });
            });

            it(`(...a)${arg} =>{}`, () => {
                t.throws(() => {
                    parseSource(`(...a)${arg} =>{}`, undefined, Context.Empty);
                });
            });

            it(`var x = (...a)${arg};`, () => {
                t.throws(() => {
                    parseSource(`var x = (...a)${arg} =>{}`, undefined, Context.Empty);
                });
            });

            it(`(a,b)${arg};`, () => {
                t.throws(() => {
                    parseSource(`(a,b)${arg} =>{}`, undefined, Context.Empty);
                });
            });

            it(`var x = (a,b)${arg};`, () => {
                t.throws(() => {
                    parseSource(`var x = (a,b)${arg} =>{}`, undefined, Context.Empty);
                });
            });

            it(`(a,...b)${arg};`, () => {
                t.throws(() => {
                    parseSource(`(a,...b)${arg} =>{}`, undefined, Context.Empty);
                });
            });

            it(`var x = (a,...b)${arg};`, () => {
                t.throws(() => {
                    parseSource(`var x = (a,...b)${arg} =>{}`, undefined, Context.Empty);
                });
            });
        }

        const invalidSyntax = [
            '=> 0',
            '=>',
            '() =>',
            '=> {}',
            ') => {}',
            ', => {}',
            '(,) => {}',
            'return => {}',
            '() => {\'value\': 42}',
            ')',
            ') => 0',
            'foo[()]',
            '()',
            '(()) => 0',
            '((x)) => 0',
            '((x, y)) => 0',
            '(x, (y)) => 0',
            '((x, y, z)) => 0',
            '(x, (y, z)) => 0',
            '((x, y), z) => 0',
            '(a => a) +',
            'eval => { \'use strict\'; 0 }',
            'arguments => { \'use strict\'; 0 }',
            'yield => { \'use strict\'; 0 }',
            'interface => { \'use strict\'; 0 }',
            'a => (b => (a + b)',
            `([[[[[[[[[[[[[[[[[[[[{a:b[0]}]]]]]]]]]]]]]]]]]]]])=>0;`,
            `bar ? (=> 0) : baz;`,
            `() => {} 1`,
            `() => {} a`,
            `() => {} a()`,
            `() => {} 1`,
            `((x, y)) => 0`,
            `(x, (y)) => 0`,
            `((x, y, z)) => 0`,
            `((x, y), z) => 0`,
            `(eval = 10) => { "use strict"; }`,
            `arguments => { 'use strict'; 0 }`,
            `(interface) => { 'use strict'; 0 }`,
            `32 => {}`,
            `(32) => {}`,
            `if => {}`,
            `a++ => {}`,
            `(a, b++) => {}`,
            `(a, foo ? bar : baz) => {}`,
            `(a.b, c) => {}`,
            `(a['b'], c) => {}`,
            `"use strict"; (eval, a) => 42;`,
            `"use strict"; (a, eval) => 42;`,
            `"use strict"; (a, arguments) => 42;`,
            `(a, (b)) => 42;`,
            `({get a(){}}) => 0;`,
            `({a:b[0]})=>0`,
            `({}=>0)`,
            `(a['b'], c) => {}`,
            `(...a = b) => b`,
            `(-a) => {}`,
            `(...rest - a) => b`,
            `(a, ...b - 10) => b`,
            `((x, y), z) => 0`,
            `"use strict"; var af = package => 1;`,
            `((a = 0) => { "use strict"; })`,
            `"use strict"; var af = (eval) => 1;`,
            '(a\n=> a)(1)',
            '(a/*\n*/=> a)(1)',
            '((a)\n=> a)(1)',
            '((a)/*\n*/=> a)(1)',
            '((a, b)\n=> a + b)(1, 2)',
            '((a, b)/*\n*/=> a + b)(1, 2)',
            `[]=>0`,
            `() ? 0`,
            `(a)\n=> 0`,
            `1 + ()`,
            `(a,...a)/*\u2028*/ => 0`,
            `(a,...a)\n`,
            `() <= 0`,
            `(a,...a)/*\u202a*/`,
            `(a,...a)/*\n*/ => 0`,
            `left = (aSize.width/2) - ()`,
            `(10) => 0;`,
            `"use strict"; (a) => 00;`,
            'eval => { \'use strict\'; 0 }',
            'arguments => { \'use strict\'; 0 }',
            'yield => { \'use strict\'; 0 }',
            'interface => { \'use strict\'; 0 }',
            '(eval) => { \'use strict\'; 0 }',
            '(arguments) => { \'use strict\'; 0 }',
            '(yield) => { \'use strict\'; 0 }',
            '(interface) => { \'use strict\'; 0 }',
            '(eval, bar) => { \'use strict\'; 0 }',
            '(bar, eval) => { \'use strict\'; 0 }',
            '(bar, arguments) => { \'use strict\'; 0 }',
            '(bar, yield) => { \'use strict\'; 0 }',
            '(bar, interface) => { \'use strict\'; 0 }',
            '(interface, icefapper) => { \'use strict\'; 0 }',
            '(bar, interface) => { \'use strict\'; 0 }',
            '32 => {}',
            '(32) => {}',
            '(a, 32) => {}',
            'if => {}',
            '(if) => {}',
            '(a, if) => {}',
            'a + b => {}',
            '(a + b) => {}',
            '(a + b, c) => {}',
            '(a, b - c) => {}',
            '"a" => {}',
            '("a") => {}',
            '("a", b) => {}',
            '(a, "b") => {}',
            '-a => {}',
            '(-a) => {}',
            '(-a, b) => {}',
            '(a, -b) => {}',
            '{} => {}',
            'a++ => {}',
            '(a++) => {}',
            '(a++, b) => {}',
            '(a, b++) => {}',
            '[] => {}',
            '(foo ? bar : baz) => {}',
            '(a, foo ? bar : baz) => {}',
            '(foo ? bar : baz, a) => {}',
            '(a.b, c) => {}',
            '(c, a.b) => {}',
            '(a[\'b\'], c) => {}',
            '(c, a[\'b\']) => {}',
            '(...a = b) => b',
            '(...rest - a) => b',
            '(a, ...b - 10) => b',
            '(..a, ...b) => c',
            '"use strict"; (arguments) => c',
        ];

        for (const arg of invalidSyntax) {

            it(`${arg};`, () => {
                t.throws(() => {
                    parseSource(`${arg};`, undefined, Context.Empty);
                });
            });

            it(`bar ? (${arg}) : baz;`, () => {
                t.throws(() => {
                    parseSource(`bar ? (${arg}) : baz;`, undefined, Context.Empty);
                });
            });

            it(`bar ? baz : (${arg});`, () => {
                t.throws(() => {
                    parseSource(`bar ? baz : (${arg});`, undefined, Context.Empty);
                });
            });

            it(`bar[${arg}];`, () => {
                t.throws(() => {
                    parseSource(`bar[${arg}];`, undefined, Context.Empty);
                });
            });

            it(`${arg}, bar;`, () => {
                t.throws(() => {
                    parseSource(`${arg}, bar;`, undefined, Context.Empty);
                });
            });
        }

        fail('(function *g(z = ( x=yield) => {}) { });', Context.Empty, {
            source: '(function *g(z = ( x=yield) => {}) { });',
        });

        fail('(function *g(z = ([x=(yield)]) => {}) { });', Context.Empty, {
            source: '(function *g(z = ( [x=(yield)]) => {}) { });',
        });

        fail(`var f = {x} => {};`, Context.Empty, {
            source: `var f = {x} => {};`,
        });

        fail(`var f = {x,y} => {};`, Context.Empty, {
            source: `var f = {x,y} => {};`,
        });

        fail('f = ([...x, y] = [1, 2, 3]) => {};', Context.Empty, {
            source: 'f = ([...x, y] = [1, 2, 3]) => {};',
        });

        fail('f = ([...[ x ] = []] = []) => {};', Context.Empty, {
            source: 'f = ([...[ x ] = []] = []) => {};',
        });

        fail('f = ([...[x], y] = [1, 2, 3]) => {};', Context.Empty, {
            source: 'f = ([...[x], y] = [1, 2, 3]) => {};',
        });

        fail('f = ([...{ x }, y]) => {};', Context.Empty, {
            source: 'f = ([...{ x }, y]) => {};',
        });

        fail('f = ([...{ x }, y]) => {};', Context.Empty, {
            source: 'f = ([...{ x }, y]) => {};',
        });

        fail('1 + ()', Context.Empty, {
            source: '1 + ()',
        });

        fail('((x)) => a', Context.Empty, {
            source: '((x)) => a',
        });

        fail('var af = enum => 1;', Context.Empty, {
            source: 'var af = enum => 1;',
        });

        fail('(x, (y, z)) => a', Context.Empty, {
            source: '(x, (y, z)) => a',
        });

        fail('((x, y), z) => a', Context.Empty, {
            source: '((x, y), z) =>  a',
        });

        fail('f = ([...{ x } = []]) => {};', Context.Empty, {
            source: 'f = ([...{ x } = []]) => {};',
        });

        fail('"use strict"; (function *g(z = (x=f(yield)) => {}) { });', Context.Empty, {
            source: '"use strict"; (function *g(z = (x=f(yield)) => {}) { });',
        });

        fail('"use strict"; (function *g(z = ([x=f(yield)]) => {}) { });', Context.Empty, {
            source: '"use strict"; (function *g(z = ([x=f(yield)]) => {}) { });',
        });

        fail('(function *g([x = class extends (a ? null : yield) { }] = [null]) { });', Context.Empty, {
            source: '(function *g([x = class extends (a ? null : yield) { }] = [null]) { });',
        });

        fail('(function *g(x = class { [y = (yield, 1)]() { } }) { });', Context.Empty, {
            source: '(function *g(x = class { [y = (yield, 1)]() { } }) { });',
        });

        fail('(function *g(x = class extends (yield) { }) { });', Context.Empty, {
            source: '(function *g(x = class extends (yield) { }) { });',
        });

        fail('"use strict"; (function *g(z = ({x}=f(yield)) => {}) { });', Context.Empty, {
            source: '"use strict"; (function *g(z = ({x}=f(yield)) => {}) { });',
        });

        fail('()=c=>{}=>{}', Context.Empty, {
            source: '()=c=>{}=>{}',
        });

        fail('()[1]=>{}', Context.Empty, {
            source: '()[1]=>{}',
        });

        fail('()c++=>{}', Context.Empty, {
            source: '()c++=>{}',
        });

        fail('()-c=>{}', Context.Empty, {
            source: '()-c=>{}',
        });

        fail('(a,b)(c)=>{}', Context.Empty, {
            source: '(a,b)(c)=>{}',
        });

        fail('(a,...b)[c]=>{}', Context.Empty, {
            source: '(a,...b)[c]=>{}',
        });

        fail('=> 0', Context.Empty, {
            source: '=> 0',
        });

        fail('=>', Context.Empty, {
            source: '=>',
        });

        fail('() =>', Context.Empty, {
            source: '() =>',
        });

        fail('=> {}', Context.Empty, {
            source: '=> {}',
        });

        fail(') => {}', Context.Empty, {
            source: ') => {}',
        });

        fail(', => {}', Context.Empty, {
            source: ', => {}',
        });

        fail('(,) => {}', Context.Empty, {
            source: '(,) => {}',
        });

        fail('() => {"value": 42}', Context.Empty, {
            source: '() => {"value": 42}',
        });

        fail(')', Context.Empty, {
            source: ')',
        });

        fail(') => 0', Context.Empty, {
            source: ') => 0',
        });

        fail('foo[()]', Context.Empty, {
            source: 'foo[()]',
        });

        fail('(()) => 0', Context.Empty, {
            source: '(()) => 0',
        });

        fail('((x)) => 0', Context.Empty, {
            source: '((x)) => 0',
        });

        fail('((x, y)) => 0', Context.Empty, {
            source: '((x, y)) => 0',
        });

        fail('(x, (y)) => 0', Context.Empty, {
            source: '(x, (y)) => 0',
        });

        fail('((x, y, z)) => 0', Context.Empty, {
            source: '((x, y, z)) => 0',
        });

        fail('(x, (y, z)) => 0', Context.Empty, {
            source: '(x, (y, z)) => 0',
        });

        fail('((x, y), z) => 0', Context.Empty, {
            source: '((x, y), z) => 0',
        });

        fail('yield => { "use strict"; 0 }', Context.Strict, {
            source: 'yield => { "use strict"; 0 }',
        });

        fail('interface  => { "use strict"; 0 }', Context.Empty, {
            source: 'interface  => { "use strict"; 0 }',
        });

        fail('32 => {}', Context.Empty, {
            source: '32 => {}',
        });

        fail('(a, if) => {}', Context.Empty, {
            source: '(a, if) => {}',
        });

        fail('a + b => {}', Context.Empty, {
            source: 'a + b => {}',
        });

        fail('(a + b) => {}', Context.Empty, {
            source: '(a + b) => {}',
        });

        fail('(a + b, c) => {}', Context.Empty, {
            source: '(a + b, c) => {}',
        });

        fail('(a, b - c) => {}', Context.Empty, {
            source: '(a, b - c) => {}',
        });

        fail('"a" => {}', Context.Empty, {
            source: '"a" => {}',
        });

        fail('-a => {}', Context.Empty, {
            source: '-a => {}',
        });

        fail('(-a) => {}', Context.Empty, {
            source: '(-a) => {}',
        });

        fail('(-a, b) => {}', Context.Empty, {
            source: '(-a, b) => {}',
        });

        fail('(a, -b) => {}', Context.Empty, {
            source: '(a, -b) => {}',
        });

        fail('((x, y, z)) => 0', Context.Empty, {
            source: '((x, y, z)) => 0',
        });

        fail('{} => {}', Context.Empty, {
            source: '{} => {}',
        });

        fail('a++ => {}', Context.Empty, {
            source: 'a++ => {}',
        });

        fail('(a++) => {}', Context.Empty, {
            source: '(a++) => {}',
        });

        fail('(a++, b) => {}', Context.Empty, {
            source: '(a++, b) => {}',
        });

        fail('(a, b++) => {}', Context.Empty, {
            source: '(a, b++) => {}',
        });

        fail('(foo ? bar : baz) => {}', Context.Empty, {
            source: '(foo ? bar : baz) => {}',
        });

        fail('(a, foo ? bar : baz) => {}', Context.Empty, {
            source: '(a, foo ? bar : baz) => {}',
        });

        fail('(foo ? bar : baz, a) => {}', Context.Empty, {
            source: '(foo ? bar : baz, a) => {}',
        });

        fail('(a.b, c) => {}', Context.Empty, {
            source: '(a.b, c) => {}',
        });

        fail('(c, a.b) => {}', Context.Empty, {
            source: '(c, a.b) => {}',
        });

        fail('(a["b"], c) => {}', Context.Empty, {
            source: '(a["b"], c) => {}',
        });

        fail('(c, a["b"]) => {}', Context.Empty, {
            source: '(c, a["b"]) => {}',
        });

        fail('(...a = b) => b', Context.Empty, {
            source: '(...a = b) => b',
        });

        fail('(...rest - a) => b', Context.Empty, {
            source: '(...rest - a) => b',
        });

        fail('(a, ...b - 10) => b', Context.Empty, {
            source: '(a, ...b - 10) => b',
        });

        fail('bar ? (=> 0) : baz;', Context.Empty, {
            source: 'bar ? (=> 0) : baz;',
        });

        fail('[..., ...]', Context.Empty, {
            source: '[..., ...]',
        });

        fail('() => {}a', Context.Empty, {
            source: '() => {}a',
        });

        fail('(localVar |= defaultValue) => {}', Context.Empty, {
            source: '(localVar |= defaultValue) => {}',
        });

        fail('() => {} 1', Context.Empty, {
            source: '() => {} 1',
        });

        fail('() => {} a()', Context.Empty, {
            source: '() => {} a()',
        });

        fail('(()) => 0;', Context.Empty, {
            source: '(()) => 0;',
        });

        fail('(x, (y)) => 0', Context.Empty, {
            source: '(x, (y)) => 0',
        });

        fail('((x, y, z)) => 0', Context.Empty, {
            source: '((x, y, z)) => 0',
        });

        fail('32 => {}', Context.Empty, {
            source: '32 => {}',
        });

        fail('(32) => {}', Context.Empty, {
            source: '(32) => {}',
        });

        fail('(a, foo ? bar : baz) => {}', Context.Empty, {
            source: '(a, foo ? bar : baz) => {}',
        });

        fail('(a.b, c) => {}', Context.Empty, {
            source: '(a.b, c) => {}',
        });

        fail('(a["b"], c) => {}', Context.Empty, {
            source: '(a["b"], c) => {}',
        });

        fail('(a, (b)) => 42;', Context.Empty, {
            source: '(a, (b)) => 42;',
        });

        fail('({get a(){}}) => 0;', Context.Empty, {
            source: '({get a(){}}) => 0;',
        });

        fail('({a:b[0]})=>0', Context.Empty, {
            source: '({a:b[0]})=>0',
        });

        fail('({}=>0)', Context.Empty, {
            source: '({}=>0)',
        });

        fail('(...a = b) => b', Context.Empty, {
            source: '(...a = b) => b',
        });

        fail('(-a) => {}', Context.Empty, {
            source: '(-a) => {}',
        });

        fail('(...rest - a) => b', Context.Empty, {
            source: '(...rest - a) => b',
        });

        fail('((x, y), z) => 0', Context.Empty, {
            source: '((x, y), z) => 0',
        });

        fail('(a\n=> a)(1)', Context.Empty, {
            source: '(a\n=> a)(1)',
        });

        fail('[]=>0', Context.Empty, {
            source: '[]=>0',
        });

        fail('(a,...a)/*\u2028*/ => 0', Context.Empty, {
            source: '(a,...a)/*\u2028*/ => 0',
        });

        fail('((a),...a) => 1', Context.Empty, {
            source: '((a),...a) => 1',
        });

        fail('() <= 0', Context.Empty, {
            source: '() <= 0',
        });

        fail('left = (aSize.width/2) - ()', Context.Empty, {
            source: 'left = (aSize.width/2) - ()',
        });

        fail('var f = {x,y} => {};', Context.Empty, {
            source: 'var f = {x,y} => {};',
        });

    });

    describe('Pass', () => {
        const fuckingsIcefapper = [
            `const a = () => {return (3, 4);};`,
            `"use strict";
((one, two) => {});`,
            `([])=>0;`,
            `([a,...b])=>0;`,
            `([a,b])=>0;`,
            `([a]) => [0];`,
            `({a,b=b,a:c,[a]:[d]})=>0;`,
            `(() => {}) || true;
(() => {}) ? a : b;`,
            '(() => {}) + 2',
            'new (() => {});',
            'bar ? ( (x) => x ) : baz;',
            'bar ? ( (x, y) => (u, v) => x*u + y*v ) : baz;',
            'bar ? ( (a, b) => 0, (c, d) => 1 ) : baz;',
            'bar ? ( (a, (a, (b, c) => 0)) ) : baz;',
            'bar ? ( foo ? bar : baz => {} ) : baz;',
            'bar ? ( (a, {}) => {} ) : baz;',
            'bar ? ( (x, y = 9) => {} ) : baz;',
            'bar ? ( (...a) => {} ) : baz;',
            'bar ? ( ([x] = []) => {} ) : baz;',
            'bar ? ( (x = 9, ...a) => {} ) : baz;',
            '(x, y = 9, {b}, z = 8, ...a) => {}',
            '(x = 9) => {}',
            '([x = 0]) => {}',
            '(a, (a, (b, c) => 0))',
            `a => 0`,
            `() => () => 0`,
            '() => 0, 1',
            '() => 0 + 1',
            '(a,b) => 0 + 1',
            `(a,b,...c) => 0 + 1`,
            '() => (a) = 0',
            'a => b => c => 0',
            '(e) => "test"',
            '(a, ...[]) => 1',
            '(x)=>{\'use strict\';}',
            '(() => 5)() === 5;',
            '() => a + b - yield / 1',
            '(() => { try { Function("0 || () => 2")(); } catch(e) { return true; } })();',
            'var f = (function() { return z => arguments[0]; }(5));',
            '({y}) => x;',
            '([x = 10]) => x',
            '({x = 10, y: { z = 10 }}) => [x, z]',
            '({x = 10}) => x',
            `([y]) => x;`,
            '(x=1) => x * x;',
            '(eval = 10) => 42;',
            '(a, b=(c)=>{}) => {}',
            '(async function foo(a) { await a });',
            '(a,b) =>{}',
            'var x = (a,b) =>{}',
            '(a,...b) =>{}',
            'var x = (a,...b) =>{}',
            'foo((x, y) => {});',
            'e => { 42; };',
            'e => ({ property: 42 });',
            '(a, b) => { 42; };',
            '(x) => ((y, z) => (x, y, z));',
            '(a) => 00;',
            'e => "test";',
            'a =>{}',
            '(...a) =>{}',
            'var x = a =>{}',
            '(a,b) => [a]',
            '() => { value: b}',
            '(x, y) => { x.a = y; }',
            '(x, y) => x.a = y',
            'x => (y, z) => z * (x + y)',
            '(a = b, c) => {}',
            '(x, ...a) => {}',
            '({a} = {}) => {}',
            '({a} = {}) => {}',
            '(interface, eval) => {}',
            'yield => {}',
            'arguments => {}',
            '(...[]) => 0',
            '(()=>0)',
            '(()=>0)',
            '() => 0',
            '(...a) => 0',
            '([a]) => 0',
            '(() => null)();',
            '(() => {})()',
            '(...args) => console.log( args );',
            'var double = (x) => x * 2',
            'let Y = F => (x=>F(y=>(x(x))(y)))(x=>F(y=>(x(x))(y)))',
            'factorial = x =>  x < 1 ? 1 : x * factorial(x-1)',
            'a => (a + 1)',
            `var foo = ({ name }) => \`\${name}! Hello \${name}!\`.toUpperCase();`,
            'const sum = ( ...nums ) => nums.reduce( ( t, n ) => t + n, 0 );',
            `'use strict';
			       setTimeout( () => console.log( this ) );
			        function foo () {
				      'use strict';
				      setTimeout( () => console.log( this ) );
			      }`,

        ];
        for (const arg of fuckingsIcefapper) {

            it(`${arg};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg};`, undefined, Context.Empty);
                });
            });
        }

        const validSyntax = [
            '() => {}',
            '() => { return 42 }',
            'x => { return x; }',
            '(x) => { return x; }',
            '(x, y) => { return x + y; }',
            '(x, y, z) => { return x + y + z; }',
            '(x, y) => { x.a = y; }',
            '() => 42',
            'x => x',
            'x => x * x',
            '(x) => x',
            '(x) => x * x',
            '(x, y) => x + y',
            '(x, y, z) => x, y, z',
            '(x, y) => x.a = y',
            `(a, b, ...rest) => body`,
            '() => ({\'value\': 42})',
            'f = ([...[x, y, z]]) => {}',
            'f = ([...{ 0: v, 1: w, 2: x, 3: y, length: z }]) => {}',
            'f = ([x, y, z] = [1, 2, 3]) => {}',
            'f = ([x = 23] = []) => {}',
            'f = ([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }]) => {}',
            'f = ({ w: [x, y, z] = [4, 5, 6] }) => {}',
            'f = ({ x: [y], }) => {}',
            'ref = (a, b,) => {}',
            'f = ({ x: y }) => {}',
            'f = ({ w: [x, y, z] = [4, 5, 6] }) => {}',
            'f = ({ a = (function () {}), b = (0, function() {})  }) => {}',
            'f = ({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: null }) => {}',
            'f = ({ x, } = { x: 23 }) => {}',
            'f = ([{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]) => {}',
            'f = ([[] = function() { initCount += 1; }()] = [[23]]) => {}',
            'f = ([x = 23]) => {}',
            'f = ([ , , ...x] = [1, 2, 3, 4, 5]) => {}',
            'f = ([{ x }] = [null]) => {}',
            'x => y => x + y',
            '(x, y) => (u, v) => x*u + y*v',
            '(x, y) => z => z * (x + y)',
            'x => (y, z) => z * (x + y)',
            'a, b => 0',
            'a, b, (c, d) => 0',
            '(a, b, (c, d) => 0)',
            '(a, b) => 0, (c, d) => 1',
            '(a, b => {}, a => a + 1)',
            '((a, b) => {}, (a => a + 1))',
            '(a, (a, (b, c) => 0))',
            'foo ? bar : baz => {}',
            '({}) => {}',
            '(a, {}) => {}',
            '({}, a) => {}',
            '([]) => {}',
            '(a, []) => {}',
            '([], a) => {}',
            '(a = b) => {}',
            '(a = b, c) => {}',
            '(a, b = c) => {}',
            '({a}) => {}',
            '(x = 9) => {}',
            '(x, y = 9) => {}',
            '(x = 9, y) => {}',
            '(x, y = 9, z) => {}',
            '(x, y = 9, z = 8) => {}',
            '(...a) => {}',
            '(x, ...a) => {}',
            '(x = 9, ...a) => {}',
            '(x, y = 9, ...a) => {}',
            '(x, y = 9, {b}, z = 8, ...a) => {}',
            '({a} = {}) => {}',
            '([x] = []) => {}',
            '({a = 42}) => {}',
            '([x = 0]) => {}',

        ];
        for (const arg of validSyntax) {

            it(`${arg};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg};`, undefined, Context.Empty);
                });
            });

            it(`${arg};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg};`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`bar ? (${arg}) : baz;`, () => {
                t.doesNotThrow(() => {
                    parseSource(`bar ? (${arg}) : baz;`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`bar ? baz : (${arg});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`bar ? baz : (${arg});`, undefined, Context.Empty);
                });
            });

            it(`bar, ${arg};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`bar, ${arg};`, undefined, Context.Empty);
                });
            });

            it(`${arg}, bar;`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}, bar;`, undefined, Context.Empty);
                });
            });
        }

        const ArrowFunctionsSloppyParameterNames = [
            'arguments => {}',
            'yield => {}',
            'interface => {}',
            '(eval) => {}',
            '(arguments) => {}',
            '(yield) => {}',
            '(interface) => {}',
            '(eval, bar) => {}',
            '(bar, eval) => {}',
            '(bar, arguments) => {}',
            '(bar, yield) => {}',
            '(bar, interface) => {}',
            '(interface, eval) => {}',
            '(interface, arguments) => {}',
            '(eval, interface) => {}',
            '(arguments, interface) => {}',
        ];
        for (const arg of ArrowFunctionsSloppyParameterNames) {

            it(`${arg};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg};`, undefined, Context.Empty);
                });
            });

            it(`bar ? (${arg}) : baz;`, () => {
                t.doesNotThrow(() => {
                    parseSource(`bar ? (${arg}) : baz;`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`bar ? baz : (${arg});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`bar ? baz : (${arg});`, undefined, Context.Empty);
                });
            });

            it(`bar, ${arg};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`bar, ${arg};`, undefined, Context.Empty);
                });
            });

            it(`${arg}, bar;`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}, bar;`, undefined, Context.Empty);
                });
            });
        }

        const validArrowWithYieldParam = [
            'yield => {}',
            '(yield) => {}',
            '(a, yield) => {}',
            '(yield, a) => {}',
            '(yield, ...a) => {}',
            '(a, ...yield) => {}',
            '([yield]) => {}'
        ];
        for (const arg of validArrowWithYieldParam) {

            it(`${arg};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(function f() { (${arg}); });`, undefined, Context.Empty);
                });
            });

            it(`(function *f() { (${arg}); });`, () => {
                t.throws(() => {
                    parseSource(`(function *f() { (${arg}); });`, undefined, Context.Empty);
                });
            });

            it(`(function f() { "use strict"; (${arg}); });`, () => {
                t.throws(() => {
                    parseSource(`(function f() { "use strict"; (${arg}); });`, undefined, Context.Empty);
                });
            });

            it(`(function *f() { "use strict"; (${arg}); });`, () => {
                t.throws(() => {
                    parseSource(`(function *f() { "use strict"; (${arg}); });`, undefined, Context.Empty);
                });
            });
        }
        pass(`(a) => b;  // 1 args
        (a, b) => c;  // n args
        () => b;  // 0 args
        (a) => (b) => c;  // func returns func returns func
        (a) => ((b) => c);  // So these parens are dropped
        () => (b,c) => d;  // func returns func returns func
        a=>{return b;}
        a => 'e';  // Dropping the parens`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(a) => b;  // 1 args
            (a, b) => c;  // n args
            () => b;  // 0 args
            (a) => (b) => c;  // func returns func returns func
            (a) => ((b) => c);  // So these parens are dropped
            () => (b,c) => d;  // func returns func returns func
            a=>{return b;}
            a => 'e';  // Dropping the parens`,
            expected: {
                type: 'Program',
                start: 0,
                end: 353,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 8,
                        column: 45
                    }
                },
                body: [{
                        type: 'ExpressionStatement',
                        start: 0,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        },
                        expression: {
                            type: 'ArrowFunctionExpression',
                            start: 0,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: false,
                            params: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'a'
                            }],
                            body: {
                                type: 'Identifier',
                                start: 7,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                },
                                name: 'b'
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        start: 33,
                        end: 45,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 2,
                                column: 24
                            }
                        },
                        expression: {
                            type: 'ArrowFunctionExpression',
                            start: 33,
                            end: 44,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 12
                                },
                                end: {
                                    line: 2,
                                    column: 23
                                }
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: false,
                            params: [{
                                    type: 'Identifier',
                                    start: 34,
                                    end: 35,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 13
                                        },
                                        end: {
                                            line: 2,
                                            column: 14
                                        }
                                    },
                                    name: 'a'
                                },
                                {
                                    type: 'Identifier',
                                    start: 37,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 16
                                        },
                                        end: {
                                            line: 2,
                                            column: 17
                                        }
                                    },
                                    name: 'b'
                                }
                            ],
                            body: {
                                type: 'Identifier',
                                start: 43,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 22
                                    },
                                    end: {
                                        line: 2,
                                        column: 23
                                    }
                                },
                                name: 'c'
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        start: 69,
                        end: 77,
                        loc: {
                            start: {
                                line: 3,
                                column: 12
                            },
                            end: {
                                line: 3,
                                column: 20
                            }
                        },
                        expression: {
                            type: 'ArrowFunctionExpression',
                            start: 69,
                            end: 76,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 12
                                },
                                end: {
                                    line: 3,
                                    column: 19
                                }
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: false,
                            params: [],
                            body: {
                                type: 'Identifier',
                                start: 75,
                                end: 76,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 18
                                    },
                                    end: {
                                        line: 3,
                                        column: 19
                                    }
                                },
                                name: 'b'
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        start: 101,
                        end: 117,
                        loc: {
                            start: {
                                line: 4,
                                column: 12
                            },
                            end: {
                                line: 4,
                                column: 28
                            }
                        },
                        expression: {
                            type: 'ArrowFunctionExpression',
                            start: 101,
                            end: 116,
                            loc: {
                                start: {
                                    line: 4,
                                    column: 12
                                },
                                end: {
                                    line: 4,
                                    column: 27
                                }
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: false,
                            params: [{
                                type: 'Identifier',
                                start: 102,
                                end: 103,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 13
                                    },
                                    end: {
                                        line: 4,
                                        column: 14
                                    }
                                },
                                name: 'a'
                            }],
                            body: {
                                type: 'ArrowFunctionExpression',
                                start: 108,
                                end: 116,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 19
                                    },
                                    end: {
                                        line: 4,
                                        column: 27
                                    }
                                },
                                id: null,
                                generator: false,
                                expression: true,
                                async: false,
                                params: [{
                                    type: 'Identifier',
                                    start: 109,
                                    end: 110,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 20
                                        },
                                        end: {
                                            line: 4,
                                            column: 21
                                        }
                                    },
                                    name: 'b'
                                }],
                                body: {
                                    type: 'Identifier',
                                    start: 115,
                                    end: 116,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 26
                                        },
                                        end: {
                                            line: 4,
                                            column: 27
                                        }
                                    },
                                    name: 'c'
                                }
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        start: 165,
                        end: 183,
                        loc: {
                            start: {
                                line: 5,
                                column: 12
                            },
                            end: {
                                line: 5,
                                column: 30
                            }
                        },
                        expression: {
                            type: 'ArrowFunctionExpression',
                            start: 165,
                            end: 182,
                            loc: {
                                start: {
                                    line: 5,
                                    column: 12
                                },
                                end: {
                                    line: 5,
                                    column: 29
                                }
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: false,
                            params: [{
                                type: 'Identifier',
                                start: 166,
                                end: 167,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 13
                                    },
                                    end: {
                                        line: 5,
                                        column: 14
                                    }
                                },
                                name: 'a'
                            }],
                            body: {
                                type: 'ArrowFunctionExpression',
                                start: 173,
                                end: 181,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 20
                                    },
                                    end: {
                                        line: 5,
                                        column: 28
                                    }
                                },
                                id: null,
                                generator: false,
                                expression: true,
                                async: false,
                                params: [{
                                    type: 'Identifier',
                                    start: 174,
                                    end: 175,
                                    loc: {
                                        start: {
                                            line: 5,
                                            column: 21
                                        },
                                        end: {
                                            line: 5,
                                            column: 22
                                        }
                                    },
                                    name: 'b'
                                }],
                                body: {
                                    type: 'Identifier',
                                    start: 180,
                                    end: 181,
                                    loc: {
                                        start: {
                                            line: 5,
                                            column: 27
                                        },
                                        end: {
                                            line: 5,
                                            column: 28
                                        }
                                    },
                                    name: 'c'
                                }
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        start: 228,
                        end: 245,
                        loc: {
                            start: {
                                line: 6,
                                column: 12
                            },
                            end: {
                                line: 6,
                                column: 29
                            }
                        },
                        expression: {
                            type: 'ArrowFunctionExpression',
                            start: 228,
                            end: 244,
                            loc: {
                                start: {
                                    line: 6,
                                    column: 12
                                },
                                end: {
                                    line: 6,
                                    column: 28
                                }
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: false,
                            params: [],
                            body: {
                                type: 'ArrowFunctionExpression',
                                start: 234,
                                end: 244,
                                loc: {
                                    start: {
                                        line: 6,
                                        column: 18
                                    },
                                    end: {
                                        line: 6,
                                        column: 28
                                    }
                                },
                                id: null,
                                generator: false,
                                expression: true,
                                async: false,
                                params: [{
                                        type: 'Identifier',
                                        start: 235,
                                        end: 236,
                                        loc: {
                                            start: {
                                                line: 6,
                                                column: 19
                                            },
                                            end: {
                                                line: 6,
                                                column: 20
                                            }
                                        },
                                        name: 'b'
                                    },
                                    {
                                        type: 'Identifier',
                                        start: 237,
                                        end: 238,
                                        loc: {
                                            start: {
                                                line: 6,
                                                column: 21
                                            },
                                            end: {
                                                line: 6,
                                                column: 22
                                            }
                                        },
                                        name: 'c'
                                    }
                                ],
                                body: {
                                    type: 'Identifier',
                                    start: 243,
                                    end: 244,
                                    loc: {
                                        start: {
                                            line: 6,
                                            column: 27
                                        },
                                        end: {
                                            line: 6,
                                            column: 28
                                        }
                                    },
                                    name: 'd'
                                }
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        start: 293,
                        end: 307,
                        loc: {
                            start: {
                                line: 7,
                                column: 12
                            },
                            end: {
                                line: 7,
                                column: 26
                            }
                        },
                        expression: {
                            type: 'ArrowFunctionExpression',
                            start: 293,
                            end: 307,
                            loc: {
                                start: {
                                    line: 7,
                                    column: 12
                                },
                                end: {
                                    line: 7,
                                    column: 26
                                }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [{
                                type: 'Identifier',
                                start: 293,
                                end: 294,
                                loc: {
                                    start: {
                                        line: 7,
                                        column: 12
                                    },
                                    end: {
                                        line: 7,
                                        column: 13
                                    }
                                },
                                name: 'a'
                            }],
                            body: {
                                type: 'BlockStatement',
                                start: 296,
                                end: 307,
                                loc: {
                                    start: {
                                        line: 7,
                                        column: 15
                                    },
                                    end: {
                                        line: 7,
                                        column: 26
                                    }
                                },
                                body: [{
                                    type: 'ReturnStatement',
                                    start: 297,
                                    end: 306,
                                    loc: {
                                        start: {
                                            line: 7,
                                            column: 16
                                        },
                                        end: {
                                            line: 7,
                                            column: 25
                                        }
                                    },
                                    argument: {
                                        type: 'Identifier',
                                        start: 304,
                                        end: 305,
                                        loc: {
                                            start: {
                                                line: 7,
                                                column: 23
                                            },
                                            end: {
                                                line: 7,
                                                column: 24
                                            }
                                        },
                                        name: 'b'
                                    }
                                }]
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        start: 320,
                        end: 329,
                        loc: {
                            start: {
                                line: 8,
                                column: 12
                            },
                            end: {
                                line: 8,
                                column: 21
                            }
                        },
                        expression: {
                            type: 'ArrowFunctionExpression',
                            start: 320,
                            end: 328,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 12
                                },
                                end: {
                                    line: 8,
                                    column: 20
                                }
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: false,
                            params: [{
                                type: 'Identifier',
                                start: 320,
                                end: 321,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 12
                                    },
                                    end: {
                                        line: 8,
                                        column: 13
                                    }
                                },
                                name: 'a'
                            }],
                            body: {
                                type: 'Literal',
                                start: 325,
                                end: 328,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 17
                                    },
                                    end: {
                                        line: 8,
                                        column: 20
                                    }
                                },
                                value: 'e',
                                raw: '\'e\''
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`({yield}) => {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `({yield}) => {}`,
            expected: {
                type: 'Program',
                start: 0,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'ObjectPattern',
                            start: 1,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 2,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                },
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 2,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    },
                                    name: 'yield'
                                },
                                kind: 'init',
                                value: {
                                    type: 'Identifier',
                                    start: 2,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    },
                                    name: 'yield'
                                }
                            }]
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 13,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`const b = () => {return;};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `const b = () => {return;};`,
            expected: {
                type: 'Program',
                start: 0,
                end: 26,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 26
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 6,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 6,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            },
                            name: 'b'
                        },
                        init: {
                            type: 'ArrowFunctionExpression',
                            start: 10,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                start: 16,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                },
                                body: [{
                                    type: 'ReturnStatement',
                                    start: 17,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    },
                                    argument: null
                                }]
                            }
                        }
                    }],
                    kind: 'const'
                }],
                sourceType: 'script'
            }
        });

        pass(`async (a = 1) => 0`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async (a = 1) => 0`,
            expected: {
                type: 'Program',
                start: 0,
                end: 18,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 18
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 18,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 18
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: true,
                        params: [{
                            type: 'AssignmentPattern',
                            start: 7,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            },
                            left: {
                                type: 'Identifier',
                                start: 7,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                },
                                name: 'a'
                            },
                            right: {
                                type: 'Literal',
                                start: 11,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                },
                                value: 1,
                                raw: '1'
                            }
                        }],
                        body: {
                            type: 'Literal',
                            start: 17,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            },
                            value: 0,
                            raw: '0'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`([,,])=>0`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `([,,])=>0`,
            expected: {
                type: 'Program',
                start: 0,
                end: 9,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 9,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                            type: 'ArrayPattern',
                            start: 1,
                            end: 5,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            },
                            elements: [
                                null,
                                null
                            ]
                        }],
                        body: {
                            type: 'Literal',
                            start: 8,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            },
                            value: 0,
                            raw: '0'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(( x=yield  )=>{});', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(( x=yield  )=>{});',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 15,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        },
                        params: [{
                            type: 'AssignmentPattern',
                            left: {
                                type: 'Identifier',
                                name: 'x',
                                start: 3,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                }
                            },
                            right: {
                                type: 'Identifier',
                                name: 'yield',
                                start: 5,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            },
                            start: 3,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        }],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
                        start: 1,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    },
                    start: 0,
                    end: 19,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 19
                        }
                    }
                }],
                start: 0,
                end: 19,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 19
                    }
                }
            }
        });

        pass('(( [x=yield] )=>{});', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(( [x=yield] )=>{});',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 16,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        params: [{
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    }
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'yield',
                                    start: 6,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    }
                                },
                                start: 4,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            }],
                            start: 3,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        }],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
                        start: 1,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                }],
                start: 0,
                end: 20,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 20
                    }
                }
            }
        });

        pass('(( x, y=(yield) )=>{});', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(( x, y=(yield) )=>{});',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 19,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        },
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                start: 3,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                }
                            },
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'Identifier',
                                    name: 'y',
                                    start: 6,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    }
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'yield',
                                    start: 9,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    }
                                },
                                start: 6,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                }
                            }
                        ],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
                        start: 1,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                }],
                start: 0,
                end: 23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23
                    }
                }
            }
        });

        pass('(( x, y=f(yield) )=>{});', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(( x, y=f(yield) )=>{});',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 20,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            }
                        },
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                                start: 3,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                }
                            },
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'Identifier',
                                    name: 'y',
                                    start: 6,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    }
                                },
                                right: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'f',
                                        start: 8,
                                        end: 9,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 9
                                            }
                                        }
                                    },
                                    arguments: [{
                                        type: 'Identifier',
                                        name: 'yield',
                                        start: 10,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    }],
                                    start: 8,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                },
                                start: 6,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            }
                        ],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
                        start: 1,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        }
                    },
                    start: 0,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 24
                        }
                    }
                }],
                start: 0,
                end: 24,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 24
                    }
                }
            }
        });

        pass('(( {x}=f(yield) )=>{});', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(( {x}=f(yield) )=>{});',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 19,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        },
                        params: [{
                            type: 'AssignmentPattern',
                            left: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 4,
                                        end: 5,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 4
                                            },
                                            end: {
                                                line: 1,
                                                column: 5
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 4,
                                        end: 5,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 4
                                            },
                                            end: {
                                                line: 1,
                                                column: 5
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    }
                                }],
                                start: 3,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                }
                            },
                            right: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'f',
                                    start: 7,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    }
                                },
                                arguments: [{
                                    type: 'Identifier',
                                    name: 'yield',
                                    start: 9,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    }
                                }],
                                start: 7,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                }
                            },
                            start: 3,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            }
                        }],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
                        start: 1,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                }],
                start: 0,
                end: 23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23
                    }
                }
            }
        });

        pass('(( [x]=f(yield) )=>{});', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(( [x]=f(yield) )=>{});',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 19,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        },
                        params: [{
                            type: 'AssignmentPattern',
                            left: {
                                type: 'ArrayPattern',
                                elements: [{
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    }
                                }],
                                start: 3,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                }
                            },
                            right: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'f',
                                    start: 7,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    }
                                },
                                arguments: [{
                                    type: 'Identifier',
                                    name: 'yield',
                                    start: 9,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    }
                                }],
                                start: 7,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                }
                            },
                            start: 3,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            }
                        }],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
                        start: 1,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                }],
                start: 0,
                end: 23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23
                    }
                }
            }
        });

        pass('(( {x=f(yield)} )=>{});', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(( {x=f(yield)} )=>{});',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 19,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        },
                        params: [{
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    }
                                },
                                value: {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 4,
                                        end: 5,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 4
                                            },
                                            end: {
                                                line: 1,
                                                column: 5
                                            }
                                        }
                                    },
                                    right: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'f',
                                            start: 6,
                                            end: 7,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 6
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 7
                                                }
                                            }
                                        },
                                        arguments: [{
                                            type: 'Identifier',
                                            name: 'yield',
                                            start: 8,
                                            end: 13,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 8
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 13
                                                }
                                            }
                                        }],
                                        start: 6,
                                        end: 14,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 14
                                            }
                                        }
                                    },
                                    start: 4,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: true,
                                start: 4,
                                end: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                }
                            }],
                            start: 3,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            }
                        }],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
                        start: 1,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                }],
                start: 0,
                end: 23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23
                    }
                }
            }
        });

        pass('(( x=(yield))=>{});', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(( x=(yield) )=>{});',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 16,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        params: [{
                            type: 'AssignmentPattern',
                            left: {
                                type: 'Identifier',
                                name: 'x',
                                start: 3,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                }
                            },
                            right: {
                                type: 'Identifier',
                                name: 'yield',
                                start: 6,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            },
                            start: 3,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        }],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
                        start: 1,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                }],
                start: 0,
                end: 20,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 20
                    }
                }
            }
        });

        pass('(( [x]=yield )=>{});', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(( [x]=yield )=>{});',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 16,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        params: [{
                            type: 'AssignmentPattern',
                            left: {
                                type: 'ArrayPattern',
                                elements: [{
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    }
                                }],
                                start: 3,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                }
                            },
                            right: {
                                type: 'Identifier',
                                name: 'yield',
                                start: 7,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            },
                            start: 3,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        }],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
                        start: 1,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                }],
                start: 0,
                end: 20,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 20
                    }
                }
            }
        });

        pass('for ( f => ( "key" in {}) ; 0;);', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'for ( f => ( "key" in {}) ; 0;);',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ForStatement',
                    body: {
                        type: 'EmptyStatement',
                        start: 31,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 31
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
                    init: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BinaryExpression',
                            left: {
                                type: 'Literal',
                                value: 'key',
                                start: 13,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                },
                                raw: '"key"'
                            },
                            right: {
                                type: 'ObjectExpression',
                                properties: [],
                                start: 22,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            },
                            operator: 'in',
                            start: 13,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            }
                        },
                        params: [{
                            type: 'Identifier',
                            name: 'f',
                            start: 6,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            }
                        }],
                        id: null,
                        async: false,
                        generator: false,
                        expression: true,
                        start: 6,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
                    test: {
                        type: 'Literal',
                        value: 0,
                        start: 28,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 28
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        },
                        raw: '0'
                    },
                    update: null,
                    start: 0,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    }
                }],
                start: 0,
                end: 32,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 32
                    }
                }
            }
        });

        pass('([])=>0;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '([])=>0;',
            expected: {
                type: 'Program',
                start: 0,
                end: 8,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 8,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                            type: 'ArrayPattern',
                            start: 1,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 3
                                }
                            },
                            elements: []
                        }],
                        body: {
                            type: 'Literal',
                            start: 6,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            },
                            value: 0,
                            raw: '0'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('([a,...b])=>0;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '([a,...b])=>0;',
            expected: {
                type: 'Program',
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                            type: 'ArrayPattern',
                            start: 1,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            },
                            elements: [{
                                    type: 'Identifier',
                                    start: 2,
                                    end: 3,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 3
                                        }
                                    },
                                    name: 'a'
                                },
                                {
                                    type: 'RestElement',
                                    start: 4,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    },
                                    argument: {
                                        type: 'Identifier',
                                        start: 7,
                                        end: 8,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 7
                                            },
                                            end: {
                                                line: 1,
                                                column: 8
                                            }
                                        },
                                        name: 'b'
                                    }
                                }
                            ]
                        }],
                        body: {
                            type: 'Literal',
                            start: 12,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            value: 0,
                            raw: '0'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('([a,b])=>0;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '([a,b])=>0;',
            expected: {
                type: 'Program',
                start: 0,
                end: 11,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 11,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                            type: 'ArrayPattern',
                            start: 1,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            },
                            elements: [{
                                    type: 'Identifier',
                                    start: 2,
                                    end: 3,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 3
                                        }
                                    },
                                    name: 'a'
                                },
                                {
                                    type: 'Identifier',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    },
                                    name: 'b'
                                }
                            ]
                        }],
                        body: {
                            type: 'Literal',
                            start: 9,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            value: 0,
                            raw: '0'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x => x;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x => x',
            expected: {
                type: 'Program',
                start: 0,
                end: 6,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 6,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 6,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                            type: 'Identifier',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            },
                            name: 'x'
                        }],
                        body: {
                            type: 'Identifier',
                            start: 5,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            },
                            name: 'x'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x => x * x', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x => x * x',
            expected: {
                type: 'Program',
                start: 0,
                end: 10,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 10
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 10,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                            type: 'Identifier',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            },
                            name: 'x'
                        }],
                        body: {
                            type: 'BinaryExpression',
                            start: 5,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            left: {
                                type: 'Identifier',
                                start: 5,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                },
                                name: 'x'
                            },
                            operator: '*',
                            right: {
                                type: 'Identifier',
                                start: 9,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                },
                                name: 'x'
                            }
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x) => x', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x) => x',
            expected: {
                type: 'Program',
                start: 0,
                end: 8,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 8,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 8,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                            type: 'Identifier',
                            start: 1,
                            end: 2,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 2
                                }
                            },
                            name: 'x'
                        }],
                        body: {
                            type: 'Identifier',
                            start: 7,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            },
                            name: 'x'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x) => x * x', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x) => x * x',
            expected: {
                type: 'Program',
                start: 0,
                end: 12,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 12
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 12,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                            type: 'Identifier',
                            start: 1,
                            end: 2,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 2
                                }
                            },
                            name: 'x'
                        }],
                        body: {
                            type: 'BinaryExpression',
                            start: 7,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            },
                            left: {
                                type: 'Identifier',
                                start: 7,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                },
                                name: 'x'
                            },
                            operator: '*',
                            right: {
                                type: 'Identifier',
                                start: 11,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                },
                                name: 'x'
                            }
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x, y) => x + y', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x, y) => x + y',
            expected: {
                type: 'Program',
                start: 0,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'x'
                            },
                            {
                                type: 'Identifier',
                                start: 4,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                },
                                name: 'y'
                            }
                        ],
                        body: {
                            type: 'BinaryExpression',
                            start: 10,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            },
                            left: {
                                type: 'Identifier',
                                start: 10,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                },
                                name: 'x'
                            },
                            operator: '+',
                            right: {
                                type: 'Identifier',
                                start: 14,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                },
                                name: 'y'
                            }
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x, y) => x.a = y', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x, y) => x.a = y',
            expected: {
                type: 'Program',
                start: 0,
                end: 17,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'x'
                            },
                            {
                                type: 'Identifier',
                                start: 4,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                },
                                name: 'y'
                            }
                        ],
                        body: {
                            type: 'AssignmentExpression',
                            start: 10,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            },
                            operator: '=',
                            left: {
                                type: 'MemberExpression',
                                start: 10,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                },
                                object: {
                                    type: 'Identifier',
                                    start: 10,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    },
                                    name: 'x'
                                },
                                property: {
                                    type: 'Identifier',
                                    start: 12,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    },
                                    name: 'a'
                                },
                                computed: false
                            },
                            right: {
                                type: 'Identifier',
                                start: 16,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                },
                                name: 'y'
                            }
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('() => ({"value": 42})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '() => ({"value": 42})',
            expected: {
                type: 'Program',
                start: 0,
                end: 21,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 21
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [],
                        body: {
                            type: 'ObjectExpression',
                            start: 7,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 8,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Literal',
                                    start: 8,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    },
                                    value: 'value',
                                    raw: '"value"'
                                },
                                value: {
                                    type: 'Literal',
                                    start: 17,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    },
                                    value: 42,
                                    raw: '42'
                                },
                                kind: 'init'
                            }]
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x => y => x + y', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x => y => x + y',
            expected: {
                type: 'Program',
                start: 0,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                            type: 'Identifier',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            },
                            name: 'x'
                        }],
                        body: {
                            type: 'ArrowFunctionExpression',
                            start: 5,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: false,
                            params: [{
                                type: 'Identifier',
                                start: 5,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                },
                                name: 'y'
                            }],
                            body: {
                                type: 'BinaryExpression',
                                start: 10,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                },
                                left: {
                                    type: 'Identifier',
                                    start: 10,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    },
                                    name: 'x'
                                },
                                operator: '+',
                                right: {
                                    type: 'Identifier',
                                    start: 14,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    },
                                    name: 'y'
                                }
                            }
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x, y) => (u, v) => x*u + y*v;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x, y) => (u, v) => x*u + y*v;',
            expected: {
                type: 'Program',
                start: 0,
                end: 30,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 30
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 30,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 30
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'x'
                            },
                            {
                                type: 'Identifier',
                                start: 4,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                },
                                name: 'y'
                            }
                        ],
                        body: {
                            type: 'ArrowFunctionExpression',
                            start: 10,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: false,
                            params: [{
                                    type: 'Identifier',
                                    start: 11,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    },
                                    name: 'u'
                                },
                                {
                                    type: 'Identifier',
                                    start: 14,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    },
                                    name: 'v'
                                }
                            ],
                            body: {
                                type: 'BinaryExpression',
                                start: 20,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                },
                                left: {
                                    type: 'BinaryExpression',
                                    start: 20,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    },
                                    left: {
                                        type: 'Identifier',
                                        start: 20,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        },
                                        name: 'x'
                                    },
                                    operator: '*',
                                    right: {
                                        type: 'Identifier',
                                        start: 22,
                                        end: 23,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 23
                                            }
                                        },
                                        name: 'u'
                                    }
                                },
                                operator: '+',
                                right: {
                                    type: 'BinaryExpression',
                                    start: 26,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    },
                                    left: {
                                        type: 'Identifier',
                                        start: 26,
                                        end: 27,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26
                                            },
                                            end: {
                                                line: 1,
                                                column: 27
                                            }
                                        },
                                        name: 'y'
                                    },
                                    operator: '*',
                                    right: {
                                        type: 'Identifier',
                                        start: 28,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 28
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        },
                                        name: 'v'
                                    }
                                }
                            }
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x, y) => z => z * (x + y);', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x, y) => z => z * (x + y);',
            expected: {
                type: 'Program',
                start: 0,
                end: 27,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 27
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 27,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 27
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'x'
                            },
                            {
                                type: 'Identifier',
                                start: 4,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                },
                                name: 'y'
                            }
                        ],
                        body: {
                            type: 'ArrowFunctionExpression',
                            start: 10,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: false,
                            params: [{
                                type: 'Identifier',
                                start: 10,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                },
                                name: 'z'
                            }],
                            body: {
                                type: 'BinaryExpression',
                                start: 15,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                },
                                left: {
                                    type: 'Identifier',
                                    start: 15,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    },
                                    name: 'z'
                                },
                                operator: '*',
                                right: {
                                    type: 'BinaryExpression',
                                    start: 20,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    },
                                    left: {
                                        type: 'Identifier',
                                        start: 20,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        },
                                        name: 'x'
                                    },
                                    operator: '+',
                                    right: {
                                        type: 'Identifier',
                                        start: 24,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        },
                                        name: 'y'
                                    }
                                }
                            }
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x => (y, z) => z * (x + y)', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x => (y, z) => z * (x + y)',
            expected: {
                type: 'Program',
                start: 0,
                end: 26,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 26
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [{
                            type: 'Identifier',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            },
                            name: 'x'
                        }],
                        body: {
                            type: 'ArrowFunctionExpression',
                            start: 5,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: false,
                            params: [{
                                    type: 'Identifier',
                                    start: 6,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    },
                                    name: 'y'
                                },
                                {
                                    type: 'Identifier',
                                    start: 9,
                                    end: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    },
                                    name: 'z'
                                }
                            ],
                            body: {
                                type: 'BinaryExpression',
                                start: 15,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                },
                                left: {
                                    type: 'Identifier',
                                    start: 15,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    },
                                    name: 'z'
                                },
                                operator: '*',
                                right: {
                                    type: 'BinaryExpression',
                                    start: 20,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    },
                                    left: {
                                        type: 'Identifier',
                                        start: 20,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        },
                                        name: 'x'
                                    },
                                    operator: '+',
                                    right: {
                                        type: 'Identifier',
                                        start: 24,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        },
                                        name: 'y'
                                    }
                                }
                            }
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('a, b => 0;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'a, b => 0;',
            expected: {
                type: 'Program',
                start: 0,
                end: 10,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 10
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 10,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    },
                    expression: {
                        type: 'SequenceExpression',
                        start: 0,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        },
                        expressions: [{
                                type: 'Identifier',
                                start: 0,
                                end: 1,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 1
                                    }
                                },
                                name: 'a'
                            },
                            {
                                type: 'ArrowFunctionExpression',
                                start: 3,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                },
                                id: null,
                                generator: false,
                                expression: true,
                                async: false,
                                params: [{
                                    type: 'Identifier',
                                    start: 3,
                                    end: 4,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 4
                                        }
                                    },
                                    name: 'b'
                                }],
                                body: {
                                    type: 'Literal',
                                    start: 8,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    value: 0,
                                    raw: '0'
                                }
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('a, b, (c, d) => 0;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'a, b, (c, d) => 0;',
            expected: {
                type: 'Program',
                start: 0,
                end: 18,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 18
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 18,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 18
                        }
                    },
                    expression: {
                        type: 'SequenceExpression',
                        start: 0,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        },
                        expressions: [{
                                type: 'Identifier',
                                start: 0,
                                end: 1,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 1
                                    }
                                },
                                name: 'a'
                            },
                            {
                                type: 'Identifier',
                                start: 3,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                },
                                name: 'b'
                            },
                            {
                                type: 'ArrowFunctionExpression',
                                start: 6,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                },
                                id: null,
                                generator: false,
                                expression: true,
                                async: false,
                                params: [{
                                        type: 'Identifier',
                                        start: 7,
                                        end: 8,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 7
                                            },
                                            end: {
                                                line: 1,
                                                column: 8
                                            }
                                        },
                                        name: 'c'
                                    },
                                    {
                                        type: 'Identifier',
                                        start: 10,
                                        end: 11,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 11
                                            }
                                        },
                                        name: 'd'
                                    }
                                ],
                                body: {
                                    type: 'Literal',
                                    start: 16,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    },
                                    value: 0,
                                    raw: '0'
                                }
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(a, b) => 0, (c, d) => 1;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(a, b) => 0, (c, d) => 1;',
            expected: {
                type: 'Program',
                start: 0,
                end: 25,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 25
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    },
                    expression: {
                        type: 'SequenceExpression',
                        start: 0,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 24
                            }
                        },
                        expressions: [{
                                type: 'ArrowFunctionExpression',
                                start: 0,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                },
                                id: null,
                                generator: false,
                                expression: true,
                                async: false,
                                params: [{
                                        type: 'Identifier',
                                        start: 1,
                                        end: 2,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 1
                                            },
                                            end: {
                                                line: 1,
                                                column: 2
                                            }
                                        },
                                        name: 'a'
                                    },
                                    {
                                        type: 'Identifier',
                                        start: 4,
                                        end: 5,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 4
                                            },
                                            end: {
                                                line: 1,
                                                column: 5
                                            }
                                        },
                                        name: 'b'
                                    }
                                ],
                                body: {
                                    type: 'Literal',
                                    start: 10,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    },
                                    value: 0,
                                    raw: '0'
                                }
                            },
                            {
                                type: 'ArrowFunctionExpression',
                                start: 13,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                id: null,
                                generator: false,
                                expression: true,
                                async: false,
                                params: [{
                                        type: 'Identifier',
                                        start: 14,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        },
                                        name: 'c'
                                    },
                                    {
                                        type: 'Identifier',
                                        start: 17,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
                                            }
                                        },
                                        name: 'd'
                                    }
                                ],
                                body: {
                                    type: 'Literal',
                                    start: 23,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    },
                                    value: 1,
                                    raw: '1'
                                }
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(a, b => {}, a => a + 1);', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(a, b => {}, a => a + 1);',
            expected: {
                type: 'Program',
                start: 0,
                end: 25,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 25
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    },
                    expression: {
                        type: 'SequenceExpression',
                        start: 1,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        },
                        expressions: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'a'
                            },
                            {
                                type: 'ArrowFunctionExpression',
                                start: 4,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                },
                                id: null,
                                generator: false,
                                expression: false,
                                async: false,
                                params: [{
                                    type: 'Identifier',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    },
                                    name: 'b'
                                }],
                                body: {
                                    type: 'BlockStatement',
                                    start: 9,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    },
                                    body: []
                                }
                            },
                            {
                                type: 'ArrowFunctionExpression',
                                start: 13,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                },
                                id: null,
                                generator: false,
                                expression: true,
                                async: false,
                                params: [{
                                    type: 'Identifier',
                                    start: 13,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    },
                                    name: 'a'
                                }],
                                body: {
                                    type: 'BinaryExpression',
                                    start: 18,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    },
                                    left: {
                                        type: 'Identifier',
                                        start: 18,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        },
                                        name: 'a'
                                    },
                                    operator: '+',
                                    right: {
                                        type: 'Literal',
                                        start: 22,
                                        end: 23,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 23
                                            }
                                        },
                                        value: 1,
                                        raw: '1'
                                    }
                                }
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('((a, b) => {}, (a => a + 1));', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '((a, b) => {}, (a => a + 1));',
            expected: {
                type: 'Program',
                start: 0,
                end: 29,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 29
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 29,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 29
                        }
                    },
                    expression: {
                        type: 'SequenceExpression',
                        start: 1,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        },
                        expressions: [{
                                type: 'ArrowFunctionExpression',
                                start: 1,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                },
                                id: null,
                                generator: false,
                                expression: false,
                                async: false,
                                params: [{
                                        type: 'Identifier',
                                        start: 2,
                                        end: 3,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 3
                                            }
                                        },
                                        name: 'a'
                                    },
                                    {
                                        type: 'Identifier',
                                        start: 5,
                                        end: 6,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 6
                                            }
                                        },
                                        name: 'b'
                                    }
                                ],
                                body: {
                                    type: 'BlockStatement',
                                    start: 11,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    },
                                    body: []
                                }
                            },
                            {
                                type: 'ArrowFunctionExpression',
                                start: 16,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                },
                                id: null,
                                generator: false,
                                expression: true,
                                async: false,
                                params: [{
                                    type: 'Identifier',
                                    start: 16,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    },
                                    name: 'a'
                                }],
                                body: {
                                    type: 'BinaryExpression',
                                    start: 21,
                                    end: 26,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 26
                                        }
                                    },
                                    left: {
                                        type: 'Identifier',
                                        start: 21,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        },
                                        name: 'a'
                                    },
                                    operator: '+',
                                    right: {
                                        type: 'Literal',
                                        start: 25,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        },
                                        value: 1,
                                        raw: '1'
                                    }
                                }
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(a, (a, (b, c) => 0));', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(a, (a, (b, c) => 0));',
            expected: {
                type: 'Program',
                start: 0,
                end: 22,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 22
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    },
                    expression: {
                        type: 'SequenceExpression',
                        start: 1,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        },
                        expressions: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'a'
                            },
                            {
                                type: 'SequenceExpression',
                                start: 5,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                },
                                expressions: [{
                                        type: 'Identifier',
                                        start: 5,
                                        end: 6,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 6
                                            }
                                        },
                                        name: 'a'
                                    },
                                    {
                                        type: 'ArrowFunctionExpression',
                                        start: 8,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        },
                                        id: null,
                                        generator: false,
                                        expression: true,
                                        async: false,
                                        params: [{
                                                type: 'Identifier',
                                                start: 9,
                                                end: 10,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 9
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 10
                                                    }
                                                },
                                                name: 'b'
                                            },
                                            {
                                                type: 'Identifier',
                                                start: 12,
                                                end: 13,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 13
                                                    }
                                                },
                                                name: 'c'
                                            }
                                        ],
                                        body: {
                                            type: 'Literal',
                                            start: 18,
                                            end: 19,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 19
                                                }
                                            },
                                            value: 0,
                                            raw: '0'
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('foo ? bar : baz => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'foo ? bar : baz => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 22,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 22
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    },
                    expression: {
                        type: 'ConditionalExpression',
                        start: 0,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        },
                        test: {
                            type: 'Identifier',
                            start: 0,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 3
                                }
                            },
                            name: 'foo'
                        },
                        consequent: {
                            type: 'Identifier',
                            start: 6,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            },
                            name: 'bar'
                        },
                        alternate: {
                            type: 'ArrowFunctionExpression',
                            start: 12,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [{
                                type: 'Identifier',
                                start: 12,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                },
                                name: 'baz'
                            }],
                            body: {
                                type: 'BlockStatement',
                                start: 19,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                },
                                body: []
                            }
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('({}) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({}) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 11,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 11,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'ObjectPattern',
                            start: 1,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 3
                                }
                            },
                            properties: []
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 8,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(a, {}) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(a, {}) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'a'
                            },
                            {
                                type: 'ObjectPattern',
                                start: 4,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                },
                                properties: []
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            start: 11,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('({}, a) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({}, a) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                                type: 'ObjectPattern',
                                start: 1,
                                end: 3,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 3
                                    }
                                },
                                properties: []
                            },
                            {
                                type: 'Identifier',
                                start: 5,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                },
                                name: 'a'
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            start: 11,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('([]) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '([]) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 11,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 11,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'ArrayPattern',
                            start: 1,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 3
                                }
                            },
                            elements: []
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 8,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(a, []) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(a, []) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'a'
                            },
                            {
                                type: 'ArrayPattern',
                                start: 4,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                },
                                elements: []
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            start: 11,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('([], a) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(a = b) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'AssignmentPattern',
                            start: 1,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            },
                            left: {
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'a'
                            },
                            right: {
                                type: 'Identifier',
                                start: 5,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                },
                                name: 'b'
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 11,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(a, b = c) => {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(a, b = c) => {}',
            expected: {
                type: 'Program',
                start: 0,
                end: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'a'
                            },
                            {
                                type: 'AssignmentPattern',
                                start: 4,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                },
                                left: {
                                    type: 'Identifier',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    },
                                    name: 'b'
                                },
                                right: {
                                    type: 'Identifier',
                                    start: 8,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    name: 'c'
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            start: 14,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('({a}) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({a}) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 12,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 12
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 12,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'ObjectPattern',
                            start: 1,
                            end: 4,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 4
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 2,
                                end: 3,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 3
                                    }
                                },
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 2,
                                    end: 3,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 3
                                        }
                                    },
                                    name: 'a'
                                },
                                kind: 'init',
                                value: {
                                    type: 'Identifier',
                                    start: 2,
                                    end: 3,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 3
                                        }
                                    },
                                    name: 'a'
                                }
                            }]
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 9,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x = 9) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x = 9) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'AssignmentPattern',
                            start: 1,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            },
                            left: {
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'x'
                            },
                            right: {
                                type: 'Literal',
                                start: 5,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                },
                                value: 9,
                                raw: '9'
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 11,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x, y = 9) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x, y = 9) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 17,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'x'
                            },
                            {
                                type: 'AssignmentPattern',
                                start: 4,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                },
                                left: {
                                    type: 'Identifier',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    },
                                    name: 'y'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 8,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    value: 9,
                                    raw: '9'
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            start: 14,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x = 9, y) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x = 9, y) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 17,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                                type: 'AssignmentPattern',
                                start: 1,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                },
                                left: {
                                    type: 'Identifier',
                                    start: 1,
                                    end: 2,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 2
                                        }
                                    },
                                    name: 'x'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 5,
                                    end: 6,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 6
                                        }
                                    },
                                    value: 9,
                                    raw: '9'
                                }
                            },
                            {
                                type: 'Identifier',
                                start: 8,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                },
                                name: 'y'
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            start: 14,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x, y = 9, z) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x, y = 9, z) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 20,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 20
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'x'
                            },
                            {
                                type: 'AssignmentPattern',
                                start: 4,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                },
                                left: {
                                    type: 'Identifier',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    },
                                    name: 'y'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 8,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    value: 9,
                                    raw: '9'
                                }
                            },
                            {
                                type: 'Identifier',
                                start: 11,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                },
                                name: 'z'
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            start: 17,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x, y = 9, z = 8) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x, y = 9, z = 8) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 24,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 24
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 24
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'x'
                            },
                            {
                                type: 'AssignmentPattern',
                                start: 4,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                },
                                left: {
                                    type: 'Identifier',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    },
                                    name: 'y'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 8,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    value: 9,
                                    raw: '9'
                                }
                            },
                            {
                                type: 'AssignmentPattern',
                                start: 11,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                },
                                left: {
                                    type: 'Identifier',
                                    start: 11,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    },
                                    name: 'z'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 15,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    },
                                    value: 8,
                                    raw: '8'
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            start: 21,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(...a) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(...a) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 13,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 13
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 13,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 13
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'RestElement',
                            start: 1,
                            end: 5,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            },
                            argument: {
                                type: 'Identifier',
                                start: 4,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                },
                                name: 'a'
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 10,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x, ...a) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x, ...a) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'x'
                            },
                            {
                                type: 'RestElement',
                                start: 4,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                },
                                argument: {
                                    type: 'Identifier',
                                    start: 7,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    },
                                    name: 'a'
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            start: 13,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x = 9, ...a) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x = 9, ...a) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 20,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 20
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                                type: 'AssignmentPattern',
                                start: 1,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                },
                                left: {
                                    type: 'Identifier',
                                    start: 1,
                                    end: 2,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 2
                                        }
                                    },
                                    name: 'x'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 5,
                                    end: 6,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 6
                                        }
                                    },
                                    value: 9,
                                    raw: '9'
                                }
                            },
                            {
                                type: 'RestElement',
                                start: 8,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                },
                                argument: {
                                    type: 'Identifier',
                                    start: 11,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    },
                                    name: 'a'
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            start: 17,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x, y = 9, ...a) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x, y = 9, ...a) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'x'
                            },
                            {
                                type: 'AssignmentPattern',
                                start: 4,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                },
                                left: {
                                    type: 'Identifier',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    },
                                    name: 'y'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 8,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    value: 9,
                                    raw: '9'
                                }
                            },
                            {
                                type: 'RestElement',
                                start: 11,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                },
                                argument: {
                                    type: 'Identifier',
                                    start: 14,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    },
                                    name: 'a'
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            start: 20,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(x, y = 9, {b}, z = 8, ...a) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x, y = 9, {b}, z = 8, ...a) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 35,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 35
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 34
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'x'
                            },
                            {
                                type: 'AssignmentPattern',
                                start: 4,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                },
                                left: {
                                    type: 'Identifier',
                                    start: 4,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    },
                                    name: 'y'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 8,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    value: 9,
                                    raw: '9'
                                }
                            },
                            {
                                type: 'ObjectPattern',
                                start: 11,
                                end: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                },
                                properties: [{
                                    type: 'Property',
                                    start: 12,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    },
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 12,
                                        end: 13,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 12
                                            },
                                            end: {
                                                line: 1,
                                                column: 13
                                            }
                                        },
                                        name: 'b'
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'Identifier',
                                        start: 12,
                                        end: 13,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 12
                                            },
                                            end: {
                                                line: 1,
                                                column: 13
                                            }
                                        },
                                        name: 'b'
                                    }
                                }]
                            },
                            {
                                type: 'AssignmentPattern',
                                start: 16,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                },
                                left: {
                                    type: 'Identifier',
                                    start: 16,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    },
                                    name: 'z'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 20,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    },
                                    value: 8,
                                    raw: '8'
                                }
                            },
                            {
                                type: 'RestElement',
                                start: 23,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                },
                                argument: {
                                    type: 'Identifier',
                                    start: 26,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    },
                                    name: 'a'
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            start: 32,
                            end: 34,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32
                                },
                                end: {
                                    line: 1,
                                    column: 34
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('({a} = {}) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({a} = {}) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 17,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'AssignmentPattern',
                            start: 1,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            },
                            left: {
                                type: 'ObjectPattern',
                                start: 1,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                },
                                properties: [{
                                    type: 'Property',
                                    start: 2,
                                    end: 3,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 3
                                        }
                                    },
                                    method: false,
                                    shorthand: true,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 2,
                                        end: 3,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 3
                                            }
                                        },
                                        name: 'a'
                                    },
                                    kind: 'init',
                                    value: {
                                        type: 'Identifier',
                                        start: 2,
                                        end: 3,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 3
                                            }
                                        },
                                        name: 'a'
                                    }
                                }]
                            },
                            right: {
                                type: 'ObjectExpression',
                                start: 7,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                },
                                properties: []
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 14,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('([x] = []) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '([x] = []) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 17,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'AssignmentPattern',
                            start: 1,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            },
                            left: {
                                type: 'ArrayPattern',
                                start: 1,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                },
                                elements: [{
                                    type: 'Identifier',
                                    start: 2,
                                    end: 3,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 3
                                        }
                                    },
                                    name: 'x'
                                }]
                            },
                            right: {
                                type: 'ArrayExpression',
                                start: 7,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                },
                                elements: []
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 14,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('({a = 42}) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({a = 42}) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 17,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 17
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'ObjectPattern',
                            start: 1,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            },
                            properties: [{
                                type: 'Property',
                                start: 2,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                },
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 2,
                                    end: 3,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 3
                                        }
                                    },
                                    name: 'a'
                                },
                                kind: 'init',
                                value: {
                                    type: 'AssignmentPattern',
                                    start: 2,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    },
                                    left: {
                                        type: 'Identifier',
                                        start: 2,
                                        end: 3,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 3
                                            }
                                        },
                                        name: 'a'
                                    },
                                    right: {
                                        type: 'Literal',
                                        start: 6,
                                        end: 8,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 8
                                            }
                                        },
                                        value: 42,
                                        raw: '42'
                                    }
                                }
                            }]
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 14,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('([x = 0]) => {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '([x = 0]) => {};',
            expected: {
                type: 'Program',
                start: 0,
                end: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    },
                    expression: {
                        type: 'ArrowFunctionExpression',
                        start: 0,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'ArrayPattern',
                            start: 1,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            },
                            elements: [{
                                type: 'AssignmentPattern',
                                start: 2,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                },
                                left: {
                                    type: 'Identifier',
                                    start: 2,
                                    end: 3,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 3
                                        }
                                    },
                                    name: 'x'
                                },
                                right: {
                                    type: 'Literal',
                                    start: 6,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    },
                                    value: 0,
                                    raw: '0'
                                }
                            }]
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 13,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            },
                            body: []
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('bar ? ( (x, y) => { x.a = y; } ) : baz;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'bar ? ( (x, y) => { x.a = y; } ) : baz;',
            expected: {
                type: 'Program',
                start: 0,
                end: 39,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 39
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 39,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 39
                        }
                    },
                    expression: {
                        type: 'ConditionalExpression',
                        start: 0,
                        end: 38,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 38
                            }
                        },
                        test: {
                            type: 'Identifier',
                            start: 0,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 3
                                }
                            },
                            name: 'bar'
                        },
                        consequent: {
                            type: 'ArrowFunctionExpression',
                            start: 8,
                            end: 30,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 30
                                }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [{
                                    type: 'Identifier',
                                    start: 9,
                                    end: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    },
                                    name: 'x'
                                },
                                {
                                    type: 'Identifier',
                                    start: 12,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    },
                                    name: 'y'
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                start: 18,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                },
                                body: [{
                                    type: 'ExpressionStatement',
                                    start: 20,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    },
                                    expression: {
                                        type: 'AssignmentExpression',
                                        start: 20,
                                        end: 27,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 27
                                            }
                                        },
                                        operator: '=',
                                        left: {
                                            type: 'MemberExpression',
                                            start: 20,
                                            end: 23,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 23
                                                }
                                            },
                                            object: {
                                                type: 'Identifier',
                                                start: 20,
                                                end: 21,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 20
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 21
                                                    }
                                                },
                                                name: 'x'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                start: 22,
                                                end: 23,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 22
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 23
                                                    }
                                                },
                                                name: 'a'
                                            },
                                            computed: false
                                        },
                                        right: {
                                            type: 'Identifier',
                                            start: 26,
                                            end: 27,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 26
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 27
                                                }
                                            },
                                            name: 'y'
                                        }
                                    }
                                }]
                            }
                        },
                        alternate: {
                            type: 'Identifier',
                            start: 35,
                            end: 38,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 35
                                },
                                end: {
                                    line: 1,
                                    column: 38
                                }
                            },
                            name: 'baz'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('() => 42, bar;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '() => 42, bar;',
            expected: {
                type: 'Program',
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    },
                    expression: {
                        type: 'SequenceExpression',
                        start: 0,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        },
                        expressions: [{
                                type: 'ArrowFunctionExpression',
                                start: 0,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                },
                                id: null,
                                generator: false,
                                expression: true,
                                async: false,
                                params: [],
                                body: {
                                    type: 'Literal',
                                    start: 6,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    },
                                    value: 42,
                                    raw: '42'
                                }
                            },
                            {
                                type: 'Identifier',
                                start: 10,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                },
                                name: 'bar'
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x => x, bar;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x => x, bar;',
            expected: {
                type: 'Program',
                start: 0,
                end: 12,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 12
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 12,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    },
                    expression: {
                        type: 'SequenceExpression',
                        start: 0,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        },
                        expressions: [{
                                type: 'ArrowFunctionExpression',
                                start: 0,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                },
                                id: null,
                                generator: false,
                                expression: true,
                                async: false,
                                params: [{
                                    type: 'Identifier',
                                    start: 0,
                                    end: 1,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 0
                                        },
                                        end: {
                                            line: 1,
                                            column: 1
                                        }
                                    },
                                    name: 'x'
                                }],
                                body: {
                                    type: 'Identifier',
                                    start: 5,
                                    end: 6,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 6
                                        }
                                    },
                                    name: 'x'
                                }
                            },
                            {
                                type: 'Identifier',
                                start: 8,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                },
                                name: 'bar'
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`(a) => b;  // 1 args
        (a, b) => c;  // n args
        () => b;  // 0 args
        (a) => (b) => c;  // func returns func returns func
        (a) => ((b) => c);  // So these parens are dropped
        () => (b,c) => d;  // func returns func returns func
        a=>{return b;}
        a => 'e';  // Dropping the parens`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(a) => b;  // 1 args
            (a, b) => c;  // n args
            () => b;  // 0 args
            (a) => (b) => c;  // func returns func returns func
            (a) => ((b) => c);  // So these parens are dropped
            () => (b,c) => d;  // func returns func returns func
            a=>{return b;}
            a => 'e';  // Dropping the parens`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Identifier',
                                name: 'b',
                                start: 7,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                }
                            },
                            params: [{
                                type: 'Identifier',
                                name: 'a',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                }
                            }],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
                            start: 0,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            }
                        },
                        start: 0,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Identifier',
                                name: 'c',
                                start: 43,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 22
                                    },
                                    end: {
                                        line: 2,
                                        column: 23
                                    }
                                }
                            },
                            params: [{
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 34,
                                    end: 35,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 13
                                        },
                                        end: {
                                            line: 2,
                                            column: 14
                                        }
                                    }
                                },
                                {
                                    type: 'Identifier',
                                    name: 'b',
                                    start: 37,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 16
                                        },
                                        end: {
                                            line: 2,
                                            column: 17
                                        }
                                    }
                                }
                            ],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
                            start: 33,
                            end: 44,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 12
                                },
                                end: {
                                    line: 2,
                                    column: 23
                                }
                            }
                        },
                        start: 33,
                        end: 45,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 2,
                                column: 24
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Identifier',
                                name: 'b',
                                start: 75,
                                end: 76,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 18
                                    },
                                    end: {
                                        line: 3,
                                        column: 19
                                    }
                                }
                            },
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
                            start: 69,
                            end: 76,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 12
                                },
                                end: {
                                    line: 3,
                                    column: 19
                                }
                            }
                        },
                        start: 69,
                        end: 77,
                        loc: {
                            start: {
                                line: 3,
                                column: 12
                            },
                            end: {
                                line: 3,
                                column: 20
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'Identifier',
                                    name: 'c',
                                    start: 115,
                                    end: 116,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 26
                                        },
                                        end: {
                                            line: 4,
                                            column: 27
                                        }
                                    }
                                },
                                params: [{
                                    type: 'Identifier',
                                    name: 'b',
                                    start: 109,
                                    end: 110,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 20
                                        },
                                        end: {
                                            line: 4,
                                            column: 21
                                        }
                                    }
                                }],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
                                start: 108,
                                end: 116,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 19
                                    },
                                    end: {
                                        line: 4,
                                        column: 27
                                    }
                                }
                            },
                            params: [{
                                type: 'Identifier',
                                name: 'a',
                                start: 102,
                                end: 103,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 13
                                    },
                                    end: {
                                        line: 4,
                                        column: 14
                                    }
                                }
                            }],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
                            start: 101,
                            end: 116,
                            loc: {
                                start: {
                                    line: 4,
                                    column: 12
                                },
                                end: {
                                    line: 4,
                                    column: 27
                                }
                            }
                        },
                        start: 101,
                        end: 117,
                        loc: {
                            start: {
                                line: 4,
                                column: 12
                            },
                            end: {
                                line: 4,
                                column: 28
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'Identifier',
                                    name: 'c',
                                    start: 180,
                                    end: 181,
                                    loc: {
                                        start: {
                                            line: 5,
                                            column: 27
                                        },
                                        end: {
                                            line: 5,
                                            column: 28
                                        }
                                    }
                                },
                                params: [{
                                    type: 'Identifier',
                                    name: 'b',
                                    start: 174,
                                    end: 175,
                                    loc: {
                                        start: {
                                            line: 5,
                                            column: 21
                                        },
                                        end: {
                                            line: 5,
                                            column: 22
                                        }
                                    }
                                }],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
                                start: 173,
                                end: 181,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 20
                                    },
                                    end: {
                                        line: 5,
                                        column: 28
                                    }
                                }
                            },
                            params: [{
                                type: 'Identifier',
                                name: 'a',
                                start: 166,
                                end: 167,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 13
                                    },
                                    end: {
                                        line: 5,
                                        column: 14
                                    }
                                }
                            }],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
                            start: 165,
                            end: 182,
                            loc: {
                                start: {
                                    line: 5,
                                    column: 12
                                },
                                end: {
                                    line: 5,
                                    column: 29
                                }
                            }
                        },
                        start: 165,
                        end: 183,
                        loc: {
                            start: {
                                line: 5,
                                column: 12
                            },
                            end: {
                                line: 5,
                                column: 30
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'Identifier',
                                    name: 'd',
                                    start: 243,
                                    end: 244,
                                    loc: {
                                        start: {
                                            line: 6,
                                            column: 27
                                        },
                                        end: {
                                            line: 6,
                                            column: 28
                                        }
                                    }
                                },
                                params: [{
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 235,
                                        end: 236,
                                        loc: {
                                            start: {
                                                line: 6,
                                                column: 19
                                            },
                                            end: {
                                                line: 6,
                                                column: 20
                                            }
                                        }
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'c',
                                        start: 237,
                                        end: 238,
                                        loc: {
                                            start: {
                                                line: 6,
                                                column: 21
                                            },
                                            end: {
                                                line: 6,
                                                column: 22
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
                                start: 234,
                                end: 244,
                                loc: {
                                    start: {
                                        line: 6,
                                        column: 18
                                    },
                                    end: {
                                        line: 6,
                                        column: 28
                                    }
                                }
                            },
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
                            start: 228,
                            end: 244,
                            loc: {
                                start: {
                                    line: 6,
                                    column: 12
                                },
                                end: {
                                    line: 6,
                                    column: 28
                                }
                            }
                        },
                        start: 228,
                        end: 245,
                        loc: {
                            start: {
                                line: 6,
                                column: 12
                            },
                            end: {
                                line: 6,
                                column: 29
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 304,
                                        end: 305,
                                        loc: {
                                            start: {
                                                line: 7,
                                                column: 23
                                            },
                                            end: {
                                                line: 7,
                                                column: 24
                                            }
                                        }
                                    },
                                    start: 297,
                                    end: 306,
                                    loc: {
                                        start: {
                                            line: 7,
                                            column: 16
                                        },
                                        end: {
                                            line: 7,
                                            column: 25
                                        }
                                    }
                                }],
                                start: 296,
                                end: 307,
                                loc: {
                                    start: {
                                        line: 7,
                                        column: 15
                                    },
                                    end: {
                                        line: 7,
                                        column: 26
                                    }
                                }
                            },
                            params: [{
                                type: 'Identifier',
                                name: 'a',
                                start: 293,
                                end: 294,
                                loc: {
                                    start: {
                                        line: 7,
                                        column: 12
                                    },
                                    end: {
                                        line: 7,
                                        column: 13
                                    }
                                }
                            }],
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
                            start: 293,
                            end: 307,
                            loc: {
                                start: {
                                    line: 7,
                                    column: 12
                                },
                                end: {
                                    line: 7,
                                    column: 26
                                }
                            }
                        },
                        start: 293,
                        end: 307,
                        loc: {
                            start: {
                                line: 7,
                                column: 12
                            },
                            end: {
                                line: 7,
                                column: 26
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Literal',
                                value: 'e',
                                start: 325,
                                end: 328,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 17
                                    },
                                    end: {
                                        line: 8,
                                        column: 20
                                    }
                                },
                                raw: '\'e\''
                            },
                            params: [{
                                type: 'Identifier',
                                name: 'a',
                                start: 320,
                                end: 321,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 12
                                    },
                                    end: {
                                        line: 8,
                                        column: 13
                                    }
                                }
                            }],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
                            start: 320,
                            end: 328,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 12
                                },
                                end: {
                                    line: 8,
                                    column: 20
                                }
                            }
                        },
                        start: 320,
                        end: 329,
                        loc: {
                            start: {
                                line: 8,
                                column: 12
                            },
                            end: {
                                line: 8,
                                column: 21
                            }
                        }
                    }
                ],
                start: 0,
                end: 353,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 8,
                        column: 45
                    }
                }
            }
        });

        pass('const a = () => {return (3, 4);};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'const a = () => {return (3, 4);};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'SequenceExpression',
                                        expressions: [{
                                                type: 'Literal',
                                                value: 3,
                                                start: 25,
                                                end: 26,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 25
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 26
                                                    }
                                                },
                                                raw: '3'
                                            },
                                            {
                                                type: 'Literal',
                                                value: 4,
                                                start: 28,
                                                end: 29,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 29
                                                    }
                                                },
                                                raw: '4'
                                            }
                                        ],
                                        start: 25,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        }
                                    },
                                    start: 17,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                }],
                                start: 16,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            },
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
                            start: 10,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            }
                        },
                        id: {
                            type: 'Identifier',
                            name: 'a',
                            start: 6,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            }
                        },
                        start: 6,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    }],
                    kind: 'const',
                    start: 0,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 33
                        }
                    }
                }],
                start: 0,
                end: 33,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 33
                    }
                }
            }
        });

        pass(`(() => {}) || true;
        (() => {}) ? a : b;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(() => {}) || true;
            (() => {}) ? a : b;`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'LogicalExpression',
                            left: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 7,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 1,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                }
                            },
                            right: {
                                type: 'Literal',
                                value: true,
                                start: 14,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                },
                                raw: 'true'
                            },
                            operator: '||',
                            start: 0,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        start: 0,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ConditionalExpression',
                            test: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 39,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 19
                                        },
                                        end: {
                                            line: 2,
                                            column: 21
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 33,
                                end: 41,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 13
                                    },
                                    end: {
                                        line: 2,
                                        column: 21
                                    }
                                }
                            },
                            consequent: {
                                type: 'Identifier',
                                name: 'a',
                                start: 45,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 25
                                    },
                                    end: {
                                        line: 2,
                                        column: 26
                                    }
                                }
                            },
                            alternate: {
                                type: 'Identifier',
                                name: 'b',
                                start: 49,
                                end: 50,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 29
                                    },
                                    end: {
                                        line: 2,
                                        column: 30
                                    }
                                }
                            },
                            start: 32,
                            end: 50,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 12
                                },
                                end: {
                                    line: 2,
                                    column: 30
                                }
                            }
                        },
                        start: 32,
                        end: 51,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 2,
                                column: 31
                            }
                        }
                    }
                ],
                start: 0,
                end: 51,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 2,
                        column: 31
                    }
                }
            }
        });

        pass('(() => {}) + 2', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(() => {}) + 2',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 7,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                }
                            },
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
                            start: 1,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 2,
                            start: 13,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            },
                            raw: '2'
                        },
                        operator: '+',
                        start: 0,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        }
                    },
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                }],
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            }
        });

        pass('new (() => {});', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'new (() => {});',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'NewExpression',
                        callee: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 11,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            },
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
                            start: 5,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        },
                        arguments: [],
                        start: 0,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        }
                    },
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    }
                }],
                start: 0,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                }
            }
        });

        pass('bar ? ( (x, y) => (u, v) => x*u + y*v ) : baz;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'bar ? ( (x, y) => (u, v) => x*u + y*v ) : baz;',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'Identifier',
                            name: 'bar',
                            start: 0,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 3
                                }
                            }
                        },
                        consequent: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 28,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'u',
                                            start: 30,
                                            end: 31,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 30
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 31
                                                }
                                            }
                                        },
                                        operator: '*',
                                        start: 28,
                                        end: 31,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 28
                                            },
                                            end: {
                                                line: 1,
                                                column: 31
                                            }
                                        }
                                    },
                                    right: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'y',
                                            start: 34,
                                            end: 35,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 34
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 35
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'v',
                                            start: 36,
                                            end: 37,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 36
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 37
                                                }
                                            }
                                        },
                                        operator: '*',
                                        start: 34,
                                        end: 37,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 34
                                            },
                                            end: {
                                                line: 1,
                                                column: 37
                                            }
                                        }
                                    },
                                    operator: '+',
                                    start: 28,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 28
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    }
                                },
                                params: [{
                                        type: 'Identifier',
                                        name: 'u',
                                        start: 19,
                                        end: 20,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 20
                                            }
                                        }
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'v',
                                        start: 22,
                                        end: 23,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 23
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
                                start: 18,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 37
                                    }
                                }
                            },
                            params: [{
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 9,
                                    end: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    }
                                },
                                {
                                    type: 'Identifier',
                                    name: 'y',
                                    start: 12,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    }
                                }
                            ],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
                            start: 8,
                            end: 37,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 37
                                }
                            }
                        },
                        alternate: {
                            type: 'Identifier',
                            name: 'baz',
                            start: 42,
                            end: 45,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 42
                                },
                                end: {
                                    line: 1,
                                    column: 45
                                }
                            }
                        },
                        start: 0,
                        end: 45,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 45
                            }
                        }
                    },
                    start: 0,
                    end: 46,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 46
                        }
                    }
                }],
                start: 0,
                end: 46,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 46
                    }
                }
            }
        });

        pass('bar ? ( (a, b) => 0, (c, d) => 1 ) : baz;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'bar ? ( (a, b) => 0, (c, d) => 1 ) : baz;',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'Identifier',
                            name: 'bar',
                            start: 0,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 3
                                }
                            }
                        },
                        consequent: {
                            type: 'SequenceExpression',
                            expressions: [{
                                    type: 'ArrowFunctionExpression',
                                    body: {
                                        type: 'Literal',
                                        value: 0,
                                        start: 18,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        },
                                        raw: '0'
                                    },
                                    params: [{
                                            type: 'Identifier',
                                            name: 'a',
                                            start: 9,
                                            end: 10,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 9
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 10
                                                }
                                            }
                                        },
                                        {
                                            type: 'Identifier',
                                            name: 'b',
                                            start: 12,
                                            end: 13,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 13
                                                }
                                            }
                                        }
                                    ],
                                    id: null,
                                    async: false,
                                    generator: false,
                                    expression: true,
                                    start: 8,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    }
                                },
                                {
                                    type: 'ArrowFunctionExpression',
                                    body: {
                                        type: 'Literal',
                                        value: 1,
                                        start: 31,
                                        end: 32,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 31
                                            },
                                            end: {
                                                line: 1,
                                                column: 32
                                            }
                                        },
                                        raw: '1'
                                    },
                                    params: [{
                                            type: 'Identifier',
                                            name: 'c',
                                            start: 22,
                                            end: 23,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 23
                                                }
                                            }
                                        },
                                        {
                                            type: 'Identifier',
                                            name: 'd',
                                            start: 25,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            }
                                        }
                                    ],
                                    id: null,
                                    async: false,
                                    generator: false,
                                    expression: true,
                                    start: 21,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                }
                            ],
                            start: 8,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            }
                        },
                        alternate: {
                            type: 'Identifier',
                            name: 'baz',
                            start: 37,
                            end: 40,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 37
                                },
                                end: {
                                    line: 1,
                                    column: 40
                                }
                            }
                        },
                        start: 0,
                        end: 40,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 40
                            }
                        }
                    },
                    start: 0,
                    end: 41,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 41
                        }
                    }
                }],
                start: 0,
                end: 41,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 41
                    }
                }
            }
        });

        pass('({y}) => x;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({y}) => x;',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'Identifier',
                            name: 'x',
                            start: 9,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
                        params: [{
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'y',
                                    start: 2,
                                    end: 3,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 3
                                        }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'y',
                                    start: 2,
                                    end: 3,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 3
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: true,
                                start: 2,
                                end: 3,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 3
                                    }
                                }
                            }],
                            start: 1,
                            end: 4,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 4
                                }
                            }
                        }],
                        id: null,
                        async: false,
                        generator: false,
                        expression: true,
                        start: 0,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    start: 0,
                    end: 11,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                }],
                start: 0,
                end: 11,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            }
        });

        pass('({x = 10, y: { z = 10 }}) => [x, z]', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({x = 10, y: { z = 10 }}) => [x, z]',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'ArrayExpression',
                            elements: [{
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 30,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                },
                                {
                                    type: 'Identifier',
                                    name: 'z',
                                    start: 33,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 34
                                        }
                                    }
                                }
                            ],
                            start: 29,
                            end: 35,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 29
                                },
                                end: {
                                    line: 1,
                                    column: 35
                                }
                            }
                        },
                        params: [{
                            type: 'ObjectPattern',
                            properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 2,
                                        end: 3,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 3
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 2,
                                            end: 3,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 2
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 3
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 10,
                                            start: 6,
                                            end: 8,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 6
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 8
                                                }
                                            },
                                            raw: '10'
                                        },
                                        start: 2,
                                        end: 8,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 8
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 2,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'y',
                                        start: 10,
                                        end: 11,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 11
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'ObjectPattern',
                                        properties: [{
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'z',
                                                start: 15,
                                                end: 16,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 15
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 16
                                                    }
                                                }
                                            },
                                            value: {
                                                type: 'AssignmentPattern',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'z',
                                                    start: 15,
                                                    end: 16,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 15
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 16
                                                        }
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 10,
                                                    start: 19,
                                                    end: 21,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 19
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 21
                                                        }
                                                    },
                                                    raw: '10'
                                                },
                                                start: 15,
                                                end: 21,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 15
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 21
                                                    }
                                                }
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: false,
                                            shorthand: true,
                                            start: 15,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 15
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            }
                                        }],
                                        start: 13,
                                        end: 23,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 23
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 10,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            }
                        }],
                        id: null,
                        async: false,
                        generator: false,
                        expression: true,
                        start: 0,
                        end: 35,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 35
                            }
                        }
                    },
                    start: 0,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    }
                }],
                start: 0,
                end: 35,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 35
                    }
                }
            }
        });

        pass('({x = 10}) => x', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({x = 10}) => x',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'Identifier',
                            name: 'x',
                            start: 14,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            }
                        },
                        params: [{
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 2,
                                    end: 3,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 3
                                        }
                                    }
                                },
                                value: {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 2,
                                        end: 3,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 3
                                            }
                                        }
                                    },
                                    right: {
                                        type: 'Literal',
                                        value: 10,
                                        start: 6,
                                        end: 8,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 8
                                            }
                                        },
                                        raw: '10'
                                    },
                                    start: 2,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: true,
                                start: 2,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                }
                            }],
                            start: 1,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        }],
                        id: null,
                        async: false,
                        generator: false,
                        expression: true,
                        start: 0,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    },
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    }
                }],
                start: 0,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                }
            }
        });

        pass('(x, y) => (u, v) => x*u + y*v, bar;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(x, y) => (u, v) => x*u + y*v, bar;',
            expected: {
                type: 'Program',
                start: 0,
                end: 35,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 35
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    },
                    expression: {
                        type: 'SequenceExpression',
                        start: 0,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 34
                            }
                        },
                        expressions: [{
                                type: 'ArrowFunctionExpression',
                                start: 0,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                },
                                id: null,
                                generator: false,
                                expression: true,
                                async: false,
                                params: [{
                                        type: 'Identifier',
                                        start: 1,
                                        end: 2,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 1
                                            },
                                            end: {
                                                line: 1,
                                                column: 2
                                            }
                                        },
                                        name: 'x'
                                    },
                                    {
                                        type: 'Identifier',
                                        start: 4,
                                        end: 5,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 4
                                            },
                                            end: {
                                                line: 1,
                                                column: 5
                                            }
                                        },
                                        name: 'y'
                                    }
                                ],
                                body: {
                                    type: 'ArrowFunctionExpression',
                                    start: 10,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    },
                                    id: null,
                                    generator: false,
                                    expression: true,
                                    async: false,
                                    params: [{
                                            type: 'Identifier',
                                            start: 11,
                                            end: 12,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 11
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 12
                                                }
                                            },
                                            name: 'u'
                                        },
                                        {
                                            type: 'Identifier',
                                            start: 14,
                                            end: 15,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 15
                                                }
                                            },
                                            name: 'v'
                                        }
                                    ],
                                    body: {
                                        type: 'BinaryExpression',
                                        start: 20,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        },
                                        left: {
                                            type: 'BinaryExpression',
                                            start: 20,
                                            end: 23,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 23
                                                }
                                            },
                                            left: {
                                                type: 'Identifier',
                                                start: 20,
                                                end: 21,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 20
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 21
                                                    }
                                                },
                                                name: 'x'
                                            },
                                            operator: '*',
                                            right: {
                                                type: 'Identifier',
                                                start: 22,
                                                end: 23,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 22
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 23
                                                    }
                                                },
                                                name: 'u'
                                            }
                                        },
                                        operator: '+',
                                        right: {
                                            type: 'BinaryExpression',
                                            start: 26,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 26
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            },
                                            left: {
                                                type: 'Identifier',
                                                start: 26,
                                                end: 27,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 26
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 27
                                                    }
                                                },
                                                name: 'y'
                                            },
                                            operator: '*',
                                            right: {
                                                type: 'Identifier',
                                                start: 28,
                                                end: 29,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 29
                                                    }
                                                },
                                                name: 'v'
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                type: 'Identifier',
                                start: 31,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 31
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                },
                                name: 'bar'
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });
    });
});
