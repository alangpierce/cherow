import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Declarations - Generators', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failures', () => {

        const failures = [
            'var yield;',
            'var foo, yield;',
            'try { } catch (yield) { }',
            'function yield() { }',
            '(function * yield() { })',
            'function * foo(yield) { }',
            '(function * foo(yield) { })',
            'yield = 1;',
            'var foo = yield = 1;',
            '++yield;',
            'yield++;',
            'yield *',
            '(yield *)',
            'yield 3 + yield 4;',
            'yield: 34',
            'yield ? 1 : 2',
            'yield / yield',
            '+ yield',
            '+ yield 3',
            'yield\n*3',
            'yield\n{yield: 42}',
            'yield /* comment */\n {yield: 42}',
            'yield //comment\n {yield: 42}',
            'var [yield] = [42];',
            'var {foo: yield} = {a: 42};',
            '[yield] = [42];',
            '({a: yield} = {a: 42});',
            'var [yield 24] = [42];',
            'var {foo: yield 24} = {a: 42};',
            '[yield 24] = [42];',
            '({a: yield 24} = {a: 42});',
            'for (yield \'x\' in {});',
            'for (yield \'x\' of {});',
            'for (yield \'x\' in {} in {});',
            'for (yield \'x\' in {} of {});',
            'yield ? yield : yield',
            'class C extends yield { }',
            'class yield {}',
            // Can not use 'yield' as identifier inside a generator
            'function yield() { }',
        ];

        for (const arg of failures) {
            it(`function * gen() { ${arg} } `, () => {
                t.throws(() => {
                    parseSource(`async function * gen() { ${arg} } `, undefined, Context.Empty);
                });
            });
        }

        fail('function *g(x = yield){}', Context.Empty, {
            source: 'function *g(x = yield){}',
         });

    });

    describe('Pass', () => {

        const valid = [
            '',
            'yield 2;',
            'yield * 2;',
            'yield * \n 2;',
            'yield yield 1;',
            'yield * yield * 1;',
            'yield 3 + (yield 4);',
            'yield * 3 + (yield * 4);',
            '(yield * 3) + (yield * 4);',
            'yield 3; yield 4;',
            'yield * 3; yield * 4;',
            '(function (yield) { })',
            '(function yield() { })',
            'yield { yield: 12 }',
            'yield /* comment */ { yield: 12 }',
            'yield * \n { yield: 12 }',
            'yield /* comment */ * \n { yield: 12 }',
            'yield 1; return',
            'yield * 1; return',
            // issue #83
            'yield this.values()',
            'yield this.values().sort((a, b) => { return a > b })',
            'this.e = awsome',
            'yield this.a **2',
            'yield \'string\'',
            'yield 1; return 2',
            'yield * 1; return 2',
            'yield 1; return 1; yield \'string\';',
            'yield * 1; return 1; yield * \'string\';',
            '({ yield: 1 })',
            '({ get yield() { } })',
            '({ [yield]: x } = { })',
            'yield;',
            'yield',
            'yield\n',
            'yield /* comment */',
            'yield // comment\n',
            '(yield)',
            '[yield]',
            '{yield}',
            'yield this.foo',
            'yield, yield',
            'yield; yield',
            '(yield) ? yield : yield',
            '(yield) \n ? yield : yield',
            'yield\nfor (;;) {}',
            'foo = class extends (yield) {}',
            'foo = class extends f(yield) {}',
            'foo = class extends (null, yield) { }',
            'foo = class extends (a ? null : yield) { }',
        ];

        for (const arg of valid) {

            it(`function * gen() {${arg} }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`function * gen() { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`(function * gen() {${arg} })`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(function * gen() {${arg} })`, undefined, Context.Empty);
                });
            });

            it(`(function * () {${arg} })`, () => {
                t.doesNotThrow(() => {
                    parseSource(`(function * () {${arg} })`, undefined, Context.Empty);
                });
            });
        }

        fail('function* g() { yield\n* foo }', Context.Empty, {
            source: 'function* g() { yield\n* foo }',
        });

        fail('function* g() { yield ? yield : yield }', Context.Empty, {
            source: 'function* g() { yield ? yield : yield }',
        });

        fail('function* g() { yield 3 + yield 4; }', Context.Empty, {
            source: 'function* g() { yield 3 + yield 4; }',
        });

        fail('function f() { \'use strict\'; var yield = 13; }', Context.Empty, {
            source: 'function f() { \'use strict\'; var yield = 13; }',
        });

        fail('function f() { (function* yield() {}); }', Context.Empty, {
            source: 'function f() { (function* yield() {}); }',
        });

        fail('function* g() { (function* yield() {}); }', Context.Empty, {
            source: 'function* g() { (function* yield() {}); }',
        });

        fail('function* g(yield) { yield (10); }', Context.Empty, {
            source: 'function* g(yield) { yield (10); }',
        });

        fail('function* f(...x = []) {}', Context.Empty, {
            source: 'function* f(...x = []) {}',
        });

        fail('function* f([...[ x ] = []]) {}', Context.Empty, {
            source: 'function* f([...[ x ] = []]) {}',
        });

        fail('function* f([...x = []]) {}', Context.Empty, {
            source: 'function* f([...x = []]) {}',
        });

        fail('function* f([...{ x } = []]) {}', Context.Empty, {
            source: 'function* f([...{ x } = []]) {}',
        });

        fail('function* f([...{ x }, y]) {}', Context.Empty, {
            source: 'function* f([...{ x }, y]) {}',
        });

        fail('function* f([...[ x ] = []] = []) {}', Context.Empty, {
            source: 'function* f([...[ x ] = []] = []) {}',
        });

        fail('function* f([...{ x } = []] = []) {}', Context.Empty, {
            source: 'function* f([...{ x } = []] = []) {}',
        });

        fail('function* g(x = yield) {}', Context.Empty, {
             source: 'function* g(x = yield) {}',
          });

        fail('function* f(...a,) {}', Context.Empty, {
            source: 'function* f(...a,) {}',
        });

        fail('function *gen() { var yield; }', Context.Empty, {
            source: 'function *gen() { var yield; }',
        });

        fail('function* g() { yield 3 + yield 4; }', Context.Empty, {
            source: 'function* g() { yield 3 + yield 4; }',
        });
    });

    describe('Pass', () => {

        pass(`// Yield statements.
        function* g() { yield 3; yield 4; }

        // Yield expressions.
        function* g() { (yield 3) + (yield 4); }

        // Yield without a RHS.
        function* g() { yield; }
        function* g() { yield }
        function* g() {
            yield
        }
        function* g() { (yield) }
        function* g() { [yield] }
        function* g() { {yield} }
        function* g() { (yield), (yield) }
        function* g() { yield; yield }
        function* g() { (yield) ? yield : yield }
        function* g() {
            (yield)
            ? yield
            : yield
        }`, Context.OptionsRanges | Context.OptionsRaw, {
            source: `// Yield statements.
            function* g() { yield 3; yield 4; }

            // Yield expressions.
            function* g() { (yield 3) + (yield 4); }

            // Yield without a RHS.
            function* g() { yield; }
            function* g() { yield }
            function* g() {
                yield
            }
            function* g() { (yield) }
            function* g() { [yield] }
            function* g() { {yield} }
            function* g() { (yield), (yield) }
            function* g() { yield; yield }
            function* g() { (yield) ? yield : yield }
            function* g() {
                (yield)
                ? yield
                : yield
            }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 702,
                body: [
                  {
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 68,
                    id: {
                      type: 'Identifier',
                      start: 43,
                      end: 44,
                      name: 'g'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 47,
                      end: 68,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 49,
                          end: 57,
                          expression: {
                            type: 'YieldExpression',
                            start: 49,
                            end: 56,
                            delegate: false,
                            argument: {
                              type: 'Literal',
                              start: 55,
                              end: 56,
                              value: 3,
                              raw: '3'
                            }
                          }
                        },
                        {
                          type: 'ExpressionStatement',
                          start: 58,
                          end: 66,
                          expression: {
                            type: 'YieldExpression',
                            start: 58,
                            end: 65,
                            delegate: false,
                            argument: {
                              type: 'Literal',
                              start: 64,
                              end: 65,
                              value: 4,
                              raw: '4'
                            }
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    start: 116,
                    end: 156,
                    id: {
                      type: 'Identifier',
                      start: 126,
                      end: 127,
                      name: 'g'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 130,
                      end: 156,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 132,
                          end: 154,
                          expression: {
                            type: 'BinaryExpression',
                            start: 132,
                            end: 153,
                            left: {
                              type: 'YieldExpression',
                              start: 133,
                              end: 140,
                              delegate: false,
                              argument: {
                                type: 'Literal',
                                start: 139,
                                end: 140,
                                value: 3,
                                raw: '3'
                              }
                            },
                            operator: '+',
                            right: {
                              type: 'YieldExpression',
                              start: 145,
                              end: 152,
                              delegate: false,
                              argument: {
                                type: 'Literal',
                                start: 151,
                                end: 152,
                                value: 4,
                                raw: '4'
                              }
                            }
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    start: 206,
                    end: 230,
                    id: {
                      type: 'Identifier',
                      start: 216,
                      end: 217,
                      name: 'g'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 220,
                      end: 230,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 222,
                          end: 228,
                          expression: {
                            type: 'YieldExpression',
                            start: 222,
                            end: 227,
                            delegate: false,
                            argument: null
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    start: 243,
                    end: 266,
                    id: {
                      type: 'Identifier',
                      start: 253,
                      end: 254,
                      name: 'g'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 257,
                      end: 266,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 259,
                          end: 264,
                          expression: {
                            type: 'YieldExpression',
                            start: 259,
                            end: 264,
                            delegate: false,
                            argument: null
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    start: 279,
                    end: 330,
                    id: {
                      type: 'Identifier',
                      start: 289,
                      end: 290,
                      name: 'g'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 293,
                      end: 330,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 311,
                          end: 316,
                          expression: {
                            type: 'YieldExpression',
                            start: 311,
                            end: 316,
                            delegate: false,
                            argument: null
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    start: 343,
                    end: 368,
                    id: {
                      type: 'Identifier',
                      start: 353,
                      end: 354,
                      name: 'g'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 357,
                      end: 368,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 359,
                          end: 366,
                          expression: {
                            type: 'YieldExpression',
                            start: 360,
                            end: 365,
                            delegate: false,
                            argument: null
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    start: 381,
                    end: 406,
                    id: {
                      type: 'Identifier',
                      start: 391,
                      end: 392,
                      name: 'g'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 395,
                      end: 406,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 397,
                          end: 404,
                          expression: {
                            type: 'ArrayExpression',
                            start: 397,
                            end: 404,
                            elements: [
                              {
                                type: 'YieldExpression',
                                start: 398,
                                end: 403,
                                delegate: false,
                                argument: null
                              }
                            ]
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    start: 419,
                    end: 444,
                    id: {
                      type: 'Identifier',
                      start: 429,
                      end: 430,
                      name: 'g'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 433,
                      end: 444,
                      body: [
                        {
                          type: 'BlockStatement',
                          start: 435,
                          end: 442,
                          body: [
                            {
                              type: 'ExpressionStatement',
                              start: 436,
                              end: 441,
                              expression: {
                                type: 'YieldExpression',
                                start: 436,
                                end: 441,
                                delegate: false,
                                argument: null
                              }
                            }
                          ]
                        }
                      ]
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    start: 457,
                    end: 491,
                    id: {
                      type: 'Identifier',
                      start: 467,
                      end: 468,
                      name: 'g'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 471,
                      end: 491,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 473,
                          end: 489,
                          expression: {
                            type: 'SequenceExpression',
                            start: 473,
                            end: 489,
                            expressions: [
                              {
                                type: 'YieldExpression',
                                start: 474,
                                end: 479,
                                delegate: false,
                                argument: null
                              },
                              {
                                type: 'YieldExpression',
                                start: 483,
                                end: 488,
                                delegate: false,
                                argument: null
                              }
                            ]
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    start: 504,
                    end: 534,
                    id: {
                      type: 'Identifier',
                      start: 514,
                      end: 515,
                      name: 'g'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 518,
                      end: 534,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 520,
                          end: 526,
                          expression: {
                            type: 'YieldExpression',
                            start: 520,
                            end: 525,
                            delegate: false,
                            argument: null
                          }
                        },
                        {
                          type: 'ExpressionStatement',
                          start: 527,
                          end: 532,
                          expression: {
                            type: 'YieldExpression',
                            start: 527,
                            end: 532,
                            delegate: false,
                            argument: null
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    start: 547,
                    end: 588,
                    id: {
                      type: 'Identifier',
                      start: 557,
                      end: 558,
                      name: 'g'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 561,
                      end: 588,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 563,
                          end: 586,
                          expression: {
                            type: 'ConditionalExpression',
                            start: 563,
                            end: 586,
                            test: {
                              type: 'YieldExpression',
                              start: 564,
                              end: 569,
                              delegate: false,
                              argument: null
                            },
                            consequent: {
                              type: 'YieldExpression',
                              start: 573,
                              end: 578,
                              delegate: false,
                              argument: null
                            },
                            alternate: {
                              type: 'YieldExpression',
                              start: 581,
                              end: 586,
                              delegate: false,
                              argument: null
                            }
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    start: 601,
                    end: 702,
                    id: {
                      type: 'Identifier',
                      start: 611,
                      end: 612,
                      name: 'g'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 615,
                      end: 702,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 633,
                          end: 688,
                          expression: {
                            type: 'ConditionalExpression',
                            start: 633,
                            end: 688,
                            test: {
                              type: 'YieldExpression',
                              start: 634,
                              end: 639,
                              delegate: false,
                              argument: null
                            },
                            consequent: {
                              type: 'YieldExpression',
                              start: 659,
                              end: 664,
                              delegate: false,
                              argument: null
                            },
                            alternate: {
                              type: 'YieldExpression',
                              start: 683,
                              end: 688,
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

        pass(`function* g() {\nasync(a = yield b)\n}`, Context.Empty, {
            source: `function* g() {\nasync(a = yield b)\n}`,
            expected: {
                  body: [
                    {
                     async: false,
                      body: {
                        body: [
                         {
                            expression: {
                              arguments: [
                                {
                                  left: {
                                    name: 'a',
                                    type: 'Identifier'
                                  },
                                  operator: '=',
                                  right: {
                                    argument: {
                                      name: 'b',
                                      type: 'Identifier'
                                    },
                                   delegate: false,
                                    type: 'YieldExpression'
                                  },
                                  type: 'AssignmentExpression'
                                }
                              ],
                              callee: {
                                name: 'async',
                              type: 'Identifier',
                              },
                              type: 'CallExpression'
                            },
                            type: 'ExpressionStatement'
                          }
                        ],
                        type: 'BlockStatement'
                      },
                     expression: false,
                      generator: true,
                      id: {
                        name: 'g',
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

        pass(`function* g1() { yield; } function* g2() { yield 1; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function* g1() { yield; } function* g2() { yield 1; }`,
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
                      name: 'g1'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 15,
                      end: 25,
                      loc: {
                        start: {
                          line: 1,
                          column: 15
                        },
                        end: {
                          line: 1,
                          column: 25
                        }
                      },
                      body: [
                        {
                          type: 'ExpressionStatement',
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
                          expression: {
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
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    start: 26,
                    end: 53,
                    loc: {
                      start: {
                        line: 1,
                        column: 26
                      },
                      end: {
                        line: 1,
                        column: 53
                      }
                    },
                    id: {
                      type: 'Identifier',
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
                      },
                      name: 'g2'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
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
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 43,
                          end: 51,
                          loc: {
                            start: {
                              line: 1,
                              column: 43
                            },
                            end: {
                              line: 1,
                              column: 51
                            }
                          },
                          expression: {
                            type: 'YieldExpression',
                            start: 43,
                            end: 50,
                            loc: {
                              start: {
                                line: 1,
                                column: 43
                              },
                              end: {
                                line: 1,
                                column: 50
                              }
                            },
                            delegate: false,
                            argument: {
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
                              value: 1,
                              raw: '1'
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

        pass(`function* g() { yield * function* () {}; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function* g() { yield * function* () {}; }`,
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
                      start: 14,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      },
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 16,
                          end: 40,
                          loc: {
                            start: {
                              line: 1,
                              column: 16
                            },
                            end: {
                              line: 1,
                              column: 40
                            }
                          },
                          expression: {
                            type: 'YieldExpression',
                            start: 16,
                            end: 39,
                            loc: {
                              start: {
                                line: 1,
                                column: 16
                              },
                              end: {
                                line: 1,
                                column: 39
                              }
                            },
                            delegate: true,
                            argument: {
                              type: 'FunctionExpression',
                              start: 24,
                              end: 39,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 24
                                },
                                end: {
                                  line: 1,
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
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`function *gen() {
            yield {
                 ...yield yield,
                 ...(function(arg) {
                    var yield = arg;
                    return {...yield};
                 }(yield)),
                 ...yield,
              }
          }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function *gen() {
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
                                                            start: 72,
                                                            end: 77,
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
                                                        start: 66,
                                                        end: 77,
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
                                                    start: 63,
                                                    end: 77,
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
                                                                    start: 113,
                                                                    end: 116,
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
                                                                                    start: 156,
                                                                                    end: 159,
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
                                                                                    start: 148,
                                                                                    end: 153,
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
                                                                                start: 148,
                                                                                end: 159,
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
                                                                        start: 144,
                                                                        end: 160,
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
                                                                                        start: 196,
                                                                                        end: 201,
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
                                                                                    start: 193,
                                                                                    end: 201,
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
                                                                            start: 192,
                                                                            end: 202,
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
                                                                        start: 185,
                                                                        end: 203,
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
                                                                start: 118,
                                                                end: 226,
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
                                                            start: 104,
                                                            end: 226,
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
                                                                start: 227,
                                                                end: 232,
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
                                                        start: 104,
                                                        end: 233,
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
                                                    start: 100,
                                                    end: 234,
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
                                                        start: 260,
                                                        end: 265,
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
                                                    start: 257,
                                                    end: 265,
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
                                            start: 40,
                                            end: 286,
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
                                        start: 34,
                                        end: 286,
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
                                    start: 34,
                                    end: 286,
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
                            start: 16,
                            end: 302,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 10,
                                    column: 15
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'gen',
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
                        end: 302,
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
                end: 302,
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

        pass(`function* g() { yield ({ yield: 1 }) }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function* g() { yield ({ yield: 1 }) }`,
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
                    type: 'FunctionDeclaration',
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
                      start: 14,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 38
                        }
                      },
                      body: [
                        {
                          type: 'ExpressionStatement',
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
                          expression: {
                            type: 'YieldExpression',
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
                            delegate: false,
                            argument: {
                              type: 'ObjectExpression',
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
                              },
                              properties: [
                                {
                                  type: 'Property',
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
                                    name: 'yield'
                                  },
                                  value: {
                                    type: 'Literal',
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
                                    value: 1,
                                    raw: '1'
                                  },
                                  kind: 'init'
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

        pass(`function* g() { yield ({ get yield() { return 1; }}) }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function* g() { yield ({ get yield() { return 1; }}) }`,
            expected: {
                type: 'Program',
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
                body: [
                  {
                    type: 'FunctionDeclaration',
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
                      start: 14,
                      end: 54,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 54
                        }
                      },
                      body: [
                        {
                          type: 'ExpressionStatement',
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
                          expression: {
                            type: 'YieldExpression',
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
                            delegate: false,
                            argument: {
                              type: 'ObjectExpression',
                              start: 23,
                              end: 51,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 23
                                },
                                end: {
                                  line: 1,
                                  column: 51
                                }
                              },
                              properties: [
                                {
                                  type: 'Property',
                                  start: 25,
                                  end: 50,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 25
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
                                    name: 'yield'
                                  },
                                  kind: 'get',
                                  value: {
                                    type: 'FunctionExpression',
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
                                    id: null,
                                    generator: false,
                                    expression: false,
                                    async: false,
                                    params: [],
                                    body: {
                                      type: 'BlockStatement',
                                      start: 37,
                                      end: 50,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 37
                                        },
                                        end: {
                                          line: 1,
                                          column: 50
                                        }
                                      },
                                      body: [
                                        {
                                          type: 'ReturnStatement',
                                          start: 39,
                                          end: 48,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 39
                                            },
                                            end: {
                                              line: 1,
                                              column: 48
                                            }
                                          },
                                          argument: {
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
                                            value: 1,
                                            raw: '1'
                                          }
                                        }
                                      ]
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

        pass(`function* g() { (function yield() {}) }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function* g() { (function yield() {}) }`,
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
                      start: 14,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      },
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 16,
                          end: 37,
                          loc: {
                            start: {
                              line: 1,
                              column: 16
                            },
                            end: {
                              line: 1,
                              column: 37
                            }
                          },
                          expression: {
                            type: 'FunctionExpression',
                            start: 17,
                            end: 36,
                            loc: {
                              start: {
                                line: 1,
                                column: 17
                              },
                              end: {
                                line: 1,
                                column: 36
                              }
                            },
                            id: {
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
                              name: 'yield'
                            },
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
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
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`function* g2() { return 1; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function* g2() { return 1; }`,
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
                                        type: 'Literal',
                                        value: 1,
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
                                        raw: '1'
                                    },
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
                                    }
                                }
                            ],
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
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'g2',
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`function* f(x = arguments[2], y = arguments[3], z) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function* f(x = arguments[2], y = arguments[3], z) {}`,
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
                                    type: 'Identifier',
                                    name: 'x',
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
                                },
                                right: {
                                    type: 'MemberExpression',
                                    object: {
                                        type: 'Identifier',
                                        name: 'arguments',
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
                                        }
                                    },
                                    computed: true,
                                    property: {
                                        type: 'Literal',
                                        value: 2,
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
                                        raw: '2'
                                    },
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
                                    }
                                },
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
                                }
                            },
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'Identifier',
                                    name: 'y',
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
                                right: {
                                    type: 'MemberExpression',
                                    object: {
                                        type: 'Identifier',
                                        name: 'arguments',
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
                                        }
                                    },
                                    computed: true,
                                    property: {
                                        type: 'Literal',
                                        value: 3,
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
                                        raw: '3'
                                    },
                                    start: 34,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 34
                                        },
                                        end: {
                                            line: 1,
                                            column: 46
                                        }
                                    }
                                },
                                start: 30,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 30
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            },
                            {
                                type: 'Identifier',
                                name: 'z',
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
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`function* f({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function* f({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}`,
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
                                            name: 'w',
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
                                        computed: false,
                                        value: {
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
                                                        computed: false,
                                                        value: {
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
                                                        method: false,
                                                        shorthand: true,
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
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
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
                                                        computed: false,
                                                        value: {
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
                                                        method: false,
                                                        shorthand: true,
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
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
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
                                                        },
                                                        computed: false,
                                                        value: {
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
                                                        },
                                                        method: false,
                                                        shorthand: true,
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
                                                start: 17,
                                                end: 28,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 17
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 28
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
                                                    },
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                        value: {
                                                            type: 'Literal',
                                                            value: 5,
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
                                                            raw: '5'
                                                        },
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
                                                        start: 39,
                                                        end: 43,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 39
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 43
                                                            }
                                                        }
                                                    },
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'z',
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
                                                        value: {
                                                            type: 'Literal',
                                                            value: 6,
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
                                                            raw: '6'
                                                        },
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
                                                        start: 45,
                                                        end: 49,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 45
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 49
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 31,
                                                end: 51,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 31
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 51
                                                    }
                                                }
                                            },
                                            start: 17,
                                            end: 51,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 51
                                                }
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        start: 14,
                                        end: 51,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 51
                                            }
                                        }
                                    }
                                ],
                                start: 12,
                                end: 53,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 53
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
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

    });

});
