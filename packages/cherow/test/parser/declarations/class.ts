import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Declarations - Class', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const InvalidAsync = [
            '*async x(){}',
            'async *(){}',
            'async get x(){}',
            'async set x(y){}',
            'async x : 0',
            'async : 0',
            'async static x(){}',
            'static *async x(){}',
            'static async *(){}',
            'static async get x(){}',
            'static async set x(y){}',
            'static async x : 0',
            'static async : 0',
        ];

        for (const arg of InvalidAsync) {

            it(`(class { ${arg} });`, () => {
                t.throws(() => {
                    parseSource(`(class { ${arg} });`, undefined, Context.Empty);
                });
            });

            it(`class C extends Base { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`class C extends Base { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`class C { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`class C { ${arg} }`, undefined, Context.Empty);
                });
            });
        }

        // Strict mode errors
        const StrictModeErrors = [
            'class C { method() { with ({}) {} } }',
            'class C extends function() { with ({}) {} } {}',
            'class C { *method() { with ({}) {} } }'
        ];

        for (const arg of StrictModeErrors) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
       }

        // Tests reserved keywords
        const reservedKeywords = [
            'arguments', 'eval',    'implements', 'interface',
            'let',       'package', 'private',    'protected',
            'public',    'static',  'var',        'yield'
        ];

        for (const arg of reservedKeywords) {

            it(`class ${arg} {};`, () => {
                t.throws(() => {
                    parseSource(`class ${arg} {};`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; class ${arg} {};`, () => {
                t.throws(() => {
                    parseSource(`"use strict"; class ${arg} {};`, undefined, Context.Empty);
                });
            });

            it(`(class ${arg} {});`, () => {
                t.throws(() => {
                    parseSource(`(class ${arg} {})`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; (class ${arg} {})`, () => {
                t.throws(() => {
                    parseSource(`"use strict"; (class ${arg} {})`, undefined, Context.Empty);
                });
            });
        }

        // Tests reserved keywords as method name

        for (const arg of reservedKeywords) {

            it(`class C { get name(${arg}) {} }`, () => {
                t.throws(() => {
                    parseSource(`class C { get name(${arg}) {} }`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; (class C { get name(${arg}) {} })`, () => {
                t.throws(() => {
                    parseSource(`"use strict"; (class C { get name(${arg}) {} })`, undefined, Context.Empty);
                });
            });
        }

        const invalidPrototypes = [
            'static prototype() {}',
            'static get prototype() {}',
            'static set prototype(_) {}',
            'static *prototype() {}',
            'static \'prototype\'() {}',
            'static *\'prototype\'() {}',
            'static prot\\u006ftype() {}',
            'static \'prot\\u006ftype\'() {}',
            'static get \'prot\\u006ftype\'() {}',
            'static set \'prot\\u006ftype\'(_) {}',
            'static *\'prot\\u006ftype\'() {}'
        ];

        for (const arg of invalidPrototypes) {

            it(`class C {${arg}}`, () => {
                t.throws(() => {
                    parseSource(`class C {${arg}}`, undefined, Context.Empty);
                });
            });

            it(`(class C {${arg}})`, () => {
                t.throws(() => {
                    parseSource(`(class C {${arg}})`, undefined, Context.Empty);
                });
            });
        }

        const invaidSpecialConstructors = [
            'get constructor() {}',
            'get constructor(_) {}',
            '*constructor() {}',
            'get \'constructor\'() {}',
            '*\'constructor\'() {}',
            'get c\\u006fnstructor() {}',
            '*c\\u006fnstructor() {}',
            'get \'c\\u006fnstructor\'() {}',
            'get \'c\\u006fnstructor\'(_) {}',
            '*\'c\\u006fnstructor\'() {}'
        ];

        for (const arg of invaidSpecialConstructors) {

            it(`class C {${arg}}`, () => {
                t.throws(() => {
                    parseSource(`class C {${arg}}`, undefined, Context.Empty);
                });
            });

            it(`(class C {${arg}})`, () => {
                t.throws(() => {
                    parseSource(`(class C {${arg}})`, undefined, Context.Empty);
                });
            });
        }

        const invalidDeclarations = [
            'class',
      'class name',
      'class name extends',
      'class extends',
      'class name {',
      'class name { m }',
      'class name { m; n }',
      'class name { m: 1 }',
      'class name { m(); n() }',
      'class name { get x }',
      'class name { get x() }',
      'class name { set x() {) }',
      'class {}',
      'class extends base {}',
      'class name { *',
      'class name { * }',
      'class name { *; }',
      'class name { *get x() {} }',
      'class name { *set x(_) {} }',
      'class name { *static m() {} }',
      'class name { foo(a, a) { "use strict"; } }',
      '"use strict"; class name { foo(a, a) {} }',
      'class A {async foo() { var await }}',
      'class A {async foo(await) { }}',
      'class A {async foo() { return {await} }}',
      'class A {async constructor() { }}',
      'class A {async get foo() { }}',
      'class A {async set foo(value) { }}',
      'class A {static async get foo() { }}',
      'class A {static async set foo(value) { }}',
        ];

        for (const arg of invalidDeclarations) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg} `, undefined, Context.Empty);
                });
            });

            it(`if (true) { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`if (true) { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`{${arg}}`, () => {
                t.throws(() => {
                    parseSource(`{${arg}}`, undefined, Context.Empty);
                });
            });
        }

        const classErrors = [
            'extends A{}',
            'a class;',
            'a(eval){}',
            'a{ *() {} }',
            'get x',
            'get x() ',
            '*',
            '*get x() {}',
            '*set x(_) {}',
            '*static m() {}',
            'a{ get get a() {}',
            'A { get constructor() {} }',
            'A { static get prototype() {} }',
            'A { set constructor(_) {} }',
            'a{ get async a() {} }',
            'C { *method() { with ({}) {} } }',
            'a {static "prototype"(){}}',
            'extends {}',
            'a extends {}',
            'class a { static prototype(){} }',
            'get constructor() {}',
            'constructor() {} \'constructor\'() {}',
            '{async\nfoo() { }}',
            'A {async constructor() { }}',
            'A {async get foo() { }}',
            'A {async set foo(value) { }}',
            'A {static async get foo() { }}',
            'A {static async set foo(value) { }}',
            'A {async foo() { var await }}',
            'A {async foo(await) { }}',
            '*static x() {}',
            'async x : 0',
            'async : 0',
            'get constructor() {}',
            'get constructor(_) {}',
            '*constructor() {}',
            'get \'constructor\'() {}',
            '*\'constructor\'() {}',
            'get c\\u006fnstructor() {}',
            '*c\\u006fnstructor() {}',
            'get \'c\\u006fnstructor\'() {}',
            'get \'c\\u006fnstructor\'(_) {}',
            '*\'c\\u006fnstructor\'() {}',
            'async static x(){}',
            'static prototype() {}',
            'static get prototype() {}',
            'static set prototype(_) {}',
            'static *prototype() {}',
            'static \'prototype\'() {}',
            'static *\'prototype\'() {}',
            'static prot\\u006ftype() {}',
            'static \'prot\\u006ftype\'() {}',
            'static get \'prot\\u006ftype\'() {}',
            'static set \'prot\\u006ftype\'(_) {}',
            'static *\'prot\\u006ftype\'() {}',
            'static *async x(){}',
            'static async *(){}',
            'static async get x(){}',
            'static async set x(y){}',
            'static async x : 0',
            'static async : 0',
            'async foo() { return {await} }',
            'a extends b { static set prototype(){} }',
            'method() { with ({}) {} }',
            '*method() { with ({}) {} }',
        ];

        for (const arg of classErrors) {
            it(`class ${arg}`, () => {
                t.throws(() => {
                    parseSource(`class ${arg} `, undefined, Context.Empty);
                });
            });
        }

        fail('class {}', Context.Empty, {
            source: 'class {}',
        });

        fail('class extends A{}', Context.Empty, {
            source: 'class extends A{}',
        });

        fail('class C { async *gen() { void yield; }}', Context.Empty, {
            source: 'class C { async *gen() { void yield; }}',
        });

        fail('class C { async *gen() { void yield; }}', Context.Empty, {
            source: 'class C { async *gen() { void  yi\u0065ld: ; }}',
        });

        fail('class C { async *gen() { void yield; }}', Context.Empty, {
            source: 'class C { async *gen() {  void yi\u0065ld; }}',
        });

        fail('class C { static async *gen() { yield* obj }', Context.Empty, {
            source: 'class C { static async *gen() { yield* obj }',
        });
        fail('class C { static async *gen() { yield* yield "unreachable"; }', Context.Empty, {
            source: 'class C { static async *gen() { yield* yield "unreachable"; }',
        });

        fail('class C { static *method([...x = []] = []) { } };', Context.Empty, {
            source: 'class C { static *method([...x = []] = []) { } };',
        });

        fail('class C { static *method([...{ x } = []] = []) { } };', Context.Empty, {
            source: 'class C { static *method([...x = []] = []) { } };',
        });

        fail('class C { static *method([...[x], y] = [1, 2, 3]) { } };', Context.Empty, {
            source: 'class C { static *method([...[x], y] = [1, 2, 3]) { } };',
        });

        fail('class C { static *method([...[ x ] = []]) {} };', Context.Empty, {
            source: 'class C { static *method([...[ x ] = []]) {} };',
        });

        fail('class C { static *method([...x = []]) { } };', Context.Empty, {
            source: 'class C { static *method([...x = []]) { } };',
        });

        fail('class C { static  *method([...x, y]) { } };', Context.Empty, {
            source: 'class C { static  *method([...x, y]) {} };',
        });

        fail('class C { static  *method([...[ x ] = []] = []) { } };', Context.Empty, {
            source: 'class C { static  *method([...[ x ] = []] = []) { } };',
        });

        fail('class C { static *method([...{ x } = []] = []) { } };', Context.Empty, {
            source: 'class C { static *method([...{ x } = []] = []) {} };',
        });

        fail('class C { static *method([...[x], y] = [1, 2, 3]) {} };', Context.Empty, {
            source: 'class C { static *method([...[x], y] = [1, 2, 3]) { } };',
        });

        fail('class C { static *method([...{ x }, y] = [1, 2, 3]) { } };', Context.Empty, {
            source: 'class C { static *method([...{ x }, y] = [1, 2, 3]) { } };',
        });

        fail('class C { static static async *method([...[ x ] = []] = []) {} };', Context.Empty, {
            source: 'class C { static static async *method([...[ x ] = []] = []) { } };',
        });

        fail('class C { get [function()]() {} }', Context.Empty, {
            source: 'class C { get [function()]() {} }',
        });
    });

    describe('Pass', () => {

        const ClassConstructorNoErrors = [
            'constructor() {}',
            'static constructor() {}',
            'static get constructor() {}',
            'static set constructor(_) {}',
            'static *constructor() {}'
        ];

        for (const arg of ClassConstructorNoErrors) {

            it(`class C { ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C { ${arg}}`, undefined, Context.Empty);
                });
            });

            it(`(class C { ${arg} })`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(class C { ${arg} })`, undefined, Context.Empty);
                });
            });
        }

        const ClassMultiplePropertyNamesNoErrors = [
            'constructor() {}; static constructor() {}',
            'm() {}; static m() {}',
            'm() {}; m() {}',
            'static m() {}; static m() {}',
            'get m() {}; set m(_) {}; get m() {}; set m(_) {};'
        ];

        for (const arg of ClassMultiplePropertyNamesNoErrors) {

            it(`class C { ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C { ${arg}}`, undefined, Context.Empty);
                });
            });

            it(`(class C { ${arg} })`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(class C { ${arg} })`, undefined, Context.Empty);
                });
            });
        }

        const ClassPropertyNameNoErrors = [
            '42',       '42.5',  '42e2',  '42e+2',   '42e-2',  'null',
      'false',    'true',  '\'str\'', '"str"', 'static', 'get',
      'set',      'var',   'const', 'let',     'this',   'class',
      'function', 'yield', 'if',    'else',    'for',    'while',
      'do',       'try',   'catch', 'finally'
        ];

        for (const arg of ClassPropertyNameNoErrors) {

            it(`class C { ${arg}() {}}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C { ${arg}() {}}`, undefined, Context.Empty);
                });
            });

            it(`class C { *${arg}(v) {}}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C { *${arg}(v) {}}`, undefined, Context.Empty);
                });
            });

            it(`class C { static *${arg}(v) {}}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C { static *${arg}(v) {}}`, undefined, Context.Empty);
                });
            });

            it(`(class {${arg}() {}});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(class {${arg}() {}});`, undefined, Context.Empty);
                });
            });

            it(`(class { static ${arg}() {}});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(class { static ${arg}() {}});`, undefined, Context.Empty);
                });
            });

            it(`class C { set ${arg}(v) {}}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C { ${arg}(v) {}}`, undefined, Context.Empty);
                });
            });

            it(`class C { async *${arg}(v) {}}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C { async *${arg}(v) {}}`, undefined, Context.Empty);
                });
            });

            it(`(class C { async *${arg}(v) {}})`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(class C { async *${arg}(v) {}})`, undefined, Context.Empty);
                });
            });

            it(`class C { static ${arg}(v) {}}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C { static ${arg}(v) {}}`, undefined, Context.Empty);
                });
            });

            it(`class C { static get ${arg}() {}}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C { static get ${arg}() {}}`, undefined, Context.Empty);
                });
            });
        }

        const extendSyntax = [
        'class name {}',
                                  'class name extends F {}',
                                  'class name extends (F, G) {}',
                                  'class name extends class {} {}',
                                  'class name extends class base {} {}'
    ];

        for (const arg of extendSyntax) {
        it(`{ ${arg} }`, () => {
            t.doesNotThrow(() => {
                parseSource(`'use strict'; if (true) { ${arg} }`, undefined, Context.Empty);
            });
        });

        it(`'use strict'; { ${arg} }`, () => {
            t.doesNotThrow(() => {
                parseSource(`'use strict'; { ${arg} }`, undefined, Context.Empty);
            });
        });

        it(`'use strict'; if (true) { ${arg} }`, () => {
            t.doesNotThrow(() => {
                parseSource(`'use strict'; if (true) { ${arg} }`, undefined, Context.Empty);
            });
        });
    }

    const liveCases = [
      'class FOO { constructor() {} }',
      'class foo extends bar {}',
      'class foo extends bar { method() {} get property() { return this._property; }  set property(value) {  this._property = value; }}',
      'class foo extends class bar {} {}',
      'class foo extends class { constructor() {}} {}',
      'class foo extends class { constructor() {} } { constructor() {} }',
      'class foo { [Symbol.iterator]() {} ["method"]() {} }',
      'class foo { static classMethod() {} method() {} }',
      'class foo { static get property() {} static set property(value) {} }',
      'class foo extends bar { constructor() { super(); } }',
    ]

    for (const arg of liveCases) {
      it(`{ ${arg} }`, () => {
          t.doesNotThrow(() => {
              parseSource(`${arg}`, undefined, Context.Empty);
          });
      });
    }

        const validSyntax = [
            ';',
            ';;',
            'm() {}',
            'm() {};',
            '; m() {}',
            'm() {}; n(x) {}',
            'get x() {}',
            'set x(v) {}',
            'get() {}',
            'set() {}',
            '*g() {}',
            '*g() {};',
            '; *g() {}',
            '*g() {}; *h(x) {}',
            'async *x(){}',
            'static() {}',
            'get static() {}',
            'set static(v) {}',
            'static m() {}',
            'static get x() {}',
            'static set x(v) {}',
            'static get() {}',
            'static set() {}',
            'static static() {}',
            'static get static() {}',
            'static set static(v) {}',
            '*static() {}',
            'static *static() {}',
            '*get() {}',
            '*set() {}',
            'static *g() {}',
            'async(){}',
            '*async(){}',
            'static async(){}',
            'static *async(){}',
            'static async *x(){}',
            'static get foo() {}',
            'set(v) {};',
            'st\\u0061tic() {}',
            'get st\\u0061tic() {}',
            'set st\\u0061tic(v) {}',
            'static st\\u0061tic() {}',
            'static get st\\u0061tic() {}',
            'static set st\\u0061tic(v) {}',
            '*st\\u0061tic() {}',
            'static *st\\u0061tic() {}',
            'static async x(){}',
            'static async(){}',
            'static *async(){}',
            'async x(){}',
            'async 0(){}',
            'async get(){}',
            'async set(){}',
            'async static(){}',
            'async async(){}',
            '*async(){}',
            '*gen(v) { yield v; }',
            'static *gen(v) { yield v;}',
            'foo() {} bar() {}',
            'get foo() {} set foo(v) {}',
            'static get foo() {} get foo() {}',
            'static get foo() {} static get bar() {}',
            'static get foo() {} static set foo(v) {} get foo() {} set foo(v) {}',
            'static [foo]() {}',
            'static get [foo]() {}',
            'foo() {} get foo() {}',
            'f({x} = {x: 10}) {}',
            '*yield() {}',
            'm() {}; static m() {}',
            'm() {}; m() {}',
            'static m() {}; static m() {}',
            'get m() {}; set m(_) {}; get m() {}; set m(_) {};',
            'method(foo) {} method2() { let foo; }',
            'set foo(v) {} get foo() {}',
            'foo() {} static bar() {}',
            'static constructor() {}',
            'static get constructor() {}',
            'static set constructor(_) {}',
            'static *constructor() {}',
            'static async *method([...[...x]] = [1, 2, 3]) {}',
            'static async *method([...[]] = function*() {}) {}',
            'static async *method([] = function*() {}) {}',
            'static async *method([,] = function*() {}) {}',
            'static async *method([{ x }] = []) {}',
            'static async *method([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = []) {}',
            'static async *method([{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]) {}',
            'static async *method([_, x] = []) {}',
            'static async *method([x] = []) {}',
            'static async *method([w = a(), x = b(), y = c(), z = d()] = [null, 0, false, \'\']) {}',
            'static async *method([arrow = () => {}] = []) {}',
            'static async *method([[x]] = [null]) {}',
            'static async *method([[...x] = function() { initCount += 1; }()] = [[2, 1, 3]]) {}',
            'static async *method([[] = function() { initCount += 1; }()] = [[23]]) {}',
            'static async *method([x, y, z] = [1, 2, 3]) {}',
            'static async *method([x] = {}) {}',
            'static async *method([...{ length }]) {}',
            'static async *method([...x]) {}',
            'static async *method([...[,]]) {}',
            'static async *method([]) {}',
            'static async *method([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {}',
            'static async *method([ x = y ]) {}',
            'static async *method([w = a(), x = b(), y = c(), z = d()]) {}',
            'static async *method([x, y, z]) {}',
            'static async *method([x]) {}',
            'async *method({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}',
            'async *method({ w: { x, y, z } = undefined }) {}',
            'async *method({ x: y, }) {}',
            'async *method({ a: b = c }) {}',
            'async *method({ s: t = a(), u: v = b(), w: x = c(), y: z = d() }) {}',
            'async *method({ [function icefapper() {}]: x }) {}',
            'async *method({ x: [y], }) {}',
            'async *method({ a, b = function c(){}, d = ++icefapper }) {}',
            'async *method({ a = (function () {}), b = (0, function() {})  }) {}',
            'async *method({...rest} = {a: 3, b: 4}) {}',
            'async *method({ w: { x, y, z } = undefined } = { }) {}',
            'async *method({ w: [x, y, z] = [4, 5, 6] } = { w: null }) {}',
            'async *method({ w: [x, y, z] = [4, 5, 6] } = {}) {}',
            'async *method({ x = function() {} } = {}) {}',
            'async *method({ arrow = () => {} } = {}) {}',
            'async *method([...{ length }] = [1, 2, 3]) {}',
            'async *method([, , ...x] = [1, 2]) {}',
            'async *method([, ...x] = (function*() {})()) {}',
            'async *method([{ x }] = [null]) {}',
            'async *method([x, y, z] = [1, 2, 3]) {}',
            'async *method([x] = []) {}',
            'async *method([...{ length }]) {}',
            'async *method([...x]) {}',
            'async *method([, , ...x]) {}',
            'async *method([]) {}',
            ';;',
            'a(){}',
            'a(){}b(){}',
            'a(){};b(){};',
            'static(){};',
            'static static(){};',
            '"constructor"(){} ["constructor"](){}',
            'static ["prototype"](){}',
            'static constructor(){} static constructor(){}',
            'static async method(a, b,) {}',
            'async method(x, y = x, z = y) {}',
            'async *gen() {}',
            'static async *method() {}',
            'async *method(a, b,) {}',
            'async *method(x, y = x, z = y) {}',
            'static get \'string\'() { return \'get string\'; }',
            'static set \'string\'(param) { stringSet = param; }',
            'static get \'\'() { return \'get string\'; }',
            'static set \'\'(param) { stringSet = param; }',
            'static set [a](_) {}',
            'get 0() { return \'get string\'; }',
            'set 0(param) { stringSet = param; }',
            'constructor() {}',
            'constructor(a, b, c) {}',
            'constructor(x, y) {}',
            'method() { class SubClass {} }',
            'get c() {}',
            'get [\'c\']() {}',
            'get [\'d\']() {}',
            'get d() { return \'D\'; }',
            'set [\'a\'](_) {}',
            'static *[\'constructor\']() {}',
            'static [\'constructor\']() {}',
            'static set [\'constructor\'](x) {}',
            'static set [\'prototype\'](x) {}',
            'set [\'constructor\'](_) {}',
            '[\'constructor\']() {} [\'constructor\']() {}',
            'a() { return \'A\'; }',
            '[1]() { return \'B\'; }',
            'c() { return \'C\'; }',
            '[ID(2)]() { return \'D\'; }',
            '*[\'a\']() {  yield 1; yield 2; }',
            '*[\'constructor\']() {}',
            '*[\'constructor\']() {}',
            '[key1]() { return \'B\'; } c() { return \'C\'; }  [key2]() { return \'D\'; }',
            'a() { return \'A\'; }  [key1]() { return \'B\'; }  c() { return \'C\'; } [key2]() { return \'D\'; }',
            'static constructor() {}',
            'static get foo() {}',
            'static set(v) {};',
            'get [\'constructor\']() {}',
            'get foo() {} set foo(v) {}',
            'static get foo() {} static get bar() {}',
            'constructor() {}; static constructor() {}',
            'prototype() {}',
            'get get() {}',
            'async *gen() {  var v = yield* obj;  return \'return-value\'}',
            'eval() {}',
            '*eval() {}',
            'get eval() {}',
            'get arguments() {}',
            'set arguments(_) {}',
            'static arguments() {}',
            'static *arguments() {}',
            'static set arguments(_) {}',
            'async get(id) { return id; }',
            'async notget(id) { return id; }',
            '*async() {}',
            'static* async() {}',
            'async await() {}',
            'static async await() { }',
            'static async foo() { }',
            '*gen(v) { yield v; }',
            '*static() {}',
            'static get [foo]() {}',
            'set foo(v) {} get foo() {}',
            ';',
            ';;',
            ';;;;;;;;;;;;;;;;;;;',
            ';;;; a() {}',
            ';;;;  a() {} ;;;; b() {};;;  static a() {};;;',
            'static *bar() { }',
            'static[a](){}; static[b](){}',
            'static a(){} static get a(){} static set a(b){}',
            'static ["prototype"](){}',
            'async *method([arrow = () => {}] = []) { }',
            'async foo(a) { await a }',
            'async() { }',
            '*async() { }',
            'static* async() { }',
            'static async await() { }',
            'async "foo"(){}',
            'async 100(){}',
            'async await() {}',
            'static async f(){}',
            'async f(a) { await a }',
            'async ["xyz"]() {}',
            'async *method([{ x, y, z } = { x: 44, y: 55, z: 66 }] = []) {}',
            'async *method([{ x }] = []) {}',
            'async yield() {}',
            'static async await() { }',
            'async await() { }',
            'static* async() { }',
            '*async() { }',
            'static async() { }',
            'async() { }',
            'static async foo() { }',
            'async foo() { }',
            'foo() { }',
        ];

        for (const arg of validSyntax) {
            it(`class C { ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`class A extends B { ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class A extends B { ${arg} }`, undefined, Context.Empty);
                });
            });
        }

        pass(`class A extends class B extends C {} {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class A extends class B extends C {} {}`,
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
                    type: 'ClassDeclaration',
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
                        name: 'A'
                    },
                    superClass: {
                        type: 'ClassExpression',
                        start: 16,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        },
                        id: {
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
                            name: 'B'
                        },
                        superClass: {
                            type: 'Identifier',
                            start: 32,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            },
                            name: 'C'
                        },
                        body: {
                            type: 'ClassBody',
                            start: 34,
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 34
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            },
                            body: []
                        }
                    },
                    body: {
                        type: 'ClassBody',
                        start: 37,
                        end: 39,
                        loc: {
                            start: {
                                line: 1,
                                column: 37
                            },
                            end: {
                                line: 1,
                                column: 39
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`class A extends B {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class A extends B {}`,
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
                    type: 'ClassDeclaration',
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
                        name: 'A'
                    },
                    superClass: {
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
                        name: 'B'
                    },
                    body: {
                        type: 'ClassBody',
                        start: 18,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`class A{}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class A{}`,
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
                    type: 'ClassDeclaration',
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
                        name: 'A'
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
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
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`class C { method([x]) {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { method([x]) {} };`,
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
                        type: 'ClassDeclaration',
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 10,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 10,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    },
                                    name: 'method'
                                },
                                static: false,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 16,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    },
                                    id: null,
                                    generator: false,
                                    expression: false,
                                    async: false,
                                    params: [{
                                        type: 'ArrayPattern',
                                        start: 17,
                                        end: 20,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 20
                                            }
                                        },
                                        elements: [{
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
                                            name: 'x'
                                        }]
                                    }],
                                    body: {
                                        type: 'BlockStatement',
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
                                        },
                                        body: []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
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
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method({ x: y = 33 }) {}}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method({ x: y = 33 }) {}}`,
            expected: {
                type: 'Program',
                start: 0,
                end: 43,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 43
                    }
                },
                body: [{
                    type: 'ClassDeclaration',
                    start: 0,
                    end: 43,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 43
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
                        name: 'C'
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        start: 8,
                        end: 43,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 43
                            }
                        },
                        body: [{
                            type: 'MethodDefinition',
                            start: 10,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 42
                                }
                            },
                            computed: false,
                            key: {
                                type: 'Identifier',
                                start: 18,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                name: 'method'
                            },
                            static: true,
                            kind: 'method',
                            value: {
                                type: 'FunctionExpression',
                                start: 24,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [{
                                    type: 'ObjectPattern',
                                    start: 25,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 38
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
                                        start: 27,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
                                            start: 27,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            },
                                            name: 'x'
                                        },
                                        value: {
                                            type: 'AssignmentPattern',
                                            start: 30,
                                            end: 36,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 30
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 36
                                                }
                                            },
                                            left: {
                                                type: 'Identifier',
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
                                                },
                                                name: 'y'
                                            },
                                            right: {
                                                type: 'Literal',
                                                start: 34,
                                                end: 36,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 34
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 36
                                                    }
                                                },
                                                value: 33,
                                                raw: '33'
                                            }
                                        },
                                        kind: 'init'
                                    }]
                                }],
                                body: {
                                    type: 'BlockStatement',
                                    start: 40,
                                    end: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 40
                                        },
                                        end: {
                                            line: 1,
                                            column: 42
                                        }
                                    },
                                    body: []
                                }
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method({ a: x = ++b }) {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method({ a: x = ++b }) {} };`,
            expected: {
                type: 'Program',
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
                },
                body: [{
                        type: 'ClassDeclaration',
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 45,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 45
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 10,
                                end: 43,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 43
                                    }
                                },
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 18,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    },
                                    name: 'method'
                                },
                                static: true,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 24,
                                    end: 43,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 43
                                        }
                                    },
                                    id: null,
                                    generator: true,
                                    expression: false,
                                    async: false,
                                    params: [{
                                        type: 'ObjectPattern',
                                        start: 25,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        },
                                        properties: [{
                                            type: 'Property',
                                            start: 27,
                                            end: 37,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 37
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 27,
                                                end: 28,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 28
                                                    }
                                                },
                                                name: 'a'
                                            },
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 30,
                                                end: 37,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 30
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 37
                                                    }
                                                },
                                                left: {
                                                    type: 'Identifier',
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
                                                    },
                                                    name: 'x'
                                                },
                                                right: {
                                                    type: 'UpdateExpression',
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
                                                    },
                                                    operator: '++',
                                                    prefix: true,
                                                    argument: {
                                                        type: 'Identifier',
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
                                                        },
                                                        name: 'b'
                                                    }
                                                }
                                            },
                                            kind: 'init'
                                        }]
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 41,
                                        end: 43,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 41
                                            },
                                            end: {
                                                line: 1,
                                                column: 43
                                            }
                                        },
                                        body: []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 45,
                        end: 46,
                        loc: {
                            start: {
                                line: 1,
                                column: 45
                            },
                            end: {
                                line: 1,
                                column: 46
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method({ s: t = a(), u: v = b(), w: x = c(), y: z = d() }) {}}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method({ s: t = a(), u: v = b(), w: x = c(), y: z = d() }) {}}`,
            expected: {
                type: 'Program',
                start: 0,
                end: 80,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 80
                    }
                },
                body: [{
                    type: 'ClassDeclaration',
                    start: 0,
                    end: 80,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 80
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
                        name: 'C'
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        start: 8,
                        end: 80,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 80
                            }
                        },
                        body: [{
                            type: 'MethodDefinition',
                            start: 10,
                            end: 79,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 79
                                }
                            },
                            computed: false,
                            key: {
                                type: 'Identifier',
                                start: 18,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                name: 'method'
                            },
                            static: true,
                            kind: 'method',
                            value: {
                                type: 'FunctionExpression',
                                start: 24,
                                end: 79,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 79
                                    }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [{
                                    type: 'ObjectPattern',
                                    start: 25,
                                    end: 75,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 75
                                        }
                                    },
                                    properties: [{
                                            type: 'Property',
                                            start: 27,
                                            end: 37,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 37
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 27,
                                                end: 28,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 28
                                                    }
                                                },
                                                name: 's'
                                            },
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 30,
                                                end: 37,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 30
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 37
                                                    }
                                                },
                                                left: {
                                                    type: 'Identifier',
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
                                                    },
                                                    name: 't'
                                                },
                                                right: {
                                                    type: 'CallExpression',
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
                                                    },
                                                    callee: {
                                                        type: 'Identifier',
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
                                                        },
                                                        name: 'a'
                                                    },
                                                    arguments: []
                                                }
                                            },
                                            kind: 'init'
                                        },
                                        {
                                            type: 'Property',
                                            start: 39,
                                            end: 49,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 39
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 49
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 39,
                                                end: 40,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 39
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 40
                                                    }
                                                },
                                                name: 'u'
                                            },
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 42,
                                                end: 49,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 42
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 49
                                                    }
                                                },
                                                left: {
                                                    type: 'Identifier',
                                                    start: 42,
                                                    end: 43,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 42
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 43
                                                        }
                                                    },
                                                    name: 'v'
                                                },
                                                right: {
                                                    type: 'CallExpression',
                                                    start: 46,
                                                    end: 49,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 46
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 49
                                                        }
                                                    },
                                                    callee: {
                                                        type: 'Identifier',
                                                        start: 46,
                                                        end: 47,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 46
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 47
                                                            }
                                                        },
                                                        name: 'b'
                                                    },
                                                    arguments: []
                                                }
                                            },
                                            kind: 'init'
                                        },
                                        {
                                            type: 'Property',
                                            start: 51,
                                            end: 61,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 51
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 61
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 51,
                                                end: 52,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 51
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 52
                                                    }
                                                },
                                                name: 'w'
                                            },
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 54,
                                                end: 61,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 54
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 61
                                                    }
                                                },
                                                left: {
                                                    type: 'Identifier',
                                                    start: 54,
                                                    end: 55,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 54
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 55
                                                        }
                                                    },
                                                    name: 'x'
                                                },
                                                right: {
                                                    type: 'CallExpression',
                                                    start: 58,
                                                    end: 61,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 58
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 61
                                                        }
                                                    },
                                                    callee: {
                                                        type: 'Identifier',
                                                        start: 58,
                                                        end: 59,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 58
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 59
                                                            }
                                                        },
                                                        name: 'c'
                                                    },
                                                    arguments: []
                                                }
                                            },
                                            kind: 'init'
                                        },
                                        {
                                            type: 'Property',
                                            start: 63,
                                            end: 73,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 63
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 73
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 63,
                                                end: 64,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 63
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 64
                                                    }
                                                },
                                                name: 'y'
                                            },
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 66,
                                                end: 73,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 66
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 73
                                                    }
                                                },
                                                left: {
                                                    type: 'Identifier',
                                                    start: 66,
                                                    end: 67,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 66
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 67
                                                        }
                                                    },
                                                    name: 'z'
                                                },
                                                right: {
                                                    type: 'CallExpression',
                                                    start: 70,
                                                    end: 73,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 70
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 73
                                                        }
                                                    },
                                                    callee: {
                                                        type: 'Identifier',
                                                        start: 70,
                                                        end: 71,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 70
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 71
                                                            }
                                                        },
                                                        name: 'd'
                                                    },
                                                    arguments: []
                                                }
                                            },
                                            kind: 'init'
                                        }
                                    ]
                                }],
                                body: {
                                    type: 'BlockStatement',
                                    start: 77,
                                    end: 79,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 77
                                        },
                                        end: {
                                            line: 1,
                                            column: 79
                                        }
                                    },
                                    body: []
                                }
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method({ x: [y], }) {}}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method({ x: [y], }) {}}`,
            expected: {
                type: 'Program',
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
                },
                body: [{
                    type: 'ClassDeclaration',
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
                        name: 'C'
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        start: 8,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        },
                        body: [{
                            type: 'MethodDefinition',
                            start: 10,
                            end: 40,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 40
                                }
                            },
                            computed: false,
                            key: {
                                type: 'Identifier',
                                start: 18,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                name: 'method'
                            },
                            static: true,
                            kind: 'method',
                            value: {
                                type: 'FunctionExpression',
                                start: 24,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 40
                                    }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [{
                                    type: 'ObjectPattern',
                                    start: 25,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 36
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
                                        start: 27,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
                                            start: 27,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            },
                                            name: 'x'
                                        },
                                        value: {
                                            type: 'ArrayPattern',
                                            start: 30,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 30
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            },
                                            elements: [{
                                                type: 'Identifier',
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
                                                name: 'y'
                                            }]
                                        },
                                        kind: 'init'
                                    }]
                                }],
                                body: {
                                    type: 'BlockStatement',
                                    start: 38,
                                    end: 40,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 38
                                        },
                                        end: {
                                            line: 1,
                                            column: 40
                                        }
                                    },
                                    body: []
                                }
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method({ w: [x, y, z] = [4, 5, 6] }) {}}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method({ w: [x, y, z] = [4, 5, 6] }) {}}`,
            expected: {
                type: 'Program',
                start: 0,
                end: 58,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 58
                    }
                },
                body: [{
                    type: 'ClassDeclaration',
                    start: 0,
                    end: 58,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 58
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
                        name: 'C'
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        start: 8,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 58
                            }
                        },
                        body: [{
                            type: 'MethodDefinition',
                            start: 10,
                            end: 57,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 57
                                }
                            },
                            computed: false,
                            key: {
                                type: 'Identifier',
                                start: 18,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                name: 'method'
                            },
                            static: true,
                            kind: 'method',
                            value: {
                                type: 'FunctionExpression',
                                start: 24,
                                end: 57,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 57
                                    }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [{
                                    type: 'ObjectPattern',
                                    start: 25,
                                    end: 53,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 53
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
                                        start: 27,
                                        end: 51,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27
                                            },
                                            end: {
                                                line: 1,
                                                column: 51
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
                                            start: 27,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            },
                                            name: 'w'
                                        },
                                        value: {
                                            type: 'AssignmentPattern',
                                            start: 30,
                                            end: 51,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 30
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 51
                                                }
                                            },
                                            left: {
                                                type: 'ArrayPattern',
                                                start: 30,
                                                end: 39,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 30
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 39
                                                    }
                                                },
                                                elements: [{
                                                        type: 'Identifier',
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
                                                        name: 'x'
                                                    },
                                                    {
                                                        type: 'Identifier',
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
                                                        },
                                                        name: 'y'
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        start: 37,
                                                        end: 38,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 37
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 38
                                                            }
                                                        },
                                                        name: 'z'
                                                    }
                                                ]
                                            },
                                            right: {
                                                type: 'ArrayExpression',
                                                start: 42,
                                                end: 51,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 42
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 51
                                                    }
                                                },
                                                elements: [{
                                                        type: 'Literal',
                                                        start: 43,
                                                        end: 44,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 43
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 44
                                                            }
                                                        },
                                                        value: 4,
                                                        raw: '4'
                                                    },
                                                    {
                                                        type: 'Literal',
                                                        start: 46,
                                                        end: 47,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 46
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 47
                                                            }
                                                        },
                                                        value: 5,
                                                        raw: '5'
                                                    },
                                                    {
                                                        type: 'Literal',
                                                        start: 49,
                                                        end: 50,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 49
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 50
                                                            }
                                                        },
                                                        value: 6,
                                                        raw: '6'
                                                    }
                                                ]
                                            }
                                        },
                                        kind: 'init'
                                    }]
                                }],
                                body: {
                                    type: 'BlockStatement',
                                    start: 55,
                                    end: 57,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 55
                                        },
                                        end: {
                                            line: 1,
                                            column: 57
                                        }
                                    },
                                    body: []
                                }
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method({ w: [x, y, z] = [4, 5, 6] }) {}}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method({ w: [x, y, z] = [4, 5, 6] }) {}}`,
            expected: {
                type: 'Program',
                start: 0,
                end: 58,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 58
                    }
                },
                body: [{
                    type: 'ClassDeclaration',
                    start: 0,
                    end: 58,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 58
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
                        name: 'C'
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        start: 8,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 58
                            }
                        },
                        body: [{
                            type: 'MethodDefinition',
                            start: 10,
                            end: 57,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 57
                                }
                            },
                            computed: false,
                            key: {
                                type: 'Identifier',
                                start: 18,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                name: 'method'
                            },
                            static: true,
                            kind: 'method',
                            value: {
                                type: 'FunctionExpression',
                                start: 24,
                                end: 57,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 57
                                    }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [{
                                    type: 'ObjectPattern',
                                    start: 25,
                                    end: 53,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 53
                                        }
                                    },
                                    properties: [{
                                        type: 'Property',
                                        start: 27,
                                        end: 51,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27
                                            },
                                            end: {
                                                line: 1,
                                                column: 51
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
                                            start: 27,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            },
                                            name: 'w'
                                        },
                                        value: {
                                            type: 'AssignmentPattern',
                                            start: 30,
                                            end: 51,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 30
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 51
                                                }
                                            },
                                            left: {
                                                type: 'ArrayPattern',
                                                start: 30,
                                                end: 39,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 30
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 39
                                                    }
                                                },
                                                elements: [{
                                                        type: 'Identifier',
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
                                                        name: 'x'
                                                    },
                                                    {
                                                        type: 'Identifier',
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
                                                        },
                                                        name: 'y'
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        start: 37,
                                                        end: 38,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 37
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 38
                                                            }
                                                        },
                                                        name: 'z'
                                                    }
                                                ]
                                            },
                                            right: {
                                                type: 'ArrayExpression',
                                                start: 42,
                                                end: 51,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 42
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 51
                                                    }
                                                },
                                                elements: [{
                                                        type: 'Literal',
                                                        start: 43,
                                                        end: 44,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 43
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 44
                                                            }
                                                        },
                                                        value: 4,
                                                        raw: '4'
                                                    },
                                                    {
                                                        type: 'Literal',
                                                        start: 46,
                                                        end: 47,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 46
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 47
                                                            }
                                                        },
                                                        value: 5,
                                                        raw: '5'
                                                    },
                                                    {
                                                        type: 'Literal',
                                                        start: 49,
                                                        end: 50,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 49
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 50
                                                            }
                                                        },
                                                        value: 6,
                                                        raw: '6'
                                                    }
                                                ]
                                            }
                                        },
                                        kind: 'init'
                                    }]
                                }],
                                body: {
                                    type: 'BlockStatement',
                                    start: 55,
                                    end: 57,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 55
                                        },
                                        end: {
                                            line: 1,
                                            column: 57
                                        }
                                    },
                                    body: []
                                }
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method({ fn = function () {}, xFn = function x() {} }) {}}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method({ fn = function () {}, xFn = function x() {} }) {}}`,
            expected: {
                type: 'Program',
                start: 0,
                end: 76,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 76
                    }
                },
                body: [{
                    type: 'ClassDeclaration',
                    start: 0,
                    end: 76,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 76
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
                        name: 'C'
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        start: 8,
                        end: 76,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 76
                            }
                        },
                        body: [{
                            type: 'MethodDefinition',
                            start: 10,
                            end: 75,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 75
                                }
                            },
                            computed: false,
                            key: {
                                type: 'Identifier',
                                start: 18,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                name: 'method'
                            },
                            static: true,
                            kind: 'method',
                            value: {
                                type: 'FunctionExpression',
                                start: 24,
                                end: 75,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 75
                                    }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [{
                                    type: 'ObjectPattern',
                                    start: 25,
                                    end: 71,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 71
                                        }
                                    },
                                    properties: [{
                                            type: 'Property',
                                            start: 27,
                                            end: 46,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 46
                                                }
                                            },
                                            method: false,
                                            shorthand: true,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 27,
                                                end: 29,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 29
                                                    }
                                                },
                                                name: 'fn'
                                            },
                                            kind: 'init',
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 27,
                                                end: 46,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 46
                                                    }
                                                },
                                                left: {
                                                    type: 'Identifier',
                                                    start: 27,
                                                    end: 29,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 27
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 29
                                                        }
                                                    },
                                                    name: 'fn'
                                                },
                                                right: {
                                                    type: 'FunctionExpression',
                                                    start: 32,
                                                    end: 46,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 32
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 46
                                                        }
                                                    },
                                                    id: null,
                                                    generator: false,
                                                    expression: false,
                                                    async: false,
                                                    params: [],
                                                    body: {
                                                        type: 'BlockStatement',
                                                        start: 44,
                                                        end: 46,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 44
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 46
                                                            }
                                                        },
                                                        body: []
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            type: 'Property',
                                            start: 48,
                                            end: 69,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 48
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 69
                                                }
                                            },
                                            method: false,
                                            shorthand: true,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 48,
                                                end: 51,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 48
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 51
                                                    }
                                                },
                                                name: 'xFn'
                                            },
                                            kind: 'init',
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 48,
                                                end: 69,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 48
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 69
                                                    }
                                                },
                                                left: {
                                                    type: 'Identifier',
                                                    start: 48,
                                                    end: 51,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 48
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 51
                                                        }
                                                    },
                                                    name: 'xFn'
                                                },
                                                right: {
                                                    type: 'FunctionExpression',
                                                    start: 54,
                                                    end: 69,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 54
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 69
                                                        }
                                                    },
                                                    id: {
                                                        type: 'Identifier',
                                                        start: 63,
                                                        end: 64,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 63
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 64
                                                            }
                                                        },
                                                        name: 'x'
                                                    },
                                                    generator: false,
                                                    expression: false,
                                                    async: false,
                                                    params: [],
                                                    body: {
                                                        type: 'BlockStatement',
                                                        start: 67,
                                                        end: 69,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 67
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 69
                                                            }
                                                        },
                                                        body: []
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }],
                                body: {
                                    type: 'BlockStatement',
                                    start: 73,
                                    end: 75,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 73
                                        },
                                        end: {
                                            line: 1,
                                            column: 75
                                        }
                                    },
                                    body: []
                                }
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method({ foo = class {}, bar = class X {}, zoo = class { static name() {} } }) {}}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method({ foo = class {}, bar = class X {}, zoo = class { static name() {} } }) {}}`,
            expected: {
                type: 'Program',
                start: 0,
                end: 100,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 100
                    }
                },
                body: [{
                    type: 'ClassDeclaration',
                    start: 0,
                    end: 100,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 100
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
                        name: 'C'
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        start: 8,
                        end: 100,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 100
                            }
                        },
                        body: [{
                            type: 'MethodDefinition',
                            start: 10,
                            end: 99,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 99
                                }
                            },
                            computed: false,
                            key: {
                                type: 'Identifier',
                                start: 18,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                name: 'method'
                            },
                            static: true,
                            kind: 'method',
                            value: {
                                type: 'FunctionExpression',
                                start: 24,
                                end: 99,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 99
                                    }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [{
                                    type: 'ObjectPattern',
                                    start: 25,
                                    end: 95,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 95
                                        }
                                    },
                                    properties: [{
                                            type: 'Property',
                                            start: 27,
                                            end: 41,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 41
                                                }
                                            },
                                            method: false,
                                            shorthand: true,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 27,
                                                end: 30,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30
                                                    }
                                                },
                                                name: 'foo'
                                            },
                                            kind: 'init',
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 27,
                                                end: 41,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 41
                                                    }
                                                },
                                                left: {
                                                    type: 'Identifier',
                                                    start: 27,
                                                    end: 30,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 27
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 30
                                                        }
                                                    },
                                                    name: 'foo'
                                                },
                                                right: {
                                                    type: 'ClassExpression',
                                                    start: 33,
                                                    end: 41,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 33
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 41
                                                        }
                                                    },
                                                    id: null,
                                                    superClass: null,
                                                    body: {
                                                        type: 'ClassBody',
                                                        start: 39,
                                                        end: 41,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 39
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 41
                                                            }
                                                        },
                                                        body: []
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            type: 'Property',
                                            start: 43,
                                            end: 59,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 43
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 59
                                                }
                                            },
                                            method: false,
                                            shorthand: true,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 43,
                                                end: 46,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 43
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 46
                                                    }
                                                },
                                                name: 'bar'
                                            },
                                            kind: 'init',
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 43,
                                                end: 59,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 43
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 59
                                                    }
                                                },
                                                left: {
                                                    type: 'Identifier',
                                                    start: 43,
                                                    end: 46,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 43
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 46
                                                        }
                                                    },
                                                    name: 'bar'
                                                },
                                                right: {
                                                    type: 'ClassExpression',
                                                    start: 49,
                                                    end: 59,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 49
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 59
                                                        }
                                                    },
                                                    id: {
                                                        type: 'Identifier',
                                                        start: 55,
                                                        end: 56,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 55
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 56
                                                            }
                                                        },
                                                        name: 'X'
                                                    },
                                                    superClass: null,
                                                    body: {
                                                        type: 'ClassBody',
                                                        start: 57,
                                                        end: 59,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 57
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 59
                                                            }
                                                        },
                                                        body: []
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            type: 'Property',
                                            start: 61,
                                            end: 93,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 61
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 93
                                                }
                                            },
                                            method: false,
                                            shorthand: true,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 61,
                                                end: 64,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 61
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 64
                                                    }
                                                },
                                                name: 'zoo'
                                            },
                                            kind: 'init',
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 61,
                                                end: 93,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 61
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 93
                                                    }
                                                },
                                                left: {
                                                    type: 'Identifier',
                                                    start: 61,
                                                    end: 64,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 61
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 64
                                                        }
                                                    },
                                                    name: 'zoo'
                                                },
                                                right: {
                                                    type: 'ClassExpression',
                                                    start: 67,
                                                    end: 93,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 67
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 93
                                                        }
                                                    },
                                                    id: null,
                                                    superClass: null,
                                                    body: {
                                                        type: 'ClassBody',
                                                        start: 73,
                                                        end: 93,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 73
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 93
                                                            }
                                                        },
                                                        body: [{
                                                            type: 'MethodDefinition',
                                                            start: 75,
                                                            end: 91,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 75
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 91
                                                                }
                                                            },
                                                            computed: false,
                                                            key: {
                                                                type: 'Identifier',
                                                                start: 82,
                                                                end: 86,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 82
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 86
                                                                    }
                                                                },
                                                                name: 'name'
                                                            },
                                                            static: true,
                                                            kind: 'method',
                                                            value: {
                                                                type: 'FunctionExpression',
                                                                start: 86,
                                                                end: 91,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 86
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 91
                                                                    }
                                                                },
                                                                id: null,
                                                                generator: false,
                                                                expression: false,
                                                                async: false,
                                                                params: [],
                                                                body: {
                                                                    type: 'BlockStatement',
                                                                    start: 89,
                                                                    end: 91,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 89
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 91
                                                                        }
                                                                    },
                                                                    body: []
                                                                }
                                                            }
                                                        }]
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }],
                                body: {
                                    type: 'BlockStatement',
                                    start: 97,
                                    end: 99,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 97
                                        },
                                        end: {
                                            line: 1,
                                            column: 99
                                        }
                                    },
                                    body: []
                                }
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('class A extends B { a() { [super.b] = c } }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'class A extends B { a() { [super.b] = c } }',
            expected: {
                type: 'Program',
                start: 0,
                end: 43,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 43
                  }
                },
                body: [
                  {
                    type: 'ClassDeclaration',
                    start: 0,
                    end: 43,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 43
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
                      name: 'A'
                    },
                    superClass: {
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
                      name: 'B'
                    },
                    body: {
                      type: 'ClassBody',
                      start: 18,
                      end: 43,
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 43
                        }
                      },
                      body: [
                        {
                          type: 'MethodDefinition',
                          start: 20,
                          end: 41,
                          loc: {
                            start: {
                              line: 1,
                              column: 20
                            },
                            end: {
                              line: 1,
                              column: 41
                            }
                          },
                          computed: false,
                          key: {
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
                            name: 'a'
                          },
                          static: false,
                          kind: 'method',
                          value: {
                            type: 'FunctionExpression',
                            start: 21,
                            end: 41,
                            loc: {
                              start: {
                                line: 1,
                                column: 21
                              },
                              end: {
                                line: 1,
                                column: 41
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 24,
                              end: 41,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 24
                                },
                                end: {
                                  line: 1,
                                  column: 41
                                }
                              },
                              body: [
                                {
                                  type: 'ExpressionStatement',
                                  start: 26,
                                  end: 39,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 26
                                    },
                                    end: {
                                      line: 1,
                                      column: 39
                                    }
                                  },
                                  expression: {
                                    type: 'AssignmentExpression',
                                    start: 26,
                                    end: 39,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 26
                                      },
                                      end: {
                                        line: 1,
                                        column: 39
                                      }
                                    },
                                    operator: '=',
                                    left: {
                                      type: 'ArrayPattern',
                                      start: 26,
                                      end: 35,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 26
                                        },
                                        end: {
                                          line: 1,
                                          column: 35
                                        }
                                      },
                                      elements: [
                                        {
                                          type: 'MemberExpression',
                                          start: 27,
                                          end: 34,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 27
                                            },
                                            end: {
                                              line: 1,
                                              column: 34
                                            }
                                          },
                                          object: {
                                            type: 'Super',
                                            start: 27,
                                            end: 32,
                                            loc: {
                                              start: {
                                                line: 1,
                                                column: 27
                                              },
                                              end: {
                                                line: 1,
                                                column: 32
                                              }
                                            }
                                          },
                                          property: {
                                            type: 'Identifier',
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
                                            },
                                            name: 'b'
                                          },
                                          computed: false
                                        }
                                      ]
                                    },
                                    right: {
                                      type: 'Identifier',
                                      start: 38,
                                      end: 39,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 38
                                        },
                                        end: {
                                          line: 1,
                                          column: 39
                                        }
                                      },
                                      name: 'c'
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass('class A extends B { a() { ({b: super[c]} = d) } }',  Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'class A extends B { a() { ({b: super[c]} = d) } }',
            expected: {
                type: 'Program',
                start: 0,
                end: 49,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 49
                  }
                },
                body: [
                  {
                    type: 'ClassDeclaration',
                    start: 0,
                    end: 49,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 49
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
                      name: 'A'
                    },
                    superClass: {
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
                      name: 'B'
                    },
                    body: {
                      type: 'ClassBody',
                      start: 18,
                      end: 49,
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 49
                        }
                      },
                      body: [
                        {
                          type: 'MethodDefinition',
                          start: 20,
                          end: 47,
                          loc: {
                            start: {
                              line: 1,
                              column: 20
                            },
                            end: {
                              line: 1,
                              column: 47
                            }
                          },
                          computed: false,
                          key: {
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
                            name: 'a'
                          },
                          static: false,
                          kind: 'method',
                          value: {
                            type: 'FunctionExpression',
                            start: 21,
                            end: 47,
                            loc: {
                              start: {
                                line: 1,
                                column: 21
                              },
                              end: {
                                line: 1,
                                column: 47
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 24,
                              end: 47,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 24
                                },
                                end: {
                                  line: 1,
                                  column: 47
                                }
                              },
                              body: [
                                {
                                  type: 'ExpressionStatement',
                                  start: 26,
                                  end: 45,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 26
                                    },
                                    end: {
                                      line: 1,
                                      column: 45
                                    }
                                  },
                                  expression: {
                                    type: 'AssignmentExpression',
                                    start: 27,
                                    end: 44,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 27
                                      },
                                      end: {
                                        line: 1,
                                        column: 44
                                      }
                                    },
                                    operator: '=',
                                    left: {
                                      type: 'ObjectPattern',
                                      start: 27,
                                      end: 40,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 27
                                        },
                                        end: {
                                          line: 1,
                                          column: 40
                                        }
                                      },
                                      properties: [
                                        {
                                          type: 'Property',
                                          start: 28,
                                          end: 39,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 28
                                            },
                                            end: {
                                              line: 1,
                                              column: 39
                                            }
                                          },
                                          method: false,
                                          shorthand: false,
                                          computed: false,
                                          key: {
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
                                            name: 'b'
                                          },
                                          value: {
                                            type: 'MemberExpression',
                                            start: 31,
                                            end: 39,
                                            loc: {
                                              start: {
                                                line: 1,
                                                column: 31
                                              },
                                              end: {
                                                line: 1,
                                                column: 39
                                              }
                                            },
                                            object: {
                                              type: 'Super',
                                              start: 31,
                                              end: 36,
                                              loc: {
                                                start: {
                                                  line: 1,
                                                  column: 31
                                                },
                                                end: {
                                                  line: 1,
                                                  column: 36
                                                }
                                              }
                                            },
                                            property: {
                                              type: 'Identifier',
                                              start: 37,
                                              end: 38,
                                              loc: {
                                                start: {
                                                  line: 1,
                                                  column: 37
                                                },
                                                end: {
                                                  line: 1,
                                                  column: 38
                                                }
                                              },
                                              name: 'c'
                                            },
                                            computed: true
                                          },
                                          kind: 'init'
                                        }
                                      ]
                                    },
                                    right: {
                                      type: 'Identifier',
                                      start: 43,
                                      end: 44,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 43
                                        },
                                        end: {
                                          line: 1,
                                          column: 44
                                        }
                                      },
                                      name: 'd'
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`class C { static *method({ icefapper }) {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method({ icefapper }) {} };`,
            expected: {
                type: 'Program',
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
                },
                body: [{
                        type: 'ClassDeclaration',
                        start: 0,
                        end: 44,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 44
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 44,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 44
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 10,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                },
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 18,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    },
                                    name: 'method'
                                },
                                static: true,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 24,
                                    end: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 42
                                        }
                                    },
                                    id: null,
                                    generator: true,
                                    expression: false,
                                    async: false,
                                    params: [{
                                        type: 'ObjectPattern',
                                        start: 25,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 38
                                            }
                                        },
                                        properties: [{
                                            type: 'Property',
                                            start: 27,
                                            end: 36,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 36
                                                }
                                            },
                                            method: false,
                                            shorthand: true,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 27,
                                                end: 36,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 36
                                                    }
                                                },
                                                name: 'icefapper'
                                            },
                                            kind: 'init',
                                            value: {
                                                type: 'Identifier',
                                                start: 27,
                                                end: 36,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 36
                                                    }
                                                },
                                                name: 'icefapper'
                                            }
                                        }]
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 40,
                                        end: 42,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 40
                                            },
                                            end: {
                                                line: 1,
                                                column: 42
                                            }
                                        },
                                        body: []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 44,
                        end: 45,
                        loc: {
                            start: {
                                line: 1,
                                column: 44
                            },
                            end: {
                                line: 1,
                                column: 45
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method({ icefapper = poisoned }) {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method({ icefapper = poisoned }) {} };`,
            expected: {
                type: 'Program',
                start: 0,
                end: 56,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 56
                    }
                },
                body: [{
                        type: 'ClassDeclaration',
                        start: 0,
                        end: 55,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 55
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 55,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 55
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 10,
                                end: 53,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 53
                                    }
                                },
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 18,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    },
                                    name: 'method'
                                },
                                static: true,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 24,
                                    end: 53,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 53
                                        }
                                    },
                                    id: null,
                                    generator: true,
                                    expression: false,
                                    async: false,
                                    params: [{
                                        type: 'ObjectPattern',
                                        start: 25,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 49
                                            }
                                        },
                                        properties: [{
                                            type: 'Property',
                                            start: 27,
                                            end: 47,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 47
                                                }
                                            },
                                            method: false,
                                            shorthand: true,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 27,
                                                end: 36,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 36
                                                    }
                                                },
                                                name: 'icefapper'
                                            },
                                            kind: 'init',
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 27,
                                                end: 47,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 47
                                                    }
                                                },
                                                left: {
                                                    type: 'Identifier',
                                                    start: 27,
                                                    end: 36,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 27
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 36
                                                        }
                                                    },
                                                    name: 'icefapper'
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    start: 39,
                                                    end: 47,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 39
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 47
                                                        }
                                                    },
                                                    name: 'poisoned'
                                                }
                                            }
                                        }]
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 51,
                                        end: 53,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 51
                                            },
                                            end: {
                                                line: 1,
                                                column: 53
                                            }
                                        },
                                        body: []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 55,
                        end: 56,
                        loc: {
                            start: {
                                line: 1,
                                column: 55
                            },
                            end: {
                                line: 1,
                                column: 56
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } }) {}}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } }) {}}`,
            expected: {
                type: 'Program',
                start: 0,
                end: 103,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 103
                    }
                },
                body: [{
                    type: 'ClassDeclaration',
                    start: 0,
                    end: 103,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 103
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
                        name: 'C'
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        start: 8,
                        end: 103,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 103
                            }
                        },
                        body: [{
                            type: 'MethodDefinition',
                            start: 10,
                            end: 102,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 102
                                }
                            },
                            computed: false,
                            key: {
                                type: 'Identifier',
                                start: 18,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                name: 'method'
                            },
                            static: true,
                            kind: 'method',
                            value: {
                                type: 'FunctionExpression',
                                start: 24,
                                end: 102,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 102
                                    }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [{
                                    type: 'AssignmentPattern',
                                    start: 25,
                                    end: 98,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 98
                                        }
                                    },
                                    left: {
                                        type: 'ObjectPattern',
                                        start: 25,
                                        end: 66,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 66
                                            }
                                        },
                                        properties: [{
                                            type: 'Property',
                                            start: 27,
                                            end: 64,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 64
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 27,
                                                end: 28,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 28
                                                    }
                                                },
                                                name: 'w'
                                            },
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 30,
                                                end: 64,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 30
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 64
                                                    }
                                                },
                                                left: {
                                                    type: 'ObjectPattern',
                                                    start: 30,
                                                    end: 41,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 30
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 41
                                                        }
                                                    },
                                                    properties: [{
                                                            type: 'Property',
                                                            start: 32,
                                                            end: 33,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 32
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 33
                                                                }
                                                            },
                                                            method: false,
                                                            shorthand: true,
                                                            computed: false,
                                                            key: {
                                                                type: 'Identifier',
                                                                start: 32,
                                                                end: 33,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 32
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 33
                                                                    }
                                                                },
                                                                name: 'x'
                                                            },
                                                            kind: 'init',
                                                            value: {
                                                                type: 'Identifier',
                                                                start: 32,
                                                                end: 33,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 32
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 33
                                                                    }
                                                                },
                                                                name: 'x'
                                                            }
                                                        },
                                                        {
                                                            type: 'Property',
                                                            start: 35,
                                                            end: 36,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 35
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 36
                                                                }
                                                            },
                                                            method: false,
                                                            shorthand: true,
                                                            computed: false,
                                                            key: {
                                                                type: 'Identifier',
                                                                start: 35,
                                                                end: 36,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 35
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 36
                                                                    }
                                                                },
                                                                name: 'y'
                                                            },
                                                            kind: 'init',
                                                            value: {
                                                                type: 'Identifier',
                                                                start: 35,
                                                                end: 36,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 35
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 36
                                                                    }
                                                                },
                                                                name: 'y'
                                                            }
                                                        },
                                                        {
                                                            type: 'Property',
                                                            start: 38,
                                                            end: 39,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 38
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 39
                                                                }
                                                            },
                                                            method: false,
                                                            shorthand: true,
                                                            computed: false,
                                                            key: {
                                                                type: 'Identifier',
                                                                start: 38,
                                                                end: 39,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 38
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 39
                                                                    }
                                                                },
                                                                name: 'z'
                                                            },
                                                            kind: 'init',
                                                            value: {
                                                                type: 'Identifier',
                                                                start: 38,
                                                                end: 39,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 38
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 39
                                                                    }
                                                                },
                                                                name: 'z'
                                                            }
                                                        }
                                                    ]
                                                },
                                                right: {
                                                    type: 'ObjectExpression',
                                                    start: 44,
                                                    end: 64,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 44
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 64
                                                        }
                                                    },
                                                    properties: [{
                                                            type: 'Property',
                                                            start: 46,
                                                            end: 50,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 46
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 50
                                                                }
                                                            },
                                                            method: false,
                                                            shorthand: false,
                                                            computed: false,
                                                            key: {
                                                                type: 'Identifier',
                                                                start: 46,
                                                                end: 47,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 46
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 47
                                                                    }
                                                                },
                                                                name: 'x'
                                                            },
                                                            value: {
                                                                type: 'Literal',
                                                                start: 49,
                                                                end: 50,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 49
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 50
                                                                    }
                                                                },
                                                                value: 4,
                                                                raw: '4'
                                                            },
                                                            kind: 'init'
                                                        },
                                                        {
                                                            type: 'Property',
                                                            start: 52,
                                                            end: 56,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 52
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 56
                                                                }
                                                            },
                                                            method: false,
                                                            shorthand: false,
                                                            computed: false,
                                                            key: {
                                                                type: 'Identifier',
                                                                start: 52,
                                                                end: 53,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 52
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 53
                                                                    }
                                                                },
                                                                name: 'y'
                                                            },
                                                            value: {
                                                                type: 'Literal',
                                                                start: 55,
                                                                end: 56,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 55
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 56
                                                                    }
                                                                },
                                                                value: 5,
                                                                raw: '5'
                                                            },
                                                            kind: 'init'
                                                        },
                                                        {
                                                            type: 'Property',
                                                            start: 58,
                                                            end: 62,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 58
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 62
                                                                }
                                                            },
                                                            method: false,
                                                            shorthand: false,
                                                            computed: false,
                                                            key: {
                                                                type: 'Identifier',
                                                                start: 58,
                                                                end: 59,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 58
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 59
                                                                    }
                                                                },
                                                                name: 'z'
                                                            },
                                                            value: {
                                                                type: 'Literal',
                                                                start: 61,
                                                                end: 62,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 61
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 62
                                                                    }
                                                                },
                                                                value: 6,
                                                                raw: '6'
                                                            },
                                                            kind: 'init'
                                                        }
                                                    ]
                                                }
                                            },
                                            kind: 'init'
                                        }]
                                    },
                                    right: {
                                        type: 'ObjectExpression',
                                        start: 69,
                                        end: 98,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 69
                                            },
                                            end: {
                                                line: 1,
                                                column: 98
                                            }
                                        },
                                        properties: [{
                                            type: 'Property',
                                            start: 71,
                                            end: 96,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 71
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 96
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Identifier',
                                                start: 71,
                                                end: 72,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 71
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 72
                                                    }
                                                },
                                                name: 'w'
                                            },
                                            value: {
                                                type: 'ObjectExpression',
                                                start: 74,
                                                end: 96,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 74
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 96
                                                    }
                                                },
                                                properties: [{
                                                        type: 'Property',
                                                        start: 76,
                                                        end: 88,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 76
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 88
                                                            }
                                                        },
                                                        method: false,
                                                        shorthand: false,
                                                        computed: false,
                                                        key: {
                                                            type: 'Identifier',
                                                            start: 76,
                                                            end: 77,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 76
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 77
                                                                }
                                                            },
                                                            name: 'x'
                                                        },
                                                        value: {
                                                            type: 'Identifier',
                                                            start: 79,
                                                            end: 88,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 79
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 88
                                                                }
                                                            },
                                                            name: 'undefined'
                                                        },
                                                        kind: 'init'
                                                    },
                                                    {
                                                        type: 'Property',
                                                        start: 90,
                                                        end: 94,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 90
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 94
                                                            }
                                                        },
                                                        method: false,
                                                        shorthand: false,
                                                        computed: false,
                                                        key: {
                                                            type: 'Identifier',
                                                            start: 90,
                                                            end: 91,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 90
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 91
                                                                }
                                                            },
                                                            name: 'z'
                                                        },
                                                        value: {
                                                            type: 'Literal',
                                                            start: 93,
                                                            end: 94,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 93
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 94
                                                                }
                                                            },
                                                            value: 7,
                                                            raw: '7'
                                                        },
                                                        kind: 'init'
                                                    }
                                                ]
                                            },
                                            kind: 'init'
                                        }]
                                    }
                                }],
                                body: {
                                    type: 'BlockStatement',
                                    start: 100,
                                    end: 102,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 100
                                        },
                                        end: {
                                            line: 1,
                                            column: 102
                                        }
                                    },
                                    body: []
                                }
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: null }) {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: null }) {} };`,
            expected: {
                type: 'Program',
                start: 0,
                end: 87,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 87
                    }
                },
                body: [{
                        type: 'ClassDeclaration',
                        start: 0,
                        end: 86,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 86
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 86,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 86
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 10,
                                end: 84,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 84
                                    }
                                },
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 18,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    },
                                    name: 'method'
                                },
                                static: true,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 24,
                                    end: 84,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 84
                                        }
                                    },
                                    id: null,
                                    generator: true,
                                    expression: false,
                                    async: false,
                                    params: [{
                                        type: 'AssignmentPattern',
                                        start: 25,
                                        end: 80,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 80
                                            }
                                        },
                                        left: {
                                            type: 'ObjectPattern',
                                            start: 25,
                                            end: 66,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 66
                                                }
                                            },
                                            properties: [{
                                                type: 'Property',
                                                start: 27,
                                                end: 64,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 64
                                                    }
                                                },
                                                method: false,
                                                shorthand: false,
                                                computed: false,
                                                key: {
                                                    type: 'Identifier',
                                                    start: 27,
                                                    end: 28,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 27
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 28
                                                        }
                                                    },
                                                    name: 'w'
                                                },
                                                value: {
                                                    type: 'AssignmentPattern',
                                                    start: 30,
                                                    end: 64,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 30
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 64
                                                        }
                                                    },
                                                    left: {
                                                        type: 'ObjectPattern',
                                                        start: 30,
                                                        end: 41,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 30
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 41
                                                            }
                                                        },
                                                        properties: [{
                                                                type: 'Property',
                                                                start: 32,
                                                                end: 33,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 32
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 33
                                                                    }
                                                                },
                                                                method: false,
                                                                shorthand: true,
                                                                computed: false,
                                                                key: {
                                                                    type: 'Identifier',
                                                                    start: 32,
                                                                    end: 33,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 32
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 33
                                                                        }
                                                                    },
                                                                    name: 'x'
                                                                },
                                                                kind: 'init',
                                                                value: {
                                                                    type: 'Identifier',
                                                                    start: 32,
                                                                    end: 33,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 32
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 33
                                                                        }
                                                                    },
                                                                    name: 'x'
                                                                }
                                                            },
                                                            {
                                                                type: 'Property',
                                                                start: 35,
                                                                end: 36,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 35
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 36
                                                                    }
                                                                },
                                                                method: false,
                                                                shorthand: true,
                                                                computed: false,
                                                                key: {
                                                                    type: 'Identifier',
                                                                    start: 35,
                                                                    end: 36,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 35
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 36
                                                                        }
                                                                    },
                                                                    name: 'y'
                                                                },
                                                                kind: 'init',
                                                                value: {
                                                                    type: 'Identifier',
                                                                    start: 35,
                                                                    end: 36,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 35
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 36
                                                                        }
                                                                    },
                                                                    name: 'y'
                                                                }
                                                            },
                                                            {
                                                                type: 'Property',
                                                                start: 38,
                                                                end: 39,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 38
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 39
                                                                    }
                                                                },
                                                                method: false,
                                                                shorthand: true,
                                                                computed: false,
                                                                key: {
                                                                    type: 'Identifier',
                                                                    start: 38,
                                                                    end: 39,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 38
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 39
                                                                        }
                                                                    },
                                                                    name: 'z'
                                                                },
                                                                kind: 'init',
                                                                value: {
                                                                    type: 'Identifier',
                                                                    start: 38,
                                                                    end: 39,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 38
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 39
                                                                        }
                                                                    },
                                                                    name: 'z'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    right: {
                                                        type: 'ObjectExpression',
                                                        start: 44,
                                                        end: 64,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 44
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 64
                                                            }
                                                        },
                                                        properties: [{
                                                                type: 'Property',
                                                                start: 46,
                                                                end: 50,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 46
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 50
                                                                    }
                                                                },
                                                                method: false,
                                                                shorthand: false,
                                                                computed: false,
                                                                key: {
                                                                    type: 'Identifier',
                                                                    start: 46,
                                                                    end: 47,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 46
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 47
                                                                        }
                                                                    },
                                                                    name: 'x'
                                                                },
                                                                value: {
                                                                    type: 'Literal',
                                                                    start: 49,
                                                                    end: 50,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 49
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 50
                                                                        }
                                                                    },
                                                                    value: 4,
                                                                    raw: '4'
                                                                },
                                                                kind: 'init'
                                                            },
                                                            {
                                                                type: 'Property',
                                                                start: 52,
                                                                end: 56,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 52
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 56
                                                                    }
                                                                },
                                                                method: false,
                                                                shorthand: false,
                                                                computed: false,
                                                                key: {
                                                                    type: 'Identifier',
                                                                    start: 52,
                                                                    end: 53,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 52
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 53
                                                                        }
                                                                    },
                                                                    name: 'y'
                                                                },
                                                                value: {
                                                                    type: 'Literal',
                                                                    start: 55,
                                                                    end: 56,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 55
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 56
                                                                        }
                                                                    },
                                                                    value: 5,
                                                                    raw: '5'
                                                                },
                                                                kind: 'init'
                                                            },
                                                            {
                                                                type: 'Property',
                                                                start: 58,
                                                                end: 62,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 58
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 62
                                                                    }
                                                                },
                                                                method: false,
                                                                shorthand: false,
                                                                computed: false,
                                                                key: {
                                                                    type: 'Identifier',
                                                                    start: 58,
                                                                    end: 59,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 58
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 59
                                                                        }
                                                                    },
                                                                    name: 'z'
                                                                },
                                                                value: {
                                                                    type: 'Literal',
                                                                    start: 61,
                                                                    end: 62,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 61
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 62
                                                                        }
                                                                    },
                                                                    value: 6,
                                                                    raw: '6'
                                                                },
                                                                kind: 'init'
                                                            }
                                                        ]
                                                    }
                                                },
                                                kind: 'init'
                                            }]
                                        },
                                        right: {
                                            type: 'ObjectExpression',
                                            start: 69,
                                            end: 80,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 69
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 80
                                                }
                                            },
                                            properties: [{
                                                type: 'Property',
                                                start: 71,
                                                end: 78,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 71
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 78
                                                    }
                                                },
                                                method: false,
                                                shorthand: false,
                                                computed: false,
                                                key: {
                                                    type: 'Identifier',
                                                    start: 71,
                                                    end: 72,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 71
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 72
                                                        }
                                                    },
                                                    name: 'w'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    start: 74,
                                                    end: 78,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 74
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 78
                                                        }
                                                    },
                                                    value: null,
                                                    raw: 'null'
                                                },
                                                kind: 'init'
                                            }]
                                        }
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 82,
                                        end: 84,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 82
                                            },
                                            end: {
                                                line: 1,
                                                column: 84
                                            }
                                        },
                                        body: []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 86,
                        end: 87,
                        loc: {
                            start: {
                                line: 1,
                                column: 86
                            },
                            end: {
                                line: 1,
                                column: 87
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method({ w: [x, y, z] = [4, 5, 6] } = { w: null }) {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method({ w: [x, y, z] = [4, 5, 6] } = { w: null }) {} };`,
            expected: {
                type: 'Program',
                start: 0,
                end: 74,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 74
                    }
                },
                body: [{
                        type: 'ClassDeclaration',
                        start: 0,
                        end: 73,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 73
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 73,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 73
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 10,
                                end: 71,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 71
                                    }
                                },
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 18,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    },
                                    name: 'method'
                                },
                                static: true,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 24,
                                    end: 71,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 71
                                        }
                                    },
                                    id: null,
                                    generator: true,
                                    expression: false,
                                    async: false,
                                    params: [{
                                        type: 'AssignmentPattern',
                                        start: 25,
                                        end: 67,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 67
                                            }
                                        },
                                        left: {
                                            type: 'ObjectPattern',
                                            start: 25,
                                            end: 53,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 53
                                                }
                                            },
                                            properties: [{
                                                type: 'Property',
                                                start: 27,
                                                end: 51,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 51
                                                    }
                                                },
                                                method: false,
                                                shorthand: false,
                                                computed: false,
                                                key: {
                                                    type: 'Identifier',
                                                    start: 27,
                                                    end: 28,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 27
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 28
                                                        }
                                                    },
                                                    name: 'w'
                                                },
                                                value: {
                                                    type: 'AssignmentPattern',
                                                    start: 30,
                                                    end: 51,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 30
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 51
                                                        }
                                                    },
                                                    left: {
                                                        type: 'ArrayPattern',
                                                        start: 30,
                                                        end: 39,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 30
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 39
                                                            }
                                                        },
                                                        elements: [{
                                                                type: 'Identifier',
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
                                                                name: 'x'
                                                            },
                                                            {
                                                                type: 'Identifier',
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
                                                                },
                                                                name: 'y'
                                                            },
                                                            {
                                                                type: 'Identifier',
                                                                start: 37,
                                                                end: 38,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 37
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 38
                                                                    }
                                                                },
                                                                name: 'z'
                                                            }
                                                        ]
                                                    },
                                                    right: {
                                                        type: 'ArrayExpression',
                                                        start: 42,
                                                        end: 51,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 42
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 51
                                                            }
                                                        },
                                                        elements: [{
                                                                type: 'Literal',
                                                                start: 43,
                                                                end: 44,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 43
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 44
                                                                    }
                                                                },
                                                                value: 4,
                                                                raw: '4'
                                                            },
                                                            {
                                                                type: 'Literal',
                                                                start: 46,
                                                                end: 47,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 46
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 47
                                                                    }
                                                                },
                                                                value: 5,
                                                                raw: '5'
                                                            },
                                                            {
                                                                type: 'Literal',
                                                                start: 49,
                                                                end: 50,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 49
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 50
                                                                    }
                                                                },
                                                                value: 6,
                                                                raw: '6'
                                                            }
                                                        ]
                                                    }
                                                },
                                                kind: 'init'
                                            }]
                                        },
                                        right: {
                                            type: 'ObjectExpression',
                                            start: 56,
                                            end: 67,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 56
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 67
                                                }
                                            },
                                            properties: [{
                                                type: 'Property',
                                                start: 58,
                                                end: 65,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 58
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 65
                                                    }
                                                },
                                                method: false,
                                                shorthand: false,
                                                computed: false,
                                                key: {
                                                    type: 'Identifier',
                                                    start: 58,
                                                    end: 59,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 58
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 59
                                                        }
                                                    },
                                                    name: 'w'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    start: 61,
                                                    end: 65,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 61
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 65
                                                        }
                                                    },
                                                    value: null,
                                                    raw: 'null'
                                                },
                                                kind: 'init'
                                            }]
                                        }
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 69,
                                        end: 71,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 69
                                            },
                                            end: {
                                                line: 1,
                                                column: 71
                                            }
                                        },
                                        body: []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 73,
                        end: 74,
                        loc: {
                            start: {
                                line: 1,
                                column: 73
                            },
                            end: {
                                line: 1,
                                column: 74
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method([...x] = [1, 2, 3]) { } };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method([...x] = [1, 2, 3]) { } };`,
            expected: {
                type: 'Program',
                start: 0,
                end: 51,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 51
                    }
                },
                body: [{
                        type: 'ClassDeclaration',
                        start: 0,
                        end: 50,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 50
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 50,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 50
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 10,
                                end: 48,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 48
                                    }
                                },
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 18,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    },
                                    name: 'method'
                                },
                                static: true,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 24,
                                    end: 48,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 48
                                        }
                                    },
                                    id: null,
                                    generator: true,
                                    expression: false,
                                    async: false,
                                    params: [{
                                        type: 'AssignmentPattern',
                                        start: 25,
                                        end: 43,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 43
                                            }
                                        },
                                        left: {
                                            type: 'ArrayPattern',
                                            start: 25,
                                            end: 31,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 31
                                                }
                                            },
                                            elements: [{
                                                type: 'RestElement',
                                                start: 26,
                                                end: 30,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 26
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30
                                                    }
                                                },
                                                argument: {
                                                    type: 'Identifier',
                                                    start: 29,
                                                    end: 30,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 29
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 30
                                                        }
                                                    },
                                                    name: 'x'
                                                }
                                            }]
                                        },
                                        right: {
                                            type: 'ArrayExpression',
                                            start: 34,
                                            end: 43,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 34
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 43
                                                }
                                            },
                                            elements: [{
                                                    type: 'Literal',
                                                    start: 35,
                                                    end: 36,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 35
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 36
                                                        }
                                                    },
                                                    value: 1,
                                                    raw: '1'
                                                },
                                                {
                                                    type: 'Literal',
                                                    start: 38,
                                                    end: 39,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 38
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 39
                                                        }
                                                    },
                                                    value: 2,
                                                    raw: '2'
                                                },
                                                {
                                                    type: 'Literal',
                                                    start: 41,
                                                    end: 42,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 41
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 42
                                                        }
                                                    },
                                                    value: 3,
                                                    raw: '3'
                                                }
                                            ]
                                        }
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 45,
                                        end: 48,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 45
                                            },
                                            end: {
                                                line: 1,
                                                column: 48
                                            }
                                        },
                                        body: []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 50,
                        end: 51,
                        loc: {
                            start: {
                                line: 1,
                                column: 50
                            },
                            end: {
                                line: 1,
                                column: 51
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method([,] = function*() {}()) { } };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method([,] = function*() {}()) { } };`,
            expected: {
                type: 'Program',
                start: 0,
                end: 55,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 55
                    }
                },
                body: [{
                        type: 'ClassDeclaration',
                        start: 0,
                        end: 54,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 54
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 54,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 54
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 10,
                                end: 52,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 52
                                    }
                                },
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 18,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    },
                                    name: 'method'
                                },
                                static: true,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 24,
                                    end: 52,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 52
                                        }
                                    },
                                    id: null,
                                    generator: true,
                                    expression: false,
                                    async: false,
                                    params: [{
                                        type: 'AssignmentPattern',
                                        start: 25,
                                        end: 47,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 47
                                            }
                                        },
                                        left: {
                                            type: 'ArrayPattern',
                                            start: 25,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            },
                                            elements: [
                                                null
                                            ]
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            start: 31,
                                            end: 47,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 47
                                                }
                                            },
                                            callee: {
                                                type: 'FunctionExpression',
                                                start: 31,
                                                end: 45,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 31
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 45
                                                    }
                                                },
                                                id: null,
                                                generator: true,
                                                expression: false,
                                                async: false,
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    start: 43,
                                                    end: 45,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 43
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 45
                                                        }
                                                    },
                                                    body: []
                                                }
                                            },
                                            arguments: []
                                        }
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 49,
                                        end: 52,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 49
                                            },
                                            end: {
                                                line: 1,
                                                column: 52
                                            }
                                        },
                                        body: []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 54,
                        end: 55,
                        loc: {
                            start: {
                                line: 1,
                                column: 54
                            },
                            end: {
                                line: 1,
                                column: 55
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method([_, x] = []) {}}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method([_, x] = []) {}}`,
            expected: {
                type: 'Program',
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
                },
                body: [{
                    type: 'ClassDeclaration',
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
                        name: 'C'
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        start: 8,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        },
                        body: [{
                            type: 'MethodDefinition',
                            start: 10,
                            end: 40,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 40
                                }
                            },
                            computed: false,
                            key: {
                                type: 'Identifier',
                                start: 18,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                name: 'method'
                            },
                            static: true,
                            kind: 'method',
                            value: {
                                type: 'FunctionExpression',
                                start: 24,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 40
                                    }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [{
                                    type: 'AssignmentPattern',
                                    start: 25,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 36
                                        }
                                    },
                                    left: {
                                        type: 'ArrayPattern',
                                        start: 25,
                                        end: 31,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 31
                                            }
                                        },
                                        elements: [{
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
                                                name: '_'
                                            },
                                            {
                                                type: 'Identifier',
                                                start: 29,
                                                end: 30,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 29
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30
                                                    }
                                                },
                                                name: 'x'
                                            }
                                        ]
                                    },
                                    right: {
                                        type: 'ArrayExpression',
                                        start: 34,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 34
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        },
                                        elements: []
                                    }
                                }],
                                body: {
                                    type: 'BlockStatement',
                                    start: 38,
                                    end: 40,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 38
                                        },
                                        end: {
                                            line: 1,
                                            column: 40
                                        }
                                    },
                                    body: []
                                }
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method([arrow = () => {}] = []) {}}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method([arrow = () => {}] = []) {}}`,
            expected: {
                type: 'Program',
                start: 0,
                end: 53,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 53
                    }
                },
                body: [{
                    type: 'ClassDeclaration',
                    start: 0,
                    end: 53,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 53
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
                        name: 'C'
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        start: 8,
                        end: 53,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 53
                            }
                        },
                        body: [{
                            type: 'MethodDefinition',
                            start: 10,
                            end: 52,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 52
                                }
                            },
                            computed: false,
                            key: {
                                type: 'Identifier',
                                start: 18,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                },
                                name: 'method'
                            },
                            static: true,
                            kind: 'method',
                            value: {
                                type: 'FunctionExpression',
                                start: 24,
                                end: 52,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 52
                                    }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [{
                                    type: 'AssignmentPattern',
                                    start: 25,
                                    end: 48,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 48
                                        }
                                    },
                                    left: {
                                        type: 'ArrayPattern',
                                        start: 25,
                                        end: 43,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 43
                                            }
                                        },
                                        elements: [{
                                            type: 'AssignmentPattern',
                                            start: 26,
                                            end: 42,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 26
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 42
                                                }
                                            },
                                            left: {
                                                type: 'Identifier',
                                                start: 26,
                                                end: 31,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 26
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 31
                                                    }
                                                },
                                                name: 'arrow'
                                            },
                                            right: {
                                                type: 'ArrowFunctionExpression',
                                                start: 34,
                                                end: 42,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 34
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 42
                                                    }
                                                },
                                                id: null,
                                                generator: false,
                                                expression: false,
                                                async: false,
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    start: 40,
                                                    end: 42,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 40
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 42
                                                        }
                                                    },
                                                    body: []
                                                }
                                            }
                                        }]
                                    },
                                    right: {
                                        type: 'ArrayExpression',
                                        start: 46,
                                        end: 48,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 46
                                            },
                                            end: {
                                                line: 1,
                                                column: 48
                                            }
                                        },
                                        elements: []
                                    }
                                }],
                                body: {
                                    type: 'BlockStatement',
                                    start: 50,
                                    end: 52,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 50
                                        },
                                        end: {
                                            line: 1,
                                            column: 52
                                        }
                                    },
                                    body: []
                                }
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`class Foo { async bar(promise) { await promise } }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class Foo { async bar(promise) { await promise } }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 50,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 50
                  }
                },
                body: [
                  {
                    type: 'ClassDeclaration',
                    start: 0,
                    end: 50,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 50
                      }
                    },
                    id: {
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
                      name: 'Foo'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      start: 10,
                      end: 50,
                      loc: {
                        start: {
                          line: 1,
                          column: 10
                        },
                        end: {
                          line: 1,
                          column: 50
                        }
                      },
                      body: [
                        {
                          type: 'MethodDefinition',
                          start: 12,
                          end: 48,
                          loc: {
                            start: {
                              line: 1,
                              column: 12
                            },
                            end: {
                              line: 1,
                              column: 48
                            }
                          },
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 18,
                            end: 21,
                            loc: {
                              start: {
                                line: 1,
                                column: 18
                              },
                              end: {
                                line: 1,
                                column: 21
                              }
                            },
                            name: 'bar'
                          },
                          static: false,
                          kind: 'method',
                          value: {
                            type: 'FunctionExpression',
                            start: 21,
                            end: 48,
                            loc: {
                              start: {
                                line: 1,
                                column: 21
                              },
                              end: {
                                line: 1,
                                column: 48
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: true,
                            params: [
                              {
                                type: 'Identifier',
                                start: 22,
                                end: 29,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 22
                                  },
                                  end: {
                                    line: 1,
                                    column: 29
                                  }
                                },
                                name: 'promise'
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
                              start: 31,
                              end: 48,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 31
                                },
                                end: {
                                  line: 1,
                                  column: 48
                                }
                              },
                              body: [
                                {
                                  type: 'ExpressionStatement',
                                  start: 33,
                                  end: 46,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 33
                                    },
                                    end: {
                                      line: 1,
                                      column: 46
                                    }
                                  },
                                  expression: {
                                    type: 'AwaitExpression',
                                    start: 33,
                                    end: 46,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 33
                                      },
                                      end: {
                                        line: 1,
                                        column: 46
                                      }
                                    },
                                    argument: {
                                      type: 'Identifier',
                                      start: 39,
                                      end: 46,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 39
                                        },
                                        end: {
                                          line: 1,
                                          column: 46
                                        }
                                      },
                                      name: 'promise'
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`class C { static *method([{ x }]) {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method([{ x }]) {} };`,
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
                        type: 'ClassDeclaration',
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 38,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 38
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 10,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                },
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 18,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    },
                                    name: 'method'
                                },
                                static: true,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 24,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 36
                                        }
                                    },
                                    id: null,
                                    generator: true,
                                    expression: false,
                                    async: false,
                                    params: [{
                                        type: 'ArrayPattern',
                                        start: 25,
                                        end: 32,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 32
                                            }
                                        },
                                        elements: [{
                                            type: 'ObjectPattern',
                                            start: 26,
                                            end: 31,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 26
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 31
                                                }
                                            },
                                            properties: [{
                                                type: 'Property',
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
                                                method: false,
                                                shorthand: true,
                                                computed: false,
                                                key: {
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
                                                    name: 'x'
                                                },
                                                kind: 'init',
                                                value: {
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
                                                    name: 'x'
                                                }
                                            }]
                                        }]
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 34,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 34
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        },
                                        body: []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 38,
                        end: 39,
                        loc: {
                            start: {
                                line: 1,
                                column: 38
                            },
                            end: {
                                line: 1,
                                column: 39
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`class C { static *method([[x]]) {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static *method([[x]]) {} };`,
            expected: {
                type: 'Program',
                start: 0,
                end: 37,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 37
                    }
                },
                body: [{
                        type: 'ClassDeclaration',
                        start: 0,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 36
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 10,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                },
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 18,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    },
                                    name: 'method'
                                },
                                static: true,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 24,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 34
                                        }
                                    },
                                    id: null,
                                    generator: true,
                                    expression: false,
                                    async: false,
                                    params: [{
                                        type: 'ArrayPattern',
                                        start: 25,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        },
                                        elements: [{
                                            type: 'ArrayPattern',
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
                                            elements: [{
                                                type: 'Identifier',
                                                start: 27,
                                                end: 28,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 28
                                                    }
                                                },
                                                name: 'x'
                                            }]
                                        }]
                                    }],
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
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
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
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`class C { static set(v) {}; };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
                    source: `class C { static set(v) {}; };`,
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
                                type: 'ClassDeclaration',
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
                                    name: 'C'
                                },
                                superClass: null,
                                body: {
                                    type: 'ClassBody',
                                    start: 8,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    },
                                    body: [{
                                        type: 'MethodDefinition',
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
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
                                            start: 17,
                                            end: 20,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 20
                                                }
                                            },
                                            name: 'set'
                                        },
                                        static: true,
                                        kind: 'method',
                                        value: {
                                            type: 'FunctionExpression',
                                            start: 20,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            },
                                            id: null,
                                            generator: false,
                                            expression: false,
                                            async: false,
                                            params: [{
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
                                                name: 'v'
                                            }],
                                            body: {
                                                type: 'BlockStatement',
                                                start: 24,
                                                end: 26,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 24
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 26
                                                    }
                                                },
                                                body: []
                                            }
                                        }
                                    }]
                                }
                            },
                            {
                                type: 'EmptyStatement',
                                start: 29,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 29
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                }
                            }
                        ],
                        sourceType: 'script'
                    }
                });

        pass(`class C { *['constructor']() {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { *['constructor']() {} };`,
            expected: {
                type: 'Program',
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
                body: [{
                        type: 'ClassDeclaration',
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 10,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                },
                                computed: true,
                                key: {
                                    type: 'Literal',
                                    start: 12,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    },
                                    value: 'constructor',
                                    raw: '\'constructor\''
                                },
                                static: false,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 26,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    },
                                    id: null,
                                    generator: true,
                                    expression: false,
                                    async: false,
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 29,
                                        end: 31,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 29
                                            },
                                            end: {
                                                line: 1,
                                                column: 31
                                            }
                                        },
                                        body: []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
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
                sourceType: 'script'
            }
        });

        pass(`class C { [key1]() { return 'B'; } c() { return 'C'; }  [key2]() { return 'D'; } };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { [key1]() { return 'B'; } c() { return 'C'; }  [key2]() { return 'D'; } };`,
            expected: {
                type: 'Program',
                start: 0,
                end: 83,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 83
                    }
                },
                body: [{
                        type: 'ClassDeclaration',
                        start: 0,
                        end: 82,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 82
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 82,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 82
                                }
                            },
                            body: [{
                                    type: 'MethodDefinition',
                                    start: 10,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 34
                                        }
                                    },
                                    computed: true,
                                    key: {
                                        type: 'Identifier',
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
                                        name: 'key1'
                                    },
                                    static: false,
                                    kind: 'method',
                                    value: {
                                        type: 'FunctionExpression',
                                        start: 16,
                                        end: 34,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
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
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            start: 19,
                                            end: 34,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 34
                                                }
                                            },
                                            body: [{
                                                type: 'ReturnStatement',
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
                                                },
                                                argument: {
                                                    type: 'Literal',
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
                                                    },
                                                    value: 'B',
                                                    raw: '\'B\''
                                                }
                                            }]
                                        }
                                    }
                                },
                                {
                                    type: 'MethodDefinition',
                                    start: 35,
                                    end: 54,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 35
                                        },
                                        end: {
                                            line: 1,
                                            column: 54
                                        }
                                    },
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        start: 35,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 35
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        },
                                        name: 'c'
                                    },
                                    static: false,
                                    kind: 'method',
                                    value: {
                                        type: 'FunctionExpression',
                                        start: 36,
                                        end: 54,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 54
                                            }
                                        },
                                        id: null,
                                        generator: false,
                                        expression: false,
                                        async: false,
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            start: 39,
                                            end: 54,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 39
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 54
                                                }
                                            },
                                            body: [{
                                                type: 'ReturnStatement',
                                                start: 41,
                                                end: 52,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 41
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 52
                                                    }
                                                },
                                                argument: {
                                                    type: 'Literal',
                                                    start: 48,
                                                    end: 51,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 48
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 51
                                                        }
                                                    },
                                                    value: 'C',
                                                    raw: '\'C\''
                                                }
                                            }]
                                        }
                                    }
                                },
                                {
                                    type: 'MethodDefinition',
                                    start: 56,
                                    end: 80,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 56
                                        },
                                        end: {
                                            line: 1,
                                            column: 80
                                        }
                                    },
                                    computed: true,
                                    key: {
                                        type: 'Identifier',
                                        start: 57,
                                        end: 61,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 57
                                            },
                                            end: {
                                                line: 1,
                                                column: 61
                                            }
                                        },
                                        name: 'key2'
                                    },
                                    static: false,
                                    kind: 'method',
                                    value: {
                                        type: 'FunctionExpression',
                                        start: 62,
                                        end: 80,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 62
                                            },
                                            end: {
                                                line: 1,
                                                column: 80
                                            }
                                        },
                                        id: null,
                                        generator: false,
                                        expression: false,
                                        async: false,
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            start: 65,
                                            end: 80,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 65
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 80
                                                }
                                            },
                                            body: [{
                                                type: 'ReturnStatement',
                                                start: 67,
                                                end: 78,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 67
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 78
                                                    }
                                                },
                                                argument: {
                                                    type: 'Literal',
                                                    start: 74,
                                                    end: 77,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 74
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 77
                                                        }
                                                    },
                                                    value: 'D',
                                                    raw: '\'D\''
                                                }
                                            }]
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 82,
                        end: 83,
                        loc: {
                            start: {
                                line: 1,
                                column: 82
                            },
                            end: {
                                line: 1,
                                column: 83
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`class C { static get 'string'() { return 'get string'; } };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static get 'string'() { return 'get string'; } };`,
            expected: {
                type: 'Program',
                start: 0,
                end: 59,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 59
                    }
                },
                body: [{
                        type: 'ClassDeclaration',
                        start: 0,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 58
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 58,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 58
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 10,
                                end: 56,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 56
                                    }
                                },
                                computed: false,
                                key: {
                                    type: 'Literal',
                                    start: 21,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    },
                                    value: 'string',
                                    raw: '\'string\''
                                },
                                static: true,
                                kind: 'get',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 29,
                                    end: 56,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 56
                                        }
                                    },
                                    id: null,
                                    generator: false,
                                    expression: false,
                                    async: false,
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 32,
                                        end: 56,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 32
                                            },
                                            end: {
                                                line: 1,
                                                column: 56
                                            }
                                        },
                                        body: [{
                                            type: 'ReturnStatement',
                                            start: 34,
                                            end: 54,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 34
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 54
                                                }
                                            },
                                            argument: {
                                                type: 'Literal',
                                                start: 41,
                                                end: 53,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 41
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 53
                                                    }
                                                },
                                                value: 'get string',
                                                raw: '\'get string\''
                                            }
                                        }]
                                    }
                                }
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 58,
                        end: 59,
                        loc: {
                            start: {
                                line: 1,
                                column: 58
                            },
                            end: {
                                line: 1,
                                column: 59
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`class C { async *method({ x = function() {} } = {}) {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { async *method({ x = function() {} } = {}) {} };`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'ClassDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'C',
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
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [{
                                type: 'MethodDefinition',
                                kind: 'method',
                                static: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 17,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [{
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'ObjectPattern',
                                            properties: [{
                                                type: 'Property',
                                                kind: 'init',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'x',
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
                                                    }
                                                },
                                                computed: false,
                                                value: {
                                                    type: 'AssignmentPattern',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'x',
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
                                                        }
                                                    },
                                                    right: {
                                                        type: 'FunctionExpression',
                                                        params: [],
                                                        body: {
                                                            type: 'BlockStatement',
                                                            body: [],
                                                            start: 41,
                                                            end: 43,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 41
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 43
                                                                }
                                                            }
                                                        },
                                                        async: false,
                                                        generator: false,
                                                        expression: false,
                                                        id: null,
                                                        start: 30,
                                                        end: 43,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 30
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 43
                                                            }
                                                        }
                                                    },
                                                    start: 26,
                                                    end: 43,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 26
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 43
                                                        }
                                                    }
                                                },
                                                method: false,
                                                shorthand: true,
                                                start: 26,
                                                end: 43,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 26
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 43
                                                    }
                                                }
                                            }],
                                            start: 24,
                                            end: 45,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 24
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 45
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'ObjectExpression',
                                            properties: [],
                                            start: 48,
                                            end: 50,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 48
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 50
                                                }
                                            }
                                        },
                                        start: 24,
                                        end: 50,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
                                            },
                                            end: {
                                                line: 1,
                                                column: 50
                                            }
                                        }
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 52,
                                        end: 54,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 52
                                            },
                                            end: {
                                                line: 1,
                                                column: 54
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 23,
                                    end: 54,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 54
                                        }
                                    }
                                },
                                start: 10,
                                end: 54,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 54
                                    }
                                }
                            }],
                            start: 8,
                            end: 56,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 56
                                }
                            }
                        },
                        start: 0,
                        end: 56,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 56
                            }
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 56,
                        end: 57,
                        loc: {
                            start: {
                                line: 1,
                                column: 56
                            },
                            end: {
                                line: 1,
                                column: 57
                            }
                        }
                    }
                ],
                start: 0,
                end: 57,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 57
                    }
                }
            }
        });

        pass(`class C { async *method({...rest} = {a: 3, b: 4}) {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { async *method({...rest} = {a: 3, b: 4}) {} };`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'ClassDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'C',
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
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [{
                                type: 'MethodDefinition',
                                kind: 'method',
                                static: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 17,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [{
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'ObjectPattern',
                                            properties: [{
                                                type: 'RestElement',
                                                argument: {
                                                    type: 'Identifier',
                                                    name: 'rest',
                                                    start: 28,
                                                    end: 32,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 28
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 32
                                                        }
                                                    }
                                                },
                                                start: 25,
                                                end: 32,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 25
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 32
                                                    }
                                                }
                                            }],
                                            start: 24,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 24
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'ObjectExpression',
                                            properties: [{
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        start: 37,
                                                        end: 38,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 37
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 38
                                                            }
                                                        }
                                                    },
                                                    value: {
                                                        type: 'Literal',
                                                        value: 3,
                                                        start: 40,
                                                        end: 41,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 40
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 41
                                                            }
                                                        },
                                                        raw: '3'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 37,
                                                    end: 41,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 37
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 41
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'b',
                                                        start: 43,
                                                        end: 44,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 43
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 44
                                                            }
                                                        }
                                                    },
                                                    value: {
                                                        type: 'Literal',
                                                        value: 4,
                                                        start: 46,
                                                        end: 47,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 46
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 47
                                                            }
                                                        },
                                                        raw: '4'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 43,
                                                    end: 47,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 43
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 47
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 36,
                                            end: 48,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 36
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 48
                                                }
                                            }
                                        },
                                        start: 24,
                                        end: 48,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
                                            },
                                            end: {
                                                line: 1,
                                                column: 48
                                            }
                                        }
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 50,
                                        end: 52,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 50
                                            },
                                            end: {
                                                line: 1,
                                                column: 52
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 23,
                                    end: 52,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 52
                                        }
                                    }
                                },
                                start: 10,
                                end: 52,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 52
                                    }
                                }
                            }],
                            start: 8,
                            end: 54,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 54
                                }
                            }
                        },
                        start: 0,
                        end: 54,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 54
                            }
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 54,
                        end: 55,
                        loc: {
                            start: {
                                line: 1,
                                column: 54
                            },
                            end: {
                                line: 1,
                                column: 55
                            }
                        }
                    }
                ],
                start: 0,
                end: 55,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 55
                    }
                }
            }
        });

        pass(`class C { static async *method([x]) {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { static async *method([x]) {} };`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'ClassDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'C',
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
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [{
                                type: 'MethodDefinition',
                                kind: 'method',
                                static: true,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 24,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [{
                                        type: 'ArrayPattern',
                                        elements: [{
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 32,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 32
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            }
                                        }],
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
                                        }
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 36,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 38
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 30,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 38
                                        }
                                    }
                                },
                                start: 10,
                                end: 38,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 38
                                    }
                                }
                            }],
                            start: 8,
                            end: 40,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
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
                    {
                        type: 'EmptyStatement',
                        start: 40,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 40
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    }
                ],
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

        pass(`class C { constructor() {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { constructor() {} };`,
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
                        type: 'ClassDeclaration',
                        start: 0,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 28
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 28,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 28
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
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
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 10,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    },
                                    name: 'constructor'
                                },
                                static: false,
                                kind: 'constructor',
                                value: {
                                    type: 'FunctionExpression',
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
                                    id: null,
                                    generator: false,
                                    expression: false,
                                    async: false,
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 24,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        },
                                        body: []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
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
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`class C { prototype() {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
                    source: `class C { prototype() {} };`,
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
                                type: 'ClassDeclaration',
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
                                    name: 'C'
                                },
                                superClass: null,
                                body: {
                                    type: 'ClassBody',
                                    start: 8,
                                    end: 26,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 26
                                        }
                                    },
                                    body: [{
                                        type: 'MethodDefinition',
                                        start: 10,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        },
                                        computed: false,
                                        key: {
                                            type: 'Identifier',
                                            start: 10,
                                            end: 19,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 10
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 19
                                                }
                                            },
                                            name: 'prototype'
                                        },
                                        static: false,
                                        kind: 'method',
                                        value: {
                                            type: 'FunctionExpression',
                                            start: 19,
                                            end: 24,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 24
                                                }
                                            },
                                            id: null,
                                            generator: false,
                                            expression: false,
                                            async: false,
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
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
                                                },
                                                body: []
                                            }
                                        }
                                    }]
                                }
                            },
                            {
                                type: 'EmptyStatement',
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
                                }
                            }
                        ],
                        sourceType: 'script'
                    }
                });

        pass(`class C { get ['constructor']() {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { get ['constructor']() {} };`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'ClassDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'C',
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
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [{
                                type: 'MethodDefinition',
                                kind: 'get',
                                static: false,
                                computed: true,
                                key: {
                                    type: 'Literal',
                                    value: 'constructor',
                                    start: 15,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    },
                                    raw: '\'constructor\''
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
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
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 29,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 34
                                        }
                                    }
                                },
                                start: 10,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            }],
                            start: 8,
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            }
                        },
                        start: 0,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        }
                    },
                    {
                        type: 'EmptyStatement',
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
                    }
                ],
                start: 0,
                end: 37,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 37
                    }
                }
            }
        });

        pass(`class C extends 0 {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C extends 0 {};`,
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
                        type: 'ClassDeclaration',
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
                            name: 'C'
                        },
                        superClass: {
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
                        },
                        body: {
                            type: 'ClassBody',
                            start: 18,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            },
                            body: []
                        }
                    },
                    {
                        type: 'EmptyStatement',
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
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`class C { *method({ w: [x, y, z] = [4, 5, 6] }) {} };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `class C { *method({ w: [x, y, z] = [4, 5, 6] }) {} };`,
            expected: {
                type: 'Program',
                start: 0,
                end: 53,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 53
                    }
                },
                body: [{
                        type: 'ClassDeclaration',
                        start: 0,
                        end: 52,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 52
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
                            name: 'C'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 8,
                            end: 52,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 52
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 10,
                                end: 50,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 50
                                    }
                                },
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 11,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    },
                                    name: 'method'
                                },
                                static: false,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 17,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    },
                                    id: null,
                                    generator: true,
                                    expression: false,
                                    async: false,
                                    params: [{
                                        type: 'ObjectPattern',
                                        start: 18,
                                        end: 46,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 46
                                            }
                                        },
                                        properties: [{
                                            type: 'Property',
                                            start: 20,
                                            end: 44,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 44
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
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
                                                name: 'w'
                                            },
                                            value: {
                                                type: 'AssignmentPattern',
                                                start: 23,
                                                end: 44,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 44
                                                    }
                                                },
                                                left: {
                                                    type: 'ArrayPattern',
                                                    start: 23,
                                                    end: 32,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 23
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 32
                                                        }
                                                    },
                                                    elements: [{
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
                                                            name: 'x'
                                                        },
                                                        {
                                                            type: 'Identifier',
                                                            start: 27,
                                                            end: 28,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 27
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 28
                                                                }
                                                            },
                                                            name: 'y'
                                                        },
                                                        {
                                                            type: 'Identifier',
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
                                                            },
                                                            name: 'z'
                                                        }
                                                    ]
                                                },
                                                right: {
                                                    type: 'ArrayExpression',
                                                    start: 35,
                                                    end: 44,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 35
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 44
                                                        }
                                                    },
                                                    elements: [{
                                                            type: 'Literal',
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
                                                            },
                                                            value: 4,
                                                            raw: '4'
                                                        },
                                                        {
                                                            type: 'Literal',
                                                            start: 39,
                                                            end: 40,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 39
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 40
                                                                }
                                                            },
                                                            value: 5,
                                                            raw: '5'
                                                        },
                                                        {
                                                            type: 'Literal',
                                                            start: 42,
                                                            end: 43,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 42
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 43
                                                                }
                                                            },
                                                            value: 6,
                                                            raw: '6'
                                                        }
                                                    ]
                                                }
                                            },
                                            kind: 'init'
                                        }]
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 48,
                                        end: 50,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 48
                                            },
                                            end: {
                                                line: 1,
                                                column: 50
                                            }
                                        },
                                        body: []
                                    }
                                }
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 52,
                        end: 53,
                        loc: {
                            start: {
                                line: 1,
                                column: 52
                            },
                            end: {
                                line: 1,
                                column: 53
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });
    });
});
