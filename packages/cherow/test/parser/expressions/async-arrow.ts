import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Async Arrows', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [
            '"use strict"; async(x = await) => {  }',
            'async() => { (a = await/r/g) => {} };',
            'async(a = (...await) => {}) => {};',
            `async ((x, y)) => 0`,
            'async(foo) => { super.prop };',
            'async(foo = super()) => {}',
            'async (foo = super.foo) => { }',
            `async ((x, y, z)) => 0`,
            `async ((x, y), z) => 0`,
            'async (x) => {}  ? a : b',
            'async (x) => {}a',
            'async (x) => {} 1',
            'async (x) => {} a()',
            'async (x) => {} + 2',
            'async (()) => 0',
            'async(,)',
            'async (,) => b;',
            'async 1 => b;',
            'async 1 => ;',
            'async => ;',
            'async (1) => {}',
            'async (1) => {}()',
            'async() => await',
            'async() => ((async(x = await 1) => x)();',
            'async().foo13 () => 1',
            'async().foo10 => 1',
            'async(...a, b) => b',
            '\'use strict\'; async yield => X',
            '\'use strict\'; async (yield) => X',
            '\'use strict\'; async X => yield',
            '\'use strict\'; async X => {yield}',
            'function* g() { async yield => X }',
            'function* g() { async (yield) => X }',
            'function* g() { async ({yield}) => X }',
            'async function a(k = await 3) {}',
            'async function a() { async function b([k = await 3]) {} }',
            'async function a() { async function b({k = [await 3]}) {} }',
            'var f = async() => ((async(x = await 1) => x)();',
            'async(...a,) => b',
            'async(...a, b) => b',
            'async(await) => b',
            'async(foo, await) => b',
            'async (...a,) => {}',
            'async(await) => {  }',
            'async (...a,) => {}',
            '"use strict"; async (eval) => {};',
            '"use strict"; async (foo, bar eval) => {};',
            'async() => { await: ; };',
            'async() => { void await; };',
            'async() => { var await; };',
            'async (await) => { "use strict"; };',
            'async (await) => {  };',
            'async (foo, bar, await) => {  };',
            'async (yield) => { "use strict"; };',
            'async (eval) => { "use strict"; };',
            'async (foo, eval) => { "use strict"; };',
            'async (foo, arguments, bar) => { "use strict"; };',
            `async
            (foo) => { }`,
            `async
            (a) => await a`,
            `async (a)
            => await a`,
            `async ()
            => 0`,
            `async a
            => await a`,
            '(async function foo4() { } => 1)',
            '(async function() { } foo5 => 1)',
            '(async function() { } () => 1)',
            '(async function() { } => 1)',
            'async(...a,) => b',
            'async(...a, b) => b',
            'async(...a,) => b',
            'async(...a, b) => b',
            'var asyncFn = async () => var await = \'test\';',
            'async(...a = b) => b',
            'async (...x = []) => {}',
            'async(...a = b) => b',
            'var asyncFn = async await => await + \'test\';',
        ];

        for (const arg of invalidSyntax) {

            it(`${arg};`, () => {
                t.throws(() => {
                    parseSource(`${arg};`, undefined, Context.Empty);
                });
            });

            it(`(${arg};)`, () => {
                t.throws(() => {
                    parseSource(`(${arg});`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

        const validSyntax = [
            'async () => {}',
            'async () => { return 42 }',
            'async x => { return x; }',
            'async (x) => { return x; }',
            'async (x, y) => { return x + y; }',
            'async (x, y, z) => { return x + y + z; }',
            'async (x, y) => { x.a = y; }',
            '(a, async promise => await promise)',
            'async(a = (await) => {}) => {};',
            'async () => 42',
            'async(yield) => b',
            'async(foo, yield) => b',
            'async (yield) => {  };',
            'async (foo, bar, yield) => {  };',
            'f(a, async(x, y) => await [x, y], b)',
            'const foo = ({ async = true }) => {};',
            'const foo = async ({ async: bar }) => { await baz; };',
            `async ({}) => 0`,
            'async(a,)',
            'async()()',
            'async (a,) => b;',
            '[async(x,y) => z]',
            '[async x => z]',
            'id = async x => x, square = async (y) => { y * y }',
            'f(a, async b => await b)',
            'async (x, y) => { x * y }',
            'async (x, y) => y',
            'async a => { await a }',
            'async (y) => y',
            'async (x, ...y) => x',
            'async (x,y,) => x',
            'async ({a = b}) => a',
            'async a => a',
            'async function foo(a = async () => await b) {}',
            '({async: 1})',
            'async yield => 1',
            'f(a, async (b, c) => await [b, c], d)',
            'f(a, async (b, c) => await [b, c], d)',
            'async()',
            'async(a, b)',
            'async(...a, ...b)',
            '({ ...async () => { }})',
            '(async x => y)',
            '(async (x, z) => y)',
            '({x: async (y,w) => z})',
            'async({x = yield}) => 1; ',
            'async (icefapper = bad) => {  }',
            'async ({a: b = c})',
            'async ({a = b}) => a',
            'async (a, b) => a',
            'async () => a',
            'var asyncFn = async({ foo = 1 }) => foo;',
            'var asyncFn = async({ foo = 1 } = {}) => foo;',
        ];

        for (const arg of validSyntax) {

            it(`${arg};`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg};`, undefined, Context.Empty);
                });
            });
        }

        pass('export default async x => x * x', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Module, {
            source: 'export default async x => x * x',
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [
                    {
                        type: 'ExportDefaultDeclaration',
                        declaration: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BinaryExpression',
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
                                operator: '*',
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
                                }
                            },
                            params: [
                                {
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
                                }
                            ],
                            id: null,
                            async: true,
                            generator: false,
                            expression: true,
                            start: 15,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 31
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

        pass('async () =>{};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'async () =>{};',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
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
                            async: true,
                            generator: false,
                            expression: false,
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
                    }
                ],
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

        pass('async ()', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'async ()',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'async',
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
                                }
                            },
                            arguments: [],
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
                    }
                ],
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
            }
        });

        pass('async a => b;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'async a => b;',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Identifier',
                                name: 'b',
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
                                }
                            },
                            params: [
                                {
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
                                }
                            ],
                            id: null,
                            async: true,
                            generator: false,
                            expression: true,
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
                            }
                        },
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
                        }
                    }
                ],
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
                }
            }
        });

        pass('async a => b => c;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'async a => b => c;',
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
                      async: true,
                      params: [
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
                          name: 'a'
                        }
                      ],
                      body: {
                        type: 'ArrowFunctionExpression',
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
                        expression: true,
                        async: false,
                        params: [
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
                            name: 'b'
                          }
                        ],
                        body: {
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
                          name: 'c'
                        }
                      }
                    }
                  }
                ],
                sourceType: 'script'
              }
        });
    });
});
