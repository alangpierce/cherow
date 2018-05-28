import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Statements - If', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

    const invalidSyntax = [
        // Esprima issue: https://github.com/jquery/esprima/issues/1866
        'if (true) class C {} else class D {}',
        'if true;',
        `if(!(1))`,
        'if(!(true))',
        'if(!("A"))',
        'if (false) label1: label2: function test262() {} else ;',
        'if (false) ; else function* g() {  }',
        'if (true) let x; else let y;',
        'if (false) ; else class C {}',
        'if (false) ; else async function f() {  }',
        'if (true) ; else label1: label2: function test262() {}',
        'if (true) function* g() {  } else ;',
        '"use strict"; if (true) function f() {  } else function _f() {}',
        'if (true) class C {}',
        '"use strict"; if (true) function f() {  } else function _f() {}',
        'if (true) const x = null;',
        'if (true) function f() {  } else ',
        'if (false) ; else let x;',
        'if (true) async function f() {  } else ;',
        'if();',
        `if({1})
        {
          ;
        }else
        {
          ;
        }`
    ];

    for (const arg of invalidSyntax) {
        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });

        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
    }

    fail(`if(true)
    if (false)`, Context.Empty, {
            source: `if(true)
        if (false)`,
        });

    fail('if (false) ; else function f() {}', Context.Strict, {
            source: 'if (false) ; else function f() {}',
        });

    fail('if (true) async function f() {  }', Context.Empty, {
            source: 'if (true) async function f() {  }',
        });

    fail('if (true) async function f() {  } else async function _f() {}', Context.Empty, {
            source: 'if (true) async function f() {  } else async function _f() {}',
        });

    fail('if (true) class C {}', Context.Empty, {
            source: 'if (true) class C {}',
        });

    fail('if (true) class C {}', Context.Empty, {
            source: 'if (true) class C {}',
        });

    });

    describe('Pass', () => {

        pass(`if (a) b()`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `if (a) b()`,
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
                    type: 'IfStatement',
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
                    test: {
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
                        name: 'a'
                    },
                    consequent: {
                        type: 'ExpressionStatement',
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
                        expression: {
                            type: 'CallExpression',
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
                            callee: {
                                type: 'Identifier',
                                start: 7,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                },
                                name: 'b'
                            },
                            arguments: []
                        }
                    },
                    alternate: null
                }],
                sourceType: 'script'
            }
        });

        pass(`if (a) (function(){})`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `if (a) (function(){})`,
            expected: {
                type: 'Program',
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
                },
                body: [{
                    type: 'IfStatement',
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
                    },
                    test: {
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
                        name: 'a'
                    },
                    consequent: {
                        type: 'ExpressionStatement',
                        start: 7,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        },
                        expression: {
                            type: 'FunctionExpression',
                            start: 8,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                                type: 'BlockStatement',
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
                                },
                                body: []
                            }
                        }
                    },
                    alternate: null
                }],
                sourceType: 'script'
            }
        });

        pass(`if (a) var x = 0;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `if (a) var x = 0;`,
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
                    type: 'IfStatement',
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
                    test: {
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
                        name: 'a'
                    },
                    consequent: {
                        type: 'VariableDeclaration',
                        start: 7,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        },
                        declarations: [{
                            type: 'VariableDeclarator',
                            start: 11,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            },
                            id: {
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
                                name: 'x'
                            },
                            init: {
                                type: 'Literal',
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
                                value: 0,
                                raw: '0'
                            }
                        }],
                        kind: 'var'
                    },
                    alternate: null
                }],
                sourceType: 'script'
            }

        });

        pass(`if (a) b(); else c()`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `if (a) b(); else c()`,
            expected: {
                type: 'Program',
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
                },
                body: [{
                    type: 'IfStatement',
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
                    },
                    test: {
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
                        name: 'a'
                    },
                    consequent: {
                        type: 'ExpressionStatement',
                        start: 7,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        },
                        expression: {
                            type: 'CallExpression',
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
                            callee: {
                                type: 'Identifier',
                                start: 7,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                },
                                name: 'b'
                            },
                            arguments: []
                        }
                    },
                    alternate: {
                        type: 'ExpressionStatement',
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
                        },
                        expression: {
                            type: 'CallExpression',
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
                            },
                            callee: {
                                type: 'Identifier',
                                start: 17,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                },
                                name: 'c'
                            },
                            arguments: []
                        }
                    }
                }],
                sourceType: 'script'
            }

        });

        pass(`if(a)b`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `if(a)b`,
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
                    type: 'IfStatement',
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
                    test: {
                        type: 'Identifier',
                        start: 3,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        },
                        name: 'a'
                    },
                    consequent: {
                        type: 'ExpressionStatement',
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
                        expression: {
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
                            name: 'b'
                        }
                    },
                    alternate: null
                }],
                sourceType: 'script'
            }

        });

        pass(`if(a)b;else c;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `if(a)b;else c;`,
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
                    type: 'IfStatement',
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
                    test: {
                        type: 'Identifier',
                        start: 3,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        },
                        name: 'a'
                    },
                    consequent: {
                        type: 'ExpressionStatement',
                        start: 5,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        },
                        expression: {
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
                            name: 'b'
                        }
                    },
                    alternate: {
                        type: 'ExpressionStatement',
                        start: 12,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        },
                        expression: {
                            type: 'Identifier',
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
                            },
                            name: 'c'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`function f() { if (1) { return () => { while (true) hi(); } } }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function f() { if (1) { return () => { while (true) hi(); } } }`,
            expected: {
                type: 'Program',
                start: 0,
                end: 63,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 63
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 63,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 63
                        }
                    },
                    id: {
                        type: 'Identifier',
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
                        },
                        name: 'f'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        start: 13,
                        end: 63,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 63
                            }
                        },
                        body: [{
                            type: 'IfStatement',
                            start: 15,
                            end: 61,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 61
                                }
                            },
                            test: {
                                type: 'Literal',
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
                                value: 1,
                                raw: '1'
                            },
                            consequent: {
                                type: 'BlockStatement',
                                start: 22,
                                end: 61,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 61
                                    }
                                },
                                body: [{
                                    type: 'ReturnStatement',
                                    start: 24,
                                    end: 59,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 59
                                        }
                                    },
                                    argument: {
                                        type: 'ArrowFunctionExpression',
                                        start: 31,
                                        end: 59,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 31
                                            },
                                            end: {
                                                line: 1,
                                                column: 59
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
                                            end: 59,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 37
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 59
                                                }
                                            },
                                            body: [{
                                                type: 'WhileStatement',
                                                start: 39,
                                                end: 57,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 39
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 57
                                                    }
                                                },
                                                test: {
                                                    type: 'Literal',
                                                    start: 46,
                                                    end: 50,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 46
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 50
                                                        }
                                                    },
                                                    value: true,
                                                    raw: 'true'
                                                },
                                                body: {
                                                    type: 'ExpressionStatement',
                                                    start: 52,
                                                    end: 57,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 52
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 57
                                                        }
                                                    },
                                                    expression: {
                                                        type: 'CallExpression',
                                                        start: 52,
                                                        end: 56,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 52
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 56
                                                            }
                                                        },
                                                        callee: {
                                                            type: 'Identifier',
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
                                                            name: 'hi'
                                                        },
                                                        arguments: []
                                                    }
                                                }
                                            }]
                                        }
                                    }
                                }]
                            },
                            alternate: null
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`if (1) { eval(42) }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `if (1) { eval(42) }`,
            expected: {
                type: 'Program',
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
                body: [{
                    type: 'IfStatement',
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
                    test: {
                        type: 'Literal',
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
                        value: 1,
                        raw: '1'
                    },
                    consequent: {
                        type: 'BlockStatement',
                        start: 7,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        },
                        body: [{
                            type: 'ExpressionStatement',
                            start: 9,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            },
                            expression: {
                                type: 'CallExpression',
                                start: 9,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                },
                                callee: {
                                    type: 'Identifier',
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
                                    },
                                    name: 'eval'
                                },
                                arguments: [{
                                    type: 'Literal',
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
                                    },
                                    value: 42,
                                    raw: '42'
                                }]
                            }
                        }]
                    },
                    alternate: null
                }],
                sourceType: 'script'
            }
        });

        pass(`if (true) if (false) {} else ; else {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `if (true) if (false) {} else ; else {}`,
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
                body: [{
                    type: 'IfStatement',
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
                    test: {
                        type: 'Literal',
                        start: 4,
                        end: 8,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        },
                        value: true,
                        raw: 'true'
                    },
                    consequent: {
                        type: 'IfStatement',
                        start: 10,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        },
                        test: {
                            type: 'Literal',
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
                            },
                            value: false,
                            raw: 'false'
                        },
                        consequent: {
                            type: 'BlockStatement',
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
                            },
                            body: []
                        },
                        alternate: {
                            type: 'EmptyStatement',
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
                        }
                    },
                    alternate: {
                        type: 'BlockStatement',
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
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`if (true) try {} finally {} else {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `if (true) try {} finally {} else {}`,
            expected: {
                type: 'Program',
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
                },
                body: [{
                    type: 'IfStatement',
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
                    },
                    test: {
                        type: 'Literal',
                        start: 4,
                        end: 8,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        },
                        value: true,
                        raw: 'true'
                    },
                    consequent: {
                        type: 'TryStatement',
                        start: 10,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        },
                        block: {
                            type: 'BlockStatement',
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
                            },
                            body: []
                        },
                        handler: null,
                        finalizer: {
                            type: 'BlockStatement',
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
                            },
                            body: []
                        }
                    },
                    alternate: {
                        type: 'BlockStatement',
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
                        },
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`6; if (true) { 7; } else { 8; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `6; if (true) { 7; } else { 8; }`,
            expected: {
                type: 'Program',
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
                },
                body: [{
                        type: 'ExpressionStatement',
                        start: 0,
                        end: 2,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 2
                            }
                        },
                        expression: {
                            type: 'Literal',
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
                            value: 6,
                            raw: '6'
                        }
                    },
                    {
                        type: 'IfStatement',
                        start: 3,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 31
                            }
                        },
                        test: {
                            type: 'Literal',
                            start: 7,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            },
                            value: true,
                            raw: 'true'
                        },
                        consequent: {
                            type: 'BlockStatement',
                            start: 13,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            },
                            body: [{
                                type: 'ExpressionStatement',
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
                                },
                                expression: {
                                    type: 'Literal',
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
                                    value: 7,
                                    raw: '7'
                                }
                            }]
                        },
                        alternate: {
                            type: 'BlockStatement',
                            start: 25,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 25
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            },
                            body: [{
                                type: 'ExpressionStatement',
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
                                expression: {
                                    type: 'Literal',
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
                                    },
                                    value: 8,
                                    raw: '8'
                                }
                            }]
                        }
                    }
                ],
                sourceType: 'script'
            }
        });
    });
});
