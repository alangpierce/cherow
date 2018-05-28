import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

// This is also known as 'dynamic import'

describe('Next - Import', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        const invalidSyntax = [
            'function failsParse() { return import.then(); }',
            `import(x, y).then(z);`,
            `import.then(doLoad);`,
            'import(',
            'import)',
            'import()',
            'import(\'x',
            'import(\'x\']',
            'import[\'x\')',
            'import = x',
            'import[',
            'import[]',
            'import]',
            'import[x]',
            'import{',
            'import{x',
            'import{x}',
            'import(x, y)',
            'import(...y)',
            'import(x,)',
            'import(,)',
            'import(,y)',
            'import(;)',
            '[import]',
            '{import}',
            'import+',
            'import = 1',
            'import.wat',
            'new import(x)',
        ];

        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Strict | Context.Module);
                });
            });

            it(`${arg}`, () => {
                t.throws(() => {
                    parseSource(`${arg}`, undefined, Context.OptionsNext);
                });
            });

            it(`let ${arg}`, () => {
                t.throws(() => {
                    parseSource(`let ${arg}`, undefined, Context.OptionsNext);
                });
            });
        }

        fail('var import("x")', Context.Empty, {
            source: 'var import("x")',
        });
    });

    describe('Pass', () => {

        const validSyntax = [
            'import(1)',
            'import(y=x)',
            'f(...[import(y=x)])',
            'x = {[import(y=x)]: 1}',
            'var {[import(y=x)]: x} = {}',
            '({[import(y=x)]: x} = {})',
            'async () => { await import(x) }',
            'const importResult = import("test.js");',
            'import("lib.js").then(doThis);',
            'function* a() { yield import("http"); }',
            '"use strict"; import("test.js");',
            'function loadImport(file) { return import(`test/${file}.js`); }',
            '() => { import(x) }',
            '(import(y=x))',
            '{import(y=x)}',
            `import('./module.js')`,
            'import(import(x))',
            'x = import(x)',
            'var x = import(x)',
            'let x = import(x)',
            'for(x of import(x)) {}',
            'import(x).then()',
        ];

        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
                });
            });
        }

        pass(`return value`, Context.OptionsRanges | Context.OptionsRaw | Context.OptionsNext | Context.Module, {
            source: 'const importResult = import("test.js");',
            expected: {
                type: 'Program',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'CallExpression',
                            arguments: [{
                                type: 'Literal',
                                value: 'test.js',
                                start: 28,
                                end: 37,
                                raw: '"test.js"'
                            }],
                            callee: {
                                type: 'Import',
                                start: 21,
                                end: 27
                            },
                            start: 21,
                            end: 38
                        },
                        id: {
                            type: 'Identifier',
                            name: 'importResult',
                            start: 6,
                            end: 18
                        },
                        start: 6,
                        end: 38
                    }],
                    kind: 'const',
                    start: 0,
                    end: 39
                }],
                sourceType: 'module',
                start: 0,
                end: 39
            }
        });

        pass(`import call string`, Context.OptionsRanges | Context.OptionsRaw | Context.OptionsNext, {
            source: 'import("lib.js").then(doThis);',
            expected: {
                body: [{
                    end: 30,
                    expression: {
                        arguments: [{
                            end: 28,
                            name: 'doThis',
                            start: 22,
                            type: 'Identifier'
                        }],
                        callee: {
                            computed: false,
                            end: 21,
                            object: {
                                arguments: [{
                                    end: 15,
                                    raw: '"lib.js"',
                                    start: 7,
                                    type: 'Literal',
                                    value: 'lib.js'
                                }, ],
                                callee: {
                                    end: 6,
                                    start: 0,
                                    type: 'Import'
                                },
                                end: 16,
                                start: 0,
                                type: 'CallExpression'
                            },
                            property: {
                                end: 21,
                                name: 'then',
                                start: 17,
                                type: 'Identifier'
                            },
                            start: 0,
                            type: 'MemberExpression'
                        },
                        end: 29,
                        start: 0,
                        type: 'CallExpression'
                    },
                    start: 0,
                    type: 'ExpressionStatement'
                }],
                end: 30,
                sourceType: 'script',
                start: 0,
                type: 'Program',
            }
        });

        pass(`generator`, Context.OptionsRanges | Context.OptionsRaw | Context.OptionsNext, {
            source: 'function* a() { yield import("http"); }',
            expected: {
                body: [{
                    async: false,
                    body: {
                        body: [{
                            end: 37,
                            expression: {
                                argument: {
                                    arguments: [{
                                        end: 35,
                                        raw: '"http"',
                                        start: 29,
                                        type: 'Literal',
                                        value: 'http',
                                    }],
                                    callee: {
                                        end: 28,
                                        start: 22,
                                        type: 'Import'
                                    },
                                    end: 36,
                                    start: 22,
                                    type: 'CallExpression'
                                },
                                delegate: false,
                                end: 36,
                                start: 16,
                                type: 'YieldExpression'
                            },
                            start: 16,
                            type: 'ExpressionStatement'
                        }],
                        end: 39,
                        start: 14,
                        type: 'BlockStatement',
                    },
                    end: 39,
                    expression: false,
                    generator: true,
                    id: {
                        end: 11,
                        name: 'a',
                        start: 10,
                        type: 'Identifier',
                    },
                    params: [],
                    start: 0,
                    type: 'FunctionDeclaration',
                }, ],
                end: 39,
                sourceType: 'script',
                start: 0,
                type: 'Program',
            }
        });

        pass(`import foo, * as namespace from "./namespace/drink.js"`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module, {
            source: 'import foo, * as namespace from "./namespace/drink.js"',
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [
                    {
                        type: 'ImportDeclaration',
                        specifiers: [
                            {
                                type: 'ImportDefaultSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: 'foo',
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
                                    }
                                },
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
                                }
                            },
                            {
                                type: 'ImportNamespaceSpecifier',
                                local: {
                                    type: 'Identifier',
                                    name: 'namespace',
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
                                },
                                start: 12,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                }
                            }
                        ],
                        source: {
                            type: 'Literal',
                            value: './namespace/drink.js',
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
                            },
                            raw: '"./namespace/drink.js"'
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
                    }
                ],
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

        pass('for(x of import(x)) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module, {
            source: 'for(x of import(x)) {}',
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [
                    {
                        type: 'ForOfStatement',
                        body: {
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
                        },
                        left: {
                            type: 'Identifier',
                            name: 'x',
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
                            }
                        },
                        right: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Import',
                                start: 9,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                }
                            },
                            arguments: [
                                {
                                    type: 'Identifier',
                                    name: 'x',
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
                                }
                            ],
                            start: 9,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        await: false,
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

        pass('(import(y=x)))', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: '(import(y=x))',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Import',
                                start: 1,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                }
                            },
                            arguments: [
                                {
                                    type: 'AssignmentExpression',
                                    left: {
                                        type: 'Identifier',
                                        name: 'y',
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
                                        }
                                    },
                                    operator: '=',
                                    right: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                }
                            ],
                            start: 1,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
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

        pass('var {[import(y=x)]: x} = {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: 'var {[import(y=x)]: x} = {}',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'ObjectExpression',
                                    properties: [],
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
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'Import',
                                                    start: 6,
                                                    end: 12,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 6
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 12
                                                        }
                                                    }
                                                },
                                                arguments: [
                                                    {
                                                        type: 'AssignmentExpression',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                        },
                                                        operator: '=',
                                                        right: {
                                                            type: 'Identifier',
                                                            name: 'x',
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
                                                        start: 13,
                                                        end: 16,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 13
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 16
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 6,
                                                end: 17,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 6
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 17
                                                    }
                                                }
                                            },
                                            computed: true,
                                            value: {
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
                                            method: false,
                                            shorthand: false,
                                            start: 5,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 5
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            }
                                        }
                                    ],
                                    start: 4,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                },
                                start: 4,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            }
                        ],
                        kind: 'var',
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
