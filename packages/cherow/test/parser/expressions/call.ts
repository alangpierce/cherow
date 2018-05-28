import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Call', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failures', () => {

        // This fails on Acorn, Esprima and Babylon
        const invalidAsyncCallEdgeCases = [
            'async(a)(b)async',
            '(a)(( async () => {}) => {})',
            'async(async() () => {})(async() () => {})(y)(n)(c)', // crazy #1
            'async(async() () => {})(async() () => {})(y)(n)(c)', // crazy #2
            'async(async() () => {})(async() () => {})(async() () => {})(async() () => {})(async() () => {})', // crazy #3
        ];

        for (const arg of invalidAsyncCallEdgeCases) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        const invalidSpreadCall = [
            '(...[1, 2, 3])',
            '......[1,2,3]',
        ];

        for (const arg of invalidSpreadCall) {

            it(`function fn() { 'use strict';} fn(${arg});`, () => {
                t.throws(() => {
                    parseSource(`function fn() { 'use strict';} fn(${arg});`, undefined, Context.Empty);
                });
            });

            it(`function fn() { } fn(${arg});`, () => {
                t.throws(() => {
                    parseSource(`function fn() { } fn(${arg});`, undefined, Context.Empty);
                });
            });
        }

        fail('a.b( c() ).d.e().().f.g.();', Context.Empty, {
            source: 'a.b( c() ).d.e().().f.g.();',
        });

        fail('a.b( c() ).d.e(()).f.g', Context.Empty, {
            source: 'a.b( c() ).d.e(()).f.g',
        });

        fail('() => {}()', Context.Empty, {
            source: '() => {}()',
        });
    });

    describe('Pass', () => {

        const asyncCallEdgeCases = [
            'async', // Async identifier
            'async()',
            'async(async(async(async(async(async())))))', // Nested
            'async(a)(b)',
            'async(a)(s)(y)(n)(c)',
            'async() => {}', // async arrow
            'async()()',
            'async()(async() => {})',
        ];

        for (const arg of asyncCallEdgeCases) {

            it(`function fn() { 'use strict';} fn(${arg});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`function fn() { 'use strict';} fn(${arg});`, undefined, Context.Empty);
                });
            });
        }

        const spreadCall = [
            `a()(a)`,
            `async()()`,
            `async(a)()`,
            `async()(b)`,
            `async(a)(b)`,
            '...([1, 2, 3])',
            '...\'123\', ...\'456\'',
            '...new Set([1, 2, 3]), 4',
            '1, ...[2, 3], 4',
            '...Array(...[1,2,3,4])',
            '...NaN',
            '0, 1, ...[2, 3, 4], 5, 6, 7, ...\'89\'',
            '0, 1, ...[2, 3, 4], 5, 6, 7, ...\'89\', 10',
            '...[0, 1, 2], 3, 4, 5, 6, ...\'7\', 8, 9',
            '...[0, 1, 2], 3, 4, 5, 6, ...\'7\', 8, 9, ...[10]',
        ];

        for (const arg of spreadCall) {

            it(`function fn() { 'use strict';} fn(${arg});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`function fn() { 'use strict';} fn(${arg});`, undefined, Context.Empty);
                });
            });

            it(`function fn() { } fn(${arg});`, () => {
                t.doesNotThrow(() => {
                    parseSource(`function fn() { } fn(${arg});`, undefined, Context.Empty);
                });
            });
        }

        const validSyntax = [
            'foo(...[],);',
            '(function(obj) {}(1, 2, 3, ...[]));',
            'foo(x=1,y=x,x+y)',
            'foo(x,x=1);',
            'a.b( o.bar );',
            'a.b( o["bar"] );',
            'a.b( foo() );',
            'a.b.c( foo() );',
            'a.b( foo() );',
            'a.b( c() ).d;',
            'eval(...{}, "x = 0;");',
            'foo()(1, 2, 3, ...{})',
            'foo(...[],)',
            '(function(obj) {}({a: 1, b: 2, ...{c: 3, d: 4}}));',
            'a.b( c() ).d.e;',
            'f();',
            'g(a);',
            'h(a, b);',
            'i(a, b, ...c);',
            'j(...a);',
            'a.k();',
            '(a + b).l();',
            'a.m().n();',
            'new A();',
            'new A(a);',
            'new a.B();',
            'new a.b.C();',
            'new (a().B)();',
            'new A().b();',
            'new new A()();',
            'new (A, B)();',
            'a.b( c() ).d.e((a)).f.g',
            'a.b( c() ).d.e((a = 123)).f.g',
            '(function(obj) {}({a: 1, b: 2, ...null}));',
            '(function(obj) {}({a: 1, b: 2, ...null}));',
            '(function(obj) {}({a: 1, b: 2, ...null}));',
            '(function(obj) {}({...{b: 2}, a: 3}));',
            '(function(obj) {}({...{a: 2, b: 3, c: 4, e: undefined, f: null, g: false}, a: 1, b: 7, d: 5, h: -0, i: Symbol(\'foo\'), j: {a: 2, b: 3, c: 4, e: undefined, f: null, g: false}}));',
            '(function(obj) {}({...undefined}));',
            '(function(obj) {}(...target = [2, 3, 4]));',
        ];

        for (const arg of validSyntax) {

            it(`"use strict"; ${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });
        }

        pass(`a(String, 2).v(123).length;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `a(String, 2).v(123).length;`,
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
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'MemberExpression',
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
                        object: {
                            type: 'CallExpression',
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
                            callee: {
                                type: 'MemberExpression',
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
                                object: {
                                    type: 'CallExpression',
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
                                    callee: {
                                        type: 'Identifier',
                                        start: 0,
                                        end: 1,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 0
                                            },
                                            end: {
                                                line: 1,
                                                column: 1
                                            }
                                        },
                                        name: 'a'
                                    },
                                    arguments: [{
                                            type: 'Identifier',
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
                                            name: 'String'
                                        },
                                        {
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
                                            value: 2,
                                            raw: '2'
                                        }
                                    ]
                                },
                                property: {
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
                                    name: 'v'
                                },
                                computed: false
                            },
                            arguments: [{
                                type: 'Literal',
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
                                value: 123,
                                raw: '123'
                            }]
                        },
                        property: {
                            type: 'Identifier',
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
                            name: 'length'
                        },
                        computed: false
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`a(b,c).abc(1).def`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `a(b,c).abc(1).def`,
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
                        type: 'MemberExpression',
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
                        object: {
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
                                type: 'MemberExpression',
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
                                object: {
                                    type: 'CallExpression',
                                    start: 0,
                                    end: 6,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 0
                                        },
                                        end: {
                                            line: 1,
                                            column: 6
                                        }
                                    },
                                    callee: {
                                        type: 'Identifier',
                                        start: 0,
                                        end: 1,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 0
                                            },
                                            end: {
                                                line: 1,
                                                column: 1
                                            }
                                        },
                                        name: 'a'
                                    },
                                    arguments: [{
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
                                            name: 'b'
                                        },
                                        {
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
                                            name: 'c'
                                        }
                                    ]
                                },
                                property: {
                                    type: 'Identifier',
                                    start: 7,
                                    end: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    },
                                    name: 'abc'
                                },
                                computed: false
                            },
                            arguments: [{
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
                            }]
                        },
                        property: {
                            type: 'Identifier',
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
                            name: 'def'
                        },
                        computed: false
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`a(b,c).abc(1)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `a(b,c).abc(1)`,
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
                body: [{
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
                            type: 'MemberExpression',
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
                            object: {
                                type: 'CallExpression',
                                start: 0,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                },
                                callee: {
                                    type: 'Identifier',
                                    start: 0,
                                    end: 1,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 0
                                        },
                                        end: {
                                            line: 1,
                                            column: 1
                                        }
                                    },
                                    name: 'a'
                                },
                                arguments: [{
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
                                        name: 'b'
                                    },
                                    {
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
                                        name: 'c'
                                    }
                                ]
                            },
                            property: {
                                type: 'Identifier',
                                start: 7,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                },
                                name: 'abc'
                            },
                            computed: false
                        },
                        arguments: [{
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
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`a(b,c).abc`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `a(b,c).abc`,
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
                        type: 'MemberExpression',
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
                        object: {
                            type: 'CallExpression',
                            start: 0,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            },
                            callee: {
                                type: 'Identifier',
                                start: 0,
                                end: 1,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 1
                                    }
                                },
                                name: 'a'
                            },
                            arguments: [{
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
                                    name: 'b'
                                },
                                {
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
                                    name: 'c'
                                }
                            ]
                        },
                        property: {
                            type: 'Identifier',
                            start: 7,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            name: 'abc'
                        },
                        computed: false
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`a(b,c)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `a(b,c)`,
            expected: {
                type: 'Program',
                start: 0,
                end: 6,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 6,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    },
                    expression: {
                        type: 'CallExpression',
                        start: 0,
                        end: 6,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        },
                        callee: {
                            type: 'Identifier',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            },
                            name: 'a'
                        },
                        arguments: [{
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
                                name: 'b'
                            },
                            {
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
                                name: 'c'
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`foo(bar, baz)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `foo(bar, baz)`,
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
                body: [{
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
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 3
                                }
                            },
                            name: 'foo'
                        },
                        arguments: [{
                                type: 'Identifier',
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
                                },
                                name: 'bar'
                            },
                            {
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
                                name: 'baz'
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`(    foo  )()`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `(    foo  )()`,
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
                body: [{
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
                            start: 5,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            },
                            name: 'foo'
                        },
                        arguments: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`f(...a)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `f(...a)`,
            expected: {
                type: 'Program',
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
                body: [{
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'CallExpression',
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
                        callee: {
                            type: 'Identifier',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            },
                            name: 'f'
                        },
                        arguments: [{
                            type: 'SpreadElement',
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
                            argument: {
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
                                name: 'a'
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`f(...a, ...b)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `f(...a, ...b)`,
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
                body: [{
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
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            },
                            name: 'f'
                        },
                        arguments: [{
                                type: 'SpreadElement',
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
                                argument: {
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
                                    name: 'a'
                                }
                            },
                            {
                                type: 'SpreadElement',
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
                                argument: {
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
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`f(...a, b, ...c)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `f(...a, b, ...c)`,
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
                        type: 'CallExpression',
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
                        callee: {
                            type: 'Identifier',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            },
                            name: 'f'
                        },
                        arguments: [{
                                type: 'SpreadElement',
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
                                argument: {
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
                                    name: 'a'
                                }
                            },
                            {
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
                                name: 'b'
                            },
                            {
                                type: 'SpreadElement',
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
                                argument: {
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
                                    name: 'c'
                                }
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`f(...0);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `f(...0);`,
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
                        type: 'CallExpression',
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
                        callee: {
                            type: 'Identifier',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            },
                            name: 'f'
                        },
                        arguments: [{
                            type: 'SpreadElement',
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
                            argument: {
                                type: 'Literal',
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
                                value: 0,
                                raw: '0'
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`f(0)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `f(0)`,
            expected: {
                type: 'Program',
                start: 0,
                end: 4,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 4
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 4,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 4
                        }
                    },
                    expression: {
                        type: 'CallExpression',
                        start: 0,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        },
                        callee: {
                            type: 'Identifier',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            },
                            name: 'f'
                        },
                        arguments: [{
                            type: 'Literal',
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
                            value: 0,
                            raw: '0'
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`Math.round(diff / 6.048e8); // 6.048e8 ms per week`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `Math.round(diff / 6.048e8); // 6.048e8 ms per week`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'MemberExpression',
                            object: {
                                type: 'Identifier',
                                name: 'Math',
                                start: 0,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'round',
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
                        arguments: [{
                            type: 'BinaryExpression',
                            left: {
                                type: 'Identifier',
                                name: 'diff',
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
                                }
                            },
                            right: {
                                type: 'Literal',
                                value: 604800000,
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
                                },
                                raw: '6.048e8'
                            },
                            operator: '/',
                            start: 11,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        }],
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
    });
});
