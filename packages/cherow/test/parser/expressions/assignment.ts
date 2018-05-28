import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Expressions - Assignment', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failures', () => {

        fail('(({a})=0);', Context.Empty, {
            source: '(({a})=0);',
        });

        fail('(({a})=0);', Context.Strict, {
            source: '(({a})=0);',
        });

        fail('(([a])=0);', Context.Empty, {
            source: '(([a])=0);',
        });

        fail('([(a = b)] = []', Context.Empty, {
            source: '([(a = b)] = []',
        });

        fail('42 = 42;', Context.Empty, {
            source: '42 = 42;',
        });

        fail('"x" = 42;', Context.Empty, {
            source: '"x" = 42;',
        });

        fail('"x" = 42;', Context.Module, {
            source: '"x" = 42;',
        });

        // Esprima issue: https://github.com/jquery/esprima/issues/1888
        fail('[(a = 0)] = 1', Context.Module, {
            source: '[(a = 0)] = 1',
        });
    });

    describe('Pass', () => {

        pass('[a,b] = [b,a];', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '[a,b] = [b,a];',
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
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'AssignmentExpression',
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
                                    name: 'b'
                                }
                            ]
                        },
                        right: {
                            type: 'ArrayExpression',
                            start: 8,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            elements: [{
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
                                    name: 'b'
                                },
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
                                    name: 'a'
                                }
                            ]
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('a = (b, c)', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'a = (b, c)',
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
                        type: 'AssignmentExpression',
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
                        operator: '=',
                        left: {
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
                        right: {
                            type: 'SequenceExpression',
                            start: 5,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            },
                            expressions: [{
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
                                    name: 'c'
                                }
                            ]
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x <<= 42', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x <<= 42',
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
                        type: 'AssignmentExpression',
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
                        operator: '<<=',
                        left: {
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
                            name: 'x'
                        },
                        right: {
                            type: 'Literal',
                            start: 6,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            },
                            value: 42,
                            raw: '42'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x &= 42;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x &= 42;',
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
                        type: 'AssignmentExpression',
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
                        operator: '&=',
                        left: {
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
                            name: 'x'
                        },
                        right: {
                            type: 'Literal',
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
                            value: 42,
                            raw: '42'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x /= 42', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x /= 42',
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
                        type: 'AssignmentExpression',
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
                        operator: '/=',
                        left: {
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
                            name: 'x'
                        },
                        right: {
                            type: 'Literal',
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
                            value: 42,
                            raw: '42'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('arguments = 42', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'arguments = 42',
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
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'AssignmentExpression',
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
                        operator: '=',
                        left: {
                            type: 'Identifier',
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
                            name: 'arguments'
                        },
                        right: {
                            type: 'Literal',
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
                            value: 42,
                            raw: '42'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x >>>= 42', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x >>>= 42',
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
                        operator: '>>>=',
                        left: {
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
                            name: 'x'
                        },
                        right: {
                            type: 'Literal',
                            start: 7,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            },
                            value: 42,
                            raw: '42'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x |= 42', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x |= 42',
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
                        type: 'AssignmentExpression',
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
                        operator: '|=',
                        left: {
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
                            name: 'x'
                        },
                        right: {
                            type: 'Literal',
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
                            value: 42,
                            raw: '42'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('a=0;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'a=0;',
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
                        type: 'AssignmentExpression',
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
                        operator: '=',
                        left: {
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
                        right: {
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
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(a)=(0);', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(a)=(0);',
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
                        type: 'AssignmentExpression',
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
                        operator: '=',
                        left: {
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
                        right: {
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
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x *= 0', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x *= 0',
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
                        type: 'AssignmentExpression',
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
                        operator: '*=',
                        left: {
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
                            name: 'x'
                        },
                        right: {
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
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x.x *= 0', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x.x *= 0',
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
                        type: 'AssignmentExpression',
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
                        operator: '*=',
                        left: {
                            type: 'MemberExpression',
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
                            object: {
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
                                name: 'x'
                            },
                            property: {
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
                                name: 'x'
                            },
                            computed: false
                        },
                        right: {
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
                            value: 0,
                            raw: '0'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x /= 0', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x /= 0',
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
                        type: 'AssignmentExpression',
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
                        operator: '/=',
                        left: {
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
                            name: 'x'
                        },
                        right: {
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
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x **= 0', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x **= 0',
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
                        type: 'AssignmentExpression',
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
                        operator: '**=',
                        left: {
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
                            name: 'x'
                        },
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
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('x <<= 0', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'x <<= 0',
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
                        type: 'AssignmentExpression',
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
                        operator: '<<=',
                        left: {
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
                            name: 'x'
                        },
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
                    }
                }],
                sourceType: 'script'
            }
        });

        /*pass('(((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: "(((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 0",
          expected:  {}
        }); */

        pass('[0].length = 0', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '[0].length = 0',
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
                    type: 'ExpressionStatement',
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
                    expression: {
                        type: 'AssignmentExpression',
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
                        operator: '=',
                        left: {
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
                                elements: [{
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
                                    value: 0,
                                    raw: '0'
                                }]
                            },
                            property: {
                                type: 'Identifier',
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
                                name: 'length'
                            },
                            computed: false
                        },
                        right: {
                            type: 'Literal',
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
                            value: 0,
                            raw: '0'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });

        pass('(a**b).c=0', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: '(a**b).c=0',
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
                        type: 'AssignmentExpression',
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
                        operator: '=',
                        left: {
                            type: 'MemberExpression',
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
                            object: {
                                type: 'BinaryExpression',
                                start: 1,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                },
                                left: {
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
                                operator: '**',
                                right: {
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
                                    name: 'b'
                                }
                            },
                            property: {
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
                                name: 'c'
                            },
                            computed: false
                        },
                        right: {
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
                            value: 0,
                            raw: '0'
                        }
                    }
                }],
                sourceType: 'script'
            }
        });
    });
});
