import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Statements - Async generators', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failures', () => {

        const Failures = [
            'var yield;',
            'var await;',
            'var foo, yield;',
            'var foo, await;',
            'try { } catch (yield) { }',
            'try { } catch (await) { }',
            'function yield() { }',
            '(async function * yield() { })',
            '(async function * await() { })',
            'async function * foo(yield) { }',
            '(async function * foo(yield) { })',
            'async function * foo(await) { }',
            '(async function * foo(await) { })',
            'yield = 1;',
            'await = 1;',
            'var foo = yield = 1;',
            'var foo = await = 1;',
            '++yield;',
            'yield++;',
            'await++;',
            'yield *',
            '(yield *)',
            'yield 3 + yield 4;',
            'yield: 34',
            'yield ? 1 : 2',
            'yield / yield',
            '+ yield',
            '+ yield 3',
            'yield\n*3',
            'var [yield] = [42];',
            'var [await] = [42];',
            'var {foo: yield} = {a: 42};',
            'yield\n{yield: 42}',
            'yield /* comment */\n {yield: 42}',
            'yield //comment\n {yield: 42}',
            'var {foo: await} = {a: 42};',
            '[yield] = [42];',
            '[await] = [42];',
            '({a: yield} = {a: 42});',
            '({a: await} = {a: 42});',
            'var [yield 24] = [42];',
            'var [await 24] = [42];',
            'var {foo: yield 24} = {a: 42};',
            'var {foo: await 24} = {a: 42};',
            '[yield 24] = [42];',
            '[await 24] = [42];',
            '({a: yield 24} = {a: 42});',
            '({a: await 24} = {a: 42});',
            '({ await })',
            'yield --> comment ',
            '(yield --> comment)',
           'yield /* comment */ --> comment ',
            'for (yield \'x\' in {});',
            'for (await \'x\' in {});',
            'for (yield \'x\' of {});',
            'for (await \'x\' of {});',
            'for (yield \'x\' in {} in {});',
            'for (await \'x\' in {} in {});',
            'for (yield \'x\' in {} of {});',
            'for (await \'x\' in {} of {});',
            'class C extends yield { }',
        ];

        for (const arg of Failures) {
            it(`async function * gen() { ${arg} } `, () => {
                t.throws(() => {
                    parseSource(`async function * gen() { ${arg} } `, undefined, Context.Empty);
                });
            });

            it(`"use strict"; async function * gen() { ${arg} } `, () => {
                t.throws(() => {
                    parseSource(`"use strict"; async function * gen() { ${arg} } `, undefined, Context.Empty);
                });
            });

            it(`async function * gen() { ${arg} } `, () => {
                t.throws(() => {
                    parseSource(`async function * gen() { ${arg} } `, undefined, Context.Strict | Context.Module);
                });
            });
        }

        fail('async function* f(...x = []) { }', Context.Empty, {
            source: 'async function* f(...x = []) { }',
        });

        fail('async function* eval() { "use strict"; }', Context.Empty, {
            source: 'async function* eval() { "use strict"; }',
        });

        fail('async function fn() { for await ([ x[yield] ] of [[]]) }', Context.Empty, {
            source: 'async function fn() { for await ([ x[yield] ] of [[]]) }',
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

        const programs = [
            'yield 2;',
            'yield * 2;',
            'yield * \n 2;',
            'yield * \r 2;',
            'yield * \t 2;',
            'yield * \n\f\r 2;',
            'yield * \f\n\r 2;',
            'yield yield 1;',
            'yield * yield * 1;',
            'yield 3 + (yield 4);',
            'yield 3 + (yield 4) + 4;',
            'yield * 3 + (yield * 4);',
            '(yield * 3) + (yield * 4);',
            'yield 3; yield 4;',
            'yield * 3; yield * 4;',
            '(function (yield) { })',
            '(function yield() { })',
            '(function (await) { })',
            '(function await() { })',
            'yield { yield: 12 }',
            'yield /* comment */ { yield: 12 }',
            'class C extends await { }',
            'yield * \n { yield: 12 }',
            'yield /* comment */ * \n { yield: 12 }',
            'yield 1; return',
            'yield 1; return;',
            'yield * 1; return',
            'yield * 1; return;',
            'yield 1; return 7',
            'yield * 1; return 7',
            'yield 1; return 7; yield \'foo\';',
            'yield * 1; return 3; yield * \'foo\';',
            '({ yield: 1 })',
            '({ yield })',
            '({ get yield() { } })',
            '({ await: 1 })',
            '({ get await() { } })',
            '({ [yield]: x } = { })',
            '({ [await 1]: x } = { })',
            'yield',
            'yield\n',
            'yield /* comment */',
            'yield // comment\n',
            'yield // comment\n\r\f',
            '(yield)',
            '[yield]',
            '{yield}',
            'yield, yield',
            'yield; yield',
            'yield; yield; yield; yield;',
            '(yield) ? yield : yield',
            '(yield) \n ? yield : yield',
            'yield\nfor (;;) {}',
            'await 10',
            'await 10; return',
            'await 10; return 20',
            'await 10; return 20; yield \'foo\'',
            'await (yield 10)',
            'await (  yield     10  ) ',
            'await (yield 10); return',
            'await (yield 10); return 80',
            'await (yield 10); return 50; yield \'foo\'',
            'yield await 10',
            'yield await 10; return',
            'yield await 10; return;',
            'yield await 10; return 10',
            'yield await 10; return 10; yield \'foo\'',
            'await /* comment */ 10',
            'await // comment\n 10',
            'yield await /* comment\n */ 10',
            'yield await // comment\n 10',
            'await (yield /* comment */)',
            'await (yield // comment\n)',
            'for await (x of xs);',
            'for await (let x of xs);',
            'await a; yield b;',
        ];

        for (const arg of programs) {
            it(`async function * gen() { ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`async function * gen() { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`(async function * () { ${arg} })`, () => {
              t.doesNotThrow(() => {
               parseSource(`(async function * () { ${arg} })`, undefined, Context.Empty);
             });
             });

            it(`(async function * gen() { ${arg} })`, () => {
              t.doesNotThrow(() => {
                parseSource(`(async function * gen() { ${arg} })`, undefined, Context.Empty);
            });
            });

            it(`({ async * gen () { ${arg} } })`, () => {
              t.doesNotThrow(() => {
                parseSource(`({ async * gen () { ${arg} } })`, undefined, Context.Empty);
            });

            });
        }

        pass('class A { async f() { for await (x of xs); } }', Context.Empty, {
            source: 'class A { async f() { for await (x of xs); } }',
            expected: {
                  body: [
                    {
                     body: {
                        body: [
                          {
                            computed: false,
                            key: {
                              name: 'f',
                              type: 'Identifier'
                            },
                            kind: 'method',
                            static: false,
                            type: 'MethodDefinition',
                            value: {
                              async: true,
                             body: {
                                body: [
                                  {
                                    await: true,
                                    body: {
                                      type: 'EmptyStatement',
                                    },
                                    left: {
                                      name: 'x',
                                      type: 'Identifier',
                                    },
                                    right: {
                                      name: 'xs',
                                      type: 'Identifier',
                                    },
                                    type: 'ForOfStatement',
                                  },
                                ],
                                type: 'BlockStatement',
                              },
                              expression: false,
                              generator: false,
                              id: null,
                              params: [],
                              type: 'FunctionExpression'
                            }
                          }
                        ],
                        type: 'ClassBody',
                      },
                      id: {
                        name: 'A',
                        type: 'Identifier',
                      },
                      superClass: null,
                      type: 'ClassDeclaration'
                    },
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

        pass('f = async function() { for await (x of xs); }', Context.Empty, {
            source: 'f = async function() { for await (x of xs); }',
            expected: {
                  body: [
                    {
                      expression: {
                        left: {
                          name: 'f',
                          type: 'Identifier'
                        },
                        operator: '=',
                       right: {
                          async: true,
                          body: {
                            body: [
                              {
                               await: true,
                                body: {
                                 type: 'EmptyStatement',
                                },
                                left: {
                                  name: 'x',
                                  type: 'Identifier',
                                },
                                right: {
                                  name: 'xs',
                                  type: 'Identifier',
                                },
                                type: 'ForOfStatement',
                              }
                            ],
                            type: 'BlockStatement',
                          },
                          expression: false,
                          generator: false,
                          id: null,
                          params: [],
                          type: 'FunctionExpression'
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

        pass(`x = async() => { for await (x of xs); }`, Context.Empty, {
            source: `x = async() => { for await (x of xs); }`,
            expected: {
                  body: [
                    {
                      expression: {
                        left: {
                          name: 'x',
                          type: 'Identifier'
                        },
                       operator: '=',
                        right: {
                          async: true,
                          body: {
                            body: [
                              {
                                await: true,
                                body: {
                                  type: 'EmptyStatement',
                                },
                                left: {
                                  name: 'x',
                                  type: 'Identifier',
                                },
                                right: {
                                  name: 'xs',
                                  type: 'Identifier',
                               },
                                type: 'ForOfStatement',
                              }
                            ],
                            type: 'BlockStatement'
                          },
                          expression: false,
                          generator: false,
                          id: null,
                          params: [],
                          type: 'ArrowFunctionExpression'
                        },
                        type: 'AssignmentExpression'
                      },
                      type: 'ExpressionStatement'
                    }
                 ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

        pass('obj = { async f() { for await (x of xs); } }', Context.Empty, {
            source: 'obj = { async f() { for await (x of xs); } }',
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
                                      await: true,
                                      body: {
                                        type: 'EmptyStatement',
                                      },
                                      left: {
                                        name: 'x',
                                        type: 'Identifier',
                                      },
                                      right: {
                                        name: 'xs',
                                        type: 'Identifier',
                                      },
                                      type: 'ForOfStatement',
                                    },
                                  ],
                                  type: 'BlockStatement',
                                },
                                expression: false,
                                generator: false,
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
                    }
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

        pass(`async function f() { for\nawait (x of xs); }`, Context.Empty, {
            source: `async function f() { for\nawait (x of xs); }`,
            expected: {
                  body: [
                    {
                      async: true,
                      body: {
                        body: [
                          {
                            await: true,
                            body: {
                              type: 'EmptyStatement'
                            },
                           left: {
                              name: 'x',
                              type: 'Identifier',
                            },
                            right: {
                              name: 'xs',
                              type: 'Identifier'
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
                    },
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

        pass(`async function * gen() { yield 2; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function * gen() { yield 2; }`,
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
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Literal',
                                            value: 2,
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
                                            raw: '2'
                                        },
                                        delegate: false,
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
                                }
                            ],
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
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'gen',
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

        pass(`async function* ref() { }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* ref() { }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 22,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'ref',
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`async function* ref(a, b = 39,) { }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* ref(a, b = 39,) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
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
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'ref',
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`async function* f([[,] = g()]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([[,] = g()]) { }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'ArrayPattern',
                                            elements: [
                                                null
                                            ],
                                            start: 19,
                                            end: 22,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 22
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'Identifier',
                                                name: 'g',
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
                                            },
                                            arguments: [],
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
                                            }
                                        },
                                        start: 19,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        }
                                    }
                                ],
                                start: 18,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
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
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                            }
                        },
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`async function* f([[...x] = function() {}()]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([[...x] = function() {}()]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'RestElement',
                                                    argument: {
                                                        type: 'Identifier',
                                                        name: 'x',
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
                                                    start: 20,
                                                    end: 24,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 20
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 24
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 19,
                                            end: 25,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 25
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'FunctionExpression',
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [],
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
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: null,
                                                start: 28,
                                                end: 41,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 41
                                                    }
                                                }
                                            },
                                            arguments: [],
                                            start: 28,
                                            end: 43,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 43
                                                }
                                            }
                                        },
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
                                    }
                                ],
                                start: 18,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                    }
                ],
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

        pass(`async function* f([arrow = () => {}]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([arrow = () => {}]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'arrow',
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
                                            }
                                        },
                                        right: {
                                            type: 'ArrowFunctionExpression',
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 33,
                                                end: 35,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 33
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 35
                                                    }
                                                }
                                            },
                                            params: [],
                                            id: null,
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            start: 27,
                                            end: 35,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 35
                                                }
                                            }
                                        },
                                        start: 19,
                                        end: 35,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 35
                                            }
                                        }
                                    }
                                ],
                                start: 18,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                    }
                ],
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
            }
        });

        pass(`async function* f([x, y, z]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([x, y, z]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        name: 'y',
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
                                        name: 'z',
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
                                start: 18,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                    }
                ],
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

        pass(`async function* f([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'ObjectPattern',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'x',
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
                                                        }
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'x',
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
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: true,
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
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'y',
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
                                                        }
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'y',
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
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: true,
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
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'z',
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
                                                        }
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'z',
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
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: true,
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
                                                    }
                                                }
                                            ],
                                            start: 19,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'ObjectExpression',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'x',
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
                                                        }
                                                    },
                                                    value: {
                                                        type: 'Literal',
                                                        value: 44,
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
                                                        raw: '44'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
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
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'y',
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
                                                    value: {
                                                        type: 'Literal',
                                                        value: 55,
                                                        start: 45,
                                                        end: 47,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 45
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 47
                                                            }
                                                        },
                                                        raw: '55'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
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
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'z',
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
                                                    value: {
                                                        type: 'Literal',
                                                        value: 66,
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
                                                        },
                                                        raw: '66'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 49,
                                                    end: 54,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 49
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 54
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 33,
                                            end: 56,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 56
                                                }
                                            }
                                        },
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
                                    }
                                ],
                                start: 18,
                                end: 57,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 57
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 59,
                            end: 61,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 59
                                },
                                end: {
                                    line: 1,
                                    column: 61
                                }
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                    }
                ],
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
            }
        });

        pass(`async function* f([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'ObjectPattern',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'u',
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
                                                        }
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'v',
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
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: false,
                                                    start: 21,
                                                    end: 25,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 21
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 25
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'w',
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
                                                        }
                                                    },
                                                    computed: false,
                                                    value: {
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
                                                    method: false,
                                                    shorthand: false,
                                                    start: 27,
                                                    end: 31,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 27
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 31
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'y',
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
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'z',
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
                                                }
                                            ],
                                            start: 19,
                                            end: 39,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'ObjectExpression',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'u',
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
                                                    value: {
                                                        type: 'Literal',
                                                        value: 444,
                                                        start: 47,
                                                        end: 50,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 47
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 50
                                                            }
                                                        },
                                                        raw: '444'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 44,
                                                    end: 50,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 44
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 50
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'w',
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
                                                    value: {
                                                        type: 'Literal',
                                                        value: 555,
                                                        start: 55,
                                                        end: 58,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 55
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 58
                                                            }
                                                        },
                                                        raw: '555'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 52,
                                                    end: 58,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 52
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 58
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'y',
                                                        start: 60,
                                                        end: 61,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 60
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 61
                                                            }
                                                        }
                                                    },
                                                    value: {
                                                        type: 'Literal',
                                                        value: 666,
                                                        start: 63,
                                                        end: 66,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 63
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 66
                                                            }
                                                        },
                                                        raw: '666'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 60,
                                                    end: 66,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 60
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 66
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 42,
                                            end: 68,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 42
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 68
                                                }
                                            }
                                        },
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
                                    }
                                ],
                                start: 18,
                                end: 69,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 69
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 71,
                            end: 73,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 71
                                },
                                end: {
                                    line: 1,
                                    column: 73
                                }
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                            }
                        },
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`async function* f([{ x }]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([{ x }]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                kind: 'init',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'x',
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
                                                    }
                                                },
                                                computed: false,
                                                value: {
                                                    type: 'Identifier',
                                                    name: 'x',
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
                                                    }
                                                },
                                                method: false,
                                                shorthand: true,
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
                                                }
                                            }
                                        ],
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
                                        }
                                    }
                                ],
                                start: 18,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                            }
                        },
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`async function* f([]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'ArrayPattern',
                                elements: [],
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
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                    }
                ],
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

        pass(`async function* f([, , ...x]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([, , ...x]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'ArrayPattern',
                                elements: [
                                    null,
                                    null,
                                    {
                                        type: 'RestElement',
                                        argument: {
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
                                        }
                                    }
                                ],
                                start: 18,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                            }
                        },
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
                ],
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

        pass(`async function* f([...{ 0: v, 1: w, 2: x, 3: y, length: z }]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([...{ 0: v, 1: w, 2: x, 3: y, length: z }]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'RestElement',
                                        argument: {
                                            type: 'ObjectPattern',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Literal',
                                                        value: 0,
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
                                                        raw: '0'
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'v',
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
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: false,
                                                    start: 24,
                                                    end: 28,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 24
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 28
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Literal',
                                                        value: 1,
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
                                                        raw: '1'
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'w',
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
                                                    method: false,
                                                    shorthand: false,
                                                    start: 30,
                                                    end: 34,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 30
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 34
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Literal',
                                                        value: 2,
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
                                                        raw: '2'
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'x',
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
                                                    },
                                                    method: false,
                                                    shorthand: false,
                                                    start: 36,
                                                    end: 40,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 36
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 40
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Literal',
                                                        value: 3,
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
                                                        raw: '3'
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'y',
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
                                                    method: false,
                                                    shorthand: false,
                                                    start: 42,
                                                    end: 46,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 42
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 46
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'length',
                                                        start: 48,
                                                        end: 54,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 48
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 54
                                                            }
                                                        }
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'z',
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
                                                    start: 48,
                                                    end: 57,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 48
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 57
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 22,
                                            end: 59,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 59
                                                }
                                            }
                                        },
                                        start: 19,
                                        end: 59,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 59
                                            }
                                        }
                                    }
                                ],
                                start: 18,
                                end: 60,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 60
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                    }
                ],
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

        pass(`async function* f([x, y, z] = [1, 2, 3]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([x, y, z] = [1, 2, 3]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'Identifier',
                                            name: 'x',
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
                                            name: 'y',
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
                                            name: 'z',
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
                                    start: 18,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    }
                                },
                                right: {
                                    type: 'ArrayExpression',
                                    elements: [
                                        {
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
                                        {
                                            type: 'Literal',
                                            value: 2,
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
                                            raw: '2'
                                        },
                                        {
                                            type: 'Literal',
                                            value: 3,
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
                                            raw: '3'
                                        }
                                    ],
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
                                    }
                                },
                                start: 18,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            }
                        ],
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
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                    }
                ],
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

        pass(`async function* f([[x]] = [null]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([[x]] = [null]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'x',
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
                                            start: 19,
                                            end: 22,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 22
                                                }
                                            }
                                        }
                                    ],
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
                                    }
                                },
                                right: {
                                    type: 'ArrayExpression',
                                    elements: [
                                        {
                                            type: 'Literal',
                                            value: null,
                                            start: 27,
                                            end: 31,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 31
                                                }
                                            },
                                            raw: 'null'
                                        }
                                    ],
                                    start: 26,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                },
                                start: 18,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                    }
                ],
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
            }
        });

        pass(`async function* f([x = 23] = [,]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([x = 23] = [,]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: 'x',
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
                                                type: 'Literal',
                                                value: 23,
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
                                                raw: '23'
                                            },
                                            start: 19,
                                            end: 25,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 25
                                                }
                                            }
                                        }
                                    ],
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
                                    }
                                },
                                right: {
                                    type: 'ArrayExpression',
                                    elements: [
                                        null
                                    ],
                                    start: 29,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                },
                                start: 18,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                    }
                ],
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
            }
        });

        pass(`async function* f([x] = []) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([x] = []) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'Identifier',
                                            name: 'x',
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
                                        }
                                    ],
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
                                    }
                                },
                                right: {
                                    type: 'ArrayExpression',
                                    elements: [],
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
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                            }
                        },
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`async function* f([{ x, y, z } = { x: 44, y: 55, z: 66 }] = []) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([{ x, y, z } = { x: 44, y: 55, z: 66 }] = []) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'ObjectPattern',
                                                properties: [
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'x',
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
                                                            }
                                                        },
                                                        computed: false,
                                                        value: {
                                                            type: 'Identifier',
                                                            name: 'x',
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
                                                            }
                                                        },
                                                        method: false,
                                                        shorthand: true,
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
                                                        }
                                                    },
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                            }
                                                        },
                                                        computed: false,
                                                        value: {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                            }
                                                        },
                                                        method: false,
                                                        shorthand: true,
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
                                                        }
                                                    },
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'z',
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
                                                            }
                                                        },
                                                        computed: false,
                                                        value: {
                                                            type: 'Identifier',
                                                            name: 'z',
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
                                                            }
                                                        },
                                                        method: false,
                                                        shorthand: true,
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
                                                        }
                                                    }
                                                ],
                                                start: 19,
                                                end: 30,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'ObjectExpression',
                                                properties: [
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'x',
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
                                                            }
                                                        },
                                                        value: {
                                                            type: 'Literal',
                                                            value: 44,
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
                                                            raw: '44'
                                                        },
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
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
                                                        }
                                                    },
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                        value: {
                                                            type: 'Literal',
                                                            value: 55,
                                                            start: 45,
                                                            end: 47,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 45
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 47
                                                                }
                                                            },
                                                            raw: '55'
                                                        },
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
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
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'z',
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
                                                        value: {
                                                            type: 'Literal',
                                                            value: 66,
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
                                                            },
                                                            raw: '66'
                                                        },
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
                                                        start: 49,
                                                        end: 54,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 49
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 54
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 33,
                                                end: 56,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 33
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 56
                                                    }
                                                }
                                            },
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
                                        }
                                    ],
                                    start: 18,
                                    end: 57,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 57
                                        }
                                    }
                                },
                                right: {
                                    type: 'ArrayExpression',
                                    elements: [],
                                    start: 60,
                                    end: 62,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 60
                                        },
                                        end: {
                                            line: 1,
                                            column: 62
                                        }
                                    }
                                },
                                start: 18,
                                end: 62,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 62
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 64,
                            end: 66,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 64
                                },
                                end: {
                                    line: 1,
                                    column: 66
                                }
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                            }
                        },
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`async function* f([...[,]] = g()) {}
        async function* f([...[,]] = g()) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([...[,]] = g()) {}
            async function* f([...[,]] = g()) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'RestElement',
                                            argument: {
                                                type: 'ArrayPattern',
                                                elements: [
                                                    null
                                                ],
                                                start: 22,
                                                end: 25,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 22
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 25
                                                    }
                                                }
                                            },
                                            start: 19,
                                            end: 25,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 25
                                                }
                                            }
                                        }
                                    ],
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
                                    }
                                },
                                right: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'g',
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
                                    },
                                    arguments: [],
                                    start: 29,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                },
                                start: 18,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'RestElement',
                                            argument: {
                                                type: 'ArrayPattern',
                                                elements: [
                                                    null
                                                ],
                                                start: 71,
                                                end: 74,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 34
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 37
                                                    }
                                                }
                                            },
                                            start: 68,
                                            end: 74,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 37
                                                }
                                            }
                                        }
                                    ],
                                    start: 67,
                                    end: 75,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 30
                                        },
                                        end: {
                                            line: 2,
                                            column: 38
                                        }
                                    }
                                },
                                right: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'g',
                                        start: 78,
                                        end: 79,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 41
                                            },
                                            end: {
                                                line: 2,
                                                column: 42
                                            }
                                        }
                                    },
                                    arguments: [],
                                    start: 78,
                                    end: 81,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 41
                                        },
                                        end: {
                                            line: 2,
                                            column: 44
                                        }
                                    }
                                },
                                start: 67,
                                end: 81,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 30
                                    },
                                    end: {
                                        line: 2,
                                        column: 44
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 83,
                            end: 85,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 46
                                },
                                end: {
                                    line: 2,
                                    column: 48
                                }
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
                            start: 65,
                            end: 66,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 28
                                },
                                end: {
                                    line: 2,
                                    column: 29
                                }
                            }
                        },
                        start: 49,
                        end: 85,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 2,
                                column: 48
                            }
                        }
                    }
                ],
                start: 0,
                end: 85,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 2,
                        column: 48
                    }
                }
            }
        });

        pass(`async function* f([...{ length }] = [1, 2, 3]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f([...{ length }] = [1, 2, 3]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'RestElement',
                                            argument: {
                                                type: 'ObjectPattern',
                                                properties: [
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'length',
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
                                                        computed: false,
                                                        value: {
                                                            type: 'Identifier',
                                                            name: 'length',
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
                                                        method: false,
                                                        shorthand: true,
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
                                                    }
                                                ],
                                                start: 22,
                                                end: 32,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 22
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 32
                                                    }
                                                }
                                            },
                                            start: 19,
                                            end: 32,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 32
                                                }
                                            }
                                        }
                                    ],
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
                                    }
                                },
                                right: {
                                    type: 'ArrayExpression',
                                    elements: [
                                        {
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
                                        {
                                            type: 'Literal',
                                            value: 2,
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
                                            raw: '2'
                                        },
                                        {
                                            type: 'Literal',
                                            value: 3,
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
                                            raw: '3'
                                        }
                                    ],
                                    start: 36,
                                    end: 45,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 45
                                        }
                                    }
                                },
                                start: 18,
                                end: 45,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 45
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 47,
                            end: 49,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 47
                                },
                                end: {
                                    line: 1,
                                    column: 49
                                }
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                    }
                ],
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

        pass(`async function* f({} = obj) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f({} = obj) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'ObjectPattern',
                                    properties: [],
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
                                right: {
                                    type: 'Identifier',
                                    name: 'obj',
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
                                    }
                                },
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
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                            }
                        },
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`async function* f({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Identifier',
                                                name: 'w',
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
                                            computed: false,
                                            value: {
                                                type: 'AssignmentPattern',
                                                left: {
                                                    type: 'ArrayPattern',
                                                    elements: [
                                                        {
                                                            type: 'Identifier',
                                                            name: 'x',
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
                                                            }
                                                        },
                                                        {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                            }
                                                        },
                                                        {
                                                            type: 'Identifier',
                                                            name: 'z',
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
                                                        }
                                                    ],
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
                                                    }
                                                },
                                                right: {
                                                    type: 'ArrayExpression',
                                                    elements: [
                                                        {
                                                            type: 'Literal',
                                                            value: 4,
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
                                                            raw: '4'
                                                        },
                                                        {
                                                            type: 'Literal',
                                                            value: 5,
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
                                                            raw: '5'
                                                        },
                                                        {
                                                            type: 'Literal',
                                                            value: 6,
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
                                                            raw: '6'
                                                        }
                                                    ],
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
                                                    }
                                                },
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
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
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
                                            }
                                        }
                                    ],
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
                                    }
                                },
                                right: {
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'w',
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
                                            value: {
                                                type: 'ArrayExpression',
                                                elements: [
                                                    {
                                                        type: 'Literal',
                                                        value: 7,
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
                                                        raw: '7'
                                                    },
                                                    {
                                                        type: 'Identifier',
                                                        name: 'undefined',
                                                        start: 58,
                                                        end: 67,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 58
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 67
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 54,
                                                end: 70,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 54
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 70
                                                    }
                                                }
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: false,
                                            shorthand: false,
                                            start: 51,
                                            end: 70,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 51
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 70
                                                }
                                            }
                                        }
                                    ],
                                    start: 49,
                                    end: 72,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 49
                                        },
                                        end: {
                                            line: 1,
                                            column: 72
                                        }
                                    }
                                },
                                start: 18,
                                end: 72,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 72
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 74,
                            end: 76,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 74
                                },
                                end: {
                                    line: 1,
                                    column: 76
                                }
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                            }
                        },
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`async function* f({ x: y } = { x: 23 }) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f({ x: y } = { x: 23 }) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Identifier',
                                                name: 'x',
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
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'y',
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
                                            method: false,
                                            shorthand: false,
                                            start: 20,
                                            end: 24,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 24
                                                }
                                            }
                                        }
                                    ],
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
                                    }
                                },
                                right: {
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'x',
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
                                            value: {
                                                type: 'Literal',
                                                value: 23,
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
                                                raw: '23'
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: false,
                                            shorthand: false,
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
                                        }
                                    ],
                                    start: 29,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 38
                                        }
                                    }
                                },
                                start: 18,
                                end: 38,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 38
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                            }
                        },
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`async function* f({ cover = (function () {}), xCover = (0, function() {})  }) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* f({ cover = (function () {}), xCover = (0, function() {})  }) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [
                            {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'cover',
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
                                            }
                                        },
                                        computed: false,
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: 'cover',
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
                                                start: 29,
                                                end: 43,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 29
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 43
                                                    }
                                                }
                                            },
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
                                            }
                                        },
                                        method: false,
                                        shorthand: true,
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
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'xCover',
                                            start: 46,
                                            end: 52,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 46
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 52
                                                }
                                            }
                                        },
                                        computed: false,
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: 'xCover',
                                                start: 46,
                                                end: 52,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 46
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 52
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'SequenceExpression',
                                                expressions: [
                                                    {
                                                        type: 'Literal',
                                                        value: 0,
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
                                                        raw: '0'
                                                    },
                                                    {
                                                        type: 'FunctionExpression',
                                                        params: [],
                                                        body: {
                                                            type: 'BlockStatement',
                                                            body: [],
                                                            start: 70,
                                                            end: 72,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 70
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 72
                                                                }
                                                            }
                                                        },
                                                        async: false,
                                                        generator: false,
                                                        expression: false,
                                                        id: null,
                                                        start: 59,
                                                        end: 72,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 59
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 72
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 56,
                                                end: 72,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 56
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 72
                                                    }
                                                }
                                            },
                                            start: 46,
                                            end: 73,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 46
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 73
                                                }
                                            }
                                        },
                                        method: false,
                                        shorthand: true,
                                        start: 46,
                                        end: 73,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 46
                                            },
                                            end: {
                                                line: 1,
                                                column: 73
                                            }
                                        }
                                    }
                                ],
                                start: 18,
                                end: 76,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 76
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 78,
                            end: 80,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 78
                                },
                                end: {
                                    line: 1,
                                    column: 80
                                }
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                            }
                        },
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`async function* ref(a,) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function* ref(a,) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
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
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'ref',
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`async function *gen() {
            yield {
                ...yield,
                y: 1,
                ...yield yield,
              };
          }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function *gen() {
                yield {
                    ...yield,
                    y: 1,
                    ...yield yield,
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
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'ObjectExpression',
                                            properties: [
                                                {
                                                    type: 'SpreadElement',
                                                    argument: {
                                                        type: 'YieldExpression',
                                                        argument: null,
                                                        delegate: false,
                                                        start: 71,
                                                        end: 76,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 23
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 28
                                                            }
                                                        }
                                                    },
                                                    start: 68,
                                                    end: 76,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 20
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 28
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'y',
                                                        start: 98,
                                                        end: 99,
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
                                                    },
                                                    value: {
                                                        type: 'Literal',
                                                        value: 1,
                                                        start: 101,
                                                        end: 102,
                                                        loc: {
                                                            start: {
                                                                line: 4,
                                                                column: 23
                                                            },
                                                            end: {
                                                                line: 4,
                                                                column: 24
                                                            }
                                                        },
                                                        raw: '1'
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 98,
                                                    end: 102,
                                                    loc: {
                                                        start: {
                                                            line: 4,
                                                            column: 20
                                                        },
                                                        end: {
                                                            line: 4,
                                                            column: 24
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'SpreadElement',
                                                    argument: {
                                                        type: 'YieldExpression',
                                                        argument: {
                                                            type: 'YieldExpression',
                                                            argument: null,
                                                            delegate: false,
                                                            start: 133,
                                                            end: 138,
                                                            loc: {
                                                                start: {
                                                                    line: 5,
                                                                    column: 29
                                                                },
                                                                end: {
                                                                    line: 5,
                                                                    column: 34
                                                                }
                                                            }
                                                        },
                                                        delegate: false,
                                                        start: 127,
                                                        end: 138,
                                                        loc: {
                                                            start: {
                                                                line: 5,
                                                                column: 23
                                                            },
                                                            end: {
                                                                line: 5,
                                                                column: 34
                                                            }
                                                        }
                                                    },
                                                    start: 124,
                                                    end: 138,
                                                    loc: {
                                                        start: {
                                                            line: 5,
                                                            column: 20
                                                        },
                                                        end: {
                                                            line: 5,
                                                            column: 34
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 46,
                                            end: 159,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 19
                                                }
                                            }
                                        },
                                        delegate: false,
                                        start: 40,
                                        end: 159,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 16
                                            },
                                            end: {
                                                line: 6,
                                                column: 19
                                            }
                                        }
                                    },
                                    start: 40,
                                    end: 160,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 16
                                        },
                                        end: {
                                            line: 6,
                                            column: 20
                                        }
                                    }
                                }
                            ],
                            start: 22,
                            end: 176,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 7,
                                    column: 15
                                }
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'gen',
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
                        start: 0,
                        end: 176,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 7,
                                column: 15
                            }
                        }
                    }
                ],
                start: 0,
                end: 176,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 7,
                        column: 15
                    }
                }
            }
        });

        pass(`async function *gen() {
            yield [...yield];
          }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function *gen() {
                yield [...yield];
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
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'ArrayExpression',
                                            elements: [
                                                {
                                                    type: 'SpreadElement',
                                                    argument: {
                                                        type: 'YieldExpression',
                                                        argument: null,
                                                        delegate: false,
                                                        start: 50,
                                                        end: 55,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 26
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 31
                                                            }
                                                        }
                                                    },
                                                    start: 47,
                                                    end: 55,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 23
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 31
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 46,
                                            end: 56,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 32
                                                }
                                            }
                                        },
                                        delegate: false,
                                        start: 40,
                                        end: 56,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 16
                                            },
                                            end: {
                                                line: 2,
                                                column: 32
                                            }
                                        }
                                    },
                                    start: 40,
                                    end: 57,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 16
                                        },
                                        end: {
                                            line: 2,
                                            column: 33
                                        }
                                    }
                                }
                            ],
                            start: 22,
                            end: 73,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 3,
                                    column: 15
                                }
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'gen',
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
                        start: 0,
                        end: 73,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 3,
                                column: 15
                            }
                        }
                    }
                ],
                start: 0,
                end: 73,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 3,
                        column: 15
                    }
                }
            }
        });

        pass(`async function *gen() {
            yield {
                 ...yield yield,
                 ...(function(arg) {
                    var yield = arg;
                    return {...yield};
                 }(yield)),
                 ...yield,
              }
          }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function *gen() {
                yield {
                     ...yield yield,
                     ...(function(arg) {
                        var yield = arg;
                        return {...yield};
                     }(yield)),
                     ...yield,
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
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'ObjectExpression',
                                            properties: [
                                                {
                                                    type: 'SpreadElement',
                                                    argument: {
                                                        type: 'YieldExpression',
                                                        argument: {
                                                            type: 'YieldExpression',
                                                            argument: null,
                                                            delegate: false,
                                                            start: 78,
                                                            end: 83,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 30
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 35
                                                                }
                                                            }
                                                        },
                                                        delegate: false,
                                                        start: 72,
                                                        end: 83,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 24
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 35
                                                            }
                                                        }
                                                    },
                                                    start: 69,
                                                    end: 83,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 21
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 35
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'SpreadElement',
                                                    argument: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'FunctionExpression',
                                                            params: [
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'arg',
                                                                    start: 119,
                                                                    end: 122,
                                                                    loc: {
                                                                        start: {
                                                                            line: 4,
                                                                            column: 34
                                                                        },
                                                                        end: {
                                                                            line: 4,
                                                                            column: 37
                                                                        }
                                                                    }
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
                                                                                    type: 'Identifier',
                                                                                    name: 'arg',
                                                                                    start: 162,
                                                                                    end: 165,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 5,
                                                                                            column: 36
                                                                                        },
                                                                                        end: {
                                                                                            line: 5,
                                                                                            column: 39
                                                                                        }
                                                                                    }
                                                                                },
                                                                                id: {
                                                                                    type: 'Identifier',
                                                                                    name: 'yield',
                                                                                    start: 154,
                                                                                    end: 159,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 5,
                                                                                            column: 28
                                                                                        },
                                                                                        end: {
                                                                                            line: 5,
                                                                                            column: 33
                                                                                        }
                                                                                    }
                                                                                },
                                                                                start: 154,
                                                                                end: 165,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 5,
                                                                                        column: 28
                                                                                    },
                                                                                    end: {
                                                                                        line: 5,
                                                                                        column: 39
                                                                                    }
                                                                                }
                                                                            }
                                                                        ],
                                                                        kind: 'var',
                                                                        start: 150,
                                                                        end: 166,
                                                                        loc: {
                                                                            start: {
                                                                                line: 5,
                                                                                column: 24
                                                                            },
                                                                            end: {
                                                                                line: 5,
                                                                                column: 40
                                                                            }
                                                                        }
                                                                    },
                                                                    {
                                                                        type: 'ReturnStatement',
                                                                        argument: {
                                                                            type: 'ObjectExpression',
                                                                            properties: [
                                                                                {
                                                                                    type: 'SpreadElement',
                                                                                    argument: {
                                                                                        type: 'Identifier',
                                                                                        name: 'yield',
                                                                                        start: 202,
                                                                                        end: 207,
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 6,
                                                                                                column: 35
                                                                                            },
                                                                                            end: {
                                                                                                line: 6,
                                                                                                column: 40
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    start: 199,
                                                                                    end: 207,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 6,
                                                                                            column: 32
                                                                                        },
                                                                                        end: {
                                                                                            line: 6,
                                                                                            column: 40
                                                                                        }
                                                                                    }
                                                                                }
                                                                            ],
                                                                            start: 198,
                                                                            end: 208,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 6,
                                                                                    column: 31
                                                                                },
                                                                                end: {
                                                                                    line: 6,
                                                                                    column: 41
                                                                                }
                                                                            }
                                                                        },
                                                                        start: 191,
                                                                        end: 209,
                                                                        loc: {
                                                                            start: {
                                                                                line: 6,
                                                                                column: 24
                                                                            },
                                                                            end: {
                                                                                line: 6,
                                                                                column: 42
                                                                            }
                                                                        }
                                                                    }
                                                                ],
                                                                start: 124,
                                                                end: 232,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 39
                                                                    },
                                                                    end: {
                                                                        line: 7,
                                                                        column: 22
                                                                    }
                                                                }
                                                            },
                                                            async: false,
                                                            generator: false,
                                                            expression: false,
                                                            id: null,
                                                            start: 110,
                                                            end: 232,
                                                            loc: {
                                                                start: {
                                                                    line: 4,
                                                                    column: 25
                                                                },
                                                                end: {
                                                                    line: 7,
                                                                    column: 22
                                                                }
                                                            }
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'YieldExpression',
                                                                argument: null,
                                                                delegate: false,
                                                                start: 233,
                                                                end: 238,
                                                                loc: {
                                                                    start: {
                                                                        line: 7,
                                                                        column: 23
                                                                    },
                                                                    end: {
                                                                        line: 7,
                                                                        column: 28
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        start: 110,
                                                        end: 239,
                                                        loc: {
                                                            start: {
                                                                line: 4,
                                                                column: 25
                                                            },
                                                            end: {
                                                                line: 7,
                                                                column: 29
                                                            }
                                                        }
                                                    },
                                                    start: 106,
                                                    end: 240,
                                                    loc: {
                                                        start: {
                                                            line: 4,
                                                            column: 21
                                                        },
                                                        end: {
                                                            line: 7,
                                                            column: 30
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'SpreadElement',
                                                    argument: {
                                                        type: 'YieldExpression',
                                                        argument: null,
                                                        delegate: false,
                                                        start: 266,
                                                        end: 271,
                                                        loc: {
                                                            start: {
                                                                line: 8,
                                                                column: 24
                                                            },
                                                            end: {
                                                                line: 8,
                                                                column: 29
                                                            }
                                                        }
                                                    },
                                                    start: 263,
                                                    end: 271,
                                                    loc: {
                                                        start: {
                                                            line: 8,
                                                            column: 21
                                                        },
                                                        end: {
                                                            line: 8,
                                                            column: 29
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 46,
                                            end: 292,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 9,
                                                    column: 19
                                                }
                                            }
                                        },
                                        delegate: false,
                                        start: 40,
                                        end: 292,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 16
                                            },
                                            end: {
                                                line: 9,
                                                column: 19
                                            }
                                        }
                                    },
                                    start: 40,
                                    end: 292,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 16
                                        },
                                        end: {
                                            line: 9,
                                            column: 19
                                        }
                                    }
                                }
                            ],
                            start: 22,
                            end: 308,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 10,
                                    column: 15
                                }
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'gen',
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
                        start: 0,
                        end: 308,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 10,
                                column: 15
                            }
                        }
                    }
                ],
                start: 0,
                end: 308,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 10,
                        column: 15
                    }
                }
            }
        });

        pass(`async function *gen() {
            return (function(arg) {
                var yield = arg + 1;
                return yield;
              }(yield))
          }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `async function *gen() {
                return (function(arg) {
                    var yield = arg + 1;
                    return yield;
                  }(yield))
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
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'FunctionExpression',
                                            params: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'arg',
                                                    start: 57,
                                                    end: 60,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 33
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 36
                                                        }
                                                    }
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
                                                                        start: 96,
                                                                        end: 99,
                                                                        loc: {
                                                                            start: {
                                                                                line: 3,
                                                                                column: 32
                                                                            },
                                                                            end: {
                                                                                line: 3,
                                                                                column: 35
                                                                            }
                                                                        }
                                                                    },
                                                                    right: {
                                                                        type: 'Literal',
                                                                        value: 1,
                                                                        start: 102,
                                                                        end: 103,
                                                                        loc: {
                                                                            start: {
                                                                                line: 3,
                                                                                column: 38
                                                                            },
                                                                            end: {
                                                                                line: 3,
                                                                                column: 39
                                                                            }
                                                                        },
                                                                        raw: '1'
                                                                    },
                                                                    operator: '+',
                                                                    start: 96,
                                                                    end: 103,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 32
                                                                        },
                                                                        end: {
                                                                            line: 3,
                                                                            column: 39
                                                                        }
                                                                    }
                                                                },
                                                                id: {
                                                                    type: 'Identifier',
                                                                    name: 'yield',
                                                                    start: 88,
                                                                    end: 93,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 24
                                                                        },
                                                                        end: {
                                                                            line: 3,
                                                                            column: 29
                                                                        }
                                                                    }
                                                                },
                                                                start: 88,
                                                                end: 103,
                                                                loc: {
                                                                    start: {
                                                                        line: 3,
                                                                        column: 24
                                                                    },
                                                                    end: {
                                                                        line: 3,
                                                                        column: 39
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        kind: 'var',
                                                        start: 84,
                                                        end: 104,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 40
                                                            }
                                                        }
                                                    },
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'Identifier',
                                                            name: 'yield',
                                                            start: 132,
                                                            end: 137,
                                                            loc: {
                                                                start: {
                                                                    line: 4,
                                                                    column: 27
                                                                },
                                                                end: {
                                                                    line: 4,
                                                                    column: 32
                                                                }
                                                            }
                                                        },
                                                        start: 125,
                                                        end: 138,
                                                        loc: {
                                                            start: {
                                                                line: 4,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 4,
                                                                column: 33
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 62,
                                                end: 158,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 38
                                                    },
                                                    end: {
                                                        line: 5,
                                                        column: 19
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 48,
                                            end: 158,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 24
                                                },
                                                end: {
                                                    line: 5,
                                                    column: 19
                                                }
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'YieldExpression',
                                                argument: null,
                                                delegate: false,
                                                start: 159,
                                                end: 164,
                                                loc: {
                                                    start: {
                                                        line: 5,
                                                        column: 20
                                                    },
                                                    end: {
                                                        line: 5,
                                                        column: 25
                                                    }
                                                }
                                            }
                                        ],
                                        start: 48,
                                        end: 165,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 24
                                            },
                                            end: {
                                                line: 5,
                                                column: 26
                                            }
                                        }
                                    },
                                    start: 40,
                                    end: 166,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 16
                                        },
                                        end: {
                                            line: 5,
                                            column: 27
                                        }
                                    }
                                }
                            ],
                            start: 22,
                            end: 182,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 6,
                                    column: 15
                                }
                            }
                        },
                        async: true,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'gen',
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
                        start: 0,
                        end: 182,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 6,
                                column: 15
                            }
                        }
                    }
                ],
                start: 0,
                end: 182,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 6,
                        column: 15
                    }
                }
            }
        });

    });
});
