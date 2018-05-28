import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Next - Private fields', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    // TODO! This is not finished yet - still a few non-failing tests. Waiting for finale specs

    describe('Failure', () => {

        const programs = [
            '# b',
            '#a, # b',
            //"#a : 0",
            '#a =',
            '#*a = 0',
            '#*a',
            '# a;',
            '#\n a;',
            'a, # b',
            'a, #, b;',
            'foo.#[a];',
            'foo.#[\'a\'];',
            'foo()#a',
            'foo()#[a]',
            'foo()#[\'a\']',
            '#[\'fo\' + \'o\']: \'I am private\'',
            // "#get a",
            //"#yield a",
            // "#async a = 0",
            // "#async a",
            '#constructor',
            '#constructor = function() {}',
            '# a = 0',
            //"#a() { }",
            // "get #a() { }",
            //   "#get a() { }",
            // "set #a() { }",
            // "#set a() { }",
            // "*#a() { }",
            '#*a() { }',
            // "async #a() { }",
            // "async *#a() { }",
            'async #*a() { }',
            '#0 = 0;',
            '#0;',
            '#\'a\' = 0;',
            '#\'a\';',
            '#[\'a\']',
            '#[\'a\'] = 1',
            '#[a]',
            '#[a] = 1',
            '#x = /*{ initializer }*/;',
            '#x = false ? {} : /*{ initializer }*/;',
            '#x = typeof /*{ initializer }*/;',
            '#x = () => /*{ initializer }*/;',
            '#x = true ? {} : /*{ initializer }*/;',
            //"#x = () => super();",
            //"#x = super();",
            //  "#x = true ? {} : arguments;",
            //"#x = true ? {} : super();",
            //  "#x = typeof arguments;",
            //"#x = typeof super();",
            '#a = arguments',
            //"#a = () => arguments",
            //"#a = () => { arguments }",
            '#a = arguments[0]',
            //"#a = delete arguments[0]",
            //"#a = f(arguments)",
            //"#a = () => () => arguments",
            'foo() { delete this.#a }',
            'foo() { delete this.x.#a }',
            'foo() { delete this.x().#a }',
            'foo() { delete f.#a }',
            'foo() { delete f.x.#a }',
            'foo() { delete f.x().#a }',
            'foo.#{;',
            'foo.#};',
            'foo.#=;',
            'foo.#888;',
            'foo.#-;',
            'foo.#--;',
            //"super.#a;",
            //"super.#a = 1;",
            //"super.#['a']",
            'super.#[a]',
            //"new.#a",
            'new.#[a]',
            // "#a b",
            // "#a = 0 b",
            '#a = 0\n *b(){}',
            '#a = 0\n [\'b\'](){}',
        ];

        for (const arg of programs) {
            it(`class C { ${arg} }`, () => {
                t.throws(() => {
                    parseSource(`class C { ${arg} }`, undefined, Context.OptionsNext);
                });
            });
        }

        fail('#constructor', Context.OptionsNext, {
            source: '#constructor',
        });

        fail('#constructor', Context.OptionsNext | Context.Strict | Context.Module, {
            source: '#constructor',
        });

        fail('#constructor', Context.OptionsNext, {
            source: '#constructor',
        });

        fail('#*a() { }', Context.OptionsNext, {
            source: '#*a() { }',
        });

        fail('#x = typeof super();', Context.OptionsNext, {
            source: '#x = typeof super();',
         });

        fail('#a = 0\n *b(){}', Context.OptionsNext, {
            source: '#a = 0\n *b(){}',
        });

        fail('foo() { delete f.x().#a }', Context.OptionsNext, {
            source: 'foo() { delete f.x().#a }',
        });
    });

    describe('Pass', () => {

        const programs = [
            '#a, #b',
            '#a #b',
            '#a = 0;',
            '#a = 0; #b',
            '#a = 0; b',
            '#a = 0; b(){}',
            '#a = 0; *b(){}',
            '#a = 0; [\'b\'](){}',
            '#a;',
            '#a; #b;',
            '#x = 42;',
            '#x = \'Avalue\';',
            '#a; b;',
            '#a; b(){}',
            '#a; *b(){}',
            '#a; [\'b\'](){}',
            '#a = 0\n',
            '#a = 0\n #b',
            '#a = 0\n b',
            '#a = 0\n b(){}',
            '#a\n',
            '#a\n #b\n',
            '#a\n b\n',
            '#a\n b(){}',
            '#a\n *b(){}',
            '#a\n [\'b\'](){}',
            '#a\n get',
            '#get\n *a(){}',
            '#a\n static',
            '#a = function t() { arguments; }',
            '#a = () => function() { arguments; }',
            '#yield',
            '#yield = 0',
            '#yield\n a',
            '#async;',
            '#async = 0;',
            '#async',
            '#async = 0',
            '#async\n a(){}', // a field named async, and a method named a.
            '#async\n a',
            '#await;',
            '#await = 0;',
            '#await\n = 0;',
            '#a() {}',
            'foo.#if;',
            'foo.#yield;',
            'foo.#super;',
            'foo.#interface;',
            'foo.#eval;',
            'foo.#arguments;',
            //"foo(bar().#a)",
            //"foo(this.#a)",
            '#await\n a',
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

        pass(`class A { #a() {} } {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `class A { #a() {} } {}`,
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
                                        type: 'PrivateName',
                                        name: 'a',
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
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
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
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 12,
                                        end: 17,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 12
                                            },
                                            end: {
                                                line: 1,
                                                column: 17
                                            }
                                        }
                                    },
                                    start: 10,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                }
                            ],
                            start: 8,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
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
                        }
                    },
                    {
                        type: 'BlockStatement',
                        body: [],
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
                        }
                    }
                ],
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

        pass(`class A { #a = () => function() { arguments; } } {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `class A { #a = () => function() { arguments; } } {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
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
                            body: [{
                                type: 'FieldDefinition',
                                key: {
                                    type: 'PrivateName',
                                    name: 'a',
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
                                value: {
                                    type: 'ArrowFunctionExpression',
                                    body: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [{
                                                type: 'ExpressionStatement',
                                                expression: {
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
                                                start: 34,
                                                end: 44,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 34
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 44
                                                    }
                                                }
                                            }],
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
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
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
                                    },
                                    params: [],
                                    id: null,
                                    async: false,
                                    generator: false,
                                    expression: true,
                                    start: 15,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 46
                                        }
                                    }
                                },
                                computed: false,
                                static: false,
                                start: 10,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }],
                            start: 8,
                            end: 48,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 48
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
                    },
                    {
                        type: 'BlockStatement',
                        body: [],
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
                    }
                ],
                start: 0,
                end: 51,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 51
                    }
                }
            }
        });

        pass(`class A { #a = 0; #b } {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `class A { #a = 0; #b } {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
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
                            body: [{
                                    type: 'FieldDefinition',
                                    key: {
                                        type: 'PrivateName',
                                        name: 'a',
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
                                    value: {
                                        type: 'Literal',
                                        value: 0,
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
                                        raw: '0'
                                    },
                                    computed: false,
                                    static: false,
                                    start: 10,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                },
                                {
                                    type: 'FieldDefinition',
                                    key: {
                                        type: 'PrivateName',
                                        name: 'b',
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
                                    value: null,
                                    computed: false,
                                    static: false,
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
                    },
                    {
                        type: 'BlockStatement',
                        body: [],
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

        pass(`class A { #a, #b } {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `class A { #a, #b } {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
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
                            body: [{
                                    type: 'FieldDefinition',
                                    key: {
                                        type: 'PrivateName',
                                        name: 'a',
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
                                },
                                {
                                    type: 'FieldDefinition',
                                    key: {
                                        type: 'PrivateName',
                                        name: 'b',
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
                                        }
                                    },
                                    value: null,
                                    computed: false,
                                    static: false,
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
                                    }
                                }
                            ],
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
                    },
                    {
                        type: 'BlockStatement',
                        body: [],
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
                        }
                    }
                ],
                start: 0,
                end: 21,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 21
                    }
                }
            }
        });

        pass(`class A { #a = 0; ['b'](){} } {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `class A { #a = 0; ['b'](){} } {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
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
                            body: [{
                                    type: 'FieldDefinition',
                                    key: {
                                        type: 'PrivateName',
                                        name: 'a',
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
                                    value: {
                                        type: 'Literal',
                                        value: 0,
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
                                        raw: '0'
                                    },
                                    computed: false,
                                    static: false,
                                    start: 10,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                },
                                {
                                    type: 'MethodDefinition',
                                    kind: 'method',
                                    static: false,
                                    computed: true,
                                    key: {
                                        type: 'Literal',
                                        value: 'b',
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
                                        },
                                        raw: '\'b\''
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
                                        generator: false,
                                        expression: false,
                                        id: null,
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
                                    },
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
                            start: 8,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 29
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
                    },
                    {
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

        pass(`class A { #await = 0; } {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: `class A { #await = 0; } {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
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
                            body: [{
                                type: 'FieldDefinition',
                                key: {
                                    type: 'PrivateName',
                                    name: 'await',
                                    start: 10,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 0,
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
                                    },
                                    raw: '0'
                                },
                                computed: false,
                                static: false,
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
                            }],
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
                    },
                    {
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
    });
});
