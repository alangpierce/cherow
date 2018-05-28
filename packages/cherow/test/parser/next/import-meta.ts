import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Next - Import meta', () => {
  beforeEach(() => console.log = () => {});
  afterEach(() => delete console.log);

    describe('Failure', () => {

        fail('var import.meta', Context.Empty, {
            source: 'var import.meta',
        });

        fail('var import.meta', Context.Module, {
            source: 'var import.meta',
        });

        fail('([import.meta] = [1])', Context.Empty, {
            source: '([import.meta] = [1])',
        });

        fail('([import.meta] = [1])', Context.Module, {
            source: '([import.meta] = [1])',
        });

        fail('for (var import.meta of [1]) {}', Context.Empty, {
            source: 'for (var import.meta of [1]) {}',
        });
    });

    describe('Pass', () => {

        const validSyntax = [
            'class C {set x(_) { import.meta[0] }}',
            '() => import.meta',
            'if (1) {} else { import.meta }',
            'import.meta[0]',
            'import.meta.couldBeMutable = true',
            'import.meta()',
            'import.meta',
            '() => { import.meta }',
            '() => import.meta',
            'if (1) { import.meta }',
            'if (1) {} else { import.meta }',
            'while (0) { import.meta }',
            'do { import.meta } while (0)',
            'import.meta.url',
            'import.meta[0]',
            'import.meta.couldBeMutable = true',
            'import.meta()',
            'new import.meta.MagicClass',
            'new import.meta',
            't = [...import.meta]',
            'f = {...import.meta}',
            'delete import.meta',
        ];
        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
                });
            });
        }

        pass('t = [...import.meta]', Context.OptionsRaw | Context.OptionsNext | Context.Module, {
            source: 't = [...import.meta]',
            expected: {
                  body: [
                    {
                      expression: {
                        left: {
                          name: 't',
                          type: 'Identifier'
                        },
                        operator: '=',
                        right: {
                          elements: [
                            {
                              argument: {
                                meta: {
                                  name: 'import',
                                  type: 'Identifier'
                                },
                                property: {
                                  name: 'meta',
                                  type: 'Identifier'
                                },
                                type: 'MetaProperty'
                              },
                              type: 'SpreadElement'
                            }
                          ],
                          type: 'ArrayExpression'
                        },
                        type: 'AssignmentExpression'
                      },
                     type: 'ExpressionStatement'
                    }
                  ],
                  sourceType: 'module',
                  type: 'Program'
                }
        });

        pass('"use strict"; ({m() { while (0) { import.meta } }})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module, {
            source: '"use strict"; ({m() { while (0) { import.meta } }})',
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
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
                            raw: '"use strict"'
                        },
                        directive: 'use strict',
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
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'm',
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
                                    },
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'WhileStatement',
                                                    test: {
                                                        type: 'Literal',
                                                        value: 0,
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
                                                        },
                                                        raw: '0'
                                                    },
                                                    body: {
                                                        type: 'BlockStatement',
                                                        body: [
                                                            {
                                                                type: 'ExpressionStatement',
                                                                expression: {
                                                                    meta: {
                                                                        type: 'Identifier',
                                                                        name: 'import',
                                                                        start: 34,
                                                                        end: 40,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 34
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 40
                                                                            }
                                                                        }
                                                                    },
                                                                    type: 'MetaProperty',
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'meta',
                                                                        start: 41,
                                                                        end: 45,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 41
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 45
                                                                            }
                                                                        }
                                                                    },
                                                                    start: 34,
                                                                    end: 45,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 34
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 45
                                                                        }
                                                                    }
                                                                },
                                                                start: 34,
                                                                end: 45,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 34
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 45
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        start: 32,
                                                        end: 47,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 32
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 47
                                                            }
                                                        }
                                                    },
                                                    start: 22,
                                                    end: 47,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 22
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 47
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 20,
                                            end: 49,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 49
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 17,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 49
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: true,
                                    shorthand: false,
                                    start: 16,
                                    end: 49,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 49
                                        }
                                    }
                                }
                            ],
                            start: 15,
                            end: 50,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 50
                                }
                            }
                        },
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

        pass('"use strict"; ({m() { () => import.meta }})', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module, {
            source: '"use strict"; ({m() { () => import.meta }})',
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
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
                            raw: '"use strict"'
                        },
                        directive: 'use strict',
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
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'm',
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
                                    },
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'ArrowFunctionExpression',
                                                        body: {
                                                            meta: {
                                                                type: 'Identifier',
                                                                name: 'import',
                                                                start: 28,
                                                                end: 34,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 28
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 34
                                                                    }
                                                                }
                                                            },
                                                            type: 'MetaProperty',
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'meta',
                                                                start: 35,
                                                                end: 39,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 35
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 39
                                                                    }
                                                                }
                                                            },
                                                            start: 28,
                                                            end: 39,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 28
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 39
                                                                }
                                                            }
                                                        },
                                                        params: [],
                                                        id: null,
                                                        async: false,
                                                        generator: false,
                                                        expression: true,
                                                        start: 22,
                                                        end: 39,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 22
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 39
                                                            }
                                                        }
                                                    },
                                                    start: 22,
                                                    end: 39,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 22
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 39
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 20,
                                            end: 41,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 41
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 17,
                                        end: 41,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 41
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: true,
                                    shorthand: false,
                                    start: 16,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 41
                                        }
                                    }
                                }
                            ],
                            start: 15,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 42
                                }
                            }
                        },
                        start: 14,
                        end: 43,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 43
                            }
                        }
                    }
                ],
                start: 0,
                end: 43,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 43
                    }
                }
            }
        });

        pass('delete import.meta', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module, {
            source: 'delete import.meta',
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'UnaryExpression',
                            operator: 'delete',
                            argument: {
                                meta: {
                                    type: 'Identifier',
                                    name: 'import',
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
                                    }
                                },
                                type: 'MetaProperty',
                                property: {
                                    type: 'Identifier',
                                    name: 'meta',
                                    start: 14,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                start: 7,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            },
                            prefix: true,
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
                    }
                ],
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
            }
        });

        pass('do { import.meta } while (0)', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module, {
            source: 'do { import.meta } while (0)',
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [
                    {
                        type: 'DoWhileStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        meta: {
                                            type: 'Identifier',
                                            name: 'import',
                                            start: 5,
                                            end: 11,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 5
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 11
                                                }
                                            }
                                        },
                                        type: 'MetaProperty',
                                        property: {
                                            type: 'Identifier',
                                            name: 'meta',
                                            start: 12,
                                            end: 16,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 16
                                                }
                                            }
                                        },
                                        start: 5,
                                        end: 16,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 16
                                            }
                                        }
                                    },
                                    start: 5,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                }
                            ],
                            start: 3,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        test: {
                            type: 'Literal',
                            value: 0,
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
                            raw: '0'
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

        pass('if (1) { import.meta }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module, {
            source: 'if (1) { import.meta }',
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [
                    {
                        type: 'IfStatement',
                        test: {
                            type: 'Literal',
                            value: 1,
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
                            raw: '1'
                        },
                        alternate: null,
                        consequent: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        meta: {
                                            type: 'Identifier',
                                            name: 'import',
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
                                        type: 'MetaProperty',
                                        property: {
                                            type: 'Identifier',
                                            name: 'meta',
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
                                        start: 9,
                                        end: 20,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 9
                                            },
                                            end: {
                                                line: 1,
                                                column: 20
                                            }
                                        }
                                    },
                                    start: 9,
                                    end: 20,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 20
                                        }
                                    }
                                }
                            ],
                            start: 7,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
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
    });
});
