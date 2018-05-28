import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Statements - For await of', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failures', () => {

        const Failures = [
            '(a = 1 of [])',
            '(var a = 0 in null)',
            '(var [a] = 0 in null)',
            '(a = 1 of [)',
            '(a  1 of [])',
            '(a = 1) of [])',
            '(a.b = 1 of [])',
            '((a.b = 1) of [])',
            '([a] = 1 of [])',
            '(([a] = 1) of [])',
            '([a = 1] = 1 of [])',
            '(([a = 1] = 1) of [])',
            '([a = 1 = 1, ...b] = 1 of [])',
            '(([a = 1 = 1, ...b] = 1) of [])',
            '({a} = 1 of [])',
            '(({a} = 1) of [])',
            '({a: a} = 1 of [])',
            '(({a: a} = 1) of [])',
            '({\'a\': a} = 1 of [])',
            '(({\'a\': a} = 1) of [])',
            '({"a": a} = 1 of [])',
            '(({"a": a} = 1) of [])',
            '({[Symbol.iterator]: a} = 1 of [])',
            '(({[Symbol.iterator]: a} = 1) of [])',
            '({0: a} = 1 of [])',
            '(({0: a} = 1) of [])',
            '({a = 1} = 1 of [])',
            '(({a = 1} = 1) of [])',
            '({a: a = 1} = 1 of [])',
            '(({a: a = 1} = 1) of [])',
            '({\'a\': a = 1} = 1 of [])',
            '(({\'a\': a = 1} = 1) of [])',
            '({"a": a = 1} = 1 of [])',
            '(({"a": a = 1} = 1) of [])',
            '({[Symbol.iterator]: a = 1} = 1 of [])',
            '(({[Symbol.iterator]: a = 1} = 1) of [])',
            '({0: a = 1} = 1 of [])',
            '(({0: a = 1} = 1) of [])',
            '(function a() {} of [])',
            '([1] of [])',
            '({a: 1} of [])',
            '(var a = 1 of [])',
            '(var a, b of [])',
            '(var [a] = 1 of [])',
            '(var [a], b of [])',
            '(var [a = 1] = 1 of [])',
            '(var [a = 1], b of [])',
            '(var [a = 1 = 1, ...b] of [])',
            '(var [a = 1, ...b], c of [])',
            '(var {a} = 1 of [])',
            '(var {a}, b of [])',
            '(var {a: a} = 1 of [])',
            '(var {a: a}, b of [])',
            '(var {\'a\': a} = 1 of [])',
            '(var {\'a\': a}, b of [])',
            '(var {"a": a} = 1 of [])',
            '(var {"a": a}, b of [])',
            '(var {[Symbol.iterator]: a} = 1 of [])',
            '(var {[Symbol.iterator]: a}, b of [])',
            '(var {0: a} = 1 of [])',
            '(var {0: a}, b of [])',
            '(var {a = 1} = 1 of [])',
            '(var {a = 1}, b of [])',
            '(var {a: a = 1} = 1 of [])',
            '(var {a: a = 1}, b of [])',
            '(var {\'a\': a = 1} = 1 of [])',
            '(var {\'a\': a = 1}, b of [])',
            '(var {"a": a = 1} = 1 of [])',
            '(var {"a": a = 1}, b of [])',
            '(var {[Symbol.iterator]: a = 1} = 1 of [])',
            '(var {[Symbol.iterator]: a = 1}, b of [])',
            '(var {0: a = 1} = 1 of [])',
            '(var {0: a = 1}, b of [])',
            '(let a = 1 of [])',
            '(let a, b of [])',
            '(let [a] = 1 of [])',
            '(let [a], b of [])',
            '(let [a = 1] = 1 of [])',
            '(let [a = 1], b of [])',
            '(let [a = 1, ...b] = 1 of [])',
            '(let [a = 1, ...b], c of [])',
            '(let {a} = 1 of [])',
            '(let {a}, b of [])',
            '(let {a: a} = 1 of [])',
            '(let {a: a}, b of [])',
            '(let {\'a\': a} = 1 of [])',
            '(let {\'a\': a}, b of [])',
            '(let {"a": a} = 1 of [])',
            '(let {"a": a}, b of [])',
            '(let {[Symbol.iterator]: a} = 1 of [])',
            '(let {[Symbol.iterator]: a}, b of [])',
            '(let {0: a} = 1 of [])',
            '(let {0: a}, b of [])',
            '(let {a = 1} = 1 of [])',
            '(let {a = 1}, b of [])',
            '(let {a: a = 1} = 1 of [])',
            '(let {a: a = 1}, b of [])',
            '(let {\'a\': a = 1} = 1 of [])',
            '(let {\'a\': a = 1}, b of [])',
            '(let {"a": a = 1} = 1 of [])',
            '(let {"a": a = 1}, b of [])',
            '(let {[Symbol.iterator]: a = 1} = 1 of [])',
            '(let {[Symbol.iterator]: a = 1}, b of [])',
            '(let {0: a = 1} = 1 of [])',
            '(let {0: a = 1}, b of [])',
            '(const a = 1 of [])',
            '(const a, b of [])',
            '(const [a] = 1 of [])',
            '(const [a], b of [])',
            '(const [a = 1] = 1 of [])',
            '(const [a = 1], b of [])',
            '(const [a = 1, ...b] = 1 of [])',
            '(const [a = 1, ...b], b of [])',
            '(const {a} = 1 of [])',
            '(cons  {a} = 1 of [])',
            '(const {a = 1 of [])',
            '(const {a} = 1 of of [])',
            '(const {a} = 1 of in [])',
            '(const {a}, b of [])',
            '(const {a: a} = 1 of [])',
            '(const {a: a}, b of [])',
            '(const {\'a\': a} = 1 of [])',
            '(const {\'a\': a}, b of [])',
            '(const {"a": a} = 1 of [])',
            '(const {"a": a}, b of [])',
            '(const {[Symbol.iterator]: a} = 1 of [])',
            '(const {[Symbol.iterator]: a}, b of [])',
            '(const {0: a} = 1 of [])',
            '(const {0: a}, b of [])',
            '(const {a = 1} = 1 of [])',
            '(const {a = 1}, b of [])',
            '(const {a: a = 1} = 1 of [])',
            '(const {a: a = 1}, b of [])',
            '(const {\'a\': a = 1} = 1 of [])',
            '(const {\'a\': a = 1} = 1 of [)',
            '(const {\'a: a = 1} = 1 of [)',
            '(const {\'a\': a = 1}, b of [])',
            '(const {"a": a = 1} = 1 of [])',
            '(const {"a": a = 1}, b of [])',
            '(const {[Symbol.iterator]: a = 1} = 1 of [])',
            '(const {[Symbol.iterator]: a = 1}, b of [])',
            '(const {0: a = 1} = 1 of [])',
            '(const {0: a = 1}, b of [])',
            '(let [...x, y] of [[1, 2, 3]])',
            '(let [...[x], y] of [[1, 2, 3]])',
            '(let [...x, y] of [[1, 2, 3]])',
            '(let [...{ x }, y] of [[1, 2, 3]])',
            '(const [...[ x ] = []] of [[]])',
            '(const [...x, y] of [[1, 2, 3]])',
            '(var [...x = []] of [[]])',
            '(const [...x = []] of [[]])',
            '([[(x, y)]] of [[[]]])',
            '([[(x, y)]] of [[[]])',
            '(let [...x, y] of [[1, 2, 3]])',
            '(let [...[ x ] = []] of (async function*() {yield* [[]];})())',
            '(constt [...[x], y] of (async function*() {  yield* [[1, 2, 3]]; })())',
            '(let [...[x], y] of (async function*() {  yield* [[1, 2, 3]]; })())',
       ];

        for (const arg of Failures) {
            it(`async function f() { for await ${arg} { } } `, () => {
                t.throws(() => {
                    parseSource(`async function f() { for await ${arg} { } }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { for await ${arg} { } }`, () => {
                t.throws(() => {
                    parseSource(`async function * f() { for await ${arg} { } }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { for await ${arg} { } }`, () => {
                t.throws(() => {
                    parseSource(`async function * f() { for await ${arg} { } }`, undefined, Context.Empty);
                });
            });

            it(`async function f() { 'use strict'; for await ${arg}; }`, () => {
                t.throws(() => {
                    parseSource(`async function f() { 'use strict'; for await ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { 'use strict'; for await ${arg}; }`, () => {
                t.throws(() => {
                    parseSource(`async function * f() { 'use strict'; for await ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { 'use strict'; for await ${arg} { } }`, () => {
                t.throws(() => {
                    parseSource(`async function * f() { 'use strict'; for await ${arg} { } }`, undefined, Context.Empty);
                });
            });
        }

        fail('async function fn() { for await ([[x[yield]]] of [[[]]]) }', Context.Empty, {
            source: 'async function fn() { for await ([[x[yield]]] of [[[]]]) }',
        });

        fail('async function fn() { for await ([ x[yield] ] of [[]]) }', Context.Empty, {
            source: 'async function fn() { for await ([ x[yield] ] of [[]]) }',
        });

        fail('async function fn() { for await ([ x[yield] ] of [[]]) }', Context.Empty, {
            source: 'async function fn() { for await ([ x[yield] ] of [[]])',
        });

        fail('for await ([ x[yield] ] of [[]]) }', Context.Empty, {
            source: 'for await ([ x[yield] ] of [[]]) }',
        });

        fail('for await ([ x[yield] ] in [[]]) }', Context.Empty, {
            source: 'for await ([ x[yield] ] in [[]]) }',
        });

        fail('for await (let [...{ x } = []] = []; a < 1; ) {}', Context.Async, {
            source: 'for await (let [...{ x } = []] = []; a < 1; ) {}',
        });

        fail('for await (let [...{ x } = []] = []; a < 1; ) {}', Context.Strict, {
            source: 'for await (let [...{ x } = []] = []; a < 1; ) {}',
        });
    });

    describe('Pass', () => {

        const test262 = [
            '([ _ = flag1 = true, _ = flag2 = true ] of [[14]])',
            '([ xFnexp = function x() {}, fnexp = function() {} ] of [[]])',
            '([arguments = 4, eval = 5] of [[]])',
            '([[ _ ]] of [[null]])',
            '([[ _ ]] of [[ , ]])',
            '([{ x }] of [[null]])',
            '([{ x }] of [[undefined]])',
            '([{ x }] of [[{ x: 2 }]])',
            '([x.y] of [[23]])',
            `([,] of ['string literal'

        ])`,
            '([...[x]] of [[ , ]])',
            '([...[x]] of [[undefined]])',
            '([...[x]] of [[]])',
            '([...[x[yield]]] of [[86]])',
            '([...{ 0: x, length }] of [[null]])',
            '([...{ 0: x, length }] of [[ , ]])',
            '([ ...a ] of [[]])',
            '({} of [false])',
            `({} of [0
            ])`,
            '({ x } of [{ x: 1 }])',
            '({ x = 1 } of [{ x: null }])',
            '({ x = 1 } of [{ x: 2 }])',
            '({ a } of [{}])',
            '({ x: x[yield] } of [{ x: 23 }])',
            '({ a: x } of [{ a: 1 }])',
            '({ a: x, } of [{ a: 2 }])',
            '({ xy: x.y } of [{ xy: 4 }])',
            '({...rest} of [{}])',
            '(const [[] = function() {}()] of [[[23]]])',
            '(const [[...x] = [2, 1, 3]] of [[]])',
            '(const [x = 23] of [[undefined]])',
            '(const [{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] of [[]])',
            '(const [...{ 0: v, 1: w, 2: x, 3: y, length: z }] of [[7, 8, 9]])',
            '(const [[,] = g()] of (async function*() { yield* [[[]]]; })())',
            '(const [x = 23] of (async function*() { yield* [[,]]; })())',
            '(const {a, b, ...rest} of (async function*() { yield* [{x: 1, y: 2, a: 5, b: 3}]; })())',
            '(const [x = 23]  of (async function*() { yield* [[,]]; })())',
            '(const { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: undefined }])',
            '(const {} of [null])',
            '(let [x] of [{}])',
            '(let [[] = function() {}()] of [[[23]]])',
            '(let [x = 23] of [[]])',
            '(let [w = a(), x = b(), y = c(), z = d()] of [[null, 0, false, \'\']])',
            '(let [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[]])',
            '(let [...[,]] of [g()])',
            '(let [, ...x] of [(function*() {})()])',
            '(let [[x, y, z] = [4, 5, 6]] of (async function*() {  yield* [[]]; })())',
            '(let [...{ 0: v, 1: w, 2: x, 3: y, length: z }] of (async function*() {yield* [[7, 8, 9]]; })())',
            '(let [[x, y, z] = [4, 5, 6]] of (async function*() {  yield* [[]]; })())',
            '(let { a } of [b])',
            '(let { x: y = function() {} } of [{}])',
            '(let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: undefined }])',
            '(var [[x, y, z] = [4, 5, 6]] of [[[7, 8, 9]]])',
            '(var [x = 23] of [[,]])',
            '(var [x = 23] of [[undefined]])',
            '({ a: x, y } of [{ a: 3 }])',
            '({ x: { y } } of [{ x: { y: 2 } }])',
            '({...src.y} of [{ x: 1, y: 2}])',
            '(const [arrow = () => {}] of [[]])',
        ];

        for (const arg of test262) {

            it(`async function f() { ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function f() { for await ${arg} {} }`, undefined, Context.Empty);
                });
            });
        }

        const programs = [
            '(a of [])',
            '(a.b of [])',
            '([a] of [])',
            '([a = 1] of [])',
            '([a = 1, ...b] of [])',
            '({a} of [])',
            '({a: a} of [])',
            '({\'a\': a} of [])',
            '({"a": a} of [])',
            '({[Symbol.iterator]: a} of [])',
            '({0: a} of [])',
            '({a = 1} of [])',
            '({a: a = 1} of [])',
            '({\'a\': a = 1} of [])',
            '({"a": a = 1} of [])',
            '({[Symbol.iterator]: a = 1} of [])',
            '({0: a = 1} of [])',
            '(var a of [])',
            '(var [a] of [])',
            '(var [a = 1] of [])',
            '(var [a = 1, ...b] of [])',
            '(var {a} of [])',
            '(var {a: a} of [])',
            '(var {\'a\': a} of [])',
            '(var {"a": a} of [])',
            '(var {[Symbol.iterator]: a} of [])',
            '(var {0: a} of [])',
            '(var {a = 1} of [])',
            '(var {a: a = 1} of [])',
            '(var {\'a\': a = 1} of [])',
            '(var {"a": a = 1} of [])',
            '(var {[Symbol.iterator]: a = 1} of [])',
            '(var {0: a = 1} of [])',
            '(let a of [])',
            '(let [a] of [])',
            '(let [a = 1] of [])',
            '(let [a = 1, ...b] of [])',
            '(let {a} of [])',
            '(let {a: a} of [])',
            '(let {\'a\': a} of [])',
            '(let {"a": a} of [])',
            '(let {[Symbol.iterator]: a} of [])',
            '(let {0: a} of [])',
            '(let {a = 1} of [])',
            '(let {a: a = 1} of [])',
            '(let {\'a\': a = 1} of [])',
            '(let {"a": a = 1} of [])',
            '(let {[Symbol.iterator]: a = 1} of [])',
            '(let {0: a = 1} of [])',
            '(const a of [])',
            '(const [a] of [])',
            '(const [a = 1] of [])',
            '(const [a = 1, ...b] of [])',
            '(const {a} of [])',
            '(const {a: a} of [])',
            '(const {\'a\': a} of [])',
            '(const {"a": a} of [])',
            '(const {[Symbol.iterator]: a} of [])',
            '(const {0: a} of [])',
            '(const {a = 1} of [])',
            '(const {a: a = 1} of [])',
            '(const {\'a\': a = 1} of [])',
            '(const {"a": a = 1} of [])',
            '(const {[Symbol.iterator]: a = 1} of [])',
            '(const {0: a = 1} of [])',
            '(let x in y)',
            '(let x of y)',

        ];

        for (const arg of programs) {
            it(`async function f() { 'use strict'; let a; for await ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function f() { 'use strict'; let a; for await ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function f() { let a; for await ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function f() { let a; for await ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function f() { for await ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function f() { for await ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { let a; for\nawait ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function * f() { let a; for\nawait ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { let a; for\nawait ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function * f() { let a; for\nawait ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function f() { 'use strict'; for\nawait ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function f() { 'use strict'; for\nawait ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { for await\n ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function * f() { for await\n ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { 'use strict'; let a; for await\n ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function * f() { 'use strict'; let a; for await\n ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { 'use strict'; let a; for await\n ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function * f() { 'use strict'; let a; for await\n ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { for await ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function * f() { for await ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function f() { for\nawait ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function f() { for\nawait ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { 'use strict'; for await ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function * f() { 'use strict'; for await ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { 'use strict'; for\nawait ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function * f() { 'use strict'; for\nawait ${arg}; }`, undefined, Context.Empty);
                });
            });
        }

        fail('for await (const line of readLines(filePath)) {\n  console.log(line);\n}', Context.Empty, {
            source: 'for await (const line of readLines(filePath)) {\n  console.log(line);\n}',
       });

        fail('for await (const line of readLines(filePath)) {\n  console.log(line);\n}', Context.Empty, {
        source: 'for await (const line of readLines(filePath)) {\n  console.log(line);\n}',
        });

        pass(`async function* f() {
            for await (var x of []) let // ASI
            {}
          }`, Context.Empty, {
            source: `async function* f() {
                for await (var x of []) let // ASI
                {}
              }`,
            expected: {
                  body: [
                    {
                      async: true,
                      body: {
                        body: [
                          {
                            await: true,
                            body: {
                              expression: {
                                name: 'let',
                                type: 'Identifier',
                              },
                              type: 'ExpressionStatement'
                            },
                            left: {
                              declarations: [
                                {
                                  id: {
                                    name: 'x',
                                   type: 'Identifier',
                                  },
                                  init: null,
                                  type: 'VariableDeclarator',
                                },
                              ],
                              kind: 'var',
                              type: 'VariableDeclaration',
                            },
                            right: {
                              elements: [],
                              type: 'ArrayExpression',
                            },
                            type: 'ForOfStatement',
                          },
                          {
                            body: [],
                            type: 'BlockStatement',
                          },
                        ],
                        type: 'BlockStatement',
                      },
                      expression: false,
                      generator: true,
                      id: {
                       name: 'f',
                        type: 'Identifier',
                      },
                      params: [],
                      type: 'FunctionDeclaration',
                    },
                  ],
                  sourceType: 'script',
                  type: 'Program',
                }
        });

        pass(`async function f() { for await (a of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await (a of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
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
                            },
                            left: {
                                type: 'Identifier',
                                name: 'a',
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
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                                }
                            },
                            await: true,
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
                            }
                        }],
                        start: 19,
                        end: 43,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 43
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    }
                }],
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
                }
            }
        });

        pass(`async function f() { for await (a.b of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await (a.b of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
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
                                }
                            },
                            left: {
                                type: 'MemberExpression',
                                object: {
                                    type: 'Identifier',
                                    name: 'a',
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
                                },
                                computed: false,
                                property: {
                                    type: 'Identifier',
                                    name: 'b',
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
                                start: 32,
                                end: 35,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 35
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                                }
                            },
                            await: true,
                            start: 21,
                            end: 43,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 43
                                }
                            }
                        }],
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
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                }],
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
            }
        });

        pass(`async function f() { for await ([a] of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await ([a] of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
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
                                }
                            },
                            left: {
                                type: 'ArrayPattern',
                                elements: [{
                                    type: 'Identifier',
                                    name: 'a',
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
                                }],
                                start: 32,
                                end: 35,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 35
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                                }
                            },
                            await: true,
                            start: 21,
                            end: 43,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 43
                                }
                            }
                        }],
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
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                }],
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
            }
        });

        pass(`async function f() { for await ([a = 1] of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await ([a = 1] of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
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
                                }
                            },
                            left: {
                                type: 'ArrayPattern',
                                elements: [{
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    },
                                    right: {
                                        type: 'Literal',
                                        value: 1,
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
                                        raw: '1'
                                    },
                                    start: 33,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 38
                                        }
                                    }
                                }],
                                start: 32,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                                }
                            },
                            await: true,
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
                            }
                        }],
                        start: 19,
                        end: 49,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 49
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    }
                }],
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
                }
            }
        });

        pass(`async function f() { for await ([a = 1, ...b] of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await ([a = 1, ...b] of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
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
                            },
                            left: {
                                type: 'ArrayPattern',
                                elements: [{
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 1,
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
                                            raw: '1'
                                        },
                                        start: 33,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 38
                                            }
                                        }
                                    },
                                    {
                                        type: 'RestElement',
                                        argument: {
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
                                        start: 40,
                                        end: 44,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 40
                                            },
                                            end: {
                                                line: 1,
                                                column: 44
                                            }
                                        }
                                    }
                                ],
                                start: 32,
                                end: 45,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 45
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
                                start: 49,
                                end: 51,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 49
                                    },
                                    end: {
                                        line: 1,
                                        column: 51
                                    }
                                }
                            },
                            await: true,
                            start: 21,
                            end: 53,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 53
                                }
                            }
                        }],
                        start: 19,
                        end: 55,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 55
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                }],
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

        pass(`async function f() { for await ({a} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await ({a} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
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
                                }
                            },
                            left: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
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
                                }],
                                start: 32,
                                end: 35,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 35
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                                }
                            },
                            await: true,
                            start: 21,
                            end: 43,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 43
                                }
                            }
                        }],
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
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                }],
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
            }
        });

        pass(`async function f() { for await ({a: a} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await ({a: a} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
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
                            },
                            left: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 33,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    }
                                }],
                                start: 32,
                                end: 38,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 38
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
                                start: 42,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 42
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            },
                            await: true,
                            start: 21,
                            end: 46,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 46
                                }
                            }
                        }],
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
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    }
                }],
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
                }
            }
        });

        pass(`async function f() { for await ({'a': a} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await ({'a': a} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
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
                            },
                            left: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Literal',
                                        value: 'a',
                                        start: 33,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        },
                                        raw: '\'a\''
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 33,
                                    end: 39,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 39
                                        }
                                    }
                                }],
                                start: 32,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 40
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                                }
                            },
                            await: true,
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
                            }
                        }],
                        start: 19,
                        end: 50,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 50
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    }
                }],
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
                }
            }
        });

        pass(`async function f() { for await ({[Symbol.iterator]: a} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await ({[Symbol.iterator]: a} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
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
                                }
                            },
                            left: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'MemberExpression',
                                        object: {
                                            type: 'Identifier',
                                            name: 'Symbol',
                                            start: 34,
                                            end: 40,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 34
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 40
                                                }
                                            }
                                        },
                                        computed: false,
                                        property: {
                                            type: 'Identifier',
                                            name: 'iterator',
                                            start: 41,
                                            end: 49,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 41
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 49
                                                }
                                            }
                                        },
                                        start: 34,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 34
                                            },
                                            end: {
                                                line: 1,
                                                column: 49
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    },
                                    kind: 'init',
                                    computed: true,
                                    method: false,
                                    shorthand: false,
                                    start: 33,
                                    end: 53,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 53
                                        }
                                    }
                                }],
                                start: 32,
                                end: 54,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 54
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
                                start: 58,
                                end: 60,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 58
                                    },
                                    end: {
                                        line: 1,
                                        column: 60
                                    }
                                }
                            },
                            await: true,
                            start: 21,
                            end: 62,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 62
                                }
                            }
                        }],
                        start: 19,
                        end: 64,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 64
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    start: 0,
                    end: 64,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 64
                        }
                    }
                }],
                start: 0,
                end: 64,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 64
                    }
                }
            }
        });

        pass(`async function f() { for await ({0: a} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await ({0: a} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
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
                            },
                            left: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Literal',
                                        value: 0,
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
                                        raw: '0'
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 33,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    }
                                }],
                                start: 32,
                                end: 38,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 38
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
                                start: 42,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 42
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            },
                            await: true,
                            start: 21,
                            end: 46,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 46
                                }
                            }
                        }],
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
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    }
                }],
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
                }
            }
        });

        pass(`async function f() { for await ({a = 1} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await ({a = 1} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
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
                                }
                            },
                            left: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    },
                                    value: {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 1,
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
                                            raw: '1'
                                        },
                                        start: 33,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 38
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 33,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 38
                                        }
                                    }
                                }],
                                start: 32,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                                }
                            },
                            await: true,
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
                            }
                        }],
                        start: 19,
                        end: 49,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 49
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    }
                }],
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
                }
            }
        });

        pass(`async function f() { for await ({a: a = 1} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await ({a: a = 1} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
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
                                }
                            },
                            left: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    },
                                    value: {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        right: {
                                            type: 'Literal',
                                            value: 1,
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
                                            raw: '1'
                                        },
                                        start: 36,
                                        end: 41,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 41
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
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
                                    }
                                }],
                                start: 32,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                                }
                            },
                            await: true,
                            start: 21,
                            end: 50,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 50
                                }
                            }
                        }],
                        start: 19,
                        end: 52,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 52
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    }
                }],
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
                }
            }
        });

        pass(`async function f() { for await ({'a': a = 1} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await ({'a': a = 1} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
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
                                }
                            },
                            left: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Literal',
                                        value: 'a',
                                        start: 33,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        },
                                        raw: '\'a\''
                                    },
                                    value: {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 1,
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
                                            raw: '1'
                                        },
                                        start: 38,
                                        end: 43,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 38
                                            },
                                            end: {
                                                line: 1,
                                                column: 43
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 33,
                                    end: 43,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 43
                                        }
                                    }
                                }],
                                start: 32,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                            await: true,
                            start: 21,
                            end: 52,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 52
                                }
                            }
                        }],
                        start: 19,
                        end: 54,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 54
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                }],
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
            }
        });

        pass(`async function f() { for await ({[Symbol.iterator]: a = 1} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await ({[Symbol.iterator]: a = 1} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
                                start: 65,
                                end: 66,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 65
                                    },
                                    end: {
                                        line: 1,
                                        column: 66
                                    }
                                }
                            },
                            left: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'MemberExpression',
                                        object: {
                                            type: 'Identifier',
                                            name: 'Symbol',
                                            start: 34,
                                            end: 40,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 34
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 40
                                                }
                                            }
                                        },
                                        computed: false,
                                        property: {
                                            type: 'Identifier',
                                            name: 'iterator',
                                            start: 41,
                                            end: 49,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 41
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 49
                                                }
                                            }
                                        },
                                        start: 34,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 34
                                            },
                                            end: {
                                                line: 1,
                                                column: 49
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 1,
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
                                            },
                                            raw: '1'
                                        },
                                        start: 52,
                                        end: 57,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 52
                                            },
                                            end: {
                                                line: 1,
                                                column: 57
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: true,
                                    method: false,
                                    shorthand: false,
                                    start: 33,
                                    end: 57,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 57
                                        }
                                    }
                                }],
                                start: 32,
                                end: 58,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 58
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
                                start: 62,
                                end: 64,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 62
                                    },
                                    end: {
                                        line: 1,
                                        column: 64
                                    }
                                }
                            },
                            await: true,
                            start: 21,
                            end: 66,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 66
                                }
                            }
                        }],
                        start: 19,
                        end: 68,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 68
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    start: 0,
                    end: 68,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 68
                        }
                    }
                }],
                start: 0,
                end: 68,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 68
                    }
                }
            }
        });

        pass(`async function f() { for await ({0: a = 1} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await ({0: a = 1} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
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
                                }
                            },
                            left: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Literal',
                                        value: 0,
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
                                        raw: '0'
                                    },
                                    value: {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        right: {
                                            type: 'Literal',
                                            value: 1,
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
                                            raw: '1'
                                        },
                                        start: 36,
                                        end: 41,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 41
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
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
                                    }
                                }],
                                start: 32,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                                }
                            },
                            await: true,
                            start: 21,
                            end: 50,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 50
                                }
                            }
                        }],
                        start: 19,
                        end: 52,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 52
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    }
                }],
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
                }
            }
        });

        pass(`async function f() { for await (var {'a': a} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await (var {'a': a} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
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
                                }
                            },
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'ObjectPattern',
                                        properties: [{
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 'a',
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
                                                },
                                                raw: '\'a\''
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            start: 37,
                                            end: 43,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 37
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 43
                                                }
                                            }
                                        }],
                                        start: 36,
                                        end: 44,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 44
                                            }
                                        }
                                    },
                                    start: 36,
                                    end: 44,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 44
                                        }
                                    }
                                }],
                                kind: 'var',
                                start: 32,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                            await: true,
                            start: 21,
                            end: 52,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 52
                                }
                            }
                        }],
                        start: 19,
                        end: 54,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 54
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                }],
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
            }
        });

        pass(`async function f() { for await (var {[Symbol.iterator]: a} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await (var {[Symbol.iterator]: a} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
                                start: 65,
                                end: 66,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 65
                                    },
                                    end: {
                                        line: 1,
                                        column: 66
                                    }
                                }
                            },
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'ObjectPattern',
                                        properties: [{
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'MemberExpression',
                                                object: {
                                                    type: 'Identifier',
                                                    name: 'Symbol',
                                                    start: 38,
                                                    end: 44,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 38
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 44
                                                        }
                                                    }
                                                },
                                                computed: false,
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'iterator',
                                                    start: 45,
                                                    end: 53,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 45
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 53
                                                        }
                                                    }
                                                },
                                                start: 38,
                                                end: 53,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 38
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 53
                                                    }
                                                }
                                            },
                                            computed: true,
                                            value: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                            },
                                            method: false,
                                            shorthand: false,
                                            start: 37,
                                            end: 57,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 37
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 57
                                                }
                                            }
                                        }],
                                        start: 36,
                                        end: 58,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 58
                                            }
                                        }
                                    },
                                    start: 36,
                                    end: 58,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 58
                                        }
                                    }
                                }],
                                kind: 'var',
                                start: 32,
                                end: 58,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 58
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
                                start: 62,
                                end: 64,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 62
                                    },
                                    end: {
                                        line: 1,
                                        column: 64
                                    }
                                }
                            },
                            await: true,
                            start: 21,
                            end: 66,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 66
                                }
                            }
                        }],
                        start: 19,
                        end: 68,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 68
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    start: 0,
                    end: 68,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 68
                        }
                    }
                }],
                start: 0,
                end: 68,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 68
                    }
                }
            }
        });

        pass(`async function f() { for await (var {0: a} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await (var {0: a} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
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
                                }
                            },
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'ObjectPattern',
                                        properties: [{
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 0,
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
                                                raw: '0'
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                            },
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
                                        }],
                                        start: 36,
                                        end: 42,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 42
                                            }
                                        }
                                    },
                                    start: 36,
                                    end: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 42
                                        }
                                    }
                                }],
                                kind: 'var',
                                start: 32,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                                }
                            },
                            await: true,
                            start: 21,
                            end: 50,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 50
                                }
                            }
                        }],
                        start: 19,
                        end: 52,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 52
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    }
                }],
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
                }
            }
        });

        pass(`async function f() { for await (var {a: a = 1} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await (var {a: a = 1} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
                                start: 53,
                                end: 54,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 53
                                    },
                                    end: {
                                        line: 1,
                                        column: 54
                                    }
                                }
                            },
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'ObjectPattern',
                                        properties: [{
                                            type: 'Property',
                                            kind: 'init',
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
                                            computed: false,
                                            value: {
                                                type: 'AssignmentPattern',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'a',
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
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 1,
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
                                                    raw: '1'
                                                },
                                                start: 40,
                                                end: 45,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 40
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 45
                                                    }
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            start: 37,
                                            end: 45,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 37
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 45
                                                }
                                            }
                                        }],
                                        start: 36,
                                        end: 46,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 46
                                            }
                                        }
                                    },
                                    start: 36,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 46
                                        }
                                    }
                                }],
                                kind: 'var',
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
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                            await: true,
                            start: 21,
                            end: 54,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 54
                                }
                            }
                        }],
                        start: 19,
                        end: 56,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 56
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                }],
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
            }
        });

        pass(`async function f() { for await (var {'a': a = 1} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await (var {'a': a = 1} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
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
                            },
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'ObjectPattern',
                                        properties: [{
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 'a',
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
                                                },
                                                raw: '\'a\''
                                            },
                                            computed: false,
                                            value: {
                                                type: 'AssignmentPattern',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'a',
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
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 1,
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
                                                    raw: '1'
                                                },
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
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            start: 37,
                                            end: 47,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 37
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 47
                                                }
                                            }
                                        }],
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
                                }],
                                kind: 'var',
                                start: 32,
                                end: 48,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 48
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                            await: true,
                            start: 21,
                            end: 56,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 56
                                }
                            }
                        }],
                        start: 19,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 58
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    }
                }],
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
                }
            }
        });

        pass(`async function f() { for await (var {0: a = 1} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await (var {0: a = 1} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
                                start: 53,
                                end: 54,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 53
                                    },
                                    end: {
                                        line: 1,
                                        column: 54
                                    }
                                }
                            },
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'ObjectPattern',
                                        properties: [{
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 0,
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
                                                raw: '0'
                                            },
                                            computed: false,
                                            value: {
                                                type: 'AssignmentPattern',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'a',
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
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 1,
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
                                                    raw: '1'
                                                },
                                                start: 40,
                                                end: 45,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 40
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 45
                                                    }
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            start: 37,
                                            end: 45,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 37
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 45
                                                }
                                            }
                                        }],
                                        start: 36,
                                        end: 46,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 46
                                            }
                                        }
                                    },
                                    start: 36,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 46
                                        }
                                    }
                                }],
                                kind: 'var',
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
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                            await: true,
                            start: 21,
                            end: 54,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 54
                                }
                            }
                        }],
                        start: 19,
                        end: 56,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 56
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                }],
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
            }
        });

        pass(`async function f() { for await (let a of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await (let a of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
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
                            },
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                }],
                                kind: 'let',
                                start: 32,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 37
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                            await: true,
                            start: 21,
                            end: 45,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 45
                                }
                            }
                        }],
                        start: 19,
                        end: 47,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 47
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    }
                }],
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
                }
            }
        });

        pass(`async function f() { for await (let [a] of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await (let [a] of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
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
                                }
                            },
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'ArrayPattern',
                                        elements: [{
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
                                        }],
                                        start: 36,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        }
                                    },
                                    start: 36,
                                    end: 39,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 39
                                        }
                                    }
                                }],
                                kind: 'let',
                                start: 32,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                                }
                            },
                            await: true,
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
                            }
                        }],
                        start: 19,
                        end: 49,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 49
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    }
                }],
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
                }
            }
        });

        pass(`async function f() { for await (let {'a': a} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await (let {'a': a} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
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
                                }
                            },
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'ObjectPattern',
                                        properties: [{
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 'a',
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
                                                },
                                                raw: '\'a\''
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            start: 37,
                                            end: 43,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 37
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 43
                                                }
                                            }
                                        }],
                                        start: 36,
                                        end: 44,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 44
                                            }
                                        }
                                    },
                                    start: 36,
                                    end: 44,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 44
                                        }
                                    }
                                }],
                                kind: 'let',
                                start: 32,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                            await: true,
                            start: 21,
                            end: 52,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 52
                                }
                            }
                        }],
                        start: 19,
                        end: 54,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 54
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                }],
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
            }
        });

        pass(`async function f() { for await (let {'a': a = 1} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await (let {'a': a = 1} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
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
                            },
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'ObjectPattern',
                                        properties: [{
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 'a',
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
                                                },
                                                raw: '\'a\''
                                            },
                                            computed: false,
                                            value: {
                                                type: 'AssignmentPattern',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'a',
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
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 1,
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
                                                    raw: '1'
                                                },
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
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
                                            start: 37,
                                            end: 47,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 37
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 47
                                                }
                                            }
                                        }],
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
                                }],
                                kind: 'let',
                                start: 32,
                                end: 48,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 48
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                            await: true,
                            start: 21,
                            end: 56,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 56
                                }
                            }
                        }],
                        start: 19,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 58
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    }
                }],
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
                }
            }
        });

        pass(`async function f() { for await (const {'a': a} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await (const {'a': a} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
                                type: 'EmptyStatement',
                                start: 53,
                                end: 54,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 53
                                    },
                                    end: {
                                        line: 1,
                                        column: 54
                                    }
                                }
                            },
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'ObjectPattern',
                                        properties: [{
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 'a',
                                                start: 39,
                                                end: 42,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 39
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 42
                                                    }
                                                },
                                                raw: '\'a\''
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                            },
                                            method: false,
                                            shorthand: false,
                                            start: 39,
                                            end: 45,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 39
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 45
                                                }
                                            }
                                        }],
                                        start: 38,
                                        end: 46,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 38
                                            },
                                            end: {
                                                line: 1,
                                                column: 46
                                            }
                                        }
                                    },
                                    start: 38,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 38
                                        },
                                        end: {
                                            line: 1,
                                            column: 46
                                        }
                                    }
                                }],
                                kind: 'const',
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
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                            await: true,
                            start: 21,
                            end: 54,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 54
                                }
                            }
                        }],
                        start: 19,
                        end: 56,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 56
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                }],
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
            }
        });

        pass(`async function f() { for await (const {0: a = 1} of []); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function f() { for await (const {0: a = 1} of []); }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ForOfStatement',
                            body: {
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
                            },
                            left: {
                                type: 'VariableDeclaration',
                                declarations: [{
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'ObjectPattern',
                                        properties: [{
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 0,
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
                                                raw: '0'
                                            },
                                            computed: false,
                                            value: {
                                                type: 'AssignmentPattern',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'a',
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
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 1,
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
                                                    raw: '1'
                                                },
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
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
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
                                            }
                                        }],
                                        start: 38,
                                        end: 48,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 38
                                            },
                                            end: {
                                                line: 1,
                                                column: 48
                                            }
                                        }
                                    },
                                    start: 38,
                                    end: 48,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 38
                                        },
                                        end: {
                                            line: 1,
                                            column: 48
                                        }
                                    }
                                }],
                                kind: 'const',
                                start: 32,
                                end: 48,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 48
                                    }
                                }
                            },
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                            await: true,
                            start: 21,
                            end: 56,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 56
                                }
                            }
                        }],
                        start: 19,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 58
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    }
                }],
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
                }
            }
        });

        pass(`async function f() { let a; for\nawait (a of []); }`, Context.Empty, {
            source: `async function f() { let a; for\nawait (a of []); }`,
            expected: {
                body: [{
                    async: true,
                    body: {
                        body: [{
                                declarations: [{
                                    id: {
                                        name: 'a',
                                        type: 'Identifier',
                                    },
                                    init: null,
                                    type: 'VariableDeclarator',
                                }, ],
                                kind: 'let',
                                type: 'VariableDeclaration',
                            },
                            {
                                await: true,
                                body: {
                                    type: 'EmptyStatement',
                                },
                                left: {
                                    name: 'a',
                                    type: 'Identifier',
                                },
                                right: {
                                    elements: [],
                                    type: 'ArrayExpression',
                                },
                                type: 'ForOfStatement',
                            },
                        ],
                        type: 'BlockStatement'
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: 'f',
                        type: 'Identifier',
                    },
                    params: [],
                    type: 'FunctionDeclaration',
                }, ],
                sourceType: 'script',
                type: 'Program',
            }
        });

        pass(`async function f() { let a; for await\n ({a = 1} of []); }`, Context.Empty, {
            source: `async function f() { let a; for await\n ({a = 1} of []); }`,
            expected: {
                body: [{
                    async: true,
                    body: {
                        body: [{
                                declarations: [{
                                    id: {
                                        name: 'a',
                                        type: 'Identifier',
                                    },
                                    init: null,
                                    type: 'VariableDeclarator'
                                }],
                                kind: 'let',
                                type: 'VariableDeclaration',
                            },
                            {
                                await: true,
                                body: {
                                    type: 'EmptyStatement',
                                },
                                left: {
                                    properties: [{
                                        computed: false,
                                        key: {
                                            name: 'a',
                                            type: 'Identifier'
                                        },
                                        kind: 'init',
                                        method: false,
                                        shorthand: true,
                                        type: 'Property',
                                        value: {
                                            left: {
                                                name: 'a',
                                                type: 'Identifier'
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 1
                                            },
                                            type: 'AssignmentPattern'
                                        }
                                    }],
                                    type: 'ObjectPattern',
                                },
                                right: {
                                    elements: [],
                                    type: 'ArrayExpression'
                                },
                                type: 'ForOfStatement'
                            }
                        ],
                        type: 'BlockStatement'
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: 'f',
                        type: 'Identifier',
                    },
                    params: [],
                    type: 'FunctionDeclaration',
                }, ],
                sourceType: 'script',
                type: 'Program',
            }
        });

        pass(`async function * f() { 'use strict'; let a; for await\n (a of []); }`, Context.Empty, {
            source: `async function * f() { 'use strict'; let a; for await\n (a of []); }`,
            expected: {
                body: [{
                    async: true,
                    body: {
                        body: [{
                                expression: {
                                    type: 'Literal',
                                    value: 'use strict',
                                },
                                type: 'ExpressionStatement',
                                directive: 'use strict'
                            },
                            {
                                declarations: [{
                                    id: {
                                        name: 'a',
                                        type: 'Identifier',
                                    },
                                    init: null,
                                    type: 'VariableDeclarator',
                                }, ],
                                kind: 'let',
                                type: 'VariableDeclaration',
                            },
                            {
                                await: true,
                                body: {
                                    type: 'EmptyStatement',
                                },
                                left: {
                                    name: 'a',
                                    type: 'Identifier',
                                },
                                right: {
                                    elements: [],
                                    type: 'ArrayExpression'
                                },
                                type: 'ForOfStatement'
                            }
                        ],
                        type: 'BlockStatement'
                    },
                    expression: false,
                    generator: true,
                    id: {
                        name: 'f',
                        type: 'Identifier',
                    },
                    params: [],
                    type: 'FunctionDeclaration',
                }, ],
                sourceType: 'script',
                type: 'Program'
            }
        });
    });
});
