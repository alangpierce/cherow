import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions  - Class', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failures', () => {

        const invalidSyntax = [
            'a=0',
            'a',
            '3:0',
            '[3]:0',
            '[a,b](){}',
            '[3]:0',
            '[a,b](){}',
            '[3]:0',
            '[a,b](){}',
            '[3]:0',
            'set f(...y) {}',
            'get m',
            'get m',
            'get m',
            'get m',
            'get m',
            'm; n',
            'm: 1',
            'get m()',
            'get m() {',
            'set m() {}',
            'm() {}, n() {}',
            'static *method([...[ x ] = []]) {}',
            '*method([...{ x }, y] = [1, 2, 3]) {}',
            '*method([...x = []] = []) {}',
            '*method([...{ x }, y]) {}',
            '*method([...[x], y]) {}',
            'static async *method([...{ x }, y] = [1, 2, 3]) {}',
            'static async *method([...x, y] = [1, 2, 3]) {}',
            'static async *method([...[x], y] = [1, 2, 3]) {}',
            'static async *method([...{ x } = []] = []) {}',
            'static async *method([...x = []] = []) {}',
            'static async *method([...[ x ] = []] = []) {}',
            'static async *method([...{ x }, y]) {}',
            'static async *method([...x, y]) {}',
            'static async *method([...[ x ] = []]) {}',
            'async *method([...[ x ] = []] = []) {}',
            'async *method([...x = []] = []) {}',
            'async *method([...{ x } = []] = []) {}',
            'async *method([...[x], y] = [1, 2, 3]) {}',
            'async *method([...x, y] = [1, 2, 3]) {}',
            'async *method([...{ x }, y] = [1, 2, 3]) {}',
            'async *method([...{ x }, y]) {}',
            'static async method() { void await; }',
            'static async method() {var await;}',
            'static async method() {var yield;}',
            'static async method() { \\u0061wait: ; }',
            'static async method() {var await;}',
            'static async method(...a,) {}',
            'static async *gen() { var await; }',
            'static async *gen() { var yield; }',
            'static async *method(...x = []) {}',
            'async *method([...x = []] = []) {}',
            'async *method([...x = []] = []) {}',
            'static async method(...a,) {}',
            'static async method() { await: ; }',
            'async *method([...[ x ] = []]) {}',
            'async *method([...x = []]) {}',
            'async *method([...{ x }, y]) {}',
            'async *method([...[ x ] = []] = []) {}',
            'async *method([...x, y] = [1, 2, 3]) {}',
            'static async *method([...[ x ] = []]) {}',
            'static async *method([...{ x } = []]) {}',
            'static async *method([...x = []] = []) {}',
            '*method([...[ x ] = []] = []) {}',
            '*method([...x, y] = [1, 2, 3]) {}',
            'static async method(...x = []) {}'
       ];

        for (const arg of invalidSyntax) {
            it(`(class {${arg}})`, () => {
                t.throws(() => {
                    parseSource(`(class {${arg}})`, undefined, Context.Empty);
                });
            });

            it(`(class {${arg}})`, () => {
                t.throws(() => {
                    parseSource(`var = (class {${arg}})`, undefined, Context.Empty);
                });
            });

            it(`(class {${arg}})`, () => {
                t.throws(() => {
                    parseSource(`bar, (class {${arg}})`, undefined, Context.Empty);
                });
            });
        }

        fail('var C = class { static async method() { var await; }};', Context.Empty, {
            source: 'var C = class { static async method() { var await; }};',
        });

        fail('(class extends a,b {)', Context.Empty, {
            source: '(class extends a,b {)',
        });

        fail('var C = class l\\u0065t {};', Context.Empty, {
            source: 'var C = class l\\u0065t {};',
        });

        fail('var C = class let {};', Context.Empty, {
            source: 'var C = class let {};',
        });

        fail('var C = class st\\u0061tic {};', Context.Empty, {
            source: 'var C = class st\\u0061tic {};',
        });

        fail('var C = class static {};', Context.Empty, {
            source: 'var C = class static {};',
        });

        fail('var C = class yi\\u0065ld {};', Context.Empty, {
            source: 'var C = class yi\\u0065ld {};',
        });

        fail('var C = class yield {};', Context.Empty, {
            source: 'var C = class yield {};',
        });

        fail('class aw\\u0061it {}', Context.Strict | Context.Module, {
            source: 'class aw\\u0061it {}',
        });

        fail('(class extends a,b {})', Context.Empty, {
            source: '(class extends a,b {})',
        });

        fail('(class {a:0})', Context.Empty, {
            source: '(class {a:0})',
        });

        fail('(class eval {a:0})', Context.Empty, {
            source: '(class eval {a:0})',
        });

        fail('class aw\\u0061it {};', Context.Empty, {
            source: 'class aw\\u0061it {};',
        });

        fail('var C = class aw\\u0061it {};', Context.Empty, {
            source: 'var C = class aw\\u0061it {};',
        });

        fail('var C = class await {};', Context.Strict | Context.Module, {
            source: 'var C = class await {};',
        });

        fail('(class package {a:0})', Context.Empty, {
            source: '(class package {a:0})',
        });

        fail('(class await {a:0})', Context.Empty, {
            source: '(class await {a:0})',
        });

        fail('(class yield {a:0})', Context.Empty, {
            source: '(class yield {a:0})',
        });

        fail('(class {a:0})', Context.Empty, {
            source: '(class {a:0})',
        });

        fail('(class {a=0})', Context.Empty, {
            source: '(class {a=0})',
        });

        fail('class {}', Context.Empty, {
            source: 'class {}',
        });

        fail('class {}', Context.Empty, {
            source: 'class {}',
        });

        fail('class {}', Context.Empty, {
            source: 'class {}',
        });
    });

    describe('Pass', () => {

        const validCombos = [
            '(class A { foo() {} foo() {} })',
            '(class B { get foo() {} get foo() {} })',
            '(class C { set foo(x) {} set foo(x) {} })',
            '(class D { get foo() {} set foo(x) {} })',
            '(class E { static foo() {} static foo() {} })',
            '(class F { static get foo() {} static get foo() {} })',
            '(class G { static set foo(x) {} static set foo(x) {} })',
            '(class H { static get foo() {} static set foo(x) {} })',
            '(class I { foo() {} get foo() {} set foo(x) {}})',
            '(class J { static get foo() {} static set foo(x) {} get foo() {} set foo(x) {} })',
            '(class K { static foo() {} static get foo() {} static set foo(x) {}})',
            '(class L { static foo() {} foo() {} })',
            '(class M { static foo() {} get foo() {} set foo(x) {}})',
            '(class N { foo() {} static get foo() {} static set foo(x) {}})',
            '(class Empty { })',
            '(class EmptySemi { ; })',
            '(class OnlyCtor { constructor() { p(\'ctor\') } })',
            '(class OnlyMethod { method() { p(\'method\') } })',
            '(class OnlyStaticMethod { static method() { p(\'smethod\') } })',
            '(class OnlyGetter { get getter() { p(\'getter\') } })',
            '(class OnlyStaticGetter { static get getter() { p(\'sgetter\') } })',
            '(class OnlySetter { set setter(x) { p(\'setter \' + x) } })',
            '(class OnlyStaticSetter { static set setter(x) { p(\'ssetter \' + x) } })',
            `(function f1() {
                class Empty { }
                class EmptySemi { ; }
                class OnlyCtor { constructor() { p('ctor') } }
                class OnlyMethod { method() { p('method') } }
                class OnlyStaticMethod { static method() { p('smethod') } }
                class OnlyGetter { get getter() { p('getter') } }
                class OnlyStaticGetter { static get getter() { p('sgetter') } }
                class OnlySetter { set setter(x) { p('setter ' + x) } }
                class OnlyStaticSetter { static set setter(x) { p('ssetter ' + x) } }
                class OnlyComputedMethod { ["cmethod"]() { p('cmethod') } }
                class OnlyStaticComputedMethod { static ["cmethod"]() { p('scmethod') } }
                class OnlyComputedGetter { get ["cgetter"]() { p('cgetter') } }
                class OnlyStaticComputedGetter { static get ["cgetter"]() { p('scgetter') } }
                class OnlyComputedSetter { set ["csetter"](x) { p('csetter ' + x) } }
                class OnlyStaticComputedSetter { static set ["csetter"](x) { p('scsetter ' + x) } }
            })`
        ];

        for (const arg of validCombos) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        const extendSyntax = [
            'class {}',
            'class name {}',
            'class extends F {}',
            'class name extends F {}',
            'class extends (F, G) {}',
            'class name extends (F, G) {}',
            'class extends class {} {}',
            'class name extends class {} {}',
            'class extends class base {} {}',
            'class name extends class base {} {}',
        ];

        for (const arg of extendSyntax) {
            it(`(${arg})`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(${arg})`, undefined, Context.Empty);
                });
            });

            it(`var C = ${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(${arg})`, undefined, Context.Empty);
                });
            });

            it(`bar, ${arg};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`bar, ${arg};`, undefined, Context.Empty);
                });
            });
        }

        const validSyntax = [
            ';;;\n;\n',
            ';;;\n;\n',
            'yield() {}',
            'await() {}',
            'async() {}',
            ';;;\n;\n',
            ';;;\n;a(){}',
            ';;;\n;a(){}b(){}',
            'set a(b) {}',
            'set a(b) {"use strict";}',
            '[a](){};',
            ';;;\n;\n',
            'static async *method() {}',
            'static async *method(x = y, y) {}',
            'static async *method(a,) {}',
            'static async *gen() { yield* obj; }',
            'static async *gen() { yield this.foo; }',
            'async *gen() { yield * readFile();}',
            'async *method([x, y, z]) {}',
            'async *method([x = 23]) {}',
            'async *method([x]) {}',
            'async *method([,]) {}',
            'async *method([, ...x]) {}',
            'async *method([ , , ...x]) {}',
            'async *method([...x]) {}',
            'async *method([...{ length }]) {}',
            'async *method([arrow = () => {}] = []) {}',
            'async *method([ x = y ] = []) {}',
            'async *method([{ x }] = []) {}',
            'async *method([,] = function*() {}()) {}',
            'async *method([...{ 0: v, 1: w, 2: x, 3: y, length: z }] = [7, 8, 9]) {}',
            'async *method({ w: [x, y, z] = [4, 5, 6] } = {}) {}',
            'async *method({ x: y = go_to_hell } = {}) {}',
            'async *method({ x: y } = { x: 23 }) {}',
            'async *method({}) {}',
            'static async *method([[] = function() { a += 1; }()]) {}',
            'static async *method([[...x] = function() { a += 1; }()]) {}',
            'static async *method([x]) {}',
            'static async *method([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {}',
            'static async *method([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }]) {}',
            'static async *method([ , , ...x]) {}',
            'static async *method([...{ length }]) {}',
            'static async *method([[...x] = [2, 1, 3]] = []) {}',
            'static async *method({ [function(){}]: x } = {}) {}',
            'static async *method({...rest} = {a: 3, b: 4}) {}',
            'static async *method({ x: [y], }) {}',
            'static async *method({ x: y, }) {}',
            '*method([x]) {}',
            '*method([[] = function() { a += 1; return function*() {}; }()]) {}',
            '*method([x = 23]) {}',
            '*method([_, x]) {}',
            '*method([, ...x]) {}',
            '*method([[,] = g()] = [[]]) {}',
            '*method([cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }] = []) {}',
            '*method([x] = g) {}',
            '*method([,] = g()) {}',
            '*method([ , , ...x] = [1, 2, 3, 4, 5]) {}',
            '*method([...{ 0: v, 1: w, 2: x, 3: y, length: z }] = [7, 8, 9]) {}',
            '*method({ a, b = thrower(), c = ++a } = {}) {}',
            '*method({ x: y = 33 } = { }) {}',
            '*method({ cover = (function () {}), b = (0, function() {})  }) {}',
            '*method({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}',
            'static *method([[...x] = function() { a += 1; }()]) {}',
            'static *method([cover = (function () {}), b = (0, function() {})]) {}',
            'static *method([x]) {}',
            'static *method({ w: [x, y, z] = [4, 5, 6] } = {}) {}',
            'static *method({ x: y, } = { x: 23 }) {}',
            'static *method({ cls = class {}, xCls = class X {}, xCls2 = class { static name() {} } }) {}',
            'static *method({...x}) {}',
            'method([[...x] = values]) {}',
            'static set [\'x\' in empty](param) { value = param; }',
            'get .1() { return \'get string\'; }',
            'set .1(param) { stringSet = param; }',
            'set \'singleQuote\'(param) { stringSet = param; }',
            'get \'hex\\x45scape\'() { return \'get string\'; }',
            'set \'character\tescape\'(param) { stringSet = param; }',
            'set 0(param) { stringSet = param; }',
            'set 1E+9(param) { stringSet = param; }',
            "get [yield]() { return 'get yield'; }",
            "set [yield](param) { yieldSet = param; }",
            '*method() {}',
            'static async *method(a,) {}',
            'static async *gen() { yield * []; }',
            'static async *gen() { yield [...yield yield]; }',
            `static async *gen() {
                yield {
                    ...yield,
                    y: 1,
                    ...yield yield,
                  };
            }`,
            'static async *gen() { yield* isiah(); }',
            'async method(a = b +=1, c = d += 1, e = f += 1, g = h += 1, i = j += 1,k = l +=1) {}',
            'async method(a, b = 39,) {}',
            'static async method(a,) {}',
            'static async *gen() {}',
            'method([x]) {}',
            'static *method({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}',
            'static *method({ x: y = 33 }) {}',
            'static *method({ x: y = function a() {} }) {}',
            'static *method({ w: [x, y, z] = [4, 5, 6] }) {}',
            'static *method({ cover = (function () {}), xCover = (0, function() {})  }) {}',
            'static *method({}) {}',
            'static *method({...rest} = {a: 3, b: 4}) {}',
            'static *method({ x, } = { x: 23 }) {}',
            'static *method({} = null) {}',
            'static *method([cover = (function () {}), xCover = (0, function() {})] = []) {}',
            'static *method([[x, y, z] = [4, 5, 6]] = []) {}',
            'static *method([, ...x]) {}',
            'static *method([,]) {}',
            'static *method([x]) {}',
            'static *method([[x, y, z] = [4, 5, 6]]) {}',
            ' *method({ x, }) {}',
            '*method({ cls = class {}, xCls = class X {}, xCls2 = class { static name() {} } }) {}',
            '*method({ w: [x, y, z] = [4, 5, 6] } = {}) {}',
            '*method({} = null) {}',
            '*method([cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }] = []) {}',
            '*method([[x]] = [null]) {}',
            '*method([...{ length }]) {}',
            '*method([...[,]]) {}',
            'async *hunya({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: undefined }) {}',
            'async *method({ w: [x, y, z] = [4, 5, 6] }) {}',
            'async *method({ w: { x, y, z } = undefined }) {}',
            'static async *method([[x, y, z] = [4, 5, 6]]) {}',
            'static async *method([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }]) {}',
          ];

        for (const arg of validSyntax) {
            it(`(class { ${arg}})`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(class { ${arg}})`, undefined, Context.Empty);
                });
            });

            it(`(class { ${arg}}) (class { ${arg}})`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(class { ${arg}}) (class { ${arg}})`, undefined, Context.Empty);
                });
            });

            it(`var foo = (class { ${arg}})`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var foo = (class { ${arg}})`, undefined, Context.Empty);
                });
            });

            it(`function foo() { (class { ${arg}}) }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`function foo() { (class { ${arg}}) }`, undefined, Context.Empty);
                });
            });

            it(`() => { (class { ${arg}}) }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`() => { (class { ${arg}}) }`, undefined, Context.Empty);
                });
            });
        }

        // Babylon issue: https://github.com/babel/babel/issues/7537
        pass(`(class A {} < 1);`, Context.OptionsRanges | Context.OptionsRaw, {
                source: `(class A {} < 1);`,
                expected: {
                    type: 'Program',
                    sourceType: 'script',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'BinaryExpression',
                                left: {
                                    type: 'ClassExpression',
                                    id: {
                                        type: 'Identifier',
                                        name: 'A',
                                        start: 7,
                                        end: 8
                                    },
                                    superClass: null,
                                    body: {
                                        type: 'ClassBody',
                                        body: [],
                                        start: 9,
                                        end: 11
                                    },
                                    start: 1,
                                    end: 11
                                },
                                right: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 14,
                                    end: 15,
                                    raw: '1'
                                },
                                operator: '<',
                                start: 1,
                                end: 15
                            },
                            start: 0,
                            end: 17
                        }
                    ],
                    start: 0,
                    end: 17
                }
            });

        pass(`class A {
            *g1() { (yield) }
            *g2() { [yield] }
            *g3() { {yield} }
            *g4() { yield, yield; }
            *g5() { (yield) ? yield : yield; }}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
                source: `class A {
                    *g1() { (yield) }
                    *g2() { [yield] }
                    *g3() { {yield} }
                    *g4() { yield, yield; }
                    *g5() { (yield) ? yield : yield; }}`,
                expected: {
                    type: 'Program',
                    start: 0,
                    end: 223,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 6,
                        column: 55
                      }
                    },
                    body: [
                      {
                        type: 'ClassDeclaration',
                        start: 0,
                        end: 223,
                        loc: {
                          start: {
                            line: 1,
                            column: 0
                          },
                          end: {
                            line: 6,
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
                          name: 'A'
                        },
                        superClass: null,
                        body: {
                          type: 'ClassBody',
                          start: 8,
                          end: 223,
                          loc: {
                            start: {
                              line: 1,
                              column: 8
                            },
                            end: {
                              line: 6,
                              column: 55
                            }
                          },
                          body: [
                            {
                              type: 'MethodDefinition',
                              start: 30,
                              end: 47,
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
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 31,
                                end: 33,
                                loc: {
                                  start: {
                                    line: 2,
                                    column: 21
                                  },
                                  end: {
                                    line: 2,
                                    column: 23
                                  }
                                },
                                name: 'g1'
                              },
                              static: false,
                              kind: 'method',
                              value: {
                                type: 'FunctionExpression',
                                start: 33,
                                end: 47,
                                loc: {
                                  start: {
                                    line: 2,
                                    column: 23
                                  },
                                  end: {
                                    line: 2,
                                    column: 37
                                  }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [],
                                body: {
                                  type: 'BlockStatement',
                                  start: 36,
                                  end: 47,
                                  loc: {
                                    start: {
                                      line: 2,
                                      column: 26
                                    },
                                    end: {
                                      line: 2,
                                      column: 37
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'ExpressionStatement',
                                      start: 38,
                                      end: 45,
                                      loc: {
                                        start: {
                                          line: 2,
                                          column: 28
                                        },
                                        end: {
                                          line: 2,
                                          column: 35
                                        }
                                      },
                                      expression: {
                                        type: 'YieldExpression',
                                        start: 39,
                                        end: 44,
                                        loc: {
                                          start: {
                                            line: 2,
                                            column: 29
                                          },
                                          end: {
                                            line: 2,
                                            column: 34
                                          }
                                        },
                                        delegate: false,
                                        argument: null
                                      }
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              type: 'MethodDefinition',
                              start: 68,
                              end: 85,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 20
                                },
                                end: {
                                  line: 3,
                                  column: 37
                                }
                              },
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 69,
                                end: 71,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 21
                                  },
                                  end: {
                                    line: 3,
                                    column: 23
                                  }
                                },
                                name: 'g2'
                              },
                              static: false,
                              kind: 'method',
                              value: {
                                type: 'FunctionExpression',
                                start: 71,
                                end: 85,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 23
                                  },
                                  end: {
                                    line: 3,
                                    column: 37
                                  }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [],
                                body: {
                                  type: 'BlockStatement',
                                  start: 74,
                                  end: 85,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 26
                                    },
                                    end: {
                                      line: 3,
                                      column: 37
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'ExpressionStatement',
                                      start: 76,
                                      end: 83,
                                      loc: {
                                        start: {
                                          line: 3,
                                          column: 28
                                        },
                                        end: {
                                          line: 3,
                                          column: 35
                                        }
                                      },
                                      expression: {
                                        type: 'ArrayExpression',
                                        start: 76,
                                        end: 83,
                                        loc: {
                                          start: {
                                            line: 3,
                                            column: 28
                                          },
                                          end: {
                                            line: 3,
                                            column: 35
                                          }
                                        },
                                        elements: [
                                          {
                                            type: 'YieldExpression',
                                            start: 77,
                                            end: 82,
                                            loc: {
                                              start: {
                                                line: 3,
                                                column: 29
                                              },
                                              end: {
                                                line: 3,
                                                column: 34
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
                            },
                            {
                              type: 'MethodDefinition',
                              start: 106,
                              end: 123,
                              loc: {
                                start: {
                                  line: 4,
                                  column: 20
                                },
                                end: {
                                  line: 4,
                                  column: 37
                                }
                              },
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 107,
                                end: 109,
                                loc: {
                                  start: {
                                    line: 4,
                                    column: 21
                                  },
                                  end: {
                                    line: 4,
                                    column: 23
                                  }
                                },
                                name: 'g3'
                              },
                              static: false,
                              kind: 'method',
                              value: {
                                type: 'FunctionExpression',
                                start: 109,
                                end: 123,
                                loc: {
                                  start: {
                                    line: 4,
                                    column: 23
                                  },
                                  end: {
                                    line: 4,
                                    column: 37
                                  }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [],
                                body: {
                                  type: 'BlockStatement',
                                  start: 112,
                                  end: 123,
                                  loc: {
                                    start: {
                                      line: 4,
                                      column: 26
                                    },
                                    end: {
                                      line: 4,
                                      column: 37
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'BlockStatement',
                                      start: 114,
                                      end: 121,
                                      loc: {
                                        start: {
                                          line: 4,
                                          column: 28
                                        },
                                        end: {
                                          line: 4,
                                          column: 35
                                        }
                                      },
                                      body: [
                                        {
                                          type: 'ExpressionStatement',
                                          start: 115,
                                          end: 120,
                                          loc: {
                                            start: {
                                              line: 4,
                                              column: 29
                                            },
                                            end: {
                                              line: 4,
                                              column: 34
                                            }
                                          },
                                          expression: {
                                            type: 'YieldExpression',
                                            start: 115,
                                            end: 120,
                                            loc: {
                                              start: {
                                                line: 4,
                                                column: 29
                                              },
                                              end: {
                                                line: 4,
                                                column: 34
                                              }
                                            },
                                            delegate: false,
                                            argument: null
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              type: 'MethodDefinition',
                              start: 144,
                              end: 167,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 20
                                },
                                end: {
                                  line: 5,
                                  column: 43
                                }
                              },
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 145,
                                end: 147,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 21
                                  },
                                  end: {
                                    line: 5,
                                    column: 23
                                  }
                                },
                                name: 'g4'
                              },
                              static: false,
                              kind: 'method',
                              value: {
                                type: 'FunctionExpression',
                                start: 147,
                                end: 167,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 23
                                  },
                                  end: {
                                    line: 5,
                                    column: 43
                                  }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [],
                                body: {
                                  type: 'BlockStatement',
                                  start: 150,
                                  end: 167,
                                  loc: {
                                    start: {
                                      line: 5,
                                      column: 26
                                    },
                                    end: {
                                      line: 5,
                                      column: 43
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'ExpressionStatement',
                                      start: 152,
                                      end: 165,
                                      loc: {
                                        start: {
                                          line: 5,
                                          column: 28
                                        },
                                        end: {
                                          line: 5,
                                          column: 41
                                        }
                                      },
                                      expression: {
                                        type: 'SequenceExpression',
                                        start: 152,
                                        end: 164,
                                        loc: {
                                          start: {
                                            line: 5,
                                            column: 28
                                          },
                                          end: {
                                            line: 5,
                                            column: 40
                                          }
                                        },
                                        expressions: [
                                          {
                                            type: 'YieldExpression',
                                            start: 152,
                                            end: 157,
                                            loc: {
                                              start: {
                                                line: 5,
                                                column: 28
                                              },
                                              end: {
                                                line: 5,
                                                column: 33
                                              }
                                            },
                                            delegate: false,
                                            argument: null
                                          },
                                          {
                                            type: 'YieldExpression',
                                            start: 159,
                                            end: 164,
                                            loc: {
                                              start: {
                                                line: 5,
                                                column: 35
                                              },
                                              end: {
                                                line: 5,
                                                column: 40
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
                            },
                            {
                              type: 'MethodDefinition',
                              start: 188,
                              end: 222,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 20
                                },
                                end: {
                                  line: 6,
                                  column: 54
                                }
                              },
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 189,
                                end: 191,
                                loc: {
                                  start: {
                                    line: 6,
                                    column: 21
                                  },
                                  end: {
                                    line: 6,
                                    column: 23
                                  }
                                },
                                name: 'g5'
                              },
                              static: false,
                              kind: 'method',
                              value: {
                                type: 'FunctionExpression',
                                start: 191,
                                end: 222,
                                loc: {
                                  start: {
                                    line: 6,
                                    column: 23
                                  },
                                  end: {
                                    line: 6,
                                    column: 54
                                  }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [],
                                body: {
                                  type: 'BlockStatement',
                                  start: 194,
                                  end: 222,
                                  loc: {
                                    start: {
                                      line: 6,
                                      column: 26
                                    },
                                    end: {
                                      line: 6,
                                      column: 54
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'ExpressionStatement',
                                      start: 196,
                                      end: 220,
                                      loc: {
                                        start: {
                                          line: 6,
                                          column: 28
                                        },
                                        end: {
                                          line: 6,
                                          column: 52
                                        }
                                      },
                                      expression: {
                                        type: 'ConditionalExpression',
                                        start: 196,
                                        end: 219,
                                        loc: {
                                          start: {
                                            line: 6,
                                            column: 28
                                          },
                                          end: {
                                            line: 6,
                                            column: 51
                                          }
                                        },
                                        test: {
                                          type: 'YieldExpression',
                                          start: 197,
                                          end: 202,
                                          loc: {
                                            start: {
                                              line: 6,
                                              column: 29
                                            },
                                            end: {
                                              line: 6,
                                              column: 34
                                            }
                                          },
                                          delegate: false,
                                          argument: null
                                        },
                                        consequent: {
                                          type: 'YieldExpression',
                                          start: 206,
                                          end: 211,
                                          loc: {
                                            start: {
                                              line: 6,
                                              column: 38
                                            },
                                            end: {
                                              line: 6,
                                              column: 43
                                            }
                                          },
                                          delegate: false,
                                          argument: null
                                        },
                                        alternate: {
                                          type: 'YieldExpression',
                                          start: 214,
                                          end: 219,
                                          loc: {
                                            start: {
                                              line: 6,
                                              column: 46
                                            },
                                            end: {
                                              line: 6,
                                              column: 51
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
                            }
                          ]
                        }
                      }
                    ],
                    sourceType: 'script'
                  }
        });

        pass(`class A {
            *g1() { (yield 1) }
            *g2() { [yield 1] }
            *g3() { {yield 1} }
            *g4() { yield 1, yield 2; }}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
                source: `class A {
                    *g1() { (yield 1) }
                    *g2() { [yield 1] }
                    *g3() { {yield 1} }
                    *g4() { yield 1, yield 2; }}`,
                expected: {
                    type: 'Program',
                    start: 0,
                    end: 178,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 5,
                        column: 48
                      }
                    },
                    body: [
                      {
                        type: 'ClassDeclaration',
                        start: 0,
                        end: 178,
                        loc: {
                          start: {
                            line: 1,
                            column: 0
                          },
                          end: {
                            line: 5,
                            column: 48
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
                          start: 8,
                          end: 178,
                          loc: {
                            start: {
                              line: 1,
                              column: 8
                            },
                            end: {
                              line: 5,
                              column: 48
                            }
                          },
                          body: [
                            {
                              type: 'MethodDefinition',
                              start: 30,
                              end: 49,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 20
                                },
                                end: {
                                  line: 2,
                                  column: 39
                                }
                              },
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 31,
                                end: 33,
                                loc: {
                                  start: {
                                    line: 2,
                                    column: 21
                                  },
                                  end: {
                                    line: 2,
                                    column: 23
                                  }
                                },
                                name: 'g1'
                              },
                              static: false,
                              kind: 'method',
                              value: {
                                type: 'FunctionExpression',
                                start: 33,
                                end: 49,
                                loc: {
                                  start: {
                                    line: 2,
                                    column: 23
                                  },
                                  end: {
                                    line: 2,
                                    column: 39
                                  }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [],
                                body: {
                                  type: 'BlockStatement',
                                  start: 36,
                                  end: 49,
                                  loc: {
                                    start: {
                                      line: 2,
                                      column: 26
                                    },
                                    end: {
                                      line: 2,
                                      column: 39
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'ExpressionStatement',
                                      start: 38,
                                      end: 47,
                                      loc: {
                                        start: {
                                          line: 2,
                                          column: 28
                                        },
                                        end: {
                                          line: 2,
                                          column: 37
                                        }
                                      },
                                      expression: {
                                        type: 'YieldExpression',
                                        start: 39,
                                        end: 46,
                                        loc: {
                                          start: {
                                            line: 2,
                                            column: 29
                                          },
                                          end: {
                                            line: 2,
                                            column: 36
                                          }
                                        },
                                        delegate: false,
                                        argument: {
                                          type: 'Literal',
                                          start: 45,
                                          end: 46,
                                          loc: {
                                            start: {
                                              line: 2,
                                              column: 35
                                            },
                                            end: {
                                              line: 2,
                                              column: 36
                                            }
                                          },
                                          value: 1,
                                          raw: '1'
                                        }
                                      }
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              type: 'MethodDefinition',
                              start: 70,
                              end: 89,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 20
                                },
                                end: {
                                  line: 3,
                                  column: 39
                                }
                              },
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 71,
                                end: 73,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 21
                                  },
                                  end: {
                                    line: 3,
                                    column: 23
                                  }
                                },
                                name: 'g2'
                              },
                              static: false,
                              kind: 'method',
                              value: {
                                type: 'FunctionExpression',
                                start: 73,
                                end: 89,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 23
                                  },
                                  end: {
                                    line: 3,
                                    column: 39
                                  }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [],
                                body: {
                                  type: 'BlockStatement',
                                  start: 76,
                                  end: 89,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 26
                                    },
                                    end: {
                                      line: 3,
                                      column: 39
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'ExpressionStatement',
                                      start: 78,
                                      end: 87,
                                      loc: {
                                        start: {
                                          line: 3,
                                          column: 28
                                        },
                                        end: {
                                          line: 3,
                                          column: 37
                                        }
                                      },
                                      expression: {
                                        type: 'ArrayExpression',
                                        start: 78,
                                        end: 87,
                                        loc: {
                                          start: {
                                            line: 3,
                                            column: 28
                                          },
                                          end: {
                                            line: 3,
                                            column: 37
                                          }
                                        },
                                        elements: [
                                          {
                                            type: 'YieldExpression',
                                            start: 79,
                                            end: 86,
                                            loc: {
                                              start: {
                                                line: 3,
                                                column: 29
                                              },
                                              end: {
                                                line: 3,
                                                column: 36
                                              }
                                            },
                                            delegate: false,
                                            argument: {
                                              type: 'Literal',
                                              start: 85,
                                              end: 86,
                                              loc: {
                                                start: {
                                                  line: 3,
                                                  column: 35
                                                },
                                                end: {
                                                  line: 3,
                                                  column: 36
                                                }
                                              },
                                              value: 1,
                                              raw: '1'
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              type: 'MethodDefinition',
                              start: 110,
                              end: 129,
                              loc: {
                                start: {
                                  line: 4,
                                  column: 20
                                },
                                end: {
                                  line: 4,
                                  column: 39
                                }
                              },
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 111,
                                end: 113,
                                loc: {
                                  start: {
                                    line: 4,
                                    column: 21
                                  },
                                  end: {
                                    line: 4,
                                    column: 23
                                  }
                                },
                                name: 'g3'
                              },
                              static: false,
                              kind: 'method',
                              value: {
                                type: 'FunctionExpression',
                                start: 113,
                                end: 129,
                                loc: {
                                  start: {
                                    line: 4,
                                    column: 23
                                  },
                                  end: {
                                    line: 4,
                                    column: 39
                                  }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [],
                                body: {
                                  type: 'BlockStatement',
                                  start: 116,
                                  end: 129,
                                  loc: {
                                    start: {
                                      line: 4,
                                      column: 26
                                    },
                                    end: {
                                      line: 4,
                                      column: 39
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'BlockStatement',
                                      start: 118,
                                      end: 127,
                                      loc: {
                                        start: {
                                          line: 4,
                                          column: 28
                                        },
                                        end: {
                                          line: 4,
                                          column: 37
                                        }
                                      },
                                      body: [
                                        {
                                          type: 'ExpressionStatement',
                                          start: 119,
                                          end: 126,
                                          loc: {
                                            start: {
                                              line: 4,
                                              column: 29
                                            },
                                            end: {
                                              line: 4,
                                              column: 36
                                            }
                                          },
                                          expression: {
                                            type: 'YieldExpression',
                                            start: 119,
                                            end: 126,
                                            loc: {
                                              start: {
                                                line: 4,
                                                column: 29
                                              },
                                              end: {
                                                line: 4,
                                                column: 36
                                              }
                                            },
                                            delegate: false,
                                            argument: {
                                              type: 'Literal',
                                              start: 125,
                                              end: 126,
                                              loc: {
                                                start: {
                                                  line: 4,
                                                  column: 35
                                                },
                                                end: {
                                                  line: 4,
                                                  column: 36
                                                }
                                              },
                                              value: 1,
                                              raw: '1'
                                            }
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                }
                              }
                            },
                            {
                              type: 'MethodDefinition',
                              start: 150,
                              end: 177,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 20
                                },
                                end: {
                                  line: 5,
                                  column: 47
                                }
                              },
                              computed: false,
                              key: {
                                type: 'Identifier',
                                start: 151,
                                end: 153,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 21
                                  },
                                  end: {
                                    line: 5,
                                    column: 23
                                  }
                                },
                                name: 'g4'
                              },
                              static: false,
                              kind: 'method',
                              value: {
                                type: 'FunctionExpression',
                                start: 153,
                                end: 177,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 23
                                  },
                                  end: {
                                    line: 5,
                                    column: 47
                                  }
                                },
                                id: null,
                                generator: true,
                                expression: false,
                                async: false,
                                params: [],
                                body: {
                                  type: 'BlockStatement',
                                  start: 156,
                                  end: 177,
                                  loc: {
                                    start: {
                                      line: 5,
                                      column: 26
                                    },
                                    end: {
                                      line: 5,
                                      column: 47
                                    }
                                  },
                                  body: [
                                    {
                                      type: 'ExpressionStatement',
                                      start: 158,
                                      end: 175,
                                      loc: {
                                        start: {
                                          line: 5,
                                          column: 28
                                        },
                                        end: {
                                          line: 5,
                                          column: 45
                                        }
                                      },
                                      expression: {
                                        type: 'SequenceExpression',
                                        start: 158,
                                        end: 174,
                                        loc: {
                                          start: {
                                            line: 5,
                                            column: 28
                                          },
                                          end: {
                                            line: 5,
                                            column: 44
                                          }
                                        },
                                        expressions: [
                                          {
                                            type: 'YieldExpression',
                                            start: 158,
                                            end: 165,
                                            loc: {
                                              start: {
                                                line: 5,
                                                column: 28
                                              },
                                              end: {
                                                line: 5,
                                                column: 35
                                              }
                                            },
                                            delegate: false,
                                            argument: {
                                              type: 'Literal',
                                              start: 164,
                                              end: 165,
                                              loc: {
                                                start: {
                                                  line: 5,
                                                  column: 34
                                                },
                                                end: {
                                                  line: 5,
                                                  column: 35
                                                }
                                              },
                                              value: 1,
                                              raw: '1'
                                            }
                                          },
                                          {
                                            type: 'YieldExpression',
                                            start: 167,
                                            end: 174,
                                            loc: {
                                              start: {
                                                line: 5,
                                                column: 37
                                              },
                                              end: {
                                                line: 5,
                                                column: 44
                                              }
                                            },
                                            delegate: false,
                                            argument: {
                                              type: 'Literal',
                                              start: 173,
                                              end: 174,
                                              loc: {
                                                start: {
                                                  line: 5,
                                                  column: 43
                                                },
                                                end: {
                                                  line: 5,
                                                  column: 44
                                                }
                                              },
                                              value: 2,
                                              raw: '2'
                                            }
                                          }
                                        ]
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

        pass(`(class {})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(class {})`,
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
                        type: 'ClassExpression',
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
                        id: null,
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
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`(class A{})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(class A{})`,
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
                        type: 'ClassExpression',
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
                            name: 'A'
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
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

        pass(`(class extends A {})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(class extends A {})`,
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
                        type: 'ClassExpression',
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
                        id: null,
                        superClass: {
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
                            name: 'A'
                        },
                        body: {
                            type: 'ClassBody',
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

        pass(`(class A extends A {})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(class A extends A {})`,
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
                        type: 'ClassExpression',
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
                            name: 'A'
                        },
                        superClass: {
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
                            name: 'A'
                        },
                        body: {
                            type: 'ClassBody',
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
                }],
                sourceType: 'script'
            }
        });

        pass(`(class {get a() {}})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(class {get a() {}})`,
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
                        type: 'ClassExpression',
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
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 7,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 8,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                },
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
                                    name: 'a'
                                },
                                static: false,
                                kind: 'get',
                                value: {
                                    type: 'FunctionExpression',
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
                            }]
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`(class {set a(b) {'use strict';}})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(class {set a(b) {'use strict';}})`,
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
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'ClassExpression',
                        start: 1,
                        end: 33,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 33
                            }
                        },
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 7,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
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
                                    name: 'a'
                                },
                                static: false,
                                kind: 'set',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 13,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    },
                                    id: null,
                                    generator: false,
                                    expression: false,
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
                                        name: 'b'
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        start: 17,
                                        end: 32,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 32
                                            }
                                        },
                                        body: [{
                                            type: 'ExpressionStatement',
                                            directive: 'use strict',
                                            start: 18,
                                            end: 31,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 31
                                                }
                                            },
                                            expression: {
                                                type: 'Literal',
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
                                                value: 'use strict',
                                                raw: '\'use strict\''
                                            },
                                        }]
                                    }
                                }
                            }]
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`(class {prototype() {}})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(class {prototype() {}})`,
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
                        type: 'ClassExpression',
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
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 7,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 8,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                },
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 8,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    },
                                    name: 'prototype'
                                },
                                static: false,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
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
                                    id: null,
                                    generator: false,
                                    expression: false,
                                    async: false,
                                    params: [],
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
                            }]
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`(class {a() {}})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(class {a() {}})`,
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
                        type: 'ClassExpression',
                        start: 1,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        },
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
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
                            body: [{
                                type: 'MethodDefinition',
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
                                static: false,
                                kind: 'method',
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
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`(class {3() {}})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(class {3() {}})`,
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
                        type: 'ClassExpression',
                        start: 1,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        },
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
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
                            body: [{
                                type: 'MethodDefinition',
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
                                computed: false,
                                key: {
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
                                    value: 3,
                                    raw: '3'
                                },
                                static: false,
                                kind: 'method',
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
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`(class{[3+5](){}})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(class{[3+5](){}})`,
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
                        type: 'ClassExpression',
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
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
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
                            body: [{
                                type: 'MethodDefinition',
                                start: 7,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                },
                                computed: true,
                                key: {
                                    type: 'BinaryExpression',
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
                                    left: {
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
                                        value: 3,
                                        raw: '3'
                                    },
                                    operator: '+',
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
                                        value: 5,
                                        raw: '5'
                                    }
                                },
                                static: false,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
                                    start: 12,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
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
                                    params: [],
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
                            }]
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`(class extends (a,b) {})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(class extends (a,b) {})`,
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
                        type: 'ClassExpression',
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
                        id: null,
                        superClass: {
                            type: 'SequenceExpression',
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
                            expressions: [{
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
                                },
                                {
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
                                    name: 'b'
                                }
                            ]
                        },
                        body: {
                            type: 'ClassBody',
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

        pass(`var x = class extends (a,b) {};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `var x = class extends (a,b) {};`,
            expected: {
                type: 'Program',
                start: 0,
                end: 31,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 31
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 0,
                    end: 31,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 31
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
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
                            name: 'x'
                        },
                        init: {
                            type: 'ClassExpression',
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
                            superClass: {
                                type: 'SequenceExpression',
                                start: 23,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                },
                                expressions: [{
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
                                    },
                                    {
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
                                        name: 'b'
                                    }
                                ]
                            },
                            body: {
                                type: 'ClassBody',
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
                    }],
                    kind: 'var'
                }],
                sourceType: 'script'
            }
        });

        pass(`(class {static(){}})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(class {static(){}})`,
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
                        type: 'ClassExpression',
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
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 7,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
                                start: 8,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                },
                                computed: false,
                                key: {
                                    type: 'Identifier',
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
                                    name: 'static'
                                },
                                static: false,
                                kind: 'method',
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
                            }]
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`(class {static constructor(){}})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(class {static constructor(){}})`,
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
                        type: 'ClassExpression',
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
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            start: 7,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            },
                            body: [{
                                type: 'MethodDefinition',
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
                                computed: false,
                                key: {
                                    type: 'Identifier',
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
                                    name: 'constructor'
                                },
                                static: true,
                                kind: 'method',
                                value: {
                                    type: 'FunctionExpression',
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
                                    id: null,
                                    generator: false,
                                    expression: false,
                                    async: false,
                                    params: [],
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
                            }]
                        }
                    }
                }],
                sourceType: 'script'
            }
        });
    });
});
