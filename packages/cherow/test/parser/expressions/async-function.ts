import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Async Function', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidPrograms = [
            '(async function () { var await; });',
            '(async function () { void await; });',
            '(async function () { await: ; });',
            '(async function (x = 1) {"use strict"})',
            '(async function foo (foo) { super() })',
             '(async function foo (foo) { super.prop });',
            '(async function foo (foo = super()) { var bar; });',
            '(async function*(await) { });',
            '(async function foo(await) { })',
            '(async\nfunction foo() { })',
            'async ()\n=> a',
            `async while (1) {}`,
            `(async
               function f() {})`,
            '0, async function*(...x = []) {};',
            '(async function f(...a,) {})',
            '(async function foo1() { } foo2 => 1)',
            'var f = async() => ((async(x = await 1) => x)();',
            'class C { async constructor() {} }',
            'class C {}; class C2 extends C { async constructor() {} }',
            'class C { static async prototype() {} }',
            'class C {}; class C2 extends C { static async prototype() {} }',
            '(async function foo3() { } () => 1)',
            '(async function foo4() { } => 1)',
            '(async function() { } foo5 => 1)',
            '(async function() { } () => 1)',
            '(async function() { } => 1)',
            '(async function(...a,) {})',
            '(async function *() { var await; })',
            '"use strict"; (async function *() { var await; })',
            `"use strict"; (async function eval () { })`,
            `(async function eval () { })`,
            `(async function foo() { } = 1)`,
            `async function wrap() { async function await() { } };`,
            '(async.foo6 => 1)',
            '(async.foo7 foo8 => 1)',
            '(async.foo9 () => 1)',
            '(async().foo10 => 1)',
            '(async().foo11 foo12 => 1)',
            '(async().foo13 () => 1)',
            '(async[\'foo14\'] => 1)',
            '(async[\'foo15\'] foo16 => 1)',
            '(async[\'foo17\'] () => 1)',
            '(async()[\'foo18\'] => 1)',
            '(async()[\'foo19\'] foo20 => 1)',
            '(async()[\'foo21\'] () => 1)',
            '(async`foo22` => 1)',
            '(async`foo23` foo24 => 1)',
            '(async`foo25` () => 1)',
            '(async`foo26`.bar27 => 1)',
            '(async`foo28`.bar29 foo30 => 1)',
            '(async`foo31`.bar32 () => 1)',
            'async({ foo33 = 1 })',
            'var f = async() => await;',
            'var O = { *async method() {} };',
            'var O = { async method*() {} };',
            'async(...a = b) => b',
            'async(...a,) => b',
            'async(...a, b) => b',
            `(async
                function f() {})`
        ];

        for (const arg of invalidPrograms) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Module);
                });
            });
        }

        fail('export async function() {}', Context.Module, {
            source: 'export async function() {}',
        });

        fail('"use strict"; (async function f (...a,) {  })', Context.Empty, {
            source: '"use strict"; (async function f (...a,) {  })',
        });

        fail('(async function f (...a,) {  })', Context.Empty, {
            source: '(async function f (...a,) {  })',
        });

        fail('(async function(...x = []) {})', Context.Empty, {
            source: '(async function(...x = []) {})',
        });

        fail('"use strict"; (async function arguments () {  })', Context.Empty, {
            source: '"use strict"; (async function arguments () {  })',
        });

        fail('"use strict"; (async function eval () { })', Context.Empty, {
            source: '"use strict"; (async function eval () { })',
        });

        fail('"use strict"; (async function foo (eval) {  })', Context.Empty, {
            source: '"use strict"; (async function foo (eval) {  })',
        });

        fail('"use strict"; (async function arguments () {  })', Context.Empty, {
            source: '"use strict"; (async function arguments () {  })',
        });

        fail('"use strict"; (async function arguments () {  })', Context.Empty, {
            source: '"use strict"; (async function arguments () {  })',
        });

        fail('"use strict"; (async function arguments () {  })', Context.Empty, {
            source: '"use strict"; (async function arguments () {  })',
        });

        fail('"use strict"; (async function arguments () {  })', Context.Empty, {
            source: '"use strict"; (async function arguments () {  })',
        });

        fail('"use strict"; var O = { async method(eval) {} }', Context.Empty, {
            source: '"use strict"; var O = { async method(eval) {} }',
        });

        fail('"use strict"; var O = { async 0(eval) {} }', Context.Empty, {
            source: '"use strict"; var O = { async 0(eval) {} }',
        });

        fail('var O = { async 0(eval) {} }', Context.Strict | Context.Module, {
            source: '"use strict"; var O = { async 0(eval) {} }',
        });

        fail('"use strict"; (async function arguments () {  })', Context.Empty, {
            source: '"use strict"; (async function arguments () {  })',
        });

        fail('"use strict"; (async function arguments () {  })', Context.Strict | Context.Module, {
            source: '"use strict"; (async function arguments () {  })',
        });
    });

    describe('Pass', () => {

        const validFormalparams = [
            '(async function foo() { }.prototype)',
            '(async function foo(x, y = x, z = y) { })',
            '(async function foo(x = y, y) { })',
            '(async function foo(a, b = 39,) { })',
            '(async function foo(a, b,) { })',
            '(async function foo(_ = (function() {}())) { })',
            '(async function foo(x = x) { })',
            'var O = { async method(eval) {} }',
            'var O = { async [\'meth\' + \'od\'](eval) {} }',
            'var O = { async \'method\'(eval) {} }',
            'var O = { async 0(eval) {} }',
            'var O = { async method(arguments) {} }',
            'var O = { async [\'meth\' + \'od\'](arguments) {} }',
            'var O = { async \'method\'(arguments) {} }',
            'var O = { async 0(arguments) {} }',
            'var O = { async method(dupe, dupe) {} }',
            'async function await() {}',
            'class X { static async await(){} }',
            `(async function ref(a, b = 39,) {});`,
            `x = async function(a) { await a }`,
            'f(async function(x) { await x })',
            'f(b, async function(b) { await b }, c)',
            'async function foo(a = async () => await b) {}',
            'async function foo(a = {async bar() { await b }}) {}',
            'async function foo(a = class {async bar() { await b }}) {}',
            '(function f() { async function yield() {} })',
            '(function f() { ({ async yield() {} }); })',
            '({ async [yield]() {} });',
            'f(async function(x) { await x })',
            'f(b, async function(b) { await b }, c)',
            'async function foo(a = {async bar() { await b }}) {}',
            'async function foo(a = class {async bar() { await b }}) {}',
            'async function foo(a, b) { await a }',
            '(function* g() { (async function yield() {}); })',
            '"use strict"; ({ async yield() {} });',
            '(function f() { ({ async [yield]() {} }); })',
            `a = async
            function f(){}`,
        ];

        for (const arg of validFormalparams) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        pass('(async function foo(a, b = 39,) {})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(async function foo(a, b = 39,) {})',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'FunctionExpression',
                            params: [
                                {
                                    type: 'Identifier',
                                    name: 'a',
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
                                },
                                {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'b',
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
                                        }
                                    },
                                    right: {
                                        type: 'Literal',
                                        value: 39,
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
                                        raw: '39'
                                    },
                                    start: 23,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    }
                                }
                            ],
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
                            async: true,
                            generator: false,
                            expression: false,
                            id: {
                                type: 'Identifier',
                                name: 'foo',
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
                                }
                            },
                            start: 1,
                            end: 34,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 34
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
                    }
                ],
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

        pass('(async function*(a = b +=1, c = d += 1, e = f += 1, g = h += 1, i = j += 1, k = l +=1) {})', Context.OptionsRanges | Context.OptionsRaw, {
            source: '(async function*(a = b +=1, c = d += 1, e = f += 1, g = h += 1, i = j += 1, k = l +=1) {})',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'FunctionExpression',
                            params: [
                                {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 17,
                                        end: 18
                                    },
                                    right: {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'b',
                                            start: 21,
                                            end: 22
                                        },
                                        operator: '+=',
                                        right: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 25,
                                            end: 26,
                                            raw: '1'
                                        },
                                        start: 21,
                                        end: 26
                                    },
                                    start: 17,
                                    end: 26
                                },
                                {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'c',
                                        start: 28,
                                        end: 29
                                    },
                                    right: {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'd',
                                            start: 32,
                                            end: 33
                                        },
                                        operator: '+=',
                                        right: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 37,
                                            end: 38,
                                            raw: '1'
                                        },
                                        start: 32,
                                        end: 38
                                    },
                                    start: 28,
                                    end: 38
                                },
                                {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'e',
                                        start: 40,
                                        end: 41
                                    },
                                    right: {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'f',
                                            start: 44,
                                            end: 45
                                        },
                                        operator: '+=',
                                        right: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 49,
                                            end: 50,
                                            raw: '1'
                                        },
                                        start: 44,
                                        end: 50
                                    },
                                    start: 40,
                                    end: 50
                                },
                                {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'g',
                                        start: 52,
                                        end: 53
                                    },
                                    right: {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'h',
                                            start: 56,
                                            end: 57
                                        },
                                        operator: '+=',
                                        right: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 61,
                                            end: 62,
                                            raw: '1'
                                        },
                                        start: 56,
                                        end: 62
                                    },
                                    start: 52,
                                    end: 62
                                },
                                {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'i',
                                        start: 64,
                                        end: 65
                                    },
                                    right: {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'j',
                                            start: 68,
                                            end: 69
                                        },
                                        operator: '+=',
                                        right: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 73,
                                            end: 74,
                                            raw: '1'
                                        },
                                        start: 68,
                                        end: 74
                                    },
                                    start: 64,
                                    end: 74
                                },
                                {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'k',
                                        start: 76,
                                        end: 77
                                    },
                                    right: {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'l',
                                            start: 80,
                                            end: 81
                                        },
                                        operator: '+=',
                                        right: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 84,
                                            end: 85,
                                            raw: '1'
                                        },
                                        start: 80,
                                        end: 85
                                    },
                                    start: 76,
                                    end: 85
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 87,
                                end: 89
                            },
                            async: true,
                            generator: true,
                            expression: false,
                            id: null,
                            start: 1,
                            end: 89
                        },
                        start: 0,
                        end: 90
                    }
                ],
                start: 0,
                end: 90
            }
        });
        pass('(async function foo(a,) {})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(async function foo(a,) {})',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'FunctionExpression',
                            params: [
                                {
                                    type: 'Identifier',
                                    name: 'a',
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
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                                }
                            },
                            async: true,
                            generator: false,
                            expression: false,
                            id: {
                                type: 'Identifier',
                                name: 'foo',
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
                                }
                            },
                            start: 1,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            }
                        },
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
                        }
                    }
                ],
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
                }
            }
        });
    });
});
