import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Object literal', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  // Some of the tests are copied from V8

  describe('Failure', () => {

      const invalidSyntax = [
          `({get +:3})`,
          ',',
          '...',
          '...async x,',
          'get bar(x) {',
          'get bar(x {}',
          'get bar(x {',
          'get bar(x) {}',
          'get bar(x) {}',
          'get bar(x, y) {}',
          'set bar() {}',
          'set bar(x, y) {}',
          'get foo( +',
          'get foo() \'error\'',
          'static x: 0',
          'static x(){}',
          'static async x(){}',
          'static get x(){}',
          'static get x : 0',
          'static x',
          'static 0',
          '*x: 0',
          '*x',
          'async x',
          'async *x',
          '*get x(){}',
          '*set x(y){}',
          'get *x(){}',
          'set *x(y){}',
          'get x*(){}',
          'set x*(y){}',
          'x = 0',
          '* *x(){}',
          'x*(){}',
          'static async x(){}',
          'static async x : 0',
          'static async get x : 0',
          'async static x(){}',
          '*async x(){}',
          'async x*(){}',
          'async x : 0',
          'async 0 : 0',
          'async get x(){}',
          'async get *x(){}',
          'async set x(y){}',
          'async get : 0',
          'async method() { void await; }',
          'async method() { \\u0061wait: ; }',
          'async method() { await: ; }',
          'async *method() { void await; }',
          'async *method() { \\u0061wait: ; }',
          'async *method() { await: ; }',
          'async *method() { void await; }',
          'async *method(...x = []) {}',
          'async *method(...a,) {}',
          'async *method() { var yi\u0065ld; }',
          'async *method() { var yield; }',
          'async *method() { void yield; }',
          'async *method(...x = []) {}',
          'foo(x = 1) {"use strict"}',
          '"async foo (arguments) { "use strict"; }',
          `async
foo() { }`,
          'async foo (x = await) {  }',
          'async foo (await) {  }',
          'async foo () { super() }',
          '"async foo(eval) {"use strict"; }',
          'async foo(foo = super()) { }',
          'async *method() { var yi\\u0065ld; }',
          'async *method() { var yield; }',
          'async *method() { void yield; }',
          '*method(yield) {}',
          '*method(x = yield) {}',
          '*m(a = 0) { "use strict"; }',
          '*method() {yield ? yield : yield; }',
          '*g() { yield 3 + yield 4; }',
          'async *method([...[ x ] = []] = []) {}',
          'async *method([...x = []] = []) {}',
          'async *method([...{ x }, y] = [1, 2, 3]) {}',
          'x + {y=z}',
          'get __proto(){}, "__proto__": null, __proto__: null,',
          '({ __proto__: null, "__proto__": null })',
          '__proto__: null, __proto__: null',
          '"__proto__": null, __proto__: null',
          '"__proto__": null, "__proto__": null',
          'set __proto__(x){}, "__proto__": null, __proto__: null,',
          'set y() {}',
          'set y(a, b) {}',
          'get y(z)',
          'async foo() { var await }',
          'async foo(await) { }',
          '*async f()',
          '*async *f()',
          'async *f() { () => await a; }',
          'async *f() { () => yield a; }',
          'async foo() { return {await} }',
          'async get foo() { }',
          'async\nfoo() { }',
          'get x() { "use strict"; public = 42; }',
          'async method() { void await; }',
          `"use strict";
  var gen = {
  *method() {
    return {
         ...(function() {
            var yield;
         }()),
      }
  }
}.method;`,

          `var gen = {
  async *method() {
    return {
         ...(function() {
            var yield;
         }()),
      }
  }
}.method;`,
      ];

      for (const arg of invalidSyntax) {
          it(`({ ${arg} })`, () => {
              t.throws(() => {
                  parseSource(`({ ${arg} })`, undefined, Context.OptionsNext);
              });
          });

          it(`({ ${arg} })`, () => {
              t.throws(() => {
                  parseSource(`({ ${arg}, })`, undefined, Context.OptionsNext);
              });
          });

          it(`"use strict"; ({ ${arg} })`, () => {
              t.throws(() => {
                  parseSource(`"use strict"; ({ ${arg}, })`, undefined, Context.OptionsNext);
              });
          });
      }

      const invalidShorthand = [
          'break', 'case', 'catch', 'class', 'const', 'continue',
          'debugger', 'default', 'delete', 'do', 'else', 'enum',
          'export', 'extends', 'false', 'finally', 'for', 'function',
          'if', 'import', 'in', 'instanceof', 'new', 'null',
          'return', 'super', 'switch', 'this', 'throw', 'true',
          'try', 'typeof', 'var', 'void', 'while', 'with',
      ];
      for (const arg of invalidShorthand) {

          it(`({ ${arg}});`, () => {
              t.throws(() => {
                  parseSource(`({ ${arg}});`, undefined, Context.Empty);
              });
          });

          it(`"use strict"; ({ ${arg}});`, () => {
              t.throws(() => {
                  parseSource(`"use strict"; ({ ${arg}});`, undefined, Context.Empty);
              });
          });
      }

      const invalidShorthandStrict = [
          '1',
          '1.2',
          '0',
          '0.1',
          '1.0',
          '1e1', '0x1', '"s"', '\'s\'',
          'implements', 'interface', 'let', 'package',
          'private', 'protected', 'public', 'static',
          'yield',
      ];
      for (const arg of invalidShorthandStrict) {

          it(`"use strict"; ({ ${arg}});`, () => {
              t.throws(() => {
                  parseSource(`"use strict"; ({ ${arg}});`, undefined, Context.Empty);
              });
          });

          it(`"use strict"; ({ ${arg}});`, () => {
            t.throws(() => {
                parseSource(`"use strict"; ({ ${arg}});`, undefined, Context.Strict | Context.Module);
            });
        });
      }

      fail(`"use strict";
var gen = {
async *method() {
(function() {
    var yield;
  }())
}
}.method;`, Context.Empty, {
          source: `"use strict";
var gen = {
async *method() {
  (function() {
      var yield;
    }())
}
}.method;`
      });

      fail('({ a: () {}a })', Context.Empty, {
        source: '({ a: () {}a })',
      });

      fail('({ a: ()a })', Context.Empty, {
        source: '({ a: ()a })',
      });

      fail('({ a: ()}a })', Context.Empty, {
        source: '({ a: ()}a })',
      });

      fail('({ a: ()a {} })', Context.Empty, {
        source: '({ a: ()a {} })',
      });

      fail('({)', Context.Empty, {
          source: '({)',
      });

      fail('(})', Context.Empty, {
          source: '(})',
      });

      fail('{})', Context.Empty, {
          source: '{})',
      });

      fail('({ eval: 1} = 2)', Context.Empty, {
          source: '({ eval: 1} = 2)',
      });

      fail('({ eval: 1} = 2)', Context.Strict | Context.Module, {
        source: '({ eval: 1} = 2)',
      });

      fail('({[x]});', Context.Empty, {
          source: '({[x]});',
      });

      fail('0, { get a(param = null) {} };', Context.Empty, {
          source: '0, { get a(param = null) {} };',
      });

      fail('({[x]});', Context.Empty, {
          source: '({[x]});',
      });

      fail('({async async});', Context.Empty, {
          source: '({async async});',
      });

      fail('({async async});', Context.Empty, {
          source: '({async async});',
      });

      fail('({0});', Context.Empty, {
          source: '({0});',
      });

      fail('({async\nfoo() { }})', Context.Empty, {
          source: '({async\nfoo() { }});',
      });

      fail('({async get foo() { }})', Context.Empty, {
          source: '({async get foo() { }})',
      });

      fail('({async set foo(value) { }})', Context.Empty, {
          source: '({async set foo(value) { }})',
      });

      fail('({async set foo(value) { }})', Context.Empty, {
          source: '({async set foo(value) { }})',
      });

      fail('({async set foo(value) { }})', Context.Empty, {
          source: '({async set foo(value) { }})',
      });

      fail('({async get foo() { }});', Context.Empty, {
          source: '({async get foo() { }});',
      });

      fail('async ({a = b});', Context.Empty, {
          source: 'async ({a = b});',
      });

      fail('({async foo: 1});', Context.Empty, {
          source: '({async foo: 1});',
      });

      fail('({async foo: 1);', Context.Empty, {
          source: '({async foo: 1);',
      });

      fail('({async foo: 1})', Context.Empty, {
          source: '({async foo: 1})',
      });

      fail('x = { async get g() {} }', Context.Empty, {
          source: 'x = { async get g() {} }',
      });

      fail('x = { async f: function() {} }', Context.Empty, {
          source: 'x = { async f: function() {} }',
      });

      fail('x = {async set s(i) {} }', Context.Empty, {
          source: 'x = {async set s(i) {} }',
      });

      fail('var f = async function() { return {g: await} }', Context.Empty, {
          source: 'var f = async function() { return {g: await} }',
      });

      fail('async function f() { return {g: await} }', Context.Empty, {
          source: 'async function f() { return {g: await} }',
      });

      fail('async f() { x = { async await(){} } }', Context.Empty, {
          source: 'async f() { x = { async await(){} } }',
      });

      fail('({,} = {});', Context.Empty, {
          source: '({,} = {});',
      });

      fail('var {x:y--} = {};', Context.Empty, {
          source: 'var {x:y--} = {};',
      });

      fail('var {x:y+1} = {};', Context.Empty, {
          source: 'var {x:y+1} = {};',
      });

      fail('var y; ({x:y--} = {});', Context.Empty, {
          source: 'var y; ({x:y--} = {});',
      });

      fail('let {x:foo()} = {};', Context.Empty, {
          source: 'let {x:foo()} = {};',
      });

      // Illegal property initializer
      fail('({ ice = fapper })', Context.Empty, {
          source: '({ ice = fapper })',
      });
  });

  describe('Pass', () => {

    // v8

    const methodDefinition = [
      'm() {}',
      'm(x) { return x; }',
      'm(x, y) {}, n() {}',
      'set(x, y) {}',
      'get(x, y) {}'
    ];

    for (const arg of methodDefinition) {
      it(`({ ${arg} })`, () => {
          t.doesNotThrow(() => {
              parseSource(`({ ${arg} })`, undefined, Context.OptionsNext);
          });
      });

      it(`({ *${arg} })`, () => {
        t.doesNotThrow(() => {
            parseSource(`({ *${arg} })`, undefined, Context.OptionsNext);
        });
    });

      it(`"use strict"; ({ *${arg} })`, () => {
      t.doesNotThrow(() => {
          parseSource(`"use strict"; ({ *${arg} })`, undefined, Context.OptionsNext);
      });
  });

      it(`"use strict"; ({ ${arg} })`, () => {
        t.doesNotThrow(() => {
            parseSource(`"use strict"; ({ ${arg} })`, undefined, Context.OptionsNext);
        });
    });
    }

    const methodDefinitionNames = [
      'm', '\'m\'', '"m"', '"m n"', 'true', 'false', 'null', '0', '1.2',
      '1e1', '1E1', '1e+1', '1e-1', '0b101', '"a string"', '0xFFFF',
      '.12e3', '0b101', '0', '80', '12e34',

      // Keywords
      'async', 'await', 'break', 'case', 'catch', 'class', 'const', 'continue',
      'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export',
      'extends', 'finally', 'for', 'function', 'if', 'implements', 'import',
      'in', 'instanceof', 'interface', 'let', 'new', 'package', 'private',
      'protected', 'public', 'return', 'static', 'super', 'switch', 'this',
      'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield',
  ];
    for (const arg of methodDefinitionNames) {

      it(`({ ${arg}(x, y) {}});`, () => {
          t.doesNotThrow(() => {
              parseSource(`({ ${arg}(x, y) {}});`, undefined, Context.Empty);
          });
      });
    }

    const methodDefinitionDuplicateEvalArguments = [
      'eval, eval',
      'eval, a, eval',
      'arguments, arguments',
      'arguments, a, arguments'
  ];
    for (const arg of methodDefinitionDuplicateEvalArguments) {

      it(`"use strict";  ({method(${arg}){}});`, () => {
          t.throws(() => {
              parseSource(`"use strict";  ({method(${arg}){}});`, undefined, Context.Empty);
          });
      });

      it(`"use strict";  ({method(${arg}){}});`, () => {
        t.throws(() => {
            parseSource(`"use strict";  ({*method(${arg}){}});`, undefined, Context.Empty);
        });
    });

      it(`({method(${arg}){}});`, () => {
      t.doesNotThrow(() => {
          parseSource(`({*method(${arg}){}});`, undefined, Context.Empty);
      });
  });
    }

    const methodDefinitionDuplicateProperty = [
      'x: 1, x() {}',
      'x() {}, x: 1',
      'x() {}, get x() {}',
      'x() {}, set x(_) {}',
      'x() {}, x() {}',
      'x() {}, y() {}, x() {}',
      'x() {}, "x"() {}',
      'x() {}, \'x\'() {}',
      '0() {}, \'0\'() {}',
      '1.0() {}, 1: 1',
      'x: 1, *x() {}',
      '*x() {}, x: 1',
      '*x() {}, get x() {}',
      '*x() {}, set x(_) {}',
      '*x() {}, *x() {}',
      '*x() {}, y() {}, *x() {}',
      '*x() {}, *"x"() {}',
      '*x() {}, *\'x\'() {}',
      '*0() {}, *\'0\'() {}',
      '*1.0() {}, 1: 1',
  ];
    for (const arg of methodDefinitionDuplicateProperty) {

      it(`"use strict"; ({ ${arg} })`, () => {
          t.doesNotThrow(() => {
              parseSource(`"use strict";  ({ ${arg} });`, undefined, Context.OptionsNext);
          });
      });
    }

    // Note! `get` and `set` are  not keywords in these cases, - J. K. Thomas

    const validGetterAndSetterShorthand = [
      'var a = 0;',
      'var get = 1;',
      'var set = 2;',
      'var z = 3;',
      'var o = { get };',
      'var p = { set };',
      'var q = { get, set };',
      'var r = { set, get };',
      'var s = { get, z };',
      'var t = { a, set };',
      'var u = { a, get, z };',
      // concise method shorthand
      'var o = { get() { return "g"; } }',
      'var o = { set() { return "s"; } }'
  ];
    for (const arg of validGetterAndSetterShorthand) {

      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parseSource(`${arg}`, undefined, Context.OptionsNext);
          });
      });
    }

    const validSyntax = [
          'foo: 1, get foo() {}',
          'foo: 1, set foo(v) {}',
          '"foo": 1, get "foo"() {}',
          '"foo": 1, set "foo"(v) {}',
          '1: 1, get 1() {}',
          '1: 1, set 1(v) {}',
          'get foo() {}, get foo() {}',
          'set foo(_) {}, set foo(v) {}',
          'foo: 1, get "foo"() {}',
          'foo: 1, set "foo"(v) {}',
          '"foo": 1, get foo() {}',
          '"foo": 1, set foo(v) {}',
          '1: 1, get "1"() {}',
          '1: 1, set "1"(v) {}',
          '"1": 1, get 1() {}',
          '"1": 1, set 1(v) {}',
          'foo: 1, bar: 2',
          '"foo": 1, "bar": 2',
          '1: 1, 2: 2',
          'foo: bar = 5 + baz',
          'answer: 0',
          'async: 1',
          'yield: 1',
          'x:[[]]',
          '_x: 0, set x(v) { return this._x = v; }',
          'null: 0',
          'set \'c d e\'(v) { } ',
          '[key1]() { return \'B\'; }',
          'set foo(x) {;} ',
          'get foo() { return 42;}, set foo(x) {;}',
          'a: 1, b: 2, c: 3',
          'valueOf: function () { return t; }',
          // should never throw
          'method(a) { var a; }',
          'x: 1, x: 2',
          'get width() { return m_width }',
          'get undef() {}',
          'get true() {} ',
          'get false() {}',
          'get null() {}',
          'get 10() {}',
          'set width(w) { w }',
          'set if(w) { w }',
          'set true(w) { w }',
          'set false(w) { w }',
          'set: 2',
          'a: await',
          'x:x = 20',
          'x:z = 1, x1:y = 20',
          ' __proto__: 2 ',
          '"__proto__": 2',
          'get width() { return width }, set width(width) { return width; } ',
          'a:0, get \'b\'(){}, set 3(d){}',
          'a',
          'a, b: 0, c',
          'a, b',
          'a(){}',
          'a(b,...c){}',
          'a(b,c){}',
          'a(b,c){let d;}',
          'a(){let a;}',
          'a(b){}',
          'get "foo"() {}',
          'get 1() {}',
          'set foo(v) {}',
          'set "foo"(v) {}',
          'set 1(v) {}',
          'foo: 1, get bar() {}',
          'foo: 1, set bar(v) {}',
          '"foo": 1, get "bar"() {}',
          '"foo": 1, set "bar"(v) {}',
          '1: 1, get 2() {}',
          '1: 1, set 2(v) {}',
          'get: 1, get foo() {}',
          'set: 1, set foo(_) {}',
          'get(){}',
          'set(){}',
          'static(){}',
          'async(){}',
          'method(test) { }',
          '*get() {}',
          '*set() {}',
          '*static() {}',
          '*async(){}',
        '__proto__: null, get __proto__(){}',
        '__proto__: null, __proto__(){}',
        '__proto__: null, set __proto__(x){} ',
        '__proto__: null, __proto__',
        '"__proto__": null, get __proto__(){}, set __proto__(x){} ',
        '"__proto__": null, __proto__(){}',
        '"__proto__": null, set __proto__(x){}',
        '"__proto__": null, __proto__',
        ' __proto__, __proto__: null',
        '__proto__, __proto__: null',
        '__proto__, "__proto__": null',
        '__proto__, __proto__',
        '__proto__: null, get __proto__(){}',
        '__proto__: null, get __proto__(){}',
        '__proto__: null, get __proto__(){}',
        '__proto__: null, get __proto__(){}',
        '__proto__: null, get __proto__(){}',
          'get : 0',
          'set : 0',
          'static : 0',
          'async : 0',
          'if: 4',
          'interface: 5',
          'super: 6',
          'eval: 7',
          'arguments: 8',
          'async x(){}',
          'async 0(){}',
          'async get(){}',
          'async set(){}',
          'async static(){}',
          'async async(){}',
          'async f(a) { await a }',
          'async ["xyz"]() {}',
          'async 3() {}',
          'async f() {}',
          'async : 0',
          'async(){}',
          '*async(){}',
          'async *method() { yield* obj; }',
          '*method() { yield yield 1; }',
          '*yield() { (yield 3) + (yield 4); }',
          'method(x = arguments[2], y = arguments[3], z) {}',
          'method(x = super.toString) { return x; }',
          'method(a, b, c) {}',
          'method(a,) {}',
          'method(a, b,) {}',
          'method(x = y, y) {}',
          'method(a = 23, b = 45, c = 99) {}',
          'method(a = b +=1, c = d += 1, e = f += 1, g = h += 1, i = j += 1, k = l +=1) {}',
          '*method() {}',
          '*foo(a) {}',
          '*[m]() {}',
          '*method() { yield [...yield]; }',
          '*method() { yield [...yield]; }',
          '*method() { yield [...yield yield]; }',
          ` *method() {
            yield {
                ...yield,
                y: 1,
                ...yield yield,
              };
          }`,
          '*method(a,) {}',
          '*[anonSym]() {}',
          '*id() {}',
          'async method(a,) {}',
          'async method(x, y = x, z = y) {}',
          'async() {}',
          '*async() {}',
          '*await() {}',
          'async *method(...a) {}',
          'async',
          'await',
          'async *method() { yield [...yield]; }',
          'async *method(...a) { yield [...yield yield]; }',
          'async *method(a, b,) {}',
          'async *method(x, y = x, z = y) {}',
          'async *method(x = y, y) {}',
          'prop: 12',
          'get foo(){return 1;}',
          'get foo(){return 1;}',
          'set foo(arg){return 1;}',
          'set foo(arg){}',
          '1 : true',
          'prop : true',
          'true : 1',
          'get [0.0000001]() { return \'get string\'; }',
          'set [0.0000001](param) { stringSet = param; }',
          'get [0o10]() { return \'get string\'; }',
          'get [0]() { return \'get string\'; }',
          'set [0](param) { stringSet = param; }',
          'get ["doubleQuote"]() { return "get string"; }',
          'get [\'unicod\\u{000065}Escape\']() { return \'get string\'; }',
          '[++counter]: ++counter, [++counter]: ++counter, [++counter]: ++counter, [++counter]: ++counter',
          'async: foo',
          'await: foo',
          '*method([[x, y, z] = [4, 5, 6]]) {}',
          'async *method([[,] = g()]) {}',
          'async *method([x = 23]) {}',
          'async *method([x]) {}',
          'async *method([_, x]) {}',
          'async *method([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {}',
          'async *method([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }]) {}',
          'async *method([...[x, y, z]]) {}',
          'async *method([...x]) {}',
          'async *method([[x, y, z] = [4, 5, 6]] = [[7, 8, 9]]) {}',
          'async *method([[...x] = function() {}()] = [[2, 1, 3]]) {}',
          'async *method([[x]] = [null]) {}',
          'async *method([x = 23] = [undefined]) {}',
          'async *method([x] = g[Symbol.iterator] = function() {}) {}',
          'async *method([...x] = {}) {}',
          'async *method({ cls = class {}, xCls = class X {}, xCls2 = class { static name() {} } } = {}) {}',
          'async *method({ w: [x, y, z] = [4, 5, 6] } = {}) {}',
          'async *method({ [function foo() {}]: x } = {}) {}',
          'async *method({ x: y = thrower() } = {}) {}',
          'async *method({ x = thrower() }) {}',
          'async *method({ x = function() {} }) {}',
          'async *method({ x: y }) {}',
          'async *method({ w: { x, y, z } = undefined }) {}',
          '*method([x]) {}',
          '*method([[x]]) {}',
          '*method([x = 23]) {}',
          '*method([cover = (function () {}), xCover = (0, function() {})]) {}',
          '*method([fn = function () {}, xFn = function x() {}]) {}',
          '*method([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }]) {}',
          '*method([, , ...x]) {}',
          '*method([...x]) {}',
          '*method([...{ 0: v, 1: w, 2: x, 3: y, length: z }]) {}',
          '*method([x] = {}) {}',
          '*method([gen = function* () {}, xGen = function* x() {}] = []) {}',
          '*method([ , , ...x] = [1, 2, 3, 4, 5]) {}',
          '*method({ x = thrower() } = {}) {}',
          '*method({ x: y = thrower() } = {}) {}',
          '*method({}) {}',
          '*method({ arrow = () => {} }) {}',
          '*method({ w: [x, y, z] = [4, 5, 6] }) {}',
          '*method({...rest}) {}',
          'method([,] = function*() {}()) {}',
          'method({...x} = { get v() { count++; return 2; } }) {}',
          'method({a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3}) {}',
          'method({}) {}',
          'method({ arrow = () => {} }) {}',
          'method({ w: [x, y, z] = [4, 5, 6] }) {}',
          'method({ x: y, }) {}',
          'id: function*() {}',
          'null: 42',
          '"answer": 42',
          'get if() {}',
          '__proto__: 2 ',
          '"__proto__": 2',
          'get width() { return m_width }, set width(width) { m_width = width; }',
          'set i(x) {}, i: 42 ',
          '[a]:()=>{}',
          'set x(a=0){}',
          'async delete() {}',
          'async [foo](){}',
          'async 100(){}',
          'async \'foo\'(){}',
          'async "foo"(){}',
          'async, foo',
          'async',
          'async: true',
          'async foo(a) { await a }',
          'async await() { }',
          'async() { }',
          'async foo() { }',
          'foo() { }',
          'x, y, z () {}',
          '[x]: "x"',
      ];

    for (const arg of validSyntax) {
          it(`({ ${arg} })`, () => {
              t.doesNotThrow(() => {
                  parseSource(`({ ${arg} })`, undefined, Context.OptionsNext);
              });
          });

          it(`({ ${arg} })`, () => {
              t.doesNotThrow(() => {
                  parseSource(`({ ${arg}, })`, undefined, Context.OptionsNext);
              });
          });

          it(`"use strict"; ({ ${arg} })`, () => {
              t.doesNotThrow(() => {
                  parseSource(`"use strict"; ({ ${arg}, })`, undefined, Context.OptionsNext);
              });
          });
      }

    pass('({a: await}) => 1', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: '({a: await}) => 1',
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
          body: [
            {
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
                params: [
                  {
                    type: 'ObjectPattern',
                    start: 1,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 11
                      }
                    },
                    properties: [
                      {
                        type: 'Property',
                        start: 2,
                        end: 10,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 10
                          }
                        },
                        method: false,
                        shorthand: false,
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
                        value: {
                          type: 'Identifier',
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
                          name: 'await'
                        },
                        kind: 'init'
                      }
                    ]
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
                  value: 1,
                  raw: '1'
                }
              }
            }
          ],
          sourceType: 'script'
        }
      });

    pass('({async = 0} = {})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: '({async = 0} = {})',
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
          body: [
            {
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
                type: 'AssignmentExpression',
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
                },
                operator: '=',
                left: {
                  type: 'ObjectPattern',
                  start: 1,
                  end: 12,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 12
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 2,
                      end: 11,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 11
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
                        name: 'async'
                      },
                      kind: 'init',
                      value: {
                        type: 'AssignmentPattern',
                        start: 2,
                        end: 11,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 11
                          }
                        },
                        left: {
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
                          name: 'async'
                        },
                        right: {
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
                      }
                    }
                  ]
                },
                right: {
                  type: 'ObjectExpression',
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
                  },
                  properties: []
                }
              }
            }
          ],
          sourceType: 'script'
        }
      });

    pass('obj = { async* f() { await a; yield b; } }', Context.Empty, {
        source: 'obj = { async* f() { await a; yield b; } }',
        expected: {
            body: [
              {
                expression: {
                  left: {
                    name: 'obj',
                    type: 'Identifier'
                  },
                  operator: '=',
                  right: {
                    properties: [
                      {
                        computed: false,
                        key: {
                          name: 'f',
                          type: 'Identifier',
                        },
                        kind: 'init',
                        method: true,
                        shorthand: false,
                        type: 'Property',
                        value: {
                          async: true,
                         body: {
                            body: [
                              {
                                expression: {
                                  argument: {
                                    name: 'a',
                                    type: 'Identifier',
                                  },
                                  type: 'AwaitExpression'
                                },
                                type: 'ExpressionStatement'
                              },
                              {
                                expression: {
                                  argument: {
                                    name: 'b',
                                    type: 'Identifier',
                                  },
                                  delegate: false,
                                  type: 'YieldExpression',
                                },
                                type: 'ExpressionStatement'
                              }
                            ],
                            type: 'BlockStatement',
                          },
                          expression: false,
                          generator: true,
                          id: null,
                          params: [],
                          type: 'FunctionExpression'
                        }
                      }
                    ],
                    type: 'ObjectExpression',
                  },
                  type: 'AssignmentExpression'
                },
                type: 'ExpressionStatement'
              },
            ],
            sourceType: 'script',
            type: 'Program'
          }
      });

    pass(`var {[zee]:x1} = {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `var {[zee]:x1} = {}`,
        expected: {
          type: 'Program',
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
          body: [
            {
              type: 'VariableDeclaration',
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
              declarations: [
                {
                  type: 'VariableDeclarator',
                  start: 4,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  },
                  id: {
                    type: 'ObjectPattern',
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
                    },
                    properties: [
                      {
                        type: 'Property',
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
                        },
                        method: false,
                        shorthand: false,
                        computed: true,
                        key: {
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
                          name: 'zee'
                        },
                        value: {
                          type: 'Identifier',
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
                          name: 'x1'
                        },
                        kind: 'init'
                      }
                    ]
                  },
                  init: {
                    type: 'ObjectExpression',
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
                    properties: []
                  }
                }
              ],
              kind: 'var'
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`let {
        x:{
            y:{
                z:{
                    k:k2 = 31
                  } = { k:21 }
              } = { z:{ k:20 } }
          } = { y: { z:{} } }
      } = { x:{ y:{ z:{} } } };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `let {
          x:{
              y:{
                  z:{
                      k:k2 = 31
                    } = { k:21 }
                } = { z:{ k:20 } }
            } = { y: { z:{} } }
        } = { x:{ y:{ z:{} } } };`,
        expected: {
          type: 'Program',
          start: 0,
          end: 225,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 9,
              column: 33
            }
          },
          body: [
            {
              type: 'VariableDeclaration',
              start: 0,
              end: 225,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 9,
                  column: 33
                }
              },
              declarations: [
                {
                  type: 'VariableDeclarator',
                  start: 4,
                  end: 224,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 9,
                      column: 32
                    }
                  },
                  id: {
                    type: 'ObjectPattern',
                    start: 4,
                    end: 201,
                    loc: {
                      start: {
                        line: 1,
                        column: 4
                      },
                      end: {
                        line: 9,
                        column: 9
                      }
                    },
                    properties: [
                      {
                        type: 'Property',
                        start: 16,
                        end: 191,
                        loc: {
                          start: {
                            line: 2,
                            column: 10
                          },
                          end: {
                            line: 8,
                            column: 31
                          }
                        },
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
                          type: 'Identifier',
                          start: 16,
                          end: 17,
                          loc: {
                            start: {
                              line: 2,
                              column: 10
                            },
                            end: {
                              line: 2,
                              column: 11
                            }
                          },
                          name: 'x'
                        },
                        value: {
                          type: 'AssignmentPattern',
                          start: 18,
                          end: 191,
                          loc: {
                            start: {
                              line: 2,
                              column: 12
                            },
                            end: {
                              line: 8,
                              column: 31
                            }
                          },
                          left: {
                            type: 'ObjectPattern',
                            start: 18,
                            end: 173,
                            loc: {
                              start: {
                                line: 2,
                                column: 12
                              },
                              end: {
                                line: 8,
                                column: 13
                              }
                            },
                            properties: [
                              {
                                type: 'Property',
                                start: 34,
                                end: 159,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 14
                                  },
                                  end: {
                                    line: 7,
                                    column: 34
                                  }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                  type: 'Identifier',
                                  start: 34,
                                  end: 35,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 14
                                    },
                                    end: {
                                      line: 3,
                                      column: 15
                                    }
                                  },
                                  name: 'y'
                                },
                                value: {
                                  type: 'AssignmentPattern',
                                  start: 36,
                                  end: 159,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 16
                                    },
                                    end: {
                                      line: 7,
                                      column: 34
                                    }
                                  },
                                  left: {
                                    type: 'ObjectPattern',
                                    start: 36,
                                    end: 142,
                                    loc: {
                                      start: {
                                        line: 3,
                                        column: 16
                                      },
                                      end: {
                                        line: 7,
                                        column: 17
                                      }
                                    },
                                    properties: [
                                      {
                                        type: 'Property',
                                        start: 56,
                                        end: 124,
                                        loc: {
                                          start: {
                                            line: 4,
                                            column: 18
                                          },
                                          end: {
                                            line: 6,
                                            column: 32
                                          }
                                        },
                                        method: false,
                                        shorthand: false,
                                        computed: false,
                                        key: {
                                          type: 'Identifier',
                                          start: 56,
                                          end: 57,
                                          loc: {
                                            start: {
                                              line: 4,
                                              column: 18
                                            },
                                            end: {
                                              line: 4,
                                              column: 19
                                            }
                                          },
                                          name: 'z'
                                        },
                                        value: {
                                          type: 'AssignmentPattern',
                                          start: 58,
                                          end: 124,
                                          loc: {
                                            start: {
                                              line: 4,
                                              column: 20
                                            },
                                            end: {
                                              line: 6,
                                              column: 32
                                            }
                                          },
                                          left: {
                                            type: 'ObjectPattern',
                                            start: 58,
                                            end: 113,
                                            loc: {
                                              start: {
                                                line: 4,
                                                column: 20
                                              },
                                              end: {
                                                line: 6,
                                                column: 21
                                              }
                                            },
                                            properties: [
                                              {
                                                type: 'Property',
                                                start: 82,
                                                end: 91,
                                                loc: {
                                                  start: {
                                                    line: 5,
                                                    column: 22
                                                  },
                                                  end: {
                                                    line: 5,
                                                    column: 31
                                                  }
                                                },
                                                method: false,
                                                shorthand: false,
                                                computed: false,
                                                key: {
                                                  type: 'Identifier',
                                                  start: 82,
                                                  end: 83,
                                                  loc: {
                                                    start: {
                                                      line: 5,
                                                      column: 22
                                                    },
                                                    end: {
                                                      line: 5,
                                                      column: 23
                                                    }
                                                  },
                                                  name: 'k'
                                                },
                                                value: {
                                                  type: 'AssignmentPattern',
                                                  start: 84,
                                                  end: 91,
                                                  loc: {
                                                    start: {
                                                      line: 5,
                                                      column: 24
                                                    },
                                                    end: {
                                                      line: 5,
                                                      column: 31
                                                    }
                                                  },
                                                  left: {
                                                    type: 'Identifier',
                                                    start: 84,
                                                    end: 86,
                                                    loc: {
                                                      start: {
                                                        line: 5,
                                                        column: 24
                                                      },
                                                      end: {
                                                        line: 5,
                                                        column: 26
                                                      }
                                                    },
                                                    name: 'k2'
                                                  },
                                                  right: {
                                                    type: 'Literal',
                                                    start: 89,
                                                    end: 91,
                                                    loc: {
                                                      start: {
                                                        line: 5,
                                                        column: 29
                                                      },
                                                      end: {
                                                        line: 5,
                                                        column: 31
                                                      }
                                                    },
                                                    value: 31,
                                                    raw: '31'
                                                  }
                                                },
                                                kind: 'init'
                                              }
                                            ]
                                          },
                                          right: {
                                            type: 'ObjectExpression',
                                            start: 116,
                                            end: 124,
                                            loc: {
                                              start: {
                                                line: 6,
                                                column: 24
                                              },
                                              end: {
                                                line: 6,
                                                column: 32
                                              }
                                            },
                                            properties: [
                                              {
                                                type: 'Property',
                                                start: 118,
                                                end: 122,
                                                loc: {
                                                  start: {
                                                    line: 6,
                                                    column: 26
                                                  },
                                                  end: {
                                                    line: 6,
                                                    column: 30
                                                  }
                                                },
                                                method: false,
                                                shorthand: false,
                                                computed: false,
                                                key: {
                                                  type: 'Identifier',
                                                  start: 118,
                                                  end: 119,
                                                  loc: {
                                                    start: {
                                                      line: 6,
                                                      column: 26
                                                    },
                                                    end: {
                                                      line: 6,
                                                      column: 27
                                                    }
                                                  },
                                                  name: 'k'
                                                },
                                                value: {
                                                  type: 'Literal',
                                                  start: 120,
                                                  end: 122,
                                                  loc: {
                                                    start: {
                                                      line: 6,
                                                      column: 28
                                                    },
                                                    end: {
                                                      line: 6,
                                                      column: 30
                                                    }
                                                  },
                                                  value: 21,
                                                  raw: '21'
                                                },
                                                kind: 'init'
                                              }
                                            ]
                                          }
                                        },
                                        kind: 'init'
                                      }
                                    ]
                                  },
                                  right: {
                                    type: 'ObjectExpression',
                                    start: 145,
                                    end: 159,
                                    loc: {
                                      start: {
                                        line: 7,
                                        column: 20
                                      },
                                      end: {
                                        line: 7,
                                        column: 34
                                      }
                                    },
                                    properties: [
                                      {
                                        type: 'Property',
                                        start: 147,
                                        end: 157,
                                        loc: {
                                          start: {
                                            line: 7,
                                            column: 22
                                          },
                                          end: {
                                            line: 7,
                                            column: 32
                                          }
                                        },
                                        method: false,
                                        shorthand: false,
                                        computed: false,
                                        key: {
                                          type: 'Identifier',
                                          start: 147,
                                          end: 148,
                                          loc: {
                                            start: {
                                              line: 7,
                                              column: 22
                                            },
                                            end: {
                                              line: 7,
                                              column: 23
                                            }
                                          },
                                          name: 'z'
                                        },
                                        value: {
                                          type: 'ObjectExpression',
                                          start: 149,
                                          end: 157,
                                          loc: {
                                            start: {
                                              line: 7,
                                              column: 24
                                            },
                                            end: {
                                              line: 7,
                                              column: 32
                                            }
                                          },
                                          properties: [
                                            {
                                              type: 'Property',
                                              start: 151,
                                              end: 155,
                                              loc: {
                                                start: {
                                                  line: 7,
                                                  column: 26
                                                },
                                                end: {
                                                  line: 7,
                                                  column: 30
                                                }
                                              },
                                              method: false,
                                              shorthand: false,
                                              computed: false,
                                              key: {
                                                type: 'Identifier',
                                                start: 151,
                                                end: 152,
                                                loc: {
                                                  start: {
                                                    line: 7,
                                                    column: 26
                                                  },
                                                  end: {
                                                    line: 7,
                                                    column: 27
                                                  }
                                                },
                                                name: 'k'
                                              },
                                              value: {
                                                type: 'Literal',
                                                start: 153,
                                                end: 155,
                                                loc: {
                                                  start: {
                                                    line: 7,
                                                    column: 28
                                                  },
                                                  end: {
                                                    line: 7,
                                                    column: 30
                                                  }
                                                },
                                                value: 20,
                                                raw: '20'
                                              },
                                              kind: 'init'
                                            }
                                          ]
                                        },
                                        kind: 'init'
                                      }
                                    ]
                                  }
                                },
                                kind: 'init'
                              }
                            ]
                          },
                          right: {
                            type: 'ObjectExpression',
                            start: 176,
                            end: 191,
                            loc: {
                              start: {
                                line: 8,
                                column: 16
                              },
                              end: {
                                line: 8,
                                column: 31
                              }
                            },
                            properties: [
                              {
                                type: 'Property',
                                start: 178,
                                end: 189,
                                loc: {
                                  start: {
                                    line: 8,
                                    column: 18
                                  },
                                  end: {
                                    line: 8,
                                    column: 29
                                  }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                  type: 'Identifier',
                                  start: 178,
                                  end: 179,
                                  loc: {
                                    start: {
                                      line: 8,
                                      column: 18
                                    },
                                    end: {
                                      line: 8,
                                      column: 19
                                    }
                                  },
                                  name: 'y'
                                },
                                value: {
                                  type: 'ObjectExpression',
                                  start: 181,
                                  end: 189,
                                  loc: {
                                    start: {
                                      line: 8,
                                      column: 21
                                    },
                                    end: {
                                      line: 8,
                                      column: 29
                                    }
                                  },
                                  properties: [
                                    {
                                      type: 'Property',
                                      start: 183,
                                      end: 187,
                                      loc: {
                                        start: {
                                          line: 8,
                                          column: 23
                                        },
                                        end: {
                                          line: 8,
                                          column: 27
                                        }
                                      },
                                      method: false,
                                      shorthand: false,
                                      computed: false,
                                      key: {
                                        type: 'Identifier',
                                        start: 183,
                                        end: 184,
                                        loc: {
                                          start: {
                                            line: 8,
                                            column: 23
                                          },
                                          end: {
                                            line: 8,
                                            column: 24
                                          }
                                        },
                                        name: 'z'
                                      },
                                      value: {
                                        type: 'ObjectExpression',
                                        start: 185,
                                        end: 187,
                                        loc: {
                                          start: {
                                            line: 8,
                                            column: 25
                                          },
                                          end: {
                                            line: 8,
                                            column: 27
                                          }
                                        },
                                        properties: []
                                      },
                                      kind: 'init'
                                    }
                                  ]
                                },
                                kind: 'init'
                              }
                            ]
                          }
                        },
                        kind: 'init'
                      }
                    ]
                  },
                  init: {
                    type: 'ObjectExpression',
                    start: 204,
                    end: 224,
                    loc: {
                      start: {
                        line: 9,
                        column: 12
                      },
                      end: {
                        line: 9,
                        column: 32
                      }
                    },
                    properties: [
                      {
                        type: 'Property',
                        start: 206,
                        end: 222,
                        loc: {
                          start: {
                            line: 9,
                            column: 14
                          },
                          end: {
                            line: 9,
                            column: 30
                          }
                        },
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
                          type: 'Identifier',
                          start: 206,
                          end: 207,
                          loc: {
                            start: {
                              line: 9,
                              column: 14
                            },
                            end: {
                              line: 9,
                              column: 15
                            }
                          },
                          name: 'x'
                        },
                        value: {
                          type: 'ObjectExpression',
                          start: 208,
                          end: 222,
                          loc: {
                            start: {
                              line: 9,
                              column: 16
                            },
                            end: {
                              line: 9,
                              column: 30
                            }
                          },
                          properties: [
                            {
                              type: 'Property',
                              start: 210,
                              end: 220,
                              loc: {
                                start: {
                                  line: 9,
                                  column: 18
                                },
                                end: {
                                  line: 9,
                                  column: 28
                                }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 210,
                                end: 211,
                                loc: {
                                  start: {
                                    line: 9,
                                    column: 18
                                  },
                                  end: {
                                    line: 9,
                                    column: 19
                                  }
                                },
                                name: 'y'
                              },
                              value: {
                                type: 'ObjectExpression',
                                start: 212,
                                end: 220,
                                loc: {
                                  start: {
                                    line: 9,
                                    column: 20
                                  },
                                  end: {
                                    line: 9,
                                    column: 28
                                  }
                                },
                                properties: [
                                  {
                                    type: 'Property',
                                    start: 214,
                                    end: 218,
                                    loc: {
                                      start: {
                                        line: 9,
                                        column: 22
                                      },
                                      end: {
                                        line: 9,
                                        column: 26
                                      }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                      type: 'Identifier',
                                      start: 214,
                                      end: 215,
                                      loc: {
                                        start: {
                                          line: 9,
                                          column: 22
                                        },
                                        end: {
                                          line: 9,
                                          column: 23
                                        }
                                      },
                                      name: 'z'
                                    },
                                    value: {
                                      type: 'ObjectExpression',
                                      start: 216,
                                      end: 218,
                                      loc: {
                                        start: {
                                          line: 9,
                                          column: 24
                                        },
                                        end: {
                                          line: 9,
                                          column: 26
                                        }
                                      },
                                      properties: []
                                    },
                                    kind: 'init'
                                  }
                                ]
                              },
                              kind: 'init'
                            }
                          ]
                        },
                        kind: 'init'
                      }
                    ]
                  }
                }
              ],
              kind: 'let'
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`({
        x:{
            y:{
                z:{
                    k:k2 = 31
                  } = {k:21}
              } = {z:{k:20}}
           } = {y:{z:{}}}
    } = {x:{y:{z:undefined}}});`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `({
          x:{
              y:{
                  z:{
                      k:k2 = 31
                    } = {k:21}
                } = {z:{k:20}}
             } = {y:{z:{}}}
      } = {x:{y:{z:undefined}}});`,
        expected: {
          type: 'Program',
          start: 0,
          end: 212,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 9,
              column: 33
            }
          },
          body: [
            {
              type: 'ExpressionStatement',
              start: 0,
              end: 212,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 9,
                  column: 33
                }
              },
              expression: {
                type: 'AssignmentExpression',
                start: 1,
                end: 210,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 9,
                    column: 31
                  }
                },
                operator: '=',
                left: {
                  type: 'ObjectPattern',
                  start: 1,
                  end: 186,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 9,
                      column: 7
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 13,
                      end: 178,
                      loc: {
                        start: {
                          line: 2,
                          column: 10
                        },
                        end: {
                          line: 8,
                          column: 27
                        }
                      },
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 13,
                        end: 14,
                        loc: {
                          start: {
                            line: 2,
                            column: 10
                          },
                          end: {
                            line: 2,
                            column: 11
                          }
                        },
                        name: 'x'
                      },
                      value: {
                        type: 'AssignmentPattern',
                        start: 15,
                        end: 178,
                        loc: {
                          start: {
                            line: 2,
                            column: 12
                          },
                          end: {
                            line: 8,
                            column: 27
                          }
                        },
                        left: {
                          type: 'ObjectPattern',
                          start: 15,
                          end: 165,
                          loc: {
                            start: {
                              line: 2,
                              column: 12
                            },
                            end: {
                              line: 8,
                              column: 14
                            }
                          },
                          properties: [
                            {
                              type: 'Property',
                              start: 31,
                              end: 150,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 14
                                },
                                end: {
                                  line: 7,
                                  column: 30
                                }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 31,
                                end: 32,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 14
                                  },
                                  end: {
                                    line: 3,
                                    column: 15
                                  }
                                },
                                name: 'y'
                              },
                              value: {
                                type: 'AssignmentPattern',
                                start: 33,
                                end: 150,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 16
                                  },
                                  end: {
                                    line: 7,
                                    column: 30
                                  }
                                },
                                left: {
                                  type: 'ObjectPattern',
                                  start: 33,
                                  end: 137,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 16
                                    },
                                    end: {
                                      line: 7,
                                      column: 17
                                    }
                                  },
                                  properties: [
                                    {
                                      type: 'Property',
                                      start: 53,
                                      end: 119,
                                      loc: {
                                        start: {
                                          line: 4,
                                          column: 18
                                        },
                                        end: {
                                          line: 6,
                                          column: 30
                                        }
                                      },
                                      method: false,
                                      shorthand: false,
                                      computed: false,
                                      key: {
                                        type: 'Identifier',
                                        start: 53,
                                        end: 54,
                                        loc: {
                                          start: {
                                            line: 4,
                                            column: 18
                                          },
                                          end: {
                                            line: 4,
                                            column: 19
                                          }
                                        },
                                        name: 'z'
                                      },
                                      value: {
                                        type: 'AssignmentPattern',
                                        start: 55,
                                        end: 119,
                                        loc: {
                                          start: {
                                            line: 4,
                                            column: 20
                                          },
                                          end: {
                                            line: 6,
                                            column: 30
                                          }
                                        },
                                        left: {
                                          type: 'ObjectPattern',
                                          start: 55,
                                          end: 110,
                                          loc: {
                                            start: {
                                              line: 4,
                                              column: 20
                                            },
                                            end: {
                                              line: 6,
                                              column: 21
                                            }
                                          },
                                          properties: [
                                            {
                                              type: 'Property',
                                              start: 79,
                                              end: 88,
                                              loc: {
                                                start: {
                                                  line: 5,
                                                  column: 22
                                                },
                                                end: {
                                                  line: 5,
                                                  column: 31
                                                }
                                              },
                                              method: false,
                                              shorthand: false,
                                              computed: false,
                                              key: {
                                                type: 'Identifier',
                                                start: 79,
                                                end: 80,
                                                loc: {
                                                  start: {
                                                    line: 5,
                                                    column: 22
                                                  },
                                                  end: {
                                                    line: 5,
                                                    column: 23
                                                  }
                                                },
                                                name: 'k'
                                              },
                                              value: {
                                                type: 'AssignmentPattern',
                                                start: 81,
                                                end: 88,
                                                loc: {
                                                  start: {
                                                    line: 5,
                                                    column: 24
                                                  },
                                                  end: {
                                                    line: 5,
                                                    column: 31
                                                  }
                                                },
                                                left: {
                                                  type: 'Identifier',
                                                  start: 81,
                                                  end: 83,
                                                  loc: {
                                                    start: {
                                                      line: 5,
                                                      column: 24
                                                    },
                                                    end: {
                                                      line: 5,
                                                      column: 26
                                                    }
                                                  },
                                                  name: 'k2'
                                                },
                                                right: {
                                                  type: 'Literal',
                                                  start: 86,
                                                  end: 88,
                                                  loc: {
                                                    start: {
                                                      line: 5,
                                                      column: 29
                                                    },
                                                    end: {
                                                      line: 5,
                                                      column: 31
                                                    }
                                                  },
                                                  value: 31,
                                                  raw: '31'
                                                }
                                              },
                                              kind: 'init'
                                            }
                                          ]
                                        },
                                        right: {
                                          type: 'ObjectExpression',
                                          start: 113,
                                          end: 119,
                                          loc: {
                                            start: {
                                              line: 6,
                                              column: 24
                                            },
                                            end: {
                                              line: 6,
                                              column: 30
                                            }
                                          },
                                          properties: [
                                            {
                                              type: 'Property',
                                              start: 114,
                                              end: 118,
                                              loc: {
                                                start: {
                                                  line: 6,
                                                  column: 25
                                                },
                                                end: {
                                                  line: 6,
                                                  column: 29
                                                }
                                              },
                                              method: false,
                                              shorthand: false,
                                              computed: false,
                                              key: {
                                                type: 'Identifier',
                                                start: 114,
                                                end: 115,
                                                loc: {
                                                  start: {
                                                    line: 6,
                                                    column: 25
                                                  },
                                                  end: {
                                                    line: 6,
                                                    column: 26
                                                  }
                                                },
                                                name: 'k'
                                              },
                                              value: {
                                                type: 'Literal',
                                                start: 116,
                                                end: 118,
                                                loc: {
                                                  start: {
                                                    line: 6,
                                                    column: 27
                                                  },
                                                  end: {
                                                    line: 6,
                                                    column: 29
                                                  }
                                                },
                                                value: 21,
                                                raw: '21'
                                              },
                                              kind: 'init'
                                            }
                                          ]
                                        }
                                      },
                                      kind: 'init'
                                    }
                                  ]
                                },
                                right: {
                                  type: 'ObjectExpression',
                                  start: 140,
                                  end: 150,
                                  loc: {
                                    start: {
                                      line: 7,
                                      column: 20
                                    },
                                    end: {
                                      line: 7,
                                      column: 30
                                    }
                                  },
                                  properties: [
                                    {
                                      type: 'Property',
                                      start: 141,
                                      end: 149,
                                      loc: {
                                        start: {
                                          line: 7,
                                          column: 21
                                        },
                                        end: {
                                          line: 7,
                                          column: 29
                                        }
                                      },
                                      method: false,
                                      shorthand: false,
                                      computed: false,
                                      key: {
                                        type: 'Identifier',
                                        start: 141,
                                        end: 142,
                                        loc: {
                                          start: {
                                            line: 7,
                                            column: 21
                                          },
                                          end: {
                                            line: 7,
                                            column: 22
                                          }
                                        },
                                        name: 'z'
                                      },
                                      value: {
                                        type: 'ObjectExpression',
                                        start: 143,
                                        end: 149,
                                        loc: {
                                          start: {
                                            line: 7,
                                            column: 23
                                          },
                                          end: {
                                            line: 7,
                                            column: 29
                                          }
                                        },
                                        properties: [
                                          {
                                            type: 'Property',
                                            start: 144,
                                            end: 148,
                                            loc: {
                                              start: {
                                                line: 7,
                                                column: 24
                                              },
                                              end: {
                                                line: 7,
                                                column: 28
                                              }
                                            },
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                              type: 'Identifier',
                                              start: 144,
                                              end: 145,
                                              loc: {
                                                start: {
                                                  line: 7,
                                                  column: 24
                                                },
                                                end: {
                                                  line: 7,
                                                  column: 25
                                                }
                                              },
                                              name: 'k'
                                            },
                                            value: {
                                              type: 'Literal',
                                              start: 146,
                                              end: 148,
                                              loc: {
                                                start: {
                                                  line: 7,
                                                  column: 26
                                                },
                                                end: {
                                                  line: 7,
                                                  column: 28
                                                }
                                              },
                                              value: 20,
                                              raw: '20'
                                            },
                                            kind: 'init'
                                          }
                                        ]
                                      },
                                      kind: 'init'
                                    }
                                  ]
                                }
                              },
                              kind: 'init'
                            }
                          ]
                        },
                        right: {
                          type: 'ObjectExpression',
                          start: 168,
                          end: 178,
                          loc: {
                            start: {
                              line: 8,
                              column: 17
                            },
                            end: {
                              line: 8,
                              column: 27
                            }
                          },
                          properties: [
                            {
                              type: 'Property',
                              start: 169,
                              end: 177,
                              loc: {
                                start: {
                                  line: 8,
                                  column: 18
                                },
                                end: {
                                  line: 8,
                                  column: 26
                                }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 169,
                                end: 170,
                                loc: {
                                  start: {
                                    line: 8,
                                    column: 18
                                  },
                                  end: {
                                    line: 8,
                                    column: 19
                                  }
                                },
                                name: 'y'
                              },
                              value: {
                                type: 'ObjectExpression',
                                start: 171,
                                end: 177,
                                loc: {
                                  start: {
                                    line: 8,
                                    column: 20
                                  },
                                  end: {
                                    line: 8,
                                    column: 26
                                  }
                                },
                                properties: [
                                  {
                                    type: 'Property',
                                    start: 172,
                                    end: 176,
                                    loc: {
                                      start: {
                                        line: 8,
                                        column: 21
                                      },
                                      end: {
                                        line: 8,
                                        column: 25
                                      }
                                    },
                                    method: false,
                                    shorthand: false,
                                    computed: false,
                                    key: {
                                      type: 'Identifier',
                                      start: 172,
                                      end: 173,
                                      loc: {
                                        start: {
                                          line: 8,
                                          column: 21
                                        },
                                        end: {
                                          line: 8,
                                          column: 22
                                        }
                                      },
                                      name: 'z'
                                    },
                                    value: {
                                      type: 'ObjectExpression',
                                      start: 174,
                                      end: 176,
                                      loc: {
                                        start: {
                                          line: 8,
                                          column: 23
                                        },
                                        end: {
                                          line: 8,
                                          column: 25
                                        }
                                      },
                                      properties: []
                                    },
                                    kind: 'init'
                                  }
                                ]
                              },
                              kind: 'init'
                            }
                          ]
                        }
                      },
                      kind: 'init'
                    }
                  ]
                },
                right: {
                  type: 'ObjectExpression',
                  start: 189,
                  end: 210,
                  loc: {
                    start: {
                      line: 9,
                      column: 10
                    },
                    end: {
                      line: 9,
                      column: 31
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 190,
                      end: 209,
                      loc: {
                        start: {
                          line: 9,
                          column: 11
                        },
                        end: {
                          line: 9,
                          column: 30
                        }
                      },
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 190,
                        end: 191,
                        loc: {
                          start: {
                            line: 9,
                            column: 11
                          },
                          end: {
                            line: 9,
                            column: 12
                          }
                        },
                        name: 'x'
                      },
                      value: {
                        type: 'ObjectExpression',
                        start: 192,
                        end: 209,
                        loc: {
                          start: {
                            line: 9,
                            column: 13
                          },
                          end: {
                            line: 9,
                            column: 30
                          }
                        },
                        properties: [
                          {
                            type: 'Property',
                            start: 193,
                            end: 208,
                            loc: {
                              start: {
                                line: 9,
                                column: 14
                              },
                              end: {
                                line: 9,
                                column: 29
                              }
                            },
                            method: false,
                            shorthand: false,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              start: 193,
                              end: 194,
                              loc: {
                                start: {
                                  line: 9,
                                  column: 14
                                },
                                end: {
                                  line: 9,
                                  column: 15
                                }
                              },
                              name: 'y'
                            },
                            value: {
                              type: 'ObjectExpression',
                              start: 195,
                              end: 208,
                              loc: {
                                start: {
                                  line: 9,
                                  column: 16
                                },
                                end: {
                                  line: 9,
                                  column: 29
                                }
                              },
                              properties: [
                                {
                                  type: 'Property',
                                  start: 196,
                                  end: 207,
                                  loc: {
                                    start: {
                                      line: 9,
                                      column: 17
                                    },
                                    end: {
                                      line: 9,
                                      column: 28
                                    }
                                  },
                                  method: false,
                                  shorthand: false,
                                  computed: false,
                                  key: {
                                    type: 'Identifier',
                                    start: 196,
                                    end: 197,
                                    loc: {
                                      start: {
                                        line: 9,
                                        column: 17
                                      },
                                      end: {
                                        line: 9,
                                        column: 18
                                      }
                                    },
                                    name: 'z'
                                  },
                                  value: {
                                    type: 'Identifier',
                                    start: 198,
                                    end: 207,
                                    loc: {
                                      start: {
                                        line: 9,
                                        column: 19
                                      },
                                      end: {
                                        line: 9,
                                        column: 28
                                      }
                                    },
                                    name: 'undefined'
                                  },
                                  kind: 'init'
                                }
                              ]
                            },
                            kind: 'init'
                          }
                        ]
                      },
                      kind: 'init'
                    }
                  ]
                }
              }
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`({x:a['x']} = {x:20});`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `({x:a['x']} = {x:20});`,
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
          body: [
            {
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
                type: 'AssignmentExpression',
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
                operator: '=',
                left: {
                  type: 'ObjectPattern',
                  start: 1,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 11
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 2,
                      end: 10,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 10
                        }
                      },
                      method: false,
                      shorthand: false,
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
                        name: 'x'
                      },
                      value: {
                        type: 'MemberExpression',
                        start: 4,
                        end: 10,
                        loc: {
                          start: {
                            line: 1,
                            column: 4
                          },
                          end: {
                            line: 1,
                            column: 10
                          }
                        },
                        object: {
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
                        },
                        property: {
                          type: 'Literal',
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
                          value: 'x',
                          raw: '\'x\''
                        },
                        computed: true
                      },
                      kind: 'init'
                    }
                  ]
                },
                right: {
                  type: 'ObjectExpression',
                  start: 14,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 15,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 15
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
                        name: 'x'
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
                        value: 20,
                        raw: '20'
                      },
                      kind: 'init'
                    }
                  ]
                }
              }
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`({y:y2} = {y:y2-2})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `({y:y2} = {y:y2-2})`,
        expected: {
          type: 'Program',
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
          body: [
            {
              type: 'ExpressionStatement',
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
              expression: {
                type: 'AssignmentExpression',
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
                },
                operator: '=',
                left: {
                  type: 'ObjectPattern',
                  start: 1,
                  end: 7,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 7
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 2,
                      end: 6,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 6
                        }
                      },
                      method: false,
                      shorthand: false,
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
                        name: 'y'
                      },
                      value: {
                        type: 'Identifier',
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
                        name: 'y2'
                      },
                      kind: 'init'
                    }
                  ]
                },
                right: {
                  type: 'ObjectExpression',
                  start: 10,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
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
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
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
                        name: 'y'
                      },
                      value: {
                        type: 'BinaryExpression',
                        start: 13,
                        end: 17,
                        loc: {
                          start: {
                            line: 1,
                            column: 13
                          },
                          end: {
                            line: 1,
                            column: 17
                          }
                        },
                        left: {
                          type: 'Identifier',
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
                          name: 'y2'
                        },
                        operator: '-',
                        right: {
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
                          value: 2,
                          raw: '2'
                        }
                      },
                      kind: 'init'
                    }
                  ]
                }
              }
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`var o = { __proto__: { pp: 123 } };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `var o = { __proto__: { pp: 123 } };`,
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
          body: [
            {
              type: 'VariableDeclaration',
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
              declarations: [
                {
                  type: 'VariableDeclarator',
                  start: 4,
                  end: 34,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 34
                    }
                  },
                  id: {
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
                    name: 'o'
                  },
                  init: {
                    type: 'ObjectExpression',
                    start: 8,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 8
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    },
                    properties: [
                      {
                        type: 'Property',
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
                        },
                        method: false,
                        shorthand: false,
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
                          name: '__proto__'
                        },
                        value: {
                          type: 'ObjectExpression',
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
                          properties: [
                            {
                              type: 'Property',
                              start: 23,
                              end: 30,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 23
                                },
                                end: {
                                  line: 1,
                                  column: 30
                                }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 23,
                                end: 25,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 23
                                  },
                                  end: {
                                    line: 1,
                                    column: 25
                                  }
                                },
                                name: 'pp'
                              },
                              value: {
                                type: 'Literal',
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
                                value: 123,
                                raw: '123'
                              },
                              kind: 'init'
                            }
                          ]
                        },
                        kind: 'init'
                      }
                    ]
                  }
                }
              ],
              kind: 'var'
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`var o = { yield: 10 }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `var o = { yield: 10 }`,
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
        body: [
          {
            type: 'VariableDeclaration',
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
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                },
                id: {
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
                  name: 'o'
                },
                init: {
                  type: 'ObjectExpression',
                  start: 8,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
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
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
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
                        name: 'yield'
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
                        value: 10,
                        raw: '10'
                      },
                      kind: 'init'
                    }
                  ]
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`var x1; ({[zee +'foo']:x1} = {})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `var x1; ({[zee +'foo']:x1} = {})`,
        expected: {
          type: 'Program',
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
          },
          body: [
            {
              type: 'VariableDeclaration',
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
              declarations: [
                {
                  type: 'VariableDeclarator',
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
                  id: {
                    type: 'Identifier',
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
                    name: 'x1'
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            {
              type: 'ExpressionStatement',
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
              },
              expression: {
                type: 'AssignmentExpression',
                start: 9,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                },
                operator: '=',
                left: {
                  type: 'ObjectPattern',
                  start: 9,
                  end: 26,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 26
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
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
                      method: false,
                      shorthand: false,
                      computed: true,
                      key: {
                        type: 'BinaryExpression',
                        start: 11,
                        end: 21,
                        loc: {
                          start: {
                            line: 1,
                            column: 11
                          },
                          end: {
                            line: 1,
                            column: 21
                          }
                        },
                        left: {
                          type: 'Identifier',
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
                          name: 'zee'
                        },
                        operator: '+',
                        right: {
                          type: 'Literal',
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
                          value: 'foo',
                          raw: '\'foo\''
                        }
                      },
                      value: {
                        type: 'Identifier',
                        start: 23,
                        end: 25,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 25
                          }
                        },
                        name: 'x1'
                      },
                      kind: 'init'
                    }
                  ]
                },
                right: {
                  type: 'ObjectExpression',
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
                  properties: []
                }
              }
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`var z, y; ({x:z = 1, x1:y = 20} = {});`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `var z, y; ({x:z = 1, x1:y = 20} = {});`,
        expected: {
          type: 'Program',
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
          body: [
            {
              type: 'VariableDeclaration',
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
              declarations: [
                {
                  type: 'VariableDeclarator',
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
                  id: {
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
                    name: 'z'
                  },
                  init: null
                },
                {
                  type: 'VariableDeclarator',
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
                  id: {
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
                    name: 'y'
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            {
              type: 'ExpressionStatement',
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
              },
              expression: {
                type: 'AssignmentExpression',
                start: 11,
                end: 36,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 36
                  }
                },
                operator: '=',
                left: {
                  type: 'ObjectPattern',
                  start: 11,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 31
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 12,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
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
                        name: 'x'
                      },
                      value: {
                        type: 'AssignmentPattern',
                        start: 14,
                        end: 19,
                        loc: {
                          start: {
                            line: 1,
                            column: 14
                          },
                          end: {
                            line: 1,
                            column: 19
                          }
                        },
                        left: {
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
                          name: 'z'
                        },
                        right: {
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
                          value: 1,
                          raw: '1'
                        }
                      },
                      kind: 'init'
                    },
                    {
                      type: 'Property',
                      start: 21,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      },
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
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
                        name: 'x1'
                      },
                      value: {
                        type: 'AssignmentPattern',
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
                        },
                        left: {
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
                        },
                        right: {
                          type: 'Literal',
                          start: 28,
                          end: 30,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 30
                            }
                          },
                          value: 20,
                          raw: '20'
                        }
                      },
                      kind: 'init'
                    }
                  ]
                },
                right: {
                  type: 'ObjectExpression',
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
                  properties: []
                }
              }
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`var {x:z = 1, x1:y = 20} = {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `var {x:z = 1, x1:y = 20} = {};`,
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
          body: [
            {
              type: 'VariableDeclaration',
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
              declarations: [
                {
                  type: 'VariableDeclarator',
                  start: 4,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  },
                  id: {
                    type: 'ObjectPattern',
                    start: 4,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 4
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    },
                    properties: [
                      {
                        type: 'Property',
                        start: 5,
                        end: 12,
                        loc: {
                          start: {
                            line: 1,
                            column: 5
                          },
                          end: {
                            line: 1,
                            column: 12
                          }
                        },
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
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
                        value: {
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
                            name: 'z'
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
                        },
                        kind: 'init'
                      },
                      {
                        type: 'Property',
                        start: 14,
                        end: 23,
                        loc: {
                          start: {
                            line: 1,
                            column: 14
                          },
                          end: {
                            line: 1,
                            column: 23
                          }
                        },
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
                          type: 'Identifier',
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
                          name: 'x1'
                        },
                        value: {
                          type: 'AssignmentPattern',
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
                          },
                          left: {
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
                            name: 'y'
                          },
                          right: {
                            type: 'Literal',
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
                            value: 20,
                            raw: '20'
                          }
                        },
                        kind: 'init'
                      }
                    ]
                  },
                  init: {
                    type: 'ObjectExpression',
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
                    properties: []
                  }
                }
              ],
              kind: 'var'
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`({x:y} = {});`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `({x:y} = {});`,
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
          body: [
            {
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
                type: 'AssignmentExpression',
                start: 1,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                },
                operator: '=',
                left: {
                  type: 'ObjectPattern',
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
                  properties: [
                    {
                      type: 'Property',
                      start: 2,
                      end: 5,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 5
                        }
                      },
                      method: false,
                      shorthand: false,
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
                        name: 'x'
                      },
                      value: {
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
                      kind: 'init'
                    }
                  ]
                },
                right: {
                  type: 'ObjectExpression',
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
                  properties: []
                }
              }
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`var { x : x, y : y, get, set } = { x : 1, y : 2, get: 3, set: 4 };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `var { x : x, y : y, get, set } = { x : 1, y : 2, get: 3, set: 4 };`,
        expected: {
          type: 'Program',
          start: 0,
          end: 66,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 66
            }
          },
          body: [
            {
              type: 'VariableDeclaration',
              start: 0,
              end: 66,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 66
                }
              },
              declarations: [
                {
                  type: 'VariableDeclarator',
                  start: 4,
                  end: 65,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 65
                    }
                  },
                  id: {
                    type: 'ObjectPattern',
                    start: 4,
                    end: 30,
                    loc: {
                      start: {
                        line: 1,
                        column: 4
                      },
                      end: {
                        line: 1,
                        column: 30
                      }
                    },
                    properties: [
                      {
                        type: 'Property',
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
                        },
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
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
                          name: 'x'
                        },
                        value: {
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
                        kind: 'init'
                      },
                      {
                        type: 'Property',
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
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
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
                          name: 'y'
                        },
                        value: {
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
                          name: 'y'
                        },
                        kind: 'init'
                      },
                      {
                        type: 'Property',
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
                        method: false,
                        shorthand: true,
                        computed: false,
                        key: {
                          type: 'Identifier',
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
                          name: 'get'
                        },
                        kind: 'init',
                        value: {
                          type: 'Identifier',
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
                          name: 'get'
                        }
                      },
                      {
                        type: 'Property',
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
                        method: false,
                        shorthand: true,
                        computed: false,
                        key: {
                          type: 'Identifier',
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
                          name: 'set'
                        },
                        kind: 'init',
                        value: {
                          type: 'Identifier',
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
                          name: 'set'
                        }
                      }
                    ]
                  },
                  init: {
                    type: 'ObjectExpression',
                    start: 33,
                    end: 65,
                    loc: {
                      start: {
                        line: 1,
                        column: 33
                      },
                      end: {
                        line: 1,
                        column: 65
                      }
                    },
                    properties: [
                      {
                        type: 'Property',
                        start: 35,
                        end: 40,
                        loc: {
                          start: {
                            line: 1,
                            column: 35
                          },
                          end: {
                            line: 1,
                            column: 40
                          }
                        },
                        method: false,
                        shorthand: false,
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
                          name: 'x'
                        },
                        value: {
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
                          value: 1,
                          raw: '1'
                        },
                        kind: 'init'
                      },
                      {
                        type: 'Property',
                        start: 42,
                        end: 47,
                        loc: {
                          start: {
                            line: 1,
                            column: 42
                          },
                          end: {
                            line: 1,
                            column: 47
                          }
                        },
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
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
                          name: 'y'
                        },
                        value: {
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
                          value: 2,
                          raw: '2'
                        },
                        kind: 'init'
                      },
                      {
                        type: 'Property',
                        start: 49,
                        end: 55,
                        loc: {
                          start: {
                            line: 1,
                            column: 49
                          },
                          end: {
                            line: 1,
                            column: 55
                          }
                        },
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
                          type: 'Identifier',
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
                          name: 'get'
                        },
                        value: {
                          type: 'Literal',
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
                          value: 3,
                          raw: '3'
                        },
                        kind: 'init'
                      },
                      {
                        type: 'Property',
                        start: 57,
                        end: 63,
                        loc: {
                          start: {
                            line: 1,
                            column: 57
                          },
                          end: {
                            line: 1,
                            column: 63
                          }
                        },
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
                          type: 'Identifier',
                          start: 57,
                          end: 60,
                          loc: {
                            start: {
                              line: 1,
                              column: 57
                            },
                            end: {
                              line: 1,
                              column: 60
                            }
                          },
                          name: 'set'
                        },
                        value: {
                          type: 'Literal',
                          start: 62,
                          end: 63,
                          loc: {
                            start: {
                              line: 1,
                              column: 62
                            },
                            end: {
                              line: 1,
                              column: 63
                            }
                          },
                          value: 4,
                          raw: '4'
                        },
                        kind: 'init'
                      }
                    ]
                  }
                }
              ],
              kind: 'var'
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`async function wrap() { ({a = await b} = obj) };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `async function wrap() { ({a = await b} = obj) };`,
      expected: {
        type: 'Program',
        start: 0,
        end: 48,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 48
          }
        },
        body: [
          {
            type: 'FunctionDeclaration',
            start: 0,
            end: 47,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 47
              }
            },
            id: {
              type: 'Identifier',
              start: 15,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 19
                }
              },
              name: 'wrap'
            },
            generator: false,
            expression: false,
            async: true,
            params: [],
            body: {
              type: 'BlockStatement',
              start: 22,
              end: 47,
              loc: {
                start: {
                  line: 1,
                  column: 22
                },
                end: {
                  line: 1,
                  column: 47
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
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
                  },
                  expression: {
                    type: 'AssignmentExpression',
                    start: 25,
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 25
                      },
                      end: {
                        line: 1,
                        column: 44
                      }
                    },
                    operator: '=',
                    left: {
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
                      properties: [
                        {
                          type: 'Property',
                          start: 26,
                          end: 37,
                          loc: {
                            start: {
                              line: 1,
                              column: 26
                            },
                            end: {
                              line: 1,
                              column: 37
                            }
                          },
                          method: false,
                          shorthand: true,
                          computed: false,
                          key: {
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
                          },
                          kind: 'init',
                          value: {
                            type: 'AssignmentPattern',
                            start: 26,
                            end: 37,
                            loc: {
                              start: {
                                line: 1,
                                column: 26
                              },
                              end: {
                                line: 1,
                                column: 37
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
                              name: 'a'
                            },
                            right: {
                              type: 'AwaitExpression',
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
                          }
                        }
                      ]
                    },
                    right: {
                      type: 'Identifier',
                      start: 41,
                      end: 44,
                      loc: {
                        start: {
                          line: 1,
                          column: 41
                        },
                        end: {
                          line: 1,
                          column: 44
                        }
                      },
                      name: 'obj'
                    }
                  }
                }
              ]
            }
          },
          {
            type: 'EmptyStatement',
            start: 47,
            end: 48,
            loc: {
              start: {
                line: 1,
                column: 47
              },
              end: {
                line: 1,
                column: 48
              }
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`async function wrap() { (a = await b) };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `async function wrap() { (a = await b) };`,
      expected: {
        type: 'Program',
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
        },
        body: [
          {
            type: 'FunctionDeclaration',
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
              start: 15,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 19
                }
              },
              name: 'wrap'
            },
            generator: false,
            expression: false,
            async: true,
            params: [],
            body: {
              type: 'BlockStatement',
              start: 22,
              end: 39,
              loc: {
                start: {
                  line: 1,
                  column: 22
                },
                end: {
                  line: 1,
                  column: 39
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
                  start: 24,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  },
                  expression: {
                    type: 'AssignmentExpression',
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
                    operator: '=',
                    left: {
                      type: 'Identifier',
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
                      name: 'a'
                    },
                    right: {
                      type: 'AwaitExpression',
                      start: 29,
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 29
                        },
                        end: {
                          line: 1,
                          column: 36
                        }
                      },
                      argument: {
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
                        name: 'b'
                      }
                    }
                  }
                }
              ]
            }
          },
          {
            type: 'EmptyStatement',
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
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`async function foo(a = {async bar() { await b }}) {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `async function foo(a = {async bar() { await b }}) {};`,
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
        body: [
          {
            type: 'FunctionDeclaration',
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
              start: 15,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 18
                }
              },
              name: 'foo'
            },
            generator: false,
            expression: false,
            async: true,
            params: [
              {
                type: 'AssignmentPattern',
                start: 19,
                end: 48,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 48
                  }
                },
                left: {
                  type: 'Identifier',
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
                  },
                  name: 'a'
                },
                right: {
                  type: 'ObjectExpression',
                  start: 23,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 48
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
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
                      method: true,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
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
                        name: 'bar'
                      },
                      kind: 'init',
                      value: {
                        type: 'FunctionExpression',
                        start: 33,
                        end: 47,
                        loc: {
                          start: {
                            line: 1,
                            column: 33
                          },
                          end: {
                            line: 1,
                            column: 47
                          }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: true,
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          start: 36,
                          end: 47,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 47
                            }
                          },
                          body: [
                            {
                              type: 'ExpressionStatement',
                              start: 38,
                              end: 45,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 38
                                },
                                end: {
                                  line: 1,
                                  column: 45
                                }
                              },
                              expression: {
                                type: 'AwaitExpression',
                                start: 38,
                                end: 45,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 38
                                  },
                                  end: {
                                    line: 1,
                                    column: 45
                                  }
                                },
                                argument: {
                                  type: 'Identifier',
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
                                  },
                                  name: 'b'
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

    pass(`({async foo(a) { await a }});`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `({async foo(a) { await a }});`,
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
        body: [
          {
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
              type: 'ObjectExpression',
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
              properties: [
                {
                  type: 'Property',
                  start: 2,
                  end: 26,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 26
                    }
                  },
                  method: true,
                  shorthand: false,
                  computed: false,
                  key: {
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
                    name: 'foo'
                  },
                  kind: 'init',
                  value: {
                    type: 'FunctionExpression',
                    start: 11,
                    end: 26,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 26
                      }
                    },
                    id: null,
                    generator: false,
                    expression: false,
                    async: true,
                    params: [
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
                        name: 'a'
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
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
                      body: [
                        {
                          type: 'ExpressionStatement',
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
                          expression: {
                            type: 'AwaitExpression',
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
                            argument: {
                              type: 'Identifier',
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
                              name: 'a'
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

    pass(`({async() { }});`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `({async() { }});`,
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
        body: [
          {
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
              type: 'ObjectExpression',
              start: 1,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 14
                }
              },
              properties: [
                {
                  type: 'Property',
                  start: 2,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 13
                    }
                  },
                  method: true,
                  shorthand: false,
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
                    name: 'async'
                  },
                  kind: 'init',
                  value: {
                    type: 'FunctionExpression',
                    start: 7,
                    end: 13,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
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
                    params: [],
                    body: {
                      type: 'BlockStatement',
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
                      body: []
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

    pass(`({async})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `({async})`,
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
        body: [
          {
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
              type: 'ObjectExpression',
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
              properties: [
                {
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
                    name: 'async'
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
                    name: 'async'
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`({async, foo})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `({async, foo})`,
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
        body: [
          {
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
              type: 'ObjectExpression',
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
              properties: [
                {
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
                    name: 'async'
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
                    name: 'async'
                  }
                },
                {
                  type: 'Property',
                  start: 9,
                  end: 12,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 12
                    }
                  },
                  method: false,
                  shorthand: true,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 9,
                    end: 12,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 12
                      }
                    },
                    name: 'foo'
                  },
                  kind: 'init',
                  value: {
                    type: 'Identifier',
                    start: 9,
                    end: 12,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 12
                      }
                    },
                    name: 'foo'
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`({async await() { }})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `({async await() { }})`,
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
          body: [
            {
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
                type: 'ObjectExpression',
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
                properties: [
                  {
                    type: 'Property',
                    start: 2,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 2
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    },
                    method: true,
                    shorthand: false,
                    computed: false,
                    key: {
                      type: 'Identifier',
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
                      },
                      name: 'await'
                    },
                    kind: 'init',
                    value: {
                      type: 'FunctionExpression',
                      start: 13,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 13
                        },
                        end: {
                          line: 1,
                          column: 19
                        }
                      },
                      id: null,
                      generator: false,
                      expression: false,
                      async: true,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        start: 16,
                        end: 19,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 19
                          }
                        },
                        body: []
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

    pass(`async ({a: b = c})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `async ({a: b = c})`,
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
          body: [
            {
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
                type: 'CallExpression',
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
                callee: {
                  type: 'Identifier',
                  start: 0,
                  end: 5,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 5
                    }
                  },
                  name: 'async'
                },
                arguments: [
                  {
                    type: 'ObjectExpression',
                    start: 7,
                    end: 17,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 17
                      }
                    },
                    properties: [
                      {
                        type: 'Property',
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
                        },
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
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
                          name: 'a'
                        },
                        value: {
                          type: 'AssignmentExpression',
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
                          operator: '=',
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
                            name: 'b'
                          },
                          right: {
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
                            name: 'c'
                          }
                        },
                        kind: 'init'
                      }
                    ]
                  }
                ]
              }
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`({async foo() { }})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `({async foo() { }})`,
        expected: {
          type: 'Program',
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
          body: [
            {
              type: 'ExpressionStatement',
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
              expression: {
                type: 'ObjectExpression',
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
                },
                properties: [
                  {
                    type: 'Property',
                    start: 2,
                    end: 17,
                    loc: {
                      start: {
                        line: 1,
                        column: 2
                      },
                      end: {
                        line: 1,
                        column: 17
                      }
                    },
                    method: true,
                    shorthand: false,
                    computed: false,
                    key: {
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
                      name: 'foo'
                    },
                    kind: 'init',
                    value: {
                      type: 'FunctionExpression',
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
                      id: null,
                      generator: false,
                      expression: false,
                      async: true,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        start: 14,
                        end: 17,
                        loc: {
                          start: {
                            line: 1,
                            column: 14
                          },
                          end: {
                            line: 1,
                            column: 17
                          }
                        },
                        body: []
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

    pass(`({async() { }})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `({async() { }})`,
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
          body: [
            {
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
                type: 'ObjectExpression',
                start: 1,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                },
                properties: [
                  {
                    type: 'Property',
                    start: 2,
                    end: 13,
                    loc: {
                      start: {
                        line: 1,
                        column: 2
                      },
                      end: {
                        line: 1,
                        column: 13
                      }
                    },
                    method: true,
                    shorthand: false,
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
                      name: 'async'
                    },
                    kind: 'init',
                    value: {
                      type: 'FunctionExpression',
                      start: 7,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 7
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
                      params: [],
                      body: {
                        type: 'BlockStatement',
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
                        body: []
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

    pass(`var o = {x: x, y: y}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `var o = {x: x, y: y}`,
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
          body: [
            {
              type: 'VariableDeclaration',
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
              declarations: [
                {
                  type: 'VariableDeclarator',
                  start: 4,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  },
                  id: {
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
                    name: 'o'
                  },
                  init: {
                    type: 'ObjectExpression',
                    start: 8,
                    end: 20,
                    loc: {
                      start: {
                        line: 1,
                        column: 8
                      },
                      end: {
                        line: 1,
                        column: 20
                      }
                    },
                    properties: [
                      {
                        type: 'Property',
                        start: 9,
                        end: 13,
                        loc: {
                          start: {
                            line: 1,
                            column: 9
                          },
                          end: {
                            line: 1,
                            column: 13
                          }
                        },
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
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
                          name: 'x'
                        },
                        kind: 'init'
                      },
                      {
                        type: 'Property',
                        start: 15,
                        end: 19,
                        loc: {
                          start: {
                            line: 1,
                            column: 15
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
                          name: 'y'
                        },
                        value: {
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
                          name: 'y'
                        },
                        kind: 'init'
                      }
                    ]
                  }
                }
              ],
              kind: 'var'
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`var o = {x, y}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `var o = {x, y}`,
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
          body: [
            {
              type: 'VariableDeclaration',
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
              declarations: [
                {
                  type: 'VariableDeclarator',
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
                  },
                  id: {
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
                    name: 'o'
                  },
                  init: {
                    type: 'ObjectExpression',
                    start: 8,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 8
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    },
                    properties: [
                      {
                        type: 'Property',
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
                        method: false,
                        shorthand: true,
                        computed: false,
                        key: {
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
                        kind: 'init',
                        value: {
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
                      },
                      {
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
                          name: 'y'
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
                          name: 'y'
                        }
                      }
                    ]
                  }
                }
              ],
              kind: 'var'
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`({x, y} = o)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `({x, y} = o)`,
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
          body: [
            {
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
                type: 'AssignmentExpression',
                start: 1,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                },
                operator: '=',
                left: {
                  type: 'ObjectPattern',
                  start: 1,
                  end: 7,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 7
                    }
                  },
                  properties: [
                    {
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
                        name: 'x'
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
                        name: 'x'
                      }
                    },
                    {
                      type: 'Property',
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
                      method: false,
                      shorthand: true,
                      computed: false,
                      key: {
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
                      },
                      kind: 'init',
                      value: {
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
                      }
                    }
                  ]
                },
                right: {
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
                  name: 'o'
                }
              }
            }
          ],
          sourceType: 'script'
        }
      });

    pass(`function* g() {
        obj = {
          get [yield]() { return 'get yield'; },
          set [yield](param) { yieldSet = param; }
        };
      }`, Context.OptionsRanges | Context.OptionsRaw, {
        source: `function* g() {
          obj = {
            get [yield]() { return 'get yield'; },
            set [yield](param) { yieldSet = param; }
          };
        }`,
        expected: {
          type: 'Program',
          sourceType: 'script',
          body: [
              {
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                      type: 'BlockStatement',
                      body: [
                          {
                              type: 'ExpressionStatement',
                              expression: {
                                  type: 'AssignmentExpression',
                                  left: {
                                      type: 'Identifier',
                                      name: 'obj',
                                      start: 26,
                                      end: 29
                                  },
                                  operator: '=',
                                  right: {
                                      type: 'ObjectExpression',
                                      properties: [
                                          {
                                              type: 'Property',
                                              key: {
                                                  type: 'YieldExpression',
                                                  argument: null,
                                                  delegate: false,
                                                  start: 51,
                                                  end: 56
                                              },
                                              value: {
                                                  type: 'FunctionExpression',
                                                  params: [],
                                                  body: {
                                                      type: 'BlockStatement',
                                                      body: [
                                                          {
                                                              type: 'ReturnStatement',
                                                              argument: {
                                                                  type: 'Literal',
                                                                  value: 'get yield',
                                                                  start: 69,
                                                                  end: 80,
                                                                  raw: '\'get yield\''
                                                              },
                                                              start: 62,
                                                              end: 81
                                                          }
                                                      ],
                                                      start: 60,
                                                      end: 83
                                                  },
                                                  async: false,
                                                  generator: false,
                                                  expression: false,
                                                  id: null,
                                                  start: 57,
                                                  end: 83
                                              },
                                              kind: 'get',
                                              computed: false,
                                              method: false,
                                              shorthand: false,
                                              start: 46,
                                              end: 83
                                          },
                                          {
                                              type: 'Property',
                                              key: {
                                                  type: 'YieldExpression',
                                                  argument: null,
                                                  delegate: false,
                                                  start: 102,
                                                  end: 107
                                              },
                                              value: {
                                                  type: 'FunctionExpression',
                                                  params: [
                                                      {
                                                          type: 'Identifier',
                                                          name: 'param',
                                                          start: 109,
                                                          end: 114
                                                      }
                                                  ],
                                                  body: {
                                                      type: 'BlockStatement',
                                                      body: [
                                                          {
                                                              type: 'ExpressionStatement',
                                                              expression: {
                                                                  type: 'AssignmentExpression',
                                                                  left: {
                                                                      type: 'Identifier',
                                                                      name: 'yieldSet',
                                                                      start: 118,
                                                                      end: 126
                                                                  },
                                                                  operator: '=',
                                                                  right: {
                                                                      type: 'Identifier',
                                                                      name: 'param',
                                                                      start: 129,
                                                                      end: 134
                                                                  },
                                                                  start: 118,
                                                                  end: 134
                                                              },
                                                              start: 118,
                                                              end: 135
                                                          }
                                                      ],
                                                      start: 116,
                                                      end: 137
                                                  },
                                                  async: false,
                                                  generator: false,
                                                  expression: false,
                                                  id: null,
                                                  start: 108,
                                                  end: 137
                                              },
                                              kind: 'set',
                                              computed: false,
                                              method: false,
                                              shorthand: false,
                                              start: 97,
                                              end: 137
                                          }
                                      ],
                                      start: 32,
                                      end: 149
                                  },
                                  start: 26,
                                  end: 149
                              },
                              start: 26,
                              end: 150
                          }
                      ],
                      start: 14,
                      end: 160
                  },
                  async: false,
                  generator: true,
                  expression: false,
                  id: {
                      type: 'Identifier',
                      name: 'g',
                      start: 10,
                      end: 11
                  },
                  start: 0,
                  end: 160
              }
          ],
          start: 0,
          end: 160
      }
      });

    pass(`var gen = {
        async *method() {
          return (function(arg) {
              var yield = arg + 1;
              return yield;
            }(yield))
        }
      }.method;`, Context.OptionsRanges | Context.OptionsRaw, {
        source: `var gen = {
          async *method() {
            return (function(arg) {
                var yield = arg + 1;
                return yield;
              }(yield))
          }
        }.method;`,
        expected: {
          type: 'Program',
          sourceType: 'script',
          body: [
              {
                  type: 'VariableDeclaration',
                  declarations: [
                      {
                          type: 'VariableDeclarator',
                          init: {
                              type: 'MemberExpression',
                              object: {
                                  type: 'ObjectExpression',
                                  properties: [
                                      {
                                          type: 'Property',
                                          key: {
                                              type: 'Identifier',
                                              name: 'method',
                                              start: 29,
                                              end: 35
                                          },
                                          value: {
                                              type: 'FunctionExpression',
                                              params: [],
                                              body: {
                                                  type: 'BlockStatement',
                                                  body: [
                                                      {
                                                          type: 'ReturnStatement',
                                                          argument: {
                                                              type: 'CallExpression',
                                                              callee: {
                                                                  type: 'FunctionExpression',
                                                                  params: [
                                                                      {
                                                                          type: 'Identifier',
                                                                          name: 'arg',
                                                                          start: 69,
                                                                          end: 72
                                                                      }
                                                                  ],
                                                                  body: {
                                                                      type: 'BlockStatement',
                                                                      body: [
                                                                          {
                                                                              type: 'VariableDeclaration',
                                                                              declarations: [
                                                                                  {
                                                                                      type: 'VariableDeclarator',
                                                                                      init: {
                                                                                          type: 'BinaryExpression',
                                                                                          left: {
                                                                                              type: 'Identifier',
                                                                                              name: 'arg',
                                                                                              start: 104,
                                                                                              end: 107
                                                                                          },
                                                                                          right: {
                                                                                              type: 'Literal',
                                                                                              value: 1,
                                                                                              start: 110,
                                                                                              end: 111,
                                                                                              raw: '1'
                                                                                          },
                                                                                          operator: '+',
                                                                                          start: 104,
                                                                                          end: 111
                                                                                      },
                                                                                      id: {
                                                                                          type: 'Identifier',
                                                                                          name: 'yield',
                                                                                          start: 96,
                                                                                          end: 101
                                                                                      },
                                                                                      start: 96,
                                                                                      end: 111
                                                                                  }
                                                                              ],
                                                                              kind: 'var',
                                                                              start: 92,
                                                                              end: 112
                                                                          },
                                                                          {
                                                                              type: 'ReturnStatement',
                                                                              argument: {
                                                                                  type: 'Identifier',
                                                                                  name: 'yield',
                                                                                  start: 136,
                                                                                  end: 141
                                                                              },
                                                                              start: 129,
                                                                              end: 142
                                                                          }
                                                                      ],
                                                                      start: 74,
                                                                      end: 158
                                                                  },
                                                                  async: false,
                                                                  generator: false,
                                                                  expression: false,
                                                                  id: null,
                                                                  start: 60,
                                                                  end: 158
                                                              },
                                                              arguments: [
                                                                  {
                                                                      type: 'YieldExpression',
                                                                      argument: null,
                                                                      delegate: false,
                                                                      start: 159,
                                                                      end: 164
                                                                  }
                                                              ],
                                                              start: 60,
                                                              end: 165
                                                          },
                                                          start: 52,
                                                          end: 166
                                                      }
                                                  ],
                                                  start: 38,
                                                  end: 178
                                              },
                                              async: true,
                                              generator: true,
                                              expression: false,
                                              id: null,
                                              start: 35,
                                              end: 178
                                          },
                                          kind: 'init',
                                          computed: false,
                                          method: true,
                                          shorthand: false,
                                          start: 22,
                                          end: 178
                                      }
                                  ],
                                  start: 10,
                                  end: 188
                              },
                              computed: false,
                              property: {
                                  type: 'Identifier',
                                  name: 'method',
                                  start: 189,
                                  end: 195
                              },
                              start: 10,
                              end: 195
                          },
                          id: {
                              type: 'Identifier',
                              name: 'gen',
                              start: 4,
                              end: 7
                          },
                          start: 4,
                          end: 195
                      }
                  ],
                  kind: 'var',
                  start: 0,
                  end: 196
              }
          ],
          start: 0,
          end: 196
      }
      });

    pass('var method = { method() {} }.method;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: 'var method = { method() {} }.method;',
        expected: {
          type: 'Program',
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
          body: [
            {
              type: 'VariableDeclaration',
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
              declarations: [
                {
                  type: 'VariableDeclarator',
                  start: 4,
                  end: 35,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 35
                    }
                  },
                  id: {
                    type: 'Identifier',
                    start: 4,
                    end: 10,
                    loc: {
                      start: {
                        line: 1,
                        column: 4
                      },
                      end: {
                        line: 1,
                        column: 10
                      }
                    },
                    name: 'method'
                  },
                  init: {
                    type: 'MemberExpression',
                    start: 13,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    },
                    object: {
                      type: 'ObjectExpression',
                      start: 13,
                      end: 28,
                      loc: {
                        start: {
                          line: 1,
                          column: 13
                        },
                        end: {
                          line: 1,
                          column: 28
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
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
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
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
                            },
                            name: 'method'
                          },
                          kind: 'init',
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
                        }
                      ]
                    },
                    property: {
                      type: 'Identifier',
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
                      },
                      name: 'method'
                    },
                    computed: false
                  }
                }
              ],
              kind: 'var'
            }
          ],
          sourceType: 'script'
        }
      });

    pass('({ *foo() {} })', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({ *foo() {} })',
          expected: {
              type: 'Program',
              sourceType: 'script',
              body: [{
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'ObjectExpression',
                      properties: [{
                          type: 'Property',
                          key: {
                              type: 'Identifier',
                              name: 'foo',
                              start: 4,
                              end: 7,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 4
                                  },
                                  end: {
                                      line: 1,
                                      column: 7
                                  }
                              }
                          },
                          value: {
                              type: 'FunctionExpression',
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  body: [],
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
                                  }
                              },
                              async: false,
                              generator: true,
                              expression: false,
                              id: null,
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
                          kind: 'init',
                          computed: false,
                          method: true,
                          shorthand: false,
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
                      start: 1,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
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

    pass('({ async *foo() {} })', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({ async *foo() {} })',
          expected: {
              type: 'Program',
              sourceType: 'script',
              body: [{
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'ObjectExpression',
                      properties: [{
                          type: 'Property',
                          key: {
                              type: 'Identifier',
                              name: 'foo',
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
                              }
                          },
                          value: {
                              type: 'FunctionExpression',
                              params: [],
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
                              async: true,
                              generator: true,
                              expression: false,
                              id: null,
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
                              }
                          },
                          kind: 'init',
                          computed: false,
                          method: true,
                          shorthand: false,
                          start: 3,
                          end: 18,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 3
                              },
                              end: {
                                  line: 1,
                                  column: 18
                              }
                          }
                      }],
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
                      }
                  },
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
                  }
              }],
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
              }
          }
      });

    pass('({ async foo() {} })', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({ async foo() {} })',
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 19,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 19
                          }
                      },
                      properties: [{
                          type: 'Property',
                          start: 3,
                          end: 17,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 3
                              },
                              end: {
                                  line: 1,
                                  column: 17
                              }
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
                              start: 9,
                              end: 12,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 12
                                  }
                              },
                              name: 'foo'
                          },
                          kind: 'init',
                          value: {
                              type: 'FunctionExpression',
                              start: 12,
                              end: 17,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 17
                                  }
                              },
                              id: null,
                              generator: false,
                              expression: false,
                              async: true,
                              params: [],
                              body: {
                                  type: 'BlockStatement',
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

    pass('({ get undef() {} })', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({ get undef() {} })',
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 19,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 19
                          }
                      },
                      properties: [{
                          type: 'Property',
                          start: 3,
                          end: 17,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 3
                              },
                              end: {
                                  line: 1,
                                  column: 17
                              }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
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
                              name: 'undef'
                          },
                          kind: 'get',
                          value: {
                              type: 'FunctionExpression',
                              start: 12,
                              end: 17,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 17
                                  }
                              },
                              id: null,
                              generator: false,
                              expression: false,
                              async: false,
                              params: [],
                              body: {
                                  type: 'BlockStatement',
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

    pass('({ get if() {} })', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({ get if() {} })',
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      },
                      properties: [{
                          type: 'Property',
                          start: 3,
                          end: 14,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 3
                              },
                              end: {
                                  line: 1,
                                  column: 14
                              }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
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
                              name: 'if'
                          },
                          kind: 'get',
                          value: {
                              type: 'FunctionExpression',
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
                              },
                              id: null,
                              generator: false,
                              expression: false,
                              async: false,
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  start: 12,
                                  end: 14,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 12
                                      },
                                      end: {
                                          line: 1,
                                          column: 14
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

    pass('({ get 10() {} })', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({ get 10() {} })',
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      },
                      properties: [{
                          type: 'Property',
                          start: 3,
                          end: 14,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 3
                              },
                              end: {
                                  line: 1,
                                  column: 14
                              }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Literal',
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
                              value: 10,
                              raw: '10'
                          },
                          kind: 'get',
                          value: {
                              type: 'FunctionExpression',
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
                              },
                              id: null,
                              generator: false,
                              expression: false,
                              async: false,
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  start: 12,
                                  end: 14,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 12
                                      },
                                      end: {
                                          line: 1,
                                          column: 14
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

    pass('({ set width(w) { w } })', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({ set width(w) { w } })',
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
                      type: 'ObjectExpression',
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
                      properties: [{
                          type: 'Property',
                          start: 3,
                          end: 21,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 3
                              },
                              end: {
                                  line: 1,
                                  column: 21
                              }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
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
                              name: 'width'
                          },
                          kind: 'set',
                          value: {
                              type: 'FunctionExpression',
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
                                  name: 'w'
                              }],
                              body: {
                                  type: 'BlockStatement',
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
                                  body: [{
                                      type: 'ExpressionStatement',
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
                                      expression: {
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
                                          name: 'w'
                                      }
                                  }]
                              }
                          }
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('({ get: 2 })', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({ get: 2 })',
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      properties: [{
                          type: 'Property',
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
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
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
                              },
                              name: 'get'
                          },
                          value: {
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
                              value: 2,
                              raw: '2'
                          },
                          kind: 'init'
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('({ set: 2 })', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({ set: 2 })',
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      properties: [{
                          type: 'Property',
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
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
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
                              },
                              name: 'set'
                          },
                          value: {
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
                              value: 2,
                              raw: '2'
                          },
                          kind: 'init'
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('({ __proto__: 2 })', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({ __proto__: 2 })',
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
                      type: 'ObjectExpression',
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
                      },
                      properties: [{
                          type: 'Property',
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
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
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
                              },
                              name: '__proto__'
                          },
                          value: {
                              type: 'Literal',
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
                              value: 2,
                              raw: '2'
                          },
                          kind: 'init'
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('({ get width() {  }, set width(width) { } })', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({ get width() {  }, set width(width) { } })',
          expected: {
              type: 'Program',
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
              body: [{
                  type: 'ExpressionStatement',
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
                  expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 43,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 43
                          }
                      },
                      properties: [{
                              type: 'Property',
                              start: 3,
                              end: 19,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 3
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
                                  type: 'Identifier',
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
                                  name: 'width'
                              },
                              kind: 'get',
                              value: {
                                  type: 'FunctionExpression',
                                  start: 12,
                                  end: 19,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 12
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
                                  params: [],
                                  body: {
                                      type: 'BlockStatement',
                                      start: 15,
                                      end: 19,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 15
                                          },
                                          end: {
                                              line: 1,
                                              column: 19
                                          }
                                      },
                                      body: []
                                  }
                              }
                          },
                          {
                              type: 'Property',
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
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
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
                                  name: 'width'
                              },
                              kind: 'set',
                              value: {
                                  type: 'FunctionExpression',
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
                                  id: null,
                                  generator: false,
                                  expression: false,
                                  async: false,
                                  params: [{
                                      type: 'Identifier',
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
                                      },
                                      name: 'width'
                                  }],
                                  body: {
                                      type: 'BlockStatement',
                                      start: 38,
                                      end: 41,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 38
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
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('({a:0, get "b"(){}, set 3(d){}})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({a:0, get \'b\'(){}, set 3(d){}})',
          expected: {
              type: 'Program',
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
              },
              body: [{
                  type: 'ExpressionStatement',
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
                  },
                  expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 31,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 31
                          }
                      },
                      properties: [{
                              type: 'Property',
                              start: 2,
                              end: 5,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 5
                                  }
                              },
                              method: false,
                              shorthand: false,
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
                              value: {
                                  type: 'Literal',
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
                                  value: 0,
                                  raw: '0'
                              },
                              kind: 'init'
                          },
                          {
                              type: 'Property',
                              start: 7,
                              end: 18,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 7
                                  },
                                  end: {
                                      line: 1,
                                      column: 18
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Literal',
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
                                  value: 'b',
                                  raw: '\'b\''
                              },
                              kind: 'get',
                              value: {
                                  type: 'FunctionExpression',
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
                                  id: null,
                                  generator: false,
                                  expression: false,
                                  async: false,
                                  params: [],
                                  body: {
                                      type: 'BlockStatement',
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
                                      },
                                      body: []
                                  }
                              }
                          },
                          {
                              type: 'Property',
                              start: 20,
                              end: 30,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 20
                                  },
                                  end: {
                                      line: 1,
                                      column: 30
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Literal',
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
                                  value: 3,
                                  raw: '3'
                              },
                              kind: 'set',
                              value: {
                                  type: 'FunctionExpression',
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
                                  id: null,
                                  generator: false,
                                  expression: false,
                                  async: false,
                                  params: [{
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
                                      name: 'd'
                                  }],
                                  body: {
                                      type: 'BlockStatement',
                                      start: 28,
                                      end: 30,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 28
                                          },
                                          end: {
                                              line: 1,
                                              column: 30
                                          }
                                      },
                                      body: []
                                  }
                              }
                          }
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('({ enum: 0 })', Context.Empty, {
          source: '({ enum: 0 })',
          expected: {
              type: 'Program',
              sourceType: 'script',
              body: [{
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'ObjectExpression',
                      properties: [{
                          type: 'Property',
                          key: {
                              type: 'Identifier',
                              name: 'enum'
                          },
                          value: {
                              type: 'Literal',
                              value: 0
                          },
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: false
                      }]
                  }
              }]
          }
      });

    pass('({ async: 0 })', Context.Empty, {
          source: '({ async: 0 })',
          expected: {
              type: 'Program',
              sourceType: 'script',
              body: [{
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'ObjectExpression',
                      properties: [{
                          type: 'Property',
                          key: {
                              type: 'Identifier',
                              name: 'async'
                          },
                          value: {
                              type: 'Literal',
                              value: 0
                          },
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: false
                      }]
                  }
              }]
          }
      });

    pass('({a, b: 0, c})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({a, b: 0, c})',
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
                      type: 'ObjectExpression',
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
                          },
                          {
                              type: 'Property',
                              start: 5,
                              end: 9,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 5
                                  },
                                  end: {
                                      line: 1,
                                      column: 9
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
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
                              },
                              value: {
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
                              },
                              kind: 'init'
                          },
                          {
                              type: 'Property',
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
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
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
                                  name: 'c'
                              },
                              kind: 'init',
                              value: {
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
                                  name: 'c'
                              }
                          }
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('({yield})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({yield})',
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
                      type: 'ObjectExpression',
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
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('({a, b})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({a, b})',
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 7
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
                          },
                          {
                              type: 'Property',
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
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
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
                              },
                              kind: 'init',
                              value: {
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
                          }
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('({a(){}})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({a(){}})',
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
                      type: 'ObjectExpression',
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
                          method: true,
                          shorthand: false,
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
                              type: 'FunctionExpression',
                              start: 3,
                              end: 7,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 3
                                  },
                                  end: {
                                      line: 1,
                                      column: 7
                                  }
                              },
                              id: null,
                              generator: false,
                              expression: false,
                              async: false,
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  start: 5,
                                  end: 7,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 5
                                      },
                                      end: {
                                          line: 1,
                                          column: 7
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

    pass('({a(b){}})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({a(b){}})',
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
                      type: 'ObjectExpression',
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
                          method: true,
                          shorthand: false,
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
                              type: 'FunctionExpression',
                              start: 3,
                              end: 8,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 3
                                  },
                                  end: {
                                      line: 1,
                                      column: 8
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
                                  body: []
                              }
                          }
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('({a(b,...c){}})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({a(b,...c){}})',
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      },
                      properties: [{
                          type: 'Property',
                          start: 2,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 2
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          method: true,
                          shorthand: false,
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
                              type: 'FunctionExpression',
                              start: 3,
                              end: 13,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 3
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
                                  {
                                      type: 'RestElement',
                                      start: 6,
                                      end: 10,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 6
                                          },
                                          end: {
                                              line: 1,
                                              column: 10
                                          }
                                      },
                                      argument: {
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
                                          name: 'c'
                                      }
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
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('({a(b,c){}})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({a(b,c){}})',
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      properties: [{
                          type: 'Property',
                          start: 2,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 2
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          },
                          method: true,
                          shorthand: false,
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
                              type: 'FunctionExpression',
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
                                  },
                                  {
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
                                      name: 'c'
                                  }
                              ],
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
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('({set a(eval){}})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({set a(eval){}})',
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      },
                      properties: [{
                          type: 'Property',
                          start: 2,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 2
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
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
                              name: 'a'
                          },
                          kind: 'set',
                          value: {
                              type: 'FunctionExpression',
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
                              },
                              id: null,
                              generator: false,
                              expression: false,
                              async: false,
                              params: [{
                                  type: 'Identifier',
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
                                  name: 'eval'
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
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

    pass('({ set a([{b = 0}]){}, })', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: '({ set a([{b = 0}]){}, })',
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
                      type: 'ObjectExpression',
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
                      },
                      properties: [{
                          type: 'Property',
                          start: 3,
                          end: 21,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 3
                              },
                              end: {
                                  line: 1,
                                  column: 21
                              }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
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
                          kind: 'set',
                          value: {
                              type: 'FunctionExpression',
                              start: 8,
                              end: 21,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 8
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
                                  type: 'ArrayPattern',
                                  start: 9,
                                  end: 18,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 9
                                      },
                                      end: {
                                          line: 1,
                                          column: 18
                                      }
                                  },
                                  elements: [{
                                      type: 'ObjectPattern',
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
                                      properties: [{
                                          type: 'Property',
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
                                          method: false,
                                          shorthand: true,
                                          computed: false,
                                          key: {
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
                                              name: 'b'
                                          },
                                          kind: 'init',
                                          value: {
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
                                                  name: 'b'
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
                                                  value: 0,
                                                  raw: '0'
                                              }
                                          }
                                      }]
                                  }]
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
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });
  });
});
