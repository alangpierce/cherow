import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Miscellaneous - Directives', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const InvalidSyntax = [
            '"\\1;" "use strict";',
            '"use strict"; function f(){"\\1";}',
            '"\\1;" "use strict"; null',
            '"use strict"; with (a) b = c;',
            '"use strict"; "\\1;"',
            '"use strict"; "\\1;" null',
            '"random\\x0\nnewline"',
            '"random\\u\nnewline"',
            '"random\\u0\nnewline"',
            '"random\\ua\u2029newline"',
            '"random\\ua\rnewline"',
            '"random\\u0a\nnewline"',
            '"random\\u000\nnewline"',
            '"random\\u00a\nnewline"',
            '"random\\u{0\nnewline"',
            '"random\\u{a\nnewline"',
            '\'random\\x foo\'',
            '"random\\u{a\rnewline"',
            '\'random\\u foo\'',
            '\'random\\u0 foo\'',
            '\'random\\u00 foo\'',
            '\'random\\u0a foo\'',
            '\'random\\x0\\ foo\'',
            '\'random\\ua\\ foo\'',
            '\'random\\x0\\ foo\'',
            '\'random\\u0a\\ foo\'',
            '\'random\\xx foo\'',
            '\'random\\u00a\\ foo\'',
            '\'random\\uax foo\'',
            '\'random\\u0au foo\'',
            'function foo() { "use strict"; with (a) b = c; }',
            '"use strict"; function foo() { with (a) b = c; }',
            '(a = () => { "use strict"; foo }) => { "use strict" }',
            '"use strict"; function hello() { "\\000"; }',
            '"use strict"; function hello() { "\\00"; }',
            '"use strict"; function hello() { "\\0123"; }',
            'function hello() { "use strict"; "\\000"; }',
            'function hello() { "use strict"; "\\00"; }',
            'function hello() { "use strict"; "\\0123"; }',
            'function hello("\\000008") { "use strict"; }',
            ` function fun() {
                "use strict";
                       var public = 1;
            }`,
            `"use strict";
            "use strict";
            var public = 1;`,
            `"a";
            "use strict";
            "c";
            eval = 42;`
        ];

        for (const arg of InvalidSyntax) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`/* comment in front */ ${arg}`, undefined, Context.Empty);
                });
            });

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`function foo() { ${arg} }`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

        const validSyntax = [
            '("use strict")',
            '"\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0"',
            '"use some future directive"',
            '"use some future directive";',
            '"use some future directive"; "use strict";',
            '"Hello\\312World"',
            '"use strict"',
            '\'use\\x20strict\'',
            '"use\\x20strict"',
            '\'use asm\'',
            '\'use asm\'; \'use strict\'',
            '\'use asm\' \n \'use strict\'',
            '"use asm" \n "use strict"',
            '\'use asm\' \r \'use strict\'',
            '"use asm" \r "use strict"',
            '\'use asm\' \r\n \'use strict\'',
            '"use asm" \r\n "use strict"',
            '\'use asm\' \u2028 \'use strict\'',
            '"use asm" \u2028 "use strict"',
            '\'use asm\' \u2029 \'use strict\'',
            '"use asm" \u2029 "use strict"',
            'function foo() { "use \\u0020strict"; with (a) b = c; }',
            '"use \\u0020strict"; function foo() { with (a) b = c; }',
            '"use strict"\n foo',
            '\'use strict\'; foo',
            'function foo() { "use strict"\n bar }',
            '!function foo() { "use strict"\n bar }',
            '() => { "use strict"\n foo }',
            '() => "use strict"',
            '({ wrap() { "use strict"; foo } })',
            '"\\u0075se strict"',
            '"use asm"; "use strict"; foo',
            'function wrap() { "use asm"; "use strict"; foo }',
            '"use strict"; foo; "use asm"',
            'function wrap() { "use asm"; foo; "use strict" }',
            '{ "use strict"; }',
            'function wrap() { { "use strict" } foo }',
            '("use strict"); foo',
            'function wrap() { ("use strict"); foo }',
            'function a() { "use strict" } "use strict"; foo',
            'function a(a = function() { "use strict"; foo }) { "use strict" }',
            'try { "use strict"; var public = 1; } catch (e) {}',
            `function foo()
            {
               "bogus directive";
               "use strict";
               return (this === undefined);
            }`
        ];

        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`function icefapper() { ${arg} }`, undefined, Context.Empty);
                });
            });
        }

        pass( '"use asm" \u2029 "use strict"', Context.Empty, {
            source:  '"use asm" \u2029 "use strict"',
            expected: {
                  body: [
                    {
                      directive: 'use asm',
                      expression: {
                        type: 'Literal',
                        value: 'use asm',
                      },
                      type: 'ExpressionStatement'
                    },
                    {
                     directive: 'use strict',
                      expression: {
                        type: 'Literal',
                       value: 'use strict',
                      },
                      type: 'ExpressionStatement',
                    },
                  ],
                  sourceType: 'script',
                  type: 'Program',
                }
        });

        pass('"\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0"', Context.Empty, {
            source: '"\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0"',
            expected: {
                body: [{
                    directive: '\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0',
                    expression: {
                        type: 'Literal',
                        value: '\n\r\t\u000b\b\f\\\'"\u0000',
                    },
                    type: 'ExpressionStatement'
                }, ],
                sourceType: 'script',
                type: 'Program',
            }
        });

        pass('"Hello\\312World"', Context.Empty, {
            source: '"Hello\\312World"',
            expected: {
                body: [{
                    directive: 'Hello\\312World',
                    expression: {
                        type: 'Literal',
                        value: 'HelloÊWorld',
                    },
                    type: 'ExpressionStatement'
                }, ],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`"use strict"; + 1`, Context.Empty, {
            source: `"use strict"; + 1`,
            expected: {
                body: [{
                        directive: 'use strict',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
                        },
                        type: 'ExpressionStatement'
                    },
                    {
                        expression: {
                            argument: {
                                type: 'Literal',
                                value: 1
                            },
                            operator: '+',
                            prefix: true,
                            type: 'UnaryExpression'
                        },
                        type: 'ExpressionStatement'
                    }
                ],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`function wrap() { "use strict"\n foo }`, Context.Empty, {
            source: `function wrap() { "use strict"\n foo }`,
            expected: {
                body: [{
                    async: false,
                    body: {
                        body: [{
                                directive: 'use strict',
                                expression: {
                                    type: 'Literal',
                                    value: 'use strict',
                                },
                                type: 'ExpressionStatement'
                            },
                            {
                                expression: {
                                    name: 'foo',
                                    type: 'Identifier',
                                },
                                type: 'ExpressionStatement'
                            },
                        ],
                        type: 'BlockStatement'
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: 'wrap',
                        type: 'Identifier',
                    },
                    params: [],
                    type: 'FunctionDeclaration',
                }, ],
                sourceType: 'script',
                type: 'Program',
            }
        });

        pass(`"\\u0075se strict"`, Context.OptionsRaw, {
            source: `"\\u0075se strict"`,
            expected: {
                body: [{
                    directive: '\\u0075se strict',
                    expression: {
                        raw: '"\\u0075se strict"',
                        type: 'Literal',
                        value: 'use strict'
                    },
                    type: 'ExpressionStatement'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass('function wrap() { { "use strict" } foo }', Context.Empty, {
            source: 'function wrap() { { "use strict" } foo }',
            expected: {
                body: [{
                    async: false,
                    body: {
                        body: [{
                                body: [{
                                    expression: {
                                        type: 'Literal',
                                        value: 'use strict',
                                    },
                                    type: 'ExpressionStatement'
                                }],
                                type: 'BlockStatement'
                            },
                            {
                                expression: {
                                    name: 'foo',
                                    type: 'Identifier',
                                },
                                type: 'ExpressionStatement'
                            },
                        ],
                        type: 'BlockStatement'
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: 'wrap',
                        type: 'Identifier'
                    },
                    params: [],
                    type: 'FunctionDeclaration'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass('"Hello\\0World"', Context.Empty, {
            source: '"Hello\\0World"',
            expected: {
                body: [{
                    directive: 'Hello\\0World',
                    expression: {
                        type: 'Literal',
                        value: 'Hello\u0000World',
                    },
                    type: 'ExpressionStatement'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });

        pass(`single "use strict" wrapped inside parenthesis'`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Strict | Context.Module, {
            source: '("use strict"); foo = 42;',
            expected: {
                type: 'Program',
                body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
                            start: 1,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict"'
                        },
                        start: 0,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            left: {
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
                            operator: '=',
                            right: {
                                type: 'Literal',
                                value: 42,
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
                                },
                                raw: '42'
                            },
                            start: 16,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            }
                        },
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
                    }
                ],
                sourceType: 'module',
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

        pass(`single "use strict" wrapped inside parenthesis'`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '("use strict"); eval = 42;',
            expected: {
                type: 'Program',
                body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
                            start: 1,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict"'
                        },
                        start: 0,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            left: {
                                type: 'Identifier',
                                name: 'eval',
                                start: 16,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            operator: '=',
                            right: {
                                type: 'Literal',
                                value: 42,
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
                                raw: '42'
                            },
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
                        start: 16,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        }
                    }
                ],
                sourceType: 'script',
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

        pass(`single "use strict" is "USE STRICT"'`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '"USE STRICT";  var public = 1;',
            expected: {
                type: 'Program',
                body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'USE STRICT',
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
                            raw: '"USE STRICT"'
                        },
                        directive: 'USE STRICT',
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
                    {
                        type: 'VariableDeclaration',
                        declarations: [{
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 1,
                                start: 28,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 28
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                },
                                raw: '1'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'public',
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
                            start: 19,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        }],
                        kind: 'var',
                        start: 15,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        }
                    }
                ],
                sourceType: 'script',
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

        pass(`single "use strict" inside function body'`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function wrap() { "use asm"; "use strict"; foo }',
            expected: {
                type: 'Program',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Literal',
                                    value: 'use asm',
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
                                    },
                                    raw: '"use asm"'
                                },
                                directive: 'use asm',
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
                            },
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Literal',
                                    value: 'use strict',
                                    start: 29,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 41
                                        }
                                    },
                                    raw: '"use strict"'
                                },
                                directive: 'use strict',
                                start: 29,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 29
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                }
                            },
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 43,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 43
                                        },
                                        end: {
                                            line: 1,
                                            column: 46
                                        }
                                    }
                                },
                                start: 43,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 43
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }
                        ],
                        start: 16,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'wrap',
                        start: 9,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 13
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
                sourceType: 'script',
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

        pass(`single "use strict"' in block statement`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '{ "use strict"; }',
            expected: {
                type: 'Program',
                body: [{
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
                            start: 2,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            },
                            raw: '"use strict"'
                        },
                        start: 2,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 15
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
                }],
                sourceType: 'script',
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

        pass(`single "use strict" in a default parameter'`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'function a() { "use strict" } "use strict"; foo;',
            expected: {
                type: 'Program',
                body: [{
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Literal',
                                    value: 'use strict',
                                    start: 15,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    },
                                    raw: '"use strict"'
                                },
                                directive: 'use strict',
                                start: 15,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            }],
                            start: 13,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'a',
                            start: 9,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 10
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
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
                            start: 30,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 30
                                },
                                end: {
                                    line: 1,
                                    column: 42
                                }
                            },
                            raw: '"use strict"'
                        },
                        start: 30,
                        end: 43,
                        loc: {
                            start: {
                                line: 1,
                                column: 30
                            },
                            end: {
                                line: 1,
                                column: 43
                            }
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 44,
                            end: 47,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 44
                                },
                                end: {
                                    line: 1,
                                    column: 47
                                }
                            }
                        },
                        start: 44,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 44
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        }
                    }
                ],
                sourceType: 'script',
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

        pass('function foo() { "use \\u0020strict"; with (a) b = c; }', Context.Empty, {
            source: 'function foo() { "use \\u0020strict"; with (a) b = c; }',
            expected: {
                  body: [
                    {
                      async: false,
                      body: {
                        body: [
                          {
                            directive: 'use \\u0020strict',
                            expression: {
                              type: 'Literal',
                              value: 'use  strict',
                            },
                            type: 'ExpressionStatement',
                          },
                         {
                            body: {
                              expression: {
                                left: {
                                  name: 'b',
                                  type: 'Identifier',
                                },
                                operator: '=',
                                right: {
                                  name: 'c',
                                  type: 'Identifier',
                                },
                                type: 'AssignmentExpression',
                              },
                              type: 'ExpressionStatement',
                            },
                            object: {
                              name: 'a',
                              type: 'Identifier',
                            },
                            type: 'WithStatement',
                          },
                        ],
                        type: 'BlockStatement',
                      },
                      expression: false,
                      generator: false,
                      id: {
                        name: 'foo',
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

        pass('"use\x20strict"; with (a) b = c;', Context.Empty, {
            source: '"use \\u0020strict"; with (a) b = c;',
            expected: {
                  body: [
                    {
                      directive: 'use \\u0020strict',
                     expression: {
                        type: 'Literal',
                        value: 'use  strict',
                      },
                      type: 'ExpressionStatement'
                    },
                    {
                      body: {
                        expression: {
                          left: {
                            name: 'b',
                            type: 'Identifier',
                          },
                          operator: '=',
                          right: {
                            name: 'c',
                            type: 'Identifier',
                          },
                          type: 'AssignmentExpression',
                        },
                        type: 'ExpressionStatement',
                      },
                      object: {
                        name: 'a',
                        type: 'Identifier',
                      },
                      type: 'WithStatement'
                    },
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

    });
});
