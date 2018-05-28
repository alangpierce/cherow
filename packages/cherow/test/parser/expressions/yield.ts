
import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Yield', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

  describe('Failures', () => {

      const StrictErrors = [
          'var yield;',
          'var foo, yield;',
          'try { } catch (yield) { }',
          'function yield() { }',
          '(function yield() { })',
          'function foo(yield) { }',
          'function foo(bar, yield) { }',
          'function * yield() { }',
          '(function * yield() { })',
          'yield = 1;',
          'var foo = yield = 1;',
          '++yield;',
          'yield++;',
          'yield: 34;',
      ];

      for (const arg of StrictErrors) {
          it(`"use strict"; ${arg}`, () => {
              t.throws(() => {
                  parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
              });
          });

          it(`"use strict"; function foo() { ${arg}}`, () => {
              t.throws(() => {
                  parseSource(`"use strict"; function foo() { ${arg}}`, undefined, Context.Empty);
              });
          });

          it(`function foo() { "use strict"; ${arg} }`, () => {
              t.throws(() => {
                  parseSource(`function foo() { "use strict"; ${arg} }`, undefined, Context.Empty);
              });
          });

          it(`"use strict"; (function foo() {${arg}})`, () => {
              t.throws(() => {
                  parseSource(`"use strict"; (function foo() {${arg}})`, undefined, Context.Empty);
              });
          });

          it(`"use strict"; (function * gen() { function foo() { ${arg}} }`, () => {
              t.throws(() => {
                  parseSource(`"use strict"; (function * gen() { function foo() { ${arg}} }`, undefined, Context.Empty);
              });
          });

          it(`"use strict"; (function * gen() { (function foo() { ${arg}}) })`, () => {
              t.throws(() => {
                  parseSource(`"use strict"; (function * gen() { (function foo() { ${arg}}) })`, undefined, Context.Empty);
              });
          });
      }

      const invalidSyntax = [
          'var obj = { *g(yield) {} };',
          'function *a(){yield\n*a}',
          'var obj = { *g(yield) {} };',
          'function *g() { try {} catch (yield) {} }',
          '(function *(x, ...yield){})',
          'function *g(a, b, c, ...yield){}',
          '"use strict"; (yield) => 42',
          `var obj = { *g(yield) {} };`,
          'class C { gm*() { } }',
          // yield expressions cannot appear higher than assignment level precedence
          'function* gf() { 1 + yield; }',
          'function* gf() { 1 + yield 2; }',
          'function* gf() { 1 + yield* \'foo\'; }',
          'function* gf() { +yield; }',
          'function* gf() { +yield 2; }',
          'function* gf() { yield++; }',
          'function* gf() { (yield) = 10; }',
          'function* gf() { (yield)++; }',
          'function *gf(){ function yield(){}; }',
          'function *gf(){ var yield; }',
          'function *gf(yield){}',
          'function *gf() { let yield; }',
          'function* gf() { const yield = 10; }',
          'function* gf() { function yield() { } }',
          'function* gf() { function* yield() { } }',
          'function *gf() { (a = (yield) => {}) => {}; }',
          // yield binding is disallowed in object destructuring in generators
          'function *gf({yield}){}',
          'function*g([yield]){}',
          'function*g({a: yield}){}',
          'function*g(yield = 0){}',
          // 'yield' is a keyword and disallowed within arrow function parameter syntax
          'function* gf() { var a = (x, y = yield* 0, z = 0) => { }; }',
          'function* gf() { var a = (x, y = yield 0, z = 0) => { }; }',
          'function* gf() { var a = (x, y = yield, z = 0) => { }; }',
          'function* gf() { var a = (x = yield) => { }; }',
          'function* gf() { var a = (x, yield, y) => { }; }',
          'function* gf() { var a = (x, y, yield) => { }; }',
          'function* gf() { var a = yield => { }; }',
          'function* gf() { var a = (yield) => { }; }',
          'function* gf() { var a = (x, y, yield) => { }; }',
          'function* gf() { var a = (x = yield 0) => { }; }',
          'function* gf() { var gfe = function* yield() { } }',
          'function* gf() { class yield { } }',
          'function* a(a=yield){}',
          `"use strict"; function not_gen() { (function yield() { }) }`,
          '"use strict"; function not_gen() { function foo(bar, yield) { } }',
          '"use strict"; function not_gen() { try { } catch (yield) { } }',
          '"use strict"; function not_gen() { function yield() { } }',
          '"use strict"; var [yield] = [42];',
          '"use strict"; function not_gen() { function yield() { } }',
          'function test_func() { "use strict"; function * yield() { } }',
          'function test_func() { "use strict"; function * yield() { } }',
          '"use strict"; function * gen() { function not_gen() { function foo(yield) { } }',
          '"use strict"; function * gen() { function not_gen() {  yield = 1;}',
          '"use strict"; function * gen() { function not_gen() { try { } catch (yield) { } }',
          'function *a(){yield*}',
          '(a = yield 3) {}',
          '(a=yield) {}',
          '(yield 3) {}',
          '(a = yield) {}',
          '(yield = 1) {}',
          '(yield) {}',
          // "It is a SyntaxError if formal parameters' default argument expressions contain a yield expression"
          'function *gf(b, a = 1 + yield) {}',
          'function *gf(b, yield) {}',
          'function *gf(a = (10, yield, 20)) {}',
          'gf = function* (b, a = yield) {}',
          'gf = function* (b, yield) {}',
          'var obj = { *gf(b, a = yield) {} }',
          'var obj = { *gf(b, yield) {} }'
      ];

      for (const arg of invalidSyntax) {
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

      const yieldInParameters = [
          `(a = yield) => {}`,
          `(a = yield /a/g) => {}`, // Should parse as division, not yield expression with regexp.
          `yield => {};`,
          `(yield) => {};`,
          `(yield = 0) => {};`,
          `([yield]) => {};`,
          `([yield = 0]) => {};`,
          `([...yield]) => {};`,
          `({a: yield}) => {};`,
          `({yield}) => {};`,
          `({yield = 0}) => {};`,
      ];

      const yieldInBody = [
          `() => { var x = yield; }`,
          `() => { var x = yield /a/g; }`,

          `() => { var yield; };`,
          `() => { var yield = 0; };`,
          `() => { var [yield] = []; };`,
          `() => { var [yield = 0] = []; };`,
          `() => { var [...yield] = []; };`,
          `() => { var {a: yield} = {}; };`,
          `() => { var {yield} = {}; };`,
          `() => { var {yield = 0} = {}; };`,

          `() => { let yield; };`,
          `() => { let yield = 0; };`,
          `() => { let [yield] = []; };`,
          `() => { let [yield = 0] = []; };`,
          `() => { let [...yield] = []; };`,
          `() => { let {a: yield} = {}; };`,
          `() => { let {yield} = {}; };`,
          `() => { let {yield = 0} = {}; };`,

          `() => { const yield = 0; };`,
          `() => { const [yield] = []; };`,
          `() => { const [yield = 0] = []; };`,
          `() => { const [...yield] = []; };`,
          `() => { const {a: yield} = {}; };`,
          `() => { const {yield} = {}; };`,
          `() => { const {yield = 0} = {}; };`,
      ];

      for (const test of [...yieldInParameters, ...yieldInBody]) {

          // Script context.
          it(`"use strict"; ${test}`, () => {
              t.throws(() => {
                  parseSource(`"use strict"; ${test}`, undefined, Context.Empty);
              });
          });

          // Function context.
          it(`"use strict"; function f() { ${test} }`, () => {
              t.throws(() => {
                  parseSource(`"use strict"; function f() { ${test} }`, undefined, Context.Empty);
              });
          });

          // Generator
          it(`"use strict"; function* g() { ${test} }`, () => {
              t.throws(() => {
                  parseSource(`"use strict"; function* g() { ${test} }`, undefined, Context.Empty);
              });
          });
      }

      // Generator context.
      for (const test of yieldInParameters) {
          it(`function* g() { ${test} }`, () => {
              t.throws(() => {
                  parseSource(`function* g() { ${test} }`, undefined, Context.Empty);
              });
          });
      }

      for (const arg of ['(function * yield() { })']) {
          it(`function not_gen() { ${arg}}`, () => {
              t.throws(() => {
                  parseSource(`function a() { ${arg}}`, undefined, Context.Empty);
              });
          });
      }

      fail('yield => { \'use strict\'; 0 }', Context.Empty, {
          source: 'yield => { \'use strict\'; 0 }',
      });

      fail('(yield) => { \'use strict\'; 0 }', Context.Empty, {
          source: '(yield) => { \'use strict\'; 0 }',
      });

      fail('(bar, yield) => { \'use strict\'; 0 }', Context.Empty, {
          source: '(bar, yield) => { \'use strict\'; 0 }',
      });

      fail('function yield() { "use strict"; } ', Context.Empty, {
        source: 'function yield() { "use strict"; }',
      });

      fail('function* g() { for (yield "" in {}; ; ) ; }', Context.Empty, {
        source: 'function* g() { for (yield "" in {}; ; ) ; }',
      });

      fail(`"use strict";
      function yield() {} `, Context.Empty, {
        source: `"use strict";
        function yield() {} `,
      });

      fail('function* g() { yield = 1; }', Context.Empty, {
          source: 'function* g() { yield = 1; }',
      });

      fail('function* fn() { (x = yield) => {}; } ', Context.Empty, {
        source: 'function* fn() { (x = yield) => {}; } ',
      });

      fail('function* fn(x = yield* yield) {} ', Context.Empty, {
        source: 'function* fn(x = yield* yield) {}',
      });

      // Doesn't fail in the Esprima parser
      fail('function* fn() { (x = 3 + a.b(yield) ** 2) => {}; } ', Context.Empty, {
        source: 'function* fn() { (x = 3 + a.b(yield) ** 2) => {}; } ',
      });

      fail('function* fn() { (x = yield fn) => {}; }', Context.Empty, {
        source: 'function* fn() { (x = yield fn) => {}; }',
      });

      fail('function* fn() { (a, b = 3, x = yield) => {}; } ', Context.Empty, {
        source: 'function* fn() { (a, b = 3, x = yield) => {}; } ',
      });

      fail('function* fn() {  (x = (yield) => {}) => {}; } ', Context.Empty, {
        source: 'function* fn() {  (x = (yield) => {}) => {}; } ',
      });

      fail('function *a(){yield\n*a}', Context.Empty, {
          source: 'function *a(){yield\n*a}',
      });

      fail('function *a(){yield*}', Context.Empty, {
          source: 'function *a(){yield*}',
      });

      fail('"use strict"; +yield;', Context.Empty, {
          source: '"use strict"; +yield;',
      });

      fail('function *icefapper() { (a, b, yield) => {}; }', Context.Empty, {
        source: 'function *icefapper() { (a, b, yield) => {}; }',
      });

      fail('function *icefapper() { yield => {}; }', Context.Empty, {
        source: 'function *icefapper() { yield => {}; }',
      });

      fail('function *icefapper() {  (yield fn) => {}; }', Context.Empty, {
        source: 'function *icefapper() {  (yield fn) => {}; }',
      });

      fail('"use strict"; var [yield] = 0;', Context.Empty, {
          source: '"use strict"; var [yield] = 0;',
      });

      fail('"use strict"; yield:0;', Context.Empty, {
          source: '"use strict"; yield:0;',
      });

      fail('"use strict"; function a(a=yield){}}', Context.Empty, {
          source: '"use strict"; function a(a=yield){}}',
      });

      fail('"use strict"; function a(yield){}}', Context.Empty, {
          source: '"use strict"; function a(yield){}}',
      });

      fail('"use strict"; function a([yield]){}', Context.Empty, {
          source: '"use strict"; function a([yield]){}',
      });

      // Esprima issue: https://github.com/jquery/esprima/issues/1904
      fail('function *a() { ({b = yield}) => {} }', Context.Empty, {
       source: 'function *a() { ({b = yield}) => {} }',
      });

      // https://github.com/jquery/esprima/issues/1634

      fail('function *g() { (x = yield) => {} }', Context.Empty, {
        source: 'function *g() { (x = yield) => {} }',
       });

      fail('function *g() { ({x = yield}) => {} }', Context.Empty, {
        source: 'function *g() { ({x = yield}) => {} }',
       });

      fail('"use strict"; function a({yield}){}', Context.Empty, {
          source: '"use strict"; function a({yield}){}',
      });

      fail('"use strict"; function a({yield=0}){}', Context.Empty, {
          source: '"use strict"; function a({yield=0}){}',
      });

      fail('"use strict"; function a({a:yield}){}', Context.Empty, {
          source: '"use strict"; function a({a:yield}){}',
      });

      fail('"use strict"; function a([yield,...a]){}', Context.Empty, {
          source: '"use strict"; function a([yield,...a]){}',
      });

      fail('function* g(){ (a = yield) => 0; }', Context.Empty, {
          source: 'function* g(){ (a = yield) => 0; }',
      });

      fail('function* g(){ (a = yield b) => 0; }', Context.Empty, {
          source: 'function* g(){ (a = yield b) => 0; }',
      });

      fail('function* g(){ !function*(a = yield){} }', Context.Empty, {
          source: 'function* g(){ !function*(a = yield){} }',
      });

      fail('function* g(){ !function*(a = x + f(yield)){} }', Context.Empty, {
        source: 'function* g(){ !function*(a = x + f(yield)){} }',
      });

      fail('function* g(){ !function*({a = yield}){} }', Context.Empty, {
          source: 'function* g(){ !function*({a = yield}){} }',
      });
  });

  describe('Pass', () => {

      // v8
      const allModes = [
          'var yield;',
          'var foo, yield;',
          'try { } catch (yield) { }',
          'function yield() { }',
          '(function yield() { })',
          'function foo(yield) { }',
          'function foo(bar, yield) { }',
          'class C { *gf() { switch (1) { case yield: break; } } }',
          'yield = 1;',
          'var foo = yield = 1;',
          'yield * 2;',
          '++yield;',
          'yield++;',
          'yield: 34',
          'function yield(yield) { yield: yield (yield + yield(0)); }',
          '({ yield: 1 })',
          '({ get yield() { 1 } })',
          'yield(100)',
          'yield[100]',
      ];

      for (const arg of allModes) {

          it(`function foo() {${arg}}`, () => {
              t.doesNotThrow(() => {
                  parseSource(`function foo() {${arg}}`, undefined, Context.Empty);
              });
          });

          it(`(function foo() {${arg}})`, () => {
              t.doesNotThrow(() => {
                  parseSource(`(function foo() {${arg}})`, undefined, Context.Empty);
              });
          });

          it(`(() => {${arg}})`, () => {
              t.doesNotThrow(() => {
                  parseSource(`(() => {${arg}})`, undefined, Context.Empty);
              });
          });

          it(`(async () => {${arg}})`, () => {
              t.doesNotThrow(() => {
                  parseSource(`(async () => {${arg}})`, undefined, Context.Empty);
              });
          });
      }

      const withGeneratorsEnabled = [
          'var yield;',
          'var foo, yield;',
          'try { } catch (yield) { }',
          'function yield() { }',
          '(function yield() { })',
          'function foo(yield) { }',
          'function foo(bar, yield) { }',
          'function* gf() { yield "foo"; }',
          'function* gf() { yield \'foo\' }',
          'function* gf() { var a = yield \'foo\'; }',
          'function* gf() { foo(yield \'foo\'); }',
          'function* gf() { yield \'foo\', 10; }',
          'class C { *gf() { switch (1) { case yield \'foo\': break; } } }',
          'function* gf() { yield* \'foo\'; }',
          'function* gf() { foo[yield* \'foo\']; }',
          'function* gf() { yield* \'foo\', 10; }',
          'function* gf() { switch (1) { case yield* \'foo\': break; } }',
          'var gfe = function* rgfe() { switch (1) { case yield* \'foo\': break; } }',
          'var o = { *gf() { yield* \'foo\'; } }',
          'class C { *gf() { switch (1) { case yield* \'foo\': break; } } }',
          'function* gf() { switch (1) { case yield: break; } }',
          'function* gf() { var a = yield; }',
          'function* gf() { foo[yield]; }',
          'function* gf() { yield, 10; }',
          'function *f(){ () => yield; }',
          'var o = { *gf() { switch (1) { case yield: break; } } }',
          'function * yield() { }',
          'function yield() {}',
          '(function yield() {});',
          'yield = 1;',
          'var foo = yield = 1;',
          'yield * 2;',
          '++yield;',
          'yield++;',
          'yield: 34',
          'function yield(yield) { yield: yield (yield + yield(0)); }',
          '({ yield: 1 })',
          '({ get yield() { 1 } })',
          'yield(100)',
          'yield[100]',
          `function* f() {
      let result;
      while (1) {
          result = yield result;
      }
  }`,
          `function* g() {
      yield arguments[0];
      yield arguments[1];
      yield arguments[2];
      yield arguments[3];
    }`,

          '(function * gen() { (function not_gen() { try { } catch (yield) { } }) })',
          'function *a(){yield 0}',
          'function * gen() { yield a; }',
          'function * gen() { yield * \n a; }',
          'function * gen() { yield yield a; }',
          'function * gen() { (yield * a) + (yield * b);; }',
          'function * gen() { yield * a; return }',
          'function * gen() { yield, yield }',
          'function * gen() { (yield) ? yield : yield }',
          'function * gen() { yield /* comment */ }',
          'function * gen() { (yield) \n ? yield : yield }',
          'x = class extends (a) {}',
          'function * gen() { (yield) }',
          'function *a(){yield null}',
          'function *a(){yield+0}',
          'function *a(){yield "a"}',
          'function *a(){yield delete 0}',
          'function *a(){yield typeof 0}',
          'function *a(){yield 2e308}',
          'function*a(){yield*a}',
          'function a(){yield*a}',
          'function *a(){({get b(){yield}})}',
          'function a(){({*[yield](){}})}',
          'function *a(){({*[yield](){}})}',
          'function *a(){({set b(yield){}})}',
          'function *a(){yield delete 0}',
          'function *a(){yield ++a;}',
          'function * gen() { yield * 2; }',
          'function * gen() { (yield * 3) + (yield * 4); }',
          'function * gen() { ({ yield: 1 }) }',
          '(function * () { x = class extends (yield) {} });',
          '(function * () { x = class extends (a ? null : yield) { } });',
          '(function * () { yield * 1; return 37; yield * "icefapper"; });',
          '(function * () { ({ [yield]: x } = { }) });',
          'function* g(){ x ? yield : y }',
           // YieldExpression is legal in class expression heritage
          'function* g(){(class extends (yield) {});}',
           // YieldExpression is legal in class expression body
          'function* a(){(class {[yield](){}})};',
          'function *g() { yield ~x }',
          'function *g() { yield class x {} }',
          'function *g() { yield --x }',
          'function *g() { yield !x }',
          'function *g() { yield void x }',

          '"use strict"; ({ yield() {} })',
          'function *g() { yield yield }',
          'function* g() {  yield* [1, 2, 3]; }',
          'function* g() { exprValue = yield * {}; }',
          'function* g() { yield* "abc"; }',
          `function* g() {
      try {
        yield * {};
      } catch (err) {
        caught = err;
      }
    }`,
          `function* g1() { (yield 1) }`,
          `function* g2() { [yield 1] }`,
          `function* g3() { {yield 1} }`,
          `function* g4() { yield 1, yield 2; }`,
          `function* g5() { (yield 1) ? yield 2 : yield 3; }`,
          `function* g(a, b, c, d) {
      arguments[0] = 32;
      arguments[1] = 54;
      arguments[2] = 333;
      yield a;
      yield b;
      yield c;
      yield d;
    }`,
    ,
          'function* gf() { var fe = function yield() { } }',
          'function* gf() { var o = { yield: 10 } }',
          'function* gf() { var o = { *yield() { } } }',
          'function* gf() { class C { *yield() { } } }',
    // 'yield' can be used as a BindingIdentifier for declarations in non-strict, non-generator bodies
    'function f() { var yield; }',
    'function f() { let yield; }',
    'function f() { const yield = 10; }',
    'function f() { function* yield() { } }',
    'function f() { var o = { *yield() { } } }',
    'function f() { var yield = 10; var o = { yield }; }',
    'function f() { class C { yield() { } } }',
    'function f() { class C { *yield() { } } }'
      ];

      for (const arg of withGeneratorsEnabled) {

          it(`function foo() { ${arg}}`, () => {
              t.doesNotThrow(() => {
                  parseSource(`function not_gen() { ${arg}}`, undefined, Context.Empty);
              });
          });

          it(`function * gen() { function not_gen() { ${arg} }}`, () => {
              t.doesNotThrow(() => {
                  parseSource(`function * gen() { function not_gen() { ${arg} }}`, undefined, Context.Empty);
              });
          });

          it(`(function foo() { ${arg}})`, () => {
              t.doesNotThrow(() => {
                  parseSource(`(function foo() { ${arg}})`, undefined, Context.Empty);
              });
          });

          it(`(function * gen() { function not_gen() { ${arg} }})`, () => {
              t.doesNotThrow(() => {
                  parseSource(`(function * gen() { function not_gen() { ${arg} }})`, undefined, Context.Empty);
              });
          });
      }

      pass(`+function yield() {}`, Context.OptionsRanges | Context.OptionsRaw, {
        source: `+function yield() {}`,
        expected: {
            body: [
              {
                end: 20,
                expression: {
                  argument: {
                    async: false,
                    body: {
                      body: [],
                      end: 20,
                      start: 18,
                      type: 'BlockStatement'
                    },
                    end: 20,
                    expression: false,
                    generator: false,
                    id: {
                      end: 15,
                      name: 'yield',
                     start: 10,
                      type: 'Identifier',
                    },
                    params: [],
                    start: 1,
                    type: 'FunctionExpression',
                  },
                  end: 20,
                  operator: '+',
                  prefix: true,
                  start: 0,
                  type: 'UnaryExpression',
                },
                start: 0,
                type: 'ExpressionStatement',
              }
            ],
            end: 20,
            sourceType: 'script',
            start: 0,
            type: 'Program',
          }
      });

      // Acorn issue: https://github.com/acornjs/acorn/issues/552
      pass(`function *f1() {
          function g() {
            return yield / 1;
          }
        }`, Context.OptionsRanges | Context.OptionsRaw, {
          source: `function *f1() {
              function g() {
                return yield / 1;
              }
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
                                type: 'FunctionDeclaration',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'BinaryExpression',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'yield',
                                                    start: 69,
                                                    end: 74
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 1,
                                                    start: 77,
                                                    end: 78,
                                                    raw: '1'
                                                },
                                                operator: '/',
                                                start: 69,
                                                end: 78
                                            },
                                            start: 62,
                                            end: 79
                                        }
                                    ],
                                    start: 44,
                                    end: 95
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'g',
                                    start: 40,
                                    end: 41
                                },
                                start: 31,
                                end: 95
                            }
                        ],
                        start: 15,
                        end: 109
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f1',
                        start: 10,
                        end: 12
                    },
                    start: 0,
                    end: 109
                }
            ],
            start: 0,
            end: 109
        }
      });

      pass(`function *f3() {
          ({
            g() {
              return yield / 1;
            }
          })
        }`, Context.OptionsRanges | Context.OptionsRaw, {
          source: `function *f3() {
              ({
                g() {
                  return yield / 1;
                }
              })
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
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'g',
                                                start: 50,
                                                end: 51
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
                                                                type: 'BinaryExpression',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: 'yield',
                                                                    start: 81,
                                                                    end: 86
                                                                },
                                                                right: {
                                                                    type: 'Literal',
                                                                    value: 1,
                                                                    start: 89,
                                                                    end: 90,
                                                                    raw: '1'
                                                                },
                                                                operator: '/',
                                                                start: 81,
                                                                end: 90
                                                            },
                                                            start: 74,
                                                            end: 91
                                                        }
                                                    ],
                                                    start: 54,
                                                    end: 109
                                                },
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: null,
                                                start: 51,
                                                end: 109
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: true,
                                            shorthand: false,
                                            start: 50,
                                            end: 109
                                        }
                                    ],
                                    start: 32,
                                    end: 125
                                },
                                start: 31,
                                end: 126
                            }
                        ],
                        start: 15,
                        end: 140
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f3',
                        start: 10,
                        end: 12
                    },
                    start: 0,
                    end: 140
                }
            ],
            start: 0,
            end: 140
        }
      });

      pass(`function* fn() {
          () => yield;
          () => { yield };
        } `, Context.OptionsRanges | Context.OptionsLoc, {
          source: `function* fn() {
            () => yield;
            () => { yield };
          }`,
          expected: {
            type: 'Program',
            start: 0,
            end: 82,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 4,
                column: 11
              }
            },
            body: [
              {
                type: 'FunctionDeclaration',
                start: 0,
                end: 82,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 4,
                    column: 11
                  }
                },
                id: {
                  type: 'Identifier',
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
                  name: 'fn'
                },
                generator: true,
                expression: false,
                async: false,
                params: [],
                body: {
                  type: 'BlockStatement',
                  start: 15,
                  end: 82,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 4,
                      column: 11
                    }
                  },
                  body: [
                    {
                      type: 'ExpressionStatement',
                      start: 29,
                      end: 41,
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
                        start: 29,
                        end: 40,
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
                        params: [],
                        body: {
                          type: 'Identifier',
                          start: 35,
                          end: 40,
                          loc: {
                            start: {
                              line: 2,
                              column: 18
                            },
                            end: {
                              line: 2,
                              column: 23
                            }
                          },
                          name: 'yield'
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      start: 54,
                      end: 70,
                      loc: {
                        start: {
                          line: 3,
                          column: 12
                        },
                        end: {
                          line: 3,
                          column: 28
                        }
                      },
                      expression: {
                        type: 'ArrowFunctionExpression',
                        start: 54,
                        end: 69,
                        loc: {
                          start: {
                            line: 3,
                            column: 12
                          },
                          end: {
                            line: 3,
                            column: 27
                          }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          start: 60,
                          end: 69,
                          loc: {
                            start: {
                              line: 3,
                              column: 18
                            },
                            end: {
                              line: 3,
                              column: 27
                            }
                          },
                          body: [
                            {
                              type: 'ExpressionStatement',
                              start: 62,
                              end: 67,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 20
                                },
                                end: {
                                  line: 3,
                                  column: 25
                                }
                              },
                              expression: {
                                type: 'Identifier',
                                start: 62,
                                end: 67,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 20
                                  },
                                  end: {
                                    line: 3,
                                    column: 25
                                  }
                                },
                                name: 'yield'
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

      pass(`function* fn() {
          () => (x = yield) => {};
        }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function* fn() {
              () => (x = yield) => {};
            }`,
          expected: {
            type: 'Program',
            start: 0,
            end: 69,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 3,
                column: 13
              }
            },
            body: [
              {
                type: 'FunctionDeclaration',
                start: 0,
                end: 69,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 3,
                    column: 13
                  }
                },
                id: {
                  type: 'Identifier',
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
                  name: 'fn'
                },
                generator: true,
                expression: false,
                async: false,
                params: [],
                body: {
                  type: 'BlockStatement',
                  start: 15,
                  end: 69,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 3,
                      column: 13
                    }
                  },
                  body: [
                    {
                      type: 'ExpressionStatement',
                      start: 31,
                      end: 55,
                      loc: {
                        start: {
                          line: 2,
                          column: 14
                        },
                        end: {
                          line: 2,
                          column: 38
                        }
                      },
                      expression: {
                        type: 'ArrowFunctionExpression',
                        start: 31,
                        end: 54,
                        loc: {
                          start: {
                            line: 2,
                            column: 14
                          },
                          end: {
                            line: 2,
                            column: 37
                          }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [],
                        body: {
                          type: 'ArrowFunctionExpression',
                          start: 37,
                          end: 54,
                          loc: {
                            start: {
                              line: 2,
                              column: 20
                            },
                            end: {
                              line: 2,
                              column: 37
                            }
                          },
                          id: null,
                          generator: false,
                          expression: false,
                          async: false,
                          params: [
                            {
                              type: 'AssignmentPattern',
                              start: 38,
                              end: 47,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 21
                                },
                                end: {
                                  line: 2,
                                  column: 30
                                }
                              },
                              left: {
                                type: 'Identifier',
                                start: 38,
                                end: 39,
                                loc: {
                                  start: {
                                    line: 2,
                                    column: 21
                                  },
                                  end: {
                                    line: 2,
                                    column: 22
                                  }
                                },
                                name: 'x'
                              },
                              right: {
                                type: 'Identifier',
                                start: 42,
                                end: 47,
                                loc: {
                                  start: {
                                    line: 2,
                                    column: 25
                                  },
                                  end: {
                                    line: 2,
                                    column: 30
                                  }
                                },
                                name: 'yield'
                              }
                            }
                          ],
                          body: {
                            type: 'BlockStatement',
                            start: 52,
                            end: 54,
                            loc: {
                              start: {
                                line: 2,
                                column: 35
                              },
                              end: {
                                line: 2,
                                column: 37
                              }
                            },
                            body: []
                          }
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

      // Consise arrow bodies may contain yield as an identifier even in generators.
      pass(`function* f(){ () => yield; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `function* f(){ () => yield; }`,
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
              type: 'FunctionDeclaration',
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
                name: 'f'
              },
              generator: true,
              expression: false,
              async: false,
              params: [],
              body: {
                type: 'BlockStatement',
                start: 13,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 15,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    },
                    expression: {
                      type: 'ArrowFunctionExpression',
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
                      id: null,
                      generator: false,
                      expression: true,
                      async: false,
                      params: [],
                      body: {
                        type: 'Identifier',
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
                        name: 'yield'
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

      pass(`function *foo() { function b() {} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function *foo() { function b() {} }`,
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
                  type: 'FunctionDeclaration',
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
                  id: {
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
                    name: 'foo'
                  },
                  generator: true,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    start: 16,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    },
                    body: [
                      {
                        type: 'FunctionDeclaration',
                        start: 18,
                        end: 33,
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 33
                          }
                        },
                        id: {
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
                          name: 'b'
                        },
                        generator: false,
                        expression: false,
                        async: false,
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          start: 31,
                          end: 33,
                          loc: {
                            start: {
                              line: 1,
                              column: 31
                            },
                            end: {
                              line: 1,
                              column: 33
                            }
                          },
                          body: []
                        }
                      }
                    ]
                  }
                }
              ],
              sourceType: 'script'
            }
      });

      pass(`function *foo() { function b() {} function *b() {} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function *foo() { function b() {} function *b() {} }`,
          expected: {
              type: 'Program',
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
                    name: 'foo'
                  },
                  generator: true,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    start: 16,
                    end: 52,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 52
                      }
                    },
                    body: [
                      {
                        type: 'FunctionDeclaration',
                        start: 18,
                        end: 33,
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 33
                          }
                        },
                        id: {
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
                          name: 'b'
                        },
                        generator: false,
                        expression: false,
                        async: false,
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          start: 31,
                          end: 33,
                          loc: {
                            start: {
                              line: 1,
                              column: 31
                            },
                            end: {
                              line: 1,
                              column: 33
                            }
                          },
                          body: []
                        }
                      },
                      {
                        type: 'FunctionDeclaration',
                        start: 34,
                        end: 50,
                        loc: {
                          start: {
                            line: 1,
                            column: 34
                          },
                          end: {
                            line: 1,
                            column: 50
                          }
                        },
                        id: {
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
                        },
                        generator: true,
                        expression: false,
                        async: false,
                        params: [],
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
                    ]
                  }
                }
              ],
              sourceType: 'script'
            }
      });

      pass(`function fn(x = yield* yield) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `function fn(x = yield* yield) {}`,
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
              type: 'FunctionDeclaration',
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
              id: {
                type: 'Identifier',
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
                name: 'fn'
              },
              generator: false,
              expression: false,
              async: false,
              params: [
                {
                  type: 'AssignmentPattern',
                  start: 12,
                  end: 28,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 1,
                      column: 28
                    }
                  },
                  left: {
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
                  right: {
                    type: 'BinaryExpression',
                    start: 16,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 28
                      }
                    },
                    left: {
                      type: 'Identifier',
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
                      name: 'yield'
                    },
                    operator: '*',
                    right: {
                      type: 'Identifier',
                      start: 23,
                      end: 28,
                      loc: {
                        start: {
                          line: 1,
                          column: 23
                        },
                        end: {
                          line: 1,
                          column: 28
                        }
                      },
                      name: 'yield'
                    }
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                start: 30,
                end: 32,
                loc: {
                  start: {
                    line: 1,
                    column: 30
                  },
                  end: {
                    line: 1,
                    column: 32
                  }
                },
                body: []
              }
            }
          ],
          sourceType: 'script'
        }
      });

      pass(`function *foo() { () => {} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function *foo() { () => {} }`,
          expected: {
              type: 'Program',
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
              body: [
                {
                  type: 'FunctionDeclaration',
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
                    name: 'foo'
                  },
                  generator: true,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    start: 16,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 28
                      }
                    },
                    body: [
                      {
                        type: 'ExpressionStatement',
                        start: 18,
                        end: 26,
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 26
                          }
                        },
                        expression: {
                          type: 'ArrowFunctionExpression',
                          start: 18,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 18
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
                  }
                }
              ],
              sourceType: 'script'
            }
      });

      pass(`function foo() { function *b() {} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function foo() { function *b() {} }`,
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
                  type: 'FunctionDeclaration',
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
                  id: {
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
                  generator: false,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    start: 15,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    },
                    body: [
                      {
                        type: 'FunctionDeclaration',
                        start: 17,
                        end: 33,
                        loc: {
                          start: {
                            line: 1,
                            column: 17
                          },
                          end: {
                            line: 1,
                            column: 33
                          }
                        },
                        id: {
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
                          name: 'b'
                        },
                        generator: true,
                        expression: false,
                        async: false,
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          start: 31,
                          end: 33,
                          loc: {
                            start: {
                              line: 1,
                              column: 31
                            },
                            end: {
                              line: 1,
                              column: 33
                            }
                          },
                          body: []
                        }
                      }
                    ]
                  }
                }
              ],
              sourceType: 'script'
            }
      });

      pass(`(x = yield) => {} `, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `(x = yield) => {}`,
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
                expression: false,
                async: false,
                params: [
                  {
                    type: 'AssignmentPattern',
                    start: 1,
                    end: 10,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 10
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
                      name: 'yield'
                    }
                  }
                ],
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
            }
          ],
          sourceType: 'script'
        }
      });

      pass(`function* fn() {
          () => (yield) => {};
        }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function* fn() {
            () => (yield) => {};
          }`,
          expected: {
            type: 'Program',
            start: 0,
            end: 61,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 3,
                column: 11
              }
            },
            body: [
              {
                type: 'FunctionDeclaration',
                start: 0,
                end: 61,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 3,
                    column: 11
                  }
                },
                id: {
                  type: 'Identifier',
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
                  name: 'fn'
                },
                generator: true,
                expression: false,
                async: false,
                params: [],
                body: {
                  type: 'BlockStatement',
                  start: 15,
                  end: 61,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 3,
                      column: 11
                    }
                  },
                  body: [
                    {
                      type: 'ExpressionStatement',
                      start: 29,
                      end: 49,
                      loc: {
                        start: {
                          line: 2,
                          column: 12
                        },
                        end: {
                          line: 2,
                          column: 32
                        }
                      },
                      expression: {
                        type: 'ArrowFunctionExpression',
                        start: 29,
                        end: 48,
                        loc: {
                          start: {
                            line: 2,
                            column: 12
                          },
                          end: {
                            line: 2,
                            column: 31
                          }
                        },
                        id: null,
                        generator: false,
                        expression: true,
                        async: false,
                        params: [],
                        body: {
                          type: 'ArrowFunctionExpression',
                          start: 35,
                          end: 48,
                          loc: {
                            start: {
                              line: 2,
                              column: 18
                            },
                            end: {
                              line: 2,
                              column: 31
                            }
                          },
                          id: null,
                          generator: false,
                          expression: false,
                          async: false,
                          params: [
                            {
                              type: 'Identifier',
                              start: 36,
                              end: 41,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 19
                                },
                                end: {
                                  line: 2,
                                  column: 24
                                }
                              },
                              name: 'yield'
                            }
                          ],
                          body: {
                            type: 'BlockStatement',
                            start: 46,
                            end: 48,
                            loc: {
                              start: {
                                line: 2,
                                column: 29
                              },
                              end: {
                                line: 2,
                                column: 31
                              }
                            },
                            body: []
                          }
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

      pass(`function * gen() { (yield * a) + (yield * b);; }'`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function * gen() { (yield * a) + (yield * b);; }`,
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
                  id: {
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
                    name: 'gen'
                  },
                  generator: true,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    start: 17,
                    end: 48,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 48
                      }
                    },
                    body: [
                      {
                        type: 'ExpressionStatement',
                        start: 19,
                        end: 45,
                        loc: {
                          start: {
                            line: 1,
                            column: 19
                          },
                          end: {
                            line: 1,
                            column: 45
                          }
                        },
                        expression: {
                          type: 'BinaryExpression',
                          start: 19,
                          end: 44,
                          loc: {
                            start: {
                              line: 1,
                              column: 19
                            },
                            end: {
                              line: 1,
                              column: 44
                            }
                          },
                          left: {
                            type: 'YieldExpression',
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
                            delegate: true,
                            argument: {
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
                              name: 'a'
                            }
                          },
                          operator: '+',
                          right: {
                            type: 'YieldExpression',
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
                            delegate: true,
                            argument: {
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
                              name: 'b'
                            }
                          }
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
                    ]
                  }
                }
              ],
              sourceType: 'script'
            }
      });

      pass(`function * gen() { yield, yield }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function * gen() { yield, yield }`,
          expected: {
              type: 'Program',
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
              body: [
                {
                  type: 'FunctionDeclaration',
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
                    name: 'gen'
                  },
                  generator: true,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    start: 17,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    },
                    body: [
                      {
                        type: 'ExpressionStatement',
                        start: 19,
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 19
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        },
                        expression: {
                          type: 'SequenceExpression',
                          start: 19,
                          end: 31,
                          loc: {
                            start: {
                              line: 1,
                              column: 19
                            },
                            end: {
                              line: 1,
                              column: 31
                            }
                          },
                          expressions: [
                            {
                              type: 'YieldExpression',
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
                              delegate: false,
                              argument: null
                            },
                            {
                              type: 'YieldExpression',
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
                              delegate: false,
                              argument: null
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ],
              sourceType: 'script'
            }
      });

      pass(`function * gen() { (yield) ? yield : yield }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function * gen() { (yield) ? yield : yield }`,
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
              body: [
                {
                  type: 'FunctionDeclaration',
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
                    name: 'gen'
                  },
                  generator: true,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    start: 17,
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 44
                      }
                    },
                    body: [
                      {
                        type: 'ExpressionStatement',
                        start: 19,
                        end: 42,
                        loc: {
                          start: {
                            line: 1,
                            column: 19
                          },
                          end: {
                            line: 1,
                            column: 42
                          }
                        },
                        expression: {
                          type: 'ConditionalExpression',
                          start: 19,
                          end: 42,
                          loc: {
                            start: {
                              line: 1,
                              column: 19
                            },
                            end: {
                              line: 1,
                              column: 42
                            }
                          },
                          test: {
                            type: 'YieldExpression',
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
                            delegate: false,
                            argument: null
                          },
                          consequent: {
                            type: 'YieldExpression',
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
                            },
                            delegate: false,
                            argument: null
                          },
                          alternate: {
                            type: 'YieldExpression',
                            start: 37,
                            end: 42,
                            loc: {
                              start: {
                                line: 1,
                                column: 37
                              },
                              end: {
                                line: 1,
                                column: 42
                              }
                            },
                            delegate: false,
                            argument: null
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

      pass(`(function * () { yield * 1; return 37; yield * "icefapper"; });`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `(function * () { yield * 1; return 37; yield * "icefapper"; });`,
          expected: {
              type: 'Program',
              start: 0,
              end: 63,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 63
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 63,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 63
                    }
                  },
                  expression: {
                    type: 'FunctionExpression',
                    start: 1,
                    end: 61,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 61
                      }
                    },
                    id: null,
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 15,
                      end: 61,
                      loc: {
                        start: {
                          line: 1,
                          column: 15
                        },
                        end: {
                          line: 1,
                          column: 61
                        }
                      },
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 17,
                          end: 27,
                          loc: {
                            start: {
                              line: 1,
                              column: 17
                            },
                            end: {
                              line: 1,
                              column: 27
                            }
                          },
                          expression: {
                            type: 'YieldExpression',
                            start: 17,
                            end: 26,
                            loc: {
                              start: {
                                line: 1,
                                column: 17
                              },
                              end: {
                                line: 1,
                                column: 26
                              }
                            },
                            delegate: true,
                            argument: {
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
                        },
                        {
                          type: 'ReturnStatement',
                          start: 28,
                          end: 38,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 38
                            }
                          },
                          argument: {
                            type: 'Literal',
                            start: 35,
                            end: 37,
                            loc: {
                              start: {
                                line: 1,
                                column: 35
                              },
                              end: {
                                line: 1,
                                column: 37
                              }
                            },
                            value: 37,
                            raw: '37'
                          }
                        },
                        {
                          type: 'ExpressionStatement',
                          start: 39,
                          end: 59,
                          loc: {
                            start: {
                              line: 1,
                              column: 39
                            },
                            end: {
                              line: 1,
                              column: 59
                            }
                          },
                          expression: {
                            type: 'YieldExpression',
                            start: 39,
                            end: 58,
                            loc: {
                              start: {
                                line: 1,
                                column: 39
                              },
                              end: {
                                line: 1,
                                column: 58
                              }
                            },
                            delegate: true,
                            argument: {
                              type: 'Literal',
                              start: 47,
                              end: 58,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 47
                                },
                                end: {
                                  line: 1,
                                  column: 58
                                }
                              },
                              value: 'icefapper',
                              raw: '"icefapper"'
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              ],
              sourceType: 'script'
            }
      });

      pass(`function* a(){({[yield]:a}=0)}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `function* a(){({[yield]:a}=0)}`,
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
              type: 'FunctionDeclaration',
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
              id: {
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
                name: 'a'
              },
              generator: true,
              expression: false,
              async: false,
              params: [],
              body: {
                type: 'BlockStatement',
                start: 13,
                end: 30,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 30
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 14,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    },
                    expression: {
                      type: 'AssignmentExpression',
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
                      operator: '=',
                      left: {
                        type: 'ObjectPattern',
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
                        properties: [
                          {
                            type: 'Property',
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
                            method: false,
                            shorthand: false,
                            computed: true,
                            key: {
                              type: 'YieldExpression',
                              start: 17,
                              end: 22,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 17
                                },
                                end: {
                                  line: 1,
                                  column: 22
                                }
                              },
                              delegate: false,
                              argument: null
                            },
                            value: {
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
                              name: 'a'
                            },
                            kind: 'init'
                          }
                        ]
                      },
                      right: {
                        type: 'Literal',
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
                        value: 0,
                        raw: '0'
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

      pass(`function* a(){yield a}}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `function* a(){yield a}`,
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
              type: 'FunctionDeclaration',
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
              id: {
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
                name: 'a'
              },
              generator: true,
              expression: false,
              async: false,
              params: [],
              body: {
                type: 'BlockStatement',
                start: 13,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 22
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 14,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 21
                      }
                    },
                    expression: {
                      type: 'YieldExpression',
                      start: 14,
                      end: 21,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 21
                        }
                      },
                      delegate: false,
                      argument: {
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

      pass('function* g(){(class extends (yield) {});}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: 'function* g(){(class extends (yield) {});}',
      expected: {
        type: 'Program',
        start: 0,
        end: 42,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 42
          }
        },
        body: [
          {
            type: 'FunctionDeclaration',
            start: 0,
            end: 42,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 42
              }
            },
            id: {
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
              name: 'g'
            },
            generator: true,
            expression: false,
            async: false,
            params: [],
            body: {
              type: 'BlockStatement',
              start: 13,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 42
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
                  start: 14,
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 41
                    }
                  },
                  expression: {
                    type: 'ClassExpression',
                    start: 15,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    },
                    id: null,
                    superClass: {
                      type: 'YieldExpression',
                      start: 30,
                      end: 35,
                      loc: {
                        start: {
                          line: 1,
                          column: 30
                        },
                        end: {
                          line: 1,
                          column: 35
                        }
                      },
                      delegate: false,
                      argument: null
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
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
     });

      pass('function* a(){(class {[yield](){}})};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: 'function* a(){(class {[yield](){}})};',
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
        body: [
          {
            type: 'FunctionDeclaration',
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
              name: 'a'
            },
            generator: true,
            expression: false,
            async: false,
            params: [],
            body: {
              type: 'BlockStatement',
              start: 13,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 36
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
                  start: 14,
                  end: 35,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 35
                    }
                  },
                  expression: {
                    type: 'ClassExpression',
                    start: 15,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    },
                    id: null,
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      start: 21,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      },
                      body: [
                        {
                          type: 'MethodDefinition',
                          start: 22,
                          end: 33,
                          loc: {
                            start: {
                              line: 1,
                              column: 22
                            },
                            end: {
                              line: 1,
                              column: 33
                            }
                          },
                          computed: true,
                          key: {
                            type: 'YieldExpression',
                            start: 23,
                            end: 28,
                            loc: {
                              start: {
                                line: 1,
                                column: 23
                              },
                              end: {
                                line: 1,
                                column: 28
                              }
                            },
                            delegate: false,
                            argument: null
                          },
                          static: false,
                          kind: 'method',
                          value: {
                            type: 'FunctionExpression',
                            start: 29,
                            end: 33,
                            loc: {
                              start: {
                                line: 1,
                                column: 29
                              },
                              end: {
                                line: 1,
                                column: 33
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 31,
                              end: 33,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 31
                                },
                                end: {
                                  line: 1,
                                  column: 33
                                }
                              },
                              body: []
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
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

      pass(`function * gen() { yield /* comment */ }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function * gen() { yield /* comment */ }`,
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
                  id: {
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
                    name: 'gen'
                  },
                  generator: true,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    start: 17,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    },
                    body: [
                      {
                        type: 'ExpressionStatement',
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
                        expression: {
                          type: 'YieldExpression',
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
                          delegate: false,
                          argument: null
                        }
                      }
                    ]
                  }
                }
              ],
              sourceType: 'script'
            }
      });
  });
});
