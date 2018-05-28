import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

// This tests both public fields and public static fields
//
// Note! This is not finished yet - still a few non-failing tests. Waiting for finale specs

describe('Next - Class fields', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failures', () => {

        const fieldErrors = [

            // "a : 0",
            'a =',
            '#a, b =',
            'constructor',
            '*a = 0',
            '*a',
            // "get a",
            // "yield a",
            'async a = 0',
            'async a',

             'a = arguments',
            // "a = () => arguments",
            // "a = () => { arguments }",
             'a = arguments[0]',
            // "a = delete arguments[0]",
            // "a = f(arguments)",
            // "a = () => () => arguments",
            //"a b",
            ///"a = 0 b",
            // "a = 0\n *b(){}",
            // "a = 0\n ['b'](){}",
            // "get\n a",
        ];

        for (const arg of fieldErrors) {
            it(`class C { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`class C { ${arg} }`, undefined, Context.OptionsNext);
                });
            });
        }

        const staticFieldErrors = [
            // "static a : 0",
            'static a =',
            'static constructor',
            'static prototype',
            'static *a = 0',
            'static *a',
            //"static get a",
            //"static get\n a",
            //"static yield a",
            'static async a = 0',
            'static async a',
            'static a = arguments',
            // "static a = () => arguments",
            // "static a = () => { arguments }",
             'static a = arguments[0]',
            // "static a = delete arguments[0]",
            // "static a = f(arguments)",
            // "static a = () => () => arguments",
            //"static a b",
            //"static a = 0 b",
            'static a = 0\n *b(){}',
            'static a = 0\n [\'b\'](){}',
        ];

        for (const arg of staticFieldErrors) {
            it(`class C { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`class C { ${arg} }`, undefined, Context.OptionsNext);
                });
            });
        }

        fail('class X { constructor = function() {}; }', Context.OptionsNext, {
            source: 'class X { constructor = function() {}; }',
        });

        fail('class X { static constructor = function() {}; }', Context.OptionsNext, {
            source: 'class X { static constructor = function() {}; }',
        });

        fail('class X { static prototype = function() {}; }', Context.OptionsNext, {
            source: 'class X { static prototype = function() {}; }',
        });

        fail('class X { constructor() {} static set prototype() {} }', Context.OptionsNext, {
            source: 'class X { constructor() {} static set prototype() {} }',
        });

        fail('class X { constructor() {} static set prototype() {} }', Context.OptionsNext, {
             source: 'class X { constructor() {} static set prototype() {} }',
        });

        fail('class X { constructor() {} static get prototype() {} }', Context.OptionsNext, {
             source: 'class X { constructor() {} static get prototype() {} }',
         });

    });

    describe('Pass', () => {

        const programs = [
            'a',
            // Mix public and private fields
            'a, #b',
            'a, b', 'b',
            'a = 0;',
            '#a, b = 0;',
            'a = 0; b',
            'a = 0; b(){}',
            'a = 0; *b(){}',
            'a = 0; [\'b\'](){}',
            'a;',
            'a; b;',
            'a; b(){}',
            'a; *b(){}',
            'a; [\'b\'](){}',
            '[\'a\'] = 0;',
            '[\'a\'] = 0; b',
            '[\'a\'] = 0; #b',
            '[\'a\'] = 0; b(){}',
            '[\'a\'] = 0; *b(){}',
            '[\'a\'] = 0; [\'b\'](){}',
            '[\'a\'];',
            '[\'a\']; b;',
            '[\'a\']; b(){}',
            '[\'a\']; *b(){}',
            '[\'a\']; [\'b\'](){}',
            '0 = 0;',
            '0;',
            '\'a\' = 0;',
            '\'a\';',
            'a = 0\n',
            'a = 0\n b',
            'a = 0\n b(){}',
            'a\n',
            'a\n b\n',
            'a\n b(){}',
            'a\n *b(){}',
            'a\n [\'b\'](){}',
            '[\'a\'] = 0\n',
            '[\'a\'] = 0\n b',
            '[\'a\'] = 0\n b(){}',
            '[\'a\']\n',
            '[\'a\']\n b\n',
            '[\'a\']\n b(){}',
            '[\'a\']\n *b(){}',
            '[\'a\']\n [\'b\'](){}',
            '*m() { return 42; } a; b = 42;',
            '*m() { return 42; } static ["a"] = 42; ["a"] = 39;',
            '*m() { return 42; } [x]; [y] = 42;',
            '*m() { return 42; } "a"; "b"; "c" = 39;',
            'm() { return 42; } static ["a"] = 39; [x] = 42; [10] = "meep"; ["not initialized"];',
            'm() { return 42; } [x]; [y] = 42;',
            'm() { return 42; } a; b = 42;',
            'm() { return 42; } static ["a"] = 42; ["a"] = 39;',
            'm() { return 42; } static a; b = 42;',
            'static async *m() { return 42; } static ["a"] = 39; [x] = 42; [10] = "meep"; ["not initialized"];',
            'static async *m() { return 42; } [x]; [y] = 42;',
            'static async *m() { return 42; } a; b = 42;',
            'static async *m() { return 42; } static ["a"] = 42; ["a"] = 39;',
            'static async *m() { return 42; } [x]; [y] = 42;',
            'static async *m() { return 42; } static a; b = 42;',
            'static async *m() { return 42; } "a"; "b"; "c" = 39;;',
            'static async m() { return 42; } static ["a"] = 39; [x] = 42; [10] = "meep"; ["not initialized"];',
            'static async m() { return 42; } [x]; [y] = 42;',
            'static async m() { return 42; } a; b = 42;',
            'static async m() { return 42; } static ["a"] = 42; ["a"] = 39;',
            'static *m() { return 42; } static ["a"] = 42; ["a"] = 39;',
            'static *m() { return 42; } [x]; [y] = 42;',
            'foo = "foobar";  m() { return 42 } static ["a"] = 39; [x] = 42; [10] = "meep"; ["not initialized"] bar = "barbaz";',
            '[x]; [y] = 42',
            'static ["a"] = 42; ["a"] = 39',
            'static ["a"] = 39; [x] = 42; [10] = "meep"; ["not initialized"]',
            'c = fn;',
            '"a"; "b"; "c" = 39;',
            'static async *m() { return 42; } static a; b = 42;',
            'async *m() { return 42; } [x]; [y] = 42;',
            'async m() { return 42; } static ["a"] = 39; [x] = 42; [10] = "meep"; ["not initialized"];',
            '"d" = 42',
            '[f()]', //
            'x = f();',
            'x = f( #b );',
            'a\n get',
            'get\n *a(){}',
            'a\n static',
            'a = function t() { arguments; }',
            'a = () => function() { arguments; }',
            'constructor() {} prototype() { return instanceMethodValue; }',
            'constructor() {} set foo(a) {}',
            'yield',
            'yield = 0',
            'yield\n a',
            'async;',
            'async = 0;',
            'async',
            'async = 0',
            'async\n a(){}', // a field named async, and a method named a.
            'async\n a',
            'await;',
            'await = 0;',
            'await\n a',
        ];

        for (const arg of programs) {
            it(`class C { ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C { ${arg} }`, undefined, Context.OptionsNext);
                });
            });

            it(`class C extends Base { ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C extends Base { ${arg} }`, undefined, Context.OptionsNext);
                });
            });
        }

        // Note! Private static fields isn't supported

        //  this tests the static public fields
        const staticFields = [
            'static a = 0;',
            'static a = 0; b',
            'static a = 0; b(){}',
            'static a = 0; *b(){}',
            'static a = 0; [\'b\'](){}',
            'static a;',
            'static a; b;',
            'static a; b(){}',
            'static a; *b(){}',
            'static a; [\'b\'](){}',
            'static [\'a\'] = 0;',
            'static [\'a\'] = 0; b',
            'static [\'a\'] = 0; b(){}',
            'static [\'a\'] = 0; *b(){}',
            'static [\'a\'] = 0; [\'b\'](){}',
            'static [\'a\'];',
            'static [\'a\']; b;',
            'static [\'a\']; b(){}',
            'static [\'a\']; *b(){}',
            'static [\'a\']; [\'b\'](){}',
            'static 0 = 0;',
            'static 0;',
            'static \'a\' = 0;',
            'static \'a\';',
            'static a = 0\n',
            'static a = 0\n b',
            'static a = 0\n b(){}',
            'static a\n',
            'static a\n b\n',
            'static a\n b(){}',
            'static a\n *b(){}',
            'static a\n [\'b\'](){}',
            'static [\'a\'] = 0\n',
            'static [\'a\'] = 0\n b',
            'static [\'a\'] = 0\n b(){}',
            'static [\'a\']\n',
            'static [\'a\']\n b\n',
            'static [\'a\']\n b(){}',
            'static [\'a\']\n *b(){}',
            'static [\'a\']\n [\'b\'](){}',
            'static a = function t() { arguments; }',
            'static a = () => function t() { arguments; }',
            'static a\n get',
            'static get\n *a(){}',
            'static a\n static',
            'static yield',
            'static yield = 0',
            'static yield\n a',
            'static async;',
            'static async = 0;',
            'static async',
            'static async = 0',
            'static async\n a(){}', // a field named async, and a method named a.
            'static async\n a',
            'static await;',
            'static await = 0;',
            'static await\n a',
            'C.bar = 0;'
        ];

        for (const arg of staticFields) {
            it(`class C { ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C { ${arg} }`, undefined, Context.OptionsNext);
                });
            });

            it(`class C extends Base { ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parseSource(`class C extends Base { ${arg} }`, undefined, Context.OptionsNext);
                });
            });
        }

        pass(`class A { dry; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `class A { dry; }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ClassDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'A',
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
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [
                                {
                                    type: 'FieldDefinition',
                                    key: {
                                        type: 'Identifier',
                                        name: 'dry',
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
                                    value: null,
                                    computed: false,
                                    static: false,
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
                                }
                            ],
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
                            }
                        },
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
                        }
                    }
                ],
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
                }
            }
        });

        pass(`class A { *m() { return 42; } static ["a"] = 42; ["a"] = 39; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `class A { *m() { return 42; } static ["a"] = 42; ["a"] = 39; }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ClassDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'A',
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
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [
                                {
                                    type: 'MethodDefinition',
                                    kind: 'method',
                                    static: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        name: 'm',
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
                                                        value: 42,
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
                                                        raw: '42'
                                                    },
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
                                                    }
                                                }
                                            ],
                                            start: 15,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 15
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: true,
                                        expression: false,
                                        id: null,
                                        start: 12,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 12
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        }
                                    },
                                    start: 10,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    }
                                },
                                {
                                    type: 'FieldDefinition',
                                    key: {
                                        type: 'Literal',
                                        value: 'a',
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
                                        raw: '"a"'
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 42,
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
                                        raw: '42'
                                    },
                                    computed: true,
                                    static: true,
                                    start: 30,
                                    end: 47,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 47
                                        }
                                    }
                                },
                                {
                                    type: 'FieldDefinition',
                                    key: {
                                        type: 'Literal',
                                        value: 'a',
                                        start: 50,
                                        end: 53,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 50
                                            },
                                            end: {
                                                line: 1,
                                                column: 53
                                            }
                                        },
                                        raw: '"a"'
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 39,
                                        start: 57,
                                        end: 59,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 57
                                            },
                                            end: {
                                                line: 1,
                                                column: 59
                                            }
                                        },
                                        raw: '39'
                                    },
                                    computed: true,
                                    static: false,
                                    start: 49,
                                    end: 59,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 49
                                        },
                                        end: {
                                            line: 1,
                                            column: 59
                                        }
                                    }
                                }
                            ],
                            start: 8,
                            end: 62,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 62
                                }
                            }
                        },
                        start: 0,
                        end: 62,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 62
                            }
                        }
                    }
                ],
                start: 0,
                end: 62,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 62
                    }
                }
            }
        });

        pass(`class A { static foo; } {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `class A { static foo; }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ClassDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'A',
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
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [
                                {
                                    type: 'FieldDefinition',
                                    key: {
                                        type: 'Identifier',
                                        name: 'foo',
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
                                    value: null,
                                    computed: false,
                                    static: true,
                                    start: 10,
                                    end: 20,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 20
                                        }
                                    }
                                }
                            ],
                            start: 8,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
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
                ],
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
    });
});
