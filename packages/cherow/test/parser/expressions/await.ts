import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Await', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failures', () => {

        const invalidInModule = [
            'await;',
            'await: ;',
            'var await;',
            'var [await] = [];',
            'var { await } = {};',
            'var { x: await } = {};',
            '{ var await; }',
            'let await;',
            'let [await] = [];',
            'let { await } = {};',
            'let { x: await } = {};',
            '{ let await; }',
            'const await = null;',
            'const [await] = [];',
            'const { await } = {};',
            'const { x: await } = {};',
            '{ const await = null; }',
            'function await() {}',
            'function f(await) {}',
            'function* await() {}',
            'function* g(await) {}',
            '(function await() {});',
            '(function (await) {});',
            '(function* await() {});',
            '(function* (await) {});',
            '(await) => {};',
            'await => {};',
            'class await {}',
            'class C { constructor(await) {} }',
            'class C { m(await) {} }',
            'class C { static m(await) {} }',
            'class C { *m(await) {} }',
            'class C { static *m(await) {} }',
            '(class await {})',
            '(class { constructor(await) {} });',
            '(class { m(await) {} });',
            '(class { static m(await) {} });',
            '(class { *m(await) {} });',
            '(class { static *m(await) {} });',
            '({ m(await) {} });',
            '({ *m(await) {} });',
            '({ set p(await) {} });',
            'try {} catch (await) {}',
            'try {} catch (await) {} finally {}',
            'async function method() { var await = 1; }',
            'async function method(await;) { }',
            'async function method() { var x = await; }',
            'class A { async constructor() {} }',
            'class A { async get foo() {} }',
            'class A { async set foo() {} }',
            'class A { async static staticAsyncMethod() {} }',
            'class A { static async prototype() {} }',
            'var result = await call();',
            'await call();',
            'await a;',
            'await a[0];',
            'await p + await q;',
            'foo(await p, await q);',
            'var lambdaParenNoArg = await () => x < y;',
            'var lambdaArgs = await async (a, b ,c) => a + b + c;',
            'var lambdaArgs = await (async (a, b ,c) => a + b + c);',
            'function method() { var x = await call(); }',
            'class C { async\nam() { } };',
            'var aaf = async\n(x, y) => { };',
            'async function af() { var a = await => { }; }',
            'async function af() { var a = (await) => { }; }',
            'async function af() { var a = (x, y, await) => { }; }',
            'async function af() { var a = (x, await, y) => { }; }',
            'async function af() { var a = (x = await 0) => { }; }',
            'async function af() { var a = (x, y = await 0, z = 0) => { }; }',
            'async function af() { var a = (x, y, z = await 0) => { }; }',
            'async (a, await) => { }',
            'async await => { }',
            'function () { a = async await => { } }',
            'async (a, b = await 1) => {}',
            'async () => { await => { }; }',
            'async () => { (a, await) => { }; }',
            'async () => { (x, y, z = await 0) => { }; }',
            'async function af() { (b = (c = await => {}) => {}) => {}; }'

        ];

        for (const arg of invalidInModule) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
                });
            });
        }

        // Testing invalid async await formal params

        const formalParams = [
            '[await]',
            '[await] = []',
            '[await = 1]',
            '[await = 1] = []',
            '...await',
            'await',
            'await = 1',
            '...[await]',
            'var [await f] = [];',
            'let [await f] = [];',
            'const [await f] = [];',
            'e=await',
            'var [...await f] = [];',
            'let [...await f] = [];',
            'const [...await f] = [];',
            'var { await f } = {};',
            'let { await f } = {};',
            'const { await f } = {};',
            'var { ...await f } = {};',
            'let { ...await f } = {};',
            'const { ...await f } = {};',
            'var { f: await f } = {};',
            'let { f: await f } = {};',
            'const { f: await f } = {};',
            'x = await',
            '1) => 1',
            '\'str\') => 1',
            '/foo/) => 1',
            '{ foo = async(1) => 1 }) => 1',
            '{ foo = async(a) => 1 })',
            'x = async(await)',
            'x = { [await]: 1 }',
            'x = class extends (await) { }',
            'x = class { static [await]() {} }',
            '{ x = await }',
            'class await {}',
            'x = class await {}',
            'x = 1 ? class await {} : 0',
            'x = async function await() {}',
            'x = y[await]',
            'x = `${await}`',
            'x = y()[await]',
            'var { f: ...await f } = {};',
            'let { f: ...await f } = {};',
            'const { f: ...await f } = {};',
            'var { [f]: await f } = {};',
            'let { [f]: await f } = {};',
            'const { [f]: await f } = {};',
            'var { [f]: ...await f } = {};',
            'let { [f]: ...await f } = {};',
            'const { [f]: ...await f } = {};',
            `x = await`,
        ];

        for (const arg of formalParams) {
            it(`async function f( ${arg}) {}`, () => {
                t.throws(() => {
                    parseSource(`async function f( ${arg}) {}`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; function f() { ${arg}) }`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; function f() { ${arg}) }`, undefined, Context.Empty);
                });
            });

            it(`let f = () => {${arg})`, () => {
                t.throws(() => {
                    parseSource(`let f = () => {${arg})`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; async function* f() {${arg})`, () => {
                t.throws(() => {
                    parseSource(`let f = () => {${arg})`, undefined, Context.Empty);
                });
            });

            it(`function* f() {${arg})`, () => {
                t.throws(() => {
                    parseSource(`function* f() {${arg})`, undefined, Context.Empty);
                });
            });

            it(`function* f() {${arg})`, () => {
                t.throws(() => {
                    parseSource(`function* f() {${arg})`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; function* f() {"${arg})`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; function* f() {"${arg})`, undefined, Context.Empty);
                });
            });
        }

        fail('x = { async f() { let await } }', Context.Strict | Context.Module, {
            source: 'x = { async f() { let await } }',
        });

        fail(`async(e=await)=>l`, Context.Empty, {
            source: 'async(e=await)=>l',
        });

        fail(`async function f() { let await; }`, Context.Empty, {
            source: 'async function f() { let await; }',
        });

        fail(`a = async function () { async function await() {} }`, Context.Empty, {
            source: 'a = async function () { async function await() {} }',
        });

        fail(`async function f() { g(await) }`, Context.Empty, {
            source: 'async function f() { g(await) }',
        });

        fail(`async function foo() { function await() { } }`, Context.Empty, {
            source: 'async function foo() { function await() { } }',
        });

        fail('a = async function () { async function await() {} }', Context.Strict | Context.Module, {
            source: 'a = async function () { async function await() {} }',
        });

        fail('async function f() { g(await) }', Context.Empty, {
            source: 'async function f() { g(await) }',
        });

        fail(`async f() { class X { async await(){} } }`, Context.Empty, {
            source: 'async f() { class X { async await(){} } }',
        });

        fail(`async function f() { return {g: await} }`, Context.Strict | Context.Module, {
            source: 'async function f() { return {g: await} }',
        });

        fail('a = async function() { g(await) }', Context.Strict | Context.Module, {
            source: 'a = async function() { g(await) }',
        });

        fail('function f(x) { await x }', Context.Strict | Context.Module, {
            source: 'function f(x) { await x }',
        });

        fail('class x { static async f(await) {} }', Context.Strict | Context.Module, {
            source: 'class x { static async f(await) {} }',
        });

        fail('async await => 42', Context.Strict | Context.Module, {
            source: 'async await => 42',
        });

        fail('async f() { x = { async await(){} } }', Context.Empty, {
            source: 'async f() { x = { async await(){} } }',
        });

        fail('async function f() { let await; }', Context.Empty, {
            source: 'async function f() { let await; }',
        });

        fail(`async function f(await) {}`, Context.Empty, {
            source: 'async function f(await) {}',
        });

        fail(`class X { async f(await) {} }`, Context.Empty, {
            source: 'class X { async f(await) {} }',
        });

        fail(`x = { async f(await){} }`, Context.Empty, {
            source: 'x = { async f(await){} }',
        });

        fail(`async f() { x = { async await(){} } }`, Context.Empty, {
            source: 'async f() { x = { async await(){} } }',
        });

        fail(`async ({await}) => 1;`, Context.Empty, {
            source: 'async ({await}) => 1;',
        });

        fail(`await a;`, Context.Empty, {
            source: 'await a;',
        });

        const bodyErrors = [
            'await',
            'var f = await => 42;',
            //  "var { await } = 1;",
            'var [ await ] = 1;',
            'return async (await) => {};',
            'var O = { async [await](a, a) {} }',
            'await;',
            'function await() {}',
            //"(a = await b) => a",
            'var f = await => 42;',
            'var f = (await) => 42;',
            'var f = (await, a) => 42;',
            'var f = (...await) => 42;',

            'var e = (await);',
            'var e = (await, f);',
            'var e = (await = 42)',
            '(await 1) = 1',
            'var e = [await];',
            'var e = {await};',
        ];

        for (const arg of bodyErrors) {
            it(`async function f() { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`async function f() { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; async function f() { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`async function f() { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; var f = async function() { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; var f = async function() { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; var f = async() => { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; var f = async() => { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`'use strict'; var O = { async method() {${arg} }`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; var O = { async method() { ${arg} }`, undefined, Context.Empty);
                });
            });
        }

        const invalidInModuleCode = [
            'export default (async function await() {})',
            'export default async function await() {}',
            'export async function await() {}',
            'export async function() {}',
            'export async',
            'export async\nfunction async() { await 1; }',
            'async function foo() { return {await} }'
        ];

        for (const arg of invalidInModuleCode) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        const invalidDestructuringTarget = [
            'var [await f] = [];',
            'let [await f] = [];',
            'const [await f] = [];',
            'var [...await f] = [];',
            'let [...await f] = [];',
            'const [...await f] = [];',
            'var { await f } = {};',
            'let { await f } = {};',
            'const { await f } = {};',
            'var { ...await f } = {};',
            'let { ...await f } = {};',
            'const { ...await f } = {};',
            'var { f: await f } = {};',
            'let { f: await f } = {};',
            'const { f: await f } = {};',
            'var { [f]: await f } = {};',
            'let { [f]: await f } = {};',
            'const { [f]: await f } = {};',
            'var { f: ...await f } = {};',
            'let { f: ...await f } = {};',
            'const { f: ...await f } = {};',
            'var { [f]: ...await f } = {};',
            'let { [f]: ...await f } = {};',
            'const { [f]: ...await f } = {};',
        ];

        for (const arg of invalidDestructuringTarget) {
            it(`let f = () => { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`let f = () => { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`let f = () => { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`let f = () => { ${arg} }`, undefined, Context.Module);
                });
            });

            it(`'use strict'; async function* f() { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; async function* f() { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`function* f() { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`function* f() { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`let f = async() => { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`let f = async() => { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`async function* f() { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`async function* f() { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`async function* f() { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`async function* f() { ${arg} }`, undefined, Context.Module);
                });
            });

            it(`'use strict'; async function f() { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`'use strict'; async function f() { ${arg} }`, undefined, Context.Empty);
                });
            });
        }

        fail('async await => 1;', Context.Empty, {
            source: 'async await => 1;',
        });

        fail('async function foo() { return {await} };', Context.Empty, {
            source: 'async function foo() { return {await} };',
        });

        fail('async function wrap() { async function await() { } };', Context.Empty, {
            source: 'async function wrap() { async function await() { } };',
        });

        // fail('function* wrap() { async(a = yield b) => a };', Context.Empty, {
        //  source: 'function* wrap() { async(a = yield b) => a };',
        // });

        fail('await f();', Context.Empty, {
            source: 'await f();',
        });

        fail(`async function f() {
          let [await b] = [];
          return b;
        }`, Context.Empty, {
            source: `async function f() {
            let [await b] = [];
            return b;
          }`,
        });

        fail(`async function f() {
              let { a: await b } = { a: 1 };
              return b;
            }`, Context.Empty, {
            source: `async function f() {
                let { a: await b } = { a: 1 };
                return b;
              }`,
        });

        const invalidSyntax = [
            'await call();',
            'var result = await call();',
            'await a;',
            'var lambdaParenNoArg = await () => x < y;',
            'await p + await q;',
            'function method() { var x = await call(); }'
        ];
        for (const arg of invalidSyntax) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

        const validStrictSyntax = [
            'function f() { var await; }',
            'function f() { const await = 10; }',
            'function f() { function await() { } }',
            'function f() { var fe = function await() { } }',
            'function f() { var await = 10; var o = { await }; }',
            'function f() { class C { await() { } } }',
            'function f() { class C { *await() { } } }'
        ];
        for (const arg of validStrictSyntax) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });
        }

        const formalParams = [
            'x = function await() {}',
            'x = function *await() {}',
            'x = function() { let await = 0; }',
            'x = () => { let await = 0; }',
        ];
        for (const arg of formalParams) {
            it(`async function f( ${arg}) {}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function f( ${arg}) {}`, undefined, Context.Empty);
                });
            });

            it(`var f = async function f(${arg}) {}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var f = async function f( ${arg}) {}`, undefined, Context.Empty);
                });
            });

            it(`var f = async(${arg}) => {}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`var f = async(${arg}) => {}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; async function f( ${arg}) {}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`"use strict"; async function f( ${arg}) {}`, undefined, Context.Empty);
                });
            });

            it(`"use strict";  var f = async function f(${arg}) {}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`"use strict";  var f = async function f(${arg}) {}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; var f = async(${arg}) => {}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`"use strict"; var f = async(${arg}) => {}`, undefined, Context.Empty);
                });
            });
        }

        const programs = [
            'var asyncFn = async function() { await 1; };',
            'var asyncFn = async function withName() { await 1; };',
            'var asyncFn = async () => await \'test\';',
            'var asyncFn = async x => await x + \'test\';',
            'async function asyncFn() { await 1; }',
            'var O = { async method() { await 1; } }',
            'var O = { async [\'meth\' + \'od\']() { await 1; } }',
            'var O = { async \'method\'() { await 1; } }',
            'var O = { async 0() { await 1; } }',
            'async function await() {}',
            'var asyncFn = async({ foo = 1 }) => foo;',
            'var asyncFn = async({ foo = 1 } = {}) => foo;',
            'function* g() { var f = async(yield); }',
            'function* g() { var f = async(x = yield); }',
            'function foo() { var await = 1; return await; }',
            'function foo(await) { return await; }',
            'function* foo() { var await = 1; return await; }',
            'var f = () => { var await = 1; return await; }',
            'var O = { method() { var await = 1; return await; } };',
            'var O = { method(await) { return await; } };',
            'var O = { *method() { var await = 1; return await; } };',
            'async function foo(a, b) { await a + await b };',
            'async function wrap() { (a = await b) };',
            'async function foo(a, b) { await a };',
            'var O = { *method(await) { return await; } };',
            'var O = { *method(await) { return await; } };',
            'var O = { *method(await) { return await; } };',
            'var O = { *method(await) { return await; } };',
            'function f() { var await; }',
            'function f() { let await; }',
            'function f() { const await = 10; }',
            'function f() { function await() { } }',
            'function f() { function* await() { } }',
            'function f() { var fe = function await() { } }',
            'function f() { class await { } }',
            'function f() { var o = { await: 10 } }',
            'function f() { var o = { get await() { } } }',
            'function f() { var o = { *await() { } } }',
            'function f() { var await = 10; var o = { await }; }',
            'function f() { class C { await() { } } }',
            'function f() { class C { *await() { } } }',
            `async function f() {
                let { [await "a"]: a } = { a: 1 };
                return a;
              }`
        ];
        for (const arg of programs) {
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

            it(`"use strict"; ${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; var O = { *method() {${arg}}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`function f() {${arg}}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; function* g() {${arg}}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`"use strict"; function* g() {${arg}}`, undefined, Context.Empty);
                });
            });
        }

        pass('async (await);', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'async (await);',
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
                        type: 'CallExpression',
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
                        arguments: [{
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
                            name: 'await'
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        // Await in a generator is an identifier
        pass('function* foo(await) { yield await; };', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function* foo(await) { yield await; };',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'FunctionDeclaration',
                        params: [{
                            type: 'Identifier',
                            name: 'await',
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
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'await',
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
                                    delegate: false,
                                    start: 23,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 34
                                        }
                                    }
                                },
                                start: 23,
                                end: 35,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 35
                                    }
                                }
                            }],
                            start: 21,
                            end: 37,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 37
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: {
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
                    },
                    {
                        type: 'EmptyStatement',
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
                    }
                ],
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
                }
            }
        });

        pass('async function foo() { function bar() { await = 1; } bar(); } foo();', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'async function foo() { function bar() { await = 1; } bar(); } foo();',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                    type: 'FunctionDeclaration',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [{
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'await',
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
                                                operator: '=',
                                                right: {
                                                    type: 'Literal',
                                                    value: 1,
                                                    start: 48,
                                                    end: 49,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 48
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 49
                                                        }
                                                    },
                                                    raw: '1'
                                                },
                                                start: 40,
                                                end: 49,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 40
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 49
                                                    }
                                                }
                                            },
                                            start: 40,
                                            end: 50,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 40
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 50
                                                }
                                            }
                                        }],
                                        start: 38,
                                        end: 52,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 38
                                            },
                                            end: {
                                                line: 1,
                                                column: 52
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: 'Identifier',
                                        name: 'bar',
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
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'bar',
                                            start: 53,
                                            end: 56,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 53
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 56
                                                }
                                            }
                                        },
                                        arguments: [],
                                        start: 53,
                                        end: 58,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 53
                                            },
                                            end: {
                                                line: 1,
                                                column: 58
                                            }
                                        }
                                    },
                                    start: 53,
                                    end: 59,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 53
                                        },
                                        end: {
                                            line: 1,
                                            column: 59
                                        }
                                    }
                                }
                            ],
                            start: 21,
                            end: 61,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 61
                                }
                            }
                        },
                        async: true,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'foo',
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
                            }
                        },
                        start: 0,
                        end: 61,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 61
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 62,
                                end: 65,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 62
                                    },
                                    end: {
                                        line: 1,
                                        column: 65
                                    }
                                }
                            },
                            arguments: [],
                            start: 62,
                            end: 67,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 62
                                },
                                end: {
                                    line: 1,
                                    column: 67
                                }
                            }
                        },
                        start: 62,
                        end: 68,
                        loc: {
                            start: {
                                line: 1,
                                column: 62
                            },
                            end: {
                                line: 1,
                                column: 68
                            }
                        }
                    }
                ],
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

        pass('async function await() { return 1 }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'async function await() { return 1 }',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Literal',
                                value: 1,
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
                                raw: '1'
                            },
                            start: 25,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 25
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            }
                        }],
                        start: 23,
                        end: 35,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 35
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'await',
                        start: 15,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 20
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

        pass(`async function f() {}
        const g = async function () {};
        const a = {
          async f() {}
        };
        const h = async () => {};
        async function j() {
          (await g()).a;
          await g().a;
          return await f();
        }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `async function f() {}
          const g = async function () {};
          const a = {
            async f() {}
          };
          const h = async () => {};
          async function j() {
            (await g()).a;
            await g().a;
            return await f();
          }`,
          expected: {
            "type": "Program",
            "sourceType": "script",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 19,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 19
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        }
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "f",
                        "start": 15,
                        "end": 16,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 15
                            },
                            "end": {
                                "line": 1,
                                "column": 16
                            }
                        }
                    },
                    "start": 0,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 21
                        }
                    }
                },
                {
                    "type": "VariableDeclaration",
                    "kind": "const",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 60,
                                    "end": 62,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 38
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 40
                                        }
                                    }
                                },
                                "async": true,
                                "generator": false,
                                "expression": false,
                                "id": null,
                                "start": 42,
                                "end": 62,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 40
                                    }
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "g",
                                "start": 38,
                                "end": 39,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 17
                                    }
                                }
                            },
                            "start": 38,
                            "end": 62,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 16
                                },
                                "end": {
                                    "line": 2,
                                    "column": 40
                                }
                            }
                        }
                    ],
                    "start": 32,
                    "end": 63,
                    "loc": {
                        "start": {
                            "line": 2,
                            "column": 10
                        },
                        "end": {
                            "line": 2,
                            "column": 41
                        }
                    }
                },
                {
                    "type": "VariableDeclaration",
                    "kind": "const",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "f",
                                            "start": 104,
                                            "end": 105,
                                            "loc": {
                                                "start": {
                                                    "line": 4,
                                                    "column": 18
                                                },
                                                "end": {
                                                    "line": 4,
                                                    "column": 19
                                                }
                                            }
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
                                                "start": 108,
                                                "end": 110,
                                                "loc": {
                                                    "start": {
                                                        "line": 4,
                                                        "column": 22
                                                    },
                                                    "end": {
                                                        "line": 4,
                                                        "column": 24
                                                    }
                                                }
                                            },
                                            "async": true,
                                            "generator": false,
                                            "expression": false,
                                            "id": null,
                                            "start": 105,
                                            "end": 110,
                                            "loc": {
                                                "start": {
                                                    "line": 4,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 4,
                                                    "column": 24
                                                }
                                            }
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": true,
                                        "shorthand": false,
                                        "start": 98,
                                        "end": 110,
                                        "loc": {
                                            "start": {
                                                "line": 4,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 4,
                                                "column": 24
                                            }
                                        }
                                    }
                                ],
                                "start": 84,
                                "end": 122,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 5,
                                        "column": 11
                                    }
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 80,
                                "end": 81,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 17
                                    }
                                }
                            },
                            "start": 80,
                            "end": 122,
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 16
                                },
                                "end": {
                                    "line": 5,
                                    "column": 11
                                }
                            }
                        }
                    ],
                    "start": 74,
                    "end": 123,
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 10
                        },
                        "end": {
                            "line": 5,
                            "column": 12
                        }
                    }
                },
                {
                    "type": "VariableDeclaration",
                    "kind": "const",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "ArrowFunctionExpression",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 156,
                                    "end": 158,
                                    "loc": {
                                        "start": {
                                            "line": 6,
                                            "column": 32
                                        },
                                        "end": {
                                            "line": 6,
                                            "column": 34
                                        }
                                    }
                                },
                                "params": [],
                                "id": null,
                                "async": true,
                                "generator": false,
                                "expression": false,
                                "start": 144,
                                "end": 158,
                                "loc": {
                                    "start": {
                                        "line": 6,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 6,
                                        "column": 34
                                    }
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "h",
                                "start": 140,
                                "end": 141,
                                "loc": {
                                    "start": {
                                        "line": 6,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 6,
                                        "column": 17
                                    }
                                }
                            },
                            "start": 140,
                            "end": 158,
                            "loc": {
                                "start": {
                                    "line": 6,
                                    "column": 16
                                },
                                "end": {
                                    "line": 6,
                                    "column": 34
                                }
                            }
                        }
                    ],
                    "start": 134,
                    "end": 159,
                    "loc": {
                        "start": {
                            "line": 6,
                            "column": 10
                        },
                        "end": {
                            "line": 6,
                            "column": 35
                        }
                    }
                },
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "MemberExpression",
                                    "object": {
                                        "type": "AwaitExpression",
                                        "argument": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "g",
                                                "start": 210,
                                                "end": 211,
                                                "loc": {
                                                    "start": {
                                                        "line": 8,
                                                        "column": 19
                                                    },
                                                    "end": {
                                                        "line": 8,
                                                        "column": 20
                                                    }
                                                }
                                            },
                                            "arguments": [],
                                            "start": 210,
                                            "end": 213,
                                            "loc": {
                                                "start": {
                                                    "line": 8,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 8,
                                                    "column": 22
                                                }
                                            }
                                        },
                                        "start": 204,
                                        "end": 213,
                                        "loc": {
                                            "start": {
                                                "line": 8,
                                                "column": 13
                                            },
                                            "end": {
                                                "line": 8,
                                                "column": 22
                                            }
                                        }
                                    },
                                    "computed": false,
                                    "property": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 215,
                                        "end": 216,
                                        "loc": {
                                            "start": {
                                                "line": 8,
                                                "column": 24
                                            },
                                            "end": {
                                                "line": 8,
                                                "column": 25
                                            }
                                        }
                                    },
                                    "start": 203,
                                    "end": 216,
                                    "loc": {
                                        "start": {
                                            "line": 8,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 8,
                                            "column": 25
                                        }
                                    }
                                },
                                "start": 203,
                                "end": 217,
                                "loc": {
                                    "start": {
                                        "line": 8,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 8,
                                        "column": 26
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "AwaitExpression",
                                    "argument": {
                                        "type": "MemberExpression",
                                        "object": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "g",
                                                "start": 236,
                                                "end": 237,
                                                "loc": {
                                                    "start": {
                                                        "line": 9,
                                                        "column": 18
                                                    },
                                                    "end": {
                                                        "line": 9,
                                                        "column": 19
                                                    }
                                                }
                                            },
                                            "arguments": [],
                                            "start": 236,
                                            "end": 239,
                                            "loc": {
                                                "start": {
                                                    "line": 9,
                                                    "column": 18
                                                },
                                                "end": {
                                                    "line": 9,
                                                    "column": 21
                                                }
                                            }
                                        },
                                        "computed": false,
                                        "property": {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 240,
                                            "end": 241,
                                            "loc": {
                                                "start": {
                                                    "line": 9,
                                                    "column": 22
                                                },
                                                "end": {
                                                    "line": 9,
                                                    "column": 23
                                                }
                                            }
                                        },
                                        "start": 236,
                                        "end": 241,
                                        "loc": {
                                            "start": {
                                                "line": 9,
                                                "column": 18
                                            },
                                            "end": {
                                                "line": 9,
                                                "column": 23
                                            }
                                        }
                                    },
                                    "start": 230,
                                    "end": 241,
                                    "loc": {
                                        "start": {
                                            "line": 9,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 9,
                                            "column": 23
                                        }
                                    }
                                },
                                "start": 230,
                                "end": 242,
                                "loc": {
                                    "start": {
                                        "line": 9,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 9,
                                        "column": 24
                                    }
                                }
                            },
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "AwaitExpression",
                                    "argument": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "Identifier",
                                            "name": "f",
                                            "start": 268,
                                            "end": 269,
                                            "loc": {
                                                "start": {
                                                    "line": 10,
                                                    "column": 25
                                                },
                                                "end": {
                                                    "line": 10,
                                                    "column": 26
                                                }
                                            }
                                        },
                                        "arguments": [],
                                        "start": 268,
                                        "end": 271,
                                        "loc": {
                                            "start": {
                                                "line": 10,
                                                "column": 25
                                            },
                                            "end": {
                                                "line": 10,
                                                "column": 28
                                            }
                                        }
                                    },
                                    "start": 262,
                                    "end": 271,
                                    "loc": {
                                        "start": {
                                            "line": 10,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 10,
                                            "column": 28
                                        }
                                    }
                                },
                                "start": 255,
                                "end": 272,
                                "loc": {
                                    "start": {
                                        "line": 10,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 10,
                                        "column": 29
                                    }
                                }
                            }
                        ],
                        "start": 189,
                        "end": 284,
                        "loc": {
                            "start": {
                                "line": 7,
                                "column": 29
                            },
                            "end": {
                                "line": 11,
                                "column": 11
                            }
                        }
                    },
                    "async": true,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "j",
                        "start": 185,
                        "end": 186,
                        "loc": {
                            "start": {
                                "line": 7,
                                "column": 25
                            },
                            "end": {
                                "line": 7,
                                "column": 26
                            }
                        }
                    },
                    "start": 170,
                    "end": 284,
                    "loc": {
                        "start": {
                            "line": 7,
                            "column": 10
                        },
                        "end": {
                            "line": 11,
                            "column": 11
                        }
                    }
                }
            ],
            "start": 0,
            "end": 284,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 11,
                    "column": 11
                }
            }
        }
        });

        pass('async function foo(a = async () => await b) {};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'async function foo(a = async () => await b) {};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'FunctionDeclaration',
                        params: [{
                            type: 'AssignmentPattern',
                            left: {
                                type: 'Identifier',
                                name: 'a',
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
                            right: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'AwaitExpression',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'b',
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
                                        }
                                    },
                                    start: 35,
                                    end: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 35
                                        },
                                        end: {
                                            line: 1,
                                            column: 42
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: true,
                                generator: false,
                                expression: true,
                                start: 23,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                }
                            },
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
                            }
                        }],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                        async: true,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'foo',
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
                    },
                    {
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
                    }
                ],
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

        pass('({async foo() { }});', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({async foo() { }});',
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
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
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
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
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
                                }
                            },
                            kind: 'init',
                            computed: false,
                            method: true,
                            shorthand: false,
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
                            }
                        }],
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

        pass('function* await() {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function* await() {}',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'await',
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

        pass('try {} catch (await) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'try {} catch (await) {}',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: [],
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
                        }
                    },
                    handler: {
                        type: 'CatchClause',
                        param: {
                            type: 'Identifier',
                            name: 'await',
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
                            }
                        },
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
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
                        }
                    },
                    finalizer: null,
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

        pass('(class { static *await() {} });', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(class { static *await() {} });',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
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
                                    name: 'await',
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
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 25,
                                        end: 27,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 27
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 22,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    }
                                },
                                start: 9,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            }],
                            start: 7,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        },
                        start: 1,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        }
                    },
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
                    }
                }],
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
                }
            }
        });

        pass('({ await() {} });', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({ await() {} });',
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
                                name: 'await',
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
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [],
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
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
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
                            },
                            kind: 'init',
                            computed: false,
                            method: true,
                            shorthand: false,
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
                            }
                        }],
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
                        }
                    },
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
                    }
                }],
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
                }
            }
        });

        pass('({}).await;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({}).await;',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'MemberExpression',
                        object: {
                            type: 'ObjectExpression',
                            properties: [],
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
                            }
                        },
                        computed: false,
                        property: {
                            type: 'Identifier',
                            name: 'await',
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

        pass('({ set await(x) {} });', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({ set await(x) {} });',
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
                                name: 'await',
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
                            value: {
                                type: 'FunctionExpression',
                                params: [{
                                    type: 'Identifier',
                                    name: 'x',
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
                                    }
                                }],
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
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 12,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            },
                            kind: 'set',
                            computed: false,
                            method: false,
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
                    }
                }],
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
                }
            }
        });

        pass('({ await: null });', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '({ await: null });',
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
                                name: 'await',
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
                                }
                            },
                            value: {
                                type: 'Literal',
                                value: null,
                                start: 10,
                                end: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                },
                                raw: 'null'
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
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
                            }
                        }],
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
                        }
                    },
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
                }],
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
            }
        });

        pass('function foo(await) { return await; }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function foo(await) { return await; }',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'Identifier',
                        name: 'await',
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
                    }],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Identifier',
                                name: 'await',
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
                            start: 22,
                            end: 35,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 35
                                }
                            }
                        }],
                        start: 20,
                        end: 37,
                        loc: {
                            start: {
                                line: 1,
                                column: 20
                            },
                            end: {
                                line: 1,
                                column: 37
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'foo',
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
                        }
                    },
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
                }],
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
    });
});
