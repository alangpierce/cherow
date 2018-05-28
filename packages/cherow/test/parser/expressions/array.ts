import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Array', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {});

    describe('Pass', () => {

        const validSyntax = [
            '[1 <= 0]',
            'let [a,,b] = c',
            '[a, ...b=c]',
            '([a, ...b=c])',
            '[,,1,,,2,3,,]',
            '[ 1, 2,, 3, ]',
            '[ 0 ]',
            '[ ,, 0 ]',
            ' [,,3,,,]',
            '[,]',
            '[x()]',
            '[a, ...b]',
            '[function* f() {}]',
            '[a, ...{0: b}] = (1);',
            '[...{a}] = b;',
            '[...{a}] = b;',
            '[a, ...{0: b}] = 1',
            '[1, "z", "a", "Symbol(foo)"]',
            '[{...null}]',
            '[{...{a: 2, b: 3}, ... {c: 4, d: 5}}]',
            '[1, 2, 3, ...[]]',
            ' [...{}];',
            '[1,2,,4,5];',
            'var array = [,,,,,];',
            'var a = [,];',
            'let a = [];',
            'let b = [42];',
            'let c = [42, 7];',
            'let [d, ...e] = [1, 2, 3, 4, 5];'
        ];

        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`"use strict"; ${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });
        }

        pass(`[,,1,,,2,3,,]`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `[,,1,,,2,3,,]`,
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
                        type: 'ArrayExpression',
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
                        elements: [
                            null,
                            null,
                            {
                                type: 'Literal',
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
                                value: 1,
                                raw: '1'
                            },
                            null,
                            null,
                            {
                                type: 'Literal',
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
                                value: 2,
                                raw: '2'
                            },
                            {
                                type: 'Literal',
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
                                value: 3,
                                raw: '3'
                            },
                            null
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`[ 1, 2,, 3, ]`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `[ 1, 2,, 3, ]`,
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
                        type: 'ArrayExpression',
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
                        elements: [{
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
                                value: 1,
                                raw: '1'
                            },
                            {
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
                                value: 2,
                                raw: '2'
                            },
                            null,
                            {
                                type: 'Literal',
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
                                value: 3,
                                raw: '3'
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`[ 1, 2, 3, ]`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `[ 1, 2, 3, ]`,
            expected: {
                type: 'Program',
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
                body: [{
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'ArrayExpression',
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
                        elements: [{
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
                                value: 1,
                                raw: '1'
                            },
                            {
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
                                value: 2,
                                raw: '2'
                            },
                            {
                                type: 'Literal',
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
                                value: 3,
                                raw: '3'
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`[]`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `[]`,
            expected: {
                type: 'Program',
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
                        type: 'ArrayExpression',
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
                        elements: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`[ ,, 0 ]`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `[ ,, 0 ]`,
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
                        type: 'ArrayExpression',
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
                        elements: [
                            null,
                            null,
                            {
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
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`[ 0, ]`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `[ 0, ]`,
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
                        type: 'ArrayExpression',
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
                        elements: [{
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

        pass(`[,,3,,,]`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `[,,3,,,]`,
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
                        type: 'ArrayExpression',
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
                        elements: [
                            null,
                            null,
                            {
                                type: 'Literal',
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
                                value: 3,
                                raw: '3'
                            },
                            null,
                            null
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`[,]`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `[,]`,
            expected: {
                type: 'Program',
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
                body: [{
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'ArrayExpression',
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
                        elements: [
                            null
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`[x()]`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `[x()]`,
            expected: {
                type: 'Program',
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
                },
                body: [{
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                        type: 'ArrayExpression',
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
                        },
                        elements: [{
                            type: 'CallExpression',
                            start: 1,
                            end: 4,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 4
                                }
                            },
                            callee: {
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'x'
                            },
                            arguments: []
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`[a, ...{0: b}] = (1);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `[a, ...{0: b}] = (1);`,
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
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'AssignmentExpression',
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
                        operator: '=',
                        left: {
                            type: 'ArrayPattern',
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
                            elements: [{
                                    type: 'Identifier',
                                    start: 1,
                                    end: 2,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 2
                                        }
                                    },
                                    name: 'a'
                                },
                                {
                                    type: 'RestElement',
                                    start: 4,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    },
                                    argument: {
                                        type: 'ObjectPattern',
                                        start: 7,
                                        end: 13,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 7
                                            },
                                            end: {
                                                line: 1,
                                                column: 13
                                            }
                                        },
                                        properties: [{
                                            type: 'Property',
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
                                            method: false,
                                            shorthand: false,
                                            computed: false,
                                            key: {
                                                type: 'Literal',
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
                                                value: 0,
                                                raw: '0'
                                            },
                                            value: {
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
                                            },
                                            kind: 'init'
                                        }]
                                    }
                                }
                            ]
                        },
                        right: {
                            type: 'Literal',
                            start: 18,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            },
                            value: 1,
                            raw: '1'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`[1 <= 0]`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `[1 <= 0]`,
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
                        type: 'ArrayExpression',
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
                        elements: [{
                            type: 'BinaryExpression',
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
                            },
                            left: {
                                type: 'Literal',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                value: 1,
                                raw: '1'
                            },
                            operator: '<=',
                            right: {
                                type: 'Literal',
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
                                value: 0,
                                raw: '0'
                            }
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('[a.r] = b', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '[a.r] = b',
            expected: {
                type: 'Program',
                start: 0,
                end: 9,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 9,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    },
                    expression: {
                        type: 'AssignmentExpression',
                        start: 0,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        },
                        operator: '=',
                        left: {
                            type: 'ArrayPattern',
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
                            },
                            elements: [{
                                type: 'MemberExpression',
                                start: 1,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                },
                                object: {
                                    type: 'Identifier',
                                    start: 1,
                                    end: 2,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 2
                                        }
                                    },
                                    name: 'a'
                                },
                                property: {
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
                                    name: 'r'
                                },
                                computed: false
                            }]
                        },
                        right: {
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
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('[ 1 ]', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '[ 1 ]',
            expected: {
                type: 'Program',
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
                },
                body: [{
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                        type: 'ArrayExpression',
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
                        },
                        elements: [{
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
                            value: 1,
                            raw: '1'
                        }]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('[a, ...b=c]', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '[a, ...b=c]',
            expected: {
                type: 'Program',
                start: 0,
                end: 11,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                },
                body: [{
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 11,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    },
                    expression: {
                        type: 'ArrayExpression',
                        start: 0,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        },
                        elements: [{
                                type: 'Identifier',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                },
                                name: 'a'
                            },
                            {
                                type: 'SpreadElement',
                                start: 4,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                },
                                argument: {
                                    type: 'AssignmentExpression',
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
                                    operator: '=',
                                    left: {
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
                                    right: {
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
                                        name: 'c'
                                    }
                                }
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });
    });
});
